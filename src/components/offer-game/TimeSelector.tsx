import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format, addDays, startOfWeek, setHours, setMinutes, isBefore } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Props {
  onSubmit: (selectedSlots: Date[]) => void;
}

const TimeSelector: React.FC<Props> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [selectedSlots, setSelectedSlots] = useState<Date[]>([]);
  
  // Generate time slots for the week
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Start from Monday
  const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  
  const timeSlots = Array.from({ length: 32 }, (_, i) => {
    const hour = Math.floor(i / 2) + 6; // Start at 6 AM
    const minutes = (i % 2) * 30; // Alternate between 0 and 30 minutes
    return { hour, minutes };
  });

  const isTimeSlotSelectable = (date: Date) => {
    const now = new Date();
    return !isBefore(date, now);
  };

  const toggleTimeSlot = (day: Date, hour: number, minutes: number) => {
    const slotTime = setMinutes(setHours(day, hour), minutes);
    
    if (!isTimeSlotSelectable(slotTime)) {
      toast({
        title: "Cannot select past time",
        description: "Please select a future time slot.",
        variant: "destructive",
      });
      return;
    }

    setSelectedSlots(prev => {
      const slotExists = prev.some(slot => 
        slot.getTime() === slotTime.getTime()
      );
      
      if (slotExists) {
        return prev.filter(slot => slot.getTime() !== slotTime.getTime());
      } else {
        return [...prev, slotTime].sort((a, b) => a.getTime() - b.getTime());
      }
    });
  };

  const handleSubmit = () => {
    if (selectedSlots.length === 0) {
      toast({
        title: "No time slots selected",
        description: "Please select at least one time slot.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(selectedSlots);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Select Available Times</h2>
            <p className="text-sm text-gray-600">
              Click on multiple time slots to suggest different options for your partner.
            </p>
          </div>

          <ScrollArea className="h-[500px] pr-4">
            <div className="grid grid-cols-8 gap-1">
              {/* Time column */}
              <div className="col-span-1">
                <div className="h-10"></div> {/* Header spacer */}
                {timeSlots.map(({ hour, minutes }, index) => (
                  <div 
                    key={index}
                    className="h-8 flex items-center justify-end pr-2 text-xs text-gray-500"
                  >
                    {format(setMinutes(setHours(new Date(), hour), minutes), 'h:mm a')}
                  </div>
                ))}
              </div>

              {/* Days columns */}
              {days.map((day, dayIndex) => (
                <div key={dayIndex} className="col-span-1">
                  <div className="h-10 flex flex-col items-center justify-center text-center">
                    <div className="text-sm font-medium">
                      {format(day, 'EEE')}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(day, 'MMM d')}
                    </div>
                  </div>

                  {timeSlots.map(({ hour, minutes }, timeIndex) => {
                    const slotTime = setMinutes(setHours(day, hour), minutes);
                    const isSelected = selectedSlots.some(
                      slot => slot.getTime() === slotTime.getTime()
                    );
                    const isSelectable = isTimeSlotSelectable(slotTime);

                    return (
                      <button
                        key={`${dayIndex}-${timeIndex}`}
                        className={`
                          w-full h-8 border border-gray-100 transition-colors
                          ${isSelected ? 'bg-squash-primary/20 border-squash-primary' : 'hover:bg-gray-50'}
                          ${!isSelectable ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                        onClick={() => toggleTimeSlot(day, hour, minutes)}
                        disabled={!isSelectable}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              {selectedSlots.length === 0 ? (
                <p>No time slots selected</p>
              ) : (
                <div>
                  <p className="font-medium mb-2">Selected times:</p>
                  <ul className="space-y-1">
                    {selectedSlots.map((slot, index) => (
                      <li key={index}>
                        {format(slot, 'EEEE, MMMM d, h:mm a')}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Button
              className="w-full bg-squash-primary hover:bg-squash-primary/90"
              onClick={handleSubmit}
            >
              Submit Selected Times
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeSelector;