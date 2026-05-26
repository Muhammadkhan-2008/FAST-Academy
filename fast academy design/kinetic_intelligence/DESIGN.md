---
name: Kinetic Intelligence
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf4'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dde9ff'
  surface-container-highest: '#d5e3fd'
  on-surface: '#0d1c2f'
  on-surface-variant: '#424754'
  inverse-surface: '#233144'
  inverse-on-surface: '#ebf1ff'
  outline: '#727785'
  outline-variant: '#c2c6d6'
  surface-tint: '#005ac2'
  primary: '#0058be'
  on-primary: '#ffffff'
  primary-container: '#2170e4'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#3f6700'
  on-tertiary: '#ffffff'
  tertiary-container: '#518200'
  on-tertiary-container: '#f9ffea'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#acf847'
  tertiary-fixed-dim: '#91db2a'
  on-tertiary-fixed: '#102000'
  on-tertiary-fixed-variant: '#304f00'
  background: '#f8f9ff'
  on-background: '#0d1c2f'
  surface-variant: '#d5e3fd'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin: 32px
  container-max: 1440px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system for the Future Academy of Science and Technology (FAST) is built on a foundation of "Precision Modernism." It is designed to evoke feelings of institutional authority mixed with cutting-edge experimental energy. The target audience includes researchers, elite students, and tech-forward educators who require high-density information environments that remain legible and inspiring.

The aesthetic blends **Modern Corporate** structure with **Glassmorphism** and **Futuristic** accents. Traditionally a dark-mode system, this light-mode adaptation maintains high-contrast precision, moving from a "stealth" aesthetic to a "clean-room" laboratory environment. It utilizes a crisp white and light-gray foundation to ensure maximum legibility, punctuated by vibrant interactive elements that guide the user's focus toward critical actions.

## Colors
The palette is centered on **Electric Blue (#3B82F6)** as the primary action color, providing a clear signal for high-importance interactions and progress indicators. In this light-mode configuration, surfaces are primarily driven by neutral tints and off-whites to create a clinical, high-tech backdrop.

**Deep Navy (#0F172A)**, previously the background, now serves as the secondary color used for high-contrast text, navigation headers, and grounding elements. **Cyber Lime (#84CC16)** remains the reserved accent for success states and "active" status indicators, providing a sharp "terminal" pop against the light surfaces. The neutral **Slate Gray (#334155)** defines the structural borders and secondary metadata, ensuring hierarchy without the harshness of pure black-on-white.

## Typography
This design system employs a three-tiered font strategy. **Sora** is used for headlines to provide a geometric, futuristic character. **Inter** handles all body copy and long-form reading, chosen for its exceptional clarity in data-heavy environments. **JetBrains Mono** is utilized for lab terminals, technical specs, and metadata, reinforcing the scientific nature of the platform.

Headlines should use tighter letter spacing to maintain a "locked-in" architectural feel. Technical labels should always use the mono font and can be set in uppercase for improved scannability in dashboards. In light mode, font weights are strictly maintained to ensure legibility against bright backgrounds.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a 12-column structure for desktop. To emphasize the "Tech" aesthetic, use generous internal padding within containers (minimum 24px) to create a breathable, high-end feel. 

Spacing follows a 4px base unit. Vertical stacks in dashboards should use `stack-md` (16px) for related items and `stack-lg` (32px) for distinct sections. For technical lab interfaces, the grid can be tightened to 8-column or 4-column sub-grids to allow for high information density without losing structural alignment.

## Elevation & Depth
Depth is achieved through **Glassmorphism** and **Tonal Layering** to maintain a clean, modern aesthetic without relying on heavy shadows.
- **Base Layer:** Clean Light Grey/White surface.
- **Surface Layer:** White containers with a 1px Slate Gray (#334155) border at low opacity.
- **Interaction Layer:** 1px solid borders using Electric Blue at 40% opacity to define container edges on focus.
- **Active Elevation:** Instead of lifting an object with deep shadows, use a soft, subtle perimeter glow or a shift in background saturation to indicate "Active" states.

## Shapes
The shape language is "Soft-Industrial." We use a standard **0.25rem (4px)** radius for most UI elements (inputs, small buttons) to maintain a precise, technical look. Larger containers like course cards or lab terminals use **0.5rem (8px)**. The "Soft" roundedness level (1) ensures the interface feels engineered rather than organic. Avoid fully rounded pill shapes unless used for status tags or "Chatbook" message bubbles to differentiate human interaction from system data.

## Components
### Buttons & Actions
Primary buttons use a solid **Electric Blue** fill with white text. Secondary buttons use a **Slate Gray** outline. All buttons should have a hover state that slightly darkens the primary fill or increases the border visibility to signify interactivity.

### Course Cards
Cards should feature a 1px border in **Slate Gray** and a solid white background. Use **Sora** for the course title and **JetBrains Mono** for the "Course ID" or "Lab Level" indicator at the top right.

### Lab Terminals
These containers use a high-contrast dark background (#0F172A) even in light mode to preserve the "terminal" feel, with **Cyber Lime** text and top-borders. All text inside must be **JetBrains Mono**. Use glowing cursors and "Scanning" animations for loading states to reinforce the high-tech theme.

### Chatbook (Messaging Interface)
The messaging interface departs slightly from the rigid grid. User bubbles use **Electric Blue** with sharp corners on the right. Incoming bubbles use **Slate Gray** or a light grey variant with sharp corners on the left. Avatars should be square with a 2px radius.

### Input Fields
Inputs should have a **Slate Gray** bottom border that turns **Electric Blue** on focus. Placeholder text should be in **JetBrains Mono** to signify "Input Required."

### Chips & Status
Status indicators for "System Online" or "Success" use **Cyber Lime** text with a matching 10-15% opacity background fill to ensure contrast on light surfaces.