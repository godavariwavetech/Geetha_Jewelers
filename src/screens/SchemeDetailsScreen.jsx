// import React, { useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   ImageBackground,
//   Dimensions,
//   Platform,
//   ActivityIndicator
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';

// // Import Thunk
// import { fetchSchemeBanners } from '../redux/slices/schemeSlice';

// const { width } = Dimensions.get('window');

// const SchemeDetailsScreen = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const route = useRoute();
//   const dispatch = useDispatch();

//   // 1. Get Banner from Navigation Params
//   const { bannerImage } = route.params || {};

//   // 2. Get Banners from Redux Store
//   const { schemeBanners, bannersLoading } = useSelector((state) => state.scheme || {});

//   // 3. Fetch banners on mount if store is empty (Handles direct navigation/refresh)
//   useEffect(() => {
//     if (!schemeBanners || schemeBanners.length === 0) {
//       dispatch(fetchSchemeBanners());
//     }
//   }, [dispatch, schemeBanners]);

//   // Logic to determine which image to show
//   // Priority: Param -> Redux (First Banner) -> Static Fallback
//   const displayImage = bannerImage 
//     ? { uri: bannerImage } 
//     : (schemeBanners && schemeBanners.length > 0) 
//       ? { uri: schemeBanners[0].banner_image } 
//       : require('../assets/schemebanner.png');

//   // ... (Content Arrays remain same) ...
//   const howItWorks = [
//     'Choose a fixed monthly deposit amount.',
//     'Pay every month for the selected tenure.',
//     'On maturity, use the total savings + applicable scheme benefits to purchase gold jewellery.'
//   ];
//   const schemeHighlights = [
//     'Secure monthly saving plan.',
//     'Purchase at the prevailing gold rate on redemption.',
//     'Attractive making charge and wastage benefits (as applicable).'
//   ];
//   const termsAndConditions = [
//     'The scheme is open to customers aged 18 and above with valid ID proof.',
//     'Monthly deposits must be paid regularly throughout the chosen tenure.',
//     'On maturity and full payment, gold jewellery can be purchased equal to the deposit value plus applicable scheme benefits.',
//     'Benefits apply only to gold jewellery and exclude coins, bullion, or silver items.',
//     'Delayed or missed payments may result in loss or reduction of benefits.',
//     'Premature withdrawals will not receive scheme benefits; only the deposited amount can be used for jewellery purchase.',
//     'Redemption requires ID proof and scheme receipts/passbook.',
//     'Standard making charges and wastage apply unless discount benefits are specified at enrollment.',
//     'Refunds are not permitted.'
//   ];

//   const TAB_BAR_HEIGHT = 60;
//   const bottomButtonPadding = Math.max(insets.bottom, 10) + TAB_BAR_HEIGHT;

//   return (
//     <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity 
//           onPress={() => navigation.goBack()} 
//           style={styles.backButton}
//         >
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Scheme Details</Text>
//         <View style={styles.headerPlaceholder} />
//       </View>

//       <ScrollView 
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={[
//           styles.scrollContent,
//           { paddingBottom: bottomButtonPadding + 90 }
//         ]}
//       >
//         {/* Banner with margin */}
//         <View style={styles.bannerWrapper}>
//           {bannersLoading && !displayImage ? (
//              <View style={[styles.banner, {backgroundColor: '#eee'}]}>
//                 <ActivityIndicator color="#832729" />
//              </View>
//           ) : (
//             <ImageBackground
//               source={displayImage}
//               style={styles.banner}
//               resizeMode="cover"
//               imageStyle={styles.bannerImageStyle}
//             />
//           )}
//         </View>

//         {/* About the Scheme */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>About the Scheme</Text>
//           <Text style={styles.sectionText}>
//             A smart and secure way to save monthly and purchase gold jewellery at maturity with exclusive benefits.
//           </Text>
//         </View>

//         {/* How It Works */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>How It Works</Text>
//           {howItWorks.map((item, index) => (
//             <View key={index} style={styles.bulletItem}>
//               <Text style={styles.bullet}>•</Text>
//               <Text style={styles.bulletText}>{item}</Text>
//             </View>
//           ))}
//         </View>

//         {/* Scheme Highlights */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Scheme Highlights</Text>
//           {schemeHighlights.map((item, index) => (
//             <View key={index} style={styles.bulletItem}>
//               <Text style={styles.bullet}>•</Text>
//               <Text style={styles.bulletText}>{item}</Text>
//             </View>
//           ))}
//         </View>

//         {/* Terms & Conditions */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Terms & Conditions</Text>
//           {termsAndConditions.map((item, index) => (
//             <View key={index} style={styles.bulletItem}>
//               <Text style={styles.numberBullet}>{index + 1}.</Text>
//               <Text style={styles.bulletText}>{item}</Text>
//             </View>
//           ))}
//         </View>
//       </ScrollView>

//       {/* Fixed Bottom Button */}
//       <View 
//         style={[
//           styles.bottomContainer, 
//           { paddingBottom: Math.max(insets.bottom, 10) }
//         ]}
//       >
//         <TouchableOpacity 
//           style={styles.applyButton}
//           onPress={() => navigation.navigate('SchemeApplicationScreen')}
//         >
//           <Text style={styles.applyButtonText}>Apply Now</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
//   backButton: {
//     padding: 4,
//     width: 32,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#000',
//     flex: 1,
//     textAlign: 'center',
//   },
//   headerPlaceholder: {
//     width: 32,
//   },
//   scrollContent: {
//     paddingBottom: 20,
//   },
//   bannerWrapper: {
//     paddingHorizontal: 16,
//     paddingTop: 16,
//     paddingBottom: 8,
//   },
//   banner: {
//     width: '100%',
//     height: 140,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 16,
//     overflow: 'hidden',
//   },
//   bannerImageStyle: {
//     borderRadius: 16,
//   },
//   section: {
//     paddingHorizontal: 16,
//     paddingTop: 24,
//     paddingBottom: 8,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#000',
//     marginBottom: 12,
//   },
//   sectionText: {
//     fontSize: 14,
//     lineHeight: 22,
//     color: '#444',
//   },
//   bulletItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: 12,
//     paddingRight: 8,
//   },
//   bullet: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#832729', // Accent color for bullets
//     marginRight: 8,
//     marginTop: -2,
//   },
//   numberBullet: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: '#832729', // Accent color for numbers
//     marginRight: 8,
//     marginTop: 0,
//     width: 20,
//   },
//   bulletText: {
//     flex: 1,
//     fontSize: 14,
//     lineHeight: 22,
//     color: '#444',
//   },
//   bottomContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 16,
//     paddingTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: '#E0E0E0',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: -2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 10,
//   },
//   applyButton: {
//     backgroundColor: '#832729', // Updated to match scheme accent
//     borderRadius: 8,
//     paddingVertical: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   applyButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '700',
//   },
// });

// export default SchemeDetailsScreen;
import React, { useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSchemeBanners } from '../redux/slices/schemeSlice';

// Font family constants (SF Pro Display)
const FONTS = {
  regular: 'SF-Pro-Display-Regular',
  medium: 'SF-Pro-Display-Medium',
  semibold: 'SF-Pro-Display-Semibold',
  bold: 'SF-Pro-Display-Bold',
};

const { width } = Dimensions.get('window');

const SchemeDetailsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  // Get banner from navigation params (if coming from somewhere with specific banner)
  const { bannerImage } = route.params || {};

  // Get banners from redux store
  const { schemeBanners, bannersLoading } = useSelector((state) => state.scheme || {});

  // Fetch banners only if we don't have them yet
  useEffect(() => {
    if (!schemeBanners || schemeBanners.length === 0) {
      dispatch(fetchSchemeBanners());
    }
  }, [dispatch, schemeBanners]);

  // Image priority: passed from params → first banner from store → local fallback
  const displayImage = bannerImage
    ? { uri: bannerImage }
    : schemeBanners && schemeBanners.length > 0
    ? { uri: schemeBanners[0].banner_image }
    : require('../assets/schemebanner.png');

  // Content data
  const howItWorks = [
    'Choose a fixed monthly deposit amount.',
    'Pay every month for the selected tenure.',
    'On maturity, use the total savings + applicable scheme benefits to purchase gold jewellery.',
  ];

  const schemeHighlights = [
    'Secure monthly saving plan.',
    'Purchase at the prevailing gold rate on redemption.',
    'Attractive making charge and wastage benefits (as applicable).',
  ];

  const termsAndConditions = [
    'The scheme is open to customers aged 18 and above with valid ID proof.',
    'Monthly deposits must be paid regularly throughout the chosen tenure.',
    'On maturity and full payment, gold jewellery can be purchased equal to the deposit value plus applicable scheme benefits.',
    'Benefits apply only to gold jewellery and exclude coins, bullion, or silver items.',
    'Delayed or missed payments may result in loss or reduction of benefits.',
    'Premature withdrawals will not receive scheme benefits; only the deposited amount can be used for jewellery purchase.',
    'Redemption requires ID proof and scheme receipts/passbook.',
    'Standard making charges and wastage apply unless discount benefits are specified at enrollment.',
    'Refunds are not permitted.',
  ];

  const TAB_BAR_HEIGHT = 60;
  const bottomButtonPadding = Math.max(insets.bottom, 10) + TAB_BAR_HEIGHT;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#832729" barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Scheme Details</Text>

        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottomButtonPadding + 90 },
        ]}
      >
        {/* Banner Section */}
        <View style={styles.bannerWrapper}>
          {bannersLoading && !bannerImage ? (
            <View style={[styles.banner, { backgroundColor: '#f5f5f5' }]}>
              <ActivityIndicator size="large" color="#832729" />
            </View>
          ) : (
            <ImageBackground
              source={displayImage}
              style={styles.banner}
              resizeMode="cover"
              imageStyle={styles.bannerImageStyle}
            />
          )}
        </View>

        {/* About the Scheme */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the Scheme</Text>
          <Text style={styles.sectionText}>
            A smart and secure way to save monthly and purchase gold jewellery at maturity with exclusive benefits.
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
              <Text style={styles.numberBullet}>{index + 1}.</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View
        style={[
          styles.bottomContainer,
          { paddingBottom: Math.max(insets.bottom, 10) },
        ]}
      >
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => navigation.navigate('SchemeApplicationScreen')}
        >
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
    backgroundColor: '#832729',
  },

  backButton: {
    padding: 4,
    width: 36,
  },

  headerTitle: {
    fontSize: 19,
    fontFamily: FONTS.bold,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },

  headerPlaceholder: {
    width: 36,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  bannerWrapper: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },

  banner: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bannerImageStyle: {
    borderRadius: 16,
  },

  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: '#000',
    marginBottom: 14,
  },

  sectionText: {
    fontSize: 15,
    fontFamily: FONTS.regular,
    lineHeight: 23,
    color: '#333',
  },

  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingRight: 8,
  },

  bullet: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: '#832729',
    marginRight: 10,
    marginTop: -2,
  },

  numberBullet: {
    fontSize: 15,
    fontFamily: FONTS.medium,
    color: '#832729',
    marginRight: 10,
    width: 24,
    textAlign: 'right',
  },

  bulletText: {
    flex: 1,
    fontSize: 15,
    fontFamily: FONTS.regular,
    lineHeight: 23,
    color: '#333',
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
    borderTopColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 12,
  },

  applyButton: {
    backgroundColor: '#832729',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
});

export default SchemeDetailsScreen;