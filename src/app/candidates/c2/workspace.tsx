"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { FileText, Folder, FolderOpen } from "lucide-react";
import { DitherAvatar } from "@/components/dither-kit/avatar";
import { entries } from "./files";

export function Workspace() {
  const [selected, setSelected] = useState(entries[0].path);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const panelId = useId();
  const current = entries.find((e) => e.path === selected) ?? entries[0];
  const lines = current.body.replace(/\n$/, "").split("\n");

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = entries.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setSelected(entries[next].path);
    buttons.current[next]?.focus();
  }

  return (
    <figure className="c2-ws">
      <div className="c2-ws-bar">
        <DitherAvatar name="my-workspace" size={16} animate={false} />
        <span className="c2-ws-name">my-workspace</span>
        <span className="c2-ws-note">written by create-vivary init</span>
      </div>
      <div className="c2-ws-body">
        <ul
          role="tablist"
          aria-label="Files in the workspace"
          aria-orientation="vertical"
          className="c2-tree"
        >
          {entries.map((entry, index) => {
            const isSelected = entry.path === selected;
            const Icon =
              entry.kind === "file" ? FileText : isSelected ? FolderOpen : Folder;
            return (
              <li key={entry.path} role="presentation">
                <button
                  type="button"
                  role="tab"
                  id={`${panelId}-tab-${index}`}
                  aria-selected={isSelected}
                  aria-controls={panelId}
                  tabIndex={isSelected ? 0 : -1}
                  ref={(el) => {
                    buttons.current[index] = el;
                  }}
                  className="c2-tree-item"
                  style={{ paddingLeft: `${0.9 + entry.depth * 1.2}rem` }}
                  onClick={() => setSelected(entry.path)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                >
                  <Icon aria-hidden className="c2-tree-icon" />
                  <span>{entry.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div
          role="tabpanel"
          id={panelId}
          aria-labelledby={`${panelId}-tab-${entries.indexOf(current)}`}
          className="c2-pane"
        >
          <div className="c2-pane-path">{current.path}</div>
          <pre key={current.path} className="c2-pane-body">
            <code>
              {lines.map((line, i) => (
                <span key={i} className="c2-line">
                  {line.length ? line : " "}
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>
      <figcaption className="c2-ws-caption">
        A workspace as create-vivary writes it. Pick a file to read it. The
        contents are the whole pitch.
      </figcaption>
    </figure>
  );
}
