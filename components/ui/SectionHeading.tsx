"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  accent = "#FF1E1E",
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  accent?: string;
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="flex items-center gap-3 font-mono text-[10px] tracking-widest2 text-silver/70 mb-6"
        style={{ justifyContent: align === "center" ? "center" : "flex-start" }}
      >
        <span className="h-px w-10" style={{ background: accent }} />
        <span style={{ color: accent }}>{eyebrow}</span>
        <span className="h-px w-10 bg-white/10" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
        className="font-display text-5xl md:text-7xl lg:text-8xl tracking-display leading-[0.95]"
      >
        {title}
      </motion.h2>
      {body && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-6 text-silver/80 text-base md:text-lg leading-relaxed max-w-2xl"
          style={{ marginInline: align === "center" ? "auto" : undefined }}
        >
          {body}
        </motion.p>
      )}
    </div>
  );
}
