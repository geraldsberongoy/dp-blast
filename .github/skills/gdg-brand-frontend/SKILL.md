---
name: gdg-brand-frontend
description: "Use when creating a separate website that must match Code Rush/GDG PUP branding, color tokens, typography, and motion style. Keywords: Code Rush brand, GDG palette, Google colors, visual identity, design tokens, brand spec."
---

# GDG Brand Context Skill

## Goal

Use this skill when building a different website that should feel visually and emotionally consistent with the GDG identity.

The outcome should preserve:

- The 4-color GDG palette and token names
- Bright, clean, white-first surfaces
- Playful geometric decoration and motion
- Bold, heavy display typography with concise, energetic copy

## Source-of-Truth Tokens

### Color tokens (required)

- blue: #4285F4
- red: #EA4335
- yellow: #FBBC04
- green: #34A853

### Neutral tokens

- background: #F8F9FA (global root background token)
- foreground: #202124 (global root text token)
- common surface: #FFFFFF
- supporting grays: Tailwind gray scale (100-900), primarily gray-50 to gray-700

### CSS variable naming (required)

Use these exact variable names to preserve portability across projects:

- --google-blue
- --google-red
- --google-yellow
- --google-green

## Brand Expression Rules

### Logo/text treatment

- Multi-color letter treatment should cycle through the 4 brand colors per character for key identity words.
- Avoid gradients for brand lettering; use flat, solid token colors.

### Tone and copy

- Use short, energetic, challenge-oriented copy.
- Preferred style: imperative micro-slogans (example pattern: "Code. Create. Conquer.").
- Keep paragraphs concise and action-focused.

## Typography System

- Primary font style: geometric sans with modern, clean forms.
- Existing implementation uses Outfit via Next font loading and exposes it as --font-google-sans.
- Heading style: extra-bold to black weights, tight tracking, high visual impact.
- Body style: neutral gray, high readability, medium line height.

## Layout and UI Patterns

### Page shell

- White or near-white foundation with subtle translucent overlays.
- Sticky top header with soft backdrop blur.
- Rounded corners are prominent across cards, badges, and buttons.
- Use soft shadows (not harsh) for depth.

### Decorative language

- Add oversized, low-opacity developer motifs in the background (such as angle brackets).
- Include floating geometric accents:
  - square (blue)
  - ring/circle (red)
  - square or diamond (yellow)
  - pill/capsule (green)

### Required background bracket motif

- Include the bracket background block as a standard decorative layer in hero-style pages.
- Keep it non-interactive and low-contrast so it never competes with content.

```tsx
<div className="gdg-decor-bg" aria-hidden="true">
  <span className="bracket text-gray-900" style={{ marginRight: "2rem" }}>
    &lt;
  </span>
  <span className="bracket text-gray-900">&gt;</span>
</div>
```

```css
.gdg-decor-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.03;
  font-weight: 900;
  font-size: 40vw;
  user-select: none;
}

.gdg-decor-bg .bracket {
  transform: scaleY(0.9);
  font-family: sans-serif;
  letter-spacing: -2vw;
}
```

### Components

- Primary CTA: blue background, white text, rounded/full pill or rounded-xl, lift on hover.
- Secondary CTA: white background, gray border, subtle hover tint.
- Feature cards: white surface, soft border, rounded-2xl or rounded-3xl, slight upward hover transform.
- Status accents:
  - success/emphasis: green
  - warning/score highlight: yellow
  - urgency/error: red

## Motion and Interaction Specs

### Motion style

- Use spring-based motion for hover and entrance interactions.
- Keep motion playful but controlled.
- Typical values used in source:
  - spring stiffness: around 200-300
  - damping: around 15-25

### Ambient animation patterns

- Floating idle loop for decorative shapes (gentle vertical oscillation + minor rotation).
- Loop duration generally 5-6s with easeInOut timing.
- Use slight delays per shape so movement feels organic.

### Hover behavior

- Scale up slightly (around 1.05 to 1.2 depending on element size).
- Add micro-translation on CTA hover and icon nudge for directional cues.

## Accessibility and Contrast Constraints

- Preserve high contrast for text on white backgrounds.
- Do not place yellow text on white for long-form body copy.
- Keep decorative background elements low opacity and non-interfering.
- Respect reduced-motion preferences when possible for non-essential loops.

## Implementation Checklist

Use this checklist before shipping a new page in the same brand family:

- Brand tokens are defined with exact hex values and CSS variable names.
- Primary surfaces are white/near-white with soft neutral gray support.
- Header, CTA, and card patterns match the rounded, soft-shadow language.
- Geometric decorative accents include all 4 token colors.
- Motion uses spring interactions and slow ambient floating loops.
- Hero and key headings use bold, compact, high-impact typography.
- Copy tone is concise, energetic, and challenge-oriented.

## Anti-Patterns (avoid)

- Dark-heavy themes as default presentation.
- Neon gradients or glassmorphism-heavy effects that overpower token colors.
- Overly corporate or muted visual tone.
- Long, dense marketing paragraphs that dilute the fast-paced brand voice.

## Suggested Starter Token Block

Use this when bootstrapping a new site:

:root {
--background: #f8f9fa;
--foreground: #202124;
--google-blue: #4285f4;
--google-red: #ea4335;
--google-yellow: #fbbc04;
--google-green: #34a853;
}