
import React, { useEffect, useState } from 'react';
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
  FlatList,
  ActivityIndicator,
  Alert,
   Modal,                 // ← Added for size chart
  Pressable, 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToWishlist,
  removeFromWishlist,
} from '../redux/slices/wishlistSlice';
import { fetchProductDetails ,  fetchRecommendedProducts,} from '../redux/slices/categorySlice';
import { addToCart } from '../redux/slices/cartSlice';
const { width } = Dimensions.get('window');

const ProductDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

//   const { product_id, user_id: routeUserId } = route.params || {};
// const product_id = routeProductId?.toString();
const { product_id: routeProductId, user_id: routeUserId } = route.params || {};
const product_id = routeProductId?.toString(); // ← Add this
  const { productDetails, productDetailsLoading, productDetailsError,    recommendedProducts,
    recommendedProductsLoading, } = useSelector(
    (state) => state.category
  );
  // Add cart loading state from Redux
  const { loading: cartLoading } = useSelector((state) => state.cart);
  const { customerId } = useSelector((state) => state.Auth || {});
  const { addRemoveLoader } = useSelector((state) => state.wishlist || {});

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);
  const [localProductDetails, setLocalProductDetails] = useState(null);
const [localRecommendedProducts, setLocalRecommendedProducts] = useState([]);
const [wishlistLoading, setWishlistLoading] = useState({});
  const currentUserId = customerId || routeUserId;

  const [selectedSize, setSelectedSize] = useState(null);        // ← New: selected size
  const [sizeChartVisible, setSizeChartVisible] = useState(false); 
const [cartErrorModalVisible, setCartErrorModalVisible] = useState(false);
const [cartErrorMessage, setCartErrorMessage] = useState('');

  // Cleanup everything when leaving the screen
  useEffect(() => {
    return () => {
      // This runs when the component unmounts (i.e., when you leave the screen)
      setLocalProductDetails(null);
      setSelectedImageIndex(0);
      setExpandedSection(null);
    };
  }, []);

  // Fetch product details on mount
  useEffect(() => {
    if (product_id && currentUserId) {
      dispatch(fetchProductDetails({ user_id: currentUserId, product_id }));
    }
  }, [product_id, currentUserId, dispatch]);
useEffect(() => {
  if (
    localProductDetails?.id && 
    localProductDetails?.subcategory_id &&  // Add this check
    currentUserId
  ) {
    dispatch(
      fetchRecommendedProducts({
        user_id: currentUserId,
        product_id: localProductDetails.id,
        subcategory_id: localProductDetails.subcategory_id,  // Send it here
      })
    );
  }
}, [
  localProductDetails?.id,
  localProductDetails?.sub_category_id,  // Include in dependencies
  currentUserId,
  dispatch,
]);

useEffect(() => {
  if (!product_id || !currentUserId) {
    Alert.alert('Error', 'Invalid product or user');
    navigation.goBack();
    return;
  }

  // Clear local state FIRST to show loading immediately
  setLocalProductDetails(null);
  setSelectedImageIndex(0);
  setExpandedSection(null);

  // Fetch fresh data
  dispatch(fetchProductDetails({ user_id: currentUserId, product_id }));
}, [product_id, currentUserId, dispatch, navigation]);


  // Sync local state when Redux productDetails updates AND matches current product_id
  useEffect(() => {
    if (productDetails && productDetails.id?.toString() === product_id?.toString()) {
      setLocalProductDetails(productDetails);
      // Optionally reset UI states when new product loads
      setSelectedImageIndex(0);
      setExpandedSection(null);
    }
  }, [productDetails, product_id]);

  

  // Sync recommended products
  useEffect(() => {
    if (Array.isArray(recommendedProducts)) {
      setLocalRecommendedProducts(recommendedProducts);
    }
  }, [recommendedProducts]);

   // Wishlist toggle for main product
const handleWishlistToggle = async (isRecommended = false, item = null) => {
  if (!currentUserId) {
    Alert.alert('Sign In Required', 'Please sign in to manage your wishlist.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign In', onPress: () => navigation.navigate('SignIn') },
    ]);
    return;
  }

  const targetItem = isRecommended ? item : localProductDetails;
  if (!targetItem) return;

  // Always use string ID
  const productId = isRecommended 
    ? item.id.toString() 
    : product_id; // already string now

  if (wishlistLoading[productId]) return;

  const isWishlisted = targetItem.wishlist_flag === 1;
  const wishlistId = targetItem.wishlist_id;

  setWishlistLoading(prev => ({ ...prev, [productId]: true }));

  try {
    if (isWishlisted && wishlistId) {
      await dispatch(removeFromWishlist({ wishlist_id: wishlistId })).unwrap();

      if (isRecommended) {
        setLocalRecommendedProducts(prev =>
          prev.map(p =>
            p.id.toString() === productId
              ? { ...p, wishlist_flag: 0, wishlist_id: null }
              : p
          )
        );
      } else {
        setLocalProductDetails(prev => ({
          ...prev,
          wishlist_flag: 0,
          wishlist_id: null,
        }));
      }
    } else {
      const result = await dispatch(
        addToWishlist({ user_id: currentUserId, product_id: parseInt(productId) })
      ).unwrap();

      const newWishlistId = result?.wishlist_id;

      if (isRecommended) {
        setLocalRecommendedProducts(prev =>
          prev.map(p =>
            p.id.toString() === productId
              ? { ...p, wishlist_flag: 1, wishlist_id: newWishlistId }
              : p
          )
        );
      } else {
        setLocalProductDetails(prev => ({
          ...prev,
          wishlist_flag: 1,
          wishlist_id: newWishlistId || prev.wishlist_id,
        }));
      }
    }

    // if (!isRecommended) {
    //   dispatch(fetchProductDetails({ user_id: currentUserId, product_id: parseInt(productId) }));
    // }
  } catch (error) {
    console.error('Wishlist toggle error:', error);

    if (error?.message?.toLowerCase().includes('already')) {
      if (isRecommended) {
        setLocalRecommendedProducts(prev =>
          prev.map(p => (p.id.toString() === productId ? { ...p, wishlist_flag: 1 } : p))
        );
      } else {
        setLocalProductDetails(prev => ({ ...prev, wishlist_flag: 1 }));
      }

      // if (!isRecommended) {
      //   dispatch(fetchProductDetails({ user_id: currentUserId, product_id: parseInt(productId) }));
      // }
    } else {
      Alert.alert('Error', error?.message || 'Failed to update wishlist');
    }
  } finally {
    setWishlistLoading(prev => ({ ...prev, [productId]: false }));
  }
};
  // New: Handle Add to Cart
//  const handleAddToCart = async () => {
//   if (!currentUserId) {
//     Alert.alert(
//       'Sign In Required',
//       'Please sign in to add items to your cart.',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Sign In', onPress: () => navigation.navigate('SignIn') },
//       ]
//     );
//     return;
//   }

//   if (!localProductDetails) return;

//   try {
//     const payload = {
//       user_id: currentUserId,
//       product_id: parseInt(product_id),
//     };

//     await dispatch(addToCart(payload)).unwrap();

//     // Success: Directly navigate to Cart screen
//     navigation.navigate('Cart');

//     // Optional: Show a quick success toast/alert (non-blocking)
//     // You can keep this if you want subtle feedback
//     Alert.alert(
//       'Success',
//       'Item added to cart successfully!',
//       [{ text: 'OK' }],
//       { cancelable: true }
//     );

//   } catch (error) {
//     console.error('Add to cart error:', error);
//     Alert.alert(
//       'Error',
//       error?.message || 'Failed to add item to cart. Please try again.',
//       [{ text: 'OK' }]
//     );
//   }
// };
const handleAddToCart = async () => {
  if (!currentUserId) {
    // Keep this Alert only for login requirement (or replace with modal later if you want)
    Alert.alert(
      'Sign In Required',
      'Please sign in to add items to your cart.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign In', onPress: () => navigation.navigate('SignIn') },
      ]
    );
    return;
  }

  if (!localProductDetails) return;

  // Determine size_id safely
  let size_id = 0;
  if (localProductDetails.has_sizes === 1) {
    if (selectedSize) {
      const selectedSizeObj = localProductDetails.sizes.find(
        (s) => s.size === selectedSize
      );
      if (selectedSizeObj) {
        size_id = selectedSizeObj.id;
      }
    }
    // Auto-select first size if none chosen
    if (size_id === 0 && localProductDetails.sizes.length > 0) {
      size_id = localProductDetails.sizes[0].id;
      setSelectedSize(localProductDetails.sizes[0].size);
    }
  }

  try {
    const payload = {
      user_id: currentUserId,
      product_id: parseInt(product_id),
      size_id,
    };

    console.log('Adding to cart with payload:', payload);

    await dispatch(addToCart(payload)).unwrap();

    // SUCCESS → Show friendly modal
    setCartErrorMessage('Item added to cart successfully!');
    setCartErrorModalVisible(true);

  } catch (error) {
    console.error('Add to cart error (safe):', error);

    // Already in cart (409 or message contains quantity/item exists)
    if (
      error?.status === 409 ||
      (error?.message && /quantity|ITEM_ALREADY_EXISTS/i.test(error.message))
    ) {
      const sizeText = selectedSize ? ` (Size ${selectedSize})` : '';
      setCartErrorMessage(`This item${sizeText} is already in your cart.`);
    } else {
      // Any other problem → generic friendly message
      setCartErrorMessage('Unable to add item to cart. Please try again later.');
    }
    setCartErrorModalVisible(true);
  }
};
const isFavorite = localProductDetails?.wishlist_flag === 1;
const isMainProductLoading = wishlistLoading[product_id] || false;

   if (productDetailsLoading || !localProductDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#832729" />
          <Text style={styles.loadingText}>Loading product details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (productDetailsError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.errorText}>Failed to load product details</Text>
          <TouchableOpacity onPress={() => {
            dispatch(fetchProductDetails({ user_id: currentUserId, product_id }));
          }}>
            <Text style={{ color: '#832729', marginTop: 10 }}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const images = [
    { uri: localProductDetails.product_main_image },
    ...(localProductDetails.image1 ? [{ uri: localProductDetails.image1 }] : []),
    ...(localProductDetails.image2 ? [{ uri: localProductDetails.image2 }] : []),
    ...(localProductDetails.image3 ? [{ uri: localProductDetails.image3 }] : []),
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderThumbnail = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => setSelectedImageIndex(index)}
      style={[
        styles.thumbnailContainer,
        selectedImageIndex === index && styles.selectedThumbnail,
      ]}
    >
      <Image source={item} style={styles.thumbnailImage} resizeMode="contain" />
    </TouchableOpacity>
  );


  // for recpmmonded products 
   const RecommendedProductCard = ({ item }) => {
    // const isLoadingWishlist = addRemoveLoader === item.id;
 const isLoading = wishlistLoading[item.id];
    return (
      <View style={styles.similarProductCard}>
        <TouchableOpacity
        style={styles.similarFavorite}
        onPress={() => handleWishlistToggle(true, item)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size={16} color="#FF0000" />
        ) : (
          <Ionicons
            name={item.wishlist_flag === 1 ? 'heart' : 'heart-outline'}
            size={18}
            color={item.wishlist_flag === 1 ? '#FF0000' : '#666'}
          />
        )}
      </TouchableOpacity>

        <Image
          source={{ uri: item.product_main_image }}
          style={styles.similarProductImage}
          resizeMode="cover"
        />

        <Text style={styles.similarProductName} numberOfLines={2}>
          {item.product_name}
        </Text>

        <View style={styles.similarPriceRow}>
          <Text style={styles.similarPrice}>₹{item.total_price?.toLocaleString()}</Text>
        </View>

        <View style={styles.similarButtons}>
          <TouchableOpacity
            style={styles.viewSimilarBtn}
            onPress={() =>
              navigation.navigate('ProductDetails', {
                product_id: item.id,
                user_id: currentUserId,
              })
            }
          >
            <Text style={styles.viewSimilarBtnText}>View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartBtn}>
            <Ionicons name="cart-outline" size={16} color="#832729" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };


  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity><Ionicons name="search-outline" size={24} color="#000" /></TouchableOpacity>
          <TouchableOpacity><Ionicons name="home-outline" size={24} color="#000" /></TouchableOpacity>
          <TouchableOpacity><Ionicons name="notifications-outline" size={24} color="#000" /></TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainImageContainer}>
       <TouchableOpacity
  style={styles.favoriteButton}
  onPress={() => handleWishlistToggle(false)} // explicitly pass false
  disabled={isMainProductLoading}
>
  {isMainProductLoading ? (
    <ActivityIndicator size={20} color="#FF0000" />
  ) : (
    <Ionicons
      name={isFavorite ? 'heart' : 'heart-outline'}
      size={24}
      color={isFavorite ? '#FF0000' : '#000'}
    />
  )}
</TouchableOpacity>

          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="arrow-redo-outline" size={24} color="#000" />
          </TouchableOpacity>

          <Image
            source={{ uri: images[selectedImageIndex]?.uri }}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </View>

        {images.length > 1 && (
          <FlatList
            data={images}
            renderItem={renderThumbnail}
            keyExtractor={(_, i) => i.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailList}
          />
        )}

        <View style={styles.productInfo}>
          <View style={styles.centeredTitleContainer}>
            <Text style={styles.productName}>{localProductDetails.product_name}</Text>
            <Text style={styles.productSku}>SKU ID: {localProductDetails.sku_id}</Text>
          </View>

          <View style={styles.singleInfoCard}>
            <View style={styles.infoCardItem}>
              <Ionicons name="ellipse" size={16} color="#FFD700" />
              <Text style={styles.infoLabel}>{localProductDetails.karat}K</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.infoCardItem}>
              {localProductDetails.has_diamond === 1 ? (
                <>
                  <Ionicons name="diamond" size={16} color="#FFD700" />
                  <Text style={styles.infoLabel}>{localProductDetails.diamond_clarity} ct</Text>
                </>
              ) : (
                <>
                  <Ionicons name="scale-outline" size={16} color="#FFD700" />
                  <Text style={styles.infoLabel}>{localProductDetails.gross_weight} g</Text>
                </>
              )}
            </View>
          </View>

          {localProductDetails.has_sizes === 1 && 
 Array.isArray(localProductDetails.sizes) && 
 localProductDetails.sizes.length > 0 && (
  <View style={styles.sizeSection}>
    <Text style={styles.sizeSectionTitle}>Select Size</Text>
    
    <View style={styles.sizeRowWithChart}>
      {/* Size Buttons */}
      <View style={styles.sizeButtonsRow}>
        {localProductDetails.sizes.map((sizeObj) => (
          <TouchableOpacity
            key={sizeObj.id}
            style={[
              styles.sizeButton,
              selectedSize === sizeObj.size && styles.selectedSizeButton,
            ]}
            onPress={() => setSelectedSize(sizeObj.size)}
          >
            <Text
              style={[
                styles.sizeButtonText,
                selectedSize === sizeObj.size && styles.selectedSizeButtonText,
              ]}
            >
              {sizeObj.size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* View Size Chart - aligned to the right end of the row */}
      {localProductDetails.sizechart_image && (
        <TouchableOpacity
          style={styles.sizeChartLink}
          onPress={() => setSizeChartVisible(true)}
        >
          <Ionicons name="expand-outline" size={18} color="#832729" />
          <Text style={styles.sizeChartText}>View Size Chart</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
)}

          <Text style={styles.sectionTitle}>Product Details</Text>

          {/* Metal Details */}
          <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('metal')}>
            <View style={styles.accordionHeaderLeft}>
              <Ionicons name="diamond-outline" size={20} color="#000" />
              <Text style={styles.accordionTitle}>METAL DETAILS</Text>
            </View>
            <Ionicons name={expandedSection === 'metal' ? 'chevron-up' : 'chevron-down'} size={20} color="#000" />
          </TouchableOpacity>
          {expandedSection === 'metal' && (
            <View style={styles.accordionContent}>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>{localProductDetails.karat}K</Text>
                  <Text style={styles.detailValue}>Karatage</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>{localProductDetails.material_color}</Text>
                  <Text style={styles.detailValue}>Material Colour</Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>{localProductDetails.gross_weight}g</Text>
                  <Text style={styles.detailValue}>Gross Weight</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>{localProductDetails.metal_name}</Text>
                  <Text style={styles.detailValue}>Metal</Text>
                </View>
              </View>
            </View>
          )}

          {/* Diamond Details */}
          {localProductDetails.has_diamond === 1 && (
            <>
              <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('diamond')}>
                <View style={styles.accordionHeaderLeft}>
                  <Ionicons name="diamond" size={20} color="#000" />
                  <Text style={styles.accordionTitle}>DIAMOND DETAILS</Text>
                </View>
                <Ionicons name={expandedSection === 'diamond' ? 'chevron-up' : 'chevron-down'} size={20} color="#000" />
              </TouchableOpacity>
              {expandedSection === 'diamond' && (
                <View style={styles.accordionContent}>
                  <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>{localProductDetails.diamond_clarity}</Text>
                      <Text style={styles.detailValue}>Clarity</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>{localProductDetails.diamond_color}</Text>
                      <Text style={styles.detailValue}>Color</Text>
                    </View>
                  </View>
                  <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>{localProductDetails.no_of_diamonds}</Text>
                      <Text style={styles.detailValue}>No. of Diamonds</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>{localProductDetails.diamond_setting}</Text>
                      <Text style={styles.detailValue}>Setting</Text>
                    </View>
                  </View>
                  <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>{localProductDetails.diamond_shape}</Text>
                      <Text style={styles.detailValue}>Shape</Text>
                    </View>
                  </View>
                </View>
              )}
            </>
          )}

          {/* Stone Details */}
          {localProductDetails.has_stone === 1 && Array.isArray(localProductDetails.stone_details) && localProductDetails.stone_details.length > 0 && (
            <>
              <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('stone')}>
                <View style={styles.accordionHeaderLeft}>
                  <Ionicons name="sparkles" size={20} color="#000" />
                  <Text style={styles.accordionTitle}>STONE DETAILS</Text>
                </View>
                <Ionicons name={expandedSection === 'stone' ? 'chevron-up' : 'chevron-down'} size={20} color="#000" />
              </TouchableOpacity>
              {expandedSection === 'stone' && (
                <View style={styles.accordionContent}>
                  {localProductDetails.stone_details.map((stone, idx) => (
                    <View key={idx} style={styles.stoneItem}>
                      <Text style={styles.stoneName}>
                        {stone.stone_name} ({stone.stone_count})
                      </Text>
                      <Text style={styles.gemstoneLabel}>Gemstone {idx + 1}</Text>
                    </View>
                  ))}
                </View>
              )}
            </>
          )}

          {/* General Details */}
          <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('general')}>
            <View style={styles.accordionHeaderLeft}>
              <Ionicons name="information-circle-outline" size={20} color="#000" />
              <Text style={styles.accordionTitle}>GENERAL DETAILS</Text>
            </View>
            <Ionicons name={expandedSection === 'general' ? 'chevron-up' : 'chevron-down'} size={20} color="#000" />
          </TouchableOpacity>
          {expandedSection === 'general' && (
            <View style={styles.accordionContent}>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Collection</Text>
                  <Text style={styles.detailValue}>{localProductDetails.collection}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Gender</Text>
                  <Text style={styles.detailValue}>{localProductDetails.gender}</Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Occasion</Text>
                  <Text style={styles.detailValue}>{localProductDetails.occasion}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Jewellery Type</Text>
                  <Text style={styles.detailValue}>{localProductDetails.jewellery_type}</Text>
                </View>
              </View>
            </View>
          )}

          {/* Description */}
          <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('description')}>
            <View style={styles.accordionHeaderLeft}>
              <Ionicons name="document-text-outline" size={20} color="#000" />
              <Text style={styles.accordionTitle}>DESCRIPTION</Text>
            </View>
            <Ionicons name={expandedSection === 'description' ? 'chevron-up' : 'chevron-down'} size={20} color="#000" />
          </TouchableOpacity>
          {expandedSection === 'description' && (
            <View style={styles.accordionContent}>
              <Text style={styles.accordionText}>{localProductDetails.product_description}</Text>
            </View>
          )}

          {/* Savings Banner */}
          <TouchableOpacity style={styles.savingsBanner}>
            <Image source={require('../assets/diamondbanner.png')} style={styles.savingsBannerImage} />
            {/* <View style={styles.savingsBannerContent}>
              <Text style={styles.savingsBannerTitle}>Smart Savings Schemes</Text>
              <Text style={styles.savingsBannerText}>
                Join flexible gold saving plans and grow your wealth with ease.
              </Text>
            </View> */}
            <TouchableOpacity style={styles.exploreBadge}>
              <Ionicons name="arrow-forward-circle" size={28} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>You may also like</Text>
          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
            {/* <View style={styles.similarProducts}>
              {[1, 2].map((_, index) => (
                <View key={index} style={styles.similarProductCard}>
                  <TouchableOpacity style={styles.similarFavorite}>
                    <Ionicons name="heart-outline" size={18} color="#666" />
                  </TouchableOpacity>
                  <Image source={require('../assets/earrings.png')} style={styles.similarProductImage} />
                  <Text style={styles.similarProductName} numberOfLines={2}>
                    Arch of Royalty Gold Finger Ring
                  </Text>
                  <View style={styles.similarPriceRow}>
                    <Text style={styles.similarPrice}>₹37,869</Text>
                    <Text style={styles.similarOriginalPrice}>₹40,869</Text>
                  </View>
                  <View style={styles.similarDiscount}>
                    <Text style={styles.similarDiscountText}>10% off making charges</Text>
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
                      <Ionicons name="cart-outline" size={16} color="#832729" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View> */}
             {recommendedProductsLoading ? (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <ActivityIndicator size="small" color="#832729" />
            </View>
          ) : localRecommendedProducts.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.similarProducts}>
                {localRecommendedProducts.map((item) => (
                  <RecommendedProductCard key={item.id} item={item} />
                ))}
              </View>
            </ScrollView>
          ) : (
            <Text style={{ textAlign: 'center', color: '#666', padding: 20 }}>
              No recommendations available
            </Text>
          )}
          {/* </ScrollView> */}

          {/* <Image source={require('../assets/diamondbanner.png')} style={styles.bottomBanner} />
          <TouchableOpacity style={styles.exploreNowButton}>
            <Text style={styles.exploreNowText}>Explore Now</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>

      <View style={[styles.addToCartContainer, { bottom: insets.bottom + 15 }]}>
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            cartLoading && styles.addToCartButtonDisabled,
          ]}
          onPress={handleAddToCart}
          disabled={cartLoading}
        >
          {cartLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Ionicons name="cart-outline" size={20} color="#fff" />
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </>
          )}
        </TouchableOpacity>
      </View>


       <Modal
        visible={sizeChartVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSizeChartVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSizeChartVisible(false)}
        >
          <View style={styles.sizeChartModalContent}>
            <Image
              source={{ uri: localProductDetails.sizechart_image }}
              style={styles.sizeChartImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setSizeChartVisible(false)}
            >
              <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Cart Already Exists Modal */}
{/* Reusable Cart Feedback Modal */}
{/* Cart Feedback Modal – Success / Already in Cart / Generic Issue */}
<Modal
  visible={cartErrorModalVisible}
  transparent={true}
  animationType="fade"
  onRequestClose={() => setCartErrorModalVisible(false)}
>
  <Pressable
    style={styles.modalOverlay}
    onPress={() => setCartErrorModalVisible(false)}
  >
    <View style={styles.cartFeedbackModalContent}>
      <Ionicons
        name={
          cartErrorMessage.includes('already') || cartErrorMessage.includes('Unable')
            ? 'alert-circle-outline'
            : 'checkmark-circle-outline'
        }
        size={60}
        color={
          cartErrorMessage.includes('already') || cartErrorMessage.includes('Unable')
            ? '#FF6B6B'
            : '#4CAF50'
        }
      />

      <Text style={styles.cartFeedbackTitle}>
        {cartErrorMessage.includes('already')
          ? 'Already in Cart'
          : cartErrorMessage.includes('successfully')
          ? 'Added to Cart'
          : 'Notice'}
      </Text>

      <Text style={styles.cartFeedbackText}>{cartErrorMessage}</Text>

      <View style={styles.cartFeedbackButtons}>
        <TouchableOpacity
          style={styles.cartFeedbackBtnSecondary}
          onPress={() => setCartErrorModalVisible(false)}
        >
          <Text style={styles.cartFeedbackBtnTextSecondary}>Close</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartFeedbackBtnPrimary}
          onPress={() => {
            setCartErrorModalVisible(false);
            navigation.navigate('Cart');
          }}
        >
          <Text style={styles.cartFeedbackBtnTextPrimary}>View Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Pressable>
</Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#832729' },
  errorText: { fontSize: 16, color: 'red', textAlign: 'center' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerIcons: { flexDirection: 'row', gap: 16 },
  scrollContent: { paddingBottom: 100 },
  mainImageContainer: { width, height: width * 0.9, backgroundColor: '#f9f9f9', position: 'relative' },
  mainImage: { width: '100%', height: '100%' },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  shareButton: { position: 'absolute', top: 60, right: 16, zIndex: 10, backgroundColor: '#fff', borderRadius: 20, padding: 8, elevation: 3 },
  thumbnailList: { paddingHorizontal: 16, paddingVertical: 12 },
  thumbnailContainer: { width: 70, height: 70, borderRadius: 8, borderWidth: 2, borderColor: '#e0e0e0', marginRight: 12, padding: 4, backgroundColor: '#fff' },
  selectedThumbnail: { borderColor: '#832729' },
  thumbnailImage: { width: '100%', height: '100%' },
  productInfo: { paddingHorizontal: 16 },
  centeredTitleContainer: { alignItems: 'center', marginVertical: 16 },
  productName: { fontSize: 18, fontWeight: '600', color: '#000', textAlign: 'center' },
  productSku: { fontSize: 12, color: '#666', marginTop: 6, textAlign: 'center' },
  singleInfoCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#832729',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoCardItem: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  infoLabel: { fontSize: 14, fontWeight: '600', color: '#000' },
  verticalDivider: { width: 1, height: '100%', backgroundColor: '#832729' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#000', marginTop: 8, marginBottom: 12 },
  accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, paddingHorizontal: 16, marginBottom: 12, backgroundColor: '#fff' },
  accordionHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  accordionTitle: { fontSize: 14, fontWeight: '600', color: '#000' },
  accordionContent: { paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#f9f9f9', borderRadius: 8, marginBottom: 12 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  detailItem: { flex: 1 },
  detailLabel: { fontSize: 14, fontWeight: '600', color: '#000', marginBottom: 4 },
  detailValue: { fontSize: 12, color: '#666' },
  accordionText: { fontSize: 14, color: '#333', lineHeight: 20 },
  stoneItem: { marginBottom: 16 },
  stoneName: { fontSize: 15, fontWeight: '600', color: '#000' },
  gemstoneLabel: { fontSize: 13, color: '#666', marginTop: 4 },
  savingsBanner: { height: 120, borderRadius: 12, overflow: 'hidden', marginVertical: 20, position: 'relative' },
  savingsBannerImage: { width: '100%', height: '100%', position: 'absolute' },
  savingsBannerContent: { padding: 16, justifyContent: 'center', flex: 1 },
  savingsBannerTitle: { fontSize: 16, fontWeight: '700', color: '#fff', marginBottom: 4 },
  savingsBannerText: { fontSize: 12, color: '#fff', maxWidth: '70%' },
  exploreBadge: { position: 'absolute', right: 16, top: '50%', transform: [{ translateY: -14 }] },
  similarProducts: { flexDirection: 'row', gap: 12, marginVertical: 12 },
  similarProductCard: { width: 160, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#eee', padding: 10, elevation: 3 },
  similarFavorite: { position: 'absolute', top: 8, right: 8, zIndex: 10, backgroundColor: '#fff', borderRadius: 12, padding: 4 },
  similarProductImage: { width: '100%', height: 100, marginBottom: 8 },
  similarProductName: { fontSize: 12, fontWeight: '500', color: '#222', marginBottom: 4, minHeight: 32 },
  similarPriceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  similarPrice: { fontSize: 14, fontWeight: '700', color: '#832729', marginRight: 6 },
  similarOriginalPrice: { fontSize: 11, color: '#999', textDecorationLine: 'line-through' },
  similarDiscount: { backgroundColor: '#832729', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start', marginBottom: 6 },
  similarDiscountText: { color: '#fff', fontSize: 8, fontWeight: '600' },
  similarRating: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  similarRatingText: { fontSize: 10, color: '#666', marginLeft: 4 },
  similarButtons: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  viewSimilarBtn: { flex: 1, borderWidth: 1, borderColor: '#832729', borderRadius: 6, paddingVertical: 6, alignItems: 'center' },
  viewSimilarBtnText: { color: '#832729', fontSize: 10, fontWeight: '600' },
  cartBtn: { backgroundColor: '#fff', borderRadius: 6, padding: 6, borderWidth: 1, borderColor: '#832729' },
  bottomBanner: { width: '100%', height: 200, borderRadius: 12, marginTop: 20 },
  exploreNowButton: { position: 'absolute', right: 16, bottom: 16, backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  exploreNowText: { fontSize: 14, fontWeight: '600', color: '#000' },
  addToCartContainer: { position: 'absolute', left: 0, right: 0, backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#e0e0e0' },
  addToCartButton: { backgroundColor: '#832729', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 8, gap: 8 },
  addToCartText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  //
   sizeSection: {
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  
  sizeButtonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  sizeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSizeButton: {
    borderColor: '#832729',
    backgroundColor: '#832729',
  },
  sizeButtonText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  selectedSizeButtonText: {
    color: '#fff',
  },
  sizeChartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingVertical: 6,
  },
  sizeChartText: {
    fontSize: 14,
    color: '#832729',
    fontWeight: '500',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeChartModalContent: {
    width: width * 0.95,
    maxHeight: width * 1.4,
    position: 'relative',
  },
  sizeChartImage: {
    width: '100%',
    height: '100%',
  },
  closeModalButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 6,
  },

  //
  sizeSection: {
  marginBottom: 24,
},
sizeSectionTitle: {
  fontSize: 16,
  fontWeight: '600',
  color: '#000',
  marginBottom: 12,
},
sizeRowWithChart: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',   // This pushes chart link to the right
  flexWrap: 'wrap',                  // Allows wrapping on small screens
},
sizeButtonsRow: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 12,
  flex: 1,                           // Takes available space
},
sizeButton: {
  width: 50,
  height: 50,
  borderRadius: 25,
  borderWidth: 1,
  borderColor: '#ccc',
  backgroundColor: '#fff',
  justifyContent: 'center',
  alignItems: 'center',
},
selectedSizeButton: {
  borderColor: '#832729',
  backgroundColor: '#832729',
},
sizeButtonText: {
  fontSize: 14,
  color: '#000',
  fontWeight: '600',
},
selectedSizeButtonText: {
  color: '#fff',
},
sizeChartLink: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  marginLeft: 12,                    // Small spacing when wrapped
},
sizeChartText: {
  fontSize: 14,
  color: '#832729',
  fontWeight: '500',
},
cartErrorModalContent: {
  backgroundColor: '#fff',
  padding: 24,
  borderRadius: 16,
  alignItems: 'center',
  width: width * 0.85,
  maxWidth: 340,
},
cartErrorTitle: {
  fontSize: 20,
  fontWeight: '700',
  color: '#000',
  marginTop: 16,
  marginBottom: 8,
},
cartErrorText: {
  fontSize: 14,
  color: '#666',
  textAlign: 'center',
  marginBottom: 24,
},
cartErrorButtons: {
  flexDirection: 'row',
  gap: 12,
  width: '100%',
},
cartErrorBtnSecondary: {
  flex: 1,
  paddingVertical: 12,
  borderWidth: 1,
  borderColor: '#832729',
  borderRadius: 8,
  alignItems: 'center',
},
cartErrorBtnTextSecondary: {
  color: '#832729',
  fontWeight: '600',
},
cartErrorBtnPrimary: {
  flex: 1,
  backgroundColor: '#832729',
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
},
cartErrorBtnTextPrimary: {
  color: '#fff',
  fontWeight: '600',
},

//
cartFeedbackModalContent: {
  backgroundColor: '#fff',
  padding: 24,
  borderRadius: 16,
  alignItems: 'center',
  width: width * 0.85,
  maxWidth: 340,
  elevation: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
},
cartFeedbackTitle: {
  fontSize: 20,
  fontWeight: '700',
  color: '#000',
  marginTop: 16,
  marginBottom: 8,
},
cartFeedbackText: {
  fontSize: 15,
  color: '#444',
  textAlign: 'center',
  marginBottom: 24,
  lineHeight: 22,
},
cartFeedbackButtons: {
  flexDirection: 'row',
  gap: 12,
  width: '100%',
},
cartFeedbackBtnSecondary: {
  flex: 1,
  paddingVertical: 12,
  borderWidth: 1,
  borderColor: '#832729',
  borderRadius: 8,
  alignItems: 'center',
},
cartFeedbackBtnTextSecondary: {
  color: '#832729',
  fontWeight: '600',
  fontSize: 15,
},
cartFeedbackBtnPrimary: {
  flex: 1,
  backgroundColor: '#832729',
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
},
cartFeedbackBtnTextPrimary: {
  color: '#fff',
  fontWeight: '600',
  fontSize: 15,
},
cartFeedbackModalContent: {
  backgroundColor: '#fff',
  padding: 24,
  borderRadius: 16,
  alignItems: 'center',
  width: width * 0.85,
  maxWidth: 340,
  elevation: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
},
cartFeedbackTitle: {
  fontSize: 20,
  fontWeight: '700',
  color: '#000',
  marginTop: 16,
  marginBottom: 8,
},
cartFeedbackText: {
  fontSize: 15,
  color: '#444',
  textAlign: 'center',
  marginBottom: 24,
  lineHeight: 22,
},
cartFeedbackButtons: {
  flexDirection: 'row',
  gap: 12,
  width: '100%',
},
cartFeedbackBtnSecondary: {
  flex: 1,
  paddingVertical: 12,
  borderWidth: 1,
  borderColor: '#832729',
  borderRadius: 8,
  alignItems: 'center',
},
cartFeedbackBtnTextSecondary: {
  color: '#832729',
  fontWeight: '600',
  fontSize: 15,
},
cartFeedbackBtnPrimary: {
  flex: 1,
  backgroundColor: '#832729',
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
},
cartFeedbackBtnTextPrimary: {
  color: '#fff',
  fontWeight: '600',
  fontSize: 15,
},
});

export default ProductDetailsScreen;