"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAudio } from "@/lib/audio";
import { CarSilhouette } from "@/components/ui/CarSilhouette";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const { setRpm } = useAudio();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const h = el.offsetHeight - window.innerHeight;
        const p = Math.min(1, Math.max(0, -rect.top / h));
        setProgress(p);
        setRpm(900 + p * 11000);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [setRpm]);

  const rpm = 900 + progress * 11000;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[280vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-bg vignette cinematic-grain">
        {/* Cinematic stage — radial light pool */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 70%, rgba(255,30,30,0.18), transparent 50%), radial-gradient(ellipse at 50% 25%, rgba(0,212,255,0.10), transparent 55%)",
          }}
        />

        {/* Studio floor reflection */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[40%]"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(0,0,0,0.85)), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 80px)",
            maskImage: "linear-gradient(180deg, transparent, black 40%)",
          }}
        />

        {/* Spotlight cone */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[120%] h-[80%] opacity-50 pointer-events-none"
          style={{
            background:
              "conic-gradient(from 90deg at 50% 0%, transparent 0deg, rgba(255,255,255,0.08) 90deg, transparent 180deg)",
            filter: "blur(40px)",
          }}
        />

        {/* Particles + spark ring */}
        <ParticleField rpmInfluence={Math.min(1, progress * 1.6)} />

        {/* F1 car — scales as you scroll (accelerates toward camera) */}
        <motion.div
          animate={{
            scale: 0.78 + progress * 0.55,
            y: progress * 40,
            filter: `blur(${Math.min(8, progress * 12)}px)`,
          }}
          transition={{ type: "tween", duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(95vw,1300px)] z-10 will-change-transform"
        >
          <div
            className="relative"
            style={{
              filter: `drop-shadow(0 30px 60px rgba(255,30,30,${0.35 + progress * 0.3})) drop-shadow(0 0 80px rgba(255,30,30,${0.15 + progress * 0.3}))`,
            }}
          >
            <CarSilhouette variant="f1" hue="#FF1E1E" glow={false} />
            {/* Exhaust flame */}
            <div
              className="absolute right-[8%] top-[58%] w-24 h-3 rounded-full origin-left"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,200,40,0.95), rgba(255,80,20,0.6), transparent)",
                opacity: Math.min(1, progress * 2),
                transform: `scaleX(${0.4 + progress * 2}) translateX(0)`,
                filter: "blur(2px)",
              }}
            />
            {/* Headlight cones */}
            <div
              className="absolute left-[3%] top-[62%] w-32 h-8 -translate-x-full"
              style={{
                background:
                  "linear-gradient(270deg, rgba(255,240,200,0.7), transparent)",
                filter: "blur(8px)",
              }}
            />
          </div>
        </motion.div>

        {/* HUD frame */}
        <div className="absolute inset-6 md:inset-10 border border-white/5 pointer-events-none">
          <div className="absolute -top-px left-0 w-20 h-px bg-racered" />
          <div className="absolute -top-px right-0 w-20 h-px bg-iceblue" />
          <div className="absolute -bottom-px left-0 w-20 h-px bg-iceblue" />
          <div className="absolute -bottom-px right-0 w-20 h-px bg-racered" />
        </div>

        <div className="absolute top-10 left-10 font-mono text-[10px] tracking-widest2 text-silver/70 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-racered animate-pulse" />
            <span>GTE//SYS · ONLINE</span>
          </div>
          <div className="mt-1 text-silver/40">LAT 45.6156 · LON 9.2811 · MONZA</div>
        </div>

        <div className="absolute top-10 right-10 font-mono text-[10px] tracking-widest2 text-silver/70 z-10 text-right">
          <div>CHASSIS · GTE/EVO/Z9</div>
          <div className="text-silver/40">REV {String(Math.round(rpm)).padStart(5, "0")} RPM</div>
        </div>

        {/* Title — fades on scroll */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1 - progress * 1.6, y: -progress * 80 }}
            transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-mono text-[10px] md:text-xs tracking-widest2 text-iceblue mb-6"
          >
            <span className="inline-block w-8 h-px bg-iceblue align-middle mr-3" />
            GT EVOLUTION · 1970 — 2050
            <span className="inline-block w-8 h-px bg-iceblue align-middle ml-3" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60, letterSpacing: "0.5em" }}
            animate={{
              opacity: 1 - progress * 1.4,
              y: -progress * 120,
              letterSpacing: "0.06em",
            }}
            transition={{ duration: 1.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display text-[18vw] md:text-[14vw] leading-[0.85] tracking-display"
            style={{
              textShadow: `0 0 ${40 + progress * 60}px rgba(255,30,30,${0.3 + progress * 0.3})`,
            }}
          >
            ENGINEERING
            <br />
            <span className="gradient-text-red">SPEED.</span>
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{
              opacity: 1 - progress * 1.4,
              y: -progress * 100,
            }}
            transition={{ duration: 1.8, delay: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display text-[18vw] md:text-[14vw] leading-[0.85] tracking-display -mt-2"
          >
            DESIGNING <span className="gradient-text-gold">LEGENDS.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1 - progress * 2, y: -progress * 60 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="mt-8 text-silver/80 max-w-md text-sm md:text-base"
          >
            Eight decades of motorsport. One continuous scroll. Buckle in — the throttle is yours.
          </motion.p>
        </div>

        <TelemetryHud rpm={rpm} progress={progress} />

        <div className="absolute bottom-10 right-10 z-10 font-mono text-[10px] tracking-widest2 text-silver/60 text-right">
          <div className="flex items-center justify-end gap-3 mb-2">
            <span className="text-iceblue">DRS</span>
            <span
              className={`px-1.5 py-0.5 border ${
                progress > 0.4
                  ? "border-iceblue text-iceblue bg-iceblue/10"
                  : "border-white/10 text-silver/40"
              }`}
            >
              {progress > 0.4 ? "OPEN" : "ARMED"}
            </span>
          </div>
          <div>SECTOR 1 · 22.480s</div>
          <div>SECTOR 2 · 28.119s</div>
          <div>SECTOR 3 · {(31.2 - progress * 5).toFixed(3)}s</div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: progress < 0.05 ? 0.7 : 0 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 font-mono text-[10px] tracking-widest2 text-silver/70 text-center"
        >
          <div>SCROLL · INITIATE LAP</div>
          <div className="mt-3 mx-auto w-px h-10 bg-gradient-to-b from-racered to-transparent animate-pulse-soft" />
        </motion.div>

        <div className="absolute inset-0 pointer-events-none scanlines" />
      </div>
    </section>
  );
}

function ParticleField({ rpmInfluence }: { rpmInfluence: number }) {
  // Deterministic positions — no Math.random in render, safe for SSR.
  // Floats are rounded to 2 decimals so SSR and client stringify identically.
  const r2 = (n: number) => Math.round(n * 100) / 100;
  const motes = useMemo(
    () =>
      Array.from({ length: 36 }).map((_, i) => ({
        left: (i * 47) % 100,
        top: 20 + ((i * 31) % 70),
        size: 1 + ((i * 7) % 3),
        delay: r2((i % 8) * 0.4),
        dur: 6 + (i % 5),
      })),
    [],
  );
  const sparks = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => {
        const a = (i / 26) * Math.PI * 2;
        return {
          left: r2(50 + Math.cos(a) * 36),
          top: r2(60 + Math.sin(a) * 22),
          delay: r2((i % 9) * 0.18),
        };
      }),
    [],
  );

  return (
    <>
      <div className="absolute inset-0 pointer-events-none">
        {motes.map((m, i) => (
          <span
            key={`m${i}`}
            className="hero-mote"
            style={
              {
                left: `${m.left}%`,
                top: `${m.top}%`,
                width: m.size,
                height: m.size,
                "--d": `${m.delay}s`,
                "--dur": `${m.dur}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ opacity: r2(0.4 + rpmInfluence * 0.5) }}
      >
        {sparks.map((s, i) => (
          <span
            key={`s${i}`}
            className="hero-spark"
            style={
              {
                left: `${s.left}%`,
                top: `${s.top}%`,
                "--d": `${s.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </>
  );
}

function TelemetryHud({ rpm, progress }: { rpm: number; progress: number }) {
  const gear = Math.min(8, Math.max(1, Math.floor(progress * 8) + 1));
  const speed = Math.round(40 + progress * 320);
  return (
    <div className="absolute bottom-10 left-10 z-10 glass rounded-md px-4 py-3 min-w-[260px]">
      <div className="flex items-center justify-between text-[10px] font-mono tracking-widest2 text-silver/70 mb-2">
        <span>TELEMETRY</span>
        <span className="text-racered">● LIVE</span>
      </div>
      <div className="flex items-end gap-4">
        <div>
          <div className="font-mono text-[10px] text-silver/60">SPEED</div>
          <div className="font-display text-4xl text-ghost leading-none">{speed}</div>
          <div className="font-mono text-[10px] text-silver/50">KM/H</div>
        </div>
        <div className="border-l border-white/10 pl-4">
          <div className="font-mono text-[10px] text-silver/60">GEAR</div>
          <div
            className="font-display text-4xl text-racered leading-none"
            style={{ textShadow: "0 0 12px #ff1e1e" }}
          >
            {gear}
          </div>
          <div className="font-mono text-[10px] text-silver/50">N1—8</div>
        </div>
        <div className="border-l border-white/10 pl-4">
          <div className="font-mono text-[10px] text-silver/60">RPM</div>
          <div className="font-display text-4xl text-iceblue leading-none">{Math.round(rpm / 1000)}k</div>
          <div className="font-mono text-[10px] text-silver/50">x1000</div>
        </div>
      </div>
      <div className="mt-3 h-1.5 rounded bg-white/5 overflow-hidden relative">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-iceblue via-gold to-racered transition-[width] duration-100"
          style={{ width: `${Math.min(100, (rpm / 12000) * 100)}%` }}
        />
        <div className="absolute inset-y-0 right-[7%] w-px bg-racered" />
      </div>
    </div>
  );
}
