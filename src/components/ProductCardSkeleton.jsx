import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ProductCardSkeleton = ({ count = 1 }) => {
  return (
    <SkeletonPlaceholder borderRadius={8}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 10 ,gap:5}}>
        {[...Array(count)].map((_, index) => (
          <View
            key={index}
            style={{
              width: 170,
              borderRadius: 8,
              backgroundColor: '#fff',
              marginBottom: 15,
              overflow: 'hidden',
            }}
          >
            {/* Image with badge and heart */}
            <View style={{ width: '100%', height: 200, borderRadius: 8 }} />
            {/* Text Section */}
            <View style={{ padding: 8 }}>
              <View style={{ width: '90%', height: 14, marginBottom: 6, borderRadius: 4 }} />
              <View style={{ width: '60%', height: 14, marginBottom: 6, borderRadius: 4 }} />
              <View style={{ width: '40%', height: 14, marginBottom: 10, borderRadius: 4 }} />
            </View>
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

export default ProductCardSkeleton;
