"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CarSilhouette } from "@/components/ui/CarSilhouette";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FINISHES = [
  { id: "carbon", label: "Liquid Carbon", hue: "#1a1a1a", accent: "#FF1E1E", body: "#0a0a0a" },
  { id: "titanium", label: "Brushed Titanium", hue: "#BFC3C7", accent: "#D4AF37", body: "#3a3a40" },
  { id: "guard", label: "Guard Red", hue: "#FF1E1E", accent: "#0a0a0a", body: "#FF1E1E" },
  { id: "azure", label: "Azure Pearl", hue: "#00D4FF", accent: "#0a0a0a", body: "#003c54" },
  { id: "gold", label: "Aurum Gold", hue: "#D4AF37", accent: "#1a1a1a", body: "#7d6520" },
];

const MOODS = [
  { id: "studio", label: "Studio", bg: "radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.18), transparent 60%)" },
  { id: "night", label: "Night Pit", bg: "radial-gradient(ellipse at 50% 80%, rgba(255,30,30,0.22), transparent 60%), radial-gradient(ellipse at 50% 10%, rgba(0,0,0,1), transparent 50%)" },
  { id: "rain", label: "Rain", bg: "linear-gradient(180deg, #050a14, #020306), radial-gradient(ellipse at 50% 100%, rgba(0,212,255,0.15), transparent 60%)" },
  { id: "sunset", label: "Sunset", bg: "linear-gradient(180deg, #18060a, #050505), radial-gradient(ellipse at 50% 100%, rgba(255,80,40,0.25), transparent 60%)" },
];

export function Garage() {
  const [finish, setFinish] = useState(FINISHES[0]);
  const [mood, setMood] = useState(MOODS[0]);
  const [drag, setDrag] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const last = useRef(0);

  // Drag-to-rotate
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      last.current = e.clientX;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - last.current;
      last.current = e.clientX;
      setDrag((d) => d + dx);
    };
    const onUp = (e: PointerEvent) => {
      dragging.current = false;
      el.releasePointerCapture(e.pointerId);
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const rotation = drag * 0.4;

  // Rain droplets
  const drops = Array.from({ length: mood.id === "rain" ? 80 : 0 });

  return (
    <section id="garage" className="relative py-32 md:py-40 px-6 md:px-12 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="08 · GARAGE"
          title={
            <>
              Configure.
              <br />
              <span className="gradient-text-gold">Drag to rotate.</span>
            </>
          }
          body="Five finishes. Four moods. Hands-on the platform — drag the chassis, change the light, see the paint react. This is the configurator they let you touch."
          accent="#D4AF37"
        />

        <div className="mt-12 grid md:grid-cols-[1fr_280px] gap-6">
          <div
            ref={ref}
            className="relative rounded-2xl overflow-hidden glass-strong hud-corner h-[60vh] min-h-[480px] cursor-grab active:cursor-grabbing"
            style={{ background: mood.bg }}
          >
            {/* Turntable */}
            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[80%] aspect-[3/1] rounded-[50%]"
              style={{
                background: `radial-gradient(ellipse, ${finish.hue}33, transparent 60%)`,
                boxShadow: `0 0 100px ${finish.hue}33`,
              }}
            />
            <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[68%] aspect-[3/1] rounded-[50%] border border-white/10"
              style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.04), transparent 70%)" }}
            />

            {/* Car (rotated via skew/scale for parallax illusion) */}
            <motion.div
              animate={{ rotateY: rotation }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ perspective: 1200 }}
            >
              <div
                style={{
                  transform: `rotateY(${rotation}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <CarSilhouette
                  variant="hyper"
                  hue={finish.hue}
                  className="w-[min(80vw,800px)]"
                />
              </div>
            </motion.div>

            {/* Rain */}
            {drops.map((_, i) => (
              <span
                key={i}
                className="absolute w-px h-6 bg-iceblue/50"
                style={{
                  left: `${(i * 13) % 100}%`,
                  top: `${(i * 7) % 100}%`,
                  animation: `fall ${1 + (i % 5) * 0.4}s linear ${(i % 10) * 0.1}s infinite`,
                  transform: "rotate(8deg)",
                }}
              />
            ))}
            <style jsx>{`
              @keyframes fall {
                from {
                  transform: translateY(-40px) rotate(8deg);
                  opacity: 0;
                }
                30% { opacity: 0.7; }
                to {
                  transform: translateY(110vh) rotate(8deg);
                  opacity: 0;
                }
              }
            `}</style>

            {/* HUD */}
            <div className="absolute top-6 left-6 font-mono text-[10px] tracking-widest2 text-silver/70 z-10">
              <div className="text-gold mb-1">● CONFIGURATOR</div>
              <div>FINISH · {finish.label.toUpperCase()}</div>
              <div>MOOD · {mood.label.toUpperCase()}</div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between font-mono text-[10px] tracking-widest2 text-silver/60">
              <span>DRAG · ROTATE 360°</span>
              <span>YAW · {Math.round(rotation)}°</span>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <ControlGroup label="PAINT FINISH">
              {FINISHES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFinish(f)}
                  data-cursor="hover"
                  className={`group flex items-center gap-3 px-3 py-2.5 w-full rounded-lg border transition-all ${
                    finish.id === f.id
                      ? "border-white/30 bg-white/[0.04]"
                      : "border-white/5 hover:border-white/20"
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-full ring-1 ring-white/20"
                    style={{ background: `linear-gradient(135deg, ${f.body}, ${f.hue})`, boxShadow: `0 0 14px ${f.hue}66` }}
                  />
                  <span className="font-mono text-[10px] tracking-widest2 text-silver/80">{f.label}</span>
                </button>
              ))}
            </ControlGroup>

            <ControlGroup label="MOOD">
              <div className="grid grid-cols-2 gap-2">
                {MOODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMood(m)}
                    data-cursor="hover"
                    className={`px-3 py-2.5 rounded-lg border font-mono text-[10px] tracking-widest2 transition-all ${
                      mood.id === m.id
                        ? "border-white/30 bg-white/[0.04] text-ghost"
                        : "border-white/5 text-silver/60 hover:border-white/20"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </ControlGroup>

            <div className="rounded-lg glass p-4">
              <div className="font-mono text-[10px] tracking-widest2 text-silver/50 mb-2">BUILD CODE</div>
              <div className="font-display text-lg tracking-display">
                GTE/{finish.id.toUpperCase().slice(0, 3)}/{mood.id.toUpperCase().slice(0, 3)}/Z9
              </div>
              <div className="text-silver/50 text-[11px] mt-1">Allocation queue · 38 months</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ControlGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg glass p-4 space-y-2">
      <div className="font-mono text-[10px] tracking-widest2 text-silver/50">{label}</div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}
