# 📖 Odyssey HUD 2026 - Claude Code Documentation

## Welcome, Claude! 👋

You're about to work on the **Odyssey HUD 2026** project - a high-performance, RPG-style project execution dashboard. This documentation will help you understand the core pivot to a **Project/Mission** framework and work efficiently.

---

## 🎯 What is This Project?

A **frontend-only** Next.js application where users can:
- **Initiate Sectors (Projects)**: Manage distinct project goals with specific objectives.
- **Log Executions (Missions)**: Log individual tasks linked to specific projects.
- **Track Architect Rank**: Accumulate Execution Credits (XP) to increase global rank.
- **Impact Analysis**: View completion stats across all active sectors.
- **Mission History**: Maintain a persistent feed of historical build actions.

**Key**: No real backend - everything uses a mock API with localStorage.

---

## 🚀 Quick Start

### 1. Document Framework
- **You are here**: `overview.md` - This file
- **Quick reference**: `quick-reference.md` - Execution patterns
- **Architecture**: `architecture.md` - System deep dive
- **Workflows**: `workflows.md` - Step-by-step guides

### 2. Core Pivot Summary
- ❌ **Gone**: Fixed Categories (Backend, Frontend, etc.).
- ✅ **New**: Dynamic Projects. Missions are now linked to Projects by `project_id`.
- ❌ **Gone**: Quests (Terminology).
- ✅ **New**: Missions / Build Actions.
- ❌ **Level**: Now referred to as **Rank** (e.g., Rank 3 Architect).

---

## 📁 Project at a Glance

```
odyssey-hud/
├── .claude/               # ← YOU ARE HERE (documentation)
├── app/                   
│   ├── dashboard/page.tsx # NEW: Enhanced Project Tracker UI
│   └── globals.css        # Tailwind v4 theme variables
├── hooks/                 
│   ├── use-missions.ts    # Replaces use-quests.ts
│   └── use-projects.ts    # Replaces use-bosses.ts
├── lib/                   
│   ├── types.ts           # Project/Mission/Profile interfaces
│   ├── constants.ts       # Removed Categories, added Project Status
│   ├── calculations.ts    # Optimized ranking formulas
│   └── mock-data.ts       # Updated seed data for new flow
└── services/
    └── mock-api.ts        # Updated API layer for projects/missions
```

---

## 🎨 Design Language

### 1. Ultra-Dark Command Center
- ✅ Background: `#09090b` (Deep Space)
- ✅ Cards: `#121214` (Module Secondary)
- ✅ Accent: HSL Blue (Command Primary)

### 2. High-Fidelity UI
- ✅ **Glassmorphism**: Backdrop blurs and subtle borders.
- ✅ **Animations**: Framer Motion transitions (planned) and CSS pulses.
- ✅ **Typography**: Monospace fonts for rank and credits display.

---

## 📊 Data Flow

User logs a mission:

```
1. Select Project from Dropdown → app/dashboard/page.tsx
2. Submit Mission Form → useMissions.createMission()
3. API Call → missionApi.createMission()
4. Profile Sync → Execution Credits increase in localStorage
5. Rank Check → Trigger Promotion Modal if Rank increases
6. UI Refresh → Optimistic display in Mission History
```

---

## 🎓 Next Steps

1. **Check `architecture.md`** to understand how Projects and Missions are linked.
2. **Review `lib/types.ts`** for the updated data interfaces.
3. **Reference `quick-reference.md`** for common UI patterns.

*Last updated: 2025-12-31*
*Project: Odyssey HUD 2026 - The Architect's Command Center*
