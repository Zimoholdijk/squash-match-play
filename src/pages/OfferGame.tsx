
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/UserContext';

const OfferGame = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUser();
  
  const [matchType, setMatchType] = useState<'open' | 'specific'>('open');
  const [matchMethod, setMatchMethod] = useState<'best-match' | 'specific-time'>('best-match');
  const [specificMatchType, setSpecificMatchType] = useState<'availability' | 'specific-time'>('specific-time');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [location, setLocation] = useState('');
  const [specificPerson, setSpecificPerson] = useState('');
  
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (matchType === 'specific') {
      if (specificMatchType === 'availability') {
        toast({
          title: "Availability link generated",
          description: "A link with your availability has been created to share with " + specificPerson,
        });
        
        // In a real implementation, this would generate a unique ID and save availability details
        const availabilityId = 'avail_' + Math.random().toString(36).substr(2, 9);
        navigate(`/invite/${availabilityId}`);
        return;
      }
      
      generateShareableLink();
    } else {
      if (matchMethod === 'best-match') {
        handleSystemMatch();
      } else {
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
      }
    }
  };
  
  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-2xl font-bold">Offer a Game</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-lg font-medium">Who do you want to play with?</h2>
                
                <RadioGroup defaultValue="open" onValueChange={(value) => setMatchType(value as 'open' | 'specific')} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="open" id="open" />
                    <Label htmlFor="open">Open to any matching player</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="specific" id="specific" />
                    <Label htmlFor="specific">I want to play with a specific person</Label>
                  </div>
                </RadioGroup>
                
                {matchType === 'specific' && (
                  <div className="pl-6 pt-2 space-y-4">
                    <div>
                      <Label htmlFor="specific-person" className="mb-2 block text-sm">
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
                    
                    <div className="space-y-3">
                      <h3 className="text-md font-medium">How would you like to invite them?</h3>
                      
                      <RadioGroup 
                        defaultValue="specific-time" 
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
                )}
              </div>
              
              {matchType === 'open' && (
                <div className="space-y-3">
                  <h2 className="text-lg font-medium">How would you like to be matched?</h2>
                  
                  <RadioGroup defaultValue="best-match" onValueChange={(value) => setMatchMethod(value as 'best-match' | 'specific-time')} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="best-match" id="best-match" />
                      <Label htmlFor="best-match">Find the best match based on my availability</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="specific-time" id="specific-time" />
                      <Label htmlFor="specific-time">I have a specific date and time in mind</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
              
              {((matchType === 'specific' && specificMatchType === 'specific-time') || 
                 (matchType === 'open' && matchMethod === 'specific-time')) && (
                <div className="space-y-4 pt-2">
                  <div className="space-y-3">
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
                          <Select onValueChange={setSelectedTime}>
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
                          <Select defaultValue="60" onValueChange={setDuration}>
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
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/app/dashboard')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-squash-primary hover:bg-squash-primary/90"
          >
            {matchType === 'specific' 
              ? (specificMatchType === 'availability' ? 'Share Availability' : 'Generate Invite Link') 
              : (matchMethod === 'best-match' ? 'Find Best Match' : 'Create Game Offer')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OfferGame;
