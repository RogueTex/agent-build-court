# Agent Huddle Spec

## Problem

Codex users often ask for "multiple agents" or "committee review" but do not have a simple way to turn a messy goal into clear subagent briefs, critique roles, risks, and a final ship/revise decision.

## Target User

A builder using Codex who wants a fast, structured committee pass before implementing a feature, debugging a plan, or preparing a public demo.

## Product

Agent Huddle is a browser-only static app that converts a goal, constraints, available assets, timebox, and desired output into:

- a four-agent transcript
- a committee vote
- a risk count
- copyable Codex subagent prompts

## Agent Committee Prompt Structure

The committee is intentionally visible in the product and reusable in Codex:

- Product Agent: user value.
- Builder Agent: ship path.
- Skeptic Agent: failure modes.
- Judge Agent: demo clarity.

## Build Lead Vote

| Option | Vote | Reason |
| --- | --- | --- |
| Submission checker | Reject | Too meta; it helps package the submission but is not a useful product. |
| Interview prep sprint | Reject for this repo | Practical, but less aligned with the requested agent committee prompt structure. |
| Agent Huddle | Ship | Useful to Codex users, static-safe, visible in the first screen, and honest about deterministic output. |

## Core Flow

1. User briefs the room with a goal, timebox, output format, constraints, and assets.
2. App runs deterministic checks for risky scope signals.
3. Four agents respond:
   - Product Agent: user value
   - Builder Agent: ship path
   - Skeptic Agent: failure modes
   - Judge Agent: demo clarity
4. App shows a ship/revise vote and risk count.
5. User copies the prompt pack into Codex to run the same committee with real agents.

## Non-Goals

- No login.
- No backend.
- No database.
- No AI API call.
- No claim that browser agents are autonomously reasoning.
- No persistence or private integrations.

## Success Criteria

- Runs from a static public URL.
- User can understand the product in under 10 seconds.
- User can create useful subagent prompts in under 2 minutes.
- Spec and run log document the build-lead vote.
