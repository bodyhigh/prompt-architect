# Changelog

## v2.3.0 (2025-11-09)

- Renamed **“Prompt Spec”** to **“Final Prompt Blueprint.”**
- Added **Strict Mode** (default ON) which enforces gating, audit trace, and non‑execution guarantees.
- Updated the **Intake Gate**: the Objective is required and no default is provided. The agent now waits for all three answers and acknowledges with "ACK: intake complete" before drafting.
- Added **natural‑language revision triggers** (revise, tweak, adjust, update, add, remove, change, include, exclude) and a diff summary on revision.
- Enabled **Audit Trace** by default and added a structured JSON schema for trace output (see `docs/trace-schema.json`).
- Removed the **TOOLS/BROWSING** field from defaults and context to simplify the prompt.
- Introduced **downstream memory** (ephemeral) to allow the downstream AI to remember within a run while keeping Prompt Architect stateless.
- Added **helper examples** when the Objective is missing to inspire the user.
- Unified the **README** for Lite and Full versions with an **Experimental Features** table.
- Added new examples demonstrating missing objectives and revision flows (`examples/`).
- Added a script (`scripts/hash-blueprint.ts`) for calculating the SHA‑256 hash of a Final Prompt Blueprint for auditing purposes.