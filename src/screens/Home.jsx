// // import React from "react";
// // import {
// //   View,
// //   Text,
// //   Image,
// //   ScrollView,
// //   TouchableOpacity,
// //   TextInput,
// //   StyleSheet,
// //   Dimensions,
// //   SafeAreaView,StatusBar
// // } from "react-native";
// // import Ionicons from "react-native-vector-icons/Ionicons";
// // import Carousel from "react-native-reanimated-carousel";
// // import {
// //   responsiveHeight,
// //   responsiveWidth,
// //   responsiveFontSize,
// // } from "react-native-responsive-dimensions";
// // import { useSafeAreaInsets } from "react-native-safe-area-context";
// // import { useNavigation } from "@react-navigation/native";

// // const { width } = Dimensions.get("window");

// // // import your local images
// // import haaram from "../assets/haaram.png";
// // import ringline from "../assets/ringline.png";
// // import earrings from "../assets/earrings.png"
// // const categories = [
// //   { name: "Necklace", img: haaram },
// //   { name: "Earrings", img: earrings },
// //   { name: "Rings", img: haaram },
// //   { name: "Chains", img: haaram },
// // ];

// // const HomeScreen = () => {
// //   const insets = useSafeAreaInsets();
// //   const navigation = useNavigation();

// //   const handleProductPress = () => {
// //     navigation.navigate('IndividualCategory');
// //   };

// //   return (
// //     <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
// //        <StatusBar
// //         backgroundColor="#FFFFFF" // white background
// //         barStyle="dark-content"   // dark text & icons
// //       />
// //       <ScrollView
// //         style={[
// //           styles.container,
// //           { paddingTop: insets.top, paddingBottom: insets.bottom + 120 },
// //         ]}
// //         showsVerticalScrollIndicator={false}
// //       >
// //         {/* Header */}
// //         <View style={styles.header}>
// //           <Image
// //             source={require("../assets/geethalogo.png")}
// //             style={styles.logo}
// //           />
// //           <View style={styles.headerIcons}>
// //             <Ionicons
// //               name="heart-outline"
// //               size={22}
// //               color="rgba(8, 118, 90, 1)"
// //               style={styles.icon}
// //             />
// //             <Ionicons
// //               name="cart-outline"
// //               size={22}
// //               color="rgba(8, 118, 90, 1)"
// //               style={styles.icon}
// //             />
            
// //           </View>
// //         </View>

// //         {/* Search */}
// //         <View style={styles.searchContainer}>
// //           <Ionicons
// //             name="search"
// //             size={20}
// //             color="rgba(8, 118, 90, 1)"
// //             style={{ marginRight: 5 }}
// //           />
// //           <TextInput
// //             placeholder="Search here your favourite Jewellery"
// //             placeholderTextColor="#666"
// //             style={styles.searchInput}
// //           />
// //           <Ionicons
// //             name="filter-outline"
// //             size={20}
// //             color="rgba(8, 118, 90, 1)"
// //             style={{ marginLeft: 5 }}
// //           />
// //         </View>

// //         {/* Categories */}
// //         <ScrollView
// //           horizontal
// //           showsHorizontalScrollIndicator={false}
// //           style={styles.categoryScroll}
// //         >
// //           {categories.map((item, index) => (
// //             <TouchableOpacity key={index} onPress={handleProductPress}>
// //               <View style={styles.categoryItem}>
// //                 <Image source={item.img} style={styles.categoryImage} />
// //                 <Text style={styles.categoryName}>{item.name}</Text>
// //               </View>
// //             </TouchableOpacity>
// //           ))}
// //         </ScrollView>

// //         {/* Banner Carousel */}
// //         <View style={styles.bannerWrapper}>
// //           <Carousel
// //             width={width}
// //             height={responsiveHeight(28)}
// //             data={[1, 2, 3]}
// //             autoPlay
// //             scrollAnimationDuration={1200}
// //             renderItem={() => (
// //               <Image
// //                 source={require("../assets/banner.png")}
// //                 style={styles.bannerImage}
// //               />
// //             )}
// //           />
// //         </View>

// //         {/* Geetha’s Collection */}
// //         <View style={styles.section}>
// //           <Text style={styles.sectionTitle}>Geetha’s Collection</Text>
// //           <Text style={styles.sectionSubtitle}>
// //             Discover treasures that speak your style!
// //           </Text>

// //           <Image source={ringline} style={styles.sectionDivider} />

// //           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
// //             {[1, 2, 3].map((_, i) => (
// //               <TouchableOpacity key={i} onPress={handleProductPress} style={styles.collectionCard}>
// //                 <Image source={haaram} style={styles.collectionImage} />
// //                 <TouchableOpacity style={styles.exploreBtn}>
// //                   <Text style={styles.exploreText}>Explore</Text>
// //                 </TouchableOpacity>
// //               </TouchableOpacity>
// //             ))}
// //           </ScrollView>
// //         </View>

// //         {/* 22 Karat Touch */}
// //         <View style={styles.section}>
// //           <Text style={styles.sectionTitle}>22 Karat Touch</Text>
// //           <Text style={styles.sectionSubtitle}>
// //             A golden promise of purity and perfection
// //           </Text>

// //           <Image source={ringline} style={styles.sectionDivider} />

// //           <TouchableOpacity style={styles.karatWrapper} onPress={handleProductPress}>
// //             <Image source={haaram} style={styles.karatImage} />
// //             <TouchableOpacity style={styles.exploreNowOverlay}>
// //               <Text style={styles.exploreNowText}>Explore Now</Text>
// //             </TouchableOpacity>
// //           </TouchableOpacity>
// //         </View>

// //         {/* Mangalsutra & Earrings */}
// //         <View style={[styles.section, { marginVertical: 0 }]}>
// //           <View style={styles.twoGridRow}>
// //             <TouchableOpacity style={styles.twoGridItem} onPress={handleProductPress}>
// //               <Image
// //                 source={require("../assets/mangalsutra.png")}
// //                 style={styles.twoGridImage}
// //               />
// //               <View style={styles.imageOverlay}>
// //                 <Text style={styles.imageOverlayText}>Mangalsutra</Text>
// //               </View>
// //             </TouchableOpacity>
// //             <TouchableOpacity style={styles.twoGridItem} onPress={handleProductPress}>
// //               <Image
// //                 source={require("../assets/earrings.png")}
// //                 style={styles.twoGridImage}
// //               />
// //               <View style={styles.imageOverlay}>
// //                 <Text style={styles.imageOverlayText}>Earrings</Text>
// //               </View>
// //             </TouchableOpacity>
// //           </View>
// //         </View>

// //         {/* Brilliant Diamonds (Horizontal Scroll) */}
// //         <View style={styles.section}>
// //           <Text style={styles.sectionTitle}>Brilliant Diamonds</Text>
// //           <Text style={styles.sectionSubtitle}>
// //             Crafted for elegance, made to sparkle
// //           </Text>
// //           <Image source={ringline} style={styles.sectionDivider} />

// //           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
// //             {[
// //               { label: "Earrings", img: require("../assets/earrings.png") },
// //               { label: "Rings", img: require("../assets/haaram.png") },
// //               { label: "Necklace", img: require("../assets/mangalsutra.png") },
// //               { label: "Bracelets", img: require("../assets/haaram.png") },
// //               { label: "Bangles", img: require("../assets/earrings.png") },
// //             ].map((item, index) => (
// //               <TouchableOpacity key={index} onPress={handleProductPress} style={styles.scrollCard}>
// //                 <Image source={item.img} style={styles.scrollImage} />
// //                 <View style={styles.imageOverlay}>
// //                   <Text style={styles.imageOverlayText}>{item.label}</Text>
// //                 </View>
// //               </TouchableOpacity>
// //             ))}
// //           </ScrollView>
// //         </View>

// //         {/* Shop By Gender */}
// //         <View style={styles.section}>
// //           <Text style={styles.sectionTitle}>Shop By Gender</Text>
// //           <Text style={styles.sectionSubtitle}>
// //             Perfect pieces men, women & children
// //           </Text>
// //           <Image source={ringline} style={styles.sectionDivider} />

// //           <View style={styles.genderRow}>
// //             {[
// //               { label: "Men" },
// //               { label: "Kids" },
// //               { label: "Women", fullWidth: true },
// //             ].map((item, index) => (
// //               <TouchableOpacity
// //                 key={index}
// //                 onPress={handleProductPress}
// //                 style={[
// //                   styles.genderCard,
// //                   item.fullWidth && { width: "100%" },
// //                 ]}
// //               >
// //                 <Image source={haaram} style={styles.genderImage} />
// //                 <View style={styles.genderFooter}>
// //                   <Text style={styles.genderLabel}>{item.label}</Text>
// //                   <TouchableOpacity style={styles.exploreRow}>
// //                     <Text style={styles.genderExplore}>Explore</Text>
// //                     <Ionicons
// //                       name="chevron-forward"
// //                       size={16}
// //                       color="rgba(8, 118, 90, 1)"
// //                       style={{ marginLeft: 4 }}
// //                     />
// //                   </TouchableOpacity>
// //                 </View>
// //               </TouchableOpacity>
// //             ))}
// //           </View>
// //         </View>

// //         {/* Style Your Shine */}
// //         {/* Style Your Shine */}
// // <View style={styles.section}>
// //   <Text style={styles.sectionTitle}>Style Your Shine</Text>
// //   <Text style={styles.sectionSubtitle}>
// //     Discover curated looks for every mood
// //   </Text>
// //   <Image source={ringline} style={styles.sectionDivider} />

// //   <View style={styles.shineOuterWrapper}>
// //     <Carousel
// //       autoPlayInterval={2500}
// //       data={[1, 2, 3, 4]}
// //       height={responsiveHeight(40)}  // Reduced from 50% to remove extra vertical space below
// //       loop
// //       width={responsiveWidth(80)}  // Decreased from 80 to 70 for a more compact width (adjust this number further if needed, e.g., to 60)
// //       mode="parallax"
// //       modeConfig={{
// //         parallaxScrollingScale: 0.9,
// //         parallaxScrollingOffset: 60,
// //       }}
// //       scrollAnimationDuration={1200}
// //       renderItem={() => (
// //         <TouchableOpacity onPress={handleProductPress} style={styles.shineCardContainer}>
// //           <Image
// //             source={require("../assets/shine.png")}
// //             style={styles.shineCardImage}
// //           />
// //         </TouchableOpacity>
// //       )}
// //     />
// //   </View>
// // </View>

// //         {/* Couple Rings (Full Width Carousel) */}
// //         <View style={styles.section}>
// //           <Text style={styles.sectionTitle}>Couple Rings</Text>
// //           <Text style={styles.sectionSubtitle}>
// //             Crafted to celebrate your unbreakable bond
// //           </Text>
// //           <Image source={ringline} style={styles.sectionDivider} />

// //           <View style={styles.fullWidthCarouselWrapper}>
// //             <Carousel
// //               width={width}
// //               height={responsiveHeight(25)}
// //               autoPlay
// //               loop
// //               scrollAnimationDuration={1200}
// //               data={[1, 2, 3, 4]}
// //               renderItem={({ index }) => (
// //                 <TouchableOpacity key={index} onPress={handleProductPress}>
// //                   <Image
// //                     source={require("../assets/banner.png")}
// //                     style={styles.fullWidthCarouselImage}
// //                   />
// //                 </TouchableOpacity>
// //               )}
// //             />
// //           </View>

// //           <View style={styles.coupleBanner}>
// //             <Text style={styles.coupleBannerTitle}>Luxury Couple Rings</Text>
// //             <Text style={styles.coupleBannerText}>
// //               Get 20% off discount on your first purchase
// //             </Text>
// //           </View>
// //         </View>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };

// // export default HomeScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#fff",
// //     paddingHorizontal: responsiveWidth(3),
// //   },
// //   header: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginTop: responsiveHeight(1),
// //   },
// //   logo: {
// //     width: responsiveWidth(35),
// //     height: responsiveHeight(5),
// //     resizeMode: "contain",
// //   },
// //   headerIcons: { flexDirection: "row" },
// //   icon: { marginLeft: 12 },
// //   searchContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     backgroundColor: "#f5f5f5",
// //     borderRadius: 10,
// //     paddingHorizontal: 10,
// //     marginVertical: 10,
// //   },
// //   searchInput: {
// //     flex: 1,
// //     fontSize: responsiveFontSize(1.8),
// //     color: "#000",
// //   },
// //   categoryScroll: { marginVertical: 10 },
// //   categoryItem: {
// //     alignItems: "center",
// //     marginRight: 15,
// //     backgroundColor:"#fff",
    

// //   },
// //   categoryImage: {
// //     width: 90,
// //     height: 90,
// //     borderRadius: 10,
// //     resizeMode: "cover",
// //   },
// //   categoryName: {
// //     marginTop: 5,
// //     fontSize: responsiveFontSize(1.6),
// //     fontWeight: "500",
// //   },
// //   bannerWrapper: {
// //     marginVertical: 10,
// //     borderRadius: 10,
// //     overflow: "hidden",
// //   },
// //   bannerImage: {
// //     width: "100%",
// //     height: "100%",
// //     resizeMode: "cover",
// //   },
// //   section: {
// //     marginVertical: 15,
// //   },
// //   sectionTitle: {
// //     fontSize: responsiveFontSize(2.2),
// //     fontWeight: "600",
// //     textAlign: "center",
// //     color: "rgba(8, 118, 90, 1)",
// //   },
// //   sectionSubtitle: {
// //     fontSize: responsiveFontSize(1.6),
// //     textAlign: "center",
// //     color: "#666",
// //     marginBottom: 10,
// //   },
// //   sectionDivider: {
// //     width: "100%",
// //     height: responsiveHeight(3),
// //     resizeMode: "contain",
// //     alignSelf: "center",
// //     marginBottom: 10,
// //   },
// //   collectionCard: {
// //     backgroundColor: "#fff",
// //     borderRadius: 10,
// //     marginRight: 12,
// //     shadowColor: "#000",
// //     shadowOpacity: 0.1,
// //     shadowOffset: { width: 0, height: 1 },
// //     elevation: 2,
// //     width: responsiveWidth(40),
// //   },
// //   collectionImage: {
// //     width: "100%",
// //     height: responsiveHeight(20),
// //     borderTopLeftRadius: 10,
// //     borderTopRightRadius: 10,
// //   },
// //   exploreBtn: {
// //     backgroundColor: "#fff",
// //     paddingVertical: 8,
// //     alignItems: "center",
// //     borderBottomLeftRadius: 10,
// //     borderBottomRightRadius: 10,
// //     borderWidth:0.5,
// //     borderColor:"#08765A"
// //   },
// //   exploreText: {
// //     color: "#08765A",
// //     fontWeight: "600",
// //   },
// //   twoGridRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     marginTop: 10,
// //   },
// //   twoGridItem: {
// //     width: "48%",
// //     backgroundColor: "#fff",
// //     borderRadius: 10,
// //     overflow: "hidden",
// //     shadowColor: "#000",
// //     shadowOpacity: 0.1,
// //     shadowOffset: { width: 0, height: 1 },
// //     elevation: 2,
// //   },
// //   twoGridImage: {
// //     width: "100%",
// //     height: responsiveHeight(18),
// //     resizeMode: "cover",
// //   },
// //   twoGridText: {
// //     textAlign: "center",
// //     paddingVertical: 8,
// //     fontWeight: "600",
// //     color: "#333",
// //   },
// //   genderRow: {
// //   flexWrap: "wrap",
// //   flexDirection: "row",
// //   justifyContent: "space-between",
// // },

// // genderCard: {
// //   width: "48%", // overridden by 100% for last item
// //   backgroundColor: "#fff",
// //   borderRadius: 10,
// //   overflow: "hidden",
// //   marginBottom: 10,
// //   shadowColor: "#000",
// //   shadowOpacity: 0.1,
// //   shadowOffset: { width: 0, height: 1 },
// //   elevation: 2,
// // },

// // genderImage: {
// //   width: "100%",
// //   height: responsiveHeight(20),
// //   resizeMode: "cover",
// // },

// //   genderFooter: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     paddingHorizontal: 10,
// //     paddingVertical: 8,
// //   },
// //   genderLabel: {
// //     fontWeight: "600",
// //     color: "#333",
// //   },
// //   genderExplore: {
// //     color: "rgba(8, 118, 90, 1)",
// //     fontWeight: "600",
// //   },
// //   karatWrapper: {
// //     width: "100%",
// //     position: "relative",
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   karatImage: {
// //     width: "100%",
// //     height: responsiveHeight(25),
// //     resizeMode: "cover",
// //     borderRadius: 10,
// //   },
// //   exploreNowOverlay: {
// //     position: "absolute",
// //     bottom: responsiveHeight(2),
// //     backgroundColor: "rgba(255, 255, 255, 0.75)",
// //     paddingVertical: 8,
// //     paddingHorizontal: 25,
// //     borderRadius: 8,
// //   },
// //   exploreNowText: {
// //     color: "rgba(31, 31, 31, 1)",
// //     fontWeight: "600",
// //     fontSize: responsiveFontSize(1.9),
// //   },
// //   shineContainer: {
// //   flexDirection: "row",
// //   justifyContent: "center",
// //   alignItems: "center",
// //   marginTop: 10,
// // },
// // shineCard: {
// //   alignItems: "center",
// // },
// // shineLabel: {
// //   fontSize: responsiveFontSize(2),
// //   fontWeight: "600",
// //   color: "#333",
// //   marginBottom: 8,
// // },
// // shineImage: {
// //   width: responsiveWidth(80),
// //   height: responsiveHeight(30),
// //   borderRadius: 10,
// //   resizeMode: "cover",
// // },

// // coupleWrapper: {
// //   flexDirection: "row",
// //   justifyContent: "space-around",
// //   marginTop: 10,
// // },
// // coupleImageLeft: {
// //   width: responsiveWidth(40),
// //   height: responsiveHeight(22),
// //   borderRadius: 10,
// //   resizeMode: "cover",
// // },
// // coupleImageRight: {
// //   width: responsiveWidth(40),
// //   height: responsiveHeight(22),
// //   borderRadius: 10,
// //   resizeMode: "cover",
// // },
// // coupleBanner: {
// //   backgroundColor: "rgba(8, 118, 90, 0.1)",
// //   borderRadius: 10,
// //   padding: 15,
// //   marginTop: 15,
// //   alignItems: "center",
// // },
// // coupleBannerTitle: {
// //   fontSize: responsiveFontSize(2),
// //   fontWeight: "700",
// //   color: "rgba(8, 118, 90, 1)",
// // },
// // coupleBannerText: {
// //   fontSize: responsiveFontSize(1.6),
// //   color: "#333",
// //   marginTop: 5,
// //   textAlign: "center",
// //   width: "90%",
// // },
// // coupleCarouselWrapper: {
// //   alignItems: "center",
// //   marginTop: 10,
// // },

// // coupleCarouselCard: {
// //   borderRadius: 10,
// //   overflow: "hidden",
// //   shadowColor: "#000",
// //   shadowOpacity: 0.15,
// //   shadowOffset: { width: 0, height: 2 },
// //   elevation: 3,
// // },

// // coupleCarouselImage: {
// //   width: "100%",
// //   height: "100%",
// //   resizeMode: "cover",
// //   borderRadius: 10,
// // },
// // shineCarouselCard: {
// //   borderRadius: 12,
// //   overflow: "hidden",
// //   position: "relative",
// //   marginVertical: 10,
// //   shadowColor: "#000",
// //   shadowOpacity: 0.15,
// //   shadowOffset: { width: 0, height: 2 },
// //   elevation: 4,
// // },

// // shineCarouselImage: {
// //   width: 224,
// //   height: 284,
// //   borderRadius: 12,
// //   resizeMode: "cover",
// //   alignSelf: "center",
// // },

// // shineCarouselOverlay: {
// //   position: "absolute",
// //   bottom: 0,
// //   left: 0,
// //   right: 0,
// //   backgroundColor: "rgba(0, 0, 0, 0.3)",
// //   paddingVertical: 10,
// //   alignItems: "center",
// // },

// // shineCarouselText: {
// //   color: "#fff",
// //   fontSize: responsiveFontSize(2),
// //   fontWeight: "600",
// // },
// // imageOverlay: {
// //   position: "absolute",
// //   bottom: 0,
// //   left: 0,
// //   right: 0,
// //   backgroundColor: "rgba(0, 0, 0, 0.45)",
// //   paddingVertical: 6,
// //   alignItems: "center",
// // },
// // imageOverlayText: {
// //   color: "#fff",
// //   fontWeight: "600",
// //   fontSize: responsiveFontSize(1.8),
// // },
// // exploreRow: {
// //   flexDirection: "row",
// //   alignItems: "center",
// // },
// // scrollCard: {
// //   width: responsiveWidth(42),
// //   height: responsiveHeight(22),
// //   borderRadius: 10,
// //   marginRight: 12,
// //   overflow: "hidden",
// //   backgroundColor: "#fff",
// //   shadowColor: "#000",
// //   shadowOpacity: 0.1,
// //   shadowOffset: { width: 0, height: 1 },
// //   elevation: 3,
// // },
// // scrollImage: {
// //   width: "100%",
// //   height: "100%",
// //   resizeMode: "cover",
// // },

// // shineOuterWrapper: {
// //   alignItems: "center",
// //   justifyContent: "center",
// // },
// // shineCardContainer: {
// //   alignItems: "center",
// //   borderRadius: 12,
// //   overflow: "hidden",
// //   // backgroundColor: "#fff",
// //   // shadowColor: "#000",
// //   // shadowOpacity: 0.15,
// //   // shadowOffset: { width: 0, height: 2 },
// //   // elevation: 3,
// // },
// // shineCardImage: {
// //   width: responsiveWidth(70),  // Synced to match carousel width (was 70, but now explicit)
// //   height: responsiveHeight(40),
// //   borderRadius: 12,
// //   resizeMode: "cover",
// // },
// // shineCardTitle: {
// //   position: "absolute",
// //   bottom: 10,
// //   alignSelf: "center",
// //   backgroundColor: "#fff",
// //   paddingHorizontal: 16,
// //   paddingVertical: 4,
// //   borderRadius: 20,
// //   fontSize: responsiveFontSize(1.8),
// //   fontWeight: "600",
// //   color: "#08765A",
// // },

// // fullWidthCarouselWrapper: {
// //   alignItems: "center",
// //   marginTop: 10,
// //   borderRadius: 10,
// //   overflow: "hidden",
// // },
// // fullWidthCarouselImage: {
// //   width: width,
// //   height: responsiveHeight(25),
// //   resizeMode: "cover",
// // },


// // });
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
//   SafeAreaView,StatusBar
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

// const { width } = Dimensions.get("window");

// // import your local images
// import haaram from "../assets/haaram.png";
// import ringline from "../assets/ringline.png";
// import earrings from "../assets/earrings.png";
// import childcat from "../assets/childcat.png";
// import mencat from "../assets/mencat.png";
// import womencat from "../assets/owmencat.png";
// import mangalsutra from "../assets/mangalsutra.png"
// const categories = [
//   { name: "Necklace", img: haaram },
//   { name: "Earrings", img: earrings },
//   { name: "Rings", img: mangalsutra },
//   { name: "Chains", img: haaram },
// ];

// const HomeScreen = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();

//   const handleProductPress = () => {
//     navigation.navigate('IndividualCategory');
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
//        <StatusBar
//         backgroundColor="#FFFFFF" // white background
//         barStyle="dark-content"   // dark text & icons
//       />
//       <ScrollView
//         style={[
//           styles.container,
//           { paddingTop: insets.top,  },
//         ]}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <Image
//             source={require("../assets/geethalogo.png")}
//             style={styles.logo}
//           />
    
//           <View style={styles.headerIcons}  >
//       <TouchableOpacity onPress={()=>{navigation.navigate("WishList")}} >
//         <Ionicons
//               name="heart-outline"
//               size={22}
//               color="rgba(8, 118, 90, 1)"
//               style={styles.icon}
//             />
//       </TouchableOpacity>
            
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

//         {/* Banner Carousel */}
//         <View style={styles.bannerWrapper}>
//           <Carousel
//             width={width}
//             height={responsiveHeight(28)}
//             data={[1, 2, 3]}
//             autoPlay
//             scrollAnimationDuration={1200}
//             renderItem={() => (
//               <Image
//                 source={require("../assets/banner.png")}
//                 style={styles.bannerImage}
//               />
//             )}
//           />
//         </View>

//         {/* Geetha’s Collection */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Geetha’s Collection</Text>
//           <Text style={styles.sectionSubtitle}>
//             Discover treasures that speak your style!
//           </Text>

//           <Image source={ringline} style={styles.sectionDivider} />

//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             {[1, 2, 3].map((_, i) => (
//               <TouchableOpacity key={i} onPress={handleProductPress} style={styles.collectionCard}>
//                 <Image 
//                   source={i === 0 || i === 2 ? earrings : require("../assets/mangalsutra.png")} 
//                   style={styles.collectionImage} 
//                 />
//                 <TouchableOpacity style={styles.exploreBtn}>
//                   <Text style={styles.exploreText}>Explore</Text>
//                 </TouchableOpacity>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>

//         {/* 22 Karat Touch */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>22 Karat Touch</Text>
//           <Text style={styles.sectionSubtitle}>
//             A golden promise of purity and perfection
//           </Text>

//           <Image source={ringline} style={styles.sectionDivider} />

//           <TouchableOpacity style={styles.karatWrapper} onPress={handleProductPress}>
//             <Image source={haaram} style={styles.karatImage} />
//             <TouchableOpacity style={styles.exploreNowOverlay}>
//               <Text style={styles.exploreNowText}>Explore Now</Text>
//             </TouchableOpacity>
//           </TouchableOpacity>
//         </View>

//         {/* Mangalsutra & Earrings */}
//         <View style={[styles.section, { marginVertical: 0 }]}>
//           <View style={styles.twoGridRow}>
//             <TouchableOpacity style={styles.twoGridItem} onPress={handleProductPress}>
//               <Image
//                 source={require("../assets/mangalsutra.png")}
//                 style={styles.twoGridImage}
//               />
//               <View style={styles.imageOverlay}>
//                 <Text style={styles.imageOverlayText}>Mangalsutra</Text>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.twoGridItem} onPress={handleProductPress}>
//               <Image
//                 source={require("../assets/earrings.png")}
//                 style={styles.twoGridImage}
//               />
//               <View style={styles.imageOverlay}>
//                 <Text style={styles.imageOverlayText}>Earrings</Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Brilliant Diamonds (Horizontal Scroll) */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Brilliant Diamonds</Text>
//           <Text style={styles.sectionSubtitle}>
//             Crafted for elegance, made to sparkle
//           </Text>
//           <Image source={ringline} style={styles.sectionDivider} />

//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             {[
//               { label: "Earrings", img: require("../assets/earrings.png") },
//               { label: "Rings", img: require("../assets/haaram.png") },
//               { label: "Necklace", img: require("../assets/mangalsutra.png") },
//               { label: "Bracelets", img: require("../assets/haaram.png") },
//               { label: "Bangles", img: require("../assets/earrings.png") },
//             ].map((item, index) => (
//               <TouchableOpacity key={index} onPress={handleProductPress} style={styles.scrollCard}>
//                 <Image source={item.img} style={styles.scrollImage} />
//                 <View style={styles.imageOverlay}>
//                   <Text style={styles.imageOverlayText}>{item.label}</Text>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>

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
//         {/* Style Your Shine */}
// <View style={styles.section}>
//   <Text style={styles.sectionTitle}>Style Your Shine</Text>
//   <Text style={styles.sectionSubtitle}>
//     Discover curated looks for every mood
//   </Text>
//   <Image source={ringline} style={styles.sectionDivider} />

//   <View style={styles.shineOuterWrapper}>
//     <Carousel
//       autoPlayInterval={2500}
//       data={[1, 2, 3, 4]}
//       height={responsiveHeight(40)}  // Reduced from 50% to remove extra vertical space below
//       loop
//       width={responsiveWidth(80)}  // Decreased from 80 to 70 for a more compact width (adjust this number further if needed, e.g., to 60)
//       mode="parallax"
//       modeConfig={{
//         parallaxScrollingScale: 0.9,
//         parallaxScrollingOffset: 60,
//       }}
//       scrollAnimationDuration={1200}
//       renderItem={() => (
//         <TouchableOpacity onPress={handleProductPress} style={styles.shineCardContainer}>
//           <Image
//             source={require("../assets/shine.png")}
//             style={styles.shineCardImage}
//           />
//         </TouchableOpacity>
//       )}
//     />
//   </View>
// </View>

//         {/* Couple Rings (Full Width Carousel) */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Couple Rings</Text>
//           <Text style={styles.sectionSubtitle}>
//             Crafted to celebrate your unbreakable bond
//           </Text>
//           <Image source={ringline} style={styles.sectionDivider} />

//           <View style={styles.fullWidthCarouselWrapper}>
//             <Carousel
//               width={width}
//               height={responsiveHeight(25)}
//               autoPlay
//               loop
//               scrollAnimationDuration={1200}
//               data={[1, 2, 3, 4]}
//               renderItem={({ index }) => (
//                 <TouchableOpacity key={index} onPress={handleProductPress}>
//                   <Image
//                     source={require("../assets/banner.png")}
//                     style={styles.fullWidthCarouselImage}
//                   />
//                 </TouchableOpacity>
//               )}
//             />
//           </View>

//           <View style={styles.coupleBanner}>
//             <Text style={styles.coupleBannerTitle}>Luxury Couple Rings</Text>
//             <Text style={styles.coupleBannerText}>
//               Get 20% off discount on your first purchase
//             </Text>
//           </View>
//         </View>
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
//     backgroundColor:"#fff",
    

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
//     borderRadius: 10,
//     overflow: "hidden",
//   },
//   bannerImage: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
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
//     borderWidth:0.5,
//     borderColor:"#08765A"
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
//   twoGridText: {
//     textAlign: "center",
//     paddingVertical: 8,
//     fontWeight: "600",
//     color: "#333",
//   },
//   genderRow: {
//   flexWrap: "wrap",
//   flexDirection: "row",
//   justifyContent: "space-between",
// },

// genderCard: {
//   width: "48%", // overridden by 100% for last item
//   backgroundColor: "#fff",
//   borderRadius: 10,
//   overflow: "hidden",
//   marginBottom: 10,
//   shadowColor: "#000",
//   shadowOpacity: 0.1,
//   shadowOffset: { width: 0, height: 1 },
//   elevation: 2,
// },

// genderImage: {
//   width: "100%",
//   height: responsiveHeight(20),
//   resizeMode: "cover",
// },

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
//   shineContainer: {
//   flexDirection: "row",
//   justifyContent: "center",
//   alignItems: "center",
//   marginTop: 10,
// },
// shineCard: {
//   alignItems: "center",
// },
// shineLabel: {
//   fontSize: responsiveFontSize(2),
//   fontWeight: "600",
//   color: "#333",
//   marginBottom: 8,
// },
// shineImage: {
//   width: responsiveWidth(80),
//   height: responsiveHeight(30),
//   borderRadius: 10,
//   resizeMode: "cover",
// },

// coupleWrapper: {
//   flexDirection: "row",
//   justifyContent: "space-around",
//   marginTop: 10,
// },
// coupleImageLeft: {
//   width: responsiveWidth(40),
//   height: responsiveHeight(22),
//   borderRadius: 10,
//   resizeMode: "cover",
// },
// coupleImageRight: {
//   width: responsiveWidth(40),
//   height: responsiveHeight(22),
//   borderRadius: 10,
//   resizeMode: "cover",
// },
// coupleBanner: {
//   backgroundColor: "rgba(8, 118, 90, 0.1)",
//   borderRadius: 10,
//   padding: 15,
//   marginTop: 15,
//   alignItems: "center",
// },
// coupleBannerTitle: {
//   fontSize: responsiveFontSize(2),
//   fontWeight: "700",
//   color: "rgba(8, 118, 90, 1)",
// },
// coupleBannerText: {
//   fontSize: responsiveFontSize(1.6),
//   color: "#333",
//   marginTop: 5,
//   textAlign: "center",
//   width: "90%",
// },
// coupleCarouselWrapper: {
//   alignItems: "center",
//   marginTop: 10,
// },

// coupleCarouselCard: {
//   borderRadius: 10,
//   overflow: "hidden",
//   shadowColor: "#000",
//   shadowOpacity: 0.15,
//   shadowOffset: { width: 0, height: 2 },
//   elevation: 3,
// },

// coupleCarouselImage: {
//   width: "100%",
//   height: "100%",
//   resizeMode: "cover",
//   borderRadius: 10,
// },
// shineCarouselCard: {
//   borderRadius: 12,
//   overflow: "hidden",
//   position: "relative",
//   marginVertical: 10,
//   shadowColor: "#000",
//   shadowOpacity: 0.15,
//   shadowOffset: { width: 0, height: 2 },
//   elevation: 4,
// },

// shineCarouselImage: {
//   width: 224,
//   height: 284,
//   borderRadius: 12,
//   resizeMode: "cover",
//   alignSelf: "center",
// },

// shineCarouselOverlay: {
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   right: 0,
//   backgroundColor: "rgba(0, 0, 0, 0.3)",
//   paddingVertical: 10,
//   alignItems: "center",
// },

// shineCarouselText: {
//   color: "#fff",
//   fontSize: responsiveFontSize(2),
//   fontWeight: "600",
// },
// imageOverlay: {
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   right: 0,
//   backgroundColor: "rgba(0, 0, 0, 0.45)",
//   paddingVertical: 6,
//   alignItems: "center",
// },
// imageOverlayText: {
//   color: "#fff",
//   fontWeight: "600",
//   fontSize: responsiveFontSize(1.8),
// },
// exploreRow: {
//   flexDirection: "row",
//   alignItems: "center",
// },
// scrollCard: {
//   width: responsiveWidth(42),
//   height: responsiveHeight(22),
//   borderRadius: 10,
//   marginRight: 12,
//   overflow: "hidden",
//   backgroundColor: "#fff",
//   shadowColor: "#000",
//   shadowOpacity: 0.1,
//   shadowOffset: { width: 0, height: 1 },
//   elevation: 3,
// },
// scrollImage: {
//   width: "100%",
//   height: "100%",
//   resizeMode: "cover",
// },

// shineOuterWrapper: {
//   alignItems: "center",
//   justifyContent: "center",
// },
// shineCardContainer: {
//   alignItems: "center",
//   borderRadius: 12,
//   overflow: "hidden",
//   // backgroundColor: "#fff",
//   // shadowColor: "#000",
//   // shadowOpacity: 0.15,
//   // shadowOffset: { width: 0, height: 2 },
//   // elevation: 3,
// },
// shineCardImage: {
//   width: responsiveWidth(70),  // Synced to match carousel width (was 70, but now explicit)
//   height: responsiveHeight(40),
//   borderRadius: 12,
//   resizeMode: "cover",
// },
// shineCardTitle: {
//   position: "absolute",
//   bottom: 10,
//   alignSelf: "center",
//   backgroundColor: "#fff",
//   paddingHorizontal: 16,
//   paddingVertical: 4,
//   borderRadius: 20,
//   fontSize: responsiveFontSize(1.8),
//   fontWeight: "600",
//   color: "#08765A",
// },

// fullWidthCarouselWrapper: {
//   alignItems: "center",
//   marginTop: 10,
//   borderRadius: 10,
//   overflow: "hidden",
// },
// fullWidthCarouselImage: {
//   width: width,
//   height: responsiveHeight(25),
//   resizeMode: "cover",
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
  SafeAreaView,StatusBar
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

const { width } = Dimensions.get("window");

// import your local images
import haaram from "../assets/haaram.png";
import ringline from "../assets/ringline.png";
import earrings from "../assets/earrings.png";
import childcat from "../assets/childcat.png";
import mencat from "../assets/mencat.png";
import womencat from "../assets/owmencat.png";
import mangalsutra from "../assets/mangalsutra.png"
const categories = [
  { name: "Necklace", img: haaram },
  { name: "Earrings", img: earrings },
  { name: "Mangalsutram", img: mangalsutra },
  { name: "Chains", img: haaram },
];

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleProductPress = () => {
    navigation.navigate('IndividualCategory');
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
       <StatusBar
        backgroundColor="#FFFFFF" // white background
        barStyle="dark-content"   // dark text & icons
      />
      <ScrollView
        style={[
          styles.container,
          { paddingTop: insets.top },
        ]}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 150, // Adjust 90 to match your tab bar height (measure or test on device); this prevents overlap on Android 15
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../assets/geethalogo.png")}
            style={styles.logo}
          />
    
          <View style={styles.headerIcons}  >
      <TouchableOpacity onPress={()=>{navigation.navigate("WishList")}} >
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

        {/* Banner Carousel */}
        <View style={styles.bannerWrapper}>
          <Carousel
            width={width}
            height={responsiveHeight(28)}
            data={[1, 2, 3]}
            autoPlay
            scrollAnimationDuration={1200}
            renderItem={() => (
              <Image
                source={require("../assets/banner.png")}
                style={styles.bannerImage}
              />
            )}
          />
        </View>

        {/* Geetha’s Collection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Geetha’s Collection</Text>
          <Text style={styles.sectionSubtitle}>
            Discover treasures that speak your style!
          </Text>

          <Image source={ringline} style={styles.sectionDivider} />

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((_, i) => (
              <TouchableOpacity key={i} onPress={handleProductPress} style={styles.collectionCard}>
                <Image 
                  source={i === 0 || i === 2 ? earrings : require("../assets/mangalsutra.png")} 
                  style={styles.collectionImage} 
                />
                <TouchableOpacity style={styles.exploreBtn}>
                  <Text style={styles.exploreText}>Explore</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 22 Karat Touch */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>22 Karat Touch</Text>
          <Text style={styles.sectionSubtitle}>
            A golden promise of purity and perfection
          </Text>

          <Image source={ringline} style={styles.sectionDivider} />

          <TouchableOpacity style={styles.karatWrapper} onPress={handleProductPress}>
            <Image source={earrings} style={styles.karatImage} />
            <TouchableOpacity style={styles.exploreNowOverlay}>
              <Text style={styles.exploreNowText}>Explore Now</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Mangalsutra & Earrings */}
        <View style={[styles.section, { marginVertical: 0 }]}>
          <View style={styles.twoGridRow}>
            <TouchableOpacity style={styles.twoGridItem} onPress={handleProductPress}>
              <Image
                source={require("../assets/haaram.png")}
                style={styles.twoGridImage}
              />
              <View style={styles.imageOverlay}>
                <Text style={styles.imageOverlayText}>Mangalsutra</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.twoGridItem} onPress={handleProductPress}>
              <Image
                source={require("../assets/mangalsutra.png")}
                style={styles.twoGridImage}
              />
              <View style={styles.imageOverlay}>
                <Text style={styles.imageOverlayText}>Earrings</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Brilliant Diamonds (Horizontal Scroll) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Brilliant Diamonds</Text>
          <Text style={styles.sectionSubtitle}>
            Crafted for elegance, made to sparkle
          </Text>
          <Image source={ringline} style={styles.sectionDivider} />

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { label: "Earrings", img: require("../assets/earrings.png") },
              { label: "Rings", img: require("../assets/haaram.png") },
              { label: "Necklace", img: require("../assets/mangalsutra.png") },
              { label: "Bracelets", img: require("../assets/haaram.png") },
              { label: "Bangles", img: require("../assets/earrings.png") },
            ].map((item, index) => (
              <TouchableOpacity key={index} onPress={handleProductPress} style={styles.scrollCard}>
                <Image source={item.img} style={styles.scrollImage} />
                <View style={styles.imageOverlay}>
                  <Text style={styles.imageOverlayText}>{item.label}</Text>
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
        {/* Style Your Shine */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Style Your Shine</Text>
  <Text style={styles.sectionSubtitle}>
    Discover curated looks for every mood
  </Text>
  <Image source={ringline} style={styles.sectionDivider} />

  <View style={styles.shineOuterWrapper}>
    <Carousel
      autoPlayInterval={2500}
      data={[1, 2, 3, 4]}
      height={responsiveHeight(40)}  // Reduced from 50% to remove extra vertical space below
      loop
      width={responsiveWidth(80)}  // Decreased from 80 to 70 for a more compact width (adjust this number further if needed, e.g., to 60)
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 60,
      }}
      scrollAnimationDuration={1200}
      renderItem={() => (
        <TouchableOpacity onPress={handleProductPress} style={styles.shineCardContainer}>
          <Image
            source={require("../assets/shine.png")}
            style={styles.shineCardImage}
          />
        </TouchableOpacity>
      )}
    />
  </View>
</View>

        {/* Couple Rings (Full Width Carousel) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Couple Rings</Text>
          <Text style={styles.sectionSubtitle}>
            Crafted to celebrate your unbreakable bond
          </Text>
          <Image source={ringline} style={styles.sectionDivider} />

          <View style={styles.fullWidthCarouselWrapper}>
            <Carousel
              width={width}
              height={responsiveHeight(25)}
              autoPlay
              loop
              scrollAnimationDuration={1200}
              data={[1, 2, 3, 4]}
              renderItem={({ index }) => (
                <TouchableOpacity key={index} onPress={handleProductPress}>
                  <Image
                    source={require("../assets/banner.png")}
                    style={styles.fullWidthCarouselImage}
                  />
                </TouchableOpacity>
              )}
            />
          </View>

          {/* <View style={styles.coupleBanner}>
            <Text style={styles.coupleBannerTitle}>Luxury Couple Rings</Text>
            <Text style={styles.coupleBannerText}>
              Get 20% off discount on your first purchase
            </Text>
          </View> */}
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
  categoryScroll: { marginVertical: 10 },
  categoryItem: {
    alignItems: "center",
    marginRight: 15,
    backgroundColor:"#fff",
    

  },
  categoryImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    resizeMode: "cover",
  },
  categoryName: {
    marginTop: 5,
    fontSize: responsiveFontSize(1.6),
    fontWeight: "500",
  },
  bannerWrapper: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
    borderWidth:0.5,
    borderColor:"#08765A"
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
  twoGridText: {
    textAlign: "center",
    paddingVertical: 8,
    fontWeight: "600",
    color: "#333",
  },
  genderRow: {
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "space-between",
},

genderCard: {
  width: "48%", // overridden by 100% for last item
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
  shineContainer: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 10,
},
shineCard: {
  alignItems: "center",
},
shineLabel: {
  fontSize: responsiveFontSize(2),
  fontWeight: "600",
  color: "#333",
  marginBottom: 8,
},
shineImage: {
  width: responsiveWidth(80),
  height: responsiveHeight(30),
  borderRadius: 10,
  resizeMode: "cover",
},

coupleWrapper: {
  flexDirection: "row",
  justifyContent: "space-around",
  marginTop: 10,
},
coupleImageLeft: {
  width: responsiveWidth(40),
  height: responsiveHeight(22),
  borderRadius: 10,
  resizeMode: "cover",
},
coupleImageRight: {
  width: responsiveWidth(40),
  height: responsiveHeight(22),
  borderRadius: 10,
  resizeMode: "cover",
},
coupleBanner: {
  backgroundColor: "rgba(8, 118, 90, 0.1)",
  borderRadius: 10,
  padding: 15,
  marginTop: 15,
  alignItems: "center",
},
coupleBannerTitle: {
  fontSize: responsiveFontSize(2),
  fontWeight: "700",
  color: "rgba(8, 118, 90, 1)",
},
coupleBannerText: {
  fontSize: responsiveFontSize(1.6),
  color: "#333",
  marginTop: 5,
  textAlign: "center",
  width: "90%",
},
coupleCarouselWrapper: {
  alignItems: "center",
  marginTop: 10,
},

coupleCarouselCard: {
  borderRadius: 10,
  overflow: "hidden",
  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowOffset: { width: 0, height: 2 },
  elevation: 3,
},

coupleCarouselImage: {
  width: "100%",
  height: "100%",
  resizeMode: "cover",
  borderRadius: 10,
},
shineCarouselCard: {
  borderRadius: 12,
  overflow: "hidden",
  position: "relative",
  marginVertical: 10,
  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowOffset: { width: 0, height: 2 },
  elevation: 4,
},

shineCarouselImage: {
  width: 224,
  height: 284,
  borderRadius: 12,
  resizeMode: "cover",
  alignSelf: "center",
},

shineCarouselOverlay: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  paddingVertical: 10,
  alignItems: "center",
},

shineCarouselText: {
  color: "#fff",
  fontSize: responsiveFontSize(2),
  fontWeight: "600",
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
  // backgroundColor: "#fff",
  // shadowColor: "#000",
  // shadowOpacity: 0.15,
  // shadowOffset: { width: 0, height: 2 },
  // elevation: 3,
},
shineCardImage: {
  width: responsiveWidth(70),  // Synced to match carousel width (was 70, but now explicit)
  height: responsiveHeight(40),
  borderRadius: 12,
  resizeMode: "cover",
},
shineCardTitle: {
  position: "absolute",
  bottom: 10,
  alignSelf: "center",
  backgroundColor: "#fff",
  paddingHorizontal: 16,
  paddingVertical: 4,
  borderRadius: 20,
  fontSize: responsiveFontSize(1.8),
  fontWeight: "600",
  color: "#08765A",
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


});