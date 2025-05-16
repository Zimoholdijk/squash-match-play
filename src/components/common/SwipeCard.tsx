
import React, { useState } from 'react';

interface SwipeCardProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  children: React.ReactNode;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ onSwipeLeft, onSwipeRight, children }) => {
  const [startX, setStartX] = useState<number | null>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setOffsetX(diff);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (startX === null) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setOffsetX(diff);
  };
  
  const handleTouchEnd = () => {
    if (offsetX > 100) {
      setSwipeDirection('right');
      setTimeout(() => {
        onSwipeRight();
        resetSwipe();
      }, 500);
    } else if (offsetX < -100) {
      setSwipeDirection('left');
      setTimeout(() => {
        onSwipeLeft();
        resetSwipe();
      }, 500);
    } else {
      resetSwipe();
    }
  };
  
  const handleMouseUp = () => {
    if (offsetX > 100) {
      setSwipeDirection('right');
      setTimeout(() => {
        onSwipeRight();
        resetSwipe();
      }, 500);
    } else if (offsetX < -100) {
      setSwipeDirection('left');
      setTimeout(() => {
        onSwipeLeft();
        resetSwipe();
      }, 500);
    } else {
      resetSwipe();
    }
  };
  
  const resetSwipe = () => {
    setStartX(null);
    setOffsetX(0);
    setSwipeDirection(null);
  };
  
  const getCardClass = () => {
    if (swipeDirection === 'left') {
      return 'animate-swipe-left';
    }
    if (swipeDirection === 'right') {
      return 'animate-swipe-right';
    }
    return '';
  };
  
  return (
    <div 
      className={`swipe-card ${getCardClass()}`}
      style={{ 
        transform: `translateX(${offsetX}px) rotate(${offsetX * 0.05}deg)`,
        transition: startX === null ? 'transform 0.3s ease' : 'none'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={resetSwipe}
    >
      {children}
    </div>
  );
};

export default SwipeCard;
