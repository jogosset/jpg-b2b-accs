# Cards V2

A flexible card grid block with per-card configurable background color and text color. Each card supports a title and rich body text. Cards are arranged in a responsive auto-fill grid.

## How It Works

The **Cards V2** block is a container that holds one or more **Card V2** items. Each Card V2 item has four fields — title, body text, background color, and text color — editable via the DA.live properties panel.

The colors are applied as CSS custom properties (`--cv2-bg` and `--cv2-text`) directly on each card element, so every text element inside the card automatically inherits the configured color.

## Fields (per Card V2 item)

| Field | Description | Default |
|---|---|---|
| `title` | Card headline | *(empty)* |
| `body` | Card body text — supports rich formatting (bold, italic, links, lists) | *(empty)* |
| `background-color` | Card background — any CSS color (`#1a2b3c`, `white`, `rgb(...)`) | Site `--color-neutral-100` |
| `text-color` | Card text color — any CSS color | Site `--text-color` |

## Authoring in DA.live

1. Insert a **Cards V2** block from the block picker (Blocks group).
2. Inside the Cards V2 block, insert one or more **Card V2** items using the block picker.
3. Click a Card V2 item to open the properties panel.
4. Fill in:
   - **Title** — the card headline
   - **Body Text** — the card description (supports rich text formatting)
   - **Card Background Color** — e.g. `#1a2b3c`, `#f0f4ff`, `white`
   - **Card Text Color** — e.g. `#ffffff`, `#111111`, `black`
5. Leave Background Color and Text Color blank to use the site defaults.

## Card Grid Layout

Cards use CSS `auto-fill` with a minimum width of `280px`, so the number of columns adapts to the available width automatically:

| Viewport | Columns |
|---|---|
| > 900px | 3–4 (auto) |
| 480–900px | 2 (auto) |
| < 480px | 1 |

## Customising Defaults

The default card appearance (when no colors are set) is controlled by CSS custom properties in `cards-v2.css`:

```css
.cards-v2-card {
  background-color: var(--cv2-bg, var(--color-neutral-100, #f5f5f5));
  color: var(--cv2-text, var(--text-color, #111));
}
```

To change the default background or text color site-wide, update `--color-neutral-100` or `--text-color` in `styles/styles.css`.

## Differences from Cards V1

| Feature | Cards | Cards V2 |
|---|---|---|
| Image support | Yes | No |
| Title field | In body richtext | Dedicated field |
| Body text | Richtext in column 2 | Dedicated richtext field |
| Per-card background color | No | Yes |
| Per-card text color | No | Yes |
