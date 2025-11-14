// import React from "react";
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
// const { width } = Dimensions.get("window");

// // import your local images
// import haaram from "../assets/haaram.png";
// import ringline from "../assets/ringline.png";
// import earrings from "../assets/earrings.png";
// import childcat from "../assets/childcat.png";
// import mencat from "../assets/mencat.png";
// import womencat from "../assets/owmencat.png";
// import mangalsutra from "../assets/mangalsutra.png";

// const categories = [
//   { name: "Necklace", img: haaram },
//   { name: "Earrings", img: earrings },
//   { name: "Mangalsutram", img: mangalsutra },
//   { name: "Chains", img: haaram },
// ];

// // Banner data with offers
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

//   const handleProductPress = () => {
//     navigation.navigate("IndividualCategory");
//   };

//   // Render individual banner item - Exact style from your file
//   const renderBannerItem = ({ item }) => (
//     <TouchableOpacity
//       style={{
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         overflow: 'hidden',
//         width: '100%',
//         height: '100%',
//       }}
//       activeOpacity={0.8}
//     >
//       <Image source={item.image} style={styles.bannerBackgroundImage} />
      
     
//     </TouchableOpacity>
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

//         {/* Categories */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.categoryScroll}
//         >
//           {categories.map((item, index) => (
//             <TouchableOpacity key={index} onPress={handleProductPress}>
//               <View style={styles.categoryItem}>
//                 <Image source={item.img} style={styles.categoryImage} />
//                 <Text style={styles.categoryName}>{item.name}</Text>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {/* Banner Carousel - EXACT CONFIG FROM YOUR FILE */}
//         <View style={styles.bannerWrapper}>
//           <Carousel
//             autoPlayInterval={2000}
//             data={bannerData}
//             height={258}
//             loop={true}
//             pagingEnabled={true}
//             snapEnabled={true}
//             width={width}
//             style={{
//               width: width,
//             }}
//             mode="parallax"
//             modeConfig={{
//               parallaxScrollingScale: 0.9,
//               parallaxScrollingOffset: 50,
//             }}
//             onProgressChange={(_, absoluteProgress) => {
//               progress.value = absoluteProgress;
//             }}
//             panGestureHandlerProps={{
//               activeOffsetX: [-20, 20],
//               failOffsetY: [-10, 10],
//             }}
//             renderItem={renderBannerItem}
//           />
//         </View>
// {/* Smart Savings Schemes - Below Banner */}
// {/* Smart Savings Schemes - Below Banner */}
// <TouchableOpacity 
//   activeOpacity={0.8}
//   onPress={() => {
//     // Navigate to savings scheme details
//     navigation.navigate("GoldScheme");
    
//   }}
// >
//   <LinearGradient
//     colors={['rgba(0, 84, 61, 1)', 'rgba(0, 51, 23, 1)']}
//     start={{ x: 0, y: 0 }}
//     end={{ x: 0, y: 1 }}
//     style={styles.savingsSchemeCard}
//   >
//     <View style={styles.savingsLeftSection}>
//       <Image 
//         source={require("../assets/goldhand.png")} 
//         style={styles.goldHandImage}
//       />
//     </View>
    
//     <View style={styles.savingsRightSection}>
//       <Text style={styles.savingsTitle}>Smart Savings Schemes</Text>
//       <Text style={styles.savingsSubtitle}>
//         Join flexible gold saving plans and grow your wealth with ease.
//       </Text>
//     </View>
    
//     <TouchableOpacity style={styles.savingsArrowButton} onPress={() => {
//     // Navigate to savings scheme details
//     navigation.navigate("GoldScheme");
    
//   }}>
//       <Ionicons 
//         name="chevron-forward" 
//         size={20} 
//         color="rgba(8, 118, 90, 1)" 
//       />
//     </TouchableOpacity>
//   </LinearGradient>
// </TouchableOpacity>


//         {/* Geetha's Collection */}
//         {/* <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Geetha's Collection</Text>
//           <Text style={styles.sectionSubtitle}>
//             Discover treasures that speak your style!
//           </Text>

//           <Image source={ringline} style={styles.sectionDivider} />

//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             {[1, 2, 3].map((_, i) => (
//               <TouchableOpacity
//                 key={i}
//                 onPress={handleProductPress}
//                 style={styles.collectionCard}
//               >
//                 <Image
//                   source={
//                     i === 0 || i === 2
//                       ? earrings
//                       : require("../assets/mangalsutra.png")
//                   }
//                   style={styles.collectionImage}
//                 />
//                 <TouchableOpacity style={styles.exploreBtn}>
//                   <Text style={styles.exploreText}>Explore</Text>
//                 </TouchableOpacity>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View> */}
// {/* Geetha's Collection */}
// <View style={styles.section}>
//   <Text style={styles.sectionTitle}>Geetha's Collection</Text>
//   <Text style={styles.sectionSubtitle}>
//     Discover treasures that speak your style!
//   </Text>

//   <Image source={ringline} style={styles.sectionDivider} />
// <ScrollView 
//   horizontal 
//   showsHorizontalScrollIndicator={false}
//   contentContainerStyle={styles.collectionScrollContent}
//   snapToInterval={responsiveWidth(45) + 12}
//   decelerationRate="fast"
//   style={{ overflow: 'visible' }} // Add this to prevent shadow clipping
// >
//     {[1, 2, 3].map((_, i) => (
//       <TouchableOpacity
//         key={i}
//         onPress={handleProductPress}
//         style={styles.collectionCard}
//         activeOpacity={0.9}
//       >
//         <View style={styles.collectionImageContainer}>
//           <Image
//             source={
//               i === 0 || i === 2
//                 ? earrings
//                 : require("../assets/mangalsutra.png")
//             }
//             style={styles.collectionImage}
//           />
//         </View>
//         <TouchableOpacity 
//           style={styles.exploreBtn}
//           onPress={handleProductPress}
//         >
//           <Text style={styles.exploreText}>Explore</Text>
//         </TouchableOpacity>
//       </TouchableOpacity>
//     ))}
//   </ScrollView>
// </View>

//         {/* 22 Karat Touch */}
//         {/* <View style={styles.section}>
//           <Text style={styles.sectionTitle}>22 Karat Touch</Text>
//           <Text style={styles.sectionSubtitle}>
//             A golden promise of purity and perfection
//           </Text>

//           <Image source={ringline} style={styles.sectionDivider} />

//           <TouchableOpacity
//             style={styles.karatWrapper}
//             onPress={handleProductPress}
//           >
//             <Image source={earrings} style={styles.karatImage} />
//             <TouchableOpacity style={styles.exploreNowOverlay}>
//               <Text style={styles.exploreNowText}>Explore Now</Text>
//             </TouchableOpacity>
//           </TouchableOpacity>
//         </View> */}
// {/* 22 Karat Touch */}
// <View style={styles.section}>
//   {/* <Text style={styles.sectionTitle}>22 Karat Touch</Text>
//   <Text style={styles.sectionSubtitle}>
//     A golden promise of purity and perfection
//   </Text>

//   <Image source={ringline} style={styles.sectionDivider} /> */}

//   <TouchableOpacity
//     style={styles.karatWrapper}
//     onPress={handleProductPress}
//     activeOpacity={0.9}
//   >
//     <Image 
//       source={require("../assets/karat22.png")} 
//       style={styles.karatImage} 
//     />
    
  

//     {/* Explore Now Button - Bottom Right */}
//     <TouchableOpacity 
//       style={styles.exploreNowButton}
//       onPress={handleProductPress}
//     >
//       <Text style={styles.exploreNowBtnText}>Explore Now</Text>
//     </TouchableOpacity>
//   </TouchableOpacity>
// </View>


      
// <View style={styles.section}>
//   <Text style={styles.sectionTitle}>Brilliant Diamonds</Text>
//   <Text style={styles.sectionSubtitle}>
//     Crafted for elegance, made to sparkle
//   </Text>
//   <Image source={ringline} style={styles.sectionDivider} />

//   {/* Large Banner Image */}
//   <TouchableOpacity 
//     style={styles.diamondBannerWrapper}
//     onPress={handleProductPress}
//     activeOpacity={0.9}
//   >
//     <Image 
//       source={require("../assets/diamondbanner.png")} 
//       style={styles.diamondBannerImage} 
//     />
//   </TouchableOpacity>

//   {/* Horizontal Scrolling Grid Items */}
//   <ScrollView 
//     horizontal 
//     showsHorizontalScrollIndicator={false}
//     contentContainerStyle={styles.diamondGridScrollContent}
//     snapToInterval={responsiveWidth(48) + 12}
//     decelerationRate="fast"
//     disableIntervalMomentum={true}
//   >
//     {[
//       { label: "Rings", img: require("../assets/diamondring.png") },
//       { label: "Ear Rings", img: require("../assets/diamondearring.png") },
//       { label: "Necklace", img: require("../assets/diamondring.png") },
//       // { label: "Bracelets", img: require("../assets/diamondbracelet.png") },
//     ].map((item, index) => (
//       <TouchableOpacity
//         key={index}
//         onPress={handleProductPress}
//         style={styles.diamondGridItem}
//         activeOpacity={0.9}
//       >
//         <Image source={item.img} style={styles.diamondGridImage} />
//         <View style={styles.diamondLabelOverlay}>
//           <Text style={styles.diamondLabelText}>{item.label}</Text>
//         </View>
//       </TouchableOpacity>
//     ))}
//   </ScrollView>
// </View>



//         {/* Shop By Gender */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Shop By Gender</Text>
//           <Text style={styles.sectionSubtitle}>
//             Perfect pieces men, women & children
//           </Text>
//           <Image source={ringline} style={styles.sectionDivider} />

//           <View style={styles.genderRow}>
//             {[
//               { label: "Men", img: mencat },
//               { label: "Kids", img: childcat },
//               { label: "Women", fullWidth: true, img: womencat },
//             ].map((item, index) => (
//               <TouchableOpacity
//                 key={index}
//                 onPress={handleProductPress}
//                 style={[
//                   styles.genderCard,
//                   item.fullWidth && { width: "100%" },
//                 ]}
//               >
//                 <Image source={item.img} style={styles.genderImage} />
//                 <View style={styles.genderFooter}>
//                   <Text style={styles.genderLabel}>{item.label}</Text>
//                   <TouchableOpacity style={styles.exploreRow}>
//                     <Text style={styles.genderExplore}>Explore</Text>
//                     <Ionicons
//                       name="chevron-forward"
//                       size={16}
//                       color="rgba(8, 118, 90, 1)"
//                       style={{ marginLeft: 4 }}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Style Your Shine */}
//         {/* <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Style Your Shine</Text>
//           <Text style={styles.sectionSubtitle}>
//             Discover curated looks for every mood
//           </Text>
//           <Image source={ringline} style={styles.sectionDivider} />

//           <View style={styles.shineOuterWrapper}>
//             <Carousel
//               autoPlayInterval={2500}
//               data={[1, 2, 3, 4]}
//               height={responsiveHeight(40)}
//               loop
//               width={responsiveWidth(80)}
//               mode="parallax"
//               modeConfig={{
//                 parallaxScrollingScale: 0.9,
//                 parallaxScrollingOffset: 60,
//               }}
//               scrollAnimationDuration={1200}
//               renderItem={() => (
//                 <TouchableOpacity
//                   onPress={handleProductPress}
//                   style={styles.shineCardContainer}
//                 >
//                   <Image
//                     source={require("../assets/shine.png")}
//                     style={styles.shineCardImage}
//                   />
//                 </TouchableOpacity>
//               )}
//             />
//           </View>
//         </View> */}

//         {/* Couple Rings (Full Width Carousel) */}
//       <View style={[styles.section,{marginTop:0}]}>
//   <View style={styles.fullWidthCarouselWrapper}>
//     <Carousel
//       width={width}
//       height={responsiveHeight(30)}
//       autoPlay
//       loop
//       scrollAnimationDuration={1200}
//       data={[1, 2, 3, 4]}
//       renderItem={({ index }) => (
//         <TouchableOpacity 
//           key={index} 
//           onPress={handleProductPress}
//         >
//           <Image
//             source={require("../assets/lastbanner.png")}
//             style={styles.fullWidthCarouselImage}
//           />
//         </TouchableOpacity>
//       )}
//     />
//   </View>
// </View>


//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

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
//   categoryScroll: { marginVertical: 10 },
//   categoryItem: {
//     alignItems: "center",
//     marginRight: 15,
//     backgroundColor: "#fff",
//     shadowColor: "rgb(83, 178, 74)",
//     shadowOffset: { 
//       width: 0, 
//       height: 2 
//     },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   categoryImage: {
//     width: 90,
//     height: 90,
//     borderRadius: 10,
//     resizeMode: "cover",
//   },
//   categoryName: {
//     marginTop: 5,
//     fontSize: responsiveFontSize(1.6),
//     fontWeight: "500",
//   },
//   bannerWrapper: {
//     marginVertical: 10,
//   },
//   bannerBackgroundImage: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//     position: "absolute",
//   },
//   topOfferContainer: {
//     position: "absolute",
//     top: responsiveHeight(2),
//     left: responsiveWidth(4),
//     backgroundColor: "rgba(74, 38, 27, 0.85)",
//     paddingHorizontal: responsiveWidth(4),
//     paddingVertical: responsiveHeight(1.5),
//     borderRadius: 10,
//     minWidth: responsiveWidth(40),
//   },
//   bottomOfferContainer: {
//     position: "absolute",
//     bottom: responsiveHeight(2),
//     left: responsiveWidth(4),
//     backgroundColor: "rgba(74, 38, 27, 0.85)",
//     paddingHorizontal: responsiveWidth(4),
//     paddingVertical: responsiveHeight(1.5),
//     borderRadius: 10,
//     minWidth: responsiveWidth(40),
//   },
//   offerUpTo: {
//     color: "#FFD700",
//     fontSize: responsiveFontSize(1.5),
//     fontWeight: "400",
//     marginBottom: 2,
//   },
//   discountText: {
//     color: "#FFFFFF",
//     fontSize: responsiveFontSize(2.8),
//     fontWeight: "700",
//     marginBottom: 2,
//   },
//   categoryText: {
//     color: "#FFFFFF",
//     fontSize: responsiveFontSize(1.7),
//     fontWeight: "500",
//     marginBottom: 1,
//   },
//   subtextOffer: {
//     color: "#FFD700",
//     fontSize: responsiveFontSize(1.4),
//     fontWeight: "400",
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
//   collectionCard: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     marginRight: 12,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 1 },
//     elevation: 2,
//     width: responsiveWidth(40),
//   },
//   collectionImage: {
//     width: "100%",
//     height: responsiveHeight(20),
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   exploreBtn: {
//     backgroundColor: "#fff",
//     paddingVertical: 8,
//     alignItems: "center",
//     borderBottomLeftRadius: 10,
//     borderBottomRightRadius: 10,
//     borderWidth: 0.5,
//     borderColor: "#08765A",
//   },
//   exploreText: {
//     color: "#08765A",
//     fontWeight: "600",
//   },
//   twoGridRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   twoGridItem: {
//     width: "48%",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     overflow: "hidden",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 1 },
//     elevation: 2,
//   },
//   twoGridImage: {
//     width: "100%",
//     height: responsiveHeight(18),
//     resizeMode: "cover",
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
//   karatWrapper: {
//     width: "100%",
//     position: "relative",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   karatImage: {
//     width: "100%",
//     height: responsiveHeight(25),
//     resizeMode: "cover",
//     borderRadius: 10,
//   },
//   exploreNowOverlay: {
//     position: "absolute",
//     bottom: responsiveHeight(2),
//     backgroundColor: "rgba(255, 255, 255, 0.75)",
//     paddingVertical: 8,
//     paddingHorizontal: 25,
//     borderRadius: 8,
//   },
//   exploreNowText: {
//     color: "rgba(31, 31, 31, 1)",
//     fontWeight: "600",
//     fontSize: responsiveFontSize(1.9),
//   },
//   imageOverlay: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.45)",
//     paddingVertical: 6,
//     alignItems: "center",
//   },
//   imageOverlayText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: responsiveFontSize(1.8),
//   },
//   exploreRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   scrollCard: {
//     width: responsiveWidth(42),
//     height: responsiveHeight(22),
//     borderRadius: 10,
//     marginRight: 12,
//     overflow: "hidden",
//     backgroundColor: "#fff",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 1 },
//     elevation: 3,
//   },
//   scrollImage: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   shineOuterWrapper: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   shineCardContainer: {
//     alignItems: "center",
//     borderRadius: 12,
//     overflow: "hidden",
//   },
//   shineCardImage: {
//     width: responsiveWidth(70),
//     height: responsiveHeight(40),
//     borderRadius: 12,
//     resizeMode: "cover",
//   },
//   fullWidthCarouselWrapper: {
//     alignItems: "center",
//     marginTop: 10,
//     borderRadius: 10,
//     overflow: "hidden",
//   },
//   fullWidthCarouselImage: {
//     width: width,
//     height: responsiveHeight(25),
//     resizeMode: "cover",
//   },
//   //
//   savingsSchemeCard: {
//   flexDirection: "row",
//   borderRadius: 15,
//   marginVertical: 15,
//   paddingVertical: responsiveHeight(1),
//   paddingHorizontal: responsiveWidth(2),
//   alignItems: "center",
//   shadowColor: "#000",
//   shadowOpacity: 0.15,
//   shadowOffset: { width: 0, height: 3 },
//   elevation: 5,
// },
// savingsLeftSection: {
//   width: responsiveWidth(25),
//   alignItems: "center",
//   justifyContent: "center",
// },
// goldHandImage: {
//   width: responsiveWidth(25),
//   height: responsiveHeight(6),
//   resizeMode: "contain",
// },
// savingsRightSection: {
//   flex: 1,
//   paddingLeft: responsiveWidth(3),
//   paddingRight: responsiveWidth(2),
// },
// savingsTitle: {
//   color: "#FFFFFF",
//   fontSize: 14,
//   fontWeight: "700",
//   marginBottom: 4,
// },
// savingsSubtitle: {
//   color: "#FFFFFF",
//   fontSize: 12,
//   fontWeight: "400",
//   lineHeight: 20,
//   opacity: 0.95,
// },
// savingsArrowButton: {
//   backgroundColor: "#FFFFFF",
//   borderRadius: 25,
//   width: 36,
//   height: 36,
//   alignItems: "center",
//   justifyContent: "center",
// },

// //
// collectionScrollContent: {
//   paddingRight: responsiveWidth(3),
//   paddingVertical: 8, // Add vertical padding to prevent shadow clipping
// },
// collectionCard: {
//   backgroundColor: "#fff",
//   borderRadius: 12,
//   marginRight: 12,
//   marginBottom: 4, // Add margin bottom for shadow space
//   width: responsiveWidth(45),
//   shadowColor: "#000",
//   shadowOffset: { 
//     width: 0, 
//     height: 4 
//   },
//   shadowOpacity: 0.15,
//   shadowRadius: 8,
//   elevation: 6,
//   // Remove overflow: 'hidden' to prevent shadow clipping
// },
// collectionImageContainer: {
//   width: "100%",
//   backgroundColor: "#F8F8F8",
//   borderTopLeftRadius: 12, // Add border radius here instead
//   borderTopRightRadius: 12,
//   overflow: 'hidden', // Only clip the image container
// },
// collectionImage: {
//   width: "100%",
//   height: responsiveHeight(22),
//   resizeMode: "cover",
// },
// exploreBtn: {
//   backgroundColor: "#fff",
//   paddingVertical: 12,
//   alignItems: "center",
//   borderTopWidth: 1,
//   borderTopColor: "rgba(8, 118, 90, 0.1)",
//   borderBottomLeftRadius: 12, // Add border radius to bottom button
//   borderBottomRightRadius: 12,
// },
// exploreText: {
//   color: "#08765A",
//   fontWeight: "600",
//   fontSize: responsiveFontSize(1.7),
//   letterSpacing: 0.5,
// },
// //
// karatWrapper: {
//   width: "100%",
//   position: "relative",
//   alignItems: "center",
//   justifyContent: "center",
//   borderRadius: 12,
//   overflow: 'hidden',
//   shadowColor: "rgb(83, 178, 74)",
//   shadowOffset: { 
//     width: 0, 
//     height: 4 
//   },
//   shadowOpacity: 0.20,
//   shadowRadius: 8,
//   elevation: 6,
// },
// karatImage: {
//   width: "100%",
//   height: responsiveHeight(28),
//   resizeMode: "cover",
// },
// karatTextOverlay: {
//   position: "absolute",
//   top: responsiveHeight(3),
//   left: responsiveWidth(4),
//   maxWidth: "60%",
// },
// karatSubheading: {
//   color: "#FFFFFF",
//   fontSize: responsiveFontSize(1.3),
//   fontWeight: "400",
//   letterSpacing: 1.5,
//   marginBottom: 6,
//   opacity: 0.9,
// },
// karatMainHeading: {
//   color: "#FFFFFF",
//   fontSize: responsiveFontSize(3.5),
//   fontWeight: "700",
//   letterSpacing: 2,
//   lineHeight: responsiveHeight(4.5),
//   textTransform: "uppercase",
// },
// exploreNowButton: {
//   position: "absolute",
//   bottom: responsiveHeight(2.5),
//   right: responsiveWidth(4),
//   backgroundColor: "rgba(255, 255, 255, 0.95)",
//   paddingVertical: 10,
//   paddingHorizontal: 24,
//   borderRadius: 8,
//   shadowColor: "#000",
//   shadowOffset: { 
//     width: 0, 
//     height: 2 
//   },
//   shadowOpacity: 0.2,
//   shadowRadius: 4,
//   elevation: 4,
// },
// exploreNowBtnText: {
//   color: "#1F1F1F",
//   fontWeight: "600",
//   fontSize: responsiveFontSize(1.8),
//   letterSpacing: 0.5,
// },


// // Brilliant Diamonds Section
// diamondBannerWrapper: {
//   width: "100%",
//   borderRadius: 12,
//   overflow: 'hidden',
//   marginBottom: 12,
//   shadowColor: "rgb(83, 178, 74)",
//   shadowOffset: { 
//     width: 0, 
//     height: 4 
//   },
//   shadowOpacity: 0.20,
//   shadowRadius: 8,
//   elevation: 6,
// },
// diamondBannerImage: {
//   width: "100%",
//   height: responsiveHeight(22),
//   resizeMode: "cover",
// },
// diamondGridScrollContent: {
//   paddingRight: responsiveWidth(3),
//   paddingVertical: 4,
// },
// diamondGridItem: {
//   width: responsiveWidth(42), // Decreased from 48 to 38
//   backgroundColor: "#fff",
//   borderRadius: 12,
//   overflow: "hidden",
//   marginRight: 12,
//   shadowColor: "rgb(83, 178, 74)",
//   shadowOffset: { 
//     width: 0, 
//     height: 4 
//   },
//   shadowOpacity: 0.20,
//   shadowRadius: 8,
//   elevation: 6,
//   position: 'relative',
// },
// diamondGridImage: {
//   width: "100%",
//   height: responsiveHeight(20),
//   resizeMode: "cover",
// },
// diamondLabelOverlay: {
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   right: 0,
//   // backgroundColor: "rgba(0, 0, 0, 0.5)",
//   paddingVertical: 10,
//   alignItems: "center",
//   justifyContent: "center",
// },
// diamondLabelText: {
//   color: "#FFFFFF",
//   fontWeight: "600",
//   fontSize: responsiveFontSize(1.8),
//   letterSpacing: 0.5,
// },

// //
// fullWidthCarouselWrapper: {
//   alignItems: "center",
//   marginTop: 10,
//   borderRadius: 10,
//   overflow: "hidden",
//   backgroundColor: "#f5f5f5", // Add background color to see the difference
// },
// carouselItemContainer: {
//   width: width,
//   height: responsiveHeight(30),
//   alignItems: "center",
//   justifyContent: "center",
// },
// fullWidthCarouselImage: {
//   width: "100%",
//   height: "100%",
//   resizeMode: "contain", // This maintains aspect ratio
// },
// fullWidthCarouselWrapper: {
//   width: width,
//   marginTop: 10,
//   overflow: "hidden",
// },
// fullWidthCarouselImage: {
//   width: width, // Full device width
//   height: responsiveHeight(40),
//   resizeMode: "cover", // Covers entire space, maintains aspect ratio
// },

// });
import React from "react";
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
import { useSharedValue } from 'react-native-reanimated';
import LinearGradient from "react-native-linear-gradient";
const { width } = Dimensions.get("window");

// import your local images
import haaram from "../assets/haaram.png";
import ringline from "../assets/ringline.png";
import earrings from "../assets/earrings.png";
import childcat from "../assets/childcat.png";
import mencat from "../assets/mencat.png";
import womencat from "../assets/owmencat.png";
import mangalsutra from "../assets/mangalsutra.png";

const categories = [
  { name: "Necklace", img: haaram },
  { name: "Earrings", img: earrings },
  { name: "Mangalsutram", img: mangalsutra },
  { name: "Chains", img: haaram },
];

// Banner data with offers
const bannerData = [
  {
    id: 1,
    image: require("../assets/banner.png"),
    topOffer: "Up to",
    topDiscount: "50% OFF",
    topCategory: "On Gold Jewellery",
    topSubtext: "Making Charges",
    bottomOffer: "Up to",
    bottomDiscount: "100% OFF",
    bottomCategory: "On Diamond Jewellery",
    bottomSubtext: "Making Charges",
  },
  {
    id: 2,
    image: require("../assets/banner.png"),
    topOffer: "Up to",
    topDiscount: "50% OFF",
    topCategory: "On Gold Jewellery",
    topSubtext: "Making Charges",
    bottomOffer: "Up to",
    bottomDiscount: "100% OFF",
    bottomCategory: "On Diamond Jewellery",
    bottomSubtext: "Making Charges",
  },
  {
    id: 3,
    image: require("../assets/banner.png"),
    topOffer: "Up to",
    topDiscount: "50% OFF",
    topCategory: "On Gold Jewellery",
    topSubtext: "Making Charges",
    bottomOffer: "Up to",
    bottomDiscount: "100% OFF",
    bottomCategory: "On Diamond Jewellery",
    bottomSubtext: "Making Charges",
  },
];

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const progress = useSharedValue(0);

  const handleProductPress = () => {
    navigation.navigate("IndividualCategory");
  };

  // Render individual banner item - Exact style from your file
  const renderBannerItem = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
      }}
      activeOpacity={0.8}
    >
      <Image source={item.image} style={styles.bannerBackgroundImage} />
      
     
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <ScrollView
        style={[styles.container, { paddingTop: insets.top }]}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 150,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../assets/geethalogo.png")}
            style={styles.logo}
          />

          <View style={styles.headerIcons}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("WishList");
              }}
            >
              <Ionicons
                name="heart-outline"
                size={22}
                color="rgba(8, 118, 90, 1)"
                style={styles.icon}
              />
            </TouchableOpacity>

            <Ionicons
              name="cart-outline"
              size={22}
              color="rgba(8, 118, 90, 1)"
              style={styles.icon}
            />
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="rgba(8, 118, 90, 1)"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Search here your favourite Jewellery"
            placeholderTextColor="#666"
            style={styles.searchInput}
          />
          <Ionicons
            name="filter-outline"
            size={20}
            color="rgba(8, 118, 90, 1)"
            style={{ marginLeft: 5 }}
          />
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContentContainer}
        >
          {categories.map((item, index) => (
            <TouchableOpacity key={index} onPress={handleProductPress}>
              <View style={styles.categoryItem}>
                <Image source={item.img} style={styles.categoryImage} />
                <Text style={styles.categoryName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Banner Carousel - EXACT CONFIG FROM YOUR FILE */}
        <View style={styles.bannerWrapper}>
          <Carousel
            autoPlayInterval={2000}
            data={bannerData}
            height={258}
            loop={true}
            pagingEnabled={true}
            snapEnabled={true}
            width={width}
            style={{
              width: width,
            }}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            onProgressChange={(_, absoluteProgress) => {
              progress.value = absoluteProgress;
            }}
            panGestureHandlerProps={{
              activeOffsetX: [-20, 20],
              failOffsetY: [-10, 10],
            }}
            renderItem={renderBannerItem}
          />
        </View>
{/* Smart Savings Schemes - Below Banner */}
{/* Smart Savings Schemes - Below Banner */}
<TouchableOpacity 
  activeOpacity={0.8}
  onPress={() => {
    // Navigate to savings scheme details
    navigation.navigate("GoldScheme");
    
  }}
>
  <LinearGradient
    colors={['rgba(0, 84, 61, 1)', 'rgba(0, 51, 23, 1)']}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={styles.savingsSchemeCard}
  >
    <View style={styles.savingsLeftSection}>
      <Image 
        source={require("../assets/goldhand.png")} 
        style={styles.goldHandImage}
      />
    </View>
    
    <View style={styles.savingsRightSection}>
      <Text style={styles.savingsTitle}>Smart Savings Schemes</Text>
      <Text style={styles.savingsSubtitle}>
        Join flexible gold saving plans and grow your wealth with ease.
      </Text>
    </View>
    
    <TouchableOpacity style={styles.savingsArrowButton} onPress={() => {
    // Navigate to savings scheme details
    navigation.navigate("GoldScheme");
    
  }}>
      <Ionicons 
        name="chevron-forward" 
        size={20} 
        color="rgba(8, 118, 90, 1)" 
      />
    </TouchableOpacity>
  </LinearGradient>
</TouchableOpacity>


        {/* Geetha's Collection */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Geetha's Collection</Text>
          <Text style={styles.sectionSubtitle}>
            Discover treasures that speak your style!
          </Text>

          <Image source={ringline} style={styles.sectionDivider} />

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={handleProductPress}
                style={styles.collectionCard}
              >
                <Image
                  source={
                    i === 0 || i === 2
                      ? earrings
                      : require("../assets/mangalsutra.png")
                  }
                  style={styles.collectionImage}
                />
                <TouchableOpacity style={styles.exploreBtn}>
                  <Text style={styles.exploreText}>Explore</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View> */}
{/* Geetha's Collection */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Geetha's Collection</Text>
  <Text style={styles.sectionSubtitle}>
    Discover treasures that speak your style!
  </Text>

  <Image source={ringline} style={styles.sectionDivider} />
<ScrollView 
  horizontal 
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.collectionScrollContent}
  snapToInterval={responsiveWidth(45) + 12}
  decelerationRate="fast"
  style={{ overflow: 'visible' }} // Add this to prevent shadow clipping
>
    {[1, 2, 3].map((_, i) => (
      <TouchableOpacity
        key={i}
        onPress={handleProductPress}
        style={styles.collectionCard}
        activeOpacity={0.9}
      >
        <View style={styles.collectionImageContainer}>
          <Image
            source={
              i === 0 || i === 2
                ? earrings
                : require("../assets/mangalsutra.png")
            }
            style={styles.collectionImage}
          />
        </View>
        <TouchableOpacity 
          style={styles.exploreBtn}
          onPress={handleProductPress}
        >
          <Text style={styles.exploreText}>Explore</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    ))}
  </ScrollView>
</View>

        {/* 22 Karat Touch */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>22 Karat Touch</Text>
          <Text style={styles.sectionSubtitle}>
            A golden promise of purity and perfection
          </Text>

          <Image source={ringline} style={styles.sectionDivider} />

          <TouchableOpacity
            style={styles.karatWrapper}
            onPress={handleProductPress}
          >
            <Image source={earrings} style={styles.karatImage} />
            <TouchableOpacity style={styles.exploreNowOverlay}>
              <Text style={styles.exploreNowText}>Explore Now</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View> */}
{/* 22 Karat Touch */}
<View style={styles.section}>
  {/* <Text style={styles.sectionTitle}>22 Karat Touch</Text>
  <Text style={styles.sectionSubtitle}>
    A golden promise of purity and perfection
  </Text>

  <Image source={ringline} style={styles.sectionDivider} /> */}

  <TouchableOpacity
    style={styles.karatWrapper}
    onPress={handleProductPress}
    activeOpacity={0.9}
  >
    <Image 
      source={require("../assets/karat22.png")} 
      style={styles.karatImage} 
    />
    
  

    {/* Explore Now Button - Bottom Right */}
    <TouchableOpacity 
      style={styles.exploreNowButton}
      onPress={handleProductPress}
    >
      <Text style={styles.exploreNowBtnText}>Explore Now</Text>
    </TouchableOpacity>
  </TouchableOpacity>
</View>


      
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Brilliant Diamonds</Text>
  <Text style={styles.sectionSubtitle}>
    Crafted for elegance, made to sparkle
  </Text>
  <Image source={ringline} style={styles.sectionDivider} />

  {/* Large Banner Image */}
  <TouchableOpacity 
    style={styles.diamondBannerWrapper}
    onPress={handleProductPress}
    activeOpacity={0.9}
  >
    <Image 
      source={require("../assets/diamondbanner.png")} 
      style={styles.diamondBannerImage} 
    />
  </TouchableOpacity>

  {/* Horizontal Scrolling Grid Items */}
  <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.diamondGridScrollContent}
    snapToInterval={responsiveWidth(48) + 12}
    decelerationRate="fast"
    disableIntervalMomentum={true}
  >
    {[
      { label: "Rings", img: require("../assets/diamondring.png") },
      { label: "Ear Rings", img: require("../assets/diamondearring.png") },
      { label: "Necklace", img: require("../assets/diamondring.png") },
      // { label: "Bracelets", img: require("../assets/diamondbracelet.png") },
    ].map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={handleProductPress}
        style={styles.diamondGridItem}
        activeOpacity={0.9}
      >
        <Image source={item.img} style={styles.diamondGridImage} />
        <View style={styles.diamondLabelOverlay}>
          <Text style={styles.diamondLabelText}>{item.label}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
</View>



        {/* Shop By Gender */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop By Gender</Text>
          <Text style={styles.sectionSubtitle}>
            Perfect pieces men, women & children
          </Text>
          <Image source={ringline} style={styles.sectionDivider} />

          <View style={styles.genderRow}>
            {[
              { label: "Men", img: mencat },
              { label: "Kids", img: childcat },
              { label: "Women", fullWidth: true, img: womencat },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={handleProductPress}
                style={[
                  styles.genderCard,
                  item.fullWidth && { width: "100%" },
                ]}
              >
                <Image source={item.img} style={styles.genderImage} />
                <View style={styles.genderFooter}>
                  <Text style={styles.genderLabel}>{item.label}</Text>
                  <TouchableOpacity style={styles.exploreRow}>
                    <Text style={styles.genderExplore}>Explore</Text>
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color="rgba(8, 118, 90, 1)"
                      style={{ marginLeft: 4 }}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Style Your Shine */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Style Your Shine</Text>
          <Text style={styles.sectionSubtitle}>
            Discover curated looks for every mood
          </Text>
          <Image source={ringline} style={styles.sectionDivider} />

          <View style={styles.shineOuterWrapper}>
            <Carousel
              autoPlayInterval={2500}
              data={[1, 2, 3, 4]}
              height={responsiveHeight(40)}
              loop
              width={responsiveWidth(80)}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 60,
              }}
              scrollAnimationDuration={1200}
              renderItem={() => (
                <TouchableOpacity
                  onPress={handleProductPress}
                  style={styles.shineCardContainer}
                >
                  <Image
                    source={require("../assets/shine.png")}
                    style={styles.shineCardImage}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </View> */}

        {/* Couple Rings (Full Width Carousel) */}
      <View style={[styles.section,{marginTop:0}]}>
  <View style={styles.fullWidthCarouselWrapper}>
    <Carousel
      width={width}
      height={responsiveHeight(30)}
      autoPlay
      loop
      scrollAnimationDuration={1200}
      data={[1, 2, 3, 4]}
      renderItem={({ index }) => (
        <TouchableOpacity 
          key={index} 
          onPress={handleProductPress}
        >
          <Image
            source={require("../assets/lastbanner.png")}
            style={styles.fullWidthCarouselImage}
          />
        </TouchableOpacity>
      )}
    />
  </View>
</View>


      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: responsiveFontSize(1.8),
    color: "#000",
  },
  categoryScroll: { 
    marginVertical: 5,
    overflow: 'visible',
  },
  categoryContentContainer: {
    // paddingBottom: 11,
    paddingRight: 15,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "#fff",
    paddingVertical: 5,
    // paddingHorizontal: 8,
    borderRadius: 5,
    shadowColor: "rgb(83, 178, 74)",
    shadowOffset: { 
      width: 0, 
      height: 7 
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 6,
  },
  categoryImage: {
    width: 90,
    height: 90,
    borderRadius: 5,
    resizeMode: "cover",
  },
  categoryName: {
    marginTop: 8,
    fontSize: responsiveFontSize(1.6),
    fontWeight: "500",
    textAlign: "left",
    paddingHorizontal: 8,
  },
  bannerWrapper: {
    // marginVertical: 10,
  },
  bannerBackgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  topOfferContainer: {
    position: "absolute",
    top: responsiveHeight(2),
    left: responsiveWidth(4),
    backgroundColor: "rgba(74, 38, 27, 0.85)",
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    borderRadius: 10,
    minWidth: responsiveWidth(40),
  },
  bottomOfferContainer: {
    position: "absolute",
    bottom: responsiveHeight(2),
    left: responsiveWidth(4),
    backgroundColor: "rgba(74, 38, 27, 0.85)",
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    borderRadius: 10,
    minWidth: responsiveWidth(40),
  },
  offerUpTo: {
    color: "#FFD700",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "400",
    marginBottom: 2,
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(2.8),
    fontWeight: "700",
    marginBottom: 2,
  },
  categoryText: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(1.7),
    fontWeight: "500",
    marginBottom: 1,
  },
  subtextOffer: {
    color: "#FFD700",
    fontSize: responsiveFontSize(1.4),
    fontWeight: "400",
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: "600",
    textAlign: "center",
    color: "rgba(8, 118, 90, 1)",
  },
  sectionSubtitle: {
    fontSize: responsiveFontSize(1.6),
    textAlign: "center",
    color: "#666",
    marginBottom: 10,
  },
  sectionDivider: {
    width: "100%",
    height: responsiveHeight(3),
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10,
  },
  collectionCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    width: responsiveWidth(40),
  },
  collectionImage: {
    width: "100%",
    height: responsiveHeight(20),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  exploreBtn: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 0.5,
    borderColor: "#08765A",
  },
  exploreText: {
    color: "#08765A",
    fontWeight: "600",
  },
  twoGridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  twoGridItem: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  twoGridImage: {
    width: "100%",
    height: responsiveHeight(18),
    resizeMode: "cover",
  },
  genderRow: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  genderCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  genderImage: {
    width: "100%",
    height: responsiveHeight(20),
    resizeMode: "cover",
  },
  genderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  genderLabel: {
    fontWeight: "600",
    color: "#333",
  },
  genderExplore: {
    color: "rgba(8, 118, 90, 1)",
    fontWeight: "600",
  },
  karatWrapper: {
    width: "100%",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  karatImage: {
    width: "100%",
    height: responsiveHeight(25),
    resizeMode: "cover",
    borderRadius: 10,
  },
  exploreNowOverlay: {
    position: "absolute",
    bottom: responsiveHeight(2),
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  exploreNowText: {
    color: "rgba(31, 31, 31, 1)",
    fontWeight: "600",
    fontSize: responsiveFontSize(1.9),
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    paddingVertical: 6,
    alignItems: "center",
  },
  imageOverlayText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: responsiveFontSize(1.8),
  },
  exploreRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollCard: {
    width: responsiveWidth(42),
    height: responsiveHeight(22),
    borderRadius: 10,
    marginRight: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
  scrollImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  shineOuterWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  shineCardContainer: {
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
  shineCardImage: {
    width: responsiveWidth(70),
    height: responsiveHeight(40),
    borderRadius: 12,
    resizeMode: "cover",
  },
  fullWidthCarouselWrapper: {
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  fullWidthCarouselImage: {
    width: width,
    height: responsiveHeight(25),
    resizeMode: "cover",
  },
  //
  savingsSchemeCard: {
  flexDirection: "row",
  borderRadius: 15,
  marginVertical: 15,
  paddingVertical: responsiveHeight(1),
  paddingHorizontal: responsiveWidth(2),
  alignItems: "center",
  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowOffset: { width: 0, height: 3 },
  elevation: 5,
},
savingsLeftSection: {
  width: responsiveWidth(25),
  alignItems: "center",
  justifyContent: "center",
},
goldHandImage: {
  width: responsiveWidth(25),
  height: responsiveHeight(6),
  resizeMode: "contain",
},
savingsRightSection: {
  flex: 1,
  paddingLeft: responsiveWidth(3),
  paddingRight: responsiveWidth(2),
},
savingsTitle: {
  color: "#FFFFFF",
  fontSize: 14,
  fontWeight: "700",
  marginBottom: 4,
},
savingsSubtitle: {
  color: "#FFFFFF",
  fontSize: 12,
  fontWeight: "400",
  lineHeight: 20,
  opacity: 0.95,
},
savingsArrowButton: {
  backgroundColor: "#FFFFFF",
  borderRadius: 25,
  width: 36,
  height: 36,
  alignItems: "center",
  justifyContent: "center",
},

//
collectionScrollContent: {
  paddingRight: responsiveWidth(3),
  paddingVertical: 8, // Add vertical padding to prevent shadow clipping
},
collectionCard: {
  backgroundColor: "#fff",
  borderRadius: 12,
  marginRight: 12,
  marginBottom: 4, // Add margin bottom for shadow space
  width: responsiveWidth(45),
  shadowColor: "#000",
  shadowOffset: { 
    width: 0, 
    height: 4 
  },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 6,
  // Remove overflow: 'hidden' to prevent shadow clipping
},
collectionImageContainer: {
  width: "100%",
  backgroundColor: "#F8F8F8",
  borderTopLeftRadius: 12, // Add border radius here instead
  borderTopRightRadius: 12,
  overflow: 'hidden', // Only clip the image container
},
collectionImage: {
  width: "100%",
  height: responsiveHeight(22),
  resizeMode: "cover",
},
exploreBtn: {
  backgroundColor: "#fff",
  paddingVertical: 12,
  alignItems: "center",
  borderTopWidth: 1,
  borderTopColor: "rgba(8, 118, 90, 0.1)",
  borderBottomLeftRadius: 12, // Add border radius to bottom button
  borderBottomRightRadius: 12,
},
exploreText: {
  color: "#08765A",
  fontWeight: "600",
  fontSize: responsiveFontSize(1.7),
  letterSpacing: 0.5,
},
//
karatWrapper: {
  width: "100%",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
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
karatImage: {
  width: "100%",
  height: responsiveHeight(28),
  resizeMode: "cover",
},
karatTextOverlay: {
  position: "absolute",
  top: responsiveHeight(3),
  left: responsiveWidth(4),
  maxWidth: "60%",
},
karatSubheading: {
  color: "#FFFFFF",
  fontSize: responsiveFontSize(1.3),
  fontWeight: "400",
  letterSpacing: 1.5,
  marginBottom: 6,
  opacity: 0.9,
},
karatMainHeading: {
  color: "#FFFFFF",
  fontSize: responsiveFontSize(3.5),
  fontWeight: "700",
  letterSpacing: 2,
  lineHeight: responsiveHeight(4.5),
  textTransform: "uppercase",
},
exploreNowButton: {
  position: "absolute",
  bottom: responsiveHeight(2.5),
  right: responsiveWidth(4),
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  paddingVertical: 10,
  paddingHorizontal: 24,
  borderRadius: 8,
  shadowColor: "#000",
  shadowOffset: { 
    width: 0, 
    height: 2 
  },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 4,
},
exploreNowBtnText: {
  color: "#1F1F1F",
  fontWeight: "600",
  fontSize: responsiveFontSize(1.8),
  letterSpacing: 0.5,
},


// Brilliant Diamonds Section
diamondBannerWrapper: {
  width: "100%",
  borderRadius: 12,
  overflow: 'hidden',
  marginBottom: 12,
  shadowColor: "rgb(83, 178, 74)",
  shadowOffset: { 
    width: 0, 
    height: 4 
  },
  shadowOpacity: 0.20,
  shadowRadius: 8,
  elevation: 6,
},
diamondBannerImage: {
  width: "100%",
  height: responsiveHeight(22),
  resizeMode: "cover",
},
diamondGridScrollContent: {
  paddingRight: responsiveWidth(3),
  paddingVertical: 4,
},
diamondGridItem: {
  width: responsiveWidth(42), // Decreased from 48 to 38
  backgroundColor: "#fff",
  borderRadius: 12,
  overflow: "hidden",
  marginRight: 12,
  shadowColor: "rgb(83, 178, 74)",
  shadowOffset: { 
    width: 0, 
    height: 4 
  },
  shadowOpacity: 0.20,
  shadowRadius: 8,
  elevation: 6,
  position: 'relative',
},
diamondGridImage: {
  width: "100%",
  height: responsiveHeight(20),
  resizeMode: "cover",
},
diamondLabelOverlay: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  // backgroundColor: "rgba(0, 0, 0, 0.5)",
  paddingVertical: 10,
  alignItems: "center",
  justifyContent: "center",
},
diamondLabelText: {
  color: "#FFFFFF",
  fontWeight: "600",
  fontSize: responsiveFontSize(1.8),
  letterSpacing: 0.5,
},

//
fullWidthCarouselWrapper: {
  alignItems: "center",
  marginTop: 10,
  borderRadius: 10,
  overflow: "hidden",
  backgroundColor: "#f5f5f5", // Add background color to see the difference
},
carouselItemContainer: {
  width: width,
  height: responsiveHeight(30),
  alignItems: "center",
  justifyContent: "center",
},
fullWidthCarouselImage: {
  width: "100%",
  height: "100%",
  resizeMode: "contain", // This maintains aspect ratio
},
fullWidthCarouselWrapper: {
  width: width,
  marginTop: 10,
  overflow: "hidden",
},
fullWidthCarouselImage: {
  width: width, // Full device width
  height: responsiveHeight(40),
  resizeMode: "cover", // Covers entire space, maintains aspect ratio
},

});