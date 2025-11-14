import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Modal,
  StatusBar
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;

const productsData = [
  { id: '1', type: 'product', image: require('../assets/earrings.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', originalPrice: '₹40,869', discount: '10%off making charges', rating: 4.5, reviews: '20k' },
  { id: '2', type: 'product', image: require('../assets/mangalsutra.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', originalPrice: '₹40,869', discount: '10%off making charges', rating: 4.5, reviews: '20k' },
  { id: '3', type: 'product', image: require('../assets/haaram.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', originalPrice: '₹40,869', discount: '10%off making charges', rating: 4.5, reviews: '20k' },
  { id: '4', type: 'product', image: require('../assets/earrings.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', originalPrice: '₹40,869', discount: '10%off making charges', rating: 4.5, reviews: '20k' },
  { id: 'banner-1', type: 'banner', image: require('../assets/diamondbanner.png') },
  { id: '5', type: 'product', image: require('../assets/mangalsutra.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', originalPrice: '₹40,869', discount: '10%off making charges', rating: 4.5, reviews: '20k' },
  { id: '6', type: 'product', image: require('../assets/haaram.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', originalPrice: '₹40,869', discount: '10%off making charges', rating: 4.5, reviews: '20k' },
  { id: '7', type: 'product', image: require('../assets/earrings.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', originalPrice: '₹40,869', discount: '10%off making charges', rating: 4.5, reviews: '20k' },
  { id: '8', type: 'product', image: require('../assets/mangalsutra.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', originalPrice: '₹40,869', discount: '10%off making charges', rating: 4.5, reviews: '20k' },
];

const IndividualCategory = () => {
  const insets = useSafeAreaInsets();
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [favorites, setFavorites] = useState({});
  const navigation = useNavigation();

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetailsScreen', { product });
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Restructure data to handle 2-column layout with banners
  const restructureData = () => {
    const restructured = [];
    let tempRow = [];
    
    productsData.forEach((item, index) => {
      if (item.type === 'banner') {
        // If there's an incomplete row, push it first
        if (tempRow.length > 0) {
          restructured.push({ id: `row-${restructured.length}`, type: 'row', items: [...tempRow] });
          tempRow = [];
        }
        // Push banner as full-width item
        restructured.push({ id: item.id, type: 'banner', item });
      } else {
        // Add product to temp row
        tempRow.push(item);
        // When we have 2 items, create a row
        if (tempRow.length === 2) {
          restructured.push({ id: `row-${restructured.length}`, type: 'row', items: [...tempRow] });
          tempRow = [];
        }
      }
    });
    
    // Push any remaining items
    if (tempRow.length > 0) {
      restructured.push({ id: `row-${restructured.length}`, type: 'row', items: [...tempRow] });
    }
    
    return restructured;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 1; i <= fullStars; i++) {
      stars.push(<Ionicons key={`full-${i}`} name="star" size={12} color="#FFD700" />);
    }
    if (hasHalf) {
      stars.push(<Ionicons key="half" name="star-half" size={12} color="#FFD700" />);
    }
    const remaining = 5 - fullStars - (hasHalf ? 1 : 0);
    for (let i = 1; i <= remaining; i++) {
      stars.push(<Ionicons key={`outline-${i}`} name="star-outline" size={12} color="#FFD700" />);
    }

    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const renderBanner = (bannerItem) => (
    <View style={styles.bannerWrapper}>
      <TouchableOpacity 
        style={styles.bannerContainer} 
        activeOpacity={0.9}
        onPress={() => {/* Handle banner press */}}
      >
        <Image 
          source={bannerItem.image} 
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );

  const renderProductCard = (item) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => handleProductPress(item)} 
      activeOpacity={0.8}
    >
      <TouchableOpacity 
        style={styles.favoriteIcon}
        onPress={() => toggleFavorite(item.id)}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={favorites[item.id] ? "heart" : "heart-outline"} 
          size={20} 
          color={favorites[item.id] ? "#FF0000" : "#666"} 
        />
      </TouchableOpacity>

      <Image source={item.image} style={styles.image} resizeMode="contain" />
      
      <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
      
      <View style={styles.priceRow}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.originalPrice}>{item.originalPrice}</Text>
      </View>

      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{item.discount}</Text>
      </View>

      <View style={styles.ratingRow}>
        {renderStars(item.rating)}
        <Text style={styles.reviewText}>{item.rating} ({item.reviews} reviews)</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.viewSimilarButton}
          onPress={() => {/* Handle view similar */}}
        >
          <Text style={styles.viewSimilarText}>View Similar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.cartIconButton}
          onPress={() => {navigation.navigate("Cart")}}
        >
          <Ionicons name="cart-outline" size={16} color="#08765A" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    if (item.type === 'banner') {
      return renderBanner(item.item);
    }
    
    if (item.type === 'row') {
      return (
        <View style={styles.row}>
          {item.items.map((product) => (
            <View key={product.id}>
              {renderProductCard(product)}
            </View>
          ))}
          {/* Add empty spacer if only one item in row */}
          {item.items.length === 1 && <View style={{ width: ITEM_WIDTH, margin: 5 }} />}
        </View>
      );
    }
    
    return null;
  };

  const structuredData = restructureData();
  const BOTTOM_BAR_HEIGHT = 60;

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      {/* Header with back button */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Image 
          source={require('../assets/geethalogo.png')} 
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <View style={styles.headerIcons}>
         
          <TouchableOpacity style={styles.headerIconButton} onPress={()=>{navigation.navigate("WishList")}}>
            <Ionicons name="heart-outline" size={22} color="#08765A" />
          </TouchableOpacity>
         <TouchableOpacity style={styles.headerIconButton} onPress={()=>{navigation.navigate("Cart")}}>
            <Ionicons name="cart-outline" size={22} color="#08765A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconButton}>
            <Ionicons name="notifications-outline" size={22} color="#08765A" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="home-outline" size={20} color="#08765A" />
          <TextInput
            placeholder="Search here Your favourite Jewellery"
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
         
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        <View style={styles.filterLeft}>
          <Text style={styles.filterTitle}>Earrings</Text>
          <Text style={styles.resultCount}>(3254 results)</Text>
        </View>
        <View style={styles.filterButtons}>
          {/* <TouchableOpacity style={styles.priceFilterButton}>
            <Ionicons name="logo-usd" size={16} color="#fff" />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="swap-vertical" size={16} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>(0,25000)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>(25000...50000)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>(50000...5</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Grid with Banner */}
      <FlatList
        data={structuredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: insets.bottom + BOTTOM_BAR_HEIGHT }}
        showsVerticalScrollIndicator={false}
      />

      {/* Fixed Bottom Filter Bar */}
      <View style={[styles.bottomFilterBar, { bottom: insets.bottom }]}>
        <TouchableOpacity 
          style={styles.bottomFilterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Ionicons name="filter-outline" size={18} color="#08765A" />
          <Text style={styles.bottomFilterText}>Filter</Text>
        </TouchableOpacity>
        
        <View style={styles.dividerLine} />
        
        <TouchableOpacity 
          style={styles.bottomFilterButton}
          onPress={() => setSortModalVisible(true)}
        >
          <Ionicons name="swap-vertical" size={18} color="#08765A" />
          <Text style={styles.bottomFilterText}>Sort by</Text>
        </TouchableOpacity>
      </View>

      {/* Sort Modal */}
      <Modal
        visible={sortModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setSortModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Sort by</Text>
            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Popular</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Price: Low to High</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Price: High to Low</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Newest</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setSortModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filter Options</Text>
            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Women</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Men</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Unisex</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Kids</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setFilterModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingHorizontal: 16 
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  headerLogo: {
    width: responsiveWidth(30),
    height: 40,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconButton: {
    padding: 4,
  },
  header: { 
    paddingTop: 8, 
    paddingBottom: 12 
  },
  searchContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#f6f6f6', 
    borderRadius: 10,
    paddingHorizontal: 12, 
    height: 45,
  },
  searchInput: { 
    flex: 1, 
    marginHorizontal: 8, 
    fontSize: 12,
    color:"#000" 
  },
  filterRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center', 
    marginVertical: 12,
  },
  filterLeft: {
    flexDirection: 'column',
  },
  filterTitle: { 
    fontSize: 18, 
    fontWeight: '600',
    color: '#000',
  },
  resultCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  filterButtons: { 
    flexDirection: 'row', 
    gap: 6,
    flexWrap: 'wrap',
  },
  priceFilterButton: {
    backgroundColor: '#08765A',
    borderRadius: 20,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    flexDirection: 'row', 
    alignItems: 'center',
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 20,
    paddingHorizontal: 10, 
    paddingVertical: 4,
    height: 28,
  },
  filterButtonText: {
    fontSize: 11,
    color: '#333',
  },
  row: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  card: {
    backgroundColor: '#fff', 
    borderRadius: 12,
    borderWidth: 1, 
    borderColor: '#eee',
    padding: 10, 
    width: ITEM_WIDTH,
    position: 'relative',
    shadowColor: "rgb(83, 178, 74)",
    shadowOffset: { 
      width: 0, 
      height: 2 
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 8,
    margin: 5
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: { 
    width: '100%', 
    height: 100,
    marginBottom: 8,
    borderRadius:25
  },
  title: { 
    fontSize: 12, 
    fontWeight: '500', 
    color: '#222',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: { 
    color: '#08765A', 
    fontWeight: '700', 
    fontSize: 14,
    marginRight: 6,
  },
  originalPrice: {
    color: '#999',
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#08765A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  discountText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '600',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsContainer: { 
    flexDirection: 'row',
    marginRight: 4,
  },
  reviewText: {
    fontSize: 10,
    color: '#666',
    marginLeft: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewSimilarButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#08765A',
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  viewSimilarText: {
    color: '#08765A',
    fontSize: 11,
    fontWeight: '600',
  },
  cartIconButton: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#08765A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Banner Styles
  bannerWrapper: {
    width: width - 32,
    marginVertical: 12,
  },
  bannerContainer: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: "rgb(83, 178, 74)",
    shadowOffset: { 
      width: 0, 
      height: 4 
    },
    shadowOpacity: 0.20,
    shadowRadius: 8,
    elevation: 6,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },

  // Bottom Fixed Filter Bar
  bottomFilterBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
  bottomFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  bottomFilterText: {
    color: '#08765A',
    fontSize: 14,
    fontWeight: '600',
  },
  dividerLine: {
    width: 1,
    height: 30,
    backgroundColor: '#ddd',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1, 
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalOptionText: {
    fontSize: 15,
    color: '#333',
  },
  modalCloseButton: {
    backgroundColor: '#08765A',
    borderRadius: 8,
    marginTop: 16,
    paddingVertical: 12,
  },
  modalCloseText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: '600',
    fontSize: 15,
  },
});

export default IndividualCategory;