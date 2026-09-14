"use client";

import { useEffect, useRef, useState } from "react";

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
  const [still, setStill] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isStill()) {
      const t = setTimeout(() => {
        setInView(true);
        setStill(true);
      }, 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setInView(true);
      },
      { rootMargin: "0px 0px -16% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`${className ?? ""} ${inView ? "in" : ""} ${still ? "still" : ""}`.trim()}
    >
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

export function Whispers() {
  const [play, setPlay] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => (isStill() ? setStill(true) : setPlay(true)), isStill() ? 0 : 260);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`whispers ${play ? "play" : ""} ${still ? "still" : ""}`.trim()}>
      <p className="filename">
        <span>memory/MEMORY.md</span>
        <span className="lines">41 lines, plain text</span>
      </p>
      <div className="said">
        {lines.map((l, i) => (
          <p key={l.t} className={l.own ? "line own" : "line"} style={{ "--i": i } as React.CSSProperties}>
            {l.t}
          </p>
        ))}
      </div>
      <p className="turn">You can open that file. You can edit it. You can delete it.</p>
    </div>
  );
}
