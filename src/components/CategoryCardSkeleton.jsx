import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const CategoryCardSkeleton = () => {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder
        borderRadius={16}
        backgroundColor="#E0E0E0" // Lighter background for visibility
        highlightColor="#F5F5F5" // Subtle highlight for shimmer effect
      >
        <View style={styles.card} />
        <View style={styles.label} />
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 16,
  },
  card: {
    width: 90, // Match CategoryCard width
    height: 110, // Match CategoryCard height
    borderRadius: 16,
  },
  label: {
    marginTop: 8,
    width: 60, // Fixed width for label to match typical category name length
    height: 12,
    borderRadius: 4,
    alignSelf: 'center',
  },
});

export default CategoryCardSkeleton;