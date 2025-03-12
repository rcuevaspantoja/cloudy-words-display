
import React from "react";
import WordCloud from "@/components/WordCloud";

const Index = () => {
  const words = [
    { text: "sunset blush", value: 30 },
    { text: "dark skin", value: 20 },
    { text: "pregnant and nursing people", value: 16 },
    { text: "micro beauty", value: 18 },
    { text: "broccoli Freckles", value: 12 },
    { text: "succinic acid", value: 14 },
    { text: "sugar plum fairy", value: 18 },
    { text: "olive skin", value: 16 },
    { text: "pearl Skin", value: 14 },
    { text: "Face yoga", value: 10 },
    { text: "boyfriend blush", value: 14 },
    { text: "latte makeup", value: 12 },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-light tracking-tight">Beauty Trends</h1>
          <p className="text-gray-500">Popular beauty concepts visualized in a word cloud</p>
        </div>
        
        <div className="relative w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-white backdrop-blur-sm">
          <WordCloud 
            words={words} 
            width={800} 
            height={500} 
            className="max-w-full h-auto mx-auto"
          />
        </div>
        
        <div className="text-center text-sm text-gray-400 pt-4">
          <p>Word size indicates relative popularity among beauty enthusiasts</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
