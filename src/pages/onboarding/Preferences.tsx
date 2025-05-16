
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import ProgressBar from '@/components/common/ProgressBar';
import { useUser } from '@/contexts/UserContext';

const OnboardingPreferences = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  
  const [minRating, setMinRating] = useState(user?.preferences?.minRating || 1);
  const [maxRating, setMaxRating] = useState(user?.preferences?.maxRating || 5);
  
  const [locations, setLocations] = useState<string[]>(user?.preferences?.location || []);
  const [genders, setGenders] = useState<string[]>(user?.preferences?.gender || []);
  
  const locationOptions = ['Downtown', 'North Side', 'South Side', 'East Side', 'West Side'];
  const genderOptions = ['Male', 'Female', 'Any'];
  
  const handleLocationChange = (location: string) => {
    setLocations(prevLocations => 
      prevLocations.includes(location)
        ? prevLocations.filter(l => l !== location)
        : [...prevLocations, location]
    );
  };
  
  const handleGenderChange = (gender: string) => {
    setGenders(prevGenders => 
      prevGenders.includes(gender)
        ? prevGenders.filter(g => g !== gender)
        : [...prevGenders, gender]
    );
  };
  
  const handleContinue = () => {
    updateUser({
      preferences: {
        minRating,
        maxRating,
        location: locations,
        gender: genders
      }
    });
    navigate('/onboarding/complete');
  };
  
  return (
    <div className="space-y-6">
      <ProgressBar currentStep={5} totalSteps={5} />
      
      <h1 className="text-2xl font-bold">Your Preferences</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="font-medium text-lg">Skill Range</h2>
          <p className="text-sm text-gray-600">
            Choose the skill level range of players you want to match with.
          </p>
          
          <div className="space-y-6 px-2">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Beginner (1)</span>
                <span>Expert (5)</span>
              </div>
              <Slider 
                defaultValue={[minRating, maxRating]} 
                min={1} 
                max={5} 
                step={1}
                onValueChange={(values) => {
                  setMinRating(values[0]);
                  setMaxRating(values[1]);
                }}
              />
            </div>
            
            <div className="text-center">
              <span className="text-sm font-medium">
                {minRating === maxRating 
                  ? `Players with exactly ${minRating} stars`
                  : `Players with ${minRating} to ${maxRating} stars`
                }
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="font-medium text-lg">Preferred Locations</h2>
          <p className="text-sm text-gray-600">
            Select the areas where you prefer to play.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {locationOptions.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox 
                  id={`location-${location}`} 
                  checked={locations.includes(location)}
                  onCheckedChange={() => handleLocationChange(location)}
                />
                <label 
                  htmlFor={`location-${location}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {location}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="font-medium text-lg">Preferred Gender</h2>
          <p className="text-sm text-gray-600">
            Select which gender(s) you prefer to play with.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {genderOptions.map((gender) => (
              <div key={gender} className="flex items-center space-x-2">
                <Checkbox 
                  id={`gender-${gender}`} 
                  checked={genders.includes(gender)}
                  onCheckedChange={() => handleGenderChange(gender)}
                />
                <label 
                  htmlFor={`gender-${gender}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {gender}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex space-x-3 pt-4">
        <Button
          variant="outline"
          onClick={() => navigate('/onboarding/availability')}
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

export default OnboardingPreferences;
