"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CarSilhouette } from "@/components/ui/CarSilhouette";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  // Car fades and shrinks into darkness; smoke billows; final line resolves.
  const carOpacity = useTransform(scrollYProgress, [0.1, 0.6, 0.95], [1, 0.6, 0]);
  const carScale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const carBlur = useTransform(scrollYProgress, [0.4, 1], [0, 16]);
  const smokeO = useTransform(scrollYProgress, [0.3, 0.7, 1], [0, 0.7, 0]);
  const titleO = useTransform(scrollYProgress, [0.5, 0.9], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.5, 0.95], [40, 0]);

  return (
    <footer
      ref={ref}
      className="relative bg-bg overflow-hidden border-t border-white/5"
      data-cursor="hover"
    >
      <div className="relative min-h-[140vh] flex flex-col">
        {/* Car fading into darkness */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            style={{
              opacity: carOpacity,
              scale: carScale,
              filter: useTransform(carBlur, (v) => `blur(${v}px)`),
            }}
            className="relative w-[min(90vw,900px)]"
          >
            <CarSilhouette variant="hyper" hue="#FF1E1E" />
          </motion.div>

          <motion.div
            style={{ opacity: smokeO }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute bottom-0 left-0 right-0 h-[70%]"
                 style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.18), transparent 60%)" }} />
            <div className="absolute inset-0 fog-blob"
                 style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(80,80,80,0.4), transparent 70%)" }} />
          </motion.div>

          <motion.div
            style={{ opacity: titleO, y: titleY }}
            className="absolute inset-x-0 bottom-[12%] text-center px-6"
          >
            <div className="font-mono text-[10px] tracking-widest2 text-silver/50 mb-4">
              · ENGINE OFF ·
            </div>
            <div className="font-display text-5xl md:text-8xl lg:text-9xl tracking-display">
              The race never <span className="gradient-text-red">truly ends.</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom info strip */}
        <div className="relative px-6 md:px-12 py-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Logo />
                <span className="font-display tracking-display text-xl">GT EVOLUTION RACING</span>
              </div>
              <p className="text-silver/60 text-sm max-w-md leading-relaxed">
                Engineering Speed. Designing Legends. An interactive showcase of motorsport evolution —
                fictional chassis, original art, royalty-free everything.
              </p>
            </div>
            <Column title="DEPARTMENTS">
              {["Chassis", "Aerodynamics", "Powertrain", "Telemetry"].map((s) => (
                <a
                  key={s}
                  href="#"
                  data-cursor="hover"
                  className="block text-silver/70 hover:text-ghost transition-colors py-1"
                >
                  {s}
                </a>
              ))}
            </Column>
            <Column title="CIRCUITS">
              {["Monza · Italy", "Spa · Belgium", "Suzuka · Japan", "Le Mans · France"].map((s) => (
                <a
                  key={s}
                  href="#"
                  data-cursor="hover"
                  className="block text-silver/70 hover:text-ghost transition-colors py-1"
                >
                  {s}
                </a>
              ))}
            </Column>
          </div>

          <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-widest2 text-silver/40">
            <span>© 2050 GT EVOLUTION RACING · ALL FRAMES ORIGINAL</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-racered animate-pulse" />
              SYSTEM IDLE · STANDBY
            </span>
            <span>BUILD GTE/EVO/Z9 · v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-widest2 text-silver/50 mb-3">{title}</div>
      <div className="text-sm space-y-0.5">{children}</div>
    </div>
  );
}

function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" className="text-racered">
      <path d="M4 16 L16 4 L28 16 L16 28 Z" stroke="currentColor" strokeWidth="2" />
      <path d="M10 16 L16 10 L22 16 L16 22 Z" fill="currentColor" />
    </svg>
  );
}
