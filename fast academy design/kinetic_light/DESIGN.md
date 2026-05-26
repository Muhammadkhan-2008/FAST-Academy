---
name: Kinetic Light
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-base:
    fontFamily: Sora
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.5'
    letterSpacing: 0.05em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  container-max: 1440px
---

## Brand & Style
This design system evolves the "Kinetic Intelligence" identity into a high-clarity, sophisticated light mode environment. It targets high-performance data environments where focus and readability are paramount.

The design style is a hybrid of **Minimalism** and **Glassmorphism**. It utilizes a sterile, expansive white canvas punctuated by "hyper-real" interactive elements. The aesthetic is clean and institutional but retains a futuristic edge through vibrant accents and technical monospaced details. The defining characteristic is the "Inversion Pulse"—a high-contrast interaction model where light surfaces snap to deep, dark states upon engagement, signifying the raw power behind the clean interface.

## Colors
The palette is anchored by a sterile white base to maximize perceived space and light. 
- **Primary & Secondary:** The Electric Blue and Lime Green are tuned for light-mode accessibility, ensuring they meet contrast ratios while maintaining their "kinetic" vibrancy.
- **Neutrals:** Deep Charcoal (#0F172A) is used for all primary text and structural borders to ensure a grounded, professional feel.
- **Interaction:** A "Deep Navy" (#1E293B) is reserved for hover states and active interactive nodes, creating a dramatic visual shift from light to dark that signals intelligence and processing power.

## Typography
The typography system prioritizes the geometric clarity of **Sora** for all interface levels. For technical data, logs, and metadata, **JetBrains Mono** (substituting Sora Mono for better legibility at small sizes) provides a structured, developer-centric feel. 

Headlines should utilize tight letter-spacing to maintain a "compressed" high-tech look. Body text remains airy and readable in deep charcoal. Labels are strictly uppercase to differentiate from interactive text.

## Layout & Spacing
The design system employs a **Fluid Grid** model built on an 8px base unit. 

- **Desktop:** A 12-column grid with generous 24px gutters. Large 64px margins create a "gallery" effect, framing the data.
- **Mobile:** A 4-column grid with 16px margins. 
- **Consistency:** Padding within cards and containers should always be a multiple of 16px (2x base) to ensure a balanced, rhythmic distribution of white space.

## Elevation & Depth
Depth is achieved through **Tonal Layering** and **Glassmorphism**. 

1.  **Base Layer:** Solid #F8FAFC.
2.  **Surface Layer:** Pure White (#FFFFFF) with a very fine 1px stroke (#E2E8F0) and a soft, expansive ambient shadow (0px 10px 30px rgba(15, 23, 42, 0.05)).
3.  **Floating Elements:** Use a backdrop-blur (12px) with a semi-transparent white fill (rgba(255, 255, 255, 0.7)) to indicate temporary overlays or navigation bars.

Avoid heavy shadows. Rely on the subtle border and the change in surface color to indicate hierarchy.

## Shapes
The shape language is "Soft-Technical." Elements use a 4px (0.25rem) base radius to maintain a professional, architectural feel. This prevents the interface from feeling too "bubbly" or consumer-grade, keeping it aligned with high-end SaaS and technical tools. Larger containers like cards may scale up to 8px to soften their presence against the background.

## Components
- **Buttons:** Primary buttons are solid Blue (#2563EB) with white text. Secondary buttons use a ghost style with a 1px Charcoal border.
- **Interactive Cards:** The signature "Dark Hover." Upon hover, the card background transitions over 200ms to Deep Navy (#0F172A). Typography inside the card must invert to White, and accent colors (Lime/Blue) should brighten for maximum contrast against the dark background.
- **Inputs:** Clean, white fills with a bottom-only 2px Charcoal border that glows Blue on focus.
- **Chips:** Small, Pill-shaped (rounded-xl) with light gray backgrounds (#F1F5F9) and monospaced technical labels.
- **Data Tables:** Zebra-striping using #F8FAFC on even rows. No vertical borders; use generous horizontal padding and monospaced digits for alignment.
- **Nodes/Status Indicators:** Small, vibrant Lime Green or Blue circles with a subtle "pulse" animation to indicate live data processing.