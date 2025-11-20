# Prompt Architect v2.3.0 — Threewire Systems

*A spec‑only scaffolding that turns Agile habits (stories, AC, Gherkin) into reliable prompts.*

**Audience:** mixed technical/non‑technical. **Tone:** plain English. **Output usage:** copy‑paste into ChatGPT (or similar).

---

## 1) Quick Start

### Choose a version

- **Lite** – fastest, minimal, no policy toggles. Use for agendas, short specs, emails, simple lists.
- **Full** – adds guardrails (PII/PHI masking, CUI markings), verification scaffolding, and iteration notes. Use for security/compliance/customer deliverables, or anything you’d normally pair with acceptance criteria and tests.
- **Minimal Scaffold** – a context-tagged shell with no intake gate. Use when you already know the essentials and just need a clean spec to drop into CLI agents or Codex.

### Workflow (both versions)

1. Answer the **Intake Gate** (Objective, Audience & Format, Inputs) or say “use defaults.”
2. Wait for the agent to acknowledge: **“ACK: intake complete.”** Without a complete intake, it will not draft.
3. The scaffold returns a **Spec Overview**, a **Final Prompt Blueprint**, Quick Tests, and a Verification Plan (plus Iteration Notes & Explain Why in Full).
4. Copy/paste the Final Prompt Blueprint into a **new chat** to run it. Iterate with diff‑only feedback using natural triggers like “revise”, “add X”, or “remove Y.”

**Strict Mode:** Enabled by default. It enforces the intake gate, non‑execution guarantee, audit trace, and fail‑closed behaviour.

---

### Minimal Scaffold

The Minimal Scaffold is a SPEC-only template that keeps the familiar `<role> <goal> <context> <inputs> <tasks> <output_format> <guardrails>` tags but strips out the intake gate, revision logic, and helper loops. It lives in `templates/prompt-scaffold-minimal.md`.

Use it when you are driving Prompt Architect from CLI runners, Codex/Amara agents, or scripted workflows where you already know the objective, audience, and inputs. Fill in each tag manually (or via automation), paste the result into your model, and run it without any back-and-forth intake.

Lite and Full remain the right choice when you want built-in intake, audit traces, feedback handling, or policy toggles. The Minimal Scaffold simply gives you a fast, non-interactive shell that still honors the same tagged structure tools can lint or reuse.

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


## 8) Archive & Recipes

**Archive** – Deep research assessments live in `/assessments/`. Each file follows the pattern `<repo>-assessment-v<version>.md` and contains a comprehensive report with scorecards, UX plans, and recommendations. Example: [prompt-architect-assessment-v2.3.0](assessments/prompt-architect-assessment-v2.3.0.md).

### Recipes

Use these **Narrative Asks** with **Prompt Architect — Lite or Full**.  
Tip: When Architect asks its 3 intake questions, paste the recipe’s block as your answer.

#### Recipe 1 — Deep Research: Repository Assessment (GitHub)

**Purpose**: Evidence-based, static assessment of a GitHub repo with scorecard, UX test plan, and tiered recommendations.

**Narrative Ask**  
Objective: Produce a static, evidence-based assessment of a GitHub repository suitable for leadership and engineers. Include: (1) purpose restatement, (2) Fit-to-Ask verdict (Yes/No/Partial) with 2–4 evidence bullets, (3) AI Agent Capability Scorecard (0–5) with Score/Why/Evidence/Action≤3, (4) UX Walkthrough Test Plan (≥12 scenarios with steps, expected, data to capture, acceptance), (5) end‑user intuitiveness + Lite Disclosure Matrix, (6) feedback/memory/audit review (current→target→gaps), (7) tiered improvements (Minor/Moderate/Major/Full Redesign) with impact/complexity/risks/migration, (8) verification plan and references.  
Audience & Output format: Senior engineer & product owner; Markdown report.  
Inputs available:
- repo_url: `<PASTE GITHUB REPO URL>`
- branch: `main`
- connectors: GitHub (read‑only).  
Notes: Static analysis only (no code execution). Cite non-obvious claims to specific files/lines; quotes ≤25 words. Record default branch + latest commit hash/date.

**Connectors used**: GitHub  
**Scope**: Static analysis only; no builds/runners.

#### Recipe 2 — Requirements Synthesis from a Google Drive Folder

**Purpose**: Turn a folder of notes/specs into a single, source‑cited PRD draft.

**Narrative Ask**  
Objective: Synthesize a concise Product Requirements Draft (PRD) from a Google Drive folder of notes/specs. Output sections: Problem, Users/Jobs, In/Out of Scope, Flows, Acceptance Criteria, Risks, Open Questions, References. Inline‑cite each claim to Drive file + heading.  
Audience & Output format: Product/engineering leads; Markdown PRD.  
Inputs available:
- drive_folder: `<PASTE DRIVE FOLDER LINK/ID>`
- connectors: Google Drive (read‑only).  
Notes: Static synthesis only; preserve ambiguity as “Unknowns” with how‑to‑verify steps. Quote ≤25 words; otherwise paraphrase.

**Connectors used**: Google Drive  
**Scope**: Read‑only docs; no external tools.

#### Recipe 3 — Local Files Quick Audit (Security & Licenses)

**Purpose**: Scan a local file set (zipped or uploaded) for obvious security smells and license headers; produce a punch‑list.

**Narrative Ask**  
Objective: Perform a static quick audit of uploaded project files for (a) obvious security smells (hard‑coded secrets, wide CORS, missing HTTPS mentions), and (b) OSS license headers/presence. Output a punch‑list with severity (H/M), file:line cites, and a short “How to verify” step per finding.  
Audience & Output format: Engineering; Markdown checklist.  
Inputs available:
- local_files: (uploaded archive or files in chat)
- connectors: Local Files.  
Constraints: Static scan only; no execution. Prefer primary file cites. Mask sensitive strings.

**Connectors used**: Local Files  
**Scope**: Static content inspection only.

#### chatgpt.com Scope Guardrails (applies to all recipes)

- ✅ **Allowed**: GitHub, Google Drive, Local Files connectors (read‑only); limited web lookups of primary standards.  
- 🚫 **Exclude**: Custom runtimes, code execution, background jobs, long‑running crawlers, unsupported external services.  
- 🔒 **Privacy**: Redact PII/PHI; best‑effort masking only.  
- 🤖 **Static only**: No builds, no tests, no infra changes — analysis and synthesis are fine.

#### Why a Narrative Ask?

- **Novices**: A short paragraph is easier; Architect turns it into a **Final Prompt Blueprint**.  
- **Power users**: Keep predefined templates in `/templates/`.
