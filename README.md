# Grønberg

A photography portfolio rebuilt from scratch in Next.js, with scroll-driven motion and image-first interactions.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4: Figma tokens live in `src/app/globals.css`
- GSAP (ScrollTrigger, SplitText, Flip) + `@gsap/react`
- Lenis smooth scrolling, driven by GSAP's ticker

## Scaling

One Tailwind spacing unit equals one Figma pixel. On desktop the 1680px frame scales with the viewport (capped at 1:1), so `px-140` is the design's 140px gutter. Mobile uses a 390px reference.

## Motion

- **Loader → hero:** the logo parts, a frame flicks through the portfolio, then the last photo flies onto the hero image.
- **Images:** clip-path wipe on enter, settle-in scale, parallax drift, inset + zoom on hover, velocity skew in Latest Work.
- **Type:** masked line reveals via SplitText; links roll to a copy of themselves on hover.
- **Cursor:** the design's red dot, grows into a "view" disc over images; magnetic CTAs.
- `prefers-reduced-motion` turns all of this into plain fades or nothing.

## Develop

```bash
npm install
npm run dev
```

## Credits

Design: [Grønberg Webflow template](https://www.figma.com/community) by Pawel Gola (Figma Community). Photography from Unsplash. Type: Clash Display by Indian Type Foundry (ITF Free Font License).
