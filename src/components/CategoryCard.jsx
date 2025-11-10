import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window'); // Get screen width for dynamic sizing

const CategoryCard = ({ title, imageSource, itemsPerRow = 4 }) => {
  // Calculate card width based on screen width, accounting for padding and gaps
  const cardWidth = (width - 30 - 10 * (itemsPerRow - 1)) / itemsPerRow; // 24 for paddingHorizontal, 10 for gap

  return (
    <View style={[styles.container, { width: cardWidth }]}>
      <View style={styles.card}>
        <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
          <Defs>
            <RadialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <Stop offset="0%" stopColor="#676AFF" stopOpacity="1" />
              <Stop offset="100%" stopColor="#262757" stopOpacity="1" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
        </Svg>

        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.label}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 16,
  },
  card: {
    aspectRatio: 1,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%', // Slightly smaller to fit within the card
    height: '100%',
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
});

export default CategoryCard;