import { Bot, User, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Source {
  content: string;
  metadata?: {
    class_name?: string;
    section?: string;
    title?: string;
    source_url?: string;
  };
  similarity?: number;
}

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

export const ChatMessage = ({ role, content, sources }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg animate-fade-in",
        isUser ? "bg-muted/50 ml-8" : "bg-card mr-8"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
        )}
      >
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>
      <div className="flex-1 min-w-0 space-y-3">
        <p className="text-sm font-medium">{isUser ? "You" : "AI Tutor"}</p>
        <div className="text-sm text-foreground whitespace-pre-wrap break-words">{content}</div>
        
        {!isUser && sources && sources.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs font-medium text-muted-foreground">Sources from course materials:</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {sources.map((source, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  [{idx + 1}] {source.metadata?.title || 'Document'}
                  {source.metadata?.class_name && ` - ${source.metadata.class_name}`}
                  {source.metadata?.source_url && (
                    <a 
                      href={source.metadata.source_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-1 underline hover:text-primary"
                    >
                      →
                    </a>
                  )}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
