
import React from 'react';

interface StarRatingProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  value, 
  max = 5, 
  onChange, 
  size = 'md',
  readonly = false
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className="flex">
      {[...Array(max)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={index}
            type="button"
            className={`${readonly ? 'cursor-default' : 'cursor-pointer'} p-1`}
            onClick={() => onChange && onChange(starValue)}
            disabled={readonly}
          >
            <svg
              className={`${sizeClasses[size]} ${
                value >= starValue 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-300 fill-gray-300'
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
            </svg>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
