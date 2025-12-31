# 🎮 Odyssey HUD 2026

> **The Ultimate Project Execution Dashboard for Modern Architects** ⚔️✨

Odyssey HUD is a high-performance, gamified project tracker designed for engineers who want to visualize their building progress as an RPG journey. Pivot from passive learning to active shipping.

---

## 🏗️ Project-Centric Framework

Unlike generic task trackers, Odyssey HUD is built around **Sectors (Projects)** and **Executions (Missions)**:

- 🛰️ **Initiate Sectors**: Create and manage distinct projects with specific objectives.
- 📜 **Log Missions**: Record every unit of code shipped or architectural decision made.
- 👤 **Architect Rank**: Watch your global rank increase based on total execution impact.
- 📊 **Impact Progress**: Visualize completion percentages across all active sectors.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Styling**: Tailwind CSS v4 (Pure CSS Tokens, Ultra-Dark Theme)
- **Validation**: Zod + React Hook Form
- **State**: Mock API Layer + LocalStorage Persistence
- **Auth**: Mock JWT with Cookie integration

---

## 🚀 Key Features

### 🔐 Command Access
- Secure login via mock JWT credentials.
- Automatic data seeding for new architects.
- Seamless route protection via Next.js Middleware.

### 👤 Architect Profile
- **Global Rank**: Automatically calculated from total execution time.
- **Impact Meter**: Visual progress towards the next architect promotion.
- **Rank Promotion**: Immersive celebration modals upon reaching new milestones.

### 🛰️ Sector Management
- Initiate projects with title, objective, and deployment parameters.
- Track real-time completion progress (0-100%).
- Integrated links to GitHub repositories and Live environments.

### 📜 Execution Log
- Fast mission logging (Task, Project Link, Duration).
- Optimistic UI updates for instant feedback.
- Detailed history of every shipped action with relative timestamps.

---

## ⌨️ Getting Started

### Prerequisites
- Node.js 18+
- npm / pnpm / bun

### Installation
```bash
# Clone and enter the command center
git clone https://github.com/fiiann/odyssey-hud-2026.git
cd odyssey-hud-2026

# Install dependencies
npm install

# Initialize development mode
npm run dev
```

### Access
Open `http://localhost:3000` and use the following credentials:
- **Email**: `superadmin@gmail.com`
- **Password**: `123456`

---

## 📂 Architecture Guide

Looking to extend the HUD? Check out the core files:
- **Dashboard**: `app/dashboard/page.tsx`
- **Hook (Missions)**: `hooks/use-missions.ts`
- **Hook (Projects)**: `hooks/use-projects.ts`
- **API Logic**: `services/mock-api.ts`
- **Ranking Engine**: `lib/calculations.ts`

---
*Built with ❤️ for the 2026 Multi-Platform Architect journey*
*Tech: Next.js 16 | React 19 | Tailwind CSS v4 | TypeScript*
