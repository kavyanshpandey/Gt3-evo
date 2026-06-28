"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/ui/Counter";
import { STATS } from "@/lib/data";

export function Stats() {
  return (
    <section id="stats" className="relative py-32 md:py-40 px-6 md:px-12 bg-bg overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.1), transparent 60%)",
        }}
      />
      {/* Embers */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold animate-ember"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDelay: `${(i % 5) * 0.6}s`,
              animationDuration: `${4 + (i % 4)}s`,
              boxShadow: "0 0 8px #d4af37",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 font-mono text-[10px] tracking-widest2 text-silver/70 mb-6"
        >
          <span className="h-px w-10 bg-gold" />
          <span className="text-gold">09 · LEGACY · LIVE COUNTERS</span>
        </motion.div>

        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-display leading-none">
          The race never <span className="gradient-text-gold">truly stops counting.</span>
        </h2>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-xl glass-strong p-6 md:p-8 hud-corner relative overflow-hidden"
            >
              <div className="font-mono text-[10px] tracking-widest2 text-silver/50">
                {String(i + 1).padStart(2, "0")} · {s.label.toUpperCase()}
              </div>
              <div
                className="mt-3 font-display text-6xl md:text-7xl tracking-display gradient-text-gold leading-none"
                style={{ textShadow: "0 0 24px rgba(212,175,55,0.35)" }}
              >
                <Counter to={s.value} suffix={s.suffix} duration={2.4} />
              </div>
              <div className="mt-3 h-px bg-gradient-to-r from-gold/60 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
