# 📋 Odyssey HUD 2026 - Task Management

> **For Claude Code:** Read the instructions at the bottom before starting work!

---

## ⚠️ GIT WORKFLOW RULE - READ FIRST

**DO NOT PUSH TO GITHUB AUTOMATICALLY**

When completing tasks:
1. ✅ **DO**: Commit changes locally (`git commit`)
2. ❌ **DO NOT**: Push to remote (`git push`)
3. ✅ **DO**: Report completion with commit hash
4. ✅ **DO**: Wait for user to push manually

**Rationale**: User wants control over when changes are pushed to GitHub.

---

## 🎯 TO DO (Work on these first!)

### Critical Priority - Backend Implementation

- [ ] **[CRITICAL]** Backend API Implementation (Next.js + Supabase)
  - **Estimated:** 12-16 hours total
  - **Context:** Build real API using Next.js API Routes + Supabase to replace mock API
  - **Tech Stack:** Next.js 16 API Routes + Supabase (PostgreSQL) + Prisma ORM
  - **Documentation:** `docs/API_CONTRACT.md`
  - **Subtasks:**

    - [ ] **1.1** Supabase Setup & Prisma Configuration (1-2 hours)
      - Create Supabase project at https://supabase.com
      - Get database connection URL (DATABASE_URL)
      - Install dependencies: `npm install prisma @prisma/client`
      - Initialize Prisma: `npx prisma init`
      - Configure DATABASE_URL in `.env`
      - **Acceptance Criteria:**
        - [ ] Supabase project created
        - [ ] DATABASE_URL in `.env` file
        - [ ] Prisma initialized in project
        - [ ] Can run `npx prisma db push`

    - [ ] **1.2** Database Schema & Migrations (2-3 hours)
      - Create Prisma schema in `prisma/schema.prisma`
      - Define models: User, Profile, Project, Task, Mission
      - Add relations and indexes
      - Run initial migration: `npx prisma db push`
      - **Acceptance Criteria:**
        - [ ] All models created in Supabase
        - [ ] Relations working (cascade delete)
        - [ ] Indexes created
        - [ ] Can view tables in Supabase dashboard

    - [ ] **1.3** API Helper Functions (1 hour)
      - Create `lib/db/prisma.ts` for Prisma client singleton
      - Create `lib/api/response.ts` for apiSuccess/apiError helpers
      - Create `lib/auth.ts` for JWT token utilities
      - Setup httpOnly cookie handling
      - **Acceptance Criteria:**
        - [ ] Prisma client imported as singleton
        - [ ] apiSuccess() and apiError() helpers working
        - [ ] Can set/read httpOnly cookies
        - [ ] JWT encode/decode functions working

    - [ ] **1.4** Authentication API Routes (2-3 hours)
      - Create `app/api/auth/login/route.ts`
      - Create `app/api/auth/logout/route.ts`
      - Create `app/api/auth/validate/route.ts`
      - Create `app/api/auth/refresh/route.ts`
      - Integrate with Supabase Auth
      - **Acceptance Criteria:**
        - [ ] POST /api/auth/login validates with Supabase
        - [ ] Sets httpOnly cookie on successful login
        - [ ] Logout clears cookie
        - [ ] Validate endpoint checks JWT and returns user

    - [ ] **1.5** Profile API Routes (1 hour)
      - Create `app/api/profile/route.ts`
      - GET returns user profile with calculated level
      - PATCH updates profile fields
      - **Acceptance Criteria:**
        - [ ] GET /api/profile returns profile data
        - [ ] PATCH /api/profile updates username/avatar/terminology_mode
        - [ ] Level calculated: `floor(sqrt(total_xp / 60))`

    - [ ] **1.6** Project API Routes (2 hours)
      - Create `app/api/projects/route.ts` (GET, POST)
      - Create `app/api/projects/[project_id]/route.ts` (GET, PATCH, DELETE)
      - Add filtering, pagination, sorting
      - Auto-calculate progress from tasks
      - **Acceptance Criteria:**
        - [ ] All CRUD operations working
        - [ ] Query params: status, page, limit, sort, order
        - [ ] progress = (completed_tasks / total_tasks) * 100
        - [ ] Cascade delete working

    - [ ] **1.7** Task API Routes (2-3 hours)
      - Create `app/api/tasks/route.ts` (GET, POST)
      - Create `app/api/tasks/[task_id]/route.ts` (GET, PATCH, DELETE)
      - Create `app/api/tasks/[task_id]/time/route.ts` (PATCH)
      - Auto-set completed_at on status=COMPLETED
      - **Acceptance Criteria:**
        - [ ] All CRUD operations working
        - [ ] Filter by project_id, status, priority, category
        - [ ] completed_at set automatically
        - [ ] actual_min defaults to 0

    - [ ] **1.8** Mission API Routes (2 hours)
      - Create `app/api/missions/route.ts` (GET, POST)
      - Create `app/api/missions/[mission_id]/route.ts` (DELETE)
      - Side effects: update XP, task time, project progress
      - **Acceptance Criteria:**
        - [ ] Creating mission increments profile.total_xp
        - [ ] If task_id provided, increments task.actual_min
        - [ ] Deleting mission rolls back all changes
        - [ ] Date range filtering working

    - [ ] **1.9** Frontend Integration (2-3 hours)
      - Update `hooks/use-auth.ts` to call `/api/auth/*`
      - Update `hooks/use-profile.ts` to call `/api/profile`
      - Update `hooks/use-projects.ts` to call `/api/projects`
      - Update `hooks/use-tasks.ts` to call `/api/tasks`
      - Update `hooks/use-missions.ts` to call `/api/missions`
      - Remove localStorage data persistence
      - Keep transformers for snake_case ↔ camelCase
      - **Acceptance Criteria:**
        - [ ] All hooks call real API endpoints
        - [ ] No data in localStorage (except token via cookie)
        - [ ] Loading states work
        - [ ] Errors displayed via toast
        - [ ] Optimistic updates still work

    - [ ] **1.10** Cleanup (30 minutes)
      - Delete `services/mock-api.ts`
      - Remove unused localStorage code
      - Update documentation
      - **Acceptance Criteria:**
        - [ ] Mock API file removed
        - [ ] No references to mock-api.ts in codebase
        - [ ] Architecture docs updated

### High Priority

- [ ] **[HIGH]** Add skeleton loading components
  - **Estimated:** 2 hours
  - **Context:** Create placeholder loading states for all major components
  - **Files to create:**
    - `components/skeletons/stat-card-skeleton.tsx`
    - `components/skeletons/quest-item-skeleton.tsx`
    - `components/skeletons/boss-card-skeleton.tsx`
    - `components/skeletons/profile-skeleton.tsx`
  - **Reference:** `.claude/workflows.md` → "Loading States" section
  - **Acceptance Criteria:**
    - [ ] Skeletons match the actual component structure
    - [ ] Shimmer animation effect
    - [ ] Used while data is loading
    - [ ] Responsive design maintained

- [ ] **[HIGH]** Implement quest category filtering
  - **Estimated:** 1 hour
  - **Context:** Add filter buttons to quest log section
  - **Files to modify:** `app/dashboard/page.tsx`
  - **Reference:** `.claude/quick-reference.md` → "Filter Data"
  - **Acceptance Criteria:**
    - [ ] Filter buttons: All, Backend, Frontend, Mobile, DevOps
    - [ ] Active filter highlighted
    - [ ] Quest list updates in real-time
    - [ ] Shows count per category

- [ ] **[HIGH]** Add search functionality to quest log
  - **Estimated:** 1.5 hours
  - **Context:** Search quests by title and description
  - **Files to modify:** `app/dashboard/page.tsx`
  - **Reference:** `.claude/workflows.md` → "Modifying Existing Component"
  - **Acceptance Criteria:**
    - [ ] Search input in quest header
    - [ ] Real-time filtering as you type
    - [ ] Searches title and description
    - [ ] Case-insensitive
    - [ ] Shows "No quests match" when empty

### Medium Priority

- [ ] **[MED]** Add quest duration editing
  - **Estimated:** 1 hour
  - **Context:** Allow editing quest duration after creation
  - **Files to modify:** `app/dashboard/page.tsx`, `hooks/use-quests.ts`
  - **Acceptance Criteria:**
    - [ ] Edit button on quest card
    - [ ] Modal with duration input
    - [ ] Updates XP accordingly
    - [ ] Optimistic UI updates

- [ ] **[MED]** Implement streak tracking
  - **Estimated:** 3 hours
  - **Context:** Track daily quest logging streaks
  - **Files to create:** `lib/streaks.ts`, `hooks/use-streaks.ts`
  - **Acceptance Criteria:**
    - [ ] Calculate current streak
    - [ ] Show longest streak
    - [ ] Display 🔥 fire icon for active streaks
    - [ ] Store in localStorage

- [ ] **[MED]** Add data export/import
  - **Estimated:** 2 hours
  - **Context:** Export all data to JSON, import from backup
  - **Files to create:** `lib/backup.ts`
  - **Acceptance Criteria:**
    - [ ] Export button in settings
    - [ ] Downloads JSON file
    - [ ] Import file input
    - [ ] Validates data before import
    - [ ] Shows success/error toast

### Low Priority

- [ ] **[LOW]** Add confetti animation for level up
  - **Estimated:** 1 hour
  - **Context:** Enhance level up modal with confetti
  - **Package:** `npm install canvas-confetti`
  - **Acceptance Criteria:**
    - [ ] Confetti burst on level up
    - [ ] Animation lasts 3 seconds
    - [ ] Can be disabled in settings

- [ ] **[LOW]** Add keyboard shortcuts
  - **Estimated:** 2 hours
  - **Context:** Power user shortcuts for common actions
  - **Shortcuts to add:**
    - [ ] `Ctrl+K`: Open quest modal
    - [ ] `Ctrl+N`: New quest
    - [ ] `Ctrl+/`: Focus search
    - [ ] `Esc`: Close modals
  - **Acceptance Criteria:**
    - [ ] Shortcuts work globally
    - [ ] Help modal shows all shortcuts
    - [ ] No conflicts with browser shortcuts

---

## 📦 BACKLOG (Not ready yet - DO NOT WORK ON THESE)

- [ ] Achievements system
  - **Status:** Design needed
  - **Blocked by:** Feature specification, UI mockups
  - **Questions:**
    - What achievements to include?
    - What are the milestones?
    - How to display them?

- [ ] Charts and analytics
  - **Status:** Research needed
  - **Blocked by:** Chart library selection (Recharts, Chart.js?)
  - **Questions:**
    - What charts to show?
    - Time range selector?
    - Export charts as images?

- [ ] Calendar view
  - **Status:** Design needed
  - **Blocked by:** UI/UX design
  - **Questions:**
    - Which calendar library?
    - Month/week/day views?
    - How to show quest density?

- [ ] Quest templates
  - **Status:** Planning
  - **Blocked by:** Template definitions
  - **Questions:**
    - What templates to include?
    - Can users create custom templates?
    - How to manage templates?

- [ ] Tags system
  - **Status:** Not started
  - **Blocked by:** Database schema (if adding real backend)
  - **Questions:**
    - Predefined tags or custom?
    - Tag colors?
    - Filter by multiple tags?

- [ ] Multiple profiles
  - **Status:** Not prioritized
  - **Blocked by:** Authentication system redesign
  - **Questions:**
    - How to switch profiles?
    - Separate data for each?
    - Share progress between profiles?

---

## ✅ COMPLETED

- [x] Create project detail page with mission timeline
  - Completed: 2026-01-01
  - Created dynamic route at /projects/[projectId]
  - Implemented vertical mission timeline with date grouping
  - Added project stats cards (missions, time, average)
  - Made project cards clickable on dashboard
  - Commit: d5b7b54

- [x] Implement Task-Driven Project Progress
  - Completed: 2026-01-02
  - Auto-calculate % from task completion
  - Updated `lib/calculations.ts` and UI modals
  - Commit: b38f5ac

- [x] Initialize Next.js 16 project
  - Completed: 2025-12-31
  - Commit: Initial project setup

- [x] Setup project folder structure
  - Completed: 2025-12-31
  - Components, hooks, lib, services created

- [x] Create TypeScript types and interfaces
  - Completed: 2025-12-31
  - All data models defined

- [x] Implement mock API service
  - Completed: 2025-12-31
  - Auth, profile, quests, bosses APIs

- [x] Build authentication system
  - Completed: 2025-12-31
  - Login page, useAuth hook, middleware

- [x] Create reusable UI components
  - Completed: 2025-12-31
  - Button, Card, Input, Dialog, Badge, Progress, Toast

- [x] Build dashboard layout
  - Completed: 2025-12-31
  - Navbar, profile header, stat cards, quest log, boss tracker

- [x] Implement quest logging
  - Completed: 2025-12-31
  - Create, read, delete quests with optimistic updates

- [x] Implement boss tracker
  - Completed: 2025-12-31
  - Active boss, boss history, quarter filters

- [x] Add toast notifications
  - Completed: 2025-12-31
  - Success/error feedback on all actions

- [x] Implement responsive design
  - Completed: 2025-12-31
  - Mobile, tablet, desktop layouts

- [x] Create documentation
  - Completed: 2025-12-31
  - .claude/ folder with guides, README.md

- [x] Fix select dropdown text visibility
  - Completed: 2025-12-31
  - Added `text-foreground` to all select elements

- [x] Fix login loading state
  - Completed: 2025-12-31
  - SetIsLoading(false) added to useAuth hook

- [x] Fix authentication redirect
  - Completed: 2025-12-31
  - Token stored in both localStorage and cookie

- [x] Create global table component and project list page
  - Completed: 2026-01-01
  - Created reusable `Table` and `Pagination` components
  - Implemented `/projects` page with search, filter, sort, and pagination
  - Added "See All" link to dashboard

---

## 📝 Instructions for Claude Code

### 🎯 How to Work on This File

1. **READ THIS FIRST** before starting any work
2. **Work from TOP to BOTTOM** of the TO DO section
3. **DO NOT** work on BACKLOG items - they're not ready
4. **Move completed tasks** to COMPLETED section
5. **Update the task** with completion date and notes
6. **Ask questions** if anything is unclear

### 🚀 Workflow

```
1. User: "Work on the next high-priority task"
2. Claude: Reads TASKS.md, finds first [HIGH] item in TO DO
3. Claude: Reads relevant docs (.claude/ folder)
4. Claude: Implements the feature
5. Claude: Tests the implementation
6. Claude: Updates TASKS.md, moves item to COMPLETED
7. Claude: Commits changes (LOCAL ONLY - NO PUSH)
8. Claude: Reports completion with summary
```

**IMPORTANT**: Do NOT push to GitHub. The user will push manually when ready.

### 📋 Task Template

When adding new tasks, use this format:

```markdown
- [ ] **[PRIORITY]** Task title
  - **Estimated:** X hours
  - **Context:** Brief description
  - **Files to modify/create:** List files
  - **Reference:** Link to relevant docs
  - **Acceptance Criteria:**
    - [ ] Criteria 1
    - [ ] Criteria 2
    - [ ] Criteria 3
  - **Blocked by:** (if applicable)
  - **Questions:** (if applicable)
```

### 🎯 Priority Levels

- **[HIGH]** - Do immediately, blocks other work, or user-facing bug
- **[MED]** - Important feature, should be done soon
- **[LOW]** - Nice to have, do when no high/med tasks

### ✅ Completion Checklist

Before moving a task to COMPLETED:

- [ ] Feature implemented per acceptance criteria
- [ ] Code follows project patterns (check .claude/docs)
- [ ] TypeScript compiles without errors (`npx tsc --noEmit`)
- [ ] Linter passes (`npm run lint`)
- [ ] Tested manually (basic functionality)
- [ ] Documentation updated if needed
- [ ] TASKS.md updated with completion date

### 🚫 When to Ask Questions

**ASK the user if:**
- Task is unclear or ambiguous
- Multiple implementation options exist
- Blocked by technical decision
- Acceptance criteria incomplete
- Estimate seems wrong

**Don't ask if:**
- Answer is in documentation (.claude/ folder)
- Following existing patterns
- Trivial implementation
- Standard best practices

---

## 📊 Statistics

### Current Sprint
- **TO DO:** 8 tasks (1 CRITICAL, 4 HIGH, 2 MED, 1 LOW)
- **BACKLOG:** 5 tasks
- **COMPLETED:** 18 tasks

### Velocity
- **Last 7 days:** 18 tasks completed
- **Average:** 2.5 tasks/day

### Next Focus
1. **Backend API Implementation** (NEW - CRITICAL)
2. Skeleton loading components
3. Quest category filtering
4. Search functionality

---

## 🔗 Quick Links

- **Project Overview:** `README.md`
- **API Contract:** `docs/API_CONTRACT.md` (NEW)
- **Architecture:** `.claude/architecture.md`
- **Quick Reference:** `.claude/quick-reference.md`
- **Workflows:** `.claude/workflows.md`
- **Original Specs:** `hud.md`

---

**Last Updated:** 2026-01-03
**Maintained By:** Human + Claude Code AI 🤖
