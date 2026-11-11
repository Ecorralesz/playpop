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
        assert.equal(metric.padding, width < 576 ? 20 : 24);
        close(metric.titlePriceGap, 12, 'title-to-price gap');
        assert.ok(
          metric.priceActionGap >= 19 && metric.priceActionGap <= 43,
          `compact price-to-action gap: ${metric.priceActionGap}`,
        );
        close(metric.priceHeight, metric.priceLineHeight, 'price occupies one natural line');
        close(metric.bottomPadding, metric.padding, 'action bottom padding');
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
      // Full descriptions remain available in the catalog and product detail.
      const { getProductBySlug } = await server.ssrLoadModule('/src/data/products.js');
      const babyGym = getProductBySlug('baby-gym');
      await page.goto(`${baseURL}inflables`);
      await expect(page.locator('.product-card').filter({ hasText: 'Baby Gym' })).toContainText(
        babyGym.description,
      );
      await page.goto(`${baseURL}inflables/baby-gym`);
      await expect(page.locator('main')).toContainText(babyGym.description);
    } finally {
      await page.close();
    }
  });
}
