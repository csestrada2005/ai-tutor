import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface FeedbackReminderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFeedbackClick: () => void;
  onContinue: () => void;
  variant?: "welcome" | "logout";
}

export const FeedbackReminder = ({ 
  open, 
  onOpenChange, 
  onFeedbackClick,
  onContinue,
  variant = "welcome"
}: FeedbackReminderProps) => {
  const isWelcome = variant === "welcome";
  
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isWelcome ? "Welcome to ProfessorAI! 🎓" : "Before you go..."}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isWelcome 
              ? "We'd love to hear your thoughts! Your feedback helps us improve the learning experience for everyone. Feel free to share your suggestions anytime."
              : "We'd love to hear your thoughts! Your feedback helps us make the learning experience better for everyone."
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onContinue}>
            {isWelcome ? "Start Learning" : "Maybe Later"}
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => {
            onOpenChange(false);
            onFeedbackClick();
          }}>
            {isWelcome ? "Share Feedback Now" : "Share Feedback"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
