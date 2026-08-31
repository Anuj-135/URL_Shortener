# Snip — URL Shortener: UI Design Document

## 1. Overview
This document specifies the visual design for **Snip**, a URL shortener with three pages — Home, Sign Up, and Login — built as EJS templates styled with plain CSS. It translates the Stitch mockups into a structural + style spec so the existing EJS/CSS project can be updated to match, with full responsiveness.

## 2. Goals / Non-Goals

**Goals**
- Match the Stitch design (layout, color, typography, spacing) as closely as possible across Home, Sign Up, and Login.
- Make all three pages fully responsive (mobile, tablet, desktop).
- Keep implementation compatible with the existing EJS + plain CSS stack (no new framework).

**Non-goals**
- No new pages/features beyond what's in the mockups — auth logic, DB schema, click-tracking backend are out of scope for this doc (UI only).
- No CSS framework (Tailwind/Bootstrap) — plain CSS to match the current stack.

## 3. Pages

### 3.1 Home (`/`)
Top to bottom:
1. **Navbar** — light gradient background (white → light gray). Left: scissors icon (`scissor.svg`) + "Snip" wordmark. Right: circular avatar badge ("J") + "LOG OUT" outline button.
2. **Hero section** — two columns on desktop:
   - Left: heading "Short links," / "Share it Anywhere." (second line has a green highlight block behind the text). Below it, a one-line description with a couple of accent-colored words. Below that, the URL input row — link icon (`link.svg`) inside a bordered input with placeholder "Paste your long link here," plus a green "SHORTEN" button beside it.
   - Right: square illustration panel — warm yellow rounded background containing icon illustrations (pie chart, bar chart, thumbs-up, magnifier, lightbulb) around a browser-mockup graphic with a "www." bar and scissors cutting a line (`image.png`), over a subtle dot-grid pattern.
3. **Divider** — full-width horizontal rule separating hero from the table section.
4. **"All shortened URLs" table**
   - Section title above the table.
   - Header row: dark (near-black) background, white uppercase text — columns SHORT LINK / ORIGINAL URL / CLICKS.
   - Body rows: alternating white / very light gray backgrounds. Short-link values shown in green; original URL in default text color; clicks as plain numbers.

### 3.2 Sign Up (`/signup`)
- Centered card on a light blush/cream page background; thin gradient bar along the very top of the page.
- "Create an account" heading, subtext "Start optimizing your links in seconds." (a couple of accent-colored words).
- Form fields, each with an uppercase label above a bordered input:
  - FULL NAME — placeholder "Jane Doe"
  - EMAIL ADDRESS — placeholder "jane@example.com"
  - PASSWORD — dot placeholder, helper text below in orange/red: "Must be at least 8 characters."
- Full-width green button: "CREATE ACCOUNT →"
- Divider, then centered text: "Already have an account? **Log in**" (bold + underlined, links to `/login`).

### 3.3 Login (`/login`)
- Centered card with a solid black 1–2px border, white background — more boxed than the Sign Up card.
- "Snip" bold wordmark centered at the top of the card, subtext "Welcome back. Let's get to work." below it.
- Form fields with icon-prefixed inputs:
  - EMAIL ADDRESS — mail icon (`email.svg`) inside the input, placeholder "name@company.com"
  - PASSWORD — lock icon (`password.svg`) inside the input, dot placeholder
- Full-width green button: "LOGIN"
- Divider, then centered text: "Don't have an account? **Sign up**" (bold + underlined, links to `/signup`).

## 4. Design System

### 4.1 Colors
Sample exact hex values from the Stitch export/images with a color picker — the table below is a close starting approximation.

| Token | Approx. Hex | Usage |
|---|---|---|
| `--color-primary` | `#22C55E` | Buttons, links, short-link text, accents |
| `--color-primary-dark` | `#16A34A` | Button hover state |
| `--color-text` | `#111111` | Headings, body text |
| `--color-text-muted` | `#6B7280` | Placeholder text, secondary copy |
| `--color-warning` | `#D97706` | Validation/helper text |
| `--color-bg` | `#FFFFFF` | Home page background |
| `--color-bg-blush` | `#FBF3EF` | Sign Up / Login page background |
| `--color-illustration-bg` | `#F6C94D` | Hero illustration panel background |
| `--color-table-header` | `#111827` | Table header row background |
| `--color-row-alt` | `#F3F4F6` | Alternating table row background |
| `--color-border` | `#111111` | Login card border, input borders |
| `--color-border-light` | `#E5E7EB` | Sign Up input borders, dividers |

### 4.2 Typography
- Font family: a bold geometric sans-serif (e.g. Poppins, Inter, or Sora — confirm exact match against the Stitch export; load via Google Fonts or self-host).
- Headings / "Snip" wordmark: bold–extrabold weight, tight line-height.
- Labels (FULL NAME, EMAIL ADDRESS, etc.): small, uppercase, letter-spaced, semi-bold.
- Body/placeholder text: regular weight.

| Element | Size | Weight |
|---|---|---|
| Hero heading | 40–48px (clamp on mobile) | 700–800 |
| "Snip" wordmark | 28–32px | 800 |
| Section title ("All shortened URLs") | 20–24px | 700 |
| Form labels | 12–13px, uppercase, letter-spacing 0.05em | 600 |
| Body/subtext | 15–16px | 400 |
| Button text | 14–15px, uppercase, letter-spacing 0.03em | 700 |

### 4.3 Spacing & Radius
- Base spacing unit: 4px (use multiples: 8, 12, 16, 24, 32, 48px).
- Radius: cards/inputs 8px, buttons 6–8px, illustration panel 16–20px, avatar badge fully round.
- Home page container max-width: ~1140–1200px, centered with side padding.
- Auth cards: max-width ~400–440px, centered.

### 4.4 Icons & Asset Mapping
| Asset | Used on | Placement |
|---|---|---|
| `scissor.svg` | Home | Navbar logo, left of "Snip" wordmark |
| `image.png` | Home | Hero illustration panel (right column) |
| `link.svg` | Home | Prefix icon inside the "paste your long link" input |
| `email.svg` | Login | Prefix icon inside the email input |
| `password.svg` | Login | Prefix icon inside the password input |

## 5. Components
- **Navbar** (Home only): flex row, space-between; gradient background; logo+wordmark left, avatar badge + logout button right.
- **Button — Primary**: green background, bold uppercase label, 6–8px radius; full-width on auth forms, auto-width for Home's Shorten button. (Confirm text color — black vs white — against the mockup at full resolution.)
- **Button — Outline**: used for "LOG OUT" — transparent background, green border + text.
- **Input — Plain**: uppercase label above, bordered box below, muted-gray placeholder.
- **Input — Icon-prefixed**: same as plain input, with an SVG icon positioned inside the left padding (used on Login).
- **Auth Card**: shared wrapper for Sign Up / Login with page-specific border/background variants.
- **Table**: dark header row with white uppercase text; alternating row backgrounds; short-link cell styled in the primary color.
- **Illustration Panel**: rounded square, colored background, dot-grid overlay, centered browser-mock graphic with small floating icon badges.

## 6. Responsive Behavior

Breakpoints: Mobile `< 640px` · Tablet `640–1024px` · Desktop `> 1024px`.

**Home page**
- Desktop: hero is a 2-column grid (text left, illustration right).
- Tablet/Mobile: hero collapses to a single column — text stacks first, illustration panel stacks below, full-width.
- URL input + Shorten button: side-by-side on desktop/tablet; stacked (full-width input, full-width button) on mobile.
- Table: on mobile, either wrap it for horizontal scroll (`overflow-x: auto`) or switch to a stacked label:value card layout per row. Horizontal scroll is the lower-effort option and preserves the table look.
- Navbar: stays a single row at all sizes; shrink logo/text and padding on mobile.

**Sign Up / Login pages**
- Card stays centered at all sizes; on mobile it becomes near full-width with consistent side padding (16–24px) instead of a fixed max-width.
- Font sizes step down slightly on mobile (`clamp()` for hero/wordmark sizes).
- Icon-prefixed inputs keep the icon position fixed relative to input padding at all sizes.

## 7. File/Asset Structure (for EJS + CSS integration)

Suggested structure — adjust to match your existing project layout:

```
views/
  partials/
    navbar.ejs
  home.ejs
  signup.ejs
  login.ejs
public/
  css/
    base.css        (resets, CSS variables/tokens, typography)
    components.css  (buttons, inputs, cards, table)
    home.css
    auth.css         (shared signup + login styles)
  images/
    email.svg
    image.png
    link.svg
    password.svg
    scissor.svg
```

CSS variables from §4.1–4.3 belong in `base.css` under `:root`, so every page/component references the same tokens.

## 8. Open Questions
- Exact hex values / font family — confirm against the Stitch export rather than the approximations here.
- Table on mobile: horizontal scroll vs. stacked cards — needs a decision.
- Primary button text color (black vs white) — confirm from the mockup at full resolution.
- Illustration panel: keep `image.png` as a static asset (recommended, since it's already provided), or rebuild it in SVG/CSS for better scaling?