
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/common/ProgressBar';
import StarRating from '@/components/common/StarRating';
import { useUser } from '@/contexts/UserContext';

const OnboardingRating = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  
  const [rating, setRating] = useState(user?.rating || 3);
  
  const handleContinue = () => {
    updateUser({ rating });
    navigate('/onboarding/availability');
  };
  
  return (
    <div className="space-y-6">
      <ProgressBar currentStep={3} totalSteps={5} />
      
      <h1 className="text-2xl font-bold">Your Skill Level</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <p className="text-gray-600">
          How would you rate your squash skill level? This helps match you with players at a similar level.
        </p>
        
        <div className="flex flex-col items-center space-y-8 py-4">
          <StarRating value={rating} onChange={setRating} size="lg" />
          
          <div className="w-full text-center">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Expert</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full w-full mt-1">
              <div 
                className="h-2 bg-squash-primary rounded-full transition-all duration-300"
                style={{ width: `${(rating / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
          <h3 className="font-medium text-blue-800 mb-1">Rating Guide</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>⭐ - Complete beginner, new to squash</li>
            <li>⭐⭐ - Can rally but still learning basics</li>
            <li>⭐⭐⭐ - Consistent player with good fundamentals</li>
            <li>⭐⭐⭐⭐ - Advanced player with strong techniques</li>
            <li>⭐⭐⭐⭐⭐ - Competitive/professional level</li>
          </ul>
        </div>
      </div>
      
      <div className="flex space-x-3 pt-4">
        <Button
          variant="outline"
          onClick={() => navigate('/onboarding/basic-info')}
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

export default OnboardingRating;
