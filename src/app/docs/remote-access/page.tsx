import Link from "next/link";
import { DocPage, DocSection, DocTable, Note, Steps, Ui, docMetadata } from "../article";

// Sources in vivary-dev/vivary at 96d3a8c: packages/workbench/app/components/settings/
// BrowserAccessSettings.tsx, server/browser-access.mjs, server/browser-ingress.mjs,
// server/browser-pairing-page.mjs, packages/desktop/browser-access.mjs and the
// README "Remote access" section. Code keeps the older browser-access name.

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
          Remote access lets a browser on your phone or another computer open the Vivary that runs on
          this computer. Paired browsers share this computer&apos;s projects, files and Native chat
          history. The work still runs on this computer.
        </p>
        <ul>
          <li>
            It uses a protected HTTPS connection that you already set up, such as a suitably
            configured Tailscale connection. Vivary does not create a tunnel and does not change your
            firewall.
          </li>
          <li>It is off until you turn it on. Each browser must be paired and approved on this computer.</li>
          <li>It opens Vivary itself. In the app&apos;s words, remote access is separate from an agent controlling a browser.</li>
        </ul>
      </DocSection>

      <DocSection id="turn-on" title="Turn on remote access">
        <p>
          Before you start, set up a protected private HTTPS address for this computer. Vivary listens
          on a local port that only this computer can reach (loopback). Your HTTPS connection
          forwards requests to that port.
        </p>
        <Steps>
          <li>In the desktop app, open <Ui>Settings</Ui> &gt; <Ui>Agent</Ui> &gt; <Ui>Remote access</Ui>.</li>
          <li>Enter a <Ui>Host name</Ui> that identifies this computer on the other device. The default is <Ui>My Vivary laptop</Ui>.</li>
          <li>Enter the <Ui>Private HTTPS origin</Ui> of your protected connection, for example <code>https://your-private-host</code>.</li>
          <li>
            Check the <Ui>Loopback ingress port</Ui>. The default is <code>42300</code>. Point your
            protected HTTPS connection at this port.
          </li>
          <li>Leave <Ui>Optional preview HTTPS origin</Ui> empty. Remote previews stay off.</li>
          <li>Choose <Ui>Enable remote access</Ui>.</li>
          <li>
            Windows shows <Ui>Vivary remote access</Ui>. Read the origin and port in the message, then
            choose <Ui>Confirm</Ui>. <Ui>Cancel</Ui> is the default and changes nothing.
          </li>
        </Steps>
        <p>The status changes to <Ui>Remote access enabled</Ui>.</p>
      </DocSection>

      <DocSection id="pair" title="Pair a browser on another device">
        <Steps>
          <li>On the other device, open your private HTTPS origin followed by <code>/pair</code> in a browser.</li>
          <li>On the <Ui>Connect to your Vivary host</Ui> page, fill in <Ui>Name this browser</Ui>, for example <code>My phone</code>, and choose <Ui>Request pairing</Ui>. A six-digit code appears.</li>
          <li>On this computer, open <Ui>Settings</Ui> &gt; <Ui>Agent</Ui> &gt; <Ui>Remote access</Ui>. The request is listed under <Ui>Waiting for approval</Ui>.</li>
          <li>Check that the code matches the code on the other device. Then choose <Ui>Compare and approve</Ui>.</li>
          <li>Windows asks you to confirm the pairing and shows the code again. Choose <Ui>Confirm</Ui>.</li>
          <li>On the other device, choose <Ui>Finish pairing and open Vivary</Ui>.</li>
        </Steps>
        <p>
          A pairing request expires after five minutes. If it expires, request pairing again. An
          approved browser keeps access for 30 days.
        </p>
        <Note>
          Approve only codes you requested yourself. An approved browser can use this computer&apos;s
          projects and tools.
        </Note>
      </DocSection>

      <DocSection id="manage" title="Revoke a browser or turn off remote access">
        <DocTable
          caption="Managing access"
          head={["To", "Do this"]}
          rows={[
            ["Remove one browser", <>Under <Ui key="p">Paired browsers</Ui>, choose <Ui key="r">Revoke</Ui> for that browser and confirm. Its connections end.</>],
            ["Stop all remote access", <>Choose <Ui key="d">Disable access</Ui> and confirm. All remote connections end. Approved browsers stay listed for when you turn it on again.</>],
          ]}
        />
        <p>
          Runs that are already working on this computer continue when you revoke a browser. Approve,
          revoke and turn on access only from the desktop app. A remote browser shows which computer
          it is connected to, but cannot change access.
        </p>
      </DocSection>

      <DocSection id="limits" title="What a remote browser cannot do">
        <ul>
          <li>It cannot approve other devices or change remote access settings.</li>
          <li>
            It cannot open the Windows folder window, so <Ui>Open folder</Ui> works only on this
            computer. See <Link href="/docs/projects/#open-folder">Open a folder you already have</Link>.
          </li>
        </ul>
        <p>
          If the status shows <Ui>Remote access listener unavailable</Ui>, Vivary could not use the
          saved loopback port. The desktop app keeps working. See{" "}
          <Link href="/docs/troubleshooting/#remote-access">Troubleshooting</Link>.
        </p>
      </DocSection>
    </DocPage>
  );
}
