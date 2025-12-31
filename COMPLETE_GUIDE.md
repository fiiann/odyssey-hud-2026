# 📖 Odyssey HUD 2026 - The Complete Guide

> **Your daily workflow companion for tracking project execution and developing with AI** ⚔️✨

This guide has everything you need: using the app as a user, and developing it efficiently with Claude Code AI.

---

## 📑 Table of Contents

- [**PART 1: User Guide**](#part-1-user-guide-) - How to use Odyssey HUD
- [**PART 2: Developer Guide**](#part-2-developer-guide-) - Claude Code & Antigravity workflows
- [**PART 3: Quick Reference**](#part-3-quick-reference-) - Cheat sheets

---

# PART 1: USER GUIDE 🎮

---

## 🚀 Getting Started

### Quick Setup

1. **Open the app**: `http://localhost:3000`
2. **Log in** with demo credentials:
   ```
   Email: superadmin@gmail.com
   Password: 123456
   ```
3. **Initialize your first project**: You need at least one project to start logging missions.

### Dashboard Overview

```
┌───────────────────────────────────────────┐
│  ODYSSEY HUD             ArchitectPrime ▼ │ ← Navbar
├───────────────────────────────────────────┤
│  RANK 3 SENIOR ARCHITECT     [Logout]     │ ← Global Rank
│  Progress to Rank 4 [████████░░░░] 65%    │
├───────────────────────────────────────────┤
│  [PROJECTS]               [+] Initiate    │
│  ┌──────────────────┐ ┌──────────────────┐│
│  │ AI Dashboard     │ │ Mobile App       ││ ← Active Projects
│  │ 65% [███░░]      │ │ 12% [█░░░░]      ││
│  └──────────────────┘ └──────────────────┘│
├───────────────────────────────────────────┤
│  [MISSION LOG]              [+] Log       │ ← Execution Feed
│  • Fixed Auth Logic (15m)                 │
│  • Implemented Cards (45m)                │
└───────────────────────────────────────────┘
```

---

## 🏗️ Managing Projects

### What is a Project?
A **Project** is a distinct product or sector you are building. Everything you do should be linked to a project.

### How to Initiate a Project
1. Click **"Initiate Project"**
2. Define the **Title** and **Objective**
3. Add Optional Links (GitHub, Live URL)
4. Confirm Initialization

### Project Statuses
- **Active**: Current focus.
- **Completed**: Shipped and archived.
- **On Hold**: Temporarily paused.
- **Archived**: Deleted or abandoned.

---

## 📜 Logging Missions

### What is a Mission?
A **Mission** is a specific unit of work completed for a project:
- Feature development
- Bug fixing
- UI/UX polish
- Research/Setup

### How to Log a Mission
1. Click **"Log Mission"**
2. Select the **Target Project**
3. Enter the **Task Description**
4. Enter **Duration** (minutes)
5. **Confirm Execution**

---

## 📊 Understanding Your Rank

### Ranking Engine
Your rank is calculated from **Total Execution Units (XP)**:
`Rank = floor(sqrt(Total Minutes / 60))`

- **Rank 1**: 0 minutes
- **Rank 2**: 1 hour
- **Rank 5**: 25 hours
- **Rank 10**: 100 hours

---

# PART 2: DEVELOPER GUIDE 👨‍💻

> **For developing Odyssey HUD with Claude Code & Antigravity AI**

### Technology Stack
- **Framework**: Next.js 16 + React 19
- **Styling**: Tailwind CSS v4 (Pure CSS tokens)
- **State**: Mock API + LocalStorage
- **Validation**: Zod + React Hook Form

### Data Architecture
- **Projects**: Core focus unit.
- **Missions**: Time-stamped actions linked to a Project.
- **Profile**: Aggregated stats (Total Credits, Rank).

### Common Commands
```bash
npm run dev          # Start local command center
npx tsc --noEmit     # Verify architectural integrity (Type check)
npm run build        # Compile production payload
```

---

# PART 3: QUICK REFERENCE ⚡

### ⌨️ Hotlinks
- **Dashboard**: `app/dashboard/page.tsx`
- **Hook (Missions)**: `hooks/use-missions.ts`
- **Hook (Projects)**: `hooks/use-projects.ts`
- **Types**: `lib/types.ts`
- **Constants**: `lib/constants.ts`

### 🎨 Visual Theme
- **Background**: `#09090b` (Deep Space)
- **Primary**: HSL Blue (Command Primary)
- **Cards**: `#121214` (Module Secondary)

---
*Project: Odyssey HUD 2026*
