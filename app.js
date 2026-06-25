const agents = [
  {
    name: "Product Agent",
    focus: "user value",
    color: "blue",
    prompt:
      "Pressure-test the goal for real user value. Ask who needs it, what pain it removes, and what the first useful moment is.",
  },
  {
    name: "Builder Agent",
    focus: "ship path",
    color: "green",
    prompt:
      "Reduce the idea to the smallest working artifact. Name files, implementation steps, and anything to cut.",
  },
  {
    name: "Skeptic Agent",
    focus: "failure modes",
    color: "yellow",
    prompt:
      "Attack the plan. Identify hidden dependencies, fake claims, demo risks, and places where the scope is too big.",
  },
  {
    name: "Judge Agent",
    focus: "demo clarity",
    color: "red",
    prompt:
      "Evaluate whether the final output can be understood quickly from submitted materials, with no login or private context.",
  },
];

const examples = {
  goal:
    "Build a practical no-login hackathon demo that lets Codex users coordinate multiple agents around a task.",
  constraints:
    "Must work as a static GitHub Pages app. No login, no backend, no API key, no install. It should make the agent committee structure visible and produce copyable prompts for Codex subagents.",
  assets:
    "Existing static repo, spec-first docs, grill-me run logs, product plugin concept, public GitHub Pages deployment.",
};

const goal = document.querySelector("#goal");
const constraints = document.querySelector("#constraints");
const assets = document.querySelector("#assets");
const timebox = document.querySelector("#timebox");
const outputFormat = document.querySelector("#outputFormat");
const transcript = document.querySelector("#transcript");
const promptPack = document.querySelector("#promptPack");
const voteLabel = document.querySelector("#voteLabel");
const riskLabel = document.querySelector("#riskLabel");

document.querySelector("#loadExample").addEventListener("click", loadExample);
document.querySelector("#runHuddle").addEventListener("click", render);
document.querySelector("#copyPrompts").addEventListener("click", copyPrompts);
document.querySelector("#clearRoom").addEventListener("click", clearRoom);
[goal, constraints, assets, timebox, outputFormat].forEach((field) => field.addEventListener("input", render));

function words(text) {
  return text.trim().split(/\s+/).filter(Boolean);
}

function has(text, pattern) {
  return pattern.test(text.toLowerCase());
}

function escaped(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function hasAffirmedRisk(text, riskPattern, safePattern) {
  return riskPattern.test(text) && !safePattern.test(text);
}

function analyze() {
  const brief = `${goal.value} ${constraints.value} ${assets.value}`.toLowerCase();
  const riskTerms = [
    ["login", /login|sign in|auth/, /no login|without login|no auth|without auth/],
    ["backend", /backend|server|database|db/, /no backend|without backend|no server|no database|static/],
    ["private access", /private|request access|invite/, /public|no private|without private/],
    ["install", /install|clone|run locally/, /no install|without install|no dependency|static/],
  ];
  const risks = riskTerms
    .filter(([, riskPattern, safePattern]) => hasAffirmedRisk(brief, riskPattern, safePattern))
    .map(([name]) => name);
  if (brief.length < 40) risks.push("unclear goal");
  const strongStatic = has(brief, /static|github pages|public|no login/);
  const committeeVisible = has(brief, /agent|committee|subagent|codex/);
  const concrete = words(goal.value).length >= 8 && words(constraints.value).length >= 8;
  const approved = concrete && committeeVisible && risks.length <= 2;
  return { risks, strongStatic, committeeVisible, concrete, approved };
}

function agentResponse(agent, analysis) {
  const g = goal.value || "No goal provided.";
  const c = constraints.value || "No constraints provided.";
  const a = assets.value || "No assets provided.";

  if (agent.name === "Product Agent") {
    return `The useful moment is when a user pastes a messy goal and immediately gets a debate transcript plus prompts they can hand to Codex agents. Keep the first screen focused on briefing the room, not explaining the tool. Goal: ${g}`;
  }
  if (agent.name === "Builder Agent") {
    return `Ship it as static HTML/CSS/JS. Inputs: goal, constraints, assets, timebox, output. Outputs: transcript, vote, risk list, copyable prompt pack. Cut live AI calls and persistence. Constraints: ${c}`;
  }
  if (agent.name === "Skeptic Agent") {
    return analysis.risks.length
      ? `Risk flags: ${analysis.risks.join(", ")}. Be honest that this is a prompt orchestration interface, not autonomous agents running in the browser.`
      : "The scope is believable. Main remaining risk is overclaiming: say it creates agent prompts and simulated committee output, not live model deliberation.";
  }
  return `Judge path: open the demo, load example, run huddle, inspect the four agent cards, copy the Codex prompts. The submitted repo should show the spec and run logs. Assets: ${a}`;
}

function buildPromptPack() {
  return agents
    .map(
      (agent) => `## ${agent.name}
Role focus: ${agent.focus}
Task: ${agent.prompt}

Shared brief:
- Goal: ${goal.value || "TBD"}
- Timebox: ${timebox.value}
- Output: ${outputFormat.value}
- Constraints: ${constraints.value || "TBD"}
- Assets: ${assets.value || "TBD"}

Return:
1. strongest recommendation
2. top risks
3. concrete next step
4. vote: ship / revise / reject`
    )
    .join("\n\n");
}

function render() {
  const analysis = analyze();
  const responses = agents.map((agent) => ({ agent, text: agentResponse(agent, analysis) }));
  voteLabel.textContent = analysis.approved ? "Ship" : "Revise";
  riskLabel.textContent = `${analysis.risks.length} risk${analysis.risks.length === 1 ? "" : "s"} found`;

  transcript.innerHTML = responses
    .map(
      ({ agent, text }) => `
        <article class="agent-card ${agent.color}">
          <div>
            <span>${agent.focus}</span>
            <strong>${agent.name}</strong>
          </div>
          <p>${escaped(text)}</p>
        </article>
      `
    )
    .join("");

  promptPack.textContent = buildPromptPack();
}

async function copyPrompts() {
  await navigator.clipboard.writeText(promptPack.textContent);
}

function loadExample() {
  goal.value = examples.goal;
  constraints.value = examples.constraints;
  assets.value = examples.assets;
  timebox.value = "15 minutes";
  outputFormat.value = "Working MVP";
  render();
}

function clearRoom() {
  goal.value = "";
  constraints.value = "";
  assets.value = "";
  render();
}

loadExample();
