// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   TextInput,
//   Image,
//   Dimensions
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';

// // Redux
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCategories } from "../redux/slices/categorySlice"; // Adjust path if needed

// const { width } = Dimensions.get('window');

// const CategoryNavigationScreen = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const [expandedCategory, setExpandedCategory] = useState('Gold');
//   const [selectedChipIndex, setSelectedChipIndex] = useState(0);

//   // Redux state
//   const { categories: apiCategories, loading: categoriesLoading, error: categoriesError } = useSelector(
//     (state) => state.category
//   );

//   // Fetch categories on mount
//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   // Toggle expandable metal category (Gold, Silver, Platinum)
//   const toggleCategory = (categoryId) => {
//     if (expandedCategory === categoryId) {
//       setExpandedCategory(null);
//     } else {
//       setExpandedCategory(categoryId);
//     }
//   };

//   const handleSubcategoryPress = (subcategory) => {
//     navigation.navigate('IndividualCategory', { category: subcategory.name });
//   };

//   // Static main metal categories (Gold, Silver, Platinum) - kept as per your design
//   const metalCategories = [
//     {
//       id: 'gold',
//       name: 'Gold',
//       color: '#FFD700',
//       image: require('../assets/mangalsutra.png'),
//       subcategories: [
//         { id: '1', name: 'Necklace', icon: require('../assets/earrings.png') },
//         { id: '2', name: 'Mangalsutra', icon: require('../assets/mangalsutra.png') },
//         { id: '3', name: 'Earrings', icon: require('../assets/earrings.png') },
//         { id: '4', name: 'Bangles', icon: require('../assets/mangalsutra.png') },
//         { id: '5', name: 'Rings', icon: require('../assets/earrings.png') },
//         { id: '6', name: 'Bracelets', icon: require('../assets/mangalsutra.png') },
//         { id: '7', name: 'Anklets', icon: require('../assets/earrings.png') },
//         { id: '8', name: 'Chains', icon: require('../assets/mangalsutra.png') },
//       ]
//     },
//     {
//       id: 'silver',
//       name: 'Silver',
//       color: '#C0C0C0',
//       image: require('../assets/earrings.png'),
//       subcategories: []
//     },
//     {
//       id: 'platinum',
//       name: 'Platinum',
//       color: '#E5E4E2',
//       image: require('../assets/mangalsutra.png'),
//       subcategories: []
//     }
//   ];

//   // Derive filter chips from API categories
//   const filterChips = apiCategories.length > 0
//     // ? ['All Jewellery', ...apiCategories.map(cat => 
//     ? [ ...apiCategories.map(cat => 
//         cat.category_name === "Earings" ? "Earrings" : cat.category_name
//       )]
//     : ['All Jewellery']; // fallback

//   return (
//     <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <Image 
//           source={require('../assets/geethalogo.png')} 
//           style={styles.logo}
//           resizeMode="contain"
//         />
        
//         <View style={styles.headerIcons}>
//           <TouchableOpacity style={styles.iconButton}>
//             <Ionicons name="notifications-outline" size={22} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("WishList")}>
//             <Ionicons name="heart-outline" size={22} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Cart")}>
//             <Ionicons name="cart-outline" size={22} color="#000" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <Ionicons name="search-outline" size={20} color="#666" />
//         <TextInput
//           placeholder="Search here Your favourite Jewellery"
//           style={styles.searchInput}
//           placeholderTextColor="#999"
//         />
//       </View>

//       {/* Filter Chips - Now dynamic from API */}
//       <View>
//             <ScrollView 
//         horizontal 
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.filterChipsContainer}
//       >
//         {categoriesLoading ? (
//           // Optional: Show skeleton chips while loading
//           [...Array(5)].map((_, i) => (
//             <View key={i} style={[styles.filterChip, { backgroundColor: '#eee', borderColor: '#eee' }]}>
//               <View style={{ width: 80, height: 16, backgroundColor: '#ddd', borderRadius: 8 }} />
//             </View>
//           ))
//         ) : categoriesError ? (
//           <Text style={{ paddingLeft: 16, color: 'red' }}>Failed to load filters</Text>
//         ) : (
//           filterChips.map((chip, index) => (
//             <TouchableOpacity 
//               key={index} 
//               style={[
//                 styles.filterChip,
//                 selectedChipIndex === index && styles.filterChipActive
//               ]}
//               onPress={() => setSelectedChipIndex(index)}
//             >
//               <Text style={[
//                 styles.filterChipText,
//                 selectedChipIndex === index && styles.filterChipTextActive
//               ]}>
//                 {chip}
//               </Text>
//             </TouchableOpacity>
//           ))
//         )}
//       </ScrollView>
//       </View>
  

//       <ScrollView 
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={[
//           styles.scrollContent,
//           { paddingBottom: insets.bottom + 100 }
//         ]}
//       >
//         {/* Main Metal Categories (Gold, Silver, Platinum) */}
//         {metalCategories.map((category) => (
//           <View key={category.id} style={styles.categoryCard}>
//             <TouchableOpacity 
//               style={styles.categoryHeader}
//               onPress={() => toggleCategory(category.id)}
//             >
//               <View style={styles.categoryImageContainer}>
//                 <Image 
//                   source={category.image} 
//                   style={styles.categoryImage}
//                   resizeMode="contain"
//                 />
//               </View>
              
//               <View style={styles.categoryInfo}>
//                 <Text style={styles.categoryName}>{category.name}</Text>
//                 <Ionicons 
//                   name={expandedCategory === category.id ? "chevron-up" : "chevron-down"} 
//                   size={20} 
//                   color="#000" 
//                 />
//               </View>
//             </TouchableOpacity>

//             {/* Subcategories */}
//             {expandedCategory === category.id && category.subcategories.length > 0 && (
//               <View style={styles.subcategoriesContainer}>
//                 {category.subcategories.map((subcategory) => (
//                   <TouchableOpacity 
//                     key={subcategory.id}
//                     style={styles.subcategoryItem}
//                     onPress={() => handleSubcategoryPress(subcategory)}
//                   >
//                     <View style={styles.subcategoryIcon}>
//                       <Image 
//                         source={subcategory.icon} 
//                         style={styles.subcategoryIconImage}
//                         resizeMode="contain"
//                       />
//                     </View>
//                     <Text style={styles.subcategoryName}>{subcategory.name}</Text>
//                     <Ionicons name="chevron-forward" size={18} color="#999" />
//                   </TouchableOpacity>
//                 ))}
                
//                 <TouchableOpacity style={styles.seeAllButton}>
//                   <Text style={styles.seeAllText}>See all</Text>
//                   <Ionicons name="chevron-forward" size={18} color="#fff" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F8F8',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   logo: {
//     height: 40,
//     width: 120,
//   },
//   headerIcons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   iconButton: {
//     padding: 4,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//     marginHorizontal: 16,
//     marginVertical: 12,
//     paddingHorizontal: 12,
//     borderRadius: 10,
//     height: 45,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 8,
//     fontSize: 14,
//     color: '#000',
//   },
//   filterChipsContainer: {
//     paddingHorizontal: 16,
//     paddingBottom: 12,
//     gap: 8,
//   },
//   filterChip: {
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 25,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     backgroundColor: '#fff',
//     // marginRight: 8,
//   },
//   filterChipActive: {
//     backgroundColor: '#004830',
//     borderColor: '#004830',
//   },
//   filterChipText: {
//     fontSize: 13,
//     color: '#666',
//     fontWeight: '500',
//   },
//   filterChipTextActive: {
//     color: '#fff',
//   },
//   scrollContent: {
//     paddingHorizontal: 16,
//     paddingTop: 8,
//   },
//   categoryCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     marginBottom: 16,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   categoryHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//   },
//   categoryImageContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 8,
//     overflow: 'hidden',
//     backgroundColor: '#FFF5E6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 4,
//   },
//   categoryImage: {
//     width: '100%',
//     height: '100%',
//   },
//   categoryInfo: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginLeft: 12,
//   },
//   categoryName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#000',
//   },
//   subcategoriesContainer: {
//     paddingHorizontal: 12,
//     paddingBottom: 12,
//   },
//   subcategoryItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   subcategoryIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 8,
//     backgroundColor: '#FFF5E6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//     padding: 4,
//   },
//   subcategoryIconImage: {
//     width: '100%',
//     height: '100%',
//   },
//   subcategoryName: {
//     flex: 1,
//     fontSize: 15,
//     color: '#333',
//     fontWeight: '500',
//   },
//   seeAllButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#004830',
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 12,
//     gap: 6,
//   },
//   seeAllText: {
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: '600',
//   },
// });

// export default CategoryNavigationScreen;
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   TextInput,
//   Image,
//   Dimensions,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';

// // Redux
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCategoriesWithSubcategories } from "../redux/slices/categorySlice";

// const { width } = Dimensions.get('window');
// const ACCENT_COLOR = '#832729'; // New primary color

// const CategoryNavigationScreen = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const [expandedCategoryId, setExpandedCategoryId] = useState(null);
//   const [selectedChipIndex, setSelectedChipIndex] = useState(0);

//   const {
//     categoriesWithSubs = [],
//     loading: categoriesLoading,
//     error: categoriesError
//   } = useSelector((state) => state.category);

//   const { customerId } = useSelector((state) => state.Auth || {});
//   const userId = customerId || 1;

//   useEffect(() => {
//     dispatch(fetchCategoriesWithSubcategories());
//   }, [dispatch]);

//   const toggleCategory = (categoryId) => {
//     setExpandedCategoryId(prev => prev === categoryId ? null : categoryId);
//   };

//   const handleSubcategoryPress = (subcategoryName, categoryName, categoryId) => {
//     navigation.navigate('IndividualCategory', {
//       subcategoryName,
//       categoryName,
//       categoryId, // optional – if you want subcategory filtering on backend
//       userId,
//     });
//   };

//   const handleSeeAllPress = (category) => {
//     navigation.navigate('IndividualCategory', {
//       categoryId: category.id,
//       categoryName: category.category_name === "Earings" ? "Earrings" : category.category_name,
//       userId,
//     });
//   };

//   const filterChips = categoriesWithSubs.length > 0
//     ? categoriesWithSubs.map(cat =>
//         cat.category_name === "Earings" ? "Earrings" : cat.category_name
//       )
//     : ['All Jewellery'];

//   return (
//     <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

//       {/* Header */}
//       <View style={styles.header}>
//         <Image
//           source={require('../assets/geethalogo.png')}
//           style={styles.logo}
//           resizeMode="contain"
//         />

//         <View style={styles.headerIcons}>
//           <TouchableOpacity style={styles.iconButton}>
//             <Ionicons name="notifications-outline" size={22} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("WishList")}>
//             <Ionicons name="heart-outline" size={22} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Cart")}>
//             <Ionicons name="cart-outline" size={22} color="#000" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <Ionicons name="search-outline" size={20} color="#666" />
//         <TextInput
//           placeholder="Search here Your favourite Jewellery"
//           style={styles.searchInput}
//           placeholderTextColor="#999"
//         />
//       </View>

//       {/* Filter Chips */}
//       <View>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.filterChipsContainer}
//         >
//           {categoriesLoading ? (
//             [...Array(6)].map((_, i) => (
//               <View key={i} style={[styles.filterChip, { backgroundColor: '#eee', borderColor: '#eee' }]}>
//                 <View style={{ width: 90, height: 16, backgroundColor: '#ddd', borderRadius: 8 }} />
//               </View>
//             ))
//           ) : categoriesError ? (
//             <Text style={{ paddingLeft: 16, color: 'red' }}>Failed to load categories</Text>
//           ) : (
//             filterChips.map((chip, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={[
//                   styles.filterChip,
//                   selectedChipIndex === index && styles.filterChipActive
//                 ]}
//                 onPress={() => setSelectedChipIndex(index)}
//               >
//                 <Text style={[
//                   styles.filterChipText,
//                   selectedChipIndex === index && styles.filterChipTextActive
//                 ]}>
//                   {chip}
//                 </Text>
//               </TouchableOpacity>
//             ))
//           )}
//         </ScrollView>
//       </View>

//       {/* Main Categories with Subcategories */}
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={[
//           styles.scrollContent,
//           { paddingBottom: insets.bottom + 100 }
//         ]}
//       >
//         {categoriesLoading ? (
//           <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>Loading categories...</Text>
//         ) : categoriesError ? (
//           <Text style={{ textAlign: 'center', marginTop: 20, color: 'red' }}>Error loading categories</Text>
//         ) : categoriesWithSubs.length === 0 ? (
//           <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>No categories available</Text>
//         ) : (
//           categoriesWithSubs.map((category) => {
//             const subcategories = category.subcategories || [];
//             const displayedSubs = subcategories.slice(0, 5);
//             const hasMore = subcategories.length > 5;

//             return (
//               <View key={category.id} style={styles.categoryCard}>
//                 <TouchableOpacity
//                   style={styles.categoryHeader}
//                   onPress={() => toggleCategory(category.id)}
//                 >
//                   <View style={styles.categoryImageContainer}>
//                     <Image
//                       source={{ uri: category.category_image }}
//                       style={styles.categoryImage}
//                       resizeMode="cover"
//                     />
//                   </View>

//                   <View style={styles.categoryInfo}>
//                     <Text style={styles.categoryName}>
//                       {category.category_name === "Earings" ? "Earrings" : category.category_name}
//                     </Text>
//                     <Ionicons
//                       name={expandedCategoryId === category.id ? "chevron-up" : "chevron-down"}
//                       size={20}
//                       color="#000"
//                     />
//                   </View>
//                 </TouchableOpacity>

//                 {/* Subcategories */}
//                 {expandedCategoryId === category.id && subcategories.length > 0 && (
//                   <View style={styles.subcategoriesContainer}>
//                     {displayedSubs.map((subcategory) => (
//                       <TouchableOpacity
//                         key={subcategory.id}
//                         style={styles.subcategoryItem}
//                         onPress={() =>
//                           handleSubcategoryPress(
//                             subcategory.subcategory_name,
//                             category.category_name,
//                             category.id
//                           )
//                         }
//                       >
//                         <View style={styles.subcategoryIcon}>
//                           <Image
//                             source={{ uri: subcategory.subcategory_image }}
//                             style={styles.subcategoryIconImage}
//                             resizeMode="cover"
//                           />
//                         </View>
//                         <Text style={styles.subcategoryName}>{subcategory.subcategory_name}</Text>
//                         <Ionicons name="chevron-forward" size={18} color="#999" />
//                       </TouchableOpacity>
//                     ))}

//                     {/* See All Button - Only if more than 5 subcategories */}
//                     {hasMore && (
//                       <TouchableOpacity
//                         style={[styles.seeAllButton, { backgroundColor: ACCENT_COLOR }]}
//                         onPress={() => handleSeeAllPress(category)}
//                       >
//                         <Text style={styles.seeAllText}>See all</Text>
//                         <Ionicons name="chevron-forward" size={18} color="#fff" />
//                       </TouchableOpacity>
//                     )}
//                   </View>
//                 )}
//               </View>
//             );
//           })
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F8F8',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   logo: {
//     height: 40,
//     width: 120,
//   },
//   headerIcons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   iconButton: {
//     padding: 4,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//     marginHorizontal: 16,
//     marginVertical: 12,
//     paddingHorizontal: 12,
//     borderRadius: 10,
//     height: 45,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 8,
//     fontSize: 14,
//     color: '#000',
//   },
//   filterChipsContainer: {
//     paddingHorizontal: 16,
//     paddingBottom: 12,
//     gap: 8,
//   },
//   filterChip: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 25,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     backgroundColor: '#fff',
//   },
//   filterChipActive: {
//     backgroundColor: '#832729',
//     borderColor: '#832729',
//   },
//   filterChipText: {
//     fontSize: 13,
//     color: '#666',
//     fontWeight: '500',
//   },
//   filterChipTextActive: {
//     color: '#fff',
//   },
//   scrollContent: {
//     paddingHorizontal: 16,
//     paddingTop: 8,
//   },
//   categoryCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     marginBottom: 16,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   categoryHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//   },
//   categoryImageContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 8,
//     overflow: 'hidden',
//     backgroundColor: '#FFF5E6',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   categoryImage: {
//     width: '100%',
//     height: '100%',
//   },
//   categoryInfo: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginLeft: 12,
//   },
//   categoryName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#000',
//   },
//   subcategoriesContainer: {
//     paddingHorizontal: 12,
//     paddingBottom: 12,
//   },
//   subcategoryItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   subcategoryIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 8,
//     backgroundColor: '#FFF5E6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   subcategoryIconImage: {
//     width: '100%',
//     height: '100%',
//   },
//   subcategoryName: {
//     flex: 1,
//     fontSize: 15,
//     color: '#333',
//     fontWeight: '500',
//   },
//   seeAllButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#832729',
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 12,
//     gap: 6,
//   },
//   seeAllText: {
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: '600',
//   },
// });

// export default CategoryNavigationScreen;
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   TextInput,
//   Image,
//   Dimensions,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';

// // Redux
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCategoriesWithSubcategories } from "../redux/slices/categorySlice";

// const { width } = Dimensions.get('window');
// const ACCENT_COLOR = '#832729'; // Primary accent color

// const CategoryNavigationScreen = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const [expandedCategoryId, setExpandedCategoryId] = useState(null);
//   const [selectedChipIndex, setSelectedChipIndex] = useState(0);

//   // Refs for scrolling
//   const scrollViewRef = useRef(null);
//   const categoryRefs = useRef({}); // { 0: ref, 1: ref, ... }

//   const {
//     categoriesWithSubs = [],
//     loading: categoriesLoading,
//     error: categoriesError
//   } = useSelector((state) => state.category);

//   const { customerId } = useSelector((state) => state.Auth || {});
//   const userId = customerId || 1;

//   useEffect(() => {
//     dispatch(fetchCategoriesWithSubcategories());
//   }, [dispatch]);

//   const toggleCategory = (categoryId) => {
//     setExpandedCategoryId(prev => prev === categoryId ? null : categoryId);
//   };

//   const handleSubcategoryPress = (subcategoryName, categoryName, categoryId) => {
//     navigation.navigate('IndividualCategory', {
//       subcategoryName,
//       categoryName,
//       categoryId,
//       userId,
//     });
//   };

//   const handleSeeAllPress = (category) => {
//     navigation.navigate('IndividualCategory', {
//       categoryId: category.id,
//       categoryName: category.category_name === "Earings" ? "Earrings" : category.category_name,
//       userId,
//     });
//   };

//   // Handle chip press: update selection + scroll to category
//   const handleChipPress = (index) => {
//     setSelectedChipIndex(index);

//     // Optional: auto-expand the selected category
//     const targetCategory = categoriesWithSubs[index];
//     if (targetCategory && expandedCategoryId !== targetCategory.id) {
//       setExpandedCategoryId(targetCategory.id);
//     }

//     // Scroll to the category card
//     setTimeout(() => {
//       const ref = categoryRefs.current[index];
//       if (ref && scrollViewRef.current) {
//         ref.measureLayout(
//           scrollViewRef.current,
//           (x, y) => {
//             scrollViewRef.current.scrollTo({
//               y: y - 80, // Offset to account for header + chips (adjust as needed)
//               animated: true,
//             });
//           },
//           () => {}
//         );
//       }
//     }, 150); // Small delay ensures layout is ready
//   };

//   const filterChips = categoriesWithSubs.length > 0
//     ? categoriesWithSubs.map(cat =>
//         cat.category_name === "Earings" ? "Earrings" : cat.category_name
//       )
//     : ['All Jewellery'];

//   return (
//     <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

//       {/* Header */}
//       <View style={styles.header}>
//         <Image
//           source={require('../assets/geethalogo.png')}
//           style={styles.logo}
//           resizeMode="contain"
//         />

//         <View style={styles.headerIcons}>
//           <TouchableOpacity style={styles.iconButton}>
//             <Ionicons name="notifications-outline" size={22} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("WishList")}>
//             <Ionicons name="heart-outline" size={22} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Cart")}>
//             <Ionicons name="cart-outline" size={22} color="#000" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <Ionicons name="search-outline" size={20} color="#666" />
//         <TextInput
//           placeholder="Search here Your favourite Jewellery"
//           style={styles.searchInput}
//           placeholderTextColor="#999"
//         />
//       </View>

//       {/* Filter Chips */}
//       <View>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.filterChipsContainer}
//         >
//           {categoriesLoading ? (
//             [...Array(6)].map((_, i) => (
//               <View key={i} style={[styles.filterChip, { backgroundColor: '#eee', borderColor: '#eee' }]}>
//                 <View style={{ width: 90, height: 16, backgroundColor: '#ddd', borderRadius: 8 }} />
//               </View>
//             ))
//           ) : categoriesError ? (
//             <Text style={{ paddingLeft: 16, color: 'red' }}>Failed to load categories</Text>
//           ) : (
//             filterChips.map((chip, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={[
//                   styles.filterChip,
//                   selectedChipIndex === index && styles.filterChipActive
//                 ]}
//                 onPress={() => handleChipPress(index)}
//               >
//                 <Text style={[
//                   styles.filterChipText,
//                   selectedChipIndex === index && styles.filterChipTextActive
//                 ]}>
//                   {chip}
//                 </Text>
//               </TouchableOpacity>
//             ))
//           )}
//         </ScrollView>
//       </View>

//       {/* Main Categories List */}
//       <ScrollView
//         ref={scrollViewRef}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={[
//           styles.scrollContent,
//           { paddingBottom: insets.bottom + 100 }
//         ]}
//       >
//         {categoriesLoading ? (
//           <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>Loading categories...</Text>
//         ) : categoriesError ? (
//           <Text style={{ textAlign: 'center', marginTop: 20, color: 'red' }}>Error loading categories</Text>
//         ) : categoriesWithSubs.length === 0 ? (
//           <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>No categories available</Text>
//         ) : (
//           categoriesWithSubs.map((category, index) => {
//             const subcategories = category.subcategories || [];
//             const displayedSubs = subcategories.slice(0, 5);
//             const hasMore = subcategories.length > 5;

//             return (
//               <View
//                 key={category.id}
//                 ref={(ref) => (categoryRefs.current[index] = ref)} // Critical for scrolling
//                 style={styles.categoryCard}
//               >
//                 <TouchableOpacity
//                   style={styles.categoryHeader}
//                   onPress={() => toggleCategory(category.id)}
//                 >
//                   <View style={styles.categoryImageContainer}>
//                     <Image
//                       source={{ uri: category.category_image }}
//                       style={styles.categoryImage}
//                       resizeMode="cover"
//                     />
//                   </View>

//                   <View style={styles.categoryInfo}>
//                     <Text style={styles.categoryName}>
//                       {category.category_name === "Earings" ? "Earrings" : category.category_name}
//                     </Text>
//                     <Ionicons
//                       name={expandedCategoryId === category.id ? "chevron-up" : "chevron-down"}
//                       size={20}
//                       color="#000"
//                     />
//                   </View>
//                 </TouchableOpacity>

//                 {/* Subcategories */}
//                 {expandedCategoryId === category.id && subcategories.length > 0 && (
//                   <View style={styles.subcategoriesContainer}>
//                     {displayedSubs.map((subcategory) => (
//                       <TouchableOpacity
//                         key={subcategory.id}
//                         style={styles.subcategoryItem}
//                         onPress={() =>
//                           handleSubcategoryPress(
//                             subcategory.subcategory_name,
//                             category.category_name,
//                             category.id
//                           )
//                         }
//                       >
//                         <View style={styles.subcategoryIcon}>
//                           <Image
//                             source={{ uri: subcategory.subcategory_image }}
//                             style={styles.subcategoryIconImage}
//                             resizeMode="cover"
//                           />
//                         </View>
//                         <Text style={styles.subcategoryName}>{subcategory.subcategory_name}</Text>
//                         <Ionicons name="chevron-forward" size={18} color="#999" />
//                       </TouchableOpacity>
//                     ))}

//                     {hasMore && (
//                       <TouchableOpacity
//                         style={[styles.seeAllButton, { backgroundColor: ACCENT_COLOR }]}
//                         onPress={() => handleSeeAllPress(category)}
//                       >
//                         <Text style={styles.seeAllText}>See all</Text>
//                         <Ionicons name="chevron-forward" size={18} color="#fff" />
//                       </TouchableOpacity>
//                     )}
//                   </View>
//                 )}
//               </View>
//             );
//           })
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F8F8',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   logo: {
//     height: 40,
//     width: 120,
//   },
//   headerIcons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   iconButton: {
//     padding: 4,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//     marginHorizontal: 16,
//     marginVertical: 12,
//     paddingHorizontal: 12,
//     borderRadius: 10,
//     height: 45,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 8,
//     fontSize: 14,
//     color: '#000',
//   },
//   filterChipsContainer: {
//     paddingHorizontal: 16,
//     paddingBottom: 12,
//     gap: 8,
//   },
//   filterChip: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 25,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     backgroundColor: '#fff',
//   },
//   filterChipActive: {
//     backgroundColor: '#832729',
//     borderColor: '#832729',
//   },
//   filterChipText: {
//     fontSize: 13,
//     color: '#666',
//     fontWeight: '500',
//   },
//   filterChipTextActive: {
//     color: '#fff',
//   },
//   scrollContent: {
//     paddingHorizontal: 16,
//     paddingTop: 8,
//   },
//   categoryCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     marginBottom: 16,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   categoryHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//   },
//   categoryImageContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 8,
//     overflow: 'hidden',
//     backgroundColor: '#FFF5E6',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   categoryImage: {
//     width: '100%',
//     height: '100%',
//   },
//   categoryInfo: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginLeft: 12,
//   },
//   categoryName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#000',
//   },
//   subcategoriesContainer: {
//     paddingHorizontal: 12,
//     paddingBottom: 12,
//   },
//   subcategoryItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   subcategoryIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 8,
//     backgroundColor: '#FFF5E6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   subcategoryIconImage: {
//     width: '100%',
//     height: '100%',
//   },
//   subcategoryName: {
//     flex: 1,
//     fontSize: 15,
//     color: '#333',
//     fontWeight: '500',
//   },
//   seeAllButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#832729',
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 12,
//     gap: 6,
//   },
//   seeAllText: {
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: '600',
//   },
// });

// export default CategoryNavigationScreen;
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesWithSubcategories } from "../redux/slices/categorySlice";

const { width } = Dimensions.get('window');
const ACCENT_COLOR = '#832729'; // Primary accent color

// Skeleton Component for a single Category Card
const CategorySkeleton = () => (
  <View style={styles.categoryCard}>
    <View style={styles.categoryHeader}>
      <View style={styles.categoryImageContainer}>
        <View style={styles.skeletonImage} />
      </View>

      <View style={styles.categoryInfo}>
        <View style={[styles.skeletonTextLine, { width: 120 }]} />
        <View style={{ width: 20, height: 20, backgroundColor: '#e0e0e0', borderRadius: 4 }} />
      </View>
    </View>

    {/* Simulate expanded subcategories */}
    <View style={styles.subcategoriesContainer}>
      {[1, 2, 3, 4].map((i) => (
        <View key={i} style={styles.subcategoryItem}>
          <View style={styles.subcategoryIcon}>
            <View style={styles.skeletonImageSmall} />
          </View>
          <View style={[styles.skeletonTextLine, { width: '70%' }]} />
          <View style={{ width: 18, height: 18, backgroundColor: '#e0e0e0', borderRadius: 9 }} />
        </View>
      ))}
      <View style={[styles.seeAllButton, { backgroundColor: '#e0e0e0' }]}>
        <View style={{ width: 100, height: 18, backgroundColor: '#d0d0d0', borderRadius: 9 }} />
      </View>
    </View>
  </View>
);

const CategoryNavigationScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  const [selectedChipIndex, setSelectedChipIndex] = useState(0);

  // Refs for scrolling
  const scrollViewRef = useRef(null);
  const categoryRefs = useRef({});

  const {
    categoriesWithSubs = [],
    loading: categoriesLoading,
    error: categoriesError
  } = useSelector((state) => state.category);

  const { customerId } = useSelector((state) => state.Auth || {});
  const userId = customerId || 1;

  useEffect(() => {
    dispatch(fetchCategoriesWithSubcategories());
  }, [dispatch]);

  const toggleCategory = (categoryId) => {
    setExpandedCategoryId(prev => prev === categoryId ? null : categoryId);
  };

  const handleSubcategoryPress = (subcategoryName, categoryName, categoryId) => {
    navigation.navigate('IndividualCategory', {
      subcategoryName,
      categoryName,
      categoryId,
      userId,
    });
  };

  const handleSeeAllPress = (category) => {
    navigation.navigate('IndividualCategory', {
      categoryId: category.id,
      categoryName: category.category_name === "Earings" ? "Earrings" : category.category_name,
      userId,
    });
  };

  const handleChipPress = (index) => {
    setSelectedChipIndex(index);

    const targetCategory = categoriesWithSubs[index];
    if (targetCategory && expandedCategoryId !== targetCategory.id) {
      setExpandedCategoryId(targetCategory.id);
    }

    setTimeout(() => {
      const ref = categoryRefs.current[index];
      if (ref && scrollViewRef.current) {
        ref.measureLayout(
          scrollViewRef.current,
          (x, y) => {
            scrollViewRef.current.scrollTo({
              y: y - 100, // Adjust offset for header + chips
              animated: true,
            });
          },
          () => {}
        );
      }
    }, 150);
  };

  const filterChips = categoriesWithSubs.length > 0
    ? categoriesWithSubs.map(cat =>
        cat.category_name === "Earings" ? "Earrings" : cat.category_name
      )
    : ['All Jewellery'];

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/geethalogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("WishList")}>
            <Ionicons name="heart-outline" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Cart")}>
            <Ionicons name="cart-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" />
        <TextInput
          placeholder="Search here Your favourite Jewellery"
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
      </View>

      {/* Filter Chips */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterChipsContainer}
        >
          {categoriesLoading ? (
            [...Array(7)].map((_, i) => (
              <View
                key={i}
                style={[styles.filterChip, { backgroundColor: '#e8e8e8', borderColor: '#e8e8e8' }]}
              >
                <View style={{ width: 90, height: 16, backgroundColor: '#d0d0d0', borderRadius: 8 }} />
              </View>
            ))
          ) : categoriesError ? (
            <Text style={{ paddingLeft: 16, color: 'red' }}>Failed to load categories</Text>
          ) : (
            filterChips.map((chip, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.filterChip,
                  selectedChipIndex === index && styles.filterChipActive
                ]}
                onPress={() => handleChipPress(index)}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedChipIndex === index && styles.filterChipTextActive
                ]}>
                  {chip}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>

      {/* Main Categories List */}
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 }
        ]}
      >
        {categoriesLoading ? (
          // Show 4 skeleton category cards while loading
          <>
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
          </>
        ) : categoriesError ? (
          <Text style={{ textAlign: 'center', marginTop: 40, color: 'red', fontSize: 16 }}>
            Error loading categories. Please try again.
          </Text>
        ) : categoriesWithSubs.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 40, color: '#666', fontSize: 16 }}>
            No categories available at the moment.
          </Text>
        ) : (
          categoriesWithSubs.map((category, index) => {
            const subcategories = category.subcategories || [];
            const displayedSubs = subcategories.slice(0, 5);
            const hasMore = subcategories.length > 5;

            return (
              <View
                key={category.id}
                ref={(ref) => (categoryRefs.current[index] = ref)}
                style={styles.categoryCard}
              >
                <TouchableOpacity
                  style={styles.categoryHeader}
                  onPress={() => toggleCategory(category.id)}
                >
                  <View style={styles.categoryImageContainer}>
                    <Image
                      source={{ uri: category.category_image }}
                      style={styles.categoryImage}
                      resizeMode="cover"
                    />
                  </View>

                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryName}>
                      {category.category_name === "Earings" ? "Earrings" : category.category_name}
                    </Text>
                    <Ionicons
                      name={expandedCategoryId === category.id ? "chevron-up" : "chevron-down"}
                      size={20}
                      color="#000"
                    />
                  </View>
                </TouchableOpacity>

                {/* Subcategories */}
                {expandedCategoryId === category.id && subcategories.length > 0 && (
                  <View style={styles.subcategoriesContainer}>
                    {displayedSubs.map((subcategory) => (
                      <TouchableOpacity
                        key={subcategory.id}
                        style={styles.subcategoryItem}
                        onPress={() =>
                          handleSubcategoryPress(
                            subcategory.subcategory_name,
                            category.category_name,
                            category.id
                          )
                        }
                      >
                        <View style={styles.subcategoryIcon}>
                          <Image
                            source={{ uri: subcategory.subcategory_image }}
                            style={styles.subcategoryIconImage}
                            resizeMode="cover"
                          />
                        </View>
                        <Text style={styles.subcategoryName}>{subcategory.subcategory_name}</Text>
                        <Ionicons name="chevron-forward" size={18} color="#999" />
                      </TouchableOpacity>
                    ))}

                    {hasMore && (
                      <TouchableOpacity
                        style={[styles.seeAllButton, { backgroundColor: ACCENT_COLOR }]}
                        onPress={() => handleSeeAllPress(category)}
                      >
                        <Text style={styles.seeAllText}>See all</Text>
                        <Ionicons name="chevron-forward" size={18} color="#fff" />
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logo: {
    height: 40,
    width: 120,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 45,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
  },
  filterChipsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  filterChipActive: {
    backgroundColor: '#832729',
    borderColor: '#832729',
  },
  filterChipText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  categoryImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFF5E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 12,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  subcategoriesContainer: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  subcategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  subcategoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFF5E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  subcategoryIconImage: {
    width: '100%',
    height: '100%',
  },
  subcategoryName: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
    gap: 6,
  },
  seeAllText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

  // Skeleton Styles
  skeletonImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  skeletonImageSmall: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  skeletonTextLine: {
    height: 18,
    backgroundColor: '#e0e0e0',
    borderRadius: 9,
    marginLeft: 12,
  },
});

export default CategoryNavigationScreen;