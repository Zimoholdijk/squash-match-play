
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { UserProvider } from "@/contexts/UserContext";
import OnboardingLayout from "@/layouts/OnboardingLayout";
import MainLayout from "@/layouts/MainLayout";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";

// Onboarding Steps
import OnboardingWelcome from "@/pages/onboarding/Welcome";
import OnboardingBasicInfo from "@/pages/onboarding/BasicInfo";
import OnboardingRating from "@/pages/onboarding/Rating";
import OnboardingAvailability from "@/pages/onboarding/Availability";
import OnboardingPreferences from "@/pages/onboarding/Preferences";
import OnboardingComplete from "@/pages/onboarding/Complete";

// Main App Pages
import Dashboard from "@/pages/Dashboard";
import OfferGame from "@/pages/OfferGame";
import FindGame from "@/pages/FindGame";
import Profile from "@/pages/Profile";
import GameInvite from "@/pages/GameInvite";

// Lite Onboarding Pages
import LiteOnboardingAvailability from "@/pages/lite-onboarding/Availability";
import LiteOnboardingMatching from "@/pages/lite-onboarding/Matching";
import LiteOnboardingComplete from "@/pages/lite-onboarding/Complete";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Onboarding Routes */}
            <Route path="/onboarding" element={<OnboardingLayout />}>
              <Route index element={<OnboardingWelcome />} />
              <Route path="basic-info" element={<OnboardingBasicInfo />} />
              <Route path="rating" element={<OnboardingRating />} />
              <Route path="availability" element={<OnboardingAvailability />} />
              <Route path="preferences" element={<OnboardingPreferences />} />
              <Route path="complete" element={<OnboardingComplete />} />
            </Route>
            
            {/* Lite Onboarding Routes */}
            <Route path="/lite-onboarding" element={<OnboardingLayout />}>
              <Route path="availability" element={<LiteOnboardingAvailability />} />
              <Route path="matching" element={<LiteOnboardingMatching />} />
              <Route path="complete" element={<LiteOnboardingComplete />} />
            </Route>
            
            {/* Main App Routes */}
            <Route path="/app" element={<MainLayout />}>
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="offer-game" element={<OfferGame />} />
              <Route path="find-game" element={<FindGame />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            
            {/* Game Invite Route */}
            <Route path="/invite/:gameId" element={<GameInvite />} />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
