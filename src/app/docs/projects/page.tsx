import Link from "next/link";
import { DocPage, DocSection, DocTable, Note, Steps, Ui, docMetadata } from "../article";

// Sources in vivary-dev/vivary at tag v0.1.0-beta.1, packages/workbench/app/components:
// projects/ProjectNavigation.tsx, CreateProjectForm.tsx, WorkspacePatternChoices.tsx,
// ProjectAdoption.tsx, ReconnectProjectForm.tsx, ProjectReadPanel.tsx,
// ProjectMemoryPanel.tsx, ProjectSearch.tsx, workspace/Workspace.tsx, routes/files.tsx,
// app/lib/project-memory-schema.ts and server/managed-projects.mjs. Folder chooser:
// packages/desktop/main.mjs and server/desktop-host.ts.

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
      <DocSection id="open-folder" title="Open a folder that you already have">
        <Steps>
          <li>In the sidebar, under <Ui>Projects</Ui>, click <Ui>Open folder</Ui>.</li>
          <li>In the <Ui>Open project folder</Ui> window, select the folder.</li>
          <li>Click <Ui>Open project</Ui>.</li>
        </Steps>
        <p>
          <strong>Result:</strong> Vivary adds the folder as a project. The folder stays where it is,
          and Vivary does not change its files. To add the Vivary guidance files, see{" "}
          <a href="#existing-folder">Set up Vivary in an existing folder</a>.
        </p>
        <ul>
          <li>If you cancel the window, nothing changes.</li>
          <li>
            If the window stays open for too long, Vivary shows <Ui>Folder selection timed out</Ui>.
            Close the window and click <Ui>Open folder</Ui> again.
          </li>
          <li>You cannot add a folder that is inside an existing project, or that contains one.</li>
        </ul>
        <p>
          <Ui>Open folder</Ui> works only in the desktop app. A browser that uses{" "}
          <Link href="/docs/remote-access/">remote access</Link> cannot open the folder window.
        </p>
      </DocSection>

      <DocSection id="new-project" title="Create a new project">
        <Steps>
          <li>In the sidebar, click <Ui>New project</Ui>.</li>
          <li>In <Ui>Project name</Ui>, enter a name.</li>
          <li>
            In <Ui>Workspace type</Ui>, select <Ui>Coding</Ui>, <Ui>Second brain</Ui>,{" "}
            <Ui>Knowledge work</Ui> or <Ui>Writing</Ui>.
          </li>
          <li>
            Optional: under <Ui>Optional guidance</Ui>, select <Ui>Capture</Ui>, <Ui>Sources</Ui>,{" "}
            <Ui>Navigation</Ui> or <Ui>Project brief</Ui>.
          </li>
          <li>Click <Ui>Preview files</Ui>.</li>
          <li>Expand each file to read its contents.</li>
          <li>Click <Ui>Create project</Ui>.</li>
        </Steps>
        <p>
          The project name can have 1 to 128 ASCII letters, numbers, periods, underscores or hyphens. It
          must start with a letter or a number, and it must not end with a period. Windows device names,
          such as <code>CON</code>, <code>NUL</code>, <code>COM1</code> or <code>LPT1</code>, are not
          permitted. Each <Ui>Optional guidance</Ui> choice adds a short guidance file.
        </p>
        <p>
          <strong>Result:</strong> Vivary creates the project in{" "}
          <code>%USERPROFILE%\.vivary\workbench\projects</code>. The project starts with these files:{" "}
          <code>AGENTS.md</code>, <code>STATE.md</code>, <code>.gitignore</code>,{" "}
          <code>.vivary/context.md</code> and <code>.vivary/workspace.toml</code>.
        </p>
        <p>
          To keep a project in a different location, create the folder yourself. Then add it with{" "}
          <Ui>Open folder</Ui>.
        </p>
      </DocSection>

      <DocSection id="existing-folder" title="Set up Vivary in an existing folder">
        <p>
          Vivary setup adds the Vivary guidance files to a folder that you opened. You see each change
          before Vivary writes it.
        </p>
        <Steps>
          <li>Select the project in the sidebar.</li>
          <li>In the project header, click <Ui>Details</Ui>.</li>
          <li>
            In the <Ui>Vivary setup</Ui> section, keep <Ui>Workspace type</Ui> at{" "}
            <Ui>Detect from folder</Ui>, or select a type.
          </li>
          <li>Click <Ui>Preview Vivary setup</Ui>.</li>
          <li>Expand each file in the plan to read its contents.</li>
          <li>Click <Ui>Confirm and apply</Ui>.</li>
        </Steps>
        <p>
          <strong>Result:</strong> Vivary shows <Ui>Vivary setup applied.</Ui> Click <Ui>Open files</Ui>{" "}
          or <Ui>Open chat</Ui> to continue.
        </p>
        <p>
          If the plan shows <Ui>Protect recovery records first</Ui>, do one more step before you apply.
          Click <Ui>Confirm privacy preparation</Ui>, and then click <Ui>Review Vivary setup</Ui>.
        </p>
        <p>
          The plan marks each change as <Ui>Create</Ui>, <Ui>Append managed block</Ui> or{" "}
          <Ui>Replace reviewed file</Ui>. Vivary does not change the files under <Ui>Kept unchanged</Ui>.
          When the plan adds a block to <code>AGENTS.md</code>, the existing text stays.
        </p>
        <ul>
          <li>A preview writes nothing.</li>
          <li><Ui>Confirm privacy preparation</Ui> changes only the <code>.gitignore</code> file of the folder.</li>
          <li>If the plan lists <Ui>Conflicts</Ui>, you cannot apply it. Resolve the conflicts, and then preview again.</li>
          <li>If a file changes after the preview, preview again.</li>
        </ul>
        <p>
          A folder that already has Vivary guidance shows <Ui>Review guidance change</Ui> instead, with
          the <Ui>Optional guidance</Ui> choices.
        </p>
      </DocSection>

      <DocSection id="review-connection" title="Reconnect a project that shows Unavailable">
        <p>
          A project shows <Ui>Unavailable</Ui> in the sidebar when Vivary cannot get access to its folder.
          This can occur when you move, rename or restore the folder.
        </p>
        <Steps>
          <li>Put the folder back in its original location.</li>
          <li>Stop or deny each coding request that runs in that project.</li>
          <li>Select the project in the sidebar.</li>
          <li>Click <Ui>Review connection</Ui>.</li>
          <li>Under <Ui>Reconnect this project</Ui>, make sure that the folder name and location are correct.</li>
          <li>Click <Ui>Reconnect project</Ui>.</li>
          <li>When the reconnection is complete, click <Ui>Refresh projects</Ui>.</li>
        </Steps>
        <p>
          A reconnection keeps the project and its conversations. It does not change files and does not
          start an agent. It cannot move a project to a new location.
        </p>
      </DocSection>

      <DocSection id="files" title="Read and edit files">
        <Steps>
          <li>In the project header, click <Ui>Files</Ui>.</li>
          <li>Select a file in the file list.</li>
          <li>To change the file, click <Ui>Edit</Ui>.</li>
          <li>Make your changes.</li>
          <li>Click <Ui>Save</Ui>, or press Ctrl+S.</li>
        </Steps>
        <p>
          Markdown files open with formatting. Text and source files open for reading. To rename a file,
          click <Ui>Rename</Ui>, enter the new <Ui>Filename</Ui>, and click <Ui>Rename file</Ui>.
        </p>
        <p>
          If the file changes on disk while you edit it, Vivary keeps your draft and shows{" "}
          <Ui>Current file on the host</Ui>. Compare the two versions. To keep your draft, click{" "}
          <Ui>Keep draft against this version</Ui>, and then click <Ui>Save</Ui>. To delete your draft,
          click <Ui>Discard draft</Ui>.
        </p>
        <p>
          Vivary saves text files up to 256 KB. Binary files and unsupported files do not open for
          editing. When you open a file, Vivary does not send it to a model.
        </p>
      </DocSection>

      <DocSection id="search" title="Search project files">
        <Steps>
          <li>In the project header, click <Ui>Search</Ui>.</li>
          <li>Optional: change the search mode from <Ui>Text</Ui> to <Ui>Filename</Ui> or <Ui>Regex</Ui>.</li>
          <li>In the search field, enter at least two characters.</li>
          <li>Select a result.</li>
        </Steps>
        <p>
          <strong>Result:</strong> Vivary shows the number of matches, for example{" "}
          <code>3 matches in 1 file</code>. The file of the result you select opens at the matching line.
        </p>
        <p>
          This search finds text in the files of the selected project. To search your conversations, see{" "}
          <Link href="/docs/conversations/#search">Search conversations</Link>.
        </p>
      </DocSection>

      <DocSection id="health" title="Check project health">
        <p>The health check reads your project files and changes nothing.</p>
        <Steps>
          <li>In the project header, click <Ui>Details</Ui>.</li>
          <li>In <Ui>Project health</Ui>, click <Ui>Check project health</Ui>.</li>
        </Steps>
        <p>
          <strong>Result:</strong> <Ui>Healthy</Ui> means that the check found no errors.{" "}
          <Ui>Needs attention</Ui> means that it found one or more errors. Warnings can show under
          either status, so read them too. If the check found no errors and no warnings, it shows{" "}
          <Ui>No findings.</Ui> To run the check again, click <Ui>Check again</Ui>.
        </p>
      </DocSection>

      <DocSection id="memory" title="Save facts in Memory">
        <p>
          Memory is a list of short facts about a project. Each fact has a source. Code conversations
          and Native chats in the project read the instructions, state and facts of the project at the
          start of each message.
        </p>
        <h3>Add a fact</h3>
        <Steps>
          <li>In the project header, click <Ui>Details</Ui>.</li>
          <li>Click <Ui>Remember a fact</Ui>.</li>
          <li>In <Ui>Title</Ui>, enter a short title of up to 120 characters.</li>
          <li>In <Ui>Fact</Ui>, enter the fact, up to 500 characters.</li>
          <li>In <Ui>Source</Ui>, enter where the fact comes from, up to 200 characters.</li>
          <li>Click <Ui>Save fact</Ui>.</li>
        </Steps>
        <p>
          <strong>Result:</strong> Vivary saves the fact as a Markdown file in{" "}
          <code>.vivary/knowledge/</code> in the project.
        </p>
        <h3>Change or remove a fact</h3>
        <DocTable
          caption="Memory actions"
          head={["To", "Do this"]}
          rows={[
            ["Correct a fact", <>Click <Ui key="c">Correct</Ui>, edit the fact, and click <Ui key="s">Save correction</Ui>.</>],
            ["Delete a fact", <>Click <Ui key="f">Forget</Ui>, and then click <Ui key="ff">Forget fact</Ui>.</>],
            ["See what agents get", <>Open <Ui key="w">What agents receive</Ui>.</>],
          ]}
        />
        <p>
          A change applies to your next message, also in open conversations. A reply that is in progress
          keeps the facts that it started with.
        </p>
        <Note>
          <Ui>Forget</Ui> removes the fact from Memory only. Earlier conversation transcripts, Codex
          history, Git history, other file versions and backups can still contain the fact. Vivary does
          not delete it from those places.
        </Note>
        <p>
          To record the status of the work for the next session, use a handoff. See{" "}
          <Link href="/docs/handoffs/">Save a handoff to STATE.md</Link>.
        </p>
      </DocSection>
    </DocPage>
  );
}
