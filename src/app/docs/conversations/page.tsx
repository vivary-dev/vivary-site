import Link from "next/link";
import { DocPage, DocSection, DocTable, Note, Steps, Ui, docMetadata } from "../article";

// Sources in vivary-dev/vivary at 96d3a8c, packages/workbench/app/components:
// layout/ProjectHistory.tsx, workspace/CodeConversation.tsx, CodeRunControl.tsx,
// LinkedConversation.tsx, ConversationMatch.tsx, ChatSessionSearch.tsx and
// workspace/Workspace.tsx, plus server/local-code-agent.ts and the release notes.

const slug = "conversations";
export const metadata = docMetadata(slug);

const sections = [
  { id: "types", label: "Code and Native" },
  { id: "start", label: "Start" },
  { id: "stop", label: "Stop" },
  { id: "linked", label: "Linked conversations" },
  { id: "archive", label: "Archive and restore" },
  { id: "search", label: "Search" },
];

export default function Conversations() {
  return (
    <DocPage slug={slug} sections={sections}>
      <DocSection id="types" title="Code conversations and Native chats">
        <DocTable
          caption="Conversation types"
          head={["Type", "How it works"]}
          rows={[
            [
              <>Code conversation</>,
              "Runs Claude Code or Codex on this computer with that tool's own account. The agent works in the project folder under the tool's permissions.",
            ],
            [
              <>Native chat</>,
              <>Runs inside Vivary on the provider key you added. The menu lists it as <Ui key="api">API chat (separate billing)</Ui> because your provider bills you for it.</>,
            ],
          ]}
        />
        <p>
          Both kinds belong to the selected project and appear in the sidebar. To connect a runtime
          or add a key, see <Link href="/docs/runtime-setup/">Set up coding runtimes and provider keys</Link>.
        </p>
      </DocSection>

      <DocSection id="start" title="Start a conversation">
        <Steps>
          <li>Select a project in the sidebar.</li>
          <li>
            Choose <Ui>New conversation</Ui>. To pick the kind, open the arrow beside it, named{" "}
            <Ui>Choose conversation runtime</Ui>, and choose <Ui>Code conversation</Ui> or{" "}
            <Ui>API chat (separate billing)</Ui>.
          </li>
          <li>
            In a Code conversation, choose the <Ui>Runtime</Ui>, <Ui>Claude Code</Ui> or <Ui>Codex</Ui>,
            and then the <Ui>Model</Ui>. A runtime that is not ready shows its status in the list, and{" "}
            <Ui>Open runtime settings</Ui> takes you to its setup.
          </li>
          <li>Type your message and send it.</li>
        </Steps>
        <p>
          After the first message, the runtime and model of a Code conversation are fixed. To use a
          different one, start a new conversation, or continue in a{" "}
          <a href="#linked">linked conversation</a>. Unsent drafts and the selected conversation are
          kept when you close and reopen Vivary.
        </p>
        <Note>
          One Code run works at a time across all projects. While one runs or waits for your
          approval, a new request is refused before it changes anything. Choose{" "}
          <Ui>Open conversation</Ui> to go to the active run, then let it finish or stop it.
        </Note>
      </DocSection>

      <DocSection id="stop" title="Stop a response">
        <Steps>
          <li>Choose <Ui>Stop</Ui> in the Code conversation, or the <Ui>Stop response</Ui> button in a Native chat.</li>
          <li>
            If a Code run continues in another project, use the bar at the top of the window. It shows
            where the agent is working, with <Ui>Open conversation</Ui> and <Ui>Stop</Ui>.
          </li>
        </Steps>
        <p>
          If Vivary cannot confirm that the coding processes ended, it shows{" "}
          <Ui>Vivary is checking whether coding processes stopped</Ui>. When it lists processes that
          are still running, choose <Ui>End them</Ui> to end them, or <Ui>Continue anyway</Ui> to
          leave them. You must choose one before you send another message.
        </p>
      </DocSection>

      <DocSection id="linked" title="Continue in another runtime with a linked conversation">
        <p>
          A linked conversation lets you carry a saved conversation to another runtime in the same
          project. For example, you can move a Claude Code conversation to Codex, or a Native chat to
          Claude Code.
        </p>
        <Steps>
          <li>Open a saved conversation.</li>
          <li>
            Find <Ui>Linked conversation</Ui> above the message box in a Code conversation, or at the
            top of a Native chat.
          </li>
          <li>
            In the list that starts with <Ui>Choose another harness…</Ui>, choose the target. A Code
            conversation offers your other configured Code runtime and <Ui>Native chat</Ui>. A Native
            chat offers your configured Code runtimes.
          </li>
        </Steps>
        <p>
          Vivary opens the new conversation in the same project without starting it. Nothing is sent.
          Your draft and approvals stay in the original conversation. The new conversation shows{" "}
          <Ui>Linked to</Ui> with the original title, and <Ui>Inspect linked history</Ui> opens the
          earlier messages.
        </p>
      </DocSection>

      <DocSection id="archive" title="Archive and restore Native chats">
        <p>You can archive Native chats. Code conversations cannot be archived.</p>
        <Steps>
          <li>In the sidebar, open the menu of a Native chat and choose <Ui>Archive</Ui>.</li>
          <li>To bring it back, open <Ui>Archived conversations</Ui> in the sidebar.</li>
          <li>Select the chat to restore and open it, or choose <Ui>Restore</Ui> to restore it without opening it.</li>
        </Steps>
      </DocSection>

      <DocSection id="search" title="Search conversations">
        <Steps>
          <li>In the sidebar, type at least two characters into <Ui>Search conversations</Ui>.</li>
          <li>To include archived chats, select <Ui>Include archived</Ui>.</li>
          <li>
            Select a result. The conversation opens read-only with the matching message highlighted.
            Choose <Ui>Return to latest conversation</Ui> to go back.
          </li>
        </Steps>
        <p>
          Search looks at conversation titles and message text in Code conversations and Native
          chats. Press Escape to clear it. To search project files instead, see{" "}
          <Link href="/docs/projects/#search">Search project files</Link>.
        </p>
      </DocSection>
    </DocPage>
  );
}
