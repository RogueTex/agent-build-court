# Demo Gatekeeper

Demo Gatekeeper is a no-login static MVP for Codex Hackathon builders. It helps package a judge-ready submission, flags obvious access risks, checks the 2-4 sentence description requirement, and exports copy-ready markdown for the submission form.

## Demo

Public demo URL: https://raghoo.me/demo-gatekeeper/

Repository URL: https://github.com/RogueTex/demo-gatekeeper

## Why This Project

The submission form says judges can only evaluate direct, judge-accessible materials and may not log in, request access, install anything, or run local/private URLs. It also says Codex usage is the biggest scoring category. Demo Gatekeeper turns those requirements into a working product.

## How Codex Was Used

Codex helped interpret the submission form, run a two-agent grill/vote, compare candidate MVPs, create markdown run records, choose the safest 30-minute scope, implement the static app, refine the UI, and prepare submission-ready text.

## Status

Working static MVP. Link checks are deterministic format and access-risk checks, not live network verification. The app has no backend, no login, no database, and no dependency install.

## Quick Start

```bash
npm run check
npm start
```

Then open `http://127.0.0.1:4173`.

## Files

- `index.html` - app shell
- `styles.css` - responsive UI
- `app.js` - scoring, validation, preview, and export
- `package.json` - local scripts
- `docs/pages-workflow.yml.example` - optional GitHub Pages workflow template
- `docs/SPEC.md` - product spec
- `docs/JUDGING.md` - judge-facing notes
- `docs/runs/run-01-product-grill.md` - product critique and vote
- `docs/runs/run-02-build-grill.md` - build critique and vote
- `docs/runs/run-03-chair-vote.md` - final MVP spec
- `docs/runs/run-04-verification.md` - local verification record
- `docs/runs/run-05-repo-grill.md` - final repo acceptance vote
- `docs/runs/run-06-deployment.md` - public GitHub Pages deployment check
- `SUBMISSION_DRAFT.md` - copy-ready form draft with public links

## Local Preview

Open `index.html` in a browser, or serve the folder with any static server.

## Deployment

Deploy these static files to any public static host such as GitHub Pages, Netlify Drop, Cloudflare Pages, or Vercel. The submitted demo link must be public and must not require login or access approval.
