// import React, { useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StatusBar,
//   Dimensions,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchWishlist,
//   removeFromWishlist,
// } from '../redux/slices/wishlistSlice';

// const { width } = Dimensions.get('window');
// const CARD_WIDTH = (width - 36) / 2; // 2 columns with spacing

// const WishList = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const { wishlist, loading, error } = useSelector((state) => state.wishlist);
//   const { customerId } = useSelector((state) => state.Auth || {});
//   const userId = customerId || 1;

//   useEffect(() => {
//     if (customerId) {
//       dispatch(fetchWishlist(customerId));
//     }
//   }, [customerId, dispatch]);

//   const handleRemoveFromWishlist = async (wishlistId, productId) => {
//     if (!customerId) {
//       Alert.alert('Sign In Required', 'Please sign in to manage your wishlist.');
//       return;
//     }

//     try {
//       await dispatch(removeFromWishlist({ wishlist_id: wishlistId })).unwrap();
//     } catch (err) {
//       Alert.alert('Error', 'Failed to remove from wishlist. Please try again.');
//     }
//   };

//   const handleProductPress = (item) => {
//     navigation.navigate('ProductDetailsScreen', {
//       user_id: userId,
//       product_id: item.product_id,
//     });
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       activeOpacity={0.85}
//       onPress={() => handleProductPress(item)}
//       style={styles.cardWrapper}
//     >
//       <View style={styles.card}>
//         {/* Remove Heart Icon */}
//         <TouchableOpacity
//           style={styles.heartIcon}
//           onPress={(e) => {
//             e.stopPropagation(); // Prevent triggering card navigation
//             handleRemoveFromWishlist(item.wishlist_id, item.product_id);
//           }}
//         >
//           <Ionicons name="heart" size={20} color="#E53935" />
//         </TouchableOpacity>

//         {/* Product Image */}
//         <Image
//           source={{ uri: item.product_main_image }}
//           style={styles.image}
//           resizeMode="contain"
//           defaultSource={require('../assets/haaram.png')}
//         />

//         {/* Product Info */}
//         <View style={styles.infoContainer}>
//           <Text style={styles.name} numberOfLines={2}>
//             {item.product_name}
//           </Text>

//           <View style={styles.priceRow}>
//             <Text style={styles.salePrice}>
//               ₹ {item.total_value || 4000} /g
//             </Text>
//           </View>

//           <TouchableOpacity
//             style={styles.cartBtn}
//             onPress={(e) => {
//               e.stopPropagation(); // Prevent navigation when adding to cart
//               navigation.navigate('Cart');
//             }}
//           >
//             <Text style={styles.cartBtnText}>ADD TO CART</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderEmpty = () => (
//     <View style={styles.emptyContainer}>
//       <Ionicons name="heart-outline" size={60} color="#ccc" />
//       <Text style={styles.emptyText}>Your wishlist is empty</Text>
//       <Text style={styles.emptySubText}>
//         Add items you love to save them for later
//       </Text>
//       <TouchableOpacity
//         style={styles.browseBtn}
//         onPress={() => navigation.navigate('DrawerNavigation')}
//       >
//         <Text style={styles.browseBtnText}>Add Products</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <SafeAreaView
//       style={[
//         styles.container,
//         { paddingTop: insets.top, paddingBottom: insets.bottom },
//       ]}
//     >
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={22} color="#832729" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Wishlist ({wishlist.length})</Text>
//         <View style={{ width: 22 }} />
//       </View>

//       {/* Content */}
//       {loading ? (
//         <View style={styles.center}>
//           <ActivityIndicator size="large" color="#832729" />
//           <Text style={styles.loadingText}>Loading wishlist...</Text>
//         </View>
//       ) : error ? (
//         <View style={styles.center}>
//           <Text style={styles.errorText}>Failed to load wishlist</Text>
//           <TouchableOpacity
//             onPress={() => customerId && dispatch(fetchWishlist(customerId))}
//           >
//             <Text style={styles.retryText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       ) : wishlist.length === 0 ? (
//         renderEmpty()
//       ) : (
//         <FlatList
//           data={wishlist}
//           keyExtractor={(item) => item.wishlist_id.toString()}
//           renderItem={renderItem}
//           numColumns={2}
//           columnWrapperStyle={styles.row}
//           contentContainerStyle={{
//             paddingTop: 16,
//             paddingBottom: insets.bottom + 20,
//             paddingHorizontal: 10,
//           }}
//           showsVerticalScrollIndicator={false}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   center: {
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
//     marginBottom: 10,
//   },
//   retryText: {
//     color: '#832729',
//     fontWeight: '600',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     justifyContent: 'flex-start',
//     paddingVertical: 10,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#ddd',
//     gap: 10,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#832729',
//   },
//   row: {
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   cardWrapper: {
//     width: CARD_WIDTH,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     width: '100%',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//     paddingBottom: 10,
//     borderWidth: 1,
//     borderColor: '#EAEAEA',
//     position: 'relative',
//   },
//   heartIcon: {
//     position: 'absolute',
//     right: 10,
//     top: 10,
//     zIndex: 1,
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     padding: 5,
//     elevation: 2,
//   },
//   image: {
//     width: '100%',
//     height: 120,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   infoContainer: {
//     paddingHorizontal: 8,
//     paddingTop: 5,
//   },
//   name: {
//     fontSize: 13,
//     fontWeight: '500',
//     color: '#000',
//     height: 34,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//   },
//   salePrice: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#000',
//   },
//   cartBtn: {
//     borderWidth: 1,
//     borderColor: '#832729',
//     borderRadius: 6,
//     paddingVertical: 6,
//     alignItems: 'center',
//     marginTop: 6,
//   },
//   cartBtnText: {
//     color: '#832729',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 40,
//   },
//   emptyText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     marginTop: 16,
//   },
//   emptySubText: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 8,
//   },
//   browseBtn: {
//     marginTop: 20,
//     backgroundColor: '#832729',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   browseBtnText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
// });

// export default WishList;
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWishlist,
  removeFromWishlist,
} from '../redux/slices/wishlistSlice';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 36) / 2;

// Font family constants
const FONTS = {
  regular: 'SF-Pro-Display-Regular',
  medium: 'SF-Pro-Display-Medium',
  semibold: 'SF-Pro-Display-Semibold',
  bold: 'SF-Pro-Display-Bold',
};

const WishList = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { wishlist, loading, error } = useSelector((state) => state.wishlist);
  const { customerId } = useSelector((state) => state.Auth || {});
  const userId = customerId || 1;

  useEffect(() => {
    if (customerId) {
      dispatch(fetchWishlist(customerId));
    }
  }, [customerId, dispatch]);

  const handleRemoveFromWishlist = async (wishlistId, productId) => {
    if (!customerId) {
      Alert.alert('Sign In Required', 'Please sign in to manage your wishlist.');
      return;
    }

    try {
      await dispatch(removeFromWishlist({ wishlist_id: wishlistId })).unwrap();
    } catch (err) {
      Alert.alert('Error', 'Failed to remove from wishlist. Please try again.');
    }
  };

  const handleProductPress = (item) => {
    navigation.navigate('ProductDetailsScreen', {
      user_id: userId,
      product_id: item.product_id,
    });
  };

  // const renderItem = ({ item }) => (
  //   <TouchableOpacity
  //     activeOpacity={0.85}
  //     onPress={() => handleProductPress(item)}
  //     style={styles.cardWrapper}
  //   >
  //     <View style={styles.card}>
  //       {/* Remove Heart Icon */}
  //       <TouchableOpacity
  //         style={styles.heartIcon}
  //         onPress={(e) => {
  //           e.stopPropagation();
  //           handleRemoveFromWishlist(item.wishlist_id, item.product_id);
  //         }}
  //       >
  //         <Ionicons name="heart" size={20} color="#E53935" />
  //       </TouchableOpacity>

  //       {/* Product Image */}
  //       <Image
  //         source={{ uri: item.product_main_image }}
  //         style={styles.image}
  //         resizeMode="contain"
  //         // defaultSource={require('../assets/haaram.png')}
  //       />

  //       {/* Product Info */}
  //       <View style={styles.infoContainer}>
  //         <Text style={styles.name} numberOfLines={2}>
  //           {item.product_name}
  //         </Text>

  //         <View style={styles.priceRow}>
  //           <Text style={styles.salePrice}>
  //             ₹ {item.total_value || 4000} /g
  //           </Text>
  //         </View>

  //         <TouchableOpacity
  //           style={styles.cartBtn}
  //           onPress={(e) => {
  //             e.stopPropagation();
  //             // navigation.navigate('Cart');
  //           }}
  //         >
  //           <Text style={styles.cartBtnText}>View similar</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   </TouchableOpacity>
  // );
const renderItem = ({ item }) => (
  <TouchableOpacity
    activeOpacity={0.85}
    onPress={() => handleProductPress(item)}
    style={styles.cardWrapper}
  >
    <View style={styles.card}>
      {/* Heart Icon */}
      <TouchableOpacity
        style={styles.heartIcon}
        onPress={(e) => {
          e.stopPropagation();
          handleRemoveFromWishlist(item.wishlist_id, item.product_id);
        }}
      >
        <Ionicons name="heart" size={20} color="#E53935" />
      </TouchableOpacity>

      {/* Product Image */}
      <Image
        source={{ uri: item.product_main_image }}
        style={styles.image}
        resizeMode="contain"
        // defaultSource={require('../assets/haaram.png')}
      />

      {/* Product Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {item.product_name}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.salePrice}>
            ₹ {item.total_value || 4000} /g
          </Text>
        </View>

        <View style={styles.cartBtn}>
          <Text style={styles.cartBtnText}>View Details</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="heart-outline" size={60} color="#ccc" />
      <Text style={styles.emptyText}>Your wishlist is empty</Text>
      <Text style={styles.emptySubText}>
        Add items you love to save them for later
      </Text>
      <TouchableOpacity
        style={styles.browseBtn}
        onPress={() => navigation.navigate('DrawerNavigation')}
      >
        <Text style={styles.browseBtnText}>Add Products</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
       
        <Text style={styles.headerTitle}>Wishlist ({wishlist.length})</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#832729" />
          <Text style={styles.loadingText}>Loading wishlist...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>Failed to load wishlist</Text>
          <TouchableOpacity
            onPress={() => customerId && dispatch(fetchWishlist(customerId))}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : wishlist.length === 0 ? (
        renderEmpty()
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.wishlist_id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{
            paddingTop: 16,
            paddingBottom: insets.bottom + 20,
            paddingHorizontal: 10,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: '#832729',
  },
  errorText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: 'red',
    marginBottom: 10,
  },
  retryText: {
    color: '#832729',
    fontFamily: FONTS.semibold,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    gap: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: '#000',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  cardWrapper: {
    width: CARD_WIDTH,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    position: 'relative',
  },
  heartIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    paddingHorizontal: 8,
    paddingTop: 5,
  },
  name: {
    fontSize: 13,
    fontFamily: FONTS.semibold,
    color: '#000',
    height: 34,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  salePrice: {
    fontSize: 13,
    fontFamily: FONTS.bold,
    color: '#000',
  },
  cartBtn: {
    borderWidth: 1,
    borderColor: '#832729',
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
    marginTop: 6,
  },
  cartBtnText: {
    color: '#832729',
    fontSize: 12,
    fontFamily: FONTS.semibold,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: '#333',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  browseBtn: {
    marginTop: 20,
    backgroundColor: '#832729',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseBtnText: {
    color: '#fff',
    fontFamily: FONTS.semibold,
  },
});

export default WishList;