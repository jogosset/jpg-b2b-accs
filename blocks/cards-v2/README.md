# Cards V2

A flexible card grid block with per-card title, body text, background color, and text color controls.

## Features

- **Title** — Displayed as a bold heading (`<h3>`) on each card
- **Body text** — Supports rich text (paragraphs, lists, links)
- **Background color** — Per-card background color (any valid CSS value)
- **Text color** — Per-card text color (any valid CSS value)

## Authoring in da.live

1. Add a **Cards V2** block to your page section
2. Each row in the block table represents one card with 4 columns:

| Column | Field | Example |
|--------|-------|---------|
| 1 | Title | `Our Services` |
| 2 | Body text | Rich text — paragraphs, lists, links |
| 3 | Background color | `#1a73e8` or `rgb(26,115,232)` or `blue` |
| 4 | Text color | `#ffffff` or `white` |

3. Add as many rows as you need — the grid auto-fills based on available width

## Example Table Structure

```
| Cards V2       |                                        |         |         |
|----------------|----------------------------------------|---------|---------|
| Card Title     | Body text describing the card content  | #1a73e8 | #ffffff |
| Another Card   | More descriptive body text here        | #f5f5f5 | #333333 |
| Third Card     | Supporting text for the third card     | #000000 | #ffffff |
```

## Notes

- If no background color is provided, cards default to a neutral light gray (`#f5f5f5`)
- If no text color is provided, cards inherit the page default text color
- Colors apply to the entire card including both title and body text
- The card grid uses `auto-fill` with a minimum card width of 280px