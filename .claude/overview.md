# 📖 Odyssey HUD 2026 - Claude Code Documentation

## Welcome, Claude! 👋

You're about to work on the **Odyssey HUD 2026** project - an RPG-style learning tracker dashboard. This documentation will help you understand the project and work efficiently.

---

## 🎯 What is This Project?

A **frontend-only** Next.js application where users can:
- Log daily building activities (missions)
- Track Execution Credits (XP) and increase rank like an RPG character
- Monitor quarterly projects (bosses)
- View statistics across 4 execution pillars
- Manage their profile and shipping progress

**Key**: No real backend - everything uses a mock API with localStorage.

---

## 🚀 Quick Start

### 1. Read This First
- **You are here**: `overview.md` - This file
- **Quick reference**: `quick-reference.md` - Copy-paste patterns
- **Architecture**: `architecture.md` - Deep dive into structure
- **Workflows**: `workflows.md` - Step-by-step guides

### 2. Understand the Stack
```
Frontend: Next.js 16 + React 19 + TypeScript
Styling: Tailwind CSS v4 (dark theme)
State: React Hooks
Data: localStorage + mock API
Auth: Mock JWT with cookies
```

### 3. Know the Patterns
- All data flows: Component → Hook → Mock API → Transform → State
- API uses `snake_case`, client uses `camelCase`
- Optimistic updates for instant feedback
- Semantic colors (never hardcode)
- Always validate with Zod

### 4. Common Tasks
See `quick-reference.md` for:
- Adding fields to forms
- Changing colors
- Creating components
- Debugging issues

---

## 📁 Project at a Glance

```
odyssey-hud/
├── .claude/               # ← YOU ARE HERE (documentation)
│   ├── overview.md        # This file
│   ├── quick-reference.md # Copy-paste patterns
│   ├── architecture.md    # Deep technical details
│   └── workflows.md       # Step-by-step guides
│
├── app/                   # Next.js pages & layouts
│   ├── dashboard/page.tsx # Main dashboard (large file)
│   ├── login/page.tsx     # Login page
│   └── globals.css        # Tailwind theme
│
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   ├── auth/              # Login form
│   └── dashboard/         # Dashboard components
│
├── hooks/                 # Custom React hooks
│   ├── use-auth.ts        # Authentication
│   ├── use-profile.ts     # Profile & XP
│   ├── use-quests.ts      # Quest management
│   └── use-bosses.ts      # Boss management
│
├── lib/                   # Core utilities
│   ├── types.ts           # TypeScript interfaces
│   ├── constants.ts       # App constants
│   ├── validations.ts     # Zod schemas
│   ├── transformers.ts    # Data converters
│   ├── calculations.ts    # XP/level formulas
│   └── utils.ts           # General utilities
│
└── services/
    └── mock-api.ts        # Simulated backend API
```

---

## 🎨 Key Design Decisions

### 1. Client-Side Only
- ✅ No real database
- ✅ No backend server
- ✅ All data in localStorage
- ✅ Mock API simulates network delays

**Why**: Fast development, easy testing, portable data.

### 2. Dark Theme Only
- ✅ Background: `#0a0a0a` (nearly black)
- ✅ Text: `#fafafa` (nearly white)
- ✅ All components dark-styled
- ✅ Primary color: Blue (`#3b82f6`)

**Why**: RPG aesthetic, easier on eyes for long sessions.

### 3. Optimistic UI
- ✅ Instant feedback on user actions
- ✅ Rollback on API errors
- ✅ Better perceived performance

**Why**: Feels faster and more responsive.

### 4. Type Safety
- ✅ Strict TypeScript
- ✅ Zod validation on all forms
- ✅ Separate API vs Client types

**Why**: Catches bugs early, better DX.

### 5. Cookie + LocalStorage Auth
- ✅ localStorage for client-side auth
- ✅ Cookie for middleware (server-side)
- ✅ Both set on login

**Why**: Next.js middleware can't access localStorage.

---

## 🔥 Most Important Files

When working on this project, you'll frequently use:

### For Quick Fixes
- `app/dashboard/page.tsx` - Main UI (4000+ lines)
- `lib/constants.ts` - Colors, categories, config
- `app/globals.css` - Theme colors

### For Adding Features
- `lib/types.ts` - Add new types here
- `lib/validations.ts` - Add validation schemas
- `services/mock-api.ts` - Add API methods
- `hooks/use-*.ts` - Create new hook
- `lib/transformers.ts` - Add data converters

### For Styling
- `app/globals.css` - Theme variables
- `components/ui/` - UI components
- `lib/constants.ts` - Category colors

---

## ⚡ Quick Patterns to Copy

### Add a Form Field
```typescript
// 1. lib/types.ts - Add to interface
field?: string;

// 2. lib/validations.ts - Add to schema
field: z.string().optional();

// 3. app/dashboard/page.tsx - Add to form
<Input {...register('field')} />

// Done! Existing code handles the rest.
```

### Change a Color
```css
/* app/globals.css */
@theme {
  --color-primary: #YOUR_COLOR;
}
```

### Add Loading State
```typescript
if (isLoading) return <Loader2 className="animate-spin" />;
```

### Show Toast
```typescript
toast({ title: 'Success!' });  // or
toast({ title: 'Error', variant: 'destructive' });
```

---

## 🐛 Common Issues & Fixes

### Issue: Black text invisible on dark theme
**Fix**: Add `text-foreground` class
```typescript
<select className="... text-foreground">
```

### Issue: Not redirecting after login
**Fix**: Ensure `setIsLoading(false)` called in `use-auth.ts`

### Issue: Middleware redirecting to login
**Fix**: Ensure token set in BOTH localStorage AND cookie

### Issue: Unknown utility class error
**Fix**: Use semantic classes (`bg-primary`, not `bg-blue-500`)

---

## 📊 Data Flow Example

User creates a quest:

```
1. User fills form → app/dashboard/page.tsx
2. Form submits → handleSubmit()
3. Hook called → createQuest()
4. Optimistic update → UI shows quest immediately
5. API called → questApi.createQuest()
6. Transform data → snake_case to camelCase
7. Update state → setQuests()
8. Update profile → XP increases
9. Show toast → "Quest logged!"
```

---

## 🎯 When User Asks...

### "Add X feature"
1. Check `quick-reference.md` → "Add a New Field to Existing Form"
2. Follow the pattern: types → validations → form → transformer
3. Test it works

### "Change color of Y"
1. Edit `app/globals.css` `@theme` section
2. Use semantic variable
3. Test everywhere it's used

### "Fix bug in Z"
1. Understand data flow (see above)
2. Add console.log to debug
3. Check transformations
4. Test edge cases

### "How does X work?"
1. Check `architecture.md` for deep dive
2. Check `workflows.md` for examples
3. Read the code - it's well documented

---

## 📝 Development Workflow

### Starting Work
1. Read the relevant doc file
2. Check existing similar code
3. Copy the pattern
4. Adapt to your needs
5. Test thoroughly

### Testing Checklist
- [ ] Works on desktop
- [ ] Works on mobile (< 640px)
- [ ] Works on tablet (640-1024px)
- [ ] Loading states shown
- [ ] Empty states shown
- [ ] Errors displayed
- [ ] Data persists in localStorage
- [ ] No console errors

### Common Commands
```bash
npm run dev          # Start server
npm run build        # Build for production
npx tsc --noEmit     # Type check
```

---

## 🎓 Learning Path

### New to this project?
1. **Read**: `overview.md` (this file) ← You are here
2. **Read**: `quick-reference.md` (5 min)
3. **Skim**: `architecture.md` (10 min)
4. **Reference**: `workflows.md` as needed

### Working on specific task?
1. **Quick fix**: Check `quick-reference.md`
2. **New feature**: Check `workflows.md`
3. **Understanding**: Check `architecture.md`
4. **Original specs**: Check `hud.md`

---

## 🔐 Authentication Notes

### Demo Credentials
```
Email: superadmin@gmail.com
Password: 123456
```

### Token Storage
```typescript
// Set on login
localStorage.setItem('odyssey_auth_token', token);
document.cookie = `odyssey_auth_token=${token}; path=/; max-age=3600`;

// Cleared on logout
localStorage.clear();
document.cookie = 'odyssey_auth_token=; path=/; max-age=0';
```

### Route Protection
Middleware checks cookie on every request to `/dashboard`.

---

## 🎨 Theming System

All colors defined in `app/globals.css`:

```css
@theme {
  --color-background: #0a0a0a;      /* Main background */
  --color-foreground: #fafafa;      /* Main text */
  --color-primary: #3b82f6;         /* Action color */
  --color-secondary: #171717;       /* Cards/panels */
  --color-muted: #171717;           /* Muted elements */
  --color-border: #262626;          /* Borders */
  --color-destructive: #ef4444;     /* Errors/delete */
}
```

Use them everywhere:
```typescript
className="bg-background text-foreground border-border"
```

---

## 📦 Key Dependencies

```json
{
  "next": "16.1.1",           // Framework
  "react": "19.2.3",          // UI library
  "tailwindcss": "4.1.18",    // Styling
  "typescript": "5.9.3",      // Types
  "react-hook-form": "7.69.0", // Forms
  "zod": "4.3.2",             // Validation
  "lucide-react": "0.562.0"   // Icons
}
```

---

## 🚨 Gotchas & Warnings

### ⚠️ Tailwind CSS v4
Uses new `@import "tailwindcss"` syntax, not `@tailwind` directives.

### ⚠️ Select Dropdowns
Always add `text-foreground` class or text will be invisible.

### ⚠️ Middleware
Can't access localStorage, must use cookies.

### ⚠️ Form Validation
Always use Zod schemas, never trust frontend only.

### ⚠️ Data Transformation
API returns `snake_case`, client uses `camelCase`. Always transform.

### ⚠️ Optimistic Updates
Must rollback on API error or data gets out of sync.

---

## ✅ Quality Checklist

Before committing changes, verify:

- [ ] Code follows existing patterns
- [ ] Types are defined in `lib/types.ts`
- [ ] Validations added to `lib/validations.ts`
- [ ] Transformers updated in `lib/transformers.ts`
- [ ] Loading states handled
- [ ] Empty states shown
- [ ] Errors displayed with toast
- [ ] No console errors
- [ ] Works on mobile
- [ ] Data persists in localStorage
- [ ] Semantic colors used (no hardcoded colors)

---

## 🎉 Summary

You're now ready to work on Odyssey HUD 2026!

### Remember:
1. **Start here** when working on this project
2. **Check docs** before writing new code
3. **Follow patterns** from existing code
4. **Test thoroughly** before saying done
5. **Ask questions** if something is unclear

### Documentation Files:
- **overview.md** ← You are here (start here)
- **quick-reference.md** ← Copy-paste patterns
- **architecture.md** ← Deep technical details
- **workflows.md** ← Step-by-step guides

### Original Spec:
- **hud.md** ← Full requirements document

---

**Happy coding!** 🚀

*Last updated: 2025-12-31*
*Project: Odyssey HUD 2026*
*Version: 1.0.0*
