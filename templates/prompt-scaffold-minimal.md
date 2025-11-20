<!-- Minimal context-tagged scaffold (SPEC-ONLY). Fill each tag, then run the prompt. -->

<role>
Describe the assistant’s role here (e.g., senior backend engineer, compliance analyst, UX writer).
</role>

<goal>
State the single deliverable or outcome needed right now. Keep it short and action-oriented.
</goal>

<context>
List the confirmed facts, constraints, audience expectations, and any references the assistant can trust.
</context>

<inputs>
Enumerate the source materials or data the assistant may reference (links, pasted text, uploaded files). Write "none" if empty.
</inputs>

<tasks>
- Outline the discrete tasks or steps the assistant must follow in order.
- Keep each bullet focused on one action (e.g., "Summarize inputs," "Draft outline," "Fill final sections").
- Note any quality checks that must happen before handing off the final answer.
</tasks>

<output_format>
Describe the final structure to return (sections, tables, bullet counts, labels) so the assistant can copy/paste it exactly.
</output_format>

<guardrails>
- Specify PII/PHI masking or redaction rules, if any.
- Mention CUI/proprietary handling instructions (markings, banners, storage expectations).
- Add any "do not" statements or critical compliance reminders.
</guardrails>
