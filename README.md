# Agent Build Court

Agent Build Court is a no-login static MVP for Codex users who want stronger multi-agent planning. It puts a messy idea "on trial": Product, Builder, Skeptic, and Judge agents argue, cross-examine, issue a verdict, and export a copy-ready `BUILD_PACKET.md`.

## Demo

Public demo URL: https://raghoo.me/agent-build-court/

Repository URL: https://github.com/RogueTex/agent-build-court

## Why This Project

Codex supports agentic workflows, but good agent orchestration needs structure. Agent Build Court turns that structure into a usable interface: debate rounds, judge scorecard, conflict map, handoff queue, and a build packet that can be pasted into Codex or a repo.

## How Codex Was Used

Codex ran a judge/product/build-lead debate, rejected weaker prompt-generator framing, shaped the stronger Build Court workflow, wrote the spec-first docs, implemented the static app, updated tests, deployed the repo, and prepared submission-ready text.

## Status

Working static MVP. The app has no backend, no login, no database, and no dependency install. The browser output is deterministic and transparent; the practical artifact is the exported build packet and Codex subagent prompts.

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
