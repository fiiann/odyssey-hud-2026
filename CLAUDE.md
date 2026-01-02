# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Odyssey HUD 2026** is a gamified project execution dashboard built as a frontend-only Next.js application. Users track their work as "Missions" (individual work sessions) linked to "Projects" (higher-level goals), earning "Execution Credits" (XP) that increase their Architect Rank.

**Key Architecture**: This is a **frontend-only application** with no real backend. All data persistence uses localStorage through a mock API layer that simulates network delays, rate limiting, and validation.

---

## Development Commands

```bash
# Start development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type check (without emitting files)
npx tsc --noEmit
```

The development server runs on `http://localhost:3000`.

---

## ⚠️ CRITICAL: Git Workflow Rule

**DO NOT PUSH TO GITHUB AUTOMATICALLY**

When implementing features:
1. ✅ **DO**: Make changes and commit locally (`git commit`)
2. ❌ **DO NOT**: Push to remote (`git push`)
3. ✅ **DO**: Report completion with commit hash
4. ✅ **DO**: Wait for user to push manually

**Rationale**: The user wants full control over when changes are pushed to GitHub. Only commit locally, never push.

---

## Demo Credentials

For testing the authentication flow:
- **Email**: `superadmin@gmail.com`
- **Password**: `123456`

---

## Core Architecture

### Data Flow Pattern
```
User Action → Component → Custom Hook → Mock API → Transform Data → Update State → UI Re-render
                              ↓
                     Optimistic Update (instant feedback)
```

### Key Architectural Patterns

1. **Transformer Pattern**: The mock API returns data in `snake_case` (API format) which must be transformed to `camelCase` (client format) using functions from `lib/transformers.ts`.

2. **Optimistic Updates**: User actions update the UI immediately, then call the API. If the API fails, rollback the optimistic update and show an error.

3. **Custom Hooks for State Management**: Each feature has a dedicated hook (`useProjects`, `useMissions`, `useTasks`, `useProfile`, `useAuth`) that manages its own state and provides CRUD operations.

4. **Mock API Simulation**: `services/mock-api.ts` simulates a real backend with:
   - Network delays (500-1500ms random)
   - Rate limiting (10 requests/minute)
   - Data validation using Zod schemas
   - LocalStorage persistence

5. **Dual Storage for Auth**: Authentication tokens are stored in BOTH localStorage (for client-side access) AND cookies (for middleware validation).

---

## Project Structure

```
odyssey-hud/
├── app/                          # Next.js App Router pages
│   ├── dashboard/page.tsx        # Main dashboard (large component)
│   ├── projects/
│   │   ├── page.tsx              # Projects list view
│   │   └── [projectId]/page.tsx  # Individual project detail
│   ├── login/page.tsx            # Authentication page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home/redirect
│   └── globals.css               # Tailwind v4 theme with @import
│
├── components/
│   ├── auth/                     # Authentication components
│   ├── dashboard/                # Dashboard-specific components
│   ├── mission/                  # Mission-related components
│   ├── project/                  # Project-related components
│   ├── task/                     # Task-related components
│   ├── terminology/              # Terminology toggle (PROFESSIONAL vs ODYSSEY)
│   └── ui/                       # Reusable UI components (Button, Card, Dialog, etc.)
│
├── hooks/                        # Custom React hooks (state management)
│   ├── use-auth.ts               # Authentication state & operations
│   ├── use-profile.ts            # User profile & XP management
│   ├── use-projects.ts           # Project CRUD operations
│   ├── use-missions.ts           # Mission logging with optimistic updates
│   ├── use-tasks.ts              # Task management
│   └── use-terminology-mode.ts   # User's terminology preference
│
├── lib/                          # Core utilities
│   ├── types.ts                  # TypeScript interfaces (both API snake_case and client camelCase)
│   ├── transformers.ts           # snake_case ↔ camelCase conversion
│   ├── validations.ts            # Zod validation schemas
│   ├── calculations.ts           # XP, rank, and progress formulas
│   ├── constants.ts              # App constants (categories, storage keys, etc.)
│   ├── terminology.ts            # Terminology mapping for dual-mode UI
│   ├── utils.ts                  # General utilities (cn class merger, etc.)
│   └── mock-data.ts              # Seed data for development
│
├── services/
│   └── mock-api.ts               # Complete mock API with delay simulation
│
├── middleware.ts                 # Route protection (validates auth cookies)
├── tailwind.config.ts            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

---

## Important: Terminology Modes

The application supports **two terminology modes** that users can toggle:

### ODYSSEY Mode (Default)
- Projects → "Sectors"
- Missions → "Missions" (individual work sessions)
- Tasks → "Quests"
- XP → "Execution Credits"
- Rank → "Architect Rank"

### PROFESSIONAL Mode
- Projects → "Projects"
- Missions → "Sessions" or "Work Logs"
- Tasks → "Tasks"
- XP → "Total Time"
- Rank → "Level"

**Implementation**: Use `lib/terminology.ts` and the `useTerminologyMode()` hook to display the correct terms. NEVER hardcode terminology - always use the terminology system.

---

## Data Models

### Client State (camelCase)
```typescript
interface Project {
  projectId: string;
  title: string;
  description?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD' | 'ARCHIVED';
  progress: number;        // 0-100
  repoUrl?: string;
  deployUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface Mission {
  missionId: string;
  projectId: string;       // Links to parent project
  taskId?: string;         // Optional: Links to a task
  createdAt: string;
  title: string;
  description?: string;
  durationMin: number;     // Duration in minutes
  category?: string;       // Backend, Frontend, etc.
}

interface Task {
  taskId: string;
  projectId: string;       // Links to parent project
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  category?: string;
  estimatedMin?: number;
  actualMin?: number;      // Sum of related mission durations
  position: number;        // For ordering/kanban
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

interface Profile {
  userId: string;
  username: string;
  avatarUrl: string;
  totalXp: number;         // Total minutes worked
  currentLevel: number;    // Calculated rank
  terminologyMode?: 'PROFESSIONAL' | 'ODYSSEY';
}
```

### API Response (snake_case)
All API responses use `snake_case` and must be transformed using functions from `lib/transformers.ts`.

---

## Styling Guidelines

### Tailwind CSS v4
Uses the new `@import "tailwindcss"` syntax with `@theme` directive in `app/globals.css`.

### Color System
**ALWAYS use semantic color variables, never hardcode colors:**

```css
/* In globals.css @theme block */
--color-background: #09090b;    /* Deep space black */
--color-foreground: #fafafa;    /* Near white */
--color-primary: #3b82f6;       /* Blue */
--color-border: #27272a;        /* Subtle border */
```

```tsx
/* Use in components: */
className="bg-background text-foreground border-border bg-primary"
```

### Dark Theme
The entire app is designed for dark mode. Ensure all components use:
- `bg-background` for backgrounds
- `text-foreground` for primary text
- `text-muted-foreground` for secondary text
- `border-border` for borders

**Critical**: Native HTML select elements need explicit `text-foreground` class or text will be invisible.

### Utility Function
Use the `cn()` function from `lib/utils.ts` to conditionally combine classes:

```tsx
import { cn } from '@/lib/utils';

cn('base-class', condition && 'conditional-class', variant === 'x' && 'variant-class')
```

---

## Common Development Tasks

### Step-by-Step Workflows

For detailed step-by-step guides with complete code examples, refer to `.claude/workflows.md`:
- Creating a new feature (full walkthrough)
- Fixing bugs systematically
- Modifying existing components
- Adding form validation
- Performance optimization
- Debugging common issues
- Testing your changes

### Quick Reference

For copy-paste code patterns and common snippets, refer to `.claude/quick-reference.md`.

### Adding a New Field to an Existing Entity

1. **Update types** in `lib/types.ts` (both API `snake_case` and client `camelCase` interfaces)
2. **Add validation** to the Zod schema in `lib/validations.ts`
3. **Update transformer** in `lib/transformers.ts` to handle the new field
4. **Update form** in the appropriate page/component (e.g., `app/dashboard/page.tsx`)
5. **Update API** in `services/mock-api.ts` if persistence logic needs changes

### Creating a New Feature

1. Define types in `lib/types.ts`
2. Create validation schema in `lib/validations.ts`
3. Add transformer functions in `lib/transformers.ts`
4. Create API methods in `services/mock-api.ts`
5. Build custom hook in `hooks/use-*.ts`
6. Build UI components in `components/`
7. Integrate into appropriate page in `app/`

### Adding Loading States

```tsx
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  fetchData().finally(() => setIsLoading(false));
}, []);

if (isLoading) {
  return <div className="flex items-center justify-center">
    {/* Use Lucide icons: Loader2 for spinners */}
  </div>;
}
```

### Adding Empty States

```tsx
if (data.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <IconName className="h-16 w-16 text-muted-foreground/30 mb-4" />
      <h3 className="text-lg font-semibold mb-2">No Data Yet</h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        Description of what to do next.
      </p>
    </div>
  );
}
```

### Showing Toast Notifications

```tsx
import { toast } from '@/components/ui/use-toast';

// Success
toast({ title: 'Action completed!' });

// Error
toast({
  title: 'Error occurred',
  description: 'What went wrong',
  variant: 'destructive',
});
```

---

## Ranking System (XP & Level Calculation)

Formulas in `lib/calculations.ts`:

```typescript
// Current rank (level)
currentRank = floor(sqrt(totalMinutes / 60))

// XP needed for next rank
nextRankXP = (currentRank + 1)² × 60

// Progress percentage toward next rank
progress = (totalXP - currentRankXP) / (nextRankXP - currentRankXP) × 100
```

Example progression:
- 0 minutes = Rank 1
- 60 minutes = Rank 2
- 240 minutes = Rank 3
- 540 minutes = Rank 4

---

## File Naming Conventions

- **Components**: `kebab-case.tsx` (e.g., `project-header.tsx`, `mission-modal.tsx`)
- **Hooks**: `kebab-case.with-prefix.ts` (e.g., `use-auth.ts`, `use-projects.ts`)
- **Utilities**: `kebab-case.ts` (e.g., `calculations.ts`, `transformers.ts`)
- **Pages**: `page.tsx` (App Router convention)

---

## Common Gotchas & Solutions

### Middleware redirecting to login unexpectedly?
**Cause**: Token not set in cookie. `useAuth` should store tokens in BOTH localStorage AND cookie.
**Fix**: Check the login flow in `hooks/use-auth.ts` ensures `document.cookie` is set.

### Text invisible on dark background?
**Cause**: Missing text color class on native HTML elements (especially `<select>`).
**Fix**: Add `text-foreground` class to the element.

### State not updating after API call?
**Cause**: Not transforming API response from `snake_case` to `camelCase`.
**Fix**: Always use transformer functions: `setData(transformMissionData(apiData))`

### Form not validating?
**Cause**: Zod resolver not configured in React Hook Form.
**Fix**:
```tsx
const { register, handleSubmit } = useForm({
  resolver: zodResolver(yourSchema),
});
```

### Optimistic update not rolling back on error?
**Cause**: Missing error handling in the hook.
**Fix**: In the hook's create/update function, rollback the optimistic update in the error case:
```tsx
try {
  // optimistic update
  setItems(prev => [newItem, ...prev]);
  // API call
  const response = await api.createItem(data);
  if (!response.success) {
    // rollback
    setItems(prev => prev.filter(i => i.id !== tempId));
  }
} catch (error) {
  // rollback
  setItems(prev => prev.filter(i => i.id !== tempId));
}
```

---

## Code Style Guidelines

- Use `'use client'` directive for any component using hooks or state
- Import order: React → Third-party → Local types → Local components
- Destructure props for clarity
- Use async/await over Promises
- Add comments for complex logic
- Use TypeScript strict mode - no `any` types unless absolutely necessary
- Prefer functional components with hooks over class components

---

## Testing Checklist

Before committing changes:

- [ ] Login/logout flow works correctly
- [ ] Dashboard displays without errors
- [ ] Forms validate properly with Zod schemas
- [ ] Optimistic updates work and rollback on error
- [ ] XP/Rank updates when missions are logged
- [ ] Projects can be created, updated, and deleted
- [ ] Tasks can be created, moved, and completed
- [ ] Terminology toggle switches between modes correctly
- [ ] Toast notifications appear for all user actions
- [ ] Responsive layout works on mobile
- [ ] Check browser console for errors
- [ ] Verify data persists in localStorage

---

## Performance Notes

Current state:
- All hooks fetch data on mount
- No pagination implemented yet
- React 19 with no memoization
- Optimistic UI updates for perceived performance

Future optimizations to consider:
- Add `React.memo` for expensive components
- Implement pagination for missions/tasks lists
- Debounce search/filter operations
- Add virtual scrolling for long lists

---

## Key Dependencies

- **Next.js 16**: App Router, Server Components
- **React 19**: Latest features and performance improvements
- **Tailwind CSS v4**: New `@import` syntax with `@theme` directive
- **TypeScript**: Type safety
- **React Hook Form + Zod**: Form handling and validation
- **Framer Motion**: Animations (planned/in progress)
- **Lucide React**: Icon library
- **date-fns**: Date formatting and manipulation
- **@dnd-kit**: Drag and drop functionality (for kanban/task board)
- **@radix-ui**: Headless UI primitives (Select, Dialog, etc.)

---

## Routing & Protected Pages

### Protected Routes
- `/dashboard` - Requires valid auth token
- `/projects` - Requires valid auth token
- `/projects/[projectId]` - Requires valid auth token

### Public Routes
- `/login` - Login page
- `/` - Redirects based on auth status

Middleware (`middleware.ts`) validates auth cookies on every request to protected routes and redirects to `/login` if invalid.

---

## Debugging Tips

1. **Check localStorage**: Use DevTools → Application → Local Storage to inspect stored data
2. **Check cookies**: Verify auth token is set in DevTools → Application → Cookies
3. **Network tab**: Even though it's a mock API, console logs in `mock-api.ts` show API calls
4. **React DevTools**: Inspect component state and props
5. **Console logs**: Check for errors and warnings
6. **TypeScript errors**: Run `npx tsc --noEmit` to catch type errors

---

## Migration Notes

The application has evolved from a quest-based RPG system to a project-centric task tracker. Historical terminology references may still exist:

- **Old term**: "Quests" → **New term**: "Missions" (individual work sessions)
- **Old term**: "Bosses" → **New term**: "Projects" (major goals)
- **Old term**: "Level" → **New term**: "Architect Rank"

The codebase is gradually being updated to reflect the new terminology. Use the terminology system (`lib/terminology.ts`) when adding UI text to support both modes.

---

## Additional Documentation

This project maintains extensive documentation in the `.claude/` directory:

### For Detailed Technical Deep-Dives
- **`.claude/architecture.md`** - Complete technical architecture with data flow diagrams
- **`.claude/workflows.md`** - Step-by-step guides for common development tasks
- **`.claude/quick-reference.md`** - Copy-paste code patterns and snippets
- **`.claude/overview.md`** - Project introduction and quick start

### For Original Requirements
- **`hud.md`** - Complete project requirements and specifications
- **`README.md`** - User-facing project overview

### Documentation Structure
```
CLAUDE.md                    ← This file (quick reference for Claude Code)
.claude/
├── README.md               ← Documentation index
├── overview.md             ← Project introduction
├── quick-reference.md      ← Code patterns & snippets
├── workflows.md            ← Step-by-step development guides
└── architecture.md         ← Technical deep dive
```

### When to Use Each Document
- **CLAUDE.md**: Start here for quick overview and critical rules
- **.claude/quick-reference.md**: When you need specific code patterns
- **.claude/workflows.md**: When implementing complex features step-by-step
- **.claude/architecture.md**: When you need to understand deep technical details
- **.claude/overview.md**: When getting familiar with the project

---
