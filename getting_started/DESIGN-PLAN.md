# penguincookie.ca - Landing Page Design Specification

## Summary

`penguincookie.ca` is the root brand hub for Ahmad's personal developer identity. It introduces PenguinCookie, links to `games.penguincookie.ca`, and will grow to host additional projects over time.

The shipped landing page keeps the original dark cosmic direction from Games Arena, but makes the site more expressive: animated hero, particle field, glowing project cards, mascot character, and a lighter alternate hero background for light mode. The interactive accent system now uses a clean brand blue instead of violet, so buttons, focus rings, hover borders, and card glows all feel consistent.

## Current Tech

- React 18 + TypeScript + Vite
- Tailwind CSS v4 via `@tailwindcss/vite`
- Static deploy on Vercel
- Theme key: `pc-theme`

## Current Assets

- `src/assets/penguin-mascot.png` - updated transparent mascot
- `src/assets/hero-bg.png` - dark mode galaxy background
- `src/assets/hero-bg-light.png` - light mode galaxy background
- `src/assets/card-games-arena.png` - Games Arena project art
- `src/assets/card-placeholder.png` - mystery project art
- `src/assets/favicon.png` - generated from the mascot

## Design Tokens

- Base surfaces remain navy/purple-black in dark mode.
- Accent system is now blue, not violet.
- Focus rings, CTA backgrounds, hover borders, card glow, and hero glow all follow the same blue family.
- Hero headline uses a blue gradient instead of a purple/indigo gradient.
- Light mode keeps the same structure but uses stronger text contrast and softer overlays so the welcome copy stays readable.

## Page Structure

1. `Nav`
   - Mascot + wordmark on the left
   - `Projects` and `About` links on desktop
   - Theme toggle on both desktop and mobile
   - `Play Games Arena` primary CTA
   - Mobile hamburger dropdown

2. `HeroSection`
   - Fixed nav offset
   - Dark mode uses `hero-bg.png`
   - Light mode uses `hero-bg-light.png`
   - Radial overlay + subtle grid overlay
   - 30 particle stars
   - Mascot illustration
   - Overline: `Welcome to PenguinCookie`
   - Headline: `Games. Projects.`
   - CTA row: `Play Games Arena` and `See Projects`

3. `ProjectsSection`
   - Reveal-on-scroll section header
   - 3-card grid
   - Card hover lifts and glows in blue
   - Live project card points to Games Arena
   - Two coming-soon cards remain disabled

4. `AboutSection`
   - Decorative mascot orbit composition
   - Short bio and skill chips
   - GitHub link
   - Games Arena link in blue

5. `Footer`
   - Mascot mark
   - Copyright line
   - GitHub and Games Arena links

## Mascot Direction

The mascot now matches the updated reference more closely while keeping the original penguin body, navy color, regular cookie, and flat polished cartoon style intact.

- Replace the chef hat with a black top hat
- Add small round glasses
- Add a red bowtie
- Preserve the cookie color, pose, proportions, and transparent background
- Use the mascot everywhere, including favicon

## Implementation Notes

- `useReveal()` attaches an `IntersectionObserver` to `.reveal` sections and reveals them once.
- Theme persistence uses `localStorage` key `pc-theme`.
- The hero overline and body copy are explicitly styled for light mode readability.
- All accent-driven hover/focus states now use the same blue family.
- The site is verified at desktop and 320px width with no horizontal overflow.

## Verification

1. `npm run build`
2. Verify dark mode loads by default with no flash
3. Toggle theme and confirm persistence via `pc-theme`
4. Confirm `Play Games Arena` navigates to `https://games.penguincookie.ca`
5. Confirm `See Projects` scrolls to `#projects`
6. Confirm light mode shows the softer galaxy background and readable welcome text
7. Confirm card hover glow, focus rings, and CTA states are blue
8. Confirm 320px layout has no horizontal scroll
