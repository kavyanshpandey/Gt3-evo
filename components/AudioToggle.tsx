"use client";

import { useAudio } from "@/lib/audio";

export function AudioToggle() {
  const { enabled, toggle } = useAudio();
  return (
    <button
      onClick={toggle}
      data-cursor="hover"
      className="group relative flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-racered/60 transition-colors"
      aria-pressed={enabled}
      title={enabled ? "Mute engine" : "Start engine"}
    >
      <span className="font-mono text-[10px] tracking-widest2 text-silver group-hover:text-ghost">
        {enabled ? "RUNNING" : "MUTED"}
      </span>
      <span className="relative flex h-5 w-9 items-center rounded-full bg-black/60 border border-white/5">
        <span
          className={`absolute h-3 w-3 rounded-full transition-all duration-300 ${
            enabled
              ? "translate-x-5 bg-racered shadow-[0_0_8px_#ff1e1e]"
              : "translate-x-1 bg-silver"
          }`}
        />
      </span>
    </button>
  );
}
