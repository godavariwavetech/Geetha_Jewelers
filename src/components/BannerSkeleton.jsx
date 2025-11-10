import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const BannerSkeleton = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item
        width="90%"
        height={180}
        alignSelf="center"
        borderRadius={8}
      />
    </SkeletonPlaceholder>
  );
};

export default BannerSkeleton;
