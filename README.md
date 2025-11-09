# Prompt Architect v2.3.0 — Threewire Systems

*A spec‑only scaffolding that turns Agile habits (stories, AC, Gherkin) into reliable prompts.*

**Audience:** mixed technical/non‑technical. **Tone:** plain English. **Output usage:** copy‑paste into ChatGPT (or similar).

---

## 1) Quick Start

### Choose a version

- **Lite** – fastest, minimal, no policy toggles. Use for agendas, short specs, emails, simple lists.
- **Full** – adds guardrails (PII/PHI masking, CUI markings), verification scaffolding, and iteration notes. Use for security/compliance/customer deliverables, or anything you’d normally pair with acceptance criteria and tests.

### Workflow (both versions)

1. Answer the **Intake Gate** (Objective, Audience & Format, Inputs) or say “use defaults.”
2. Wait for the agent to acknowledge: **“ACK: intake complete.”** Without a complete intake, it will not draft.
3. The scaffold returns a **Spec Overview**, a **Final Prompt Blueprint**, Quick Tests, and a Verification Plan (plus Iteration Notes & Explain Why in Full).
4. Copy/paste the Final Prompt Blueprint into a **new chat** to run it. Iterate with diff‑only feedback using natural triggers like “revise”, “add X”, or “remove Y.”

**Strict Mode:** Enabled by default. It enforces the intake gate, non‑execution guarantee, audit trace, and fail‑closed behaviour.

---

## 2) Experimental Features

The following features are available but may have side effects. Confidence levels indicate how reliable each is in practice.

| Feature | Confidence | Pros | Cons / Risks | Default |
|---|---|---|---|---|
| CUI Marking | Medium | Compliance cues | Formatting burden | Off |
| PII/PHI Masking | Medium | Reduces leakage | Pattern misses edge cases | Off |
| Natural‑language Revisions | High | Easier iteration | May misfire on vague asks | On |
| Downstream Ephemeral Memory | Medium | Convenience | Context bleed if reused improperly | On |
| Audit Trace JSON | High | Provenance | Slight token cost | On |
| Strict Mode | High | Safety & consistency | Stricter refusals | On |

---

## 3) Section Reference (Lite)

The Lite scaffold produces a concise **Spec Overview** and a **Final Prompt Blueprint** with these sections:

`<role> <task> <context> <constraints> <instructions> <output_format> <quality_checks>`

| Section | Purpose | What to write | Example |
|---|---|---|---|
| `<role>` | Sets the model’s POV so outputs match your expectations. | Job/hat you want the model to wear. | `You are a release manager for an enterprise .NET API.` |
| `<task>` | States the single deliverable to produce now. | Short imperative goal; avoid multi‑asks. | `Produce a rollout plan with milestones and a risk table.` |
| `<context>` | Supplies facts the model should assume. | Who, environment, inputs, constraints, success criteria. | `AUDIENCE: mixed; INPUTS: none; SUCCESS: tables present, tests included.` |
| `<constraints>` | Scopes the output so it’s reviewable. | Word limits, formats, forbidden items. | `≤600 words; Markdown tables only; avoid speculation.` |
| `<instructions>` | Step‑by‑step method to follow. | Mini recipe the model must execute. | `Normalize inputs → resolve conflicts → produce sections → add 3 quick tests.` |
| `<output_format>` | Final shape for copy/paste. | Required sections, exact table columns. | `Return 2 tables: Milestones and Risks (Risk, Likelihood, Impact, Mitigation, Owner).` |
| `<quality_checks>` | Built‑in “Definition of Done.” | Review gates the model must self‑confirm. | `Coverage; traceability to inputs; clarity; verification steps; prioritized next actions.` |

**Lite meta blocks (appear in the spec, not in the Final Prompt Blueprint):**

- `<mode>` — **Purpose:** Enforces spec‑only, strict mode, and the non‑execution guarantee.
- `<intake_gate>` — **Purpose:** Blocks drafting until all three essentials are present; no objective default.
- `<defaults>` — **Purpose:** Safe fallbacks when the user says **“use defaults.”**
- `<drafting_protocol>`, `<output_contract>`, `<feedback>`, `<helper_examples_when_objective_missing>`, `<trace_json>` — **Purpose:** Keep runs consistent, handle revisions, and capture audit data.

---

## 4) Section Reference (Full)

The Full scaffold includes the same core sections and adds:

| Section | Extra power in Full | Example |
|---|---|---|
| `<examples>` | Include **[SAMPLE]** only (no real PII/PHI). Anchors structure/style. | `<examples>[SAMPLE] Provide a table: 'Item', 'Owner', 'Due', 'Notes'</examples>` |
| `<quality_checks>` | May include policy conformance checks. | `PII leak check = zero; CUI banners present when enabled.` |
| `<trace_json>` | Always emitted for audit. | `{ "run_id": "...", "timestamp": "...", ... }` |
| `<iteration_notes>` | Suggests targeted improvements for the next revision. | `Try adding a risk table; adjust word limit.` |
| `<explain_why>` | Explains the rationale behind the blueprint for user learning. | `This structure maximizes clarity and repeatability.` |

The Full version also supports policy toggles for PII masking and CUI marking, a more detailed verification plan, and an iteration loop using natural‑language triggers.

---

## 5) Tips & Anti‑Patterns

- Fence code/logs/long quotes with triple backticks.
- Ask for downloadable files when copy/paste is flaky.
- Use Projects/threads; keep artifacts grouped and named.
- Ask the model to list **facts, assumptions, and unknowns** before finalizing.
- Draft prompts in an editor to avoid accidental submit and to version your asks.

**Avoid**:
- “Do everything about X” (scope balloon)
- “Make it detailed” (without constraints)
- Missing inputs (“use your best guess”)
- Unverifiable asks (no success criteria)

---

## 6) Examples

- **EAMS‑A Migration (Full):** rollout plan + M/H risks + G/W/T → endpoints; constraint: **no refresh tokens**.
- **Prod SSL Certificates (Lite):** request → install → verify (`openssl`), include rollback and owners; ≤300 words.
- **Weekly Agenda (Lite):** timeboxes, owners, decision prompts, and a decision log table.

---

## 7) Version

**Version:** v2.3.0 (2025‑11‑09)

**Maintainers:** Craig Moreno

**License:** MIT (suggested)

---

For detailed templates, see the files in `templates/`. For examples, see `examples/`. The trace log schema is in `docs/trace-schema.json`. The hashing script for auditing is in `scripts/hash-blueprint.ts`.
