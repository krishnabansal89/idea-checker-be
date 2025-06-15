import React, { useState, useEffect } from 'react';

interface LinearLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
  duration?: number; // in milliseconds
}

const LinearLoader: React.FC<LinearLoaderProps> = ({ 
  isLoading, 
  onComplete,
  duration = 90000 // 1 minute default
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = 100 / (duration / 100); // Update every 100ms
        const newProgress = prev + increment;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          onComplete?.();
          return 100;
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading, duration, onComplete]);

  if (!isLoading && progress === 0) return null;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Loading results...
        </span>
        <span className="text-sm text-gray-500">
          {Math.round(progress)}%
        </span>
      </div>
      
      <div 
        className="w-full bg-white rounded-full h-2 border"
        style={{ borderColor: 'rgba(23, 23, 23, 0.2)' }}
      >
        <div
          className="h-2 rounded-full transition-all duration-100 ease-out"
          style={{
            width: `${progress}%`,
            backgroundColor: '#72e3ad'
          }}
        />
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        Estimated time: {Math.max(0, Math.ceil((100 - progress) * duration / 100000))}s remaining
      </div>
    </div>
  );
};


export default LinearLoader;