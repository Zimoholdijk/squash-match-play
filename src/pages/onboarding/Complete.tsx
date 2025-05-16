
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/components/ui/use-toast';

const OnboardingComplete = () => {
  const navigate = useNavigate();
  const { updateUser, setIsAuthenticated } = useUser();
  const { toast } = useToast();
  
  useEffect(() => {
    updateUser({ isOnboarded: true });
    setIsAuthenticated(true);
  }, [updateUser, setIsAuthenticated]);
  
  const handleContinue = () => {
    toast({
      title: "Profile created successfully!",
      description: "Welcome to SquashMatch.",
    });
    navigate('/app/dashboard');
  };
  
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-green-600">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      
      <h1 className="text-2xl font-bold">You're All Set!</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <p className="text-gray-600">
          Your profile is now ready. You can start finding matches, offer games, or make adjustments to your profile at any time.
        </p>
        
        <div className="py-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Profile</span>
            <span className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-600">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Skill Level</span>
            <span className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-600">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Availability</span>
            <span className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-600">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Preferences</span>
            <span className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-600">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full bg-squash-primary hover:bg-squash-primary/90"
        onClick={handleContinue}
      >
        Go to Dashboard
      </Button>
    </div>
  );
};

export default OnboardingComplete;
