import Link from "next/link";
import { facts } from "@/content/facts";
import { Code, DocPage, DocSection, DocTable, Note, Steps, Ui, docMetadata } from "../article";

// Sources in vivary-dev/vivary at tag v0.1.0-beta.1: docs/desktop-preview.md,
// packages/desktop/installer/vivary.nsi, packages/desktop/main.mjs and the
// release assets. facts.links.preview owns the release link.

const slug = "install-windows";
export const metadata = docMetadata(slug);

const sections = [
  { id: "requirements", label: "Before you begin" },
  { id: "download", label: "Download and verify" },
  { id: "install", label: "Install" },
  { id: "portable-zip", label: "Portable ZIP" },
  { id: "first-launch", label: "First launch" },
  { id: "data", label: "Where your data is" },
  { id: "upgrade", label: "Upgrade" },
  { id: "uninstall", label: "Uninstall" },
];

const setupFile = "Vivary-Setup-0.1.0-beta.1.exe";
const zipFile = "Vivary-0.1.0-beta.1-windows-x64.zip";

const verify = String.raw`$file = '.\Vivary-Setup-0.1.0-beta.1.exe'
$expected = (Get-Content "$file.sha256").Split(' ')[0].Trim()
if ((Get-FileHash $file -Algorithm SHA256).Hash -ne $expected) { throw 'Checksum mismatch. Do not run this file.' }`;

const silentUninstall = String.raw`& "$env:LOCALAPPDATA\Programs\Vivary\Uninstall Vivary.exe" /S`;

export default function InstallWindows() {
  return (
    <DocPage slug={slug} sections={sections}>
      <DocSection id="requirements" title="Before you begin">
        <ul>
          <li>Use Windows 10 or Windows 11 on a 64-bit (x64) computer. This release is for Windows only.</li>
          <li>You do not need administrator rights. Setup installs Vivary for your Windows account only.</li>
          <li>You do not need a Vivary account.</li>
          <li>You do not need Node.js or Python. Vivary includes its own copies.</li>
          <li>
            To work with a coding agent, install Claude Code 2.1.286 or later, or Codex 0.160.0 or later.
            You install and sign in to these programs separately. See{" "}
            <Link href="/docs/runtime-setup/">Set up coding runtimes and provider keys</Link>.
          </li>
        </ul>
        <p>
          Vivary 0.1.0-beta.1 is a beta release. It is not code signed, so Windows can show a warning
          before it runs. Verify each download before you run it.
        </p>
      </DocSection>

      <DocSection id="download" title="Download and verify">
        <p>The release has two downloads. Both contain the same app.</p>
        <DocTable
          caption="Release downloads"
          head={["File", "What it is"]}
          rows={[
            [<code key="exe">{setupFile}</code>, "The setup program. Use this file unless you need a portable copy."],
            [<code key="zip">{zipFile}</code>, "The portable ZIP. It has no setup program and no uninstaller."],
          ]}
        />
        <p>
          Each download has a checksum file with the same name and the extension <code>.sha256</code>.
          GitHub also lists Source code archives. They contain only source code, not an app that you can run.
        </p>
        <Steps>
          <li>Open the <a href={facts.links.preview}>Vivary 0.1.0-beta.1 release page</a> on GitHub.</li>
          <li>In the list of assets, download <code>{setupFile}</code>.</li>
          <li>Download <code>{setupFile}.sha256</code> into the same folder.</li>
          <li>Open PowerShell in that folder.</li>
          <li>
            Run these commands:
            <Code>{verify}</Code>
          </li>
        </Steps>
        <p>
          If the commands show no output, the checksum matches. If PowerShell shows{" "}
          <code>Checksum mismatch. Do not run this file.</code>, do not run the file. Delete both files
          and download them again.
        </p>
        <p>
          To verify the portable ZIP, use the same commands. In the first line, replace the setup file
          name with <code>{zipFile}</code>.
        </p>
        <p>
          The release also has <code>SHA256SUMS</code>, which lists the checksum of each asset, and{" "}
          <code>BUILD-INFO.json</code>, which names the source of the build.
        </p>
      </DocSection>

      <DocSection id="install" title="Install with the setup program">
        <Steps>
          <li>Close Vivary if it is open.</li>
          <li>Double-click <code>{setupFile}</code>.</li>
          <li>If Windows shows <Ui>Windows protected your PC</Ui>, click <Ui>More info</Ui>.</li>
          <li>Click <Ui>Run anyway</Ui>. Do this only after the checksum matches.</li>
          <li>Accept the license.</li>
          <li>Wait until setup copies the files and shows its last page.</li>
          <li>Optional: select <Ui>Create a desktop shortcut</Ui>.</li>
          <li>Click <Ui>Finish</Ui>.</li>
        </Steps>
        <p>
          <strong>Result:</strong> Vivary starts, because <Ui>Launch Vivary</Ui> is selected by default.
          Setup installs Vivary in <code>%LOCALAPPDATA%\Programs\Vivary</code>. You cannot choose a
          different folder. Setup adds <Ui>Vivary</Ui> to the Start menu and to the list of installed
          apps.
        </p>
        <p>
          To install without any windows, run <code>{setupFile} /S</code>. A silent install does not
          start Vivary and does not create a desktop shortcut.
        </p>
      </DocSection>

      <DocSection id="portable-zip" title="Use the portable ZIP instead">
        <p>
          The portable ZIP is a copy of Vivary that you extract and run. To extract it is the full
          installation. It adds no Start menu entry, no installed app entry and no uninstaller.
        </p>
        <Steps>
          <li>Verify the ZIP. See <a href="#download">Download and verify</a>.</li>
          <li>Create a new folder with a short path, for example <code>C:\Vivary</code>.</li>
          <li>Extract all files from the ZIP into that folder.</li>
          <li>Open the <code>Vivary-win32-x64</code> folder.</li>
          <li>Double-click <code>vivary.exe</code>.</li>
        </Steps>
        <p>
          Keep all extracted files together. Do not move <code>vivary.exe</code> out of the{" "}
          <code>Vivary-win32-x64</code> folder. A short path is necessary because Windows Explorer can
          refuse to extract into a folder with a long path.
        </p>
      </DocSection>

      <DocSection id="first-launch" title="Start Vivary for the first time">
        <Steps>
          <li>In the Start menu, select <Ui>Vivary</Ui>.</li>
          <li>If Vivary shows <Ui>Set up Claude Code</Ui>, click <Ui>Open runtime settings</Ui>.</li>
          <li>
            Set up Claude Code or Codex. See{" "}
            <Link href="/docs/runtime-setup/#coding-runtimes">Connect Claude Code or Codex</Link>.
          </li>
          <li>
            In the sidebar, under <Ui>Projects</Ui>, click <Ui>Open folder</Ui> or <Ui>New project</Ui>.
            See <Link href="/docs/projects/">Open and set up projects</Link>.
          </li>
        </Steps>
        <p>
          Vivary does not ask you to sign in. Only one copy of Vivary runs at a time. If you start
          Vivary again, the open window comes to the front.
        </p>
      </DocSection>

      <DocSection id="data" title="Where your data is">
        <p>
          Vivary keeps your data outside the program folder. Setup, upgrades and the uninstaller do not
          read, change or remove these locations.
        </p>
        <DocTable
          caption="Data locations"
          head={["Location", "What it contains"]}
          rows={[
            [<code key="profile">%USERPROFILE%\.vivary\workbench</code>, "The Vivary database, conversation and run history, settings, and the projects that you create in Vivary."],
            [<code key="appdata">%APPDATA%\Vivary</code>, "Window and browser state."],
            ["Your project folders", <>Folders that you add with <Ui key="o">Open folder</Ui> stay where they are.</>],
          ]}
        />
        <p>Claude Code and Codex keep their sign-in and session data in their own locations.</p>
      </DocSection>

      <DocSection id="upgrade" title="Upgrade to a newer version">
        <p>
          Vivary does not update itself. To upgrade, install a newer release over the current one. An
          upgrade over an installed copy is not tested for this beta yet, so make a backup first.
        </p>
        <Steps>
          <li>Finish or stop active work, including automation runs.</li>
          <li>Close Vivary.</li>
          <li>Copy <code>%USERPROFILE%\.vivary\workbench</code> to a private backup location.</li>
          <li>Copy <code>%APPDATA%\Vivary</code> to the same backup location.</li>
          <li>Back up your project folders separately.</li>
          <li>Download and verify the new setup program. See <a href="#download">Download and verify</a>.</li>
          <li>Run the new setup program.</li>
          <li>Start Vivary. Make sure that your projects and conversations are there.</li>
        </Steps>
        <p>
          Setup removes the files that the previous setup installed. Then it copies the new files. Your
          data and the files that you added to the program folder stay. If Vivary is open, setup tells
          you to close it. Then click <Ui>Retry</Ui>, or click <Ui>Cancel</Ui> to stop.
        </p>
        <p>
          For the portable ZIP, extract the new release into a new folder. Keep the old folder until
          the new release works.
        </p>
        <p>
          If you used an earlier portable ZIP of Vivary, close it before you run setup. The installed
          app uses the same data. Setup does not change the folder of the ZIP. Delete that folder when
          you no longer need it.
        </p>
        <Note>
          A backup can contain conversation history, settings and credentials. Do not share it, attach
          it to an issue or upload it.
        </Note>
        <p>
          An older version of Vivary may not read data that a newer version changed. To go back to an
          older version, first copy your current data to a safe location. Then restore the backup that
          you made before the upgrade. You lose the work that you did after that backup.
        </p>
      </DocSection>

      <DocSection id="uninstall" title="Uninstall Vivary">
        <Steps>
          <li>Close Vivary.</li>
          <li>Open Windows <Ui>Settings</Ui>.</li>
          <li>Go to <Ui>Apps</Ui> &gt; <Ui>Installed apps</Ui>. On Windows 10, go to <Ui>Apps</Ui> &gt; <Ui>Apps &amp; features</Ui>.</li>
          <li>Find <Ui>Vivary</Ui> in the list.</li>
          <li>Select <Ui>Uninstall</Ui>.</li>
          <li>Confirm the uninstall.</li>
        </Steps>
        <p>
          You can also run <code>Uninstall Vivary.exe</code> in <code>%LOCALAPPDATA%\Programs\Vivary</code>.
          To uninstall without any windows, run this command in PowerShell:
        </p>
        <Code>{silentUninstall}</Code>
        <p>The silent uninstaller returns before the removal is complete.</p>
        <p>
          <strong>Result:</strong> The uninstaller removes only the files that setup installed, the Start
          menu shortcut, the desktop shortcut and the installed app entry. It keeps{" "}
          <code>%USERPROFILE%\.vivary</code>, <code>%APPDATA%\Vivary</code>, your project folders and the
          files that you added to the program folder. Your projects, conversations and settings stay.
        </p>
        <p>
          To remove your data too, delete <code>%USERPROFILE%\.vivary</code> and{" "}
          <code>%APPDATA%\Vivary</code> after you uninstall.
        </p>
        <p>To remove the portable ZIP, close Vivary and delete its folder.</p>
        <p>
          If setup or the uninstaller shows a message, see{" "}
          <Link href="/docs/troubleshooting/#installer">Troubleshooting</Link>.
        </p>
      </DocSection>
    </DocPage>
  );
}
