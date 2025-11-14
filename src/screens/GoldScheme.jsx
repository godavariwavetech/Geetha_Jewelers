import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  ImageBackground
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 25) / 3; // Equal width for 3 cards with padding
const BANNER_HEIGHT = CARD_WIDTH; // Make banner height equal to card width for square proportions

const GoldScheme = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Gold');

  const tabs = ['Gold', 'Silver', 'Platinum'];

  const goldRates = [
    {
      type: '24K Gold /g',
      price: '₹12,322',
      change: '+ ₹120',
      isPositive: true
    },
    {
      type: '22K Gold /g',
      price: '₹11,295',
      change: '+ ₹110',
      isPositive: true
    },
    {
      type: '18K Gold /g',
      price: '₹9,242',
      change: '+ ₹90',
      isPositive: true
    }
  ];

  const banners = [
    { id: 1, disabled: false },
    { id: 2, disabled: true },
    { id: 3, disabled: true },
    { id: 4, disabled: true }
  ];

  const handleBannerPress = (banner) => {
    if (!banner.disabled) {
      navigation.navigate('SchemeDetailsScreen');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gold Rates</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 }
        ]}
      >
        {/* Title and Date */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Gold Rate in Rajahmundry</Text>
          <Text style={styles.dateText}>10 November 2025</Text>
        </View>

        {/* Tabs */}
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
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === tab && styles.selectedTabText
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Gold Coin Icon */}
          <View style={styles.coinIconContainer}>
            <Image
              source={require('../assets/coins.png')}
              style={styles.coinIcon}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Gold Rate Cards */}
        <View style={styles.ratesContainer}>
          {goldRates.map((rate, index) => (
            <View key={index} style={styles.rateCard}>
              <Text style={styles.rateType}>{rate.type}</Text>
              <Text style={styles.ratePrice}>{rate.price}</Text>
              <View style={styles.changeContainer}>
                <Text style={[styles.changeText, rate.isPositive && styles.positiveChange]}>
                  {rate.change}
                </Text>
                <Ionicons 
                  name={rate.isPositive ? "arrow-up" : "arrow-down"} 
                  size={12} 
                  color={rate.isPositive ? "#00A86B" : "#FF0000"} 
                />
              </View>
            </View>
          ))}
        </View>

        {/* Promotional Banners */}
        <View style={styles.bannersContainer}>
          {banners.map((banner, index) => (
            <View 
              key={banner.id} 
              style={[
                styles.promoBannerWrapper,
                banner.disabled && styles.disabledBanner
              ]}
            >
              <TouchableOpacity 
                activeOpacity={banner.disabled ? 1 : 0.7}
                disabled={banner.disabled}
                onPress={() => handleBannerPress(banner)}
                style={styles.bannerTouchable}
              >
                <ImageBackground
                  source={require('../assets/schemebanner.png')}
                  style={styles.promoBanner}
                  resizeMode="cover"
                  imageStyle={styles.bannerImageStyle}
                >
                  {/* Banner Content - Empty as per your commented code */}
                </ImageBackground>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
    width: 32,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  headerPlaceholder: {
    width: 32,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  titleSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    // paddingVertical: 16,
    backgroundColor: '#fff',
  },
  tabsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedTabButton: {
    backgroundColor: '#0D5C4A',
    borderColor: '#0D5C4A',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  selectedTabText: {
    color: '#fff',
  },
  coinIconContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinIcon: {
    width: 60,
    height: 60,
  },
  ratesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
    gap: 12,
  },
  rateCard: {
    width: "30%",
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  rateType: {
    fontSize: 11,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  ratePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#00A86B',
    marginRight: 4,
  },
  positiveChange: {
    color: '#00A86B',
  },
  bannersContainer: {
    paddingTop: 20,
    gap: 12,
  },
  promoBannerWrapper: {
    marginBottom: 12,
    width: "100%",
    overflow: 'hidden',
    borderRadius: 25,
  },
  disabledBanner: {
    opacity: 0.4,
  },
  bannerTouchable: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
  },
  promoBanner: {
    height: BANNER_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bannerImageStyle: {
    borderRadius: 25,
  },
});

export default GoldScheme;