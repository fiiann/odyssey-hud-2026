# 📖 Odyssey HUD 2026 - The Complete Guide

> **Your daily workflow companion for using Odyssey HUD and developing with Claude Code** ⚔️✨

This guide has everything you need: using the app as a user, and developing it efficiently with Claude Code AI.

---

## 📑 Table of Contents

- [**PART 1: User Guide**](#part-1-user-guide-) - How to use Odyssey HUD
- [**PART 2: Developer Guide**](#part-2-developer-guide-) - Claude Code & Antigravity workflows
- [**PART 3: Quick Reference**](#part-3-quick-reference-) - Cheat sheets

---

# PART 1: USER GUIDE 🎮

> **For anyone using Odyssey HUD to track their project execution progress**

---

## 🚀 Getting Started

### Quick Setup (2 minutes)

1. **Open the app**: http://localhost:3000
2. **Log in** with demo credentials:
   ```
   Email: superadmin@gmail.com
   Password: 123456
   ```
3. **You're in!** Start exploring your dashboard.

### Dashboard Overview

```
┌─────────────────────────────────────────┐
│  Odyssey HUD 2026        SkillSeeker ▼  │ ← Navbar
├─────────────────────────────────────────┤
│  👤 Architect  Level 3    [Logout]      │ ← Profile (Status)
│  ████████████░░░░  230 XP to Level 4   │
├─────────────────────────────────────────┤
│  🔵 Backend: 240min  🟣 Frontend: 180min│ ← Stat Cards (4 skills)
│  🩷 Mobile: 60min    🟠 DevOps: 60min   │
├─────────────────────────────────────────┤
│  📜 Mission Log      [Log Action +]    │ ← Your execution log
│  └─────────────────────────────────────┘
├─────────────────────────────────────────┤
│  🐲 Boss Tracker                       │ ← Quarterly projects
│  E-Commerce MVP Q1 2026  ███████░░ 65% │
└─────────────────────────────────────────┘
```

---

## 📜 Logging Missions

### What is a Mission (Quest)?
A **Quest** = any building or execution activity you complete:
- Reading documentation 📚
- Watching tutorials 🎥
- Building features 💻
- Fixing bugs 🐛
- Practicing skills 🎯

### How to Log a Mission

1. **Click "Log Action" button**
2. **Fill in the form**:
   - **Task**: What you built (be specific!)
   - **Description**: Details about the build/fix (optional)
   - **Duration**: Minutes spent shipping
   - **Category**: Backend, Frontend, Mobile, or DevOps
3. **Click "Deploy Record"**
4. **Watch your status increase!** ✨

### Example Quests

```
✅ "Learned React Server Components"
   Description: "Read Next.js 15 docs about RSC"
   Duration: 45 min
   Category: Frontend

✅ "Built authentication system"
   Description: "Implemented JWT with refresh tokens"
   Duration: 120 min
   Category: Backend

✅ "Fixed CSS layout bug"
   Description: "Resolved z-index issue in navbar"
   Duration: 15 min
   Category: Frontend

✅ "Set up CI/CD pipeline"
   Description: "Configured GitHub Actions workflow"
   Duration: 60 min
   Category: DevOps
```

### Mission Best Practices

✅ **DO:**
- Log every session (even 15 minutes!)
- Be specific with task names
- Add descriptions for future reference
- Log immediately after shipping
- Use accurate durations

❌ **DON'T:**
- Skip small fixes (they add up!)
- Use vague tasks ("did coding")
- Forget to log until later
- Round durations too much

---

## 📊 Understanding Your Stats

### Leveling System

Your level is calculated from total XP (minutes logged):

```
Level = floor(sqrt(Total Minutes / 60))

Level 1: 0 minutes
Level 2: 60 minutes (1 hour)
Level 3: 240 minutes (4 hours)
Level 4: 540 minutes (9 hours)
Level 5: 960 minutes (16 hours)
Level 10: 8,640 minutes (144 hours)
```

### XP Progress Bar

Shows how close you are to the next level:

```
████████████░░░░  75% to Level 4

Current: 540 min (Level 3)
Next:   960 min (Level 4)
Need:   420 min more
```

### Stat Cards

Show breakdown by skill category:

```
┌─────────────────────┐
│ 🔵 Backend          │
│     240 min         │ ← Total time
│     40%             │ ← % of total
└─────────────────────┘
```

---

## 🐲 Boss Projects

### What are Bosses?
**Bosses** = Your quarterly main projects

These are your big goals:
- Q1 (Jan-Mar): First major project
- Q2 (Apr-Jun): Second project
- Q3 (Jul-Sep): Third project
- Q4 (Oct-Dec): Fourth project

### Managing Bosses

**Create/Edit Boss:**
1. Click "Edit Boss" button
2. Set:
   - **Title**: Project name
   - **Quarter**: Q1, Q2, Q3, or Q4
   - **Status**: Locked, Active, Completed, or Failed
   - **Progress**: 0-100%
   - **Links**: GitHub repo, deployment URL
3. Save changes

**Progress Milestones:**
```
25%: Initial setup ✅
50%: Core features 🎯
75%: Testing & polish 🔧
100%: Deployed! 🚀
```

---

## 🎯 Daily Workflow

### Morning Routine (5 min)

```
1. Open app: http://localhost:3000
2. Check your level and progress
3. Review yesterday's quests
4. Set today's goal (e.g., "Log 60 minutes")
```

### Build Session (15-120 min)

```
1. Build/implement something
2. Log it immediately as a mission
3. Watch status increase
4. Take a break! ☕
```

### Evening Review (5 min)

```
1. Check total XP for today
2. Update boss project progress if applicable
3. Plan tomorrow's learning
4. Celebrate progress! 🎉
```

---

## 💡 Pro Tips

### 1. Consistency > Intensity
```
Better: 30 min daily = 210 min/week
Than:  3 hours once = 180 min/week
```

### 2. Be Specific
```
❌ "Learned React"
✅ "Learned React Server Components from Next.js docs"
```

### 3. Use Descriptions
```
Add what you learned, resources used, challenges, etc.
Creates your personal knowledge base!
```

### 4. Balance Categories
```
Aim for: 25% each (Backend, Frontend, Mobile, DevOps)
Makes you a well-rounded Multi-Platform Architect!
```

### 5. Review Regularly
```
Weekly: Check stats, adjust goals
Monthly: Assess boss project progress
Quarterly: Plan next boss
```

---

## 📈 Progress Tracking

### Daily Goals
```
Beginner:   30-60 min/day
Regular:    60-120 min/day
Hardcore:    120+ min/day
```

### Level Milestones
```
Level 1-5:   🟢 Beginner      (0-16 hours)
Level 6-10:  🟡 Intermediate  (16-144 hours)
Level 11-20: 🟠 Advanced     (144-576 hours)
Level 21+:   🔴 Expert       (576+ hours)
```

### Examples

```
Daily:  60 min/day × 30 days = 1,800 min = Level 5
Weekly: 10 hours/week × 12 weeks = 7,200 min = Level 10
Monthly: 160 hours/month × 6 months = 57,600 min = Level 31!
```

---

## ❓ FAQ

**Q: How accurate should my duration be?**
A: Round to nearest 5 min. Honest estimates are fine!

**Q: Can I log future quests?**
A: No! Log after completing, not before.

**Q: What if I forget to log?**
A: Log as soon as you remember, estimate the duration.

**Q: Can I edit quests?**
A: Not yet (coming soon). Delete and re-log if needed.

**Q: Do breaks count?**
A: Only active learning time. 1h video with 20min pause = 40min.

**Q: Can I use multiple devices?**
A: Not yet (data is browser-specific). Sync coming later!

---

# PART 2: DEVELOPER GUIDE 👨‍💻

> **For developing Odyssey HUD with Claude Code & Antigravity AI**

---

## 🤖 Working with AI Agents

### The Golden Rule

**Always provide context!**

```
❌ BAD: "Fix the bug"
✅ GOOD: "Fix the authentication bug where users stay on loading screen.
         Check hooks/use-auth.ts login function.
         Related: middleware.ts might be involved."
```

### Reference Documentation

Agents read their respective folders **every time you prompt**! They know:
- Architecture and patterns
- Code workflows
- Quick reference patterns
- Common gotchas

- **Claude Code**: Reads `.claude/`
- **Antigravity**: Reads `.agent/`

**You don't need to repeat context!**

---

## 📋 Task Management

### Using TASKS.md

Your task list is in the root directory:

```bash
cat TASKS.md
```

**Structure:**
- **TO DO**: Work on these first (prioritized)
- **BACKLOG**: Not ready yet (do not work on)
- **COMPLETED**: Done!

### Daily Workflow

```
1. You: "Work on the next high-priority task"
2. AI: Reads TASKS.md
3. AI: Reads .claude/ or .agent/ docs for patterns
4. AI: Implements following conventions
5. AI: Updates TASKS.md (moves to COMPLETED)
6. AI: Commits changes
```

---

## 🌌 Antigravity Specifics

Antigravity is your primary agentic assistant. It uses a **Workflow** system.

### Using Slash Commands

You can trigger specific workflows with `/`:
- `/common`: General workflows (feat creation, bug fixing)
- `/context`: Maintenance of project context
- `/architecture`: Deep dive into project structure

### The .agent Folder

The `.agent` folder is Antigravity's source of truth. If you find Antigravity forgetting things, update the docs in `.agent/`.

---

## 🎚 Claude Code Modes

### 3 Modes Explained

#### Interactive Mode 🤝
**When to use:** Learning, experimenting, exploring
```
You: "I want to add animations but not sure which library"
Claude: Asks questions, you guide the conversation
```

#### Plan Mode 📋
**When to use:** Large features (500+ lines), architecture changes
```
You: "Enter plan mode for achievements system"
Claude: Creates detailed plan → You approve → Claude implements
```

#### Auto-Accept Mode ⚡
**When to use:** Trivial changes, well-defined tasks
```
You: "Add priority field to quest form"
Claude: Just does it (no questions)
```

### Mode Selection Guide

```
Trivial task?        → Auto-Accept ⚡
Need guidance?        → Interactive 🤝
Big feature?          → Plan Mode 📋
```

---

## 🐙 GitHub CLI Integration

### Why Use GitHub CLI?

Let Claude handle GitHub operations:
- Create issues
- Create PRs
- Merge branches
- Update status

### Setup

```bash
# Install GitHub CLI
./setup.sh

# Authenticate
gh auth login
```

### Examples

```
You: "Create a PR for the quest search feature"
Claude: Creates PR automatically! 🎉

You: "Create issues for all items in TO DO section"
Claude: Creates 6 issues in one go! ⚡
```

---

## 🌳 Parallel Work (Git Worktrees)

### What are Worktrees?

Multiple branches checked out simultaneously:

```
Projects/
├── HUD/              # Main branch
├── HUD-quests/       # Feature branch A
├── HUD-achievements/ # Feature branch B
└── HUD-bugfix/       # Hotfix branch C
```

### Why Use Them?

- Work on multiple features at once
- Claude works on branch A while you review B
- No more stashing changes
- True parallel development

### How to Use

```bash
# Create worktree
git worktree add ../HUD-feature feature/branch-name

# List worktrees
git worktree list

# Remove when done
git worktree remove ../HUD-feature
```

---

## 👥 Multi-Agent Workflow

### Pattern: Coder + Reviewer

```
Instance 1 (Coder):
You: "Implement quest search feature"

Instance 2 (Reviewer):
You: "Review the quest search in ../HUD-quests"
Claude: Analyzes code, finds issues, suggests improvements
```

### Pattern: Parallel Features

```
Instance 1: Work on quest search
Instance 2: Work on achievements
Instance 3: Work on streak tracking
```

---

## 🔄 Daily Development Workflow

### Morning Setup (5 min)

```
1. Check TASKS.md for priorities
2. Open Claude Code
3. Tell Claude: "Work on the next high-priority task"
```

### During Development

```
Claude: Reads .claude/ folder → Understands patterns → Implements
You: Review periodically → Test changes → Provide feedback
```

### Completion

```
Claude:
1. Tests the implementation
2. Updates TASKS.md (moves to COMPLETED)
3. Commits: git commit -m "feat: add feature"
4. Creates PR: gh pr create
```

---

## 💡 Advanced Tips

### 1. Batch Operations

```
You: "Create GitHub issues for all HIGH priority tasks"
Claude: Creates all issues at once! ⚡
```

### 2. Automated Workflows

```
You: "Implement X, commit, push, and create PR. Link to issue #123."
Claude: Does entire pipeline! 🎯
```

### 3. Code Reviews

```
You: "Review the last 5 commits for quality and best practices"
Claude: Analyzes and creates report 📋
```

### 4. Testing

```
You: "Test all authentication flows (login, logout, token expiration)"
Claude: Opens browser, tests each, documents results ✅
```

---

## 🚫 Common Mistakes

### ❌ Don't

- Give vague instructions ("fix it")
- Skip documentation (.claude/ folder exists for a reason!)
- Work on BACKLOG items (they're not ready)
- Let Claude work without review
- Forget to test changes

### ✅ Do

- Provide clear context
- Reference .claude/ docs explicitly
- Follow TASKS.md priorities
- Review Claude's work
- Test thoroughly
- Maintain TASKS.md

---

# PART 3: QUICK REFERENCE ⚡

> **Cheat sheets for daily use**

---

## 📝 Daily Workflow Checklist

### User (App)

```
Morning:
☐ Open app
☐ Check progress
☐ Set today's goal

After Learning:
☐ Log quest immediately
☐ Check XP increase
☐ Update boss progress

Evening:
☐ Review day's stats
☐ Plan tomorrow
☐ Celebrate! 🎉
```

### Developer (Claude Code)

```
Start:
☐ Check TASKS.md
☐ Tell Claude to work on top task

During:
☐ Provide clear requirements
☐ Reference .claude/ docs
☐ Review periodically

Completion:
☐ Test changes
☐ Update TASKS.md
☐ Commit & push
☐ Create PR
```

---

## ⌨️ Keyboard Shortcuts

### App (Coming Soon)
```
Ctrl+K: Open quest modal
Ctrl+N: New quest
Ctrl+/: Focus search
Esc: Close modals
```

### GitHub CLI
```bash
gh issue list              # List issues
gh pr create                # Create PR
gh pr merge                 # Merge PR
gh run list                 # List workflows
```

### Git
```bash
git status                  # Check status
git add .                   # Stage changes
git commit -m "msg"         # Commit
git push                    # Push to remote
```

---

## 🎯 Quick Commands

### User
```bash
# View progress
Open http://localhost:3000

# Log in
Email: superadmin@gmail.com
Password: 123456

# Start dev server
npm run dev
```

### Developer
```bash
# Start dev server
npm run dev

# Type check
npx tsc --noEmit

# Build
npm run build

# Create worktree
git worktree add ../HUD-name branch-name

# Install GitHub CLI
./setup.sh
```

---

## 🔗 Quick Links

### Documentation
- **This Guide**: `COMPLETE_GUIDE.md`
- **Task List**: `TASKS.md`
- **Project README**: `README.md`
- **Claude Docs**: `.claude/` folder

### Key Files
- **Dashboard**: `app/dashboard/page.tsx`
- **Types**: `lib/types.ts`
- **Constants**: `lib/constants.ts`
- **Validations**: `lib/validations.ts`
- **Hooks**: `hooks/`
- **Mock API**: `services/mock-api.ts`

### GitHub
- **Repo**: Your GitHub repository
- **Issues**: `gh issue list`
- **PRs**: `gh pr list`

---

## 🐛 Quick Fixes

### Problem: Can't log in
**Solution**: Use demo credentials, check console

### Problem: Text invisible
**Solution**: Add `text-foreground` class (select dropdowns)

### Problem: Not redirecting
**Solution**: Check `isLoading` in `hooks/use-auth.ts`

### Problem: Data not saving
**Solution**: Check localStorage, ensure no console errors

### Problem: Claude ignores docs
**Solution**: Explicitly reference: "See .claude/workflows.md → Section"

---

## 📊 Progress Formulas

### Level Calculation
```typescript
Level = floor(sqrt(Total Minutes / 60))
```

### XP Progress
```typescript
Next Level XP = (currentLevel + 1)² × 60
Progress % = (currentXP - currentLevelXP) / (nextLevelXP - currentLevelXP) × 100
```

### Examples
```
0 min     = Level 1
60 min    = Level 2
240 min   = Level 3
540 min   = Level 4
960 min   = Level 5
```

---

## 🎨 Color Reference

### Semantic Colors
```css
--color-background: #0a0a0a    /* Main background */
--color-foreground: #fafafa    /* Main text */
--color-primary: #3b82f6       /* Actions/links */
--color-secondary: #171717     /* Cards */
--color-border: #262626        /* Borders */
```

### Category Colors
```
Backend:  blue (#3b82f6)
Frontend: purple (#a855f7)
Mobile:   pink (#ec4899)
DevOps:   amber (#f59e0b)
```

---

## 🚀 Emergency Commands

```bash
# Reset to main (Claude made a mess)
git fetch origin
git reset --hard origin/main

# Too many worktrees
git worktree prune

# Claude created wrong branch
git branch -m wrong-name right-name

# Undo last commit
git reset --soft HEAD~1

# Restart dev server
# Press Ctrl+C, then: npm run dev
```

---

## 📱 Support

### Getting Help

1. **Check documentation first**:
   - This guide (COMPLETE_GUIDE.md)
   - `.claude/` folder for developers
   - TASKS.md for current tasks

2. **Check console**: Open DevTools (F12) for errors

3. **Check localStorage**: All your data is there

4. **Ask Claude**: Be specific and provide context!

---

## 🎉 Success Metrics

### User Success
✅ Logging quests daily
✅ Consistent progress
✅ Reaching level milestones
✅ Completing boss projects

### Developer Success
✅ 5+ tasks completed per day
✅ Following patterns from `.claude/`
✅ Clean git history
✅ Zero GitHub debt

---

## 🏁 Final Tips

### For Users
- Log consistently (daily is best)
- Be specific with quest titles
- Use descriptions for future reference
- Balance all 4 categories
- Celebrate your progress!

### For Developers
- Always provide context
- Let Claude read `.claude/` first
- Use TASKS.md for task management
- Choose the right mode (Interactive/Plan/Auto)
- Review before merging
- Keep documentation updated

---

**Happy learning and coding!** ⚔️✨📈

---

*Complete Guide v1.0*
*Last Updated: 2025-12-31*
*Project: Odyssey HUD 2026*
