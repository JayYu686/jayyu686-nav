---
name: jayyu-nav-functional-ui-upgrade
description: Improve this Astro 6 navigation site from both functionality and visual UI. Use when user asks for feature enhancements, interaction optimization, page redesign, usability polishing, or conversion-quality front-end iteration.
---

# JayYu Nav Design Skill

## Purpose

This skill guides end-to-end improvements for this website from two synchronized tracks:

1. Functional track: information architecture, discoverability, filtering/search, interaction logic, multilingual consistency, and maintainability.
2. Visual UI track: layout hierarchy, typography, color system, component consistency, motion, responsiveness, and accessibility.

Default product direction for this project:
- Visual style: Apple-like minimalism (clean hierarchy, restrained accents, high legibility, calm motion).
- Execution priority: balanced (function and UI evolve together).
- Data policy: schema changes are allowed when they clearly improve product behavior or maintainability.

Target stack:
- Astro 6
- TypeScript
- Astro Content Collections
- Native CSS
- Native JavaScript

## Input Contract

Before implementation, extract or ask for these constraints:

1. Goal type: `small polish` / `feature expansion` / `full redesign`.
2. Priority: `function-first` / `ui-first` / `balanced`.
3. Scope: specific page/component or full site.
4. Brand direction: desired mood, color preference, reference examples.
5. Delivery constraints: deadline, risk tolerance, whether data structure can change.

If user does not specify, default to:
- balanced
- Apple-like minimal visual evolution (not a total rewrite)
- schema change allowed with migration note + backward compatibility check

## Workflow

### Step 1: Baseline Audit (Read-Only)

Collect context from:
- `src/pages/index.astro`
- `src/pages/en/index.astro`
- `src/components/*.astro`
- `src/i18n/*.ts`
- `src/content/resources/resources.json`
- `README.md`

Produce a compact baseline with:
1. Current user flows and interaction states.
2. Existing UI tokens/patterns and component reuse level.
3. Main friction points (function) and visual weaknesses (UI).
4. Known technical constraints (SSR/static, data schema, i18n).

### Step 2: Dual-Track Plan

Create an action plan split into two tracks.

Functional track checklist:
1. Search/filter precision and zero-state quality.
2. Navigation efficiency (category jump, subcategory behavior, keyboard path).
3. Data display quality (labels, metadata clarity, recency/popularity logic).
4. i18n consistency and fallback behavior.
5. Edge-case handling and progressive enhancement.

Visual UI track checklist:
1. Typography scale and hierarchy clarity.
2. Color contrast and semantic tokenization.
3. Layout rhythm (spacing, alignment, card density).
4. Motion strategy (meaningful, not noisy; reduced-motion support).
5. Mobile-first and breakpoint behavior.

### Step 3: Decision Branching

Branch A: user requests quick iteration
- Implement minimal high-impact changes first.
- Avoid schema changes unless blocked by current structure.
- Prefer CSS token adjustments + small interaction improvements.

Branch B: user requests stronger product upgrade
- Refactor components where needed.
- Allow moderate structural adjustments.
- Ensure reusable primitives and clearer state boundaries.

Branch C: user requests bold visual direction
- Define explicit visual concept before coding.
- Build a coherent token system first, then apply to components.
- Keep functional behavior stable while refreshing style.

### Step 4: Implement in Small Safe Patches

1. Edit smallest necessary files.
2. Keep compatibility with existing filters/i18n; if schema changes are used, document migration impact and fallback handling.
3. Add only concise comments for non-obvious logic.
4. Preserve accessibility semantics (`aria-*`, keyboard, focus-visible).

If schema is changed, include:
1. Updated typing/schema definitions.
2. Data migration note in `README.md`.
3. Compatibility strategy for old data during transition.

### Step 5: Validate

Run checks:
1. `npm run build`
2. Verify Chinese and English pages both render and filter correctly.
3. Verify desktop + mobile behavior.
4. Verify no regression in search, category filter, recent updates/recent visits (if present).

### Step 6: Deliverable Format

When reporting results, output:
1. What changed (functional + UI).
2. Why it improves user experience.
3. File-level references.
4. Residual risks or follow-up opportunities.

## Quality Gates

A change is complete only if all pass:

1. Functional correctness:
- Filters/search/navigation states are coherent.
- No broken i18n labels or category mapping.

2. Visual coherence:
- One clear visual direction; no mixed styles.
- Stable spacing scale and component consistency.

3. Accessibility:
- Keyboard reachable controls.
- Visible focus state.
- Reasonable contrast.
- Reduced motion respected where animated.

4. Performance and maintainability:
- No unnecessary script bloat.
- Reusable style tokens/components preferred over ad-hoc patches.

## Anti-Patterns to Avoid

1. Untracked schema changes without migration note and compatibility check.
2. Large all-in-one rewrites for small requests.
3. Decorative effects that reduce readability.
4. Introducing inconsistent naming between zh/en content.
5. Breaking existing category/subcategory behavior.

## Reusable Prompt Starters

1. "Use jayyu-nav-functional-ui-upgrade in balanced mode with Apple-like minimal style to improve homepage hierarchy and filter usability."
2. "Use jayyu-nav-functional-ui-upgrade to redesign cards and controls with calmer motion, better spacing rhythm, and stronger readability."
3. "Use jayyu-nav-functional-ui-upgrade to upgrade mobile interaction and subcategory navigation while preserving desktop efficiency."
4. "Use jayyu-nav-functional-ui-upgrade and allow schema improvements if needed; include migration notes in README."
5. "Use jayyu-nav-functional-ui-upgrade for a quick high-impact polish pass focused on function + UI balance."
