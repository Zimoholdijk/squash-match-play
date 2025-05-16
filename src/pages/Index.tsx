
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, pendingGameId } = useUser();
  const { toast } = useToast();
  
  useEffect(() => {
    // If user is authenticated and has completed onboarding, redirect to dashboard
    if (isAuthenticated && user?.isOnboarded) {
      navigate('/app/dashboard');
    }
    // If there's a pending game invite and user is not authenticated, go to lite onboarding
    else if (pendingGameId && !isAuthenticated) {
      navigate('/lite-onboarding/availability');
    }
  }, [isAuthenticated, user, pendingGameId, navigate]);

  // Simulating login for demo purposes
  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col bg-gradient-to-b from-squash-secondary/10 to-squash-primary/10">
        <header className="container mx-auto py-6 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-squash-primary rounded-full"></div>
            <span className="font-bold text-xl text-squash-dark">SquashMatch</span>
          </div>
          <Button 
            variant="ghost" 
            className="text-squash-secondary hover:text-squash-secondary/90"
            onClick={() => navigate('/onboarding')}
          >
            Sign In
          </Button>
        </header>

        <main className="flex-1 container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold text-squash-dark mb-4">
              Find Your Perfect Squash Match
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Connect with players at your skill level, schedule games that fit your availability, and improve your game.
            </p>
            <Button 
              className="bg-squash-primary hover:bg-squash-primary/90 text-white px-8 py-6 text-lg" 
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>

          <div className="md:w-1/2 relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-squash-secondary/30 to-squash-primary/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">🏸</div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="font-bold">John, 32</p>
                    <p className="text-sm text-gray-500">⭐⭐⭐⭐ • 2.5 miles away</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200">
                      ✕
                    </button>
                    <button className="w-10 h-10 rounded-full bg-squash-primary flex items-center justify-center text-white hover:bg-squash-primary/90">
                      ✓
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-squash-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-squash-secondary">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-gray-600">Set your skill level, availability, and preferences to find compatible matches.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-squash-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-squash-primary">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Match & Connect</h3>
              <p className="text-gray-600">Swipe through potential matches or send invites to specific players.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-squash-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-squash-secondary">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Schedule Games</h3>
              <p className="text-gray-600">Find times that work for both players and confirm your match.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} SquashMatch. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
