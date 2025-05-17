
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format, addDays, startOfWeek, setHours, setMinutes, isBefore, addWeeks, subWeeks } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  onSubmit: (selectedSlots: Date[]) => void;
  viewMode?: 'select' | 'confirm';
  preSelectedSlots?: Date[];
  onConfirm?: (selectedSlot: Date) => void;
}

const TimeSelector: React.FC<Props> = ({ 
  onSubmit, 
  viewMode = 'select',
  preSelectedSlots = [],
  onConfirm
}) => {
  const { toast } = useToast();
  const [selectedSlots, setSelectedSlots] = useState<Date[]>(preSelectedSlots);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [confirmSlot, setConfirmSlot] = useState<Date | null>(null);
  
  // Generate time slots for the week
  const days = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  
  // Reduced time slots to end at 9:30 PM (instead of 10:00+ PM)
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = Math.floor(i / 2) + 6; // Start at 6 AM
    const minutes = (i % 2) * 30; // Alternate between 0 and 30 minutes
    return { hour, minutes };
  });

  const isTimeSlotSelectable = (date: Date) => {
    const now = new Date();
    return !isBefore(date, now);
  };

  const isTimeSlotAvailable = (date: Date) => {
    if (viewMode === 'confirm' && preSelectedSlots.length > 0) {
      return preSelectedSlots.some(slot => slot.getTime() === date.getTime());
    }
    return true;
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

    if (viewMode === 'confirm') {
      if (!isTimeSlotAvailable(slotTime)) {
        toast({
          title: "Time not available",
          description: "This time slot is not available for selection.",
          variant: "destructive",
        });
        return;
      }
      setConfirmSlot(slotTime);
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
    if (viewMode === 'select') {
      if (selectedSlots.length === 0) {
        toast({
          title: "No time slots selected",
          description: "Please select at least one time slot.",
          variant: "destructive",
        });
        return;
      }
      onSubmit(selectedSlots);
    } else if (viewMode === 'confirm' && confirmSlot && onConfirm) {
      onConfirm(confirmSlot);
    } else {
      toast({
        title: "No time slot selected",
        description: "Please select a time slot to confirm.",
        variant: "destructive",
      });
    }
  };

  const navigateWeek = (direction: 'next' | 'previous') => {
    setCurrentWeekStart(prev => 
      direction === 'next' ? addWeeks(prev, 1) : subWeeks(prev, 1)
    );
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Select potential start times</h2>
            <p className="text-sm text-gray-600">
              Click on times you are available to start a 45-1 hour game
            </p>
          </div>

          <div className="flex justify-between items-center my-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateWeek('previous')}
              className="flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous Week
            </Button>
            
            <span className="text-sm font-medium">
              {format(currentWeekStart, 'MMM d')} - {format(addDays(currentWeekStart, 6), 'MMM d, yyyy')}
            </span>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateWeek('next')}
              className="flex items-center"
            >
              Next Week
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="relative">
            <div className="grid grid-cols-8 gap-1 sticky top-0 z-10 bg-white pt-2 pb-2">
              <div className="col-span-1"></div>
              {days.map((day, index) => (
                <div key={index} className="col-span-1 text-center">
                  <div className="text-sm font-medium">
                    {format(day, 'EEE')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {format(day, 'MMM d')}
                  </div>
                </div>
              ))}
            </div>

            <ScrollArea className="h-[400px] pr-4">
              <div className="grid grid-cols-8 gap-1">
                {/* Time column */}
                <div className="col-span-1 sticky left-0 bg-white z-10">
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
                    {timeSlots.map(({ hour, minutes }, timeIndex) => {
                      const slotTime = setMinutes(setHours(day, hour), minutes);
                      const isSelected = viewMode === 'select' 
                        ? selectedSlots.some(slot => slot.getTime() === slotTime.getTime())
                        : confirmSlot?.getTime() === slotTime.getTime();
                      const isSelectable = isTimeSlotSelectable(slotTime);
                      const isAvailable = isTimeSlotAvailable(slotTime);

                      return (
                        <button
                          key={`${dayIndex}-${timeIndex}`}
                          className={`
                            w-full h-8 border border-gray-100 transition-colors
                            ${isSelected ? 'bg-squash-primary/20 border-squash-primary' : 'hover:bg-gray-50'}
                            ${!isSelectable || (viewMode === 'confirm' && !isAvailable) ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'}
                            ${viewMode === 'confirm' && isAvailable ? 'bg-green-50 hover:bg-green-100' : ''}
                          `}
                          onClick={() => toggleTimeSlot(day, hour, minutes)}
                          disabled={!isSelectable || (viewMode === 'confirm' && !isAvailable)}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <Button
            className="w-full bg-squash-primary hover:bg-squash-primary/90"
            onClick={handleSubmit}
            disabled={viewMode === 'confirm' && !confirmSlot}
          >
            {viewMode === 'select' ? 'Submit Selected Times' : 'Confirm This Time'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeSelector;
