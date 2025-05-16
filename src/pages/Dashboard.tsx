
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import StarRating from '@/components/common/StarRating';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  
  // Mock data for upcoming games and match suggestions
  const upcomingGames = [
    {
      id: 'game1',
      opponent: 'Sarah Johnson',
      rating: 4,
      date: '2025-05-21',
      time: '18:00',
      location: 'Downtown Squash Club',
    }
  ];
  
  const matchSuggestions = [
    {
      id: 'player1',
      name: 'Mike Wilson',
      rating: 3,
      availableSlots: 2,
    },
    {
      id: 'player2',
      name: 'Emily Chen',
      rating: 4,
      availableSlots: 3,
    }
  ];
  
  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => navigate('/app/find-game')}
          >
            Find Game
          </Button>
          <Button 
            className="bg-squash-primary hover:bg-squash-primary/90"
            onClick={() => navigate('/app/offer-game')}
          >
            Offer Game
          </Button>
        </div>
      </div>
      
      {/* Upcoming Games */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Upcoming Games</h2>
        
        {upcomingGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingGames.map((game) => (
              <Card key={game.id}>
                <CardHeader>
                  <CardTitle>{game.opponent}</CardTitle>
                  <CardDescription className="flex items-center">
                    <StarRating value={game.rating} readonly size="sm" />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 text-gray-500">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>{new Date(game.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 text-gray-500">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>{game.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 text-gray-500">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>{game.location}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Message
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-500">No upcoming games</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => navigate('/app/find-game')}
              >
                Find your first game
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Match Suggestions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Suggested Matches</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchSuggestions.map((player) => (
            <Card key={player.id}>
              <CardHeader>
                <CardTitle>{player.name}</CardTitle>
                <CardDescription className="flex items-center">
                  <StarRating value={player.rating} readonly size="sm" />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Has {player.availableSlots} time slots that match your availability
                </p>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
                <Button 
                  size="sm"
                  className="bg-squash-primary hover:bg-squash-primary/90"
                >
                  Invite to Play
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Stats Card */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Stats</h2>
        
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-2xl font-semibold">0</p>
                <p className="text-sm text-gray-500">Games Played</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-semibold">0</p>
                <p className="text-sm text-gray-500">Win Rate</p>
              </div>
              <div className="space-y-1">
                <div className="flex justify-center">
                  <StarRating value={user?.rating || 3} readonly size="sm" />
                </div>
                <p className="text-sm text-gray-500">Your Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
