# Codex Hackathon Submission Draft

## Project Title

Agent Build Court

## What Did You Build?

Agent Build Court is a no-login static app that turns a messy project idea into a spec-first build packet through a visible multi-agent debate. Product, Builder, Skeptic, and Judge agents argue, cross-examine, issue a ship/revise/reject verdict, and export a `BUILD_PACKET.md` with scorecard, conflict map, cut list, acceptance tests, handoff tasks, and Codex subagent prompts. Judges should load the example, run the court, inspect the debate rounds, and copy the build packet.

## Links For Judges

1. Live demo: https://raghoo.me/agent-build-court/
2. Repo/artifact: https://github.com/RogueTex/agent-build-court
3. Final output example: https://github.com/RogueTex/agent-build-court/blob/main/docs/BUILD_PACKET_EXAMPLE.md

## How Did You Use Codex?

Codex helped interpret the hackathon constraints, spin up judge/product/build-lead agents, debate stronger product directions, reject the earlier meta submission-checker and basic prompt-generator, design Agent Build Court, implement the static MVP, update the spec-first docs, write smoke tests, deploy the repo, and prepare this submission draft.

## Current Status

Working static MVP. The app has no backend, no login, no database, and no dependency install. The browser debate is deterministic and transparent; the useful artifact is the exported build packet and subagent prompts for continuing the work in Codex.
