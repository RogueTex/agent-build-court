import { readFile } from "node:fs/promises";

const files = {
  html: await readFile("index.html", "utf8"),
  css: await readFile("styles.css", "utf8"),
  js: await readFile("app.js", "utf8"),
  readme: await readFile("README.md", "utf8"),
  spec: await readFile("docs/SPEC.md", "utf8"),
  judging: await readFile("docs/JUDGING.md", "utf8"),
  committee: await readFile("docs/AGENT_COMMITTEE.md", "utf8"),
  packetExample: await readFile("docs/BUILD_PACKET_EXAMPLE.md", "utf8"),
  formAnswers: await readFile("docs/FORM_ANSWERS.md", "utf8"),
  submission: await readFile("SUBMISSION_DRAFT.md", "utf8"),
};

const checks = [
  ["index links stylesheet", files.html.includes('href="styles.css"')],
  ["index loads app script", files.html.includes('src="app.js"')],
  ["index names the product", files.html.includes("Agent Build Court")],
  ["index exposes run court button", files.html.includes('id="runRoom"') && files.html.includes("Run court")],
  ["index exposes risky example button", files.html.includes('id="loadRiskyExample"') && files.html.includes("Load risky idea")],
  ["index exposes run status", files.html.includes('id="runStatus"')],
  ["app includes opening arguments", files.js.includes("Opening Arguments")],
  ["app includes cross examination", files.js.includes("Cross-Examination")],
  ["app wires run court handler", files.js.includes('els.runButton.addEventListener("click", runCourt)')],
  ["app confirms court ran", files.js.includes("Court ran") && files.js.includes("Verdict refreshed")],
  ["app includes risky example", files.js.includes("riskyExample") && files.js.includes("Gmail API")],
  ["app handles no-login phrasing", files.js.includes("no[-\\s]?login")],
  ["app penalizes judge blockers", files.js.includes("hasJudgeBlocker") && files.js.includes("riskPenalty")],
  ["app includes judge scorecard", files.js.includes("buildScorecard")],
  ["app includes conflict map", files.js.includes("buildConflicts")],
  ["app includes handoff queue", files.js.includes("buildHandoffs")],
  ["app includes markdown export", files.js.includes("downloadMarkdown")],
  ["app escapes transcript text", files.js.includes("escapeHtml(text)")],
  ["styles include scorecard", files.css.includes(".scorecard")],
  ["styles include transcript grid", files.css.includes(".transcript")],
  ["README documents working static MVP", files.readme.includes("Working static MVP")],
  ["spec documents build packet", files.spec.includes("BUILD_PACKET.md")],
  ["committee doc includes Judge Agent", files.committee.includes("## Judge Agent")],
  ["packet example names BUILD_PACKET", files.packetExample.includes("# BUILD_PACKET.md Example")],
  ["form answers include final output link", files.formAnswers.includes("BUILD_PACKET_EXAMPLE.md")],
  ["judging notes explain static behavior", files.judging.includes("does not call an AI model")],
  ["submission draft names the product", files.submission.includes("Agent Build Court")],
];

const failed = checks.filter(([, passed]) => !passed);

if (failed.length) {
  for (const [name] of failed) {
    console.error(`FAIL ${name}`);
  }
  process.exit(1);
}

for (const [name] of checks) {
  console.log(`PASS ${name}`);
}
