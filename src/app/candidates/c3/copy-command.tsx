"use client";

import { useState } from "react";

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
    <div className="c3-cmd">
      <code>{command}</code>
      <button type="button" className="c3-copy" onClick={copy}>
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
