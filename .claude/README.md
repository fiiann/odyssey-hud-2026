# 📚 Odyssey HUD 2026 - Documentation Index

**For Claude Code: Read this to find what you need quickly.**

---

## 📖 Documentation Split

### 🎯 For Human Users (Daily Workflow)
**[COMPLETE_GUIDE.md](../COMPLETE_GUIDE.md)** - Your complete guide for daily use
- **Part 1**: User Guide - How to use the app
- **Part 2**: Developer Guide - Claude Code workflows, GitHub CLI, git worktrees
- **Part 3**: Quick Reference - Cheat sheets and commands

### 🤖 For Claude Code AI (Technical Implementation)
**This `.claude/` folder** - Technical documentation for implementation
- Read this folder every time before implementing features
- Follow established patterns and workflows
- Understand architecture and design decisions

---

## 🚀 Quick Start for Claude Code

**New to this project? Start here:**
1. **[overview.md](./overview.md)** - Project introduction & quick start guide
2. **[quick-reference.md](./quick-reference.md)** - Copy-paste code patterns

**Need specific help? Jump to:**
- **[workflows.md](./workflows.md)** - Step-by-step guides for common tasks
- **[architecture.md](./architecture.md)** - Deep technical details
- **[../hud.md](../hud.md)** - Original requirements document

---

## ⚠️ IMPORTANT: GIT WORKFLOW RULE

**DO NOT PUSH TO GITHUB AUTOMATICALLY**

When implementing features:
1. ✅ **DO**: Make changes and commit locally (`git commit`)
2. ❌ **DO NOT**: Push to remote (`git push`)
3. ✅ **DO**: Report completion with commit hash
4. ✅ **DO**: Wait for user to push manually

**Rationale**: The user wants full control over when changes are pushed to GitHub. Only commit locally, never push.

---

## 📖 Documentation Files

### 1. [overview.md](./overview.md) ⭐ **START HERE**
**Best for**: Getting started with the project

**Contents**:
- What is this project?
- Quick start guide
- Project structure overview
- Key design decisions
- Most important files
- Common patterns to copy
- Development workflow
- Quality checklist

**Read time**: 5-7 minutes

---

### 2. [quick-reference.md](./quick-reference.md) 🔥 **MOST USEFUL**
**Best for**: Quick copy-paste solutions

**Contents**:
- Add field to existing form
- Change colors
- Add loading/empty/error states
- Common UI patterns (cards, badges, buttons)
- Form validation patterns
- Debugging common issues
- File location guide
- Code snippets
- Do's and Don'ts

**Read time**: 10-15 minutes (or search as needed)

---

### 3. [workflows.md](./workflows.md) 🛠️ **STEP-BY-STEP GUIDES**
**Best for**: Learning how to implement features

**Contents**:
- Creating a new feature (full walkthrough)
- Fixing bugs systematically
- Modifying existing components
- Adding form validation
- Performance optimization
- Debugging common issues
- Testing your changes
- Common patterns with examples

**Read time**: 20-30 minutes (or use as reference)

---

### 4. [architecture.md](./architecture.md) 🏗️ **TECHNICAL DEEP DIVE**
**Best for**: Understanding how everything works

**Contents**:
- Architecture patterns
- Data flow diagrams
- Project structure details
- Data models (API vs Client)
- Design patterns used
- State management strategy
- Routing & middleware
- Styling strategy
- Leveling system formulas
- Common gotchas
- Performance considerations

**Read time**: 15-20 minutes

---

### 5. [../hud.md](../hud.md) 📋 **ORIGINAL REQUIREMENTS**
**Best for**: Understanding what to build

**Contents**:
- Complete project requirements
- Technical specifications
- Data models
- API specifications
- UI/UX requirements
- Acceptance criteria

**Read time**: 30-40 minutes

---

## 🎯 By Task Type

### "I need to add a new feature..."
1. Read: [workflows.md](./workflows.md) → "Creating a New Feature"
2. Reference: [quick-reference.md](./quick-reference.md) → "Add a New Field to Existing Form"
3. Understand: [architecture.md](./architecture.md) → "Data Flow"

### "I need to fix a bug..."
1. Read: [workflows.md](./workflows.md) → "Fixing a Bug"
2. Reference: [quick-reference.md](./quick-reference.md) → "Quick Fixes"
3. Understand: [architecture.md](./architecture.md) → "Common Gotchas"

### "I need to change colors/styling..."
1. Read: [quick-reference.md](./quick-reference.md) → "Change a Color"
2. Reference: [architecture.md](./architecture.md) → "Styling Strategy"

### "I need to understand how X works..."
1. Read: [architecture.md](./architecture.md) → Find relevant section
2. Reference: [workflows.md](./workflows.md) → Find related workflow

### "I'm new to this project..."
1. Read: [overview.md](./overview.md) ← Start here!
2. Skim: [quick-reference.md](./quick-reference.md)
3. Reference: Others as needed

---

## 🗂️ Quick Navigation

### By Component
- **Dashboard**: [app/dashboard/page.tsx](../app/dashboard/page.tsx)
- **Login**: [app/login/page.tsx](../app/login/page.tsx)
- **Hooks**: [hooks/](../hooks/)
- **Types**: [lib/types.ts](../lib/types.ts)
- **Mock API**: [services/mock-api.ts](../services/mock-api.ts)
- **UI Components**: [components/ui/](../components/ui/)

### By Concept
- **Authentication**: [overview.md](./overview.md) → Authentication Notes
- **Data Models**: [architecture.md](./architecture.md) → Data Models
- **State Management**: [architecture.md](./architecture.md) → State Management Strategy
- **Styling**: [architecture.md](./architecture.md) → Styling Strategy
- **Leveling System**: [architecture.md](./architecture.md) → Leveling System

### By File Type
- **Type Definitions**: [lib/types.ts](../lib/types.ts)
- **Validation Schemas**: [lib/validations.ts](../lib/validations.ts)
- **Constants**: [lib/constants.ts](../lib/constants.ts)
- **Transformers**: [lib/transformers.ts](../lib/transformers.ts)
- **Utilities**: [lib/utils.ts](../lib/utils.ts)

---

## 📊 Documentation Structure

```
.claude/
├── README.md           ← You are here (index)
├── overview.md         ← Start here (project intro)
├── quick-reference.md  ← Copy-paste patterns
├── workflows.md        ← Step-by-step guides
└── architecture.md     ← Technical deep dive
```

---

## 🔍 Search Tips

### Finding What You Need

**Want quick patterns?**
→ Go to [quick-reference.md](./quick-reference.md) and use Ctrl+F

**Learning to build something?**
→ Go to [workflows.md](./workflows.md) and find the relevant section

**Understanding how it works?**
→ Go to [architecture.md](./architecture.md) and read relevant sections

**First time here?**
→ Start with [overview.md](./overview.md)

**Looking for requirements?**
→ Check [../hud.md](../hud.md)

---

## 💡 Pro Tips

### 1. Read in This Order
First time: `overview.md` → `quick-reference.md` → `architecture.md`

Ongoing: `quick-reference.md` (keep open for reference)

### 2. Search Before Coding
Before implementing something new:
1. Search these docs for similar patterns
2. Check if a workflow already exists
3. Copy the pattern instead of guessing

### 3. Understand the Why
Before changing something:
1. Read [architecture.md](./architecture.md) to understand design decisions
2. Check [quick-reference.md](./quick-reference.md) for common gotchas
3. Make sure your change follows existing patterns

### 4. Test Thoroughly
After making changes:
1. Follow testing checklist in [overview.md](./overview.md)
2. Check mobile responsiveness
3. Verify data persists
4. Ensure no console errors

---

## 🎓 Learning Path

### Beginner (New to Project)
1. ✅ Read [overview.md](./overview.md) (5 min)
2. ✅ Skim [quick-reference.md](./quick-reference.md) (5 min)
3. ✅ Check [architecture.md](./architecture.md) sections as needed (10 min)
4. ✅ Reference [workflows.md](./workflows.md) for specific tasks (as needed)

### Intermediate (Familiar with Project)
1. ✅ Keep [quick-reference.md](./quick-reference.md) open
2. ✅ Reference [workflows.md](./workflows.md) for new tasks
3. ✅ Check [architecture.md](./architecture.md) for deep dives

### Advanced (Know Project Well)
1. ✅ Use [quick-reference.md](./quick-reference.md) as cheat sheet
2. ✅ Reference [../hud.md](../hud.md) for requirements
3. ✅ Help update docs with new patterns

---

## 🚨 Common Issues & Quick Links

### Issue: Black text on dark theme
**Solution**: [quick-reference.md](./quick-reference.md) → "Quick Fixes" → "Text invisible"

### Issue: Select dropdown not visible
**Solution**: [quick-reference.md](./quick-reference.md) → "Quick Fixes" → "Select dropdown has black text?"

### Issue: Not redirecting after login
**Solution**: [quick-reference.md](./quick-reference.md) → "Quick Fixes" → "Not redirecting after login"

### Issue: Don't know how to add X
**Solution**: [workflows.md](./workflows.md) → Find relevant workflow or [quick-reference.md](./quick-reference.md) → "Add a New Field to Existing Form"

---

## 📝 Contributing to Docs

When you learn new patterns or solve common issues:
1. Add to [quick-reference.md](./quick-reference.md)
2. Create workflow in [workflows.md](./workflows.md)
3. Update [architecture.md](./architecture.md) if architectural change

---

## 🎉 Summary

**For Claude Code**:
- ✅ **Start here**: [overview.md](./overview.md)
- ✅ **Reference often**: [quick-reference.md](./quick-reference.md)
- ✅ **Learn patterns**: [workflows.md](./workflows.md)
- ✅ **Understand deeply**: [architecture.md](./architecture.md)

**Key Points**:
- This is a frontend-only project with mock API
- Uses Next.js 16, React 19, Tailwind CSS v4
- Dark theme with semantic colors
- Optimistic UI updates
- TypeScript with Zod validation
- Data in localStorage

**Remember**:
- Always follow existing patterns
- Use semantic colors (no hardcoding)
- Transform API data (snake_case ↔ camelCase)
- Test on mobile
- Handle loading/empty/error states

---

**Happy coding!** 🚀

*Project: Odyssey HUD 2026*
*Last updated: 2025-12-31*
