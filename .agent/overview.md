# 📖 Odyssey HUD 2026 - Antigravity Overview

## Welcome, Antigravity! 👋

You're working on the **Odyssey HUD 2026** - a high-fidelity, RPG-style project execution dashboard.

---

## 🎯 Project Summary
- **Type**: Frontend-only Next.js application.
- **Pivot**: Project-centric tracking (Projects + Missions).
- **Goal**: Log "Missions", gain Execution Credits, increase "Architect Rank".
- **Backend**: None (localStorage + Mock API).
- **Styling**: Tailwind CSS v4 (Ultra-Dark Theme).

## 🚀 Technical Stack
- **Framework**: Next.js 16 + React 19.
- **Validation**: Zod (lib/validations.ts).
- **Mock API**: Logic in services/mock-api.ts.
- **Patterns**: Optimistic UI, snake_case API transformation.

## 📁 Key File Locations
- **Dashboard**: `app/dashboard/page.tsx` (Complete Overhaul)
- **Hooks**: `hooks/use-missions.ts`, `hooks/use-projects.ts`
- **Data**: `lib/mock-data.ts` (Updated seed logic)
- **Formula**: `lib/calculations.ts` (Ranking Engine)

## 🧠 Core Patterns
1. **Missions linked to Projects**: Every mission must have a `projectId`.
2. **Global Rank**: Calculated from total accumulated minutes across all projects.
3. **Promotion System**: Celebration modals triggered via rank increases in `useProfile`.

---

## ✅ Quality Checklist
- [ ] Ensure every mission is linked to an existing project.
- [ ] Maintain the "Architect" premium aesthetic (Dark/Blue/Glass).
- [ ] Use Zod for all form validations.
- [ ] Handle mission deletion (XP subtraction).

---
*Project: Odyssey HUD 2026 - Command Center*
