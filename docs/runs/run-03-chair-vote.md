# Run 03: Chair Vote And MVP Spec

## Decision

Build Demo Gatekeeper.

Demo Gatekeeper is a no-login static MVP that helps hackathon builders package a judge-ready submission. It combines the concrete utility of a submission builder with rule-based access-risk checks.

## Vote Tally

| Option | Product Grill | Build Grill | Chair Vote | Result |
| --- | --- | --- | --- | --- |
| Prompt Committee Studio | Reject as too abstract | Reject as too risky | Reject for 30-minute MVP | No |
| Flog Submission Builder | Winner | Absorb as export panel | Absorb | Partial |
| Demo Gatekeeper | Absorb submission builder | Winner | Winner | Yes |

## Product Requirements

- Static web app.
- No login.
- No backend.
- No install.
- No local/private URL required for judges.
- Works from a direct public link once deployed.
- Produces copy-ready answers for the submission form.
- Makes Codex usage prominent because it is the largest scoring category.
- States limitations honestly.

## Submission Requirements Captured From The Form

- Participant name and email are entered in the external Google Form, not this app.
- Project title is required.
- "What Did You Build?" should be 2-4 sentences.
- "Links For Judges" must include direct judge-accessible links. Recommended order: live demo, repo/artifact, screenshot/video/final-output backup.
- "How Did You Use Codex?" must be specific: what Codex helped build, debug, design, test, or improve.
- "Current Status" should state what works, what is partial, and what is broken.
- AI judges may only inspect submitted materials and may not run or install the project.

## MVP Acceptance Criteria

- User can fill project title, description, live demo URL, repo URL, backup URL, Codex usage, current status, limitations, and judge path.
- App computes a readiness score.
- App flags disallowed local/private links.
- App flags likely access/install/request-access language.
- App checks 2-4 sentence description.
- App generates a copy-ready markdown packet.
- App includes a seeded example for Demo Gatekeeper itself.
- App includes the two-agent grill/vote summary.

## Non-Goals

- No real URL crawling.
- No AI API call.
- No login or persistence.
- No database.
- No repo analysis.
- No upload flow.

## Implementation Files

- `index.html`
- `styles.css`
- `app.js`
- `README.md`
- `docs/runs/run-01-product-grill.md`
- `docs/runs/run-02-build-grill.md`
- `docs/runs/run-03-chair-vote.md`
