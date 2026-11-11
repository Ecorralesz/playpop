import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { chromium, expect } from '@playwright/test';
import { createServer } from 'vite';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const key = 'playpop-promotion-nov-dec-2026-dismissed';
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
async function visit({
  route = '',
  width = 1280,
  height = 900,
  date = '2026-11-15T18:00:00Z',
  storageBlocked = false,
  disabled = false,
} = {}) {
  const page = await browser.newPage({
    viewport: { width, height },
    reducedMotion: 'reduce',
    timezoneId: 'Asia/Tokyo',
  });
  await page.clock.setFixedTime(new Date(date));
  if (storageBlocked)
    await page.addInitScript(() =>
      Object.defineProperty(window, 'localStorage', {
        get() {
          throw new DOMException('Storage blocked', 'SecurityError');
        },
      }),
    );
  if (disabled)
    await page.route('**/src/config/promotions.js*', async (route) => {
      const response = await route.fetch();
      await route.fulfill({
        response,
        body: (await response.text()).replace('enabled: true', 'enabled: false'),
      });
    });
  await page.goto(`${baseURL}${route}`);
  return page;
}
const promotion = (page) =>
  page.getByRole('dialog', {
    name: 'Promoción PlayPop de noviembre a diciembre de 2026',
    exact: true,
  });
const close = (page) => page.getByRole('button', { name: 'Cerrar promoción', exact: true });
const readDismissal = (page) => page.evaluate((key) => localStorage.getItem(key), key);

// Actual Bootstrap dialogs, real browser focus/scroll behavior and original PNG; no overlay mocks.
test('first visit delays display, focuses/traps the dialog, and only explicit closure persists dismissal', async () => {
  const page = await visit();
  try {
    const previous = page.locator('.playpop-navbar__brand');
    await previous.focus();
    await expect(promotion(page)).toHaveCount(0);
    await expect(promotion(page)).toBeVisible();
    await expect(close(page)).toBeFocused();
    assert.equal(await readDismissal(page), null);
    assert.equal(await page.evaluate(() => getComputedStyle(document.body).overflow), 'hidden');
    await page.keyboard.press('Tab');
    await expect
      .poll(() => promotion(page).evaluate((el) => el.contains(document.activeElement)))
      .toBe(true);
    await page.keyboard.press('Shift+Tab');
    await expect
      .poll(() => promotion(page).evaluate((el) => el.contains(document.activeElement)))
      .toBe(true);
    await page.locator('.promotion-modal__poster').click();
    await expect(promotion(page)).toBeVisible();
    assert.equal(await readDismissal(page), null);
    // Refreshing before dismissal must not silently mark the campaign as dismissed.
    await page.reload();
    await expect(promotion(page)).toBeVisible();
    assert.equal(await readDismissal(page), null);
    await close(page).click();
    await expect(promotion(page)).toHaveCount(0);
    assert.equal(await readDismissal(page), 'true');
    assert.notEqual(await page.evaluate(() => getComputedStyle(document.body).overflow), 'hidden');
    await page.reload();
    await page.waitForTimeout(1250);
    await expect(promotion(page)).toHaveCount(0);
  } finally {
    await page.close();
  }
});

test('Escape restores focus and dismissal survives SPA navigation and reload on deep routes', async () => {
  const page = await visit({ route: 'contacto' });
  try {
    const previous = page.locator('.playpop-navbar__brand');
    await previous.focus();
    await expect(promotion(page)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(promotion(page)).toHaveCount(0);
    await expect(previous).toBeFocused();
    await page.locator('.playpop-navbar__link[href="/inflables"]').click();
    await page.waitForTimeout(1250);
    await expect(promotion(page)).toHaveCount(0);
    await page.locator('.product-card__link').first().click();
    await page.reload();
    await page.waitForTimeout(1250);
    await expect(promotion(page)).toHaveCount(0);
    assert.equal(await readDismissal(page), 'true');
  } finally {
    await page.close();
  }
});

test('backdrop closes and persists; restricted storage still allows closing and subsequent navigation', async () => {
  for (const storageBlocked of [false, true]) {
    const page = await visit({ route: 'inflables/baby-gym', storageBlocked });
    try {
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await expect(promotion(page)).toBeVisible();
      await page.locator('.promotion-modal').click({ position: { x: 2, y: 2 } });
      await expect(promotion(page)).toHaveCount(0);
      if (!storageBlocked) assert.equal(await readDismissal(page), 'true');
      await page.locator('.playpop-navbar__link[href="/juegos"]').click();
      await page.waitForTimeout(1250);
      await expect(promotion(page)).toHaveCount(0);
      assert.deepEqual(errors, []);
    } finally {
      await page.close();
    }
  }
});

for (const options of [
  { date: '2026-11-10T05:59:59Z' },
  { date: '2026-12-11T06:00:00Z' },
  { disabled: true },
]) {
  test(`ineligible promotion stays hidden: ${JSON.stringify(options)}`, async () => {
    const page = await visit(options);
    try {
      await page.waitForTimeout(1250);
      await expect(promotion(page)).toHaveCount(0);
      assert.equal(await readDismissal(page), null);
    } finally {
      await page.close();
    }
  });
}

test('campaign uses the configured inclusive Costa Rica end date and closes automatically at expiry', async () => {
  const page = await visit({ date: '2026-12-11T05:59:59Z' });
  try {
    await expect(promotion(page)).toBeVisible();
    await page.clock.setFixedTime(new Date('2026-12-11T06:00:00Z'));
    await expect(promotion(page)).toHaveCount(0);
    assert.equal(await readDismissal(page), null, 'expiry must not save a user dismissal');
  } finally {
    await page.close();
  }
});

test('welcome promotion waits for an existing photo viewer and leaves photo/video behavior intact', async () => {
  const page = await visit({ route: 'galeria?filter=photos' });
  try {
    await page.locator('.gallery-card button').first().click();
    await page.waitForTimeout(1250);
    await expect(promotion(page)).toHaveCount(0);
    await expect(page.locator('.event-viewer__image')).toBeVisible();
    await page.getByRole('button', { name: 'Fotografía siguiente' }).click();
    await page.getByRole('button', { name: 'Cerrar momentos' }).click();
    await expect(promotion(page)).toBeVisible();
    await close(page).click();
    await page.getByRole('button', { name: 'Videos', exact: true }).click();
    await page.locator('.video-gallery-card').first().click();
    await expect
      .poll(() =>
        page.locator('.modal video').evaluate((video) => !video.paused && video.currentTime > 0),
      )
      .toBe(true);
  } finally {
    await page.close();
  }
});

for (const [width, height] of [
  [320, 640],
  [375, 812],
  [390, 844],
  [430, 932],
  [768, 1024],
  [1024, 768],
  [1440, 1000],
  [640, 320],
  [812, 375],
  [844, 390],
  [932, 430],
  [320, 200],
]) {
  test(`complete poster and accessible close control fit ${width}×${height}`, async () => {
    const page = await visit({ width, height, route: 'servicios' });
    try {
      await expect(promotion(page)).toBeVisible();
      const image = page.locator('.promotion-modal__poster');
      await expect.poll(() => image.evaluate((el) => el.naturalWidth)).toBe(1199);
      await expect(image).toHaveCSS('object-fit', 'contain');
      const box = await image.boundingBox();
      assert.ok(Math.abs(box.width / box.height - 1199 / 1312) < 0.001);
      assert.ok(box.x >= 0 && box.x + box.width <= width);
      const content = await page.locator('.promotion-modal .modal-content').boundingBox();
      const near = (actual, expected, message) =>
        assert.ok(Math.abs(actual - expected) < 1, `${message}: ${actual} vs ${expected}`);
      near(box.x, content.x, 'poster meets left edge');
      near(box.y, content.y, 'poster meets top edge without a header spacer');
      near(box.width, content.width, 'poster meets right edge');
      const button = await close(page).boundingBox();
      near(button.y - content.y, 12, 'close control overlays image 12px from top');
      near(content.x + content.width - button.x - button.width, 12, 'close control right inset');
      assert.ok(button.width >= 44 && button.height >= 44);
      assert.ok(button.y >= 0 && button.y + button.height <= height);
      assert.ok(button.x >= 0 && button.x + button.width <= width);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
      const body = page.locator('.promotion-modal__body');
      if (box.y + box.height > height - 8) {
        assert.ok(
          await body.evaluate((el) => el.scrollHeight > el.clientHeight),
          'short viewports scroll internally',
        );
        await body.evaluate((el) => {
          el.scrollTop = el.scrollHeight;
        });
        const end = await image.boundingBox();
        assert.ok(end.y + end.height <= height, 'poster bottom reachable');
        await expect(close(page)).toBeInViewport();
      } else {
        near(box.height, content.height, 'no empty space below poster');
        assert.ok(box.y >= 0 && box.y + box.height <= height);
      }
      if (width === 390 || width === 1440 || height === 200)
        await page.screenshot({ path: join(tmpdir(), `playpop-promotion-${width}x${height}.png`) });
      await close(page).click();
      await expect(promotion(page)).toHaveCount(0);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
    } finally {
      await page.close();
    }
  });
}
