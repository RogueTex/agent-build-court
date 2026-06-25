# Judging Notes

## What Works

- Static app loads with no account, backend, API key, or install.
- Seeded example shows a complete Agent Huddle brief.
- The app generates four visible agent perspectives, a ship/revise vote, risk count, and copyable prompt pack.
- Risk checks avoid treating "no login" and "no backend" as failures.
- User-entered transcript text is escaped before rendering.
- The committee prompt structure is visible in the product and documented in `docs/AGENT_COMMITTEE.md`.

## What Is Intentionally Static

Agent Huddle does not call an AI model. It generates deterministic committee output and prompts locally so the public demo can run anywhere GitHub Pages works. Users can paste the prompt pack into Codex to run the real committee.

## How Codex Was Used

Codex served as the build lead: it rejected the mistaken submission-checker, voted for Agent Huddle as the practical static MVP, wrote the spec-first plan, implemented the app, updated documentation, and verified the static files.

## Judge Path

1. Open the public demo URL.
2. Review the seeded example.
3. Change the goal or constraints.
4. Click Run huddle.
5. Inspect the four agent cards and copy the prompt pack.
