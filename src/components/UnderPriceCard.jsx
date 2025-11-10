import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const UnderPriceCard = ({ headline, subline1, subline2, promoImage }) => {
  return (
    <LinearGradient
      colors={['#5E61EB', '#262757']}
      style={styles.card}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.textContainer}>
        <Text style={styles.headline} numberOfLines={1}>
          {headline}
        </Text>
        <Text style={styles.subline} numberOfLines={1}>{subline1}</Text>
        <Text style={styles.subline} numberOfLines={1}>{subline2}</Text>
      </View>
      <Image source={promoImage} style={styles.image} resizeMode="contain" />
    </LinearGradient>
  );
};

export default UnderPriceCard;

const { width: screenWidth } = Dimensions.get('window');
const CARD_MARGIN = 2;
const CARDS_PER_ROW = 3;

// Compute card width and height
const CARD_WIDTH = (screenWidth - (CARD_MARGIN * (CARDS_PER_ROW + 1))) / CARDS_PER_ROW;
const CARD_HEIGHT = 145; // fixed height as you want

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    padding: 10,
    marginHorizontal: CARD_MARGIN / 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    alignItems: 'center',
  },
  headline: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  subline: {
    fontSize: 10,
    color: '#fff',
  },
  image: {
    width: '120%',
    height: '82%',
  },
});
