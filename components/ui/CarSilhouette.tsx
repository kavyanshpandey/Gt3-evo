"use client";

import { motion } from "framer-motion";

type Variant = "f1" | "gt3" | "hyper" | "prototype" | "ev";

/**
 * Vector silhouettes for the showcase cars. Original artwork — no
 * manufacturer branding. Each silhouette accepts an accent color
 * that drives the glow, livery stripes, and headlight tint.
 */
export function CarSilhouette({
  variant,
  hue,
  className = "",
  glow = true,
}: {
  variant: Variant;
  hue: string;
  className?: string;
  glow?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 600 220"
      className={className}
      style={
        glow ? { filter: `drop-shadow(0 20px 40px ${hue}55) drop-shadow(0 0 60px ${hue}22)` } : undefined
      }
    >
      <defs>
        <linearGradient id={`body-${variant}-${hue}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#222" />
          <stop offset="55%" stopColor="#0a0a0a" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
        <linearGradient id={`accent-${variant}-${hue}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={hue} stopOpacity="0" />
          <stop offset="40%" stopColor={hue} stopOpacity="1" />
          <stop offset="100%" stopColor={hue} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`glass-${variant}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#88ccff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#001428" stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id={`light-${variant}-${hue}`}>
          <stop offset="0%" stopColor={hue} stopOpacity="1" />
          <stop offset="100%" stopColor={hue} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground reflection */}
      <ellipse cx="300" cy="200" rx="240" ry="12" fill="black" opacity="0.6" />
      <ellipse cx="300" cy="200" rx="180" ry="6" fill={hue} opacity="0.18" />

      {variant === "f1" && <F1Shape variant={variant} hue={hue} />}
      {variant === "gt3" && <GT3Shape variant={variant} hue={hue} />}
      {variant === "hyper" && <HyperShape variant={variant} hue={hue} />}
      {variant === "prototype" && <PrototypeShape variant={variant} hue={hue} />}
      {variant === "ev" && <EVShape variant={variant} hue={hue} />}
    </svg>
  );
}

const round = (n: number, p = 3) => Math.round(n * 10 ** p) / 10 ** p;

function Wheel({ cx, cy, r = 32, hue }: { cx: number; cy: number; r?: number; hue: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#050505" stroke="#1c1c1c" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={r - 6} fill="#0a0a0a" stroke="#2a2a2a" />
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={round(cx + Math.cos(a) * (r - 8))}
            y2={round(cy + Math.sin(a) * (r - 8))}
            stroke="#2a2a2a"
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx={cx} cy={cy} r={4} fill={hue} />
    </g>
  );
}

function F1Shape({ variant, hue }: { variant: string; hue: string }) {
  return (
    <g>
      {/* floor / underbody */}
      <path d="M60 160 L540 160 L540 168 L60 168 Z" fill="#080808" />
      {/* nose */}
      <path d="M40 150 Q140 140 220 130 L260 122 L260 152 L60 152 Z" fill={`url(#body-${variant}-${hue})`} />
      {/* sidepod */}
      <path d="M220 152 Q260 100 360 100 L420 100 Q480 100 520 130 L520 152 Z" fill={`url(#body-${variant}-${hue})`} />
      {/* engine cover */}
      <path d="M320 100 Q360 60 400 60 L420 60 Q450 70 450 100 Z" fill="#111" />
      {/* halo */}
      <path d="M300 96 Q320 50 360 50 Q400 50 420 96" fill="none" stroke="#1a1a1a" strokeWidth="6" />
      {/* cockpit */}
      <path d="M315 100 Q345 78 385 78 Q420 78 425 100 Z" fill={`url(#glass-${variant})`} />
      {/* front wing */}
      <rect x="40" y="148" width="40" height="6" fill="#111" />
      <rect x="40" y="138" width="40" height="3" fill={hue} />
      {/* rear wing */}
      <path d="M490 60 L540 60 L548 70 L548 110 L490 110 Z" fill="#111" />
      <rect x="490" y="58" width="58" height="4" fill={hue} />
      <line x1="494" y1="62" x2="494" y2="148" stroke="#222" strokeWidth="3" />
      <line x1="544" y1="62" x2="544" y2="148" stroke="#222" strokeWidth="3" />
      {/* livery stripe */}
      <rect x="80" y="138" width="380" height="3" fill={`url(#accent-${variant}-${hue})`} />
      {/* headlight glow */}
      <circle cx="55" cy="146" r="14" fill={`url(#light-${variant}-${hue})`} opacity="0.9" />
      <Wheel cx={140} cy={168} hue={hue} />
      <Wheel cx={460} cy={168} hue={hue} />
    </g>
  );
}

function GT3Shape({ variant, hue }: { variant: string; hue: string }) {
  return (
    <g>
      {/* lower body */}
      <path d="M50 170 L70 130 L160 105 L280 92 L420 92 L500 110 L545 130 L555 170 Z" fill={`url(#body-${variant}-${hue})`} />
      {/* roof */}
      <path d="M210 92 L260 60 L380 60 L420 92 Z" fill="#0c0c0c" />
      {/* greenhouse */}
      <path d="M225 90 L268 64 L376 64 L412 90 Z" fill={`url(#glass-${variant})`} />
      {/* hood line */}
      <path d="M70 130 L200 100 L250 95" fill="none" stroke="#1f1f1f" strokeWidth="1.4" />
      {/* livery stripe */}
      <rect x="80" y="138" width="440" height="6" fill={`url(#accent-${variant}-${hue})`} />
      <rect x="280" y="100" width="120" height="4" fill={hue} opacity="0.6" />
      {/* rear wing */}
      <path d="M450 70 L555 60 L560 66 L555 78 L450 80 Z" fill="#0c0c0c" />
      <line x1="468" y1="78" x2="468" y2="118" stroke="#1f1f1f" strokeWidth="2" />
      <line x1="540" y1="78" x2="540" y2="120" stroke="#1f1f1f" strokeWidth="2" />
      {/* splitter */}
      <rect x="50" y="170" width="510" height="6" fill="#0a0a0a" />
      <rect x="50" y="170" width="510" height="2" fill={hue} opacity="0.55" />
      {/* headlights */}
      <ellipse cx="78" cy="135" rx="14" ry="5" fill={hue} opacity="0.85" />
      <Wheel cx={150} cy={170} hue={hue} />
      <Wheel cx={460} cy={170} hue={hue} />
    </g>
  );
}

function HyperShape({ variant, hue }: { variant: string; hue: string }) {
  return (
    <g>
      <path d="M40 170 L70 135 L150 110 L260 85 L380 85 L470 105 L540 130 L560 170 Z" fill={`url(#body-${variant}-${hue})`} />
      <path d="M200 86 L260 56 L360 56 L420 86 Z" fill="#0c0c0c" />
      <path d="M215 85 L268 60 L356 60 L408 85 Z" fill={`url(#glass-${variant})`} />
      {/* sweeping fender highlight */}
      <path d="M80 132 Q220 92 360 92 Q480 102 540 132" fill="none" stroke={hue} strokeWidth="1.4" opacity="0.6" />
      {/* central body crease */}
      <path d="M70 145 L540 145" stroke="#161616" strokeWidth="2" />
      {/* gold accent */}
      <path d="M120 162 L500 162" stroke={hue} strokeWidth="2" opacity="0.6" />
      {/* exhaust */}
      <circle cx="552" cy="155" r="5" fill="#111" stroke="#333" />
      <circle cx="540" cy="155" r="5" fill="#111" stroke="#333" />
      {/* headlight */}
      <path d="M55 138 L82 130 L80 142 L55 148 Z" fill={hue} opacity="0.9" />
      <Wheel cx={148} cy={170} hue={hue} r={34} />
      <Wheel cx={470} cy={170} hue={hue} r={34} />
    </g>
  );
}

function PrototypeShape({ variant, hue }: { variant: string; hue: string }) {
  return (
    <g>
      {/* closed cockpit LMP */}
      <path d="M40 170 L60 140 L160 120 L240 88 L360 80 L450 90 L530 120 L560 145 L560 170 Z" fill={`url(#body-${variant}-${hue})`} />
      {/* canopy */}
      <path d="M210 86 L260 56 L360 56 L420 86 Z" fill="#0c0c0c" />
      <path d="M225 85 L266 60 L356 60 L408 85 Z" fill={`url(#glass-${variant})`} />
      {/* shark fin */}
      <path d="M390 86 L440 50 L470 86 Z" fill="#0c0c0c" />
      {/* rear wing huge */}
      <path d="M450 56 L568 50 L572 60 L568 76 L450 78 Z" fill="#0c0c0c" />
      <rect x="450" y="50" width="120" height="3" fill={hue} />
      <line x1="468" y1="76" x2="468" y2="120" stroke="#1f1f1f" strokeWidth="2" />
      <line x1="552" y1="76" x2="552" y2="124" stroke="#1f1f1f" strokeWidth="2" />
      {/* fender humps */}
      <path d="M100 140 Q150 100 200 130" fill="none" stroke="#1f1f1f" strokeWidth="2" />
      {/* livery stripe */}
      <rect x="70" y="148" width="450" height="4" fill={`url(#accent-${variant}-${hue})`} />
      {/* lights */}
      <rect x="48" y="140" width="22" height="6" fill={hue} opacity="0.9" />
      <Wheel cx={148} cy={170} hue={hue} r={32} />
      <Wheel cx={460} cy={170} hue={hue} r={32} />
    </g>
  );
}

function EVShape({ variant, hue }: { variant: string; hue: string }) {
  return (
    <g>
      {/* low slung pod */}
      <path d="M40 170 L70 138 L180 110 L320 90 L450 100 L530 124 L560 150 L560 170 Z" fill={`url(#body-${variant}-${hue})`} />
      {/* canopy */}
      <path d="M200 90 L270 56 L380 56 L430 92 Z" fill="#0c0c0c" />
      <path d="M218 88 L274 60 L376 60 L418 88 Z" fill={`url(#glass-${variant})`} />
      {/* light bar */}
      <rect x="52" y="135" width="120" height="3" fill={hue} opacity="0.9" />
      <rect x="52" y="135" width="120" height="3" fill="#fff" opacity="0.3" />
      {/* underlight */}
      <rect x="100" y="172" width="380" height="2" fill={hue} opacity="0.7" />
      {/* solar panel */}
      <path d="M240 60 L376 60 L370 80 L246 80 Z" fill="#0a0a0a" stroke={hue} strokeWidth="0.5" />
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={i} x1={246 + i * 20} y1="60" x2={246 + i * 20} y2="80" stroke="#1a1a1a" />
      ))}
      <Wheel cx={150} cy={170} hue={hue} r={32} />
      <Wheel cx={460} cy={170} hue={hue} r={32} />
    </g>
  );
}
