import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { chromium, expect } from '@playwright/test';
import { createServer } from 'vite';

let server, browser, baseURL;
before(async () => {
  server = await createServer({ server: { host: '127.0.0.1', port: 0 } });
  await server.listen();
  baseURL = server.resolvedUrls.local[0];
  browser = await chromium.launch();
});
after(async () => {
  await browser?.close();
  await server?.close();
});

// Existing layout/media regressions exercise the site after campaign dismissal.
// The dedicated promotion suite covers the first-visit experience separately.
async function regressionPage(options) {
  const page = await browser.newPage(options);
  await page.addInitScript(() => {
    localStorage.setItem('playpop-promotion-nov-dec-2026-dismissed', 'true');
  });
  return page;
}

const approved = [
  ['castillo-inflable', 'Castillo Inflable', [45000, 50000, 55000, 60000]],
  ['baby-gym', 'Baby Gym', [35000, 40000, 45000, 50000]],
  ['inflable-con-tobogan', 'Inflable con Tobogán', [55000, 60000, 65000, 70000]],
  ['inflable-deportivo-3-en-1', 'Inflable Deportivo 3 en 1', [55000, 60000, 65000, 70000]],
];
const money = (amount) => `₡${new Intl.NumberFormat('es-CR').format(amount)}`;

for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
  test(`homepage fits ${width}px while reels scroll internally, even without global clipping`, async () => {
    const page = await regressionPage({ viewport: { width, height: 900 } });
    try {
      await page.goto(baseURL);
      // A root-cause fix must work without the pre-existing main overflow clip.
      await page.addStyleTag({ content: 'main { overflow: visible !important; }' });
      await expect(page.locator('.video-reels__card')).toHaveCount(3);
      const dimensions = () =>
        page.evaluate(() => ({
          scroll: document.documentElement.scrollWidth,
          client: document.documentElement.clientWidth,
        }));
      assert.deepEqual(await dimensions(), { scroll: width, client: width });
      const track = page.locator('.video-reels__track');
      assert.ok(await track.evaluate((el) => el.scrollWidth > el.clientWidth));
      await page.getByRole('button', { name: 'Videos siguientes', exact: true }).click();
      await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
      assert.deepEqual(await dimensions(), { scroll: width, client: width });
      await track.evaluate((el) => {
        el.scrollLeft = el.scrollWidth;
      });
      assert.deepEqual(await dimensions(), { scroll: width, client: width });
      for (const [slug, , prices] of approved) {
        const card = page
          .locator('.product-card')
          .filter({ has: page.locator(`a[href="/inflables/${slug}"]`) });
        await expect(card).toContainText(`${money(prices[1])} / 3 horas`);
        const img = card.locator('img');
        await img.scrollIntoViewIfNeeded();
        await expect.poll(() => img.evaluate((el) => el.naturalWidth)).toBeGreaterThan(0);
        assert.equal(await img.evaluate((el) => getComputedStyle(el).objectFit), 'contain');
        assert.equal(
          await card
            .locator('.product-card__media')
            .evaluate((el) => getComputedStyle(el).aspectRatio),
          '4 / 3',
        );
      }
      assert.deepEqual(await dimensions(), { scroll: width, client: width });
    } finally {
      await page.close();
    }
  });
}

for (const width of [375, 1440]) {
  test(`navbar WhatsApp has visible default, hover and keyboard focus states at ${width}px`, async () => {
    const page = await regressionPage({ viewport: { width, height: 900 } });
    try {
      await page.goto(baseURL);
      const toggle = page.locator('.playpop-navbar .navbar-toggler');
      if (width < 992) await toggle.click();
      const button = page.locator('.playpop-navbar__whatsapp');
      await expect(button).toBeVisible();
      await expect(button).toHaveCSS('background-color', 'rgb(255, 255, 255)');
      await expect(button).toHaveCSS('color', 'rgb(25, 135, 84)');
      await expect(button).toHaveCSS('border-top-color', 'rgb(25, 135, 84)');
      await expect(button).toHaveCSS('border-top-width', '2px');
      await expect(button.locator('i')).toHaveCSS('color', 'rgb(25, 135, 84)');
      assert.ok((await button.boundingBox()).height >= 44);
      assert.ok((await button.getAttribute('href')).startsWith('https://wa.me/50663892727?text='));
      await button.hover();
      await expect(button).toHaveCSS('background-color', 'rgb(25, 135, 84)');
      await expect(button).toHaveCSS('color', 'rgb(255, 255, 255)');
      await expect(button.locator('i')).toHaveCSS('color', 'rgb(255, 255, 255)');
      await page.mouse.move(0, 0);
      await button.focus();
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Tab');
      await expect(button).toBeFocused();
      await expect(button).toHaveCSS('outline-style', 'solid');
      await expect(button).toHaveCSS('outline-width', '3px');
      await expect(button).toHaveCSS('outline-color', 'rgb(25, 135, 84)');
      if (width < 992) {
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
        await page
          .locator('.playpop-navbar__link')
          .filter({ hasText: /^Juegos$/ })
          .click();
        await expect(page).toHaveURL(/\/juegos$/);
        await expect(page.locator('#playpop-navigation')).toBeHidden();
      }
    } finally {
      await page.close();
    }
  });
}

test('catalog and all four detail routes preserve exact pricing and dynamic encoded quotations', async () => {
  const page = await regressionPage({ viewport: { width: 390, height: 900 } });
  try {
    await page.goto(`${baseURL}inflables`);
    for (const [slug, , prices] of approved) {
      const card = page
        .locator('.product-card')
        .filter({ has: page.locator(`a[href="/inflables/${slug}"]`) });
      await expect(card).toContainText(`${money(prices[1])} / 3 horas`);
    }
    for (const [slug, name, prices] of approved) {
      await page.goto(`${baseURL}inflables/${slug}`);
      await expect(page.locator('h1')).toHaveText(name);
      const [, , capacity] = flipProducts.find(([productSlug]) => productSlug === slug);
      await expect(page.locator('main')).toContainText(capacity);
      const buttons = page.locator('.product-detail__duration button');
      await expect(buttons).toHaveCount(4);
      await expect(page.locator('.product-detail__duration [aria-pressed="true"]')).toContainText(
        '3 horas (estándar)',
      );
      for (const hours of [3, 2, 4, 5]) {
        await buttons.filter({ hasText: new RegExp(`^${hours} horas`) }).click();
        const price = money(prices[hours - 2]);
        await expect(page.locator('.product-detail__fact dd').nth(0)).toHaveText(price);
        await expect(page.locator('.product-detail__fact dd').nth(1)).toHaveText(`${hours} horas`);
        const href = await page.locator('.product-detail__whatsapp').getAttribute('href');
        const url = new URL(href);
        const message = url.searchParams.get('text');
        assert.equal(url.origin + url.pathname, 'https://wa.me/50663892727');
        for (const text of [
          `Producto: ${name}`,
          `Duración seleccionada: ${hours} horas`,
          `Precio de referencia: ${price}`,
          'Fecha del evento:',
          'Ubicación del evento:',
          'El transporte se cotiza por separado',
          'no confirma disponibilidad ni reservación',
        ])
          assert.ok(message.includes(text));
        assert.ok(href.endsWith(encodeURIComponent(message)));
        assert.doesNotMatch(message, /cortes[ií]a|juegos? gratis|gratuitos?/i);
      }
      const image = page.locator('.product-detail__image');
      await expect.poll(() => image.evaluate((el) => el.naturalWidth)).toBeGreaterThan(0);
      await expect(image).toHaveCSS('object-fit', 'contain');
      if (slug === 'baby-gym') await expect(image).toHaveAttribute('src', /Baby-gym\.png/);
    }
  } finally {
    await page.close();
  }
});

test('photo collections, video viewer playback and package detail navigation remain functional', async () => {
  const page = await regressionPage();
  try {
    await page.goto(`${baseURL}galeria?filter=photos`);
    await expect(page.locator('.gallery-card')).toHaveCount(4);
    await page.locator('.gallery-card button').first().click();
    const photo = page.locator('.event-viewer__image');
    const firstSrc = await photo.getAttribute('src');
    await page.getByRole('button', { name: 'Fotografía siguiente' }).click();
    await expect(photo).not.toHaveAttribute('src', firstSrc);
    await page.getByRole('button', { name: 'Cerrar momentos' }).click();
    await page.goto(`${baseURL}galeria?filter=videos`);
    await expect(page.locator('.video-gallery-card')).toHaveCount(6);
    await expect(page.locator('.gallery-card')).toHaveCount(0);
    await page.locator('.video-gallery-card').first().click();
    const video = page.locator('.modal video');
    await expect(video).toHaveAttribute('controls', '');
    await expect.poll(() => video.evaluate((el) => !el.paused && el.currentTime > 0)).toBe(true);
    const src = await video.getAttribute('src');
    await page.getByRole('button', { name: 'Video siguiente', exact: true }).click();
    await expect(video).not.toHaveAttribute('src', src);
    await page.getByRole('button', { name: 'Cerrar video' }).click();
    await expect(video).toHaveCount(0);
    await page.goto(`${baseURL}paquetes`);
    await page.locator('a[href="/paquetes/baby-pop"]').click();
    await expect(page.locator('h1')).toHaveText('Baby Pop');
    await expect(page.locator('main')).toContainText(money(40000));
    await expect(page.locator('main')).toContainText('Baby Gym');
  } finally {
    await page.close();
  }
});

const layoutWidths = [320, 375, 390, 430, 768, 1024, 1440];
const close = (actual, expected, label) =>
  assert.ok(Math.abs(actual - expected) <= 1, `${label}: ${actual} versus ${expected}`);

async function measureCards(page, selector, parts = []) {
  return page.locator(selector).evaluateAll(
    (cards, selectors) =>
      cards.map((card) => {
        const { x, y, width, height, bottom } = card.getBoundingClientRect();
        return {
          x,
          y,
          width,
          height,
          bottom,
          parts: selectors.map((selector) => {
            const element = card.querySelector(selector);
            if (!element) return null;
            const rect = element.getBoundingClientRect();
            return {
              x: rect.x,
              y: rect.y,
              width: rect.width,
              height: rect.height,
              bottom: rect.bottom,
            };
          }),
        };
      }),
    parts,
  );
}

function assertRows(cards, label) {
  for (const card of cards) {
    close(card.width, cards[0].width, `${label} widths`);
    for (const peer of cards.filter((item) => Math.abs(item.y - card.y) < 1)) {
      close(peer.height, card.height, `${label} row heights`);
      card.parts.forEach((part, index) => {
        if (part && peer.parts[index])
          close(part.bottom, peer.parts[index].bottom, `${label} aligned part ${index}`);
      });
    }
  }
}

for (const width of layoutWidths) {
  test(`contact symmetry and repeated card groups at ${width}px`, async () => {
    const page = await regressionPage({
      viewport: { width, height: 1000 },
      reducedMotion: 'reduce',
    });
    try {
      await page.goto(`${baseURL}contacto`);
      await page.evaluate(() => document.fonts.ready);
      await page.addStyleTag({ content: 'main { overflow: visible !important; }' });
      const cards = await measureCards(page, '.contact-method-card', [
        '.contact-method-card__icon',
        '.contact-method-card__title',
        '.contact-method-card__action',
      ]);
      assert.equal(cards.length, 4);
      assertRows(cards, 'contact');
      assert.equal(new Set(cards.map((card) => Math.round(card.x))).size, width >= 768 ? 2 : 1);
      assert.equal(new Set(cards.map((card) => Math.round(card.y))).size, width >= 768 ? 2 : 4);
      if (width >= 768) {
        cards.forEach((card) => close(card.height, cards[0].height, 'all contact heights'));
        close(
          cards[1].x - cards[0].x - cards[0].width,
          cards[2].y - cards[0].bottom,
          'contact gaps',
        );
      }
      for (const card of cards) {
        close(card.parts[0].y - card.y, cards[0].parts[0].y - cards[0].y, 'icon inset');
        close(card.parts[1].y - card.y, cards[0].parts[1].y - cards[0].y, 'title inset');
        close(
          card.bottom - card.parts[2].bottom,
          cards[0].bottom - cards[0].parts[2].bottom,
          'action bottom inset',
        );
      }
      const { default: methods } = await server.ssrLoadModule('/src/data/contactMethods.js');
      for (const [index, method] of methods.entries()) {
        await expect(page.locator('.contact-method-card__action').nth(index)).toHaveAttribute(
          'href',
          method.href,
        );
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);

      for (const [route, groups] of [
        [
          '',
          [
            ['.featured-inflatables .product-card', '.product-card__link'],
            ['.featured-packages .package-card', '.package-card__link'],
            ['.gallery-preview .gallery-card'],
          ],
        ],
        ['inflables', [['.inflatables-grid .product-card', '.product-card__link']]],
        ['juegos', [['.product-card', '.product-card__link']]],
        [
          'paquetes',
          [
            ['.package-card', '.package-card__link'],
            ['.product-card', '.product-card__link'],
          ],
        ],
        ['servicios', [['.product-card', '.product-card__link']]],
        ['galeria?filter=photos', [['.gallery-card', '.gallery-card__body .btn']]],
        ['galeria?filter=videos', [['.video-gallery-card', '.video-gallery-card__action']]],
      ]) {
        await page.goto(`${baseURL}${route}`);
        await page.evaluate(() => document.fonts.ready);
        await page.addStyleTag({ content: 'main { overflow: visible !important; }' });
        for (const [selector, action] of groups) {
          const measured = await measureCards(page, selector, action ? [action] : []);
          assert.ok(measured.length >= 2, `${route} ${selector} has repeated cards`);
          assertRows(measured, `${route} ${selector}`);
        }
        for (const [selector, ratio, fit] of [
          ['.product-card__image', 4 / 3, 'contain'],
          ['.gallery-card__image', 4 / 3, 'cover'],
          ['.video-gallery-card__visual', 9 / 16, null],
        ]) {
          for (const media of await page.locator(selector).all()) {
            const box = await media.boundingBox();
            assert.ok(Math.abs(box.width / box.height - ratio) < 0.01, `${selector} ratio`);
            if (fit) await expect(media).toHaveCSS('object-fit', fit);
          }
        }
        assert.equal(
          await page.evaluate(() => document.documentElement.scrollWidth),
          width,
          `${route} document width`,
        );
      }
    } finally {
      await page.close();
    }
  });
}

for (const width of layoutWidths) {
  test(`featured product spacing follows content and token rhythm at ${width}px`, async () => {
    const page = await regressionPage({
      viewport: { width, height: 1000 },
      reducedMotion: 'reduce',
    });
    try {
      await page.goto(baseURL);
      const cards = page.locator('.featured-inflatables .product-card');
      await expect(cards).toHaveCount(4);
      const metrics = await cards.evaluateAll((elements) =>
        elements.map((card) => {
          const body = card.querySelector('.product-card__body');
          const title = card.querySelector('.product-card__name');
          const price = card.querySelector('.product-card__description');
          const link = card.querySelector('.product-card__link');
          const bodyRect = body.getBoundingClientRect();
          const titleRect = title.getBoundingClientRect();
          const priceRect = price.getBoundingClientRect();
          const linkRect = link.getBoundingClientRect();
          return {
            paragraphCount: body.querySelectorAll('p').length,
            padding: parseFloat(getComputedStyle(body).paddingLeft),
            titlePriceGap: priceRect.top - titleRect.bottom,
            priceActionGap: linkRect.top - priceRect.bottom,
            priceHeight: priceRect.height,
            priceLineHeight: parseFloat(getComputedStyle(price).lineHeight),
            bottomPadding: bodyRect.bottom - linkRect.bottom,
            actionHeight: linkRect.height,
            priceColor: getComputedStyle(card.querySelector('.product-card__price')).color,
            durationColor: getComputedStyle(card.querySelector('.product-card__duration')).color,
          };
        }),
      );
      for (const metric of metrics) {
        assert.equal(
          metric.paragraphCount,
          1,
          'featured cards show price without long catalog descriptions',
        );
        assert.equal(metric.padding, 16);
        close(metric.titlePriceGap, 4, 'title-to-price gap');
        assert.ok(
          metric.priceActionGap >= 3 && metric.priceActionGap <= 16,
          `compact price-to-action gap: ${metric.priceActionGap}`,
        );
        close(metric.priceHeight, metric.priceLineHeight, 'price occupies one natural line');
        close(metric.bottomPadding, 12, 'action bottom padding');
        assert.ok(metric.actionHeight >= 44, 'touch target');
        assert.notEqual(
          metric.priceColor,
          metric.durationColor,
          'price has stronger contrast than duration',
        );
      }
      if (width === 390 || width === 1440) {
        const { tmpdir } = await import('node:os');
        const { join } = await import('node:path');
        await page
          .locator('.featured-inflatables')
          .screenshot({ path: join(tmpdir(), `playpop-featured-spacing-${width}.png`) });
      }
      // The catalog back and detail page share the short description.
      const { getProductBySlug } = await server.ssrLoadModule('/src/data/products.js');
      const babyGym = getProductBySlug('baby-gym');
      await page.goto(`${baseURL}inflables`);
      await expect(page.locator('.product-card').filter({ hasText: 'Baby Gym' })).toContainText(
        babyGym.shortDescription,
      );
      await page.goto(`${baseURL}inflables/baby-gym`);
      await expect(page.locator('main')).toContainText(babyGym.shortDescription);
      await expect(page.locator('main')).toContainText(babyGym.description);
    } finally {
      await page.close();
    }
  });
}

const flipProducts = [
  ['baby-gym', 'Baby Gym', 'Hasta 8 niños simultáneamente'],
  ['castillo-inflable', 'Castillo Inflable 3×3', 'Hasta 10 niños simultáneamente'],
  ['inflable-con-tobogan', 'Inflable con Tobogán 5×4', 'Hasta 12 niños simultáneamente'],
  ['inflable-deportivo-3-en-1', 'Inflable Deportivo 3 en 1', 'Multiples jugadores.'],
];
const flipCard = (page, name) =>
  page
    .locator('.product-card--flip')
    .filter({ has: page.getByRole('heading', { name, exact: true }) });

for (const width of layoutWidths) {
  test(`inflatable cards keep aligned fronts and stable backs at ${width}px`, async () => {
    const page = await regressionPage({
      viewport: { width, height: 900 },
      hasTouch: true,
      isMobile: width < 768,
      reducedMotion: 'reduce',
    });
    try {
      for (const route of ['', 'inflables']) {
        await page.goto(`${baseURL}${route}`);
        await page.addStyleTag({ content: 'main { overflow: visible !important; }' });
        const selector = '.product-card--flip';
        await expect(page.locator(selector)).toHaveCount(4);
        const beforeFlip = await measureCards(page, selector, [
          '.product-card__media',
          '.product-card__name',
          '.product-card__description',
          '.product-card__link',
        ]);
        assertRows(beforeFlip, 'inflatable fronts');
        for (const [slug, name, capacity] of flipProducts) {
          const [, , prices] = approved.find(([approvedSlug]) => approvedSlug === slug);
          const card = flipCard(page, name);
          const button = card.getByRole('button');
          const heading = card.getByRole('heading', { name, exact: true });
          const link = card.getByRole('link', { name: `Ver detalles de ${name}`, exact: true });
          const front = card.locator('.product-card__face').first();
          const back = card.locator('.product-card__face--back');
          const size = await card.boundingBox();
          await expect(heading).toHaveCount(1);
          await expect(front).toContainText(`${money(prices[1])} / 3 horas`);
          await expect(link).toHaveAttribute('href', `/inflables/${slug}`);
          await expect(back).toHaveAttribute('inert', '');
          await expect(back).toHaveAttribute('aria-hidden', 'true');
          await expect(card.locator('.product-card__rotor')).toHaveCSS('transition-duration', '0s');
          await expect(button).toHaveText('Girar');
          await expect(button).toHaveCSS('clip-path', 'none');
          await button.tap();
          await expect(card).toHaveAttribute('data-flipped', 'true');
          await expect(button).toHaveText('Volver');
          await expect(heading).toHaveCount(1);
          await expect(front).toHaveAttribute('inert', '');
          await expect(front).toHaveAttribute('aria-hidden', 'true');
          const badge = back.locator('.product-card__capacity');
          await expect(badge).toHaveText(capacity);
          const content = await back.locator('.product-card__back-content').boundingBox();
          const title = await heading.boundingBox();
          const summary = await back.locator('.product-card__summary').boundingBox();
          const capacityBox = await badge.boundingBox();
          const action = await link.boundingBox();
          for (const box of [title, summary, capacityBox]) {
            close(box.x + box.width / 2, content.x + content.width / 2, 'centered back element');
            assert.ok(box.width <= content.width + 1, 'content fits horizontally');
          }
          close(
            (title.y + capacityBox.y + capacityBox.height) / 2,
            content.y + content.height / 2,
            'vertically centered content',
          );
          close(summary.y - title.y - title.height, 12, 'description spacing');
          close(capacityBox.y - summary.y - summary.height, 16, 'capacity spacing');
          assert.ok(action.y - capacityBox.y - capacityBox.height >= 12, 'bottom action clearance');
          await expect(link).toHaveAttribute('href', `/inflables/${slug}`);
          const flippedSize = await card.boundingBox();
          close(flippedSize.height, size.height, 'flip height');
          close(flippedSize.width, size.width, 'flip width');
          const frontSize = await front.boundingBox();
          const backSize = await back.boundingBox();
          close(backSize.height, frontSize.height, 'face heights');
          close(backSize.width, frontSize.width, 'face widths');
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
          await button.tap();
          await expect(card).toHaveAttribute('data-flipped', 'false');
        }
      }
      const babyGym = flipCard(page, 'Baby Gym');
      await babyGym.getByRole('button').tap();
      await babyGym.getByRole('link').tap();
      await expect(page).toHaveURL(/\/inflables\/baby-gym$/);
      await expect(page.locator('main')).toContainText(flipProducts[0][2]);
      await page.goto(`${baseURL}inflables`);
      await babyGym.getByRole('link').tap();
      await expect(page).toHaveURL(/\/inflables\/baby-gym$/);
    } finally {
      await page.close();
    }
  });
}

test('mouse hover flips and resets, keyboard can flip and reach the active details link', async () => {
  const page = await regressionPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(`${baseURL}inflables`);
    const card = flipCard(page, 'Baby Gym');
    const button = card.getByRole('button');
    const frontLink = card.locator('.product-card__face').first().getByRole('link');
    const backLink = card.locator('.product-card__face--back').getByRole('link');
    await expect(card.locator('.product-card__rotor')).toHaveCSS('transition-duration', '0.5s');
    await expect(button).toHaveCSS('clip-path', 'inset(50%)');
    await expect(button).toHaveCSS('pointer-events', 'none');
    await card.locator('img').hover();
    await expect(card).toHaveAttribute('data-flipped', 'true');
    await expect(frontLink).toHaveCount(0);
    await page.mouse.move(0, 0);
    await expect(card).toHaveAttribute('data-flipped', 'false');
    await button.focus();
    await expect(button).toHaveCSS('clip-path', 'none');
    await expect(button).toHaveCSS('outline-style', 'solid');
    await button.press('Enter');
    await expect(card).toHaveAttribute('data-flipped', 'true');
    await expect(button).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(backLink).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(button).toBeFocused();
    await button.press('Space');
    await expect(card).toHaveAttribute('data-flipped', 'false');
    await expect(backLink).toHaveCount(0);
    await page.keyboard.press('Tab');
    await expect(frontLink).toBeFocused();
    await frontLink.press('Enter');
    await expect(page).toHaveURL(/\/inflables\/baby-gym$/);
    await page.goto(`${baseURL}inflables`);
    await frontLink.click();
    await expect(page).toHaveURL(/\/inflables\/baby-gym$/);
  } finally {
    await page.close();
  }
});
