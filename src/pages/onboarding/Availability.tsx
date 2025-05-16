
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/common/ProgressBar';
import AvailabilitySelector from '@/components/common/AvailabilitySelector';
import { useUser } from '@/contexts/UserContext';

const OnboardingAvailability = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  
  const handleContinue = () => {
    navigate('/onboarding/preferences');
  };
  
  const handleAvailabilityChange = (availability: any) => {
    updateUser({ availability });
  };
  
  return (
    <div className="space-y-6">
      <ProgressBar currentStep={4} totalSteps={5} />
      
      <h1 className="text-2xl font-bold">Your Availability</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <p className="text-gray-600">
          Select the times you're typically available to play. This helps us find matches that fit your schedule.
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
      </div>
      
      <div className="flex space-x-3 pt-4">
        <Button
          variant="outline"
          onClick={() => navigate('/onboarding/rating')}
          className="w-1/2"
        >
          Back
        </Button>
        <Button
          className="w-1/2 bg-squash-primary hover:bg-squash-primary/90"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default OnboardingAvailability;
