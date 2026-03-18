---
name: dp-blast-spec-execution
description: "Use when implementing DP Blast features with spec-driven phased delivery, acceptance criteria checks, feature tracking, phase gates, and scope control. Keywords: dp blast, phased spec, acceptance criteria, phase tracker, mvp scope."
---

# DP Blast Spec Execution Skill

## Goal

Implement work strictly by phase, with clear scope boundaries and measurable acceptance criteria.

## Inputs to Read First

1. docs/specs/dp-blast-phased-spec.md
2. docs/centralized-context.md

## Core Workflow

1. Identify the requested feature and map it to a single phase.
2. Confirm in-scope vs out-of-scope items for that phase.
3. Define or restate acceptance checks before coding.
4. Implement only what is required to pass those checks.
5. Validate behavior with tests or manual checks tied to the acceptance criteria.
6. Update docs/centralized-context.md phase status or feature notes when progress changes.

## Hard Rules

- Do not pull later-phase scope into the current phase.
- If new work is requested that belongs to a later phase, document and defer.
- Use explicit API/data contracts where frontend and backend meet.
- Treat validation and failure handling as first-class scope, not optional polish.

## Output Expectations

For each task handled with this skill, provide:

1. Phase mapping
2. In-scope implementation list
3. Acceptance criteria checklist with pass/fail result
4. Any deferred items mapped to future phase

## Phase Checklist Template

```md
## Phase X Task Execution

### Feature

### In Scope

### Out of Scope

### Acceptance Checks

- [ ] Check 1
- [ ] Check 2
- [ ] Check 3

### Validation Evidence

### Deferred Items
```
