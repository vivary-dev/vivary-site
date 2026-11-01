import Link from "next/link";
import { DocPage, DocSection, DocTable, Note, Steps, Ui, docMetadata } from "../article";

// Sources in vivary-dev/vivary at tag v0.1.0-beta.1: docs/desktop-preview.md (Automations),
// app/components/settings/AutomationFileReview.tsx, app/routes/settings.tsx,
// app/lib/settings-chat-handoff.ts, packages/desktop/main.mjs, and the patched Core 0.176.5
// automation settings (AgentJobsTab, AutomationScheduleDialog, AutomationDetailsDialog).
// Core labels were checked in the installed 0.1.0-beta.1 build.

const slug = "automations";
export const metadata = docMetadata(slug);

const sections = [
  { id: "before", label: "Before you begin" },
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
      <DocSection id="before" title="Before you begin">
        <ul>
          <li>
            Add a provider key for Native chat. Each automation run uses Native chat. See{" "}
            <Link href="/docs/runtime-setup/#provider-key">Add a provider key for Native chat</Link>.
          </li>
          <li>Keep Vivary open. Automations run only while Vivary is open.</li>
        </ul>
        <Note>
          Automation runs that use a provider are not tested on the installed 0.1.0-beta.1 app yet. If
          an automation does not work as this article describes, report it. See{" "}
          <Link href="/docs/troubleshooting/#report">Report a problem</Link>.
        </Note>
      </DocSection>

      <DocSection id="about" title="How automations run">
        <p>
          An automation belongs to you, not to a project. It can start in four ways: on a schedule, after an
          event in Vivary, from a webhook call, or with <Ui>Run now</Ui>.
        </p>
        <ul>
          <li>When you close the Vivary window, Vivary quits, and no automation runs.</li>
          <li>After you open Vivary again, a missed automation runs one time. Then it follows its schedule.</li>
          <li>Vivary checks schedules about one time each minute. A run can start up to one minute after its scheduled time.</li>
          <li>Two runs of the same automation never run at the same time.</li>
          <li>Vivary does not retry a failed run. Correct the cause, and then wait for the next run or click <Ui>Run now</Ui>.</li>
        </ul>
        <p>
          A run cannot send email or messages, get access to the web, or change settings. A tool that
          you configure and name in the automation adds only that capability. Each call of that tool
          waits for your approval.
        </p>
      </DocSection>

      <DocSection id="create" title="Create an automation">
        <Steps>
          <li>In the sidebar, click <Ui>Settings</Ui>.</li>
          <li>Under <Ui>Agent</Ui>, click <Ui>Automations</Ui>.</li>
          <li>Click <Ui>New automation</Ui>.</li>
          <li>
            In <Ui>Create an automation</Ui>, complete the request after{" "}
            <code>Create an automation that does this:</code>
          </li>
          <li>Write what the automation does, when it runs, and your time zone.</li>
          <li>Send the request.</li>
          <li>Answer the questions of the agent.</li>
        </Steps>
        <p>
          <strong>Result:</strong> Vivary opens a Native chat in <Ui>Personal workspace</Ui> with your
          request, and the agent creates the automation.
        </p>
        <p>
          If the request cannot get to a chat, Vivary shows it with <Ui>Copy prompt</Ui>. Copy the request,
          and send it from a Native chat in <Ui>Personal workspace</Ui>. To change what an automation does,
          ask the agent in the same way.
        </p>
      </DocSection>

      <DocSection id="manage" title="Pause, run, edit or delete an automation">
        <p>
          Each automation in <Ui>Settings</Ui> &gt; <Ui>Agent</Ui> &gt; <Ui>Automations</Ui> has a switch and a{" "}
          <Ui>Manage</Ui> menu.
        </p>
        <DocTable
          caption="Automation controls"
          head={["To", "Do this"]}
          rows={[
            ["Pause or resume", "Turn the switch off or on."],
            ["Run it one time now", <>Click <Ui key="m">Manage</Ui> &gt; <Ui key="r">Run now</Ui>. Then click <Ui key="r2">Run now</Ui> again to confirm. The next scheduled run does not change.</>],
            ["Change a schedule", <>Click <Ui key="m">Manage</Ui> &gt; <Ui key="e">Edit</Ui>. Select a preset, such as <Ui key="d">Every day at noon</Ui>, or open <Ui key="a">Advanced - cron expression</Ui>. Set the <Ui key="t">Timezone</Ui>, and click <Ui key="s">Save schedule</Ui>.</>],
            ["See settings and past runs", <>Click <Ui key="m">Manage</Ui> &gt; <Ui key="dt">Details</Ui>. It shows the trigger, the next run, the last run, the last check and <Ui key="pr">Past runs</Ui>.</>],
            ["Delete it", <>Click <Ui key="m">Manage</Ui> &gt; <Ui key="x">Delete</Ui>. Then click <Ui key="x2">Delete</Ui> again to confirm.</>],
          ]}
        />
        <p>
          Only scheduled automations have <Ui>Edit</Ui>. While a run is in progress, Vivary refuses{" "}
          <Ui>Run now</Ui> with <Ui>The automation is already running.</Ui> While a run waits for your
          approval, <Ui>Run now</Ui> tells you to approve or decline that run first.
        </p>
      </DocSection>

      <DocSection id="approvals" title="Approve a protected action">
        <p>
          When a run wants to use a tool that needs your approval, the run stops and waits. Its status in{" "}
          <Ui>Past runs</Ui> is <Ui>Waiting for approval</Ui>.
        </p>
        <Steps>
          <li>For the automation, click <Ui>Manage</Ui> &gt; <Ui>Details</Ui>.</li>
          <li>In <Ui>Past runs</Ui>, click <Ui>Inspect run</Ui>.</li>
          <li>Read the run and the <Ui>Pending action</Ui>, including its exact input.</li>
          <li>Click <Ui>Approve once</Ui> to let the run continue, or <Ui>Decline</Ui> to end it without that action.</li>
        </Steps>
        <p>
          You cannot always allow an action. A run that waits continues to wait after you restart Vivary.
          While it waits, that automation cannot start a different run.
        </p>
      </DocSection>

      <DocSection id="files" title="Review file changes from automations">
        <p>
          When a run changes an instruction, skill or memory file, the change waits for your review. Until
          you decide, chats and automation runs use the previous accepted version.
        </p>
        <Steps>
          <li>Go to <Ui>Settings</Ui> &gt; <Ui>Agent</Ui> &gt; <Ui>Automation files</Ui>.</li>
          <li>Read the proposed text for each file.</li>
          <li>Click <Ui>Accept</Ui> to use the proposed text, or <Ui>Discard</Ui> to reject it.</li>
        </Steps>
        <p>
          <Ui>Discard</Ui> restores the saved previous version. If there is no saved previous version,{" "}
          <Ui>Discard</Ui> removes the proposed file.
        </p>
      </DocSection>

      <DocSection id="conditions" title="Add a condition">
        <p>
          A condition is a rule that decides if a webhook call or an event starts a run. Ask the agent to
          add one when you create a webhook or event automation.
        </p>
        <p>
          Vivary checks conditions with the Anthropic API, and sends the call or event data to Anthropic
          for the check. This check needs an Anthropic API key, whatever provider you use for Native chat.
          Without a key, the automation does not run, and its details show the reason. Add an Anthropic
          key, or remove the condition. See{" "}
          <Link href="/docs/runtime-setup/#anthropic-key">Add an Anthropic key for automation conditions</Link>.
        </p>
      </DocSection>

      <DocSection id="webhooks" title="Call an automation from a webhook">
        <p>
          A webhook automation runs when a program sends an HTTP POST request to its webhook URL.
        </p>
        <Steps>
          <li>Ask the agent for a webhook automation.</li>
          <li>Click <Ui>Manage</Ui> &gt; <Ui>Details</Ui>.</li>
          <li>Copy the <Ui>Webhook URL</Ui>.</li>
          <li>Configure a program on this computer to send an HTTP POST request to that URL.</li>
        </Steps>
        <p>
          The URL starts with <code>http://127.0.0.1:</code> and a port from 42100 to 42999. Under{" "}
          <Ui>Who can call it</Ui>, Vivary shows{" "}
          <Ui>Reachable only from this computer while Vivary is open.</Ui> Anyone on this computer who has
          the URL can start the automation.
        </p>
        <p>
          Vivary keeps the same port when it starts again. If that port is not available, Vivary selects
          a different port and shows <Ui>Vivary changed its local port</Ui>. Webhook URLs with the old
          port stop working. Copy each new URL from <Ui>Details</Ui>, and update the program that calls it.
        </p>
      </DocSection>
    </DocPage>
  );
}
