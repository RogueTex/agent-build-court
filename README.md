# Agent Huddle

Agent Huddle is a no-login static MVP that turns a messy goal into a structured agent committee transcript, ship/revise vote, risk list, and copyable Codex subagent prompts.

## Build Lead Vote

Winner: Agent Huddle.

Rejected: the old submission checker. It was shippable, but too meta. Agent Huddle is more useful as a public demo because it gives Codex users a practical prompt-orchestration tool while staying static, dependency-free, and honest about not running live AI in the browser.

## Demo

Public demo URL: https://raghoo.me/agent-huddle/

Repository URL: https://github.com/RogueTex/agent-huddle

## Why This Project

The constraints are strict: GitHub Pages, no backend, no login, no dependencies, public demo, spec-first documentation, and visible agent committee structure. Agent Huddle fits those constraints by making the committee workflow itself the product: brief the room, inspect deterministic agent perspectives, and copy the real prompts into Codex.

## How Codex Was Used

Codex acted as the build lead: reject the mistaken meta product, grill candidate MVPs, vote on Agent Huddle, write the spec-first doc, implement the static HTML/CSS/JS app, refine the risk checks, and update the submission artifacts.

## Status

Working static MVP. There is no backend, login, database, dependency install, or live AI call. The browser generates deterministic committee output and prompt packets locally.

## Quick Start

```bash
npm run check
npm start
```

Then open `http://127.0.0.1:4173`.

## Files

- `index.html` - app shell
- `styles.css` - responsive UI
- `app.js` - committee transcript, vote, risk checks, and prompt export
- `docs/SPEC.md` - product spec
- `docs/AGENT_COMMITTEE.md` - reusable committee prompt structure
- `docs/JUDGING.md` - judge-facing notes
- `docs/runs/run-07-practical-pivot.md` - fast build-lead grill and vote
- `SUBMISSION_DRAFT.md` - copy-ready submission draft
- `scripts/smoke-test.mjs` - static repo smoke test

## Deployment

Deploy the repository root to GitHub Pages or any static host. The submitted demo link should be public and should not require login, install steps, or access approval.
