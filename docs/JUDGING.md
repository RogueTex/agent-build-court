# Judging Notes

## What Works

- Static no-login app loads from GitHub Pages.
- User can brief a case with project idea, deadline, artifact, constraints, assets, and winning bar.
- App renders three debate rounds: opening arguments, cross-examination, and verdict.
- App produces a judge scorecard, conflict map, handoff queue, and `BUILD_PACKET.md`.
- User can copy the packet or download Markdown/JSON.
- A static final-output example is available at `docs/BUILD_PACKET_EXAMPLE.md`.
- Repo includes spec-first documentation and grill-me/subagent debate records.

## What Is Intentionally Static

Agent Build Court does not call an AI model from the browser. It deterministically renders the debate and packet locally so the public demo works anywhere. The output is designed to be pasted into Codex subagents for live follow-up.

## How Codex Was Used

Codex served as build lead and judge. It ran multiple agent debates, rejected the weaker submission-checker and basic prompt-generator versions, selected the stronger Build Court concept, implemented the static MVP, updated tests and docs, and deployed the repo.

## Judge Path

1. Open the public demo URL.
2. Review the seeded example.
3. Click `Run court`.
4. Inspect the scorecard, conflict map, debate rounds, and handoff queue.
5. Copy or download `BUILD_PACKET.md`.
