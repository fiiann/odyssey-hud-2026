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

### 2.3 Service Role Key (SUPABASE_SERVICE_ROLE_KEY)

1. Still on the **API** settings page
2. Find **service_role** key (under "Project API keys")
3. Click the eye icon to reveal it, then copy it
4. **IMPORTANT**: This key bypasses Row Level Security - never expose it on the client side
5. **Save this key**

## Step 3: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` in your code editor

3. Replace the placeholder values with your actual Supabase credentials:
   ```bash
   # Replace with your actual DATABASE_URL from Step 2.1
   DATABASE_URL="postgresql://postgres:YOUR-ACTUAL-PASSWORD@db.xxxxxxxx.supabase.co:5432/postgres"

   # Replace with your actual Project URL from Step 2.2
   NEXT_PUBLIC_SUPABASE_URL="https://xxxxxxxx.supabase.co"

   # Replace with your actual Service Role Key from Step 2.3
   SUPABASE_SERVICE_ROLE_KEY="your-actual-service-role-key"

   # Generate a secure random string for JWT signing
   # You can use: openssl rand -base64 32
   JWT_SECRET="your-generated-jwt-secret"

   # Application URL (keep as is for local development)
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **IMPORTANT**: Never commit `.env` to git! It's already in `.gitignore`

## Step 4: Generate JWT Secret

You need a secure random string for JWT token signing. Choose one of these methods:

### Option A: Using OpenSSL (Recommended)
```bash
openssl rand -base64 32
```

### Option B: Using Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Option C: Online Generator
Use a secure online generator like: https://generate-random.org/encryption-key-generator

Copy the generated string and paste it as `JWT_SECRET` in your `.env` file.

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

## Step 6: Configure Supabase Auth (Optional but Recommended)

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
