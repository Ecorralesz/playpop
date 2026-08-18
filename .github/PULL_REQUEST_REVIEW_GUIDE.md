# PlayPop Pull Request Review Guide

## Target workflow

`feature/*` or `fix/*` → Pull Request → `develop` → release PR → `main`

Do not add an intermediate integration branch. `develop` is the integration branch.

## Required automated checks

Every PR targeting `develop` should pass:

1. `npm ci`
2. `npm run lint`
3. `npm run format:check`
4. `npm run build`

## AI review checklist

The reviewer should focus on actionable problems introduced by the PR:

- correctness and regressions
- security and accidental secret exposure
- React state/effect and routing problems
- broken mobile/responsive behavior
- accessibility regressions
- maintainability and unnecessary duplication
- consistency with existing PlayPop components and design patterns
- missing validation or error handling

Do not block a PR for personal style preferences when lint/format already pass.

## Merge policy

### Phase 1 — supervised

AI reviews the PR and CI runs automatically. A human performs the final merge into `develop` after all required checks pass and blocking review findings are resolved.

### Phase 2 — limited auto-merge

After the process has proven reliable, auto-merge may be enabled only for low-risk PRs when:

- all required checks pass;
- there are no unresolved blocking review findings;
- the PR targets `develop`;
- the PR does not modify secrets, authentication, deployment configuration, billing/payment code, or branch/workflow security settings.

High-risk changes always require human approval.

## Release policy

Changes reach `main` only through a release PR from `develop`. Production should never receive direct feature-branch pushes.
