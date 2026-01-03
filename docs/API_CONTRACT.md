# Odyssey HUD 2026 - Backend API Contract

> **Version:** 1.1.0
> **Last Updated:** 2026-01-03
> **Status:** Draft - Ready for Implementation
> **Architecture:** Next.js 16 API Routes + Supabase (PostgreSQL)

---

## 1. Architecture Overview

### 1.1 Tech Stack
- **Frontend & Backend:** Next.js 16 with App Router
- **API:** Next.js API Routes (App Router Route Handlers)
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma ORM
- **Validation:** Zod
- **Authentication:** JWT + Supabase Auth

### 1.2 Project Structure
```
hud/
├── app/
│   ├── api/                    # API Routes (NEW)
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   ├── validate/route.ts
│   │   │   └── refresh/route.ts
│   │   ├── profile/
│   │   │   └── route.ts
│   │   ├── projects/
│   │   │   ├── route.ts
│   │   │   └── [project_id]/route.ts
│   │   ├── tasks/
│   │   │   ├── route.ts
│   │   │   ├── [task_id]/route.ts
│   │   │   └── [task_id]/time/route.ts
│   │   └── missions/
│   │       ├── route.ts
│   │       └── [mission_id]/route.ts
│   ├── dashboard/page.tsx
│   └── projects/page.tsx
├── lib/
│   ├── db/                     # Database layer (NEW)
│   │   └── prisma.ts           # Prisma client
│   ├── api/                    # API helpers (NEW)
│   │   ├── response.ts         # Standard response helpers
│   │   └── error.ts            # Error handling
│   └── auth.ts                 # JWT utilities
├── prisma/
│   ├── schema.prisma           # Prisma schema
│   └── migrations/             # SQL migrations
└── services/mock-api.ts        # Legacy mock API (to be removed)
```

### 1.3 Base URL
```
Local: http://localhost:3000/api
Production: https://your-domain.com/api
```

---

## 2. Database Schema (Supabase/PostgreSQL)

### 2.1 Tables

```sql
-- Users table (Supabase Auth manages this)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles table
CREATE TABLE profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  total_xp INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 0,
  terminology_mode TEXT DEFAULT 'ODYSSEY' CHECK (terminology_mode IN ('PROFESSIONAL', 'ODYSSEY')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  project_id TEXT PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'COMPLETED', 'ON_HOLD', 'ARCHIVED')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  repo_url TEXT,
  deploy_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks table
CREATE TABLE tasks (
  task_id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES projects(project_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'TODO' CHECK (status IN ('TODO', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
  priority TEXT DEFAULT 'MEDIUM' CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT')),
  category TEXT CHECK (category IN ('Backend', 'Frontend', 'Mobile', 'DevOps', 'Design', 'Testing', 'Documentation', 'Other')),
  estimated_min INTEGER CHECK (estimated_min > 0),
  actual_min INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  position INTEGER DEFAULT 0,
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Missions table
CREATE TABLE missions (
  mission_id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES projects(project_id) ON DELETE CASCADE,
  task_id TEXT REFERENCES tasks(task_id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  duration_min INTEGER NOT NULL CHECK (duration_min > 0 AND duration_min <= 1440),
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_missions_project_id ON missions(project_id);
CREATE INDEX idx_missions_task_id ON missions(task_id);
CREATE INDEX idx_missions_created_at ON missions(created_at);
```

### 2.2 Prisma Schema (prisma/schema.prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  createdAt DateTime @default(now())

  profiles  Profile[]
  projects  Project[]
}

model Profile {
  userId           String  @id
  username         String  @unique
  avatarUrl        String?
  totalXp          Int     @default(0)
  currentLevel     Int     @default(0)
  terminologyMode  String  @default("ODYSSEY") // "PROFESSIONAL" | "ODYSSEY"
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  user             User    @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Project {
  projectId    String   @id
  userId       String
  title        String
  description  String?
  status       String   @default("ACTIVE") // "ACTIVE" | "COMPLETED" | "ON_HOLD" | "ARCHIVED"
  progress     Int      @default(0)
  repoUrl      String?
  deployUrl    String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  tasks        Task[]
  missions     Mission[]

  @@index([userId])
}

model Task {
  taskId        String    @id
  projectId     String
  title         String
  description   String?
  status        String    @default("TODO") // "TODO" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  priority      String    @default("MEDIUM") // "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  category      String?   // "Backend" | "Frontend" | "Mobile" | "DevOps" | "Design" | "Testing" | "Documentation" | "Other"
  estimatedMin  Int?
  actualMin     Int       @default(0)
  tags          String[]
  position      Int       @default(0)
  dueDate       DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  completedAt   DateTime?

  project       Project   @relation(fields: [projectId], references: [projectId], onDelete: Cascade)
  missions      Mission[]

  @@index([projectId])
}

model Mission {
  missionId    String    @id
  projectId    String
  taskId       String?
  title        String
  description  String?
  durationMin  Int
  category     String?
  createdAt    DateTime  @default(now())

  project      Project   @relation(fields: [projectId], references: [projectId], onDelete: Cascade)
  task         Task?     @relation(fields: [taskId], references: [taskId], onDelete: SetNull)

  @@index([projectId])
  @@index([taskId])
  @@index([createdAt])
}
```

### 2.3 Prisma Client (lib/db/prisma.ts)

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

---

## 3. Naming Conventions

| Layer | Format | Example |
|-------|--------|---------|
| Database (PostgreSQL) | snake_case | `project_id`, `created_at` |
| API Response | snake_case | `project_id`, `created_at` |
| Frontend (React) | camelCase | `projectId`, `createdAt` |

**Transformers** in `lib/transformers.ts` handle conversion between API (snake_case) and Frontend (camelCase).

---

## 4. Standard Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Human readable error message",
  "error_code": "VALIDATION_ERROR",
  "validation_errors": {
    "field_name": "Specific error message"
  }
}
```

### Response Helpers (lib/api/response.ts)

```typescript
import { NextResponse } from 'next/server';

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(
  message: string,
  errorCode = 'INTERNAL_ERROR',
  status = 500,
  validationErrors?: Record<string, string>
) {
  return NextResponse.json(
    {
      success: false,
      error: message,
      error_code: errorCode,
      validation_errors: validationErrors,
    },
    { status }
  );
}
```

---

## 5. HTTP Status Codes

| Code | Usage |
|------|-------|
| 200 | Success with data |
| 201 | Resource created |
| 400 | Bad request / Validation error |
| 401 | Unauthorized / Invalid token |
| 403 | Forbidden / Insufficient permissions |
| 404 | Resource not found |
| 422 | Validation error |
| 500 | Internal server error |

---

## 6. Authentication

### JWT Token Format

```typescript
interface JWTPayload {
  user_id: string;    // UUID from Supabase
  email: string;
  exp: number;
  iat: number;
}
```

### Token Storage
- Store JWT in `httpOnly` cookie (server sets it)
- Cookie name: `odyssey_auth_token`
- Secure, SameSite=strict

---

## 7. API Endpoints

### 7.1 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with email/password |
| POST | `/api/auth/logout` | Logout and clear cookie |
| POST | `/api/auth/validate` | Validate JWT token |
| POST | `/api/auth/refresh` | Refresh access token |

### 7.2 Profile

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get current user profile |
| PATCH | `/api/profile` | Update profile |

### 7.3 Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List projects (filters, pagination) |
| GET | `/api/projects/:project_id` | Get single project |
| POST | `/api/projects` | Create project |
| PATCH | `/api/projects/:project_id` | Update project |
| DELETE | `/api/projects/:project_id` | Delete project (cascade) |

### 7.4 Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List tasks (filters, pagination) |
| GET | `/api/tasks/:task_id` | Get single task |
| POST | `/api/tasks` | Create task |
| PATCH | `/api/tasks/:task_id` | Update task |
| DELETE | `/api/tasks/:task_id` | Delete task (cascade) |
| PATCH | `/api/tasks/:task_id/time` | Update task time |

### 7.5 Missions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/missions` | List missions (filters, date range) |
| POST | `/api/missions` | Log mission |
| DELETE | `/api/missions/:mission_id` | Delete mission (rollback) |

---

## 8. Data Models (API Format - snake_case)

### User
```typescript
interface User {
  id: string;           // UUID
  email: string;
  created_at: string;
}
```

### Profile
```typescript
interface Profile {
  user_id: string;
  username: string;
  avatar_url: string;
  total_xp: number;
  current_level: number;
  terminology_mode: 'PROFESSIONAL' | 'ODYSSEY';
  created_at: string;
  updated_at: string;
}
```

### Project
```typescript
interface Project {
  project_id: string;
  user_id: string;
  title: string;
  description?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD' | 'ARCHIVED';
  progress: number;
  repo_url?: string;
  deploy_url?: string;
  created_at: string;
  updated_at: string;
}
```

### Task
```typescript
interface Task {
  task_id: string;
  project_id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  category?: string;
  estimated_min?: number;
  actual_min?: number;
  tags: string[];
  position: number;
  due_date?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}
```

### Mission
```typescript
interface Mission {
  mission_id: string;
  project_id: string;
  task_id?: string;
  title: string;
  description?: string;
  duration_min: number;
  category?: string;
  created_at: string;
}
```

---

## 9. Calculations

### Level (Rank) Calculation
```typescript
current_level = Math.floor(Math.sqrt(total_xp / 60))
```

### Project Progress Calculation
```typescript
progress = (completed_tasks_count / total_tasks_count) * 100
```

### XP to Next Level
```typescript
next_level_xp = Math.pow(current_level + 1, 2) * 60
```

---

## 10. Error Codes

| Code | Description |
|------|-------------|
| `INVALID_CREDENTIALS` | Email or password is incorrect |
| `INVALID_TOKEN` | Token is malformed or expired |
| `UNAUTHORIZED` | No token provided |
| `FORBIDDEN` | Insufficient permissions |
| `NOT_FOUND` | Resource not found |
| `VALIDATION_ERROR` | Request validation failed |
| `INTERNAL_ERROR` | Unexpected server error |

---

## 11. API Route Example

```typescript
// app/api/projects/route.ts
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { authenticate } from '@/lib/auth';
import { apiSuccess, apiError } from '@/lib/api/response';
import { projectSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  const user = await authenticate(request);
  if (!user) return apiError('Unauthorized', 'UNAUTHORIZED', 401);

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const projects = await prisma.project.findMany({
      where: {
        userId: user.id,
        ...(status && { status }),
      },
      orderBy: { createdAt: 'desc' },
    });

    return apiSuccess({ projects });
  } catch (error) {
    return apiError('Failed to fetch projects', 'INTERNAL_ERROR', 500);
  }
}

export async function POST(request: NextRequest) {
  const user = await authenticate(request);
  if (!user) return apiError('Unauthorized', 'UNAUTHORIZED', 401);

  try {
    const body = await request.json();
    const validated = projectSchema.parse(body);

    const newProject = await prisma.project.create({
      data: {
        ...validated,
        userId: user.id,
        projectId: `project_${Date.now()}`,
      },
    });

    return apiSuccess(newProject, 201);
  } catch (error) {
    if (error.name === 'ZodError') {
      return apiError('Validation failed', 'VALIDATION_ERROR', 422);
    }
    return apiError('Failed to create project', 'INTERNAL_ERROR', 500);
  }
}
```

---

## 12. Implementation Phases

### Phase 1: Setup (1-2 hours)
- Install dependencies: `npm install prisma @prisma/client`
- Initialize Prisma: `npx prisma init`
- Setup Supabase project
- Configure DATABASE_URL in `.env`
- Run initial migration: `npx prisma db push`

### Phase 2: API Routes (8-12 hours)
- Create all API route handlers
- Implement authentication middleware
- Add validation with Zod
- Test endpoints individually

### Phase 3: Frontend Integration (2-3 hours)
- Update hooks to call `/api/*` instead of mock API
- Remove localStorage persistence
- Add error handling for network failures
- Test full user flows

---

## 13. Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.1.0 | 2026-01-03 | Updated for Next.js + Supabase architecture |
| 1.0.0 | 2026-01-03 | Initial API contract definition |
