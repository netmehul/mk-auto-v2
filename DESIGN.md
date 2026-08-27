# Mahy Khoory Automotive (MKA) — Design System & Architecture Specification

> **Version:** 2.0.0  
> **Status:** Living Document  
> **Applicable Codebase:** `mk-auto-v2` (TanStack Start + React 19 + Tailwind CSS v4 + Motion)  
> **Brand:** Mahy Khoory Automotive (Official UAE Distributor for Dongfeng, Omoda, and Jaecoo)

---

## 1. Executive Summary & Design Vision

**Mahy Khoory Automotive (MKA)** is a premier automotive group in the United Arab Emirates. The digital experience reflects the brand's identity: **engineering precision, technical luxury, heritage, and forward-looking mobility**.

### Core Pillars

1. **Precision & Engineering Rigor:** Sharp, architectural radii (`2px`), hairline borders, and structured grids evoking luxury automotive craftsmanship.
2. **Technical Luxury:** A deep midnight and navy foundation balanced by rich gold accents and high-contrast typography.
3. **Purposeful Motion:** Smooth spring kinematics and restrained stagger reveals that feel responsive and alive without creating distraction or cognitive overhead.
4. **Editorial Clarity:** High scannability, clear typography hierarchy, and intuitive information architecture across desktop, tablet, and mobile breakpoints.

---

## 2. Brand Identity & Color System

The MKA color palette is engineered using modern CSS variables and OKLCH color spaces for high perceptual uniformity and vibrancy.

### 2.1 Primary Brand Tones

| Token         | CSS Variable                            | Hex / OKLCH               | Description & Usage                                                  |
| :------------ | :-------------------------------------- | :------------------------ | :------------------------------------------------------------------- |
| **Navy 900**  | `--color-navy-900` / `--mka-navy-900`   | `#00004D`                 | Primary brand color, dark headers, dark hero cards, footers          |
| **Navy 800**  | `--color-navy-800` / `--mka-navy-800`   | `#0A0A5C`                 | Secondary dark surface, button hover states, interactive card states |
| **Navy 700**  | `--color-navy-700` / `--mka-navy-700`   | `#1B1B6E`                 | Elevated dark borders, card highlights                               |
| **Gold**      | `--color-gold` / `--mka-gold`           | `oklch(0.664 0.083 77.4)` | Primary accent, eyebrow lines, focus rings, interactive borders      |
| **Gold Soft** | `--color-gold-soft` / `--mka-gold-soft` | `oklch(0.835 0.052 84.5)` | Hover state accent text, subtle highlights                           |

### 2.2 Surface & Content Tones

| Token          | CSS Variable                            | Value / OKLCH              | Usage                                                        |
| :------------- | :-------------------------------------- | :------------------------- | :----------------------------------------------------------- |
| **Off-White**  | `--color-off-white` / `--mka-off-white` | `oklch(0.977 0.003 106.4)` | Main page background (`--background`), primary light surface |
| **Ink**        | `--color-ink` / `--mka-ink`             | `oklch(0.197 0.022 284.2)` | Primary body copy, dark icons, deep headings                 |
| **Grey 500**   | `--color-grey-500` / `--mka-grey-500`   | `oklch(0.532 0.020 285.7)` | Secondary copy, metadata, timestamps, input placeholders     |
| **Grey 200**   | `--color-grey-200` / `--mka-grey-200`   | `oklch(0.920 0.005 286.3)` | Hairline dividers, subtle card borders, inactive tab lines   |
| **Pure White** | `--mka-white`                           | `oklch(1 0 0)`             | Clean card surfaces, modal sheets, bright highlights         |

### 2.3 Semantic Color Mapping

```css
:root {
  --background: var(--mka-off-white);
  --foreground: var(--mka-ink);
  --card: oklch(1 0 0);
  --card-foreground: var(--mka-ink);
  --primary: var(--mka-navy-900);
  --primary-foreground: var(--mka-off-white);
  --secondary: oklch(0.96 0.003 286.3);
  --secondary-foreground: var(--mka-navy-900);
  --muted: oklch(0.96 0.003 286.3);
  --muted-foreground: var(--mka-grey-500);
  --accent: var(--mka-gold);
  --accent-foreground: var(--mka-navy-900);
  --border: var(--mka-grey-200);
  --input: var(--mka-grey-200);
  --ring: var(--mka-gold);
}
```

---

## 3. Typography & Text Hierarchy

The typography pairs **Electrolize** (a technical, geometric display font) with **Geist** (a clean, modern sans-serif body typeface).

### 3.1 Font Families

- **Display / Headers (`--font-display`):** `"Electrolize", ui-sans-serif, sans-serif`
- **Body / Interface (`--font-body`):** `"Geist", ui-sans-serif, sans-serif`

### 3.2 Typography Scale & Utility Classes

| Class / Utility   | Font Family | Size                                | Weight       | Tracking / Leading                                  | Application                                |
| :---------------- | :---------- | :---------------------------------- | :----------- | :-------------------------------------------------- | :----------------------------------------- |
| `.h1-display`     | Electrolize | `clamp(2.5rem, 5vw + 1rem, 5.5rem)` | Normal (400) | `line-height: 1.05; letter-spacing: -0.01em`        | Main hero headlines                        |
| `.h2-display`     | Electrolize | `clamp(2rem, 3vw + 1rem, 3.25rem)`  | Normal (400) | `line-height: 1.1`                                  | Section titles, major banners              |
| `.eyebrow`        | Electrolize | `0.75rem` (12px)                    | Normal (400) | `letter-spacing: 0.16em; text-transform: uppercase` | Section category tags with gold rule       |
| `h3`              | Electrolize | `1.5rem` – `2rem`                   | Normal (400) | `line-height: 1.2`                                  | Feature cards, modal titles                |
| `h4`              | Electrolize | `1.125rem` – `1.25rem`              | Normal (400) | `line-height: 1.3`                                  | Sub-sections, list headers                 |
| `body-large`      | Geist       | `1.125rem` (18px)                   | 400 / 500    | `line-height: 1.6`                                  | Lead paragraphs, intro blurbs              |
| `body`            | Geist       | `0.9375rem` – `1rem`                | 400          | `line-height: 1.55`                                 | Standard copy, article content             |
| `caption / small` | Geist       | `0.75rem` – `0.875rem`              | 500          | `letter-spacing: 0.05em`                            | Form labels, image captions, table headers |

---

## 4. Spacing, Grid & Layout Geometry

### 4.1 Shell Container (`.shell`)

Standardized responsive horizontal containment across all views:

```css
@utility shell {
  width: 100%;
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: 24px; /* Mobile (< 1024px) */
  @media (min-width: 1024px) {
    padding-inline: 80px; /* Desktop (>= 1024px) */
  }
  @media (min-width: 1440px) {
    padding-inline: 120px; /* Large Desktop (>= 1440px) */
  }
}
```

### 4.2 Vertical Rhythm (`.section-y`)

```css
@utility section-y {
  padding-block: 72px; /* Mobile */
  @media (min-width: 1024px) {
    padding-block: 140px; /* Desktop */
  }
}
```

### 4.3 Corner Radii Tokens

MKA deliberately avoids large bubbly radii in favor of crisp, engineered angles:

- `--radius-sm`: `2px`
- `--radius-md`: `2px`
- `--radius-lg`: `4px`
- `--radius-xl`: `4px`

---

## 5. Motion, Kinematics & Interaction Design

All motion is powered by **Motion for React (`motion/react`)** and GSAP for specialized timeline sequences.

### 5.1 Easing & Timing Constants

- **Standard Ease:** `cubic-bezier(0.22, 1, 0.36, 1)` (snappy entry with ultra-smooth deceleration)
- **Reveal Duration:** `0.75s`
- **Stagger Delay:** `0.08s` between consecutive items, initial delay `0.05s`
- **Spring Kinematics (Buttons):** `{ stiffness: 220, damping: 22 }`
- **Scroll Progress Spring:** `{ stiffness: 120, damping: 30, mass: 0.3 }`

### 5.2 Motion Primitives (`Reveal.tsx`)

```tsx
// Stagger Group
<RevealGroup once={true}>
  <Eyebrow tone="gold">Our Portfolio</Eyebrow>
  <RevealItem as="h2" className="h2-display">
    Official UAE Distributorships
  </RevealItem>
  <RevealItem as="p" className="text-muted-foreground">
    Delivering excellence across passenger and commercial vehicle sectors.
  </RevealItem>
</RevealGroup>
```

### 5.3 Reduced Motion Accessibility

Respects user OS preferences automatically via media queries and utility wrappers:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 6. Component Architecture & Design Patterns

### 6.1 Button Hierarchy (`Buttons.tsx`)

1. **Primary Button (`PrimaryButton`)**:
   - Base: Deep Navy (`bg-navy-900`), text Off-White (`text-off-white`), uppercase tracking `0.16em`.
   - Hover State: Transitions to Navy 800 with an animated Gold hairline border outline (`border-gold`).
   - Use: Primary CTAs, form submissions, test drive bookings.

2. **Ghost Button (`GhostButton`)**:
   - Base: Transparent background with subtle border (Light: `border-off-white/50`, Dark: `border-navy-900/30`).
   - Hover State: Border shifts to Gold with Gold-Soft text.
   - Use: Secondary actions, explore specs, read article links.

3. **Magnetic Button (`MagneticButton`)**:
   - Spring-based cursor attraction on mouse move (`useSpring`).
   - Use: High-prominence conversion triggers in hero or banner components.

### 6.2 Header & Navigation (`SiteHeader.tsx`)

- **Scroll Sensing:** Header dynamically transitions from transparent over the hero to `bg-navy-900/95` with `backdrop-blur-sm` when scrolled past `85vh`.
- **Progress Gauge:** Hairline gold scroll indicator pinned to the top edge representing document scroll depth.
- **Navigation Items:** Uppercase with sliding gold underline reveal on hover.
- **Mobile Drawer:** Accessible slide-down menu with smooth item transitions.

### 6.3 Brand Presentation System (`Brands.tsx`)

- **Brand Portfolio:** Dongfeng, Omoda, and Jaecoo.
- **Interactive Tabs / Switcher:** Clean pill/underline indicators with rapid cross-fade transitions.
- **Key Spec Highlights:** Clean typography blocks displaying vehicle power, range, dimensions, and warranty badges.

### 6.4 Interactive UAE Network Map (`BrandLocations.tsx` & `uae-map-data.ts`)

- **Geographic Precision:** Custom SVG map representing UAE Emirates (Dubai, Abu Dhabi, Sharjah, Northern Emirates).
- **Location Pins:** Interactive markers for Showrooms, Service Centers, and Parts Depots.
- **Card Panel:** Co-located details showing operating hours, phone, address, and Google Maps routing triggers.

### 6.5 Forms & User Input (`contactus.tsx`, `careers.tsx`)

- **Input Styling:** Precision 1px borders with `var(--mka-grey-200)`, active state transitions to `border-navy-900` or `border-gold`.
- **Validation Feedback:** Inline error cues with subtle iconography and instant feedback on blur.
- **Submission States:** Integrated spinner indicator (`Loader2`), disabled prevention, Sonner toast notifications, and full animated success acknowledgement states.

### 6.6 Footer Ecosystem (`SiteFooter.tsx`)

- **Deep Navy Base:** Grounded anchored footer with MKA logo and official credentials.
- **Accordion Collapse on Mobile:** Responsive navigation converts cleanly into collapsible accordions to minimize mobile scroll fatigue.
- **Direct Contacts:** Direct dial phone links, email copy actions, and social media links.

---

## 7. Responsive Breakpoint Strategy

| Breakpoint              | Width (`min-width`) | Layout Adjustments                                                                                |
| :---------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| **Mobile (`sm`)**       | `< 768px`           | Single-column layouts, stacked cards, full-width inputs, accordions for footer links              |
| **Tablet (`md`)**       | `768px – 1023px`    | 2-column grids, condensed navigation, medium headline clamps                                      |
| **Desktop (`lg`)**      | `1024px – 1439px`   | Full horizontal navigation, 3/4 column grids, `80px` container padding, interactive hover physics |
| **Wide Desktop (`xl`)** | `>= 1440px`         | `1440px` maximum shell with `120px` gutter padding, full-scale typography clamps                  |

---

## 8. Accessibility & Quality Standards (a11y)

- **Focus Management:** Clear 2px gold outlines with 3px offset (`:focus-visible`).
- **Contrast Ratios:** All body copy and headings meet WCAG 2.1 AA contrast standards (minimum 4.5:1 for body copy, 3:1 for display titles).
- **Semantic Structure:** Semantic HTML5 elements (`<header>`, `<main>`, `<nav>`, `<article>`, `<aside>`, `<footer>`) with explicit ARIA labels for dynamic disclosures and dialogs.
- **Keyboard Traversal:** Full tab accessibility for menus, modals, brand switchers, and form controls.

---

## 9. Developer Guidelines & Pattern Rules

### Do's

- **Always** use the `.shell` utility for horizontal bounds.
- **Always** use `var(--color-gold)` / `var(--mka-gold)` for accent details rather than ad-hoc yellows.
- **Always** wrap staggered content blocks in `<RevealGroup>` and `<RevealItem>`.
- **Always** use `cn()` from `@/lib/utils` for conditional class combinations.
- **Always** maintain `2px` or `4px` border-radii for components to preserve the architectural brand look.

### Don'ts

- **Never** use high-radius values (e.g. `rounded-full` or `rounded-2xl` on standard cards or buttons).
- **Never** introduce unrelated saturated color primaries (e.g., standard red, bright green) without semantic justification.
- **Never** use hardcoded pixel widths for layout containers; leverage responsive grid and flexbox primitives.
- **Never** disable focus outlines without providing a high-contrast replacement.
