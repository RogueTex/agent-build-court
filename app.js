const form = document.querySelector("#submissionForm");
const scoreValue = document.querySelector("#scoreValue");
const scoreTone = document.querySelector("#scoreTone");
const checklist = document.querySelector("#checklist");
const judgePreview = document.querySelector("#judgePreview");
const packetPreview = document.querySelector("#packetPreview");
const sentenceCount = document.querySelector("#sentenceCount");
const seedButton = document.querySelector("#seedButton");
const copyButton = document.querySelector("#copyButton");

const example = {
  projectTitle: "Demo Gatekeeper",
  projectDescription:
    "Demo Gatekeeper is a no-login submission readiness tool for Codex Hackathon builders. It checks whether a project has judge-accessible links, a clear 2-minute judge path, an honest status note, and a strong Codex usage explanation. Judges should first inspect the Gate Check score and the generated submission packet.",
  demoUrl: "https://example.com/demo-gatekeeper",
  repoUrl: "https://github.com/example/demo-gatekeeper",
  backupUrl: "https://example.com/demo-gatekeeper-screenshot",
  codexUsage:
    "Codex helped run a two-agent grill session, compare candidate projects against the actual submission form, vote on the safest 30-minute MVP, create markdown run records, implement the static app, refine the UI, and prepare copy-ready submission text.",
  currentStatus: "Working MVP",
  judgePath: "Open the live demo, review the seeded example, inspect Gate Check, then copy the generated packet.",
  limitations:
    "The app performs deterministic format and access-risk checks only. It does not crawl URLs or verify whether a remote page is truly online because that would be unreliable from a static browser-only MVP.",
  accessModel: "No login",
};

const labels = {
  pass: "✓",
  warn: "!",
  fail: "×",
};

function getData() {
  const data = Object.fromEntries(new FormData(form).entries());
  data.accessModel = new FormData(form).get("accessModel") || "No login";
  return data;
}

function sentenceTotal(text) {
  const matches = text
    .trim()
    .replace(/\b(?:e\.g|i\.e)\./gi, "")
    .match(/[^.!?]+[.!?]+(?:\s|$)/g);
  if (!text.trim()) return 0;
  return matches ? matches.length : 1;
}

function isHttpUrl(value) {
  if (!value.trim()) return false;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function isLocalUrl(value) {
  if (!value.trim()) return false;
  const lower = value.toLowerCase();
  return (
    lower.includes("localhost") ||
    lower.includes("127.0.0.1") ||
    lower.includes("0.0.0.0") ||
    lower.includes("file://") ||
    lower.includes("192.168.") ||
    lower.includes("10.0.") ||
    lower.includes("172.16.")
  );
}

function hasRiskLanguage(text) {
  return /(request access|ask me|dm me|log in|login|sign in|install|clone|run locally|localhost|private url|invite)/i.test(
    text
  );
}

function evaluate(data) {
  const descriptionSentences = sentenceTotal(data.projectDescription || "");
  const allLinks = [data.demoUrl, data.repoUrl, data.backupUrl].filter(Boolean).join(" ");
  const codexMentions = /codex/i.test(data.codexUsage || "");
  const localLinks = [data.demoUrl, data.repoUrl, data.backupUrl].filter(isLocalUrl);
  const accessRisk = data.accessModel !== "No login";
  const riskText = [data.projectDescription, data.codexUsage, data.limitations, data.judgePath].join(" ");

  const checks = [
    {
      key: "title",
      status: data.projectTitle.trim() ? "pass" : "fail",
      title: "Project title",
      detail: data.projectTitle.trim() ? "Ready for the form." : "Add a concise title.",
    },
    {
      key: "description",
      status: descriptionSentences >= 2 && descriptionSentences <= 4 ? "pass" : "fail",
      title: "2-4 sentence build description",
      detail:
        descriptionSentences >= 2 && descriptionSentences <= 4
          ? `${descriptionSentences} sentences fits the requirement.`
          : `${descriptionSentences} sentences found; the form asks for 2-4.`,
    },
    {
      key: "demo",
      status: isHttpUrl(data.demoUrl || "") && !isLocalUrl(data.demoUrl || "") ? "pass" : "fail",
      title: "Public-looking live demo link",
      detail: data.demoUrl ? "Uses an HTTP(S) URL and avoids local patterns." : "Add the live demo URL first.",
    },
    {
      key: "repo",
      status: isHttpUrl(data.repoUrl || "") && !isLocalUrl(data.repoUrl || "") ? "pass" : "warn",
      title: "Repo or artifact link",
      detail: data.repoUrl ? "Artifact link is present." : "Recommended by the form; add it if available.",
    },
    {
      key: "access",
      status: accessRisk ? "fail" : "pass",
      title: "No login, access request, or install",
      detail: accessRisk ? `Selected access model: ${data.accessModel}.` : "Judges can evaluate without credentials.",
    },
    {
      key: "local",
      status: localLinks.length ? "fail" : "pass",
      title: "No local/private URLs",
      detail: localLinks.length ? `Risky link found: ${localLinks.join(", ")}` : "No obvious local/private URL patterns.",
    },
    {
      key: "codex",
      status: data.codexUsage.trim() && codexMentions ? "pass" : "fail",
      title: "Specific Codex usage",
      detail: codexMentions ? "Codex is explicitly named." : "Mention Codex and what it helped build or improve.",
    },
    {
      key: "status",
      status: data.currentStatus ? "pass" : "fail",
      title: "Current status",
      detail: data.currentStatus ? `Status: ${data.currentStatus}.` : "State what works, what is partial, and what is broken.",
    },
    {
      key: "risk-copy",
      status: hasRiskLanguage(`${allLinks} ${riskText}`) ? "warn" : "pass",
      title: "Access-risk language",
      detail: hasRiskLanguage(`${allLinks} ${riskText}`)
        ? "Review wording for login, install, request-access, or local-only language."
        : "No obvious access-risk phrases found.",
    },
  ];

  const score = Math.round(
    (checks.reduce((total, check) => total + (check.status === "pass" ? 1 : check.status === "warn" ? 0.5 : 0), 0) /
      checks.length) *
      100
  );

  return { checks, score, descriptionSentences };
}

function packet(data, results) {
  return `# ${data.projectTitle || "Untitled project"}

## What Did You Build?
${data.projectDescription || "TBD"}

## Links For Judges
1. Live demo: ${data.demoUrl || "TBD"}
2. Repo/artifact: ${data.repoUrl || "TBD"}
3. Screenshot/video/final output: ${data.backupUrl || "TBD"}

## How Did You Use Codex?
${data.codexUsage || "TBD"}

## Current Status
${data.currentStatus || "TBD"}.

${data.limitations ? `Known limitations: ${data.limitations}` : "Known limitations: TBD"}

## Judge Path
${data.judgePath || "Open the live demo and inspect the primary flow first."}

## Demo Gatekeeper Result
Readiness score: ${results.score}%.

${results.checks.map((check) => `- ${check.status.toUpperCase()}: ${check.title} - ${check.detail}`).join("\n")}
`;
}

function render() {
  const data = getData();
  const results = evaluate(data);
  const markdown = packet(data, results);

  scoreValue.textContent = `${results.score}%`;
  scoreTone.textContent = results.score >= 90 ? "Submission ready" : results.score >= 70 ? "Nearly ready" : "Needs work";
  sentenceCount.textContent = `${results.descriptionSentences} sentence${results.descriptionSentences === 1 ? "" : "s"}`;

  checklist.innerHTML = results.checks
    .map(
      (check) => `
        <article class="check ${check.status}">
          <span class="check-icon">${labels[check.status]}</span>
          <div>
            <strong>${check.title}</strong>
            <p>${check.detail}</p>
          </div>
        </article>
      `
    )
    .join("");

  judgePreview.innerHTML = `
    <article>
      <h3>What judges should inspect first</h3>
      <p>${data.judgePath || "Add a direct 2-minute judge path."}</p>
    </article>
    <article>
      <h3>Build summary</h3>
      <p>${data.projectDescription || "Add the 2-4 sentence project description."}</p>
    </article>
    <article>
      <h3>Codex usage</h3>
      <p>${data.codexUsage || "Add a specific Codex usage explanation."}</p>
    </article>
    <article>
      <h3>Links</h3>
      <p>Demo: ${data.demoUrl || "TBD"}</p>
      <p>Repo/artifact: ${data.repoUrl || "TBD"}</p>
    </article>
  `;

  packetPreview.textContent = markdown;
}

function loadExample() {
  for (const [key, value] of Object.entries(example)) {
    const field = form.elements[key];
    if (!field) continue;
    if (key === "accessModel") {
      const option = form.querySelector(`input[name="accessModel"][value="${value}"]`);
      if (option) option.checked = true;
    } else {
      field.value = value;
    }
  }
  render();
}

async function copyPacket() {
  const data = getData();
  const markdown = packet(data, evaluate(data));
  await navigator.clipboard.writeText(markdown);
  copyButton.textContent = "Copied";
  window.setTimeout(() => {
    copyButton.textContent = "Copy packet";
  }, 1200);
}

form.addEventListener("input", render);
form.addEventListener("change", render);
seedButton.addEventListener("click", loadExample);
copyButton.addEventListener("click", copyPacket);

loadExample();
