
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/UserContext';
import { Calendar } from '@/components/ui/calendar';
import { Copy, Check } from 'lucide-react';
import TimeSelector from '@/components/offer-game/TimeSelector';

type InviteType = 'specific-time' | 'availability';

interface GameInviteData {
  type: InviteType;
  host: string;
  date?: Date;
  time?: string;
  location?: string;
  availableTimes?: Date[];
}

const GameInvite = () => {
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>();
  const { toast } = useToast();
  const { isAuthenticated, setPendingGameId } = useUser();
  const [inviteType, setInviteType] = useState<InviteType>('specific-time');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [copied, setCopied] = useState(false);
  const [gameData, setGameData] = useState<GameInviteData | null>(null);
  
  // In a real app, this would fetch real data from the backend
  useEffect(() => {
    if (gameId) {
      // Store the game ID for after onboarding
      setPendingGameId(gameId);
      
      // Check if this is an availability-based invite or specific time
      // This would normally come from a database, but for now we'll determine from the ID format
      if (gameId.startsWith('avail_')) {
        setInviteType('availability');
        
        // Mock available times for demo purposes
        const mockStartDate = new Date();
        mockStartDate.setHours(0, 0, 0, 0);
        
        const availableTimes = [
          new Date(mockStartDate.getTime() + (24 * 60 * 60 * 1000) + (10 * 60 * 60 * 1000)), // Tomorrow 10:00
          new Date(mockStartDate.getTime() + (24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000)), // Tomorrow 14:00
          new Date(mockStartDate.getTime() + (48 * 60 * 60 * 1000) + (17 * 60 * 60 * 1000)), // Day after tomorrow 17:00
          new Date(mockStartDate.getTime() + (72 * 60 * 60 * 1000) + (18 * 60 * 60 * 1000)), // 3 days later 18:00
        ];
        
        setGameData({
          type: 'availability',
          host: 'John Smith',
          availableTimes
        });
      } else {
        setGameData({
          type: 'specific-time',
          host: 'John Smith',
          date: new Date(2025, 4, 24, 18, 0), // May 24, 2025, 6:00 PM
          time: '6:00 PM',
          location: 'Downtown Squash Club'
        });
      }
    }
  }, [gameId, setPendingGameId]);
  
  const handleAccept = () => {
    if (isAuthenticated) {
      // If user is already authenticated, directly accept the invite
      toast({
        title: "Game accepted!",
        description: "You have accepted the invitation to play.",
      });
      navigate('/app/dashboard');
    } else {
      // If user is not authenticated, start the lite onboarding process
      navigate('/lite-onboarding/availability');
    }
  };
  
  const handleDecline = () => {
    toast({
      title: "Invitation declined",
      description: "You have declined the invitation to play.",
    });
    navigate('/');
  };

  const handleConfirmTime = (selectedTime: Date) => {
    toast({
      title: "Time confirmed!",
      description: `You selected ${format(selectedTime, 'EEEE, MMMM d, h:mm a')}.`,
    });
    
    if (isAuthenticated) {
      navigate('/app/dashboard');
    } else {
      navigate('/lite-onboarding/availability');
    }
  };
  
  const copyInviteLink = () => {
    const inviteLink = window.location.href;
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    
    toast({
      title: "Link copied!",
      description: "The invitation link has been copied to your clipboard.",
    });
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const renderSpecificTimeInvite = () => (
    <>
      <CardContent className="space-y-4">
        <div className="text-center mb-6">
          <p className="text-gray-600">
            You've been invited to play squash! Accept this invitation to see the details and schedule the game.
          </p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-3xl">J</span>
          </div>
          <h2 className="mt-3 font-medium">{gameData?.host || 'Player'}</h2>
          <p className="text-sm text-gray-500">⭐⭐⭐⭐</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Date</span>
              <span className="text-sm font-medium">
                {gameData?.date ? format(gameData.date, 'EEEE, MMMM d, yyyy') : 'Friday, May 24, 2025'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Time</span>
              <span className="text-sm font-medium">{gameData?.time || '6:00 PM'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Location</span>
              <span className="text-sm font-medium">{gameData?.location || 'Downtown Squash Club'}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <Button 
          className="w-full bg-squash-primary hover:bg-squash-primary/90" 
          onClick={handleAccept}
        >
          Accept Invitation
        </Button>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleDecline}
        >
          Decline
        </Button>
      </CardFooter>
    </>
  );
  
  const renderAvailabilityInvite = () => (
    <>
      <CardContent className="space-y-4">
        <div className="text-center mb-6">
          <p className="text-gray-600">
            {gameData?.host || 'Someone'} has shared their availability with you. Please select a time that works for you.
          </p>
        </div>
        
        {gameData?.availableTimes && (
          <TimeSelector 
            viewMode="confirm"
            preSelectedSlots={gameData.availableTimes}
            onSubmit={() => {}}
            onConfirm={handleConfirmTime}
          />
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleDecline}
        >
          I'm Not Available
        </Button>
      </CardFooter>
    </>
  );
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-squash-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-squash-primary">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <CardTitle className="text-2xl">Squash Game Invitation</CardTitle>
          </CardHeader>
          
          {inviteType === 'specific-time' ? renderSpecificTimeInvite() : renderAvailabilityInvite()}
        </Card>
      </div>
    </div>
  );
};

import { format } from 'date-fns';

export default GameInvite;
