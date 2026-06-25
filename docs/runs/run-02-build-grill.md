# Run 02: Build Grill

## Run Summary

Build Demo Gatekeeper.

It directly attacks the hackathon failure mode: judges need a public working demo, no login, clear access, honest status, and a strong explanation of Codex usage. Fold the submission builder into it as an export panel.

## Build Constraints

- Empty repo means no backend, auth, database, deployment plumbing, or dependency wrangling.
- MVP must work from a static deploy: GitHub Pages, Netlify Drop, Cloudflare Pages, or Vercel static.
- No login, no API keys, no private/local URLs.
- Judges need direct links and instant comprehension.
- The app must look intentionally built, not like a checklist pasted into HTML.
- The largest scoring lever is the Codex usage explanation, so the demo must visibly show where Codex helped.

## Submission Requirements

- Public demo URL.
- Public repo URL.
- No localhost, private preview, install step, or access request.
- Clear current status: what works, what is mocked, what is future.
- A judge can evaluate in under 2 minutes.
- Submission text must explain what was built, how Codex was used, what changed because of Codex, and what is actually functional today.

## Grill Questions

- Can a judge understand the product in 10 seconds?
- Does the demo do anything, or only describe a plan?
- If JavaScript fails, is there still visible value?
- Are we depending on model calls we cannot deploy in time?
- Does the app avoid fake validation claims, especially link checking?
- Can the generated submission copy be pasted directly into the form?
- Is Codex usage a first-class artifact, or an afterthought paragraph?
- Can we honestly say what is working without sounding weak?
- Would this still be a valid submission if judged on a phone?
- Is the MVP solving the hackathon submission problem, or only showing off a meta-tool?

## Vote

Winner: Demo Gatekeeper.

Reason: it is the lowest-risk static MVP with the highest alignment to the scoring and submission constraints. It can absorb the best part of Flog Submission Builder as an export submission packet feature.

Reject Prompt Committee Studio as the standalone product. Absorb Flog Submission Builder as a panel.

## MVP Scope

Demo Gatekeeper is a static single-page app that helps a hackathon entrant validate and package their submission.

Core screens:

- Gate Check
- Judge Preview
- Codex Usage
- Submission Packet

No account system. No real network link validation unless clearly labeled as format and access-risk checking.

## Implementation Plan

1. Create a static app shell.
2. Build a structured form for submission inputs.
3. Add deterministic scoring rules.
4. Add a live judge preview panel.
5. Add copy-ready markdown export.
6. Add polished responsive styling.
7. Keep deployment static.

## Risks

- Biggest risk: app feels like a form. Fix with a strong judge-preview panel and instant scoring.
- Second risk: overclaiming validation. Say "format and access-risk check," not "verified live."
- Third risk: Codex usage is buried. Make it visible and exported.
- Fourth risk: too many features. Keep input, check, preview, export.
- Fifth risk: submission irony. If this tool lacks a public demo link, it fails its own premise. Deploy early.
