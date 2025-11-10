// CircularTimer.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CircularTimer = ({ progress = 0.75, time = 120 }) => {
  const size = 50;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - circumference * progress;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          stroke="#E0E0E0"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <Circle
          stroke="url(#262757)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      {/* Centered Text */}
      <View style={styles.textContainer}>
        <Text style={styles.timeText}>{time}</Text>
        <Text style={styles.unitText}>Mins</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  unitText: {
    fontSize: 12,
    color: '#1A1A1A',
  },
});

export default CircularTimer;
