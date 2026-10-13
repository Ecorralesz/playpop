# Local regression repairs

## Evidence and scope

At inspection, `feature/playpop-video-reels` HEAD and local `develop` both pointed
to `49530ae`. Approved contact and catalog work was on local
`feature/pricing-games-services-update`: `79ad452` introduced the interactive
product selector, and `03fa660` contained the official contact configuration.
Those commits were not ancestors of this branch or local `develop`.

The old contact config contained only WhatsApp; social config was absent; the
footer and Contact page still rendered pending contact placeholders. This
establishes a local branch baseline/synchronization gap, not a video component
having overwritten contact configuration. Remote/deployed branch state was not
fetched or changed. No merge, commit, push, or PR was performed.

The old product detail implementation lacked duration state. The earlier local
Baby Gym repair added a static price table, which did not restore the approved
interactive selector. The targeted repair replaces that table with duration
buttons and restores centralized approved prices for all four inflatables.

## Current behavior

- Email and social URLs each have one configuration source. Contact cards and
  footer consume those records; external socials use safe new-tab attributes.
  The existing Costa Rica WhatsApp URL remains unchanged.
- Duration selection defaults to three hours, preserves state while viewing the
  same product, and resets when the product changes. Summary cards and the
  WhatsApp URL derive from the same selected duration and central price function.
  Exact tiers apply through five hours; subsequent whole hours add ₡10,000 per
  hour. Other existing pricing and package definitions are preserved.
- Quotation messages include product, selected duration, reference price, event
  date/location prompts, separately quoted transport, and no confirmation of
  availability or reservation. Message text is URL-encoded.
- Gallery thumbnails open the existing Modal/player. Only that interaction
  requests playback. Audio rejection falls back to muted playback; another
  rejection exposes an accessible Play button. Switching reuses the media
  element and starts the selected source. Closing pauses and resets it. Session
  cancellation prevents old promises from retrying or muting a new source.
- Gallery layouts, photo approval configuration, media assets, Baby Gym PNG,
  games/services separation, package data, and business rules remain intact.

## Repeatable checks

Run `npm run lint`, `npm run build`, `npm test`, and `git diff --check` before
reviewing subsequent changes. Tests use Node's test runner and Vite's existing
module loader. JSDOM is a development-only addition for real component clicks;
no production dependency was added.

`tests/video-reels.test.mjs` checks rendered content, navigation, asset references,
approved pricing and category separation. `tests/interactive-behavior.test.mjs`
mounts actual React components to exercise playback requests, blocked audio,
muted fallback, manual retry, navigation, stale promise cancellation, close and
reopen, sound controls, single-player behavior, contact links, and duration
buttons/quotation URLs/product changes.

## Manual checks still needed

JSDOM does not render layout, decode MP4, or enforce browser autoplay policies.
Verify iPhone Safari, Android Chrome, and a desktop browser for real sound/muted
fallback behavior, fullscreen/native controls, focus restoration, responsive
layout, and reduced motion. Check a network panel for no initial MP4 transfers.
Open official social/email links and review the WhatsApp draft without sending
it. Compare the detail page against the visual reference and review audio for
caption requirements. Real browser automation tooling is unavailable here.
