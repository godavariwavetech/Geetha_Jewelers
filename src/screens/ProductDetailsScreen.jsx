import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
  FlatList
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ProductDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  // Sample product images - replace with your actual images
  const productImages = [
    require('../assets/earrings.png'),
    require('../assets/earrings.png'),
    require('../assets/earrings.png'),
    require('../assets/earrings.png'),
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('16');
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  
  const scrollViewRef = useRef(null);

  const sizes = [
    { size: '16', items: '2 items' },
    { size: '17', items: '' },
    { size: '17.5', items: '' },
    { size: '18', items: '' },
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderThumbnail = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => setSelectedImageIndex(index)}
      style={[
        styles.thumbnailContainer,
        selectedImageIndex === index && styles.selectedThumbnail
      ]}
    >
      <Image source={item} style={styles.thumbnailImage} resizeMode="contain" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }}>
  <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 4 }}>
    <Ionicons name="arrow-back" size={24} color="#000" />
  </TouchableOpacity>
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
    <TouchableOpacity style={{ padding: 4 }}>
      <Ionicons name="search-outline" size={24} color="#000" />
    </TouchableOpacity>
    <TouchableOpacity style={{ padding: 4 }}>
      <Ionicons name="home-outline" size={24} color="#000" />
    </TouchableOpacity>
    <TouchableOpacity style={{ padding: 4 }}>
      <Ionicons name="notifications-outline" size={24} color="#000" />
    </TouchableOpacity>
  </View>
</View>

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Product Image */}
        <View style={styles.mainImageContainer}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "#FF0000" : "#000"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="arrow-redo-outline" size={24} color="#000" />
          </TouchableOpacity>
          
          <Image
            source={productImages[selectedImageIndex]}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </View>

        {/* Thumbnail Images */}
        <FlatList
          data={productImages}
          renderItem={renderThumbnail}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailList}
        />

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>Arch of Royalty Gold Ear Ring</Text>
          <Text style={styles.productSku}>SKU ID : 455445645454564ED454</Text>
          
          {/* Price */}
          <Text style={styles.price}>₹37,869</Text>
          <TouchableOpacity>
            <Text style={styles.priceBreakup}>Price Breakup</Text>
          </TouchableOpacity>

          {/* Gold Weight and Karat Info */}
          <View style={styles.infoRow}>
            <View style={styles.infoCard}>
              <Ionicons name="ellipse" size={16} color="#FFD700" />
              <Text style={styles.infoLabel}>18 Karat</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="scale-outline" size={16} color="#FFD700" />
              <Text style={styles.infoLabel}>3.096g</Text>
            </View>
          </View>

          {/* Available Sizes */}
          <View style={styles.sizesSection}>
            <View style={styles.sizeHeader}>
              <Text style={styles.sizeTitle}>Available Sizes</Text>
              <TouchableOpacity>
                <Text style={styles.howToMeasure}>How To Measure</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.sizeOptions}>
              {sizes.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.sizeButton,
                    selectedSize === item.size && styles.selectedSizeButton
                  ]}
                  onPress={() => setSelectedSize(item.size)}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === item.size && styles.selectedSizeText
                    ]}
                  >
                    {item.size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.itemsAvailable}>2 items</Text>
          </View>

          {/* Product Details Section */}
          <Text style={styles.sectionTitle}>Product Details</Text>

          {/* Metal Details Accordion */}
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => toggleSection('metal')}
          >
            <View style={styles.accordionHeaderLeft}>
              <Ionicons name="diamond-outline" size={20} color="#000" />
              <Text style={styles.accordionTitle}>METAL DETAILS</Text>
            </View>
            <Ionicons
              name={expandedSection === 'metal' ? "chevron-up" : "chevron-down"}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
          {expandedSection === 'metal' && (
            <View style={styles.accordionContent}>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>18K</Text>
                  <Text style={styles.detailValue}>Karatage</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Yellow</Text>
                  <Text style={styles.detailValue}>Material Colour</Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>3.096g</Text>
                  <Text style={styles.detailValue}>Gross Weight</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Gold</Text>
                  <Text style={styles.detailValue}>Metal</Text>
                </View>
              </View>
            </View>
          )}

          {/* General Details Accordion */}
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => toggleSection('general')}
          >
            <View style={styles.accordionHeaderLeft}>
              <Ionicons name="information-circle-outline" size={20} color="#000" />
              <Text style={styles.accordionTitle}>GENERAL DETAILS</Text>
            </View>
            <Ionicons
              name={expandedSection === 'general' ? "chevron-up" : "chevron-down"}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
          {expandedSection === 'general' && (
            <View style={styles.accordionContent}>
              <Text style={styles.accordionText}>General details content goes here...</Text>
            </View>
          )}

          {/* Description Accordion */}
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => toggleSection('description')}
          >
            <View style={styles.accordionHeaderLeft}>
              <Ionicons name="document-text-outline" size={20} color="#000" />
              <Text style={styles.accordionTitle}>DESCRIPTION</Text>
            </View>
            <Ionicons
              name={expandedSection === 'description' ? "chevron-up" : "chevron-down"}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
          {expandedSection === 'description' && (
            <View style={styles.accordionContent}>
              <Text style={styles.accordionText}>Product description goes here...</Text>
            </View>
          )}

          {/* Smart Savings Banner */}
          <TouchableOpacity style={styles.savingsBanner}>
            <Image
              source={require('../assets/diamondbanner.png')}
              style={styles.savingsBannerImage}
              resizeMode="cover"
            />
            <View style={styles.savingsBannerContent}>
              <Text style={styles.savingsBannerTitle}>Smart Savings Schemes</Text>
              <Text style={styles.savingsBannerText}>
                Join flexible gold saving plans and grow your wealth with ease.
              </Text>
            </View>
            <TouchableOpacity style={styles.exploreBadge}>
              <Ionicons name="arrow-forward-circle" size={28} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity>

          {/* You May Also Like */}
          <Text style={styles.sectionTitle}>You may also like</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.similarProducts}>
              {[1, 2].map((item, index) => (
                <View key={index} style={styles.similarProductCard}>
                  <TouchableOpacity style={styles.similarFavorite}>
                    <Ionicons name="heart-outline" size={18} color="#666" />
                  </TouchableOpacity>
                  <Image
                    source={require('../assets/earrings.png')}
                    style={styles.similarProductImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.similarProductName} numberOfLines={2}>
                    Arch of Royalty Gold Finger Ring
                  </Text>
                  <View style={styles.similarPriceRow}>
                    <Text style={styles.similarPrice}>₹37,869</Text>
                    <Text style={styles.similarOriginalPrice}>₹40,869</Text>
                  </View>
                  <View style={styles.similarDiscount}>
                    <Text style={styles.similarDiscountText}>10%off making charges</Text>
                  </View>
                  <View style={styles.similarRating}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.similarRatingText}>4.5 (20k reviews)</Text>
                  </View>
                  <View style={styles.similarButtons}>
                    <TouchableOpacity style={styles.viewSimilarBtn}>
                      <Text style={styles.viewSimilarBtnText}>View Similar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cartBtn}>
                      <Ionicons name="cart-outline" size={16} color="#08765A" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Bottom Banner */}
          <Image
            source={require('../assets/diamondbanner.png')}
            style={styles.bottomBanner}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.exploreNowButton}>
            <Text style={styles.exploreNowText}>Explore Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add to Cart Button - Fixed at bottom */}
      <TouchableOpacity >
      <View style={[styles.addToCartContainer, { bottom: insets.bottom+15 }]}>
        <TouchableOpacity style={styles.addToCartButton}onPress={()=>{navigation.navigate("Cart")}} >
          <Ionicons name="cart-outline" size={20} color="#fff" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerButton: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  mainImageContainer: {
    width: width,
    height: width * 0.8,
    backgroundColor: '#f9f9f9',
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shareButton: {
    position: 'absolute',
    top: 60,
    right: 16,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnailList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  thumbnailContainer: {
    width: 70,
    height: 70,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    marginRight: 12,
    padding: 4,
    backgroundColor: '#fff',
  },
  selectedThumbnail: {
    borderColor: '#08765A',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    paddingHorizontal: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  productSku: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  priceBreakup: {
    fontSize: 14,
    color: '#08765A',
    textDecorationLine: 'underline',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  infoCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
  },
  sizesSection: {
    marginBottom: 24,
  },
  sizeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sizeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  howToMeasure: {
    fontSize: 14,
    color: '#08765A',
    textDecorationLine: 'underline',
  },
  sizeOptions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  sizeButton: {
    width: 50,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedSizeButton: {
    backgroundColor: '#08765A',
    borderColor: '#08765A',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  selectedSizeText: {
    color: '#fff',
  },
  itemsAvailable: {
    fontSize: 12,
    color: '#FF0000',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 8,
    marginBottom: 12,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  accordionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accordionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  accordionContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 12,
    color: '#666',
  },
  accordionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  savingsBanner: {
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 20,
    position: 'relative',
  },
  savingsBannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  savingsBannerContent: {
    padding: 16,
    justifyContent: 'center',
    flex: 1,
  },
  savingsBannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  savingsBannerText: {
    fontSize: 12,
    color: '#fff',
    maxWidth: '70%',
  },
  exploreBadge: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -14 }],
  },
  similarProducts: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 12,
  },
  similarProductCard: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  similarFavorite: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
  },
  similarProductImage: {
    width: '100%',
    height: 100,
    marginBottom: 8,
  },
  similarProductName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#222',
    marginBottom: 4,
    minHeight: 32,
  },
  similarPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  similarPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#08765A',
    marginRight: 6,
  },
  similarOriginalPrice: {
    fontSize: 11,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  similarDiscount: {
    backgroundColor: '#08765A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  similarDiscountText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '600',
  },
  similarRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  similarRatingText: {
    fontSize: 10,
    color: '#666',
    marginLeft: 4,
  },
  similarButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewSimilarBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#08765A',
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  viewSimilarBtnText: {
    color: '#08765A',
    fontSize: 10,
    fontWeight: '600',
  },
  cartBtn: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 6,
    borderWidth: 1,
    borderColor: '#08765A',
  },
  bottomBanner: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 20,
  },
  exploreNowButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  exploreNowText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  addToCartContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 10,
  },
  addToCartButton: {
    backgroundColor: '#08765A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetailsScreen;