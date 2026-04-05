# VEXA TECH | Responsive & Performance Refactor Plan

## 1. Objectives
- Perfect mobile-first design (320px+).
- Flawless tablet (641px - 1024px) layouts.
- Premium spacious desktop polish (1025px+).
- Optimized performance (no jank, no lag).
- Fluid typography and responsive spacing tokens.

## 2. Global Shell & Navigation
- [ ] Navbar: Mobile hamburger menu with smooth transitions.
- [ ] Navbar: Ensure z-index layering is bulletproof.
- [ ] SmoothScroll: Audit Lenis configuration for mobile touch devices.
- [ ] Globals.css: Clean up legacy styles in favor of Tailwind v4 canons.

## 3. Section Audit (Mobile First Refactor)

### Hero (`components/ui/shaders-hero-section.tsx`)
- [ ] Heading: Use `clamp()` or fluid Tailwind sizes.
- [ ] Background: Ensure radial-gradient is optimized for mobile.
- [ ] Layout: pt-[20vh] to pt-[25vh] balancing for mobile devices.

### About & Services (`app/components/`)
- [ ] Grid Stacking: 1 col (base), 2 col (md), 3-4 col (lg).
- [ ] Text width: Max-w-2xl for better line readability.
- [ ] Spacing: py-20 to py-32 scaling.

### Process & How We Work (`app/components/Process.tsx`)
- [ ] SVG Snake Path: Simplification logic for < 768px.
- [ ] Alternating layout: Transition to standard vertical on mobile.

### Team Showcase (`app/components/Team.tsx`)
- [ ] Cards: Flex-col on mobile, grid on desktop.
- [ ] Hover states: Optimization for touch non-hover interactions.

### Contact & Footer (`app/components/`)
- [ ] Form scaling: Touch-friendly heights and spacing.
- [ ] Footer Grid: Col-span auditing for mobile-to-desktop transitions.

## 4. Performance & Polish
- [ ] `whileHover` and `whileInView` tuning.
- [ ] Image accessibility and scaling.
- [ ] No horizontal scrollbars.
- [ ] Reduced motion support where useful.
