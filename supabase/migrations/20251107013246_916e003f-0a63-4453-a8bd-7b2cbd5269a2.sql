-- Create function to check if user limit is reached
CREATE OR REPLACE FUNCTION public.is_user_limit_reached()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT (SELECT COUNT(*) FROM auth.users) >= 100
$$;