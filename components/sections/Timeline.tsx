"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { TIMELINE } from "@/lib/data";
import { CarSilhouette } from "@/components/ui/CarSilhouette";

/**
 * Horizontal-scroll timeline pinned via GSAP ScrollTrigger.
 * Each era card slides past as the user scrolls vertically.
 */
export function Timeline() {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx: any;
    let cancelled = false;
    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const gsap = gsapMod.gsap || gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger || stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const track = trackRef.current;
        const wrap = wrapRef.current;
        if (!track || !wrap) return;
        const distance = () => track.scrollWidth - window.innerWidth + 100;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => `+=${distance() + 200}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }, wrapRef);
    })();
    return () => {
      cancelled = true;
      ctx?.revert?.();
    };
  }, []);

  const accentColor = (a: string) =>
    a === "red" ? "#FF1E1E" : a === "blue" ? "#00D4FF" : a === "gold" ? "#D4AF37" : "#BFC3C7";

  return (
    <section id="timeline" ref={wrapRef} className="relative h-screen bg-bg overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.4))] pointer-events-none" />

      {/* Eyebrow strip */}
      <div className="absolute top-10 left-10 z-20 font-mono text-[10px] tracking-widest2 text-silver/70">
        <div className="flex items-center gap-2">
          <span className="h-px w-10 bg-racered" />
          <span className="text-racered">04 · ERAS · 1970 — 2050</span>
        </div>
        <div className="mt-3 font-display text-3xl md:text-5xl tracking-display text-ghost">
          Eight decades. <span className="gradient-text-red">One throttle line.</span>
        </div>
      </div>

      {/* Bottom marker rail */}
      <div className="absolute bottom-8 left-0 right-0 z-20 px-10">
        <div className="h-px bg-white/10 relative">
          {TIMELINE.map((era, i) => (
            <div
              key={era.year}
              className="absolute -top-2 -translate-x-1/2"
              style={{ left: `${(i / (TIMELINE.length - 1)) * 100}%` }}
            >
              <div className="w-px h-4 bg-white/30 mx-auto" />
              <div className="font-mono text-[10px] tracking-widest2 text-silver/60 mt-2">
                {era.year}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal track */}
      <div className="absolute inset-0 flex items-center">
        <div ref={trackRef} className="flex gap-6 pl-10 pr-20 will-change-transform">
          {TIMELINE.map((era) => {
            const accent = accentColor(era.accent);
            return (
              <article
                key={era.year}
                className="relative w-[min(85vw,620px)] h-[70vh] flex-shrink-0 rounded-2xl overflow-hidden glass-strong hud-corner"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 50% 80%, ${accent}33, transparent 60%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center px-10">
                  <CarSilhouette
                    variant={
                      era.year === "1970"
                        ? "f1"
                        : era.year === "1985"
                          ? "f1"
                          : era.year === "1995"
                            ? "gt3"
                            : era.year === "2005"
                              ? "f1"
                              : era.year === "2015"
                                ? "prototype"
                                : era.year === "2025"
                                  ? "hyper"
                                  : "ev"
                    }
                    hue={accent}
                    className="w-full"
                  />
                </div>

                <div className="absolute top-6 left-6">
                  <div className="font-display text-[14vw] md:text-[8vw] leading-none tracking-display text-stroke-thick" style={{ WebkitTextStrokeColor: accent }}>
                    {era.year}
                  </div>
                  <div className="font-display text-2xl md:text-3xl tracking-display mt-1">
                    {era.title}
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-silver/80 text-sm leading-relaxed max-w-md">{era.body}</p>
                  <div className="mt-4 grid grid-cols-4 gap-2 font-mono text-[10px] tracking-widest2">
                    <Stat label="POWER" value={era.power} hue={accent} />
                    <Stat label="TOP" value={era.topSpeed} hue={accent} />
                    <Stat label="CHASSIS" value={era.material} hue={accent} />
                    <Stat label="TECH" value={era.tech} hue={accent} />
                  </div>
                </div>
              </article>
            );
          })}
          {/* spacer so last card can scroll past */}
          <div className="w-[20vw] flex-shrink-0" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, hue }: { label: string; value: string; hue: string }) {
  return (
    <div className="border-l pl-2" style={{ borderColor: hue + "55" }}>
      <div className="text-silver/40 mb-0.5">{label}</div>
      <div className="text-ghost truncate">{value}</div>
    </div>
  );
}
