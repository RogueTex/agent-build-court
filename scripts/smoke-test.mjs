import { readFile } from "node:fs/promises";

const files = {
  html: await readFile("index.html", "utf8"),
  css: await readFile("styles.css", "utf8"),
  js: await readFile("app.js", "utf8"),
  readme: await readFile("README.md", "utf8"),
  submission: await readFile("SUBMISSION_DRAFT.md", "utf8"),
};

const checks = [
  ["index links stylesheet", files.html.includes('href="styles.css"')],
  ["index loads app script", files.html.includes('src="app.js"')],
  ["index names the product", files.html.includes("Demo Gatekeeper")],
  ["app includes local URL detection", files.js.includes("isLocalUrl")],
  ["app includes sentence counting", files.js.includes("sentenceTotal")],
  ["app includes Codex usage check", files.js.includes("codexUsage")],
  ["app seeds a working example", files.js.includes("loadExample();")],
  ["styles include responsive rules", files.css.includes("@media (max-width: 900px)")],
  ["README documents status", files.readme.includes("Working static MVP")],
  ["submission draft has public demo URL", files.submission.includes("https://raghoo.me/demo-gatekeeper/")],
  ["submission draft has public repo URL", files.submission.includes("https://github.com/RogueTex/demo-gatekeeper")],
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
