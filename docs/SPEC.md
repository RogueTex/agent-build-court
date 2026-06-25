# Demo Gatekeeper Spec

## Problem

Hackathon builders often lose judging points because their demos are not directly accessible. The submission form explicitly warns that judges may only evaluate submitted materials and may not log in, request access, install anything, or run local/private URLs.

## Target User

A Codex Hackathon participant preparing a final submission under time pressure.

## Product

Demo Gatekeeper is a browser-only static app that checks the shape of a submission and generates a copy-ready judge packet.

## Core Flow

1. Entrant fills in project title, build description, demo URL, repo URL, backup URL, Codex usage, status, limitations, and judge path.
2. App runs deterministic checks:
   - title present
   - build description is 2-4 sentences
   - demo URL is HTTP(S)
   - demo URL is not local/private
   - repo/artifact URL is present
   - access model is no-login
   - Codex usage explicitly mentions Codex
   - current status is filled
   - risky access language is flagged
3. App displays a readiness score and checklist.
4. App generates markdown that can be pasted into the submission form.

## Non-Goals

- No live network validation.
- No login.
- No database.
- No AI API call.
- No install requirement for judges.

## Success Criteria

- Runs from a static public URL.
- Judge can understand the product in under 10 seconds.
- User can copy a submission packet in under 2 minutes.
- README and run logs explain how Codex shaped the project.
