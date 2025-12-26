
// import React, { useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   Dimensions,
//   SafeAreaView,
//   StatusBar,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import Carousel from "react-native-reanimated-carousel";
// import {
//   responsiveHeight,
//   responsiveWidth,
//   responsiveFontSize,
// } from "react-native-responsive-dimensions";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";
// import { useSharedValue } from 'react-native-reanimated';
// import LinearGradient from "react-native-linear-gradient";
// import { DrawerActions } from '@react-navigation/native';
// // Redux imports
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCategories, fetchBanners ,fetchHomeSections } from "../redux/slices/categorySlice"; // Import fetchBanners
// // Shimmer Placeholder import (recommended library)
// import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

// const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
// const { width } = Dimensions.get("window");

// // Local images (kept for other sections)
// import ringline from "../assets/ringline.png";
// import earrings from "../assets/earrings.png";
// import mangalsutra from "../assets/mangalsutra.png";

// const bannerData = [
//   {
//     id: 1,
//     image: require("../assets/banner.png"),
//     topOffer: "Up to",
//     topDiscount: "50% OFF",
//     topCategory: "On Gold Jewellery",
//     topSubtext: "Making Charges",
//     bottomOffer: "Up to",
//     bottomDiscount: "100% OFF",
//     bottomCategory: "On Diamond Jewellery",
//     bottomSubtext: "Making Charges",
//   },
//   {
//     id: 2,
//     image: require("../assets/banner.png"),
//     topOffer: "Up to",
//     topDiscount: "50% OFF",
//     topCategory: "On Gold Jewellery",
//     topSubtext: "Making Charges",
//     bottomOffer: "Up to",
//     bottomDiscount: "100% OFF",
//     bottomCategory: "On Diamond Jewellery",
//     bottomSubtext: "Making Charges",
//   },
//   {
//     id: 3,
//     image: require("../assets/banner.png"),
//     topOffer: "Up to",
//     topDiscount: "50% OFF",
//     topCategory: "On Gold Jewellery",
//     topSubtext: "Making Charges",
//     bottomOffer: "Up to",
//     bottomDiscount: "100% OFF",
//     bottomCategory: "On Diamond Jewellery",
//     bottomSubtext: "Making Charges",
//   },
// ];

// const HomeScreen = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const progress = useSharedValue(0);

//   // Redux
//   const dispatch = useDispatch();
//   const { categories, loading: categoriesLoading, error: categoriesError, banners,bannersLoading,bannersError,homeSections = [],
//   homeSectionsLoading,
//   homeSectionsError, } = useSelector(
//     (state) => state.category
//   );
//   const categorySection = homeSections.find(s => s.section_type === "Category");
// const genderSection = homeSections.find(s => s.section_type === "Gender");

//   // Fetch categories on mount
//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   useEffect(() => {
//      dispatch(fetchCategories());
//    dispatch(fetchBanners()); 
//     dispatch(fetchHomeSections()); // Fetch banners on mount
//    }, [dispatch]);
//   const handleProductPress = () => {
//     navigation.navigate("IndividualCategory");
//   };

//    const renderBannerItem = ({ item }) => (
//      <TouchableOpacity
//        style={{
//          backgroundColor: '#fff',
//          borderRadius: 10,
//          overflow: 'hidden',
//          width: '100%',
//          height: '100%',
//        }}
//        activeOpacity={0.8}
//      >
//     <Image source={item.image} style={styles.bannerBackgroundImage} />
//     <Image 
//        source={{ uri: item.banner_image }}        
//        style={styles.bannerBackgroundImage} 
//       resizeMode="cover" />
//      </TouchableOpacity>
//    );

//   // skelto for categories
//   const renderCategorySkeleton = () => (
//     <View style={styles.categoryItem}>
//       <ShimmerPlaceHolder
//         style={styles.categoryImage}
//         shimmerColors={['#ebebeb', '#d4d4d4', '#ebebeb']}
//       />
//       <ShimmerPlaceHolder
//         style={styles.categoryNameSkeleton}
//         shimmerColors={['#ebebeb', '#d4d4d4', '#ebebeb']}
//       />
//     </View>
//   );




//   return (
//     <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
//       <ScrollView
//         style={[styles.container, { paddingTop: insets.top }]}
//         contentContainerStyle={{
//           paddingBottom: insets.bottom + 150,
//         }}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Header */}
//         <View style={styles.header}>

//           <TouchableOpacity
//   onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//   style={{ padding: 8 }}
// >
//   <Ionicons name="menu-outline" size={28} color="rgba(8, 118, 90, 1)" />
// </TouchableOpacity>
//           <Image
//             source={require("../assets/geethalogo.png")}
//             style={styles.logo}
//           />

//           <View style={styles.headerIcons}>
//             <TouchableOpacity
//               onPress={() => {
//                 navigation.navigate("WishList");
//               }}
//             >
//               <Ionicons
//                 name="heart-outline"
//                 size={22}
//                 color="rgba(8, 118, 90, 1)"
//                 style={styles.icon}
//               />
//             </TouchableOpacity>

//             <Ionicons
//               name="cart-outline"
//               size={22}
//               color="rgba(8, 118, 90, 1)"
//               style={styles.icon}
//             />
//           </View>
//         </View>

//         {/* Search */}
//         <View style={styles.searchContainer}>
//           <Ionicons
//             name="search"
//             size={20}
//             color="rgba(8, 118, 90, 1)"
//             style={{ marginRight: 5 }}
//           />
//           <TextInput
//             placeholder="Search here your favourite Jewellery"
//             placeholderTextColor="#666"
//             style={styles.searchInput}
//           />
//           <Ionicons
//             name="filter-outline"
//             size={20}
//             color="rgba(8, 118, 90, 1)"
//             style={{ marginLeft: 5 }}
//           />
//         </View>

//         {/* Categories - Now from API */}
       
// <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.categoryScroll}
//           contentContainerStyle={styles.categoryContentContainer}
//         >
//           {categoriesLoading ? (
//             // Show 6 shimmer placeholders while loading
//             <>
//               {[...Array(6)].map((_, index) => (
//                 <View key={`skeleton-${index}`}>
//                   {renderCategorySkeleton()}
//                 </View>
//               ))}
//             </>
//           ) : categoriesError ? (
//             <Text style={{ paddingLeft: 20, color: "red", fontSize: responsiveFontSize(1.8) }}>
//               Unable to load categories. Please try again later.
//             </Text>
//           ) : categories.length === 0 ? (
//             <Text style={{ paddingLeft: 20, color: "#666", fontSize: responsiveFontSize(1.8) }}>
//               No categories available
//             </Text>
//           ) : (
//             categories.map((category) => (
//               <TouchableOpacity
//                 key={category.id}
//                 onPress={() => {
//                   navigation.navigate("IndividualCategory", {
//                     categoryId: category.id,
//                     categoryName: category.category_name,
//                   });
//                 }}
//               >
//                 <View style={styles.categoryItem}>
//                   <Image
//                     source={{ uri: category.category_image }}
//                     style={styles.categoryImage}
//                     resizeMode="cover"
//                   />
//                   <Text style={styles.categoryName}>
//                     {category.category_name === "Earings" ? "Earrings" : category.category_name}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             ))
//           )}
//         </ScrollView>

//         {/* Banner Carousel */}
//          <View style={styles.bannerWrapper}>
//   <Carousel
//     autoPlayInterval={2000}
//     data={bannersLoading ? [] : banners.length > 0 ? banners : bannerData}
//     height={320}  // ← Change this from 258 to 320 (or any value you like)
//     loop={true}
//     pagingEnabled={true}
//     snapEnabled={true}
//     width={width}
//     style={{
//       width: width,
//       borderRadius: 12, // Optional: adds nice rounded corners
//     }}
//     mode="parallax"
//     modeConfig={{
//       parallaxScrollingScale: 0.9,
//       parallaxScrollingOffset: 50,
//     }}
//     onProgressChange={(_, absoluteProgress) => {
//       progress.value = absoluteProgress;
//     }}
//     panGestureHandlerProps={{
//       activeOffsetX: [-20, 20],
//       failOffsetY: [-10, 10],
//     }}
//     renderItem={renderBannerItem}
//   />

//   {bannersLoading && (
//     <View style={styles.bannerShimmerOverlay}>
//       <ShimmerPlaceHolder style={styles.bannerShimmer} />
//     </View>
//   )}

//   {bannersError && (
//     <View style={styles.bannerErrorOverlay}>
//       <Text style={styles.bannerErrorText}>Failed to load banners</Text>
//     </View>
//   )}
// </View>

//         {/* Smart Savings Schemes */}
//         <TouchableOpacity
//           activeOpacity={0.8}
//           onPress={() => navigation.navigate("GoldScheme")}
//         >
//           <LinearGradient
//             colors={['rgba(0, 84, 61, 1)', 'rgba(0, 51, 23, 1)']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 0, y: 1 }}
//             style={styles.savingsSchemeCard}
//           >
//             <View style={styles.savingsLeftSection}>
//               <Image
//                 source={require("../assets/goldhand.png")}
//                 style={styles.goldHandImage}
//               />
//             </View>

//             <View style={styles.savingsRightSection}>
//               <Text style={styles.savingsTitle}>Smart Savings Schemes</Text>
//               <Text style={styles.savingsSubtitle}>
//                 Join flexible gold saving plans and grow your wealth with ease.
//               </Text>
//             </View>

//             <TouchableOpacity
//               style={styles.savingsArrowButton}
//               onPress={() => navigation.navigate("GoldScheme")}
//             >
//               <Ionicons name="chevron-forward" size={20} color="rgba(8, 118, 90, 1)" />
//             </TouchableOpacity>
//           </LinearGradient>
//         </TouchableOpacity>

//         {/* Geetha's Collection */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Geetha's Collection</Text>
//           <Text style={styles.sectionSubtitle}>
//             Discover treasures that speak your style!
//           </Text>

//           <Image source={ringline} style={styles.sectionDivider} />

//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.collectionScrollContent}
//             snapToInterval={responsiveWidth(45) + 12}
//             decelerationRate="fast"
//             style={{ overflow: 'visible' }}
//           >
//             {[1, 2, 3].map((_, i) => (
//               <TouchableOpacity
//                 key={i}
//                 onPress={handleProductPress}
//                 style={styles.collectionCard}
//                 activeOpacity={0.9}
//               >
//                 <View style={styles.collectionImageContainer}>
//                   <Image
//                     source={
//                       i === 0 || i === 2
//                         ? earrings
//                         : require("../assets/mangalsutra.png")
//                     }
//                     style={styles.collectionImage}
//                   />
//                 </View>
//                 <TouchableOpacity
//                   style={styles.exploreBtn}
//                   onPress={handleProductPress}
//                 >
//                   <Text style={styles.exploreText}>Explore</Text>
//                 </TouchableOpacity>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>

//         {/* 22 Karat Touch */}
//         <View style={styles.section}>
//           <TouchableOpacity
//             style={styles.karatWrapper}
//             onPress={handleProductPress}
//             activeOpacity={0.9}
//           >
//             <Image
//               source={require("../assets/karat22.png")}
//               style={styles.karatImage}
//             />

//             <TouchableOpacity
//               style={styles.exploreNowButton}
//               onPress={handleProductPress}
//             >
//               <Text style={styles.exploreNowBtnText}>Explore Now</Text>
//             </TouchableOpacity>
//           </TouchableOpacity>
//         </View>

    
// {categorySection && (
//   <View style={styles.section}>
//     <Text style={styles.sectionTitle}>{categorySection.section_title}</Text>
//     <Text style={styles.sectionSubtitle}>{categorySection.section_subtitle}</Text>

//     {/* Banner Image */}
//     <TouchableOpacity
//       style={styles.diamondBannerWrapper}
//       activeOpacity={0.9}
//       onPress={handleProductPress}
//     >
//       <Image
//         source={{ uri: categorySection.banner_image }}
//         style={styles.diamondBannerImage}
//         resizeMode="cover"
//       />
//     </TouchableOpacity>

//     {/* Cards Grid */}
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.diamondGridScrollContent}
//       snapToInterval={responsiveWidth(48) + 12}
//       decelerationRate="fast"
//     >
//       {categorySection.section_cards.map((card, index) => (
//         <TouchableOpacity
//           key={card.id}
//           style={styles.diamondGridItem}
//           activeOpacity={0.9}
//           onPress={() => {
//             navigation.navigate("IndividualCategory", {
//               categoryId: card.reference_id,
//               categoryName: card.reference_name,
//             });
//           }}
//         >
//           <Image
//             source={{ uri: card.image }}
//             style={styles.diamondGridImage}
//             resizeMode="cover"
//           />
//           <View style={styles.diamondLabelOverlay}>
//             <Text style={styles.diamondLabelText}>
//               {card.reference_name === "Earings" ? "Earrings" : card.reference_name}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   </View>
// )}
        
// {/* Dynamic Gender Section - Men & Kids cards (scrollable) + Women full banner below */}
// {genderSection && (
//   <View style={styles.section}>
//     <Text style={styles.sectionTitle}>{genderSection.section_title}</Text>
//     <Text style={styles.sectionSubtitle}>{genderSection.section_subtitle}</Text>
//     <Image source={ringline} style={styles.sectionDivider} />

//     {/* Horizontal Scrollable Cards: Men & Kids */}
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.genderHorizontalScrollContent}
//       snapToInterval={responsiveWidth(45) + 12}
//       decelerationRate="fast"
//     >
//       {genderSection.section_cards.map((card) => (
//         <TouchableOpacity
//           key={card.id}
//           style={styles.genderHorizontalCard}
//           activeOpacity={0.9}
//           onPress={handleProductPress}
//         >
//           <Image
//             source={{ uri: card.image }}
//             style={styles.genderHorizontalImage}
//             resizeMode="cover"
//           />
//           <View style={styles.genderHorizontalFooter}>
//             <Text style={styles.genderHorizontalLabel}>{card.reference_name}</Text>
//             <View style={styles.exploreRow}>
//               <Text style={styles.genderExplore}>Explore</Text>
//               <Ionicons
//                 name="chevron-forward"
//                 size={16}
//                 color="rgba(8, 118, 90, 1)"
//                 style={{ marginLeft: 4 }}
//               />
//             </View>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>

//     {/* Full Width Women Banner Below */}
//     {genderSection.banner_image && (
//       <TouchableOpacity
//         style={styles.fullWidthGenderBannerWrapper}
//         activeOpacity={0.9}
//         onPress={handleProductPress}
//       >
//         <Image
//           source={{ uri: genderSection.banner_image }}
//           style={styles.fullWidthGenderBannerImage}
//           resizeMode="cover"
//         />
//       </TouchableOpacity>
//     )}
//   </View>
// )}
//         {/* Couple Rings (Full Width Carousel) */}
//         <View style={[styles.section, { marginTop: 0 }]}>
//           <View style={styles.fullWidthCarouselWrapper}>
//             <Carousel
//               width={width}
//               height={responsiveHeight(30)}
//               autoPlay
//               loop
//               scrollAnimationDuration={1200}
//               data={[1, 2, 3, 4]}
//               renderItem={({ index }) => (
//                 <TouchableOpacity key={index} onPress={handleProductPress}>
//                   <Image
//                     source={require("../assets/lastbanner.png")}
//                     style={styles.fullWidthCarouselImage}
//                   />
//                 </TouchableOpacity>
//               )}
//             />
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

// // Styles remain exactly the same
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingHorizontal: responsiveWidth(3),
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: responsiveHeight(1),
//   },
//   logo: {
//     width: responsiveWidth(35),
//     height: responsiveHeight(5),
//     resizeMode: "contain",
//   },
//   headerIcons: { flexDirection: "row" },
//   icon: { marginLeft: 12 },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginVertical: 10,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: responsiveFontSize(1.8),
//     color: "#000",
//   },
//   categoryScroll: {
//     marginVertical: 5,
//     overflow: 'visible',
//   },
//   categoryContentContainer: {
//     paddingRight: 15,
//   },
//   categoryItem: {
//     alignItems: "center",
//     marginRight: 15,
//     backgroundColor: "#fff",
//     paddingVertical: 5,
//     borderRadius: 5,
//     shadowColor: "rgb(83, 178, 74)",
//     shadowOffset: { width: 0, height: 7 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 6,
//   },
//   categoryImage: {
//     width: 90,
//     height: 90,
//     borderRadius: 5,
//     resizeMode: "cover",
//   },
//   categoryName: {
//     marginTop: 8,
//     fontSize: responsiveFontSize(1.6),
//     fontWeight: "500",
//     textAlign: "center",
//     paddingHorizontal: 8,
//   },
//   bannerWrapper: {},
//   bannerBackgroundImage: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//     position: "absolute",
//   },
//   section: {
//     marginVertical: 15,
//   },
//   sectionTitle: {
//     fontSize: responsiveFontSize(2.2),
//     fontWeight: "600",
//     textAlign: "center",
//     color: "rgba(8, 118, 90, 1)",
//   },
//   sectionSubtitle: {
//     fontSize: responsiveFontSize(1.6),
//     textAlign: "center",
//     color: "#666",
//     marginBottom: 10,
//   },
//   sectionDivider: {
//     width: "100%",
//     height: responsiveHeight(3),
//     resizeMode: "contain",
//     alignSelf: "center",
//     marginBottom: 10,
//   },
//   savingsSchemeCard: {
//     flexDirection: "row",
//     borderRadius: 15,
//     marginVertical: 15,
//     paddingVertical: responsiveHeight(1),
//     paddingHorizontal: responsiveWidth(2),
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowOffset: { width: 0, height: 3 },
//     elevation: 5,
//   },
//   savingsLeftSection: {
//     width: responsiveWidth(25),
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   goldHandImage: {
//     width: responsiveWidth(25),
//     height: responsiveHeight(6),
//     resizeMode: "contain",
//   },
//   savingsRightSection: {
//     flex: 1,
//     paddingLeft: responsiveWidth(3),
//     paddingRight: responsiveWidth(2),
//   },
//   savingsTitle: {
//     color: "#FFFFFF",
//     fontSize: 14,
//     fontWeight: "700",
//     marginBottom: 4,
//   },
//   savingsSubtitle: {
//     color: "#FFFFFF",
//     fontSize: 12,
//     fontWeight: "400",
//     lineHeight: 20,
//     opacity: 0.95,
//   },
//   savingsArrowButton: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 25,
//     width: 36,
//     height: 36,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   collectionScrollContent: {
//     paddingRight: responsiveWidth(3),
//     paddingVertical: 8,
//   },
//   collectionCard: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     marginRight: 12,
//     marginBottom: 4,
//     width: responsiveWidth(45),
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.15,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   collectionImageContainer: {
//     width: "100%",
//     backgroundColor: "#F8F8F8",
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//     overflow: 'hidden',
//   },
//   collectionImage: {
//     width: "100%",
//     height: responsiveHeight(22),
//     resizeMode: "cover",
//   },
//   exploreBtn: {
//     backgroundColor: "#fff",
//     paddingVertical: 12,
//     alignItems: "center",
//     borderTopWidth: 1,
//     borderTopColor: "rgba(8, 118, 90, 0.1)",
//     borderBottomLeftRadius: 12,
//     borderBottomRightRadius: 12,
//   },
//   exploreText: {
//     color: "#832729",
//     fontWeight: "600",
//     fontSize: responsiveFontSize(1.7),
//     letterSpacing: 0.5,
//   },
//   karatWrapper: {
//     width: "100%",
//     position: "relative",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 12,
//     overflow: 'hidden',
//     shadowColor: "rgb(83, 178, 74)",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.20,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   karatImage: {
//     width: "100%",
//     height: responsiveHeight(28),
//     resizeMode: "cover",
//   },
//   exploreNowButton: {
//     position: "absolute",
//     bottom: responsiveHeight(2.5),
//     right: responsiveWidth(4),
//     backgroundColor: "rgba(255, 255, 255, 0.95)",
//     paddingVertical: 10,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   exploreNowBtnText: {
//     color: "#1F1F1F",
//     fontWeight: "600",
//     fontSize: responsiveFontSize(1.8),
//     letterSpacing: 0.5,
//   },
//   diamondBannerWrapper: {
//     width: "100%",
//     borderRadius: 12,
//     overflow: 'hidden',
//     marginBottom: 12,
//     shadowColor: "rgb(83, 178, 74)",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.20,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   diamondBannerImage: {
//     width: "100%",
//     height: responsiveHeight(22),
//     resizeMode: "cover",
//   },
//   diamondGridScrollContent: {
//     paddingRight: responsiveWidth(3),
//     paddingVertical: 4,
//   },
//   diamondGridItem: {
//     width: responsiveWidth(42),
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     overflow: "hidden",
//     marginRight: 12,
//     shadowColor: "rgb(83, 178, 74)",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.20,
//     shadowRadius: 8,
//     elevation: 6,
//     position: 'relative',
//   },
//   diamondGridImage: {
//     width: "100%",
//     height: responsiveHeight(20),
//     resizeMode: "cover",
//   },
//   diamondLabelOverlay: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     paddingVertical: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   diamondLabelText: {
//     color: "#FFFFFF",
//     fontWeight: "600",
//     fontSize: responsiveFontSize(1.8),
//     letterSpacing: 0.5,
//   },
//   genderRow: {
//     flexWrap: "wrap",
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   genderCard: {
//     width: "48%",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     overflow: "hidden",
//     marginBottom: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 1 },
//     elevation: 2,
//   },
//   genderImage: {
//     width: "100%",
//     height: responsiveHeight(20),
//     resizeMode: "cover",
//   },
//   genderFooter: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//   },
//   genderLabel: {
//     fontWeight: "600",
//     color: "#333",
//   },
//   genderExplore: {
//     color: "rgba(8, 118, 90, 1)",
//     fontWeight: "600",
//   },
//   exploreRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   fullWidthCarouselWrapper: {
//     width: width,
//     marginTop: 10,
//     overflow: "hidden",
//   },
//   fullWidthCarouselImage: {
//     width: width,
//     height: responsiveHeight(40),
//     resizeMode: "cover",
//   },
//     categoryNameSkeleton: {
//     width: 80,
//     height: 16,
//     marginTop: 8,
//     borderRadius: 4,
//     alignSelf: "center",
//   },


//   genderHorizontalScrollContent: {
//   paddingRight: responsiveWidth(3),
//   paddingVertical: 8,
// },
// genderHorizontalCard: {
//   width: responsiveWidth(45),
//   backgroundColor: "#fff",
//   borderRadius: 12,
//   marginRight: 12,
//   overflow: "hidden",
//   shadowColor: "#000",
//   shadowOffset: { width: 0, height: 4 },
//   shadowOpacity: 0.15,
//   shadowRadius: 8,
//   elevation: 6,
// },
// genderHorizontalImage: {
//   width: "100%",
//   height: responsiveHeight(22),
//   resizeMode: "cover",
// },
// genderHorizontalFooter: {
//   padding: 12,
//   flexDirection: "row",
//   justifyContent: "space-between",
//   alignItems: "center",
// },
// genderHorizontalLabel: {
//   fontSize: responsiveFontSize(2),
//   fontWeight: "600",
//   color: "#333",
// },
// fullWidthGenderBannerWrapper: {
//   width: "100%",
//   borderRadius: 12,
//   overflow: "hidden",
//   marginTop: 16,
//   shadowColor: "rgb(83, 178, 74)",
//   shadowOffset: { width: 0, height: 4 },
//   shadowOpacity: 0.20,
//   shadowRadius: 8,
//   elevation: 6,
// },
// fullWidthGenderBannerImage: {
//   width: "100%",
//   height: responsiveHeight(28),
//   resizeMode: "cover",
// },
// });
// HomeScreen.js

import React, { useEffect,useCallback  } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Carousel from "react-native-reanimated-carousel";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useSharedValue } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import { DrawerActions } from "@react-navigation/native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchBanners,
  fetchHomeSections,
} from "../redux/slices/categorySlice";

// Shimmer Placeholder
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const { width } = Dimensions.get("window");

// Local Assets
import ringline from "../assets/ringline.png";
import earrings from "../assets/earrings.png";
import mangalsutra from "../assets/mangalsutra.png";

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const progress = useSharedValue(0);
  const dispatch = useDispatch();

  // Redux State
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    banners,
    bannersLoading,
    bannersError,
    homeSections = [],
    homeSectionsLoading,
  } = useSelector((state) => state.category);
 const { customerId, addressList = [] } = useSelector((state) => state.Auth || {});
  // Find dynamic sections
  const categorySection = homeSections.find((s) => s.section_type === "Category");
  const diamondSection = homeSections.find((s) => s.section_type === "Diamond");
  const genderSection = homeSections.find((s) => s.section_type === "Gender");

  // TODO: Replace with actual logged-in user ID from auth
  const userId = 1;

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBanners());
    dispatch(fetchHomeSections());
  }, [dispatch]);

  // Inside HomeScreen component
const handleBannerPress = useCallback((item) => {
  if (!item.target_type || !item.target_value) {
    console.log("⚠️ Banner clicked but has no target_type or target_value", item);
    return;
  }

  const userId = customerId || 1;

  const analyticsPayload = {
    user_id: userId,
    target_type: item.target_type,
    target_value: item.target_value,
  };
console.log(analyticsPayload,"now i am consoling for banners+++++++++++++++++")
  

  navigation.navigate("IndividualCategory", {
    userId,
    analyticsPayload,
  });
}, [customerId, navigation]); 
  const navigateToCategory = (categoryId, categoryName) => {
  console.log("🚀 Navigating to IndividualCategory");
  console.log("User ID:", customerId);
  console.log("Category ID:", categoryId);
  console.log("Category Name:", categoryName);

  navigation.navigate("IndividualCategory", {
    userId: customerId,
    categoryId,
    categoryName,
  });
};


const renderBannerItem = useCallback(({ item }) => (
  <TouchableOpacity
    style={styles.bannerItem}
    activeOpacity={0.9}
    onPress={() => handleBannerPress(item)} // ← Now uses stable handler
  >
    <Image
      source={{ uri: item.banner_image }}
      style={styles.bannerBackgroundImage}
      resizeMode="cover"
    />
  </TouchableOpacity>
), [handleBannerPress]); 


const renderCategorySkeleton = () => (
    <View style={styles.categoryItem}>
      <ShimmerPlaceHolder style={styles.categoryImage} />
      <ShimmerPlaceHolder style={styles.categoryNameSkeleton} />
    </View>
  );



const handleSectionNavigation = (section) => {
  const userId = customerId || 1;

  const analyticsPayload = {
    user_id: userId,
    section_type: section.section_type,   // "Category", "Diamond", "Gender"
    reference_id: section.reference_id,
  };

  console.log("🚀 Navigating to IndividualCategory (Section)");
  console.log("User ID:", userId);
  console.log("Analytics Payload:", analyticsPayload);

  navigation.navigate("IndividualCategory", {
    userId,
    analyticsPayload,
  });
};

const handleCardNavigation = (card, sectionType) => {
  const userId = customerId || 1;

  const analyticsPayload = {
    user_id: userId,
    section_type: sectionType,
    reference_id: card.reference_id,
  };

  console.log("🚀 Navigating to IndividualCategory (Card)");
  console.log("User ID:", userId);
  console.log("Analytics Payload:", analyticsPayload);

  navigation.navigate("IndividualCategory", {
    userId,
    analyticsPayload,
  });
};

   const renderCategoryOrDiamondSection = (section, sectionType) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.section_title}</Text>
      <Text style={styles.sectionSubtitle}>{section.section_subtitle}</Text>
      <Image source={ringline} style={styles.sectionDivider} />

      {/* Banner - Clickable */}
      <TouchableOpacity
        style={styles.diamondBannerWrapper}
        onPress={() => handleSectionNavigation(section)}
        activeOpacity={0.9}
      >
        <Image
          source={{ uri: section.banner_image }}
          style={styles.diamondBannerImage}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.diamondGridScrollContent}
      >
        {(section.section_cards || []).map((card) => (
          <TouchableOpacity
            key={card.id}
            style={styles.diamondGridItem}
            onPress={() => handleCardNavigation(card, sectionType)}
            activeOpacity={0.9}
          >
            <Image source={{ uri: card.image }} style={styles.diamondGridImage} />
            <View style={styles.diamondLabelOverlay}>
              <Text style={styles.diamondLabelText}>
                     {card.reference_name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );


  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <ScrollView
        style={[styles.container, { paddingTop: insets.top }]}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{ padding: 8 }}
          >
            <Ionicons name="menu-outline" size={28} color="#832729" />
          </TouchableOpacity>

          <Image source={require("../assets/geethalogo.png")} style={styles.logo} />

          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => navigation.navigate("WishList")}>
              <Ionicons name="heart-outline" size={22} color="#832729" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <Ionicons name="cart-outline" size={22} color="#832729" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#832729" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search here your favourite Jewellery"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
          <Ionicons name="filter-outline" size={20} color="#832729" style={{ marginLeft: 8 }} />
        </View>

        {/* Top Categories Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContentContainer}
        >
          {categoriesLoading ? (
            [...Array(6)].map((_, i) => (
              <View key={`skel-${i}`}>{renderCategorySkeleton()}</View>
            ))
          ) : categoriesError ? (
            <Text style={styles.errorText}>Failed to load categories</Text>
          ) : categories.length === 0 ? (
            <Text style={styles.emptyText}>No categories available</Text>
          ) : (
            categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => navigateToCategory(category.id, category.category_name)}
              >
                <View style={styles.categoryItem}>
                  <Image
                    source={{ uri: category.category_image }}
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.categoryName}>
                    {category.category_name === "Earings" ? "Earrings" : category.category_name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        {/* Main Banner Carousel */}
        <View style={styles.bannerWrapper}>
          <Carousel
            autoPlayInterval={3000}
            data={bannersLoading ? [] : banners.length > 0 ? banners : []}
            height={320}
            loop
            pagingEnabled
            snapEnabled
            width={width}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            onProgressChange={(_, abs) => (progress.value = abs)}
            renderItem={renderBannerItem}
          />

          {bannersLoading && (
            <View style={styles.bannerShimmerOverlay}>
              <ShimmerPlaceHolder style={styles.bannerShimmer} />
            </View>
          )}
        </View>

        {/* Smart Savings Scheme */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("GoldScheme")}>
          <LinearGradient colors={["#832729", "#3F0F11"]} style={styles.savingsSchemeCard}>
            <View style={styles.savingsLeftSection}>
              <Image source={require("../assets/goldhand.png")} style={styles.goldHandImage} />
            </View>
            <View style={styles.savingsRightSection}>
              <Text style={styles.savingsTitle}>Smart Savings Schemes</Text>
              <Text style={styles.savingsSubtitle}>
                Join flexible gold saving plans and grow your wealth with ease.
              </Text>
            </View>
            <TouchableOpacity style={styles.savingsArrowButton}>
              <Ionicons name="chevron-forward" size={20} color="#832729" />
            </TouchableOpacity>
          </LinearGradient>
        </TouchableOpacity>

     
        {categorySection && renderCategoryOrDiamondSection(categorySection, "Category")}
  {diamondSection && renderCategoryOrDiamondSection(diamondSection, "Diamond")}

        {/* Dynamic Gender Section */}
      
  {genderSection && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{genderSection.section_title}</Text>
    <Text style={styles.sectionSubtitle}>{genderSection.section_subtitle}</Text>
    <Image source={ringline} style={styles.sectionDivider} />

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.genderHorizontalScrollContent}
    >
      {(genderSection.section_cards || []).map((card) => (
        <TouchableOpacity
          key={card.id}
          style={styles.genderHorizontalCard}
          onPress={() => handleCardNavigation(card, "Gender")}
          activeOpacity={0.9}
        >
          <Image source={{ uri: card.image }} style={styles.genderHorizontalImage} />
          <View style={styles.genderHorizontalFooter}>
            <Text style={styles.genderHorizontalLabel}>{card.reference_name}</Text>
            <View style={styles.exploreRow}>
              <Text style={styles.genderExplore}>Explore</Text>
              <Ionicons name="chevron-forward" size={16} color="#832729" />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>

    {genderSection.banner_image && (
      <TouchableOpacity
        style={styles.fullWidthGenderBannerWrapper}
        onPress={() => handleSectionNavigation(genderSection)}
        activeOpacity={0.9}
      >
        <Image
          source={{ uri: genderSection.banner_image }}
          style={styles.fullWidthGenderBannerImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    )}
  </View>
)}
        {/* Bottom Carousel */}
        {/* <View style={styles.section}>
          <Carousel
            width={width}
            height={responsiveHeight(35)}
            autoPlay
            loop
            data={[1, 2, 3]}
            renderItem={() => (
              <Image
                source={require("../assets/lastbanner.png")}
                style={styles.fullWidthCarouselImage}
              />
            )}
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: responsiveWidth(3),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: responsiveHeight(1),
  },
  logo: {
    width: responsiveWidth(35),
    height: responsiveHeight(5),
    resizeMode: "contain",
  },
  headerIcons: { flexDirection: "row" },
  icon: { marginLeft: 12 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginVertical: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: responsiveFontSize(1.8),
    color: "#000",
  },
  categoryScroll: { marginVertical: 8 },
  categoryContentContainer: {  },
  categoryItem: {
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#fff",
    // paddingVertical: 8,
    borderRadius: 8,
    shadowColor: "#832729",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth:0.1,
    borderColor:"#000",
    paddingBottom:5,
    marginBottom:1
  },
  categoryImage: {
    width: 100,
    height: 100,
    // borderRadius: 8,
    borderTopRightRadius:5,
    borderTopLeftRadius:5
  },
  categoryName: {
    marginTop: 8,
    fontSize: responsiveFontSize(1.6),
    fontWeight: "500",
    textAlign: "center",
  },
  categoryNameSkeleton: {
    width: 80,
    height: 16,
    marginTop: 8,
    borderRadius: 4,
    alignSelf: "center",
  },
  // bannerWrapper: { marginVertical: 10 },
  bannerItem: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  bannerBackgroundImage: {
    width: "100%",
    height: "100%",
  },
  bannerShimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerShimmer: {
    width: "95%",
    height: "90%",
    borderRadius: 12,
  },
  section: { marginVertical: 20 },
  sectionTitle: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: "700",
    textAlign: "center",
    color: "#832729",
    fontFamily:"SF-Pro-Display-LightItalic"
  },
  sectionSubtitle: {
    fontSize: responsiveFontSize(1.7),
    textAlign: "center",
    color: "#666",
    marginVertical: 8,
  },
  sectionDivider: {
    width: "100%",
    height: responsiveHeight(3),
    resizeMode: "contain",
    marginVertical: 12,
  },
  savingsSchemeCard: {
    flexDirection: "row",
    borderRadius: 16,
    // marginVertical: 6,
    padding: 8,
    alignItems: "center",
  },
  savingsLeftSection: { width: responsiveWidth(28) },
  goldHandImage: {
    width: "100%",
    height: responsiveHeight(8),
    resizeMode: "contain",
  },
  savingsRightSection: { flex: 1, paddingHorizontal: 12 },
  savingsTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  savingsSubtitle: { color: "#fff", fontSize: 13, opacity: 0.9, marginTop: 4 },
  savingsArrowButton: {
    backgroundColor: "#fff",
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  collectionScrollContent: { paddingRight: 12 },
  collectionCard: {
    width: responsiveWidth(45),
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    elevation: 6,
  },
  collectionImageContainer: { backgroundColor: "#f8f8f8" },
  collectionImage: { width: "100%", height: responsiveHeight(22) },
  exploreBtn: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  exploreText: { color: "#832729", fontWeight: "600", fontSize: 16 },
  karatWrapper: { borderRadius: 16, overflow: "hidden", shadowColor: "#832729", elevation: 8 },
  karatImage: { width: "100%", height: responsiveHeight(28) },
  exploreNowButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreNowBtnText: { color: "#000", fontWeight: "600", fontSize: 16 },
  diamondBannerWrapper: { borderRadius: 16, overflow: "hidden", marginBottom: 16, elevation: 6 },
  diamondBannerImage: { width: "100%", height: responsiveHeight(22) },
  diamondGridScrollContent: { paddingRight: 12 },
  diamondGridItem: {
    width: responsiveWidth(42),
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 12,
    elevation: 6,
    position: "relative",
  },
  diamondGridImage: { width: "100%", height: responsiveHeight(20) },
  diamondLabelOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 12,
    alignItems: "center",
  },
  diamondLabelText: { color: "#fff", fontWeight: "600", fontSize: 17 },
  genderHorizontalScrollContent: { paddingRight: 12 },
  genderHorizontalCard: {
    width: responsiveWidth(45),
    borderRadius: 12,
    marginRight: 12,
    overflow: "hidden",
    elevation: 6,
    marginBottom:1
  },
  genderHorizontalImage: { width: "100%", height: responsiveHeight(22) },
  genderHorizontalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#fff",
  },
  genderHorizontalLabel: { fontSize: 18, fontWeight: "600", color: "#333" },
  genderExplore: { color: "#832729", fontWeight: "600" },
  exploreRow: { flexDirection: "row", alignItems: "center" },
  fullWidthGenderBannerWrapper: {
    marginTop: 20,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 6,
  },
  fullWidthGenderBannerImage: { width: "100%", height: responsiveHeight(28) },
  fullWidthCarouselImage: { width: "100%", height: "100%" },
  errorText: { paddingLeft: 20, color: "red", fontSize: 16 },
  emptyText: { paddingLeft: 20, color: "#666", fontSize: 16 },
});

export default HomeScreen;