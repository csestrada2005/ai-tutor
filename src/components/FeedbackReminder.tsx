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
}

export const FeedbackReminder = ({ 
  open, 
  onOpenChange, 
  onFeedbackClick,
  onContinue 
}: FeedbackReminderProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Welcome to TETR AI Tutor! 🎓</AlertDialogTitle>
          <AlertDialogDescription>
            We'd love to hear your thoughts! Your feedback helps us improve the learning experience for everyone. Feel free to share your suggestions anytime.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onContinue}>
            Start Learning
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => {
            onOpenChange(false);
            onFeedbackClick();
          }}>
            Share Feedback Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
