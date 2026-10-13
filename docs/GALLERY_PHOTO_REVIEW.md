# Event photo review — local maintainer record

This document is not public gallery content. Keep original folder names, file names and this review record out of the website and its production assets.

## Publication decisions

The business owner explicitly confirmed that PlayPop has the necessary permission to use and publish all nine photographs in the three configured collections, including those featuring people and children. The eight previously excluded photographs are now cleared for publication; the existing equipment-only photograph remains included.

This approval applies only to these nine photographs. Future photographs remain pending until explicitly approved. Pending photographs must have no asset import and are excluded from public collections and production assets.

| Public collection               | Included | Pending |
| ------------------------------- | -------: | ------: |
| Celebraciones llenas de alegría |        3 |       0 |
| Diversión a lo grande           |        2 |       0 |
| Momentos para recordar          |        4 |       0 |

## File review

All paths below are relative to `src/assets/images/playpop/events/`.

| Stable photo ID  | Local source                                                   | Decision                                                                                          |
| ---------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| celebraciones-01 | `cumple zoe/WhatsApp Image 2026-08-15 at 12.24.01 PM.jpeg`     | Approved: publication permission confirmed by the business owner.                                 |
| celebraciones-02 | `cumple zoe/WhatsApp Image 2026-08-15 at 12.24.05 PM.jpeg`     | Approved: publication permission confirmed by the business owner.                                 |
| celebraciones-03 | `cumple zoe/WhatsApp Image 2026-08-15 at 12.24.08 PM.jpeg`     | Included: equipment-only photograph retained; business owner approval covers this photograph too. |
| diversion-01     | `escuela de chris /Feria infantil bajo un cielo dramático.png` | Approved: publication permission confirmed by the business owner.                                 |
| diversion-02     | `escuela de chris /Fiesta infantil en castillo inflable.png`   | Approved: publication permission confirmed by the business owner.                                 |
| momentos-01      | `jared b-day/WhatsApp Image 2026-10-12 at 7.55.05 PM.jpeg`     | Approved: publication permission confirmed by the business owner.                                 |
| momentos-02      | `jared b-day/WhatsApp Image 2026-10-12 at 7.55.05 PM (1).jpeg` | Approved: publication permission confirmed by the business owner.                                 |
| momentos-03      | `jared b-day/WhatsApp Image 2026-10-12 at 7.55.05 PM (2).jpeg` | Approved: publication permission confirmed by the business owner.                                 |
| momentos-04      | `jared b-day/WhatsApp Image 2026-10-12 at 7.55.05 PM (3).jpeg` | Approved: publication permission confirmed by the business owner.                                 |

An additional folder, `cumple de sara `, contains three photographs and was not one of the three requested collections. Its equipment views were inspected but are not included or imported; confirm collection scope before adding them. No originals were changed or removed.

## Adding or approving photographs

1. Confirm publication permission for every identifiable person, including customer/guardian permission where relevant. Do not infer permission from the existence of a local file.
2. Import each cleared photo in `src/data/eventCollections.js`, preserving its original file on disk.
3. Update its existing stable photo record with the imported image, accurate generic alt text, intrinsic dimensions, and `publication: 'cleared'`. Keep pending entries without an image import.
4. Optionally set `coverPhotoId` on a collection. Otherwise its first cleared photograph becomes its cover.
5. Add a collection using the same generic public fields and photos array. No card/viewer changes are needed.
6. Build and verify privacy: event assets must use `moment-[hash]` filenames, and private source labels must be absent from public JavaScript and URLs.

The public gallery retains all eleven existing equipment photos. Event images are represented once, inside collections. Covers load lazily; the viewer mounts only the active photograph. It reserves a responsive stage, preserves the full image with `object-fit: contain`, and supports previous/next buttons, a live counter, keyboard arrows, swipe, Escape, a close button, and reduced motion. Single-photo collections show 1 / 1 with disabled navigation arrows.
