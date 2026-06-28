"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

type Props = {
  label: string;
  value: number;
  max: number;
  unit: string;
  accent: string;
  decimals?: number;
};

export function Gauge({ label, value, max, unit, accent, decimals = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const display = useMotionValue(0);
  const arc = useMotionValue(0);
  const [text, setText] = useState("0");
  const [arcLen, setArcLen] = useState(0);

  // 220° sweep, from -110° to +110°
  const RADIUS = 84;
  const CIRC = 2 * Math.PI * RADIUS;
  const SWEEP = 0.61; // 220° / 360°
  const VISIBLE = CIRC * SWEEP;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(display, value, {
            duration: 2.2,
            ease: [0.2, 0.8, 0.2, 1],
          });
          animate(arc, Math.min(1, value / max), {
            duration: 2.2,
            ease: [0.2, 0.8, 0.2, 1],
          });
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [display, arc, value, max]);

  useEffect(() => {
    const u1 = display.on("change", (v) =>
      setText(
        v.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }),
      ),
    );
    const u2 = arc.on("change", (v) => setArcLen(v));
    return () => {
      u1();
      u2();
    };
  }, [display, arc, decimals]);

  const dash = `${VISIBLE * arcLen} ${CIRC}`;

  return (
    <div ref={ref} className="relative aspect-square w-full max-w-[260px] mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full -rotate-[110deg]">
        <defs>
          <linearGradient id={`g-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.1" />
            <stop offset="60%" stopColor={accent} stopOpacity="0.9" />
            <stop offset="100%" stopColor={accent} stopOpacity="1" />
          </linearGradient>
          <filter id={`glow-${label}`}>
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* base track */}
        <circle
          cx="100"
          cy="100"
          r={RADIUS}
          stroke="#1a1a1a"
          strokeWidth="10"
          fill="none"
          strokeDasharray={`${VISIBLE} ${CIRC}`}
          strokeLinecap="round"
        />
        {/* tick ring */}
        {Array.from({ length: 22 }).map((_, i) => {
          const a = (i / 21) * SWEEP * Math.PI * 2;
          const x1 = 100 + Math.cos(a) * (RADIUS - 14);
          const y1 = 100 + Math.sin(a) * (RADIUS - 14);
          const x2 = 100 + Math.cos(a) * (RADIUS - 6);
          const y2 = 100 + Math.sin(a) * (RADIUS - 6);
          const danger = i >= 17;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={danger ? "#FF1E1E" : "#555"}
              strokeWidth={danger ? 2 : 1}
            />
          );
        })}
        {/* arc */}
        <circle
          cx="100"
          cy="100"
          r={RADIUS}
          stroke={`url(#g-${label})`}
          strokeWidth="6"
          fill="none"
          strokeDasharray={dash}
          strokeLinecap="round"
          filter={`url(#glow-${label})`}
        />
        {/* needle */}
        <g transform={`rotate(${arcLen * 220} 100 100)`}>
          <line
            x1="100"
            y1="100"
            x2={100 + RADIUS - 10}
            y2="100"
            stroke={accent}
            strokeWidth="2.5"
            strokeLinecap="round"
            filter={`url(#glow-${label})`}
          />
          <circle cx="100" cy="100" r="6" fill="#0a0a0a" stroke={accent} strokeWidth="2" />
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <div className="font-mono text-[10px] tracking-widest2 text-silver/70">{label.toUpperCase()}</div>
        <div className="font-display text-4xl md:text-5xl text-ghost mt-1" style={{ textShadow: `0 0 24px ${accent}55` }}>
          {text}
        </div>
        <div className="font-mono text-xs text-silver/60 tracking-widest2 mt-1">{unit}</div>
      </div>
    </div>
  );
}
