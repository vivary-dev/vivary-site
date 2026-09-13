import { Check } from "lucide-react";
import { facts } from "@/content/facts";

// A drawing of the desktop workbench, not a screenshot. Every label here is
// either a file name from facts.shipped.fiveFiles or ordinary window furniture.
const projects = ["my-workspace", "field-guide", "ledger"];
const capsule = ["AGENTS.md", ".vivary/context.md", "STATE.md"];

export function WorkbenchFrame() {
  return (
    <div className="c5-frame">
      <div className="c5-bar">
        <div className="c5-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span className="c5-bartitle">{facts.name}</span>
        <span className="c5-flag">{facts.inDevelopment.label}</span>
      </div>

      <div className="c5-panes">
        <div className="c5-pane c5-pane-proj">
          <p className="c5-ph">Projects</p>
          <ul className="c5-proj">
            {projects.map((p, i) => (
              <li key={p} data-on={i === 0 ? "true" : "false"}>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="c5-pane c5-pane-mid">
          <p className="c5-ph">my-workspace</p>

          <div className="c5-msg">
            <p className="c5-who">You</p>
            <p>Update the release steps and keep STATE.md current.</p>
          </div>

          <div className="c5-msg">
            <p className="c5-who">Agent</p>
            <p>
              I worked from three files in this workspace. Here is the receipt.
            </p>
          </div>

          <div className="c5-receipt">
            <p className="c5-rtitle">What the agent saw</p>
            <ul>
              {capsule.map((f) => (
                <li key={f}>
                  <Check size={12} strokeWidth={2.5} aria-hidden="true" />
                  <code>{f}</code>
                </li>
              ))}
            </ul>
            <p className="c5-note">
              Three files in the capsule. Nothing else was read.
            </p>
          </div>

          <div className="c5-input">
            <span>Ask about this workspace</span>
            <span className="c5-caret" aria-hidden="true" />
          </div>
        </div>

        <div className="c5-pane">
          <p className="c5-ph">Files</p>
          <ul className="c5-files">
            {facts.shipped.fiveFiles.map((f) => (
              <li key={f} data-seen={capsule.includes(f) ? "true" : "false"}>
                <b aria-hidden="true" />
                <code>{f}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
