import Link from "next/link";
import { facts } from "@/content/facts";
import { DocPage, DocSection, DocTable, Ui, docMetadata } from "../article";

// Sources in vivary-dev/vivary at tag v0.1.0-beta.1: the troubleshooting table in
// docs/desktop-preview.md, packages/desktop/installer/vivary.nsi, and the workbench UI
// source named in each article. A row stays only when the tag supports it.

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
          caption="Installer problems"
          head={["Problem", "Action"]}
          rows={[
            ["The checksum does not match", "Do not run the file. Delete it and its .sha256 file. Then download both files again."],
            [<Ui key="w">Windows protected your PC</Ui>, <>The setup program is not code signed. Make sure that the checksum matches. Then click <Ui key="m">More info</Ui> and <Ui key="r">Run anyway</Ui>.</>],
            ["Setup or the uninstaller says that Vivary is running", <>Close all Vivary windows, and wait a few seconds. Then click <Ui key="r">Retry</Ui>. Setup does not close Vivary for you. <Ui key="c">Cancel</Ui> stops before setup removes a file.</>],
            ["Setup or the uninstaller says that some Vivary files are in use", "A different program, such as a terminal open in a Vivary folder, holds a file. Close that program. Then run setup or the uninstaller again. It continues from where it stopped."],
            ["A first install stopped before it was complete, for example on a full disk", "Run setup again. Setup recognizes the folder that it started, and completes the install."],
            ["An upgrade stopped before it was complete", "Run setup again to complete the upgrade."],
            ["Setup or the uninstaller says that install-files.txt is damaged", <>If the folder contains <code key="m">vivary-setup.txt</code>, run setup again, and it writes a new file list. If not, close Vivary. Move {programFolder} to a backup location, such as your desktop. Then run setup. Your data is in a different location. After setup, copy back the files that you added to the program folder.</>],
            ["The uninstaller says that it could not remove itself", <>A program, often a virus scanner, holds <code key="u">Uninstall Vivary.exe</code>. Wait for the scan to finish, or close that program. Then run the uninstaller again.</>],
            ["Setup says that the folder does not contain Vivary", <>{programFolder} contains other files. Setup changed nothing. Move those files to a different location. Then run setup again.</>],
            ["Setup says that a file is not a Vivary file", <>One of your files has the name and location of a Vivary file. Setup did not change your file. Move that file out of {programFolder}, and run setup again.</>],
            ["Setup says that the Vivary folder path is too long", "The path of your profile folder is too long for some Vivary files. Setup changed nothing. Use the portable ZIP in a folder with a short path, such as C:\\Vivary."],
            ["Setup or the uninstaller says that it is already running", "A different setup or uninstaller is open for your account. Complete or close it. Then try again."],
            ["Setup says that Vivary needs 64-bit Windows", "Vivary runs only on 64-bit Windows. Setup installed nothing."],
          ]}
        />
        <p>For the usual steps, see <Link href="/docs/install-windows/">Install, upgrade and uninstall Vivary on Windows</Link>.</p>
      </DocSection>

      <DocSection id="launch" title="Start Vivary">
        <DocTable
          caption="Launch problems"
          head={["Problem", "Action"]}
          rows={[
            ["No window opens when you start Vivary from a terminal", <>Start Vivary from the Start menu or File Explorer. A terminal that sets <code key="e">ELECTRON_RUN_AS_NODE=1</code> stops the app window from opening. Remove that variable only from that terminal.</>],
            ["Windows asks which app to use to open a file", <>Click <Ui key="c">Cancel</Ui>. Start Vivary from the Start menu, or run <code key="v">vivary.exe</code> in the portable folder. Do not change file associations.</>],
          ]}
        />
      </DocSection>

      <DocSection id="runtimes" title="Coding runtimes and keys">
        <DocTable
          caption="Runtime problems"
          head={["Problem", "Action"]}
          rows={[
            [<>Claude Code or Codex shows <Ui key="n">Not installed</Ui> or <Ui key="s">Sign-in required</Ui></>, <>Install the program, and sign in from a terminal. Then click <Ui key="r">Refresh</Ui> in <Ui key="c">Coding runtimes</Ui>. If the status stays <Ui key="n2">Not installed</Ui>, close all Vivary windows, and open Vivary again. See <Link key="l" href="/docs/runtime-setup/#coding-runtimes">Connect Claude Code or Codex</Link>.</>],
            [<>Claude Code or Codex shows <Ui key="u">Update required</Ui></>, <>Vivary needs Claude Code 2.1.286 or later, or Codex 0.160.0 or later. Update the program. Then click <Ui key="r">Refresh</Ui>.</>],
            ["Vivary uses a different copy of Codex than your terminal", <>Vivary uses the first copy on <code key="p">PATH</code> that has a launcher, such as <code key="x">codex.exe</code> or <code key="m">codex.cmd</code>. Remove the other copy, or change the order of <code key="p2">PATH</code>. Then close all Vivary windows, and open Vivary again. Vivary reads <code key="p3">PATH</code> when it starts.</>],
            [<>A Native chat shows <Ui key="c">Connect AI</Ui></>, <>Add a provider key. See <Link key="l" href="/docs/runtime-setup/#provider-key">Add a provider key for Native chat</Link>.</>],
            [<>Text shows <code key="a">[redacted NAME]</code> or <code key="b">[redacted credential]</code></>, "Vivary replaced a key before a model, the screen or storage received it. The original stays where it is. Keep keys in settings or in the project configuration, not in messages."],
          ]}
        />
      </DocSection>

      <DocSection id="projects" title="Projects and files">
        <DocTable
          caption="Project problems"
          head={["Problem", "Action"]}
          rows={[
            [<Ui key="t">Folder selection timed out</Ui>, <>Close the folder window. Then click <Ui key="o">Open folder</Ui> again.</>],
            [<Ui key="a">A project folder chooser is already open</Ui>, "Find the open folder window. Complete it or cancel it. Then try again."],
            [<>A project shows <Ui key="u">Unavailable</Ui></>, <>Put its folder back in its original location. Then use <Ui key="r">Review connection</Ui>. See <Link key="l" href="/docs/projects/#review-connection">Reconnect a project</Link>.</>],
            [<>The setup plan lists <Ui key="c">Conflicts</Ui></>, "Resolve each conflict in the folder. Then preview the setup again. You cannot apply the setup while conflicts remain."],
            ["A file draft is larger than the limit", "Vivary saves text files up to 256 KB. Make the file shorter, or edit it in a different editor."],
          ]}
        />
      </DocSection>

      <DocSection id="conversations" title="Conversations and handoffs">
        <DocTable
          caption="Conversation problems"
          head={["Problem", "Action"]}
          rows={[
            [<Ui key="b">An agent is working in another conversation.</Ui>, <>One coding conversation runs at a time. Click <Ui key="o">Open conversation</Ui> to go to it. Then answer its request, let it finish, or stop it.</>],
            [<Ui key="v">Vivary is checking whether coding processes stopped</Ui>, <>Wait. If Vivary lists processes that continue to run, click <Ui key="e">End them</Ui> or <Ui key="c">Continue anyway</Ui> before you send another message.</>],
            [<>The bar at the top shows <Ui key="i">Interrupted</Ui></>, <>Vivary closed during the run. Click <Ui key="o">Open conversation</Ui>, read the last messages, and send a new message to continue.</>],
            ["A provider error shows in a Native chat", <>Read the message and the code from the provider. Then click <Ui key="r">Retry</Ui>.</>],
            ["Vivary does not save a handoff", <>See <Link key="l" href="/docs/handoffs/#problems">If Vivary does not save the handoff</Link>.</>],
          ]}
        />
      </DocSection>

      <DocSection id="remote-access" title="Remote access">
        <DocTable
          caption="Remote access problems"
          head={["Problem", "Action"]}
          rows={[
            [<Ui key="l">Remote access listener unavailable</Ui>, <>Vivary could not use the saved loopback port. The desktop app continues to work. In <Ui key="s">Settings</Ui> &gt; <Ui key="ag">Agent</Ui> &gt; <Ui key="r">Remote access</Ui>, enter a different <Ui key="p">Loopback ingress port</Ui>. Click <Ui key="e">Enable remote access</Ui>, and confirm. Then send your HTTPS connection to the new port.</>],
            [<>The other device shows <Ui key="w">Still waiting for approval on the desktop</Ui></>, <>On this computer, go to <Ui key="s">Settings</Ui> &gt; <Ui key="ag">Agent</Ui> &gt; <Ui key="r">Remote access</Ui>. Click <Ui key="c">Compare and approve</Ui> for the request. Requests expire after five minutes.</>],
            ["A remote browser cannot open a folder", <>Use <Ui key="o">Open folder</Ui> in the desktop app on this computer.</>],
          ]}
        />
      </DocSection>

      <DocSection id="automations" title="Automations">
        <DocTable
          caption="Automation problems"
          head={["Problem", "Action"]}
          rows={[
            ["An automation did not run", "Automations run only while Vivary is open. Make sure that the automation is not paused. Then open its Details."],
            ["A failed run did not run again", <>Vivary does not retry runs. Correct the cause. Then wait for the next scheduled run, or click <Ui key="r">Run now</Ui>.</>],
            ["An automation waits after Vivary was ended during its run", "If you ended Vivary without quitting, for example from Task Manager, that automation waits up to ten minutes. Your other automations run on schedule."],
            ["A webhook or event automation with a condition never runs", <>Conditions need an Anthropic API key. Click <Ui key="m">Manage</Ui> &gt; <Ui key="d">Details</Ui> to read the reason. Add an Anthropic key, or remove the condition.</>],
            ["A webhook call cannot connect", <>Vivary must be open, and the caller must run on this computer. Compare the port in the URL of the caller with the <Ui key="w">Webhook URL</Ui> in <Ui key="d">Details</Ui>.</>],
            [<>A run shows <Ui key="w">Waiting for approval</Ui></>, <>Click <Ui key="i">Inspect run</Ui>. Then click <Ui key="a">Approve once</Ui> or <Ui key="dc">Decline</Ui>. See <Link key="l" href="/docs/automations/#approvals">Approve a protected action</Link>.</>],
          ]}
        />
      </DocSection>

      <DocSection id="report" title="Report a problem">
        <p>
          Open an issue in the <a href={`${facts.links.product}/issues`}>Vivary repository on GitHub</a>.
          Include this information:
        </p>
        <ul>
          <li>The release that you installed, for example 0.1.0-beta.1.</li>
          <li>Your Windows version.</li>
          <li>The steps that cause the problem.</li>
          <li>Screenshots or error text, with private information removed.</li>
        </ul>
        <p>
          Do not include credentials, profile databases, backups or private conversation transcripts.
        </p>
      </DocSection>
    </DocPage>
  );
}
