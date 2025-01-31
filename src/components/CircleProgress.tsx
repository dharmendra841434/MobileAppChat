import React from 'react';
import {View, Text} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import appColors from '../constant/appColors';

interface CircleProgressProps {
  progress: number; // Progress percentage (0-100)
  size?: number; // Size of the circle
  strokeWidth?: number; // Thickness of the circle
}

const CircleProgress: React.FC<CircleProgressProps> = ({
  progress,
  size = 100,
  strokeWidth = 10,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <View className="items-center justify-center">
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb" // Tailwind gray-300
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={appColors.background} // Tailwind blue-500
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <Text className="absolute text-lg font-bold text-background">
        {progress}%
      </Text>
    </View>
  );
};

export default CircleProgress;
