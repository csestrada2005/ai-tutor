import { useState } from "react";
import { X, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface QuizQuestion {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
}

export interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

interface QuizCardProps {
  quiz: Quiz;
  onComplete: (score: number, total: number) => void;
  onClose: () => void;
}

export const QuizCard = ({ quiz, onComplete, onClose }: QuizCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const currentQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleSelectAnswer = (letter: string) => {
    if (hasAnswered) return;
    setSelectedAnswer(letter);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || hasAnswered) return;
    
    setHasAnswered(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setWrongCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const finalCorrect = selectedAnswer === currentQuestion.correctAnswer 
        ? correctCount 
        : correctCount;
      onComplete(finalCorrect, totalQuestions);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setHasAnswered(false);
  };

  const getOptionStyle = (letter: string) => {
    if (!hasAnswered) {
      return selectedAnswer === letter
        ? "border-primary bg-primary/10"
        : "border-border/50 hover:border-primary/50 hover:bg-secondary/50";
    }

    if (letter === currentQuestion.correctAnswer) {
      return "border-green-500 bg-green-500/10";
    }

    if (selectedAnswer === letter && letter !== currentQuestion.correctAnswer) {
      return "border-red-500 bg-red-500/10";
    }

    return "border-border/30 opacity-50";
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-card border border-border rounded-2xl shadow-xl overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
            <span className="text-xs font-medium text-primary">Q</span>
          </div>
          <span className="font-medium text-foreground truncate max-w-[200px] md:max-w-[400px]">
            {quiz.title}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Progress bar and stats */}
      <div className="px-4 py-3 border-b border-border/50">
        <div className="flex items-center gap-3">
          {/* Progress segments */}
          <div className="flex-1 flex gap-1">
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  i < currentIndex
                    ? "bg-primary"
                    : i === currentIndex
                    ? "bg-primary/50"
                    : "bg-secondary"
                )}
              />
            ))}
          </div>
          
          {/* Question counter */}
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {currentIndex + 1}/{totalQuestions}
          </span>
          
          {/* Score indicators */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500/10">
              <X className="w-3.5 h-3.5 text-red-500" />
              <span className="text-sm font-medium text-red-500">{wrongCount}</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-500/10">
              <Check className="w-3.5 h-3.5 text-green-500" />
              <span className="text-sm font-medium text-green-500">{correctCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Question content */}
      <div className="p-4 md:p-6 space-y-6">
        {/* Question text */}
        <div className="space-y-2">
          <div className="flex gap-3">
            <span className="text-lg font-semibold text-foreground">
              {currentIndex + 1}.
            </span>
            <p className="text-lg text-foreground leading-relaxed">
              {currentQuestion.question}
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {(["A", "B", "C", "D"] as const).map((letter) => (
            <button
              key={letter}
              onClick={() => handleSelectAnswer(letter)}
              disabled={hasAnswered}
              className={cn(
                "w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all",
                getOptionStyle(letter),
                !hasAnswered && "cursor-pointer"
              )}
            >
              <span
                className={cn(
                  "flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-semibold",
                  hasAnswered && letter === currentQuestion.correctAnswer
                    ? "bg-green-500 text-white"
                    : hasAnswered && selectedAnswer === letter && letter !== currentQuestion.correctAnswer
                    ? "bg-red-500 text-white"
                    : selectedAnswer === letter
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {letter}
              </span>
              <span className="flex-1 text-foreground">
                {currentQuestion.options[letter]}
              </span>
            </button>
          ))}
        </div>

        {/* Explanation (shown after answering) */}
        {hasAnswered && (
          <div className="p-4 rounded-xl bg-secondary/50 border border-border/50 animate-fade-in">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Explanation:</span>{" "}
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Action button */}
        <div className="flex justify-end pt-2">
          {!hasAnswered ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer}
              className="min-w-[120px]"
            >
              Submit
            </Button>
          ) : (
            <Button onClick={handleNext} className="min-w-[120px] gap-2">
              {isLastQuestion ? "Finish" : "Next"}
              {!isLastQuestion && <ChevronRight className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
