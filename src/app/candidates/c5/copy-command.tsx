"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="c5-cmd">
      <code>{command}</code>
      <button type="button" className="c5-copy" onClick={copy}>
        {copied ? (
          <Check size={14} strokeWidth={2.5} aria-hidden="true" />
        ) : (
          <Copy size={14} strokeWidth={2.5} aria-hidden="true" />
        )}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
