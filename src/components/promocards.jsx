import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const PADDING_HORIZONTAL = 9;
const CARD_WIDTH = width - 2 * PADDING_HORIZONTAL;

const Banners = ({ banners = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const autoScrollRef = useRef(null);
  useEffect(() => {
    if (banners.length <= 1) return;
    autoScrollRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 3000);
    return () => clearInterval(autoScrollRef.current);
  }, [currentIndex, banners.length]);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / CARD_WIDTH);
    setCurrentIndex(index);
  };

  const handleTouchStart = () => clearInterval(autoScrollRef.current);

  const handleTouchEnd = () => {
    if (banners.length <= 1) return;
    autoScrollRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 3000);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      <ImageBackground
        source={item.banner_image}
        style={styles.card}
        imageStyle={styles.backgroundImage}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={banners}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        getItemLayout={(_, index) => ({
          length: CARD_WIDTH,
          offset: CARD_WIDTH * index,
          index,
        })}
        scrollEventThrottle={16}
      />

      {/* 
      <View style={styles.dotsContainer}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === currentIndex && styles.activeDot]}
          />
        ))}
      </View>
      */}
    </View>
  );
};

export default Banners;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    width: CARD_WIDTH,
    height: 180,
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: PADDING_HORIZONTAL / 8,
    backgroundColor: '#eee',
  },
  card: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
   
  },
  flatListContent: {
    paddingHorizontal: PADDING_HORIZONTAL / 2,
  },
  // dotsContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   marginTop: 10,
  // },
  // dot: {
  //   width: 6,
  //   height: 6,
  //   borderRadius: 3,
  //   backgroundColor: '#EF9A9A',
  //   marginHorizontal: 3,
  // },
  // activeDot: {
  //   backgroundColor: '#8655d2',
  //   width: 19,
  // },
});
