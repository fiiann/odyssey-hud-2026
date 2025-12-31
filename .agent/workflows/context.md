---
description: How to maintain and feed context to Antigravity
---

# 🧠 Context Feeding Workflow

To ensure Antigravity always has the best context for your prompts, follow these steps:

## 1. Documentation Review
Before starting a task, Antigravity should:
1. Read `.agent/overview.md` for project context.
2. Read `.agent/quick-reference.md` for coding patterns.
3. Read `COMPLETE_GUIDE.md` for user perspective.

## 2. Rule Checklist
Every prompt response should consider:
- **Aesthetics**: Ensure rich, premium UI.
- **Consistency**: Follow existing code patterns and naming conventions.
- **Persistence**: Ensure data changes are reflected in localStorage mock API.

## 3. Updating Memory
When a new pattern or key design decision is made:
1. Update `.agent/quick-reference.md`.
2. Add a new workflow in `.agent/workflows/` if applicable.
3. Update `COMPLETE_GUIDE.md` if it affects the user/developer workflow.

---
