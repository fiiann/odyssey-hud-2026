# 📖 Odyssey HUD 2026 - Antigravity Overview

## Welcome, Antigravity! 👋

You're working on the **Odyssey HUD 2026** - an RPG-style learning tracker dashboard.

---

## 🎯 Project Summary
- **Type**: Frontend-only Next.js application.
- **Goal**: Track building "Missions", gain Execution Credits (XP), rank up.
- **Backend**: None (localStorage + Mock API).
- **Styling**: Tailwind CSS v4 (Dark Theme).

## 🚀 Technical Stack
- **Framework**: Next.js 16 + React 19.
- **Language**: TypeScript.
- **Styling**: Vanilla CSS + Tailwind v4.
- **Validation**: Zod.
- **Patterns**: Optimistic UI, Mock API Services.

## 📁 Key File Locations
- **Dashboard**: `app/dashboard/page.tsx`
- **Hooks**: `hooks/` (use-auth, use-quests, etc.)
- **API**: `services/mock-api.ts`
- **Types/Validations**: `lib/types.ts`, `lib/validations.ts`
- **Theme**: `app/globals.css`

## 🧠 Core Patterns
1. **Mock API**: Simulates network delay, uses localStorage.
2. **Transformers**: Convert API `snake_case` to Client `camelCase`.
3. **Optimistic Updates**: Update state before API confirms, rollback on error.
4. **Semantic Colors**: Use `--color-primary` etc., defined in `globals.css`.

---

## ✅ Quality Checklist
- [ ] Follow existing patterns (Hook -> API -> Transform -> State).
- [ ] Use Zod for all form validations.
- [ ] Handle loading and empty states.
- [ ] Ensure mobile responsiveness.
- [ ] Test in dark mode (default).

---
*Project: Odyssey HUD 2026*
