// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   FlatList,
// //   StatusBar,
// //   StyleSheet,
// //   TouchableOpacity,
// //   SafeAreaView,
// //   ScrollView,
// //   Platform,
// // } from 'react-native';
// // import Icon from 'react-native-vector-icons/MaterialIcons';
// // import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// // const ApplyCouponScreen = ({ navigation }) => {
// //   const [promoCode, setPromoCode] = useState('');

// //   // Sample static data (for UI only)
// //   const totalAmount = 1000;
// //   const coupons = [
// //     {
// //       id: 1,
// //       coupon_name: 'SAVE10',
// //       coupon_description: 'Get 10% off',
// //       coupon_percentage: '10',
// //       coupon_upto_price: '500',
// //       coupon_max_price_limit: '150',
// //     },
// //     {
// //       id: 2,
// //       coupon_name: 'BIGDISCOUNT',
// //       coupon_description: 'Flat ₹200 off on ₹1500+',
// //       coupon_percentage: '0',
// //       coupon_upto_price: '1500',
// //       coupon_max_price_limit: '200',
// //     },
// //   ];

// //   const handleApplyCoupon = (coupon) => {
// //     console.log('Applied Coupon:', coupon);
// //     // navigation.goBack(); // For actual navigation
// //   };

// //   const renderCoupon = ({ item }) => (
// //     <View
// //       style={[
// //         styles.couponContainer,
// //         totalAmount < parseFloat(item.coupon_upto_price || 0) && styles.disabledCoupon,
// //       ]}
// //     >
// //       <View style={styles.couponHeader}>
// //         <Text style={styles.couponCode}>{item.coupon_name}</Text>
// //         <TouchableOpacity
// //           style={styles.applyButton}
// //           onPress={() => handleApplyCoupon(item)}
// //           disabled={totalAmount < parseFloat(item.coupon_upto_price || 0)}
// //         >
// //           <Text style={styles.applyButtonText}>Apply</Text>
// //         </TouchableOpacity>
// //       </View>
// //       <Text style={styles.couponTitle}>{item.coupon_description}</Text>
// //       <Text style={styles.couponValidity}>
// //         Min. Purchase: ₹{parseFloat(item.coupon_upto_price || 0).toFixed(2)}
// //       </Text>
// //       {parseFloat(item.coupon_max_price_limit || 0) > 0 && (
// //         <Text style={styles.couponValidity}>
// //           Max Discount: ₹{parseFloat(item.coupon_max_price_limit || 0).toFixed(2)}
// //         </Text>
// //       )}
// //       <TouchableOpacity>
// //         <Text style={styles.viewDetails}>View Details</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );

// //   return (
// //     <ScrollView>
// //       <SafeAreaView style={styles.container}>
// //         <StatusBar backgroundColor="#fff" barStyle="dark-content" />

// //         {/* Header */}
// //         <View style={styles.header}>
// //           <TouchableOpacity onPress={() => navigation.goBack()}>
// //             <Icon name="arrow-back" size={wp('6%')} color="#000" />
// //           </TouchableOpacity>
// //           <Text style={styles.headerTitle}>Apply Coupon</Text>
// //         </View>

// //         {/* Promo Code Input */}
// //         <View style={styles.promoContainer}>
// //           <Text style={styles.promoLabel}>Have a Promo Code?</Text>
// //           <View style={styles.inputContainer}>
// //             <TextInput
// //               style={styles.promoInput}
// //               placeholder="Enter coupon code"
// //               placeholderTextColor="#999"
// //               value={promoCode}
// //               onChangeText={setPromoCode}
// //             />
// //             <TouchableOpacity style={styles.clearButton} onPress={() => setPromoCode('')}>
// //               <Icon name="close" size={wp('5%')} color="#000" />
// //             </TouchableOpacity>
// //           </View>
// //           <TouchableOpacity style={styles.promoApplyButton}>
// //             <Text style={styles.promoApplyButtonText}>Apply</Text>
// //           </TouchableOpacity>
// //         </View>


// //         {/* Available Coupons */}
// //         <View style={styles.couponsSection}>
// //           <Text style={styles.sectionTitle}>Available Coupons for You</Text>
// //           {coupons.length === 0 ? (
// //             <View style={styles.emptyCouponsContainer}>
// //               <Icon name="local-offer" size={wp('20%')} color="#999" />
// //               <Text style={styles.emptyCouponsText}>No applicable coupons available</Text>
// //               <Text style={styles.emptyCouponsSubtext}>Total cart value: ₹{totalAmount.toFixed(2)}</Text>
// //             </View>
// //           ) : (
// //             <FlatList
// //               data={coupons}
// //               renderItem={renderCoupon}
// //               keyExtractor={(item) => item.id.toString()}
// //               contentContainerStyle={styles.couponList}
// //             />
// //           )}
// //         </View>
// //       </SafeAreaView>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#FFF' },
// //   header: {
// //     backgroundColor: '#fff',
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     paddingHorizontal: wp('4%'),
// //     paddingVertical: hp('2%'),
// //     paddingTop: hp('6%'),
// //   },
// //   headerTitle: {
// //     flex: 1,
// //     color: '#000',
// //     fontSize: wp('5%'),
// //     fontWeight: 'bold',
// //     marginLeft: wp('4%'),
// //   },
// //   promoContainer: {
// //     paddingHorizontal: wp('4%'),
// //     paddingVertical: hp('2%'),
// //     backgroundColor: '#FFF',
// //   },
// //   promoLabel: {
// //     fontSize: wp('4%'),
// //     fontWeight: '600',
// //     color: '#000',
// //     marginBottom: hp('1%'),
// //   },
// //   inputContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     borderWidth: 1,
// //     borderColor: '#CCC',
// //     borderRadius: 8,
// //     backgroundColor: '#F5F5F5',
// //   },
// //   promoInput: {
// //     flex: 1,
// //     padding: wp('3%'),
// //     fontSize: wp('4%'),
// //     color: '#000',
// //   },
// //   clearButton: { padding: wp('2%') },
// //   promoApplyButton: {
// //     backgroundColor: '#262757',
// //     borderRadius: 8,
// //     paddingVertical: hp('1.5%'),
// //     alignItems: 'center',
// //     marginTop: hp('1%'),
// //   },
// //   promoApplyButtonText: {
// //     fontSize: wp('4%'),
// //     fontWeight: 'bold',
// //     color: '#FFF',
// //   },
// //   couponsSection: {
// //     flex: 1,
// //     paddingHorizontal: wp('4%'),
// //   },
// //   sectionTitle: {
// //     fontSize: wp('4.5%'),
// //     fontWeight: 'bold',
// //     color: '#000',
// //     marginBottom: hp('2%'),
// //   },
// //   couponList: {
// //     paddingBottom: hp('2%'),
// //   },
// //   couponContainer: {
// //     borderWidth: 1,
// //     borderColor: '#CCC',
// //     borderRadius: 8,
// //     padding: wp('4%'),
// //     marginBottom: hp('2%'),
// //     backgroundColor: '#FFF',
// //     elevation: 2,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 2,
// //   },
// //   disabledCoupon: {
// //     backgroundColor: '#f0f0f0',
// //     opacity: 0.6,
// //   },
// //   couponHeader: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginBottom: hp('1%'),
// //   },
// //   couponCode: {
// //     fontSize: wp('5%'),
// //     fontWeight: 'bold',
// //     color: '#262757',
// //   },
// //   applyButton: {
// //     backgroundColor: '#262757',
// //     borderRadius: 20,
// //     paddingVertical: hp('1%'),
// //     paddingHorizontal: wp('4%'),
// //   },
// //   applyButtonText: {
// //     fontSize: wp('3.5%'),
// //     fontWeight: 'bold',
// //     color: '#FFF',
// //   },
// //   couponTitle: {
// //     fontSize: wp('3.5%'),
// //     color: '#000',
// //     marginBottom: hp('0.5%'),
// //   },
// //   couponValidity: {
// //     fontSize: wp('3%'),
// //     color: '#666',
// //     marginBottom: hp('0.5%'),
// //   },
// //   viewDetails: {
// //     fontSize: wp('3.5%'),
// //     color: '#4B3395',
// //     fontWeight: '600',
// //   },
// //   emptyCouponsContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginTop: hp('10%'),
// //   },
// //   emptyCouponsText: {
// //     fontSize: wp('4%'),
// //     color: '#666',
// //     marginTop: hp('2%'),
// //     textAlign: 'center',
// //   },
// //   emptyCouponsSubtext: {
// //     fontSize: wp('3%'),
// //     color: '#999',
// //     marginTop: hp('1%'),
// //     textAlign: 'center',
// //   },
// // });

// // export default ApplyCouponScreen;
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   StatusBar,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   Platform,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useDispatch, useSelector } from 'react-redux';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Toast from 'react-native-toast-message';
// import { fetchCoupons, clearError } from '../redux/slices/couponSlice';
// import { fetchCartItems } from '../redux/slices/cartSlice';

// const ApplyCouponScreen = ({ navigation, route }) => {
//   const [promoCode, setPromoCode] = useState('');
//   const dispatch = useDispatch();
//   const { coupons, loading, error } = useSelector((state) => state.coupon || {});
//   const { cartItems, loading: cartLoading, error: cartError } = useSelector((state) => state.cart || {});
//   const { customerId } = useSelector((state) => state.Auth || {});

//   // Calculate total cart amount
//   const totalAmount = cartItems.reduce((sum, item) => {
//     const price = parseFloat(item.product_price || 0);
//     const qty = parseInt(item.selectedQty || 1);
//     return sum + price * qty;
//   }, 0);

//   // Fetch coupons and cart items on mount
//   useEffect(() => {
//     dispatch(fetchCoupons());
//     if (customerId) {
//       dispatch(fetchCartItems(customerId));
//     }
//   }, [dispatch, customerId]);

//   // Handle error toast
//   useEffect(() => {
//     if (error || cartError) {
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: error || cartError || 'Failed to load data. Please try again.',
//       });
//       dispatch(clearError());
//     }
//   }, [error, cartError, dispatch]);

//   // Handle promo code application
//   const handleApplyPromoCode = () => {
//     const coupon = coupons.find(
//       (c) => c.coupon_name.toLowerCase() === promoCode.trim().toLowerCase()
//     );
//     if (!coupon) {
//       Toast.show({
//         type: 'error',
//         text1: 'Invalid Coupon',
//         text2: 'The entered coupon code is not valid.',
//       });
//       return;
//     }
//     if (totalAmount < parseFloat(coupon.coupon_upto_price || 0)) {
//       Toast.show({
//         type: 'error',
//         text1: 'Coupon Not Applicable',
//         text2: `Minimum purchase of ₹${coupon.coupon_upto_price} required.`,
//       });
//       return;
//     }
//     navigation.navigate({
//       name: route.params?.previousScreen || 'CheckoutScreen',
//       params: { selectedCoupon: coupon },
//       merge: true,
//     });
//   };

//   // Handle coupon selection
//   const handleApplyCoupon = (coupon) => {
//     if (totalAmount < parseFloat(coupon.coupon_upto_price || 0)) {
//       Toast.show({
//         type: 'error',
//         text1: 'Coupon Not Applicable',
//         text2: `Minimum purchase of ₹${coupon.coupon_upto_price} required.`,
//       });
//       return;
//     }
//     navigation.navigate({
//       name: route.params?.previousScreen || 'CheckoutScreen',
//       params: { selectedCoupon: coupon },
//       merge: true,
//     });
//   };

//   // const renderCoupon = ({ item }) => (
//   //   <View
//   //     style={[
//   //       styles.couponContainer,
//   //       totalAmount < parseFloat(item.coupon_upto_price || 0) && styles.disabledCoupon,
//   //     ]}
//   //   >
//   //     <View style={styles.couponHeader}>
//   //       <Text style={styles.couponCode}>{item.coupon_name}</Text>
//   //       <TouchableOpacity
//   //         style={styles.applyButton}
//   //         onPress={() => handleApplyCoupon(item)}
//   //         disabled={totalAmount < parseFloat(item.coupon_upto_price || 0)}
//   //       >
//   //         <Text style={styles.applyButtonText}>Apply</Text>
//   //       </TouchableOpacity>
//   //     </View>
//   //     <Text style={styles.couponTitle}>{item.coupon_description}</Text>
//   //     <Text style={styles.couponValidity}>
//   //       Min. Purchase: ₹{parseFloat(item.coupon_upto_price || 0).toFixed(2)}
//   //     </Text>
//   //     {parseFloat(item.coupon_max_price_limit || 0) > 0 && (
//   //       <Text style={styles.couponValidity}>
//   //         Max Discount: ₹{parseFloat(item.coupon_max_price_limit || 0).toFixed(2)}
//   //       </Text>
//   //     )}
//   //     <TouchableOpacity>
//   //       <Text style={styles.viewDetails}>View Details</Text>
//   //     </TouchableOpacity>
//   //   </View>
//   // );
//   const renderCoupon = ({ item }) => {
//     const isApplicable = totalAmount >= parseFloat(item.coupon_upto_price || 0);
  
//     return (
//       <View
//         style={[
//           styles.couponContainer,
//           !isApplicable && styles.disabledCoupon,
//         ]}
//       >
//         <View style={styles.couponHeader}>
//           <Text style={styles.couponCode}>{item.coupon_name}</Text>
//           <TouchableOpacity
//             style={[
//               styles.applyButton,
//               !isApplicable && styles.disabledApplyButton,
//             ]}
//             onPress={() => handleApplyCoupon(item)}
//             disabled={!isApplicable}
//           >
//             <Text style={styles.applyButtonText}>Apply</Text>
//           </TouchableOpacity>
//         </View>
  
//         <Text style={styles.couponTitle}>{item.coupon_description}</Text>
//         <Text style={styles.couponValidity}>
//           Min. Purchase: ₹{parseFloat(item.coupon_upto_price || 0).toFixed(2)}
//         </Text>
//         {parseFloat(item.coupon_max_price_limit || 0) > 0 && (
//           <Text style={styles.couponValidity}>
//             Max Discount: ₹{parseFloat(item.coupon_max_price_limit || 0).toFixed(2)}
//           </Text>
//         )}
//         <TouchableOpacity>
//           <Text style={styles.viewDetails}>View Details</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };
  
//   // Render loading state
//   if (loading || cartLoading) {
//     return (
//       <SafeAreaView style={styles.loadingContainer}>
//         <StatusBar backgroundColor="#fff" barStyle="dark-content" />
//         <Icon name="autorenew" size={wp('10%')} color="#262757" />
//         <Text style={styles.loadingText}>Loading...</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <ScrollView>
//       <SafeAreaView style={styles.container}>
//         <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Icon name="arrow-back" size={wp('6%')} color="#000" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Apply Coupon</Text>
//         </View>

//         {/* Promo Code Input */}
//         <View style={styles.promoContainer}>
//           <Text style={styles.promoLabel}>Have a Promo Code?</Text>
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.promoInput}
//               placeholder="Enter coupon code"
//               placeholderTextColor="#999"
//               value={promoCode}
//               onChangeText={setPromoCode}
//             />
//             <TouchableOpacity style={styles.clearButton} onPress={() => setPromoCode('')}>
//               <Icon name="close" size={wp('5%')} color="#000" />
//             </TouchableOpacity>
//           </View>
//           <TouchableOpacity
//             style={[styles.promoApplyButton, !promoCode && styles.disabledPromoButton]}
//             onPress={handleApplyPromoCode}
//             disabled={!promoCode}
//           >
//             <Text style={styles.promoApplyButtonText}>Apply</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Available Coupons */}
//         <View style={styles.couponsSection}>
//           <Text style={styles.sectionTitle}>Available Coupons for You</Text>
//           {coupons.length === 0 ? (
//             <View style={styles.emptyCouponsContainer}>
//               <Icon name="local-offer" size={wp('20%')} color="#999" />
//               <Text style={styles.emptyCouponsText}>No applicable coupons available</Text>
//               <Text style={styles.emptyCouponsSubtext}>Total cart value: ₹{totalAmount.toFixed(2)}</Text>
//             </View>
//           ) : (
//             <FlatList
//               data={coupons}
//               renderItem={renderCoupon}
//               keyExtractor={(item) => item.id.toString()}
//               contentContainerStyle={styles.couponList}
//             />
//           )}
//         </View>
//       </SafeAreaView>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#FFF' },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFF',
//   },
//   loadingText: {
//     fontSize: wp('4%'),
//     color: '#262757',
//     marginTop: hp('2%'),
//   },
//   header: {
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: wp('4%'),
//     paddingVertical: hp('2%'),
//     paddingTop: Platform.OS === 'ios' ? hp('6%') : hp('5%'),
//   },
//   headerTitle: {
//     flex: 1,
//     color: '#000',
//     fontSize: wp('5%'),
//     fontWeight: 'bold',
//     marginLeft: wp('4%'),
//   },
//   promoContainer: {
//     paddingHorizontal: wp('4%'),
//     paddingVertical: hp('2%'),
//     backgroundColor: '#FFF',
//   },
//   promoLabel: {
//     fontSize: wp('4%'),
//     fontWeight: '600',
//     color: '#000',
//     marginBottom: hp('1%'),
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#CCC',
//     borderRadius: 8,
//     backgroundColor: '#F5F5F5',
//   },
//   promoInput: {
//     flex: 1,
//     padding: wp('3%'),
//     fontSize: wp('4%'),
//     color: '#000',
//   },
//   clearButton: { padding: wp('2%') },
//   promoApplyButton: {
//     backgroundColor: '#262757',
//     borderRadius: 8,
//     paddingVertical: hp('1.5%'),
//     alignItems: 'center',
//     marginTop: hp('1%'),
//   },
//   disabledPromoButton: {
//     backgroundColor: '#999',
//     opacity: 0.6,
//   },
//   promoApplyButtonText: {
//     fontSize: wp('4%'),
//     fontWeight: 'bold',
//     color: '#FFF',
//   },
//   couponsSection: {
//     flex: 1,
//     paddingHorizontal: wp('4%'),
//   },
//   sectionTitle: {
//     fontSize: wp('4.5%'),
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: hp('2%'),
//   },
//   couponList: {
//     paddingBottom: hp('2%'),
//   },
//   couponContainer: {
//     borderWidth: 1,
//     borderColor: '#CCC',
//     borderRadius: 8,
//     padding: wp('4%'),
//     marginBottom: hp('2%'),
//     backgroundColor: '#FFF',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   disabledApplyButton: {
//     backgroundColor: '#999',
//     opacity: 0.6,
//   },
//   couponHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: hp('1%'),
//   },
//   couponCode: {
//     fontSize: wp('5%'),
//     fontWeight: 'bold',
//     color: '#262757',
//   },
//   applyButton: {
//     backgroundColor: '#262757',
//     borderRadius: 20,
//     paddingVertical: hp('1%'),
//     paddingHorizontal: wp('4%'),
//   },
//   applyButtonText: {
//     fontSize: wp('3.5%'),
//     fontWeight: 'bold',
//     color: '#FFF',
//   },
//   couponTitle: {
//     fontSize: wp('3.5%'),
//     color: '#000',
//     marginBottom: hp('0.5%'),
//   },
//   couponValidity: {
//     fontSize: wp('3%'),
//     color: '#666',
//     marginBottom: hp('0.5%'),
//   },
//   viewDetails: {
//     fontSize: wp('3.5%'),
//     color: '#4B3395',
//     fontWeight: '600',
//   },
//   emptyCouponsContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: hp('10%'),
//   },
//   emptyCouponsText: {
//     fontSize: wp('4%'),
//     color: '#666',
//     marginTop: hp('2%'),
//     textAlign: 'center',
//   },
//   emptyCouponsSubtext: {
//     fontSize: wp('3%'),
//     color: '#999',
//     marginTop: hp('1%'),
//     textAlign: 'center',
//   },
// });

// export default ApplyCouponScreen;
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import { fetchCoupons, clearError } from '../redux/slices/couponSlice';
import { fetchCartItems } from '../redux/slices/cartSlice';

const ApplyCouponScreen = ({ navigation, route }) => {
  const [promoCode, setPromoCode] = useState('');
  const dispatch = useDispatch();
  const { coupons, loading, error } = useSelector((state) => state.coupon || {});
  const { cartItems, loading: cartLoading, error: cartError } = useSelector((state) => state.cart || {});
  const { customerId } = useSelector((state) => state.Auth || {});
  const totalAmount = route.params?.totalPrice || 0; // Use totalPrice from Cart

  // Fetch coupons and cart items on mount
  useEffect(() => {
    dispatch(fetchCoupons());
    if (customerId) {
      dispatch(fetchCartItems(customerId));
    }
  }, [dispatch, customerId]);

  // Handle error toast
  useEffect(() => {
    if (error || cartError) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error || cartError || 'Failed to load data. Please try again.',
      });
      dispatch(clearError());
    }
  }, [error, cartError, dispatch]);

  // Calculate coupon discount
  const calculateCouponDiscount = (coupon) => {
    let discount = 0;
    if (parseFloat(coupon.coupon_percentage) > 0) {
      // Percentage-based discount
      discount = totalAmount * (parseFloat(coupon.coupon_percentage) / 100);
      if (coupon.coupon_max_price_limit && discount > parseFloat(coupon.coupon_max_price_limit)) {
        discount = parseFloat(coupon.coupon_max_price_limit);
      }
    } else if (coupon.coupon_max_price_limit) {
      // Flat discount
      discount = parseFloat(coupon.coupon_max_price_limit);
    }
    return Math.min(discount, totalAmount); // Ensure discount doesn't exceed total price
  };

  // Handle promo code application
  const handleApplyPromoCode = () => {
    const coupon = coupons.find(
      (c) => c.coupon_name.toLowerCase() === promoCode.trim().toLowerCase()
    );
    if (!coupon) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Coupon',
        text2: 'The entered coupon code is not valid.',
      });
      return;
    }
    if (totalAmount < parseFloat(coupon.coupon_upto_price || 0)) {
      Toast.show({
        type: 'error',
        text1: 'Coupon Not Applicable',
        text2: `Minimum purchase of ₹${coupon.coupon_upto_price} required.`,
      });
      return;
    }
    const discount = calculateCouponDiscount(coupon);
    navigation.navigate({
      name: route.params?.previousScreen || 'Cart',
      params: { selectedCoupon: { ...coupon, discount } },
      merge: true,
    });
  };

  // Handle coupon selection
  const handleApplyCoupon = (coupon) => {
    if (totalAmount < parseFloat(coupon.coupon_upto_price || 0)) {
      Toast.show({
        type: 'error',
        text1: 'Coupon Not Applicable',
        text2: `Minimum purchase of ₹${coupon.coupon_upto_price} required.`,
      });
      return;
    }
    const discount = calculateCouponDiscount(coupon);
    navigation.navigate({
      name: route.params?.previousScreen || 'Cart',
      params: { selectedCoupon: { ...coupon, discount } },
      merge: true,
    });
  };

  const renderCoupon = ({ item }) => {
    const isApplicable = totalAmount >= parseFloat(item.coupon_upto_price || 0);

    return (
      <View
        style={[
          styles.couponContainer,
          !isApplicable && styles.disabledCoupon,
        ]}
      >
        <View style={styles.couponHeader}>
          <Text style={styles.couponCode}>{item.coupon_name}</Text>
          <TouchableOpacity
            style={[
              styles.applyButton,
              !isApplicable && styles.disabledApplyButton,
            ]}
            onPress={() => handleApplyCoupon(item)}
            disabled={!isApplicable}
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.couponTitle}>{item.coupon_description}</Text>
        <Text style={styles.couponValidity}>
          Min. Purchase: ₹{parseFloat(item.coupon_upto_price || 0).toFixed(2)}
        </Text>
        {parseFloat(item.coupon_max_price_limit || 0) > 0 && (
          <Text style={styles.couponValidity}>
            Max Discount: ₹{parseFloat(item.coupon_max_price_limit || 0).toFixed(2)}
          </Text>
        )}
        <TouchableOpacity>
          <Text style={styles.viewDetails}>View Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render loading state
  if (loading || cartLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Icon name="autorenew" size={wp('10%')} color="#262757" />
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={wp('6%')} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Apply Coupon</Text>
        </View>

        {/* Promo Code Input */}
        {/* <View style={styles.promoContainer}>
          <Text style={styles.promoLabel}>Have a Promo Code?</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Enter coupon code"
              placeholderTextColor="#999"
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity style={styles.clearButton} onPress={() => setPromoCode('')}>
              <Icon name="close" size={wp('5%')} color="#000" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.promoApplyButton, !promoCode && styles.disabledPromoButton]}
            onPress={handleApplyPromoCode}
            disabled={!promoCode}
          >
            <Text style={styles.promoApplyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View> */}

        {/* Available Coupons */}
        <View style={styles.couponsSection}>
          <Text style={styles.sectionTitle}>Available Coupons for You</Text>
          {coupons.length === 0 ? (
            <View style={styles.emptyCouponsContainer}>
              <Icon name="local-offer" size={wp('20%')} color="#999" />
              <Text style={styles.emptyCouponsText}>No applicable coupons available</Text>
              <Text style={styles.emptyCouponsSubtext}>Total cart value: ₹{totalAmount.toFixed(2)}</Text>
            </View>
          ) : (
            <FlatList
              data={coupons}
              renderItem={renderCoupon}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.couponList}
            />
          )}
        </View>
      
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  loadingText: {
    fontSize: wp('4%'),
    color: '#262757',
    marginTop: hp('2%'),
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    paddingTop: Platform.OS === 'ios' ? hp('6%') : hp('5%'),
  },
  headerTitle: {
    flex: 1,
    color: '#000',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginLeft: wp('4%'),
  },
  promoContainer: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#FFF',
  },
  promoLabel: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#000',
    marginBottom: hp('1%'),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  promoInput: {
    flex: 1,
    padding: wp('3%'),
    fontSize: wp('4%'),
    color: '#000',
  },
  clearButton: { padding: wp('2%') },
  promoApplyButton: {
    backgroundColor: '#262757',
    borderRadius: 8,
    paddingVertical: hp('1.5%'),
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  disabledPromoButton: {
    backgroundColor: '#999',
    opacity: 0.6,
  },
  disabledApplyButton: {
    backgroundColor: '#999',
    opacity: 0.6,
  },
  promoApplyButtonText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#FFF',
  },
  couponsSection: {
    flex: 1,
    paddingHorizontal: wp('4%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: hp('2%'),
  },
  couponList: {
    paddingBottom: hp('2%'),
  },
  couponContainer: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: wp('4%'),
    marginBottom: hp('2%'),
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  disabledCoupon: {
    backgroundColor: '#f0f0f0',
    opacity: 0.6,
  },
  couponHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  couponCode: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#262757',
  },
  applyButton: {
    backgroundColor: '#262757',
    borderRadius: 20,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
  },
  applyButtonText: {
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
    color: '#FFF',
  },
  couponTitle: {
    fontSize: wp('3.5%'),
    color: '#000',
    marginBottom: hp('0.5%'),
  },
  couponValidity: {
    fontSize: wp('3%'),
    color: '#666',
    marginBottom: hp('0.5%'),
  },
  viewDetails: {
    fontSize: wp('3.5%'),
    color: '#4B3395',
    fontWeight: '600',
  },
  emptyCouponsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('10%'),
  },
  emptyCouponsText: {
    fontSize: wp('4%'),
    color: '#666',
    marginTop: hp('2%'),
    textAlign: 'center',
  },
  emptyCouponsSubtext: {
    fontSize: wp('3%'),
    color: '#999',
    marginTop: hp('1%'),
    textAlign: 'center',
  },
});

export default ApplyCouponScreen;