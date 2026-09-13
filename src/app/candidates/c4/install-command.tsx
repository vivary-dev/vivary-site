"use client";

import { Check, Copy } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

export function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <div className="c4-command">
      <code>
        <span className="c4-prompt" aria-hidden="true">
          $
        </span>
        {/* One span per token, spaces left outside them, so a line can only
            break at a space and never inside a flag or a package name. */}
        {command.split(" ").map((token, index) => (
          <Fragment key={`${token}-${index}`}>
            {index === 0 ? null : " "}
            <span className="c4-token">{token}</span>
          </Fragment>
        ))}
      </code>
      <button
        type="button"
        className="c4-copy"
        onClick={() => {
          navigator.clipboard.writeText(command).then(
            () => setCopied(true),
            () => setCopied(false)
          );
        }}
      >
        {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
        {copied ? "Copied" : "Copy command"}
      </button>
    </div>
  );
}
