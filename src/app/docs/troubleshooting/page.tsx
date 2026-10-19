import Link from "next/link";
import { facts } from "@/content/facts";
import { DocPage, DocSection, DocTable, Ui, docMetadata } from "../article";

// Sources: the release INSTALL-WINDOWS.md troubleshooting table, docs/desktop-preview.md
// and the workbench UI text in vivary-dev/vivary at 96d3a8c. Each row was kept only
// when the code or a release document supports it.

const slug = "troubleshooting";
export const metadata = docMetadata(slug);

const sections = [
  { id: "installer", label: "Installer" },
  { id: "launch", label: "Launch" },
  { id: "runtimes", label: "Runtimes" },
  { id: "projects", label: "Projects" },
  { id: "conversations", label: "Conversations" },
  { id: "remote-access", label: "Remote access" },
  { id: "automations", label: "Automations" },
  { id: "report", label: "Report a problem" },
];

const programFolder = <code key="pf">%LOCALAPPDATA%\Programs\Vivary</code>;

export default function Troubleshooting() {
  return (
    <DocPage slug={slug} sections={sections}>
      <DocSection id="installer" title="Download, setup and uninstall">
        <DocTable
          caption="Installer symptoms"
          head={["Symptom", "Action"]}
          rows={[
            ["The checksum does not match", "Do not run the file. Delete it and its .sha256 file, then download both again."],
            [<Ui key="w">Windows protected your PC</Ui>, <>The installer is not code signed. Check that the checksum matches, then choose <Ui key="m">More info</Ui> and <Ui key="r">Run anyway</Ui>.</>],
            ["Setup or the uninstaller says Vivary is running", <>Close every Vivary window, wait a few seconds, then choose <Ui key="r">Retry</Ui>. Setup never closes Vivary for you. <Ui key="c">Cancel</Ui> stops before any file is removed.</>],
            ["Setup or the uninstaller says some Vivary files are in use", "Another program, such as a terminal open in a Vivary folder, holds a file. Close it, then run setup or the uninstaller again. It continues from where it stopped."],
            ["A first install stopped partway, for example on a full disk", "Run setup again. It recognizes the folder it started and finishes the install."],
            ["An upgrade stopped partway", "Run setup again before anything else. Do not run the uninstaller first. Setup continues from where it stopped."],
            ["Setup or the uninstaller says install-files.txt is damaged", <>If setup created the folder, run setup again and it repairs the list. Otherwise close Vivary, delete {programFolder} yourself, and run setup. Your data is stored elsewhere.</>],
            ["Setup says the folder does not contain Vivary", <>{programFolder} holds other files. Setup changed nothing. Move those files elsewhere, then run setup again.</>],
            ["Setup says a file is not a Vivary file", <>A file of yours is where a Vivary file goes. Setup stopped and left it untouched. Move that file out of {programFolder}, then run setup again. If setup says the previous Vivary files were already removed, Vivary does not start until setup finishes.</>],
            ["Setup or the uninstaller says it is already running", "Another setup or uninstaller is open for your account. Finish or close it, then try again."],
            ["Setup says Vivary needs 64-bit Windows", "Vivary runs only on 64-bit Windows. Setup installed nothing."],
          ]}
        />
        <p>For the normal steps, see <Link href="/docs/install-windows/">Install, upgrade and uninstall Vivary on Windows</Link>.</p>
      </DocSection>

      <DocSection id="launch" title="Starting Vivary">
        <DocTable
          caption="Launch symptoms"
          head={["Symptom", "Action"]}
          rows={[
            ["No window appears after you start Vivary from a terminal", <>Start Vivary from the Start menu or File Explorer instead. A terminal that sets <code key="e">ELECTRON_RUN_AS_NODE=1</code> makes the app start without a window.</>],
            ["Windows asks which app should open a file", <>Choose <Ui key="c">Cancel</Ui>. Start Vivary from the Start menu, or run <code key="v">vivary.exe</code> in the portable folder. Do not change file associations.</>],
          ]}
        />
      </DocSection>

      <DocSection id="runtimes" title="Coding runtimes and keys">
        <DocTable
          caption="Runtime symptoms"
          head={["Symptom", "Action"]}
          rows={[
            [<>Claude Code or Codex shows <Ui key="n">Not installed</Ui> or <Ui key="s">Sign-in required</Ui></>, <>Install the tool and sign in from a terminal, then choose <Ui key="r">Refresh</Ui> in <Ui key="c">Coding runtimes</Ui>. See <Link key="l" href="/docs/runtime-setup/#coding-runtimes">Connect Claude Code or Codex</Link>.</>],
            ["Vivary finds a different copy of Codex than your terminal", <>Vivary uses the first copy on <code key="p">PATH</code> that has a launcher such as <code key="x">codex.exe</code> or <code key="m">codex.cmd</code>. Remove or reorder the other copy on <code key="p2">PATH</code>, then choose <Ui key="r">Refresh</Ui>.</>],
            [<>A Native chat shows <Ui key="c">Connect AI</Ui></>, <>Add a provider key. See <Link key="l" href="/docs/runtime-setup/#provider-key">Add a provider key for Native chat</Link>.</>],
            [<>Text shows <code key="a">[redacted NAME]</code> or <code key="b">[redacted credential]</code></>, "Vivary replaced a credential before a model, the screen or storage received it. The original stays where it is kept. Keep keys in settings or project configuration, not in messages."],
          ]}
        />
      </DocSection>

      <DocSection id="projects" title="Projects and files">
        <DocTable
          caption="Project symptoms"
          head={["Symptom", "Action"]}
          rows={[
            [<Ui key="t">Folder selection timed out</Ui>, <>Close the folder window, then choose <Ui key="o">Open folder</Ui> again.</>],
            [<Ui key="a">A project folder chooser is already open</Ui>, "Find the open folder window, finish or cancel it, then try again."],
            [<>A project shows <Ui key="u">Unavailable</Ui></>, <>Put its folder back at its original location, then use <Ui key="r">Review connection</Ui>. See <Link key="l" href="/docs/projects/#review-connection">Reconnect a project</Link>.</>],
            ["Setup preview lists Conflicts", "Resolve each conflict in the folder, then preview the setup again. Setup cannot be applied while conflicts remain."],
            ["A file draft is over the size limit", "Vivary saves text files up to 256 KB. Shorten the file or edit it in another editor."],
          ]}
        />
      </DocSection>

      <DocSection id="conversations" title="Conversations and handoffs">
        <DocTable
          caption="Conversation symptoms"
          head={["Symptom", "Action"]}
          rows={[
            ["A new Code request is refused because another request is active or waiting for approval", <>Only one Code run works at a time. Choose <Ui key="o">Open conversation</Ui> to go to it, then answer its approval, let it finish, or stop it.</>],
            [<Ui key="v">Vivary is checking whether coding processes stopped</Ui>, <>Wait. If Vivary lists processes that are still running, choose <Ui key="e">End them</Ui> or <Ui key="c">Continue anyway</Ui> before you send another message.</>],
            ["A provider error appears in a Native chat", <>Read the provider&apos;s message and code, then choose <Ui key="r">Retry</Ui>.</>],
            ["A handoff is not saved", <>See <Link key="l" href="/docs/handoffs/#problems">If the handoff is not saved</Link>.</>],
          ]}
        />
      </DocSection>

      <DocSection id="remote-access" title="Remote access">
        <DocTable
          caption="Remote access symptoms"
          head={["Symptom", "Action"]}
          rows={[
            [<Ui key="l">Remote access listener unavailable</Ui>, "Vivary could not use the loopback port. The desktop app keeps working. Close the program that uses that port, or choose another port and point your HTTPS connection at it."],
            ["The other device shows Still waiting for approval on the desktop", <>On this computer, open <Ui key="s">Settings</Ui> &gt; <Ui key="r">Remote access</Ui> and choose <Ui key="c">Compare and approve</Ui> for the request. Requests expire after five minutes.</>],
            ["A remote browser cannot open a folder", <>Use <Ui key="o">Open folder</Ui> in the desktop app on this computer.</>],
          ]}
        />
      </DocSection>

      <DocSection id="automations" title="Automations">
        <DocTable
          caption="Automation symptoms"
          head={["Symptom", "Action"]}
          rows={[
            ["An automation did not run", "Automations run only while Vivary is open. Check that the automation is not paused, then open its Details."],
            ["A webhook or event automation with a condition never runs", <>Conditions need an Anthropic API key. Open <Ui key="m">Manage</Ui> &gt; <Ui key="d">Details</Ui> to read the reason. Add an Anthropic key, or remove the condition.</>],
            ["A webhook call cannot connect", <>Vivary must be open, and the caller must run on this computer. Compare the port in the caller&apos;s URL with the <Ui key="w">Webhook URL</Ui> in <Ui key="d">Details</Ui>.</>],
            [<>A run shows <code key="w">waiting_approval</code></>, <>Open <Ui key="i">Inspect run</Ui> and choose <Ui key="a">Approve once</Ui> or <Ui key="dc">Decline</Ui>. See <Link key="l" href="/docs/automations/#approvals">Approve a protected action</Link>.</>],
          ]}
        />
      </DocSection>

      <DocSection id="report" title="Report a problem">
        <p>
          Open an issue in the <a href={`${facts.links.product}/issues`}>Vivary repository on GitHub</a>.
          Include the release you installed, your Windows version, the steps that cause the problem,
          and screenshots or error text with private details removed.
        </p>
        <p>
          Never include credentials, profile databases, backups or private conversation transcripts.
        </p>
      </DocSection>
    </DocPage>
  );
}
