# Task-Driven Project Progress

## 1. Overview
Currently, the Project `progress` is a manual input field (0-100%). This is arbitrary and often stale.
We are moving to a **Task-Driven Approach** where:
> **Project Progress is automatically calculated based on the completion status of its Tasks.**

This turns the HUD into a true "Game" where completing a Task (Quest Step) immediately rewards the user with visual progress on the Project (Quest Line).

## 2. Core Concepts & Dictionary

| Term | Definition | Role in Progress |
|------|------------|------------------|
| **Project** | The high-level objective (e.g., "Build Portfolio"). | The container. Progress is aggregate. |
| **Task** | A concrete unit of work (e.g., "Design Home", "Fix Bug"). | The driver. Status (`COMPLETED`) drives progress. |
| **Mission** | A session of work (e.g., "2 hours coding"). | The effort. Logs time (Minutes) but does *not* directly advance %. |

## 3. Data Model & Logic Strategy

### A. The Formula
```typescript
Total Tasks = Count(Tasks where project_id == Project.id)
Completed Tasks = Count(Tasks where project_id == Project.id AND status == 'COMPLETED')

if (Total Tasks == 0) return 0%
Progress = (Completed Tasks / Total Tasks) * 100
```
*Note: We treat all tasks as equal weight for V1 simplicity.*

### B. Handling Edge Cases
1.  **No Tasks**: Progress is 0%.
2.  **All Tasks Cancelled**: Cancelled tasks should probably be excluded from typical progress counts, or treated as "not done".
    *   *Decision*: Exclude `CANCELLED` tasks from both numerator and denominator.
3.  **Migration**: Existing projects with manual progress will reset to 0% (if they have no tasks) or their actual calculated percentage. This is acceptable for a "source of truth" realignment.

## 4. Implementation Plan

### Phase 1: Logic & Utilities (`lib/`)
1.  **Modify `getProjectExecutionStats` in `lib/calculations.ts`**:
    *   Update signature to accept `tasks: Task[]`.
    *   Implement the calculation logic inside the map function.
    *   Remove reliance on `p.progress` from the raw data.
2.  **Enhance `lib/types.ts`**:
    *   Verify `Task` type has `status` and `projectId`. (Already exists).

### Phase 2: Mock API & Data (`services/`)
1.  **Update `ProjectData`**:
    *   Technically, we can keep storing `progress` as a cache, or purely compute it on the client.
    *   *Decision*: **Compute on Client** for now to ensure instant reactivity without complex backend syncing in the Mock API. We will effectively "ignore" the stored `progress` value in the UI.

### Phase 3: UI Updates (`components/` & `app/`)
1.  **Dashboard (`app/dashboard/page.tsx`)**:
    *   Fetch `tasks` using `useTasks` hook.
    *   Pass `tasks` to the updated `getProjectExecutionStats` function.
2.  **Project List (`app/projects/page.tsx`)**:
    *   Fetch `tasks`.
    *   Pass `tasks` to calculation util.
3.  **Project Details (`app/projects/[id]/page.tsx`)**:
    *   Ensure the progress bar uses the calculated value.
    *   Add a "Tasks" section if not sufficient, to allow users to add tasks to drive progress.
4.  **Create/Edit Project Modal**:
    *   **Remove** the "Progress" slider/input field. Users can no longer manually set this.

## 5. Migration Steps (User Actions)
After deployment:
1.  User enters dashboard.
2.  Projects might show 0% progress.
3.  User must "Initiate Tasks" for projects to regain progress bars.
    *   *Action*: We should add a "Add Task" quick button on the Dashboard project card or provide a clear path.

## 6. Future Considerations (V2)
- **Weighted Tasks**: "Hard" tasks worth more %.
- **Milestones**: Group tasks into milestones (e.g., "MVP Release") with their own progress.
- **Auto-Completion**: Prompt user to close Project when Progress hits 100%.

---
**Status**: Plan Approved
**Next Step**: Execute Phase 1
