# 🏗️ Architecture & Technical Guide

## 📡 Data Architecture
The app follows a strict layered architecture:
`UI Component` <-> `Custom Hook` <-> `Mock API Service` <-> `LocalStorage`

### Data Transformation
- **API Model** (`snake_case`): Data as stored in "database" (localStorage).
- **Client Model** (`camelCase`): Data as used in React components.
- **Transformers**: Located in `lib/transformers.ts`.

## 🔐 Security & Auth
- Mock authentication using JWT-like tokens.
- Persistent login using `localStorage` for client state and `cookies` for server-side middleware protection.

## ⚖️ Ranking Logic
Defined in `lib/calculations.ts`. Execution Credits (XP) are derived from total minutes spent on missions (quests).
`Rank = floor(sqrt(Total Minutes / 60))`

## 🎨 UI & UX
- Radix UI for primitives.
- Tailwind CSS v4 for styling.
- Framer Motion for micro-animations.
- Lucide React for iconography.

---
