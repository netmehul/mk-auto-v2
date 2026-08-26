# MAHY Khooray Automotive

A premium, modern automotive website designed and developed for **MAHY Khooray Automotive**, an automotive company focused on vehicle distribution, genuine parts, customer care, aftersales services, sales excellence, and future-ready automotive solutions.

The website combines a dark automotive visual language with motion-driven interactions, responsive layouts, and a modular component architecture.

---

## Overview

MAHY Khooray Automotive is designed as a digital platform that brings the company's automotive ecosystem together in one experience.

The website communicates:

- Automotive brand discovery
- Vehicle distribution
- Genuine parts
- Customer care
- Aftersales services
- Sales excellence
- Future-ready solutions
- Pre-owned vehicles
- Company values
- News & insights
- Frequently asked questions
- Contact and enquiry opportunities

The overall experience is intentionally minimal, technical, premium, and future-oriented.

---

## Design Direction

The visual direction is built around a sophisticated automotive aesthetic.

### Visual Language

- Deep navy / midnight backgrounds
- High-contrast white typography
- Subtle geometric patterns
- Hexagonal automotive UI elements
- Automotive component imagery
- DNA-inspired visual storytelling
- Thin technical line details
- Minimal borders
- Controlled glow effects
- Motion-based reveals
- Strong whitespace and composition

### Design Principles

The interface follows a few core principles:

1. **Clarity over decoration**
2. **Motion with purpose**
3. **Strong visual hierarchy**
4. **Responsive by design**
5. **Reusable components**
6. **Minimal but expressive interactions**

---

## Key Sections

### Hero

A high-impact introduction to MAHY Khooray Automotive with automotive-focused visual storytelling and motion.

### Brand Discovery

A dedicated area for discovering the automotive brands represented by MAHY Khooray Automotive.

### Comprehensive Automotive Solutions

A hexagonal visual system representing:

- Vehicle Distribution
- Genuine Parts
- Customer Care
- Aftersales Services
- Sales Excellence
- Future-Ready Solutions

### Company / Legacy Section

A brand-focused section communicating the company's vision, trust, experience, and long-term automotive direction.

### More Than Just Vehicles

A DNA-inspired section using automotive components to visually communicate the company's core values:

- Trusted Partnerships
- Customer Excellence
- Quality & Reliability
- Innovation & Growth

The section combines video, SVG icons, connecting lines, and motion-based reveals.

### Pre-Owned

A dedicated CTA experience for pre-owned vehicles.

### Offers

A promotional area for current automotive offers and opportunities.

### Testimonials

A customer-focused section highlighting experiences and trust.

### News & Insights

A dedicated area for company updates, automotive stories, and relevant insights.

### FAQ

A reusable FAQ component with:

- Expand / collapse interaction
- Animated answers
- Blur-based transitions
- Scroll-triggered section reveal
- Responsive accordion behavior

### CTA

A final conversion-focused section encouraging visitors to connect with the company.

### Footer

A responsive footer containing:

- Company logo
- Brand navigation
- Explore navigation
- Email
- Phone
- Address
- Social media
- Legal links

On mobile, navigation links transform into accordions while contact information remains visible.

---

## Motion & Interaction

Motion is an important part of the website experience.

The project uses **Motion for React** to create subtle, controlled animations.

### Examples

- Scroll-triggered section reveals
- Blur-in / blur-out text animations
- Word-by-word heading reveals
- Button entrance animations
- Button shimmer effects
- FAQ answer transitions
- Accordion animations
- DNA connection line animations
- Icon and card reveals

Animations are intentionally restrained so they support the content instead of distracting from it.

---

## Responsive Design

The website is designed for desktop, tablet, and mobile experiences.

Rather than simply shrinking the desktop layout, certain sections use dedicated responsive compositions.

### Mobile considerations

- Responsive typography
- Reduced button sizing
- Mobile-specific layouts
- Grid-based card layouts
- Background video treatment
- Mobile accordion navigation
- Centered footer content
- Simplified decorative elements
- Hidden desktop-only decorative graphics
- Touch-friendly interactive elements

---

## Component Architecture

The project follows a reusable component-based structure.

Example:

```text
components/
├── button.tsx
├── footer.tsx
├── faq.tsx
├── dna-section.tsx
├── brand-discovery.tsx
├── cta-banner.tsx
└── ...