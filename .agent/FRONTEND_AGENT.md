# Frontend Agent - Odyssey HUD 2026

> **Role:** Frontend Development Specialist
> **Tech Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Radix UI
> **Styling:** Dark theme, game-inspired UI (Odyssey HUD)

---

## 1. Your Mission

You are building the **frontend** for Odyssey HUD 2026 - a gamified project execution dashboard. The app tracks work as "Missions" linked to "Projects", earning "Execution Credits" (XP) that increase the user's "Architect Rank".

**Always reference:**
- `CLAUDE.md` - Project overview and quick reference
- `.claude/architecture.md` - Technical architecture
- `lib/terminology.ts` - Terminology modes (PROFESSIONAL vs ODYSSEY)
- `docs/API_CONTRACT.md` - Backend API specification

---

## 2. Strict Rules

### 2.1 Component Files

- **Location:** `components/` organized by feature
- **Naming:** `kebab-case.tsx` (e.g., `project-header.tsx`, `mission-modal.tsx`)
- **Directive:** Add `'use client';` at the top if using hooks/state

### 2.2 Hooks

- **Location:** `hooks/` directory
- **Naming:** `kebab-case.with-prefix.ts` (e.g., `use-auth.ts`, `use-projects.ts`)
- **State Management:** Each feature has its own hook (no global state manager)

### 2.3 Data Flow

```
User Action → Component → Custom Hook → API Call → Transform Data → Update State → UI Re-render
                              ↓
                     Optimistic Update (instant feedback)
```

### 2.4 NEVER Use These

- ❌ `useState([])` without localStorage initialization (causes loading flicker)
- ❌ Direct `fetch()` in components - use hooks instead
- ❌ Hardcoded terminology - use `useTerminology()` hook
- ❌ Inline styles for colors - use semantic CSS variables
- ❌ `localStorage` directly in components - hooks handle it

---

## 3. Styling Guidelines

### 3.1 CSS Variables (Use These!)

```css
/* Always use semantic colors, never hardcode */
bg-background          /* Deep space black */
text-foreground        /* Near white */
text-muted-foreground  /* Secondary text */
bg-primary             /* Blue accent */
border-border          /* Subtle border */
bg-destructive         /* Red for errors */
```

### 3.2 Tailwind CSS v4

Uses new `@import` syntax - check `app/globals.css` for theme definition.

### 3.3 Dark Theme Only

The entire app is dark mode. All components must use:
- `bg-background` for backgrounds
- `text-foreground` for primary text
- `text-muted-foreground` for secondary text
- `border-border` for borders

**CRITICAL:** Native HTML elements (`<select>`, `<input>`) need `text-foreground` class or text will be invisible.

### 3.4 Utility Function

```typescript
import { cn } from '@/lib/utils';

cn('base-class', condition && 'conditional-class', variant === 'x' && 'variant-class')
```

---

## 4. Terminology Modes

The app supports TWO terminology modes. ALWAYS use the terminology system:

### ODYSSEY Mode (Default)
- Projects → "Sectors"
- Missions → "Missions"
- Tasks → "Quests"
- XP → "Execution Credits"
- Rank → "Architect Rank"

### PROFESSIONAL Mode
- Projects → "Projects"
- Missions → "Sessions" or "Work Logs"
- Tasks → "Tasks"
- XP → "Total Time"
- Rank → "Level"

### Implementation

```typescript
import { useTerminology } from '@/lib/terminology';

function MyComponent() {
  const t = useTerminology(mode); // mode from props or hook
  return <h1>{t.createTask}</h1>; // "Create Quest" or "Create Task"
}
```

**Reference:** `lib/terminology.ts` for all available terms.

---

## 5. Data Transformation

### API vs Frontend Format

| Layer | Format | Example |
|-------|--------|---------|
| API Response | snake_case | `user_id`, `project_id`, `created_at` |
| Frontend (React) | camelCase | `userId`, `projectId`, `createdAt` |

**Transformers** in `lib/transformers.ts` handle conversion:
- `transformProjectData()` - snake_case → camelCase
- `transformTaskData()` - snake_case → camelCase
- `transformMissionData()` - snake_case → camelCase
- `transformProfileData()` - snake_case → camelCase

**ALWAYS transform API responses before using in components.**

---

## 6. Hook Initialization Pattern

**CRITICAL:** Prevents "Not Found" loading flicker on navigation

```typescript
// ❌ BAD - Causes loading flicker
const [data, setData] = useState<Data[]>([]);
const [isLoading, setIsLoading] = useState(true);

// ✅ GOOD - Instant data availability
const getInitialData = (): Data[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.YOUR_DATA);
    if (stored) {
      try {
        return JSON.parse(stored).map(transformData);
      } catch { return []; }
    }
  }
  return [];
};

export function useYourData() {
  const [data, setData] = useState<Data[]>(getInitialData);
  const [isLoading, setIsLoading] = useState(() => getInitialData().length === 0);
  // ...
}
```

---

## 7. Common Patterns

### 7.1 Loading State

```typescript
if (isLoading) {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  );
}
```

### 7.2 Empty State

```typescript
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

### 7.3 Toast Notifications

```typescript
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

### 7.4 Form with Validation

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { yourSchema, type YourFormValues } from '@/lib/validations';

const { register, handleSubmit, formState: { errors } } = useForm<YourFormValues>({
  resolver: zodResolver(yourSchema),
  defaultValues: { /* ... */ },
});

const onSubmit = async (data: YourFormValues) => {
  // Submit logic
};

// In JSX
<input {...register('fieldName')} />
{errors.fieldName && <p className="text-xs text-red-500">{errors.fieldName.message}</p>}
```

### 7.5 Dialog with Controlled State

```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useId } from 'react';

function MyModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const titleId = useId(); // MUST call before conditional returns

  return (
    <Dialog open={open} onOpenChange={onOpenChange} ariaLabelledby={titleId}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle id={titleId}>Title</DialogTitle>
        </DialogHeader>
        {/* Content */}
      </DialogContent>
    </Dialog>
  );
}
```

---

## 8. UI Components (Radix UI)

We use Radix UI primitives. Available in `components/ui/`:

- `Button` - Buttons with variants (default, ghost, destructive, outline)
- `Card`, `CardContent`, `CardHeader`, `CardTitle` - Card containers
- `Dialog`, `DialogContent`, etc. - Modal dialogs
- `Input` - Text input
- `Label` - Form labels
- `Textarea` - Multi-line text input
- `Select`, `SelectContent`, `SelectItem`, etc. - Dropdowns
- `Badge` - Status badges
- `Progress` - Progress bar
- `Table`, `Pagination` - Data display

---

## 9. File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Components | `kebab-case.tsx` | `project-header.tsx` |
| Hooks | `kebab-case.with-prefix.ts` | `use-auth.ts` |
| Utilities | `kebab-case.ts` | `calculations.ts` |
| Pages | `page.tsx` | App Router convention |

---

## 10. Icons

Use **Lucide React** icons:

```typescript
import { Sword, LayoutGrid, ChevronLeft, Loader2, Trash2 } from 'lucide-react';

<Sword className="h-5 w-5" />
```

---

## 11. Accessibility

- Add `aria-label` to icon-only buttons
- Use `role="list"` and `role="listitem"` for lists
- Use `ariaLabelledby` for Dialog titles
- Add `alt` text to images
- Use semantic HTML elements

---

## 12. Testing Checklist

Before considering a feature complete:

- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No console errors
- [ ] Loading states work
- [ ] Empty states show
- [ ] Errors display via toast
- [ ] Terminology toggle works (PROFESSIONAL vs ODYSSEY)
- [ ] Responsive on mobile/tablet/desktop
- [ ] Form validation works
- [ ] Optimistic updates work (instant UI feedback)

---

## 13. DO NOT

- ❌ Do NOT hardcode terminology - use `useTerminology()`
- ❌ Do NOT use camelCase for API - use snake_case, then transform
- ❌ Do NOT initialize empty state without localStorage cache
- ❌ Do NOT use hardcoded colors - use CSS variables
- ❌ Do NOT forget `text-foreground` on native form elements
- ❌ Do NOT call hooks conditionally
- ❌ Do NOT skip error handling
- ❌ Do NOT create `.md` documentation files unless explicitly asked

---

## 14. References

- **Project Overview:** `CLAUDE.md`
- **Architecture:** `.claude/architecture.md`
- **Quick Reference:** `.claude/quick-reference.md`
- **Workflows:** `.claude/workflows.md`
- **API Contract:** `docs/API_CONTRACT.md`
- **Tasks:** `TASKS.md`
