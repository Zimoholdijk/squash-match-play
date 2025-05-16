
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ProgressBar from '@/components/common/ProgressBar';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/components/ui/use-toast';

const OnboardingBasicInfo = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [bio, setBio] = useState(user?.bio || '');
  
  const handleContinue = () => {
    if (!name || !email) {
      toast({
        title: "Required fields missing",
        description: "Please provide your name and email to continue.",
        variant: "destructive",
      });
      return;
    }
    
    updateUser({
      name,
      email,
      phoneNumber,
      bio,
    });
    
    navigate('/onboarding/rating');
  };
  
  return (
    <div className="space-y-6">
      <ProgressBar currentStep={2} totalSteps={5} />
      
      <h1 className="text-2xl font-bold">Your Basic Info</h1>
      
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
          <label htmlFor="phoneNumber" className="block text-sm font-medium">
            Phone Number (optional)
          </label>
          <Input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Your phone number"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="bio" className="block text-sm font-medium">
            Bio (optional)
          </label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell potential players a bit about yourself..."
            rows={3}
          />
        </div>
      </div>
      
      <div className="flex space-x-3 pt-4">
        <Button
          variant="outline"
          onClick={() => navigate('/onboarding')}
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

export default OnboardingBasicInfo;
