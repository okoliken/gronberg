# Grønberg

A photography portfolio built from scratch to answer one question: **how fast can a site full of large photos feel, even on a bad connection?**

**Live:** [gronberg-alpha.vercel.app](https://gronberg-alpha.vercel.app) · **Design:** [Grønberg Webflow template](https://www.figma.com/community) by Pawel Gola (Figma Community)

Next.js 16 · React 19 · Tailwind CSS v4 · GSAP (ScrollTrigger, SplitText) · Lenis · Vercel

---

## Why I built it

Photography sites are the worst case for performance: full-bleed images, dozens of them per page, and heavy motion on top. The easy version of this site ships 18 MB of JPEGs, shows blank boxes on a slow network and cuts between pages with a white flash.

The goal was to keep the motion of an award-style site (loader, scroll reveals, parallax, morphing page transitions) and still have it load like a text page.

## What keeps it fast

### 1. Every photo is sized to the frame it sits in
`next/image` converts each JPEG to AVIF (WebP fallback) at the width its Figma frame actually needs, with `sizes` written per layout slot. Images below the fold load only when they approach the viewport; heroes are marked `priority`.

| Image | Original JPEG | Served (AVIF, retina) |
| --- | --- | --- |
| Home hero | 963 KB | 173 KB |
| “Dancing” card | 897 KB | 58 KB |
| “One Eye” card | 310 KB | 33 KB |
| “Style & Fashion” card | 283 KB | 24 KB |
| Portrait thumbnail | 54 KB | 7 KB |

A phone gets the hero at **29 KB**. The 42 originals total 18 MB; a first visit to the home page transfers about 540 KB in all.

### 2. Blur placeholders: the page is never a set of empty boxes
`scripts/blur.mjs` (runs on every build) makes a 16px blurred version of each photo and inlines it as the `next/image` placeholder. On a slow connection you immediately see each photo’s shape and tone, and it sharpens as the real file arrives.

### 3. Navigation waits for content, then the clicked image travels
Every route is pre-rendered to static HTML (`generateStaticParams` for projects and exhibitions) and `<Link>` prefetches it. So unlike a typical SPA, a click never lands on a half-empty page that fills in afterwards: the next page is already there.

That is also what makes the shared-element transitions possible. With React’s `<ViewTransition>`, the project card you click *becomes* the hero of the project page: it grows from its spot in the grid to the centre of the screen while the rest of the page lifts away. Exhibition thumbnails and the “Next Project” image do the same. Browsers without the View Transitions API simply navigate.

### 4. A loader that respects the network
The intro loader flicks through the portfolio and flies the last photo onto the hero. It is built to never cost much:
- the flicked frames load at 240px, not hero size (**165 KB instead of 878 KB** on a retina screen);
- it holds the final fly-out until the hero photo has arrived, capped at 4 seconds;
- a tiny inline script in `<head>` checks the connection **before any JavaScript bundle loads**. On Save-Data, 2G/3G or `prefers-reduced-motion`, the loader is hidden with CSS, its frames are never fetched, and the hero paints straight from the server HTML.

That last change took the home page on slow 3G from an LCP of **17.6 s to 2.3–3.9 s**.

### 5. Nothing jumps
- One self-hosted woff2 through `next/font/local`: preloaded, with a size-matched fallback so the swap doesn’t move text.
- Every image sits in a frame with a fixed aspect ratio, so nothing reflows as photos load. CLS is effectively zero on every page.

### 6. Motion that stays on the compositor
GSAP only animates `transform`, `opacity` and `clip-path`. Lenis smooth scroll and ScrollTrigger share GSAP’s single ticker. Parallax drifts photos inside an 8% overscan, so frames never resize. `prefers-reduced-motion` turns it all into plain fades.

### 7. Caching
| Asset | Cache |
| --- | --- |
| Pages (static HTML) | Vercel edge; revalidated per request with an ETag, so a deploy is visible immediately |
| JS, CSS, font (content-hashed) | `max-age=31536000, immutable`, never re-downloaded |
| Optimised images | Generated once per width, then served from the Vercel edge (`minimumCacheTTL` 30 days) |
| Visited routes | Kept in the Next.js router cache, so Back is instant |

## Benchmarks

Lighthouse 12, mobile, against the live Vercel deployment. Reproduce with `npm run bench -- https://gronberg-alpha.vercel.app`.

- **Slow 4G:** Lighthouse default, simulated 1.6 Mbps / 150 ms RTT, 4× CPU slowdown.
- **Slow 3G:** applied throttling, 400 Kbps / 400 ms per request, 4× CPU slowdown.

| Network | Route | Score | FCP | LCP | TBT | CLS | Transferred |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Slow 4G | `/` | 98 | 1.0 s | 1.0 s | 150 ms | 0 | 539 KB |
| Slow 4G | `/projects` | 98 | 1.0 s | 1.3 s | 110 ms | 0 | 393 KB |
| Slow 4G | `/projects/dancing-in-black-and-white` | 99 | 1.0 s | 1.4 s | 90 ms | 0 | 399 KB |
| Slow 4G | `/exhibitions` | 99 | 1.1 s | 1.3 s | 50 ms | 0 | 291 KB |
| Slow 4G | `/about` | 98 | 1.0 s | 1.1 s | 120 ms | 0.002 | 296 KB |
| Slow 3G | `/` | 69 | 1.8 s | 3.6 s | 850 ms | 0.002 | 358 KB |
| Slow 3G | `/projects` | 88 | 1.8 s | 1.9 s | 420 ms | 0.013 | 371 KB |
| Slow 3G | `/projects/dancing-in-black-and-white` | 84 | 1.8 s | 3.6 s | 270 ms | 0.031 | 379 KB |
| Slow 3G | `/exhibitions` | 91 | 1.7 s | 1.7 s | 340 ms | 0.056 | 291 KB |
| Slow 3G | `/about` | 94 | 1.9 s | 1.9 s | 220 ms | 0.002 | 296 KB |

Every page scores 98–99 on slow 4G with LCP between 1.0 s and 1.4 s. On slow 3G every page is still usable within 2–4 s, and layout shift stays under 0.06 everywhere (0.1 is the “good” threshold).

## Design fidelity

Layout, type scale, colours and image crops were read straight from the Figma file through the Plugin API instead of eyeballed. One Tailwind spacing unit equals one Figma pixel: on desktop the 1680px frame scales with the viewport (`--spacing: min(100vw / 1680, 1px)`), so `px-140` is the design’s 140px gutter at any width. Mobile uses its own 390px reference.

## Motion

- **Loader → hero:** the logo parts, a frame flicks through the work, the last photo flies onto the hero.
- **Images:** clip-path wipe on enter, settle-in scale, parallax drift, inset and zoom on hover; grid cards move at different speeds and lean with scroll velocity.
- **Page transitions:** shared-element morphs with `<ViewTransition>`; everything else lifts out and rises in.
- **Type:** masked line reveals with SplitText; links roll to a copy of themselves on hover.
- **Cursor:** the design’s red dot, which grows into the “View” disc over work.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # also regenerates blur placeholders
npm run bench -- <url>
```

## Credits

Design by Pawel Gola (Grønberg, Figma Community). Photography from Unsplash. Typeface: Clash Display by Indian Type Foundry (ITF Free Font License). Built by [@okoliken](https://github.com/okoliken).
