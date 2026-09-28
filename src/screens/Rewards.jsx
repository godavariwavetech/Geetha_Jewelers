
// import React, { useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCatalogueProducts } from '../redux/slices/categorySlice';
// import LinearGradient from 'react-native-linear-gradient';
// import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
// import { useNavigation } from '@react-navigation/native'; // <--- 1. Import Hook

// // Setup Shimmer
// const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

// const { width } = Dimensions.get('window');
// const ITEM_WIDTH = (width - 36) / 2;

// const DiamondEarringCatalogueScreen = () => {
//   const insets = useSafeAreaInsets();
//   const dispatch = useDispatch();
//   const navigation = useNavigation(); // <--- 2. Initialize Navigation

//   // Select Category Data
//   const {
//     catalogueProducts = [],
//     catalogueProductsLoading = false,
//     catalogueProductsError = null,
//   } = useSelector((state) => state.category);

//   // Select User ID (Assuming you have an auth slice)
//   // If you don't have a user logged in, this might be null or undefined
//   const userId = useSelector((state) => state.auth?.user?.id || null); // <--- 3. Get User ID

//   useEffect(() => {
//     dispatch(fetchCatalogueProducts());
//   }, [dispatch]);

//   // --- 1. The Real Product Item (Updated with Navigation) ---
//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.card}
//       activeOpacity={0.8}
//       onPress={() => {
//         // <--- 4. Navigation Logic matches your target screen requirements
//         navigation.navigate('ProductDetailsScreen', {
//           product_id: item.id, // or item.product_id depending on your API response
//           user_id: userId,
//         });
//       }}
//     >
//       <Image
//         source={{ uri: item.product_main_image }}
//         style={styles.image}
//         resizeMode="cover"
//       />
//       <Text style={styles.title} numberOfLines={2}>
//         {item.product_name}
//       </Text>
//     </TouchableOpacity>
//   );

//   // --- 2. The Skeleton/Shimmer Item ---
//   const renderSkeletonItem = () => (
//     <View style={styles.card}>
//       <ShimmerPlaceholder
//         style={styles.skeletonImage}
//         shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
//       />
//       <View style={{ alignItems: 'center', marginTop: 10 }}>
//         <ShimmerPlaceholder
//           style={styles.skeletonTextLine}
//           shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
//         />
//         <ShimmerPlaceholder
//           style={[styles.skeletonTextLine, { width: '60%', marginTop: 6 }]}
//           shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
//         />
//       </View>
//     </View>
//   );

//   if (catalogueProductsError) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Error: {catalogueProductsError}</Text>
//       </View>
//     );
//   }

//   return (
//     <View
//       style={[
//         styles.container,
//         {
//           paddingTop: insets.top,
//           paddingBottom: insets.bottom,
//         },
//       ]}
//     >
//       <Text style={styles.header}>Diamond Earrings Catalogue</Text>

//       {catalogueProductsLoading ? (
//         <FlatList
//           data={[1, 2, 3, 4, 5, 6, 7, 8]}
//           keyExtractor={(item) => item.toString()}
//           renderItem={renderSkeletonItem}
//           numColumns={2}
//           showsVerticalScrollIndicator={false}
//           columnWrapperStyle={styles.row}
//           contentContainerStyle={{ paddingBottom: 20 }}
//         />
//       ) : (
//         <FlatList
//           data={catalogueProducts}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={renderItem}
//           numColumns={2}
//           showsVerticalScrollIndicator={false}
//           columnWrapperStyle={styles.row}
//           contentContainerStyle={{ paddingBottom: 20 }}
//           ListEmptyComponent={
//             <View style={styles.emptyContainer}>
//               <Text>No products available</Text>
//             </View>
//           }
//         />
//       )}
//     </View>
//   );
// };

// export default DiamondEarringCatalogueScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 12,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 50,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginVertical: 16,
//     color: '#262626',
//   },
//   row: {
//     justifyContent: 'space-between',
//   },
//   card: {
//     width: ITEM_WIDTH,
//     marginBottom: 16,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     paddingBottom: 10,
//   },
//   image: {
//     width: '100%',
//     height: ITEM_WIDTH,
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//   },
//   title: {
//     marginTop: 8,
//     fontSize: 14,
//     textAlign: 'center',
//     color: '#333',
//     paddingHorizontal: 4,
//   },
//   skeletonImage: {
//     width: '100%',
//     height: ITEM_WIDTH,
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//   },
//   skeletonTextLine: {
//     height: 12,
//     width: '80%',
//     borderRadius: 6,
//   },
// });
// import React, { useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCatalogueProducts } from '../redux/slices/categorySlice';
// import LinearGradient from 'react-native-linear-gradient';
// import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
// import { useNavigation } from '@react-navigation/native';
// const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
// const { width } = Dimensions.get('window');
// const ITEM_WIDTH = (width - 36) / 2;
// const DiamondEarringCatalogueScreen = () => {
//   const insets = useSafeAreaInsets();
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const {
//     catalogueProducts = [],
//     catalogueProductsLoading = false,
//     catalogueProductsError = null,
//   } = useSelector((state) => state.category);
//   const { customerId } = useSelector((state) => state.Auth || {});

//   useEffect(() => {
//     dispatch(fetchCatalogueProducts());
//   }, [dispatch]);
//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.card}
//       activeOpacity={0.8}
//       onPress={() => {
       
//         navigation.navigate('ProductDetailsScreen', {
//           product_id: item.id, 
//           user_id: customerId, 
//         });
//       }}
//     >
//       <Image
//         source={{ uri: item.product_main_image }}
//         style={styles.image}
//         resizeMode="cover"
//       />
//       <Text style={styles.title} numberOfLines={2}>
//         {item.product_name}
//       </Text>
//     </TouchableOpacity>
//   );

//   const renderSkeletonItem = () => (
//     <View style={styles.card}>
//       <ShimmerPlaceholder
//         style={styles.skeletonImage}
//         shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
//       />
      
//       <View style={{ alignItems: 'center', marginTop: 10 }}>
//         <ShimmerPlaceholder
//           style={styles.skeletonTextLine}
//           shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
//         />
//         <ShimmerPlaceholder
//           style={[styles.skeletonTextLine, { width: '60%', marginTop: 6 }]}
//           shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
//         />
//       </View>
//     </View>
//   );

//   if (catalogueProductsError) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Error: {catalogueProductsError}</Text>
//       </View>
//     );
//   }

//   return (
//     <View
//       style={[
//         styles.container,
//         {
//           paddingTop: insets.top +15,
//           paddingBottom: insets.bottom,
//         },
//       ]}
//     >
      
//            {catalogueProductsLoading ? (
//         <FlatList
//           data={[1, 2, 3, 4, 5, 6, 7, 8]}
//           keyExtractor={(item) => item.toString()}
//           renderItem={renderSkeletonItem}
//           numColumns={2}
//           showsVerticalScrollIndicator={false}
//           columnWrapperStyle={styles.row}
//           contentContainerStyle={{ paddingBottom: 20 }}
//         />
//       ) : (
//         <FlatList
//           data={catalogueProducts}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={renderItem}
//           numColumns={2}
//           showsVerticalScrollIndicator={false}
//           columnWrapperStyle={styles.row}
//           contentContainerStyle={{ paddingBottom: 20 }}
//           ListEmptyComponent={
//             <View style={styles.emptyContainer}>
//               <Text>No products available</Text>
//             </View>
//           }
//         />
//       )}
//     </View>
//   );
// };

// export default DiamondEarringCatalogueScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 12,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 50,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginVertical: 16,
//     color: '#262626',
//   },
//   row: {
//     justifyContent: 'space-between',
//   },
//   card: {
//     width: ITEM_WIDTH,
//     marginBottom: 16,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     paddingBottom: 10,
//   },
//   image: {
//     width: '100%',
//     height: ITEM_WIDTH,
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//   },
//   title: {
//     marginTop: 8,
//     fontSize: 14,
//     textAlign: 'center',
//     color: '#333',
//     paddingHorizontal: 4,
//   },
//   skeletonImage: {
//     width: '100%',
//     height: ITEM_WIDTH,
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//   },
//   skeletonTextLine: {
//     height: 12,
//     width: '80%',
//     borderRadius: 6,
//   },
// });
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatalogueProducts } from '../redux/slices/categorySlice';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Feather";
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 36) / 2;

// Font family constants
const FONTS = {
  regular: 'SF-Pro-Display-Regular',
  medium: 'SF-Pro-Display-Medium',
  semibold: 'SF-Pro-Display-Semibold',
  bold: 'SF-Pro-Display-Bold',
};

const DiamondEarringCatalogueScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    catalogueProducts = [],
    catalogueProductsLoading = false,
    catalogueProductsError = null,
  } = useSelector((state) => state.category);

  const { customerId } = useSelector((state) => state.Auth || {});

  useEffect(() => {
    dispatch(fetchCatalogueProducts());
  }, [dispatch]);


const renderEmptyCatalogue = () => (
  <View style={styles.emptyContainer}>
    <MaterialIcon name="ring" size={80} color="#E0E0E0" />
    <Text style={styles.emptyTitle}>No Products Found</Text>
    <Text style={styles.emptySubtitle}>
      We couldn't find any items in this category right now. Please check back later!
    </Text>
    <TouchableOpacity 
      style={styles.goBackButton} 
      onPress={() => navigation.goBack()}
    >
      <Text style={styles.goBackText}>Go Back</Text>
    </TouchableOpacity>
  </View>
);


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate('ProductDetailsScreen', {
          product_id: item.id,
          user_id: customerId,
        });
      }}
    >
      <Image
        source={{ uri: item.product_main_image }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={2}>
        {item.product_name}
      </Text>
    </TouchableOpacity>
  );

  const renderSkeletonItem = () => (
    <View style={styles.card}>
      <ShimmerPlaceholder
        style={styles.skeletonImage}
        shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
      />
      
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <ShimmerPlaceholder
          style={styles.skeletonTextLine}
          shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
        />
        <ShimmerPlaceholder
          style={[styles.skeletonTextLine, { width: '60%', marginTop: 6 }]}
          shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
        />
      </View>
    </View>
  );

  if (catalogueProductsError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {catalogueProductsError}</Text>
      </View>
    );
  }

  return (

    <View
      style={[
        styles.container,
        {
         
        },
      ]}
    >

 <StatusBar backgroundColor="#832729" barStyle="light-content" />
 <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Catalogue</Text>
          <View style={{ width: 24 }} />
        </View>

      {catalogueProductsLoading ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          keyExtractor={(item) => item.toString()}
          renderItem={renderSkeletonItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
         // FIX: Added paddingTop here so content starts below the header
  contentContainerStyle={{ 
    paddingTop: 16, 
    paddingBottom: insets.bottom + 100,
    flexGrow: 1 // Necessary for ListEmptyComponent to center correctly
  }}
  ListEmptyComponent={renderEmptyCatalogue}
        />
      ) : (
        <FlatList
          data={catalogueProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
          // FIX: Added paddingTop here so content starts below the header
  contentContainerStyle={{ 
    paddingTop: 16, 
    paddingBottom: insets.bottom + 100,
    flexGrow: 1 // Necessary for ListEmptyComponent to center correctly
  }}
  ListEmptyComponent={renderEmptyCatalogue}
        />
      )}
    </View>
  );
};

export default DiamondEarringCatalogueScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: '#666',
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: ITEM_WIDTH,
    marginBottom: 16,
    backgroundColor: '#832729',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingBottom: 10,
  },
  image: {
    width: '100%',
    height: ITEM_WIDTH,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: FONTS.medium,
    textAlign: 'center',
    color: '#fff',
    paddingHorizontal: 4,
  },
  skeletonImage: {
    width: '100%',
    height: ITEM_WIDTH,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  skeletonTextLine: {
    height: 12,
    width: '80%',
    borderRadius: 6,
  },

    header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: -12,
    backgroundColor: "#832729",
    // gap: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: "#fff",
  },
});
