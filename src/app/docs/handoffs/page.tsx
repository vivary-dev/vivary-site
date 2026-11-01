import Link from "next/link";
import { DocPage, DocSection, DocTable, Note, Steps, Ui, docMetadata } from "../article";

// Sources in vivary-dev/vivary at tag v0.1.0-beta.1: packages/workbench/app/components/
// workspace/HandoffControl.tsx, HandoffDisplay.tsx, handoff-status.ts, server/handoff.ts,
// shared/handoff.ts, server/project-memory.ts (the `state` setting) and
// packages/create-vivary/create_vivary.py (`state = "STATE.md"`).

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
          A handoff records the goal, decisions, changes, checks, unfinished work, risks and next action
          of the work. It also records the project version, for example the Git commit.
        </p>
        <p>
          The handoff is in a file in your project. The next session can start from it, with any
          runtime or agent. You can read and edit the file yourself.
        </p>
      </DocSection>

      <DocSection id="state-document" title="Check the state document of the project">
        <p>
          The state document is the file that the <code>state</code> setting names, in the{" "}
          <code>[workspace]</code> table of <code>.vivary/workspace.toml</code>. Vivary writes handoffs only
          to this file. <Ui>New project</Ui> and <Ui>Preview Vivary setup</Ui> set{" "}
          <code>state = &quot;STATE.md&quot;</code>. See <Link href="/docs/projects/">Open and set up projects</Link>.
        </p>
        <p>
          A folder without Vivary workspace settings has no state document. Its handoff control shows{" "}
          <Ui>This project has no designated state document.</Ui>
        </p>
        <p>Vivary does not write a handoff to a state document in these conditions:</p>
        <ul>
          <li>The file does not exist.</li>
          <li>The file is private or protected.</li>
          <li>The file is not an editable text file, for example because it is too large or it is a link.</li>
        </ul>
      </DocSection>

      <DocSection id="save" title="Prepare and save a handoff">
        <Steps>
          <li>Open a saved conversation in the project.</li>
          <li>
            Find the handoff control. In a Code conversation, it is above the message box. In a Native
            chat, it is at the top.
          </li>
          <li>Make sure that the agent is not working.</li>
          <li>Click <Ui>Prepare handoff</Ui>.</li>
          <li>Wait until the agent completes its reply.</li>
          <li>Click <Ui>Save handoff</Ui>.</li>
        </Steps>
        <p>
          After you click <Ui>Prepare handoff</Ui>, the control shows{" "}
          <Ui>Handoff requested. When the agent has replied, click Save handoff.</Ui> The conversation
          shows <Ui>Handoff requested</Ui>. To read the full request, expand <Ui>Full request</Ui>.
        </p>
        <p>
          The reply of the agent shows as a <Ui>Handoff</Ui> preview. The preview shows the save status
          of that reply:
        </p>
        <DocTable
          caption="Save status of a handoff reply"
          head={["Status", "What it means"]}
          rows={[
            [<Ui key="n">Not saved yet. Click Save handoff to write it to the state document.</Ui>, "The reply is ready. Click Save handoff."],
            [<Ui key="s">Saved to STATE.md. Fresh.</Ui>, "Vivary saved this reply, and it is current."],
            [<Ui key="o">Saved to STATE.md. Out of date.</Ui>, "Vivary saved this reply, but the project or the conversation changed after that."],
            [<Ui key="r">Refused. Vivary did not save this reply.</Ui>, "The reply did not pass the checks. The preview lists the problems."],
          ]}
        />
        <p>
          <strong>Result:</strong> Vivary checks the reply and writes the handoff at the end of the state
          document. All other text in the file stays. If the previous handoff is still the last block in
          the file, the new handoff replaces it. If you added text after it, that text stays, and the new
          handoff goes at the end.
        </p>
        <p>
          After the first save, the button is named <Ui>Update handoff</Ui>. Use it to write a new handoff
          later in the work.
        </p>
        <Note>
          Vivary marks the handoff block in the file with <code>&lt;!-- vivary:handoff --&gt;</code>{" "}
          and <code>&lt;!-- /vivary:handoff --&gt;</code>. Do not remove these lines.
        </Note>
      </DocSection>

      <DocSection id="freshness" title="See if a handoff is fresh or out of date">
        <p>The handoff control shows the status of the last saved handoff:</p>
        <ul>
          <li>
            <Ui>Handoff in STATE.md is fresh.</Ui> The handoff covers the project version and the
            conversation work that existed when Vivary saved it.
          </li>
          <li>
            <Ui>Handoff in STATE.md is out of date</Ui>, followed by the reasons. For example,{" "}
            <Ui>STATE.md was edited</Ui>, <Ui>the Git commit or branch changed</Ui>, <Ui>project files changed</Ui>{" "}
            or <Ui>the conversation has newer work or requests</Ui>.
          </li>
        </ul>
        <p>
          Vivary checks again when you open the control, when the conversation changes, and when you
          save or rename a file in Files. The check does not use a model.
        </p>
        <p>To make an out-of-date handoff current, do these steps:</p>
        <Steps>
          <li>Click <Ui>Update handoff</Ui>.</li>
          <li>Wait until the agent completes its reply.</li>
          <li>Click <Ui>Save handoff</Ui>.</li>
        </Steps>
      </DocSection>

      <DocSection id="problems" title="If Vivary does not save the handoff">
        <DocTable
          caption="Handoff messages"
          head={["The message says", "What to do"]}
          rows={[
            ["This project has no designated state document", "Set up the folder so that it has a state document. See Open and set up projects."],
            ["The designated state document does not exist", "Create the file. Then click Prepare handoff again."],
            ["The state document is private or protected, or cannot be edited", "Vivary does not write there. Inspect the file in Files or your editor and correct it. Then click Check again."],
            ["The agent has not finished replying", "Wait for the reply. Then click Save handoff again. The reply can still be saved."],
            ["The conversation continued after the handoff reply", "Click Update handoff to prepare the handoff again."],
            ["Refused. Vivary did not save this reply.", "The reply did not have the necessary form. Read the listed problems. Then click Prepare handoff again."],
            ["The file has damaged vivary:handoff markers", "Correct or remove the marker lines by hand. Vivary keeps the previous version of the file."],
            ["Vivary could not confirm that the handoff was saved", "Open the file in Files or your editor and examine it. Then prepare the handoff again."],
          ]}
        />
        <p>
          After a write fails, Vivary shows <Ui>Retry</Ui> only when it can confirm that the file did not
          change after you prepared the handoff.
        </p>
        <p>
          Sometimes Vivary reports <Ui>Handoff not saved</Ui> although the block is in the file. Before you
          prepare the handoff again, open the state document and examine its last block.
        </p>
      </DocSection>
    </DocPage>
  );
}
