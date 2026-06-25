# Agent Build Court Spec

## Problem

Codex users can ask multiple agents for help, but the work often becomes scattered: one agent critiques, another plans, and the final artifact is still buried in chat. Hackathon judges also need a public no-login demo and clear proof that Codex shaped the work.

## Target User

A builder using Codex who wants to turn a rough idea into a spec-first build packet before implementing or submitting a project.

## Product

Agent Build Court is a static multi-agent debate interface. The user enters a project idea, constraints, assets, deadline, and winning bar. The app runs three visible rounds:

1. Opening Arguments
2. Cross-Examination
3. Chair Verdict

It then produces:

- judge scorecard
- conflict map
- handoff queue
- ruthless cut list
- acceptance tests
- Codex subagent prompts
- copy/download-ready `BUILD_PACKET.md`

## Agent Committee Prompt Structure

- Product Agent: user value and first useful moment.
- Builder Agent: build path, files, implementation steps, and tests.
- Skeptic Agent: hidden dependencies, fake claims, and scope risk.
- Judge Agent: public demo clarity, current status honesty, and Codex usage.

## MVP Behavior

1. User loads the seeded example or writes a new case brief.
2. App calculates risks and judge scorecard.
3. Agents debate across three rounds.
4. App issues ship / revise / reject verdict.
5. App generates handoff tasks and a build packet.
6. User copies or downloads Markdown/JSON.

## Non-Goals

- No login.
- No backend.
- No database.
- No live AI API in browser.
- No persistence.
- No claim that browser agents are autonomously reasoning.

## Success Criteria

- Public static demo works without login.
- Judge understands the product in under 30 seconds.
- User can generate and copy a useful build packet in under 2 minutes.
- Spec-first docs and run logs explain the Codex-led debate and pivot.
