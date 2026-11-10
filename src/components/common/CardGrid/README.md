# CardGrid

Use `CardGrid` for repeated cards within a Bootstrap `Container`. Render cards
as direct children; do not nest Bootstrap `Row` or `Col` wrappers inside it.

- One column below 768px; two equal columns from 768px.
- `columns={2}` keeps two columns at larger widths.
- Default `columns={3}` switches to three columns from 992px.
- `columns={4}` switches to four columns from 1200px.
- Gaps use `--space-5` (24px); children stretch to equal heights within each row.
- `equalRows` also equalizes all rows from 768px. Reserve it for compact groups
  such as Contact; allow content-sized rows elsewhere to avoid needless space.
- Mobile row heights follow their content. No fixed card heights or truncation.

Cards own their padding, radius, shadow and media treatment using existing
design tokens. Keep their content in flex columns and use `margin-top: auto`
for actions. Promotional artwork uses contain in a 4:3 media container;
event covers retain cover; video media retain 9:16. Horizontal video carousels
keep their existing scrolling layout rather than using this grid.
