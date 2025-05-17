
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import InitialChoice from '@/components/offer-game/InitialChoice';
import TimeSelector from '@/components/offer-game/TimeSelector';
import PartnerSelector from '@/components/offer-game/PartnerSelector';
import SuccessScreen from '@/components/offer-game/SuccessScreen';

type Step = 'initial' | 'availability' | 'partner' | 'time' | 'success';

const OfferGame = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>('initial');
  const [matchType, setMatchType] = useState<'open' | 'specific'>('open');
  const [inviteLink, setInviteLink] = useState<string>('');
  const [partnerName, setPartnerName] = useState('');
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<Date[]>([]);

  const handleBack = () => {
    switch (currentStep) {
      case 'availability':
      case 'partner':
        setCurrentStep('initial');
        break;
      case 'time':
        setCurrentStep('partner');
        break;
      case 'success':
        if (matchType === 'open') {
          setCurrentStep('availability');
        } else {
          setCurrentStep('time');
        }
        break;
      default:
        break;
    }
  };

  const handleInitialChoice = (type: 'open' | 'specific') => {
    setMatchType(type);
    setCurrentStep(type === 'open' ? 'availability' : 'partner');
  };

  const handleAvailabilitySubmit = (selectedSlots: Date[]) => {
    setSelectedTimeSlots(selectedSlots);
    
    // Generate a unique game ID for the availability-based invite
    const dummyGameId = 'avail_' + Math.random().toString(36).substr(2, 9);
    const link = `${window.location.origin}/invite/${dummyGameId}`;
    setInviteLink(link);
    
    setCurrentStep('success');
  };

  const handlePartnerSelect = (name: string, email: string) => {
    setPartnerName(name);
    setCurrentStep('time');
  };

  const handleTimeSubmit = (selectedSlots: Date[]) => {
    setSelectedTimeSlots(selectedSlots);
    
    // In a real app, this would generate a unique ID and save the game details
    const dummyGameId = 'game_' + Math.random().toString(36).substr(2, 9);
    const link = `${window.location.origin}/invite/${dummyGameId}`;
    setInviteLink(link);
    
    toast({
      title: "Time slots saved",
      description: `${selectedSlots.length} time slot(s) have been saved.`,
    });
    
    setCurrentStep('success');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'initial':
        return <InitialChoice onSelect={handleInitialChoice} />;
      case 'availability':
        return <TimeSelector onSubmit={handleAvailabilitySubmit} />;
      case 'partner':
        return <PartnerSelector onNext={handlePartnerSelect} />;
      case 'time':
        return <TimeSelector onSubmit={handleTimeSubmit} />;
      case 'success':
        return (
          <SuccessScreen
            type={matchType}
            inviteLink={inviteLink}
            onFinish={() => navigate('/app/dashboard')}
          />
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

      {renderStep()}
    </div>
  );
};

export default OfferGame;
