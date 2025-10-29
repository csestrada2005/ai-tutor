-- Add prompt counter to visitor_stats table
ALTER TABLE public.visitor_stats
ADD COLUMN IF NOT EXISTS prompt_count INTEGER DEFAULT 0;

-- Create function to increment prompt count
CREATE OR REPLACE FUNCTION public.increment_prompt_count()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  new_count INTEGER;
BEGIN
  UPDATE public.visitor_stats 
  SET prompt_count = prompt_count + 1, last_updated = now()
  WHERE id = (SELECT id FROM public.visitor_stats LIMIT 1)
  RETURNING prompt_count INTO new_count;
  
  RETURN new_count;
END;
$function$;