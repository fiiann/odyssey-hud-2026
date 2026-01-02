# PRD: Odyssey HUD - Advanced Task Management System

**Document Version:** 1.1
**Date:** 2026-01-01
**Status:** ✅ APPROVED - Ready for Implementation
**Author:** Claude Code AI + Human Collaboration

**Changelog:**
- v1.1 (2026-01-01): Added Dual Terminology System (Professional vs Odyssey Mode)
- v1.0 (2026-01-01): Initial PRD - Core task management system

---

## 📋 Executive Summary

### Current State
Odyssey HUD successfully implements **Project & Mission tracking** where:
- **Projects** represent high-level initiatives (sectors) with progress tracking
- **Missions** are time logs (execution entries) linked to projects
- Users can create projects and log work sessions (missions) against them
- XP and leveling system tracks total execution time

### Problem Statement
**Current Limitations:**
1. **No Planning Layer**: Missions are purely retrospective (what you DID), not prospective (what you NEED TO DO)
2. **No Task Hierarchy**: Projects jump directly to execution logs without intermediate planning
3. **No Task Status**: Can't track TODO, IN_PROGRESS, COMPLETED states
4. **No Prioritization**: All tasks are equal, no way to mark urgent vs important
5. **No Estimation**: Can't estimate time vs actual time for planning accuracy
6. **No Task Details**: No descriptions, tags, attachments, or subtasks
7. **No Milestones**: No way to group tasks into deliverables
8. **No Dependencies**: Can't link tasks that depend on each other
9. **No Mission Editing**: Can't correct mistakes or update details
10. **Limited Filtering**: Can't filter by category, status, priority

**User Impact:**
- Difficult to plan work ahead of time
- Can't track what needs to be done vs what's been done
- No visibility into project progress at task level
- Can't prioritize effectively
- Can't learn from estimation vs actual time

### Proposed Solution
Introduce a **3-tier hierarchy**: **Projects → Tasks → Missions**

1. **Projects** (existing): High-level initiatives
2. **Tasks** (NEW): Planned work items with status, priority, estimates
3. **Missions** (existing): Actual execution logs (time spent)

**Key Value Propositions:**
- ✅ **Plan ahead**: Create tasks before doing the work
- ✅ **Track progress**: See task completion status (TODO → DONE)
- ✅ **Prioritize**: Mark urgent/important tasks
- ✅ **Estimate vs Actual**: Learn planning accuracy over time
- ✅ **Rich details**: Add descriptions, tags, subtasks
- ✅ **Milestone tracking**: Group tasks into deliverables
- ✅ **Better organization**: Filter by category, status, priority

---

## 🎮 UNIQUE FEATURE: Dual Terminology System

**Overview:** Odyssey HUD offers two distinct modes for terminology - a unique differentiator in the productivity tools market!

### Mode 1: 🎯 Professional Mode (Default)
**Target Audience:** Corporate environments, serious productivity users
**Style:** Clean, Jira/Asana/Linear-style professional terminology

### Mode 2: 🎮 Odyssey Mode (Game-like)
**Target Audience:** Developers who want fun, gamified experience
**Style:** RPG game terminology with epic, immersive language

### Terminology Mapping

| Concept | Professional Mode | Odyssey Mode |
|---------|------------------|--------------|
| **3-Tier Hierarchy** | Project → Task → Time Entry | Sector → Quest → Battle Log |
| **Project** | Project | Sector |
| **Planned Work** | Task | Quest |
| **Time Log** | Time Entry / Work Log | Battle Log / Execution Log |
| **User** | User | Architect |
| **Level** | Level | Rank |
| **XP** | Experience Points | Execution Credits |
| **Status** | | |
| → TODO | To Do | Pending |
| → IN_PROGRESS | In Progress | Active |
| → COMPLETED | Completed | Complete |
| → CANCELLED | Cancelled | Aborted |
| **Priority** | | |
| → URGENT | Critical | Legendary |
| → HIGH | High | Epic |
| → MEDIUM | Medium | Rare |
| → LOW | Low | Common |
| **Categories** | | |
| → Backend | Backend | Backend Engineering |
| → Frontend | Frontend | Frontend Engineering |
| → DevOps | DevOps | Infrastructure |
| → Design | Design | Visual Design |
| → Testing | QA | Quality Assurance |
| → Documentation | Docs | Knowledge Base |
| **UI Labels** | | |
| → Create Task | Create Task | Accept Quest |
| → Edit Task | Edit Task | Modify Quest |
| → Delete Task | Delete Task | Abort Quest |
| → Start Task | Start Task | Deploy to Sector |
| → Complete Task | Complete Task | Quest Complete |
| → Log Time | Log Time | Record Battle |
| → View Stats | View Statistics | Access Intel |
| → Settings | Settings | Command Center |
| → Dashboard | Dashboard | War Room |
| → Search | Search | Scan Database |
| → Filter | Filter | Filter Intel |
| **Messages/Feedback** | | |
| → Task created | Task created successfully | Quest accepted, Architect |
| → Task updated | Task updated | Quest parameters updated |
| → Task deleted | Task deleted | Quest terminated |
| → Time logged | Time entry saved | Battle recorded in archives |
| → Level up | Level up! | Rank increased! Promotion earned! |
| → Achievement | Achievement unlocked | Badge acquired! |
| **Empty States** | | |
| → No tasks | No tasks yet | No active quests, Architect |
| → All done | All tasks completed | All quests complete! Sector secured! |
| **Time Periods** | | |
| → Today | Today | Current cycle |
| → This week | This week | Current phase |
| → This month | This month | Current quarter |
| → All time | All time | Total tours of duty |

### Mode Selection UI

**Settings Toggle:**
```
┌─────────────────────────────────────────────┐
│ 🎨 Display Settings                         │
├─────────────────────────────────────────────┤
│ Terminology Mode:                           │
│ ◉ 🎯 Professional Mode (Jira-style)         │
│ ○ 🎮 Odyssey Mode (Game-like)               │
│                                             │
│ [Preview Terms] [Apply]                     │
└─────────────────────────────────────────────┘
```

**Tooltip/Info:**
- **Professional Mode**: Standard project management terminology suitable for workplace environments
- **Odyssey Mode**: Immersive RPG-style terminology for a gamified tracking experience

### Technical Implementation

```typescript
// lib/terminology.ts
export type TerminologyMode = 'PROFESSIONAL' | 'ODYSSEY';

export const TERMINOLOGY = {
  PROFESSIONAL: {
    project: 'Project',
    task: 'Task',
    timeEntry: 'Time Entry',
    mission: 'Time Entry', // Alias
    createTask: 'Create Task',
    logTime: 'Log Time',
    status: {
      TODO: 'To Do',
      IN_PROGRESS: 'In Progress',
      COMPLETED: 'Completed',
      CANCELLED: 'Cancelled',
    },
    priority: {
      URGENT: 'Critical',
      HIGH: 'High',
      MEDIUM: 'Medium',
      LOW: 'Low',
    },
    // ... all terms
  },
  ODYSSEY: {
    project: 'Sector',
    task: 'Quest',
    timeEntry: 'Battle Log',
    mission: 'Battle Log',
    createTask: 'Accept Quest',
    logTime: 'Record Battle',
    status: {
      TODO: 'Pending',
      IN_PROGRESS: 'Active',
      COMPLETED: 'Complete',
      CANCELLED: 'Aborted',
    },
    priority: {
      URGENT: 'Legendary',
      HIGH: 'Epic',
      MEDIUM: 'Rare',
      LOW: 'Common',
    },
    // ... all terms
  },
};

// Hook to get terminology based on mode
export function useTerminology(mode: TerminologyMode = 'PROFESSIONAL') {
  return TERMINOLOGY[mode];
}
```

### Storage & Persistence

```typescript
// User preference stored in profile
interface ProfileSettings {
  terminologyMode: TerminologyMode;
  // ... other settings
}

// Default: Professional Mode
const DEFAULT_MODE: TerminologyMode = 'PROFESSIONAL';
```

### UI Component Updates

**Before (Hardcoded):**
```tsx
<Button>Create Task</Button>
<Badge>{task.status === 'TODO' ? 'To Do' : 'Done'}</Badge>
```

**After (Dynamic):**
```tsx
const t = useTerminology(mode);

<Button>{t.createTask}</Button>
<Badge>{t.status[task.status]}</Badge>
```

### Impact on Existing Features

**Unchanged (Same in both modes):**
- Data models (still use `Task`, `Mission`, `Project` in code)
- API endpoints
- Database schema
- Core functionality

**Changed (UI labels only):**
- Button labels
- Status badges
- Priority indicators
- Empty state messages
- Toast notifications
- Page headings
- Navigation items
- Help text and tooltips

### Marketing Angle

**Headline:** "The Only Productivity Tool with a Personality"

**Value Prop:**
- Use Professional Mode at work for clean, serious interface
- Switch to Odyssey Mode for personal projects - gamify your workflow!
- Unique differentiation in crowded project management market
- Appeals to developer community with fun, immersive theme

**Launch Strategy:**
1. Launch with **Professional Mode as default** (safe, accessible)
2. Feature Odyssey Mode in marketing ("Try Game Mode!")
3. Showcase mode switching in demo video
4. Developer community outreach (HackerNews, Reddit, Twitter)
5. "Switch to Game Mode Friday" internal culture

### Future Enhancements

**Phase 2:** Additional Themes
- 🌌 **Cyberpunk Mode**: Sci-fi/hacker terminology
- 🏴‍☠️ **Pirate Mode**: Fun nautical theme
- 🧙‍♂️**Fantasy Mode**: D&D-style terminology
- 🎸 **Rockstar Mode**: Music industry terms

**Phase 3:** Custom Terminology
- Let users define custom terms
- Team-level terminology (shared across org)
- Import/export terminology packs

---

## 🎯 Core Objectives

### Primary Objectives
1. **Add Task Planning Layer** between Projects and Missions
2. **Enable Task Lifecycle Management** (TODO → IN_PROGRESS → COMPLETED)
3. **Implement Task Prioritization** (LOW, MEDIUM, HIGH, URGENT)
4. **Add Time Estimation** to track planned vs actual
5. **Create Task Detail View** with rich editing capabilities
6. **Build Task Board View** (Kanban-style) for each project
7. **Enhance Project Detail Page** with task progress metrics

### Secondary Objectives
1. Add task categories/tags (Backend, Frontend, DevOps, Design, etc.)
2. Implement task subtasks/checklists
3. Add task dependencies (blocking/blocked by relationships)
4. Create milestone system for grouping tasks
5. Add task templates for common work patterns
6. Implement task search and advanced filtering
7. Add task activity timeline/history

---

## 📊 Data Model Changes

### New Data Models

```typescript
// Task (NEW)
interface TaskData {
  task_id: string;
  project_id: string;           // Link to project
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  category?: string;             // Backend, Frontend, DevOps, etc.
  estimated_min?: number;        // Estimated time in minutes
  actual_min?: number;           // Actual time spent (sum of missions)
  assigned_to?: string;          // User ID (future: team feature)
  parent_task_id?: string;       // For subtasks
  milestone_id?: string;         // Link to milestone (future)
  tags?: string[];               // Custom tags
  position: number;              // For ordering
  due_date?: string;             // ISO date string
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

// Mission (ENHANCED)
interface MissionData {
  mission_id: string;
  project_id: string;            // Existing
  task_id?: string;              // NEW: Link to task
  title: string;
  description?: string;
  duration_min: number;
  category?: string;             // NEW: Inherit from task or manual
  created_at: string;
  created_by?: string;           // User ID (future)
}

// Milestone (FUTURE - Phase 2)
interface MilestoneData {
  milestone_id: string;
  project_id: string;
  title: string;
  description?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  due_date?: string;
  position: number;
  created_at: string;
  completed_at?: string;
}
```

### Enhanced Type Definitions

```typescript
// Client-side types
export interface Task {
  taskId: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  category?: TaskCategory;
  estimatedMin?: number;
  actualMin?: number;
  assignedTo?: string;
  parentTaskId?: string;
  milestoneId?: string;
  tags: string[];
  position: number;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TaskCategory = 'Backend' | 'Frontend' | 'Mobile' | 'DevOps' | 'Design' | 'Testing' | 'Documentation' | 'Other';

export interface Milestone {
  milestoneId: string;
  projectId: string;
  title: string;
  description?: string;
  status: MilestoneStatus;
  dueDate?: string;
  position: number;
  createdAt: string;
  completedAt?: string;
}

export type MilestoneStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
```

### Relationship Diagram

```
Project (1)
  ├── Milestone (0..*)      [Phase 2]
  │    └── Task (0..*)
  ├── Task (0..*)           [NEW - Phase 1]
  │    ├── Subtask (0..*)   [parent_task_id]
  │    └── Mission (0..*)   [task_id]
  └── Mission (0..*)        [existing - no task link]
```

---

## 🎨 User Interface Design

### 1. Project Detail Page Enhancements

**Location:** `/projects/[projectId]`

**New Sections:**

#### A. Task Progress Summary (NEW)
```
┌─────────────────────────────────────────────────────────────┐
│ 🎯 SECTOR: E-Commerce Platform                              │
│ Progress: 65%                                                │
├─────────────────────────────────────────────────────────────┤
│ 📊 Task Statistics                                          │
│ ┌──────────┬──────────┬──────────┬──────────┐              │
│ │  TODO    │ IN PROG  │COMPLETED │  TOTAL   │              │
│ │    8     │    3     │    15    │    26    │              │
│ └──────────┴──────────┴──────────┴──────────┘              │
│ ⏱️  Time Tracking                                           │
│ Estimated: 42h  |  Actual: 38h  |  Remaining: ~4h          │
│                                                               │
│ [📝 Accept Quest]  [⏱️  Record Battle]  [⚙️  Sector Settings]│
└─────────────────────────────────────────────────────────────┘
```

**Action Buttons:**
- **Accept Quest** (Professional: Create Task): Opens task creation modal
- **Record Battle** (Professional: Log Time): Opens battle log modal with project auto-assigned
- **Sector Settings** (Professional: Project Settings): Edit project details

#### B. Task Board View (NEW - Kanban)
```
┌──────────────────────────────────────────────────────────────────────┐
│ 📋 TASK BOARD                                   [📋 List] [🔍 Search]│
├──────────────┬───────────────┬───────────────────────────────────────┤
│ 📝 TODO (8)  │ ⚡ IN PROGRESS │ ✅ COMPLETED (15)                    │
├──────────────┼───────────────┼───────────────────────────────────────┤
│ 🔴 URGENT    │ 🟡 MEDIUM     │                                       │
│ Fix auth bug │ Build API     │ Setup project                        │
│ est: 2h      │ est: 8h       │ est: 1h  | act: 45m                   │
│              │ act: 3h       │                                       │
├──────────────┤               ├───────────────────────────────────────┤
│ 🟠 HIGH      │ 🟢 LOW        │ Design schema                         │
│ Add search   │ Update docs   │ est: 2h  | act: 2h                    │
│ est: 4h      │ est: 1h       │                                       │
├──────────────┤               ├───────────────────────────────────────┤
│ 🟡 MEDIUM    │               │ Implement auth                       │
│ Write tests  │               │ est: 6h  | act: 5h                    │
│ est: 3h      │               │                                       │
└──────────────┴───────────────┴───────────────────────────────────────┘
```

#### C. Task List View (Enhanced Existing)
```
┌─────────────────────────────────────────────────────────────────────┐
│ 📋 TASKS                                              [+ New Task]   │
│ Filter: [All▼] [Status▼] [Priority▼] [Category▼]     [📊 Board View]│
├─────────────────────────────────────────────────────────────────────┤
│ 🔴 URGENT  ⚡ IN PROGRESS                                            │
│ 🔐 Fix authentication timeout error                                 │
│ └─ Backend • est: 2h • act: 1.5h • 📅 Due: Jan 2                   │
│    [Add Mission] [Edit] [Complete]                                  │
├─────────────────────────────────────────────────────────────────────┤
│ 🟠 HIGH  📝 TODO                                                     │
│ 🔍 Implement global search functionality                           │
│ └─ Frontend • est: 4h • 📅 Due: Jan 5                              │
│    [Start] [Edit] [Delete]                                          │
├─────────────────────────────────────────────────────────────────────┤
│ 🟡 MEDIUM  ✅ COMPLETED                                              │
│ 🗄️  Setup database schema                                          │
│ └─ Backend • est: 2h • act: 2h • ✅ Jan 1                          │
│    [View Missions (2)] [Reopen]                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 2. Task Detail Modal (NEW)

**Trigger:** Click on task card

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────┐
│ ⚡ Fix authentication timeout error                    [×]          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                     │
│ 📊 Status: [⚡ In Progress ▼]  🎯 Priority: [🔴 High ▼]           │
│ 🏷️  Category: [Backend ▼]  📅 Due: [Jan 2, 2026]                  │
│                                                                     │
│ 📝 Description                                                      │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │ Users are experiencing timeout errors when logging in. Need     ││
│ │ to investigate token expiration and refresh logic.              ││
│ │ Root cause appears to be in the JWT validation middleware.      ││
│ └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│ ⏱️  Time Tracking                                                   │
│ 📊 Estimated: 2h  |  ⏱️  Actual: 1h 30m  |  📈 Variance: -30m     │
│                                                                     │
│ 📋 Missions (2)                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │ ✅ Investigate JWT middleware              45m  •  Jan 1, 10:00 ││
│ │ ⚡ Fix token refresh logic              45m  •  Jan 1, 14:30   ││
│ │ [+ Log Mission]                                                    ││
│ └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│ 🏷️  Tags: #bug #auth #urgent                                       │
│ 🔗 Related Tasks: [Update login UI]                                │
│                                                                     │
│ 📅 Created: Jan 1, 2026  •  Updated: Jan 1, 2026  •  By: Architect │
│                                                                     │
│              [🗑️ Delete]  [💾 Save]  [✅ Mark Complete]            │
└─────────────────────────────────────────────────────────────────────┘
```

### 3. Create/Edit Task Modal (NEW)

**Create Mode:**
```
┌─────────────────────────────────────────────────────────────────────┐
│ ✨ Create New Task                                    [×]          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                     │
│ 📌 Task Title *                                                    │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │ Implement user profile page                                     ││
│ └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│ 📝 Description (optional)                                          │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │ Create profile page with avatar, stats, and settings            ││
│ │                                                                  ││
│ └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│ 📊 Details                                                         │
│ ┌───────────────────────┬─────────────────────────────────────────┐│
│ │ Status:               │ Priority:                               ││
│ │ [📝 TODO ▼]           │ [🟡 MEDIUM ▼]                           ││
│ ├───────────────────────┼─────────────────────────────────────────┤│
│ │ Category:             │ Project:                                ││
│ │ [Frontend ▼]          │ [E-Commerce Platform ▼]                 ││
│ ├───────────────────────┼─────────────────────────────────────────┤│
│ │ Estimated Time:       │ Due Date:                               ││
│ │ [4] hours             │ [Pick date 📅]                          ││
│ ├───────────────────────┴─────────────────────────────────────────┤│
│ │ Tags: (press Enter to add)                                      ││
│ │ [#ui      ] [#user-profile      ]                               ││
│ └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│ 🔗 Advanced Options (optional)                                     │
│ │ □ Parent Task: [None ▼]                                         ││
│ │ □ Milestone: [None ▼]                                           ││
│ │ □ Related Tasks: [Select tasks...]                              ││
│                                                                     │
│                   [Cancel]  [✨ Create Task]                       │
└─────────────────────────────────────────────────────────────────────┘
```

**Edit Mode:** Same form with pre-filled data + "Delete" button

### 4. Log Mission/Battle Log Modal (Enhanced)

**Existing:** Linked only to project
**NEW:** Link to task (optional) + Auto-assign project when opened from project detail page

**Professional Mode:** Log Time Entry
**Odyssey Mode:** Record Battle

**Key Changes:**
- When opened from project detail page via "Record Battle" button, project is **automatically assigned** (no project selection needed)
- User only needs to provide: Title, Duration, and optionally link to a Quest
- This streamlines the workflow for quick logging

```
┌─────────────────────────────────────────────────────────────────────┐
│ ⏱️  Record Battle (auto-assigned to: E-Commerce Platform) [×]     │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                     │
│ 📌 What did you work on? *                                         │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │ Implemented profile header component                            ││
│ └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│ 🔗 Link to Quest (optional)                                       │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │ [Implement user profile page ⚡]                                ││
│ └─────────────────────────────────────────────────────────────────┘│
│ 💡 Tip: Linking to quest updates time tracking                    │
│                                                                     │
│ 📊 Details                                                         │
│ ┌───────────────────────┬─────────────────────────────────────────┐│
│ │ Duration:             │ Category:                               ││
│ │ [45] minutes          │ [Frontend ▼]                            ││
│ └───────────────────────┴─────────────────────────────────────────┘│
│                                                                     │
│ 📝 Notes (optional)                                                │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │ Used Shadcn UI components, added avatar and stats               ││
│ └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│                        [Cancel]  [✅ Record Battle]                │
└─────────────────────────────────────────────────────────────────────┘
```

**Note:** Project field is **hidden** when opened from project detail page since it's pre-filled. Only shown when creating from global/dashboard view.

---

## 🔧 Technical Implementation

### Phase 1: Core Task Management (MVP)

#### 1.1 Backend/API Layer

**Files to Create:**
- `services/mock-api.ts` - Add `taskApi` object
- `lib/types.ts` - Add Task-related types
- `lib/transformers.ts` - Add task transformers
- `lib/validations.ts` - Add task Zod schemas

**New API Endpoints (Mock):**

```typescript
// services/mock-api.ts - Add to existing file

export const taskApi = {
  getTasks: async (projectId?: string): Promise<ApiResponse<TaskData[]>> => {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    let tasks = stored ? JSON.parse(stored) : [];

    if (projectId) {
      tasks = tasks.filter((t: TaskData) => t.project_id === projectId);
    }

    return { success: true, data: tasks };
  },

  getTaskById: async (taskId: string): Promise<ApiResponse<TaskData>> => {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    const tasks: TaskData[] = stored ? JSON.parse(stored) : [];
    const task = tasks.find(t => t.task_id === taskId);

    if (task) {
      return { success: true, data: task };
    }
    return { success: false, error: 'Task not found' };
  },

  createTask: async (data: Omit<TaskData, 'task_id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<TaskData>> => {
    await simulateDelay();
    if (shouldSimulateError()) return { success: false, error: 'Network failure' };

    const newTask: TaskData = {
      task_id: `task_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      actual_min: 0,
      tags: [],
      position: Date.now(),
      ...data,
    };

    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    const tasks = stored ? JSON.parse(stored) : [];
    tasks.push(newTask);
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));

    return { success: true, data: newTask };
  },

  updateTask: async (taskId: string, updates: Partial<TaskData>): Promise<ApiResponse<TaskData>> => {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    const tasks: TaskData[] = stored ? JSON.parse(stored) : [];
    const index = tasks.findIndex(t => t.task_id === taskId);

    if (index !== -1) {
      // If marking as completed, set completed_at
      if (updates.status === 'COMPLETED' && !tasks[index].completed_at) {
        updates.completed_at = new Date().toISOString();
      }

      tasks[index] = { ...tasks[index], ...updates, updated_at: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      return { success: true, data: tasks[index] };
    }
    return { success: false, error: 'Task not found' };
  },

  deleteTask: async (taskId: string): Promise<ApiResponse<{ deleted: boolean }>> => {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    const tasks: TaskData[] = stored ? JSON.parse(stored) : [];
    const filtered = tasks.filter(t => t.task_id !== taskId);
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(filtered));
    return { success: true, data: { deleted: true } };
  },

  // Update actual_min when mission is linked to task
  updateTaskTime: async (taskId: string, durationMin: number): Promise<ApiResponse<TaskData>> => {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    const tasks: TaskData[] = stored ? JSON.parse(stored) : [];
    const index = tasks.findIndex(t => t.task_id === taskId);

    if (index !== -1) {
      tasks[index].actual_min = (tasks[index].actual_min || 0) + durationMin;
      tasks[index].updated_at = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      return { success: true, data: tasks[index] };
    }
    return { success: false, error: 'Task not found' };
  },
};
```

#### 1.2 Hooks Layer

**Files to Create:**
- `hooks/use-tasks.ts` - Task management hook

```typescript
// hooks/use-tasks.ts

'use client';

import { useState, useEffect } from 'react';
import { taskApi } from '@/services/mock-api';
import { Task } from '@/lib/types';
import { transformTaskData, toTaskData } from '@/lib/transformers';
import { toast } from '@/components/ui/use-toast';

export function useTasks(projectId?: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const fetchTasks = async () => {
    setIsLoading(true);
    const response = await taskApi.getTasks(projectId);

    if (response.success && response.data) {
      setTasks(response.data.map(transformTaskData));
    }
    setIsLoading(false);
  };

  const createTask = async (taskData: Omit<Task, 'taskId' | 'createdAt' | 'updatedAt'>) => {
    const response = await taskApi.createTask(toTaskData(taskData) as any);

    if (response.success && response.data) {
      const newTask = transformTaskData(response.data);
      setTasks((prev) => [...prev, newTask]);
      toast({ title: '✨ Task Created!' });
      return { success: true, data: newTask };
    } else {
      toast({
        title: 'Failed to create task',
        description: response.error,
        variant: 'destructive',
      });
      return { success: false, error: response.error };
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    // Optimistic update
    setTasks((prev) =>
      prev.map((t) =>
        t.taskId === taskId ? { ...t, ...updates } : t
      )
    );

    const response = await taskApi.updateTask(taskId, toTaskData(updates));

    if (response.success && response.data) {
      const updatedTask = transformTaskData(response.data);
      setTasks((prev) =>
        prev.map((t) => (t.taskId === taskId ? updatedTask : t))
      );
      toast({ title: 'Task updated' });
      return { success: true, data: updatedTask };
    } else {
      // Rollback on error
      await fetchTasks();
      toast({
        title: 'Failed to update task',
        description: response.error,
        variant: 'destructive',
      });
      return { success: false, error: response.error };
    }
  };

  const deleteTask = async (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.taskId !== taskId));

    const response = await taskApi.deleteTask(taskId);

    if (response.success) {
      toast({ title: 'Task deleted' });
    } else {
      await fetchTasks();
      toast({
        title: 'Failed to delete task',
        description: response.error,
        variant: 'destructive',
      });
    }
  };

  const updateTaskTime = async (taskId: string, durationMin: number) => {
    const response = await taskApi.updateTaskTime(taskId, durationMin);

    if (response.success && response.data) {
      const updatedTask = transformTaskData(response.data);
      setTasks((prev) =>
        prev.map((t) => (t.taskId === taskId ? updatedTask : t))
      );
    }
  };

  const getTaskById = (taskId: string): Task | undefined => {
    return tasks.find((t) => t.taskId === taskId);
  };

  // Computed values
  const taskStats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'TODO').length,
    inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
    completed: tasks.filter(t => t.status === 'COMPLETED').length,
    estimatedTotal: tasks.reduce((sum, t) => sum + (t.estimatedMin || 0), 0),
    actualTotal: tasks.reduce((sum, t) => sum + (t.actualMin || 0), 0),
  };

  return {
    tasks,
    isLoading,
    taskStats,
    createTask,
    updateTask,
    deleteTask,
    updateTaskTime,
    getTaskById,
    refetch: fetchTasks,
  };
}
```

#### 1.3 UI Components

**Files to Create:**

1. **Task Card Component**
   - `components/task/task-card.tsx`

2. **Task List Component**
   - `components/task/task-list.tsx`

3. **Task Board Component**
   - `components/task/task-board.tsx`

4. **Task Modal (Create/Edit)**
   - `components/task/task-modal.tsx`

5. **Task Detail Modal**
   - `components/task/task-detail-modal.tsx`

6. **Task Stats Summary**
   - `components/task/task-stats.tsx`

**Files to Modify:**

1. **Project Detail Page**
   - `app/projects/[projectId]/page.tsx`
   - Add task sections, use `useTasks` hook
   - Add task stats summary
   - Add task list/board toggle

2. **Mission Modal**
   - `components/mission/mission-modal.tsx` (if exists) or create it
   - Add task selection dropdown
   - Link mission to task when logging

3. **Mission Timeline**
   - `components/project/mission-timeline.tsx`
   - Show linked task info

4. **Dashboard**
   - `app/dashboard/page.tsx`
   - Add "Recent Tasks" section
   - Show tasks from active projects

#### 1.4 Storage & Constants

**Files to Modify:**

1. **lib/constants.ts**
   ```typescript
   export const STORAGE_KEYS = {
     // ... existing
     TASKS: 'odyssey_tasks',
     MILESTONES: 'odyssey_milestones', // Phase 2
   } as const;

   export const TASK_STATUS = {
     TODO: 'TODO',
     IN_PROGRESS: 'IN_PROGRESS',
     COMPLETED: 'COMPLETED',
     CANCELLED: 'CANCELLED',
   } as const;

   export const TASK_PRIORITY = {
     LOW: 'LOW',
     MEDIUM: 'MEDIUM',
     HIGH: 'HIGH',
     URGENT: 'URGENT',
   } as const;

   export const TASK_CATEGORY = [
     'Backend',
     'Frontend',
     'Mobile',
     'DevOps',
     'Design',
     'Testing',
     'Documentation',
     'Other',
   ] as const;
   ```

---

## 📝 Acceptance Criteria

### Phase 1: MVP - Core Task Management

#### Epic 0: Dual Terminology System ⭐ UNIQUE FEATURE
**As a** user
**I want to** switch between Professional and Odyssey terminology modes
**So that** I can choose a style that fits my context (work vs personal)

**Acceptance Criteria:**

- [ ] **Terminology Foundation**
  - [ ] Create `lib/terminology.ts` with complete term mappings
  - [ ] Define TerminologyMode type ('PROFESSIONAL' | 'ODYSSEY')
  - [ ] Create TERMINOLOGY constant with all terms for both modes
  - [ ] Create useTerminology() hook for accessing terms

- [ ] **Mode Selection UI**
  - [ ] Add terminology toggle in settings/profile menu
  - [ ] Radio buttons: 🎯 Professional Mode (default) / 🎮 Odyssey Mode
  - [ ] Preview button to show sample terms before switching
  - [ ] Apply button to save selection
  - [ ] Mode preference saved to localStorage in profile

- [ ] **Dynamic Labels Throughout App**
  - [ ] Update all Task-related UI to use dynamic terms
  - [ ] Update all Mission/Time Entry UI to use dynamic terms
  - [ ] Update all Status badges (TODO/IN_PROGRESS/COMPLETED)
  - [ ] Update all Priority badges (LOW/MEDIUM/HIGH/URGENT)
  - [ ] Update all button labels (Create, Edit, Delete, etc.)
  - [ ] Update all empty state messages
  - [ ] Update all toast notifications
  - [ ] Update all page headings and titles

- [ ] **Mode Persistence**
  - [ ] Selected mode persists across sessions
  - [ ] Default to PROFESSIONAL mode for new users
  - [ ] Mode selection syncs with profile data
  - [ ] Mode change reflects immediately without page reload

- [ ] **Testing**
  - [ ] Verify all terms in Professional mode display correctly
  - [ ] Verify all terms in Odyssey mode display correctly
  - [ ] Test mode switching doesn't break functionality
  - [ ] Test mode persistence across browser refresh
  - [ ] Test all existing features still work in both modes

**Priority:** HIGH (This is a key differentiator feature)

#### Epic 1: Task CRUD Operations
**As a** user tracking project work
**I want to** create, read, update, and delete tasks
**So that** I can plan and manage my work effectively

**Acceptance Criteria:**

- [ ] **Create Task**
  - [ ] User can create task from project detail page
  - [ ] Required fields: Title, Project
  - [ ] Optional fields: Description, Status, Priority, Category, Estimate, Due Date, Tags
  - [ ] Default values: Status=TODO, Priority=MEDIUM, Category=None, Estimate=0
  - [ ] Task appears in task list immediately (optimistic UI)
  - [ ] Toast notification on success
  - [ ] Error handling with rollback on failure

- [ ] **View Tasks**
  - [ ] Tasks display in project detail page
  - [ ] Tasks grouped by status (TODO, IN_PROGRESS, COMPLETED)
  - [ ] Task card shows: Title, Status badge, Priority badge, Category, Estimate, Due date
  - [ ] Clicking task opens detail modal
  - [ ] Empty state shown when no tasks exist
  - [ ] Loading skeleton shown while fetching

- [ ] **Edit Task**
  - [ ] User can edit task from detail modal or inline edit
  - [ ] All fields editable except taskId, createdAt
  - [ ] Changes save immediately (optimistic UI)
  - [ ] Changes persist across page refreshes
  - [ ] Toast notification on success
  - [ ] Error handling with rollback on failure

- [ ] **Delete Task**
  - [ ] Delete button in task detail modal
  - [ ] Confirmation dialog before deletion
  - [ ] Task removed from UI immediately (optimistic)
  - [ ] Linked missions preserved (orphaned but not deleted)
  - [ ] Toast notification on success
  - [ ] Error handling with rollback on failure

#### Epic 2: Task Status & Priority Management
**As a** user managing multiple tasks
**I want to** change task status and priority
**So that** I can track progress and focus on important work

**Acceptance Criteria:**

- [ ] **Status Changes**
  - [ ] Status dropdown: TODO, IN_PROGRESS, COMPLETED, CANCELLED
  - [ ] Visual badges with colors (TODO=gray, IN_PROGRESS=blue, COMPLETED=green, CANCELLED=red)
  - [ ] Status change updates `updatedAt` timestamp
  - [ ] When status → COMPLETED, `completedAt` timestamp set
  - [ ] Task moves to appropriate section in list view
  - [ ] Task moves to appropriate column in board view

- [ ] **Priority Levels**
  - [ ] Priority dropdown: LOW, MEDIUM, HIGH, URGENT
  - [ ] Visual badges with colors (LOW=gray, MEDIUM=yellow, HIGH=orange, URGENT=red)
  - [ ] Tasks sorted by priority within each status group
  - [ ] URGENT tasks shown at top
  - [ ] Priority indicator visible on task card

#### Epic 3: Task Time Tracking
**As a** user planning and executing work
**I want to** estimate and track time for tasks
**So that** I can improve my planning accuracy

**Acceptance Criteria:**

- [ ] **Time Estimation**
  - [ ] User can set estimated time when creating task (in hours/minutes)
  - [ ] Estimate displayed on task card
  - [ ] Estimate editable in task detail
  - [ ] Total project estimate shown in project stats

- [ ] **Actual Time Tracking**
  - [ ] When mission linked to task, duration added to task's `actualMin`
  - [ ] Actual time displayed on task card
  - [ ] Variance shown (estimate - actual) with color coding
    - Green: Within 20% of estimate
    - Yellow: 20-50% over/under
    - Red: >50% over/under
  - [ ] Actual time = sum of all linked missions' durations

- [ ] **Time Stats**
  - [ ] Project detail page shows:
    - Total estimated time for all tasks
    - Total actual time for all tasks
    - Remaining estimate (estimated - actual for incomplete tasks)
  - [ ] Task detail modal shows time breakdown

#### Epic 4: Mission-Task Linking
**As a** user logging work sessions
**I want to** link missions to tasks
**So that** I can track actual time against planned tasks

**Acceptance Criteria:**

- [ ] **Link Mission to Task (Optional)**
  - [ ] When logging mission, dropdown shows tasks from selected project
  - [ ] User can select task or leave unlinked
  - [ ] If task selected, mission's `taskId` field populated
  - [ ] Task's `actualMin` incremented by mission duration
  - [ ] Task inherits category from mission if not set

- [ ] **View Linked Missions**
  - [ ] Task detail modal shows all linked missions
  - [ ] Missions sorted by date (newest first)
  - [ ] Each mission shows title, duration, date
  - [ ] Click mission to view details (future)

- [ ] **Filter Missions by Task**
  - [ ] Mission timeline on project page can filter by task
  - [ ] Checkbox to show only missions for selected task
  - [ ] "All tasks" option to show all missions

#### Epic 5: Task Organization Features
**As a** user managing many tasks
**I want to** categorize and tag tasks
**So that** I can find and organize them effectively

**Acceptance Criteria:**

- [ ] **Task Categories**
  - [ ] Predefined categories: Backend, Frontend, Mobile, DevOps, Design, Testing, Documentation, Other
  - [ ] Category dropdown when creating/editing task
  - [ ] Category badge shown on task card
  - [ ] Filter tasks by category
  - [ ] Category stats shown in project page

- [ ] **Task Tags**
  - [ ] User can add custom tags (press Enter to add)
  - [ ] Tags displayed as chips on task card
  - [ ] Multiple tags allowed per task
  - [ ] Tags can be removed by clicking ×
  - [ ] Filter tasks by tag (future)
  - [ ] Tag suggestions based on existing tags

- [ ] **Due Dates**
  - [ ] User can set due date (date picker)
  - [ ] Due date shown on task card
  - [ ] Overdue tasks highlighted (red text)
  - [ ] Tasks due today highlighted (yellow text)
  - [ ] Sort tasks by due date

#### Epic 6: Task Views & Filtering
**As a** user managing tasks
**I want to** view and filter tasks in different ways
**So that** I can focus on what's relevant

**Acceptance Criteria:**

- [ ] **List View**
  - [ ] Tasks shown in vertical list grouped by status
  - [ ] Each task shows full details in card
  - [ ] Expand/collapse status groups
  - [ ] Tasks sorted by priority within groups

- [ ] **Board View (Kanban)**
  - [ ] Tasks shown in columns by status
  - [ ] Drag-and-drop to change status (future - Phase 2)
  - [ ] Columns: TODO, IN_PROGRESS, COMPLETED
  - [ ] Toggle between list and board view
  - [ ] View preference saved in localStorage

- [ ] **Filtering**
  - [ ] Filter by status (checkboxes)
  - [ ] Filter by priority (checkboxes)
  - [ ] Filter by category (dropdown)
  - [ ] Search by title/description (text input)
  - [ ] Filters combine (AND logic)
  - [ ] Clear all filters button

#### Epic 7: Task Statistics & Progress
**As a** user reviewing project progress
**I want to** see task statistics and progress metrics
**So that** I can understand project health

**Acceptance Criteria:**

- [ ] **Task Stats Summary**
  - [ ] Shown on project detail page
  - [ ] Shows: Total tasks, TODO count, In Progress count, Completed count
  - [ ] Visual progress bar (completed / total)
  - [ ] Click stat to filter to that status

- [ ] **Time Stats Summary**
  - [ ] Shown on project detail page
  - [ ] Shows: Total estimated time, Total actual time, Remaining estimate
  - [ ] Variance percentage with color coding
  - [ ] Breakdown by category (future)

- [ ] **Task Completion Rate**
  - [ ] Calculate: (Completed / Total) × 100
  - [ ] Show as percentage and progress bar
  - [ ] Trend indicator (improving/declining) (future)

#### Epic 8: Enhanced Mission Logging
**As a** user logging work sessions
**I want to** link missions to tasks for better tracking
**So that** I can see planned vs actual time

**Acceptance Criteria:**

- [ ] **Mission Modal Enhancement**
  - [ ] Add "Link to Task" dropdown (optional)
  - [ ] Show only tasks from selected project
  - [ ] Show task status and priority in dropdown
  - [ ] Category pre-filled from task if selected
  - [ ] Help text: "Linking to task updates time tracking"

- [ ] **Auto-Update Task Time**
  - [ ] When mission created with taskId linked:
    - Mission saved with taskId
    - Task's actualMin incremented by mission duration
    - Task's updatedAt timestamp updated
  - [ ] When mission deleted:
    - Task's actualMin decremented (if linked)
    - Task's updatedAt timestamp updated

- [ ] **Mission-Task Display**
  - [ ] Mission timeline shows linked task name
  - [ ] Task detail shows linked missions
  - [ ] Cross-linking between both views

---

## 🚀 Implementation Plan

### Phase 1: MVP - Core Task Management (Week 1-2)

**Sprint 1: Foundation (Days 1-3)**
- Day 1: Data models, types, transformers, validations
- Day 2: Mock API layer (taskApi)
- Day 3: Hook layer (useTasks) + **Terminology System** (lib/terminology.ts)

**Sprint 2: UI Components (Days 4-7)**
- Day 4: TaskCard, TaskList components
- Day 5: TaskStats component
- Day 6: TaskModal (create/edit)
- Day 7: TaskDetailModal

**Sprint 3: Integration (Days 8-10)**
- Day 8: Update ProjectDetailPage with task sections
- Day 9: Enhance Mission modal for task linking
- Day 10: Update MissionTimeline to show linked tasks

**Sprint 4: Views, Polish & Terminology (Days 11-14)**
- Day 11: Task board (Kanban) view
- Day 12: Filtering and search
- Day 13: **Implement terminology toggle UI** + apply dynamic labels throughout
- Day 14: Testing, bug fixes, edge cases, documentation

### Phase 2: Advanced Features (Future - TBD)

**Subtasks & Dependencies**
- Parent-child task relationships
- Task dependencies (blocking/blocked by)
- Dependency visualization

**Milestones**
- Milestone CRUD
- Group tasks by milestone
- Milestone progress tracking

**Task Templates**
- Predefined task templates
- Quick-create from template
- Template library

**Collaboration (Future)**
- Task assignment
- Comments on tasks
- Activity feed
- Notifications

**Analytics (Future)**
- Burndown charts
- Velocity tracking
- Estimation accuracy trends
- Time distribution charts

---

## 🧪 Testing Strategy

### Unit Testing
- [ ] Task API functions (create, update, delete, get)
- [ ] Task transformers (snake_case ↔ camelCase)
- [ ] Task validation schemas (Zod)
- [ ] Task stats calculations

### Integration Testing
- [ ] Create task → appears in list
- [ ] Update task → reflects in UI
- [ ] Delete task → removed from list
- [ ] Link mission to task → task time updated
- [ ] Filter tasks → correct results
- [ ] Search tasks → correct results

### E2E Testing (Manual)
- [ ] Create task from project page
- [ ] Edit task details
- [ ] Change task status through workflow
- [ ] Link mission to task
- [ ] View task stats and progress
- [ ] Filter and search tasks
- [ ] Toggle between list and board view

### Edge Cases
- [ ] Create task without required fields
- [ ] Delete task with linked missions
- [ ] Update task time when mission deleted
- [ ] Handle orphaned missions (task deleted)
- [ ] Zero tasks in project
- [ ] Very long task titles/descriptions
- [ ] Special characters in tags
- [ ] Invalid due dates

---

## 📊 Success Metrics

### Usage Metrics
- **Task Creation Rate**: Average tasks created per project
- **Task Completion Rate**: Percentage of tasks marked COMPLETED
- **Mission-Task Link Rate**: Percentage of missions linked to tasks
- **Estimation Accuracy**: Average variance between estimate and actual

### User Engagement
- **Task Edit Frequency**: How often tasks are updated
- **View Toggle**: List vs Board view usage
- **Filter Usage**: How often filters are applied
- **Task Detail Views**: How often task details opened

### Quality Metrics
- **Adoption**: % of projects with at least 1 task
- **Completion**: % of tasks completed within 7 days
- **Planning**: % of tasks created before mission logged
- **Accuracy**: % of tasks with actual within 20% of estimate

---

## 🚧 Known Limitations & Risks

### Technical Limitations
1. **No Real Backend**: All data in localStorage, vulnerable to data loss
2. **No Sync**: No cross-device synchronization
3. **No Collaboration**: Single-user system
4. **Performance**: Large task lists may slow down (no pagination)
5. **No Offline Support**: Requires localStorage available

### User Experience Risks
1. **Overhead**: Users may find task creation burdensome
2. **Adoption**: Users may continue using missions only
3. **Accuracy**: Estimates may be guessed, not measured
4. **Maintenance**: Tasks may become stale if not updated

### Mitigation Strategies
1. **Make Tasks Optional**: Missions can still exist without tasks
2. **Quick Creation**: Minimal required fields, smart defaults
3. **Auto-Link**: Suggest tasks when logging missions
4. **Bulk Actions**: Bulk status update, bulk delete (future)
5. **Smart Suggestions**: Auto-suggest tags, categories based on history

---

## 🔄 Migration Strategy

### Data Migration
- Existing missions remain unchanged (backward compatible)
- New tasks created going forward
- Optional: Bulk import missions as tasks (one-time script)

### User Communication
- In-app tutorial on first visit to project detail page
- Help tooltips on new features
- Example tasks created for new users

### Feature Rollout
- Phase 1 features rolled out together
- Feature flags for gradual rollout (future)
- A/B testing for task modal placement (future)

---

## 📚 Open Questions

1. **Task Deletion**: Should linked missions be deleted or orphaned?
   - **Recommendation**: Orphan missions but show warning

2. **Default View**: Should default be list or board view?
   - **Recommendation**: List view (simpler, board view in Phase 2)

3. **Task Required**: Should tasks be required before logging missions?
   - **Recommendation**: No, keep optional for flexibility

4. **Estimation Required**: Should estimates be mandatory?
   - **Recommendation**: No, optional field

5. **Subtasks in Phase 1**: Include or defer to Phase 2?
   - **Recommendation**: Defer to Phase 2 (focus on core first)

6. **Task Limits**: Should we limit tasks per project?
   - **Recommendation**: No limit initially, monitor performance

7. **Task Archival**: Should completed tasks be archived after X days?
   - **Recommendation**: No, keep all for history (future: archive view)

---

## 📖 Appendix

### Glossary
- **Project**: High-level initiative or sector
- **Task**: Planned work item with status, priority, estimate
- **Mission**: Logged work session (time spent)
- **Milestone**: Grouping of tasks for deliverable tracking (Phase 2)
- **Subtask**: Nested task within parent task (Phase 2)

### User Personas
- **ArchitectPrime**: Primary user, developer tracking project work
- **Features**:
  - Needs to plan work before executing
  - Wants to track time vs estimates
  - Manages multiple concurrent projects
  - Values detailed progress tracking

### Future Enhancements (Out of Scope for PRD)
- Task comments/discussion
- File attachments to tasks
- Task reminders/notifications
- Calendar view of tasks
- Task recurrence
- Time blocking (schedule tasks on calendar)
- AI-powered task suggestions
- Integration with external tools (GitHub, Jira, etc.)
- Mobile app (React Native)
- Dark/light theme toggle
- Custom priority levels
- Task templates library
- Bulk operations (bulk edit, bulk delete)
- Task dependencies visualization (graph view)
- Sprint planning (group tasks into sprints)
- Release planning (group sprints into releases)
- Burn-down charts
- Velocity tracking
- Capacity planning
- Resource allocation (team feature)

---

## ✅ Approval Checklist

- [ ] Product Owner Review
- [ ] Technical Feasibility Review
- [ ] Design Review
- [ ] UX Review
- [ ] Security Review (if applicable)
- [ ] Performance Review
- [ ] Documentation Review

---

**End of PRD**

**Next Steps:**
1. Review this PRD thoroughly
2. Ask questions, clarify requirements
3. Approve or request changes
4. Once approved, move to implementation (Phase 1)

**Questions or Feedback?**
Please review and provide feedback on:
- Feature priorities (anything missing or unnecessary?)
- Technical approach (concerns or suggestions?)
- Timeline (2 weeks for Phase 1 feasible?)
- Acceptance criteria (comprehensive or missing edge cases?)
- UI/UX mockups (need more detail or changes?)

Let's discuss before starting implementation! 🚀
