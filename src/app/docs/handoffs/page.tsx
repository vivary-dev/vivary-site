import Link from "next/link";
import { DocPage, DocSection, DocTable, Note, Steps, Ui, docMetadata } from "../article";

// Sources in vivary-dev/vivary at 96d3a8c: packages/workbench/app/components/workspace/
// HandoffControl.tsx, server/handoff.ts, shared/handoff.ts, the README section
// "Prepare and save a handoff", and the release notes' handoff limits. The state document:
// server/project-memory.ts 968-988 reads `state` from a thin workspace's settings.
// packages/create-vivary/create_vivary.py writes `state = "STATE.md"` in
// .vivary/workspace.toml (6354) for New project (scaffold_thin_workspace, called from
// server/creation_workspace.py 42) and for Vivary setup (plan_adopt, 7048).

const slug = "handoffs";
export const metadata = docMetadata(slug);

const sections = [
  { id: "about", label: "What a handoff is" },
  { id: "state-document", label: "The state document" },
  { id: "save", label: "Prepare and save" },
  { id: "freshness", label: "Fresh or out of date" },
  { id: "problems", label: "Messages" },
];

export default function Handoffs() {
  return (
    <DocPage slug={slug} sections={sections}>
      <DocSection id="about" title="What a handoff records">
        <p>
          A handoff is a short summary that the agent writes and Vivary saves at the end of the
          project&apos;s state document. It records the goal, the project version, decisions,
          changes, checks, unfinished work, risks and the next action.
        </p>
        <p>
          Because it lives in a file in your project, the next session can start from it, whichever
          runtime or agent you use. You can read and edit the file yourself.
        </p>
      </DocSection>

      <DocSection id="state-document" title="Check the project's state document">
        <p>
          Vivary writes handoffs only to the project&apos;s state document. That is the file named by{" "}
          <code>state</code> in the <code>[workspace]</code> table of <code>.vivary/workspace.toml</code>.
          When Vivary writes that file for <Ui>New project</Ui> or <Ui>Preview Vivary setup</Ui>, it
          sets <code>state = &quot;STATE.md&quot;</code>. See{" "}
          <Link href="/docs/projects/">Open and set up projects</Link>.
        </p>
        <p>
          A folder without Vivary workspace settings has no state document. Its handoff control says{" "}
          <Ui>This project has no designated state document.</Ui>
        </p>
        <p>Vivary does not write a handoff to a state document that:</p>
        <ul>
          <li>does not exist</li>
          <li>is private or protected</li>
          <li>is not an editable text file, for example because it is too large or is a link</li>
        </ul>
      </DocSection>

      <DocSection id="save" title="Prepare and save a handoff">
        <Steps>
          <li>
            Open a saved conversation in the project. In a Code conversation the handoff controls are
            above the message box. In a Native chat they are at the top of the chat.
          </li>
          <li>
            Wait until the agent is not running, then choose <Ui>Prepare handoff</Ui>. Vivary asks the
            agent for a summary and shows <Ui>Handoff requested. When the agent has replied, click
            Save handoff.</Ui>
          </li>
          <li>Wait for the agent to finish its reply.</li>
          <li>
            Choose <Ui>Save handoff</Ui>. Vivary checks the reply and writes the handoff at the end of
            the state document.
          </li>
        </Steps>
        <p>
          Saving keeps all other text in the file and any draft you have open. A saved handoff
          replaces the previous one if it is still the last block in the file. If you added text
          after it, that text stays and the new handoff goes at the end.
        </p>
        <p>
          After the first save, the button reads <Ui>Update handoff</Ui>. Use it to write a new
          handoff later in the work.
        </p>
        <Note>
          Vivary marks the handoff block in the file with <code>&lt;!-- vivary:handoff --&gt;</code>{" "}
          and <code>&lt;!-- /vivary:handoff --&gt;</code>. Leave those lines in place.
        </Note>
      </DocSection>

      <DocSection id="freshness" title="See whether a handoff is fresh or out of date">
        <p>The handoff control shows the state of the last saved handoff:</p>
        <ul>
          <li>
            <Ui>Handoff in STATE.md is fresh.</Ui> It covers the project version and conversation work
            recorded when it was saved.
          </li>
          <li>
            <Ui>Handoff in STATE.md is out of date</Ui>, followed by the reasons. For example, the file
            was edited, the Git commit or branch changed, project files changed, or the conversation
            has newer work.
          </li>
        </ul>
        <p>
          Vivary checks again when you open the control, when the conversation changes, and when you
          save or rename a file in Files. The check does not call a model. To bring an out-of-date
          handoff up to date, choose <Ui>Update handoff</Ui>, wait for the reply, then choose{" "}
          <Ui>Save handoff</Ui>.
        </p>
      </DocSection>

      <DocSection id="problems" title="If the handoff is not saved">
        <DocTable
          caption="Handoff messages"
          head={["Message says", "What to do"]}
          rows={[
            ["This project has no designated state document", "Set up the folder so that it has a state document. See Open and set up projects."],
            ["The designated state document does not exist", "Create the file, then choose Prepare handoff again."],
            ["The file is private or protected, or cannot be edited", "Vivary does not write there. Inspect the file in Files or your editor, fix it, then choose Check again."],
            ["The file changed, or was renamed or deleted, after Prepare", "Your current text is kept. Choose Prepare handoff again."],
            ["The agent has not finished replying", "Wait for the reply, then choose Save handoff."],
            ["The conversation continued after the handoff reply", "Choose Update handoff to prepare it again."],
            ["The reply was not saved", "The reply did not have the expected form. Choose Prepare handoff again."],
            ["The file has damaged vivary:handoff markers", "Fix or remove the marker lines by hand. The previous version of the file is kept."],
            ["Vivary could not confirm that the handoff was saved", "Open the file in Files or your editor and check it. Then prepare the handoff again."],
          ]}
        />
        <p>
          After a failed write, Vivary offers <Ui>Retry</Ui> only when it can confirm that the file has
          not changed since you prepared the handoff.
        </p>
        <p>
          In some cases Vivary reports <Ui>Handoff not saved</Ui> even though the block reached the
          file. Before you prepare again, open the state document and check its last block.
        </p>
      </DocSection>
    </DocPage>
  );
}
