"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SHOWCASE } from "@/lib/data";
import { CarSilhouette } from "@/components/ui/CarSilhouette";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Showcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = SHOWCASE[activeIdx];

  return (
    <section id="showcase" className="relative py-32 md:py-40 px-6 md:px-12 bg-bg overflow-hidden">
      {/* Background grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div
        className="absolute -top-40 left-1/4 w-[60vw] h-[60vw] rounded-full fog-blob"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.12), transparent 60%)" }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-end mb-12">
          <SectionHeading
            eyebrow="03 · THE FLEET"
            title={
              <>
                Six prototypes.
                <br />
                <span className="gradient-text-gold">Zero compromise.</span>
              </>
            }
            accent="#D4AF37"
          />
          <p className="text-silver/70 max-w-md md:justify-self-end text-sm leading-relaxed">
            From naturally aspirated V12 hypercars to four-motor hydrogen-extended EV prototypes — each
            chassis is a single thesis statement, executed without abbreviation.
          </p>
        </div>

        {/* Stage */}
        <div className="relative">
          <div className="relative h-[460px] md:h-[520px] rounded-2xl overflow-hidden glass-strong hud-corner">
            {/* radial stage */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 50% 70%, ${active.hue}22, transparent 60%), radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.05), transparent 50%)`,
              }}
            />
            {/* floor grid */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[40%]"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(0,0,0,0.6)), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 60px)",
                maskImage: "linear-gradient(180deg, transparent, black 40%)",
              }}
            />
            {/* spotlight cone */}
            <div
              className="absolute left-1/2 -top-10 -translate-x-1/2 w-[120%] h-[80%] opacity-50"
              style={{
                background: `conic-gradient(from 90deg at 50% 0%, transparent 0deg, ${active.hue}33 90deg, transparent 180deg)`,
                filter: "blur(40px)",
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.97 }}
                transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                className="absolute inset-0 flex items-center justify-center px-6 md:px-10"
              >
                {active.image ? (
                  <div className="relative w-full h-full max-w-4xl">
                    <Image
                      src={active.image}
                      alt={active.name}
                      fill
                      sizes="(max-width: 768px) 95vw, 80vw"
                      className="object-contain"
                      style={{
                        filter: `drop-shadow(0 24px 50px ${active.hue}55) drop-shadow(0 0 80px ${active.hue}22)`,
                      }}
                      priority={false}
                    />
                  </div>
                ) : (
                  <CarSilhouette
                    variant={active.silhouette}
                    hue={active.hue}
                    className="w-full max-w-3xl"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Spec panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "-panel"}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="absolute top-8 left-8 max-w-[280px]"
              >
                <div className="font-mono text-[10px] tracking-widest2 text-silver/60">
                  <span style={{ color: active.hue }}>● </span>
                  {active.category.toUpperCase()}
                </div>
                <h3 className="font-display text-4xl md:text-5xl tracking-display mt-2">
                  {active.name}
                </h3>
                <p className="text-silver/70 text-sm mt-3">{active.tagline}</p>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "-specs"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute bottom-8 right-8 flex gap-6 font-mono text-xs tracking-widest2"
              >
                <Spec value={String(active.hp)} unit="HP" hue={active.hue} />
                <Spec value={String(active.weight)} unit="KG" hue={active.hue} />
                <Spec value={active.zeroSixty} unit="0—100" hue={active.hue} />
              </motion.div>
            </AnimatePresence>

            {/* Rotation badge */}
            <div className="absolute top-8 right-8 font-mono text-[10px] tracking-widest2 text-silver/60 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-racered animate-pulse" />
              360° STAGE · {String(activeIdx + 1).padStart(2, "0")}/{SHOWCASE.length}
            </div>

            {/* Photographer credit */}
            {active.credit && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest2 text-silver/40">
                PHOTO · {active.credit.toUpperCase()}
              </div>
            )}
          </div>

          {/* Selector cards */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {SHOWCASE.map((car, i) => {
              const active = i === activeIdx;
              return (
                <button
                  key={car.id}
                  onClick={() => setActiveIdx(i)}
                  data-cursor="hover"
                  className={`group relative text-left rounded-lg p-3.5 border transition-all duration-300 ${
                    active
                      ? "border-white/30 bg-white/[0.04]"
                      : "border-white/5 bg-white/[0.015] hover:border-white/20"
                  }`}
                >
                  <div
                    className="absolute inset-x-0 -top-px h-px transition-opacity"
                    style={{ background: car.hue, opacity: active ? 1 : 0 }}
                  />
                  <div className="font-mono text-[9px] tracking-widest2 text-silver/50 truncate">
                    {String(i + 1).padStart(2, "0")} · {car.category}
                  </div>
                  <div className="font-display text-base lg:text-lg leading-tight mt-1 tracking-display">
                    {car.name}
                  </div>
                  <div className="font-mono text-[10px] text-silver/40 mt-1">
                    {car.hp} HP · {car.zeroSixty}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Spec({ value, unit, hue }: { value: string; unit: string; hue: string }) {
  return (
    <div className="text-right">
      <div className="font-display text-3xl text-ghost" style={{ textShadow: `0 0 16px ${hue}55` }}>
        {value}
      </div>
      <div className="text-silver/50 text-[10px]">{unit}</div>
    </div>
  );
}
