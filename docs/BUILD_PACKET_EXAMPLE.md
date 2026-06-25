# BUILD_PACKET.md Example

## Spec

Problem: builders need a structured way to turn agent disagreement into an executable plan.

User: Codex users planning, building, or judging a project.

Artifact: Working MVP

Deadline: 15 minutes

Mission:
Build a practical interface where Codex users can make several agents debate a project idea and turn disagreement into a build packet.

Constraints:
Public no-login GitHub Pages demo. Static HTML/CSS/JS only. No backend, no API key, no private URLs, no install steps. Must expose the agent committee prompt structure.

Success criteria:
A judge understands in 30 seconds that this is a useful multi-agent build workflow and can copy a real BUILD_PACKET.md.

## Verdict

Decision: Ship

Confidence: 100%

## Judge Scorecard

- PASS: Public demo clarity
- PASS: Codex usage visibility
- PASS: Practical artifact
- PASS: Scope control
- PASS: Judge-ready story

## Conflict Map

- speed vs credibility: Keep deterministic output honest; make the exported packet the artifact.
- agent theater vs utility: Use debate rounds, then produce tests, cut list, and handoff tasks.
- scope vs polish: Fit the deadline by cutting auth, backend, persistence, and live AI.

## Ruthless Cut List

- live LLM calls
- login
- database
- drag-and-drop
- team accounts
- private integrations

## Acceptance Tests

- Public demo opens without login.
- User can load an example and run the court.
- Three debate rounds render.
- Scorecard, conflict map, and handoff queue render.
- User can copy or download the build packet.

## Handoff Tasks

- Product Agent: Sharpen first useful moment. Done when a one-sentence value prop and target user exist.
- Builder Agent: Implement smallest working path. Done when static files support the MVP and smoke tests pass.
- Skeptic Agent: Burn down top risk. Done when high-risk blockers are removed or documented.
- Judge Agent: Prepare proof for submission. Done when live demo, repo, spec, and current status are public and direct.

## Codex Subagent Prompts

### Product Agent

Focus: user value

Mandate: Define the smallest useful product moment and cut vanity.

Return recommendation, top risk, concrete next step, and vote.

### Builder Agent

Focus: ship path

Mandate: Turn the idea into files, steps, acceptance tests, and a build order.

Return recommendation, top risk, concrete next step, and vote.

### Skeptic Agent

Focus: scope risk

Mandate: Attack hidden dependencies, fake claims, and demo fragility.

Return recommendation, top risk, concrete next step, and vote.

### Judge Agent

Focus: submission clarity

Mandate: Check whether the artifact is public, legible, honest, and Codex-relevant.

Return recommendation, top risk, concrete next step, and vote.

## Submission Pitch

Agent Build Court is a no-login static app that turns a messy idea into a spec-first build packet through a visible multi-agent debate. Product, Builder, Skeptic, and Judge agents argue, cross-examine, issue a verdict, and export acceptance tests, a cut list, risks, handoff tasks, and Codex subagent prompts.
