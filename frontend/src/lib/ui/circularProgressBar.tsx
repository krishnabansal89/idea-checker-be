import React from "react";

interface CircularProgressBarProps {
  value: number; // between 0 and 100
  size?: number; // diameter in px
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  fontSize?: number;
}

export const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  value,
  size = 40,
  strokeWidth = 4,
  color = "#22c55e",    // tailwind 'green-500'
  bgColor = "#e5e7eb",  // tailwind 'gray-200'
  fontSize = 10,
}) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(100, Math.max(0, value));
  const offset = circumference * (1 - clampedValue / 100);

  return (
    <svg width={size} height={size}>
      {/* Background circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={bgColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Progress arc */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s" }}
        transform={`rotate(-90 ${center} ${center})`} // Start at 12 o'clock
      />
      {/* Percentage text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".35em"
        fontSize={fontSize}
        fill={color}
        fontWeight="bold"
      >
        {`${clampedValue}%`}
      </text>
    </svg>
  );
};
