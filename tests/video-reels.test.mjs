import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { pauseOtherVideos } from '../src/utils/videoPlayback.js';
import { access, readFile } from 'node:fs/promises';

let server;

before(async () => {
  server = await createServer({
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: 'custom',
    ssr: { external: ['react', 'react-dom', 'react-router-dom', 'react-bootstrap'] },
  });
});
after(async () => {
  await server?.close();
});

async function render(path, url = '/') {
  const { default: Component } = await server.ssrLoadModule(path);
  return renderToStaticMarkup(
    React.createElement(MemoryRouter, { initialEntries: [url] }, React.createElement(Component)),
  );
}

test('starting a clip pauses other playing PlayPop clips and preserves the active clip', () => {
  let pauses = 0;
  const active = {
    paused: false,
    pause() {
      assert.fail('Active video paused');
    },
  };
  const playing = {
    paused: false,
    pause() {
      pauses++;
    },
  };
  const stopped = {
    paused: true,
    pause() {
      assert.fail('Already paused video changed');
    },
  };
  active.ownerDocument = {
    querySelectorAll(selector) {
      assert.equal(selector, 'video[data-playpop-video]');
      return [active, playing, stopped];
    },
  };
  pauseOtherVideos(active);
  assert.equal(pauses, 1);
});

test('homepage renders three poster-backed muted inline videos without autoplay or eager preload', async () => {
  const html = await render('/src/components/home/VideoReels/VideoReels.jsx');
  const tags = html.match(/<video\b[^>]*>/g);
  assert.equal(tags.length, 3);
  for (const tag of tags) {
    assert.match(tag, /preload="none"/);
    assert.match(tag, /poster="[^"]+"/);
    assert.match(tag, /controls=""/);
    assert.match(tag, /muted=""/);
    assert.match(tag, /playsInline=""/);
    assert.doesNotMatch(tag, /autoplay/i);
  }
  assert.match(html, /filter=videos/);
  assert.match(html, /Activar sonido/);
  assert.doesNotMatch(html.replace(/(?:src|href)="[^"]*"/g, ''), /WhatsApp Video/);
});

const approvedTitles = [
  'Celebraciones llenas de alegría',
  'Diversión a lo grande',
  'Momentos para recordar',
  'Celebraciones inolvidables',
];

function assertGalleryCounts(html, photos, videos) {
  assert.equal((html.match(/class="gallery-card"/g) || []).length, photos);
  assert.equal((html.match(/class="video-gallery-card"/g) || []).length, videos);
  assert.doesNotMatch(html, /Fotografía próximamente|Imagen ilustrativa|<video\b/);
  for (const title of approvedTitles) {
    if (photos) {
      assert.ok(html.includes(title));
      assert.ok(html.includes(`aria-label="Ver momentos: ${title}"`));
    } else assert.ok(!html.includes(title));
  }
}

test('Todos renders exactly four real collections and six lazy video cards', async () => {
  const html = await render('/src/components/gallery/GalleryGrid/GalleryGrid.jsx', '/galeria');
  assertGalleryCounts(html, 4, 6);
  assert.match(html, /aria-pressed="true">Todos/);
  assert.equal((html.match(/aria-label="Ver video:/g) || []).length, 6);
  const photoSection = html.match(
    /<section class="gallery-grid__section" aria-labelledby="gallery-photos-heading">([\s\S]*?)<\/section>/,
  )?.[1];
  const videoSection = html.match(
    /<section class="gallery-grid__section" aria-labelledby="gallery-videos-heading">([\s\S]*?)<\/section>/,
  )?.[1];
  assert.ok(photoSection);
  assert.ok(videoSection);
  assert.equal((photoSection.match(/class="gallery-card"/g) || []).length, 4);
  assert.doesNotMatch(photoSection, /video-gallery-card|video-carousel/);
  assert.match(photoSection, /Momentos PlayPop/);
  assert.equal((videoSection.match(/class="video-gallery-card"/g) || []).length, 6);
  assert.doesNotMatch(videoSection, /class="gallery-card"|gallery-grid__photos/);
  assert.match(videoSection, /PlayPop en Acción|video-carousel__track/);
  assert.doesNotMatch(html, /class="gallery-grid__videos"/);
});

test('Videos deep link renders exactly six videos and no photo collections', async () => {
  const html = await render(
    '/src/components/gallery/GalleryGrid/GalleryGrid.jsx',
    '/galeria?filter=videos',
  );
  assertGalleryCounts(html, 0, 6);
  assert.match(html, /aria-pressed="true">Videos/);
  assert.match(html, /class="gallery-grid__videos"/);
  assert.doesNotMatch(html, /video-carousel|gallery-photos-heading/);
});

test('Fotos renders exactly four real collections; unknown filter falls back to Todos', async () => {
  const html = await render(
    '/src/components/gallery/GalleryGrid/GalleryGrid.jsx',
    '/galeria?filter=photos',
  );
  assertGalleryCounts(html, 4, 0);
  assert.match(html, /aria-pressed="true">Fotos/);
  assert.match(html, /gallery-grid__photos/);
  assert.doesNotMatch(html, /video-carousel|gallery-videos-heading/);
  const fallback = await render(
    '/src/components/gallery/GalleryGrid/GalleryGrid.jsx',
    '/galeria?filter=unknown',
  );
  assertGalleryCounts(fallback, 4, 6);
});

test('gallery carousel exposes keyboard focus, labeled navigation and matching control targets', async () => {
  const html = await render('/src/components/gallery/GalleryGrid/GalleryGrid.jsx', '/galeria');
  const track = html.match(/<div id="([^"]+)" class="video-carousel__track"[^>]*>/)?.[0];
  const trackId = track?.match(/id="([^"]+)"/)?.[1];
  assert.ok(trackId);
  assert.match(track, /tabindex="0"/);
  assert.match(track, /role="region"/);
  assert.match(track, /aria-label="Carrusel de videos PlayPop en Acción"/);
  assert.equal(
    (html.match(/aria-controls="([^"]+)"/g) || []).filter(
      (value) => value === `aria-controls="${trackId}"`,
    ).length,
    2,
  );
  assert.match(html, /Videos anteriores/);
  assert.match(html, /Videos siguientes/);
  assert.match(html, /<button type="button" disabled=""[^>]*>/);
});

test('approved collections retain their titles, 3/2/4/3 counts, 12 distinct photos and approval gate', async () => {
  const { eventCollections, getPublicEventCollections } = await server.ssrLoadModule(
    '/src/data/eventCollections.js',
  );
  const collections = getPublicEventCollections();
  assert.deepEqual(
    collections.map((item) => item.title),
    approvedTitles,
  );
  assert.deepEqual(
    collections.map((item) => item.photos.length),
    [3, 2, 4, 3],
  );
  const photos = collections.flatMap((item) => item.photos);
  assert.equal(new Set(photos.map((photo) => photo.id)).size, 12);
  assert.equal(new Set(photos.map((photo) => photo.image)).size, 12);
  assert.ok(photos.every((photo) => photo.publication === 'cleared' && photo.imageAlt));
  eventCollections[0].photos.push({
    ...photos[0],
    id: 'pending-test-photo',
    publication: 'pending',
  });
  try {
    assert.equal(getPublicEventCollections()[0].photos.length, 3);
  } finally {
    eventCollections[0].photos.pop();
  }
});

test('photo navigation wraps through every collection and recognizes horizontal swipes', async () => {
  const { getNextPhotoIndex, getSwipeDirection } = await server.ssrLoadModule(
    '/src/components/gallery/EventPhotoViewer/navigation.js',
  );
  for (const count of [3, 2, 4, 3]) {
    assert.equal(getNextPhotoIndex(0, -1, count), count - 1);
    assert.equal(getNextPhotoIndex(count - 1, 1, count), 0);
    const visited = Array.from({ length: count }, (_, index) => getNextPhotoIndex(0, index, count));
    assert.equal(new Set(visited).size, count);
  }
  assert.equal(getSwipeDirection({ x: 100, y: 50 }, { x: 20, y: 55 }), 1);
  assert.equal(getSwipeDirection({ x: 20, y: 50 }, { x: 100, y: 55 }), -1);
  assert.equal(getSwipeDirection({ x: 20, y: 50 }, { x: 30, y: 150 }), 0);
  assert.equal(getSwipeDirection(null, { x: 100, y: 55 }), 0);
});

test('homepage photo preview reuses real collection covers and never renders placeholders', async () => {
  const html = await render('/src/components/home/GalleryPreview/GalleryPreview.jsx');
  assert.equal((html.match(/class="gallery-card"/g) || []).length, 4);
  assert.doesNotMatch(html, /Fotografía próximamente|Imagen ilustrativa/);
  for (const title of approvedTitles) assert.ok(html.includes(title));
});

test('missing-image records never render a placeholder card', async () => {
  const { default: GalleryCard } = await server.ssrLoadModule(
    '/src/components/common/GalleryCard/GalleryCard.jsx',
  );
  assert.equal(
    renderToStaticMarkup(
      React.createElement(GalleryCard, { item: { title: 'Pending', image: null } }),
    ),
    '',
  );
});

test('the complete gallery page contains real content without illustrative or coming-soon copy', async () => {
  const html = await render('/src/pages/GalleryPage.jsx', '/galeria');
  assertGalleryCounts(html, 4, 6);
  assert.doesNotMatch(html, /ilustrativ|próximamente/i);
});

test('Baby Gym is a single featured inflatable using the PNG and approved duration pricing', async () => {
  const { products, getProductBySlug, getProductRoute, getProductsByCategory } =
    await server.ssrLoadModule('/src/data/products.js');
  const babyGym = getProductBySlug('baby-gym');
  assert.equal(products.filter((product) => product.id === 'baby-gym').length, 1);
  assert.equal(babyGym.category, 'inflatable');
  assert.equal(babyGym.featured, true);
  assert.equal(babyGym.price, 35000);
  assert.equal(babyGym.rentalHours, 3);
  assert.equal(babyGym.imageFit, 'contain');
  assert.match(babyGym.image, /Baby-gym\.png$/);
  await access(new URL('../src/assets/images/playpop/inflatable/Baby-gym.png', import.meta.url));
  assert.deepEqual(babyGym.durationPrices, { 2: 30000, 3: 35000, 4: 40000, 5: 45000 });
  assert.equal(getProductRoute(babyGym), '/inflables/baby-gym');
  assert.ok(getProductsByCategory('inflatable').includes(babyGym));
  assert.ok(!getProductsByCategory('game').includes(babyGym));
});

test('Baby Gym renders on the homepage and Inflables page with its uncropped PNG and correct link', async () => {
  for (const path of ['/src/pages/HomePage.jsx', '/src/pages/InflatablesPage.jsx']) {
    const html = await render(path);
    assert.equal((html.match(/aria-label="Ver detalles de Baby Gym"/g) || []).length, 1);
    assert.match(html, /href="\/inflables\/baby-gym"/);
    assert.match(html, /product-card--contain/);
    assert.match(html, /Baby-gym\.png/);
    assert.doesNotMatch(html, /Baby-gym\.jpeg/);
    assert.match(html, /₡35[.,\s]000/);
  }
});

test('Baby Gym detail route renders interactive prices and the approved after-five-hours rule', async () => {
  const html = await render('/src/App.jsx', '/inflables/baby-gym');
  assert.match(html, /<h1>Baby Gym<\/h1>/);
  assert.match(html, /product-detail__image--contain/);
  assert.match(html, /Baby-gym\.png/);
  for (const [hours, price] of [
    [2, 30],
    [3, 35],
    [4, 40],
    [5, 45],
  ]) {
    assert.match(html, new RegExp(`${hours} horas(?: \\(estándar\\))?: ₡${price}[.,\\s]000`));
  }
  assert.doesNotMatch(html, /Producto no encontrado|<table/);
  assert.match(html, /Después de 5 horas:/);
});

test('Baby Pop retains its approved price, duration and Baby Gym inclusion and has a working detail route', async () => {
  const { packages, getPackageBySlug } = await server.ssrLoadModule('/src/data/packages.js');
  const babyPop = getPackageBySlug('baby-pop');
  assert.equal(packages.filter((item) => item.id === 'baby-pop').length, 1);
  assert.equal(babyPop.price, 40000);
  assert.equal(babyPop.rentalHours, 3);
  assert.deepEqual(babyPop.inflatableIds, ['baby-gym']);
  assert.equal(babyPop.standardGameCount, 1);
  assert.equal(babyPop.requiresGameApproval, true);
  const html = await render('/src/App.jsx', '/paquetes/baby-pop');
  assert.match(html, /<h1>Baby Pop<\/h1>/);
  assert.match(html, /package-detail__image--contain/);
  assert.match(html, /₡40[.,\s]000/);
  assert.match(html, /Baby-gym\.png/);
  assert.doesNotMatch(html, /Paquete no encontrado/);
});

const approvedGames = {
  'dardos-gigantes': ['Dardos', 'standard', 5000],
  'lanzamiento-aros': ['Lanzamiento de Aros', 'standard', 5000],
  'tumba-latas': ['Tumba Latas', 'standard', 10000],
  cornhole: ['Lanzamiento de Sacos / Cornhole', 'standard', 10000],
  'balloon-pop': ['Balloon Pop', 'premium', 15000],
  'football-toss': ['Football Toss', 'premium', 15000],
  'mini-golf': ['Mini Golf', 'premium', 15000],
};

const productNames = (html) =>
  [...html.matchAll(/<h3 class="product-card__name">([^<]+)<\/h3>/g)].map((match) => match[1]);

test('catalog data has seven distinct approved games with centralized prices and standard/premium tiers', async () => {
  const { products, getProductsByCategory, getGamesByTier } =
    await server.ssrLoadModule('/src/data/products.js');
  const { pricing } = await server.ssrLoadModule('/src/data/pricing.js');
  const games = getProductsByCategory('game');
  assert.equal(games.length, 7);
  assert.equal(new Set(products.map((product) => product.id)).size, products.length);
  assert.equal(new Set(products.map((product) => product.slug)).size, products.length);
  for (const game of games) {
    assert.deepEqual([game.name, game.tier, game.price], approvedGames[game.id]);
    assert.equal(game.price, pricing.standaloneGames[game.id]);
  }
  assert.equal(getGamesByTier('standard').length, 4);
  assert.equal(getGamesByTier('premium').length, 3);
  for (const product of products) await access(new URL(`..${product.image}`, import.meta.url));
});

test('direct Juegos route renders only the seven games and approved tier filters', async () => {
  for (let attempt = 0; attempt < 2; attempt++) {
    const html = await render('/src/App.jsx', '/juegos');
    const names = productNames(html);
    assert.equal(names.length, 7);
    assert.deepEqual(
      [...names].sort(),
      Object.values(approvedGames)
        .map(([name]) => name)
        .sort(),
    );
    assert.match(html, /<h1 id="games-heading">Juegos PlayPop<\/h1>/);
    assert.match(html, /aria-label="Filtrar juegos"/);
    assert.match(html, />Estándar<\/button>/);
    assert.match(html, />Premium<\/button>/);
    assert.doesNotMatch(html, /Producto no encontrado|Página no encontrada/);
  }
});

test('direct Servicios route renders only two food services with unit prices, minimums and preparation', async () => {
  for (let attempt = 0; attempt < 2; attempt++) {
    const html = await render('/src/App.jsx', '/servicios');
    assert.deepEqual(productNames(html).sort(), ['Algodón de Azúcar', 'Palomitas de Maíz']);
    assert.equal((html.match(/Mínimo: 10 unidades\./g) || []).length, 2);
    assert.equal((html.match(/₡1[.,\s]000/g) || []).length, 2);
    assert.match(html, /Preparadas frescas durante el evento/);
    assert.match(html, /Preparado y empacado previamente/);
    assert.doesNotMatch(html, /Producto no encontrado|Página no encontrada/);
  }
});

test('Inflables route remains restricted to four inflatables', async () => {
  const { getProductsByCategory } = await server.ssrLoadModule('/src/data/products.js');
  const html = await render('/src/App.jsx', '/inflables');
  assert.deepEqual(
    productNames(html).sort(),
    getProductsByCategory('inflatable')
      .map((item) => item.name)
      .sort(),
  );
  assert.equal(productNames(html).length, 4);
});

test('navbar and footer share all seven distinct approved navigation links', async () => {
  const { navigationItems } = await server.ssrLoadModule('/src/config/navigation.js');
  assert.deepEqual(
    navigationItems.map(({ label, to }) => [label, to]).sort(),
    [
      ['Inicio', '/'],
      ['Inflables', '/inflables'],
      ['Juegos', '/juegos'],
      ['Paquetes', '/paquetes'],
      ['Servicios', '/servicios'],
      ['Galería', '/galeria'],
      ['Contacto', '/contacto'],
    ].sort(),
  );
  for (const path of [
    '/src/components/Navbar/PlayPopNavbar.jsx',
    '/src/components/layout/Footer/Footer.jsx',
  ]) {
    const html = await render(path);
    const navLinks = [
      ...html.matchAll(
        /<a\b[^>]*class="[^"]*(?:playpop-navbar__link|playpop-footer__link)[^"]*"[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g,
      ),
    ];
    assert.deepEqual(
      navLinks.map((match) => [match[2], match[1]]),
      navigationItems.map(({ label, to }) => [label, to]),
    );
  }
});

test('all game and food detail routes preserve quotation links and correct prices', async () => {
  const { getProductsByCategory, getProductRoute } =
    await server.ssrLoadModule('/src/data/products.js');
  const { formatColones } = await server.ssrLoadModule('/src/data/pricing.js');
  for (const product of [...getProductsByCategory('game'), ...getProductsByCategory('snack')]) {
    const html = await render('/src/App.jsx', getProductRoute(product));
    assert.ok(html.includes(`<h1>${product.name}</h1>`));
    assert.ok(html.includes(formatColones(product.price)));
    assert.ok(html.includes(`aria-label="Cotizar ${product.name} por WhatsApp"`));
    assert.match(html, /href="https:\/\/wa\.me\/50663892727\?text=/);
  }
});

test('existing SPA hosting fallback supports refreshed catalog URLs', async () => {
  const redirects = await readFile(new URL('../public/_redirects', import.meta.url), 'utf8');
  assert.match(redirects, /\/\*\s+\/index\.html\s+200/);
});

test('official contact configuration and methods use single approved email, social URLs and WhatsApp number', async () => {
  const { CONTACT_EMAIL, EMAIL_URL, WHATSAPP_URL, GENERAL_QUOTATION_URL } =
    await server.ssrLoadModule('/src/config/contact.js');
  const { socialLinks } = await server.ssrLoadModule('/src/config/social.js');
  const { default: methods } = await server.ssrLoadModule('/src/data/contactMethods.js');
  assert.equal(CONTACT_EMAIL, 'playpop.cr@gmail.com');
  assert.equal(EMAIL_URL, 'mailto:playpop.cr@gmail.com');
  assert.equal(WHATSAPP_URL, 'https://wa.me/50663892727');
  assert.deepEqual(
    socialLinks.map(({ id, href }) => [id, href]),
    [
      ['instagram', 'https://www.instagram.com/playpop.cr?utm_source=qr&stkn=MW1ldWxxNzlvNjJkdQ=='],
      ['facebook', 'https://www.facebook.com/share/1DPt46kjUP/?mibextid=wwXIfr'],
    ],
  );
  assert.deepEqual(
    methods.map(({ id }) => id),
    ['whatsapp', 'instagram', 'facebook', 'email'],
  );
  assert.equal(methods.find(({ id }) => id === 'email').href, EMAIL_URL);
  assert.equal(methods.find(({ id }) => id === 'whatsapp').href, GENERAL_QUOTATION_URL);
  const quotation = new URL(GENERAL_QUOTATION_URL);
  assert.equal(`${quotation.origin}${quotation.pathname}`, WHATSAPP_URL);
  assert.match(quotation.searchParams.get('text'), /Fecha del evento:|Ubicación del evento:/);
  for (const social of socialLinks)
    assert.equal(methods.find(({ id }) => id === social.id).href, social.href);
});

test('central inflatable pricing retains every approved tier and applies extra hours only after five', async () => {
  const { pricing, getInflatablePrice } = await server.ssrLoadModule('/src/data/pricing.js');
  const approved = {
    'castillo-inflable': { 2: 35000, 3: 40000, 4: 45000, 5: 50000 },
    'baby-gym': { 2: 30000, 3: 35000, 4: 40000, 5: 45000 },
    'inflable-tobogan': { 2: 45000, 3: 50000, 4: 55000, 5: 65000 },
    'inflable-deportivo-3-en-1': { 2: 50000, 3: 55000, 4: 60000, 5: 70000 },
  };
  assert.deepEqual(pricing.inflatables, approved);
  for (const [id, tiers] of Object.entries(approved)) {
    for (const [hours, price] of Object.entries(tiers))
      assert.equal(getInflatablePrice(id, Number(hours)), price);
    assert.equal(getInflatablePrice(id, 6), tiers[5] + 10000);
    assert.equal(getInflatablePrice(id, 7), tiers[5] + 20000);
  }
  assert.equal(getInflatablePrice('baby-gym', 1), null);
  assert.equal(getInflatablePrice('baby-gym', 2.5), null);
  assert.equal(getInflatablePrice('unknown', 3), null);
});

test('individual inflatable records, cards, details and quotation messages have no automatic complimentary-game offers', async () => {
  const { getProductsByCategory, getProductRoute } =
    await server.ssrLoadModule('/src/data/products.js');
  const { getQuotationUrl } = await server.ssrLoadModule('/src/config/contact.js');
  const { pricing, getInflatablePrice } = await server.ssrLoadModule('/src/data/pricing.js');
  const forbidden = /cortes[ií]a|juegos? gratis|gratuitos?|complimentary/i;
  for (const product of getProductsByCategory('inflatable')) {
    assert.ok(!('courtesyGameCount' in product));
    assert.doesNotMatch(JSON.stringify(product), forbidden);
    const detail = await render('/src/App.jsx', getProductRoute(product));
    assert.doesNotMatch(detail, forbidden);
    assert.doesNotMatch(detail, /<table/);
    for (const hours of pricing.inflatableDurations) {
      const url = getQuotationUrl({
        name: product.name,
        hours,
        price: getInflatablePrice(product.id, hours),
      });
      assert.doesNotMatch(new URL(url).searchParams.get('text'), forbidden);
    }
  }
  for (const path of [
    '/src/components/home/FeaturedInflatables/FeaturedInflatables.jsx',
    '/src/pages/InflatablesPage.jsx',
  ]) {
    assert.doesNotMatch(await render(path), forbidden);
  }
});

test('dedicated package game inclusions and quoted package prices remain intact', async () => {
  const { packages, getPackageBySlug } = await server.ssrLoadModule('/src/data/packages.js');
  const babyPop = getPackageBySlug('baby-pop');
  assert.equal(babyPop.price, 40000);
  assert.equal(babyPop.standardGameCount, 1);
  for (const item of packages) {
    const html = await render('/src/App.jsx', `/paquetes/${item.slug}`);
    for (const feature of item.features ?? []) assert.ok(html.includes(feature));
    for (const detail of item.details ?? []) assert.ok(html.includes(detail));
  }
  const experience = getPackageBySlug('playpop-experience');
  assert.equal(experience.courtesyGameCount, 2);
  assert.equal(experience.price, 90000);
  assert.ok(experience.features.includes('2 juegos de cortesía'));
});

test('merge preserves the customized navbar order and declares Juegos once', async () => {
  const { navigationItems } = await server.ssrLoadModule('/src/config/navigation.js');
  assert.deepEqual(
    navigationItems.map(({ label }) => label),
    ['Inicio', 'Inflables', 'Juegos', 'Servicios', 'Paquetes', 'Galería', 'Contacto'],
  );
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  const paths = [];
  const visit = (element) => {
    if (!React.isValidElement(element)) return;
    if (element.props.path) paths.push(element.props.path);
    React.Children.forEach(element.props.children, visit);
  };
  visit(App());
  assert.equal(paths.filter((path) => path === '/juegos').length, 1);
  assert.equal(new Set(paths).size, paths.length);
});

test('merge keeps the feature package catalog and its prices rather than silently repricing or retiring it', async () => {
  const { packages } = await server.ssrLoadModule('/src/data/packages.js');
  assert.deepEqual(
    packages.map(({ id, price }) => [id, price]),
    [
      ['baby-pop', 40000],
      ['super-pop', 70000],
      ['playpop-experience', 90000],
      ['doble-diversion', null],
      ['fiesta-deportiva', null],
      ['feria-playpop', null],
    ],
  );
  assert.equal(packages.find(({ id }) => id === 'super-pop').premiumGameCount, 2);
});
