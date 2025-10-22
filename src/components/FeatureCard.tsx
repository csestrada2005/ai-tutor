import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  benefit: string;
}

const FeatureCard = ({ icon: Icon, title, description, benefit }: FeatureCardProps) => {
  return (
    <div className="group relative bg-card rounded-2xl p-8 border border-border transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
          <Icon className="w-8 h-8" />
        </div>
        
        <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
        
        <div className="pt-4 border-t border-border/50">
          <p className="text-sm font-semibold text-primary flex items-start gap-2">
            <span className="text-accent">✓</span>
            <span>{benefit}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
