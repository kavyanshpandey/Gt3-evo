"use client";

import { Gauge } from "@/components/ui/Gauge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PERFORMANCE } from "@/lib/data";

export function Performance() {
  return (
    <section
      id="performance"
      className="relative py-32 md:py-40 px-6 md:px-12 bg-bg overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.08), transparent 60%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-end mb-16">
          <SectionHeading
            eyebrow="07 · TELEMETRY"
            title={
              <>
                Numbers don't lie.
                <br />
                <span className="gradient-text-blue">They scream.</span>
              </>
            }
            accent="#00D4FF"
          />
          <p className="text-silver/70 max-w-md md:justify-self-end text-sm leading-relaxed">
            Real-world data from a championship-spec chassis under maximum-attack qualifying load.
            All metrics measured at 18°C ambient, on softs, with 12 kg of fuel.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {PERFORMANCE.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl glass-strong p-6 md:p-8 hud-corner relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 100%, ${m.accent}33, transparent 70%)` }}
              />
              <Gauge {...m} decimals={m.label.includes("/") || m.label.includes("G") || m.label === "Braking" ? 1 : 0} />
              <div className="relative mt-2 flex items-center justify-between font-mono text-[10px] tracking-widest2 text-silver/50">
                <span>MIN</span>
                <span style={{ color: m.accent }}>● PEAK</span>
                <span>MAX</span>
              </div>
            </div>
          ))}
        </div>

        {/* G-circle */}
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 rounded-2xl glass-strong p-8 hud-corner relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-mono text-[10px] tracking-widest2 text-silver/60">
                  G-FORCE TRACE · LAP 12 · MONZA
                </div>
                <div className="font-display text-2xl mt-1">Cornering Envelope</div>
              </div>
              <div className="font-mono text-[10px] tracking-widest2 text-iceblue">● LIVE</div>
            </div>
            <GTrace />
          </div>

          <div className="rounded-2xl glass-strong p-8 hud-corner">
            <div className="font-mono text-[10px] tracking-widest2 text-silver/60 mb-4">
              SECTOR DELTAS
            </div>
            {[
              ["S1", "—0.184", "#00D4FF"],
              ["S2", "+0.022", "#BFC3C7"],
              ["S3", "—0.391", "#FF1E1E"],
              ["LAP", "—0.553", "#D4AF37"],
            ].map(([k, v, c]) => (
              <div
                key={k as string}
                className="flex items-center justify-between py-2 border-b border-white/5 last:border-b-0"
              >
                <span className="font-mono text-xs tracking-widest2 text-silver/60">{k}</span>
                <span
                  className="font-display text-2xl tracking-display"
                  style={{ color: c as string, textShadow: `0 0 12px ${c}55` }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GTrace() {
  // 80 points along an oval trace — round to 2 decimals so SSR
  // and client stringification agree (avoids hydration mismatch).
  const r2 = (n: number) => Math.round(n * 100) / 100;
  const pts = Array.from({ length: 81 }).map((_, i) => {
    const t = (i / 80) * Math.PI * 2;
    const r = 92 + Math.sin(t * 3) * 8 + Math.cos(t * 7) * 6;
    const x = r2(150 + Math.cos(t) * r);
    const y = r2(110 + Math.sin(t) * (r * 0.78));
    return [x, y] as const;
  });
  const d = pts.map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(" ");
  return (
    <svg viewBox="0 0 300 220" className="w-full h-[260px]">
      <defs>
        <radialGradient id="ggrad">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* rings */}
      {[1, 2, 3, 4, 5].map((g) => (
        <circle
          key={g}
          cx="150"
          cy="110"
          r={g * 22}
          fill="none"
          stroke="#1a1a1a"
          strokeDasharray="2 3"
        />
      ))}
      <line x1="20" y1="110" x2="280" y2="110" stroke="#1a1a1a" />
      <line x1="150" y1="10" x2="150" y2="210" stroke="#1a1a1a" />
      {/* labels */}
      {[1, 2, 3, 4, 5].map((g) => (
        <text
          key={g}
          x="152"
          y={108 - g * 22}
          fill="#444"
          fontFamily="Orbitron"
          fontSize="7"
          letterSpacing="2"
        >
          {g}g
        </text>
      ))}
      <circle cx="150" cy="110" r="100" fill="url(#ggrad)" />
      <path d={d} fill="none" stroke="#00D4FF" strokeWidth="1.8" opacity="0.9" />
      <circle cx={pts[40][0]} cy={pts[40][1]} r="4" fill="#FF1E1E">
        <animate attributeName="r" values="3;6;3" dur="1.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
