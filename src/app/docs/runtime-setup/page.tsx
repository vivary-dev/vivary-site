import Link from "next/link";
import { DocPage, DocSection, DocTable, Note, Steps, Ui, docMetadata } from "../article";

// Sources in vivary-dev/vivary at tag v0.1.0-beta.1: packages/workbench/app/components/
// settings/LocalRuntimeSettings.tsx, app/lib/code-permission-labels.ts,
// app/routes/settings.tsx, server/local-runtime-setup.ts, and the patched Core 0.176.5
// settings panel (LLM section, Custom keys, Save, Apply, Connect AI). Core labels were
// checked in the installed 0.1.0-beta.1 build.

const slug = "runtime-setup";
export const metadata = docMetadata(slug);

const sections = [
  { id: "what-you-need", label: "Before you begin" },
  { id: "coding-runtimes", label: "Claude Code and Codex" },
  { id: "codex-permissions", label: "Codex permissions" },
  { id: "provider-key", label: "Native chat key" },
  { id: "anthropic-key", label: "Anthropic key" },
];

export default function RuntimeSetup() {
  return (
    <DocPage slug={slug} sections={sections}>
      <DocSection id="what-you-need" title="Before you begin">
        <p>
          Vivary opens without an account, and it does not include access to AI models. What you
          connect depends on the work that you want to do.
        </p>
        <DocTable
          caption="What each feature needs"
          head={["Feature", "What it needs"]}
          rows={[
            ["Code conversations", "Claude Code 2.1.286 or later, or Codex 0.160.0 or later. Install it on this computer and sign in with your own account."],
            ["Native chat", "An API key from a provider. The provider bills you for its use."],
            ["Automation conditions", "An Anthropic API key, whatever provider you use for Native chat."],
          ]}
        />
        <p>
          A provider is a company that sells access to AI models with an API key, for example
          Anthropic or OpenAI. A Native chat is a conversation that Vivary runs itself with your
          provider key. To compare the two types of conversation, see{" "}
          <Link href="/docs/conversations/#types">Work in conversations</Link>.
        </p>
      </DocSection>

      <DocSection id="coding-runtimes" title="Connect Claude Code or Codex">
        <p>
          Vivary uses the Claude Code or Codex program that is installed on this computer. Each program
          keeps its own sign-in and credentials. Vivary does not store them.
        </p>
        <Steps>
          <li>In the sidebar, click <Ui>Settings</Ui>.</li>
          <li>Under <Ui>Agent</Ui>, click <Ui>Coding runtimes</Ui>.</li>
          <li>Under <Ui>Local agents</Ui>, read the status of <Ui>Claude Code</Ui> or <Ui>Codex</Ui>.</li>
          <li>If the status is not <Ui>Signed in</Ui>, expand <Ui>Set up Claude Code</Ui> or <Ui>Set up Codex</Ui>.</li>
          <li>Click <Ui>Install Claude Code</Ui> or <Ui>Install Codex</Ui>.</li>
          <li>Install the program with the official instructions.</li>
          <li>In a terminal, run <code>claude auth login</code> for Claude Code, or <code>codex login</code> for Codex.</li>
          <li>Complete the sign-in in your browser.</li>
          <li>In Vivary, click <Ui>Refresh</Ui>.</li>
        </Steps>
        <p><strong>Result:</strong> The status changes to <Ui>Signed in</Ui>.</p>
        <DocTable
          caption="Coding runtime status"
          head={["Status", "What it means"]}
          rows={[
            [<Ui key="s">Signed in</Ui>, "The coding runtime is ready."],
            [<Ui key="r">Sign-in required</Ui>, "The program is installed, but you are not signed in."],
            [<Ui key="u">Update required</Ui>, <>The installed version is too old. Click <Ui key="up">Update Claude Code</Ui> or <Ui key="uc">Update Codex</Ui>, update the program, and then click <Ui key="rf">Refresh</Ui>.</>],
            [<Ui key="n">Not installed</Ui>, "Vivary did not find the program."],
            [<Ui key="c">Check needed</Ui>, "Vivary could not check the program. Click Refresh to try again."],
          ]}
        />
        <p>
          While the status is <Ui>Update required</Ui>, Vivary does not send messages to that coding
          runtime.
        </p>
        <p>
          Vivary finds a program that is installed as an executable, or globally with npm or pnpm, in
          a folder on your <code>PATH</code>. It searches the folders in the same order as a terminal. It
          uses the first copy that has a launcher, such as <code>codex.exe</code> or <code>codex.cmd</code>.
        </p>
        <p>
          Codex in Vivary uses your ChatGPT sign-in. Vivary does not support Codex with an API key. Codex
          keeps its own configuration and tools. The Codex row lists the connections that you set up in
          Codex.
        </p>
      </DocSection>

      <DocSection id="codex-permissions" title="Choose Codex permissions">
        <p>
          The execution mode controls what Codex can do without your approval. It applies to Codex
          only. Claude Code conversations accept file edits without asking, whichever mode you select.
        </p>
        <Steps>
          <li>Go to <Ui>Settings</Ui> &gt; <Ui>Agent</Ui> &gt; <Ui>Coding runtimes</Ui>.</li>
          <li>Under <Ui>Codex permissions</Ui>, find <Ui>Execution mode</Ui>.</li>
          <li>Select <Ui>Normal</Ui>, <Ui>Read only</Ui> or <Ui>YOLO</Ui>.</li>
        </Steps>
        <DocTable
          caption="Codex execution modes"
          head={["Mode", "What Codex can do"]}
          rows={[
            [<Ui key="normal">Normal</Ui>, "Work inside the project. Codex asks before actions that need broader access."],
            [<Ui key="read">Read only</Ui>, "Read local files. Codex cannot edit them or ask for broader command permissions."],
            [<Ui key="yolo">YOLO</Ui>, "Run commands with full access to your computer, without approval. Use this mode only with projects and instructions that you trust."],
          ]}
        />
        <p>
          The change applies when you send your next message. Work that is running keeps its current
          permissions. Services that Codex connects to keep their own access settings.
        </p>
      </DocSection>

      <DocSection id="provider-key" title="Add a provider key for Native chat">
        <p>
          Native chat sends your messages to a provider with an API key that you add. Vivary keeps one
          saved key for each provider. Native chat uses one provider at a time.
        </p>
        <Steps>
          <li>In the sidebar, click <Ui>Settings</Ui>.</li>
          <li>Under <Ui>Agent</Ui>, click <Ui>Overview</Ui>.</li>
          <li>In the <Ui>LLM</Ui> section, click <Ui>Custom keys</Ui>. If a key is already saved, click <Ui>Manage</Ui>.</li>
          <li>Select your provider.</li>
          <li>Paste your API key into the key field.</li>
          <li>Click <Ui>Save</Ui>. This step saves the key only.</li>
          <li>To use this provider for Native chat, click <Ui>Apply</Ui>.</li>
        </Steps>
        <p>
          <Ui>Apply</Ui> shows only when the provider or model that you selected is different from the
          current one. The change applies to your next conversation.
        </p>
        <p>
          If no key is saved, an empty Native chat shows a <Ui>Connect AI</Ui> card. The card&apos;s{" "}
          <Ui>Save and use</Ui> button, for example <Ui>Save and use OpenAI</Ui>, saves the key. It also
          makes that provider the one that Native chat uses.
        </p>
        <Note>
          Keep keys in Vivary settings, not in chat messages. Vivary replaces the keys that it holds,
          and text in common key formats, with a placeholder such as <code>[redacted credential]</code>.
          This replacement does not find every secret. A Codex approval request is stored as Codex sent
          it. Claude Code and Codex send their own context to their providers, and Vivary does not filter
          that context.
        </Note>
      </DocSection>

      <DocSection id="anthropic-key" title="Add an Anthropic key for automation conditions">
        <p>
          An automation condition is a rule that decides if a webhook call or an event starts a run.
          Vivary checks conditions with the Anthropic API, whatever provider you use for Native chat. It
          sends the call or event data to Anthropic for the check.
        </p>
        <p>
          Conditions use the Anthropic key that is saved in Vivary. You can continue to use a different
          provider for Native chat.
        </p>
        <Steps>
          <li>Go to <Ui>Settings</Ui> &gt; <Ui>Agent</Ui> &gt; <Ui>Overview</Ui>.</li>
          <li>In the <Ui>LLM</Ui> section, click <Ui>Custom keys</Ui>, or <Ui>Manage</Ui> if a key is saved.</li>
          <li>Select Anthropic as the provider.</li>
          <li>Paste your Anthropic API key into the key field.</li>
          <li>Click <Ui>Save</Ui>.</li>
        </Steps>
        <p>
          Do not click <Ui>Apply</Ui> if you want to keep your current provider for Native chat.{" "}
          <Ui>Apply</Ui> changes Native chat to Anthropic. The <Ui>Save and use Anthropic</Ui> button on
          the <Ui>Connect AI</Ui> card also changes Native chat to Anthropic.
        </p>
        <p>
          Without an Anthropic key, an automation with a condition does not run, and its details show
          the reason. See <Link href="/docs/automations/#conditions">Add a condition</Link>.
        </p>
      </DocSection>
    </DocPage>
  );
}
