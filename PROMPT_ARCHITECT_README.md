# Prompt Architect v2 — Threewire Systems
*A spec-only scaffolding that turns Agile habits (stories, AC, Gherkin) into reliable prompts.*

**Audience:** mixed technical/non‑technical. **Tone:** plain English. **Output usage:** copy‑paste into ChatGPT (or similar).

---

## 1) Quick Start
**Choose a version**  
- **Lite**: fastest, minimal, no policy toggles. Use for agendas, short specs, emails, simple lists.  
- **Full**: more guardrails (PII/PHI masking, CUI markings), verification scaffolding. Use for security/compliance/customer deliverables, or anything you’d normally pair with AC + tests.

**Workflow (both versions)**  
1. Answer the **Intake Gate** (or say “use defaults”).  
2. The scaffold returns a **Final Prompt** you can copy/paste into a new chat.  
3. Iterate with **diff‑only feedback** and use **Quick Tests + Verification**.

---

## 2) Section Reference — Lite (Spec‑Only, Minimal)
The Lite scaffold produces a small **spec** plus a **Final Prompt** with these sections:
`<role> <task> <context> <constraints> <instructions> <output_format> <quality_checks>`

| Section | Purpose | What to write | Example |
|---|---|---|---|
| `<role>` | Sets the model’s POV so outputs match your expectations. | Job/hat you want the model to wear. | `You are a release manager for an enterprise .NET API.` |
| `<task>` | States the single deliverable to produce now. | Short imperative goal; avoid multi‑asks. | `Produce a rollout plan with milestones and a risk table.` |
| `<context>` | Supplies facts the model should assume. | Who, environment, inputs, tools/browsing, constraints, success criteria. | `GOAL: minimize rework; AUDIENCE: mixed; INPUTS: link/none; TOOLS/BROWSING: Allowed; SUCCESS: tables present, tests included.` |
| `<constraints>` | Scopes the output so it’s reviewable. | Word limits, formats, versions, forbidden items. | `≤600 words; Markdown tables only; avoid speculation.` |
| `<instructions>` | Step‑by‑step method to follow. | Mini recipe the model must execute. | `Normalize inputs → resolve conflicts → produce sections → add 3 quick tests.` |
| `<output_format>` | Final shape for copy/paste. | Required sections, exact table columns. | `Return 2 tables: Milestones and Risks (Risk, Likelihood, Impact, Mitigation, Owner).` |
| `<quality_checks>` | Built‑in “Definition of Done.” | Review gates the model must self‑confirm. | `Coverage; traceability to inputs; clarity; verification steps; prioritized next actions.` |

**Lite meta blocks (appear in the spec, not in the output deliverable):**

- `<mode>` — **Purpose:** Enforces *spec‑only* behavior (no domain work).  
  **Example:**  
  ```md
  <mode>
  SPEC_ONLY=true
  Do not perform or simulate the user’s task.
  </mode>
  ```

- `<intake_gate>` — **Purpose:** Blocks drafting until essentials are present.  
  **Ask exactly:** Objective? Audience & format? Inputs (paste/none)?

- `<defaults>` — **Purpose:** Safe fallbacks when user says **“use defaults.”**  
  **Tip:** Great for rapid demos and mixed audiences.

- `<drafting_protocol>`, `<output_contract>`, `<self_check>` — **Purpose:** Keep runs consistent; the model uses these as assembly instructions and a final checklist.

**Lite mini‑example**  
```md
<role>You are a scrum‑savvy prompt coach.</role>
<task>Generate a 30‑min agenda with timeboxes, owners, and decision prompts.</task>
<context>AUDIENCE: customer + dev team; INPUTS: none; TOOLS/BROWSING: Allowed</context>
<constraints>≤250 words; Markdown list + 1 table; avoid jargon.</constraints>
<instructions>List agenda items with timeboxes → add owner per item → include decision prompts → finish with decision log table (3 columns).</instructions>
<output_format>Agenda list + "Decision Log" table (Decision | Owner | Outcome).</output_format>
<quality_checks>Coverage; clear owners; decision prompts present; decision log included.</quality_checks>
```

---

## 3) Section Reference — Full (Spec‑Only)
The Full scaffold adds policy toggles and richer verification. It still produces a **Final Prompt** with the same core sections as Lite, plus optional **Policy** and extra guidance.

### 3.1 Core Final Prompt Sections
(Identical semantics to Lite — see table above.) The Full version **also** expects:

| Section | Extra power in Full | Example |
|---|---|---|
| `<examples>` | Include **[SAMPLE]** only (no real PII/PHI). Anchors structure/style. | `<examples>[SAMPLE] Provide a table: 'Item', 'Owner', 'Due', 'Notes'</examples>` |
| `<quality_checks>` | May include policy conformance checks. | `PII leak check = zero; CUI banners present when enabled.` |

### 3.2 Policy Block (toggles)
| Field | Purpose | What to write | Example |
|---|---|---|---|
| `pii_phi_masking` | Mask/tokenize sensitive fields in downstream outputs. | `true` or `false` | `pii_phi_masking=true` |
| `pii_mask_style` / `pii_mask_config` | Choose masking style & patterns. | Keep last‑4 where useful. | `email: "e***@domain.tld"` |
| `cui_marking` | Require CUI banners/portion marks; fail‑closed on uncertainty. | `true` or `false` | `cui_marking=true` |
| `cui_*` settings | Banner text and enforcement behavior. | Organization‑specific. | `cui_banner="CUI"; cui_uncertainty_behavior="fail_closed"` |

**When to enable:** Any customer‑visible, regulated, or data‑sensitive work.

### 3.3 Additional Full Meta Blocks
| Block | Purpose | Example Snippet |
|---|---|---|
| `<feedback>` | Defines a light **Critique → Revise → Confirm** loop. | `If user types "revise", update Final Prompt only unless assumptions changed.` |
| `<session_memory>` | (Default OFF) Avoids leaking secrets; single‑session only. | `enabled=false` |
| `<output_contract>` | Enforces strict order and fencing of the Final Prompt. | Requires a line: **“Copy/paste this Final Prompt into a new chat to execute.”** |
| `<quality_checks>` (meta) | Full set of checks including policy conformance. | `✔ Examples marked [SAMPLE]; zero PII/PHI leaks when masking on.` |
| `<trace_json>` | Optional audit tail for process traceability. | `{ "spec_only": true, "timestamp_pt": "..." }` |

**Full mini‑example (EAMS‑A rollout)**  
```md
<role>You are a senior delivery lead and release manager.</role>
<task>Produce a rollout plan with milestones, a M/H risk table, and a Gherkin‑mapped test matrix.</task>
<context>GOAL: safe cutover; OBJECTIVE: plan+tests now; INPUTS: none; TOOLS/BROWSING: Allowed; CONSTRAINTS: ≤700 words; SUCCESS: includes rollback + canary.</context>
<constraints>No refresh tokens; Angular 19 SPA + .NET 4.8 API; environments: Dev→Test→Preprod→Prod.</constraints>
<instructions>Milestones by environment → risk table (Risk | Likelihood | Impact | Mitigation | Owner) → test matrix (Given/When/Then → endpoint) → verification steps.</instructions>
<examples>[SAMPLE] Risk row: Token expiry drift | M | H | Sync clocks + tighten leeway | Platform Eng</examples>
<output_format>3 sections with headings: Milestones, Risks, Test Matrix.</output_format>
<quality_checks>Coverage; traceability to constraints; G/W/T map includes endpoints; rollback present; policy toggles honored.</quality_checks>
```

---

## 4) Filling Each Field (Cheat‑Sheet)
Use these **copy‑ready** lines as starting points.

- **Role** — “You are a `<job/hat>` …”  
  - *Lite:* `You are a facilitative meeting designer.`  
  - *Full:* `You are a compliance‑aware solutions architect.`

- **Task** — “Produce `<one deliverable>` now …”  
  - *Lite:* `Generate a 30‑min customer agenda with decision prompts.`  
  - *Full:* `Draft a certificate rollout checklist with rollback and owners.`

- **Context** — “GOAL, OBJECTIVE, AUDIENCE, INPUTS, TOOLS/BROWSING, CONSTRAINTS, SUCCESS CRITERIA.”  
  - *Lite:* `AUDIENCE: mixed; INPUTS: none; TOOLS/BROWSING: Allowed; SUCCESS: agenda + decision log.`  
  - *Full:* `GOAL: auditable change; OBJECTIVE: plan+tests; INPUTS: mJAD→EAMS‑A; CONSTRAINTS: no refresh tokens; SUCCESS: risk table + G/W/T.`

- **Constraints** — limits and rules.  
  - `≤600 words; tables only; avoid speculation; include rollback.`

- **Instructions** — recipe/steps.  
  - `Normalize inputs → resolve conflicts → produce sections → add quick tests → verification.`

- **Output Format** — exact shape.  
  - `Tables with columns: Item | Owner | Due | Notes.`

- **Quality Checks** — DoD.  
  - `Coverage; traceability; clarity; verification; prioritized next actions.`

- **Examples** (Full only) — show structure, **never** real data.  
  - `[SAMPLE] Endpoint row: GET /api/users?page=1 → 200 OK includes pagination fields.`

- **Policies** (Full only) — enable when needed.  
  - `pii_phi_masking=true; cui_marking=true`

---

## 5) Choosing Lite vs Full
- Start **Lite** for speed. If outputs vary, stakes increase, or you need policy controls → **Full**.
- Rule of thumb: If you’d normally write **acceptance criteria + a test plan**, choose **Full**.

---

## 6) Examples from Our Work
- **EAMS‑A Migration (Full):** rollout plan + M/H risks + G/W/T → endpoints; constraint: **no refresh tokens**.  
- **Prod SSL Certificates (Lite):** request → install → verify (`openssl`), include rollback and owners; ≤300 words.  
- **Weekly Agenda (Lite):** timeboxes, owners, decision prompts, and a decision log table.

---

## 7) Tips & Anti‑Patterns
**Craig’s Tips**  
- Fence code/logs/long quotes with triple backticks.  
- Ask for **downloadable files** when copy/paste is flaky.  
- Use Projects/threads; keep artifacts grouped and named.  
- Ask the model to list **facts / assumptions / unknowns** before finalizing.  
- Draft prompts in an editor to avoid accidental submit and to version your asks.

**Avoid**  
- “Do everything about X” (scope balloon)  
- “Make it detailed” (without constraints)  
- Missing inputs (“use your best guess”)  
- Unverifiable asks (no success criteria)

---

## 8) Appendix — Full & Lite Templates
### Lite (Spec‑Only, Minimal)
```md
<!-- PROMPT ARCHITECT — LITE (SPEC-ONLY, MINIMAL) -->
<mode>SPEC_ONLY=true …</mode>
<role>…</role>
<task>…</task>
<context>…</context>
<constraints>…</constraints>
<instructions>…</instructions>
<output_format>…</output_format>
<quality_checks>…</quality_checks>
```

### Full (Spec‑Only)
```md
<!-- PROMPT ARCHITECT — FULL (SPEC-ONLY) -->
<mode>SPEC_ONLY=true …</mode>
<policy>pii_phi_masking=false; cui_marking=false; …</policy>
<role>…</role>
<task>…</task>
<context>…</context>
<constraints>…</constraints>
<instructions>…</instructions>
<examples>[SAMPLE] …</examples>
<output_format>…</output_format>
<quality_checks>…</quality_checks>
<feedback>…</feedback>
<session_memory>enabled=false …</session_memory>
<output_contract>…</output_contract>
<quality_checks>…</quality_checks>
<trace_json>{ … }</trace_json>
```

---

**Version:** v2.2.0 (2025-11-07) • Maintainers: Craig Moreno • License: MIT (suggested)
