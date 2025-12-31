# 🤖 Antigravity - Documentation Index

**For Antigravity AI: Read this to find what you need quickly.**

---

## 📖 Documentation Split

### 🎯 For Human Users (Daily Workflow)
**[COMPLETE_GUIDE.md](../COMPLETE_GUIDE.md)** - Your complete guide for daily use
- **Part 1**: User Guide - How to use the app
- **Part 2**: Developer Guide - Claude Code & Antigravity workflows
- **Part 3**: Quick Reference - Cheat sheets and commands

### 🤖 For Antigravity AI (Technical Implementation)
**This `.agent/` folder** - Technical documentation for implementation
- Read this folder every time before implementing features
- Follow established patterns and workflows
- Understand architecture and design decisions

---

## 🚀 Quick Start for Antigravity

**New to this project? Start here:**
1. **[overview.md](./overview.md)** - Project introduction & quick start guide
2. **[quick-reference.md](./quick-reference.md)** - Copy-paste code patterns

**Need specific help? Jump to:**
- **[workflows/](./workflows/)** - Step-by-step guides for common tasks
- **[architecture.md](./architecture.md)** - Deep technical details

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

## 🗂️ Documentation Structure

```
.agent/
├── README.md           ← You are here (index)
├── overview.md         ← Start here (project intro)
├── quick-reference.md  ← Copy-paste patterns
├── architecture.md     ← Technical deep dive
└── workflows/          ← Specific task workflows
    ├── common.md       ← General tasks
    └── context.md      ← Context feeding workflow
```

---

## 💡 Pro Tips

### 1. Read in This Order
First time: `overview.md` → `quick-reference.md` → `architecture.md`

### 2. Search Before Coding
Before implementing something new, search these docs for similar patterns.

### 3. Use Workflows
If a task is complex, check the `workflows/` directory for a step-by-step guide.

---

*Project: Odyssey HUD 2026*
*Last updated: 2025-12-31*
