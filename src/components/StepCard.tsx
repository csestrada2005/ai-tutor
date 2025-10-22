interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

const StepCard = ({ number, title, description }: StepCardProps) => {
  return (
    <div className="relative flex flex-col items-center text-center group">
      <div className="mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-3xl shadow-[var(--shadow-soft)] group-hover:scale-110 transition-transform duration-300">
        {number}
      </div>
      
      <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground max-w-sm leading-relaxed">{description}</p>
      
      <div className="absolute -bottom-8 left-1/2 w-px h-16 bg-gradient-to-b from-primary/50 to-transparent hidden lg:block" />
    </div>
  );
};

export default StepCard;
