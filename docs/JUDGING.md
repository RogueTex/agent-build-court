# Judging Notes

## What Works

- Static app loads with no account, backend, or install.
- Seeded example shows a complete Demo Gatekeeper submission.
- Readiness score updates from form inputs.
- Rule-based checklist flags local/private URLs, missing fields, risky access model, weak Codex usage, and description length.
- Submission packet exports copy-ready markdown.
- Markdown run logs document the product grill, build grill, chair vote, and verification.

## What Is Heuristic

Demo Gatekeeper checks URL format and access-risk language. It does not crawl links or verify that a remote site is live. That is intentional because the MVP is a static browser app and should not overclaim external validation.

## How Codex Was Used

Codex interpreted the submission requirements, ran a two-agent grill session, compared candidate MVPs, voted on the build scope, implemented the static app, created documentation, wrote local smoke tests, and prepared submission-ready copy.

## Judge Path

1. Open the public demo URL.
2. Review the seeded example.
3. Inspect the Gate Check panel.
4. Change a URL to `localhost` or switch access model to login to see failures.
5. Copy the generated submission packet.
