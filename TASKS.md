# 📋 Odyssey HUD 2026 - Task Management

> **For Claude Code:** Read the instructions at the bottom before starting work!

---

## 🎯 TO DO (Work on these first!)

### High Priority

- [ ] **[HIGH]** Create global table component and project list page
  - **Estimated:** 4 hours
  - **Context:** Add "See All" button next to "Initiate Project" button on dashboard, create reusable table component with pagination, build project list page
  - **Files to create:**
    - `components/ui/table.tsx` (Global reusable table component)
    - `components/ui/pagination.tsx` (Pagination controls)
    - `app/projects/page.tsx` (Project list page)
  - **Files to modify:**
    - `app/dashboard/page.tsx` (Add "See All" button next to "Initiate Project")
  - **Reference:** `.claude/quick-reference.md` → "Reusable Components" section
  - **Acceptance Criteria:**
    - [ ] **Dashboard Update**: Add "See All" button next to "Initiate Project" button with same styling
    - [ ] **Table Component** (`components/ui/table.tsx`):
      - Generic TypeScript component accepting `columns` and `data` props
      - Column definition: `key`, `header`, `renderCell` function, `sortable` flag, `width`
      - Sorting support: Click column headers to sort ASC/DESC
      - Loading state: Show skeleton rows when `loading=true`
      - Empty state: Show illustration and message when `data.length === 0`
      - Row actions: Support for custom action buttons per row (edit, delete, etc.)
      - Responsive: Horizontal scroll on mobile, full width on desktop
      - Styling: Dark theme with `border-white/5`, `bg-[#121214]`, hover states
    - [ ] **Pagination Component** (`components/ui/pagination.tsx`):
      - Accept `currentPage`, `totalPages`, `onPageChange` props
      - Show page numbers, Previous/Next buttons
      - Disabled state for Prev/Next when at start/end
      - Compact design: "Prev 1 2 3 ... 10 Next"
      - Styling: Matches dashboard theme with primary color for active page
    - [ ] **Project List Page** (`app/projects/page.tsx`):
      - Navbar same as dashboard with "Back to Dashboard" link
      - Page title: "All Sectors" with project count badge
      - Table columns:
        1. **Project** (title + description truncated)
        2. **Status** (badge with icon: ACTIVE/COMPLETED/ON_HOLD/ARCHIVED)
        3. **Progress** (visual progress bar + percentage text)
        4. **Time Logged** (formatted duration from linked missions)
        5. **Links** (repo URL, deploy URL as icon buttons)
        6. **Actions** (edit, delete buttons)
      - Pagination: 10 projects per page
      - Sorting: Default sort by status (ACTIVE first), then by created date
      - Filters: Optional status filter dropdown (All, Active, Completed, On Hold, Archived)
      - Empty state: "No sectors found. Initialize your first project."
    - [ ] **Navigation**: "See All" button routes to `/projects`
    - [ ] **Responsive**: Full table on desktop, card view or scrollable table on mobile
    - [ ] **Optimistic UI**: Instant feedback on delete/edit actions
    - [ ] **Performance**: Use React.memo for table rows to prevent unnecessary re-renders

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
7. Claude: Commits changes
8. Claude: Reports completion with summary
```

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
- **TO DO:** 7 tasks (4 HIGH, 2 MED, 1 LOW)
- **BACKLOG:** 5 tasks
- **COMPLETED:** 15 tasks

### Velocity
- **Last 7 days:** 15 tasks completed
- **Average:** 2.1 tasks/day

### Next Focus
1. Global table component and project list page
2. Skeleton loading components
3. Quest category filtering

---

## 🔗 Quick Links

- **Project Overview:** `README.md`
- **Architecture:** `.claude/architecture.md`
- **Quick Reference:** `.claude/quick-reference.md`
- **Workflows:** `.claude/workflows.md`
- **Original Specs:** `hud.md`

---

**Last Updated:** 2025-12-31
**Maintained By:** Human + Claude Code AI 🤖
