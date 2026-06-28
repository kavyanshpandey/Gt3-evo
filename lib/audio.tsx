"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type AudioCtx = {
  enabled: boolean;
  toggle: () => void;
  setRpm: (rpm: number) => void;
  triggerShift: () => void;
  rpm: number;
};

const Ctx = createContext<AudioCtx | null>(null);

/**
 * Synthetic engine drone — additive sawtooth stack with formant filter,
 * modulated by RPM. We can't ship copyrighted engine samples, so this
 * is the honest royalty-free fallback. Swap in real .ogg loops later
 * by replacing `startEngine` with an AudioBufferSource graph.
 */
export function AudioProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [rpm, setRpmState] = useState(1000);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{
    osc1: OscillatorNode;
    osc2: OscillatorNode;
    osc3: OscillatorNode;
    sub: OscillatorNode;
    noise: AudioBufferSourceNode;
    noiseGain: GainNode;
    bandpass: BiquadFilterNode;
    master: GainNode;
  } | null>(null);

  const startEngine = useCallback(async () => {
    if (ctxRef.current) return;
    const AC =
      typeof window !== "undefined"
        ? window.AudioContext || (window as any).webkitAudioContext
        : null;
    if (!AC) return;
    const ctx: AudioContext = new AC();
    if (ctx.state === "suspended") await ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 600;
    bandpass.Q.value = 2.1;
    bandpass.connect(master);

    const dist = ctx.createWaveShaper();
    const curve = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
      const x = (i - 128) / 128;
      curve[i] = Math.tanh(x * 3);
    }
    dist.curve = curve;
    dist.connect(bandpass);

    const mkOsc = (type: OscillatorType, freq: number, gain: number) => {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = gain;
      o.connect(g).connect(dist);
      o.start();
      return o;
    };

    const sub = mkOsc("sine", 60, 0.55);
    const osc1 = mkOsc("sawtooth", 120, 0.35);
    const osc2 = mkOsc("sawtooth", 180, 0.22);
    const osc3 = mkOsc("square", 240, 0.12);

    // pink-ish noise for turbo / wind
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.05;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "highpass";
    noiseFilter.frequency.value = 1200;
    noise.connect(noiseFilter).connect(noiseGain).connect(master);
    noise.start();

    ctxRef.current = ctx;
    nodesRef.current = { osc1, osc2, osc3, sub, noise, noiseGain, bandpass, master };

    // fade in
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(0, t);
    master.gain.linearRampToValueAtTime(0.18, t + 1.2);
  }, []);

  const stopEngine = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const t = ctx.currentTime;
    nodesRef.current?.master.gain.cancelScheduledValues(t);
    nodesRef.current?.master.gain.linearRampToValueAtTime(0, t + 0.4);
    window.setTimeout(() => {
      ctx.close().catch(() => {});
      ctxRef.current = null;
      nodesRef.current = null;
    }, 500);
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      if (next) startEngine();
      else stopEngine();
      return next;
    });
  }, [startEngine, stopEngine]);

  // Map RPM (idle 800 → redline 12000) onto frequencies + filter
  const setRpm = useCallback((value: number) => {
    setRpmState(value);
    const ctx = ctxRef.current;
    const n = nodesRef.current;
    if (!ctx || !n) return;
    const norm = Math.min(1, Math.max(0, (value - 800) / 11200));
    const base = 80 + norm * 260; // 80hz idle → 340hz at redline
    const t = ctx.currentTime;
    n.sub.frequency.setTargetAtTime(base * 0.5, t, 0.08);
    n.osc1.frequency.setTargetAtTime(base, t, 0.05);
    n.osc2.frequency.setTargetAtTime(base * 1.5, t, 0.05);
    n.osc3.frequency.setTargetAtTime(base * 2.01, t, 0.05);
    n.bandpass.frequency.setTargetAtTime(500 + norm * 2400, t, 0.1);
    n.noiseGain.gain.setTargetAtTime(0.02 + norm * 0.18, t, 0.1);
    n.master.gain.setTargetAtTime(0.14 + norm * 0.12, t, 0.15);
  }, []);

  const triggerShift = useCallback(() => {
    const ctx = ctxRef.current;
    const n = nodesRef.current;
    if (!ctx || !n) return;
    const t = ctx.currentTime;
    // quick gain dip + pitch dip = downshift pop / upshift cut
    n.master.gain.cancelScheduledValues(t);
    const current = n.master.gain.value;
    n.master.gain.setValueAtTime(current, t);
    n.master.gain.linearRampToValueAtTime(current * 0.2, t + 0.05);
    n.master.gain.linearRampToValueAtTime(current, t + 0.25);
    n.bandpass.frequency.cancelScheduledValues(t);
    const cur = n.bandpass.frequency.value;
    n.bandpass.frequency.setValueAtTime(cur, t);
    n.bandpass.frequency.linearRampToValueAtTime(4000, t + 0.06);
    n.bandpass.frequency.linearRampToValueAtTime(cur, t + 0.3);
  }, []);

  useEffect(() => () => stopEngine(), [stopEngine]);

  const value = useMemo<AudioCtx>(
    () => ({ enabled, toggle, setRpm, triggerShift, rpm }),
    [enabled, toggle, setRpm, triggerShift, rpm],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAudio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
}
