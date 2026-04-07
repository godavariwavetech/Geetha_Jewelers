// // // import React, { useState } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   ScrollView,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // //   SafeAreaView,
// // //   StatusBar,
// // //   Image,
// // //   Dimensions,
// // //   ImageBackground
// // // } from 'react-native';
// // // import { useSafeAreaInsets } from 'react-native-safe-area-context';
// // // import Ionicons from 'react-native-vector-icons/Ionicons';
// // // import { useNavigation } from '@react-navigation/native';

// // // const { width } = Dimensions.get('window');
// // // const BANNER_HEIGHT = 160; 

// // // const ACCENT_COLOR = '#832729';

// // // const GoldScheme = () => {
// // //   const insets = useSafeAreaInsets();
// // //   const navigation = useNavigation();
// // //   const [selectedTab, setSelectedTab] = useState('Gold');

// // //   const tabs = ['Gold', 'Silver', 'Platinum'];

// // //   const goldRates = [
// // //     { type: '24K Gold /g', price: '₹13,528', change: '+ ₹110', isPositive: true },
// // //     { type: '22K Gold /g', price: '₹12,400', change: '+ ₹100', isPositive: true },
// // //     { type: '18K Gold /g', price: '₹10,146', change: '+ ₹82', isPositive: true }
// // //   ];

// // //   const banners = [
// // //     { id: 1, disabled: false, image: require('../assets/schemebanner.png') } 
// // //   ];

// // //   const handleBannerPress = (banner) => {
// // //     if (!banner.disabled) {
// // //       navigation.navigate('SchemeDetailsScreen');
// // //     }
// // //   };

// // //   return (
// // //     <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
// // //       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
// // //       {/* Header */}
// // //       <View style={styles.header}>
// // //         <TouchableOpacity 
// // //           onPress={() => navigation.goBack()} 
// // //           style={styles.backButton}
// // //         >
// // //           <Ionicons name="arrow-back" size={24} color="#000" />
// // //         </TouchableOpacity>
// // //         <Text style={styles.headerTitle}>Gold Rates & Schemes</Text>
// // //         <View style={styles.headerPlaceholder} />
// // //       </View>

// // //       <ScrollView 
// // //         showsVerticalScrollIndicator={false}
// // //         contentContainerStyle={[
// // //           styles.scrollContent,
// // //           { paddingBottom: insets.bottom + 20 }
// // //         ]}
// // //       >
// // //         {/* Title and Date */}
// // //         <View style={styles.titleSection}>
// // //           <Text style={styles.mainTitle}>Gold Rate in Rajahmundry</Text>
// // //           <Text style={styles.dateText}>22 December 2025</Text>
// // //         </View>

// // //         {/* Tabs */}
// // //         <View style={styles.tabsContainer}>
// // //           <View style={styles.tabsWrapper}>
// // //             {tabs.map((tab, index) => (
// // //               <TouchableOpacity
// // //                 key={index}
// // //                 style={[
// // //                   styles.tabButton,
// // //                   selectedTab === tab && [styles.selectedTabButton, { backgroundColor: ACCENT_COLOR, borderColor: ACCENT_COLOR }]
// // //                 ]}
// // //                 onPress={() => setSelectedTab(tab)}
// // //               >
// // //                 <Text
// // //                   style={[
// // //                     styles.tabText,
// // //                     selectedTab === tab && styles.selectedTabText
// // //                   ]}
// // //                 >
// // //                   {tab}
// // //                 </Text>
// // //               </TouchableOpacity>
// // //             ))}
// // //           </View>
          
// // //           <View style={styles.coinIconContainer}>
// // //             <Image
// // //               source={require('../assets/coins.png')}
// // //               style={styles.coinIcon}
// // //               resizeMode="contain"
// // //             />
// // //           </View>
// // //         </View>

// // //         {/* Gold Rate Cards */}
// // //         <View style={styles.ratesContainer}>
// // //           {goldRates.map((rate, index) => (
// // //             <View key={index} style={styles.rateCard}>
// // //               <Text style={styles.rateType}>{rate.type}</Text>
// // //               <Text style={styles.ratePrice}>{rate.price}</Text>
// // //               <View style={styles.changeContainer}>
// // //                 <Text style={[
// // //                   styles.changeText,
// // //                   rate.isPositive && { color: ACCENT_COLOR }
// // //                 ]}>
// // //                   {rate.change}
// // //                 </Text>
// // //                 <Ionicons 
// // //                   name={rate.isPositive ? "arrow-up" : "arrow-down"} 
// // //                   size={12} 
// // //                   color={rate.isPositive ? ACCENT_COLOR : "#FF0000"} 
// // //                 />
// // //               </View>
// // //             </View>
// // //           ))}
// // //         </View>

// // //         {/* Promotional Banner */}
// // //         <View style={styles.bannersContainer}>
// // //           {banners.map((banner) => (
// // //             <TouchableOpacity 
// // //               key={banner.id}
// // //               activeOpacity={0.9}
// // //               onPress={() => handleBannerPress(banner)}
// // //               style={styles.bannerTouchable}
// // //             >
// // //               <ImageBackground
// // //                 source={banner.image}
// // //                 style={styles.promoBanner}
// // //                 resizeMode="cover"
// // //                 imageStyle={styles.bannerImageStyle}
// // //               />
// // //             </TouchableOpacity>
// // //           ))}
// // //         </View>

// // //         {/* Content below banner REMOVED as requested */}

// // //       </ScrollView>
// // //     </SafeAreaView>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: '#F8F9FA',
// // //   },
// // //   header: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     justifyContent: 'space-between',
// // //     paddingHorizontal: 16,
// // //     paddingVertical: 16,
// // //     backgroundColor: '#fff',
// // //     borderBottomWidth: 1,
// // //     borderBottomColor: '#f0f0f0',
// // //   },
// // //   backButton: {
// // //     padding: 4,
// // //     width: 32,
// // //   },
// // //   headerTitle: {
// // //     fontSize: 18,
// // //     fontWeight: '600',
// // //     color: '#000',
// // //     flex: 1,
// // //     textAlign: 'center',
// // //   },
// // //   headerPlaceholder: {
// // //     width: 32,
// // //   },
// // //   scrollContent: {
// // //     paddingBottom: 20,
// // //   },
// // //   titleSection: {
// // //     paddingHorizontal: 16,
// // //     paddingTop: 20,
// // //     paddingBottom: 10,
// // //     backgroundColor: '#fff',
// // //   },
// // //   mainTitle: {
// // //     fontSize: 22,
// // //     fontWeight: '700',
// // //     color: '#000',
// // //     marginBottom: 4,
// // //   },
// // //   dateText: {
// // //     fontSize: 14,
// // //     color: '#666',
// // //   },
// // //   tabsContainer: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     paddingHorizontal: 16,
// // //     paddingBottom: 16,
// // //     backgroundColor: '#fff',
// // //   },
// // //   tabsWrapper: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //   },
// // //   tabButton: {
// // //     paddingHorizontal: 18,
// // //     paddingVertical: 8,
// // //     borderRadius: 20,
// // //     marginRight: 10,
// // //     backgroundColor: '#fff',
// // //     borderWidth: 1,
// // //     borderColor: '#E0E0E0',
// // //   },
// // //   selectedTabButton: {
// // //     borderColor: '#832729',
// // //   },
// // //   tabText: {
// // //     fontSize: 13,
// // //     fontWeight: '500',
// // //     color: '#666',
// // //   },
// // //   selectedTabText: {
// // //     color: '#fff',
// // //   },
// // //   coinIconContainer: {
// // //     width: 60,
// // //     height: 60,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },
// // //   coinIcon: {
// // //     width: 50,
// // //     height: 50,
// // //   },
// // //   ratesContainer: {
// // //     flexDirection: 'row',
// // //     paddingHorizontal: 16,
// // //     paddingBottom: 20,
// // //     backgroundColor: '#fff',
// // //     gap: 10,
// // //   },
// // //   rateCard: {
// // //     flex: 1,
// // //     backgroundColor: '#F9F9F9',
// // //     borderRadius: 12,
// // //     padding: 12,
// // //     borderWidth: 1,
// // //     borderColor: '#EEEEEE',
// // //   },
// // //   rateType: {
// // //     fontSize: 11,
// // //     fontWeight: '600',
// // //     color: '#555',
// // //     marginBottom: 6,
// // //   },
// // //   ratePrice: {
// // //     fontSize: 15,
// // //     fontWeight: '700',
// // //     color: '#000',
// // //     marginBottom: 4,
// // //   },
// // //   changeContainer: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //   },
// // //   changeText: {
// // //     fontSize: 11,
// // //     fontWeight: '600',
// // //     marginRight: 2,
// // //   },
// // //   bannersContainer: {
// // //     marginTop: 16,
// // //     paddingHorizontal: 16,
// // //   },
// // //   bannerTouchable: {
// // //     width: '100%',
// // //     borderRadius: 16,
// // //     overflow: 'hidden',
// // //     backgroundColor: '#fff',
// // //     elevation: 3,
// // //     shadowColor: '#000',
// // //     shadowOffset: { width: 0, height: 2 },
// // //     shadowOpacity: 0.1,
// // //     shadowRadius: 4,
// // //   },
// // //   promoBanner: {
// // //     height: BANNER_HEIGHT,
// // //     width: '100%',
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },
// // //   bannerImageStyle: {
// // //     borderRadius: 16,
// // //   },
// // // });

// // // export default GoldScheme;
// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   ScrollView,
// //   TouchableOpacity,
// //   StyleSheet,
// //   SafeAreaView,
// //   StatusBar,
// //   Image,
// //   Dimensions,
// //   ImageBackground,
// //   TextInput,
// //   Alert,
// //   ActivityIndicator
// // } from 'react-native';
// // import { useSafeAreaInsets } from 'react-native-safe-area-context';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import { useNavigation } from '@react-navigation/native';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { launchImageLibrary } from 'react-native-image-picker';

// // // Import the new thunk
// // import { addSchemeHolderDetails } from '../redux/slices/schemeSlice';

// // const { width } = Dimensions.get('window');
// // const BANNER_HEIGHT = 160;
// // const ACCENT_COLOR = '#832729';

// // const GoldScheme = () => {
// //   const insets = useSafeAreaInsets();
// //   const navigation = useNavigation();
// //   const dispatch = useDispatch();

// //   // --- Redux State ---
// //   // Get logged in user ID
// //   const customerId = useSelector((state) => state.Auth.customerId); 
// //   // Get scheme registration status
// //   const { loading, isRegistered } = useSelector((state) => state.scheme || {}); 

// //   // --- Local State for Form ---
// //   const [name, setName] = useState('');
// //   const [address, setAddress] = useState('');
// //   const [phone, setPhone] = useState('');
// //   const [documentProof, setDocumentProof] = useState(null); // Stores base64
// //   const [documentUri, setDocumentUri] = useState(null); // Stores display URI

// //   // --- Local State for Gold UI ---
// //   const [selectedTab, setSelectedTab] = useState('Gold');

// //   const tabs = ['Gold', 'Silver', 'Platinum'];
// //   const goldRates = [
// //     { type: '24K Gold /g', price: '₹13,528', change: '+ ₹110', isPositive: true },
// //     { type: '22K Gold /g', price: '₹12,400', change: '+ ₹100', isPositive: true },
// //     { type: '18K Gold /g', price: '₹10,146', change: '+ ₹82', isPositive: true }
// //   ];
// //   const banners = [
// //     { id: 1, disabled: false, image: require('../assets/schemebanner.png') }
// //   ];

// //   // --- Form Handlers ---
// //   const handleImagePick = async () => {
// //     const options = {
// //       mediaType: 'photo',
// //       includeBase64: true, // Crucial for your API payload
// //       quality: 0.7,
// //     };

// //     try {
// //       const result = await launchImageLibrary(options);
// //       if (result.assets && result.assets.length > 0) {
// //         const asset = result.assets[0];
// //         setDocumentUri(asset.uri);
// //         // Format base64 string as expected by typical APIs (data:image/png;base64,...)
// //         setDocumentProof(`data:${asset.type};base64,${asset.base64}`);
// //       }
// //     } catch (error) {
// //       console.error("Image Picker Error:", error);
// //     }
// //   };

// //   const handleSubmit = async () => {
// //     if (!name || !address || !phone || !documentProof) {
// //       Alert.alert('Validation Error', 'Please fill all fields and upload a document.');
// //       return;
// //     }
    
// //     if (!customerId) {
// //         Alert.alert('Error', 'User ID not found. Please login again.');
// //         return;
// //     }

// //     dispatch(addSchemeHolderDetails({
// //       userId: customerId,
// //       name: name,
// //       address: address,
// //       phoneNumber: phone,
// //       documentProof: documentProof
// //     }));
// //   };

// //   // --- Gold UI Handlers ---
// //   const handleBannerPress = (banner) => {
// //     if (!banner.disabled) {
// //       navigation.navigate('SchemeDetailsScreen');
// //     }
// //   };

// //   // ==========================================================
// //   // VIEW 1: REGISTRATION FORM (Shown if not registered)
// //   // ==========================================================
// //   const renderRegistrationForm = () => (
// //     <ScrollView 
// //       contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]} 
// //       showsVerticalScrollIndicator={false}
// //     >
// //       <View style={styles.formContainer}>
// //         <Text style={styles.formTitle}>Join Geeta Gold Plus</Text>
// //         <Text style={styles.formSubtitle}>Please enter your details to proceed.</Text>

// //         {/* Name Input */}
// //         <View style={styles.inputGroup}>
// //           <Text style={styles.label}>Full Name</Text>
// //           <TextInput
// //             style={styles.input}
// //             placeholder="Enter your name"
// //             placeholderTextColor="#999"
// //             value={name}
// //             onChangeText={setName}
// //           />
// //         </View>

// //         {/* Phone Input */}
// //         <View style={styles.inputGroup}>
// //           <Text style={styles.label}>Phone Number</Text>
// //           <TextInput
// //             style={styles.input}
// //             placeholder="Enter phone number"
// //             placeholderTextColor="#999"
// //             keyboardType="phone-pad"
// //             maxLength={10}
// //             value={phone}
// //             onChangeText={setPhone}
// //           />
// //         </View>

// //         {/* Address Input */}
// //         <View style={styles.inputGroup}>
// //           <Text style={styles.label}>Address</Text>
// //           <TextInput
// //             style={[styles.input, styles.textArea]}
// //             placeholder="Enter your full address"
// //             placeholderTextColor="#999"
// //             multiline
// //             numberOfLines={3}
// //             value={address}
// //             onChangeText={setAddress}
// //           />
// //         </View>

// //         {/* Document Upload */}
// //         <View style={styles.inputGroup}>
// //           <Text style={styles.label}>Document Proof (ID/Aadhar)</Text>
// //           <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
// //             {documentUri ? (
// //               <Image source={{ uri: documentUri }} style={styles.uploadedImage} resizeMode="cover" />
// //             ) : (
// //               <View style={styles.uploadPlaceholder}>
// //                 <Ionicons name="cloud-upload-outline" size={32} color="#832729" />
// //                 <Text style={styles.uploadText}>Click to Upload Image</Text>
// //               </View>
// //             )}
// //           </TouchableOpacity>
// //         </View>

// //         {/* Submit Button */}
// //         <TouchableOpacity 
// //           style={styles.submitButton} 
// //           onPress={handleSubmit}
// //           disabled={loading}
// //         >
// //           {loading ? (
// //             <ActivityIndicator color="#fff" />
// //           ) : (
// //             <Text style={styles.submitButtonText}>Submit & Proceed</Text>
// //           )}
// //         </TouchableOpacity>
// //       </View>
// //     </ScrollView>
// //   );

// //   // ==========================================================
// //   // VIEW 2: GOLD SCHEME UI (Shown if registered)
// //   // ==========================================================
// //   const renderGoldSchemeUI = () => (
// //     <ScrollView
// //       showsVerticalScrollIndicator={false}
// //       contentContainerStyle={[
// //         styles.scrollContent,
// //         { paddingBottom: insets.bottom + 20 }
// //       ]}
// //     >
// //       {/* Title and Date */}
// //       <View style={styles.titleSection}>
// //         <Text style={styles.mainTitle}>Gold Rate in Rajahmundry</Text>
// //         <Text style={styles.dateText}>22 December 2025</Text>
// //       </View>

// //       {/* Tabs */}
// //       <View style={styles.tabsContainer}>
// //         <View style={styles.tabsWrapper}>
// //           {tabs.map((tab, index) => (
// //             <TouchableOpacity
// //               key={index}
// //               style={[
// //                 styles.tabButton,
// //                 selectedTab === tab && [styles.selectedTabButton, { backgroundColor: ACCENT_COLOR, borderColor: ACCENT_COLOR }]
// //               ]}
// //               onPress={() => setSelectedTab(tab)}
// //             >
// //               <Text
// //                 style={[
// //                   styles.tabText,
// //                   selectedTab === tab && styles.selectedTabText
// //                 ]}
// //               >
// //                 {tab}
// //               </Text>
// //             </TouchableOpacity>
// //           ))}
// //         </View>

// //         <View style={styles.coinIconContainer}>
// //           <Image
// //             source={require('../assets/coins.png')}
// //             style={styles.coinIcon}
// //             resizeMode="contain"
// //           />
// //         </View>
// //       </View>

// //       {/* Gold Rate Cards */}
// //       <View style={styles.ratesContainer}>
// //         {goldRates.map((rate, index) => (
// //           <View key={index} style={styles.rateCard}>
// //             <Text style={styles.rateType}>{rate.type}</Text>
// //             <Text style={styles.ratePrice}>{rate.price}</Text>
// //             <View style={styles.changeContainer}>
// //               <Text style={[
// //                 styles.changeText,
// //                 rate.isPositive && { color: ACCENT_COLOR }
// //               ]}>
// //                 {rate.change}
// //               </Text>
// //               <Ionicons
// //                 name={rate.isPositive ? "arrow-up" : "arrow-down"}
// //                 size={12}
// //                 color={rate.isPositive ? ACCENT_COLOR : "#FF0000"}
// //               />
// //             </View>
// //           </View>
// //         ))}
// //       </View>

// //       {/* Promotional Banner */}
// //       <View style={styles.bannersContainer}>
// //         {banners.map((banner) => (
// //           <TouchableOpacity
// //             key={banner.id}
// //             activeOpacity={0.9}
// //             onPress={() => handleBannerPress(banner)}
// //             style={styles.bannerTouchable}
// //           >
// //             <ImageBackground
// //               source={banner.image}
// //               style={styles.promoBanner}
// //               resizeMode="cover"
// //               imageStyle={styles.bannerImageStyle}
// //             />
// //           </TouchableOpacity>
// //         ))}
// //       </View>
// //     </ScrollView>
// //   );

// //   return (
// //     <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
// //       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

// //       {/* Header */}
// //       <View style={styles.header}>
// //         <TouchableOpacity
// //           onPress={() => navigation.goBack()}
// //           style={styles.backButton}
// //         >
// //           <Ionicons name="arrow-back" size={24} color="#000" />
// //         </TouchableOpacity>
// //         <Text style={styles.headerTitle}>
// //            {isRegistered ? 'Gold Rates & Schemes' : 'Scheme Registration'}
// //         </Text>
// //         <View style={styles.headerPlaceholder} />
// //       </View>

// //       {/* Conditional Rendering */}
// //       {isRegistered ? renderGoldSchemeUI() : renderRegistrationForm()}

// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F8F9FA',
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     paddingHorizontal: 16,
// //     paddingVertical: 16,
// //     backgroundColor: '#fff',
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#f0f0f0',
// //   },
// //   backButton: {
// //     padding: 4,
// //     width: 32,
// //   },
// //   headerTitle: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //     color: '#000',
// //     flex: 1,
// //     textAlign: 'center',
// //   },
// //   headerPlaceholder: {
// //     width: 32,
// //   },
// //   scrollContent: {
// //     paddingBottom: 20,
// //   },
  
// //   // --- Form Styles ---
// //   formContainer: {
// //     padding: 20,
// //     backgroundColor: '#fff',
// //     marginTop: 10,
// //   },
// //   formTitle: {
// //     fontSize: 22,
// //     fontWeight: '700',
// //     color: '#000',
// //     marginBottom: 8,
// //   },
// //   formSubtitle: {
// //     fontSize: 14,
// //     color: '#666',
// //     marginBottom: 24,
// //   },
// //   inputGroup: {
// //     marginBottom: 20,
// //   },
// //   label: {
// //     fontSize: 14,
// //     fontWeight: '600',
// //     color: '#333',
// //     marginBottom: 8,
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: '#E0E0E0',
// //     borderRadius: 8,
// //     padding: 12,
// //     fontSize: 16,
// //     color: '#000',
// //     backgroundColor: '#F9F9F9',
// //   },
// //   textArea: {
// //     height: 100,
// //     textAlignVertical: 'top',
// //   },
// //   uploadButton: {
// //     borderWidth: 1.5,
// //     borderColor: '#832729',
// //     borderStyle: 'dashed',
// //     borderRadius: 8,
// //     height: 150,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#FDF5F5',
// //     overflow: 'hidden',
// //   },
// //   uploadPlaceholder: {
// //     alignItems: 'center',
// //   },
// //   uploadText: {
// //     marginTop: 8,
// //     color: '#832729',
// //     fontWeight: '500',
// //   },
// //   uploadedImage: {
// //     width: '100%',
// //     height: '100%',
// //   },
// //   submitButton: {
// //     backgroundColor: '#832729',
// //     borderRadius: 8,
// //     paddingVertical: 16,
// //     alignItems: 'center',
// //     marginTop: 10,
// //   },
// //   submitButtonText: {
// //     color: '#fff',
// //     fontSize: 16,
// //     fontWeight: '700',
// //   },

// //   // --- Gold UI Styles ---
// //   titleSection: {
// //     paddingHorizontal: 16,
// //     paddingTop: 20,
// //     paddingBottom: 10,
// //     backgroundColor: '#fff',
// //   },
// //   mainTitle: {
// //     fontSize: 22,
// //     fontWeight: '700',
// //     color: '#000',
// //     marginBottom: 4,
// //   },
// //   dateText: {
// //     fontSize: 14,
// //     color: '#666',
// //   },
// //   tabsContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     paddingHorizontal: 16,
// //     paddingBottom: 16,
// //     backgroundColor: '#fff',
// //   },
// //   tabsWrapper: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   tabButton: {
// //     paddingHorizontal: 18,
// //     paddingVertical: 8,
// //     borderRadius: 20,
// //     marginRight: 10,
// //     backgroundColor: '#fff',
// //     borderWidth: 1,
// //     borderColor: '#E0E0E0',
// //   },
// //   selectedTabButton: {
// //     borderColor: '#832729',
// //   },
// //   tabText: {
// //     fontSize: 13,
// //     fontWeight: '500',
// //     color: '#666',
// //   },
// //   selectedTabText: {
// //     color: '#fff',
// //   },
// //   coinIconContainer: {
// //     width: 60,
// //     height: 60,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   coinIcon: {
// //     width: 50,
// //     height: 50,
// //   },
// //   ratesContainer: {
// //     flexDirection: 'row',
// //     paddingHorizontal: 16,
// //     paddingBottom: 20,
// //     backgroundColor: '#fff',
// //     gap: 10,
// //   },
// //   rateCard: {
// //     flex: 1,
// //     backgroundColor: '#F9F9F9',
// //     borderRadius: 12,
// //     padding: 12,
// //     borderWidth: 1,
// //     borderColor: '#EEEEEE',
// //   },
// //   rateType: {
// //     fontSize: 11,
// //     fontWeight: '600',
// //     color: '#555',
// //     marginBottom: 6,
// //   },
// //   ratePrice: {
// //     fontSize: 15,
// //     fontWeight: '700',
// //     color: '#000',
// //     marginBottom: 4,
// //   },
// //   changeContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   changeText: {
// //     fontSize: 11,
// //     fontWeight: '600',
// //     marginRight: 2,
// //   },
// //   bannersContainer: {
// //     marginTop: 16,
// //     paddingHorizontal: 16,
// //   },
// //   bannerTouchable: {
// //     width: '100%',
// //     borderRadius: 16,
// //     overflow: 'hidden',
// //     backgroundColor: '#fff',
// //     elevation: 3,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //   },
// //   promoBanner: {
// //     height: BANNER_HEIGHT,
// //     width: '100%',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   bannerImageStyle: {
// //     borderRadius: 16,
// //   },
// // });

// // export default GoldScheme;
// // import React, { useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   ScrollView,
// //   TouchableOpacity,
// //   StyleSheet,
// //   SafeAreaView,
// //   StatusBar,
// //   Image,
// //   Dimensions,
// //   ImageBackground,
// //   TextInput,
// //   Alert,
// //   ActivityIndicator
// // } from 'react-native';
// // import { useSafeAreaInsets } from 'react-native-safe-area-context';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import { useNavigation } from '@react-navigation/native';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { launchImageLibrary } from 'react-native-image-picker';

// // import { addSchemeHolderDetails, fetchDailyMetalRates } from '../redux/slices/schemeSlice';

// // const { width } = Dimensions.get('window');
// // const BANNER_HEIGHT = 160;
// // const ACCENT_COLOR = '#832729';

// // // --- LAYOUT CONSTANTS ---
// // const CONTAINER_PADDING = 16;
// // const GAP_SIZE = 8; // Reduced gap slightly to ensure fit
// // // Calculation: (Screen Width - (Padding * 2) - (Gap * 2)) / 3
// // const CARD_WIDTH = (width - (CONTAINER_PADDING * 2) - (GAP_SIZE * 2)) / 3;

// // const GoldScheme = () => {
// //   const insets = useSafeAreaInsets();
// //   const navigation = useNavigation();
// //   const dispatch = useDispatch();

// //   const customerId = useSelector((state) => state.Auth.customerId);
  
// //   const { 
// //     loading, 
// //     isRegistered, 
// //     metalRates, 
// //     metalRatesLoading,
// //     metalRatesError 
// //   } = useSelector((state) => state.scheme || {});

// //   const [name, setName] = useState('');
// //   const [address, setAddress] = useState('');
// //   const [phone, setPhone] = useState('');
// //   const [documentProof, setDocumentProof] = useState(null);
// //   const [documentUri, setDocumentUri] = useState(null);
// //   const [selectedTab, setSelectedTab] = useState('Gold');

// //   const tabs = ['Gold', 'Silver', 'Platinum'];
// //   const banners = [
// //     { id: 1, disabled: false, image: require('../assets/schemebanner.png') }
// //   ];

// //   useEffect(() => {
// //     dispatch(fetchDailyMetalRates());
// //   }, [dispatch]);

// //   const getDisplayRates = () => {
// //     if (!metalRates) return [];

// //     if (selectedTab === 'Gold') {
// //       return [
// //         { type: '24K Gold /g', price: metalRates.gold_24k },
// //         { type: '22K Gold /g', price: metalRates.gold_22k },
// //         { type: '18K Gold /g', price: metalRates.gold_18k },
// //       ];
// //     } else if (selectedTab === 'Silver') {
// //       return [
// //         { type: 'Silver /g', price: metalRates.silver_rate },
// //       ];
// //     } else if (selectedTab === 'Platinum') {
// //       return [
// //         { type: 'Platinum /g', price: metalRates.platinum_rate },
// //       ];
// //     }
// //     return [];
// //   };

// //   const displayRates = getDisplayRates();

// //   // ... (Keep handleImagePick, handleSubmit, handleBannerPress) ...
// //   const handleImagePick = async () => {
// //     const options = { mediaType: 'photo', includeBase64: true, quality: 0.7 };
// //     try {
// //       const result = await launchImageLibrary(options);
// //       if (result.assets && result.assets.length > 0) {
// //         const asset = result.assets[0];
// //         setDocumentUri(asset.uri);
// //         setDocumentProof(`data:${asset.type};base64,${asset.base64}`);
// //       }
// //     } catch (error) { console.error("Image Picker Error:", error); }
// //   };

// //   const handleSubmit = () => {
// //     if (!name || !address || !phone || !documentProof) {
// //       Alert.alert('Validation Error', 'Please fill all fields and upload a document.');
// //       return;
// //     }
// //     if (!customerId) {
// //       Alert.alert('Error', 'User ID not found. Please login again.');
// //       return;
// //     }
// //     dispatch(addSchemeHolderDetails({ userId: customerId, name, address, phoneNumber: phone, documentProof }));
// //   };

// //   const handleBannerPress = (banner) => {
// //     if (!banner.disabled) navigation.navigate('SchemeDetailsScreen');
// //   };

// //   const renderRegistrationForm = () => (
// //     <ScrollView 
// //       contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]} 
// //       showsVerticalScrollIndicator={false}
// //     >
// //       {/* ... (Same Registration Form Code) ... */}
// //       <View style={styles.formContainer}>
// //         <Text style={styles.formTitle}>Join Geeta Jewellers</Text>
// //         <Text style={styles.formSubtitle}>Please enter your details to proceed.</Text>
// //         <View style={styles.inputGroup}>
// //           <Text style={styles.label}>Full Name</Text>
// //           <TextInput style={styles.input} placeholder="Enter your name" placeholderTextColor="#999" value={name} onChangeText={setName} />
// //         </View>
// //         <View style={styles.inputGroup}>
// //           <Text style={styles.label}>Phone Number</Text>
// //           <TextInput style={styles.input} placeholder="Enter phone number" placeholderTextColor="#999" keyboardType="phone-pad" maxLength={10} value={phone} onChangeText={setPhone} />
// //         </View>
// //         <View style={styles.inputGroup}>
// //           <Text style={styles.label}>Address</Text>
// //           <TextInput style={[styles.input, styles.textArea]} placeholder="Enter your full address" placeholderTextColor="#999" multiline numberOfLines={3} value={address} onChangeText={setAddress} />
// //         </View>
// //         <View style={styles.inputGroup}>
// //           <Text style={styles.label}>Document Proof (ID/Aadhar)</Text>
// //           <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
// //             {documentUri ? (
// //               <Image source={{ uri: documentUri }} style={styles.uploadedImage} resizeMode="cover" />
// //             ) : (
// //               <View style={styles.uploadPlaceholder}>
// //                 <Ionicons name="cloud-upload-outline" size={32} color="#832729" />
// //                 <Text style={styles.uploadText}>Click to Upload Image</Text>
// //               </View>
// //             )}
// //           </TouchableOpacity>
// //         </View>
// //         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
// //           {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Submit & Proceed</Text>}
// //         </TouchableOpacity>
// //       </View>
// //     </ScrollView>
// //   );

// //   const renderGoldSchemeUI = () => (
// //     <ScrollView
// //       showsVerticalScrollIndicator={false}
// //       contentContainerStyle={[
// //         styles.scrollContent,
// //         { paddingBottom: insets.bottom + 20 }
// //       ]}
// //     >
// //       <View style={styles.titleSection}>
// //         <Text style={styles.mainTitle}>Metal Rates in Rajahmundry</Text>
// //         <Text style={styles.dateText}>
// //           {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
// //         </Text>
// //       </View>

// //       <View style={styles.tabsContainer}>
// //         <View style={styles.tabsWrapper}>
// //           {tabs.map((tab, index) => (
// //             <TouchableOpacity
// //               key={index}
// //               style={[
// //                 styles.tabButton,
// //                 selectedTab === tab && [styles.selectedTabButton, { backgroundColor: ACCENT_COLOR, borderColor: ACCENT_COLOR }]
// //               ]}
// //               onPress={() => setSelectedTab(tab)}
// //             >
// //               <Text
// //                 style={[
// //                   styles.tabText,
// //                   selectedTab === tab && styles.selectedTabText
// //                 ]}
// //               >
// //                 {tab}
// //               </Text>
// //             </TouchableOpacity>
// //           ))}
// //         </View>
// //         <View style={styles.coinIconContainer}>
// //           <Image
// //             source={require('../assets/coins.png')}
// //             style={styles.coinIcon}
// //             resizeMode="contain"
// //           />
// //         </View>
// //       </View>

// //       {/* RATES CONTAINER */}
// //       <View style={styles.ratesContainer}>
// //         {metalRatesLoading ? (
// //           <ActivityIndicator size="small" color={ACCENT_COLOR} style={{flex: 1}} />
// //         ) : displayRates.length > 0 ? (
// //           displayRates.map((rate, index) => (
// //             <View key={index} style={styles.rateCard}>
// //               {/* Type: wrapped in View to prevent overflow affecting layout */}
// //               <View style={{height: 20, justifyContent:'center'}}>
// //                  <Text style={styles.rateType} numberOfLines={1} adjustsFontSizeToFit>{rate.type}</Text>
// //               </View>
              
// //               <Text style={styles.ratePrice} numberOfLines={1}>₹{rate.price?.toLocaleString('en-IN')}</Text>
              
// //               <View style={styles.changeContainer}>
// //                  <Text style={[styles.changeText, {color: '#0D5C4A'}]}>Live</Text>
// //                  <Ionicons name="pulse" size={12} color="#0D5C4A" />
// //               </View>
// //             </View>
// //           ))
// //         ) : (
// //           <Text style={{textAlign: 'center', flex: 1, color: '#999', marginTop: 20}}>
// //              {metalRatesError ? 'Could not load rates' : 'Rates unavailable'}
// //           </Text>
// //         )}
// //       </View>

// //       <View style={styles.bannersContainer}>
// //         {banners.map((banner) => (
// //           <TouchableOpacity
// //             key={banner.id}
// //             activeOpacity={0.9}
// //             onPress={() => handleBannerPress(banner)}
// //             style={styles.bannerTouchable}
// //           >
// //             <ImageBackground
// //               source={banner.image}
// //               style={styles.promoBanner}
// //               resizeMode="cover"
// //               imageStyle={styles.bannerImageStyle}
// //             />
// //           </TouchableOpacity>
// //         ))}
// //       </View>
// //     </ScrollView>
// //   );

// //   return (
// //     <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
// //       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
// //       <View style={styles.header}>
// //         <TouchableOpacity
// //           onPress={() => navigation.goBack()}
// //           style={styles.backButton}
// //         >
// //           <Ionicons name="arrow-back" size={24} color="#000" />
// //         </TouchableOpacity>
// //         <Text style={styles.headerTitle}>
// //            {isRegistered ? 'Gold Rates & Schemes' : 'Scheme Registration'}
// //         </Text>
// //         <View style={styles.headerPlaceholder} />
// //       </View>

// //       {isRegistered ? renderGoldSchemeUI() : renderRegistrationForm()}
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#F8F9FA' },
// //   header: {
// //     flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
// //     paddingHorizontal: 16, paddingVertical: 16, backgroundColor: '#fff',
// //     borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
// //   },
// //   backButton: { padding: 4, width: 32 },
// //   headerTitle: { fontSize: 18, fontWeight: '600', color: '#000', flex: 1, textAlign: 'center' },
// //   headerPlaceholder: { width: 32 },
// //   scrollContent: { paddingBottom: 20 },
  
// //   // Form Styles
// //   formContainer: { padding: 20, backgroundColor: '#fff', marginTop: 10 },
// //   formTitle: { fontSize: 22, fontWeight: '700', color: '#000', marginBottom: 8 },
// //   formSubtitle: { fontSize: 14, color: '#666', marginBottom: 24 },
// //   inputGroup: { marginBottom: 20 },
// //   label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
// //   input: {
// //     borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, padding: 12,
// //     fontSize: 16, color: '#000', backgroundColor: '#F9F9F9',
// //   },
// //   textArea: { height: 100, textAlignVertical: 'top' },
// //   uploadButton: {
// //     borderWidth: 1.5, borderColor: '#832729', borderStyle: 'dashed', borderRadius: 8,
// //     height: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FDF5F5', overflow: 'hidden'
// //   },
// //   uploadPlaceholder: { alignItems: 'center' },
// //   uploadText: { marginTop: 8, color: '#832729', fontWeight: '500' },
// //   uploadedImage: { width: '100%', height: '100%' },
// //   submitButton: {
// //     backgroundColor: '#832729', borderRadius: 8, paddingVertical: 16, alignItems: 'center', marginTop: 10,
// //   },
// //   submitButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },

// //   // Scheme UI Styles
// //   titleSection: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 10, backgroundColor: '#fff' },
// //   mainTitle: { fontSize: 22, fontWeight: '700', color: '#000', marginBottom: 4 },
// //   dateText: { fontSize: 14, color: '#666' },
// //   tabsContainer: {
// //     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
// //     paddingHorizontal: 16, paddingBottom: 16, backgroundColor: '#fff',
// //   },
// //   tabsWrapper: { flexDirection: 'row', alignItems: 'center' },
// //   tabButton: {
// //     paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, marginRight: 10,
// //     backgroundColor: '#fff', borderWidth: 1, borderColor: '#E0E0E0',
// //   },
// //   selectedTabButton: { borderColor: '#832729' },
// //   tabText: { fontSize: 13, fontWeight: '500', color: '#666' },
// //   selectedTabText: { color: '#fff' },
// //   coinIconContainer: { width: 60, height: 60, justifyContent: 'center', alignItems: 'center' },
// //   coinIcon: { width: 50, height: 50 },
  
// //   // --- RATES LAYOUT FIX ---
// //   ratesContainer: {
// //     flexDirection: 'row', 
// //     flexWrap: 'wrap', 
// //     paddingHorizontal: CONTAINER_PADDING, 
// //     paddingBottom: 20,
// //     backgroundColor: '#fff', 
// //     gap: GAP_SIZE, // Use gap for spacing between items
// //   },
// //   rateCard: {
// //     width: CARD_WIDTH, // Precise width calculation
// //     backgroundColor: '#F9F9F9', 
// //     borderRadius: 12,
// //     paddingVertical: 12, 
// //     paddingHorizontal: 4,
// //     borderWidth: 1, 
// //     borderColor: '#EEEEEE',
// //     alignItems: 'center',
// //     // Removed 'flex: 1' to stop it from growing beyond 33%
// //   },
// //   rateType: { 
// //     fontSize: 10, 
// //     fontWeight: '600', 
// //     color: '#555', 
// //     textAlign: 'center',
// //   },
// //   ratePrice: { 
// //     fontSize: 13, 
// //     fontWeight: '700', 
// //     color: '#000', 
// //     marginBottom: 4, 
// //     marginTop: 2,
// //     textAlign: 'center' 
// //   },
// //   changeContainer: { flexDirection: 'row', alignItems: 'center' },
// //   changeText: { fontSize: 10, fontWeight: '600', marginRight: 2 },
// //   bannersContainer: { marginTop: 16, paddingHorizontal: 16 },
// //   bannerTouchable: {
// //     width: '100%', borderRadius: 16, overflow: 'hidden', backgroundColor: '#fff',
// //     elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1, shadowRadius: 4,
// //   },
// //   promoBanner: { height: BANNER_HEIGHT, width: '100%', justifyContent: 'center', alignItems: 'center' },
// //   bannerImageStyle: { borderRadius: 16 },
// // });

// // export default GoldScheme;
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   Image,
//   Dimensions,
//   ImageBackground,
//   TextInput,
//   Alert,
//   ActivityIndicator
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import { launchImageLibrary } from 'react-native-image-picker';

// import { 
//   addSchemeHolderDetails, 
//   fetchDailyMetalRates, 
//   checkSchemeHolder,
//   fetchSchemeBanners // Import new thunk
// } from '../redux/slices/schemeSlice';

// const { width } = Dimensions.get('window');
// const BANNER_HEIGHT = 140;
// const ACCENT_COLOR = '#832729';

// const CONTAINER_PADDING = 16;
// const GAP_SIZE = 8;
// const CARD_WIDTH = Math.floor((width - (CONTAINER_PADDING * 2) - (GAP_SIZE * 2)) / 3);

// const GoldScheme = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const customerId = useSelector((state) => state.Auth.customerId);
  
//   const { 
//     isRegistered,
//     checkLoading,
//     loading: registrationLoading,
//     metalRates, 
//     metalRatesLoading,
//     metalRatesError,
//     schemeBanners, // Get banners from state
//     bannersLoading
//   } = useSelector((state) => state.scheme || {});

//   const [name, setName] = useState('');
//   const [address, setAddress] = useState('');
//   const [phone, setPhone] = useState('');
//   const [documentProof, setDocumentProof] = useState(null);
//   const [documentUri, setDocumentUri] = useState(null);
//   const [selectedTab, setSelectedTab] = useState('Gold');

//   const tabs = ['Gold', 'Silver', 'Platinum'];

//   useEffect(() => {
//     if (customerId) {
//       dispatch(checkSchemeHolder(customerId));
//       dispatch(fetchDailyMetalRates());
//       dispatch(fetchSchemeBanners()); // Fetch banners on load
//     }
//   }, [dispatch, customerId]);

//   const getDisplayRates = () => {
//     if (!metalRates) return [];
//     if (selectedTab === 'Gold') {
//       return [
//         { type: '24K Gold /g', price: metalRates.gold_24k },
//         { type: '22K Gold /g', price: metalRates.gold_22k },
//         { type: '18K Gold /g', price: metalRates.gold_18k },
//       ];
//     } else if (selectedTab === 'Silver') {
//       return [{ type: 'Silver /g', price: metalRates.silver_rate }];
//     } else if (selectedTab === 'Platinum') {
//       return [{ type: 'Platinum /g', price: metalRates.platinum_rate }];
//     }
//     return [];
//   };

//   const displayRates = getDisplayRates();

//   // ... (handleImagePick, handleSubmit remain same)
//   const handleImagePick = async () => {
//     const options = { mediaType: 'photo', includeBase64: true, quality: 0.7 };
//     try {
//       const result = await launchImageLibrary(options);
//       if (result.assets && result.assets.length > 0) {
//         const asset = result.assets[0];
//         setDocumentUri(asset.uri);
//         setDocumentProof(`data:${asset.type};base64,${asset.base64}`);
//       }
//     } catch (error) { console.error("Image Picker Error:", error); }
//   };

//   const handleSubmit = () => {
//     if (!name || !address || !phone || !documentProof) {
//       Alert.alert('Validation Error', 'Please fill all fields and upload a document.');
//       return;
//     }
//     dispatch(addSchemeHolderDetails({ userId: customerId, name, address, phoneNumber: phone, documentProof }))
//       .then((action) => {
//         if (action.meta.requestStatus === 'fulfilled') {
//           dispatch(checkSchemeHolder(customerId));
//         }
//       });
//   };

//   const handleBannerPress = (bannerImage) => {
//     // Pass the image URL to the details screen
//     if(isRegistered) { // Only navigate if registered (optional logic)
//         navigation.navigate('SchemeDetailsScreen', { bannerImage });
//     }
//   };

//   const renderRegistrationForm = () => (
//     <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]} showsVerticalScrollIndicator={false}>
//       <View style={styles.formContainer}>
//         <Text style={styles.formTitle}>Join Geeta Jewellers Scheme</Text>
//         <Text style={styles.formSubtitle}>Please enter your details to enroll in the scheme.</Text>
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Full Name</Text>
//           <TextInput style={styles.input} placeholder="Enter your name" placeholderTextColor="#999" value={name} onChangeText={setName} />
//         </View>
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Phone Number</Text>
//           <TextInput style={styles.input} placeholder="Enter phone number" placeholderTextColor="#999" keyboardType="phone-pad" maxLength={10} value={phone} onChangeText={setPhone} />
//         </View>
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Address</Text>
//           <TextInput style={[styles.input, styles.textArea]} placeholder="Enter your full address" placeholderTextColor="#999" multiline numberOfLines={3} value={address} onChangeText={setAddress} />
//         </View>
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Document Proof (ID/Aadhar)</Text>
//           <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
//             {documentUri ? (
//               <Image source={{ uri: documentUri }} style={styles.uploadedImage} resizeMode="cover" />
//             ) : (
//               <View style={styles.uploadPlaceholder}>
//                 <Ionicons name="cloud-upload-outline" size={32} color="#832729" />
//                 <Text style={styles.uploadText}>Click to Upload Image</Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={registrationLoading}>
//           {registrationLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Submit & Proceed</Text>}
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );

//   const renderGoldSchemeUI = () => (
//     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}>
//       <View style={styles.titleSection}>
//         <Text style={styles.mainTitle}>Metal Rates in Rajahmundry</Text>
//         <Text style={styles.dateText}>
//           {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
//         </Text>
//       </View>

//       <View style={styles.tabsContainer}>
//         <View style={styles.tabsWrapper}>
//           {tabs.map((tab, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.tabButton,
//                 selectedTab === tab && [styles.selectedTabButton, { backgroundColor: ACCENT_COLOR, borderColor: ACCENT_COLOR }]
//               ]}
//               onPress={() => setSelectedTab(tab)}
//             >
//               <Text style={[styles.tabText, selectedTab === tab && styles.selectedTabText]}>{tab}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//         <View style={styles.coinIconContainer}>
//           <Image source={require('../assets/coins.png')} style={styles.coinIcon} resizeMode="contain" />
//         </View>
//       </View>

//       <View style={styles.ratesContainer}>
//         {metalRatesLoading ? (
//           <ActivityIndicator size="small" color={ACCENT_COLOR} style={{ marginVertical: 20 }} />
//         ) : displayRates.length > 0 ? (
//           displayRates.map((rate, index) => (
//             <View key={index} style={styles.rateCard}>
//               <View style={{ height: 20, justifyContent: 'center' }}>
//                 <Text style={styles.rateType} numberOfLines={1} adjustsFontSizeToFit>{rate.type}</Text>
//               </View>
//               <Text style={styles.ratePrice}>₹{rate.price?.toLocaleString('en-IN')}</Text>
//               <View style={styles.changeContainer}>
//                 <Text style={[styles.changeText, { color: '#0D5C4A' }]}>Live</Text>
//                 <Ionicons name="pulse" size={12} color="#0D5C4A" />
//               </View>
//             </View>
//           ))
//         ) : (
//           <Text style={{ textAlign: 'center', color: '#999', marginTop: 20 }}>
//             {metalRatesError || 'Rates unavailable'}
//           </Text>
//         )}
//       </View>

//       {/* Dynamic Banners Section */}
//       <View style={styles.bannersContainer}>
//         {bannersLoading ? (
//            <ActivityIndicator size="small" color={ACCENT_COLOR} />
//         ) : schemeBanners && schemeBanners.length > 0 ? (
//           schemeBanners.map((banner) => (
//             <TouchableOpacity 
//               key={banner.id} 
//               activeOpacity={0.9} 
//               onPress={() => handleBannerPress(banner.banner_image)} 
//               style={styles.bannerTouchable}
//             >
//               <ImageBackground 
//                 source={{ uri: banner.banner_image }} 
//                 style={styles.promoBanner} 
//                 resizeMode="cover" 
//                 imageStyle={styles.bannerImageStyle} 
//               />
//             </TouchableOpacity>
//           ))
//         ) : (
//            // Fallback if no banners
//            <View style={[styles.bannerTouchable, {height: BANNER_HEIGHT, backgroundColor:'#eee', justifyContent:'center', alignItems:'center'}]}>
//               <Text style={{color:'#999'}}>No Active Schemes</Text>
//            </View>
//         )}
//       </View>
//     </ScrollView>
//   );

//   if (checkLoading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <ActivityIndicator size="large" color={ACCENT_COLOR} />
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>
//           {isRegistered ? 'Gold Rates & Schemes' : 'Scheme Registration'}
//         </Text>
//         <View style={styles.headerPlaceholder} />
//       </View>
//       {isRegistered ? renderGoldSchemeUI() : renderRegistrationForm()}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   // ... (Keep existing styles)
//   container: { flex: 1, backgroundColor: '#F8F9FA' },
//   header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
//   backButton: { padding: 4, width: 32 },
//   headerTitle: { fontSize: 18, fontWeight: '600', color: '#000', flex: 1, textAlign: 'center' },
//   headerPlaceholder: { width: 32 },
//   scrollContent: { paddingBottom: 20 },
//   formContainer: { padding: 20, backgroundColor: '#fff', marginTop: 10 },
//   formTitle: { fontSize: 22, fontWeight: '700', color: '#000', marginBottom: 8 },
//   formSubtitle: { fontSize: 14, color: '#666', marginBottom: 24 },
//   inputGroup: { marginBottom: 20 },
//   label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
//   input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, padding: 12, fontSize: 16, color: '#000', backgroundColor: '#F9F9F9' },
//   textArea: { height: 100, textAlignVertical: 'top' },
//   uploadButton: { borderWidth: 1.5, borderColor: '#832729', borderStyle: 'dashed', borderRadius: 8, height: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FDF5F5', overflow: 'hidden' },
//   uploadPlaceholder: { alignItems: 'center' },
//   uploadText: { marginTop: 8, color: '#832729', fontWeight: '500' },
//   uploadedImage: { width: '100%', height: '100%' },
//   submitButton: { backgroundColor: '#832729', borderRadius: 8, paddingVertical: 16, alignItems: 'center', marginTop: 10 },
//   submitButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
//   titleSection: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 10, backgroundColor: '#fff' },
//   mainTitle: { fontSize: 22, fontWeight: '700', color: '#000', marginBottom: 4 },
//   dateText: { fontSize: 14, color: '#666' },
//   tabsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 16, backgroundColor: '#fff' },
//   tabsWrapper: { flexDirection: 'row', alignItems: 'center' },
//   tabButton: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, marginRight: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E0E0E0' },
//   selectedTabButton: { borderColor: '#832729' },
//   tabText: { fontSize: 13, fontWeight: '500', color: '#666' },
//   selectedTabText: { color: '#fff' },
//   coinIconContainer: { width: 60, height: 60, justifyContent: 'center', alignItems: 'center' },
//   coinIcon: { width: 50, height: 50 },
//   ratesContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: CONTAINER_PADDING, paddingBottom: 20, backgroundColor: '#fff', gap: GAP_SIZE },
//   rateCard: { width: CARD_WIDTH, backgroundColor: '#F9F9F9', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 4, borderWidth: 1, borderColor: '#EEEEEE', alignItems: 'center' },
//   rateType: { fontSize: 10, fontWeight: '600', color: '#555', textAlign: 'center' },
//   ratePrice: { fontSize: 13, fontWeight: '700', color: '#000', marginBottom: 4, marginTop: 2, textAlign: 'center' },
//   changeContainer: { flexDirection: 'row', alignItems: 'center' },
//   changeText: { fontSize: 10, fontWeight: '600', marginRight: 2 },
//   bannersContainer: { marginTop: 16, paddingHorizontal: 16, gap: 12 }, // Added gap for multiple banners
//   bannerTouchable: { width: '100%', borderRadius: 16, overflow: 'hidden', backgroundColor: '#fff', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
//   promoBanner: { height: BANNER_HEIGHT, width: '100%', justifyContent: 'center', alignItems: 'center' },
//   bannerImageStyle: { borderRadius: 16 },
// });

// export default GoldScheme;
import React, { useState, useEffect } from 'react';
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
  ImageBackground,
  TextInput,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { fetchUserSchemes } from '../redux/slices/schemeSlice';
import { 
  addSchemeHolderDetails, 
  fetchDailyMetalRates, 
  checkSchemeHolder,
  fetchSchemeBanners // Import new thunk
} from '../redux/slices/schemeSlice';

const { width } = Dimensions.get('window');
const BANNER_HEIGHT = 140;
const ACCENT_COLOR = '#832729';

const CONTAINER_PADDING = 16;
const GAP_SIZE = 8;
const CARD_WIDTH = Math.floor((width - (CONTAINER_PADDING * 2) - (GAP_SIZE * 2)) / 3);

const GoldScheme = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const customerId = useSelector((state) => state.Auth.customerId);
  const { userSchemes, schemesLoading } = useSelector((state) => state.scheme);
  const { 
    isRegistered,
    checkLoading,
    loading: registrationLoading,
    metalRates, 
    metalRatesLoading,
    metalRatesError,
    schemeBanners, // Get banners from state
    bannersLoading 
  } = useSelector((state) => state.scheme || {});

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [documentProof, setDocumentProof] = useState(null);
  const [documentUri, setDocumentUri] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Gold');

  const tabs = ['Gold', 'Silver', 'Platinum'];

  useEffect(() => {
    if (customerId) {
      dispatch(checkSchemeHolder(customerId));
      dispatch(fetchDailyMetalRates());
      dispatch(fetchSchemeBanners()); 
         dispatch(fetchUserSchemes(customerId));// Fetch banners
    }
  }, [dispatch, customerId]);

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

  // ... (handleImagePick & handleSubmit remain the same)
  const handleImageSelection = () => {
    Alert.alert(
      "Upload Document",
      "Choose an option",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Take Photo", onPress: handleCameraPick },
        { text: "Choose from Gallery", onPress: handleImagePick }
      ]
    );
  };

  const handleCameraPick = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs access to your camera",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert("Permission Denied", "Camera permission is required to take photos.");
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const options = { mediaType: 'photo', includeBase64: true, quality: 0.7 };
    try {
      const result = await launchCamera(options);
      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setDocumentUri(asset.uri);
        setDocumentProof(`data:${asset.type};base64,${asset.base64}`);
      }
    } catch (error) { console.error("Camera Error:", error); }
  };

  const handleImagePick = async () => {
    const options = { mediaType: 'photo', includeBase64: true, quality: 0.7 };
    try {
      const result = await launchImageLibrary(options);
      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setDocumentUri(asset.uri);
        setDocumentProof(`data:${asset.type};base64,${asset.base64}`);
      }
    } catch (error) { console.error("Image Picker Error:", error); }
  };

  const handleSubmit = () => {
    if (!name || !address || !phone || !documentProof) {
      Alert.alert('Validation Error', 'Please fill all fields and upload a document.');
      return;
    }
    dispatch(addSchemeHolderDetails({ userId: customerId, name, address, phoneNumber: phone, documentProof }))
      .then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          dispatch(checkSchemeHolder(customerId));
        }
      });
  };

  const handleBannerPress = (bannerUrl) => {
    if (!bannerUrl) return;
    // Pass the banner URL to the next screen
    if (isRegistered) {
       navigation.navigate('SchemeDetailsScreen', { bannerImage: bannerUrl });
    }
  };

  const renderRegistrationForm = () => (
    <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]} showsVerticalScrollIndicator={false}>
      {/* ... (Same Form UI) ... */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Join Geeta Jewellers Scheme</Text>
        <Text style={styles.formSubtitle}>Please enter your details to enroll in the scheme.</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name *</Text>
          <TextInput style={styles.input} placeholder="Enter your name" placeholderTextColor="#999" value={name} onChangeText={setName} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number *</Text>
          <TextInput style={styles.input} placeholder="Enter phone number" placeholderTextColor="#999" keyboardType="phone-pad" maxLength={10} value={phone} onChangeText={setPhone} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address *</Text>
          <TextInput style={[styles.input, styles.textArea]} placeholder="Enter your full address" placeholderTextColor="#999" multiline numberOfLines={3} value={address} onChangeText={setAddress} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Document Proof * (ID/Aadhar)</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={handleImageSelection}>
            {documentUri ? (
              <Image source={{ uri: documentUri }} style={styles.uploadedImage} resizeMode="cover" />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Ionicons name="cloud-upload-outline" size={32} color="#832729" />
                <Text style={styles.uploadText}>Click to Upload Image</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={registrationLoading}>
          {registrationLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Submit & Proceed</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

//   const renderGoldSchemeUI = () => (
// <ScrollView
//   showsVerticalScrollIndicator={false}
//   contentContainerStyle={[
//     styles.scrollContent,
//     { paddingBottom: insets.bottom + 20, }
//   ]}
// >      <View style={styles.titleSection}>
//         {/* <Text style={styles.mainTitle}>Metal Rates in Rajahmundry</Text> */}
//         <Text style={styles.dateText}>
//           {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
//         </Text>
//       </View>

//       <View style={styles.tabsContainer}>
//         <View style={styles.tabsWrapper}>
//           {tabs.map((tab, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.tabButton,
//                 selectedTab === tab && [styles.selectedTabButton, { backgroundColor: ACCENT_COLOR, borderColor: ACCENT_COLOR }]
//               ]}
//               onPress={() => setSelectedTab(tab)}
//             >
//               <Text style={[styles.tabText, selectedTab === tab && styles.selectedTabText]}>{tab}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//         <View style={styles.coinIconContainer}>
//           <Image source={require('../assets/coins.png')} style={styles.coinIcon} resizeMode="contain" />
//         </View>
//       </View>

//       <View style={styles.ratesContainer}>
//         {metalRatesLoading ? (
//           <ActivityIndicator size="small" color={ACCENT_COLOR} style={{ marginVertical: 20 }} />
//         ) : displayRates.length > 0 ? (
//           displayRates.map((rate, index) => (
//             <View key={index} style={styles.rateCard}>
//               <View style={{ height: 20, justifyContent: 'center' }}>
//                 <Text style={styles.rateType} numberOfLines={1} adjustsFontSizeToFit>{rate.type}</Text>
//               </View>
//               <Text style={styles.ratePrice}>₹{rate.price?.toLocaleString('en-IN')}</Text>
//               <View style={styles.changeContainer}>
//                 <Text style={[styles.changeText, { color: '#0D5C4A' }]}>Live</Text>
//                 <Ionicons name="pulse" size={12} color="#0D5C4A" />
//               </View>
//             </View>
//           ))
//         ) : (
//           <Text style={{ textAlign: 'center', color: '#999', marginTop: 20 }}>
//             {metalRatesError || 'Rates unavailable'}
//           </Text>
//         )}
//       </View>

//       {/* Dynamic Banners */}
//       <View style={styles.bannersContainer}>
//         {bannersLoading ? (
//            <ActivityIndicator size="small" color={ACCENT_COLOR} />
//         ) : schemeBanners && schemeBanners.length > 0 ? (
//           schemeBanners.map((banner) => (
//             <TouchableOpacity 
//               key={banner.id} 
//               activeOpacity={0.9} 
//               onPress={() => handleBannerPress(banner.banner_image)} 
//               style={styles.bannerTouchable}
//             >
//               <ImageBackground 
//                 source={{ uri: banner.banner_image }} 
//                 style={styles.promoBanner} 
//                 resizeMode="cover" 
//                 imageStyle={styles.bannerImageStyle} 
//               />
//             </TouchableOpacity>
//           ))
//         ) : (
//            <View style={[styles.bannerTouchable, {height: BANNER_HEIGHT, backgroundColor:'#eee', justifyContent:'center', alignItems:'center'}]}>
//               <Text style={{color:'#999'}}>No Active Schemes</Text>
//            </View>
//         )}
//       </View>

//       {userSchemes && userSchemes.length > 0 && (
//   <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
    
//     <View style={{ 
//       flexDirection: 'row', 
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: 12 
//     }}>
//       <Text style={{ fontSize: 18, fontWeight: '700', color: '#000' }}>
//         My Schemes
//       </Text>

//       <TouchableOpacity
//         onPress={() => navigation.navigate('MySchemesScreen')}
//       >
//         <Text style={{ color: ACCENT_COLOR, fontWeight: '600' }}>
//           View All
//         </Text>
//       </TouchableOpacity>
//     </View>

//     {userSchemes.slice(0,2).map((item) => (
//       <TouchableOpacity
//         key={item.id}
//         style={{
//           backgroundColor: '#fff',
//           borderRadius: 12,
//           padding: 16,
//           marginBottom: 12,
//           elevation: 3
//         }}
//         onPress={() =>
//           navigation.navigate('IndividualSchemeDetails', { id: item.id })
//         }
//       >
//         <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 4 }}>
//           {item.name}
//         </Text>

//         <Text style={{ fontSize: 13, color: '#666', marginBottom: 10 }}>
//           Scheme ID: {item.scheme_id}
//         </Text>

//         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          
//           <View>
//             <Text style={{ fontSize: 12, color: '#777' }}>Tenure</Text>
//             <Text style={{ fontWeight: '600' }}>{item.tenure} months</Text>
//           </View>

//           <View>
//             <Text style={{ fontSize: 12, color: '#777' }}>Monthly</Text>
//             <Text style={{ fontWeight: '600' }}>
//               ₹{Number(item.installment_amount).toLocaleString()}
//             </Text>
//           </View>

//           <View>
//             <Text style={{ fontSize: 12, color: '#777' }}>Status</Text>
//             <Text style={{
//               color: item.profile_status === 2 ? '#2e7d32' : '#e65100',
//               fontWeight: '600'
//             }}>
//               {item.profile_status === 2 ? 'Active' : 'Under Review'}
//             </Text>
//           </View>

//         </View>
//       </TouchableOpacity>
//     ))}

//   </View>
// )}
//     </ScrollView>
//   );
const renderGoldSchemeUI = () => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    // flexGrow: 1 is the secret sauce for making the container expandable
    contentContainerStyle={[
      styles.scrollContent,
      { paddingBottom: insets.bottom + 150, flexGrow: 1 } 
    ]}
  >
    {/* 1. Title Section */}
    <View style={styles.titleSection}>
      <Text style={styles.dateText}>
        {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
      </Text>
    </View>

    {/* 2. Tabs */}
    <View style={styles.tabsContainer}>
      <View style={styles.tabsWrapper}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tabButton,
              selectedTab === tab && [styles.selectedTabButton, { backgroundColor: ACCENT_COLOR, borderColor: ACCENT_COLOR }]
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.selectedTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.coinIconContainer}>
        <Image source={require('../assets/coins.png')} style={styles.coinIcon} resizeMode="contain" />
      </View>
    </View>

    {/* 3. Rates Grid */}
    <View style={styles.ratesContainer}>
      {metalRatesLoading ? (
        <ActivityIndicator size="small" color={ACCENT_COLOR} style={{ marginVertical: 20, width: '100%' }} />
      ) : displayRates.length > 0 ? (
        displayRates.map((rate, index) => (
          <View key={index} style={styles.rateCard}>
            <View style={{ height: 20, justifyContent: 'center' }}>
              <Text style={styles.rateType} numberOfLines={1} adjustsFontSizeToFit>{rate.type}</Text>
            </View>
            <Text style={styles.ratePrice}>₹{rate.price?.toLocaleString('en-IN')}</Text>
            <View style={styles.changeContainer}>
              <Text style={[styles.changeText, { color: '#0D5C4A' }]}>Live</Text>
              <Ionicons name="pulse" size={12} color="#0D5C4A" />
            </View>
          </View>
        ))
      ) : (
        <Text style={{ textAlign: 'center', color: '#999', marginTop: 20, width: '100%' }}>
          {metalRatesError || 'Rates unavailable'}
        </Text>
      )}
    </View>

    {/* 4. Dynamic Banners */}
    <View style={styles.bannersContainer}>
      {bannersLoading ? (
         <ActivityIndicator size="small" color={ACCENT_COLOR} />
      ) : schemeBanners?.length > 0 ? (
        schemeBanners.map((banner) => (
          <TouchableOpacity 
            key={banner.id} 
            activeOpacity={0.9} 
            onPress={() => handleBannerPress(banner.banner_image)} 
            style={styles.bannerTouchable}
          >
            <ImageBackground 
              source={{ uri: banner.banner_image }} 
              style={styles.promoBanner} 
              resizeMode="cover" 
              imageStyle={styles.bannerImageStyle} 
            />
          </TouchableOpacity>
        ))
      ) : null}
    </View>

    {/* 5. My Schemes Section - Now showing ALL data */}
    {userSchemes && userSchemes.length > 0 && (
      <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
        <View style={styles.schemeHeader}>
          <Text style={styles.schemeHeaderTitle}>My Schemes</Text>
          {/* View All removed as requested */}
        </View>

        {/* Removed .slice(0, 2) to render every item in the array */}
        {userSchemes.map((item) => renderSchemeItem(item))}
      </View>
    )}
  </ScrollView>
);
  // ... (checkLoading check and return)
  if (checkLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={ACCENT_COLOR} />
        </View>
      </SafeAreaView>
    );
  }


  const renderSchemeItem = (item) => (
  <TouchableOpacity
    key={item.id}
    style={styles.schemeCard}
    activeOpacity={0.8}
    onPress={() => navigation.navigate('IndividualSchemeDetails', { id: item.id })}
  >
    <View style={styles.schemeCardContent}>
      <Text style={styles.schemeName}>{item.name}</Text>
      <Text style={styles.schemeId}>Scheme ID: {item.scheme_id}</Text>

      <View style={styles.schemeRow}>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Tenure</Text>
          <Text style={styles.value}>{item.tenure} months</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Monthly</Text>
          <Text style={styles.value}>
            ₹{Number(item.installment_amount).toLocaleString()}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Status</Text>
          <Text
            style={[
              styles.status,
              item.profile_status === 2
                ? styles.statusApproved
                : styles.statusPending,
            ]}
          >
            {item.profile_status === 2 ? 'Active' : 'Under Review'}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);
return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      {/* Header stays fixed at top */}
      <View style={[styles.header,{paddingTop:insets.top+5}]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isRegistered ? 'Gold Rates & Schemes' : 'Scheme Registration'}
        </Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* The content below the header scrolls */}
      <View style={{ flex: 1 }}>
        {isRegistered ? renderGoldSchemeUI() : renderRegistrationForm()}
      </View>
    </SafeAreaView>
  );
};

// ... (Styles remain the same)
const styles = StyleSheet.create({
  // ... (Paste existing styles here)
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  backButton: { padding: 4, width: 32 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#000', flex: 1, textAlign: 'center' },
  headerPlaceholder: { width: 32 },
  scrollContent: { paddingBottom: 20 },
  formContainer: { padding: 20, backgroundColor: '#fff', marginTop: 10 },
  formTitle: { fontSize: 22, fontWeight: '700', color: '#000', marginBottom: 8 },
  formSubtitle: { fontSize: 14, color: '#666', marginBottom: 24 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, padding: 12, fontSize: 16, color: '#000', backgroundColor: '#F9F9F9' },
  textArea: { height: 100, textAlignVertical: 'top' },
  uploadButton: { borderWidth: 1.5, borderColor: '#832729', borderStyle: 'dashed', borderRadius: 8, height: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FDF5F5', overflow: 'hidden' },
  uploadPlaceholder: { alignItems: 'center' },
  uploadText: { marginTop: 8, color: '#832729', fontWeight: '500' },
  uploadedImage: { width: '100%', height: '100%' },
  submitButton: { backgroundColor: '#832729', borderRadius: 8, paddingVertical: 16, alignItems: 'center', marginTop: 10 },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  titleSection: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 10, backgroundColor: '#fff' },
  mainTitle: { fontSize: 20, fontWeight: '700', color: '#000', marginBottom: 4 },
  dateText: { fontSize: 14, color: '#666' },
  tabsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 16, backgroundColor: '#fff' },
  tabsWrapper: { flexDirection: 'row', alignItems: 'center' },
  tabButton: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, marginRight: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E0E0E0' },
  selectedTabButton: { borderColor: '#832729' },
  tabText: { fontSize: 13, fontWeight: '500', color: '#666' },
  selectedTabText: { color: '#fff' },
  coinIconContainer: { width: 60, height: 60, justifyContent: 'center', alignItems: 'center' },
  coinIcon: { width: 50, height: 50 },
  ratesContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: CONTAINER_PADDING, paddingBottom: 20, backgroundColor: '#fff', gap: GAP_SIZE },
  rateCard: { width: CARD_WIDTH, backgroundColor: '#F9F9F9', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 4, borderWidth: 1, borderColor: '#EEEEEE', alignItems: 'center' },
  rateType: { fontSize: 10, fontWeight: '600', color: '#555', textAlign: 'center' },
  ratePrice: { fontSize: 13, fontWeight: '700', color: '#000', marginBottom: 4, marginTop: 2, textAlign: 'center' },
  changeContainer: { flexDirection: 'row', alignItems: 'center' },
  changeText: { fontSize: 10, fontWeight: '600', marginRight: 2 },
  bannersContainer: { marginTop: 16, paddingHorizontal: 16, gap: 12 },
  bannerTouchable: { width: '100%', borderRadius: 16, overflow: 'hidden', backgroundColor: '#fff', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  promoBanner: { height: BANNER_HEIGHT, width: '100%', justifyContent: 'center', alignItems: 'center' },
  bannerImageStyle: { borderRadius: 16 },
  mySchemesContainer: {
  marginTop: 20,
  paddingHorizontal: 16,
},

schemeHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
},

schemeHeaderTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: '#000',
},

viewAllText: {
  fontSize: 14,
  color: ACCENT_COLOR,
  fontWeight: '600',
},

schemeCard: {
  backgroundColor: '#fff',
  borderRadius: 12,
  marginBottom: 12,
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
},

schemeCardContent: {
  padding: 16,
},

schemeRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
});

export default GoldScheme;