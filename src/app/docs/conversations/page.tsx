import Link from "next/link";
import { DocPage, DocSection, DocTable, Note, Steps, Ui, docMetadata } from "../article";

// Sources in vivary-dev/vivary at tag v0.1.0-beta.1, packages/workbench/app/components:
// layout/ProjectHistory.tsx, layout/CodeRunControl.tsx, layout/ChatSessionSearch.tsx,
// workspace/CodeConversation.tsx, CodeConversationLimits.tsx, LinkedConversation.tsx,
// ConversationMatch.tsx and Workspace.tsx, plus server/local-code-agent.ts. Native chat
// labels (Stop response, Archive, Restore) were checked in the installed 0.1.0-beta.1 build.

const slug = "conversations";
export const metadata = docMetadata(slug);

const sections = [
  { id: "types", label: "Code and Native" },
  { id: "start", label: "Start" },
  { id: "codex-requests", label: "Codex requests" },
  { id: "stop", label: "Stop" },
  { id: "linked", label: "Linked conversations" },
  { id: "archive", label: "Archive and restore" },
  { id: "search", label: "Search" },
];

export default function Conversations() {
  return (
    <DocPage slug={slug} sections={sections}>
      <DocSection id="types" title="Code conversations and Native chats">
        <p>Vivary has two types of conversation. Both types belong to the selected project and show in the sidebar.</p>
        <DocTable
          caption="Conversation types"
          head={["Type", "How it works"]}
          rows={[
            [
              <>Code conversation</>,
              "A coding runtime, Claude Code or Codex, runs on this computer with the account of that program. The agent works in the project folder.",
            ],
            [
              <>Native chat</>,
              <>Vivary runs the conversation with the API key of your provider. The menu shows it as <Ui key="api">API chat (separate billing)</Ui>, because your provider bills you for it.</>,
            ],
          ]}
        />
        <p>
          To connect a coding runtime or add a provider key, see{" "}
          <Link href="/docs/runtime-setup/">Set up coding runtimes and provider keys</Link>.
        </p>
      </DocSection>

      <DocSection id="start" title="Start a conversation">
        <Steps>
          <li>Select a project in the sidebar.</li>
          <li>Click <Ui>New conversation</Ui>.</li>
          <li>
            Optional: to select the type, open <Ui>Choose conversation runtime</Ui>, the arrow next to{" "}
            <Ui>New conversation</Ui>.
          </li>
          <li>Select <Ui>Code conversation</Ui> or <Ui>API chat (separate billing)</Ui>.</li>
          <li>In a Code conversation, select a <Ui>Runtime</Ui>: <Ui>Claude Code</Ui> or <Ui>Codex</Ui>.</li>
          <li>Select a <Ui>Model</Ui>.</li>
          <li>Enter your message.</li>
          <li>Send the message.</li>
        </Steps>
        <p>
          <strong>Result:</strong> The agent replies in the conversation. In a Code conversation, the
          agent can read and change files in the project folder. The line under the conversation shows
          the coding runtime, the model and what the runtime can do without your approval.
        </p>
        <p>
          If a coding runtime is not ready, Vivary shows <Ui>Set up Claude Code</Ui> or{" "}
          <Ui>Set up Codex</Ui>. Click <Ui>Open runtime settings</Ui> to set it up.
        </p>
        <p>
          After the first message, a Code conversation keeps its coding runtime and model. To use a
          different runtime or model, click <Ui>New conversation</Ui>, or continue in a{" "}
          <a href="#linked">linked conversation</a>. When you close and open Vivary again, it keeps your
          unsent drafts and the selected conversation.
        </p>
        <Note>
          One coding conversation runs at a time on a computer. While an agent works or waits for your
          approval, Vivary refuses a new request in a different conversation before the request changes
          anything. Vivary shows <Ui>An agent is working in another conversation.</Ui> Click{" "}
          <Ui>Open conversation</Ui> to go to the active conversation.
        </Note>
      </DocSection>

      <DocSection id="codex-requests" title="Answer a Codex request">
        <p>
          In the <Ui>Normal</Ui> execution mode, Codex asks before an action that needs broader access.
          The request shows at the top of the window, in every project.
        </p>
        <Steps>
          <li>Read the request.</li>
          <li>To let Codex do the action one time, click <Ui>Allow once</Ui>.</li>
          <li>To refuse the action, click <Ui>Decline</Ui>.</li>
          <li>To end the turn, click <Ui>Stop</Ui>.</li>
        </Steps>
        <p>
          While a request waits, you cannot send another message in that conversation. To set the
          execution mode, see <Link href="/docs/runtime-setup/#codex-permissions">Choose Codex permissions</Link>.
        </p>
      </DocSection>

      <DocSection id="stop" title="Stop a response">
        <Steps>
          <li>In the conversation, click <Ui>Stop</Ui>. In a Native chat, the button is named <Ui>Stop response</Ui>.</li>
          <li>
            If the agent works in a different project, use the bar at the top of the window. Click{" "}
            <Ui>Stop</Ui> there.
          </li>
        </Steps>
        <p>
          The bar at the top shows where the agent works, with <Ui>Open conversation</Ui> and{" "}
          <Ui>Stop</Ui>. Work continues when you go to a different page.
        </p>
        <p>
          If Vivary cannot confirm that the coding processes stopped, it shows{" "}
          <Ui>Vivary is checking whether coding processes stopped</Ui>. If it then lists processes that
          continue to run, click <Ui>End them</Ui> or <Ui>Continue anyway</Ui>. You must select one before
          you send another message.
        </p>
        <p>
          If Vivary closed during a run, the bar shows <Ui>Interrupted</Ui> with the project and the
          conversation. If a Codex request expired, the bar also shows <Ui>Codex request expired</Ui> and
          the reason.
        </p>
      </DocSection>

      <DocSection id="linked" title="Continue in a different runtime with a linked conversation">
        <p>
          A linked conversation is a new conversation that continues a saved conversation in a
          different runtime of the same project. For example, you can continue a Claude Code
          conversation in Codex, or a Native chat in Claude Code.
        </p>
        <Steps>
          <li>Open a saved conversation.</li>
          <li>
            Find <Ui>Linked conversation</Ui>. In a Code conversation, it is above the message box. In a
            Native chat, it is at the top.
          </li>
          <li>Open the list that starts with <Ui>Choose another harness…</Ui>.</li>
          <li>Select the target runtime.</li>
        </Steps>
        <p>
          A Code conversation offers your other Code runtime and <Ui>Native chat</Ui>. A Native chat offers
          your Code runtimes.
        </p>
        <p>
          <strong>Result:</strong> Vivary opens the new conversation in the same project, but it does
          not send a message. Your draft and approvals stay in the original conversation. The new
          conversation shows <Ui>Linked to</Ui> and the original title. Click{" "}
          <Ui>Inspect linked history</Ui> to read the earlier messages.
        </p>
      </DocSection>

      <DocSection id="archive" title="Archive and restore Native chats">
        <p>You can archive Native chats. You cannot archive Code conversations.</p>
        <Steps>
          <li>In the sidebar, open the menu of a Native chat.</li>
          <li>Click <Ui>Archive</Ui>.</li>
        </Steps>
        <p>To restore an archived chat, do these steps:</p>
        <Steps>
          <li>In the sidebar, open <Ui>Archived conversations</Ui>.</li>
          <li>Select the chat to open it, or click <Ui>Restore</Ui> to restore it without opening it.</li>
        </Steps>
      </DocSection>

      <DocSection id="search" title="Search conversations">
        <Steps>
          <li>In the sidebar, enter at least two characters in <Ui>Search conversations</Ui>.</li>
          <li>Optional: to include archived chats, select <Ui>Include archived</Ui>.</li>
          <li>Select a result.</li>
        </Steps>
        <p>
          <strong>Result:</strong> The conversation opens in read-only mode, with the matching message
          highlighted. To go back, click <Ui>Return to latest conversation</Ui>.
        </p>
        <p>
          The search looks at conversation titles and message text in Code conversations and Native
          chats. Press Escape to clear the search. To search project files, see{" "}
          <Link href="/docs/projects/#search">Search project files</Link>.
        </p>
      </DocSection>
    </DocPage>
  );
}
