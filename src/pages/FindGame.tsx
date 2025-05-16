
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import SwipeCard from '@/components/common/SwipeCard';
import StarRating from '@/components/common/StarRating';

interface GameSuggestion {
  id: string;
  playerName: string;
  playerRating: number;
  date: string;
  time: string;
  location: string;
}

const FindGame = () => {
  const { toast } = useToast();
  
  // Sample game suggestions
  const initialSuggestions: GameSuggestion[] = [
    {
      id: 'game1',
      playerName: 'Alex Smith',
      playerRating: 4,
      date: '2025-05-20',
      time: '18:00',
      location: 'Downtown Squash Club'
    },
    {
      id: 'game2',
      playerName: 'Jamie Wong',
      playerRating: 3,
      date: '2025-05-22',
      time: '19:30',
      location: 'Eastside Courts'
    },
    {
      id: 'game3',
      playerName: 'Taylor Johnson',
      playerRating: 5,
      date: '2025-05-23',
      time: '17:15',
      location: 'University Club'
    }
  ];
  
  const [suggestions, setSuggestions] = useState<GameSuggestion[]>(initialSuggestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleSwipeLeft = () => {
    toast({
      title: "Declined",
      description: `You declined a game with ${suggestions[currentIndex]?.playerName}`,
    });
    handleNextCard();
  };
  
  const handleSwipeRight = () => {
    toast({
      title: "It's a match!",
      description: `You accepted a game with ${suggestions[currentIndex]?.playerName}`,
    });
    handleNextCard();
  };
  
  const handleNextCard = () => {
    if (currentIndex < suggestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Reset the deck for demo purposes
      setCurrentIndex(0);
      toast({
        title: "That's all for now",
        description: "We'll send you more matches soon.",
      });
    }
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };
  
  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-2xl font-bold">Find a Game</h1>
      
      <div className="text-center">
        <p className="text-gray-600 mb-6">
          Swipe right to accept a game, or left to skip to the next suggestion.
        </p>
        
        <div className="card-swipe-container mx-auto max-w-md">
          {suggestions.map((suggestion, index) => (
            currentIndex === index && (
              <SwipeCard 
                key={suggestion.id}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
              >
                <Card className="w-full shadow-lg">
                  <div className="bg-gradient-to-br from-squash-secondary/20 to-squash-primary/10 h-32 flex items-center justify-center">
                    <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center shadow-md">
                      <span className="text-3xl">{suggestion.playerName[0]}</span>
                    </div>
                  </div>
                  
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <h2 className="text-xl font-semibold">{suggestion.playerName}</h2>
                      <div className="flex justify-center mt-1">
                        <StarRating value={suggestion.playerRating} readonly size="sm" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 text-gray-500">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>{formatDate(suggestion.date)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 text-gray-500">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>{suggestion.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 text-gray-500">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>{suggestion.location}</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-center space-x-6 py-6">
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
                  </CardFooter>
                </Card>
              </SwipeCard>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindGame;
