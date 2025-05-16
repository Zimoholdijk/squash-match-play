
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ProgressBar from '@/components/common/ProgressBar';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/components/ui/use-toast';
import StarRating from '@/components/common/StarRating';

const LiteOnboardingComplete = () => {
  const navigate = useNavigate();
  const { updateUser, setIsAuthenticated } = useUser();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(3);
  
  const handleComplete = () => {
    if (!name || !email) {
      toast({
        title: "Required fields missing",
        description: "Please provide your name and email to continue.",
        variant: "destructive",
      });
      return;
    }
    
    // Update user with the provided details
    updateUser({
      name,
      email,
      rating,
      isOnboarded: true
    });
    
    // Set user as authenticated
    setIsAuthenticated(true);
    
    toast({
      title: "Game response recorded!",
      description: "Your game time preferences have been submitted.",
    });
    
    // Navigate to dashboard
    navigate('/app/dashboard');
  };
  
  return (
    <div className="space-y-6">
      <ProgressBar currentStep={3} totalSteps={3} />
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Just One More Step!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-gray-600">
            Complete your profile to finalize your response and connect with your squash partner.
          </p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="rating" className="block text-sm font-medium">
                Your Skill Level
              </label>
              <div className="flex flex-col items-center space-y-2">
                <StarRating value={rating} onChange={setRating} size="md" />
                <div className="flex justify-between w-full text-xs text-gray-500">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-squash-primary hover:bg-squash-primary/90"
            onClick={handleComplete}
          >
            Complete & View Match Details
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LiteOnboardingComplete;
