# Odyssey HUD 2026 - Quick Reference

## For Claude Code: Read This First! 🚀

When the user asks you to do something, check this file first for common patterns.

---

## 🔥 Most Common Tasks

### Add a New Field to Existing Form

**Example**: Add "priority" field to Mission (Quest) form

1.  **Update type** (`lib/types.ts`):
    ```typescript
    export interface Quest {
      // ... existing fields
      priority?: 'low' | 'medium' | 'high';  // NEW
    }
    ```

2.  **Update validation** (`lib/validations.ts`):
    ```typescript
    export const questSchema = z.object({
      // ... existing fields
      priority: z.enum(['low', 'medium', 'high']).optional(),
    });
    ```

3.  **Update form** (`app/dashboard/page.tsx`):
    ```typescript
    // In the modal form
    <div className="space-y-2">
      <Label htmlFor="priority">Priority</Label>
      <select
        id="priority"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
        {...registerQuest('priority')}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
    ```

4.  **Update transformer** (`lib/transformers.ts`):
    ```typescript
    export function transformQuestData(data: QuestData): Quest {
      return {
        // ... existing fields
        priority: data.priority,
      };
    }
    ```

That's it! The existing hook and UI will automatically handle it.

---

### Change a Color

**Always** use semantic variables:

```css
/* app/globals.css */
@theme {
  --color-primary: #YOUR_COLOR;
}
```

Then use `bg-primary`, `text-primary`, etc. everywhere.

**NEVER** hardcode: `bg-blue-500`, `text-black`, etc.

---

### Add Loading State

```typescript
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  fetchData().finally(() => setIsLoading(false));
}, []);

if (isLoading) {
  return <div className="flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>;
}
```

---

### Add Empty State

```typescript
if (data.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <IconName className="h-16 w-16 text-muted-foreground/30 mb-4" />
      <h3 className="text-lg font-semibold mb-2">No Data Yet</h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        Description of why there's no data and what to do next.
      </p>
    </div>
  );
}
```

---

### Add Error Message

```typescript
const { toast } = useToast();

// Show error
toast({
  title: 'Error Title',
  description: 'What went wrong',
  variant: 'destructive',
});

// Show success
toast({
  title: 'Success!',
});
```

---

### Add Confirmation Dialog

```typescript
const handleDelete = async (id: string) => {
  if (confirm('Are you sure you want to delete this?')) {
    await deleteItem(id);
  }
};
```

For custom confirmation, use the Dialog component.

---

### Format Dates

```typescript
// Relative time
import { getRelativeTime } from '@/lib/calculations';

<span>{getRelativeTime(quest.createdAt)}</span>
// Output: "2 hours ago", "Yesterday", etc.

// Absolute time
<span>{new Date(quest.createdAt).toLocaleDateString()}</span>
// Output: "12/31/2025"
```

---

### Format Duration

```typescript
import { formatDuration } from '@/lib/calculations';

<span>{formatDuration(quest.durationMin)}</span>
// Output: "45 min", "2h 30m", "1h"
```

---

### Get Category Icon

```typescript
import { Shield, Layout, Smartphone, Server } from 'lucide-react';

const getCategoryIcon = (category: string) => {
  const icons = {
    BACKEND: Shield,
    FRONTEND: Layout,
    MOBILE: Smartphone,
    DEVOPS: Server,
  };
  return icons[category] || Shield;
};

// Use it
const Icon = getCategoryIcon(quest.category);
<Icon className="h-4 w-4" />
```

---

### Filter Data

```typescript
const filteredData = data.filter(item =>
  item.field.toLowerCase().includes(searchQuery.toLowerCase())
);
```

---

### Sort Data

```typescript
// By date (newest first)
const sorted = [...data].sort((a, b) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

// By name
const sorted = [...data].sort((a, b) =>
  a.title.localeCompare(b.title)
);
```

---

## 🎨 UI Patterns

### Card Component

```typescript
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
  <CardFooter>
    Footer actions
  </CardFooter>
</Card>
```

### Badge Colors

```typescript
// Success (green)
<Badge variant="success">Completed</Badge>

// Destructive (red)
<Badge variant="destructive">Failed</Badge>

// Secondary (gray)
<Badge variant="secondary">Draft</Badge>

// Outline (border only)
<Badge variant="outline">Tag</Badge>

// Default (primary blue)
<Badge variant="default">Active</Badge>
```

### Button Variants

```typescript
<Button variant="default">Primary Action</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Subtle</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button isLoading={loading}>With Loading</Button>
```

### Input Fields

```typescript
<div className="space-y-2">
  <Label htmlFor="field-id">Label Text</Label>
  <Input
    id="field-id"
    type="text" // or email, password, number
    placeholder="Placeholder"
    {...register('fieldName')}
  />
  {errors.fieldName && (
    <p className="text-sm text-destructive">{errors.fieldName.message}</p>
  )}
</div>
```

### Modal Dialog

```typescript
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Modal Title</DialogTitle>
      <DialogDescription>Modal description</DialogDescription>
    </DialogHeader>

    {/* Content */}

    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Progress Bar

```typescript
<Progress value={progress} className="h-2" />
```

---

## 📁 File Locations

### Where to put things:

```
components/
├── auth/              # Authentication components
├── dashboard/         # Dashboard-specific components
├── ui/                # Reusable UI components
├── skeletons/         # Loading states
└── shared/            # Shared utilities

hooks/
├── use-auth.ts        # Authentication
├── use-profile.ts     # Profile management
├── use-quests.ts      # Quest operations
└── use-*.ts           # Other features

lib/
├── types.ts           # Add new types here
├── constants.ts       # Add constants here
├── validations.ts     # Add schemas here
├── transformers.ts    # Add transformers here
├── calculations.ts    # Add formulas here
└── utils.ts           # General utilities

services/
└── mock-api.ts        # Add API methods here
```

---

## 🔧 Quick Fixes

### Text invisible on dark background?
Add `text-foreground` class:
```typescript
<select className="... text-foreground">
```

### Select dropdown has black text?
Add `text-foreground` class to the select element.

### Middleware redirecting to login?
Check that token is set in BOTH localStorage AND cookie in `hooks/use-auth.ts`.

### Not redirecting after login?
Check `setIsLoading(false)` is called in `hooks/use-auth.ts` login function.

### State not updating?
Ensure you're using the transformer function:
```typescript
// ❌ BAD
setData(apiData);

// ✅ GOOD
setData(transformQuestData(apiData));
```

### Form not validating?
Ensure Zod schema is used:
```typescript
const { register, handleSubmit } = useForm({
  resolver: zodResolver(yourSchema),
});
```

---

## 📝 Code Snippets

### Create a new component

```typescript
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface YourComponentProps {
  data: any[];
  isLoading: boolean;
}

export function YourComponent({ data, isLoading }: YourComponentProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No data</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        {data.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </CardContent>
    </Card>
  );
}
```

### Add a new hook

```typescript
'use client';

import { useState, useEffect } from 'react';
import { yourApi } from '@/services/mock-api';
import { transformData } from '@/lib/transformers';
import { toast } from '@/components/ui/use-toast';

export function useYourFeature() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await yourApi.getData();

    if (response.success && response.data) {
      setData(response.data.map(transformData));
    }
    setIsLoading(false);
  };

  return {
    data,
    isLoading,
    refetch: fetchData,
  };
}
```

### Add API method

```typescript
// In services/mock-api.ts

export const yourApi = {
  getData: async (): Promise<ApiResponse<YourData[]>> => {
    await simulateDelay();

    const stored = localStorage.getItem(STORAGE_KEYS.YOUR_DATA);
    const data = stored ? JSON.parse(stored) : [];

    return { success: true, data };
  },

  createData: async (data: Omit<YourData, 'id' | 'created_at'>): Promise<ApiResponse<YourData>> => {
    await simulateDelay();

    const newData: YourData = {
      id: `id_${Date.now()}`,
      created_at: new Date().toISOString(),
      ...data,
    };

    const stored = localStorage.getItem(STORAGE_KEYS.YOUR_DATA);
    const existing = stored ? JSON.parse(stored) : [];
    existing.push(newData);
    localStorage.setItem(STORAGE_KEYS.YOUR_DATA, JSON.stringify(existing));

    return { success: true, data: newData };
  },
};
```

---

## 🚨 Don't Forget

### ✅ DO:
- Use semantic colors (`bg-primary`, `text-foreground`)
- Add `text-foreground` to native select elements
- Handle loading states
- Show empty states
- Display errors with toast
- Use optimistic updates
- Transform API data (snake_case -> camelCase)
- Validate forms with Zod
- Set both localStorage AND cookie for auth
- Test on mobile

### ❌ DON'T:
- Hardcode colors (`bg-blue-500`)
- Use black text (`text-black`)
- Forget to transform API responses
- Skip loading states
- Ignore errors
- Create components without `'use client'` if using hooks
- Use snake_case in client code (use camelCase)
- Forget to rollback optimistic updates on error

---

## 🎯 Common User Requests & How to Handle

### "Add X field to mission/boss/profile"
1. Add to `lib/types.ts`
2. Add to `lib/validations.ts`
3. Add to form in `app/dashboard/page.tsx`
4. Add to transformer in `lib/transformers.ts`
5. Update API in `services/mock-api.ts` if needed

### "Change color of X"
1. Edit `app/globals.css` `@theme` section
2. Use semantic variable name
3. Test in all components

### "Make X responsive"
1. Already using Tailwind responsive classes
2. Add mobile-first: `className="grid md:grid-cols-2 lg:grid-cols-3"`
3. Test at different breakpoints

### "Add search/filter"
1. Add search state: `const [search, setSearch] = useState('')`
2. Filter data: `data.filter(item => item.name.includes(search))`
3. Add input: `<Input value={search} onChange={e => setSearch(e.target.value)} />`

### "Fix bug in X"
1. Read the code flow
2. Add console.log to debug
3. Check data transformations
4. Check API responses
5. Test edge cases

---

## 📊 Data Flow Checklist

When adding new feature, verify:

- [ ] Type defined in `lib/types.ts`
- [ ] Validation schema in `lib/validations.ts`
- [ ] Transformer in `lib/transformers.ts`
- [ ] API method in `services/mock-api.ts`
- [ ] Hook created in `hooks/use-*.ts`
- [ ] Component built in `components/`
- [ ] Integrated in `app/dashboard/page.tsx`
- [ ] LocalStorage key added to `lib/constants.ts`
- [ ] Loading state handled
- [ ] Empty state shown
- [ ] Errors displayed
- [ ] Optimistic updates work
- [ ] Tested on mobile

---

## 💡 Tips

1. **Start with types** - Define types first, everything else follows
2. **Use existing patterns** - Copy from similar features
3. **Test incrementally** - Test each step before moving to next
4. **Read error messages** - They usually tell you exactly what's wrong
5. **Check console** - Always open DevTools when debugging
6. **Use semantic classes** - Makes global changes easier
7. **Transform data** - Always convert between snake_case and camelCase
8. **Handle loading** - Show something while data loads
9. **Show feedback** - Toast notifications for user actions
10. **Test auth flow** - Verify login/logout works after changes

---

## 📚 Learn More

- **Architecture**: Read `.claude/architecture.md`
- **Detailed Workflows**: Read `.claude/workflows.md`
- **Original Requirements**: Read `hud.md`

---

## 🎉 Quick Command Reference

```bash
# Start development
npm run dev

# TypeScript check
npx tsc --noEmit

# Build production
npm run build

# Run linter
npm run lint
```

**Server runs on**: http://localhost:3000

**Demo credentials**:
- Email: superadmin@gmail.com
- Password: 123456

---

*Last updated: 2025-12-31*
*Project: Odyssey HUD 2026*
*Stack: Next.js 16, React 19, Tailwind CSS v4, TypeScript*
