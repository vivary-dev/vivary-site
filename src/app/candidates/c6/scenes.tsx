"use client";

import { useEffect, useRef, useState } from "react";

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
    if (window.location.search.includes("still")) {
      setInView(true);
      setStill(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setInView(true);
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} className={`${className ?? ""} ${inView ? "in" : ""} ${still ? "still" : ""}`.trim()}>
      {children}
    </section>
  );
}

export function HeroScene() {
  const [play, setPlay] = useState(false);
  const [still, setStill] = useState(false);
  useEffect(() => {
    if (window.location.search.includes("still")) {
      setStill(true);
      return;
    }
    const t = setTimeout(() => setPlay(true), 300);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`scene ${play ? "play" : ""} ${still ? "still" : ""}`.trim()} aria-hidden="true">
      <div className="pane">
        <div className="pane-head">
          <span>chat</span>
          <span>session 41</span>
        </div>
        <p className="chat-line">
          <b>You</b> Here is the project again. Postgres, no ORM.
        </p>
        <p className="chat-line">
          <b>Agent</b> Got it. I will keep that in mind.
        </p>
        <p className="chat-line">
          <b>You</b> Same rules as last time. Leave the migrations alone.
        </p>
        <p className="chat-line">
          <b>You</b> You wrote those rules yourself. Yesterday.
        </p>
        <p className="chat-line">
          <b>Agent</b> I do not have access to previous conversations.
        </p>
        <div className="stamp stamp-gone">session ended. nothing carried forward.</div>
      </div>
      <div className="pane paperpane">
        <div className="pane-head">
          <span>my-workspace</span>
          <span>kept</span>
        </div>
        <p className="file-line">
          <span className="n">AGENTS.md</span>
          <span className="d">rules</span>
        </p>
        <p className="file-line">
          <span className="n">STATE.md</span>
          <span className="d">next</span>
        </p>
        <p className="file-line new">
          <span className="n">memory/MEMORY.md</span>
          <span className="d">about you</span>
        </p>
        <p className="file-line new">
          <span className="n">decisions/2026-09-13-no-orm.md</span>
          <span className="d">why</span>
        </p>
        <p className="file-line">
          <span className="n">projects/onboarding/plan.md</span>
          <span className="d">plan</span>
        </p>
        <p className="file-line new">
          <span className="n">receipts/run-0412.md</span>
          <span className="d">what it saw</span>
        </p>
        <div className="stamp">session 41 of 41. all of it, still here.</div>
      </div>
    </div>
  );
}

const sessions = [
  {
    label: "Session 1",
    tree: [
      { t: "AGENTS.md" },
      { t: "STATE.md" },
      { t: ".vivary/", dir: true },
      { t: "context.md", deep: true },
      { t: "workspace.toml", deep: true },
    ],
    memory: [
      { t: "Nothing yet." },
      { t: "Vivary writes here only what you confirm." },
    ],
  },
  {
    label: "Session 8",
    tree: [
      { t: "AGENTS.md" },
      { t: "STATE.md" },
      { t: "memory/", dir: true, newer: true },
      { t: "MEMORY.md", deep: true, newer: true },
      { t: "decisions/", dir: true, newer: true },
      { t: "2026-09-02-no-orm.md", deep: true, newer: true },
      { t: "projects/", dir: true },
      { t: "onboarding/plan.md", deep: true },
      { t: ".vivary/", dir: true },
    ],
    memory: [
      { t: "You write in the morning. Never schedule builds then.", add: true },
      { t: "Project: Postgres, no ORM. Decided 2026-09-02.", add: true },
      { t: "Preference: short pull requests, one concern each.", add: true },
    ],
  },
  {
    label: "Session 30",
    tree: [
      { t: "AGENTS.md" },
      { t: "STATE.md" },
      { t: "memory/", dir: true },
      { t: "MEMORY.md", deep: true },
      { t: "decisions/", dir: true },
      { t: "2026-09-02-no-orm.md", deep: true },
      { t: "2026-09-21-drop-redis.md", deep: true, newer: true },
      { t: "receipts/", dir: true, newer: true },
      { t: "run-0412.md", deep: true, newer: true },
      { t: "projects/", dir: true },
      { t: "onboarding/plan.md", deep: true },
      { t: "field-notes/", deep: true, newer: true },
      { t: "inbox/", dir: true, newer: true },
    ],
    memory: [
      { t: "You write in the morning. Never schedule builds then." },
      { t: "Project: Postgres, no ORM. Decided 2026-09-02." },
      { t: "Preference: short pull requests, one concern each." },
      { t: "Tests run before a pull request opens, never after.", add: true },
      { t: "Redis is gone. Sessions live in Postgres. Decided 2026-09-21.", add: true },
      { t: "You keep field notes in a second workspace. Do not mix them.", add: true },
    ],
  },
];

export function SessionsScene() {
  const [i, setI] = useState(1);
  const s = sessions[i];
  return (
    <div className="sessions">
      <div className="tabs" role="tablist" aria-label="Sessions">
        {sessions.map((x, k) => (
          <button
            key={x.label}
            role="tab"
            aria-selected={k === i}
            onClick={() => setI(k)}
          >
            {x.label}
          </button>
        ))}
      </div>
      <div className="body">
        <div className="tree" aria-label="Workspace files">
          {s.tree.map((n, k) => (
            <div
              key={k}
              className={`${n.dir ? "dir" : ""} ${n.deep ? "deep" : ""} ${n.newer ? "newer" : ""}`.trim()}
            >
              {n.t}
            </div>
          ))}
        </div>
        <div className="memory">
          <h4>memory/MEMORY.md</h4>
          {s.memory.map((m, k) => (
            <p key={k} className={m.add ? "add" : ""}>
              {m.t}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CapsuleScene() {
  const files = [
    "STATE.md",
    "AGENTS.md",
    "memory/MEMORY.md",
    "src/db/migrations/",
    "projects/onboarding/plan.md",
    "src/auth.ts",
    "notes/2025-archive.md",
    "decisions/2026-09-02-no-orm.md",
    "inbox/",
  ];
  const picks = new Set([1, 4, 7]);
  return (
    <div className="capsule" aria-hidden="true">
      <div className="chips">
        {files.map((f, k) => (
          <div key={f} className={`chip ${picks.has(k) ? "pick" : ""}`}>
            {f}
          </div>
        ))}
      </div>
      <div className="arrow" />
      <div className="receipt">
        <h4>receipts/run-0412.md</h4>
        <p>
          Read <b>3 of 9</b> files.
        </p>
        <p>
          Changed <b>src/onboarding/flow.ts</b>.
        </p>
        <p>Left migrations untouched.</p>
        <p>Kept here. Open it any time.</p>
      </div>
    </div>
  );
}
