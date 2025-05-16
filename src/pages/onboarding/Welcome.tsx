
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/common/ProgressBar';

const OnboardingWelcome = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <ProgressBar currentStep={1} totalSteps={5} />
      
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-squash-primary/10 rounded-full mb-4">
          <span className="text-4xl">🏸</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Welcome to SquashMatch!</h1>
        <p className="text-gray-600">Let's set up your profile to find the perfect squash partners.</p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-squash-secondary/10 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-squash-secondary">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <h2 className="font-medium">Your Profile</h2>
              <p className="text-sm text-gray-500">Basic information and skill level</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="h-8 w-8 bg-squash-secondary/10 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-squash-secondary">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div>
              <h2 className="font-medium">Your Availability</h2>
              <p className="text-sm text-gray-500">When you're free to play</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="h-8 w-8 bg-squash-secondary/10 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-squash-secondary">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <div>
              <h2 className="font-medium">Your Preferences</h2>
              <p className="text-sm text-gray-500">Who you'd like to play with</p>
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full bg-squash-primary hover:bg-squash-primary/90" 
        onClick={() => navigate('/onboarding/basic-info')}
      >
        Let's Get Started
      </Button>
    </div>
  );
};

export default OnboardingWelcome;
