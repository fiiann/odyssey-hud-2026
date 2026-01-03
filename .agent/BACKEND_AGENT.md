# Backend Agent - Odyssey HUD 2026

> **Role:** Backend Development Specialist
> **Tech Stack:** Next.js 16 API Routes + Supabase (PostgreSQL) + Prisma ORM
> **Documentation:** `docs/API_CONTRACT.md`

---

## 1. Your Mission

You are building the **backend API** for Odyssey HUD 2026 using Next.js API Routes with Supabase and Prisma. The frontend already exists and uses a mock API - your job is to replace it with a real backend.

**Always reference:**
- `docs/API_CONTRACT.md` - Complete API specification
- `prisma/schema.prisma` - Database schema (to be created)
- `lib/validations.ts` - Existing Zod schemas for validation

---

## 2. Strict Rules

### 2.1 API Response Format

**ALL endpoints MUST return this format:**

```typescript
// Success
{ success: true, data: {...} }

// Error
{ success: false, error: "message", error_code: "CODE", validation_errors?: {...} }
```

Use the helpers from `lib/api/response.ts`:
```typescript
import { apiSuccess, apiError } from '@/lib/api/response';

apiSuccess(data, status)  // status defaults to 200
apiError(message, errorCode, status, validationErrors)
```

### 2.2 Naming Conventions

| Layer | Format | Example |
|-------|--------|---------|
| Database (Prisma) | camelCase | `userId`, `totalXp`, `projectId` |
| API Response | snake_case | `user_id`, `total_xp`, `project_id` |
| Frontend (React) | camelCase | `userId`, `totalXp`, `projectId` |

**CRITICAL:** API responses must use `snake_case`. Use transformers in `lib/transformers.ts` to convert from Prisma (camelCase) to API (snake_case).

### 2.3 HTTP Status Codes

| Code | When to Use |
|------|-------------|
| 200 | Success with data |
| 201 | Resource created |
| 400 | Bad request |
| 401 | Unauthorized / Invalid token |
| 403 | Forbidden |
| 404 | Resource not found |
| 422 | Validation error (Zod) |
| 500 | Internal server error |

### 2.4 Error Codes

Use these exact error_code values:
- `INVALID_CREDENTIALS` - Login failed
- `INVALID_TOKEN` - Token malformed/expired
- `UNAUTHORIZED` - No token provided
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Zod validation failed
- `INTERNAL_ERROR` - Unexpected error

---

## 3. Authentication

### 3.1 Token Storage

- Store JWT in **httpOnly cookie** (not localStorage)
- Cookie name: `odyssey_auth_token`
- Use `cookies()` from `next/headers` in Server Components
- Use `response.cookies.set()` in API routes

### 3.2 JWT Payload

```typescript
{
  user_id: string;  // UUID from Supabase
  email: string;
  exp: number;
  iat: number;
}
```

### 3.3 Protected Routes

Create an `authenticate()` function in `lib/auth.ts`:

```typescript
export async function authenticate(request: NextRequest) {
  const token = request.cookies.get('odyssey_auth_token')?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    return { id: payload.user_id, email: payload.email };
  } catch {
    return null;
  }
}
```

---

## 4. Database (Prisma)

### 4.1 Schema Location

`prisma/schema.prisma` - Define all models here

### 4.2 Required Models

- `User` - Auth users (linked to Supabase Auth)
- `Profile` - User profile with XP, level, username
- `Project` - Projects/Sectors
- `Task` - Tasks/Quests
- `Mission` - Work sessions

### 4.3 Relations

- User → Profile (1:1)
- User → Projects (1:many)
- Project → Tasks (1:many)
- Project → Missions (1:many)
- Task → Missions (1:many)

### 4.4 Cascade Deletes

- Delete User → cascades to Profile, Projects
- Delete Project → cascades to Tasks, Missions
- Delete Task → cascades to Missions

---

## 5. API Routes Structure

```
app/api/
├── auth/
│   ├── login/route.ts      # POST - Login user
│   ├── logout/route.ts     # POST - Clear cookie
│   ├── validate/route.ts   # POST - Validate JWT
│   └── refresh/route.ts    # POST - Refresh token
├── profile/
│   └── route.ts            # GET, PATCH - User profile
├── projects/
│   ├── route.ts            # GET (list), POST (create)
│   └── [project_id]/route.ts  # GET, PATCH, DELETE
├── tasks/
│   ├── route.ts            # GET (list), POST (create)
│   ├── [task_id]/route.ts  # GET, PATCH, DELETE
│   └── [task_id]/time/route.ts  # PATCH - Update time
└── missions/
    ├── route.ts            # GET (list), POST (create)
    └── [mission_id]/route.ts  # DELETE
```

---

## 6. Validation

Use existing Zod schemas from `lib/validations.ts`:

```typescript
import { projectSchema, taskSchema, missionSchema, loginSchema } from '@/lib/validations';

// In API route
const body = await request.json();
const validated = projectSchema.parse(body);
// Use validated data...
```

For validation errors:
```typescript
if (error instanceof z.ZodError) {
  const validationErrors: Record<string, string> = {};
  error.errors.forEach((e) => {
    if (e.path[0]) validationErrors[e.path[0].toString()] = e.message;
  });
  return apiError('Validation failed', 'VALIDATION_ERROR', 422, validationErrors);
}
```

---

## 7. Side Effects (CRITICAL)

### When Creating a Mission:

1. Create mission record
2. Increment `profile.totalXp` by `duration_min`
3. Recalculate `profile.currentLevel` = `floor(sqrt(totalXp / 60))`
4. If `task_id` provided: increment `task.actualMin` by `duration_min`
5. Recalculate `project.progress` = `(completedTasks / totalTasks) * 100`

### When Deleting a Mission:

1. Delete mission record
2. Decrement `profile.totalXp` by `mission.durationMin`
3. Recalculate `profile.currentLevel`
4. If mission had `task_id`: decrement `task.actualMin`
5. Recalculate `project.progress`

### When Task Status Changes to COMPLETED:

- Set `completedAt = new Date()`

---

## 8. Response Transform (camelCase ↔ snake_case)

API responses must be snake_case. Create a transformer or manually map:

```typescript
// Example: Transform Prisma model to API response
const projectApiResponse = {
  project_id: project.projectId,
  user_id: project.userId,
  title: project.title,
  description: project.description,
  status: project.status,
  progress: project.progress,
  repo_url: project.repoUrl,
  deploy_url: project.deployUrl,
  created_at: project.createdAt.toISOString(),
  updated_at: project.updatedAt.toISOString(),
};
```

---

## 9. Example API Route

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

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  const projects = await prisma.project.findMany({
    where: {
      userId: user.id,
      ...(status && { status }),
    },
    orderBy: { createdAt: 'desc' },
  });

  // Transform to snake_case for API response
  const apiResponse = projects.map(p => ({
    project_id: p.projectId,
    user_id: p.userId,
    title: p.title,
    description: p.description,
    status: p.status,
    progress: p.progress,
    repo_url: p.repoUrl,
    deploy_url: p.deployUrl,
    created_at: p.createdAt.toISOString(),
    updated_at: p.updatedAt.toISOString(),
  }));

  return apiSuccess({ projects: apiResponse });
}

export async function POST(request: NextRequest) {
  const user = await authenticate(request);
  if (!user) return apiError('Unauthorized', 'UNAUTHORIZED', 401);

  try {
    const body = await request.json();
    const validated = projectSchema.parse(body);

    const project = await prisma.project.create({
      data: {
        ...validated,
        userId: user.id,
        projectId: `project_${Date.now()}`,
      },
    });

    // Transform to snake_case
    const apiResponse = {
      project_id: project.projectId,
      user_id: project.userId,
      title: project.title,
      description: project.description,
      status: project.status,
      progress: project.progress,
      repo_url: project.repoUrl,
      deploy_url: project.deployUrl,
      created_at: project.createdAt.toISOString(),
      updated_at: project.updatedAt.toISOString(),
    };

    return apiSuccess(apiResponse, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors: Record<string, string> = {};
      error.errors.forEach((e) => {
        if (e.path[0]) validationErrors[e.path[0].toString()] = e.message;
      });
      return apiError('Validation failed', 'VALIDATION_ERROR', 422, validationErrors);
    }
    return apiError('Failed to create project', 'INTERNAL_ERROR', 500);
  }
}
```

---

## 10. Testing Checklist

After implementing each endpoint:

- [ ] Returns correct HTTP status
- [ ] Returns `{ success: true, data: {...} }` on success
- [ ] Returns `{ success: false, error: "...", error_code: "..." }` on error
- [ ] API response uses snake_case
- [ ] Validates input with Zod
- [ ] Requires authentication (cookie)
- [ ] Handles errors gracefully
- [ ] Side effects applied (XP, progress, etc.)
- [ ] Cascade deletes work

---

## 11. DO NOT

- ❌ Do NOT use camelCase in API responses
- ❌ Do NOT return data without `{ success: true, data }` wrapper
- ❌ Do NOT store tokens in localStorage
- ❌ Do NOT skip validation
- ❌ Do NOT forget side effects (XP updates, progress recalculation)
- ❌ Do NOT use `res.json()` directly - use `apiSuccess()` / `apiError()`
- ❌ Do NOT skip authentication on protected routes
- ❌ Do NOT forget to set `completedAt` when task status = COMPLETED

---

## 12. References

- **API Contract:** `docs/API_CONTRACT.md`
- **Existing Validations:** `lib/validations.ts`
- **Existing Transformers:** `lib/transformers.ts`
- **Project Structure:** `.claude/architecture.md`
- **Task List:** `TASKS.md` (Backend Implementation section)
