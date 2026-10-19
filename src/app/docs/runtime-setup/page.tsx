import Link from "next/link";
import { DocPage, DocSection, DocTable, Note, Steps, Ui, docMetadata } from "../article";

// Sources in vivary-dev/vivary at 96d3a8c: packages/workbench/app/components/settings/
// LocalRuntimeSettings.tsx, app/routes/settings.tsx, the bundled Core 0.176.5 settings
// (client/settings/SettingsPanel.js: handleSave at 425 saves a key only, handleApply at
// 515 switches the chat provider), the Connect AI form (ProviderSetupForm.js 71-99 saves
// and switches), the condition key lookup (triggers/dispatcher.js 278 and 434,
// agent/production-agent.js 373-377), and the release INSTALL-WINDOWS.md.

const slug = "runtime-setup";
export const metadata = docMetadata(slug);

const sections = [
  { id: "what-you-need", label: "What you need" },
  { id: "coding-runtimes", label: "Claude Code and Codex" },
  { id: "codex-permissions", label: "Codex permissions" },
  { id: "provider-key", label: "Native chat key" },
  { id: "anthropic-key", label: "Anthropic key" },
];

export default function RuntimeSetup() {
  return (
    <DocPage slug={slug} sections={sections}>
      <DocSection id="what-you-need" title="What each kind of work needs">
        <p>
          Vivary opens without an account, and it includes no model access. What you connect depends
          on the work you want to do:
        </p>
        <DocTable
          caption="Accounts and keys by feature"
          head={["Feature", "What it needs"]}
          rows={[
            ["Code conversations", "Claude Code or Codex installed on this computer and signed in with your own account."],
            ["Native chat", "An API key from a model provider, added in Vivary. Usage is billed by that provider."],
            ["Automation conditions", "An Anthropic API key, whatever provider you use for chats."],
          ]}
        />
        <p>
          You need at least one of the first two to work with an agent. To see how the two kinds of
          conversation differ, see <Link href="/docs/conversations/#types">Work in conversations</Link>.
        </p>
      </DocSection>

      <DocSection id="coding-runtimes" title="Connect Claude Code or Codex">
        <p>
          Vivary uses the Claude Code or Codex command-line tool that is installed on this computer.
          Each tool keeps its own sign-in and credentials. Vivary does not store them.
        </p>
        <Steps>
          <li>
            Open <Ui>Settings</Ui> and choose <Ui>Coding runtimes</Ui>. You can also choose{" "}
            <Ui>Set up coding runtimes</Ui> on the general settings page, or the <Ui>Runtime settings</Ui>{" "}
            button in a Code conversation.
          </li>
          <li>
            Under <Ui>Local agents</Ui>, find <Ui>Claude Code</Ui> or <Ui>Codex</Ui> and read its status:{" "}
            <Ui>Signed in</Ui>, <Ui>Sign-in required</Ui>, <Ui>Not installed</Ui> or <Ui>Check needed</Ui>.
          </li>
          <li>
            If the status is not <Ui>Signed in</Ui>, open <Ui>Set up Claude Code</Ui> or <Ui>Set up Codex</Ui>{" "}
            and follow its three steps:
            <ul>
              <li>Choose <Ui>Install Claude Code</Ui> or <Ui>Install Codex</Ui> and follow the official instructions.</li>
              <li>In a terminal, run <code>claude auth login</code> for Claude Code or <code>codex login</code> for Codex.</li>
              <li>Finish signing in through your browser.</li>
            </ul>
          </li>
          <li>Back in Vivary, choose <Ui>Refresh</Ui>. The status changes to <Ui>Signed in</Ui>.</li>
        </Steps>
        <p>
          Vivary finds a tool that is installed as a program, or installed globally with npm or pnpm,
          in a folder on your <code>PATH</code>. On Windows it searches <code>PATH</code> in the same
          order as a terminal and uses the first copy that has a launcher, such as{" "}
          <code>codex.exe</code> or <code>codex.cmd</code>.
        </p>
        <p>
          Codex in Vivary signs in with your ChatGPT account. Codex API keys and custom Codex
          providers are not supported. Codex keeps its own configuration, skills and connections.
          The Codex row lists your configured connection names.
        </p>
      </DocSection>

      <DocSection id="codex-permissions" title="Choose Codex permissions">
        <p>
          In <Ui>Coding runtimes</Ui>, under <Ui>Codex permissions</Ui>, choose an{" "}
          <Ui>Execution mode</Ui>:
        </p>
        <DocTable
          caption="Codex execution modes"
          head={["Mode", "What Codex can do"]}
          rows={[
            [<Ui key="normal">Normal</Ui>, "Work inside the project. It asks before actions that need broader access."],
            [<Ui key="read">Read only</Ui>, "Inspect local files. It cannot edit them or ask for broader command permissions."],
            [<Ui key="yolo">YOLO</Ui>, "Run commands with full access to your computer without asking. Use it only with projects and instructions you trust."],
          ]}
        />
        <p>
          A change applies when you send your next message. Work that is already running keeps its
          permissions. Services that Codex connects to keep their own access settings.
        </p>
      </DocSection>

      <DocSection id="provider-key" title="Add a provider key for Native chat">
        <p>
          Native chat sends your messages to a model provider with an API key that you add. Vivary
          keeps one saved key per provider. Native chat uses one provider at a time.
        </p>
        <Steps>
          <li>Open <Ui>Settings</Ui>. On the general settings page, choose <Ui>Set up providers</Ui>.</li>
          <li>In the <Ui>LLM</Ui> section, open <Ui>Custom keys</Ui>.</li>
          <li>Choose your provider.</li>
          <li>Paste your key into the key field and choose <Ui>Save</Ui>. This saves the key only.</li>
          <li>
            To make that provider the one Native chat uses, choose <Ui>Apply</Ui>. The change takes
            effect in your next conversation.
          </li>
        </Steps>
        <p>
          If no key is set, an empty chat shows a <Ui>Connect AI</Ui> card instead. Its{" "}
          <Ui>Save and use</Ui> button, for example <Ui>Save and use OpenAI</Ui>, saves the key and
          also makes that provider the one Native chat uses.
        </p>
        <Note>
          Keep keys in Vivary settings, not in chat messages. When text that looks like a credential
          reaches a model, the screen or storage, Vivary replaces it with a placeholder such as{" "}
          <code>[redacted credential]</code>.
        </Note>
      </DocSection>

      <DocSection id="anthropic-key" title="Add an Anthropic key for automation conditions">
        <p>
          An automation can have a condition that decides whether a webhook call or an event starts a
          run. Vivary checks conditions with Anthropic&apos;s API, whatever provider you use for chats,
          and sends the call or event data to Anthropic for the check.
        </p>
        <p>
          Conditions use the Anthropic key saved in Vivary, separately from the provider Native chat
          uses. You can keep chatting with another provider.
        </p>
        <Steps>
          <li>Open <Ui>Settings</Ui>, choose <Ui>Set up providers</Ui>, and open <Ui>Custom keys</Ui> in the <Ui>LLM</Ui> section.</li>
          <li>Choose Anthropic as the provider.</li>
          <li>Paste your Anthropic key into the key field and choose <Ui>Save</Ui>.</li>
          <li>To keep chatting with your current provider, do not choose <Ui>Apply</Ui>. <Ui>Apply</Ui> switches Native chat to Anthropic.</li>
        </Steps>
        <p>
          Do not use <Ui>Save and use Anthropic</Ui> on the <Ui>Connect AI</Ui> card for this. That
          button also switches Native chat to Anthropic. Without an Anthropic key, an automation with
          a condition does not run, and its details show the reason. See{" "}
          <Link href="/docs/automations/#conditions">Run automations</Link>.
        </p>
      </DocSection>
    </DocPage>
  );
}
