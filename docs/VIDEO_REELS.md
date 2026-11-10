# PlayPop en Acción

## Source inventory

All six originals live in `src/assets/videos/playpop/`. Their full filename pattern is
`WhatsApp Video 2026-10-12 at {time} PM.mp4`. Originals were not renamed, transcoded,
or deleted. Posters are real frames extracted at one second with macOS AVFoundation,
respecting the track's display rotation. No synthetic imagery was used.

| Time    |     Bytes | Seconds | Encoded size | Display size | Total bitrate |
| ------- | --------: | ------: | ------------ | ------------ | ------------: |
| 7.55.07 | 1,836,091 |   10.53 | 576 × 768    | 576 × 768    |     1.39 Mbps |
| 7.55.09 |   705,946 |    3.23 | 1024 × 576   | 576 × 1024   |     1.75 Mbps |
| 7.55.12 | 2,202,925 |   10.47 | 1024 × 576   | 576 × 1024   |     1.68 Mbps |
| 7.55.19 | 4,701,661 |   22.43 | 464 × 832    | 464 × 832    |     1.68 Mbps |
| 7.55.31 | 3,559,464 |   21.20 | 576 × 1024   | 576 × 1024   |     1.34 Mbps |
| 7.55.38 | 1,751,878 |    8.07 | 1024 × 576   | 576 × 1024   |     1.74 Mbps |

Every file has H.264 (`avc1`) video and MPEG-4 (`mp4a`) audio. Every file places its
`moov` metadata before `mdat` media data for progressive playback. Four clips display
at exact 9:16; `.19` is approximately 9:16 and `.07` is 3:4. Display rotation matters:
`.09`, `.12`, and `.38` store landscape frames with a 90-degree display transform.

At 14.76 MB combined and roughly 1.3–1.8 Mbps, these short clips are suitable for
on-demand delivery. No conversion is required. Optional future optimization could
create separate H.264/AAC delivery copies at the existing resolution with a lower
bitrate and fast-start metadata, after visual comparison and approval. Avoid
upscaling or cropping originals. `.19` is the largest potential optimization target.

Featured clips are `.38` (outdoor inflatables), `.12` (ball-pit activity), and `.31`
(inflatable game). The selection uses visible footage and offers three exact 9:16
clips with varied subjects. Generic titles are centralized in `src/data/videos.js`.

## Playback and delivery

- Homepage: three vertical cards, touch scrolling, keyboard-scrollable track, and
  previous/next navigation. Reduced motion disables smooth navigation and snapping.
- Native video controls provide play/pause, seeking, and fullscreen where supported.
  A separate sound toggle ensures mute/unmute is available on mobile too.
- Homepage clips start muted and do not autoplay. Opening a gallery thumbnail
  starts only that viewer clip, trying audio first and then muted playback if
  necessary. Both attempts handle rejected play promises; a visible Play button
  remains available if both fail. All players retain `playsInline` and
  `preload="none"`. Asset imports emit URLs rather than inlining MP4 contents.
- Gallery initially mounts only lazy poster images. A video element mounts only when
  its viewer opens. React Bootstrap Modal provides Escape handling, focus trapping,
  and focus restoration. Viewer next/previous buttons and keyboard arrows select
  another clip without remounting the player. Source changes and closing cancel
  pending playback requests, pause the player, and reset it to zero.
- Starting any PlayPop player pauses the other playing PlayPop videos on the page.
- Production MP4 asset names are generic hashes; original WhatsApp filenames remain
  local source filenames and never appear as public video titles.
- The approved photo gallery was restored from local commit `03fa660`, including
  its unchanged approval configuration, twelve photo assets, generic collection
  titles, photo viewer, and swipe/keyboard navigation. Event photo asset URLs retain
  the anonymous `moment-[hash]` pattern.
- The shared gallery dataset contains four approved event collections and six
  videos. Todos separates the landscape photo grid (Momentos PlayPop) from a
  horizontal video carousel (PlayPop en Acción). Fotos shows only the four
  collections; Videos shows a dedicated responsive grid of six reels, capped at
  16rem card widths. Carousel buttons and keyboard arrows scroll by one card, with
  disabled controls at the boundaries and native touch scrolling on mobile. The homepage photo preview reuses the same approved collections.
  Placeholder records are excluded from public rendering.

## Validation

Run `npm run lint`, `npm run build`, `npm test`, and `git diff --check`.
The tests cover single-video playback, muted inline lazy player markup, poster
presence, six gallery entries, Videos deep linking, photo preservation, and unknown
filter fallback. They render components through Vite's SSR loader with existing
React dependencies. Interactive tests add JSDOM as a development-only dependency,
mount real components, and mock only browser media APIs.

Manual browser checks still needed (no browser automation tooling is installed):

- Desktop: carousel arrows, keyboard navigation, native playback and sound controls,
  gallery filtering, viewer Escape/close behavior, and focus restoration.
- iPhone Safari and Android Chrome: swipe cards, inline playback, sound toggling,
  fullscreen, correct rotation, and viewer sizing in portrait and landscape.
- Network panel: no MP4 requests before interaction; only the selected clip loads.
- Reduced-motion preference: no smooth carousel navigation.
- Listen to the audio and determine whether any meaningful speech requires captions.
  No transcripts or captions have been invented.
