"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let trailX = mouseX;
    let trailY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setHidden(false);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
      }
      const t = e.target as HTMLElement | null;
      if (t && (t.closest("a, button, [data-cursor='hover']"))) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    const onLeave = () => setHidden(true);

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      trailX += (mouseX - trailX) * 0.08;
      trailY += (mouseY - trailY) * 0.08;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailX - 36}px, ${trailY - 36}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", () => setHidden(false));

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`fixed inset-0 pointer-events-none z-[100] mix-blend-difference ${hidden ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
    >
      <div
        ref={trailRef}
        className={`absolute top-0 left-0 w-[72px] h-[72px] rounded-full border border-iceblue/30 ${
          hovering ? "scale-150" : "scale-100"
        } transition-transform duration-500`}
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.08), transparent 60%)" }}
      />
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 w-9 h-9 rounded-full border ${
          hovering ? "border-racered scale-150" : "border-ghost/70"
        } transition-all duration-300`}
      >
        <div className="absolute inset-1 rounded-full border border-ghost/20" />
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-px h-1.5 bg-racered" />
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-px h-1.5 bg-racered" />
        <span className="absolute -left-1 top-1/2 -translate-y-1/2 h-px w-1.5 bg-racered" />
        <span className="absolute -right-1 top-1/2 -translate-y-1/2 h-px w-1.5 bg-racered" />
      </div>
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-ghost shadow-[0_0_10px_rgba(255,255,255,0.9)]"
      />
    </div>
  );
}
