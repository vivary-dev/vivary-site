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
    <div className="c1-cmd">
      <code className="c1-cmd-text">
        <span className="c1-cmd-sigil" aria-hidden="true">
          ${" "}
        </span>
        {command}
      </code>
      <button type="button" className="c1-cmd-btn" onClick={copy}>
        {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
        {copied ? "Copied" : "Copy"}
      </button>
      <span className="c1-sr" role="status">
        {copied ? "Command copied to the clipboard" : ""}
      </span>
    </div>
  );
}
