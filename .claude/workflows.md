# Odyssey HUD 2026 - Development Workflows

## Quick Reference

This guide covers common development tasks. Always read `architecture.md` first for project context.

---

## 1. Creating a New Feature

### Example: Adding "Achievements" System

#### Step 1: Define Data Types
**File**: `lib/types.ts`

```typescript
// API Response Type (snake_case)
export interface AchievementData {
  achievement_id: string;
  title: string;
  description: string;
  icon_url: string;
  unlocked_at: string;
}

// Client State Type (camelCase)
export interface Achievement {
  achievementId: string;
  title: string;
  description: string;
  iconUrl: string;
  unlockedAt: string;
}
```

#### Step 2: Add Validation Schema
**File**: `lib/validations.ts`

```typescript
export const achievementSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  icon_url: z.string().url().optional(),
});

export type AchievementFormValues = z.infer<typeof achievementSchema>;
```

#### Step 3: Add Mock API Methods
**File**: `services/mock-api.ts`

```typescript
// Add to STORAGE_KEYS if needed
// STORAGE_KEYS.ACHIEVEMENTS = 'odyssey_achievements_data';

export const achievementApi = {
  getAchievements: async (): Promise<ApiResponse<AchievementData[]>> => {
    await simulateDelay();

    if (shouldSimulateError()) {
      return { success: false, error: 'Failed to fetch achievements' };
    }

    const stored = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    const achievements = stored ? JSON.parse(stored) : [];

    return { success: true, data: achievements };
  },

  unlockAchievement: async (achievementData: Omit<AchievementData, 'achievement_id' | 'unlocked_at'>): Promise<ApiResponse<AchievementData>> => {
    await simulateDelay();

    const newAchievement: AchievementData = {
      achievement_id: `achievement_${Date.now()}`,
      unlocked_at: new Date().toISOString(),
      ...achievementData,
    };

    const stored = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    const achievements = stored ? JSON.parse(stored) : [];
    achievements.push(newAchievement);
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));

    return { success: true, data: newAchievement };
  },
};
```

#### Step 4: Add Transformers
**File**: `lib/transformers.ts`

```typescript
export function transformAchievementData(data: AchievementData): Achievement {
  return {
    achievementId: data.achievement_id,
    title: data.title,
    description: data.description,
    iconUrl: data.icon_url,
    unlockedAt: data.unlocked_at,
  };
}

export function toAchievementData(achievement: Omit<Achievement, 'achievementId' | 'unlockedAt'>): Omit<AchievementData, 'achievement_id' | 'unlocked_at'> {
  return {
    title: achievement.title,
    description: achievement.description,
    icon_url: achievement.iconUrl,
  };
}
```

#### Step 5: Create Custom Hook
**File**: `hooks/use-achievements.ts`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { achievementApi } from '@/services/mock-api';
import { Achievement, AchievementData } from '@/lib/types';
import { transformAchievementData } from '@/lib/transformers';
import { toast } from '@/components/ui/use-toast';
import { STORAGE_KEYS } from '@/lib/constants';

// CRITICAL: Initialize from localStorage to prevent loading flickers
const getInitialAchievements = (): Achievement[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    if (stored) {
      try {
        return JSON.parse(stored).map(transformAchievementData);
      } catch {
        return [];
      }
    }
  }
  return [];
};

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(getInitialAchievements);
  const [isLoading, setIsLoading] = useState(() => getInitialAchievements().length === 0);

  useEffect(() => {
    // Only fetch if empty
    if (achievements.length === 0) {
      fetchAchievements();
    }
  }, []);

  const fetchAchievements = async () => {
    setIsLoading(true);
    const response = await achievementApi.getAchievements();

    if (response.success && response.data) {
      setAchievements(response.data.map(transformAchievementData));
    }
    setIsLoading(false);
  };

  const unlockAchievement = async (achievementData: Omit<Achievement, 'achievementId' | 'unlockedAt'>) => {
    // Optimistic update
    const optimisticAchievement: Achievement = {
      achievementId: `temp-${Date.now()}`,
      unlockedAt: new Date().toISOString(),
      ...achievementData,
    };

    setAchievements((prev) => [...prev, optimisticAchievement]);

    // API call
    const response = await achievementApi.unlockAchievement({
      title: achievementData.title,
      description: achievementData.description,
      icon_url: achievementData.iconUrl,
    });

    if (response.success && response.data) {
      const newAchievement = transformAchievementData(response.data);
      setAchievements((prev) =>
        prev.map((a) =>
          a.achievementId === optimisticAchievement.achievementId
            ? newAchievement
            : a
        )
      );
      toast({ title: 'Achievement unlocked!' });
      return { success: true, data: newAchievement };
    } else {
      // Rollback
      setAchievements((prev) => prev.filter((a) => a.achievementId !== optimisticAchievement.achievementId));
      toast({
        title: 'Failed to unlock achievement',
        description: response.error,
        variant: 'destructive',
      });
      return { success: false, error: response.error };
    }
  };

  return {
    achievements,
    isLoading,
    unlockAchievement,
    refetch: fetchAchievements,
  };
}
```

#### Step 6: Build UI Components
**File**: `components/dashboard/achievements-list.tsx`

```typescript
'use client';

import { Achievement } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

interface AchievementsListProps {
  achievements: Achievement[];
  isLoading: boolean;
}

export function AchievementsList({ achievements, isLoading }: AchievementsListProps) {
  if (isLoading) {
    return <div>Loading achievements...</div>;
  }

  if (achievements.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Trophy className="h-12 w-12 text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No achievements yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {achievements.map((achievement) => (
        <Card key={achievement.achievementId}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              {achievement.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

#### Step 7: Integrate in Dashboard
**File**: `app/dashboard/page.tsx`

```typescript
// Add import
import { useAchievements } from '@/hooks/use-achievements';
import { AchievementsList } from '@/components/dashboard/achievements-list';

// In component
const { achievements, isLoading: achievementsLoading } = useAchievements();

// In JSX
<section>
  <h2 className="text-2xl font-bold mb-4">Achievements</h2>
  <AchievementsList achievements={achievements} isLoading={achievementsLoading} />
</section>
```

---

## 2. Fixing a Bug

### Example: Mission XP (Status) Not Updating

#### Step 1: Reproduce the Bug
1. Log in
2. Create a mission (quest)
3. Check if Execution Credits (XP) update in profile header
4. Check if progress bar moves

#### Step 2: Identify the Issue

Check the data flow:
```typescript
// 1. Quest created → hook/createQuest()
// 2. Mock API → questApi.createQuest()
// 3. API updates profile XP
// 4. Hook needs to refetch profile
```

#### Step 3: Add Debugging

**File**: `hooks/use-quests.ts`

```typescript
const createQuest = async (questData: Omit<Quest, 'questId' | 'createdAt'>) => {
  console.log('Creating quest:', questData);

  // ... existing code ...

  if (response.success && response.data) {
    console.log('Quest created successfully, refreshing profile...');

    // Add this: trigger profile refetch
    // Need to add refreshProfile to hook parameters or use global event
  }
};
```

#### Step 4: Implement Fix

**Option A**: Pass profile refresh to quest hook
```typescript
// In dashboard/page.tsx
const { refreshProfile } = useProfile();
const { createQuest } = useQuests({ onQuestCreated: refreshProfile });
```

**Option B**: Use an event/pub-sub pattern (simpler)
```typescript
// Just refetch profile after quest creation
useEffect(() => {
  if (quests.length > 0) {
    refreshProfile();
  }
}, [quests.length]);
```

#### Step 5: Test the Fix
1. Create a quest
2. Verify XP updates
3. Check level calculation
4. Test with multiple quests

---

## 3. Changing Colors/Theme

### Example: Change Primary Color to Purple

#### Step 1: Update Theme Variables
**File**: `app/globals.css`

```css
@import "tailwindcss";

@theme {
  /* Find this line and change the color */
  --color-primary: #a855f7;  /* Was: #3b82f6 */

  /* Keep all other variables the same */
}
```

#### Step 2: Update Tailwind Config (if needed)
**File**: `tailwind.config.ts`

Only if you want to add custom colors:
```typescript
export const config = {
  theme: {
    extend: {
      colors: {
        purple: {
          500: '#a855f7',
        }
      }
    }
  }
};
```

#### Step 3: Update Color Constants (if needed)
**File**: `lib/constants.ts`

If using semantic color names:
```typescript
export const CATEGORY_COLORS = {
  // ... existing colors
};
```

#### Step 4: Test the Changes
1. Check all buttons
2. Check links
3. Check progress bars
4. Check badges
5. Verify contrast ratios

### Important: Always Use Semantic Classes
```typescript
// ❌ BAD - Hardcoded colors
className="bg-blue-500"

// ✅ GOOD - Semantic colors
className="bg-primary"

// ❌ BAD - Black text
className="text-black"

// ✅ GOOD - Semantic text
className="text-foreground"
```

---

## 4. Modifying Existing Component

### Example: Add Search to Quest List

#### Step 1: Update Component Props
**File**: `app/dashboard/page.tsx`

```typescript
// Add state
const [searchQuery, setSearchQuery] = useState('');

// Filter quests
const filteredQuests = quests.filter(quest =>
  quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  quest.description?.toLowerCase().includes(searchQuery.toLowerCase())
);
```

#### Step 2: Add Search Input
**File**: `app/dashboard/page.tsx`

```typescript
// In the Mission Log section
<CardHeader>
  <div className="flex items-center justify-between">
    <div>
      <CardTitle className="flex items-center gap-2">
        <ScrollText className="h-5 w-5" />
        Mission Log
      </CardTitle>
      <CardDescription>Track your daily building adventures</CardDescription>
    </div>
    <div className="flex gap-2">
      <Input
        placeholder="Search missions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-64"
      />
      <Button size="sm" onClick={() => setQuestModalOpen(true)}>
        <Plus className="h-4 w-4 mr-1" />
        Log Action
      </Button>
    </div>
  </div>
</CardHeader>
```

#### Step 3: Update Quest List Render
**File**: `app/dashboard/page.tsx`

```typescript
// Change from: quests.slice(0, 10)
// To: filteredQuests.slice(0, 10)

{filteredQuests.length === 0 ? (
  <div className="text-center py-8">
    <p className="text-muted-foreground">No missions match your search</p>
  </div>
) : (
  <div className="space-y-3">
    {filteredQuests.slice(0, 10).map((quest) => (
      // ... existing quest card
    ))}
  </div>
)}
```

---

## 5. Adding Form Validation

### Example: Add "Notes" Field to Mission (Quest) Form

#### Step 1: Update Validation Schema
**File**: `lib/validations.ts`

```typescript
export const questSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional().or(z.literal('')),
  notes: z.string().max(1000).optional().or(z.literal('')),  // NEW
  duration_min: z.number().min(1, 'Must be at least 1 minute').max(1440),
  category: z.enum(['BACKEND', 'FRONTEND', 'MOBILE', 'DEVOPS']),
});
```

#### Step 2: Update Types
**File**: `lib/types.ts`

```typescript
export interface Quest {
  questId: string;
  createdAt: string;
  title: string;
  description?: string;
  notes?: string;  // NEW
  durationMin: number;
  category: 'BACKEND' | 'FRONTEND' | 'MOBILE' | 'DEVOPS';
}
```

#### Step 3: Update Form
**File**: `app/dashboard/page.tsx`

```typescript
// In the quest modal form
<div className="space-y-2">
  <Label htmlFor="notes">Notes</Label>
  <Textarea
    id="notes"
    placeholder="Additional notes..."
    {...registerQuest('notes')}
  />
  {questErrors.notes && (
    <p className="text-sm text-destructive">{questErrors.notes.message}</p>
  )}
</div>
```

#### Step 4: Update Transformer
**File**: `lib/transformers.ts`

```typescript
export function transformQuestData(data: QuestData): Quest {
  return {
    questId: data.quest_id,
    createdAt: data.created_at,
    title: data.title,
    description: data.description,
    notes: data.notes,  // NEW
    durationMin: data.duration_min,
    category: data.category,
  };
}
```

---

## 6. Performance Optimization

### Example: Add Memo to Expensive Component

#### Step 1: Identify Re-renders
Use React DevTools Profiler to find components re-rendering unnecessarily.

#### Step 2: Add Memoization
**File**: `components/dashboard/quest-item.tsx`

```typescript
'use client';

import { memo } from 'react';
import { Quest } from '@/lib/types';

interface QuestItemProps {
  quest: Quest;
  onDelete: (id: string) => void;
}

export const QuestItem = memo(function QuestItem({ quest, onDelete }: QuestItemProps) {
  // Component logic

  return (
    <div className="...">
      {/* Quest content */}
    </div>
  );
});
```

#### Step 3: Use Callback for Handlers
**File**: `app/dashboard/page.tsx`

```typescript
import { useCallback } from 'react';

const handleDeleteQuest = useCallback(async (questId: string) => {
  if (confirm('Are you sure you want to delete this quest?')) {
    await deleteQuest(questId);
  }
}, []); // Empty deps = stable reference
```

---

## 7. Debugging Common Issues

### Issue: "Cannot apply unknown utility class"

**Cause**: Using Tailwind classes that don't exist in v4

**Solution**:
```css
/* Check app/globals.css @theme section */
/* Ensure color variables are defined */
```

### Issue: "Text is invisible"

**Cause**: Using dark text on dark background

**Solution**:
```typescript
// ❌ BAD
<select className="bg-background text-sm">

// ✅ GOOD
<select className="bg-background text-foreground text-sm">
```

### Issue: "Middleware redirecting to login"

**Cause**: Token stored in localStorage but not in cookie

**Solution**:
```typescript
// Check hooks/use-auth.ts
// Ensure both are set on login:
localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
document.cookie = `odyssey_auth_token=${token}; path=/; max-age=3600`;
```

### Issue: "Optimistic update not rolling back"

**Cause**: Not storing original data before update

**Solution**:
```typescript
const previousData = [...quests]; // Store copy
setQuests(newData);

const response = await api.createQuest();

if (!response.success) {
  setQuests(previousData); // Restore
}
```

---

## 8. Testing Your Changes

### Manual Testing Checklist

```bash
# 1. Start dev server
npm run dev

# 2. Open browser
http://localhost:3000

# 3. Test authentication
- Login with demo credentials
- Check redirect to dashboard
- Logout and verify redirect to login

# 4. Test your feature
- Create new data
- Edit existing data
- Delete data
- Check validation errors
- Verify optimistic updates
- Check localStorage persistence

# 5. Check responsive design
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

# 6. Check console for errors
- Open DevTools (F12)
- Check Console tab
- Check Network tab
```

### Quick Validation Commands

```bash
# TypeScript check
npx tsc --noEmit

# Lint check
npm run lint

# Build check
npm run build
```

---

## 9. Common Patterns to Copy

### Loading State Pattern
```typescript
if (isLoading) {
  return <div>Loading...</div>;
}
```

### Empty State Pattern
```typescript
if (data.length === 0) {
  return (
    <div className="text-center py-8">
      <Icon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
      <p className="text-muted-foreground">No data yet</p>
    </div>
  );
}
```

### Error State Pattern
```typescript
if (error) {
  return (
    <div className="text-center py-8">
      <p className="text-destructive">Error: {error}</p>
      <Button onClick={retry}>Retry</Button>
    </div>
  );
}
```

### Form Modal Pattern
```typescript
<Dialog open={modalOpen} onOpenChange={setModalOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
```

---

## 10. Quick Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run linter

# File locations
code lib/types.ts        # Type definitions
code lib/constants.ts    # App constants
code services/mock-api.ts # Mock API
code hooks/              # All hooks
code components/ui/      # UI components
```

---

## 11. Preventing Navigation Loading Issues

### Problem: "Not Found" Flicker When Navigating

When navigating between pages (e.g., Project Detail → Task Detail → back), the app briefly shows a "Not Found" error before displaying content.

### Root Cause

1. Each page creates new hook instances on navigation
2. Hooks start with empty state and fetch data asynchronously
3. During fetch, `getById()` returns `undefined`, triggering "Not Found" state

### Solution: Initialize Hooks from localStorage

```typescript
// In hooks/use-projects.ts, hooks/use-tasks.ts, etc.

import { STORAGE_KEYS } from '@/lib/constants';

// Helper function to read from localStorage immediately
const getInitialData = (): YourType[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.YOUR_DATA);
    if (stored) {
      try {
        return JSON.parse(stored).map(transformYourData);
      } catch {
        return [];
      }
    }
  }
  return [];
};

export function useYourData() {
  // Lazy initialization - function runs once on mount
  const [data, setData] = useState<YourType[]>(getInitialData);

  // isLoading is false if we have cached data
  const [isLoading, setIsLoading] = useState(() => getInitialData().length === 0);

  useEffect(() => {
    // Only fetch if we don't have data yet
    if (data.length === 0) {
      fetchData();
    }
  }, []);

  // ...
}
```

### Page Loading Pattern

When using multiple hooks in a page, check ALL loading states:

```typescript
// In page component
const { isAuthenticated, isLoading: authLoading } = useAuth();
const { projects, getProjectById, isLoading: projectsLoading } = useProjects();
const { tasks, getTaskById, isLoading: tasksLoading } = useTasks(projectId);

// Check ALL loading states BEFORE checking for data existence
if (authLoading || projectsLoading || tasksLoading) {
  return <LoadingSpinner />;
}

// Only after loading checks, verify data exists
if (!project || !task) {
  return <NotFoundState />;
}
```

### Checklist for New Features

- [ ] Hook initializes state from localStorage using lazy initialization
- [ ] `isLoading` is `false` when cached data exists
- [ ] Pages check ALL hook loading states before rendering
- [ ] Pages check data existence AFTER loading checks

---

## Summary

When working on this project:

1. **Read architecture.md first** - Understand the patterns
2. **Follow the data flow** - Component → Hook → API → Transform → State
3. **Use semantic colors** - Never hardcode colors
4. **Test in dark mode** - Everything is dark themed
5. **Check mobile view** - Responsive by default
6. **Validate forms** - Always use Zod schemas
7. **Optimize UI** - Use optimistic updates
8. **Persist data** - Use localStorage
9. **Handle errors** - Show toast notifications
10. **Test thoroughly** - Manual testing required

Need help? Check the existing code for examples - it's well-documented!
