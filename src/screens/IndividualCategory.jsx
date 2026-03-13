// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Dimensions,
//   Modal,
//   StatusBar
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
// import { useNavigation } from '@react-navigation/native';

// const { width } = Dimensions.get('window');
// const ITEM_WIDTH = (width - 48) / 2;

// const productsData = [
//   { id: '1', type: 'product', image: require('../assets/earrings.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', originalPrice: '₹40,869', discount: '10%off making charges', rating: 4.5, reviews: '20k' },
//   { id: '2', type: 'product', image: require('../assets/mangalsutra.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', originalPrice: '₹40,869', discount: '10%off making charges', rating: 4.5, reviews: '20k' },
//   { id: '3', type: 'product', image: require('../assets/haaram.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', originalPrice: '₹40,869', discount: '10%off making charges', rating: 4.5, reviews: '20k' },
//   { id: '4', type: 'product', image: require('../assets/earrings.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', originalPrice: '₹40,869', discount: '10%off making charges', rating: 4.5, reviews: '20k' },
//   { id: 'banner-1', type: 'banner', image: require('../assets/diamondbanner.png') },
//   { id: '5', type: 'product', image: require('../assets/mangalsutra.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', originalPrice: '₹40,869', discount: '10%off making charges', rating: 4.5, reviews: '20k' },
//   { id: '6', type: 'product', image: require('../assets/haaram.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', originalPrice: '₹40,869', discount: '10%off making charges', rating: 4.5, reviews: '20k' },
//   { id: '7', type: 'product', image: require('../assets/earrings.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', originalPrice: '₹40,869', discount: '10%off making charges', rating: 4.5, reviews: '20k' },
//   { id: '8', type: 'product', image: require('../assets/mangalsutra.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', originalPrice: '₹40,869', discount: '10%off making charges', rating: 4.5, reviews: '20k' },
// ];

// const IndividualCategory = () => {
//   const insets = useSafeAreaInsets();
//   const [sortModalVisible, setSortModalVisible] = useState(false);
//   const [filterModalVisible, setFilterModalVisible] = useState(false);
//   const [favorites, setFavorites] = useState({});
//   const navigation = useNavigation();

//   const handleProductPress = (product) => {
//     navigation.navigate('ProductDetailsScreen', { product });
//   };

//   const toggleFavorite = (id) => {
//     setFavorites(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   // Restructure data to handle 2-column layout with banners
//   const restructureData = () => {
//     const restructured = [];
//     let tempRow = [];
    
//     productsData.forEach((item, index) => {
//       if (item.type === 'banner') {
//         // If there's an incomplete row, push it first
//         if (tempRow.length > 0) {
//           restructured.push({ id: `row-${restructured.length}`, type: 'row', items: [...tempRow] });
//           tempRow = [];
//         }
//         // Push banner as full-width item
//         restructured.push({ id: item.id, type: 'banner', item });
//       } else {
//         // Add product to temp row
//         tempRow.push(item);
//         // When we have 2 items, create a row
//         if (tempRow.length === 2) {
//           restructured.push({ id: `row-${restructured.length}`, type: 'row', items: [...tempRow] });
//           tempRow = [];
//         }
//       }
//     });
    
//     // Push any remaining items
//     if (tempRow.length > 0) {
//       restructured.push({ id: `row-${restructured.length}`, type: 'row', items: [...tempRow] });
//     }
    
//     return restructured;
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalf = rating % 1 !== 0;

//     for (let i = 1; i <= fullStars; i++) {
//       stars.push(<Ionicons key={`full-${i}`} name="star" size={12} color="#FFD700" />);
//     }
//     if (hasHalf) {
//       stars.push(<Ionicons key="half" name="star-half" size={12} color="#FFD700" />);
//     }
//     const remaining = 5 - fullStars - (hasHalf ? 1 : 0);
//     for (let i = 1; i <= remaining; i++) {
//       stars.push(<Ionicons key={`outline-${i}`} name="star-outline" size={12} color="#FFD700" />);
//     }

//     return <View style={styles.starsContainer}>{stars}</View>;
//   };

//   const renderBanner = (bannerItem) => (
//     <View style={styles.bannerWrapper}>
//       <TouchableOpacity 
//         style={styles.bannerContainer} 
//         activeOpacity={0.9}
//         onPress={() => {/* Handle banner press */}}
//       >
//         <Image 
//           source={bannerItem.image} 
//           style={styles.bannerImage}
//           resizeMode="cover"
//         />
//       </TouchableOpacity>
//     </View>
//   );

//   const renderProductCard = (item) => (
//     <TouchableOpacity 
//       style={styles.card} 
//       onPress={() => handleProductPress(item)} 
//       activeOpacity={0.8}
//     >
//       <TouchableOpacity 
//         style={styles.favoriteIcon}
//         onPress={() => toggleFavorite(item.id)}
//         activeOpacity={0.7}
//       >
//         <Ionicons 
//           name={favorites[item.id] ? "heart" : "heart-outline"} 
//           size={20} 
//           color={favorites[item.id] ? "#FF0000" : "#666"} 
//         />
//       </TouchableOpacity>

//       <Image source={item.image} style={styles.image} resizeMode="contain" />
      
//       <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
      
//       <View style={styles.priceRow}>
//         <Text style={styles.price}>{item.price}</Text>
//         <Text style={styles.originalPrice}>{item.originalPrice}</Text>
//       </View>

//       <View style={styles.discountBadge}>
//         <Text style={styles.discountText}>{item.discount}</Text>
//       </View>

//       <View style={styles.ratingRow}>
//         {renderStars(item.rating)}
//         <Text style={styles.reviewText}>{item.rating} ({item.reviews} reviews)</Text>
//       </View>

//       <View style={styles.buttonRow}>
//         <TouchableOpacity 
//           style={styles.viewSimilarButton}
//           onPress={() => {/* Handle view similar */}}
//         >
//           <Text style={styles.viewSimilarText}>View Similar</Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={styles.cartIconButton}
//           onPress={() => {navigation.navigate("Cart")}}
//         >
//           <Ionicons name="cart-outline" size={16} color="#832729" />
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderItem = ({ item }) => {
//     if (item.type === 'banner') {
//       return renderBanner(item.item);
//     }
    
//     if (item.type === 'row') {
//       return (
//         <View style={styles.row}>
//           {item.items.map((product) => (
//             <View key={product.id}>
//               {renderProductCard(product)}
//             </View>
//           ))}
//           {/* Add empty spacer if only one item in row */}
//           {item.items.length === 1 && <View style={{ width: ITEM_WIDTH, margin: 5 }} />}
//         </View>
//       );
//     }
    
//     return null;
//   };

//   const structuredData = restructureData();
//   const BOTTOM_BAR_HEIGHT = 60;

//   return (
//     <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
//       {/* Header with back button */}
//       <View style={styles.topHeader}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Image 
//           source={require('../assets/geethalogo.png')} 
//           style={styles.headerLogo}
//           resizeMode="contain"
//         />
//         <View style={styles.headerIcons}>
         
//           <TouchableOpacity style={styles.headerIconButton} onPress={()=>{navigation.navigate("WishList")}}>
//             <Ionicons name="heart-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//          <TouchableOpacity style={styles.headerIconButton} onPress={()=>{navigation.navigate("Cart")}}>
//             <Ionicons name="cart-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.headerIconButton}>
//             <Ionicons name="notifications-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.header}>
//         <View style={styles.searchContainer}>
//           <Ionicons name="home-outline" size={20} color="#832729" />
//           <TextInput
//             placeholder="Search here Your favourite Jewellery"
//             style={styles.searchInput}
//             placeholderTextColor="#999"
//           />
         
//         </View>
//       </View>

//       {/* Filters */}
//       <View style={styles.filterRow}>
//         <View style={styles.filterLeft}>
//           <Text style={styles.filterTitle}>Earrings</Text>
//           <Text style={styles.resultCount}>(3254 results)</Text>
//         </View>
//         <View style={styles.filterButtons}>
//           {/* <TouchableOpacity style={styles.priceFilterButton}>
//             <Ionicons name="logo-usd" size={16} color="#fff" />
//           </TouchableOpacity> */}
//           <TouchableOpacity style={styles.filterButton}>
//             <Ionicons name="swap-vertical" size={16} color="#333" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.filterButton}>
//             <Text style={styles.filterButtonText}>(0,25000)</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.filterButton}>
//             <Text style={styles.filterButtonText}>(25000...50000)</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.filterButton}>
//             <Text style={styles.filterButtonText}>(50000...5</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Product Grid with Banner */}
//       <FlatList
//         data={structuredData}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: insets.bottom + BOTTOM_BAR_HEIGHT }}
//         showsVerticalScrollIndicator={false}
//       />

//       {/* Fixed Bottom Filter Bar */}
//       <View style={[styles.bottomFilterBar, { bottom: insets.bottom }]}>
//         <TouchableOpacity 
//           style={styles.bottomFilterButton}
//           onPress={() => setFilterModalVisible(true)}
//         >
//           <Ionicons name="filter-outline" size={18} color="#832729" />
//           <Text style={styles.bottomFilterText}>Filter</Text>
//         </TouchableOpacity>
        
//         <View style={styles.dividerLine} />
        
//         <TouchableOpacity 
//           style={styles.bottomFilterButton}
//           onPress={() => setSortModalVisible(true)}
//         >
//           <Ionicons name="swap-vertical" size={18} color="#832729" />
//           <Text style={styles.bottomFilterText}>Sort by</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Sort Modal */}
//       <Modal
//         visible={sortModalVisible}
//         animationType="slide"
//         transparent
//         onRequestClose={() => setSortModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Sort by</Text>
//             <TouchableOpacity style={styles.modalOption}>
//               <Text style={styles.modalOptionText}>Popular</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}>
//               <Text style={styles.modalOptionText}>Price: Low to High</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}>
//               <Text style={styles.modalOptionText}>Price: High to Low</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}>
//               <Text style={styles.modalOptionText}>Newest</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.modalCloseButton}
//               onPress={() => setSortModalVisible(false)}
//             >
//               <Text style={styles.modalCloseText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Filter Modal */}
//       <Modal
//         visible={filterModalVisible}
//         animationType="slide"
//         transparent
//         onRequestClose={() => setFilterModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Filter Options</Text>
//             <TouchableOpacity style={styles.modalOption}>
//               <Text style={styles.modalOptionText}>Women</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}>
//               <Text style={styles.modalOptionText}>Men</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}>
//               <Text style={styles.modalOptionText}>Unisex</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}>
//               <Text style={styles.modalOptionText}>Kids</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.modalCloseButton}
//               onPress={() => setFilterModalVisible(false)}
//             >
//               <Text style={styles.modalCloseText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     backgroundColor: '#fff', 
//     paddingHorizontal: 16 
//   },
//   topHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 8,
//     paddingHorizontal: 4,
//   },
//   headerLogo: {
//     width: responsiveWidth(30),
//     height: 40,
//   },
//   headerIcons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   headerIconButton: {
//     padding: 4,
//   },
//   header: { 
//     paddingTop: 8, 
//     paddingBottom: 12 
//   },
//   searchContainer: {
//     flexDirection: 'row', 
//     alignItems: 'center',
//     backgroundColor: '#f6f6f6', 
//     borderRadius: 10,
//     paddingHorizontal: 12, 
//     height: 45,
//   },
//   searchInput: { 
//     flex: 1, 
//     marginHorizontal: 8, 
//     fontSize: 12,
//     color:"#000" 
//   },
//   filterRow: {
//     flexDirection: 'row', 
//     justifyContent: 'space-between',
//     alignItems: 'center', 
//     marginVertical: 12,
//   },
//   filterLeft: {
//     flexDirection: 'column',
//   },
//   filterTitle: { 
//     fontSize: 18, 
//     fontWeight: '600',
//     color: '#000',
//   },
//   resultCount: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 2,
//   },
//   filterButtons: { 
//     flexDirection: 'row', 
//     gap: 6,
//     flexWrap: 'wrap',
//   },
//   priceFilterButton: {
//     backgroundColor: '#832729',
//     borderRadius: 20,
//     width: 28,
//     height: 28,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   filterButton: {
//     flexDirection: 'row', 
//     alignItems: 'center',
//     borderWidth: 1, 
//     borderColor: '#ddd', 
//     borderRadius: 20,
//     paddingHorizontal: 10, 
//     paddingVertical: 4,
//     height: 28,
//   },
//   filterButtonText: {
//     fontSize: 11,
//     color: '#333',
//   },
//   row: { 
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 0,
//   },
//   card: {
//     backgroundColor: '#fff', 
//     borderRadius: 12,
//     borderWidth: 1, 
//     borderColor: '#eee',
//     padding: 10, 
//     width: ITEM_WIDTH,
//     position: 'relative',
//     shadowColor: "rgb(83, 178, 74)",
//     shadowOffset: { 
//       width: 0, 
//       height: 2 
//     },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 3,
//     marginBottom: 8,
//     margin: 5
//   },
//   favoriteIcon: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     zIndex: 10,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 4,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   image: { 
//     width: '100%', 
//     height: 100,
//     marginBottom: 8,
//     borderRadius:25
//   },
//   title: { 
//     fontSize: 12, 
//     fontWeight: '500', 
//     color: '#222',
//     marginBottom: 4,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   price: { 
//     color: '#832729', 
//     fontWeight: '700', 
//     fontSize: 14,
//     marginRight: 6,
//   },
//   originalPrice: {
//     color: '#999',
//     fontSize: 12,
//     textDecorationLine: 'line-through',
//   },
//   discountBadge: {
//     backgroundColor: '#832729',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//     alignSelf: 'flex-start',
//     marginBottom: 6,
//   },
//   discountText: {
//     color: '#fff',
//     fontSize: 9,
//     fontWeight: '600',
//   },
//   ratingRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   starsContainer: { 
//     flexDirection: 'row',
//     marginRight: 4,
//   },
//   reviewText: {
//     fontSize: 10,
//     color: '#666',
//     marginLeft: 4,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   viewSimilarButton: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#832729',
//     borderRadius: 6,
//     paddingVertical: 6,
//     alignItems: 'center',
//   },
//   viewSimilarText: {
//     color: '#832729',
//     fontSize: 11,
//     fontWeight: '600',
//   },
//   cartIconButton: {
//     backgroundColor: '#fff',
//     borderRadius: 6,
//     paddingVertical: 5,
//     paddingHorizontal: 8,
//     borderWidth: 1,
//     borderColor: '#832729',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
  
//   // Banner Styles
//   bannerWrapper: {
//     width: width - 32,
//     marginVertical: 12,
//   },
//   bannerContainer: {
//     width: '100%',
//     height: 160,
//     borderRadius: 12,
//     overflow: 'hidden',
//     shadowColor: "rgb(83, 178, 74)",
//     shadowOffset: { 
//       width: 0, 
//       height: 4 
//     },
//     shadowOpacity: 0.20,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   bannerImage: {
//     width: '100%',
//     height: '100%',
//   },

//   // Bottom Fixed Filter Bar
//   bottomFilterBar: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     height: 60,
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     paddingHorizontal: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: -2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 10,
//   },
//   bottomFilterButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//   },
//   bottomFilterText: {
//     color: '#832729',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   dividerLine: {
//     width: 1,
//     height: 30,
//     backgroundColor: '#ddd',
//   },

//   // Modal Styles
//   modalOverlay: {
//     flex: 1, 
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   modalContainer: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     paddingBottom: 30,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 12,
//     color: '#000',
//   },
//   modalOption: {
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   modalOptionText: {
//     fontSize: 15,
//     color: '#333',
//   },
//   modalCloseButton: {
//     backgroundColor: '#832729',
//     borderRadius: 8,
//     marginTop: 16,
//     paddingVertical: 12,
//   },
//   modalCloseText: { 
//     color: '#fff', 
//     textAlign: 'center', 
//     fontWeight: '600',
//     fontSize: 15,
//   },
// });

// export default IndividualCategory;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Dimensions,
//   Modal,
//   StatusBar,
//   ActivityIndicator,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { responsiveWidth } from 'react-native-responsive-dimensions';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../redux/slices/categorySlice';

// const { width } = Dimensions.get('window');
// const ITEM_WIDTH = (width - 48) / 2;

// const IndividualCategory = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const route = useRoute();
//   const dispatch = useDispatch();

//   const { categoryId, categoryName } = route.params || {};

//   const { products, productsLoading, productsError } = useSelector((state) => state.category);

//   const [sortModalVisible, setSortModalVisible] = useState(false);
//   const [filterModalVisible, setFilterModalVisible] = useState(false);
//   const [localFavorites, setLocalFavorites] = useState({});

//   const userId = categoryId; // TODO: Replace with actual user ID from auth

//   useEffect(() => {
//     if (categoryId && userId) {
//       dispatch(fetchProducts({ userId, categoryId }));
//     }
//   }, [categoryId, userId, dispatch]);

//   const toggleLocalFavorite = (productId) => {
//     setLocalFavorites((prev) => ({
//       ...prev,
//       [productId]: !prev[productId],
//     }));
//   };

//   // Updated navigation to pass product_id and user_id
//   const handleProductPress = (product) => {
//     navigation.navigate('ProductDetailsScreen', {
//       product_id: product.id,
//       user_id: userId, // Required for wishlist_flag and API calls
//     });
//   };

//   const restructureData = () => {
//     const rows = [];
//     let tempRow = [];

//     products.forEach((item) => {
//       tempRow.push(item);
//       if (tempRow.length === 2) {
//         rows.push({ id: `row-${rows.length}`, type: 'row', items: [...tempRow] });
//         tempRow = [];
//       }
//     });

//     if (tempRow.length > 0) {
//       rows.push({ id: `row-${rows.length}`, type: 'row', items: [...tempRow] });
//     }

//     return rows;
//   };

//   const renderStars = (rating = 4.5) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalf = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Ionicons key={`full-${i}`} name="star" size={12} color="#FFD700" />);
//     }
//     if (hasHalf) stars.push(<Ionicons key="half" name="star-half" size={12} color="#FFD700" />);
//     const emptyCount = 5 - fullStars - (hasHalf ? 1 : 0);
//     for (let i = 0; i < emptyCount; i++) {
//       stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={12} color="#FFD700" />);
//     }

//     return <View style={styles.starsContainer}>{stars}</View>;
//   };

//   const renderProductCard = (item) => {
//     const isWishlisted = item.wishlist_flag === 1 || localFavorites[item.id];

//     return (
//       <TouchableOpacity
//         style={styles.card}
//         onPress={() => handleProductPress(item)}
//         activeOpacity={0.8}
//       >
//         <TouchableOpacity
//           style={styles.favoriteIcon}
//           onPress={() => toggleLocalFavorite(item.id)}
//         >
//           <Ionicons
//             name={isWishlisted ? 'heart' : 'heart-outline'}
//             size={20}
//             color={isWishlisted ? '#FF0000' : '#666'}
//           />
//         </TouchableOpacity>

//         <Image
//           source={{ uri: item.product_main_image }}
//           style={styles.image}
//           resizeMode="contain"
//           defaultSource={require('../assets/profile1.png')}
//         />

//         <Text style={styles.title} numberOfLines={2}>
//           {item.product_name}
//         </Text>

//         <View style={styles.buttonRow}>
//           <TouchableOpacity style={styles.viewSimilarButton}>
//             <Text style={styles.viewSimilarText}>View Similar</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.cartIconButton}
//             onPress={() => navigation.navigate('Cart')}
//           >
//             <Ionicons name="cart-outline" size={16} color="#832729" />
//           </TouchableOpacity>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const renderRow = ({ item }) => {
//     if (item.type === 'row') {
//       return (
//         <View style={styles.row}>
//           {item.items.map((product) => (
//             <View key={product.id}>{renderProductCard(product)}</View>
//           ))}
//           {item.items.length === 1 && <View style={{ width: ITEM_WIDTH, margin: 5 }} />}
//         </View>
//       );
//     }
//     return null;
//   };

//   const structuredData = restructureData();

//   return (
//     <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

//       <View style={styles.topHeader}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Image
//           source={require('../assets/geethalogo.png')}
//           style={styles.headerLogo}
//           resizeMode="contain"
//         />
//         <View style={styles.headerIcons}>
//           <TouchableOpacity
//             style={styles.headerIconButton}
//             onPress={() => navigation.navigate('WishList')}
//           >
//             <Ionicons name="heart-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.headerIconButton}
//             onPress={() => navigation.navigate('Cart')}
//           >
//             <Ionicons name="cart-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.headerIconButton}>
//             <Ionicons name="notifications-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.filterRow}>
//         <View style={styles.filterLeft}>
//           <Text style={styles.filterTitle}>{categoryName || 'Category'}</Text>
//           <Text style={styles.resultCount}>({products.length} results)</Text>
//         </View>
//       </View>

//       {productsLoading ? (
//         <View style={styles.centerContent}>
//           <ActivityIndicator size="large" color="#832729" />
//           <Text style={styles.loadingText}>Loading products...</Text>
//         </View>
//       ) : productsError ? (
//         <View style={styles.centerContent}>
//           <Text style={styles.errorText}>Error: {productsError}</Text>
//           <TouchableOpacity
//             onPress={() => dispatch(fetchProducts({ userId, categoryId }))}
//             style={styles.retryButton}
//           >
//             <Text style={styles.retryText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       ) : products.length === 0 ? (
//         <View style={styles.centerContent}>
//           <Text style={styles.emptyText}>No products found in this category.</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={structuredData}
//           keyExtractor={(item) => item.id}
//           renderItem={renderRow}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 100 }}
//         />
//       )}

//       <View style={[styles.bottomFilterBar, { bottom: insets.bottom + 10 }]}>
//         <TouchableOpacity
//           style={styles.bottomFilterButton}
//           onPress={() => setFilterModalVisible(true)}
//         >
//           <Ionicons name="filter-outline" size={18} color="#832729" />
//           <Text style={styles.bottomFilterText}>Filter</Text>
//         </TouchableOpacity>
//         <View style={styles.dividerLine} />
//         <TouchableOpacity
//           style={styles.bottomFilterButton}
//           onPress={() => setSortModalVisible(true)}
//         >
//           <Ionicons name="swap-vertical" size={18} color="#832729" />
//           <Text style={styles.bottomFilterText}>Sort by</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Modals remain unchanged */}
//       <Modal visible={sortModalVisible} transparent animationType="slide" onRequestClose={() => setSortModalVisible(false)}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Sort by</Text>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Popular</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Price: Low to High</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Price: High to Low</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Newest First</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalCloseButton} onPress={() => setSortModalVisible(false)}>
//               <Text style={styles.modalCloseText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       <Modal visible={filterModalVisible} transparent animationType="slide" onRequestClose={() => setFilterModalVisible(false)}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Filter Options</Text>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Gold</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Diamond</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Platinum</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalCloseButton} onPress={() => setFilterModalVisible(false)}>
//               <Text style={styles.modalCloseText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//   },
//   topHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//   },
//   headerLogo: {
//     width: responsiveWidth(30),
//     height: 40,
//   },
//   headerIcons: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   headerIconButton: {
//     padding: 4,
//   },
//   filterRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 12,
//   },
//   filterLeft: {
//     flexDirection: 'column',
//   },
//   filterTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#000',
//   },
//   resultCount: {
//     fontSize: 13,
//     color: '#666',
//     marginTop: 4,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#eee',
//     padding: 10,
//     width: ITEM_WIDTH,
//     position: 'relative',
//     shadowColor: '#53724A',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 6,
//     elevation: 4,
//     margin: 5,
//   },
//   favoriteIcon: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     zIndex: 10,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   image: {
//     width: '100%',
//     height: 120,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#222',
//     marginBottom: 6,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   viewSimilarButton: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#832729',
//     borderRadius: 6,
//     paddingVertical: 8,
//     alignItems: 'center',
//   },
//   viewSimilarText: {
//     color: '#832729',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   cartIconButton: {
//     backgroundColor: '#fff',
//     borderRadius: 6,
//     padding: 8,
//     borderWidth: 1,
//     borderColor: '#832729',
//   },
//   centerContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#832729',
//   },
//   errorText: {
//     fontSize: 16,
//     color: 'red',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   retryButton: {
//     backgroundColor: '#832729',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   retryText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   bottomFilterBar: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     height: 60,
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 10,
//   },
//   bottomFilterButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   bottomFilterText: {
//     color: '#832729',
//     fontSize: 15,
//     fontWeight: '600',
//   },
//   dividerLine: {
//     width: 1,
//     height: 30,
//     backgroundColor: '#ddd',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'flex-end',
//   },
//   modalContainer: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     marginBottom: 16,
//     color: '#000',
//   },
//   modalOption: {
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   modalOptionText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   modalCloseButton: {
//     backgroundColor: '#832729',
//     marginTop: 20,
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalCloseText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default IndividualCategory;
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Dimensions,
//   Modal,
//   StatusBar,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { responsiveWidth } from 'react-native-responsive-dimensions';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from '../redux/slices/wishlistSlice';
// import { fetchProducts } from '../redux/slices/categorySlice';

// const { width } = Dimensions.get('window');
// const ITEM_WIDTH = (width - 48) / 2;
// const CARD_HEIGHT = 250;

// const IndividualCategory = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const route = useRoute();
//   const dispatch = useDispatch();

//   const { categoryId, categoryName } = route.params || {};

//   const { products: rawProducts, productsLoading, productsError } = useSelector((state) => state.category);
//   const { customerId } = useSelector((state) => state.Auth || {});
//   const { addRemoveLoader } = useSelector((state) => state.wishlist || {});

//   const [sortModalVisible, setSortModalVisible] = useState(false);
//   const [filterModalVisible, setFilterModalVisible] = useState(false);
//   const [products, setProducts] = useState([]); // Local state to allow instant UI updates

//   const userId = customerId;

//   // Sync rawProducts → local products (with instant updates)
//   useEffect(() => {
//     setProducts(rawProducts);
//   }, [rawProducts]);

//   useEffect(() => {
//     if (categoryId && userId) {
//       dispatch(fetchProducts({ userId, categoryId }));
//     }
//   }, [categoryId, userId, dispatch]);

//   const handleWishlistToggle = async (item) => {
//     if (!userId) {
//       Alert.alert(
//         'Sign In Required',
//         'Please sign in to manage your wishlist.',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Sign In', onPress: () => navigation.navigate('SignIn') },
//         ]
//       );
//       return;
//     }

//     const isWishlisted = item.wishlist_flag === 1;
//     const productId = item.id;

//     if (isWishlisted && item.wishlist_id) {
//       // Remove from wishlist
//       try {
//         await dispatch(removeFromWishlist({ wishlist_id: item.wishlist_id })).unwrap();
//         // Optimistic update
//         setProducts((prev) =>
//           prev.map((p) =>
//             p.id === productId
//               ? { ...p, wishlist_flag: 0, wishlist_id: null }
//               : p
//           )
//         );
//       } catch (err) {
//         Alert.alert('Error', 'Failed to remove from wishlist');
//       }
//     } else {
//       // Add to wishlist
//       try {
//         const result = await dispatch(
//           addToWishlist({ user_id: userId, product_id: productId })
//         ).unwrap();

//         // If already exists (API returns status 200 + already_exists: true), just update flag
//         let newWishlistId = item.wishlist_id;
//         if (result && result.wishlist_id) {
//           newWishlistId = result.wishlist_id;
//         }

//         setProducts((prev) =>
//           prev.map((p) =>
//             p.id === productId
//               ? { ...p, wishlist_flag: 1, wishlist_id: newWishlistId || p.wishlist_id }
//               : p
//           )
//         );
//       } catch (err) {
//         if (err?.already_exists) {
//           // Still mark as wishlisted if already in wishlist
//           setProducts((prev) =>
//             prev.map((p) =>
//               p.id === productId
//                 ? { ...p, wishlist_flag: 1 }
//                 : p
//             )
//           );
//         } else {
//           Alert.alert('Error', 'Failed to add to wishlist');
//         }
//       }
//     }
//   };

//   const handleProductPress = (product) => {
//     navigation.navigate('ProductDetailsScreen', {
//       product_id: product.id,
//       user_id: userId,
//     });
//   };

//   const restructureData = () => {
//     const rows = [];
//     let tempRow = [];

//     products.forEach((item) => {
//       tempRow.push(item);
//       if (tempRow.length === 2) {
//         rows.push({ id: `row-${rows.length}`, type: 'row', items: [...tempRow] });
//         tempRow = [];
//       }
//     });

//     if (tempRow.length > 0) {
//       rows.push({ id: `row-${rows.length}`, type: 'row', items: [...tempRow] });
//     }

//     return rows;
//   };

//   const renderProductCard = (item) => {
//     const isWishlisted = item.wishlist_flag === 1;
//     const isLoading = addRemoveLoader === item.id;

//     return (
//       <TouchableOpacity
//         style={[styles.card, { height: CARD_HEIGHT }]}
//         onPress={() => handleProductPress(item)}
//         activeOpacity={0.8}
//       >
//         <TouchableOpacity
//           style={styles.favoriteIcon}
//           onPress={(e) => {
//             e.stopPropagation();
//             handleWishlistToggle(item);
//           }}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator size={20} color="#FF0000" />
//           ) : (
//             <Ionicons
//               name={isWishlisted ? 'heart' : 'heart-outline'}
//               size={22}
//               color={isWishlisted ? '#FF0000' : '#666'}
//             />
//           )}
//         </TouchableOpacity>

//         <Image
//           source={{ uri: item.product_main_image }}
//           style={styles.image}
//           resizeMode="contain"
//           defaultSource={require('../assets/profile1.png')}
//         />

//         <View style={styles.content}>
//           <Text style={styles.title} numberOfLines={2}>
//             {item.product_name}
//           </Text>

//           <View style={styles.buttonRow}>
//             <TouchableOpacity style={styles.viewSimilarButton}>
//               <Text style={styles.viewSimilarText}>View Similar</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.cartIconButton}
//               onPress={(e) => {
//                 e.stopPropagation();
//                 navigation.navigate('Cart');
//               }}
//             >
//               <Ionicons name="cart-outline" size={18} color="#832729" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const renderRow = ({ item }) => {
//     if (item.type === 'row') {
//       return (
//         <View style={styles.row}>
//           {item.items.map((product) => (
//             <View key={product.id} style={styles.cardWrapper}>
//               {renderProductCard(product)}
//             </View>
//           ))}
//           {item.items.length === 1 && <View style={[styles.cardWrapper, { opacity: 0 }]} />}
//         </View>
//       );
//     }
//     return null;
//   };

//   const structuredData = restructureData();

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

//       <View style={[styles.topHeader, { paddingTop: insets.top + 10 }]}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Image
//           source={require('../assets/geethalogo.png')}
//           style={styles.headerLogo}
//           resizeMode="contain"
//         />
//         <View style={styles.headerIcons}>
//           <TouchableOpacity onPress={() => navigation.navigate('WishList')}>
//             <Ionicons name="heart-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
//             <Ionicons name="cart-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Ionicons name="notifications-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.filterRow}>
//         <View style={styles.filterLeft}>
//           <Text style={styles.filterTitle}>{categoryName || 'Category'}</Text>
//           <Text style={styles.resultCount}>({products.length} results)</Text>
//         </View>
//       </View>

//       {productsLoading ? (
//         <View style={styles.centerContent}>
//           <ActivityIndicator size="large" color="#832729" />
//           <Text style={styles.loadingText}>Loading products...</Text>
//         </View>
//       ) : productsError ? (
//         <View style={styles.centerContent}>
//           <Text style={styles.errorText}>Error: {productsError}</Text>
//           <TouchableOpacity
//             onPress={() => dispatch(fetchProducts({ userId, categoryId }))}
//             style={styles.retryButton}
//           >
//             <Text style={styles.retryText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       ) : products.length === 0 ? (
//         <View style={styles.centerContent}>
//           <Text style={styles.emptyText}>No products found in this category.</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={structuredData}
//           keyExtractor={(item) => item.id}
//           renderItem={renderRow}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
//         />
//       )}

//       <View style={[styles.bottomFilterBar, { paddingBottom: insets.bottom + 10 }]}>
//         <TouchableOpacity
//           style={styles.bottomFilterButton}
//           onPress={() => setFilterModalVisible(true)}
//         >
//           <Ionicons name="filter-outline" size={18} color="#832729" />
//           <Text style={styles.bottomFilterText}>Filter</Text>
//         </TouchableOpacity>

//         <View style={styles.dividerLine} />

//         <TouchableOpacity
//           style={styles.bottomFilterButton}
//           onPress={() => setSortModalVisible(true)}
//         >
//           <Ionicons name="swap-vertical" size={18} color="#832729" />
//           <Text style={styles.bottomFilterText}>Sort by</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Modals remain unchanged */}
//       <Modal visible={sortModalVisible} transparent animationType="slide" onRequestClose={() => setSortModalVisible(false)}>
//         <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setSortModalVisible(false)}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Sort by</Text>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Popular</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Price: Low to High</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Price: High to Low</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Newest First</Text></TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>

//       <Modal visible={filterModalVisible} transparent animationType="slide" onRequestClose={() => setFilterModalVisible(false)}>
//         <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setFilterModalVisible(false)}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Filter Options</Text>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Gold</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Diamond</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Platinum</Text></TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   topHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
//   headerLogo: { width: responsiveWidth(30), height: 40 },
//   headerIcons: { flexDirection: 'row', gap: 12 },
//   filterRow: { paddingHorizontal: 16, marginVertical: 12 },
//   filterLeft: { flexDirection: 'column' },
//   filterTitle: { fontSize: 20, fontWeight: '700', color: '#000' },
//   resultCount: { fontSize: 13, color: '#666', marginTop: 4 },
//   row: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 16 },
//   cardWrapper: { width: ITEM_WIDTH },
//   card: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#eee', padding: 10, position: 'relative', shadowColor: '#53724A', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 6, elevation: 4 },
//   favoriteIcon: { position: 'absolute', top: 8, right: 8, zIndex: 10, backgroundColor: '#fff', borderRadius: 20, padding: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2, elevation: 3 },
//   image: { width: '100%', height: 140, marginBottom: 10 },
//   content: { flex: 1, justifyContent: 'space-between' },
//   title: { fontSize: 13, fontWeight: '600', color: '#222', marginBottom: 8 },
//   buttonRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   viewSimilarButton: { flex: 1, borderWidth: 1, borderColor: '#832729', borderRadius: 6, paddingVertical: 8, alignItems: 'center' },
//   viewSimilarText: { color: '#832729', fontSize: 12, fontWeight: '600' },
//   cartIconButton: { backgroundColor: '#fff', borderRadius: 6, padding: 8, borderWidth: 1, borderColor: '#832729' },
//   centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
//   loadingText: { marginTop: 10, fontSize: 16, color: '#832729' },
//   errorText: { fontSize: 16, color: 'red', textAlign: 'center', marginBottom: 10 },
//   emptyText: { fontSize: 16, color: '#666' },
//   retryButton: { backgroundColor: '#832729', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
//   retryText: { color: '#fff', fontWeight: '600' },
//   bottomFilterBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#eee', shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 10 },
//   bottomFilterButton: { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   bottomFilterText: { color: '#832729', fontSize: 15, fontWeight: '600' },
//   dividerLine: { width: 1, height: 30, backgroundColor: '#ddd' },
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
//   modalContainer: { backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '60%' },
//   modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16, color: '#000' },
//   modalOption: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#eee' },
//   modalOptionText: { fontSize: 16, color: '#333' },
// });

// export default IndividualCategory;
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Dimensions,
//   Modal,
//   StatusBar,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { responsiveWidth } from 'react-native-responsive-dimensions';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from '../redux/slices/wishlistSlice';
// import { fetchProducts } from '../redux/slices/categorySlice';

// const { width } = Dimensions.get('window');
// const ITEM_WIDTH = (width - 48) / 2;
// const CARD_HEIGHT = 250;

// const IndividualCategory = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const route = useRoute();
//   const dispatch = useDispatch();

//   // Extract navigation params
//   const {
//   userId: paramUserId,
//   categoryId,
//   gender,
//   collection,        // ← New param
//   categoryName,      // optional title from home sections or banner
// } = route.params || {};

//   const { customerId } = useSelector((state) => state.Auth || {});
//   const { products: rawProducts, loading: productsLoading, error: productsError } = useSelector(
//     (state) => state.category
//   );
//   const { addRemoveLoader } = useSelector((state) => state.wishlist || {});

//   // Use passed userId if available, otherwise fallback to logged-in customerId
//   const userId = paramUserId || customerId;

//   const [products, setProducts] = useState([]);
//   const [sortModalVisible, setSortModalVisible] = useState(false);
//   const [filterModalVisible, setFilterModalVisible] = useState(false);

//   // Determine page title
// const pageTitle = categoryName || collection || gender || 'Products';

//   // Fetch products whenever userId, categoryId or gender changes
//   // useEffect(() => {
//   //   if (userId && (categoryId || gender)) {
//   //     dispatch(fetchProducts({ userId, categoryId, gender }));
//   //   }
//   // }, [userId, categoryId, gender, dispatch]);
// useEffect(() => {
//   if (userId && (categoryId || gender)) {
//     dispatch(fetchProducts({ userId, categoryId, gender }));
//   }
//   // If only collection is passed → don't fetch yet (or show placeholder)
// }, [userId, categoryId, gender, dispatch]);
//   // Sync Redux products to local state for optimistic UI updates
//   useEffect(() => {
//     setProducts(rawProducts || []);
//   }, [rawProducts]);

//   const handleWishlistToggle = async (item) => {
//     if (!userId) {
//       Alert.alert(
//         'Sign In Required',
//         'Please sign in to manage your wishlist.',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Sign In', onPress: () => navigation.navigate('SignIn') },
//         ]
//       );
//       return;
//     }

//     const isWishlisted = item.wishlist_flag === 1;
//     const productId = item.id;

//     if (isWishlisted && item.wishlist_id) {
//       // Remove from wishlist
//       try {
//         await dispatch(removeFromWishlist({ wishlist_id: item.wishlist_id })).unwrap();
//         setProducts((prev) =>
//           prev.map((p) =>
//             p.id === productId
//               ? { ...p, wishlist_flag: 0, wishlist_id: null }
//               : p
//           )
//         );
//       } catch (err) {
//         Alert.alert('Error', 'Failed to remove from wishlist');
//       }
//     } else {
//       // Add to wishlist
//       try {
//         const result = await dispatch(
//           addToWishlist({ user_id: userId, product_id: productId })
//         ).unwrap();

//         let newWishlistId = item.wishlist_id;
//         if (result && result.wishlist_id) {
//           newWishlistId = result.wishlist_id;
//         }

//         setProducts((prev) =>
//           prev.map((p) =>
//             p.id === productId
//               ? { ...p, wishlist_flag: 1, wishlist_id: newWishlistId || p.wishlist_id }
//               : p
//           )
//         );
//       } catch (err) {
//         if (err?.already_exists) {
//           setProducts((prev) =>
//             prev.map((p) =>
//               p.id === productId
//                 ? { ...p, wishlist_flag: 1 }
//                 : p
//             )
//           );
//         } else {
//           Alert.alert('Error', 'Failed to add to wishlist');
//         }
//       }
//     }
//   };

//   const handleProductPress = (product) => {
//     navigation.navigate('ProductDetailsScreen', {
//       product_id: product.id,
//       user_id: userId,
//     });
//   };

//   // Restructure products into rows of 2 for grid layout
//   const restructureData = () => {
//     const rows = [];
//     let tempRow = [];

//     products.forEach((item) => {
//       tempRow.push(item);
//       if (tempRow.length === 2) {
//         rows.push({ id: `row-${rows.length}`, type: 'row', items: [...tempRow] });
//         tempRow = [];
//       }
//     });

//     if (tempRow.length > 0) {
//       rows.push({ id: `row-${rows.length}`, type: 'row', items: [...tempRow] });
//     }

//     return rows;
//   };

//   const renderProductCard = (item) => {
//     const isWishlisted = item.wishlist_flag === 1;
//     const isLoading = addRemoveLoader === item.id;

//     return (
//       <TouchableOpacity
//         style={[styles.card, { height: CARD_HEIGHT }]}
//         onPress={() => handleProductPress(item)}
//         activeOpacity={0.8}
//       >
//         <TouchableOpacity
//           style={styles.favoriteIcon}
//           onPress={(e) => {
//             e.stopPropagation();
//             handleWishlistToggle(item);
//           }}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator size={20} color="#FF0000" />
//           ) : (
//             <Ionicons
//               name={isWishlisted ? 'heart' : 'heart-outline'}
//               size={22}
//               color={isWishlisted ? '#FF0000' : '#666'}
//             />
//           )}
//         </TouchableOpacity>

//         <Image
//           source={{ uri: item.product_main_image }}
//           style={styles.image}
//           resizeMode="contain"
//           defaultSource={require('../assets/profile1.png')}
//         />

//         <View style={styles.content}>
//           <Text style={styles.title} numberOfLines={2}>
//             {item.product_name}
//           </Text>

//           <View style={styles.buttonRow}>
//             <TouchableOpacity style={styles.viewSimilarButton}>
//               <Text style={styles.viewSimilarText}>View Similar</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.cartIconButton}
//               onPress={(e) => {
//                 e.stopPropagation();
//                 navigation.navigate('Cart');
//               }}
//             >
//               <Ionicons name="cart-outline" size={18} color="#832729" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const renderRow = ({ item }) => {
//     if (item.type === 'row') {
//       return (
//         <View style={styles.row}>
//           {item.items.map((product) => (
//             <View key={product.id} style={styles.cardWrapper}>
//               {renderProductCard(product)}
//             </View>
//           ))}
//           {item.items.length === 1 && <View style={[styles.cardWrapper, { opacity: 0 }]} />}
//         </View>
//       );
//     }
//     return null;
//   };

//   const structuredData = restructureData();

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

//       {/* Header */}
//       <View style={[styles.topHeader, { paddingTop: insets.top + 10 }]}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Image
//           source={require('../assets/geethalogo.png')}
//           style={styles.headerLogo}
//           resizeMode="contain"
//         />
//         <View style={styles.headerIcons}>
//           <TouchableOpacity onPress={() => navigation.navigate('WishList')}>
//             <Ionicons name="heart-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
//             <Ionicons name="cart-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Ionicons name="notifications-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Title & Result Count */}
//       {/* <View style={styles.filterRow}>
//         <View style={styles.filterLeft}>
//           <Text style={styles.filterTitle}>{pageTitle}</Text>
//           <Text style={styles.resultCount}>({products.length} results)</Text>
//         </View>
//       </View> */}

//       {/* Content States */}
//       {productsLoading ? (
//         <View style={styles.centerContent}>
//           <ActivityIndicator size="large" color="#832729" />
//           <Text style={styles.loadingText}>Loading products...</Text>
//         </View>
//       ) : productsError ? (
//         <View style={styles.centerContent}>
//           <Text style={styles.errorText}>Error: {productsError}</Text>
//           <TouchableOpacity
//             onPress={() => dispatch(fetchProducts({ userId, categoryId, gender }))}
//             style={styles.retryButton}
//           >
//             <Text style={styles.retryText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       ) : products.length === 0 ? (
//         <View style={styles.centerContent}>
//           <Text style={styles.emptyText}>No products found.</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={structuredData}
//           keyExtractor={(item) => item.id}
//           renderItem={renderRow}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
//         />
//       )}

//       {/* Bottom Filter Bar */}
//       <View style={[styles.bottomFilterBar, { paddingBottom: insets.bottom + 10 }]}>
//         <TouchableOpacity
//           style={styles.bottomFilterButton}
//           onPress={() => setFilterModalVisible(true)}
//         >
//           <Ionicons name="filter-outline" size={18} color="#832729" />
//           <Text style={styles.bottomFilterText}>Filter</Text>
//         </TouchableOpacity>

//         <View style={styles.dividerLine} />

//         <TouchableOpacity
//           style={styles.bottomFilterButton}
//           onPress={() => setSortModalVisible(true)}
//         >
//           <Ionicons name="swap-vertical" size={18} color="#832729" />
//           <Text style={styles.bottomFilterText}>Sort by</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Sort Modal */}
//       <Modal visible={sortModalVisible} transparent animationType="slide" onRequestClose={() => setSortModalVisible(false)}>
//         <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setSortModalVisible(false)}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Sort by</Text>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Popular</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Price: Low to High</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Price: High to Low</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Newest First</Text></TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>

//       {/* Filter Modal */}
//       <Modal visible={filterModalVisible} transparent animationType="slide" onRequestClose={() => setFilterModalVisible(false)}>
//         <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setFilterModalVisible(false)}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Filter Options</Text>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Gold</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Diamond</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Platinum</Text></TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   topHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerLogo: { width: responsiveWidth(30), height: 40 },
//   headerIcons: { flexDirection: 'row', gap: 12 },
//   filterRow: { paddingHorizontal: 16, marginVertical: 12 },
//   filterLeft: { flexDirection: 'column' },
//   filterTitle: { fontSize: 20, fontWeight: '700', color: '#000' },
//   resultCount: { fontSize: 13, color: '#666', marginTop: 4 },
//   row: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 16 },
//   cardWrapper: { width: ITEM_WIDTH },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#eee',
//     padding: 10,
//     position: 'relative',
//     shadowColor: '#53724A',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   favoriteIcon: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     zIndex: 10,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   image: { width: '100%', height: 140, marginBottom: 10 },
//   content: { flex: 1, justifyContent: 'space-between' },
//   title: { fontSize: 13, fontWeight: '600', color: '#222', marginBottom: 8 },
//   buttonRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   viewSimilarButton: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#832729',
//     borderRadius: 6,
//     paddingVertical: 8,
//     alignItems: 'center',
//   },
//   viewSimilarText: { color: '#832729', fontSize: 12, fontWeight: '600' },
//   cartIconButton: {
//     backgroundColor: '#fff',
//     borderRadius: 6,
//     padding: 8,
//     borderWidth: 1,
//     borderColor: '#832729',
//   },
//   centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
//   loadingText: { marginTop: 10, fontSize: 16, color: '#832729' },
//   errorText: { fontSize: 16, color: 'red', textAlign: 'center', marginBottom: 10 },
//   emptyText: { fontSize: 16, color: '#666' },
//   retryButton: { backgroundColor: '#832729', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
//   retryText: { color: '#fff', fontWeight: '600' },
//   bottomFilterBar: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 60,
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 10,
//   },
//   bottomFilterButton: { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   bottomFilterText: { color: '#832729', fontSize: 15, fontWeight: '600' },
//   dividerLine: { width: 1, height: 30, backgroundColor: '#ddd' },
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
//   modalContainer: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: '60%',
//   },
//   modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16, color: '#000' },
//   modalOption: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#eee' },
//   modalOptionText: { fontSize: 16, color: '#333' },
// });

// export default IndividualCategory;
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Dimensions,
//   Modal,
//   StatusBar,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { responsiveWidth } from 'react-native-responsive-dimensions';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from '../redux/slices/wishlistSlice';
// import { fetchProducts } from '../redux/slices/categorySlice';

// const { width } = Dimensions.get('window');
// const ITEM_WIDTH = (width - 48) / 2;
// const CARD_HEIGHT = 250;

// const IndividualCategory = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const route = useRoute();
//   const dispatch = useDispatch();

//   // Extract only necessary params
//   const { userId: paramUserId, analyticsPayload } = route.params || {};

//   const { customerId } = useSelector((state) => state.Auth || {});
//   const { products: rawProducts, loading: productsLoading, error: productsError } = useSelector(
//     (state) => state.category
//   );
//   const { addRemoveLoader } = useSelector((state) => state.wishlist || {});

//   // Final userId (passed > logged in > fallback)
//   const userId = paramUserId || customerId || 1;

//   const [products, setProducts] = useState([]);
//   const [sortModalVisible, setSortModalVisible] = useState(false);
//   const [filterModalVisible, setFilterModalVisible] = useState(false);

//   // Derived values from analyticsPayload
//   let fetchCategoryId = undefined;
//   let fetchGender = undefined;
//   let pageTitle = 'Products';

//   if (analyticsPayload) {
//     const { section_type, reference_id, reference_name } = analyticsPayload;

//     if (section_type === 'Category' || section_type === 'Diamond') {
//       fetchCategoryId = reference_id;
//       pageTitle = reference_name || section_type || 'Category Products';
//     } else if (section_type === 'Gender') {
//       fetchGender = reference_id || reference_name;
//       pageTitle = fetchGender || 'Products';
//     }
//     // Future: add "Collection" support here if needed
//   }

//   // Fetch products when userId or filters change
//   useEffect(() => {
//     if (userId && (fetchCategoryId || fetchGender)) {
//       dispatch(
//         fetchProducts({
//           userId,
//           categoryId: fetchCategoryId,
//           gender: fetchGender,
//         })
//       );
//     }
//   }, [userId, fetchCategoryId, fetchGender, dispatch]);

//   // Sync products from Redux
//   useEffect(() => {
//     setProducts(rawProducts || []);
//   }, [rawProducts]);

//   const handleWishlistToggle = async (item) => {
//     if (!userId || userId === 1) {
//       Alert.alert(
//         'Sign In Required',
//         'Please sign in to manage your wishlist.',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Sign In', onPress: () => navigation.navigate('SignIn') },
//         ]
//       );
//       return;
//     }

//     const isWishlisted = item.wishlist_flag === 1;
//     const productId = item.id;

//     if (isWishlisted && item.wishlist_id) {
//       try {
//         await dispatch(removeFromWishlist({ wishlist_id: item.wishlist_id })).unwrap();
//         setProducts((prev) =>
//           prev.map((p) =>
//             p.id === productId ? { ...p, wishlist_flag: 0, wishlist_id: null } : p
//           )
//         );
//       } catch (err) {
//         Alert.alert('Error', 'Failed to remove from wishlist');
//       }
//     } else {
//       try {
//         const result = await dispatch(
//           addToWishlist({ user_id: userId, product_id: productId })
//         ).unwrap();

//         const newWishlistId = result?.wishlist_id || item.wishlist_id;

//         setProducts((prev) =>
//           prev.map((p) =>
//             p.id === productId
//               ? { ...p, wishlist_flag: 1, wishlist_id: newWishlistId }
//               : p
//           )
//         );
//       } catch (err) {
//         if (err?.already_exists) {
//           setProducts((prev) =>
//             prev.map((p) => (p.id === productId ? { ...p, wishlist_flag: 1 } : p))
//           );
//         } else {
//           Alert.alert('Error', 'Failed to add to wishlist');
//         }
//       }
//     }
//   };

//   const handleProductPress = (product) => {
//     navigation.navigate('ProductDetailsScreen', {
//       product_id: product.id,
//       user_id: userId,
//     });
//   };

//   // Grid layout: restructure into rows of 2
//   const restructureData = () => {
//     const rows = [];
//     let tempRow = [];

//     products.forEach((item) => {
//       tempRow.push(item);
//       if (tempRow.length === 2) {
//         rows.push({ id: `row-${rows.length}`, type: 'row', items: [...tempRow] });
//         tempRow = [];
//       }
//     });

//     if (tempRow.length > 0) {
//       rows.push({ id: `row-${rows.length}`, type: 'row', items: [...tempRow] });
//     }

//     return rows;
//   };

//   const renderProductCard = (item) => {
//     const isWishlisted = item.wishlist_flag === 1;
//     const isLoading = addRemoveLoader === item.id;

//     return (
//       <TouchableOpacity
//         style={[styles.card, { height: CARD_HEIGHT }]}
//         onPress={() => handleProductPress(item)}
//         activeOpacity={0.8}
//       >
//         <TouchableOpacity
//           style={styles.favoriteIcon}
//           onPress={(e) => {
//             e.stopPropagation();
//             handleWishlistToggle(item);
//           }}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator size={20} color="#FF0000" />
//           ) : (
//             <Ionicons
//               name={isWishlisted ? 'heart' : 'heart-outline'}
//               size={22}
//               color={isWishlisted ? '#FF0000' : '#666'}
//             />
//           )}
//         </TouchableOpacity>

//         <Image
//           source={{ uri: item.product_main_image }}
//           style={styles.image}
//           resizeMode="contain"
//           defaultSource={require('../assets/profile1.png')}
//         />

//         <View style={styles.content}>
//           <Text style={styles.title} numberOfLines={2}>
//             {item.product_name}
//           </Text>

//           <View style={styles.buttonRow}>
//             <TouchableOpacity style={styles.viewSimilarButton}>
//               <Text style={styles.viewSimilarText}>View Similar</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.cartIconButton}
//               onPress={(e) => {
//                 e.stopPropagation();
//                 navigation.navigate('Cart');
//               }}
//             >
//               <Ionicons name="cart-outline" size={18} color="#832729" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const renderRow = ({ item }) => {
//     if (item.type === 'row') {
//       return (
//         <View style={styles.row}>
//           {item.items.map((product) => (
//             <View key={product.id} style={styles.cardWrapper}>
//               {renderProductCard(product)}
//             </View>
//           ))}
//           {item.items.length === 1 && <View style={[styles.cardWrapper, { opacity: 0 }]} />}
//         </View>
//       );
//     }
//     return null;
//   };

//   const structuredData = restructureData();

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

//       {/* Header */}
//       <View style={[styles.topHeader, { paddingTop: insets.top + 10 }]}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Image
//           source={require('../assets/geethalogo.png')}
//           style={styles.headerLogo}
//           resizeMode="contain"
//         />
//         <View style={styles.headerIcons}>
//           <TouchableOpacity onPress={() => navigation.navigate('WishList')}>
//             <Ionicons name="heart-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
//             <Ionicons name="cart-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Ionicons name="notifications-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Page Title */}
//       <View style={styles.filterRow}>
//         <Text style={styles.filterTitle}>{pageTitle}</Text>
//         <Text style={styles.resultCount}>({products.length} results)</Text>
//       </View>

//       {/* Content States */}
//       {productsLoading ? (
//         <View style={styles.centerContent}>
//           <ActivityIndicator size="large" color="#832729" />
//           <Text style={styles.loadingText}>Loading products...</Text>
//         </View>
//       ) : productsError ? (
//         <View style={styles.centerContent}>
//           <Text style={styles.errorText}>Error: {productsError}</Text>
//           <TouchableOpacity
//             onPress={() =>
//               dispatch(fetchProducts({ userId, categoryId: fetchCategoryId, gender: fetchGender }))
//             }
//             style={styles.retryButton}
//           >
//             <Text style={styles.retryText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       ) : products.length === 0 ? (
//         <View style={styles.centerContent}>
//           <Text style={styles.emptyText}>No products found.</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={structuredData}
//           keyExtractor={(item) => item.id}
//           renderItem={renderRow}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
//         />
//       )}

//       {/* Bottom Filter Bar */}
//       <View style={[styles.bottomFilterBar, { paddingBottom: insets.bottom + 10 }]}>
//         <TouchableOpacity
//           style={styles.bottomFilterButton}
//           onPress={() => setFilterModalVisible(true)}
//         >
//           <Ionicons name="filter-outline" size={18} color="#832729" />
//           <Text style={styles.bottomFilterText}>Filter</Text>
//         </TouchableOpacity>

//         <View style={styles.dividerLine} />

//         <TouchableOpacity
//           style={styles.bottomFilterButton}
//           onPress={() => setSortModalVisible(true)}
//         >
//           <Ionicons name="swap-vertical" size={18} color="#832729" />
//           <Text style={styles.bottomFilterText}>Sort by</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Sort Modal */}
//       <Modal visible={sortModalVisible} transparent animationType="slide" onRequestClose={() => setSortModalVisible(false)}>
//         <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setSortModalVisible(false)}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Sort by</Text>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Popular</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Price: Low to High</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Price: High to Low</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Newest First</Text></TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>

//       {/* Filter Modal */}
//       <Modal visible={filterModalVisible} transparent animationType="slide" onRequestClose={() => setFilterModalVisible(false)}>
//         <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setFilterModalVisible(false)}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Filter Options</Text>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Gold</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Diamond</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}><Text style={styles.modalOptionText}>Platinum</Text></TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   topHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerLogo: { width: responsiveWidth(30), height: 40 },
//   headerIcons: { flexDirection: 'row', gap: 12 },
//   filterRow: { paddingHorizontal: 16, marginVertical: 12 },
//   filterTitle: { fontSize: 20, fontWeight: '700', color: '#000' },
//   resultCount: { fontSize: 13, color: '#666', marginTop: 4 },
//   row: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 16 },
//   cardWrapper: { width: ITEM_WIDTH },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#eee',
//     padding: 10,
//     position: 'relative',
//     shadowColor: '#53724A',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   favoriteIcon: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     zIndex: 10,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   image: { width: '100%', height: 140, marginBottom: 10 },
//   content: { flex: 1, justifyContent: 'space-between' },
//   title: { fontSize: 13, fontWeight: '600', color: '#222', marginBottom: 8 },
//   buttonRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   viewSimilarButton: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#832729',
//     borderRadius: 6,
//     paddingVertical: 8,
//     alignItems: 'center',
//   },
//   viewSimilarText: { color: '#832729', fontSize: 12, fontWeight: '600' },
//   cartIconButton: {
//     backgroundColor: '#fff',
//     borderRadius: 6,
//     padding: 8,
//     borderWidth: 1,
//     borderColor: '#832729',
//   },
//   centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
//   loadingText: { marginTop: 10, fontSize: 16, color: '#832729' },
//   errorText: { fontSize: 16, color: 'red', textAlign: 'center', marginBottom: 10 },
//   emptyText: { fontSize: 16, color: '#666' },
//   retryButton: { backgroundColor: '#832729', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
//   retryText: { color: '#fff', fontWeight: '600' },
//   bottomFilterBar: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 60,
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 10,
//   },
//   bottomFilterButton: { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   bottomFilterText: { color: '#832729', fontSize: 15, fontWeight: '600' },
//   dividerLine: { width: 1, height: 30, backgroundColor: '#ddd' },
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
//   modalContainer: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: '60%',
//   },
//   modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16, color: '#000' },
//   modalOption: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#eee' },
//   modalOptionText: { fontSize: 16, color: '#333' },
// });

// export default IndividualCategory;
// import React, { useEffect, useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Dimensions,
//   Modal,
//   StatusBar,
//   Alert,
//   Animated,
//   Easing,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { responsiveWidth } from 'react-native-responsive-dimensions';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from '../redux/slices/wishlistSlice';
// import { fetchProducts } from '../redux/slices/categorySlice';

// const { width } = Dimensions.get('window');
// const ITEM_WIDTH = (width - 48) / 2; // 16px padding + 16px gap
// const CARD_HEIGHT = 280;

// // Shimmer Placeholder Component
// const ShimmerPlaceholder = ({ width = '100%', height = 20, style }) => {
//   const animatedValue = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.loop(
//       Animated.timing(animatedValue, {
//         toValue: 1,
//         duration: 1200,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       })
//     ).start();
//   }, [animatedValue]);

//   const translateX = animatedValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: [-parseFloat(width), parseFloat(width)],
//   });

//   return (
//     <View
//       style={[
//         { backgroundColor: '#e8e8e8', borderRadius: 6, overflow: 'hidden' },
//         typeof width === 'string' ? { width } : { width },
//         { height },
//         style,
//       ]}
//     >
//       <Animated.View
//         style={{
//           width: '100%',
//           height: '100%',
//           backgroundColor: 'rgba(255, 255, 255, 0.8)',
//           transform: [{ translateX }],
//         }}
//       />
//     </View>
//   );
// };

// // Skeleton Card Component
// const SkeletonCard = () => (
//   <View style={styles.skeletonCard}>
//     {/* Heart Icon Placeholder */}
//     <View style={styles.favoriteIcon}>
//       <View style={{ width: 22, height: 22, backgroundColor: '#e0e0e0', borderRadius: 11 }} />
//     </View>

//     {/* Image Placeholder */}
//     <ShimmerPlaceholder height={140} style={{ marginBottom: 10 }} />

//     {/* Title & Content Placeholders */}
//     <View style={{ paddingHorizontal: 4 }}>
//       <ShimmerPlaceholder height={12} style={{ marginBottom: 8 }} />
//       <ShimmerPlaceholder height={12} width="75%" style={{ marginBottom: 16 }} />

//       {/* Button Row */}
//       <View style={styles.buttonRow}>
//         <ShimmerPlaceholder style={styles.skeletonButton} />
//         <View style={{ width: 8 }} />
//         <ShimmerPlaceholder style={styles.skeletonIcon} />
//       </View>
//     </View>
//   </View>
// );

// const IndividualCategory = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const route = useRoute();
//   const dispatch = useDispatch();

//   const {
//     userId: paramUserId,
//     categoryId,
//     categoryName,
//     analyticsPayload,
//   } = route.params || {};

//   const { customerId } = useSelector((state) => state.Auth || {});
//   const { addRemoveLoader } = useSelector((state) => state.wishlist || {});

//   const {
//     products: rawProducts = [],
//     productsLoading,
//     productsError,
//   } = useSelector((state) => state.category);

//   const userId = paramUserId || customerId || 1;

//   const [products, setProducts] = useState([]);
//   const [pageTitle, setPageTitle] = useState('Products');
//   const [sortModalVisible, setSortModalVisible] = useState(false);
//   const [filterModalVisible, setFilterModalVisible] = useState(false);

//   useEffect(() => {
//     let title = 'Products';
//     let fetchPayload = { userId };

//     if (categoryId !== undefined) {
//       fetchPayload.categoryId = categoryId;
//       title = categoryName || 'Category Products';
//     } else if (analyticsPayload) {
//       const {
//         target_type,
//         target_value,
//         section_type,
//         reference_id,
//         reference_name,
//       } = analyticsPayload;

//       if (target_type && target_value !== undefined) {
//         fetchPayload.target_type = target_type;
//         fetchPayload.target_value = target_value;
//         title = reference_name || 'Featured Products';
//       } else if (section_type && reference_id !== undefined) {
//         fetchPayload.section_type = section_type;
//         fetchPayload.reference_id = reference_id;
//         title = reference_name || section_type || 'Products';
//       }
//     }

//     setPageTitle(title);

//     if (
//       categoryId !== undefined ||
//       (analyticsPayload &&
//         ((analyticsPayload.target_type && analyticsPayload.target_value) ||
//           (analyticsPayload.section_type && analyticsPayload.reference_id)))
//     ) {
//       dispatch(fetchProducts(fetchPayload));
//     }
//   }, [userId, categoryId, analyticsPayload, dispatch]);

//   useEffect(() => {
//     setProducts(rawProducts);
//   }, [rawProducts]);

//   const handleWishlistToggle = async (item) => {
//     if (!userId || userId === 1) {
//       Alert.alert(
//         'Sign In Required',
//         'Please sign in to manage your wishlist.',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Sign In', onPress: () => navigation.navigate('SignIn') },
//         ]
//       );
//       return;
//     }

//     const isWishlisted = item.wishlist_flag === 1;
//     const productId = item.id;

//     if (isWishlisted && item.wishlist_id) {
//       try {
//         await dispatch(removeFromWishlist({ wishlist_id: item.wishlist_id })).unwrap();
//         setProducts((prev) =>
//           prev.map((p) =>
//             p.id === productId ? { ...p, wishlist_flag: 0, wishlist_id: null } : p
//           )
//         );
//       } catch (err) {
//         Alert.alert('Error', 'Failed to remove from wishlist');
//       }
//     } else {
//       try {
//         const result = await dispatch(
//           addToWishlist({ user_id: userId, product_id: productId })
//         ).unwrap();

//         const newWishlistId = result?.wishlist_id;

//         setProducts((prev) =>
//           prev.map((p) =>
//             p.id === productId
//               ? { ...p, wishlist_flag: 1, wishlist_id: newWishlistId }
//               : p
//           )
//         );
//       } catch (err) {
//         if (err?.already_exists) {
//           setProducts((prev) =>
//             prev.map((p) => (p.id === productId ? { ...p, wishlist_flag: 1 } : p))
//           );
//         } else {
//           Alert.alert('Error', 'Failed to add to wishlist');
//         }
//       }
//     }
//   };

//   const handleProductPress = (product) => {
//     navigation.navigate('ProductDetailsScreen', {
//       product_id: product.id,
//       user_id: userId,
//     });
//   };

//   const restructureData = () => {
//     const rows = [];
//     let tempRow = [];

//     products.forEach((item) => {
//       tempRow.push(item);
//       if (tempRow.length === 2) {
//         rows.push({ id: `row-${rows.length}`, type: 'row', items: [...tempRow] });
//         tempRow = [];
//       }
//     });

//     if (tempRow.length > 0) {
//       rows.push({ id: `row-${rows.length}`, type: 'row', items: [...tempRow] });
//     }

//     return rows;
//   };

//   const renderProductCard = (item) => {
//     const isWishlisted = item.wishlist_flag === 1;
//     const isLoading = addRemoveLoader === item.id;

//     return (
//       <TouchableOpacity
//         style={[styles.card, { height: CARD_HEIGHT }]}
//         onPress={() => handleProductPress(item)}
//         activeOpacity={0.85}
//       >
//         <TouchableOpacity
//           style={styles.favoriteIcon}
//           onPress={(e) => {
//             e.stopPropagation();
//             handleWishlistToggle(item);
//           }}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator size={18} color="#832729" />
//           ) : (
//             <Ionicons
//               name={isWishlisted ? 'heart' : 'heart-outline'}
//               size={22}
//               color={isWishlisted ? '#FF0000' : '#666'}
//             />
//           )}
//         </TouchableOpacity>

//         <Image
//           source={{ uri: item.product_main_image }}
//           style={styles.image}
//           resizeMode="contain"
//         />

//         <View style={styles.content}>
//           <Text style={styles.title} numberOfLines={2}>
//             {item.product_name}
//           </Text>
//           <Text style={styles.title} numberOfLines={2}>
//             ₹ {item.total_price}
//           </Text>

//           <View style={styles.buttonRow}>
//             <TouchableOpacity style={styles.viewSimilarButton}>
//               <Text style={styles.viewSimilarText}>View Similar</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.cartIconButton}
//               onPress={(e) => {
//                 e.stopPropagation();
//                 navigation.navigate('Cart');
//               }}
//             >
//               <Ionicons name="cart-outline" size={18} color="#832729" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const renderRow = ({ item }) => {
//     if (item.type === 'row') {
//       return (
//         <View style={styles.row}>
//           {item.items.map((product) => (
//             <View key={product.id} style={styles.cardWrapper}>
//               {renderProductCard(product)}
//             </View>
//           ))}
//           {item.items.length === 1 && <View style={[styles.cardWrapper, { opacity: 0 }]} />}
//         </View>
//       );
//     }
//     return null;
//   };

//   const structuredData = restructureData();

//   // Skeleton Loading Grid
//   const renderSkeletonGrid = () => {
//     const skeletonIndices = [0, 1, 2, 3, 4, 5, 6, 7]; // 8 cards → 4 rows

//     return (
//       <FlatList
//         data={skeletonIndices}
//         keyExtractor={(item) => `skeleton-${item}`}
//         renderItem={({ index }) => {
//           const isEven = index % 2 === 0;
//           return (
//             <View style={styles.row}>
//               <View style={styles.cardWrapper}>
//                 <SkeletonCard />
//               </View>
//               {isEven && index < 7 && (
//                 <View style={styles.cardWrapper}>
//                   <SkeletonCard />
//                 </View>
//               )}
//               {isEven && index >= 6 && <View style={[styles.cardWrapper, { opacity: 0 }]} />}
//             </View>
//           );
//         }}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
//       />
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

//       {/* Header */}
//       <View style={[styles.topHeader, { paddingTop: insets.top + 10 }]}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>

//         <Image
//           source={require('../assets/geethalogo.png')}
//           style={styles.headerLogo}
//           resizeMode="contain"
//         />

//         <View style={styles.headerIcons}>
//           <TouchableOpacity onPress={() => navigation.navigate('WishList')}>
//             <Ionicons name="heart-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
//             <Ionicons name="cart-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Ionicons name="notifications-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Title & Result Count */}
//       {/* <View style={styles.filterRow}>
//         <Text style={styles.filterTitle}>{pageTitle}</Text>
//         <Text style={styles.resultCount}>
//           {productsLoading ? '' : `(${products.length} results)`}
//         </Text>
//       </View> */}

//       {/* Content States */}
//       {productsLoading ? (
//         renderSkeletonGrid()
//       ) : productsError ? (
//         <View style={styles.centerContent}>
//           <Text style={styles.errorText}>Error: {productsError}</Text>
//           <TouchableOpacity
//             onPress={() => {
//               const payload = categoryId
//                 ? { userId, categoryId }
//                 : analyticsPayload
//                 ? { userId, ...analyticsPayload }
//                 : { userId };
//               dispatch(fetchProducts(payload));
//             }}
//             style={styles.retryButton}
//           >
//             <Text style={styles.retryText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       ) : products.length === 0 ? (
//         <View style={styles.centerContent}>
//           <Text style={styles.emptyText}>No products found.</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={structuredData}
//           keyExtractor={(item) => item.id}
//           renderItem={renderRow}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
//         />
//       )}

//       {/* Bottom Filter Bar */}
//       <View style={[styles.bottomFilterBar, { paddingBottom: insets.bottom + 10 }]}>
//         <TouchableOpacity
//           style={styles.bottomFilterButton}
//           onPress={() => setFilterModalVisible(true)}
//         >
//           <Ionicons name="filter-outline" size={18} color="#832729" />
//           <Text style={styles.bottomFilterText}>Filter</Text>
//         </TouchableOpacity>

//         <View style={styles.dividerLine} />

//         <TouchableOpacity
//           style={styles.bottomFilterButton}
//           onPress={() => setSortModalVisible(true)}
//         >
//           <Ionicons name="swap-vertical" size={18} color="#832729" />
//           <Text style={styles.bottomFilterText}>Sort by</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Sort Modal */}
//       <Modal
//         visible={sortModalVisible}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setSortModalVisible(false)}
//       >
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPressOut={() => setSortModalVisible(false)}
//         >
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Sort by</Text>
//             <TouchableOpacity style={styles.modalOption}>
//               <Text style={styles.modalOptionText}>Popular</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}>
//               <Text style={styles.modalOptionText}>Price: Low to High</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}>
//               <Text style={styles.modalOptionText}>Price: High to Low</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}>
//               <Text style={styles.modalOptionText}>Newest First</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>

//       {/* Filter Modal */}
//       <Modal
//         visible={filterModalVisible}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setFilterModalVisible(false)}
//       >
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPressOut={() => setFilterModalVisible(false)}
//         >
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Filter Options</Text>
//             <TouchableOpacity style={styles.modalOption}>
//               <Text style={styles.modalOptionText}>Gold</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}>
//               <Text style={styles.modalOptionText}>Diamond</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.modalOption}>
//               <Text style={styles.modalOptionText}>Platinum</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   topHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerLogo: { width: responsiveWidth(30), height: 40 },
//   headerIcons: { flexDirection: 'row', gap: 12 },
//   filterRow: { paddingHorizontal: 16, marginVertical: 12 },
//   filterTitle: { fontSize: 20, fontWeight: '700', color: '#000' },
//   resultCount: { fontSize: 13, color: '#666', marginTop: 4 },
//   row: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 16 ,marginTop:10},
//   cardWrapper: { width: ITEM_WIDTH },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#eee',
//     padding: 10,
//     position: 'relative',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   skeletonCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#eee',
//     padding: 10,
//     height: CARD_HEIGHT,
//     position: 'relative',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   favoriteIcon: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     zIndex: 10,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 6,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   image: { width: '100%', height: 140, marginBottom: 10 },
//   content: { flex: 1, justifyContent: 'space-between' },
//   title: { fontSize: 13, fontWeight: '600', color: '#222', marginBottom: 8 },
//   buttonRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   viewSimilarButton: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#832729',
//     borderRadius: 6,
//     paddingVertical: 8,
//     alignItems: 'center',
//   },
//   viewSimilarText: { color: '#832729', fontSize: 12, fontWeight: '600' },
//   cartIconButton: {
//     backgroundColor: '#fff',
//     borderRadius: 6,
//     padding: 6,
//     borderWidth: 1,
//     borderColor: '#832729',
//   },
//   skeletonButton: {
//     flex: 1,
//     height: 32,
//   },
//   skeletonIcon: {
//     width: 32,
//     height: 32,
//   },
//   centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
//   errorText: { fontSize: 16, color: 'red', textAlign: 'center', marginBottom: 10 },
//   emptyText: { fontSize: 16, color: '#666' },
//   retryButton: { backgroundColor: '#832729', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
//   retryText: { color: '#fff', fontWeight: '600' },
//   bottomFilterBar: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 60,
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 10,
//   },
//   bottomFilterButton: { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   bottomFilterText: { color: '#832729', fontSize: 15, fontWeight: '600' },
//   dividerLine: { width: 1, height: 30, backgroundColor: '#ddd' },
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
//   modalContainer: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: '60%',
//   },
//   modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16, color: '#000' },
//   modalOption: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#eee' },
//   modalOptionText: { fontSize: 16, color: '#333' },
// });

// export default IndividualCategory;
// import React, { useEffect, useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Dimensions,
//   Modal,
//   StatusBar,
//   Alert,
//   Animated,
//   Easing,
//   ActivityIndicator,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { responsiveWidth } from 'react-native-responsive-dimensions';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from '../redux/slices/wishlistSlice';
// import { fetchProducts } from '../redux/slices/categorySlice';

// const { width } = Dimensions.get('window');
// const ITEM_WIDTH = (width - 48) / 2;
// const CARD_HEIGHT = 280;

// // Shimmer Placeholder Component
// const ShimmerPlaceholder = ({ width = '100%', height = 20, style }) => {
//   const animatedValue = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.loop(
//       Animated.timing(animatedValue, {
//         toValue: 1,
//         duration: 1200,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       })
//     ).start();
//   }, [animatedValue]);

//   const translateX = animatedValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: [-parseFloat(width), parseFloat(width)],
//   });

//   return (
//     <View
//       style={[
//         { backgroundColor: '#e8e8e8', borderRadius: 6, overflow: 'hidden' },
//         typeof width === 'string' ? { width } : { width },
//         { height },
//         style,
//       ]}
//     >
//       <Animated.View
//         style={{
//           width: '100%',
//           height: '100%',
//           backgroundColor: 'rgba(255, 255, 255, 0.8)',
//           transform: [{ translateX }],
//         }}
//       />
//     </View>
//   );
// };

// // Skeleton Card Component
// const SkeletonCard = () => (
//   <View style={styles.skeletonCard}>
//     <View style={styles.favoriteIcon}>
//       <View style={{ width: 22, height: 22, backgroundColor: '#e0e0e0', borderRadius: 11 }} />
//     </View>

//     <ShimmerPlaceholder height={140} style={{ marginBottom: 10 }} />

//     <View style={{ paddingHorizontal: 4 }}>
//       <ShimmerPlaceholder height={12} style={{ marginBottom: 8 }} />
//       <ShimmerPlaceholder height={12} width="75%" style={{ marginBottom: 16 }} />

//       <View style={styles.buttonRow}>
//         <ShimmerPlaceholder style={styles.skeletonButton} />
//         <View style={{ width: 8 }} />
//         <ShimmerPlaceholder style={styles.skeletonIcon} />
//       </View>
//     </View>
//   </View>
// );

// const IndividualCategory = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const route = useRoute();
//   const dispatch = useDispatch();

//   const {
//     userId: paramUserId,
//     categoryId,
//     categoryName,
//     analyticsPayload,
//   } = route.params || {};

//   const { customerId } = useSelector((state) => state.Auth || {});
//   const { addRemoveLoader } = useSelector((state) => state.wishlist || {});

//   const {
//     products: rawProducts = [],
//     productsLoading,
//     productsError,
//   } = useSelector((state) => state.category);

//   const userId = paramUserId || customerId || 1;

//   const [products, setProducts] = useState([]);
//   const [pageTitle, setPageTitle] = useState('Products');
//   const [sortModalVisible, setSortModalVisible] = useState(false);
//   const [filterModalVisible, setFilterModalVisible] = useState(false);

//   // Sort & Filter States
//   const [sortBy, setSortBy] = useState('popular'); // 'popular', 'lowToHigh', 'highToLow', 'newest'
//   const [filters, setFilters] = useState({
//     gold: false,
//     diamond: false,
//     gemstone: false,
//   });

//   useEffect(() => {
//     let title = 'Products';
//     let fetchPayload = { userId };

//     if (categoryId !== undefined) {
//       fetchPayload.categoryId = categoryId;
//       title = categoryName || 'Category Products';
//     } else if (analyticsPayload) {
//       const {
//         target_type,
//         target_value,
//         section_type,
//         reference_id,
//         reference_name,
//       } = analyticsPayload;

//       if (target_type && target_value !== undefined) {
//         fetchPayload.target_type = target_type;
//         fetchPayload.target_value = target_value;
//         title = reference_name || 'Featured Products';
//       } else if (section_type && reference_id !== undefined) {
//         fetchPayload.section_type = section_type;
//         fetchPayload.reference_id = reference_id;
//         title = reference_name || section_type || 'Products';
//       }
//     }

//     setPageTitle(title);

//     if (
//       categoryId !== undefined ||
//       (analyticsPayload &&
//         ((analyticsPayload.target_type && analyticsPayload.target_value) ||
//           (analyticsPayload.section_type && analyticsPayload.reference_id)))
//     ) {
//       dispatch(fetchProducts(fetchPayload));
//     }
//   }, [userId, categoryId, analyticsPayload, dispatch]);

//   useEffect(() => {
//     setProducts(rawProducts);
//   }, [rawProducts]);

//   // Filtered & Sorted Products
//   const getFilteredAndSortedProducts = () => {
//     let filtered = [...products];

//     // Apply Filters
//     const hasActiveFilter = filters.gold || filters.diamond || filters.gemstone;
//     if (hasActiveFilter) {
//       filtered = filtered.filter((product) => {
//         const isGold = product.has_diamond === 0 && product.has_stone === 0;
//         const isDiamond = product.has_diamond === 1;
//         const isGemstone = product.has_stone === 1;

//         return (
//           (filters.gold && isGold) ||
//           (filters.diamond && isDiamond) ||
//           (filters.gemstone && isGemstone)
//         );
//       });
//     }

//     // Apply Sorting
//     const sorted = [...filtered];
//     switch (sortBy) {
//       case 'lowToHigh':
//         sorted.sort((a, b) => a.total_price - b.total_price);
//         break;
//       case 'highToLow':
//         sorted.sort((a, b) => b.total_price - a.total_price);
//         break;
//       case 'newest':
//         sorted.sort((a, b) => b.id - a.id);
//         break;
//       case 'popular':
//       default:
//         // Keep original order
//         break;
//     }

//     return sorted;
//   };

//   const displayedProducts = getFilteredAndSortedProducts();

//   const handleWishlistToggle = async (item) => {
//     if (!userId || userId === 1) {
//       Alert.alert(
//         'Sign In Required',
//         'Please sign in to manage your wishlist.',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Sign In', onPress: () => navigation.navigate('SignIn') },
//         ]
//       );
//       return;
//     }

//     const isWishlisted = item.wishlist_flag === 1;
//     const productId = item.id;

//     if (isWishlisted && item.wishlist_id) {
//       try {
//         await dispatch(removeFromWishlist({ wishlist_id: item.wishlist_id })).unwrap();
//         setProducts((prev) =>
//           prev.map((p) =>
//             p.id === productId ? { ...p, wishlist_flag: 0, wishlist_id: null } : p
//           )
//         );
//       } catch (err) {
//         Alert.alert('Error', 'Failed to remove from wishlist');
//       }
//     } else {
//       try {
//         const result = await dispatch(
//           addToWishlist({ user_id: userId, product_id: productId })
//         ).unwrap();

//         const newWishlistId = result?.wishlist_id;

//         setProducts((prev) =>
//           prev.map((p) =>
//             p.id === productId
//               ? { ...p, wishlist_flag: 1, wishlist_id: newWishlistId }
//               : p
//           )
//         );
//       } catch (err) {
//         if (err?.already_exists) {
//           setProducts((prev) =>
//             prev.map((p) => (p.id === productId ? { ...p, wishlist_flag: 1 } : p))
//           );
//         } else {
//           Alert.alert('Error', 'Failed to add to wishlist');
//         }
//       }
//     }
//   };

//   const handleProductPress = (product) => {
//     navigation.navigate('ProductDetailsScreen', {
//       product_id: product.id,
//       user_id: userId,
//     });
//   };

//   const restructureData = () => {
//     const rows = [];
//     let tempRow = [];

//     displayedProducts.forEach((item) => {
//       tempRow.push(item);
//       if (tempRow.length === 2) {
//         rows.push({ id: `row-${rows.length}`, type: 'row', items: [...tempRow] });
//         tempRow = [];
//       }
//     });

//     if (tempRow.length > 0) {
//       rows.push({ id: `row-${rows.length}`, type: 'row', items: [...tempRow] });
//     }

//     return rows;
//   };

//   const renderProductCard = (item) => {
//     const isWishlisted = item.wishlist_flag === 1;
//     const isLoading = addRemoveLoader === item.id;

//     return (
//       <TouchableOpacity
//         style={[styles.card, { height: CARD_HEIGHT }]}
//         onPress={() => handleProductPress(item)}
//         activeOpacity={0.85}
//       >
//         <TouchableOpacity
//           style={styles.favoriteIcon}
//           onPress={(e) => {
//             e.stopPropagation();
//             handleWishlistToggle(item);
//           }}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator size={18} color="#832729" />
//           ) : (
//             <Ionicons
//               name={isWishlisted ? 'heart' : 'heart-outline'}
//               size={22}
//               color={isWishlisted ? '#FF0000' : '#666'}
//             />
//           )}
//         </TouchableOpacity>

//         <Image
//           source={{ uri: item.product_main_image }}
//           style={styles.image}
//           resizeMode="contain"
//         />

//         <View style={styles.content}>
//           <Text style={styles.title} numberOfLines={2}>
//             {item.product_name}
//           </Text>
//           <View style={{flexDirection:"row" ,gap:5}}>
//             <Text style={styles.price} numberOfLines={1}>
//             ₹ {item.total_price?.toLocaleString()}
//           </Text>
//           <Text style={styles.price} numberOfLines={1}>
//         ({item.gross_weight?.toLocaleString()} g )
//           </Text>
//           </View>
          

//           <View style={styles.buttonRow}>
//             <TouchableOpacity style={styles.viewSimilarButton}>
//               <Text style={styles.viewSimilarText}>View Details</Text>
//             </TouchableOpacity>
//             {/* <TouchableOpacity
//               style={styles.cartIconButton}
//               onPress={(e) => {
//                 e.stopPropagation();
//                 navigation.navigate('Cart');
//               }}
//             >
//               <Ionicons name="cart-outline" size={18} color="#832729" />
//             </TouchableOpacity> */}
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const renderRow = ({ item }) => {
//     if (item.type === 'row') {
//       return (
//         <View style={styles.row}>
//           {item.items.map((product) => (
//             <View key={product.id} style={styles.cardWrapper}>
//               {renderProductCard(product)}
//             </View>
//           ))}
//           {item.items.length === 1 && <View style={[styles.cardWrapper, { opacity: 0 }]} />}
//         </View>
//       );
//     }
//     return null;
//   };

//   const structuredData = restructureData();

//   const renderSkeletonGrid = () => {
//     const skeletonIndices = [0, 1, 2, 3, 4, 5, 6, 7];

//     return (
//       <FlatList
//         data={skeletonIndices}
//         keyExtractor={(item) => `skeleton-${item}`}
//         renderItem={({ index }) => {
//           const isEven = index % 2 === 0;
//           return (
//             <View style={styles.row}>
//               <View style={styles.cardWrapper}>
//                 <SkeletonCard />
//               </View>
//               {isEven && index < 7 && (
//                 <View style={styles.cardWrapper}>
//                   <SkeletonCard />
//                 </View>
//               )}
//               {isEven && index >= 6 && <View style={[styles.cardWrapper, { opacity: 0 }]} />}
//             </View>
//           );
//         }}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
//       />
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

//       {/* Header */}
//       <View style={[styles.topHeader, { paddingTop: insets.top + 10 }]}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>

//         <Image
//           source={require('../assets/geethalogo.png')}
//           style={styles.headerLogo}
//           resizeMode="contain"
//         />

//         <View style={styles.headerIcons}>
//           <TouchableOpacity onPress={() => navigation.navigate('WishList')}>
//             <Ionicons name="heart-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
//             <Ionicons name="cart-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Ionicons name="notifications-outline" size={22} color="#832729" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Title & Result Count */}
//       {/* <View style={styles.filterRow}>
//         <Text style={styles.filterTitle}>{pageTitle}</Text>
//         <Text style={styles.resultCount}>
//           ({displayedProducts.length} results)
//         </Text>
//       </View> */}

//       {/* Content States */}
//       {productsLoading ? (
//         renderSkeletonGrid()
//       ) : productsError ? (
//         <View style={styles.centerContent}>
//           <Text style={styles.errorText}>Error: {productsError}</Text>
//           <TouchableOpacity
//             onPress={() => {
//               const payload = categoryId
//                 ? { userId, categoryId }
//                 : analyticsPayload
//                 ? { userId, ...analyticsPayload }
//                 : { userId };
//               dispatch(fetchProducts(payload));
//             }}
//             style={styles.retryButton}
//           >
//             <Text style={styles.retryText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       ) : displayedProducts.length === 0 ? (
//         <View style={styles.centerContent}>
//           <Text style={styles.emptyText}>
//             {filters.gold || filters.diamond || filters.gemstone
//               ? 'No products match your filters.'
//               : 'No products found.'}
//           </Text>
//         </View>
//       ) : (
//         <FlatList
//           data={structuredData}
//           keyExtractor={(item) => item.id}
//           renderItem={renderRow}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
//         />
//       )}

//       {/* Bottom Filter Bar */}
//       <View style={[styles.bottomFilterBar, { paddingBottom: insets.bottom + 10 }]}>
//         <TouchableOpacity
//           style={styles.bottomFilterButton}
//           onPress={() => setFilterModalVisible(true)}
//         >
//           <Ionicons name="filter-outline" size={18} color="#832729" />
//           <Text style={styles.bottomFilterText}>Filter</Text>
//         </TouchableOpacity>

//         <View style={styles.dividerLine} />

//         <TouchableOpacity
//           style={styles.bottomFilterButton}
//           onPress={() => setSortModalVisible(true)}
//         >
//           <Ionicons name="swap-vertical" size={18} color="#832729" />
//           <Text style={styles.bottomFilterText}>Sort by</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Sort Modal */}
//       <Modal
//         visible={sortModalVisible}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setSortModalVisible(false)}
//       >
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPressOut={() => setSortModalVisible(false)}
//         >
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Sort by</Text>

//             {[
//               { key: 'popular', label: 'Popular' },
//               { key: 'lowToHigh', label: 'Price: Low to High' },
//               { key: 'highToLow', label: 'Price: High to Low' },
//               { key: 'newest', label: 'Newest First' },
//             ].map((option) => (
//               <TouchableOpacity
//                 key={option.key}
//                 style={styles.modalOption}
//                 onPress={() => {
//                   setSortBy(option.key);
//                   setSortModalVisible(false);
//                 }}
//               >
//                 <Text
//                   style={[
//                     styles.modalOptionText,
//                     sortBy === option.key && styles.activeSortText,
//                   ]}
//                 >
//                   {option.label}
//                 </Text>
//                 {sortBy === option.key && (
//                   <Ionicons name="checkmark" size={20} color="#832729" />
//                 )}
//               </TouchableOpacity>
//             ))}
//           </View>
//         </TouchableOpacity>
//       </Modal>

//       {/* Filter Modal */}
//       <Modal
//         visible={filterModalVisible}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setFilterModalVisible(false)}
//       >
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPressOut={() => setFilterModalVisible(false)}
//         >
//           <View style={[styles.modalContainer, { maxHeight: '70%' }]}>
//             <Text style={styles.modalTitle}>Filter by Material</Text>

//             {[
//               { key: 'gold', label: 'Gold Only', icon: 'ellipse' },
//               { key: 'diamond', label: 'Diamond', icon: 'diamond' },
//               { key: 'gemstone', label: 'Gemstone', icon: 'sparkles' },
//             ].map((filter) => (
//               <TouchableOpacity
//                 key={filter.key}
//                 style={styles.filterOption}
//                 onPress={() => {
//                   setFilters((prev) => ({
//                     ...prev,
//                     [filter.key]: !prev[filter.key],
//                   }));
//                 }}
//               >
//                 <View style={styles.filterOptionLeft}>
//                   <Ionicons name={filter.icon} size={18} color="#832729" />
//                   <Text style={styles.modalOptionText}>{filter.label}</Text>
//                 </View>
//                 <View
//                   style={[
//                     styles.checkbox,
//                     filters[filter.key] && styles.checkboxActive,
//                   ]}
//                 >
//                   {filters[filter.key] && <Ionicons name="checkmark" size={16} color="#fff" />}
//                 </View>
//               </TouchableOpacity>
//             ))}

//             <View style={styles.filterActions}>
//               <TouchableOpacity
//                 style={styles.clearBtn}
//                 onPress={() =>
//                   setFilters({ gold: false, diamond: false, gemstone: false })
//                 }
//               >
//                 <Text style={styles.clearText}>Clear All</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.applyBtn}
//                 onPress={() => setFilterModalVisible(false)}
//               >
//                 <Text style={styles.applyText}>Apply</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   topHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerLogo: { width: responsiveWidth(30), height: 40 },
//   headerIcons: { flexDirection: 'row', gap: 12 },
//   filterRow: { paddingHorizontal: 16, marginVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   filterTitle: { fontSize: 20, fontWeight: '700', color: '#000' },
//   resultCount: { fontSize: 14, color: '#666' },
//   row: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 16, marginTop: 10 },
//   cardWrapper: { width: ITEM_WIDTH },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#eee',
//     padding: 10,
//     position: 'relative',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   skeletonCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#eee',
//     padding: 10,
//     height: CARD_HEIGHT,
//     position: 'relative',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   favoriteIcon: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     zIndex: 10,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 6,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   image: { width: '100%', height: 140, marginBottom: 10 },
//   content: { flex: 1, justifyContent: 'space-between' },
//   title: { fontSize: 13, fontWeight: '600', color: '#222', marginBottom: 8 },
//   price: { fontSize: 14, fontWeight: '700', color: '#832729', marginBottom: 8 },
//   buttonRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   viewSimilarButton: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#832729',
//     borderRadius: 6,
//     paddingVertical: 8,
//     alignItems: 'center',
//   },
//   viewSimilarText: { color: '#832729', fontSize: 12, fontWeight: '600' },
//   cartIconButton: {
//     backgroundColor: '#fff',
//     borderRadius: 6,
//     padding: 6,
//     borderWidth: 1,
//     borderColor: '#832729',
//   },
//   skeletonButton: { flex: 1, height: 32 },
//   skeletonIcon: { width: 32, height: 32 },
//   centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
//   errorText: { fontSize: 16, color: 'red', textAlign: 'center', marginBottom: 10 },
//   emptyText: { fontSize: 16, color: '#666', textAlign: 'center' },
//   retryButton: { backgroundColor: '#832729', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
//   retryText: { color: '#fff', fontWeight: '600' },
//   bottomFilterBar: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 60,
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 10,
//   },
//   bottomFilterButton: { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   bottomFilterText: { color: '#832729', fontSize: 15, fontWeight: '600' },
//   dividerLine: { width: 1, height: 30, backgroundColor: '#ddd' },
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
//   modalContainer: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: '60%',
//   },
//   modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16, color: '#000' },
//   modalOption: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   modalOptionText: { fontSize: 16, color: '#333' },
//   activeSortText: { color: '#832729', fontWeight: '700' },

//   // Filter Styles
//   filterOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   filterOptionLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   checkbox: {
//     width: 24,
//     height: 24,
//     borderRadius: 6,
//     borderWidth: 2,
//     borderColor: '#832729',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   checkboxActive: {
//     backgroundColor: '#832729',
//   },
//   filterActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//     gap: 12,
//   },
//   clearBtn: {
//     flex: 1,
//     paddingVertical: 14,
//     borderWidth: 1,
//     borderColor: '#832729',
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   clearText: { color: '#832729', fontWeight: '600' },
//   applyBtn: {
//     flex: 1,
//     backgroundColor: '#832729',
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   applyText: { color: '#fff', fontWeight: '600' },
// });

// export default IndividualCategory;
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Modal,
  StatusBar,
  Alert,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToWishlist,
  removeFromWishlist,
} from '../redux/slices/wishlistSlice';
import { fetchProducts } from '../redux/slices/categorySlice';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;
const CARD_HEIGHT = 280;

// Font family constants
const FONTS = {
  regular: 'SF-Pro-Display-Regular',
  medium: 'SF-Pro-Display-Medium',
  semibold: 'SF-Pro-Display-Semibold',
  bold: 'SF-Pro-Display-Bold',
};

// Shimmer Placeholder Component
const ShimmerPlaceholder = ({ width = '100%', height = 20, style }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-parseFloat(width), parseFloat(width)],
  });

  return (
    <View
      style={[
        { backgroundColor: '#e8e8e8', borderRadius: 6, overflow: 'hidden' },
        typeof width === 'string' ? { width } : { width },
        { height },
        style,
      ]}
    >
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          transform: [{ translateX }],
        }}
      />
    </View>
  );
};

// Skeleton Card Component
const SkeletonCard = () => (
  <View style={styles.skeletonCard}>
    <View style={styles.favoriteIcon}>
      <View style={{ width: 22, height: 22, backgroundColor: '#e0e0e0', borderRadius: 11 }} />
    </View>

    <ShimmerPlaceholder height={140} style={{ marginBottom: 10 }} />

    <View style={{ paddingHorizontal: 4 }}>
      <ShimmerPlaceholder height={12} style={{ marginBottom: 8 }} />
      <ShimmerPlaceholder height={12} width="75%" style={{ marginBottom: 16 }} />

      <View style={styles.buttonRow}>
        <ShimmerPlaceholder style={styles.skeletonButton} />
        <View style={{ width: 8 }} />
        <ShimmerPlaceholder style={styles.skeletonIcon} />
      </View>
    </View>
  </View>
);

const IndividualCategory = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const {
    userId: paramUserId,
    categoryId,
    categoryName,
    analyticsPayload,
  } = route.params || {};

  const { customerId } = useSelector((state) => state.Auth || {});
  const { addRemoveLoader } = useSelector((state) => state.wishlist || {});

  const {
    products: rawProducts = [],
    productsLoading,
    productsError,
  } = useSelector((state) => state.category);

  const userId = paramUserId || customerId || 1;

  const [products, setProducts] = useState([]);
  const [pageTitle, setPageTitle] = useState('Products');
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // Sort & Filter States
  const [sortBy, setSortBy] = useState('popular');
  const [filters, setFilters] = useState({
    gold: false,
    diamond: false,
    gemstone: false,
  });

  useEffect(() => {
    let title = 'Products';
    let fetchPayload = { userId };

    if (categoryId !== undefined) {
      fetchPayload.categoryId = categoryId;
      title = categoryName || 'Category Products';
    } else if (analyticsPayload) {
      const {
        target_type,
        target_value,
        section_type,
        reference_id,
        reference_name,
      } = analyticsPayload;

      if (target_type && target_value !== undefined) {
        fetchPayload.target_type = target_type;
        fetchPayload.target_value = target_value;
        title = reference_name || 'Featured Products';
      } else if (section_type && reference_id !== undefined) {
        fetchPayload.section_type = section_type;
        fetchPayload.reference_id = reference_id;
        title = reference_name || section_type || 'Products';
      }
    }

    setPageTitle(title);

    if (
      categoryId !== undefined ||
      (analyticsPayload &&
        ((analyticsPayload.target_type && analyticsPayload.target_value) ||
          (analyticsPayload.section_type && analyticsPayload.reference_id)))
    ) {
      dispatch(fetchProducts(fetchPayload));
    }
  }, [userId, categoryId, analyticsPayload, dispatch]);

  useEffect(() => {
    setProducts(rawProducts);
  }, [rawProducts]);

  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];

    const hasActiveFilter = filters.gold || filters.diamond || filters.gemstone;
    if (hasActiveFilter) {
      filtered = filtered.filter((product) => {
        const isGold = product.has_diamond === 0 && product.has_stone === 0;
        const isDiamond = product.has_diamond === 1;
        const isGemstone = product.has_stone === 1;

        return (
          (filters.gold && isGold) ||
          (filters.diamond && isDiamond) ||
          (filters.gemstone && isGemstone)
        );
      });
    }

    const sorted = [...filtered];
    switch (sortBy) {
      case 'lowToHigh':
        sorted.sort((a, b) => a.total_price - b.total_price);
        break;
      case 'highToLow':
        sorted.sort((a, b) => b.total_price - a.total_price);
        break;
      case 'newest':
        sorted.sort((a, b) => b.id - a.id);
        break;
      case 'popular':
      default:
        break;
    }

    return sorted;
  };

  const displayedProducts = getFilteredAndSortedProducts();

  const handleWishlistToggle = async (item) => {
    if (!userId || userId === 1) {
      Alert.alert(
        'Sign In Required',
        'Please sign in to manage your wishlist.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Sign In', onPress: () => navigation.navigate('SignIn') },
        ]
      );
      return;
    }

    const isWishlisted = item.wishlist_flag === 1;
    const productId = item.id;

    if (isWishlisted && item.wishlist_id) {
      try {
        await dispatch(removeFromWishlist({ wishlist_id: item.wishlist_id })).unwrap();
        setProducts((prev) =>
          prev.map((p) =>
            p.id === productId ? { ...p, wishlist_flag: 0, wishlist_id: null } : p
          )
        );
      } catch (err) {
        Alert.alert('Error', 'Failed to remove from wishlist');
      }
    } else {
      try {
        const result = await dispatch(
          addToWishlist({ user_id: userId, product_id: productId })
        ).unwrap();

        const newWishlistId = result?.wishlist_id;

        setProducts((prev) =>
          prev.map((p) =>
            p.id === productId
              ? { ...p, wishlist_flag: 1, wishlist_id: newWishlistId }
              : p
          )
        );
      } catch (err) {
        if (err?.already_exists) {
          setProducts((prev) =>
            prev.map((p) => (p.id === productId ? { ...p, wishlist_flag: 1 } : p))
          );
        } else {
          Alert.alert('Error', 'Failed to add to wishlist');
        }
      }
    }
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetailsScreen', {
      product_id: product.id,
      user_id: userId,
    });
  };

  const restructureData = () => {
    const rows = [];
    let tempRow = [];

    displayedProducts.forEach((item) => {
      tempRow.push(item);
      if (tempRow.length === 2) {
        rows.push({ id: `row-${rows.length}`, type: 'row', items: [...tempRow] });
        tempRow = [];
      }
    });

    if (tempRow.length > 0) {
      rows.push({ id: `row-${rows.length}`, type: 'row', items: [...tempRow] });
    }

    return rows;
  };

  // const renderProductCard = (item) => {
  //   const isWishlisted = item.wishlist_flag === 1;
  //   const isLoading = addRemoveLoader === item.id;

  //   return (
  //     <TouchableOpacity
  //       style={[styles.card, { height: CARD_HEIGHT }]}
  //       onPress={() => handleProductPress(item)}
  //       activeOpacity={0.85}
  //     >
  //       <TouchableOpacity
  //         style={styles.favoriteIcon}
  //         onPress={(e) => {
  //           e.stopPropagation();
  //           handleWishlistToggle(item);
  //         }}
  //         disabled={isLoading}
  //       >
  //         {isLoading ? (
  //           <ActivityIndicator size={18} color="#832729" />
  //         ) : (
  //           <Ionicons
  //             name={isWishlisted ? 'heart' : 'heart-outline'}
  //             size={22}
  //             color={isWishlisted ? '#FF0000' : '#666'}
  //           />
  //         )}
  //       </TouchableOpacity>

  //       <Image
  //         source={{ uri: item.product_main_image }}
  //         style={styles.image}
  //         resizeMode="contain"
  //       />

  //       <View style={styles.content}>
  //         <Text style={styles.title} numberOfLines={2}>
  //           {item.product_name}
  //         </Text>
  //         <View style={{ flexDirection: "row", gap: 5 }}>
  //           <Text style={styles.price} numberOfLines={1}>
  //             ₹ {item.total_price?.toLocaleString()}
  //           </Text>
  //           <Text style={styles.price} numberOfLines={1}>
  //             ({item.gross_weight?.toLocaleString()} g )
  //           </Text>
  //         </View>

  //         <View style={styles.buttonRow}>
  //           <TouchableOpacity style={styles.viewSimilarButton} >
  //             <Text style={styles.viewSimilarText}>View Details</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };
const renderProductCard = (item) => {
  const isWishlisted = item.wishlist_flag === 1;
  const isLoading = addRemoveLoader === item.id;

  return (
    <TouchableOpacity
      style={[styles.card, { height: CARD_HEIGHT }]}
      onPress={() => handleProductPress(item)}
      activeOpacity={0.85}
    >
      <TouchableOpacity
        style={styles.favoriteIcon}
        onPress={(e) => {
          e.stopPropagation();
          handleWishlistToggle(item);
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size={18} color="#832729" />
        ) : (
          <Ionicons
            name={isWishlisted ? 'heart' : 'heart-outline'}
            size={22}
            color={isWishlisted ? '#FF0000' : '#666'}
          />
        )}
      </TouchableOpacity>

      <Image
        source={{ uri: item.product_main_image }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {item.product_name}
        </Text>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={styles.price} numberOfLines={1}>
            ₹ {item.total_price?.toLocaleString()}
          </Text>
          <Text style={styles.price} numberOfLines={1}>
            ({item.gross_weight?.toLocaleString()} g )
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <View style={styles.viewSimilarButton}>
            <Text style={styles.viewSimilarText}>View Details</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
  const renderRow = ({ item }) => {
    if (item.type === 'row') {
      return (
        <View style={styles.row}>
          {item.items.map((product) => (
            <View key={product.id} style={styles.cardWrapper}>
              {renderProductCard(product)}
            </View>
          ))}
          {item.items.length === 1 && <View style={[styles.cardWrapper, { opacity: 0 }]} />}
        </View>
      );
    }
    return null;
  };

  const structuredData = restructureData();

  const renderSkeletonGrid = () => {
    const skeletonIndices = [0, 1, 2, 3, 4, 5, 6, 7];

    return (
      <FlatList
        data={skeletonIndices}
        keyExtractor={(item) => `skeleton-${item}`}
        renderItem={({ index }) => {
          const isEven = index % 2 === 0;
          return (
            <View style={styles.row}>
              <View style={styles.cardWrapper}>
                <SkeletonCard />
              </View>
              {isEven && index < 7 && (
                <View style={styles.cardWrapper}>
                  <SkeletonCard />
                </View>
              )}
              {isEven && index >= 6 && <View style={[styles.cardWrapper, { opacity: 0 }]} />}
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Header */}
      <View style={[styles.topHeader, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Image
          source={require('../assets/geethalogo1.png')}
          style={styles.headerLogo}
          resizeMode="contain"
        />

        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('WishList')}>
            <Ionicons name="heart-outline" size={22} color="#832729" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="cart-outline" size={22} color="#832729" />
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <Ionicons name="notifications-outline" size={22} color="#832729" />
          </TouchableOpacity> */}
        </View>
      </View>

      {/* Content States */}
      {productsLoading ? (
        renderSkeletonGrid()
      ) : productsError ? (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Error: {productsError}</Text>
          <TouchableOpacity
            onPress={() => {
              const payload = categoryId
                ? { userId, categoryId }
                : analyticsPayload
                ? { userId, ...analyticsPayload }
                : { userId };
              dispatch(fetchProducts(payload));
            }}
            style={styles.retryButton}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : displayedProducts.length === 0 ? (
        <View style={styles.centerContent}>
          <Text style={styles.emptyText}>
            {filters.gold || filters.diamond || filters.gemstone
              ? 'No products match your filters.'
              : 'No products found.'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={structuredData}
          keyExtractor={(item) => item.id}
          renderItem={renderRow}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        />
      )}

      {/* Bottom Filter Bar */}
      <View style={[styles.bottomFilterBar, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity
          style={styles.bottomFilterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Ionicons name="filter-outline" size={18} color="#832729" />
          <Text style={styles.bottomFilterText}>Filter</Text>
        </TouchableOpacity>

        <View style={styles.dividerLine} />

        <TouchableOpacity
          style={styles.bottomFilterButton}
          onPress={() => setSortModalVisible(true)}
        >
          <Ionicons name="swap-vertical" size={18} color="#832729" />
          <Text style={styles.bottomFilterText}>Sort by</Text>
        </TouchableOpacity>
      </View>

      {/* Sort Modal */}
      <Modal
        visible={sortModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setSortModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Sort by</Text>

            {[
              { key: 'popular', label: 'Popular' },
              { key: 'lowToHigh', label: 'Price: Low to High' },
              { key: 'highToLow', label: 'Price: High to Low' },
              { key: 'newest', label: 'Newest First' },
            ].map((option) => (
              <TouchableOpacity
                key={option.key}
                style={styles.modalOption}
                onPress={() => {
                  setSortBy(option.key);
                  setSortModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    sortBy === option.key && styles.activeSortText,
                  ]}
                >
                  {option.label}
                </Text>
                {sortBy === option.key && (
                  <Ionicons name="checkmark" size={20} color="#832729" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setFilterModalVisible(false)}
        >
          <View style={[styles.modalContainer, { maxHeight: '70%' }]}>
            <Text style={styles.modalTitle}>Filter by Material</Text>

            {[
              { key: 'gold', label: 'Gold Only', icon: 'ellipse' },
              { key: 'diamond', label: 'Diamond', icon: 'diamond' },
              { key: 'gemstone', label: 'Gemstone', icon: 'sparkles' },
            ].map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={styles.filterOption}
                onPress={() => {
                  setFilters((prev) => ({
                    ...prev,
                    [filter.key]: !prev[filter.key],
                  }));
                }}
              >
                <View style={styles.filterOptionLeft}>
                  <Ionicons name={filter.icon} size={18} color="#832729" />
                  <Text style={styles.modalOptionText}>{filter.label}</Text>
                </View>
                <View
                  style={[
                    styles.checkbox,
                    filters[filter.key] && styles.checkboxActive,
                  ]}
                >
                  {filters[filter.key] && <Ionicons name="checkmark" size={16} color="#fff" />}
                </View>
              </TouchableOpacity>
            ))}

            <View style={[styles.filterActions,]}>
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() =>
                  setFilters({ gold: false, diamond: false, gemstone: false })
                }
              >
                <Text style={styles.clearText}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyBtn}
                onPress={() => setFilterModalVisible(false)}
              >
                <Text style={styles.applyText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLogo: { width: responsiveWidth(30), height: 40 },
  headerIcons: { flexDirection: 'row', gap: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 16, marginTop: 10 },
  cardWrapper: { width: ITEM_WIDTH },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 10,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  skeletonCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 10,
    height: CARD_HEIGHT,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  image: { width: '100%', height: 140, marginBottom: 10 },
  content: { flex: 1, justifyContent: 'space-between' },
  title: { 
    fontSize: 13, 
    fontFamily: FONTS.semibold, 
    color: '#222', 
    marginBottom: 8 
  },
  price: { 
    fontSize: 14, 
    fontFamily: FONTS.bold, 
    color: '#832729', 
    marginBottom: 8 
  },
  buttonRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  viewSimilarButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#832729',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  viewSimilarText: { 
    color: '#832729', 
    fontSize: 12, 
    fontFamily: FONTS.semibold 
  },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  errorText: { 
    fontSize: 16, 
    fontFamily: FONTS.medium, 
    color: 'red', 
    textAlign: 'center', 
    marginBottom: 10 
  },
  emptyText: { 
    fontSize: 16, 
    fontFamily: FONTS.regular, 
    color: '#666', 
    textAlign: 'center' 
  },
  retryButton: { 
    backgroundColor: '#832729', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 8 
  },
  retryText: { 
    color: '#fff', 
    fontFamily: FONTS.semibold 
  },
  bottomFilterBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  bottomFilterButton: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bottomFilterText: { 
    color: '#832729', 
    fontSize: 15, 
    fontFamily: FONTS.semibold 
  },
  dividerLine: { width: 1, height: 30, backgroundColor: '#ddd' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
  },
  modalTitle: { 
    fontSize: 18, 
    fontFamily: FONTS.bold, 
    marginBottom: 16, 
    color: '#000' 
  },
  modalOption: { 
    paddingVertical: 14, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  modalOptionText: { 
    fontSize: 16, 
    fontFamily: FONTS.regular, 
    color: '#333' 
  },
  activeSortText: { 
    color: '#832729', 
    fontFamily: FONTS.bold 
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#832729',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#832729',
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  clearBtn: {
    flex: 1,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#832729',
    borderRadius: 8,
    alignItems: 'center',
  },
  clearText: { 
    color: '#832729', 
    fontFamily: FONTS.semibold 
  },
  applyBtn: {
    flex: 1,
    backgroundColor: '#832729',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyText: { 
    color: '#fff', 
    fontFamily: FONTS.semibold 
  },

  //
  bottomFilterBar: {
  position: 'absolute',
  bottom: 0, // Keep this 0 so the background color extends to the bottom
  left: 0,
  right: 0,
  // height: 60, // REMOVE THIS: Fixed height prevents safe area padding from working correctly
  backgroundColor: '#fff',
  flexDirection: 'row',
  alignItems: 'center', 
  justifyContent: 'space-around',
  borderTopWidth: 1,
  borderTopColor: '#eee',
  
  // Shadow/Elevation
  shadowColor: '#000',
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 20, // Increased to ensure it stays above system layers
},
bottomFilterButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 15, // Provide internal height via padding instead of fixed height
  flex: 1,
}
});

export default IndividualCategory;