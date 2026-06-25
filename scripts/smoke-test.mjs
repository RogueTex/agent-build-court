import { readFile } from "node:fs/promises";

const files = {
  html: await readFile("index.html", "utf8"),
  css: await readFile("styles.css", "utf8"),
  js: await readFile("app.js", "utf8"),
  readme: await readFile("README.md", "utf8"),
  spec: await readFile("docs/SPEC.md", "utf8"),
  committee: await readFile("docs/AGENT_COMMITTEE.md", "utf8"),
  judging: await readFile("docs/JUDGING.md", "utf8"),
  submission: await readFile("SUBMISSION_DRAFT.md", "utf8")
};

const checks = [
  ["index links stylesheet", files.html.includes('href="styles.css"')],
  ["index loads app script", files.html.includes('src="app.js"')],
  ["index names the product", files.html.includes("Agent Huddle")],
  ["app includes agent roles", files.js.includes("Product Agent") && files.js.includes("Skeptic Agent")],
  ["app includes risk analysis", files.js.includes("hasAffirmedRisk")],
  ["app escapes rendered transcript text", files.js.includes("escaped(text)")],
  ["app includes prompt pack export", files.js.includes("buildPromptPack")],
  ["app seeds a working example", files.js.includes("loadExample();")],
  ["styles include committee strip", files.css.includes(".committee-strip")],
  ["styles include responsive rules", files.css.includes("@media (max-width: 960px)")],
  ["README documents working static MVP", files.readme.includes("Working static MVP")],
  ["spec documents committee structure", files.spec.includes("Agent Committee Prompt Structure")],
  ["committee doc includes product agent", files.committee.includes("## Product Agent")],
  ["judging notes explain static behavior", files.judging.includes("does not call an AI model")],
  ["submission draft names the product", files.submission.includes("Agent Huddle")]
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
