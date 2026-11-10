Browser regressions use Node's test runner and Playwright Chromium.

```sh
npm ci
npx playwright install chromium
npm run test:browser
```

The suite starts and stops its own Vite server. It checks homepage document
widths at 320, 375, 390, 430, 768, 1024, and 1440px with the existing global main
clipping disabled, internal reel scrolling, promotional image containment,
navbar default/hover/keyboard styles and mobile navigation, all inflatable
prices and quotations, photo navigation, actual video playback on opening,
and package navigation. It also measures Contact columns, equal desktop heights,
icon/title insets, bottom action alignment and contact destinations at all seven
widths, then checks card row dimensions, media ratios and document overflow on
the homepage, Inflables, Juegos, Paquetes, Servicios and both gallery filters.
Media playback is not mocked in this suite.

`npm test` continues to run the existing data, rendered-component and media
API tests without requiring a browser. Browser checks emulate viewport sizes;
they do not replace checks on physical mobile devices or Safari/Firefox.
