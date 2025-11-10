import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';

const BrandCard = ({ productImage, brandLogo, brandName, tagline, onPress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.card}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {/* Product Image Section */}
      <View style={styles.imageContainer}>
        <Image source={productImage} style={styles.productImage} resizeMode="cover" />
      </View>

      {/* Brand Info Section */}
      <View style={styles.brandContainer}>
        {brandLogo ? (
          <Image source={brandLogo} style={styles.brandLogo} resizeMode="contain" />
        ) : (
          <>
            <Text style={styles.brandName}>{brandName}</Text>
            <Text style={styles.tagline}>{tagline}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default BrandCard;

const CARD_WIDTH = Dimensions.get('window').width * 0.35;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BFBFBF',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: CARD_WIDTH * 1.2, // give slightly more height for full fit
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // ensures full image fits
  },
  brandContainer: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  brandLogo: {
    height: 30,
    width: '50%',
  },
  brandName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
