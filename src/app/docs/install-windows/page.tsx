import Link from "next/link";
import { facts } from "@/content/facts";
import { Code, DocPage, DocSection, DocTable, Note, Steps, Ui, docMetadata } from "../article";

// Sources: the release INSTALL-WINDOWS.md and RELEASE-NOTES.md for the
// installer build, and docs/desktop-preview.md in vivary-dev/vivary at 96d3a8c.
// The release tag is not written here. facts.links.preview owns it.

const slug = "install-windows";
export const metadata = docMetadata(slug);

const sections = [
  { id: "requirements", label: "Requirements" },
  { id: "download", label: "Download and verify" },
  { id: "install", label: "Install" },
  { id: "portable-zip", label: "Portable ZIP" },
  { id: "data", label: "Where your data lives" },
  { id: "upgrade", label: "Upgrade" },
  { id: "uninstall", label: "Uninstall" },
];

const verify = String.raw`$file = '.\Vivary-Setup-<commit>.exe'
$expected = (Get-Content "$file.sha256").Split(' ')[0].Trim()
$actual = (Get-FileHash $file -Algorithm SHA256).Hash
if ($actual -ne $expected) { throw 'Vivary download checksum mismatch' }`;

export default function InstallWindows() {
  return (
    <DocPage slug={slug} sections={sections}>
      <DocSection id="requirements" title="Requirements">
        <ul>
          <li>64-bit Windows (x64). Setup refuses 32-bit Windows. macOS and Linux are not supported.</li>
          <li>No administrator rights. Setup installs Vivary for your Windows account only.</li>
          <li>No Vivary account. Vivary opens locally.</li>
          <li>
            No global Node, Python or source checkout. The app includes what it needs. To work with
            an agent, install and sign in to Claude Code or Codex separately, or add a provider key.
            See <Link href="/docs/runtime-setup/">Set up coding runtimes and provider keys</Link>.
          </li>
        </ul>
        <p>
          Vivary is unsigned development software. Windows can warn that the publisher is unknown.
          Verify each download before you run it.
        </p>
      </DocSection>

      <DocSection id="download" title="Download and verify">
        <p>Each release has two downloads that hold the same application:</p>
        <DocTable
          caption="Release downloads"
          head={["File", "What it is"]}
          rows={[
            [<code key="exe">Vivary-Setup-&lt;commit&gt;.exe</code>, "The Windows installer. Use it unless you need a portable copy."],
            [<code key="zip">Vivary-windows-x64-&lt;commit&gt;.zip</code>, "An optional portable ZIP. It has no setup program and no uninstaller."],
          ]}
        />
        <p>
          In each file name, <code>&lt;commit&gt;</code> is the short source ID of that build. The
          automatic <Ui>Source code</Ui> archives hold source only. They do not contain an app you
          can run.
        </p>
        <Steps>
          <li>Open the <a href={facts.links.preview}>Vivary release page on GitHub</a>.</li>
          <li>Under <Ui>Assets</Ui>, download the file you want and its <code>.sha256</code> companion into the same folder.</li>
          <li>Open PowerShell in that folder.</li>
          <li>
            Run the commands below. Replace the file name in the first line with the name of the file
            you downloaded.
            <Code>{verify}</Code>
          </li>
          <li>If PowerShell reports a checksum mismatch, do not run the file. Delete both files and download them again.</li>
        </Steps>
        <p>
          The release also includes <a href={facts.links.installGuide}>installation notes</a> with the
          exact file names, sizes and checksums for that build.
        </p>
      </DocSection>

      <DocSection id="install" title="Install with the setup program">
        <Steps>
          <li>Close Vivary if it is running.</li>
          <li>
            Run <code>Vivary-Setup-&lt;commit&gt;.exe</code>. If Windows shows <Ui>Windows protected your PC</Ui>,
            choose <Ui>More info</Ui>, then <Ui>Run anyway</Ui>. Do this only after the checksum matches.
          </li>
          <li>Accept the license and wait for the files to copy.</li>
          <li>
            On the last page, <Ui>Launch Vivary</Ui> is selected. Select <Ui>Create a desktop shortcut</Ui> if
            you want one, then choose <Ui>Finish</Ui>.
          </li>
          <li>To open Vivary later, choose <Ui>Vivary</Ui> in the Start menu.</li>
        </Steps>
        <p>
          Setup always installs to <code>%LOCALAPPDATA%\Programs\Vivary</code>. You cannot choose
          another folder. Setup also adds a Start menu entry and an entry in Installed apps.
        </p>
        <p>
          To install without any window, run <code>Vivary-Setup-&lt;commit&gt;.exe /S</code>. A silent
          install does not start Vivary and does not create a desktop shortcut.
        </p>
        <p>
          Next, set up an agent. See <Link href="/docs/runtime-setup/">Set up coding runtimes and provider keys</Link>,
          then <Link href="/docs/projects/">Open and set up projects</Link>.
        </p>
      </DocSection>

      <DocSection id="portable-zip" title="Use the portable ZIP instead">
        <p>
          The ZIP is not an installer. Extracting it is the whole installation. It adds no Start menu
          entry, no Installed apps entry and no uninstaller.
        </p>
        <Steps>
          <li>
            Extract the whole ZIP into a new folder on a short path, such as <code>C:\Vivary</code>.
            Windows Explorer can reject a deeply nested destination.
          </li>
          <li>Keep the <code>Vivary-win32-x64</code> folder together, including its <code>resources</code> folder.</li>
          <li>In File Explorer, run <code>Vivary-win32-x64\vivary.exe</code>.</li>
        </Steps>
      </DocSection>

      <DocSection id="data" title="Where your data lives">
        <p>
          Vivary keeps your data outside the program folder. Setup, upgrades and the uninstaller never
          read, change or remove these locations.
        </p>
        <DocTable
          caption="Data locations"
          head={["Location", "What it holds"]}
          rows={[
            [<code key="profile">%USERPROFILE%\.vivary\workbench</code>, "The database, conversation and run history, settings, and projects you create in Vivary."],
            [<code key="appdata">%APPDATA%\Vivary</code>, "Window state."],
            ["Your project folders", <>Folders you add with <Ui>Open folder</Ui> stay where they are.</>],
          ]}
        />
        <p>Claude Code and Codex keep their own sign-in and session data in their own locations.</p>
      </DocSection>

      <DocSection id="upgrade" title="Upgrade to a newer version">
        <p>Vivary does not update itself. To upgrade, install a newer download.</p>
        <Steps>
          <li>Finish or stop active work, including automation runs. Then close Vivary.</li>
          <li>
            While Vivary is closed, copy <code>%USERPROFILE%\.vivary\workbench</code> and{" "}
            <code>%APPDATA%\Vivary</code> to a private backup location. Back up your project folders separately.
          </li>
          <li>Download and verify the new file. See <a href="#download">Download and verify</a>.</li>
          <li>
            With the installer, run the new setup program. It removes the files the previous setup
            installed, then copies the new ones. Files you added to the program folder stay. If Vivary
            is still running, setup asks you to close it and offers <Ui>Retry</Ui> or <Ui>Cancel</Ui>.
          </li>
          <li>With the ZIP, extract the new version into a separate folder. Keep the previous folder until you are happy with the new version.</li>
          <li>Open Vivary and check that your projects and conversations are there.</li>
        </Steps>
        <Note>
          Backups can contain conversation history, settings and credentials. Do not share them, attach
          them to an issue, or upload them anywhere.
        </Note>
        <p>
          If you used an earlier portable ZIP, the installed version uses the same data. Setup does not
          touch the folder you extracted the ZIP into. Delete that folder yourself when you no longer
          need it.
        </p>
        <p>
          An older version does not undo changes a newer version made to your data. Keep the backup
          you made before the upgrade. To go back, keep a copy of your current data, then restore that
          backup. Restoring a backup can lose work you did after it.
        </p>
      </DocSection>

      <DocSection id="uninstall" title="Uninstall Vivary">
        <Steps>
          <li>Close Vivary.</li>
          <li>Open <Ui>Settings</Ui> &gt; <Ui>Apps</Ui> &gt; <Ui>Installed apps</Ui>. On Windows 10, open <Ui>Apps &amp; features</Ui>.</li>
          <li>Find <Ui>Vivary</Ui> and choose <Ui>Uninstall</Ui>.</li>
        </Steps>
        <p>
          The uninstaller removes only the files setup installed, the Start menu shortcut, the desktop
          shortcut if setup created it, and the Installed apps entry. It deletes nothing else. Files
          you added to <code>%LOCALAPPDATA%\Programs\Vivary</code> stay.
        </p>
        <p>
          Your data and project folders stay, so your projects, conversations and settings remain.
          To remove your data as well, delete <code>%USERPROFILE%\.vivary</code> and{" "}
          <code>%APPDATA%\Vivary</code> yourself after you uninstall.
        </p>
        <p>To remove the portable ZIP, close Vivary and delete the folder you extracted.</p>
        <p>
          If setup or the uninstaller stops with a message, see{" "}
          <Link href="/docs/troubleshooting/#installer">Troubleshooting</Link>.
        </p>
      </DocSection>
    </DocPage>
  );
}
