const agents = [
  {
    id: "product",
    name: "Product Agent",
    focus: "user value",
    color: "blue",
    mandate: "Define the smallest useful product moment and cut vanity.",
  },
  {
    id: "builder",
    name: "Builder Agent",
    focus: "ship path",
    color: "green",
    mandate: "Turn the idea into files, steps, acceptance tests, and a build order.",
  },
  {
    id: "skeptic",
    name: "Skeptic Agent",
    focus: "scope risk",
    color: "yellow",
    mandate: "Attack hidden dependencies, fake claims, and demo fragility.",
  },
  {
    id: "judge",
    name: "Judge Agent",
    focus: "submission clarity",
    color: "red",
    mandate: "Check whether the artifact is public, legible, honest, and Codex-relevant.",
  },
];

const example = {
  mission:
    "Build a practical interface where Codex users can make several agents debate a project idea and turn disagreement into a build packet.",
  constraints:
    "Public no-login GitHub Pages demo. Static HTML/CSS/JS only. No backend, no API key, no private URLs, no install steps. Must expose the agent committee prompt structure.",
  context:
    "Existing repo has a static app, spec-first docs, grill-me run logs, GitHub Pages deploy, and hackathon submission draft.",
  winningBar:
    "A judge understands in 30 seconds that this is a useful multi-agent build workflow and can copy a real BUILD_PACKET.md.",
  timebox: "15 minutes",
  artifact: "Working MVP",
};

const riskyExample = {
  mission:
    "Build a daily briefing tool that connects to Gmail and Google Calendar, summarizes urgent messages and meetings, and gives the user a morning action plan.",
  constraints:
    "Requires user login, Gmail API, Calendar API, database storage, and access to private account data. Must ship in 30 minutes and still be judge-accessible.",
  context:
    "The team has a static repo and Codex, but no OAuth setup, no verified Google app, no backend, and no safe sample account for judges.",
  winningBar:
    "A judge immediately sees why the idea should be revised into a no-login mock or build packet before implementation.",
  timebox: "30 minutes",
  artifact: "Pull request plan",
};

const fields = {
  mission: document.querySelector("#mission"),
  constraints: document.querySelector("#constraints"),
  context: document.querySelector("#context"),
  winningBar: document.querySelector("#winningBar"),
  timebox: document.querySelector("#timebox"),
  artifact: document.querySelector("#artifact"),
};

const els = {
  decision: document.querySelector("#decisionLabel"),
  confidence: document.querySelector("#confidenceLabel"),
  riskCount: document.querySelector("#riskCount"),
  scorecard: document.querySelector("#scorecard"),
  conflicts: document.querySelector("#conflicts"),
  transcript: document.querySelector("#transcript"),
  handoffs: document.querySelector("#handoffs"),
  packet: document.querySelector("#buildPacket"),
  runButton: document.querySelector("#runRoom"),
  runStatus: document.querySelector("#runStatus"),
};

document.querySelector("#loadExample").addEventListener("click", loadExample);
document.querySelector("#loadRiskyExample").addEventListener("click", loadRiskyExample);
els.runButton.addEventListener("click", runCourt);
document.querySelector("#copyPacket").addEventListener("click", copyPacket);
document.querySelector("#downloadMarkdown").addEventListener("click", downloadMarkdown);
document.querySelector("#downloadJson").addEventListener("click", downloadJson);
Object.values(fields).forEach((field) => field.addEventListener("input", render));

let runFeedbackTimer;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function wordCount(value) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function includesAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function getBrief() {
  return {
    mission: fields.mission.value.trim(),
    constraints: fields.constraints.value.trim(),
    context: fields.context.value.trim(),
    winningBar: fields.winningBar.value.trim(),
    timebox: fields.timebox.value,
    artifact: fields.artifact.value,
  };
}

function buildRisks(brief) {
  const text = `${brief.mission} ${brief.constraints} ${brief.context} ${brief.winningBar}`;
  const risks = [];
  if (includesAny(text, [/login/i, /sign in/i, /auth/i]) && !includesAny(text, [/no[-\s]?login/i, /no[-\s]?auth/i, /no sign[-\s]?in/i, /without logging in/i])) risks.push("auth friction");
  if (includesAny(text, [/backend/i, /server/i, /database/i, /api key/i]) && !includesAny(text, [/no backend/i, /static/i])) risks.push("backend dependency");
  if (includesAny(text, [/private/i, /request access/i, /invite/i]) && !includesAny(text, [/public/i, /no private/i])) risks.push("private access");
  if (includesAny(text, [/install/i, /clone/i, /run locally/i]) && !includesAny(text, [/no install/i, /browser/i])) risks.push("install friction");
  if (wordCount(brief.mission) < 8) risks.push("thin mission");
  if (wordCount(brief.winningBar) < 6) risks.push("unclear winning bar");
  return risks;
}

function hasJudgeBlocker(risks) {
  return risks.some((risk) => ["auth friction", "backend dependency", "private access", "install friction"].includes(risk));
}

function buildScorecard(brief, risks) {
  const text = `${brief.mission} ${brief.constraints} ${brief.context} ${brief.winningBar}`;
  return [
    ["Public demo clarity", includesAny(text, [/public/i, /demo/i, /github pages/i, /no[-\s]?login/i]) && !hasJudgeBlocker(risks)],
    ["Codex usage visibility", includesAny(text, [/codex/i, /agent/i, /subagent/i, /committee/i])],
    ["Practical artifact", includesAny(text, [/packet/i, /mvp/i, /spec/i, /build/i, /artifact/i])],
    ["Scope control", risks.length === 0],
    ["Judge-ready story", wordCount(brief.winningBar) >= 6 && !hasJudgeBlocker(risks)],
  ].map(([label, passed]) => ({ label, passed, score: passed ? 20 : 0 }));
}

function buildVerdict(scorecard, risks) {
  const score = scorecard.reduce((sum, item) => sum + item.score, 0);
  const riskPenalty = risks.length * 5 + (hasJudgeBlocker(risks) ? 20 : 0);
  const confidence = Math.max(0, Math.min(100, score - riskPenalty));
  return {
    label: confidence >= 80 ? "Ship" : confidence >= 50 ? "Revise" : "Reject",
    confidence,
  };
}

function buildConflicts(brief, risks) {
  const defaultConflicts = [
    ["speed vs credibility", "Keep deterministic output honest; make the exported packet the artifact."],
    ["agent theater vs utility", "Use debate rounds, then produce tests, cut list, and handoff tasks."],
    ["scope vs polish", `Fit the ${brief.timebox} deadline by cutting auth, backend, persistence, and live AI.`],
  ];
  return risks.length
    ? risks.map((risk) => [risk, `Mitigate by rewriting the brief or cutting features tied to ${risk}.`]).concat(defaultConflicts.slice(0, 2))
    : defaultConflicts;
}

function buildRounds(brief, risks, verdict) {
  const opening = [
    ["Product Agent", "blue", `The first useful moment is a builder seeing agents disagree and receiving a clean build packet, not just advice. Mission: ${brief.mission || "TBD"}`],
    ["Builder Agent", "green", `Ship as static UI: case brief, debate transcript, scorecard, handoff queue, and BUILD_PACKET.md export. Constraint set: ${brief.constraints || "TBD"}`],
    ["Skeptic Agent", "yellow", risks.length ? `I object to: ${risks.join(", ")}. These must be resolved or explicitly cut.` : "No major blockers. My objection is overclaiming; keep the deterministic/static disclosure visible."],
    ["Judge Agent", "red", `The demo wins if the judge can load the page, click example, see the court debate, and copy the packet in under 60 seconds.`],
  ];
  const cross = [
    ["Product Agent", "blue", "Builder, the packet must be useful tomorrow. Include acceptance tests and a cut list, not only prompts."],
    ["Builder Agent", "green", "Skeptic, every objection becomes either a conflict-map row or a non-goal. No vague warnings."],
    ["Skeptic Agent", "yellow", "Judge, do not reward agent-themed copy unless the exported artifact proves the workflow."],
    ["Judge Agent", "red", "Product, the story must mention Codex shaping the decision and implementation, not just appearing in the UI."],
  ];
  const commit = [
    ["Product Agent", "blue", "Commitment: position this as a build court that converts disagreement into an artifact."],
    ["Builder Agent", "green", "Commitment: implement scorecard, conflict map, handoff queue, and markdown/JSON export."],
    ["Skeptic Agent", "yellow", risks.length ? `Commitment: revise until risk count drops. Current risks: ${risks.join(", ")}.` : "Commitment: ship with honest deterministic wording."],
    ["Judge Agent", "red", `Final verdict: ${verdict.label}. Confidence ${verdict.confidence}%. Submit live demo, repo, spec, and judging notes.`],
  ];
  return [
    ["Opening Arguments", opening],
    ["Cross-Examination", cross],
    ["Chair Verdict", commit],
  ];
}

function buildHandoffs(brief, risks) {
  return [
    ["Product Agent", "Sharpen first useful moment", "A one-sentence value prop and clear target user exist."],
    ["Builder Agent", "Implement smallest working path", `Static files support ${brief.artifact}; smoke test passes.`],
    ["Skeptic Agent", "Burn down top risk", risks[0] ? `Risk removed or documented: ${risks[0]}.` : "No high-risk blocker remains."],
    ["Judge Agent", "Prepare proof for submission", "Live demo, repo, spec, and current status are public and direct."],
  ];
}

function buildCutList() {
  return ["live LLM calls", "login", "database", "drag-and-drop", "team accounts", "private integrations"];
}

function buildPacket(state) {
  const { brief, risks, scorecard, verdict, conflicts, handoffs } = state;
  return `# BUILD_PACKET.md

## Spec
Problem: builders need a structured way to turn agent disagreement into an executable plan.
User: Codex users planning, building, or judging a project.
Artifact: ${brief.artifact}
Deadline: ${brief.timebox}

Mission:
${brief.mission || "TBD"}

Constraints:
${brief.constraints || "TBD"}

Success criteria:
${brief.winningBar || "TBD"}

## Verdict
Decision: ${verdict.label}
Confidence: ${verdict.confidence}%

## Judge Scorecard
${scorecard.map((item) => `- ${item.passed ? "PASS" : "MISS"}: ${item.label}`).join("\n")}

## Conflict Map
${conflicts.map(([name, mitigation]) => `- ${name}: ${mitigation}`).join("\n")}

## Ruthless Cut List
${buildCutList().map((item) => `- ${item}`).join("\n")}

## Acceptance Tests
- Public demo opens without login.
- User can load an example and run the court.
- Three debate rounds render.
- Scorecard, conflict map, and handoff queue render.
- User can copy or download this build packet.

## Handoff Tasks
${handoffs.map(([owner, task, done]) => `- ${owner}: ${task}. Done when: ${done}`).join("\n")}

## Codex Subagent Prompts
${agents
  .map(
    (agent) => `### ${agent.name}
Focus: ${agent.focus}
Mandate: ${agent.mandate}
Shared brief: ${brief.mission || "TBD"}
Return recommendation, top risk, concrete next step, and vote.`
  )
  .join("\n\n")}

## Submission Pitch
Agent Build Court is a no-login static app that turns a messy idea into a spec-first build packet through a visible multi-agent debate. Product, Builder, Skeptic, and Judge agents argue, cross-examine, issue a verdict, and export acceptance tests, a cut list, risks, handoff tasks, and Codex subagent prompts.
`;
}

function buildState() {
  const brief = getBrief();
  const risks = buildRisks(brief);
  const scorecard = buildScorecard(brief, risks);
  const verdict = buildVerdict(scorecard, risks);
  const conflicts = buildConflicts(brief, risks);
  const handoffs = buildHandoffs(brief, risks);
  const rounds = buildRounds(brief, risks, verdict);
  const packet = buildPacket({ brief, risks, scorecard, verdict, conflicts, handoffs });
  return { brief, risks, scorecard, verdict, conflicts, handoffs, rounds, packet };
}

function render() {
  const state = buildState();
  els.decision.textContent = state.verdict.label;
  els.confidence.textContent = `${state.verdict.confidence}% confidence`;
  els.riskCount.textContent = `${state.risks.length} active risk${state.risks.length === 1 ? "" : "s"}`;

  els.scorecard.innerHTML = state.scorecard
    .map((item) => `<article class="${item.passed ? "pass" : "miss"}"><strong>${item.score}</strong><span>${escapeHtml(item.label)}</span></article>`)
    .join("");

  els.conflicts.innerHTML = state.conflicts
    .map(([name, mitigation]) => `<article><strong>${escapeHtml(name)}</strong><p>${escapeHtml(mitigation)}</p></article>`)
    .join("");

  els.transcript.innerHTML = state.rounds
    .map(
      ([round, rows]) => `<section class="round"><h3>${round}</h3>${rows
        .map(
          ([name, color, text]) => `<article class="agent-card ${color}">
            <div class="agent-meta"><span>${round}</span><strong>${name}</strong></div>
            <p>${escapeHtml(text)}</p>
          </article>`
        )
        .join("")}</section>`
    )
    .join("");

  els.handoffs.innerHTML = state.handoffs
    .map(
      ([owner, task, done]) => `<article class="handoff">
        <strong>${owner}</strong>
        <p>${escapeHtml(task)}</p>
        <span>Done when: ${escapeHtml(done)}</span>
      </article>`
    )
    .join("");

  els.packet.textContent = state.packet;
}

function runCourt() {
  render();
  window.clearTimeout(runFeedbackTimer);
  els.runButton.textContent = "Court ran";
  els.runStatus.textContent = "Verdict refreshed";
  els.runStatus.classList.add("active");
  els.transcript.classList.remove("just-ran");
  void els.transcript.offsetWidth;
  els.transcript.classList.add("just-ran");
  runFeedbackTimer = window.setTimeout(() => {
    els.runButton.textContent = "Run court";
    els.runStatus.textContent = "Ready";
    els.runStatus.classList.remove("active");
  }, 1400);
}

async function copyPacket() {
  await navigator.clipboard.writeText(buildState().packet);
}

function download(filename, text, type) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadMarkdown() {
  download("BUILD_PACKET.md", buildState().packet, "text/markdown");
}

function downloadJson() {
  download("agent-build-court.json", JSON.stringify(buildState(), null, 2), "application/json");
}

function loadExample() {
  loadBrief(example);
}

function loadRiskyExample() {
  loadBrief(riskyExample);
}

function loadBrief(brief) {
  for (const [key, value] of Object.entries(brief)) {
    fields[key].value = value;
  }
  render();
}

loadExample();
