
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/UserContext';

const GameInvite = () => {
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>();
  const { toast } = useToast();
  const { isAuthenticated, setPendingGameId } = useUser();
  
  useEffect(() => {
    if (gameId) {
      // Store the game ID for after onboarding
      setPendingGameId(gameId);
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
              <h2 className="mt-3 font-medium">John Smith</h2>
              <p className="text-sm text-gray-500">⭐⭐⭐⭐</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Date</span>
                  <span className="text-sm font-medium">Friday, May 24, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Time</span>
                  <span className="text-sm font-medium">6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Location</span>
                  <span className="text-sm font-medium">Downtown Squash Club</span>
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
        </Card>
      </div>
    </div>
  );
};

export default GameInvite;
