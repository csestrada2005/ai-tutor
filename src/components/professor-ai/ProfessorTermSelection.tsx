import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProfessorTermSelectionProps {
  batch: string;
  onTermSelect: (termId: string) => void;
  onBatchChange?: (batchId: string) => void;
  isDeveloper?: boolean;
}

// Demo mode: Only Phase 1 of Cohort Alpha is available
const TERMS_BY_BATCH: Record<string, { id: string; name: string; description: string }[]> = {
  "2029": [
    {
      id: "term1",
      name: "Phase 1",
      description: "Foundational modules and core concepts",
    },
  ],
};

// Demo mode: Only Cohort Alpha is available
const BATCH_NAMES: Record<string, string> = {
  "2029": "Cohort Alpha",
};

export const ProfessorTermSelection = ({ 
  batch, 
  onTermSelect, 
  onBatchChange,
  isDeveloper = false 
}: ProfessorTermSelectionProps) => {
  const terms = TERMS_BY_BATCH[batch] || [];
  const batchName = BATCH_NAMES[batch] || `${batch} Batch`;

  // For developers, show all batches with tabs
  if (isDeveloper && onBatchChange) {
    const allBatches = Object.keys(TERMS_BY_BATCH);
    
    return (
      <div className="w-full max-w-3xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Select Your Term
          </h1>
          <p className="text-muted-foreground text-lg">
            Admin Access - All batches available
          </p>
        </div>

        <Tabs value={batch} onValueChange={onBatchChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            {allBatches.map((batchId) => (
              <TabsTrigger key={batchId} value={batchId}>
                {BATCH_NAMES[batchId]}
              </TabsTrigger>
            ))}
          </TabsList>

          {allBatches.map((batchId) => (
            <TabsContent key={batchId} value={batchId}>
              <div className="grid gap-4 md:grid-cols-2">
                {TERMS_BY_BATCH[batchId].map((term) => (
                  <Card
                    key={term.id}
                    className="cursor-pointer transition-all bg-card border-border hover:border-primary hover:shadow-lg"
                    onClick={() => onTermSelect(term.id)}
                  >
                    <CardHeader className="text-center pb-2">
                      <div className="mx-auto mb-3 p-3 rounded-full bg-primary/10">
                        <BookOpen className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl text-foreground">{term.name}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {term.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button className="w-full" variant="outline">
                        Select {term.name}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    );
  }

  // Standard view for students - single batch only
  return (
    <div className="w-full max-w-2xl px-4 flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Select Your Term
        </h1>
        <p className="text-muted-foreground text-lg">
          {batchName} - Choose your current term
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 justify-items-center w-full">
        {terms.map((term) => (
          <Card
            key={term.id}
            className="cursor-pointer transition-all bg-card border-border hover:border-primary hover:shadow-lg w-full max-w-xs"
            onClick={() => onTermSelect(term.id)}
          >
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-3 p-3 rounded-full bg-primary/10">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl text-foreground">{term.name}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {term.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button className="w-full" variant="outline">
                Select {term.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
