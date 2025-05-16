
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import ProgressBar from '@/components/common/ProgressBar';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/components/ui/use-toast';
import SwipeCard from '@/components/common/SwipeCard';

interface TimeSlot {
  id: string;
  day: string;
  date: string;
  time: string;
  dateObj: Date;
}

const LiteOnboardingMatching = () => {
  const navigate = useNavigate();
  const { user, pendingGameId } = useUser();
  const { toast } = useToast();
  
  // Generate some time slots based on current date
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const day = dayNames[date.getDay()];
      
      // Morning slot
      slots.push({
        id: `slot-${i}-morning`,
        day,
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        time: '10:00 AM',
        dateObj: new Date(date.setHours(10, 0, 0, 0))
      });
      
      // Afternoon slot
      slots.push({
        id: `slot-${i}-afternoon`,
        day,
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        time: '3:00 PM',
        dateObj: new Date(date.setHours(15, 0, 0, 0))
      });
      
      // Evening slot
      slots.push({
        id: `slot-${i}-evening`,
        day,
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        time: '7:00 PM',
        dateObj: new Date(date.setHours(19, 0, 0, 0))
      });
    }
    
    // Filter out times that don't match availability if it's set
    if (user?.availability) {
      return slots.filter(slot => {
        const dayName = slot.day.toLowerCase();
        let timeOfDay = '';
        const hour = new Date(slot.dateObj).getHours();
        
        if (hour < 12) timeOfDay = 'morning';
        else if (hour < 17) timeOfDay = 'afternoon';
        else timeOfDay = 'evening';
        
        // Check if this day and time is available for the user
        return user.availability[dayName] && user.availability[dayName][timeOfDay as keyof typeof user.availability[typeof dayName]];
      });
    }
    
    return slots;
  };
  
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(generateTimeSlots());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);
  
  const handleSwipeLeft = () => {
    handleNextCard();
  };
  
  const handleSwipeRight = () => {
    // Add current time slot to selected slots
    if (currentIndex < timeSlots.length) {
      setSelectedSlots(prev => [...prev, timeSlots[currentIndex]]);
    }
    handleNextCard();
  };
  
  const handleNextCard = () => {
    if (currentIndex < timeSlots.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // We've gone through all cards, continue to completion
      navigate('/lite-onboarding/complete');
    }
  };
  
  return (
    <div className="space-y-6">
      <ProgressBar currentStep={2} totalSteps={3} />
      
      <Card className="shadow-lg">
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-2xl font-bold text-center mb-4">
            Select Available Times
          </h2>
          
          <p className="text-center text-gray-600">
            Swipe right on times that work for you, or left to skip.
          </p>
          
          <div className="card-swipe-container mx-auto h-64">
            {timeSlots.length > 0 && currentIndex < timeSlots.length ? (
              <SwipeCard
                key={timeSlots[currentIndex].id}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
              >
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="text-5xl mb-4">🏸</div>
                  <h3 className="text-xl font-semibold mb-1">{timeSlots[currentIndex].day}</h3>
                  <p className="text-gray-600 mb-4">{timeSlots[currentIndex].date}</p>
                  <div className="text-3xl font-bold text-squash-primary mb-4">
                    {timeSlots[currentIndex].time}
                  </div>
                  <div className="flex justify-center space-x-6">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-12 w-12 rounded-full border-red-400 text-red-500"
                      onClick={handleSwipeLeft}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </Button>
                    <Button 
                      size="icon" 
                      className="h-12 w-12 rounded-full bg-squash-primary hover:bg-squash-primary/90"
                      onClick={handleSwipeRight}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </Button>
                  </div>
                </div>
              </SwipeCard>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No available time slots found.</p>
              </div>
            )}
          </div>
          
          <div className="text-center text-sm text-gray-500">
            {selectedSlots.length > 0 ? (
              <p>{selectedSlots.length} times selected</p>
            ) : (
              <p>No times selected yet</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-squash-secondary hover:bg-squash-secondary/90"
            onClick={() => navigate('/lite-onboarding/complete')}
          >
            Skip & Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LiteOnboardingMatching;
