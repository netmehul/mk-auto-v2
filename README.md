# MKA Launchpad

# Lovable.dev Build Prompt — MKA (Mahy Khoory Automotive) Homepage

> Copy everything below into Lovable. Attach `logo.svg`, `favicon.ico`, and `opengraph-image.png` when you paste this in — the prompt references them directly.

---

## 1. Project Summary

Build the **homepage** for **MKA (Mahy Khoory Automotive)**, the official UAE distributor for **Dongfeng, Omoda, and Jaecoo**. This is a corporate/institutional automotive group site — think "distribution group," not "car dealership landing page." The tone is confident, restrained, and premium: closer to an investment holding company or a national trading group than to a showroom promo site.

**Stack**
- **Next.js 14+ (App Router)**, TypeScript, Tailwind CSS
- **GSAP + ScrollTrigger** for scroll-driven reveals, pinning, and parallax
- **Motion.dev** (Framer Motion's successor library, `motion/react`) for component-level micro-interactions, hover states, and orchestrated entrance sequences
- Fully responsive (mobile-first breakpoints), accessible (WCAG AA), and performant (lazy-loaded media, `next/image`, `next/font`, video poster fallback, `prefers-reduced-motion` respected throughout)

**Reference for tone (inspiration only — do not clone layout, sections, or copy verbatim):**
`https://www.alfuttaim.com/en/` — study its restraint: generous whitespace, large editorial type, muted full-bleed photography, subtle motion, and a "corporate group" information architecture (About / Brands / News / Careers) rather than a retail car-sales layout. Al Tayer Group (`altayer.com`) is a secondary tonal reference for the same reason: polished, quiet, institutional.

---

## 2. Design System

### 2.1 Brand Assets (attached — use as-is)
- `logo.svg` — primary lock-up (MK monogram + "MAHY KHOORY AUTOMOTIVE" wordmark), white/monochrome, built for dark backgrounds. Use this on the navy header/hero. Do not recolor or redraw it.
- `favicon.ico`
- `opengraph-image.png` — deep navy background with a subtle repeating MK monogram watermark texture. Use this same watermark-texture treatment as a design cue for dark section backgrounds (very low-opacity repeating monogram pattern, never competing with foreground content).

### 2.2 Color Palette
Navy is the dominant brand tone. Keep the palette tight — **no more than one accent color**, used sparingly.

```css
:root {
  /* Primary */
  --mka-navy-900: #00004D;   /* primary brand color — hero, header, footer, dark sections, primary buttons */
  --mka-navy-800: #0A0A5C;   /* hover/active state for navy elements, gradient depth */
  --mka-navy-700: #1B1B6E;   /* subtle gradients, card borders on dark */

  /* Neutrals */
  --mka-white: #FFFFFF;
  --mka-off-white: #F7F7F5;  /* light section backgrounds — never pure white on white */
  --mka-ink: #14141F;        /* body copy on light backgrounds — near-black, not pure black */
  --mka-grey-500: #6B6B78;   /* secondary/muted text */
  --mka-grey-200: #E4E4E8;   /* hairline dividers, card borders on light */

  /* Restrained accent */
  --mka-gold: #B08D57;       /* metallic/gold accent — CTA underlines, active nav indicator, counters, icon strokes. Use as a 5–10% accent, never as a fill color for large areas */
  --mka-gold-soft: #D9C7A3;  /* tint for hover glows / subtle highlight text on dark navy */
}
```

**Usage rules:**
- Navy (`--mka-navy-900`) dominates: header, footer, hero overlay, CTA banners, and at least one full-bleed section between content blocks to create rhythm (light → dark → light).
- Off-white (`--mka-off-white`), never stark white, for light sections — pairs better with photography.
- Gold is a *finishing touch*: link underlines on hover, the active state of the scroll-progress indicator, number counters in "At a Glance," a thin 1px rule beside section eyebrows. It should never appear as a button fill or a large block.
- No purple gradients, no generic blue-to-cyan gradients, no rainbow accent systems. One accent, used with discipline.

### 2.3 Typography

```css
/* next/font/google */
--font-display: 'Electrolize', sans-serif;  /* headings, eyebrows, nav, big stat numbers */
--font-body: 'Geist', sans-serif;           /* body copy, form labels, captions, buttons */
```

- **Electrolize** — use for all headings (H1–H4), section eyebrows (small uppercase labels like "OUR BRANDS", "AT A GLANCE"), nav links, and the animated stat numbers. Its geometric, slightly technical character reinforces automotive/engineering credibility without being loud. Set generous letter-spacing on uppercase labels (`0.12em`–`0.18em`) and tight-to-normal tracking on large display headlines.
- **Geist** — use for body paragraphs, form fields, buttons, footer legal text, and card descriptions. Keep body copy at 16–18px, 1.6–1.7 line-height, max reading width ~65ch.
- Type scale (fluid, `clamp()`-based):
  - H1 (hero): `clamp(2.5rem, 5vw + 1rem, 5.5rem)`, Electrolize, tight leading (1.05)
  - H2 (section titles): `clamp(2rem, 3vw + 1rem, 3.25rem)`, Electrolize
  - Eyebrow labels: 12–13px, Electrolize, uppercase, letter-spacing 0.15em, gold or off-white at low opacity depending on background
  - Body: 16–18px Geist, regular; lead paragraphs 18–20px
- Load both via `next/font/google` with `display: swap` and only the weights actually used (Electrolize is single-weight — lean on size/spacing for hierarchy; Geist: 400/500/600).

### 2.4 Spacing, Grid & Shape
- 12-column grid, max content width `1440px`, generous outer gutters (min `24px` mobile, `80–120px` desktop).
- Section vertical rhythm: `120–160px` desktop padding between major sections, `64–80px` mobile.
- Corners: sharp or very subtly rounded (`2–4px` radius max) — this is an engineering/automotive brand, not a soft consumer app. Avoid pill-shaped buttons; use rectangular buttons with a thin gold underline/border accent on hover instead.
- Dividers: 1px hairlines (`--mka-grey-200` on light, `rgba(255,255,255,0.12)` on navy) — never heavy accent bars or colored stripes.
- Buttons: two variants —
  - **Primary**: navy fill, off-white text, on hover the fill shifts to `--mka-navy-800` and a 1px gold border animates in around the button.
  - **Secondary/ghost**: transparent, 1px off-white or navy border depending on background, text fills or a gold underline draws in on hover.

### 2.5 Imagery & Texture
- Photography should read as **local and specific** — UAE showroom floors, staff, roads, skyline — not generic international stock. Use warm-neutral color grading with a navy duotone overlay (`--mka-navy-900` at 15–30% multiply/overlay blend) on hero and CTA imagery so photography always reads "on-brand" even with placeholder stock images.
- Repeat the **low-opacity monogram watermark pattern** from `opengraph-image.png` as a subtle background texture on 1–2 dark sections (e.g. behind the Careers CTA) — opacity ~4–6%, never distracting.
- No generic flat icon sets. Where an icon is unavoidable (e.g. "At a Glance" stat markers), use **thin single-weight line icons** (1.5px stroke, no fill, gold or off-white) that feel drafted/technical — not rounded consumer-app icons. Prefer a custom minimal icon set over any default icon library's default style.
- No decorative color bars, no sidebar stripes, no drop-shadow-heavy cards. Depth comes from photography, overlay gradients, and generous spacing — not from card shadows.

---

## 3. Motion & Scroll Behavior (critical — this is the site's differentiator)

The brief: **the site must feel alive while scrolling**, not like a static brochure. Every section needs a scroll-triggered or parallax treatment, but motion should feel *engineered and precise* (matching the brand), not bouncy or playful.

**Global rules:**
- Wrap the whole scroll experience in GSAP `ScrollTrigger`, initialized in a client-only Next.js layout wrapper (`useGSAP` hook from `@gsap/react`).
- Use Motion.dev for component-level orchestration (staggered children on mount/in-view, hover/tap states, page-load hero sequence) and GSAP/ScrollTrigger specifically for scroll-position-driven effects (parallax, pinning, scrubbed timelines).
- Respect `prefers-reduced-motion: reduce` — fall back to simple opacity fades, no parallax/pinning, everywhere.
- All entrance animations: content starts ~24–40px offset with 0 opacity, eases in on a `power3.out` or Motion's `easeOut` curve, staggered by 60–100ms per child. Nothing should snap or bounce (no elastic/spring overshoot — this is a precision brand, not a playful one).

**Section-by-section motion spec:**

1. **Hero (video)** — Video plays full-bleed behind a navy gradient scrim (darker at bottom for text legibility). On load: logo lock-up and headline fade/slide up in a staggered sequence (Motion.dev), eyebrow label first, then H1 line-by-line reveal, then subtext, then scroll-cue indicator. On scroll: GSAP parallax — video container scales/translates slightly slower than scroll speed (subtle, 10–15% offset max) and the scrim darkens as the user scrolls past, so the hero content dissolves into the next section rather than abruptly cutting.
2. **Who We Are** — Text block and a supporting image/logo mark scroll-trigger into view with a horizontal offset reveal (text slides from left, image mask-reveals from right, or vice versa), triggered at ~20% viewport entry. A thin gold rule draws left-to-right above the eyebrow label as it enters.
3. **Trusted Dealer / Brand Lock-up (Dongfeng / Omoda / Jaecoo)** — Logos reveal with a staggered fade + slight scale-up (0.95 → 1), each on its own scroll-trigger stagger (80–120ms apart). On desktop, add a subtle parallax so the three logos drift at slightly different speeds as the section scrolls, giving depth without gimmick.
4. **At a Glance** — Stat numbers (showrooms / staff / nationalities) **count up** from 0 to their final value when the section enters the viewport (GSAP `ScrollTrigger` + a number-tween utility, ease `power2.out`, ~1.2–1.6s duration). Supporting copy fades in alongside. Consider a subtle full-bleed background image with fixed/parallax scroll behind the stats to add depth to what is otherwise a text-heavy section.
5. **Careers CTA** — Full-bleed navy section with the monogram watermark texture. Headline ("Be part of something bigger. Build the future with us.") does a scroll-scrubbed reveal — GSAP timeline tied to scroll progress so the line reveals/masks in as the section is pinned briefly, then releases. CTA button has a magnetic hover effect (Motion.dev — button subtly follows cursor within a small radius) and gold border draw-in on hover.
6. **Latest News & Insights** — 2–3 story cards reveal with a staggered upward fade as the row scrolls into view; each card image has a subtle Ken Burns (slow scale) on hover, and the "View all news" link underline draws in on hover. Cards should scroll-trigger individually with a slight stagger rather than all at once.
7. **Footer** — Simple fade-up on entry, no heavy animation — motion budget should be spent on the sections above.

**Navigation:** Sticky header, transparent over the hero video with off-white/logo, transitions to solid navy (or off-white with navy text, your call for contrast) after scrolling past the hero — animate this background/color transition smoothly with GSAP `ScrollTrigger` rather than a hard toggle. Include a slim scroll-progress indicator (1px, gold) at the very top of the viewport.

---

## 4. Homepage Sections — Content & Structure

Build the homepage in this exact order:

### 4.1 Hero Section (Group Video)
- Full-viewport-height section, full-bleed background **video** (use a placeholder/stock automotive-group or showroom-floor video muted/looping/autoplay with a static poster fallback for mobile/reduced-motion).
- Navy gradient scrim over the video for text legibility.
- MKA logo lock-up (provided `logo.svg`) positioned top-left in the sticky header, or centered in the hero on first load per your composition choice.
- Eyebrow label: `WELCOME TO MKA` (or similar, Electrolize, uppercase, gold).
- Headline (H1): **"A legacy that inspires. A vision that moves forward. Introducing global automotive excellence to the UAE."** — break this across 2–3 lines for a strong editorial layout; each line can reveal independently on load.
- A single primary CTA (e.g. "Discover MKA" or "Explore Our Brands") scrolling to the next section.
- Scroll-cue indicator (thin animated line or chevron) bottom-center.

### 4.2 Who We Are
- Two-column layout (desktop): short intro copy on one side, supporting image or the MK monogram treated as a large graphic element on the other.
- Eyebrow: `WHO WE ARE`.
- Short paragraph introducing MKA as the UAE's trusted automotive distribution group — legacy, scale, commitment to the market (placeholder copy is fine; keep it 2–4 sentences, confident and factual, not salesy).
- Optional secondary link: "Learn more about us" → About Us page.

### 4.3 Trusted Dealer to Our Brands
- Eyebrow: `OUR BRANDS` or `TRUSTED DEALER TO OUR BRANDS`.
- Short intro line establishing MKA as the official UAE distributor.
- Brand lock-up row: **Dongfeng / Omoda / Jaecoo** — three clean logo tiles/cards on an off-white or navy background (placeholder logo marks are fine — clearly label each), evenly spaced, with the staggered reveal + parallax described in Section 3.
- Optional: each brand tile links out or opens a brief modal/tooltip — keep homepage scope light; full brand detail can live on inner pages later.

### 4.4 At a Glance
- Eyebrow: `AT A GLANCE`.
- Short supporting copy (1–2 sentences) framing MKA's scale in the UAE.
- Three (or four) animated stat counters, e.g.:
  - Showrooms (e.g. "6+")
  - Staff (e.g. "300+")
  - Nationalities represented (e.g. "20+")
  - (Optional 4th stat if it strengthens the row, e.g. "Years of Excellence")
- Counters use the count-up animation from Section 3, Electrolize numerals at large scale, Geist labels beneath in muted grey/off-white.

### 4.5 Careers CTA
- Full-bleed navy band, monogram watermark texture background.
- Headline: **"Be part of something bigger. Build the future with us."**
- Supporting line: "Want to join our team?"
- Single CTA button → Careers page ("View Open Roles" or "Explore Careers").
- Motion per Section 3 (scroll-scrubbed headline reveal, magnetic CTA button).

### 4.6 Latest News & Insights
- Eyebrow: `NEWS & INSIGHTS`.
- Section title + a "View all" link (top-right on desktop, standard flow on mobile) → News & Insights page.
- 2–3 featured story cards in a row (image, category tag, headline, short excerpt, date). Cards image-hover Ken Burns + staggered scroll-in per Section 3.
- Each card links through to a full article page (build as a placeholder route — homepage scope only needs the card + link).

### 4.7 Footer
- Navy background, off-white text.
- Logo lock-up, primary nav links (About, News & Insights, Careers, Contact), brand links (Dongfeng/Omoda/Jaecoo), social icons (thin-line style matching Section 2.5), UAE office address/contact line, legal/copyright row at the very bottom with a 1px hairline divider above it.

---

## 5. Technical & Accessibility Notes
- Use `next/image` for all imagery with proper `sizes`/priority on hero/above-fold assets; lazy-load below-fold images.
- Video: provide a compressed `.mp4`/`.webm` pair, `poster` image, `muted playsInline autoPlay loop`, and pause it automatically off-screen (IntersectionObserver) to protect performance.
- Semantic HTML throughout (`

`, ``, ``, `

` with `aria-label`s, `

`); all interactive elements keyboard-navigable and focus-visible states styled in gold outline to match the accent system.
- Color contrast: verify off-white-on-navy and ink-on-off-white both meet WCAG AA at body-copy sizes.
- Build the count-up stat animation and all ScrollTrigger instances so they properly `kill()`/cleanup on route change (Next.js App Router client component lifecycle) to avoid memory leaks or duplicated triggers on navigation.
- Mobile: disable/simplify parallax and pinning effects (per the reduced-motion + performance guidance above); stagger/fade animations remain but should be lighter and faster (shorter durations, smaller offsets).

---

## 6. What NOT to Do
- Do not clone Al-Futtaim's layout, section order, or copy — use it only as a tonal/quality reference.
- Do not introduce a second accent color or gradient system beyond the single gold accent.
- Do not use rounded, playful, consumer-app-style UI (soft shadows, pill buttons, bouncy springs, emoji-style icons).
- Do not use generic AI-website defaults: no Inter/Roboto/system-font fallback in visible UI, no purple-on-white gradients, no stock "flat illustration" icon packs.
- Do not make the homepage feel like a car-sales landing page (no big "Book a Test Drive" hero CTA, no financing calculators) — this is a corporate distribution group site; commercial/product depth belongs on brand/inner pages, not the homepage.

---

## 7. Deliverable for This Prompt
Build the complete, responsive, animated **Next.js homepage** described above, using the attached `logo.svg`, `favicon.ico`, and `opengraph-image.png`, with the color/typography system in Section 2 implemented as reusable Tailwind config + CSS variables, and the GSAP/Motion.dev scroll behavior in Section 3 wired up section-by-section as described. Use realistic placeholder copy/imagery/stats anywhere real MKA content isn't specified above, clearly structured so real content can be swapped in later without restructuring the layout.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://mk-auto-two.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/917d42b6-dfae-4749-af72-806987706579).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
