# Odyssey HUD 2026 - Architecture Overview

## Project Overview
A personalized RPG-style dashboard frontend for tracking project execution and shipping progress as a Multi-Platform Architect in 2026. This is a **frontend-only application** with a complete mock API layer - no real database or backend.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **React**: 19
- **Styling**: Tailwind CSS v4 with dark theme
- **Type Safety**: TypeScript
- **State Management**: React Hooks (useState, useEffect, useContext)
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Data Persistence**: Local Storage + Cookies (for middleware)

## Key Architecture Patterns

### 1. Client-Side Only Architecture
```
┌─────────────┐
│   Browser   │
│             │
│ ┌─────────┐ │
│ │  Local  │ │ ← All data stored here
│ │ Storage │ │
│ └─────────┘ │
│      ↑      │
│      │      │
│ ┌─────────┐ │
│ │   Mock  │ │ ← Simulates backend
│ │   API   │ │
│ └─────────┘ │
└─────────────┘
```

### 2. Data Flow
```
User Action → Component → Hook → Mock API → Transform Data → Update State → UI Re-render
                   ↓
              Optimistic Update (instant UI feedback)
```

### 3. Authentication Flow
```
Login → Mock API validates → Store token in localStorage + cookie → Redirect to /dashboard
                                                         ↓
                                            Middleware validates cookie on every request
```

## Project Structure

```
odyssey-hud/
├── app/                          # Next.js App Router
│   ├── login/page.tsx           # Login page
│   ├── dashboard/page.tsx       # Main dashboard (large component)
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home/redirect
│   └── globals.css              # Global styles with Tailwind v4
│
├── components/
│   ├── auth/
│   │   └── login-form.tsx       # Login form component
│   ├── dashboard/               # Dashboard-specific components (not yet created)
│   ├── ui/                      # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── label.tsx
│   │   ├── dialog.tsx           # Modal dialogs
│   │   ├── progress.tsx         # Progress bars
│   │   ├── badge.tsx            # Status/category badges
│   │   ├── toast.tsx            # Toast notifications
│   │   └── use-toast.ts         # Toast hook
│   ├── skeletons/               # Loading skeletons (pending)
│   └── shared/                  # Shared utilities (pending)
│
├── hooks/                       # Custom React hooks
│   ├── use-auth.ts              # Authentication state & logic
│   ├── use-profile.ts           # Profile management
│   ├── use-quests.ts            # Mission (Quest) CRUD with optimistic updates
│   └── use-bosses.ts            # Boss CRUD with optimistic updates
│
├── lib/                         # Core utilities
│   ├── types.ts                 # TypeScript interfaces (API & Client)
│   ├── constants.ts             # App constants (categories, colors, etc.)
│   ├── calculations.ts          # XP, level, stat calculations
│   ├── validations.ts           # Zod schemas
│   ├── transformers.ts          # snake_case ↔ camelCase conversion
│   ├── utils.ts                 # General utilities (cn, sleep, etc.)
│   └── mock-data.ts             # Seed data for development
│
├── services/
│   └── mock-api.ts              # Complete mock API with delays & rate limiting
│
├── middleware.ts                # Route protection (validates cookies)
├── tailwind.config.ts           # Tailwind config
├── postcss.config.mjs           # PostCSS config
└── tsconfig.json                # TypeScript config
```

## Data Models

### API Response Format (snake_case)
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  validation_errors?: Record<string, string>;
}
```

### Client State Format (camelCase)
```typescript
interface AppState {
  profile: Profile | null;
  quests: Quest[];
  bosses: Boss[];
  isAuthenticated: boolean;
}
```

## Key Design Patterns

### 1. Transformer Pattern
API uses `snake_case` but client uses `camelCase`:
```typescript
// services/mock-api.ts → returns snake_case
// lib/transformers.ts → converts to camelCase
// hooks/ → work with camelCase
```

### 2. Optimistic Updates
```typescript
// 1. Update UI immediately
setQuests(prev => [newQuest, ...prev]);

// 2. Call API
const response = await api.createQuest(data);

// 3. Replace with real data or rollback on error
```

### 3. Custom Hooks Pattern
Each feature has its own hook:
- `useAuth()` - Authentication
- `useProfile()` - User profile & Execution Credits (XP)
- `useQuests()` - Mission (Quest) management
- `useBosses()` - Boss (Major Project) management

All hooks return:
```typescript
{
  data,
  isLoading,
  error,
  actions...  // create, update, delete, etc.
}
```

### 4. Mock API Simulation
The mock API simulates real backend behavior:
- **Network delays**: Random 500-1500ms
- **Rate limiting**: 10 requests per minute
- **Random errors**: 10% chance (commented out in auth)
- **Validation**: Enforces business rules
- **Data persistence**: Uses localStorage

## State Management Strategy

### Local State
Component-specific state (modals, forms, filters):
```typescript
const [isOpen, setIsOpen] = useState(false);
```

### Global State
Via custom hooks that share localStorage:
```typescript
const { quests, createQuest } = useQuests();
```

### Server State
Mocked via API layer, cached in hooks:
```typescript
useEffect(() => {
  fetchQuests(); // Only on mount
}, []);
```

## Routing & Middleware

### Protected Routes
- `/dashboard` - Requires valid auth token
- Middleware checks cookie on every request
- Redirects to `/login` if invalid

### Public Routes
- `/login` - Login page
- `/` - Redirects based on auth status

## Styling Strategy

### Tailwind CSS v4
Uses new `@import "tailwindcss"` syntax with `@theme` directive:

```css
@import "tailwindcss";

@theme {
  --color-background: #0a0a0a;
  --color-foreground: #fafafa;
  /* ... */
}
```

### Dark Theme
- Background: `#0a0a0a` (very dark)
- Foreground: `#fafafa` (very light)
- Primary: `#3b82f6` (blue)
- All components designed for dark mode

### Utility Classes
```typescript
// Use cn() for conditional classes
import { cn } from '@/lib/utils';
cn('base-class', condition && 'conditional-class');
```

## Ranking (Leveling) System

### Formulas
```typescript
// Current Rank (Level)
Rank = floor(sqrt(totalMinutes / 60))

// Execution Credits (XP) for next rank
nextRankXP = (currentRank + 1)² × 60

// Progress percentage
progress = (totalXP - currentRankXP) / (nextRankXP - currentRankXP) × 100
```

### Example
- 0 minutes = Level 1
- 60 minutes = Level 2
- 240 minutes = Level 3
- 540 minutes = Level 4

## Common Gotchas

### 1. Middleware vs localStorage
- Middleware runs on server → can't access localStorage
- Solution: Store token in BOTH localStorage AND cookie
- `useAuth` handles this automatically

### 2. Select Dropdowns
- Native HTML selects need explicit `text-foreground` class
- Otherwise text is black (invisible on dark theme)

### 3. Form Validation
- Always use Zod schemas from `lib/validations.ts`
- Never trust frontend validation alone

### 4. Optimistic Updates
- Must rollback on API error
- Show loading state during API call
- Update with real data on success

### 5. TypeScript Types
- API types: snake_case (e.g., `user_id`, `created_at`)
- Client types: camelCase (e.g., `userId`, `createdAt`)
- Always transform between them

## Performance Considerations

### Current State
- All hooks fetch on mount
- No pagination yet
- React 19 with no memoization

### Optimizations Done
- Optimistic UI updates
- LocalStorage as cache
- Single dashboard component (less overhead)

### Future Optimizations
- Add React.memo for components
- Implement pagination for quests
- Debounce search/filter operations
- Add virtual scrolling for long lists

## Development Notes

### Running the App
```bash
npm run dev  # Starts at http://localhost:3000
```

### Demo Credentials
- Email: superadmin@gmail.com
- Password: 123456

### Adding New Features
1. Add types to `lib/types.ts`
2. Add validation schema to `lib/validations.ts`
3. Add API methods to `services/mock-api.ts`
4. Add transformer to `lib/transformers.ts`
5. Create hook in `hooks/`
6. Build UI components
7. Integrate in dashboard

### Changing Colors
1. Edit `app/globals.css` `@theme` section
2. Use semantic color variables:
   - `bg-background`
   - `text-foreground`
   - `text-muted-foreground`
   - `border-border`
   - `bg-primary`
   - `text-primary-foreground`

### Debugging Tips
- Check browser console for errors
- Inspect localStorage for data
- Network tab shows mock API calls (instant)
- Use React DevTools for state inspection

## Testing Checklist

### Authentication
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Token expiration (1 hour)
- [ ] Logout clears all data
- [ ] Protected routes redirect to login

### Dashboard
- [ ] Profile displays correctly
- [ ] XP progress bar accurate (Execution Credits)
- [ ] Rank up animation triggers
- [ ] Stat cards show correct pillar data
- [ ] Mission list displays

### Mission (Quest) Management
- [ ] Create mission with validation
- [ ] Optimistic update works
- [ ] Delete mission with confirmation
- [ ] XP updates immediately
- [ ] Rank recalculates

### Boss Management
- [ ] View active boss
- [ ] Edit boss progress
- [ ] Change boss status
- [ ] Filter by quarter
- [ ] GitHub/Deploy links work

## File Naming Conventions

- Components: `kebab-case.tsx` (e.g., `login-form.tsx`)
- Hooks: `kebab-case.with-prefix.ts` (e.g., `use-auth.ts`)
- Utilities: `kebab-case.ts` (e.g., `calculations.ts`)
- Types: `kebab-case.ts` (e.g., `types.ts`)

## Code Style

- Use `'use client'` directive for components with hooks/state
- Import order: React → Third-party → Local types → Local components
- Destructure props for clarity
- Use async/await over promises
- Add comments for complex logic
