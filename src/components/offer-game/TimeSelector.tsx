import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  onSubmit: (date: Date, time: string, duration: string, location: string) => void;
}

const TimeSelector: React.FC<Props> = ({ onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [location, setLocation] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!selectedDate) {
      toast({
        title: "Please select a date",
        variant: "destructive",
      });
      return;
    }

    if (!selectedTime) {
      toast({
        title: "Please select a time",
        variant: "destructive",
      });
      return;
    }

    if (!location) {
      toast({
        title: "Please enter a location",
        variant: "destructive",
      });
      return;
    }

    onSubmit(selectedDate, selectedTime, duration, location);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Select Game Time</h2>
            <p className="text-sm text-gray-600">
              Choose when and where you'd like to play.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="mb-2 block">Select Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="border rounded-md"
                disabled={(date) => date < new Date()}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="time">Select Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 13 }, (_, i) => i + 8).map((hour) => (
                      <SelectItem key={hour} value={`${hour}:00`}>
                        {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter court location"
                />
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-squash-primary hover:bg-squash-primary/90"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeSelector;