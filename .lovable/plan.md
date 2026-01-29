

# Admin Role System Implementation

This plan creates a secure, database-driven admin system to replace the email-based developer detection. You'll be able to grant any user access to all batches (2028 and 2029) by adding them to the admin table.

---

## What Changes

| Current Behavior | New Behavior |
|-----------------|--------------|
| `@tetr` emails get full access | Removed - no special email handling |
| No database role table | New `user_roles` table with `admin` role |
| Developer access hardcoded | Admin access managed via database |

---

## Implementation Steps

### Step 1: Create Database Infrastructure

**New database objects:**

- **`app_role` enum**: Defines available roles (initially just `admin`)
- **`user_roles` table**: Links users to their roles
- **`has_role()` function**: Secure helper to check if a user has a specific role
- **RLS policies**: Only admins can view the roles table

### Step 2: Update Frontend Logic

**File: `src/pages/ProfessorAI.tsx`**

Rename `isDeveloper` state to `isAdmin` and update the logic:

1. Remove the `@tetr` email detection entirely
2. After getting the user, query the `user_roles` table to check for admin status
3. If the user has the `admin` role, grant full batch access

The new logic will be:
- Email contains "2028" → Batch 2028 only
- Email contains "2029" → Batch 2029 only  
- User has `admin` role in database → Full access to all batches
- No match → Default to Batch 2029

### Step 3: Update Term Selection UI

**File: `src/components/professor-ai/ProfessorTermSelection.tsx`**

Change the "Developer Access" text to "Admin Access" so it displays correctly for admins.

---

## How to Add Admins

After implementation, add your employer as an admin:

**Option A - Via Backend UI:**
1. Click "View Backend" button below
2. Navigate to the `user_roles` table
3. Add a row with the user's `user_id` and role `admin`

**Option B - Via SQL:**
```sql
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'employer@example.com';
```

---

## Technical Details

### Database Schema

```text
+------------------+
|   user_roles     |
+------------------+
| id (uuid, PK)    |
| user_id (uuid)   | --> references auth.users
| role (app_role)  | --> enum: 'admin'
| created_at       |
+------------------+
```

### Security Model

- RLS enabled: Only users with `admin` role can view the table
- `has_role()` function uses `SECURITY DEFINER` to safely check roles without RLS recursion
- No insert/update/delete policies for regular users (only database admins can modify)

### Frontend Code Changes (ProfessorAI.tsx)

The batch assignment logic will change from:

```typescript
// OLD - Email-based detection
if (email.includes("2028")) {
  batch = "2028";
} else if (email.includes("2029")) {
  batch = "2029";
} else if (email.includes("@tetr")) {
  isDevUser = true;
  // ...
}
```

To:

```typescript
// NEW - Database-driven admin check
if (email.includes("2028")) {
  batch = "2028";
} else if (email.includes("2029")) {
  batch = "2029";
}

// Check admin status from database
const { data: roleData } = await supabase
  .from('user_roles')
  .select('role')
  .eq('user_id', user.id)
  .eq('role', 'admin')
  .maybeSingle();

if (roleData) {
  isAdminUser = true;
  // Use stored batch or default
  const storedBatch = localStorage.getItem("professorSelectedBatch");
  batch = storedBatch && ["2028", "2029"].includes(storedBatch) 
    ? storedBatch : "2029";
}
```

---

## Files to be Modified

| File | Change |
|------|--------|
| Database | Create `app_role` enum, `user_roles` table, `has_role()` function, RLS policies |
| `src/pages/ProfessorAI.tsx` | Replace `isDeveloper` with `isAdmin`, add database query for admin role |
| `src/components/professor-ai/ProfessorTermSelection.tsx` | Update "Developer Access" text to "Admin Access" |

