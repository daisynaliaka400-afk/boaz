
-- Drop the existing policies that block unauthenticated admin CRUD
DROP POLICY IF EXISTS "Allow admin full access" ON public.packages;

-- Re-create a named policy that allows full access to authenticated Supabase users
CREATE POLICY "Allow authenticated full access" ON public.packages
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
