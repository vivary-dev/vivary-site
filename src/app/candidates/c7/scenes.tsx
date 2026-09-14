"use client";

import { useEffect, useRef, useState } from "react";

// Capture mode: ?still=1 shows every reveal and stops the tally at its final state.
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

type TallyRow = { key: string; value: number; unit: string };

const tally: TallyRow[] = [
  { key: "sessions", value: 1204, unit: "" },
  { key: "memory/MEMORY.md", value: 312, unit: "entries" },
  { key: "decisions/", value: 97, unit: "files" },
  { key: "receipts/", value: 4112, unit: "files" },
];

const after: { key: string; value: string }[] = [
  { key: "last run", value: "run-04112.md, 09:14" },
  { key: "capsule", value: "4 of 1,318 files" },
  { key: "oldest decision cited", value: "2027-03-18" },
];

type Phase = "idle" | "run" | "done";

const DELAY = 400;
const DURATION = 2200;
const STAGGER = 180;

export function TallyScene() {
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
    const start = performance.now() + DELAY;
    const tick = (now: number) => {
      let settled = true;
      const next = tally.map((r, i) => {
        const t = Math.min(1, Math.max(0, (now - start - i * STAGGER) / DURATION));
        if (t < 1) settled = false;
        const eased = 1 - Math.pow(1 - t, 3);
        return Math.round(r.value * eased);
      });
      setShown(next);
      setPhase(settled ? "done" : "run");
      if (!settled) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`pane ${phase}`} aria-hidden="true">
      <div className="pane-head">
        <span>northfield</span>
        <span>2029-09-13</span>
      </div>
      <div className="tally">
        {tally.map((r, i) => (
          <div key={r.key} className="tally-row">
            <span className="tk">{r.key}</span>
            <span className="tv">
              <b>{shown[i].toLocaleString("en-US")}</b>
              {r.unit ? <small>{r.unit}</small> : null}
            </span>
          </div>
        ))}
      </div>
      <div className="tally late">
        {after.map((r) => (
          <div key={r.key} className="tally-row">
            <span className="tk">{r.key}</span>
            <span className="tv">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
