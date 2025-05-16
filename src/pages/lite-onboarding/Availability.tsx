
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ProgressBar from '@/components/common/ProgressBar';
import AvailabilitySelector from '@/components/common/AvailabilitySelector';
import { useUser } from '@/contexts/UserContext';

const LiteOnboardingAvailability = () => {
  const navigate = useNavigate();
  const { user, updateUser, setIsLiteOnboarding } = useUser();
  
  const handleContinue = () => {
    navigate('/lite-onboarding/matching');
  };
  
  const handleAvailabilityChange = (availability: any) => {
    updateUser({ availability });
  };
  
  return (
    <div className="space-y-6">
      <ProgressBar currentStep={1} totalSteps={3} />
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">When are you available to play?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-gray-600">
            Select the times you're available to play squash. This will help us find the best match for your invitation.
          </p>
          
          <AvailabilitySelector 
            availability={user?.availability || {
              monday: { morning: false, afternoon: false, evening: false },
              tuesday: { morning: false, afternoon: false, evening: false },
              wednesday: { morning: false, afternoon: false, evening: false },
              thursday: { morning: false, afternoon: false, evening: false },
              friday: { morning: false, afternoon: false, evening: false },
              saturday: { morning: false, afternoon: false, evening: false },
              sunday: { morning: false, afternoon: false, evening: false },
            }} 
            onChange={handleAvailabilityChange}
          />
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-squash-primary hover:bg-squash-primary/90"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LiteOnboardingAvailability;
