# Run 01: Product Grill

## Run Summary

This is a 30-minute MVP, so the winning idea must be legible in 10 seconds, usable without login, and judgeable from the submitted links alone.

The strongest move is to collapse the best ideas into one narrow product: a submission builder that helps hackathon entrants produce a compliant, judge-ready submission packet.

## Product Requirements

- Run as a public web page with no login, install, API key, or local setup.
- Produce a polished, copyable submission package.
- Validate against hackathon constraints:
  - project description is 2-4 sentences
  - Codex usage answer is explicit
  - current status is stated
  - submitted links are public-looking
  - no localhost or private URLs
  - no request-access, install, or local-only instructions
- Be self-explanatory to AI judges from the submitted page alone.
- Feel like a product, not a form wrapper.

## Submission Requirements

The MVP should generate these fields:

- Project title
- 2-4 sentence project description
- How did you use Codex?
- Current status
- Public links
- Judge packet preview
- Checklist score
- Warnings and errors

## Grill Questions

### Prompt Committee Studio

- What does the judge actually inspect in the first 20 seconds?
- Is this a product or just multiple prompt personas?
- Why would a hackathon entrant trust synthetic committee feedback over a concrete submission checklist?
- Does it create a public artifact, or does it trap value inside the app session?
- Can it be impressive without real model calls?

Verdict: Too abstract for a 30-minute MVP.

### Demo Gatekeeper

- Can it truly verify public judge accessibility from the browser?
- Can it detect login walls reliably?
- What happens when CORS blocks link checks?
- Does a failed network check make the app look broken?
- Is the core value validation, or is it submission packaging?

Verdict: Useful, but avoid real crawling. Keep rule-based access-risk checks.

### Flog Submission Builder

- Does it solve the exact submission pain?
- Can it be built as a static single-page app?
- Can judges understand it without creating an account?
- Does it generate something entrants can directly paste into the form?
- Does it turn the hackathon rules into a visible product?

Verdict: Best concrete MVP.

## Vote

Winner: Flog Submission Builder, folded into Demo Gatekeeper.

Reason: it directly attacks the submission bottleneck and naturally demonstrates Codex usage: Codex helped design, implement, critique, and tighten a judge-ready hackathon submission workflow.

## MVP Scope

Build one public static page:

1. Submission form
2. Compliance score
3. Judge packet preview
4. Example seed
5. Public-demo-ready static files

## Risks

- Too small: make the UI polished and the validation opinionated.
- Too broad: do not build real crawling, AI review, login, or integrations.
- Judge confusion: include an example judge packet on first load.
- Name risk: use "Demo Gatekeeper" rather than "Flog" as the product name.
- AI judge limitation: submitted materials must contain the full story.
