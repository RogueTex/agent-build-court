# Agent Build Court

Agent Build Court is a no-login static MVP for Codex users who want stronger multi-agent planning. It puts a messy idea "on trial": Product, Builder, Skeptic, and Judge agents argue, cross-examine, issue a verdict, and export a copy-ready `BUILD_PACKET.md`.

## Judge Links

Open these directly. No login, access request, install, local server, or private URL is required.

- Live demo: https://raghoo.me/agent-build-court/
- Final-output example: https://github.com/RogueTex/agent-build-court/blob/main/docs/BUILD_PACKET_EXAMPLE.md
- Source repo: https://github.com/RogueTex/agent-build-court

## What To Look At First

1. Open the live demo.
2. Paste or edit the project idea in the left panel.
3. Click through Opening Arguments, Cross-Examination, and Chair Verdict.
4. Inspect the judge scorecard, conflict map, and handoff queue.
5. Copy or download the generated `BUILD_PACKET.md`.

The strongest part of the demo is the transformation from a fuzzy build idea into a judgeable build packet with role-specific agent prompts, unresolved risks, and next actions.

## Why This Project

Codex supports agentic workflows, but good agent orchestration needs structure. Agent Build Court turns that structure into a usable interface: debate rounds, a judge scorecard, conflict map, handoff queue, and a build packet that can be pasted into Codex or committed into a repo.

The practical use case is simple: before spending a build sprint on the wrong thing, run the idea through a small agent committee that is forced to argue, expose tradeoffs, and leave behind an implementation packet.

## Product Submission

Agent Build Court is useful because the most expensive mistake in a short build sprint is not a coding mistake; it is building the wrong thing with confidence. Codex makes it easy to move fast, but fast agents still need a ritual for disagreement, risk discovery, and handoff clarity.

This product gives builders that ritual. It turns a raw prompt into a structured committee review where each agent has a job:

- Product Agent asks whether the demo will be understandable and useful.
- Builder Agent asks whether it can actually ship in the available time.
- Skeptic Agent tries to break the idea before judges do.
- Judge Agent turns the disagreement into a verdict, scorecard, and build packet.

The output is not just text on a page. It is a practical `BUILD_PACKET.md` with the pitch, scope, risks, acceptance criteria, agent prompts, and next implementation tasks. That makes it useful before a hackathon, during a Codex sprint, or any time a team wants multiple agents to debate a project before execution.

The key product insight is that multi-agent work should not feel like several chat transcripts scattered across tabs. It should leave behind a single decision artifact that explains what to build, why it matters, what could fail, and who should do what next.

## What Works Now

- A public static app that runs entirely in the browser.
- Four visible agent roles: Product, Builder, Skeptic, and Judge.
- Three review stages: Opening Arguments, Cross-Examination, and Chair Verdict.
- A judge scorecard for demo clarity, feasibility, differentiation, Codex leverage, and submission safety.
- A conflict map that names unresolved tradeoffs instead of hiding them.
- A handoff queue that turns the verdict into implementation tasks.
- Copy and download flows for a final `BUILD_PACKET.md`.

## How Codex Was Used

Codex ran a judge/product/build-lead debate, rejected weaker prompt-generator framing, shaped the stronger Build Court workflow, wrote the spec-first docs, implemented the static app, updated tests, deployed the repo, and prepared submission-ready text.

This repo also includes the supporting materials judges asked for:

- Spec-first project notes: `docs/SPEC.md`
- Agent committee prompt structure: `docs/AGENT_COMMITTEE.md`
- Judge-facing implementation notes: `docs/JUDGING.md`
- Example final output: `docs/BUILD_PACKET_EXAMPLE.md`

## Current Status

Working static MVP. The app has no backend, no login, no database, and no dependency install. The browser output is deterministic and transparent; the practical artifact is the exported build packet and the Codex subagent prompt structure.

Important scope note: the browser demo does not call live LLM agents. The real hackathon work was done through Codex and subagent debate during the build process; the shipped app packages that workflow into a judge-accessible static demo.

## Quick Start

```bash
npm run check
npm start
```

Then open `http://127.0.0.1:4173`.

## Files

- `index.html` - app shell
- `styles.css` - responsive court UI
- `app.js` - debate rounds, scorecard, conflict map, handoffs, and export
- `docs/SPEC.md` - product spec
- `docs/AGENT_COMMITTEE.md` - reusable committee prompt structure
- `docs/JUDGING.md` - judge-facing notes
- `docs/BUILD_PACKET_EXAMPLE.md` - static final-output example for judges
- `docs/FORM_ANSWERS.md` - concise form answer draft
- `SUBMISSION_DRAFT.md` - copy-ready submission draft
- `scripts/smoke-test.mjs` - static repo smoke test
