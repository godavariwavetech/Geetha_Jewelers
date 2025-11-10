import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import commonstyles from '../commonstyles/commonstyles';

const ProductCard = ({
  image,
  brand,
  title,
  mrp,
  badge = 'Hot Deal',
  isWishlisted = false,
  onWishlistPress,
  onPress,
  salePrice,
  isLoading,
  disabled = false,
}) => {
  // Calculate discount percentage
  const calculateDiscount = () => {
    if (!mrp || !salePrice) return null;
    const discount = ((mrp - salePrice) / mrp) * 100;
    return Math.round(discount); // Round to nearest integer
  };

  const discountPercentage = calculateDiscount();

  return (
    <TouchableOpacity
      style={[styles.card, disabled && styles.disabledCard]}
      onPress={disabled ? null : onPress}
      activeOpacity={disabled ? 1 : 0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={image}
          style={[styles.image, disabled && styles.disabledImage]}
          resizeMode="cover"
        />

        {/* Regular Top-Left Badge */}
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}

        {/* Centered OUT OF STOCK badge */}
        {disabled && (
          <View style={styles.outOfStockTextWrapper}>
            <Text style={styles.outOfStockText}>OUT OF STOCK</Text>
          </View>
        )}

        {/* Wishlist Icon */}
        {isLoading ? (
          <View style={styles.heartIcon}>
            <ActivityIndicator color="#000" size="small" />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.heartIcon}
            onPress={onWishlistPress}
            disabled={disabled}
          >
            <Ionicons
              name={isWishlisted ? 'heart' : 'heart-outline'}
              size={20}
              color={isWishlisted ? 'red' : 'gray'}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.textContainer}>
        <Text
          style={[commonstyles.text13, { color: '#343434' }]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{salePrice}</Text>
          <Text style={styles.mrpLabel}>₹{mrp}</Text>
          {discountPercentage !== null && discountPercentage > 0 && (
            <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
          )}
        </View>

        <Text style={styles.brand}>{brand}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: responsiveWidth(45),
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: responsiveWidth(2),
    marginHorizontal: responsiveWidth(1),
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 2 / 2.8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  disabledImage: {
    opacity: 0.5,
  },
  textContainer: {
    justifyContent: 'flex-start',
    marginTop: responsiveHeight(0.5),
    paddingHorizontal: 2,
    paddingBottom: responsiveHeight(1),
  },
  badge: {
    position: 'absolute',
    top: 6,
    left: 1,
    backgroundColor: '#F00',
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 2,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 25,
  },
  badgeText: {
    color: '#fff',
    fontSize: responsiveFontSize(1.4),
    fontWeight: '500',
  },
  heartIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 2,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: responsiveHeight(0.5),
  },
  mrpLabel: {
    textDecorationLine: 'line-through',
    color: '#999',
    fontSize: responsiveFontSize(1.6),
    marginRight: 6,
  },
  price: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#000',
  },
  brand: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '600',
    color: '#333',
    marginTop: responsiveHeight(0.5),
  },
  disabledCard: {
    opacity: 0.5,
  },
  outOfStockTextWrapper: {
    position: 'absolute',
    top: '70%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  outOfStockText: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: '#FF0000', // Red color for discount text
    fontSize: responsiveFontSize(1.6),
    fontWeight: '600',
  },
});

export default ProductCard;