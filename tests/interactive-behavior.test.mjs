import assert from 'node:assert/strict';
import { after, afterEach, before, test } from 'node:test';
import React, { act } from 'react';
import { JSDOM } from 'jsdom';
import { createServer } from 'vite';
import { MemoryRouter, useNavigate } from 'react-router-dom';

let server, createRoot, root, container, navigateTo;
let calls = [],
  pauses = [],
  playImplementation;

before(async () => {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/' });
  for (const name of [
    'window',
    'document',
    'HTMLElement',
    'Element',
    'Node',
    'MutationObserver',
    'Event',
    'MouseEvent',
  ]) {
    globalThis[name] = dom.window[name];
  }
  Object.defineProperty(globalThis, 'navigator', {
    value: dom.window.navigator,
    configurable: true,
  });
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  globalThis.getComputedStyle = dom.window.getComputedStyle;
  window.scrollTo = () => {};
  window.matchMedia = () => ({
    matches: false,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
  });
  window.requestAnimationFrame = (callback) => setTimeout(callback, 0);
  window.cancelAnimationFrame = clearTimeout;
  globalThis.ResizeObserver = class {
    observe() {}
    disconnect() {}
  };
  const media = window.HTMLMediaElement.prototype;
  Object.defineProperty(media, 'paused', {
    configurable: true,
    get() {
      return this.testPaused ?? true;
    },
  });
  Object.defineProperty(media, 'muted', {
    configurable: true,
    get() {
      return this.testMuted ?? false;
    },
    set(value) {
      this.testMuted = value;
      this.dispatchEvent(new Event('volumechange'));
    },
  });
  media.play = function () {
    calls.push({ video: this, src: this.getAttribute('src'), muted: this.muted });
    return playImplementation(this);
  };
  media.pause = function () {
    pauses.push({ video: this, src: this.getAttribute('src') });
    this.testPaused = true;
    this.dispatchEvent(new Event('pause'));
  };
  media.load = function () {};
  ({ createRoot } = await import('react-dom/client'));
  server = await createServer({
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: 'custom',
    ssr: { external: ['react', 'react-dom', 'react-router-dom', 'react-bootstrap'] },
  });
});

afterEach(async () => {
  if (root) await act(async () => root.unmount());
  root = null;
  container?.remove();
  document.querySelectorAll('.modal-backdrop').forEach((element) => element.remove());
});
after(async () => {
  await server?.close();
  window.close();
});

function finishPlaying(video) {
  video.testPaused = false;
  video.dispatchEvent(new Event('play'));
  return Promise.resolve();
}

async function mount(path, url = '/') {
  calls = [];
  pauses = [];
  playImplementation = finishPlaying;
  const { default: Component } = await server.ssrLoadModule(path);
  function NavigationHarness() {
    navigateTo = useNavigate();
    return null;
  }
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
  await act(async () => {
    root.render(
      React.createElement(
        MemoryRouter,
        { initialEntries: [url] },
        React.createElement(
          React.Fragment,
          null,
          React.createElement(Component),
          React.createElement(NavigationHarness),
        ),
      ),
    );
  });
}

async function click(element) {
  assert.ok(element, 'Expected a clickable control');
  await act(async () => element.dispatchEvent(new MouseEvent('click', { bubbles: true })));
}
const firstThumbnail = () => document.querySelector('.video-gallery-card');
const viewerVideo = () => document.querySelector('.modal video');
const control = (label) => document.querySelector(`[aria-label="${label}"]`);

// These tests mount the real gallery, Modal, player, router and detail components.
// Only browser media APIs are mocked; JSDOM does not decode MP4 or enforce autoplay policy.
test('thumbnail opens viewer, requests sound playback, reuses player on navigation, and resets on close/reopen', async () => {
  await mount('/src/components/gallery/GalleryGrid/GalleryGrid.jsx', '/galeria?filter=videos');
  assert.equal(calls.length, 0);
  assert.equal(document.querySelectorAll('video').length, 0);
  const thumbnail = firstThumbnail();
  await click(thumbnail);
  const player = viewerVideo();
  assert.ok(player);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].muted, false);
  const firstSrc = player.getAttribute('src');
  player.currentTime = 7;
  await click(control('Video siguiente'));
  assert.equal(viewerVideo(), player, 'Switching should reuse the media element');
  assert.notEqual(player.getAttribute('src'), firstSrc);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].muted, false);
  assert.equal(player.currentTime, 0);
  assert.ok(pauses.some((entry) => entry.video === player));
  await act(async () =>
    control('Video siguiente').dispatchEvent(
      new window.KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }),
    ),
  );
  assert.equal(player.getAttribute('src'), firstSrc);
  player.currentTime = 8;
  await click(control('Cerrar video'));
  assert.equal(player.paused, true);
  assert.equal(player.currentTime, 0);
  assert.equal(viewerVideo(), null);
  await click(thumbnail);
  assert.equal(viewerVideo().getAttribute('src'), firstSrc);
  assert.equal(viewerVideo().currentTime, 0);
  assert.equal(calls.length, 4);
});

test('audio rejection falls back to muted playback with a working sound toggle', async () => {
  await mount('/src/components/gallery/GalleryGrid/GalleryGrid.jsx', '/galeria?filter=videos');
  playImplementation = (video) =>
    video.muted
      ? finishPlaying(video)
      : Promise.reject(new DOMException('Audio blocked', 'NotAllowedError'));
  await click(firstThumbnail());
  const player = viewerVideo();
  assert.deepEqual(
    calls.map((call) => call.muted),
    [false, true],
  );
  assert.equal(player.muted, true);
  const sound = document.querySelector('.modal .playpop-video-player__sound');
  assert.match(sound.textContent, /Activar sonido/);
  await click(sound);
  assert.equal(player.muted, false);
  assert.match(sound.textContent, /Silenciar/);
});

test('both playback failures expose an accessible Play control and a user retry succeeds', async () => {
  await mount('/src/components/gallery/GalleryGrid/GalleryGrid.jsx', '/galeria?filter=videos');
  playImplementation = () => Promise.reject(new DOMException('Blocked', 'NotAllowedError'));
  await click(firstThumbnail());
  assert.equal(calls.length, 2);
  const retry = document.querySelector('.playpop-video-player__retry button');
  assert.match(retry.getAttribute('aria-label'), /Reproducir video:/);
  assert.match(
    document.querySelector('.playpop-video-player__retry').textContent,
    /El navegador no pudo/,
  );
  playImplementation = finishPlaying;
  await click(retry);
  assert.equal(viewerVideo().paused, false);
  assert.equal(document.querySelector('.playpop-video-player__retry'), null);
});

test('late rejection from a previous video cannot mute or restart the newly selected clip', async () => {
  await mount('/src/components/gallery/GalleryGrid/GalleryGrid.jsx', '/galeria?filter=videos');
  let rejectOld;
  playImplementation = () =>
    new Promise((_, reject) => {
      rejectOld = reject;
    });
  await click(firstThumbnail());
  playImplementation = finishPlaying;
  await click(control('Video siguiente'));
  const currentSrc = viewerVideo().getAttribute('src');
  await act(async () => rejectOld(new DOMException('Late blocked audio', 'NotAllowedError')));
  assert.equal(calls.length, 2);
  assert.equal(viewerVideo().getAttribute('src'), currentSrc);
  assert.equal(viewerVideo().muted, false);
  assert.equal(document.querySelector('.playpop-video-player__retry'), null);
});

test('closing with playback pending cancels fallback and no initial homepage autoplay occurs', async () => {
  await mount('/src/components/home/VideoReels/VideoReels.jsx');
  assert.equal(calls.length, 0);
  assert.equal(document.querySelectorAll('video').length, 3);
  assert.ok(
    [...document.querySelectorAll('video')].every(
      (video) => video.preload === 'none' && !video.autoplay,
    ),
  );
  await act(async () => root.unmount());
  root = null;
  container.remove();
  await mount('/src/components/gallery/GalleryGrid/GalleryGrid.jsx', '/galeria?filter=videos');
  let rejectPending;
  playImplementation = () =>
    new Promise((_, reject) => {
      rejectPending = reject;
    });
  await click(firstThumbnail());
  const player = viewerVideo();
  player.currentTime = 5;
  await click(control('Cerrar video'));
  await act(async () => rejectPending(new DOMException('Late failure', 'NotAllowedError')));
  assert.equal(calls.length, 1);
  assert.equal(player.currentTime, 0);
  assert.equal(player.paused, true);
  assert.equal(viewerVideo(), null);
});

test('real duration buttons update summary and encoded quotation for all inflatables; product navigation resets state', async () => {
  await mount('/src/App.jsx', '/inflables/baby-gym');
  const { getProductsByCategory, getProductRoute } =
    await server.ssrLoadModule('/src/data/products.js');
  const { getInflatablePrice, formatColones } = await server.ssrLoadModule('/src/data/pricing.js');
  for (const product of getProductsByCategory('inflatable')) {
    await act(async () => navigateTo(getProductRoute(product)));
    const selected = () =>
      document.querySelector('.product-detail__duration button[aria-pressed="true"]');
    assert.match(selected().textContent, /^3 horas \(estándar\)/);
    for (const hours of [2, 4, 5]) {
      const button = [...document.querySelectorAll('.product-detail__duration button')].find(
        (item) => item.textContent.startsWith(`${hours} horas`),
      );
      await click(button);
      assert.equal(selected(), button);
      const facts = [...document.querySelectorAll('.product-detail__fact dd')].map(
        (item) => item.textContent,
      );
      const amount = formatColones(getInflatablePrice(product.id, hours));
      assert.equal(facts[0], amount);
      assert.equal(facts[1], `${hours} horas`);
      const href = document.querySelector('.product-detail__whatsapp').getAttribute('href');
      const message = new URL(href).searchParams.get('text');
      assert.ok(message.includes(`Producto: ${product.name}`));
      assert.ok(message.includes(`Duración seleccionada: ${hours} horas`));
      assert.ok(message.includes(`Precio de referencia: ${amount}`));
      assert.match(message, /Fecha del evento:|Ubicación del evento:/);
      assert.match(message, /transporte se cotiza por separado/);
      assert.match(message, /no confirma disponibilidad ni reservación/);
      assert.ok(href.includes(encodeURIComponent(message)));
    }
    assert.equal(document.querySelector('.product-detail table'), null);
  }
  await act(async () => navigateTo('/juegos/mini-golf'));
  assert.equal(document.querySelector('.product-detail__duration'), null);
  assert.match(document.querySelector('.product-detail__facts').textContent, /15[.,\s]000/);
  await act(async () => navigateTo('/inflables/baby-gym'));
  assert.match(
    document.querySelector('.product-detail__duration button[aria-pressed="true"]').textContent,
    /^3 horas/,
  );
});

test('Contact page and footer expose approved links without duplicate contact methods', async () => {
  await mount('/src/App.jsx', '/contacto');
  const { socialLinks } = await server.ssrLoadModule('/src/config/social.js');
  const { EMAIL_URL, CONTACT_EMAIL, WHATSAPP_URL } =
    await server.ssrLoadModule('/src/config/contact.js');
  const cards = document.querySelectorAll('.contact-method-card');
  assert.equal(cards.length, 4);
  const contactSection = document.querySelector('.contact-methods');
  const footer = document.querySelector('footer');
  for (const section of [contactSection, footer]) {
    const emails = [...section.querySelectorAll('a')].filter(
      (link) => link.getAttribute('href') === EMAIL_URL,
    );
    assert.equal(emails.length, 1);
    assert.ok(section.textContent.includes(CONTACT_EMAIL));
    for (const social of socialLinks) {
      const links = [...section.querySelectorAll('a')].filter(
        (link) => link.getAttribute('href') === social.href,
      );
      assert.equal(links.length, 1);
      assert.equal(links[0].target, '_blank');
      assert.equal(links[0].rel, 'noopener noreferrer');
      assert.equal(links[0].getAttribute('aria-label'), social.ariaLabel);
      assert.ok(links[0].textContent.includes(section === footer ? social.name : 'Visitar perfil'));
    }
    assert.ok(
      [...section.querySelectorAll('a')].some((link) => link.href.startsWith(WHATSAPP_URL)),
    );
    assert.doesNotMatch(section.textContent, /Pendiente/);
  }
});

test('starting a homepage clip pauses another playing clip through actual player events', async () => {
  await mount('/src/components/home/VideoReels/VideoReels.jsx');
  const [first, second] = document.querySelectorAll('video');
  assert.equal(calls.length, 0);
  await act(async () => first.play());
  assert.equal(first.paused, false);
  await act(async () => second.play());
  assert.equal(first.paused, true);
  assert.equal(second.paused, false);
});

test('shared product cards contain promotional artwork while photo covers and vertical video format remain unchanged', async () => {
  const { readFile } = await import('node:fs/promises');
  const stylesheet = document.createElement('style');
  for (const path of [
    '../src/components/common/ProductCard/ProductCard.css',
    '../src/components/catalog/ProductDetail/ProductDetail.css',
    '../src/components/common/GalleryCard/GalleryCard.css',
    '../src/components/videos/Videos.css',
  ])
    stylesheet.textContent += await readFile(new URL(path, import.meta.url), 'utf8');
  document.head.append(stylesheet);
  try {
    await mount('/src/App.jsx', '/inflables');
    const images = document.querySelectorAll('.product-card__image');
    assert.equal(images.length, 4);
    for (const image of images) {
      assert.equal(getComputedStyle(image).objectFit, 'contain');
      assert.equal(getComputedStyle(image).objectPosition, 'center');
    }
    for (const card of document.querySelectorAll('.product-card')) {
      assert.equal(
        getComputedStyle(card.querySelector('.product-card__media')).aspectRatio,
        '4 / 3',
      );
      assert.equal(getComputedStyle(card.querySelector('.product-card__link')).marginTop, 'auto');
    }
    await act(async () => navigateTo('/juegos'));
    assert.equal(document.querySelectorAll('.product-card__image').length, 7);
    for (const image of document.querySelectorAll('.product-card__image'))
      assert.equal(getComputedStyle(image).objectFit, 'contain');
    await act(async () => navigateTo('/inflables/inflable-con-tobogan'));
    assert.equal(
      getComputedStyle(document.querySelector('.product-detail__image')).objectFit,
      'contain',
    );
    await act(async () => navigateTo('/galeria'));
    assert.equal(
      getComputedStyle(document.querySelector('.gallery-card__image')).objectFit,
      'cover',
    );
    assert.equal(
      getComputedStyle(document.querySelector('.video-gallery-card__visual')).aspectRatio,
      '9 / 16',
    );
  } finally {
    stylesheet.remove();
  }
});
