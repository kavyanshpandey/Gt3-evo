"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CarSilhouette } from "@/components/ui/CarSilhouette";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  z: number;
};

/**
 * Canvas-based airflow over the silhouette. Particles emit from the
 * left, accelerate over the bodywork (a hand-tuned y-field), and react
 * to mouse position — the cursor distorts the flow like a wind-tunnel
 * obstruction.
 */
export function Aerodynamics() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    setDpr(Math.min(2, window.devicePixelRatio || 1));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (n: number) => {
      for (let i = 0; i < n; i++) {
        particles.push({
          x: -10,
          y: h * (0.3 + Math.random() * 0.55),
          vx: 1.4 + Math.random() * 1.6,
          vy: (Math.random() - 0.5) * 0.2,
          life: 1,
          z: Math.random(),
        });
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);
    resize();

    const tick = () => {
      ctx.fillStyle = "rgba(5,5,5,0.18)";
      ctx.fillRect(0, 0, w, h);

      if (particles.length < 600) spawn(8);

      const mx = mouseRef.current.x * w;
      const my = mouseRef.current.y * h;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        // base flow field: lift over the body centred at y ≈ 60% of height
        const bodyY = h * 0.62;
        const dy = p.y - bodyY;
        const dist = Math.abs(dy);
        const lift = Math.max(0, 1 - dist / (h * 0.3));
        p.vy -= lift * 0.04 * Math.sign(dy < 0 ? 1 : -1);
        p.vy *= 0.97;
        p.vx += 0.005;

        // mouse repulsion
        if (mouseRef.current.active) {
          const ddx = p.x - mx;
          const ddy = p.y - my;
          const d2 = ddx * ddx + ddy * ddy;
          if (d2 < 12000) {
            const inv = 1 / Math.sqrt(d2 + 1);
            p.vx += ddx * inv * 1.2;
            p.vy += ddy * inv * 1.2;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.003;

        if (p.x > w + 10 || p.y < 0 || p.y > h || p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const speed = Math.min(1, p.vx / 6);
        const r = 80 + speed * 175;
        const g = 200 + speed * 55;
        const b = 255;
        ctx.fillStyle = `rgba(${r},${g},${b},${0.05 + speed * 0.35 * p.life})`;
        ctx.fillRect(p.x, p.y, 2 + speed * 4, 1);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, [dpr]);

  return (
    <section id="aero" className="relative py-32 md:py-40 px-6 md:px-12 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="05 · AERODYNAMICS"
          title={
            <>
              Move air.
              <br />
              <span className="gradient-text-blue">Make grip.</span>
            </>
          }
          body="Every surface is a decision. Bargeboards, vortex generators, ground-effect tunnels — drag the cursor across the silhouette and feel the flow react in real-time."
          accent="#00D4FF"
        />

        <div
          ref={containerRef}
          className="relative mt-12 rounded-2xl overflow-hidden glass-strong hud-corner h-[60vh] min-h-[440px]"
        >
          <canvas ref={canvasRef} className="absolute inset-0" />
          <div className="absolute inset-0 flex items-end justify-center pb-[14%] pointer-events-none">
            <CarSilhouette variant="prototype" hue="#00D4FF" className="w-[min(90%,900px)]" glow={false} />
          </div>

          {/* HUD overlays */}
          <div className="absolute top-6 left-6 font-mono text-[10px] tracking-widest2 text-silver/70 z-10">
            <div className="text-iceblue mb-1">● WIND TUNNEL · LIVE</div>
            <div>FLOW · 320 KM/H</div>
            <div>YAW · 0.0°</div>
            <div>RIDE · 18 mm FRONT · 42 mm REAR</div>
          </div>

          <div className="absolute top-6 right-6 font-mono text-[10px] tracking-widest2 text-silver/70 z-10 text-right space-y-1">
            <Pill label="CD" value="0.31" />
            <Pill label="DOWNFORCE" value="3,840 N" />
            <Pill label="L/D RATIO" value="4.62" />
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-wrap gap-2 font-mono text-[10px] tracking-widest2">
            {["WING FLEX", "GROUND EFFECT", "DIFFUSER", "VENTURI", "ENDPLATES", "BARGEBOARDS"].map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-white/[0.04] border border-white/10 text-silver/80"
              >
                {tag}
              </span>
            ))}
            <span className="ml-auto text-silver/40">MOVE CURSOR · DISTURB FLOW</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <span className="text-silver/40">{label}</span>
      <span className="text-iceblue">{value}</span>
    </div>
  );
}
