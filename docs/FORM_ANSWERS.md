# Form Answers Draft

## Project Title

Agent Build Court

## What Did You Build?

Agent Build Court is a no-login static app that turns a messy project idea into a spec-first build packet through a visible multi-agent debate. Product, Builder, Skeptic, and Judge agents argue, cross-examine, issue a ship/revise/reject verdict, and export a `BUILD_PACKET.md` with scorecard, conflict map, cut list, acceptance tests, handoff tasks, and Codex subagent prompts. Judges should load the example, run the court, inspect the debate rounds, and copy or download the build packet.

## Links For Judges

1. Live demo: https://raghoo.me/agent-build-court/
2. Repo/artifact: https://github.com/RogueTex/agent-build-court
3. Final output example: https://github.com/RogueTex/agent-build-court/blob/main/docs/BUILD_PACKET_EXAMPLE.md

## How Did You Use Codex?

Codex helped interpret the hackathon constraints, run judge/product/build-lead agent debates, reject weaker product directions, design Agent Build Court, implement the static MVP, write the spec-first docs, add smoke tests, deploy the public GitHub Pages repo, and prepare this submission draft.

## Current Status

Working static MVP. The app has no backend, login, database, install step, or private dependency. The browser debate is deterministic and transparent; the useful artifact is the exported build packet and subagent prompts for continuing the work in Codex.
