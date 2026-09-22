import React, { useEffect, useState } from 'react';
import { SpiderIcon } from './Icons';

interface SplashProps {
  onAnimationComplete: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onAnimationComplete }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start animation shortly after mount
    const startTimer = setTimeout(() => setIsAnimating(true), 100);

    // Trigger exit animation after intro animations are complete
    const exitTimer = setTimeout(() => setIsExiting(true), 2200);

    // Let parent know animation is totally done and component can be unmounted
    const completeTimer = setTimeout(onAnimationComplete, 3000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black text-white overflow-hidden ${isExiting ? 'animate-slide-up' : ''}`}
    >
      <div className={`relative w-[150px] h-[150px] flex items-center justify-center transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
        {/* Deconstructed 'H' logo with animations */}
        <div className="absolute left-0 w-8 h-full bg-white animate-slide-in-left"></div>
        <div className="absolute right-0 w-8 h-full bg-white animate-slide-in-right"></div>
        <div className="absolute w-[calc(100%-4rem)] h-8 bg-white animate-fade-in-scale"></div>
        <div className="absolute right-[-35px] bottom-[-10px] w-8 h-8 rounded-full bg-white animate-fade-in-dot"></div>
        <div className="absolute top-[-30px] right-[55px] text-white animate-spider-drop">
          <SpiderIcon className="spider-sway w-6 h-9" />
        </div>
      </div>
    </div>
  );
};