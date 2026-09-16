"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";

export type NavItem = { href: string; label: string; external?: boolean };

// The phone menu: one button in the header, one panel under it. Closes on
// navigation and on Escape. Hidden above 640px by the stylesheet.
export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="menu-button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
        </svg>
      </button>
      <div id={id} className="menu" data-open={open}>
        <nav aria-label="Site, phone">
          {items.map((n) =>
            n.external ? (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </a>
            ) : (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </>
  );
}
