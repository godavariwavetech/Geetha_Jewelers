import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const BrandSkeleton = () => {
  return (
    <SkeletonPlaceholder borderRadius={8}>
      <View style={{ flexDirection: 'row', paddingHorizontal: 10, gap: 10 }}>
        {[1, 2, 3, 4].map((_, index) => (
          <View key={index} style={{ alignItems: 'center', marginRight: 10 }}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 8,
              }}
            />
            <View
              style={{
                width: 60,
                height: 12,
                borderRadius: 4,
                marginTop: 6,
              }}
            />
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

export default BrandSkeleton;
