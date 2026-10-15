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
- **Images:** clip-path wipe on enter, settle-in scale, inset + zoom on hover; grid cards drift at different speeds and lean with scroll velocity.
- **Page transitions:** React `<ViewTransition>` — project cards and exhibition thumbnails morph into the next page’s hero; everything else lifts out and rises in.
- **Type:** masked line reveals via SplitText; links roll to a copy of themselves on hover.
- **Cursor:** the design’s red dot, grows into the "View" disc over images; magnetic CTAs.
- `prefers-reduced-motion` turns all of this into plain fades or nothing.

## Performance

- **Static HTML** for every route (`generateStaticParams` for projects and exhibitions); links prefetch the next page.
- **Images** go through `next/image`: AVIF/WebP, `sizes` matched to each Figma frame, lazy below the fold, `priority` on heroes. The 963 KB hero JPEG ships as 174 KB AVIF on a retina laptop and 29 KB on a phone. Optimised variants are cached for 30 days.
- **Blur placeholders**: `npm run blur` (also `prebuild`) inlines a 16px preview of every photo, so slow connections see shape and tone immediately.
- **Loader** only fetches its flicked frames at 240px (165 KB instead of 878 KB on retina), waits for the hero photo before flying (capped at 4s), and is skipped entirely on Save-Data / 2G or reduced motion.
- **Font**: one self-hosted woff2 via `next/font/local`, preloaded, with a metric-matched fallback to avoid layout shift.
- **Motion** animates only `transform`, `opacity` and `clip-path`; Lenis and ScrollTrigger share GSAP's single ticker.

## Develop

```bash
npm install
npm run dev
```

## Credits

Design: [Grønberg Webflow template](https://www.figma.com/community) by Pawel Gola (Figma Community). Photography from Unsplash. Type: Clash Display by Indian Type Foundry (ITF Free Font License).
