"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AudioToggle } from "./AudioToggle";
import { useScrollProgress } from "@/lib/hooks";

const ITEMS = [
  { href: "#hero", label: "01 · Ignition" },
  { href: "#transformation", label: "02 · Morph" },
  { href: "#showcase", label: "03 · Fleet" },
  { href: "#timeline", label: "04 · Eras" },
  { href: "#aero", label: "05 · Aero" },
  { href: "#engine", label: "06 · Engine" },
  { href: "#performance", label: "07 · Telemetry" },
  { href: "#garage", label: "08 · Garage" },
  { href: "#stats", label: "09 · Numbers" },
];

export function Navigation() {
  const progress = useScrollProgress();
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setShown(progress > 0.02);
  }, [progress]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-px"
        style={{ scaleX: progress, transformOrigin: "0% 50%" }}
        initial={false}
      >
        <div className="h-px bg-gradient-to-r from-racered via-gold to-iceblue" />
      </motion.div>

      <AnimatePresence>
        {shown && (
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-40"
          >
            <div className="glass-strong rounded-full px-3 py-2 flex items-center gap-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]">
              <a
                href="#hero"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors"
                data-cursor="hover"
              >
                <Logo />
                <span className="font-display tracking-display text-sm hidden md:inline">
                  GT EVOLUTION
                </span>
              </a>

              <div className="hidden lg:flex items-center gap-1 text-[10px] font-mono tracking-widest2 uppercase">
                {ITEMS.slice(0, 6).map((i) => (
                  <a
                    key={i.href}
                    href={i.href}
                    className="px-2.5 py-1.5 rounded-full text-silver hover:text-ghost hover:bg-white/5 transition-colors"
                    data-cursor="hover"
                  >
                    {i.label}
                  </a>
                ))}
                <button
                  onClick={() => setOpen(true)}
                  className="px-2.5 py-1.5 rounded-full text-silver hover:text-ghost hover:bg-white/5 transition-colors"
                  data-cursor="hover"
                >
                  + ALL
                </button>
              </div>

              <button
                onClick={() => setOpen(true)}
                className="lg:hidden px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest2 text-silver hover:text-ghost"
                data-cursor="hover"
              >
                MENU
              </button>

              <AudioToggle />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-bg/95 backdrop-blur-xl"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 font-mono text-xs tracking-widest2 text-silver hover:text-ghost"
              data-cursor="hover"
            >
              [ CLOSE ESC ]
            </button>
            <div className="h-full flex flex-col items-center justify-center gap-3">
              {ITEMS.map((i, idx) => (
                <motion.a
                  key={i.href}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className="group relative font-display text-5xl md:text-7xl tracking-display text-silver hover:text-ghost transition-colors"
                  data-cursor="hover"
                >
                  <span className="font-mono text-xs align-top mr-3 text-racered opacity-60">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {i.label.split("·")[1]?.trim() ?? i.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
