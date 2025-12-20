import { Trophy, RotateCcw, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuizResultsProps {
  score: number;
  total: number;
  onRetry: () => void;
  onNewQuiz: () => void;
}

export const QuizResults = ({ score, total, onRetry, onNewQuiz }: QuizResultsProps) => {
  const percentage = Math.round((score / total) * 100);
  
  const getGrade = () => {
    if (percentage >= 90) return { label: "Excellent!", color: "text-green-500", bg: "bg-green-500/10" };
    if (percentage >= 70) return { label: "Good job!", color: "text-primary", bg: "bg-primary/10" };
    if (percentage >= 50) return { label: "Keep practicing!", color: "text-yellow-500", bg: "bg-yellow-500/10" };
    return { label: "Try again!", color: "text-red-500", bg: "bg-red-500/10" };
  };

  const grade = getGrade();

  return (
    <div className="w-full max-w-md mx-auto bg-card border border-border rounded-2xl shadow-xl p-8 animate-fade-in">
      <div className="text-center space-y-6">
        {/* Trophy icon */}
        <div className={cn("inline-flex items-center justify-center w-20 h-20 rounded-full", grade.bg)}>
          <Trophy className={cn("w-10 h-10", grade.color)} />
        </div>

        {/* Grade message */}
        <div className="space-y-2">
          <h2 className={cn("text-2xl font-bold", grade.color)}>{grade.label}</h2>
          <p className="text-muted-foreground">Quiz completed</p>
        </div>

        {/* Score display */}
        <div className="py-6 border-y border-border/50">
          <div className="text-5xl font-bold text-foreground">
            {score}<span className="text-2xl text-muted-foreground">/{total}</span>
          </div>
          <p className="text-lg text-muted-foreground mt-2">{percentage}% correct</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-foreground font-medium">{score} correct</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-500" />
            <span className="text-foreground font-medium">{total - score} wrong</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button onClick={onRetry} variant="outline" className="flex-1 gap-2">
            <RotateCcw className="w-4 h-4" />
            Retry Quiz
          </Button>
          <Button onClick={onNewQuiz} className="flex-1">
            New Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};
