# Revision Demo

This example shows how to revise a Final Prompt Blueprint using **natural‑language triggers**.

1. The user runs Prompt Architect (Lite or Full) with a clear objective. The agent returns a **Spec Overview** and a **Final Prompt Blueprint**.
2. The user notices that the blueprint is missing a *Risk table* section. They reply: "Please add a risk table."
3. Prompt Architect recognizes the revision intent (keywords like *add* or *include*) and updates only the **Final Prompt Blueprint** (and Quick Tests if necessary). It summarizes the change in a short diff list.
4. The revised prompt is returned; no re‑asking of the intake questions occurs.

When revising, Prompt Architect never re‑runs the Intake Gate or rewrites the whole spec unless the objective or assumptions change.