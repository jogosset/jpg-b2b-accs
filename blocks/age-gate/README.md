# Age Gate

A full-page age verification overlay that requires visitors to confirm they are 21 years of age or older before accessing the page or site content.

## How It Works

When the Age Gate block is present on a page, it renders a modal overlay over the entire viewport. The visitor must enter their date of birth in `MM/DD/YYYY` format. The block calculates their exact age — if they are 21 or older, the overlay dismisses and the page content is revealed. If they are under 21, an error message is displayed.

Once verified, the result is stored in `sessionStorage` so the visitor is not prompted again during the same browser session.

## Fields

| Field | Description | Default |
|---|---|---|
| `heading` | Main headline text | `Are you of legal drinking age?` |
| `subheading` | Supporting text below the headline | `You must be 21 years or older to enter this site.` |
| `button-text` | Submit button label | `Enter Site` |
| `underage-message` | Message shown when visitor is under 21 | `Sorry, you must be 21 or older to enter this site.` |
| `legal-text` | Small-print disclaimer below the form | `By entering this site you are agreeing to our Terms of Use and Privacy Policy.` |

## Authoring in DA.live

1. Open a page in the DA.live editor.
2. Insert an **Age Gate** block (found under the Blocks group).
3. Fill in the fields in the properties panel — all fields have sensible defaults so only customise what you need.
4. Place the block in its own section at the **top** of the page (or in a shared template page so it applies site-wide).
5. Preview at `https://main--jpg-b2b-accs--jogosset.hlx.page/<your-page>`.

## Placement

- **Single page**: Add the Age Gate block to any page where age verification is required.
- **Site-wide**: Add the block to a shared template or header fragment that is included on all pages.

## Date Input

The input field auto-formats as the visitor types — digits are automatically separated into `MM/DD/YYYY` format. Invalid dates (e.g. February 31st) are rejected with a validation message.

## Session Storage

Verification is stored under the key `age-gate-verified` in `sessionStorage`. This means:

- The gate will **not** re-appear during the same browser session after verification.
- The gate **will** re-appear if the visitor opens a new tab or restarts their browser.

## Customising the Style

The block uses CSS custom properties from the site theme:

| Property | Usage |
|---|---|
| `--background-color` | Modal and input background |
| `--text-color` | All text |
| `--color-brand-1000` | Submit button background and input focus border |
| `--color-neutral-300` | Input default border color |

To change the overlay darkness, edit `.age-gate-overlay` background-color in `age-gate.css`.
