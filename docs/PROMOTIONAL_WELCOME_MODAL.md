# Promotional welcome modal

The promotion is mounted once in `MainLayout`, alongside the existing page
outlet. It therefore works on homepage, catalog, detail, contact, gallery and
other routes without resetting on React Router navigation.

## Campaign configuration

Edit `src/config/promotions.js` to enable/disable or replace the campaign:

- ID: `nov-dec-2026`
- Enabled: `true`
- Dates: November 10 through December 10, 2026, inclusive
- Time zone: `America/Costa_Rica`
- Delay: 1000ms after the shared layout mounts
- Dismissal key: `playpop-promotion-nov-dec-2026-dismissed`
- Poster: existing `playpop-november-promotion.png`, 1199 × 1312px

Eligibility uses the Costa Rica calendar date with `Intl.DateTimeFormat`.
The campaign ends at `2026-12-11T06:00:00Z` (midnight starting December 11
in Costa Rica). An already open promotion closes automatically at expiry.

Opening does not write to storage. The close button, Escape and backdrop
click save dismissal; expiration does not. Normal refreshes and route changes
respect the saved campaign dismissal. Closing in another browser tab also
closes an open promotion via the storage event.

When localStorage is blocked or full, closing still works and an in-memory
fallback prevents reopening during the current application session. Persistent
dismissal across full reloads cannot be guaranteed when storage is unavailable
or when the visitor clears their browser data.

## Presentation and accessibility

React Bootstrap supplies the dialog semantics, backdrop, scroll locking,
focus restoration and Escape handling. A hidden title and descriptive image
alternative expose the poster to assistive technology without extra visible
copy. Initial focus goes to the 44 × 44px close button; Tab/Shift+Tab stay on
that sole control. Clicking the poster does not dismiss it.

The unchanged PNG renders with its natural ratio and `object-fit: contain`.
The dialog caps its width at 660px, fits its height when space permits, respects
safe-area insets, and uses an internally scrolling body on very short screens.
The 44px white circular close control overlays the poster 12px from its top
and right edges, outside the scrolling body. The poster meets the rounded modal
edges without header or body padding. Entrance motion is subtle
and disabled under `prefers-reduced-motion`.

If a photo/video viewer is already open, the welcome modal waits for it to
close rather than stacking dialogs. Existing product WhatsApp quotations are
unchanged; no additional promotional CTA was added.

## Verification

Run `npm test`, `npm run test:browser`, `npm run lint`, `npm run build`, and
`git diff --check`. Existing UI regressions seed the campaign dismissal key;
the dedicated `tests/browser/promotions.test.mjs` suite covers first visits.
It uses a fixed Date and a Tokyo browser time zone to verify that campaign
eligibility remains tied to Costa Rica.

Browser coverage includes initial display, storage written only on dismissal,
close button/Escape/backdrop, focus wrapping/restoration, body scroll locking,
refresh and SPA navigation, disabled/expired campaigns, expiry while open,
restricted storage, existing photo/video viewers, complete image ratio,
internal scrolling and close-button reachability.

Viewports: 320×640, 375×812, 390×844, 430×932, 768×1024, 1024×768, 1440×1000,
and landscape 640×320, 812×375, 844×390, 932×430, plus a short 320×200 case.
Screenshots are written to the system temporary directory as
`playpop-promotion-<width>x<height>.png`.

Physical notched-device safe areas, Safari/Firefox, and screen-reader behavior
should also be reviewed manually; Chromium emulation does not replace them.

Original poster SHA-256:
`03db6282e15a5347ea8f2451ec6c1fed30cec4d174f000f854ad6e8185a76fcb`.

## Implementation result

Branch: `feature/promotional-welcome-modal`. Initial status: only the provided
untracked `src/assets/images/playpop/promotions/` directory; no tracked edits.
No branch was created or switched, and the poster hash is unchanged.

Created: `src/config/promotions.js`, `src/utils/promotions.js`,
`src/components/promotions/PromotionModal.jsx`,
`src/components/promotions/PromotionModal.css`, `tests/promotions.test.mjs`,
`tests/browser/promotions.test.mjs`, and this document.

Modified: `src/layouts/MainLayout.jsx` (shared integration),
`tests/interactive-behavior.test.mjs` and `tests/browser/responsive.test.mjs`
(existing regression setup seeds campaign dismissal).

Results: lint, production build, formatting and diff checks passed; all 48
non-browser tests and all 45 Chromium browser tests passed. Desktop, mobile
and the short-viewport screenshots were visually inspected. All changes remain
local and uncommitted.
