


import React, { useEffect,useCallback ,useState } from "react";
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
  StatusBar,RefreshControl,ActivityIndicator
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Carousel from "react-native-reanimated-carousel";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSharedValue } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import { DrawerActions } from "@react-navigation/native";
import { fetchDailyMetalRates } from '../redux/slices/schemeSlice';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CONTAINER_PADDING = 32; // Total padding (16 left + 16 right)
const GAP_SIZE = 8;           // Space between cards
const TOTAL_GAPS = GAP_SIZE * 2; // Two gaps between three cards
const CARD_WIDTH = (SCREEN_WIDTH - CONTAINER_PADDING - TOTAL_GAPS) / 3;
// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchBanners,
  fetchHomeSections,
} from "../redux/slices/categorySlice";
import {postPlayerId} from '../redux/slices/authSlice'
// Shimmer Placeholder
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const { width } = Dimensions.get("window");

// Local Assets


// Remote image sized to its real aspect ratio so banners show fully without cropping
const FitImage = ({ uri, style }) => {
  const [ratio, setRatio] = useState(16 / 9);
  useEffect(() => {
    if (!uri) return;
    Image.getSize(uri, (w, h) => w && h && setRatio(w / h), () => {});
  }, [uri]);
  return (
    <Image
      source={{ uri }}
      style={[style, { aspectRatio: ratio }]}
      resizeMode="contain"
    />
  );
};

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const progress = useSharedValue(0);
  const dispatch = useDispatch();
const { 
    metalRates, 
    metalRatesLoading, 
    metalRatesError 
  } = useSelector((state) => state.scheme || {});
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
 const { customerId, addressList = [], playerId } = useSelector((state) => state.Auth || {});
  // Find dynamic sections
  const categorySection = homeSections.find((s) => s.section_type === "Category");
  const diamondSection = homeSections.find((s) => s.section_type === "Diamond");
  const genderSection = homeSections.find((s) => s.section_type === "Gender");
const [selectedTab, setSelectedTab] = useState('Gold');
  const tabs = ['Gold', 'Silver', 'Platinum'];
  // TODO: Replace with actual logged-in user ID from auth
  

const [refreshing, setRefreshing] = React.useState(false);


const onRefresh = useCallback(async () => {
    setRefreshing(true);
    
    try {
      
      await Promise.all([
        dispatch(fetchCategories()).unwrap(),
        dispatch(fetchBanners()).unwrap(),
        dispatch(fetchHomeSections()).unwrap(),
        dispatch(fetchDailyMetalRates()).unwrap(),
        
      ]);
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);
useFocusEffect(
    useCallback(() => {
      // This runs every time the screen comes into focus (e.g., opened or navigated back to)
      if (customerId && playerId) { // ← Optional: Guard against undefined values to avoid unnecessary API calls
        dispatch(postPlayerId({
          userId: customerId,
          playerId: playerId,
        }));
        console.log("🔥 postPlayerId dispatched on focus:", { userId: customerId, playerId }); // ← Optional: For debugging
      }
    }, [dispatch, customerId, playerId]) // ← Include dependencies to recreate callback if they change
  );
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBanners());
    dispatch(fetchHomeSections());
    dispatch(fetchDailyMetalRates());
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
const getDisplayRates = () => {
    if (!metalRates) return [];
    if (selectedTab === 'Gold') {
      return [
        { type: '24K Gold /g', price: metalRates.gold_24k },
        { type: '22K Gold /g', price: metalRates.gold_22k },
        { type: '18K Gold /g', price: metalRates.gold_18k },
      ];
    } else if (selectedTab === 'Silver') {
      return [{ type: 'Silver /g', price: metalRates.silver_rate }];
    } else if (selectedTab === 'Platinum') {
      return [{ type: 'Platinum /g', price: metalRates.platinum_rate }];
    }
    return [];
  };

  const displayRates = getDisplayRates();

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
      <View style={styles.sectionDivider}>
        <View style={styles.dividerLine} />
        <Ionicons name="diamond-outline" size={18} color="#832729" style={{ marginHorizontal: 8 }} />
        <View style={styles.dividerLine} />
      </View>

      {/* Banner - Clickable */}
      <TouchableOpacity
        style={styles.diamondBannerWrapper}
        onPress={() => handleSectionNavigation(section)}
        activeOpacity={0.9}
      >
        <FitImage
          uri={section.banner_image}
          style={styles.diamondBannerImage}
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
    <View style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#832729" barStyle="light-content" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}

        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            colors={["#832729"]} // Android spinner color
            tintColor="#832729"   // iOS spinner color
          />
        }
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + responsiveHeight(1) }]}>
          
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{ padding: 8 }}
          >
            <Ionicons name="menu-outline" size={28} color="#fff" />
          </TouchableOpacity>

          <Image source={require("../assets/testlogo.png")} style={styles.logo} />

          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => navigation.navigate("WishList")}>
              <Ionicons name="heart-outline" size={22} color="#fff" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <Ionicons name="cart-outline" size={22} color="#fff" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <TouchableOpacity onPress={() => { navigation.navigate("SearchScreen") }}>
  <View style={styles.searchContainer}>
    <Ionicons name="search" size={20} color="#832729" style={{ marginRight: 8 }} />
    <TextInput
      placeholder="Search here your favourite Jewellery"
      placeholderTextColor="#999"
      style={styles.searchInput}
      editable={false}
      pointerEvents="none"
    />
    {/* <Ionicons name="filter-outline" size={20} color="#832729" style={{ marginLeft: 8 }} /> */}
  </View>
</TouchableOpacity>
       <View style={{ paddingHorizontal: 16, marginTop: 5, marginBottom: 12 }}>
  <Text 
    style={{ 
      fontSize: 16, 
      fontWeight: '700', 
      color: '#832729', 
      textTransform: 'uppercase', 
      // letterSpacing: 0.5 
    }}
  >
    Live Gold Rates
  </Text>
</View>
{/* Gold Rates with Tabs */}
<View style={styles.ratesWrapper}>
  <View style={styles.tabsContainer}>
    <View style={styles.tabsWrapper}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tabButton,
            selectedTab === tab && styles.selectedTabButton
          ]}
          onPress={() => setSelectedTab(tab)}
        >
          <Text style={[styles.tabText, selectedTab === tab && styles.selectedTabText]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={styles.liveIndicator}>
      <Text style={styles.liveText}>Live</Text>
      <Ionicons name="pulse" size={12} color="#0D5C4A" />
    </View>
  </View>

  {/* <View style={styles.ratesContainer}>
    {metalRatesLoading ? (
      <ActivityIndicator size="small" color="#832729" style={{ marginVertical: 20, width: '100%' }} />
    ) : displayRates.length > 0 ? (
      displayRates.map((rate, index) => (
        <View key={index} style={styles.rateCard}>
          <Text style={styles.rateType} numberOfLines={1}>{rate.type}</Text>
          <Text style={styles.ratePrice}>₹{rate.price?.toLocaleString('en-IN')}</Text>
        </View>
      ))
    ) : (
      <Text style={styles.errorRateText}>{metalRatesError || 'Rates unavailable'}</Text>
    )}
  </View> */}

  <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.ratesScrollContent}
  >
    {displayRates.map((rate, index) => (
      <View key={index} style={styles.rateCard}>
        <Text style={styles.rateType} numberOfLines={1} adjustsFontSizeToFit>
          {rate.type}
        </Text>
        <Text style={styles.ratePrice} numberOfLines={1} adjustsFontSizeToFit>
          ₹{rate.price?.toLocaleString('en-IN')}
        </Text>
       
      </View>
    ))}
  </ScrollView>
</View>

        {/* Smart Savings Scheme */}
        <View style={styles.section}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("GoldScheme")}>
            <LinearGradient colors={["#832729", "#3F0F11"]} style={styles.savingsSchemeCard}>
              <View style={styles.savingsLeftSection}>
                <Image source={require("../assets/goldhand.png")} style={styles.goldHandImage} />
              </View>
              <View style={[styles.savingsRightSection, { paddingRight: 20 }]}>
                <Text style={styles.savingsTitle}>Smart Savings Schemes</Text>
                <Text style={styles.savingsSubtitle}>
                  Join flexible gold saving plans and grow your wealth with ease.
                </Text>
              </View>
              <TouchableOpacity style={styles.savingsArrowButton} onPress={() => navigation.navigate("GoldScheme")}>
                <Ionicons name="chevron-forward" size={20} color="#832729" />
              </TouchableOpacity>
            </LinearGradient>
          </TouchableOpacity>
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
                  <Text style={styles.categoryName} numberOfLines={2}>
                    {category.category_name === "Earings" ? "Earrings" : category.category_name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        {/* Main Banner Carousel */}                                      
        <View style={styles.bannerWrapper}>
          {/* {bannersLoading ? (
            <View style={{ height: 320, justifyContent: 'center', alignItems: 'center' }}>
              <ShimmerPlaceHolder style={styles.bannerShimmer} />
            </View>
          ) : (
            <Carousel
              autoPlayInterval={3000}
              data={banners.length > 0 ? banners : []}
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
          )} */}

          {/* Main Banner Carousel */}
{banners.length > 0 && (
  <View style={styles.bannerWrapper}>
    {bannersLoading ? (
      <View style={{ height: 320, justifyContent: 'center', alignItems: 'center' }}>
        <ShimmerPlaceHolder style={styles.bannerShimmer} />
      </View>
    ) : (
      <Carousel
        autoPlayInterval={3000}
        data={banners}
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
        // Only claim horizontal swipes so vertical drags scroll the page
        onConfigurePanGesture={(gesture) => {
          gesture.activeOffsetX([-10, 10]).failOffsetY([-10, 10]);
        }}
        renderItem={renderBannerItem}
      />
    )}
  </View>
)}
        </View>

        {categorySection && renderCategoryOrDiamondSection(categorySection, "Category")}
  {diamondSection && renderCategoryOrDiamondSection(diamondSection, "Diamond")}

        {/* Dynamic Gender Section */}
      
  {genderSection && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{genderSection.section_title}</Text>
    <Text style={styles.sectionSubtitle}>{genderSection.section_subtitle}</Text>
    <View style={styles.sectionDivider}>
        <View style={styles.dividerLine} />
        <Ionicons name="diamond-outline" size={18} color="#832729" style={{ marginHorizontal: 8 }} />
        <View style={styles.dividerLine} />
      </View>

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
        <FitImage
          uri={genderSection.banner_image}
          style={styles.fullWidthGenderBannerImage}
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
    </View>
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
    backgroundColor: "#832729",
    marginHorizontal: -responsiveWidth(3),
    paddingHorizontal: responsiveWidth(3),
    paddingBottom: responsiveHeight(1),
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
  categoryContentContainer: { paddingHorizontal: 12, paddingTop: 4, paddingBottom: 10 },
  categoryItem: {
    width: 104,
    alignItems: "center",
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#832729",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 0.5,
    borderColor: "#EFE3E3",
  },
  categoryImage: {
    width: "100%",
    height: 100,
  },
  categoryName: {
    width: "100%",
    height: responsiveFontSize(1.4) * 2.6 + 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: responsiveFontSize(1.4),
    lineHeight: responsiveFontSize(1.4) * 1.3,
    fontWeight: "600",
    color: "#832729",
    letterSpacing: 0.3,
    textAlign: "center",
    textAlignVertical: "center",
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
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    color: "#832729",
    fontFamily:"SF-Pro-Display-LightItalic"
  },
  sectionSubtitle: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    marginVertical: 8,
  },
  sectionDivider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#832729" },
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
  savingsTitle: { color: "#fff", fontSize: 14, fontWeight: "700" },
  savingsSubtitle: { color: "#fff", fontSize: 12, opacity: 0.9, marginTop: 4 },
  savingsArrowButton: {
    position: "absolute",
    right: 15,
    top: "50%",
    transform: [{ translateY: -15 }],
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 5,
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
  diamondBannerImage: { width: "100%" },
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
    marginBottom:1,
    backgroundColor: "#fff",
  },
  genderHorizontalImage: { width: "100%", height: responsiveHeight(22) },
  genderHorizontalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#fff",
  },
  genderHorizontalLabel: { fontSize: 18, fontWeight: "600", color: "#832729" },
  genderExplore: { color: "#832729", fontWeight: "600" },
  exploreRow: { flexDirection: "row", alignItems: "center" },
  fullWidthGenderBannerWrapper: {
    marginTop: 20,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 6,
  },
  fullWidthGenderBannerImage: { width: "100%" },
  fullWidthCarouselImage: { width: "100%", height: "100%" },
  errorText: { paddingLeft: 20, color: "red", fontSize: 16 },
  emptyText: { paddingLeft: 20, color: "#666", fontSize: 16 },

 ratesWrapper: {
    backgroundColor: '#fff',
    marginTop: 5,
    paddingTop: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  tabsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedTabButton: {
    backgroundColor: '#832729',
    borderColor: '#832729',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  selectedTabText: {
    color: '#fff',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0D5C4A',
    marginRight: 2,
  },
  ratesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingBottom: 10,
    gap: 8,
  },
  rateCard: {
    // Math logic: (Total Width - Padding - Gaps) / 3
    width: (width - 25- 16) / 3, 
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    alignItems: 'center',
    marginBottom:10
  },
  rateType: {
    fontSize: 10,
    fontWeight: '600',
    color: '#555',
  },
  ratePrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#832729',
    marginTop: 2,
  },
  errorRateText: {
    textAlign: 'center',
    color: '#555',
    fontSize: 12,
    width: '100%',
    paddingVertical: 10,
  },


 ratesContainer: {
  flexDirection: 'row',
  flexWrap: 'nowrap',       // Force them to stay on one line
  justifyContent: 'center', // Centers the group of 3
  paddingHorizontal: 16,    // Matches the CONTAINER_PADDING/2
  paddingBottom: 10,
  width: '100%',
},
rateCard: {
  width: CARD_WIDTH,        // Our calculated width
  backgroundColor: '#fff',
  borderRadius: 12,
  paddingVertical: 10,
  paddingHorizontal: 0,     // Minimal internal padding as requested
  marginHorizontal: GAP_SIZE / 2, // Distributes gap evenly
  borderWidth: 1,
  borderColor: '#EEEEEE',
  alignItems: 'center',
},
rateType: {
  fontSize: 10,
  fontWeight: '600',
  color: '#555',
  width: '95%',             // Small buffer to prevent edge-touching
  textAlign: 'center',
},
ratePrice: {
  fontSize: 12,             // Slightly smaller to ensure fit
  fontWeight: '700',
  color: '#832729',
  marginTop: 2,
  width: '95%',
  textAlign: 'center',
},

ratesWrapper: {
    backgroundColor: '#fff',
    marginTop: 8,
    paddingBottom: 12,
  },
  ratesScrollContent: {
    paddingHorizontal: 16, // Padding at the start and end of scroll
    gap: 8,                // Space between cards
  },
  rateCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 2, // Low horizontal padding as requested
    borderWidth: 1,
    borderColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateType: {
    fontSize: 10,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
  },
  ratePrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#832729',
    marginTop: 2,
    textAlign: 'center',
  },
  liveChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  liveChangeText: {
    fontSize: 9,
    color: '#0D5C4A',
    fontWeight: '600',
    marginRight: 2,
  }, 
});

export default HomeScreen;




