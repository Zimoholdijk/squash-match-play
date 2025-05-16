
import React from 'react';
import { AvailabilityType } from '@/contexts/UserContext';

interface AvailabilitySelectorProps {
  availability: AvailabilityType;
  onChange: (availability: AvailabilityType) => void;
}

const AvailabilitySelector: React.FC<AvailabilitySelectorProps> = ({ availability, onChange }) => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const timeSlots = ['morning', 'afternoon', 'evening'];
  const timeLabels = ['Morning', 'Afternoon', 'Evening'];

  const handleToggle = (day: string, timeSlot: string) => {
    const newAvailability = { ...availability };
    newAvailability[day] = {
      ...newAvailability[day],
      [timeSlot]: !newAvailability[day][timeSlot as keyof typeof newAvailability[typeof day]]
    };
    onChange(newAvailability);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-8 gap-1 mb-2">
        <div className="col-span-1"></div>
        {dayLabels.map((day, index) => (
          <div key={index} className="col-span-1 text-center text-xs font-medium">
            {day}
          </div>
        ))}
      </div>
      
      {timeSlots.map((timeSlot, timeIndex) => (
        <div key={timeSlot} className="grid grid-cols-8 gap-1 mb-4">
          <div className="col-span-1 flex items-center">
            <span className="text-xs font-medium">{timeLabels[timeIndex]}</span>
          </div>
          
          {days.map((day) => (
            <div key={day} className="col-span-1 flex justify-center items-center">
              <button
                type="button"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  availability[day][timeSlot as keyof typeof availability[typeof day]] 
                    ? 'bg-squash-primary text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
                }`}
                onClick={() => handleToggle(day, timeSlot)}
              >
                {availability[day][timeSlot as keyof typeof availability[typeof day]] ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : null}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AvailabilitySelector;
