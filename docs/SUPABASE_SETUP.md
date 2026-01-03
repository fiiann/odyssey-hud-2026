# Supabase Setup Guide for Odyssey HUD 2026

This guide walks you through setting up a Supabase project and configuring it to work with Odyssey HUD 2026.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click **"New Project"**
4. Fill in the project details:
   - **Project Name**: `odyssey-hud-2026` (or your preferred name)
   - **Database Password**: Generate a strong password and **save it securely** - you'll need it for the DATABASE_URL
   - **Region**: Choose a region closest to your users (e.g., `Southeast Asia (Singapore)` for Indonesia)
   - **Pricing Plan**: **Free** tier is sufficient for development
5. Click **"Create new project"**
6. Wait for the project to be provisioned (usually takes 1-2 minutes)

## Step 2: Get Your Supabase Credentials

Once your project is ready, you need to gather the following credentials:

### 2.1 Database URL (DATABASE_URL)

1. In your Supabase dashboard, navigate to **Project Settings** (gear icon)
2. Click on **Database** in the left sidebar
3. Scroll down to **Connection String** section
4. Select **URI** tab
5. Copy the connection string that looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxx.supabase.co:5432/postgres
   ```
6. Replace `[YOUR-PASSWORD]` with the database password you created in Step 1
7. **Save this string** - you'll add it to your `.env` file

### 2.2 Project URL (NEXT_PUBLIC_SUPABASE_URL)

1. In **Project Settings**, click on **API** in the left sidebar
2. Find **Project URL** under the "Config" section
3. Copy the URL (looks like: `https://xxxxxxxx.supabase.co`)
4. **Save this URL**

### 2.3 Publishable Key (NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)

1. Still on the **API** settings page
2. Click the **API Keys** tab (not the Legacy tab)
3. If no publishable key exists, click **Create new API Keys**
4. Find **Publishable key** (format: `sb_publishable_xxx`)
5. Click the eye icon to reveal it, then copy it
6. **Note**: This key is safe to use on the client side when Row Level Security (RLS) is enabled
7. **Save this key**

> **Why use the new Publishable Key?** Supabase's new publishable key format (`sb_publishable_xxx`) is the recommended approach for 2025. The legacy `anon` key still works, but the publishable key is the current standard.

### 2.4 Service Role Key (Optional - for server-side only)

**Note**: If you're using Supabase Auth with `@supabase/ssr`, you may NOT need the Service Role Key for authentication. However, keep it for:

- Server-side API routes that need full database access
- Administrative operations
- Bypassing RLS when needed

1. Still on the **API** settings page
2. Click the **Legacy** tab
3. Find **service_role** key
4. Click the eye icon to reveal it, then copy it
5. **IMPORTANT**: This key bypasses Row Level Security - never expose it on the client side
6. **Save this key** (you can add it to `.env.local` later if needed)

## Step 3: Configure Environment Variables

1. Copy the example environment file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` in your code editor

3. Replace the placeholder values with your actual Supabase credentials:
   ```bash
   # Replace with your actual DATABASE_URL from Step 2.1
   DATABASE_URL="postgresql://postgres:YOUR-ACTUAL-PASSWORD@db.xxxxxxxx.supabase.co:5432/postgres"

   # Replace with your actual Project URL from Step 2.2
   NEXT_PUBLIC_SUPABASE_URL="https://xxxxxxxx.supabase.co"

   # Replace with your Publishable Key from Step 2.3
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-actual-publishable-key"

   # Application URL (keep as is for local development)
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **IMPORTANT**: Never commit `.env.local` to git! It's already in `.gitignore`

### Why .env.local instead of .env?

Next.js uses `.env.local` for local development secrets because:
- It has **higher priority** than `.env` (overrides default values)
- It's the **standard** for local-sensitive credentials
- It's ignored by test environments

### Key Types Explained

| Key | Prefix | Exposure | Use Case |
|-----|--------|----------|----------|
| **Publishable Key** | `NEXT_PUBLIC_` | Public (safe) | Client-side with `@supabase/ssr`, requires RLS enabled |
| **Service Role Key** | (none) | Private (secret) | Server-side API routes, bypasses RLS (not needed for @supabase/ssr auth) |

### ⚠️ JWT_SECRET Removed

The custom `JWT_SECRET` is **no longer needed** when using Supabase Auth with `@supabase/ssr`. Supabase handles JWT token management automatically with secure httpOnly cookies.

If you were using a custom JWT implementation before, you can remove that code and migrate to the official Supabase SSR package.

## Step 4: Install Supabase SSR Package

For Next.js App Router, the official `@supabase/ssr` package is recommended:

```bash
npm install @supabase/supabase-js @supabase/ssr
```

This package provides:
- Server-side rendering (SSR) support
- Cookie-based auth sessions (httpOnly, secure)
- Automatic token refresh
- Edge Runtime compatibility

## Step 5: Test Database Connection

Now let's verify that Prisma can connect to your Supabase database:

1. **Pull the database schema** (if Supabase has any existing tables):
   ```bash
   npx prisma db pull
   ```

2. **Push the schema to create tables**:
   ```bash
   npx prisma db push
   ```

   You should see output like:
   ```
   ✔ Schema pushed to database
   ```

3. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

4. **Verify the connection** by checking if tables were created:
   - In Supabase dashboard, go to **Table Editor**
   - You should see tables: `User`, `Profile`, `Project`, `Task`, `Mission`

## Step 6: Configure Supabase Auth

If you want to use Supabase's built-in authentication (recommended for production):

1. In Supabase dashboard, go to **Authentication** > **Settings**
2. Under **Site URL**, add: `http://localhost:3000`
3. Under **Redirect URLs**, add:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/dashboard`

4. **Email Auth** should be enabled by default
5. You can add other auth providers (Google, GitHub, etc.) later if needed

## Step 7: Verify Setup

Let's verify everything is working:

1. **Create a test migration**:
   ```bash
   npx prisma migrate dev --name init
   ```

2. **Open Prisma Studio** to view your database:
   ```bash
   npx prisma studio
   ```

   This opens a GUI at `http://localhost:5555` where you can view and edit database data.

3. **Check for errors**:
   - If you see "Schema pushed to database" - Success!
   - If you see connection errors, verify your `DATABASE_URL` is correct
   - If you see authentication errors, verify your password and credentials

## Common Issues & Solutions

### Issue 1: Connection Refused
**Error**: `Error: Connection refused`

**Solution**:
- Verify DATABASE_URL format
- Check that your database password is correct (no special characters that need URL encoding)
- Ensure Supabase project is active (not paused)

### Issue 2: Authentication Failed
**Error**: `Error: Authentication failed`

**Solution**:
- Double-check your database password
- Regenerate password in Supabase if needed
- Update DATABASE_URL in .env

### Issue 3: Schema Mismatch
**Error**: `Error: Schema mismatch`

**Solution**:
```bash
npx prisma db pull  # Pull existing schema
npx prisma db push  # Push our schema
```

### Issue 4: Prisma Client Not Generated
**Error**: `Error: @prisma/client did not initialize yet`

**Solution**:
```bash
npx prisma generate
```

## Next Steps

After completing this setup:

1. **Update Git** (Optional - if you want to track .env.example changes):
   ```bash
   git add .env.example docs/
   git commit -m "docs: Add Supabase setup guide"
   ```

2. **Proceed to Phase 2**: Implement API Routes
   - Refer to `docs/API_CONTRACT.md` for API specifications
   - Create API route handlers in `app/api/`
   - Implement authentication middleware

3. **Database Migrations**: As you modify `prisma/schema.prisma`:
   ```bash
   npx prisma migrate dev --name describe_your_changes
   ```

## Important Security Notes

1. **NEVER commit `.env` to git** - it's already in `.gitignore`
2. **NEVER share `SUPABASE_SERVICE_ROLE_KEY`** - it gives full database access
3. **Use environment variables** for all sensitive data
4. **In production**, use a secure JWT secret (at least 32 characters)
5. **Enable Row Level Security (RLS)** in Supabase for production deployments

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Odyssey HUD API Contract](./API_CONTRACT.md)
- [Project Architecture](../.claude/architecture.md)

---

**Setup Complete!** Your Supabase database is now configured and ready for use with Odyssey HUD 2026.
