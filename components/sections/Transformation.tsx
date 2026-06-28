"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CarSilhouette } from "@/components/ui/CarSilhouette";
import { useAudio } from "@/lib/audio";

export function Transformation() {
  const sectionRef = useRef<HTMLElement>(null);
  const { triggerShift } = useAudio();
  const triggered = useRef(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const f1Opacity = useTransform(scrollYProgress, [0.1, 0.45, 0.55], [0, 1, 0]);
  const f1Scale = useTransform(scrollYProgress, [0.1, 0.5], [0.8, 1.05]);
  const f1Blur = useTransform(scrollYProgress, [0.4, 0.55], [0, 18]);
  const gtOpacity = useTransform(scrollYProgress, [0.45, 0.6, 0.9], [0, 1, 1]);
  const gtScale = useTransform(scrollYProgress, [0.45, 0.65], [0.92, 1]);
  const smokeOpacity = useTransform(scrollYProgress, [0.4, 0.55, 0.7], [0, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v > 0.5 && !triggered.current) {
        triggered.current = true;
        triggerShift();
      } else if (v < 0.45) {
        triggered.current = false;
      }
    });
  }, [scrollYProgress, triggerShift]);

  return (
    <section
      id="transformation"
      ref={sectionRef}
      className="relative h-[260vh] bg-bg overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background gradient shifts */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(255,30,30,0.18), transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(0,212,255,0.12), transparent 60%)",
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.6]),
          }}
        />

        {/* Title */}
        <motion.div
          style={{ y: titleY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none"
        >
          <h2 className="font-display text-[28vw] md:text-[22vw] leading-none text-stroke-thick tracking-display opacity-30">
            MORPH
          </h2>
        </motion.div>

        {/* Speed lines */}
        <motion.div
          className="absolute inset-0 speed-lines"
          style={{ opacity: smokeOpacity, x: useTransform(scrollYProgress, [0, 1], [0, -400]) }}
        />

        {/* F1 car */}
        <motion.div
          style={{
            opacity: f1Opacity,
            scale: f1Scale,
            filter: useTransform(f1Blur, (v) => `blur(${v}px)`),
          }}
          className="absolute z-10 w-[min(90vw,1100px)]"
        >
          <CarSilhouette variant="f1" hue="#FF1E1E" />
        </motion.div>

        {/* Smoke */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: smokeOpacity }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[60vh] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(245,245,245,0.18), rgba(255,30,30,0.05) 40%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </motion.div>

        {/* GT car */}
        <motion.div
          style={{ opacity: gtOpacity, scale: gtScale }}
          className="absolute z-10 w-[min(90vw,1100px)]"
        >
          <CarSilhouette variant="hyper" hue="#D4AF37" />
        </motion.div>

        {/* Step labels */}
        <div className="absolute bottom-16 left-10 right-10 flex justify-between font-mono text-[10px] tracking-widest2 text-silver/70 z-20">
          <StepLabel
            n="01"
            label="OPEN-WHEEL"
            progress={scrollYProgress}
            range={[0.1, 0.45]}
          />
          <StepLabel
            n="02"
            label="MORPH SEQUENCE"
            progress={scrollYProgress}
            range={[0.4, 0.6]}
            accent="text-racered border-racered"
          />
          <StepLabel
            n="03"
            label="GT HYPERCAR"
            progress={scrollYProgress}
            range={[0.55, 0.95]}
            accent="text-gold border-gold"
          />
        </div>

        {/* Right description rail */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20 max-w-xs space-y-3 hidden md:block">
          <motion.h3
            className="font-display text-3xl tracking-display"
            style={{ opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]) }}
          >
            Body panels morph.
            <br />
            <span className="gradient-text-red">Suspension drops.</span>
            <br />
            Spoiler unfurls.
          </motion.h3>
          <motion.p
            className="text-silver/70 text-sm"
            style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]) }}
          >
            From an open-wheel single-seater to a closed-cockpit hypercar — the chassis stays, the
            philosophy evolves.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function StepLabel({
  n,
  label,
  progress,
  range,
  accent,
}: {
  n: string;
  label: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  accent?: string;
}) {
  const opacity = useTransform(progress, [range[0] - 0.05, range[0], range[1], range[1] + 0.05], [0.3, 1, 1, 0.3]);
  return (
    <motion.div style={{ opacity }} className={`border-l-2 pl-3 ${accent ?? "border-iceblue text-iceblue"}`}>
      <div>{n}</div>
      <div className="text-silver/80 mt-1">{label}</div>
    </motion.div>
  );
}
