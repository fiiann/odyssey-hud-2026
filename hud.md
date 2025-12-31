# Odyssey HUD 2026 - Project Execution Requirements

## Project Overview
Odyssey HUD is a high-performance, gamified project tracker that turns "shipping code" into an epic architectural journey. It pivots from generic "learning" to specific "project execution", allowing users to track multiple concurrent projects and log individual missions (actions) against them.

## Core Features

### 1. Authentication System
- Mock JWT authentication using demo credentials.
- Automatic data seeding (initial projects and missions) upon first login.
- Protected routes using Next.js Middleware.

### 2. Architect Ranking Engine
- **Rank Calculation**: `Rank = floor(sqrt(Total Execution Credits / 60))`
- **Execution Credits**: Minutes logged via missions.
- **Promotion System**: Visual progress bars and celebration modals upon ranking up.

### 3. Sector Management (Projects)
- **Project Concept**: Replaces fixed categories. Every mission must belong to a project.
- **Project Tracking**: Manage multiple projects with individual progress bars (0-100%).
- **Project Status**: ACTIVE, COMPLETED, ON_HOLD, ARCHIVED.
- **Metadata**: GitHub Repository links, Deployment URLs, and Objective descriptions.

### 4. Mission Log (Executions)
- **Mission Concept**: Replaces generic "quests".
- **Logging**: Select a target project, enter task title and duration (minutes).
- **Execution History**: Feed of recent missions with project context and relative time.

## Technical Specification

### Tech Stack
- **Framework**: Next.js 16 (App Router) + React 19
- **Styling**: Tailwind CSS v4 (Custom CSS Token architecture)
- **Icons**: Lucide React
- **Validation**: Zod + React Hook Form
- **State**: Custom Hooks + Mock API + LocalStorage persistence

### Data Models

```typescript
interface ProfileData {
  user_id: string;
  username: string;
  avatar_url: string;
  total_xp: number;
  current_level: number;
}

interface ProjectData {
  project_id: string;
  title: string;
  description: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD' | 'ARCHIVED';
  progress: number;
  repo_url?: string;
  deploy_url?: string;
  created_at: string;
  updated_at: string;
}

interface MissionData {
  mission_id: string;
  project_id: string;
  title: string;
  description?: string;
  duration_min: number;
  created_at: string;
}
```

## Design Aesthetics
- **Theme**: Ultra-Dark (#09090b background).
- **Primary Color**: HSL-based Blue (Command Primary).
- **Visuals**: Modern Glassmorphism, subtle micro-animations, and high-quality iconography.
- **Responsiveness**: Fully optimized for Desktop, Tablet, and Mobile.

## Development Workflow
- **Mock API**: Simulates backend latency and deterministic failure rates.
- **Transformers**: Ensures consistent `snake_case` (API) to `camelCase` (Client) mapping.
- **Optimistic UI**: All mission/project updates are reflected instantly in the UI.
- **Valdating**: Strict Zod schemas for all form inputs.