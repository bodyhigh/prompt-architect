---
marp: true
theme: gaia
_class: lead
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.svg')
title: "Prompting for AI - Reusing Agile Skills"
description: "Threewire Systems Lunch & Learn — Prompt basics → Agile mapping → Prompt Architect → examples"
footer: "Threewire Systems • Prompting for AI - Reusing Agile Skills • Prompt Architect v2"
---

## Prompting for AI - Reusing Agile Skills
**Reuse your Agile skills to get great AI results**

https://github.com/bodyhigh/prompt-architect

1) Prompt basics (LLM, context, tokens)
2) From Agile → prompting (AC, user stories, Gherkin)
3) **Prompt Architect** (Full + Lite)
4) Example executions + tips
5) Q&A + handoff docs

<!--
GOAL: Set expectations & energy. Say this session turns what we already do in Agile into prompting superpowers.
TIME: ~1 min
KEY LINES:
- “You already know how to write great prompts—because you know AC and Gherkin.”
- “We’ll end with copy-paste prompts + a quick practice.”
TRANSITION: “First, a tiny bit of vocabulary so we’re aligned.”
-->

---

## Why this matters (for us)
- Faster drafts, clearer plans, fewer rework loops
- Prompts that mirror our **acceptance criteria** style
- Repeatable quality: same input ⇒ similar output

**Participation Trophies:** You’ll leave with a prompt you can use today.

<!--
TIME: ~1 min
ANGLE: Tie to real pain—rework and inconsistent outputs. Emphasize repeatability.
ASK: “Think of one task this week you’d love to automate a first draft for.”
TRANSITION: “To keep terms straight, 60 seconds of glossary.”
-->

---

## Glossary (newbie-friendly)
- **LLM** — Large Language Model (text predictor)
- **Model** — The specific AI (e.g., GPT-x)
- **Context** — Info you give the model (task, constraints, inputs)
- **Tokens** — Word pieces; affect length/cost
- **Hallucination** — Confident wrong answer
- **Guardrails** — Rules that keep outputs safe/usable (e.g., exclude PII/PHI; CUI markings)

<!--
TIME: ~2 min
NOTES: Keep it plain. Use “predicts next chunk of text” analogy.
TIP: Guardrails are just “house rules”: no invention, mark sensitive, cite when needed.
TRANSITION: “Now—how to phrase asks so the model behaves: the five basics.”
-->

---

## Prompting basics (golden rules)
- **State the role** you want (“You are a release manager…”)
- **Say the objective** (“Produce a rollout plan with milestones…”)
- **Pin constraints** (timebox/length/format/versions)
- **Attach inputs** (links, snippets, files)
- **Define success** (how we’ll judge “good”; give a “bad” example)

<!--
TIME: ~3 min
SCRIPT:
- Role sets POV; Objective defines the deliverable.
- Constraints = scope guardrail (length, format, versions).
- Inputs reduce guessing; Success criteria = your AC.
DEMO LINE: “Good includes X table and Y test; bad would be vague bullets.”
TRANSITION: “If you do Agile, you already do this next part.”
-->

---

## Use what you know …
**Mapping Agile ⇒ Chat Prompt**
- **User Story** → *Role* & *Goal*
- **Acceptance Criteria (AC)** → *Success Criteria* & *Tests*
- **Gherkin (Given/When/Then)** → *Context/Action/Expected Output*
- **Definition of Done** → *Quality checks & verification plan*

<!--
TIME: ~2 min
TRICK: Show that prompting ≈ story writing. This reduces intimidation for non-technical folks.
EXAMPLE: “As a PM, I want a weekly agenda so decisions get made” → matches prompt role+objective.
TRANSITION: “Let’s see a tiny mapping example.” 
-->

---

## Example mapping (mini)
**AC:** “User can export CSV; includes headers; under 2s; errors logged.”  
**Prompt slice:**
- Objective: “Design CSV export spec.”
- Constraints: “≤400 words; include headers; perf ≤2s; logging policy.”
- Quality checks: “Coverage, clarity, verification.”

<!--
TIME: ~2 min
POINT: Copy AC directly into prompt success criteria. 
LEARNED: The closer your AC, the fewer revisions.
TRANSITION: “So why do we still get weird answers? The usual three problems…” 
-->

---

## The pain we’re fixing
- Vague asks ⇒ vague answers
- Missing inputs ⇒ invented assumptions
- No success criteria ⇒ subjective reviews

**Solution:** A simple **Intake Gate** + structured scaffold.

<!--
TIME: ~1 min
MESSAGE: Don’t fight the model—fix the ask. Intake Gate prevents drafting with missing essentials.
TRANSITION: “Here’s the gate you’ll use every time.” 
-->

---

## The Interactive Intake Gate (3Qs)
1) **Objective (what to produce now)?**
2) **Audience & output format?** (Markdown, JSON, slides)
3) **Inputs available?** (paste text/URLs or “none”)

> The model does **not** draft until these are answered (or you say “use defaults”).

<!--
TIME: ~2 min
COACHING: “If a question is blank, answer or say ‘use defaults.’”
TIP: Keep a text snippet with these 3 lines handy.
TRANSITION: “Now the scaffolds: Full and Lite.” 
-->

---

## **Prompt Architect — Full (Spec-Only)**
- **Purpose:** Maximum quality & traceability for complex/regulated work
- **Flow:** Gate → Normalize inputs → Drafting Protocol → Quality checks
- **Sections:** `<role> <task> <context> <constraints> <instructions> <examples> <output_format> <quality_checks>`
- **Policies (toggles):** PII/PHI masking, CUI markings (fail-closed)

**Result:** Repeatable, auditable outputs.

<!--
TIME: ~3 min
ANGLE: Use when you’d normally write AC + tests + runbooks. 
CALL OUT: Spec-only means it outputs a Final Prompt—not the domain work—so you can run it safely in a new chat.
TRANSITION: “For quick asks, use Lite.” 
-->

---

## **Prompt Architect — Lite (Spec-Only, Minimal)**
- **Purpose:** Speed + approachability for quick asks
- **Same Gate**, smaller scaffold, no advanced toggles
- **Trade-off:** Faster, slightly higher variance

**Good for:** agendas, emails, simple checklists, short specs.

<!--
TIME: ~2 min
TIP: Start Lite; if results vary, upgrade to Full.
TRANSITION: “Let’s map three real examples to each.” 
-->

---

## When to use which?
- **Use Lite** for quick outputs, mixed audiences, short tasks
- **Use Full** for auth/security, production changes, customer-visible deliverables

Rule of thumb: If you’d normally write AC & a test plan, use **Full**.

<!--
TIME: ~1 min
FLOW: Decision slide—read quickly; it’s here for reference later.
TRANSITION: “Example one: EAMS-A migration.” 
-->

---

## Example 1 — OAuth2: DHA → EAMS-A (Full)
**Ask:**
“Draft a rollout plan with milestones, risks (M/H), and a Gherkin-mapped test matrix to endpoints. No refresh tokens. Output Markdown tables.”

**Why it works:** clear role, constraints, tests, and success criteria.

<!--
TIME: ~2–3 min
NOTES: Mention “no refresh tokens” as a constraint—this removed ambiguity in prior runs.
TIP: Ask for rollback and canary in milestones.
TRANSITION: “Example two: Certificates.” 
-->

---

## Example 2 — Prod SSL Certificates (Lite)
**Ask:**
“Create a step-by-step checklist from request → install → verify (OpenSSL), with rollback and owners. ≤300 words.”

**Why it works:** concise, concrete, tool-named commands.

<!--
TIME: ~2 min
NOTES: Naming tools (openssl) anchors concrete steps.
ADD: Always ask for rollback + owner + due date.
TRANSITION: “Example three: agendas that drive decisions.” 
-->

---

## Example 3 — Weekly Customer Agenda (Lite)
**Ask:**
“Generate a 30-min agenda with timeboxes, owners, decision prompts, and a decision log table.”

**Why it works:** timebox + decision prompts force clarity.

<!--
TIME: ~2 min
TIP: Add rotating focus topic + decision recap to make meetings useful.
TRANSITION: “Now, Craig’s personal tips we baked in.” 
-->

---

## Don't make my mistakes
- **Fence pasteables.** Use triple backticks for code/logs/long quotes to avoid smart quotes & wrap glitches.
- **Ask for files.** If copy/paste is flaky, request **downloadable artifacts** (`.md`, `.zip`, `.pdf`) with clear names.
- **Use Projects/threads.** Keep long-running work organized; name the space and keep artifacts together.
- **Interrogate assumptions.** Ask “What did you assume?” (e.g., OAuth2 vs OIDC retained context).
- **Draft in an editor.** Write prompts in an editor to avoid accidental [Enter] and to version changes.

<!--
TIME: ~3 min
DELIVERY: These are “learned the hard way.” Give a quick story about OAuth2 context carryover and how asking for assumptions fixed it.
TRANSITION: “More power-ups from team feedback.” 
-->

---

## Power-up habits (from team feedback)
- **State format up front.** “Markdown tables + one JSON block; no extra commentary.”
- **Diff-only iterations.** “Return only the changes since last version (with brief rationale).”
- **Quick tests + verification.** Always request 3 quick tests (incl. an edge case) and a 2-point self-check.
- **Guardrails.** “Do not invent facts; write ‘Not found’. Apply CUI/PII policies when toggled.”

<!--
TIME: ~2 min
HINT: These convert endless back-and-forth into fast, reviewable changes.
TRANSITION: “Common ways we accidentally sabotage prompts.” 
-->

---

## Anti-patterns (avoid)
- “Do everything about X” (scope balloon)
- “Make it detailed” (without constraints)
- Missing inputs (“use your best guess”)
- Unverifiable asks (no success criteria)

<!--
TIME: ~1 min
COACH: If you hear one of these in your own prompt, pause and add Gate answers + constraints.
TRANSITION: “How we iterate without thrash.” 
-->

---

## How the feedback loop works
1) Run the Gate → produce Draft v1  
2) **Critique briefly**: keep / change / missing  
3) Re-run with **deltas only** (don’t restate all context)  
4) Validate with the **quality checks**; repeat if needed

<!--
TIME: ~2 min
NOTE: “Diff-only” is the unlock—less noise, fewer regressions.
TRANSITION: “Let’s practice for 5–8 min.” 
-->

---

## Quality checks (use on every run)
- **Coverage:** did it address the whole objective?
- **Traceability:** claims tied to inputs or labeled assumptions?
- **Clarity:** readable tables/lists? acronyms expanded once?
- **Verification:** unknowns & validation steps explicit?
- **Actionability:** next steps prioritized?

<!--
TIME: ~1 min
SAY: This is your Definition of Done for prompts. If any fail, revise.
TRANSITION: “Let’s wrap & share the handouts.” 
-->

---

## Q&A + Resources
- We’ll share: slide deck, README, copy-paste prompts
- https://github.com/bodyhigh/prompt-architect
- [Project Glidepath](https://github.com/bodyhigh/project-glidepath)

**Thank you!**

<!--
TIME: ~2–3 min Q&A
CALL TO ACTION: Ask volunteers to try Lite on their next agenda. Offer office hours for Full.
TIP: If recording, remind attendees where to find the README + handout in the repo.
-->

---

![bg](certificate-of-completion.png)
