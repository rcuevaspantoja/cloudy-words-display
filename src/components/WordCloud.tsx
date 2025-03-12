
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Word {
  text: string;
  value?: number;
}

interface WordCloudProps {
  words: Word[] | string[];
  width: number;
  height: number;
  className?: string;
}

export const WordCloud: React.FC<WordCloudProps> = ({
  words,
  width,
  height,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [processedWords, setProcessedWords] = useState<Array<{
    text: string;
    value: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    fontWeight: string;
  }>>([]);

  // Process words on mount or when words change
  useEffect(() => {
    if (!words.length) return;

    // Normalize words array to have a consistent format
    const normalizedWords = words.map((word) => {
      if (typeof word === "string") {
        return { text: word, value: Math.floor(Math.random() * 10) + 1 };
      }
      return {
        text: (word as Word).text,
        value: (word as Word).value || Math.floor(Math.random() * 10) + 1,
      };
    });

    // Find the word with the highest value to calculate relative sizes
    const maxValue = Math.max(...normalizedWords.map((w) => w.value as number));
    const minValue = Math.min(...normalizedWords.map((w) => w.value as number));
    
    // Calculate font size range
    const minFontSize = 14; 
    const maxFontSize = 48;

    // Place words with collision detection
    const placedWords: Array<{
      text: string;
      value: number;
      x: number;
      y: number;
      size: number;
      opacity: number;
      fontWeight: string;
    }> = [];

    // Function to check if a new word position overlaps with existing words
    const checkOverlap = (x: number, y: number, width: number, height: number) => {
      for (const word of placedWords) {
        const wordWidth = word.text.length * (word.size * 0.6);
        const wordHeight = word.size;
        
        // Simple box collision detection
        if (
          x < word.x + wordWidth &&
          x + width > word.x &&
          y < word.y + wordHeight &&
          y + height > word.y
        ) {
          return true; // Overlap detected
        }
      }
      return false; // No overlap
    };

    // Process each word
    normalizedWords.forEach((word) => {
      const value = word.value as number;
      
      // Calculate size proportionally to its value
      const size = 
        minFontSize + ((value - minValue) / (maxValue - minValue)) * (maxFontSize - minFontSize);
      
      // Calculate opacity based on size (bigger words are more opaque)
      const opacity = 0.7 + (size - minFontSize) / (maxFontSize - minFontSize) * 0.3;
      
      // Choose font weight (bigger words get bolder)
      const fontWeight = size > (minFontSize + maxFontSize) / 2 ? "600" : "400";
      
      // Simple word width estimation
      const wordWidth = word.text.length * (size * 0.6);
      const wordHeight = size;
      
      // Try to place the word without overlapping (maximum 100 attempts)
      let placed = false;
      let attempts = 0;
      let x = 0;
      let y = 0;
      
      while (!placed && attempts < 100) {
        x = Math.random() * (width - wordWidth);
        y = Math.random() * (height - wordHeight);
        
        if (!checkOverlap(x, y, wordWidth, wordHeight)) {
          placed = true;
        }
        
        attempts++;
      }
      
      // If we couldn't place without overlap after 100 attempts, just place it anyway
      placedWords.push({
        text: word.text,
        value,
        x,
        y,
        size,
        opacity,
        fontWeight,
      });
    });
    
    setProcessedWords(placedWords);
  }, [words, width, height]);

  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100", className)}
      style={{ width, height }}
    >
      {processedWords.map((word, index) => (
        <div
          key={`${word.text}-${index}`}
          className="absolute transition-all duration-700 ease-in-out animate-fade-in"
          style={{
            left: word.x,
            top: word.y,
            fontSize: `${word.size}px`,
            opacity: word.opacity,
            fontWeight: word.fontWeight,
            transform: `rotate(${Math.random() * 4 - 2}deg)`,
            color: "#333",
          }}
        >
          {word.text}
        </div>
      ))}
    </div>
  );
};

export default WordCloud;
