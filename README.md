# GT Evolution Racing

> *"Engineering Speed. Designing Legends."*

A cinematic, scroll-driven single-page experience that tells the story of motorsport evolution — from 1970s analog fury to 2050 hyper-electric prototypes. Built as a dark-luxury showcase in the spirit of Porsche, BMW M, and Gran Turismo.

## Demo

(https://github.com/kavyanshpandey/Gt3-evo/blob/master/GT3EVOO.mov)

## Stack

- **Next.js 15** + **TypeScript** + **React 18.3**
- **TailwindCSS** for styling, **Framer Motion** for in-view animation
- **GSAP ScrollTrigger** for the pinned horizontal timeline
- **Lenis** for momentum smooth-scroll
- **Web Audio API** — RPM-modulated synthetic engine note (mute toggle)
- All SVG art is original; photographs sourced from Unsplash under the free commercial license

## Sections

| # | Section | What it does |
|---|---|---|
| 01 | Hero | F1 silhouette emerges from fog, scroll-driven RPM HUD + telemetry, custom telemetry cursor |
| 02 | Transformation | F1 → hypercar morph with smoke billow and shift sound |
| 03 | Showcase | 10-car configurator stage: 3× Porsche 911, 4× BMW M4, 1× BMW M3, 2× BMW M3 Touring |
| 04 | Timeline | Pinned horizontal scroll, 7 eras 1970→2050 with full era specs |
| 05 | Aerodynamics | Live canvas airflow over silhouette — mouse repels particles |
| 06 | Engine | Exploded-view animation, 8 components drift apart on scroll |
| 07 | Performance | 6 SVG gauges + G-force trace |
| 08 | Garage | Drag-to-rotate turntable, 5 paint finishes, 4 mood lighting modes |
| 09 | Racing | Pinned perspective track + tire smoke + speed-line streaks |
| 10 | Stats | Animated counters with gold ember background |
| 11 | Gallery | Parallax horizontal photo cards + marquee circuit list |
| 12 | Footer | Car fades into darkness, *"The race never truly ends."* |

## Running it

```bash
nvm use 20            # Next 15 needs Node ≥ 18.18
npm install
npm run dev
```

Open `http://localhost:3000`.

## Asset licensing

- Vector art (SVG silhouettes, gauges, scene compositions) — original to this project
- Photographs — [Unsplash](https://unsplash.com/license) (free commercial use)
- Photographer credits surface on each Showcase card

If you fork this for commercial use, swap the Unsplash photos for properly-licensed BMW/Porsche imagery (Shutterstock / Adobe Stock / Motorsport Images) — Unsplash's license covers the *photo* but not the manufacturer trademarks visible in it.

## Performance

- 170 kB First Load JS, fully static (`○` prerendered)
- All animations GPU-transformed
- Next/Image optimization on every photo
- Reduced-motion media query respected
