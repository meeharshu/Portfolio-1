
import React, { useState, useEffect, useRef } from 'react';

interface ShuffleTextProps {
  text: string;
  isShuffling: boolean;
  shuffleInterval?: number;
  shuffleProbability?: number; // Probability of a char changing per frame (0 to 1)
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?';

export const ShuffleText: React.FC<ShuffleTextProps> = ({ 
  text, 
  isShuffling, 
  shuffleInterval = 120, 
  shuffleProbability = 0.1 // 10% chance
}) => {
  const [displayedText, setDisplayedText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isShuffling) {
      intervalRef.current = window.setInterval(() => {
        const newText = text
          .split('')
          .map((char) => {
            if (char === ' ') return ' ';
            if (Math.random() < shuffleProbability) {
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            }
            return char;
          })
          .join('');
        setDisplayedText(newText);
      }, shuffleInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDisplayedText(text);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isShuffling, text, shuffleInterval, shuffleProbability]);

  return <span aria-label={text} role="text">{displayedText}</span>;
};
