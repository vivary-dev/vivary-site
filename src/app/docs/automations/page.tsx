import Link from "next/link";
import { DocPage, DocSection, DocTable, Steps, Ui, docMetadata } from "../article";

// Sources: the bundled Core automation settings (AgentJobsTab, AutomationScheduleDialog,
// AutomationDetailsDialog, triggers/dispatcher), packages/workbench/app/lib/
// settings-chat-handoff.ts, app/components/settings/AutomationFileReview.tsx,
// packages/desktop/main.mjs in vivary-dev/vivary at 96d3a8c, and the release notes.

const slug = "automations";
export const metadata = docMetadata(slug);

const sections = [
  { id: "about", label: "How they run" },
  { id: "create", label: "Create" },
  { id: "manage", label: "Manage" },
  { id: "approvals", label: "Approvals" },
  { id: "files", label: "File changes" },
  { id: "conditions", label: "Conditions" },
  { id: "webhooks", label: "Webhooks" },
];

export default function Automations() {
  return (
    <DocPage slug={slug} sections={sections}>
      <DocSection id="about" title="How automations run">
        <p>
          An automation belongs to you, not to a project. Each run uses Native chat, so you need a
          provider key first. See <Link href="/docs/runtime-setup/#provider-key">Add a provider key for Native chat</Link>.
        </p>
        <p>
          Automations run only while Vivary is open. Nothing runs while Vivary is closed. Vivary checks
          schedules about once a minute, so a run can start up to a minute after its scheduled time.
        </p>
      </DocSection>

      <DocSection id="create" title="Create an automation">
        <Steps>
          <li>Open <Ui>Settings</Ui>. Under <Ui>Agent</Ui>, choose <Ui>Automations</Ui>.</li>
          <li>
            Choose <Ui>New automation</Ui>. A box named <Ui>Ask the agent</Ui> opens with the start of
            a request: <code>Create an automation that does this:</code>
          </li>
          <li>Finish the request. Say what the automation does, when it runs, and your time zone. Then send it.</li>
          <li>
            Vivary switches to <Ui>Personal workspace</Ui> and opens a Native chat with your request.
            Answer any questions the agent asks.
          </li>
        </Steps>
        <p>
          If the request cannot reach a chat, Vivary shows it with <Ui>Copy prompt</Ui>. Copy it and
          send it from a Native chat in <Ui>Personal workspace</Ui>. To change what an existing
          automation does, ask the agent in the same way.
        </p>
      </DocSection>

      <DocSection id="manage" title="Pause, run, edit or delete an automation">
        <p>Each automation in <Ui>Settings</Ui> &gt; <Ui>Automations</Ui> has a switch and a <Ui>Manage</Ui> menu.</p>
        <DocTable
          caption="Automation controls"
          head={["To", "Do this"]}
          rows={[
            ["Pause or resume", "Turn the switch off or on."],
            ["Run it once now", <>Choose <Ui key="m">Manage</Ui> &gt; <Ui key="r">Run now</Ui>, then <Ui key="r2">Run now</Ui> again to confirm. The next scheduled run does not change.</>],
            ["Change a schedule", <>Choose <Ui key="m">Manage</Ui> &gt; <Ui key="e">Edit</Ui>. Pick a preset such as <Ui key="d">Every day at noon</Ui>, or open <Ui key="a">Advanced - cron expression</Ui>. Set the <Ui key="t">Timezone</Ui> and choose <Ui key="s">Save schedule</Ui>. Only scheduled automations have <Ui key="e2">Edit</Ui>.</>],
            ["See settings and past runs", <>Choose <Ui key="m">Manage</Ui> &gt; <Ui key="dt">Details</Ui>. It shows the trigger, the next run, <Ui key="lr">Last run</Ui>, <Ui key="lc">Last checked</Ui> and <Ui key="pr">Past runs</Ui>.</>],
            ["Delete it", <>Choose <Ui key="m">Manage</Ui> &gt; <Ui key="x">Delete</Ui>, then <Ui key="x2">Delete</Ui> again to confirm.</>],
          ]}
        />
        <p>
          An automation never runs twice at the same time. While a run is in progress or waiting for
          your approval, <Ui>Run now</Ui> is refused with <Ui>The automation is already running.</Ui>
        </p>
      </DocSection>

      <DocSection id="approvals" title="Approve a protected action">
        <p>
          When a run wants to use a tool that needs your approval, it pauses. Its status in{" "}
          <Ui>Past runs</Ui> is <code>waiting_approval</code>.
        </p>
        <Steps>
          <li>Choose <Ui>Manage</Ui> &gt; <Ui>Details</Ui> for the automation.</li>
          <li>In <Ui>Past runs</Ui>, choose <Ui>Inspect run</Ui>.</li>
          <li>Read the run and the <Ui>Pending action</Ui>, including its exact input.</li>
          <li>Choose <Ui>Approve once</Ui> to let the run continue, or <Ui>Decline</Ui> to end it without that action.</li>
        </Steps>
        <p>
          There is no option to always allow an action. A waiting run keeps waiting after you restart
          Vivary.
        </p>
      </DocSection>

      <DocSection id="files" title="Review file changes from automations">
        <p>
          When a run changes an instruction, skill or memory file, the change waits for you. Until
          you decide, chats and automation runs keep using the previous accepted version.
        </p>
        <Steps>
          <li>Open <Ui>Settings</Ui>. Under <Ui>Agent</Ui>, choose <Ui>Automation files</Ui>.</li>
          <li>Read the proposed text for each file.</li>
          <li>
            Choose <Ui>Accept</Ui> to use the proposed text. Choose <Ui>Discard</Ui> to restore the saved
            previous version. If no previous version was saved, <Ui>Discard</Ui> removes the proposed file.
          </li>
        </Steps>
      </DocSection>

      <DocSection id="conditions" title="Add a condition">
        <p>
          A webhook or event automation can have a condition that decides whether a call or event
          starts a run. Ask the agent to add one when you create the automation.
        </p>
        <p>
          Vivary checks conditions with Anthropic&apos;s API and sends the call or event data to
          Anthropic for the check. This needs an Anthropic API key, whatever provider you use for
          chats. Without a key, the automation does not run, and its details show the reason. Add an
          Anthropic key, or remove the condition. See{" "}
          <Link href="/docs/runtime-setup/#anthropic-key">Add an Anthropic key for automation conditions</Link>.
        </p>
      </DocSection>

      <DocSection id="webhooks" title="Call an automation from a webhook">
        <Steps>
          <li>Ask the agent for a webhook automation.</li>
          <li>Choose <Ui>Manage</Ui> &gt; <Ui>Details</Ui> and copy the <Ui>Webhook URL</Ui>.</li>
          <li>Have a program on this computer send an HTTP POST request to that URL.</li>
        </Steps>
        <p>
          The URL starts with <code>http://127.0.0.1:</code> and a port between 42100 and 42999.{" "}
          <Ui>Who can call it</Ui> shows <Ui>Reachable only from this computer while Vivary is open.</Ui>
        </p>
        <p>
          Vivary keeps the same port across launches. If that port is unavailable when Vivary starts,
          Vivary picks another one and shows <Ui>Vivary changed its local port</Ui>. Webhook URLs with
          the old port no longer work. Copy each new URL from <Ui>Details</Ui> and update the program
          that calls it.
        </p>
      </DocSection>
    </DocPage>
  );
}
