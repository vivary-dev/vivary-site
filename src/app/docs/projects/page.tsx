import Link from "next/link";
import { DocPage, DocSection, DocTable, Note, Steps, Ui, docMetadata } from "../article";

// Sources in vivary-dev/vivary at 96d3a8c, packages/workbench/app/components:
// projects/ProjectNavigation.tsx, CreateProjectForm.tsx, WorkspacePatternChoices.tsx,
// ProjectAdoption.tsx, ReconnectProjectForm.tsx, ProjectReadPanel.tsx,
// ProjectMemoryPanel.tsx, ProjectSearch.tsx, workspace/Workspace.tsx and
// routes/files.tsx. Desktop chooser: packages/desktop/main.mjs.

const slug = "projects";
export const metadata = docMetadata(slug);

const sections = [
  { id: "open-folder", label: "Open a folder" },
  { id: "new-project", label: "New project" },
  { id: "existing-folder", label: "Set up a folder" },
  { id: "review-connection", label: "Reconnect" },
  { id: "files", label: "Files" },
  { id: "search", label: "Search files" },
  { id: "health", label: "Health" },
  { id: "memory", label: "Memory" },
];

export default function Projects() {
  return (
    <DocPage slug={slug} sections={sections}>
      <DocSection id="open-folder" title="Open a folder you already have">
        <Steps>
          <li>In the sidebar, under <Ui>Projects</Ui>, choose <Ui>Open folder</Ui>.</li>
          <li>In the <Ui>Open project folder</Ui> window, select the folder and choose <Ui>Open project</Ui>.</li>
        </Steps>
        <p>
          The folder stays where it is. Vivary adds it as a project and does not change its files. To
          add Vivary&apos;s guidance files to it, see <a href="#existing-folder">Set up Vivary in an existing folder</a>.
        </p>
        <ul>
          <li>If you cancel the window, nothing changes.</li>
          <li>
            If the window stays open for two minutes, Vivary shows <Ui>Folder selection timed out</Ui>.
            Close the window and choose <Ui>Open folder</Ui> again.
          </li>
          <li>A folder that overlaps another project cannot be added. Choose a folder that is not inside, or around, an existing project.</li>
        </ul>
        <p>
          <Ui>Open folder</Ui> works only in the desktop app. A browser that uses{" "}
          <Link href="/docs/remote-access/">remote access</Link> cannot open the folder window.
        </p>
      </DocSection>

      <DocSection id="new-project" title="Create a new project">
        <Steps>
          <li>In the sidebar, choose <Ui>New project</Ui>.</li>
          <li>
            Enter a <Ui>Project name</Ui>. Use up to 128 letters, numbers, periods, underscores or
            hyphens.
          </li>
          <li>
            Choose a <Ui>Workspace type</Ui>: <Ui>Coding</Ui>, <Ui>Second brain</Ui>,{" "}
            <Ui>Knowledge work</Ui> or <Ui>Writing</Ui>.
          </li>
          <li>
            Optional: under <Ui>Optional guidance</Ui>, select any of <Ui>Capture</Ui>, <Ui>Sources</Ui>,{" "}
            <Ui>Navigation</Ui> or <Ui>Project brief</Ui>. Each one adds a short guidance file.
          </li>
          <li>Choose <Ui>Preview files</Ui> and expand each file to read its contents.</li>
          <li>Choose <Ui>Create project</Ui>.</li>
        </Steps>
        <p>
          Vivary creates the project in its own Projects folder, inside{" "}
          <code>%USERPROFILE%\.vivary\workbench</code>. To keep a project somewhere else, create the
          folder yourself and use <Ui>Open folder</Ui>.
        </p>
      </DocSection>

      <DocSection id="existing-folder" title="Set up Vivary in an existing folder">
        <p>
          Setup adds Vivary&apos;s guidance files to a folder you opened. You see every change before
          anything is written.
        </p>
        <Steps>
          <li>Select the project, then choose <Ui>Details</Ui> at the top of the workspace.</li>
          <li>
            In the <Ui>Vivary setup</Ui> section, keep <Ui>Workspace type</Ui> at{" "}
            <Ui>Detect from folder</Ui> or choose a type. Then choose <Ui>Preview Vivary setup</Ui>.
          </li>
          <li>
            Review the plan. Expand each file to read its exact contents. Each change is marked{" "}
            <Ui>Create</Ui>, <Ui>Append managed block</Ui> or <Ui>Replace reviewed file</Ui>. Files
            under <Ui>Kept unchanged</Ui> are not touched.
          </li>
          <li>
            If the plan shows <Ui>Protect recovery records first</Ui>, choose{" "}
            <Ui>Confirm privacy preparation</Ui>. This changes only the folder&apos;s{" "}
            <code>.gitignore</code>. Then preview the setup again.
          </li>
          <li>Choose <Ui>Confirm and apply</Ui>.</li>
          <li>When Vivary shows <Ui>Vivary setup applied.</Ui>, choose <Ui>Open files</Ui> or <Ui>Open chat</Ui>.</li>
        </Steps>
        <p>
          Previewing writes nothing. If the plan lists <Ui>Conflicts</Ui>, the confirm button stays
          off until you resolve them. If a file changes after the preview, preview again. Existing
          text in <code>AGENTS.md</code> stays when the plan appends Vivary&apos;s block.
        </p>
        <p>
          A folder that already has Vivary guidance shows <Ui>Review guidance change</Ui> instead,
          with the <Ui>Optional guidance</Ui> choices.
        </p>
      </DocSection>

      <DocSection id="review-connection" title="Reconnect a project that shows Unavailable">
        <p>
          A project shows <Ui>Unavailable</Ui> in the sidebar when Vivary can no longer reach its
          folder, for example after the folder was moved, renamed, or restored from a backup.
        </p>
        <Steps>
          <li>Put the folder back at its original location.</li>
          <li>Stop or deny any coding request that is running in that project.</li>
          <li>Select the project in the sidebar and choose <Ui>Review connection</Ui>.</li>
          <li>Under <Ui>Reconnect this project</Ui>, check that the folder name and location are the folder you expect.</li>
          <li>Choose <Ui>Reconnect project</Ui>. When it finishes, choose <Ui>Refresh projects</Ui>.</li>
        </Steps>
        <p>
          Reconnecting keeps the project and its conversations. It does not change files and does not
          start an agent. It cannot move a project to a new location.
        </p>
      </DocSection>

      <DocSection id="files" title="Read and edit files">
        <Steps>
          <li>Choose <Ui>Files</Ui> at the top of the workspace.</li>
          <li>Select a file in the file list. Markdown opens formatted. Text and source files open for reading.</li>
          <li>To change a file, choose <Ui>Edit</Ui>, make your changes, then choose <Ui>Save</Ui> or press Ctrl+S.</li>
          <li>To rename a file, choose <Ui>Rename</Ui>, enter the new <Ui>Filename</Ui> and choose <Ui>Rename file</Ui>.</li>
        </Steps>
        <p>
          If the file changed on disk while you edited it, Vivary keeps your draft and shows{" "}
          <Ui>Current file on the host</Ui>. Compare the two. To keep your draft, choose{" "}
          <Ui>Keep draft against this version</Ui>, review the draft, then choose <Ui>Save</Ui>.
          To drop your draft, choose <Ui>Discard draft</Ui>.
        </p>
        <p>
          Vivary saves text files up to 256 KB. Binary and unsupported files do not open for editing.
          Opening a file does not send it to a model.
        </p>
      </DocSection>

      <DocSection id="search" title="Search project files">
        <Steps>
          <li>Choose <Ui>Search</Ui> at the top of the workspace.</li>
          <li>Choose <Ui>Text</Ui>, <Ui>Filename</Ui> or <Ui>Regex</Ui>.</li>
          <li>Type at least two characters.</li>
          <li>Select a result. The file opens at the matching line.</li>
        </Steps>
        <p>
          This searches the files of the selected project. To search your conversations, see{" "}
          <Link href="/docs/conversations/#search">Search conversations</Link>.
        </p>
      </DocSection>

      <DocSection id="health" title="Check project health">
        <Steps>
          <li>Choose <Ui>Details</Ui>.</li>
          <li>In <Ui>Project health</Ui>, choose <Ui>Check project health</Ui>.</li>
          <li>Read the result. <Ui>Healthy</Ui> means no problems were found. <Ui>Needs attention</Ui> lists errors and warnings.</li>
        </Steps>
        <p>The check reads your project and changes nothing.</p>
      </DocSection>

      <DocSection id="memory" title="Save facts in Memory">
        <p>
          Memory holds short facts about a project, each with a source. Code conversations and Native
          chats in that project read the project&apos;s instructions, state and facts when each
          message starts. A change applies from your next message.
        </p>
        <h3>Add a fact</h3>
        <Steps>
          <li>Choose <Ui>Details</Ui>, then <Ui>Remember a fact</Ui>.</li>
          <li>
            Fill in <Ui>Title</Ui> (up to 120 characters), <Ui>Fact</Ui> (up to 500) and{" "}
            <Ui>Source</Ui> (up to 200), such as the file or conversation the fact came from.
          </li>
          <li>Choose <Ui>Save fact</Ui>.</li>
        </Steps>
        <h3>Change or remove a fact</h3>
        <DocTable
          caption="Memory actions"
          head={["To", "Do this"]}
          rows={[
            ["Fix a fact", <>Choose <Ui key="c">Correct</Ui>, edit it, then choose <Ui key="s">Save correction</Ui>.</>],
            ["Delete a fact", <>Choose <Ui key="f">Forget</Ui>, then <Ui key="ff">Forget fact</Ui>.</>],
            ["See what agents get", <>Open <Ui key="w">What agents receive</Ui>.</>],
          ]}
        />
        <Note>
          Memory is separate from conversation history. Forgetting a fact does not remove it from
          earlier conversations.
        </Note>
        <p>
          To record where the work stands for the next session, use a handoff. See{" "}
          <Link href="/docs/handoffs/">Save a handoff to STATE.md</Link>.
        </p>
      </DocSection>
    </DocPage>
  );
}
