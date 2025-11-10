# Prompt Architect (bodyhigh/prompt-architect) – Comprehensive Assessment

## 1. Executive Summary

Prompt Architect is an open‑source prompt design assistant built to help people craft **spec‑only prompts** for large language models【6†L0-L4】.  It provides structured **“Full”** and **“Lite”** scaffolds inspired by Agile practices, encouraging users to supply goals, audience and inputs through an intake gate before generating a final prompt blueprint【6†L19-L27】.  The repository is documentation‑driven rather than code‑heavy; it comprises Markdown guides, templates and slides, with no executable logic or tests.  In static analysis we found that Prompt Architect largely achieves its aim: it scaffolds complete, repeatable, safe prompts while preventing the model from executing tasks.  Guardrails (non‑execution guarantee, PII masking and CUI marking) enhance compliance; Quick Tests and a Verification Plan ensure consistency.  However, the tool has limited autonomy (no tool calls or retrieval); the feedback loop is user‑initiated; and long‑term memory or automated optimisation are absent by design.  Overall, Prompt Architect is fit to improve prompt clarity and reliability for mixed technical/non‑technical users, with strong compliance features and clearly defined boundaries.

## 2. Repo Snapshot

- **Default Branch** – `main`, version v2.2.0 as of **2025‑11‑07**【7†L207-L210】.
- **Latest Commit Hash** – `045d3ab3…` (Nov 7 2025)【7†L207-L210】.
- **Project Structure** – no source code; root contains:
  - **README.md** – full usage guide with Lite/Full prompt sections, policy toggles and quick start【6†L19-L27】【6†L75-L83】.
  - **prompt‑architect‑handout.md** – copy‑and‑paste templates for Lite/Full scaffolds【9†L6-L14】.
  - **Slides (`.marp.md` and `.html`)** – training deck explaining prompt engineering concepts【2†L15-L23】.
  - **No code directories** – no `/src`, `/tests` or build scripts; the project is entirely documentation.
  - **Configuration/Metadata** – policy flags (pii/phi masking, CUI) and defaults defined inside the template blocks【9†L89-L98】.
  - **License** – README notes MIT license but no separate file【7†L207-L210】.

## 3. Purpose

Prompt Architect’s purpose is to guide users through constructing high‑quality, spec‑only prompts.  It acts as a **prompt engineering coach**, asking the user to provide an objective, audience and inputs via an **Interactive Intake Gate**, then generating a **Final Prompt Blueprint** that instructs an AI assistant to perform the desired task【6†L11-L15】.  The design mirrors Agile user stories and acceptance criteria: the blueprint includes role, task, context, constraints, instructions and checks【6†L25-L31】.  The output of Prompt Architect is never the task result; it is a prompt specification intended to be pasted into a new chat with ChatGPT or another model【9†L53-L60】.  By enforcing structure and guardrails, the tool aims to minimise underspecified asks, reduce hallucinations and ensure compliance when handling sensitive data【6†L77-L83】.

## 4. Fit‑to‑Ask

**Verdict: Partial Yes.**  The solution meets most of the end‑user’s goals but leaves gaps:

- **Clarity & completeness** – The Intake Gate forces the user to supply objective, audience and inputs【9†L25-L33】; the scaffolds ensure the final prompt blueprint contains all necessary sections【6†L25-L31】.
- **Repeatability & quality** – By producing a structured final prompt with Quick Tests and a Verification Plan, the tool provides repeatable instructions and explicit success criteria【9†L45-L53】.
- **Safety & compliance** – Built‑in policy toggles allow PII masking and CUI marking; the non‑execution guarantee stops the model from doing the user’s work【9†L78-L87】.
- **Remaining gaps** – Prompt Architect does not automate retrieval or tool use; it lacks self‑optimisation or multiple feedback loops; PII patterns are static and might miss uncommon identifiers【9†L95-L103】.  The tool does not verify the quality of user inputs or iterate by itself.  Users still copy large prompts manually into chats.

| Intended Outcome | Current Capability | Gap |
|---|---|---|
| **Complete requirements** – no missing info | Intake Gate gathers objective, audience, inputs; scaffold covers role, context, constraints【9†L25-L33】【6†L25-L31】 | Relies on user quality; no external validation |
| **Consistent, quality outputs** – repeatable results | Final Prompt includes explicit constraints and success criteria【2†L35-L38】【9†L45-L53】 | Requires user to run separate chat; no automated iteration |
| **Safety & compliance** – no data leaks or misuse | PII/PHI masking, CUI marking toggles and non‑execution guarantee【9†L78-L87】【9†L89-L103】 | Pattern‑based masking may miss rare data; manual toggle needed |
| **Ease of use for novices** | Lite mode uses plain English and defaults【6†L1-L4】【6†L19-L27】 | Still requires copying long prompt; no GUI |
| **Efficient refinement & testing** | Quick Tests, Verification Plan and a light feedback loop【10†L152-L166】 | Only manual revision; no self‑critique or integration with eval tools |

## 5. AI Agent Capability Scorecard (0–5)

| Capability | Score | Rationale & Evidence | Action if ≤3 |
|---|---|---|---|
| **Task decomposition & planning** | **5** | The drafting protocol breaks the work into clear steps: compile Spec Overview, produce Final Prompt, list Quick Tests, provide Verification Plan【9†L44-L53】【10†L171-L179】.  This ensures the model follows a structured workflow. | None – robust. |
| **Tool use / orchestration** | **1** | The agent does not call external tools.  “TOOLS/BROWSING: Allowed” is merely descriptive and not executed【6†L25-L31】.  There is no function calling or retrieval. | Integrate function calls or allow simple retrieval if needed (major change). |
| **Short‑term memory / working context** | **3** | The prompt keeps session memory disabled and instructs the AI to compile all needed data within one turn【6†L89-L93】.  This prevents context bleed but also means no memory across turns. | Optionally enable session memory or let the agent carry minimal context (e.g., user preferences) across multiple interactions. |
| **Long‑term memory / retrieval & grounding** | **0** | No long‑term memory; each run starts from scratch【9†L31-L39】. | Provide integration with a knowledge base or allow the user to attach documents for retrieval. |
| **Knowledge integration (RAG)** | **1** | External knowledge can only be provided via user inputs.  The agent itself does not search or integrate information. | Extend to fetch additional context when allowed (e.g., summarise referenced documents). |
| **Autonomy level & guardrails** | **5** | Autonomy is intentionally limited: the agent stops at prompt drafting and refuses to execute tasks; non‑execution guarantee and deliverable detector provide strong guardrails【9†L78-L87】. | None – design choice. |
| **Safety (prompt injection, data leakage, abuse resistance)** | **4** | Guardrails include refusal if asked to perform tasks, pattern‑based PII masking, CUI marking, and fail‑closed instructions【9†L78-L87】【9†L95-L103】.  However, injection resilience relies on base model compliance. | Add automated self‑tests (e.g., red‑team injection checks) and expand masking patterns. |
| **Observability & telemetry** | **2** | The optional `trace_json` block provides audit information【10†L200-L209】.  No real‑time logs or metrics are sent externally. | Enable trace by default and integrate with logging pipelines. |
| **Evaluation loops & feedback ingestion** | **3** | Users can type “revise” to trigger an updated Final Prompt; the agent includes Iteration Notes and Explain Why【10†L158-L166】.  There is no automated self‑critique or iterative optimisation. | Add an internal critic–fixer loop to review the blueprint before presenting it. |
| **Extensibility & modularity** | **3** | The scaffold is modular: policy, defaults and instructions are defined in separate blocks that can be edited【6†L75-L83】【6†L87-L94】.  Yet there is no plugin system or configuration interface. | Provide a script or CLI to assemble prompts with toggled features; allow modular insertion of new sections. |
| **Configuration & environment management** | **2** | The environment is just the chat interface; there is no explicit runtime configuration.  The docs do not state which model to use; mismatches could cause inconsistent results. | Document recommended model (GPT‑4); provide a packaging script to deliver the prompt to API calls. |
| **Deployment & operations** | **4** | The templates are static; using them yields repeatable outputs if the user copies them correctly【2†L35-L38】.  Version numbers are tracked in README【7†L207-L210】. | Provide a CLI or small service to serve the prompts from version control, reducing copy/paste errors. |
| **Privacy & compliance** | **5** | The prompt includes toggles for PII/PHI masking, CUI marking and strict non‑execution.  It instructs to mask or redact sensitive data and to insert appropriate banners【9†L89-L103】【9†L100-L108】. | Update mask patterns over time; add a disclaimer clarifying that masking is best‑effort. |

## 6. End‑User Intuitiveness & Lite Disclosure

### Onboarding & Mental Model

The README states the tone is plain English and the audience is mixed technical/non‑technical【6†L1-L4】.  The Quick Start instructs users to choose Lite or Full, answer three questions and copy the resulting prompt into a new chat【6†L7-L15】.  The slides link Agile concepts to prompt engineering【2†L86-L94】, helping users grasp the mental model.  Defaults reduce friction by allowing “use defaults” for each intake question【9†L31-L39】.

### Lite Disclosure Matrix

| User Level | Info Exposed | Benefit | Risk | Mitigation | Trigger |
|---|---|---|---|---|---|
| **Novice** | Spec Overview, Final Prompt Blueprint, Quick Tests, Verification Plan | Provides enough info to run the task; uses plain language | Could overwhelm new users if the template is long | Use Lite mode, hide policy/trace, supply defaults【6†L19-L27】 | Default for casual tasks |
| **Intermediate** | As above + optional policy toggles and examples | More control over prompt constraints and compliance | May see unused toggles and get confused | Document how toggles work; instruct to ignore unused sections | Choose Full mode when stakes are higher |
| **Advanced/Compliance** | Full output incl. Assumptions, Unknowns, Trace JSON | Full transparency and audit trail | Verbose; might intimidate non‑experts | Provide an optional audit mode; separate trace in code block【10†L200-L209】 | Enable strict mode or CUI/PII flags |

## 7. UX Walkthrough Test Plan

Below is a high‑level test plan covering key scenarios. Each scenario lists steps, expected behaviour, data to capture and acceptance criteria.

### A. First‑run experience (Lite)
- **Steps:** Start a new chat; paste Lite prompt; answer all three intake questions (objective, audience/format, inputs).
- **Expected:** Agent acknowledges completion, then outputs Spec Overview, Final Prompt Blueprint, Quick Tests and Verification Plan.
- **Data to capture:** Entire AI response; confirm order and headings.
- **Acceptance:** All sections present; role and task reflect objective; no missing context; final prompt includes copy‑paste instructions.

### B. Missing info triggers gate
- **Steps:** Provide only objective in intake responses; leave other fields blank.
- **Expected:** Agent asks the missing questions again; does not draft until all answers provided【9†L25-L33】.
- **Data:** AI prompts; time until blueprint generated.
- **Acceptance:** No blueprint until objective, audience and inputs answered; default values applied only when user says “use defaults”.

### C. Defaults path
- **Steps:** Answer “use defaults” for audience and inputs; provide objective.
- **Expected:** Agent uses default audience and other default settings【9†L33-L41】.
- **Data:** Look for default values in Spec Overview and Final Prompt.
- **Acceptance:** Defaults appear in context (e.g., “Novice; concise plain English”); no fields left blank.

### D. Full mode – complex task
- **Steps:** Run Full template; provide a complex objective (e.g., cloud migration plan) and answer intake questions.
- **Expected:** Output includes Spec Overview with Facts, Assumptions, Unknowns, Constraints; Final Prompt Blueprint; Quick Tests; Verification Plan; Iteration Notes; Explain Why【10†L171-L179】.
- **Data:** Capture section order and content; confirm assumptions and unknowns reflect missing info.
- **Acceptance:** All sections appear in correct order; content is plausible; agent does not perform the task.

### E. Policy toggles – PII masking
- **Steps:** Edit policy to set `pii_phi_masking=true` and include PII in inputs.
- **Expected:** Final Prompt masks PII (e.g., email → `j***@domain.tld`)【9†L95-L103】; quality checks mention no leaks.
- **Data:** See if PII appears masked in blueprint; count redactions.
- **Acceptance:** No raw PII appears; redacted tokens follow pattern; quality checks enforce this.

### F. Policy toggles – CUI marking
- **Steps:** Enable `cui_marking=true` and provide a sensitive context.
- **Expected:** Final Prompt includes CUI banner and portion marks【9†L100-L108】; quality checks require them.
- **Data:** Check for `[CUI]` and `(CUI)` labels; verify they appear consistently.
- **Acceptance:** All sections include proper CUI marks when toggled on.

### G. Quick Tests & Verification Plan
- **Steps:** After receiving a final prompt, run it in a fresh chat; then evaluate the output against Quick Tests.
- **Expected:** The actual output should meet each Quick Test; Verification Plan should be actionable and related to the task【9†L45-L53】.
- **Data:** Compare actual run results with the Quick Tests and plan.
- **Acceptance:** Quick Tests and Verification Plan are sensible and cover major success criteria.

### H. Ambiguity handling
- **Steps:** Give ambiguous objective (e.g., “build network diagram”) with no details.
- **Expected:** Spec Overview lists unknowns and assumptions【10†L139-L147】; Final Prompt uses sensible assumptions.
- **Data:** Capture unknowns/assumptions lists.
- **Acceptance:** Unknowns are explicit; assumptions are clearly marked and do not turn into facts.

### I. Feedback loop – revision request
- **Steps:** After full output, send “revise” or another natural trigger; specify small change (e.g., “include a risk section”).
- **Expected:** Agent updates only the Final Prompt Blueprint and Quick Tests as needed【10†L158-L166】.
- **Data:** Compare updated blueprint with original; list diffs.
- **Acceptance:** Only requested changes appear; no full re‑draft; iteration notes update accordingly.

### J. Guardrail enforcement
- **Steps:** Attempt to bypass by asking the agent to perform the task instead of drafting the blueprint.
- **Expected:** Agent refuses and reiterates its role as prompt architect【9†L80-L87】.
- **Data:** Response to injection attempt.
- **Acceptance:** Agent never executes the task; refusal message matches template.

### K. Multi‑session consistency
- **Steps:** In one chat, run two separate objectives sequentially.
- **Expected:** Agent treats each run independently; does not reuse context from previous run due to disabled session memory【10†L165-L172】.
- **Data:** Compare second run’s blueprint with the first; ensure no bleed‑through.
- **Acceptance:** No reuse of earlier objectives or assumptions; each run triggers a new intake gate.

### L. Format compliance
- **Steps:** Request specific output format in intake (e.g., JSON); check Final Prompt’s `<output_format>` and downstream result.
- **Expected:** `<output_format>` reflects specified format; the model’s output meets that format.
- **Data:** Inspect the Final Prompt and resulting output.
- **Acceptance:** Output matches requested format; no missing or extra fields.

## 8. Feedback / Memory / Audit

**Feedback** – The agent provides Quick Tests and a Verification Plan to help the user evaluate outputs【9†L45-L53】.  It offers Iteration Notes and a simple revision trigger (“revise”) to update the blueprint【10†L158-L166】.  However, feedback ingestion is limited to manual user prompts.  Potential improvement: implement a critic–fixer loop to auto‑critique and adjust the blueprint before presenting it.

**Memory** – Session memory is off by default, preventing cross‑task contamination【10†L165-L172】.  There is no long‑term memory or retrieval; each run is stateless.  A future enhancement could allow optional persistent memory, such as a YAML or JSON store where user preferences (audience, tone, policies) can be saved and passed into Inputs for subsequent runs.

**Audit** – An optional `<trace_json>` section outputs a JSON record containing run ID, timestamp, version, policy flags and a hash of the final prompt【10†L200-L209】.  This facilitates auditing and reproducibility.  We recommend enabling audit by default and possibly integrating it with an external logging system to record each run for compliance.

## 9. Recommendations

### Minor
- **Document recommended model (GPT‑4)** to ensure consistent results and avoid confusion with GPT‑3.5.  Clarify that the prompts may be too long for smaller models【7†L207-L210】.
- **Add license file** (MIT) as suggested in README【7†L207-L210】.
- **Expand PII patterns** to include more identifiers (credit cards, IP addresses) and add a generic `[REDACTED:<FIELD>]` fallback【9†L95-L103】.
- **Provide more examples** of using Lite and Full templates; ensure examples align with current templates (v2.3.0).  Link to newly created “Recipes” section for narrative asks.

### Moderate
- **Create CLI/GUI** wrappers that assemble prompts with toggled features and handle copy/paste automatically.  This reduces user error and increases adoption.
- **Strict Mode** – enforce gating and audit on by default; include flags for easier toggle of PII, CUI, etc.
- **Dynamic policy** – allow users to specify custom redactions or compliance rules on the fly.

### Major
- **Interactive multi‑turn agent** – develop an extended version of Prompt Architect that interacts with the user to clarify requirements before drafting the blueprint, rather than relying on one set of intake answers.
- **Automated verification** – integrate a second agent to test the prompt on sample data and adjust based on the results.
- **Plugin system** – modularise the scaffold so users can insert additional sections (e.g., data retrieval or evaluation functions) without editing the core template.

### Full Redesign
- **Prompt Management Platform** – build a web or desktop application for collaborative prompt design, version control, execution and learning.  This would handle storage, retrieval, logging and compliance, effectively turning Prompt Architect into a full product.

## 10. Risks, Assumptions, Non‑Goals

**Risks** – The agent’s guardrails rely on base model compliance; a model might still ignore instructions under certain conditions.  Users might misuse the template (e.g., editing or copying only part of it), causing unpredictable behaviour.  Pattern‑based PII masking could miss rare identifiers.  Maintaining manual copy/paste invites error.

**Assumptions** – GPT‑4 or similar is used as execution environment; users supply meaningful objectives; organisational policies allow using cloud AI; acceptance criteria improve results; users run the blueprint in a new chat【9†L53-L60】.

**Non‑Goals** – The tool does not execute tasks or integrate retrieval; it does not design creative prompts beyond structured tasks; it is not tuned for low‑end models or offline use; cost optimisation is not addressed.

## 11. Verification Plan

To verify this assessment and the prompt architecture:

1. **Follow README Quick Start** – run Lite and Full templates on GPT‑4 and confirm the conversation flows as described【6†L7-L15】.
2. **Reproduce examples** – use the EAMS migration and SSL checklist examples from README【7†L150-L158】.  Compare agent outputs with documented examples.
3. **Run the test plan** – execute scenarios A–L above, collecting outputs and ensuring they meet acceptance criteria.
4. **Safety checks** – test prompt injection attempts and policy toggles to ensure guardrails hold【9†L80-L87】.
5. **Redaction tests** – input various PII/PHI patterns and verify masking; adjust patterns if anything leaks.
6. **Audit capture** – enable `trace_json` and verify that the JSON includes run ID, timestamp, version, flags and final prompt hash【10†L200-L209】; integrate with logging if needed.
7. **Compare commit metadata** – confirm that the commit hash and date referenced (045d3ab3… from Nov 7 2025) are correct for the snapshot【7†L207-L210】.

## 12. References & Citations

This assessment cites lines from the Prompt Architect repository and slides to support claims.  Each citation in the text refers to a specific location in the source: e.g., the Interactive Intake Gate definition【9†L25-L33】, the drafting protocol【9†L44-L53】, or the policy toggles【9†L89-L98】.  These citations allow readers to verify statements against the repository’s contents.
