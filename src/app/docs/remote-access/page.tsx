import Link from "next/link";
import { DocPage, DocSection, DocTable, Note, Steps, Ui, docMetadata } from "../article";

// Sources in vivary-dev/vivary at tag v0.1.0-beta.1: packages/workbench/app/components/
// settings/BrowserAccessSettings.tsx, server/browser-access.mjs (30-day grant),
// server/browser-ingress.mjs, server/browser-pairing-page.mjs,
// packages/desktop/browser-access.mjs (confirmation dialog) and docs/desktop-preview.md.

const slug = "remote-access";
export const metadata = docMetadata(slug);

const sections = [
  { id: "about", label: "How it works" },
  { id: "turn-on", label: "Turn on" },
  { id: "pair", label: "Pair a browser" },
  { id: "manage", label: "Revoke or turn off" },
  { id: "limits", label: "Limits" },
];

export default function RemoteAccess() {
  return (
    <DocPage slug={slug} sections={sections}>
      <DocSection id="about" title="How remote access works">
        <p>
          A paired browser uses the projects, files and Native chat history of this computer. The work
          continues to run on this computer.
        </p>
        <ul>
          <li>
            Remote access uses a protected HTTPS connection that you set up, for example a correctly
            configured Tailscale connection. Vivary does not create this connection and does not change
            your firewall.
          </li>
          <li>Remote access is off until you turn it on. You must pair and approve each browser on this computer.</li>
          <li>Remote access opens the Vivary app. It does not let an agent control a browser.</li>
        </ul>
        <Note>
          Remote access from a different device over Tailscale was tested on the installed 0.1.0-beta.1
          app (reported November 1, 2026). If it does not work as this article describes, report it.
          See{" "}
          <Link href="/docs/troubleshooting/#report">Report a problem</Link>.
        </Note>
      </DocSection>

      <DocSection id="turn-on" title="Turn on remote access">
        <p>
          Before you begin, set up a protected private HTTPS address for this computer. Vivary listens on a
          loopback port, which is a local port that only this computer can reach. Your HTTPS connection
          sends requests to that port.
        </p>
        <Steps>
          <li>In the desktop app, click <Ui>Settings</Ui> in the sidebar.</li>
          <li>Under <Ui>Agent</Ui>, click <Ui>Remote access</Ui>.</li>
          <li>In <Ui>Host name</Ui>, enter a name for this computer. The default is <code>My Vivary laptop</code>.</li>
          <li>In <Ui>Private HTTPS origin</Ui>, enter the address of your protected connection.</li>
          <li>Make sure that your HTTPS connection sends requests to the <Ui>Loopback ingress port</Ui>. The default is <code>42300</code>.</li>
          <li>Leave <Ui>Optional preview HTTPS origin</Ui> empty.</li>
          <li>Click <Ui>Enable remote access</Ui>.</li>
          <li>In the <Ui>Vivary remote access</Ui> window, read the origin and the port.</li>
          <li>Click <Ui>Confirm</Ui>.</li>
        </Steps>
        <p>
          <strong>Result:</strong> The status changes to <Ui>Remote access enabled</Ui>. If you click{" "}
          <Ui>Cancel</Ui> in the window, nothing changes.
        </p>
      </DocSection>

      <DocSection id="pair" title="Pair a browser on a different device">
        <Steps>
          <li>On the other device, open your private HTTPS origin followed by <code>/pair</code> in a browser.</li>
          <li>On the <Ui>Connect to your Vivary host</Ui> page, fill in <Ui>Name this browser</Ui>, for example <code>My phone</code>.</li>
          <li>Click <Ui>Request pairing</Ui>. The page shows a six-digit code.</li>
          <li>On this computer, go to <Ui>Settings</Ui> &gt; <Ui>Agent</Ui> &gt; <Ui>Remote access</Ui>.</li>
          <li>Under <Ui>Waiting for approval</Ui>, find the request.</li>
          <li>Make sure that the code is the same as the code on the other device.</li>
          <li>Click <Ui>Compare and approve</Ui>.</li>
          <li>Windows shows the code again. Click <Ui>Confirm</Ui>.</li>
          <li>On the other device, click <Ui>Finish pairing and open Vivary</Ui>.</li>
        </Steps>
        <p>
          A pairing request expires after five minutes. If it expires, request the pairing again. An
          approved browser keeps access for 30 days.
        </p>
        <Note>
          Approve only the codes that you requested yourself. An approved browser can use the projects and
          tools of this computer.
        </Note>
      </DocSection>

      <DocSection id="manage" title="Revoke a browser or turn off remote access">
        <DocTable
          caption="Remote access controls"
          head={["To", "Do this"]}
          rows={[
            ["Remove one browser", <>Under <Ui key="p">Paired browsers</Ui>, click <Ui key="r">Revoke</Ui> for that browser, and confirm. Its connections stop.</>],
            ["Stop all remote access", <>Click <Ui key="d">Disable access</Ui>, and confirm. All remote connections stop. Approved browsers stay in the list for when you turn on access again.</>],
          ]}
        />
        <p>
          When you revoke a browser, runs on this computer continue. Approve, revoke and turn on access
          only in the desktop app. A remote browser shows which computer it connects to, but it cannot
          change access.
        </p>
      </DocSection>

      <DocSection id="limits" title="What a remote browser cannot do">
        <ul>
          <li>It cannot approve other devices or change the remote access settings.</li>
          <li>
            It cannot open the Windows folder window. <Ui>Open folder</Ui> works only on this computer. See{" "}
            <Link href="/docs/projects/#open-folder">Open a folder that you already have</Link>.
          </li>
        </ul>
        <p>
          If the status shows <Ui>Remote access listener unavailable</Ui>, Vivary could not use the saved
          loopback port. The desktop app continues to work. See{" "}
          <Link href="/docs/troubleshooting/#remote-access">Troubleshooting</Link>.
        </p>
      </DocSection>
    </DocPage>
  );
}
