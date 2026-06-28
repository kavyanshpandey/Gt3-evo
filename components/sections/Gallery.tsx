"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GALLERY_CARDS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Infinite-feel horizontal gallery. The track is duplicated so the
 * marquee animation seamlessly loops. Each card uses an SVG-rendered
 * scene composition instead of a real photo (no copyrighted assets).
 */
export function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const dragX = useTransform(scrollYProgress, [0, 1], [40, -400]);

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative py-32 md:py-40 bg-bg overflow-hidden"
    >
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="10 · ARCHIVE"
          title={
            <>
              Every frame
              <br />
              <span className="gradient-text-red">earned in anger.</span>
            </>
          }
          body="An infinite scroll of original race photography concepts — pit-lane chaos, wet-weather heroics, and 3-AM endurance moments. No two laps look alike."
          accent="#FF1E1E"
        />
      </div>

      {/* Horizontal scroll track (parallax-translated by vertical scroll) */}
      <motion.div style={{ x: dragX }} className="mt-12 flex gap-6 px-6 will-change-transform">
        {[...GALLERY_CARDS, ...GALLERY_CARDS].map((card, i) => (
          <GalleryCard key={i} idx={i} {...card} />
        ))}
      </motion.div>

      {/* Auto-marquee strip */}
      <div className="mt-10 relative overflow-hidden border-y border-white/5 py-5">
        <div className="flex gap-12 animate-marquee whitespace-nowrap font-display text-2xl md:text-4xl tracking-display text-silver/30">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              MONZA · SPA · SUZUKA · NÜRBURGRING · LE MANS · BAHRAIN · INTERLAGOS · IMOLA · MELBOURNE · COTA ·
              <span className="text-racered">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({
  title,
  meta,
  hue,
  t,
  idx,
}: {
  title: string;
  meta: string;
  hue: string;
  t: string;
  idx: number;
}) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative w-[380px] h-[480px] flex-shrink-0 rounded-xl overflow-hidden glass-strong group"
      data-cursor="hover"
    >
      {/* SVG scene */}
      <div className="absolute inset-0">
        <SceneArt hue={hue} variant={idx % 4} />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)" }}
      />

      {/* Corner tag */}
      <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest2 px-2 py-1 bg-bg/70 border border-white/10">
        <span style={{ color: hue }}>● </span>
        {t}
      </div>

      {/* Title */}
      <div className="absolute bottom-5 left-5 right-5">
        <div className="font-display text-3xl tracking-display leading-tight">{title}</div>
        <div className="mt-1 font-mono text-[10px] tracking-widest2 text-silver/60">{meta}</div>
        <div className="mt-3 h-px w-12 group-hover:w-full transition-all duration-500" style={{ background: hue }} />
      </div>

      {/* Hover scan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-x-0 h-12 animate-scan-line" style={{ background: `linear-gradient(180deg, transparent, ${hue}33, transparent)` }} />
      </div>
    </motion.article>
  );
}

function SceneArt({ hue, variant }: { hue: string; variant: number }) {
  // Four hand-tuned compositions — pit, corner, night, studio — all SVG.
  return (
    <svg viewBox="0 0 380 480" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`bg-${variant}-${hue}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={shade(hue, 0.1)} />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
        <radialGradient id={`spot-${variant}-${hue}`}>
          <stop offset="0%" stopColor={hue} stopOpacity="0.5" />
          <stop offset="100%" stopColor={hue} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="380" height="480" fill={`url(#bg-${variant}-${hue})`} />
      <circle cx="190" cy="280" r="200" fill={`url(#spot-${variant}-${hue})`} />

      {variant === 0 && <PitScene hue={hue} />}
      {variant === 1 && <CornerScene hue={hue} />}
      {variant === 2 && <NightScene hue={hue} />}
      {variant === 3 && <StudioScene hue={hue} />}

      {/* grain overlay */}
      <rect width="380" height="480" fill="black" opacity="0.05" />
    </svg>
  );
}

function PitScene({ hue }: { hue: string }) {
  return (
    <g>
      {/* pit wall */}
      <rect y="320" width="380" height="160" fill="#0a0a0a" />
      <rect y="318" width="380" height="3" fill={hue} opacity="0.6" />
      {/* garage doors */}
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={i * 64 + 8} y={340} width={52} height={100} fill="#111" stroke="#222" />
      ))}
      {/* lit garage */}
      <rect x={130} y={342} width={52} height={96} fill={hue} opacity="0.18" />
      <rect x={130} y={342} width={52} height={6} fill={hue} />
      {/* pit crew silhouettes */}
      {Array.from({ length: 7 }).map((_, i) => (
        <ellipse key={i} cx={40 + i * 50} cy={460} rx={14} ry={5} fill="black" />
      ))}
      {/* car shape */}
      <rect x={120} y={420} width={140} height={20} fill="#0a0a0a" />
      <rect x={140} y={410} width={100} height={15} fill={hue} opacity="0.6" />
      {/* sparks */}
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={i} cx={170 + i * 8} cy={440 + (i % 3) * 4} r="1.4" fill="#ff7a00" />
      ))}
    </g>
  );
}

function CornerScene({ hue }: { hue: string }) {
  return (
    <g>
      {/* asphalt */}
      <path d="M0,360 Q190,300 380,360 L380,480 L0,480 Z" fill="#0a0a0a" />
      <path d="M0,360 Q190,300 380,360" fill="none" stroke={hue} strokeWidth="1.5" opacity="0.7" />
      <path d="M40,400 Q190,340 340,400" fill="none" stroke="#d4af37" strokeWidth="1" strokeDasharray="6 6" opacity="0.6" />
      {/* curbs */}
      <path d="M0,360 Q190,300 380,360"
            stroke="url(#kerb)"
            strokeWidth="6" fill="none" />
      <defs>
        <pattern id="kerb" width="14" height="6" patternUnits="userSpaceOnUse">
          <rect width="7" height="6" fill="#FF1E1E" />
          <rect x="7" width="7" height="6" fill="#fff" />
        </pattern>
      </defs>
      {/* horizon trees */}
      {Array.from({ length: 18 }).map((_, i) => (
        <rect key={i} x={i * 22} y={290 - (i % 3) * 6} width={16} height={20} fill="#0d130a" />
      ))}
      {/* car */}
      <g transform="translate(150 320)">
        <rect width="80" height="14" rx="3" fill="#0a0a0a" />
        <rect y="-4" x="20" width="40" height="6" fill={hue} />
        <circle cx="14" cy="14" r="6" fill="#1a1a1a" />
        <circle cx="66" cy="14" r="6" fill="#1a1a1a" />
      </g>
    </g>
  );
}

function NightScene({ hue }: { hue: string }) {
  return (
    <g>
      <rect y="0" width="380" height="280" fill="#020308" />
      {/* stars */}
      {Array.from({ length: 30 }).map((_, i) => (
        <circle key={i} cx={(i * 53) % 380} cy={(i * 37) % 240} r={0.8} fill="white" opacity={0.4 + (i % 5) * 0.1} />
      ))}
      {/* moonlight */}
      <circle cx="300" cy="80" r="38" fill="white" opacity="0.04" />
      <circle cx="300" cy="80" r="20" fill="white" opacity="0.08" />
      {/* tarmac */}
      <rect y="280" width="380" height="200" fill="#0a0a0a" />
      {/* light pylons */}
      {[60, 190, 320].map((x, i) => (
        <g key={i}>
          <rect x={x - 1} y={120} width={2} height={170} fill="#1a1a1a" />
          <circle cx={x} cy={118} r="6" fill={hue} opacity="0.9" />
          <path d={`M${x},124 L${x - 50},280 L${x + 50},280 Z`} fill={hue} opacity="0.06" />
        </g>
      ))}
      {/* car silhouette */}
      <g transform="translate(140 320)">
        <rect width="100" height="18" rx="4" fill="#080808" />
        <rect x="20" y="-6" width="60" height="6" rx="2" fill="#111" />
        <rect x="-2" y="8" width="12" height="4" fill={hue} />
        <circle cx="18" cy="18" r="7" fill="#1a1a1a" />
        <circle cx="82" cy="18" r="7" fill="#1a1a1a" />
      </g>
    </g>
  );
}

function StudioScene({ hue }: { hue: string }) {
  return (
    <g>
      <ellipse cx="190" cy="380" rx="240" ry="50" fill="black" opacity="0.6" />
      <ellipse cx="190" cy="380" rx="180" ry="36" fill={hue} opacity="0.15" />
      {/* studio backdrop sweep */}
      <path d="M0,300 Q190,200 380,300 L380,0 L0,0 Z" fill="#0c0c0c" />
      <rect y="0" width="380" height="120" fill="#050505" />
      {/* car (top-down profile) */}
      <g transform="translate(80 330)">
        <rect width="220" height="14" rx="6" fill="#0a0a0a" />
        <rect x="40" y="-8" width="140" height="10" rx="3" fill="#101010" />
        <rect x="40" y="-6" width="140" height="3" fill={hue} />
        <circle cx="30" cy="14" r="8" fill="#1a1a1a" />
        <circle cx="190" cy="14" r="8" fill="#1a1a1a" />
      </g>
      {/* studio rim */}
      <rect x="40" y="118" width="300" height="2" fill={hue} opacity="0.4" />
    </g>
  );
}

function shade(hex: string, amt: number) {
  const c = parseInt(hex.replace("#", ""), 16);
  let r = (c >> 16) & 255;
  let g = (c >> 8) & 255;
  let b = c & 255;
  r = Math.round(r * amt);
  g = Math.round(g * amt);
  b = Math.round(b * amt);
  return `rgb(${r},${g},${b})`;
}
