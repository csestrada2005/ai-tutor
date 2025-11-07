import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Users, Clock, Heart } from "lucide-react";

const Full = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <Users className="w-20 h-20 text-primary" />
              <div className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
                !
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">We're Sorry!</CardTitle>
          <CardDescription className="text-lg">
            We've reached our current capacity limit
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Thank you for your interest in Ask Tetr! We're working very hard to provide 
              the best learning experience possible, and right now we're at full capacity.
            </p>
            
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold mb-1">We're Scaling Up</h3>
                  <p className="text-sm text-muted-foreground">
                    JP, Alan and Sam are working day and night to expand our capacity so we can welcome everyone of you guys!!!
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold mb-1">Quality First</h3>
                  <p className="text-sm text-muted-foreground">
                    We limit capacity to ensure every user gets the best possible experience with our AI tutors.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Please check back soon or contact us for updates on when we'll have more space available.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => navigate('/')} 
              className="flex-1"
              variant="default"
            >
              Return to Home
            </Button>
            <Button 
              onClick={() => navigate('/auth')} 
              className="flex-1"
              variant="outline"
            >
              Already Have an Account?
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Full;
