import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Dimensions,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const SchemeDetailsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const howItWorks = [
    'Choose a fixed monthly deposit amount',
    'Pay regularly through online or offline payments',
    'Enjoy discount benefits on each instalment',
    'Redeem gold value with flexibility up to 100% advance',
    'Purchase at the prevailing gold price with no additional charges after 11 months'
  ];

  const schemeHighlights = [
    'Benefit 1: No waiting period',
    'Benefit 2: Transparent pricing with current market rates',
    'Benefit 3: Purchase at the prevailing gold add-ons on redemption',
    'Benefit 4: Lifetime investment flexibility and tax benefits',
    'Benefit 5: Advance payment allowed with no additional charges up to maximum'
  ];

  const termsAndConditions = [
    'The customer must be 18 years or above aged 18 and above with valid identity',
    'Monthly deposits must be paid regularly throughout the scheme tenure',
    'A grace period is 7 working days. Beyond this, re-registration is required otherwise plan is cancelled',
    'Discount benefits can be availed only on applicable purchases',
    'Deferred or missed payments may result in loss of discount benefits and scheme benefits',
    'Gold value fluctuates with current market rates',
    'Purchase requires ID-proof and address receipt',
    'The scheme is non-transferable among members'
  ];

  // Calculate bottom padding for button (tab bar height + safe area)
  const TAB_BAR_HEIGHT = 60; // Approximate tab bar height
  const bottomButtonPadding = Math.max(insets.bottom, 10) + TAB_BAR_HEIGHT;

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Geeta Gold Plus</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottomButtonPadding + 90 }
        ]}
      >
        {/* Banner with margin */}
        <View style={styles.bannerWrapper}>
          <ImageBackground
            source={require('../assets/schemebanner.png')}
            style={styles.banner}
            resizeMode="cover"
            imageStyle={styles.bannerImageStyle}
          >
            
          </ImageBackground>
        </View>

        {/* About the Scheme */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the Scheme</Text>
          <Text style={styles.sectionText}>
            Geeta Gold Plus is a flexible, secure scheme that allows to purchase gold monthly or annually with exclusive rewards. Plan and invest with flexibility at attractive market rates!
          </Text>
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          {howItWorks.map((item, index) => (
            <View key={index} style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Scheme Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scheme Highlights</Text>
          {schemeHighlights.map((item, index) => (
            <View key={index} style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Terms & Conditions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Terms & Conditions</Text>
          {termsAndConditions.map((item, index) => (
            <View key={index} style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View 
        style={[
          styles.bottomContainer, 
          { 
            paddingBottom: Math.max(insets.bottom, 10) ,
            // bottom: TAB_BAR_HEIGHT 
          }
        ]}
      >
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
  bannerWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  banner: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    overflow: 'hidden',
  },
  bannerImageStyle: {
    borderRadius: 16,
  },
  bannerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.95,
  },
  bannerTerms: {
    fontSize: 11,
    color: '#FFFFFF',
    marginTop: 12,
    opacity: 0.85,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingRight: 8,
  },
  bullet: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 8,
    marginTop: -2,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  applyButton: {
    backgroundColor: '#0D5C4A',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default SchemeDetailsScreen;
