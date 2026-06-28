"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { CarSilhouette } from "@/components/ui/CarSilhouette";

export function RacingExperience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const trackX = useTransform(scrollYProgress, [0, 1], ["0%", "-220%"]);
  const skyX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const blur = useTransform(scrollYProgress, [0.2, 0.6], [0, 10]);
  const speed = useTransform(scrollYProgress, [0, 1], [120, 384]);
  const smokeOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 0.6]);
  const linesOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const filterStyle = useTransform(blur, (v) => `blur(${v * 0.05}px)`);
  const speedScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const lightsX = useTransform(scrollYProgress, [0, 1], ["0%", "-400%"]);

  return (
    <section
      id="racing"
      ref={ref}
      className="relative h-[200vh] bg-bg overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Sky / heat distortion */}
        <motion.div style={{ x: skyX }} className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, #0a1018 0%, #050505 60%)" }}
          />
          <div
            className="absolute top-[30%] left-0 right-0 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,80,40,0.35), transparent)",
              filter: "blur(2px)",
            }}
          />
        </motion.div>

        {/* Distant pit-lane lights */}
        <div className="absolute top-[28%] left-0 right-0 h-px">
          <motion.div
            style={{ x: lightsX }}
            className="flex gap-32 will-change-transform"
          >
            {Array.from({ length: 80 }).map((_, i) => {
              const c = i % 3 === 0 ? "#FF1E1E" : i % 3 === 1 ? "#00D4FF" : "#D4AF37";
              return (
                <span
                  key={i}
                  className="block w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: c, boxShadow: `0 0 12px ${c}` }}
                />
              );
            })}
          </motion.div>
        </div>

        {/* Track surface */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[55%] overflow-hidden"
          style={{ perspective: 800 }}
        >
          <motion.div
            style={{ x: trackX, rotateX: 62, transformOrigin: "50% 0%" }}
            className="absolute inset-0 will-change-transform"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "repeating-linear-gradient(90deg, #0a0a0a 0 120px, #111 120px 121px, #0a0a0a 121px 240px)",
              }}
            />
            <div
              className="absolute top-1/2 left-0 right-0 h-2"
              style={{
                background:
                  "repeating-linear-gradient(90deg, #d4af37 0 60px, transparent 60px 140px)",
                filter: "drop-shadow(0 0 6px #d4af37)",
              }}
            />
            <div className="absolute top-[20%] left-0 right-0 h-1 bg-white/10" />
            <div className="absolute top-[80%] left-0 right-0 h-1 bg-white/10" />
          </motion.div>
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg to-transparent" />
        </div>

        {/* Tire smoke */}
        <motion.div
          style={{ opacity: smokeOpacity }}
          className="absolute bottom-[18%] left-0 right-0 pointer-events-none"
        >
          <div
            className="absolute bottom-0 left-[20%] w-[60vw] h-[40vh] rounded-full fog-blob"
            style={{ background: "radial-gradient(ellipse, rgba(180,180,200,0.4), transparent 60%)" }}
          />
          <div
            className="absolute bottom-0 right-[15%] w-[40vw] h-[36vh] rounded-full fog-blob"
            style={{ background: "radial-gradient(ellipse, rgba(255,120,40,0.25), transparent 60%)" }}
          />
        </motion.div>

        <motion.div
          style={{ opacity: linesOpacity }}
          className="absolute inset-0 speed-lines mix-blend-screen"
        />

        {/* Car shake driven by RAF + scroll */}
        <CarShakeContainer
          progress={scrollYProgress}
          filterStyle={filterStyle}
        />

        <div className="absolute top-10 left-10 z-20 font-mono text-[10px] tracking-widest2 text-silver/70">
          <div className="text-racered mb-1">● MAX ATTACK</div>
          <div>STAGE · LIVE</div>
        </div>

        <motion.div
          className="absolute top-10 right-10 z-20 text-right"
          style={{ scale: speedScale }}
        >
          <div className="font-mono text-[10px] tracking-widest2 text-silver/60">VELOCITY</div>
          <SpeedReadout v={speed} />
          <div className="font-mono text-[10px] tracking-widest2 text-silver/50">KM/H</div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-center">
          <div className="font-display text-4xl md:text-6xl tracking-display">
            <span className="gradient-text-red">FEEL THE LAP.</span>
          </div>
          <div className="font-mono text-[10px] tracking-widest2 text-silver/50 mt-2">
            SCROLL · INPUT THROTTLE
          </div>
        </div>
      </div>
    </section>
  );
}

function CarShakeContainer({
  progress,
  filterStyle,
}: {
  progress: MotionValue<number>;
  filterStyle: MotionValue<string>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const amp = progress.get() * 6;
      const t = performance.now() * 0.022;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${Math.sin(t) * amp}px, ${Math.cos(t * 1.1) * amp * 0.6}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  return (
    <motion.div
      style={{ filter: filterStyle }}
      className="absolute left-1/2 bottom-[28%] -translate-x-1/2 w-[min(90vw,1100px)] z-10"
    >
      <div ref={ref} className="will-change-transform">
        <CarSilhouette variant="hyper" hue="#FF1E1E" />
      </div>
    </motion.div>
  );
}

function SpeedReadout({ v }: { v: MotionValue<number> }) {
  const [s, setS] = useState(120);
  useEffect(() => v.on("change", (val) => setS(val)), [v]);
  return (
    <div
      className="font-display text-6xl md:text-7xl tracking-display text-ghost leading-none"
      style={{ textShadow: "0 0 24px #ff1e1e55" }}
    >
      {Math.round(s)}
    </div>
  );
}
