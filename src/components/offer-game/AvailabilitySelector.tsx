import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AvailabilitySelectorGrid from '@/components/common/AvailabilitySelector';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  onSubmit: () => void;
}

const AvailabilitySelector: React.FC<Props> = ({ onSubmit }) => {
  const { user, updateUser } = useUser();
  const { toast } = useToast();

  const handleAvailabilityChange = (availability: any) => {
    updateUser({ availability });
  };

  const handleSubmit = () => {
    toast({
      title: "Availability submitted",
      description: "We'll notify you when we find a suitable match.",
    });
    onSubmit();
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Select Your Availability</h2>
            <p className="text-sm text-gray-600">
              Choose the times you're available to play. We'll match you with players who share similar time slots.
            </p>
          </div>

          <AvailabilitySelectorGrid
            availability={user?.availability || {
              monday: { morning: false, afternoon: false, evening: false },
              tuesday: { morning: false, afternoon: false, evening: false },
              wednesday: { morning: false, afternoon: false, evening: false },
              thursday: { morning: false, afternoon: false, evening: false },
              friday: { morning: false, afternoon: false, evening: false },
              saturday: { morning: false, afternoon: false, evening: false },
              sunday: { morning: false, afternoon: false, evening: false },
            }}
            onChange={handleAvailabilityChange}
          />

          <Button
            className="w-full bg-squash-primary hover:bg-squash-primary/90"
            onClick={handleSubmit}
          >
            Submit Availability
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilitySelector;