"use client";

import { type ReactNode, useEffect, useState } from "react";
import { DitherGradient } from "@/components/dither-kit/gradient";
import { Vivarium } from "./vivarium";

// The bloom: the dither resolves from coarse to fine once, the wash fades up,
// and the layers settle from the files upward. One moment, then nothing moves.
const CELLS = [18, 11, 7, 4];
const STEP_MS = 240;

export function HeroStage({ masthead, children }: { masthead: ReactNode; children: ReactNode }) {
  const [step, setStep] = useState(0);
  const [lit, setLit] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    if (reduced) {
      // Land on the finished state in one step. The stylesheet drops the
      // transitions, so nothing animates on the way there.
      timers.push(
        window.setTimeout(() => {
          setStep(CELLS.length - 1);
          setLit(true);
          setReady(true);
        }, 0)
      );
    } else {
      // Mount the wash dark, then light it a frame later so the fade runs.
      timers.push(window.setTimeout(() => setReady(true), 0));
      timers.push(window.setTimeout(() => setLit(true), 60));
      for (let i = 1; i < CELLS.length; i += 1) {
        timers.push(window.setTimeout(() => setStep(i), 60 + STEP_MS * i));
      }
    }
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const cell = CELLS[step];

  return (
    <section className="c4-hero" data-lit={lit ? "true" : "false"}>
      {ready ? (
        <div className="c4-wash">
          <div className="c4-wash-sun">
            <DitherGradient from={34} direction="down" cell={cell} opacity={0.1} />
          </div>
          <div className="c4-wash-moss">
            <DitherGradient from={96} direction="up" cell={cell} opacity={0.26} />
          </div>
        </div>
      ) : null}
      <div className="c4-wrap">{masthead}</div>
      <div className="c4-wrap c4-hero-grid">
        <div>{children}</div>
        <div className="c4-hero-art">
          <Vivarium />
        </div>
      </div>
    </section>
  );
}
