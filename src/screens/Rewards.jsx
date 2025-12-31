// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   FlatList,
// } from 'react-native';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Ionicons';

// const GeetaGoldScreen = ({ navigation }) => {
//   const insets = useSafeAreaInsets();

//   const metalCategories = [
//     {
//       id: '1',
//       name: 'Gold',
//       image: require('../assets/haaram.png'),
//     },
//     {
//       id: '2',
//       name: 'Silver',
//       image: require('../assets/diamondearring.png'),
//     },
//     {
//       id: '3',
//       name: 'Platinum',
//       image: require('../assets/diamondring.png'),
//     },
//   ];

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.categoryCard}
//       activeOpacity={0.8}
//     onPress={() =>
//   navigation.navigate('PdfViewerScreen', {
//     pdfUrl: 'https://www.grtjewels.com/asia/wp-content/uploads/2016/06/singapore-catalogue.pdf?srsltid=AfmBOoriCd5awVMLcG7DrMxsJldvjN4H1w4FQhgXJZeyMse49yY4To1P',
//   })
// }
//     >
//       <Image source={item.image} style={styles.categoryImage} />
//       <View style={styles.categoryTextContainer}>
//         <Text style={styles.categoryName}>{item.name}</Text>
//         <Text style={styles.subText}>Explore exquisite {item.name} jewelry</Text>
//       </View>
//       <Icon name="chevron-forward" size={22} color="#9C9C9C" />
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={[styles.safeArea, {  }]}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={22} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Geeta Gold</Text>
//         <View style={{ width: 22 }} /> {/* Spacer for layout balance */}
//       </View>

//       {/* Category List */}
//       <FlatList
//         data={metalCategories}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContainer}
//         showsVerticalScrollIndicator={false}
//       />

//       {/* WhatsApp Floating Button */}
//       {/* <TouchableOpacity style={styles.whatsappButton} activeOpacity={0.8}>
//         <Icon name="logo-whatsapp" size={26} color="#fff" />
//       </TouchableOpacity> */}
//     </SafeAreaView>
//   );
// };

// export default GeetaGoldScreen;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#F9F9F9',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     // backgroundColor: '#fff',
//     paddingHorizontal: 18,
//     paddingVertical: 14,
//     // borderBottomWidth: 0.6,
//     // borderBottomColor: '#E5E5E5',
//     // elevation: 1,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#000',
//   },
//   listContainer: {
//     paddingVertical: 10,
//   },
//   categoryCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     marginHorizontal: 16,
//     marginBottom: 14,
//     padding: 14,
//     borderRadius: 14,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 3,
//   },
//   categoryImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 12,
//     marginRight: 14,
//   },
//   categoryTextContainer: {
//     flex: 1,
//   },
//   categoryName: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: '#1A1A1A',
//   },
//   subText: {
//     fontSize: 13,
//     color: '#707070',
//     marginTop: 3,
//   },
//   whatsappButton: {
//     position: 'absolute',
//     bottom: 24,
//     right: 20,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#25D366',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 6,
//     shadowColor: '#000',
//     shadowOpacity: 0.25,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 4,
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
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatalogueProducts } from '../redux/slices/categorySlice'; // Adjust the import path

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 36) / 2; // 12px padding on each side + gap

const DiamondEarringCatalogueScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const {
    catalogueProducts = [],
    catalogueProductsLoading = false,
    catalogueProductsError = null,
  } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCatalogueProducts());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
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

  if (catalogueProductsLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

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
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <Text style={styles.header}>Diamond Earrings Catalogue</Text>

      <FlatList
        data={catalogueProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text>No products available</Text>
          </View>
        }
      />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 16,
    color: '#262626',
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: ITEM_WIDTH,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: ITEM_WIDTH,
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 4,
  },
});


