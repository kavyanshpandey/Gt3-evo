"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ENGINE_PARTS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Exploded-view engine animation. Eight parts drift apart from a
 * central block as the user scrolls through this pinned section.
 */
export function Engine() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const explode = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      id="engine"
      ref={ref}
      className="relative py-32 md:py-40 px-6 md:px-12 bg-bg overflow-hidden min-h-[160vh]"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="06 · POWER UNIT"
          title={
            <>
              Disassembled.
              <br />
              <span className="gradient-text-red">Rebuilt mid-air.</span>
            </>
          }
          body="A 1.6L V6 turbo-hybrid weighs less than 150 kg yet delivers 1,030 horsepower at 50% thermal efficiency — more efficient than any production internal combustion engine in history."
          accent="#FF1E1E"
        />

        <motion.div
          style={{ y: titleY }}
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center select-none opacity-10"
        >
          <h3 className="font-display text-[24vw] tracking-display text-stroke leading-none">
            ENGINE
          </h3>
        </motion.div>

        <div className="relative mt-12 h-[600px] md:h-[680px] rounded-2xl overflow-hidden glass-strong hud-corner">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,30,30,0.18),transparent_60%)]" />

          {/* Heat ring */}
          <motion.div
            style={{ scale: useTransform(explode, [0, 1], [0.4, 1.4]), opacity: useTransform(explode, [0, 0.5, 1], [0, 0.6, 0]) }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-[480px] h-[480px] rounded-full border border-racered/30" />
          </motion.div>

          {/* Central engine block */}
          <div className="absolute inset-0 flex items-center justify-center">
            <CentralBlock />
          </div>

          {/* Exploded parts */}
          {ENGINE_PARTS.map((part) => (
            <ExplodedPart key={part.name} part={part} explode={explode} />
          ))}

          {/* Stats footer */}
          <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-[10px] tracking-widest2">
            <Spec label="DISPLACEMENT" value="1.6 L" />
            <Spec label="CONFIG" value="V6 90° TURBO" />
            <Spec label="REDLINE" value="15,000 RPM" />
            <Spec label="THERMAL EFF." value="50.1 %" />
          </div>

          <div className="absolute top-6 left-6 font-mono text-[10px] tracking-widest2 text-silver/60 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-racered animate-pulse" />
            EXPLODED VIEW · SCROLL TO SEPARATE
          </div>
        </div>
      </div>
    </section>
  );
}

function CentralBlock() {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220">
      <defs>
        <linearGradient id="block" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#080808" />
        </linearGradient>
      </defs>
      <rect x="40" y="50" width="140" height="120" rx="6" fill="url(#block)" stroke="#1f1f1f" />
      {/* cylinder heads */}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={50 + i * 40}
          y={36}
          width={32}
          height={18}
          rx={2}
          fill="#0a0a0a"
          stroke="#FF1E1E"
          strokeOpacity={0.4}
        />
      ))}
      {/* base */}
      <rect x="36" y="166" width="148" height="14" fill="#050505" />
      {/* glow */}
      <rect x="44" y="170" width="132" height="3" fill="#FF1E1E" opacity="0.6" />
      <text x="110" y="116" textAnchor="middle" fill="#FF1E1E" fontFamily="Orbitron" fontSize="10" letterSpacing="3">
        V6 · 1.6L
      </text>
    </svg>
  );
}

function ExplodedPart({
  part,
  explode,
}: {
  part: (typeof ENGINE_PARTS)[number];
  explode: MotionValue<number>;
}) {
  const x = useTransform(explode, [0, 1], [0, part.offset[0]]);
  const y = useTransform(explode, [0, 1], [0, part.offset[1]]);
  const op = useTransform(explode, [0, 0.3, 1], [0, 1, 1]);
  const lineOp = useTransform(explode, [0.2, 0.5, 1], [0, 0.7, 0.7]);
  return (
    <motion.div
      style={{ x, y, opacity: op }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      {/* connector line */}
      <motion.div
        style={{
          opacity: lineOp,
          width: Math.hypot(part.offset[0], part.offset[1]),
          rotate: (Math.atan2(-part.offset[1], -part.offset[0]) * 180) / Math.PI,
        }}
        className="absolute top-1/2 left-1/2 h-px origin-left -z-0"
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-white/10" />
      </motion.div>

      <div
        className="relative glass rounded-md px-3 py-2 min-w-[170px]"
        style={{ boxShadow: `0 0 30px ${part.accent}33` }}
      >
        <div className="font-mono text-[10px] tracking-widest2" style={{ color: part.accent }}>
          {part.name}
        </div>
        <div className="text-silver/80 text-xs mt-0.5 leading-snug">{part.detail}</div>
        <span
          className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
          style={{ background: part.accent, boxShadow: `0 0 10px ${part.accent}` }}
        />
      </div>
    </motion.div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded p-3">
      <div className="text-silver/40 mb-1">{label}</div>
      <div className="text-ghost font-display text-xl tracking-display">{value}</div>
    </div>
  );
}
