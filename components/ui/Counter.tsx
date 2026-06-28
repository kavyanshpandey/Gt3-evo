"use client";

import { animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Counter({
  to,
  duration = 2.4,
  suffix = "",
  decimals = 0,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motion = useMotionValue(0);
  const rounded = useTransform(motion, (v) =>
    v.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  );
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          animate(motion, to, { duration, ease: [0.2, 0.8, 0.2, 1] });
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [motion, to, duration, started]);

  useEffect(() => {
    const u = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v + suffix;
    });
    return () => u();
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}
