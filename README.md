# 🎮 Odyssey HUD 2026

> **Level up your project execution with an RPG-style dashboard** ⚔️✨

A gamified project tracker that turns shipping code into an epic adventure. Track missions, defeat boss projects, and watch your rank increase as you become a Multi-Platform Architect! 🚀

---

## ✨ What is This?

Imagine your LinkedIn profile, but it's an RPG character sheet. 🎲

Odyssey HUD is a **frontend-only dashboard** where you can:
- 📜 Log daily building missions (Backend, Frontend, Mobile, DevOps)
- 👤 Track your Execution Credits (XP) and watch your rank increase
- 🐊 Conquer quarterly "boss" projects
- 📊 View stats across all execution pillars
- 🏆 Build an archive of your shipped projects

**Best part?** No backend needed! Everything runs in your browser with localStorage. 🎉

---

## 🛠️ Tech Stack

```
Frontend:  Next.js 16 + React 19 + TypeScript
Styling:   Tailwind CSS v4 (dark theme)
Forms:     React Hook Form + Zod
Icons:     Lucide React
State:     React Hooks
Data:      localStorage + Mock API
Auth:      Mock JWT with cookies
```

### Why This Stack? 🤔
- **Next.js 16**: Latest App Router, server components, Turbopack for fast dev ⚡
- **React 19**: newest features and performance improvements
- **Tailwind v4**: Modern CSS-first styling with dark theme out of the box 🌙
- **TypeScript**: Type safety catches bugs before they happen 🐛→✅
- **Zod**: Runtime validation that actually works ✨

---

## 🎯 Features

### ✅ Currently Implemented

#### 🔐 Authentication System
- [x] Login page with form validation
- [x] Mock JWT authentication (demo credentials)
- [x] Token stored in localStorage + cookies
- [x] Protected routes with middleware
- [x] Logout with data clearing
- [x] Auto-redirect on auth state change

**Demo Credentials:**
```
Email: superadmin@gmail.com
Password: 123456
```

#### 👤 Profile & Leveling System
- [x] User profile with avatar and username
- [x] XP tracking based on logged minutes
- [x] Level calculation: `Level = floor(sqrt(totalMinutes / 60))`
- [x] Animated XP progress bar
- [x] Level up celebration modal 🎊
- [x] Real-time stat updates

#### 📊 Stat Cards Grid
- [x] 4 category cards: Backend, Frontend, Mobile, DevOps
- [x] Color-coded icons and borders:
  - 🔵 Backend (blue)
  - 🟣 Frontend (purple)
  - 🩷 Mobile (pink)
  - 🟠 DevOps (amber)
- [x] Total minutes per category
- [x] Percentage breakdown of total time
- [x] Responsive grid (1/2/4 columns)
- [x] Animated counters

#### 📜 Quest Log
- [x] Create quests with title, description, duration, category
- [x] Form validation with real-time errors
- [x] Modal dialog for quest creation
- [x] Display 10 most recent quests
- [x] Category badges with icons
- [x] Duration formatting (e.g., "2h 30m", "45 min")
- [x] Relative timestamps (e.g., "2 hours ago")
- [x] Delete quests with confirmation
- [x] Optimistic UI updates (instant feedback!)
- [x] XP automatically updates on quest creation/deletion

#### 🐲 Boss Tracker
- [x] Active quarterly boss display
- [x] Progress bar (0-100%)
- [x] Status management (Locked, Active, Completed, Failed)
- [x] Edit boss progress and status via modal
- [x] GitHub and deployment links
- [x] Animated status badges with icons
- [x] Quarter indicators

#### 📚 Boss History
- [x] Archive of completed/failed bosses
- [x] Filter by quarter (Q1, Q2, Q3, Q4, All)
- [x] Status badges (Completed 🟢, Failed 🔴)
- [x] Progress percentage display
- [x] Responsive grid layout

#### 🎨 UI/UX Features
- [x] Dark theme (RPG aesthetic) 🌙
- [x] Fully responsive design (mobile, tablet, desktop) 📱💻
- [x] Toast notifications for all actions
- [x] Loading states throughout
- [x] Empty states with illustrations
- [x] Modal dialogs for forms
- [x] Optimistic updates (instant UI feedback)
- [x] Form validation with error messages
- [x] Confirmation dialogs for destructive actions

#### 🔧 Under the Hood
- [x] Complete mock API layer with simulated delays
- [x] Rate limiting (10 requests/minute)
- [x] Random error simulation (10% - commented out)
- [x] Data transformation (snake_case ↔ camelCase)
- [x] LocalStorage persistence
- [x] Cookie-based middleware auth
- [x] Custom React hooks for data management
- [x] TypeScript type safety
- [x] Zod validation schemas

---

## 🚧 Ongoing Features

These are partially implemented or could be improved:

### 🎨 Polish & Animations
- [ ] Skeleton loading components (placeholder loading states)
- [ ] Framer Motion animations for:
  - [ ] Page transitions
  - [ ] Card hover effects
  - [ ] Quest creation animation
  - [ ] Level up celebration
  - [ ] Progress bar animations

### 🐛 Known Issues
- [ ] Console warnings about deprecated middleware (Next.js 16 feature)
- [ ] Some Tailwind classes might show as "unknown" in IDE

### 🔨 Code Quality
- [ ] Add more component modularity (dashboard is one large file)
- [ ] Add unit tests
- [ ] Add E2E tests
- [ ] Performance optimization with React.memo

---

## 📋 To-Do Features

### 🎯 High Priority
- [ ] **Achievements System** - Unlock badges for milestones
- [ ] **Streak Tracking** - Daily/weekly learning streaks 🔥
- [ ] **Quest Categories Filtering** - Filter quest log by category
- [ ] **Search Functionality** - Search quests and bosses
- [ ] **Data Export** - Export data to JSON/CSV
- [ ] **Data Import** - Import from backup

### 📊 Medium Priority
- [ ] **Charts & Analytics** - Visual XP progress over time
- [ ] **Calendar View** - See quest activity on calendar
- [ ] **Tags System** - Add tags to quests (e.g., "tutorial", "project")
- [ ] **Quest Templates** - Quick-add common quest types
- [ ] **Goal Setting** - Set monthly/weekly XP goals
- [ ] **Reminders** - Daily quest logging reminders

### 🎨 Low Priority
- [ ] **Theme Customization** - Choose accent colors
- [ ] **Multiple Profiles** - Switch between different skill journeys
- [ ] **Social Features** - Share profile (someday)
- [ ] **Sound Effects** - Level up sounds (optional)
- [ ] **Confetti Animations** - More celebration effects 🎉
- [ ] **RPG Soundtrack** - Ambient background music (maybe)

### 🔮 Future Enhancements
- [ ] **Real Backend** - PostgreSQL/REST API
- [ ] **User Registration** - Real account system
- [ ] **Multiplayer** - Leaderboards, achievements (eventually)
- [ ] **Mobile App** - React Native version
- [ ] **Browser Extension** - Quick quest logging from anywhere
- [ ] **Integration** - Connect with GitHub, learning platforms

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/fiiann/odyssey-hud-2026.git
cd odyssey-hud-2026

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser! 🎉

### Login
Use the demo credentials shown on the login page:
```
Email: superadmin@gmail.com
Password: 123456
```

---

## 📂 Project Structure

```
odyssey-hud/
├── .claude/              # Documentation for Claude Code AI
├── app/                  # Next.js App Router pages
│   ├── dashboard/        # Main dashboard
│   ├── login/            # Login page
│   └── globals.css       # Tailwind v4 theme
├── components/           # React components
│   ├── auth/             # Login form
│   ├── dashboard/        # Dashboard components
│   ├── skeletons/        # Loading states (TODO)
│   ├── shared/           # Shared utilities (TODO)
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
│   ├── use-auth.ts       # Authentication
│   ├── use-profile.ts    # Profile management
│   ├── use-quests.ts     # Quest operations
│   └── use-bosses.ts     # Boss operations
├── lib/                  # Core utilities
│   ├── calculations.ts   # XP & level formulas
│   ├── constants.ts      # Categories, colors
│   ├── mock-data.ts      # Seed data
│   ├── transformers.ts   # Data converters
│   ├── types.ts          # TypeScript interfaces
│   ├── utils.ts          # General utilities
│   └── validations.ts    # Zod schemas
├── services/             # Mock API layer
│   └── mock-api.ts       # Simulated backend
└── middleware.ts         # Route protection
```

---

## 🎮 How to Use

### 1. Log In 🔑
Use the demo credentials on the login page

### 2. Create Your First Mission 📜
- Click "Log Action" button
- Enter what you built/fixed (title, description)
- Add duration in minutes
- Choose category (Backend, Frontend, Mobile, DevOps)
- Deploy Record! ✨

### 3. Watch Your Status Grow 📈
- Each action adds to your total Execution Credits
- Rank up as you accumulate XP
- Track progress in the status bar
- Get a celebration modal when you rank up! 🎊

### 4. Track Quarterly Bosses 🐲
- Set your main project for the quarter
- Update progress (0-100%)
- Change status (Active, Completed, Failed)
- Add GitHub and deployment links

### 5. Review Your History 📚
- Filter bosses by quarter
- See all completed projects
- Review quest history
- Check category breakdown

---

## 🔑 Key Concepts

### Leveling Formula ⚡
```
Level = floor(sqrt(totalMinutes / 60))

Examples:
0 minutes   = Level 1
60 minutes  = Level 2
240 minutes = Level 3
540 minutes = Level 4
```

### XP Progress 📊
```
Current Level XP = (currentLevel)² × 60
Next Level XP = (currentLevel + 1)² × 60
Progress % = (currentXP - currentLevelXP) / (nextLevelXP - currentLevelXP) × 100
```

### Categories 🎯
- **Backend**: Server, APIs, Databases
- **Frontend**: React, Next.js, UI/UX
- **Mobile**: React Native, iOS, Android
- **DevOps**: CI/CD, Docker, Cloud

---

## 🐛 Debugging Tips

### Something not working?

1. **Check the console** - Open DevTools (F12) for errors
2. **Check localStorage** - All data stored there
3. **Clear data** - Logout clears everything
4. **Refresh the page** - Sometimes helps
5. **Check the docs** - `.claude/` folder has helpful guides

### Common Issues

**Problem:** Can't log in
- **Solution:** Use demo credentials, check console

**Problem:** Text is invisible
- **Solution:** Add `text-foreground` class (select dropdowns)

**Problem:** Not redirecting after login
- **Solution:** Check `isLoading` in `use-auth.ts`

**Problem:** Data not persisting
- **Solution:** Check localStorage, ensure no errors in console

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding New Features

1. **Read the docs** - Check `.claude/` folder first
2. **Follow patterns** - Copy from existing code
3. **Use semantic colors** - No hardcoding!
4. **Test thoroughly** - Mobile, tablet, desktop
5. **Handle errors** - Toast notifications

### Code Style

- TypeScript for type safety
- Functional components with hooks
- Semantic color variables
- Optimistic UI updates
- Loading/empty/error states
- Responsive by default

---

## 📚 Documentation

### 🎯 For Users (Daily Workflow)
**[COMPLETE_GUIDE.md](COMPLETE_GUIDE.md)** - Your complete guide
- **Part 1**: User Guide - How to use the app effectively
- **Part 2**: Developer Guide - Working with Claude Code AI
- **Part 3**: Quick Reference - Cheat sheets and commands

### 🤖 For Developers (Technical Implementation)
**[.claude/](.claude/)** - Technical documentation for Claude Code AI
- **[.claude/README.md](.claude/README.md)** - Documentation index
- **[.claude/overview.md](.claude/overview.md)** - Project overview
- **[.claude/quick-reference.md](.claude/quick-reference.md)** - Copy-paste patterns
- **[.claude/workflows.md](.claude/workflows.md)** - Step-by-step guides
- **[.claude/architecture.md](.claude/architecture.md)** - Technical deep dive
- **[hud.md](hud.md)** - Original requirements

---

## 🎯 Roadmap

### Version 1.0 (Current) ✅
- [x] Basic authentication
- [x] Quest logging
- [x] Boss tracking
- [x] Profile & leveling
- [x] Stats dashboard

### Version 1.1 (Next) 🚧
- [ ] Skeleton loading states
- [ ] Framer Motion animations
- [ ] Search & filter
- [ ] Achievements system

### Version 2.0 (Future) 🔮
- [ ] Real backend API
- [ ] User registration
- [ ] Data export/import
- [ ] Charts & analytics

---

## 🤝 Contributing

This is a personal project, but feel free to fork and customize for your own journey!

Ideas welcome:
- New features
- Bug fixes
- UI improvements
- Documentation updates

---

## 📝 License

ISC

---

## 🎉 Acknowledgments

- Built with ❤️ for the 2026 learning journey
- Inspired by RPG gaming mechanics
- UI components inspired by Shadcn UI
- Icons from [Lucide](https://lucide.dev/)
- Based on requirements from `hud.md`

---

## 💬 Feedback

Found a bug? Have a suggestion? Open an issue or PR!

**Happy leveling!** ⚔️✨📈

---

*Built in 2025 for the 2026 Multi-Platform Architect journey*
*Tech stack: Next.js 16, React 19, Tailwind CSS v4, TypeScript*
*Current Level: 1* → *Let's level up together!* 🚀
