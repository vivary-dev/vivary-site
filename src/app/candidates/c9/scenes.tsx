"use client";

import { useEffect, useRef, useState } from "react";

// Capture mode: ?still=1 shows every reveal and stops the hero at its final state.
const isStill = () => window.location.search.includes("still");

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isStill()) {
      const t = setTimeout(() => setInView(true), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setInView(true);
      },
      { rootMargin: "0px 0px -14% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} className={`${className ?? ""} ${inView ? "in" : ""}`.trim()}>
      {children}
    </section>
  );
}

const lines: { t: string; own?: boolean }[] = [
  { t: "You write in the morning." },
  { t: "You dislike ORMs. You said so in March." },
  { t: "You keep field notes in a second workspace. I do not mix them." },
  { t: "You told me not to touch the migrations." },
  { t: "I have not.", own: true },
];

type TallyRow = { key: string; value: number };

const tally: TallyRow[] = [
  { key: "sessions", value: 1204 },
  { key: "memory entries", value: 312 },
  { key: "decisions", value: 97 },
  { key: "receipts", value: 4112 },
];

// The hero runs one sequence: the file speaks, then the counts run. Each phase keeps the earlier ones.
const phases = ["idle", "say", "count", "done"] as const;
type Phase = (typeof phases)[number];

const SAY_START = 260;
const SAY_STEP = 720;
const SAY_LENGTH = 900;
const COUNT_DURATION = 2000;
const COUNT_STAGGER = 160;

export function MemoryScene() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [shown, setShown] = useState<number[]>(() => tally.map(() => 0));

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isStill() || reduce) {
      const t = setTimeout(() => {
        setShown(tally.map((r) => r.value));
        setPhase("done");
      }, 0);
      return () => clearTimeout(t);
    }
    let raf = 0;
    const sayTimer = setTimeout(() => setPhase("say"), SAY_START);
    const countAt = SAY_START + (lines.length + 1) * SAY_STEP + SAY_LENGTH;
    const countTimer = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        let settled = true;
        const next = tally.map((r, i) => {
          const t = Math.min(1, Math.max(0, (now - start - i * COUNT_STAGGER) / COUNT_DURATION));
          if (t < 1) settled = false;
          const eased = 1 - Math.pow(1 - t, 3);
          return Math.round(r.value * eased);
        });
        setShown(next);
        setPhase(settled ? "done" : "count");
        if (!settled) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, countAt);
    return () => {
      clearTimeout(sayTimer);
      clearTimeout(countTimer);
      cancelAnimationFrame(raf);
    };
  }, []);

  const reached = phases.slice(1, phases.indexOf(phase) + 1).join(" ");

  return (
    <div className={`memory ${reached}`.trim()}>
      <p className="filehead">
        <span>memory/MEMORY.md</span>
        <span>312 entries, plain text</span>
      </p>
      <div className="said" aria-label="Lines from the memory file">
        {lines.map((l, i) => (
          <p
            key={l.t}
            className={l.own ? "line own" : "line"}
            style={{ "--i": i } as React.CSSProperties}
          >
            {l.t}
          </p>
        ))}
      </div>
      <p className="turn">You can open that file. You can edit it. You can delete it.</p>
      <div className="strip" aria-hidden="true">
        {tally.map((r, i) => (
          <div key={r.key} className="cell">
            <span className="tk">{r.key}</span>
            <b>{shown[i].toLocaleString("en-US")}</b>
          </div>
        ))}
      </div>
    </div>
  );
}
