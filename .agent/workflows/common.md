---
description: General workflows for Odyssey HUD
---

# 🛠️ Common Workflows

## 1. Creating a New Feature
1. Define types in `lib/types.ts`.
2. Add validation schema in `lib/validations.ts`.
3. Add mock API methods in `services/mock-api.ts`.
4. Create transformer in `lib/transformers.ts`.
5. Create a custom hook in `hooks/`.
6. Implement UI in `components/` or `app/`.

## 2. Fixing a Bug
1. Reproduce the issue.
2. Check the data flow (Hook -> API -> Transform).
3. Add console logs if necessary.
4. Verify optimistic update rollback logic.
5. Test the fix.

## 3. Modifying Styling
1. Check `app/globals.css` for theme variables.
2. Use semantic classes (`bg-primary`, `text-foreground`).
3. Ensure no hardcoded hex values in components.
