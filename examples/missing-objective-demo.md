# Missing Objective Demo

This example demonstrates how Prompt Architect responds when **no Objective** is provided in **Lite** mode.

1. The user begins by running the Lite template, then provides no objective.
2. Prompt Architect runs the **Intake Gate** and asks three questions:
   1) Objective — what should the downstream model produce now?
   2) Audience & Output format (e.g., Markdown, JSON, slides)?
   3) Inputs available (paste URLs/text or “none”)?
3. Because the Objective is missing, Prompt Architect does **not** draft anything. It repeats the intake questions and also offers three example objective styles (Agile user story, JSDoc, and plain brief) to inspire the user.

This ensures that the agent will never produce a Final Prompt Blueprint without a clear objective.