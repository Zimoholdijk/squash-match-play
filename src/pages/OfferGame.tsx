
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/UserContext';
import { ChevronLeft } from 'lucide-react';

type Step = 'initial' | 'open-match-type' | 'specific-person' | 'specific-time' | 'availability';

const OfferGame = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUser();
  
  // Steps control
  const [currentStep, setCurrentStep] = useState<Step>('initial');
  
  // Form state
  const [matchType, setMatchType] = useState<'open' | 'specific'>('open');
  const [matchMethod, setMatchMethod] = useState<'best-match' | 'specific-time'>('best-match');
  const [specificMatchType, setSpecificMatchType] = useState<'availability' | 'specific-time'>('specific-time');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [location, setLocation] = useState('');
  const [specificPerson, setSpecificPerson] = useState('');
  
  const handleBack = () => {
    if (currentStep === 'open-match-type') {
      setCurrentStep('initial');
    } else if (currentStep === 'specific-person') {
      setCurrentStep('initial');
    } else if (currentStep === 'specific-time') {
      if (matchType === 'specific') {
        setCurrentStep('specific-person');
      } else {
        setCurrentStep('open-match-type');
      }
    } else if (currentStep === 'availability') {
      setCurrentStep('specific-person');
    }
  };
  
  const handleInitialChoice = (type: 'open' | 'specific') => {
    setMatchType(type);
    if (type === 'open') {
      setCurrentStep('open-match-type');
    } else {
      setCurrentStep('specific-person');
    }
  };
  
  const handleOpenMatchChoice = (method: 'best-match' | 'specific-time') => {
    setMatchMethod(method);
    if (method === 'specific-time') {
      setCurrentStep('specific-time');
    } else {
      handleSystemMatch();
    }
  };
  
  const handleSpecificPersonNext = () => {
    if (!specificPerson.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name or email for the person you want to play with",
        variant: "destructive"
      });
      return;
    }
    
    if (specificMatchType === 'specific-time') {
      setCurrentStep('specific-time');
    } else {
      handleShareAvailability();
    }
  };
  
  const generateShareableLink = () => {
    // In a real implementation, this would generate a unique ID and save the game details
    const dummyGameId = 'game_' + Math.random().toString(36).substr(2, 9);
    
    // Display success message with the link
    toast({
      title: "Game offer created!",
      description: "Share this link with your friend to invite them to play.",
    });
    
    // For demo purposes, we'll navigate to a fake "game invite" page
    navigate(`/invite/${dummyGameId}`);
  };
  
  const handleSystemMatch = () => {
    toast({
      title: "Finding the best match...",
      description: "We'll notify you when we find a suitable match based on your preferences.",
    });
    
    // Navigate back to dashboard
    navigate('/app/dashboard');
  };
  
  const handleShareAvailability = () => {
    toast({
      title: "Availability link generated",
      description: "A link with your availability has been created to share with " + specificPerson,
    });
    
    // In a real implementation, this would generate a unique ID and save availability details
    const availabilityId = 'avail_' + Math.random().toString(36).substr(2, 9);
    navigate(`/invite/${availabilityId}`);
  };
  
  const handleSpecificTimeSubmit = () => {
    if (!selectedDate) {
      toast({
        title: "Please select a date",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedTime) {
      toast({
        title: "Please select a time",
        variant: "destructive",
      });
      return;
    }
    
    if (!location) {
      toast({
        title: "Please enter a location",
        variant: "destructive",
      });
      return;
    }
    
    generateShareableLink();
  };
  
  // UI Rendering based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 'initial':
        return (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Who do you want to play with?</h2>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Button 
                    onClick={() => handleInitialChoice('open')} 
                    variant="outline" 
                    className="h-auto flex flex-col items-center justify-center p-6 space-y-3 text-center"
                  >
                    <div className="text-xl font-medium">Open to Anyone</div>
                    <p className="text-muted-foreground">Find a match based on skill level and availability</p>
                  </Button>
                  
                  <Button 
                    onClick={() => handleInitialChoice('specific')} 
                    variant="outline"
                    className="h-auto flex flex-col items-center justify-center p-6 space-y-3 text-center"
                  >
                    <div className="text-xl font-medium">Specific Person</div>
                    <p className="text-muted-foreground">Invite someone you know to play a match</p>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      case 'open-match-type':
        return (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <h2 className="text-lg font-medium">How would you like to be matched?</h2>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Button 
                    onClick={() => handleOpenMatchChoice('best-match')} 
                    variant="outline" 
                    className="h-auto flex flex-col items-center justify-center p-6 space-y-3 text-center"
                  >
                    <div className="text-xl font-medium">Find Best Match</div>
                    <p className="text-muted-foreground">The system will match you with the best player based on your availability</p>
                  </Button>
                  
                  <Button 
                    onClick={() => handleOpenMatchChoice('specific-time')} 
                    variant="outline"
                    className="h-auto flex flex-col items-center justify-center p-6 space-y-3 text-center"
                  >
                    <div className="text-xl font-medium">Specific Time</div>
                    <p className="text-muted-foreground">I have a specific date and time in mind</p>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      case 'specific-person':
        return (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Who would you like to play with?</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="specific-person" className="mb-2 block">
                      Enter their name or email
                    </Label>
                    <Input 
                      id="specific-person" 
                      placeholder="Name or email" 
                      value={specificPerson}
                      onChange={(e) => setSpecificPerson(e.target.value)}
                      className="max-w-md"
                    />
                  </div>
                  
                  <div className="space-y-3 pt-4">
                    <h3 className="text-md font-medium">How would you like to invite them?</h3>
                    
                    <RadioGroup 
                      value={specificMatchType}
                      onValueChange={(value) => setSpecificMatchType(value as 'availability' | 'specific-time')} 
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="availability" id="availability" />
                        <Label htmlFor="availability">Send a link with my availability</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="specific-time" id="specific-time-option" />
                        <Label htmlFor="specific-time-option">Suggest a specific date and time</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <Button
                  onClick={handleSpecificPersonNext}
                  className="bg-squash-primary hover:bg-squash-primary/90 mt-4"
                >
                  {specificMatchType === 'availability' ? 'Share Availability' : 'Next'}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
        
      case 'specific-time':
        return (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <h2 className="text-lg font-medium">When and where do you want to play?</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="mb-2 block">Select Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="border rounded-md"
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="time">Select Time</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger id="time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="08:00">8:00 AM</SelectItem>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="13:00">1:00 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                          <SelectItem value="17:00">5:00 PM</SelectItem>
                          <SelectItem value="18:00">6:00 PM</SelectItem>
                          <SelectItem value="19:00">7:00 PM</SelectItem>
                          <SelectItem value="20:00">8:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Select value={duration} onValueChange={setDuration}>
                        <SelectTrigger id="duration">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="90">1.5 hours</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        placeholder="Enter squash court location" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <Button
                  onClick={handleSpecificTimeSubmit}
                  className="bg-squash-primary hover:bg-squash-primary/90 mt-4"
                >
                  {matchType === 'specific' ? 'Generate Invite Link' : 'Create Game Offer'}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold">Offer a Game</h1>
      </div>
      
      {currentStep !== 'initial' && (
        <Button 
          variant="ghost" 
          onClick={handleBack} 
          className="mb-4 p-2 h-9"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
      )}
      
      {renderStepContent()}
    </div>
  );
};

export default OfferGame;
