import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users } from "lucide-react";

const VisitorCounter = () => {
  const [promptCount, setPromptCount] = useState<number>(0);

  useEffect(() => {
    const fetchPromptCount = async () => {
      try {
        // Fetch current prompt count
        const { data, error } = await supabase
          .from("visitor_stats")
          .select("prompt_count")
          .maybeSingle();

        if (error) throw error;

        setPromptCount(data?.prompt_count || 0);
      } catch (error) {
        console.error("Error fetching prompt count:", error);
        setPromptCount(0);
      }
    };

    fetchPromptCount();
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
      <Users className="w-4 h-4 text-primary" />
      <span className="text-sm font-semibold text-primary">
        {promptCount.toLocaleString()} Chats created
      </span>
    </div>
  );
};

export default VisitorCounter;
