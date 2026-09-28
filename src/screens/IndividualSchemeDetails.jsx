
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
//   ActivityIndicator,
//   Image,
//   Dimensions,
//   FlatList,
//   Alert,
//   Modal,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import RazorpayCheckout from 'react-native-razorpay';

// import {
//   fetchSchemeDetails,
//   generateOrderId,
//   paySchemeInstallment,
// } from '../redux/slices/schemeSlice';

// // Font family constants
// const FONTS = {
//   regular: 'SF-Pro-Display-Regular',
//   medium: 'SF-Pro-Display-Medium',
//   semibold: 'SF-Pro-Display-Semibold',
//   bold: 'SF-Pro-Display-Bold',
// };

// const ACCENT_COLOR = '#832729';
// const { width } = Dimensions.get('window');

// const IndividualSchemeDetails = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const route = useRoute();
//   const dispatch = useDispatch();

//   const { id: schemeIdFromRoute } = route.params || {};

//   const {
//     schemeDetails,
//     detailsLoading,
//     detailsError,
//     installmentPaymentLoading,
//     installmentPaymentError,
//   } = useSelector(state => state.scheme);

//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [processingPayment, setProcessingPayment] = useState(false);

//   const schemeId = schemeDetails?.id || schemeIdFromRoute;

//   useEffect(() => {
//     if (schemeId) {
//       dispatch(fetchSchemeDetails(schemeId));
//     }
//   }, [dispatch, schemeId]);

//   const handlePayNextInstallment = async () => {
//     if (!schemeDetails?.installment_amount || !schemeId) {
//       Alert.alert('Error', 'Missing required information to process payment');
//       return;
//     }

//     const installmentAmount = Number(schemeDetails.installment_amount);

//     Alert.alert(
//       'Confirm Payment',
//       `Pay next installment of ₹${installmentAmount.toLocaleString('en-IN')}?`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Pay Now',
//           onPress: async () => {
//             setProcessingPayment(true);

//             try {
//               const orderResponse = await dispatch(generateOrderId(installmentAmount)).unwrap();

//               const { orderId, payment_key_id } = orderResponse;

//               const options = {
//                 description: 'Gold Scheme - Next Installment',
//                 image: 'https://geetajewellers.co.in/logo.png',
//                 currency: 'INR',
//                 key: payment_key_id,
//                 amount: orderId.amount,
//                 name: 'Geeta Jewellers',
//                 order_id: orderId.id,
//                 prefill: {
//                   name: schemeDetails.name || 'Customer',
//                   email: schemeDetails.email || 'customer@geetajewellers.com',
//                   contact: schemeDetails.phone_number || '9999999999',
//                 },
//                 theme: { color: ACCENT_COLOR },
//                 modal: {
//                   ondismiss: () => {
//                     console.log('[Razorpay] Modal dismissed by user');
//                   },
//                 },
//               };

//               const paymentData = await RazorpayCheckout.open(options);

//               console.log('Razorpay Payment Success:', paymentData);

//               await dispatch(
//                 paySchemeInstallment({
//                   schemeId,
//                   installmentAmount,
//                   paymentId: paymentData.razorpay_payment_id,
//                 })
//               ).unwrap();

//               await dispatch(fetchSchemeDetails(schemeId));

//               setShowSuccessModal(true);
//             } catch (error) {
//               console.error('Payment flow failed:', error);

//               if (error.code === 0 || String(error.description || '').toLowerCase().includes('cancel')) {
//                 return;
//               }

//               const errorMessage =
//                 installmentPaymentError ||
//                 error.description ||
//                 error.message ||
//                 'Payment could not be processed. Please try again.';

//               Alert.alert('Payment Failed', errorMessage);
//             } finally {
//               setProcessingPayment(false);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleSuccessClose = () => {
//     setShowSuccessModal(false);
//   };

//   const isAnyLoading =
//     detailsLoading ||
//     processingPayment ||
//     installmentPaymentLoading;

//   const renderHistoryItem = ({ item, index }) => (
//     <View style={styles.historyCard}>
//       <View style={styles.historyLeft}>
//         <View style={styles.historyIndex}>
//           <Text style={styles.historyIndexText}>{index + 1}</Text>
//         </View>
//         <View>
//           <Text style={styles.historyDate}>{item.paid_on || '—'}</Text>
//           <Text style={styles.historyId}>ID: {item.payment_id || '—'}</Text>
//         </View>
//       </View>
//       <View style={styles.historyRight}>
//         <Text style={styles.historyAmount}>
//           ₹{Number(item.investment_amount || 0).toLocaleString('en-IN')}
//         </Text>
//         <Text style={styles.historyGold}>{item.locked_gold || '—'} g</Text>
//       </View>
//     </View>
//   );

//   if (isAnyLoading && !schemeDetails) {
//     return (
//       <View style={styles.centerContainer}>
//         <ActivityIndicator size="large" color={ACCENT_COLOR} />
//         <Text style={styles.loadingText}>Loading scheme details...</Text>
//       </View>
//     );
//   }

//   if (detailsError) {
//     return (
//       <View style={styles.centerContainer}>
//         <Text style={{ color: 'red', fontSize: 16, textAlign: 'center' }}>
//           {detailsError || 'Failed to load scheme details'}
//         </Text>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={{ marginTop: 24 }}
//         >
//           <Text style={{ color: ACCENT_COLOR, fontWeight: 'bold', fontSize: 16 }}>
//             Go Back
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   if (!schemeDetails) return null;

//   return (
//     <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Track Scheme</Text>
//         <View style={styles.headerPlaceholder} />
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
//         {/* Main Info Card */}
//         <View style={styles.mainCard}>
//           <View style={styles.cardHeader}>
//             <View>
//               <Text style={styles.schemeName}>Geeta Gold Plus</Text>
//               <Text style={styles.schemeId}>#{schemeDetails.scheme_id || '—'}</Text>
//             </View>
//             <View style={styles.statusBadge}>
//               <Text style={styles.statusText}>
//                 {schemeDetails.profile_status === 2 ? 'Active' : 'Pending'}
//               </Text>
//             </View>
//           </View>

//           <View style={styles.divider} />

//           <View style={styles.infoGrid}>
//             <View style={styles.infoItem}>
//               <Text style={styles.infoLabel}>Account Name</Text>
//               <Text style={styles.infoValue}>{schemeDetails.name || '—'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Text style={styles.infoLabel}>Agent</Text>
//               <Text style={styles.infoValue}>{schemeDetails.agent_name || '—'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Text style={styles.infoLabel}>Tenure</Text>
//               <Text style={styles.infoValue}>{schemeDetails.tenure || '—'} Months</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Text style={styles.infoLabel}>Installment</Text>
//               <Text style={styles.infoValue}>
//                 ₹{Number(schemeDetails.installment_amount || 0).toLocaleString('en-IN')}
//               </Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Text style={styles.infoLabel}>Phone</Text>
//               <Text style={styles.infoValue}>{schemeDetails.phone_number || '—'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Text style={styles.infoLabel}>Card No</Text>
//               <Text style={styles.infoValue}>{schemeDetails.card_no || '—'}</Text>
//             </View>
//           </View>

//           {schemeDetails.address && (
//             <View style={{ marginTop: 12 }}>
//               <Text style={styles.infoLabel}>Address</Text>
//               <Text style={[styles.infoValue, { marginTop: 4 }]}>
//                 {schemeDetails.address}
//               </Text>
//             </View>
//           )}
//         </View>

//         {/* Document Proof */}
//         {schemeDetails.document_proof && (
//           <View style={styles.docSection}>
//             <Text style={styles.sectionTitle}>Document Proof</Text>
//             <Image
//               source={{ uri: schemeDetails.document_proof }}
//               style={styles.docImage}
//               resizeMode="cover"
//             />
//           </View>
//         )}

//         {/* Payment History */}
//         <View style={styles.historySection}>
//           <Text style={styles.sectionTitle}>Payment History</Text>

//           <FlatList
//             data={schemeDetails.paid_history || []}
//             renderItem={renderHistoryItem}
//             keyExtractor={(item, index) => item.id?.toString() || index.toString()}
//             scrollEnabled={false}
//             ListEmptyComponent={
//               <Text style={styles.emptyText}>No payments recorded yet.</Text>
//             }
//           />
//         </View>
//       </ScrollView>

//       {/* Bottom Pay Button */}
//       <View style={[styles.bottomContainer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
//         <TouchableOpacity
//           style={[
//             styles.payButton,
//             (processingPayment || installmentPaymentLoading) && styles.payButtonDisabled,
//           ]}
//           onPress={handlePayNextInstallment}
//           disabled={processingPayment || isAnyLoading}
//         >
//           {processingPayment || installmentPaymentLoading ? (
//             <ActivityIndicator color="#fff" size="small" />
//           ) : (
//             <Text style={styles.payButtonText}>Pay Next Installment</Text>
//           )}
//         </TouchableOpacity>
//       </View>

//       {/* Success Modal */}
//       <Modal
//         visible={showSuccessModal}
//         transparent
//         animationType="fade"
//         onRequestClose={handleSuccessClose}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.successIconContainer}>
//               <Ionicons name="checkmark" size={48} color="#fff" />
//             </View>

//             <Text style={styles.modalTitle}>Payment Successful!</Text>

//             <Text style={styles.modalText}>
//               Your installment payment has been recorded successfully.
//             </Text>

//             <TouchableOpacity style={styles.modalButton} onPress={handleSuccessClose}>
//               <Text style={styles.modalButtonText}>Continue</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F8F9FA' },
//   centerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   loadingText: { 
//     marginTop: 12, 
//     color: '#666', 
//     fontSize: 16,
//     fontFamily: FONTS.medium 
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   backButton: { padding: 4, width: 40 },
//   headerTitle: { 
//     fontSize: 18, 
//     fontFamily: FONTS.bold,
//     color: '#000', 
//     flex: 1, 
//     textAlign: 'center' 
//   },
//   headerPlaceholder: { width: 40 },

//   scrollContent: { padding: 16, paddingBottom: 140 },

//   mainCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//   },
//   cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
//   schemeName: { 
//     fontSize: 20, 
//     fontFamily: FONTS.bold,
//     color: ACCENT_COLOR 
//   },
//   schemeId: { 
//     fontSize: 13, 
//     fontFamily: FONTS.regular,
//     color: '#666', 
//     marginTop: 2 
//   },
//   statusBadge: {
//     backgroundColor: '#E8F5E9',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 12,
//   },
//   statusText: { 
//     color: '#2E7D32', 
//     fontSize: 13, 
//     fontFamily: FONTS.semibold 
//   },
//   divider: { height: 1, backgroundColor: '#eee', marginVertical: 16 },
//   infoGrid: { flexDirection: 'row', flexWrap: 'wrap' },
//   infoItem: { width: '50%', marginBottom: 16 },
//   infoLabel: { 
//     fontSize: 12, 
//     fontFamily: FONTS.medium,
//     color: '#777', 
//     marginBottom: 4 
//   },
//   infoValue: { 
//     fontSize: 14, 
//     fontFamily: FONTS.semibold,
//     color: '#222' 
//   },

//   docSection: { marginBottom: 24 },
//   sectionTitle: { 
//     fontSize: 18, 
//     fontFamily: FONTS.bold,
//     color: '#000', 
//     marginBottom: 12 
//   },
//   docImage: { width: '100%', height: 200, borderRadius: 12, backgroundColor: '#f0f0f0' },

//   historySection: { marginBottom: 100 },
//   historyCard: {
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 10,
//     elevation: 1,
//   },
//   historyLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
//   historyIndex: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#f0f0f0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   historyIndexText: { 
//     fontFamily: FONTS.bold,
//     color: '#555' 
//   },
//   historyDate: { 
//     fontSize: 14, 
//     fontFamily: FONTS.semibold,
//     color: '#333' 
//   },
//   historyId: { 
//     fontSize: 11, 
//     fontFamily: FONTS.regular,
//     color: '#999', 
//     marginTop: 2 
//   },
//   historyRight: { alignItems: 'flex-end' },
//   historyAmount: { 
//     fontSize: 15, 
//     fontFamily: FONTS.bold,
//     color: ACCENT_COLOR 
//   },
//   historyGold: { 
//     fontSize: 12, 
//     fontFamily: FONTS.regular,
//     color: '#666', 
//     marginTop: 2 
//   },
//   emptyText: { 
//     textAlign: 'center', 
//     color: '#999', 
//     fontFamily: FONTS.regular,
//     fontStyle: 'italic', 
//     marginTop: 16 
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
//     borderTopColor: '#e0e0e0',
//   },
//   payButton: {
//     backgroundColor: ACCENT_COLOR,
//     borderRadius: 12,
//     paddingVertical: 16,
//     alignItems: 'center',
//   },
//   payButtonDisabled: {
//     backgroundColor: '#aaa',
//   },
//   payButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontFamily: FONTS.bold,
//   },

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.65)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     width: '82%',
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 28,
//     alignItems: 'center',
//     elevation: 8,
//   },
//   successIconContainer: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: '#4CAF50',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: 22,
//     fontFamily: FONTS.bold,
//     color: '#000',
//     marginBottom: 12,
//   },
//   modalText: {
//     fontSize: 15,
//     fontFamily: FONTS.regular,
//     color: '#555',
//     textAlign: 'center',
//     marginBottom: 28,
//     lineHeight: 22,
//   },
//   modalButton: {
//     backgroundColor: ACCENT_COLOR,
//     paddingVertical: 14,
//     borderRadius: 12,
//     width: '100%',
//     alignItems: 'center',
//   },
//   modalButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontFamily: FONTS.bold,
//   },
// });

// export default IndividualSchemeDetails;
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';

import {
  fetchSchemeDetails,
  generateOrderId,
  paySchemeInstallment,
  insertPaySchemeInstallment
} from '../redux/slices/schemeSlice';

// Font family constants
const FONTS = {
  regular: 'SF-Pro-Display-Regular',
  medium: 'SF-Pro-Display-Medium',
  semibold: 'SF-Pro-Display-Semibold',
  bold: 'SF-Pro-Display-Bold',
};

const ACCENT_COLOR = '#832729';
const SUCCESS_COLOR = '#4CAF50';
const { width } = Dimensions.get('window');

const IndividualSchemeDetails = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const { id: schemeIdFromRoute } = route.params || {};

  const {
    schemeDetails,
    detailsLoading,
    detailsError,
    installmentPaymentLoading,
    installmentPaymentError,
  } = useSelector(state => state.scheme);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  // const schemeId = schemeDetails?.id || schemeIdFromRoute;
const schemeId = route.params?.id;
  useEffect(() => {
    if (schemeId) {
      dispatch(fetchSchemeDetails(schemeId));
    }
  }, [dispatch, schemeId]);

  // ────────────────────────────────────────────────
  //  Scheme completion detection
  // ────────────────────────────────────────────────
  const totalInstallments = Number(schemeDetails?.tenure || 0);
  const paidInstallments = schemeDetails?.paid_history?.length || 0;

  const isSchemeCompleted = 
    // Primary detection from your latest backend message pattern
    schemeDetails?.message?.includes('Scheme completed') ||
    // Fallback: compare counts (very reliable if tenure is correct)
    paidInstallments >= totalInstallments;

  const remainingInstallments = Math.max(0, totalInstallments - paidInstallments);

  // const handlePayNextInstallment = async () => {
  //   if (!schemeDetails?.installment_amount || !schemeId) {
  //     Alert.alert('Error', 'Missing required information to process payment');
  //     return;
  //   }

  //   const installmentAmount = Number(schemeDetails.installment_amount);

  //   Alert.alert(
  //     'Confirm Payment',
  //     `Pay next installment of ₹${installmentAmount.toLocaleString('en-IN')}?`,
  //     [
  //       { text: 'Cancel', style: 'cancel' },
  //       {
  //         text: 'Pay Now',
  //         onPress: async () => {
  //           setProcessingPayment(true);

  //           try {
  //             const orderResponse = await dispatch(generateOrderId(installmentAmount)).unwrap();
  //             const { orderId, payment_key_id } = orderResponse;

  //             const options = {
  //               description: 'Gold Scheme - Next Installment',
  //               image: 'https://geetajewellers.co.in/logo.png',
  //               currency: 'INR',
  //               key: payment_key_id,
  //               amount: orderId.amount,
  //               name: 'Geeta Jewellers',
  //               order_id: orderId.id,
  //               prefill: {
  //                 name: schemeDetails.name || 'Customer',
  //                 email: schemeDetails.email || 'customer@geetajewellers.com',
  //                 contact: schemeDetails.phone_number || '9999999999',
  //               },
  //               theme: { color: ACCENT_COLOR },
  //               modal: {
  //                 ondismiss: () => {
  //                   console.log('[Razorpay] Modal dismissed by user');
  //                 },
  //               },
  //             };

  //             const paymentData = await RazorpayCheckout.open(options);

  //             console.log('Razorpay Payment Success:', paymentData);

  //             const payResult = await dispatch(
  //               paySchemeInstallment({
  //                 schemeId,
  //                 installmentAmount,
  //                 paymentId: paymentData.razorpay_payment_id,
  //               })
  //             ).unwrap();

  //             // Refresh scheme details after payment
  //             await dispatch(fetchSchemeDetails(schemeId));

  //             setShowSuccessModal(true);
  //           } catch (error) {
  //             console.error('Payment flow failed:', error);

  //             if (error.code === 0 || String(error.description || '').toLowerCase().includes('cancel')) {
  //               return;
  //             }

  //             const errorMessage =
  //               installmentPaymentError ||
  //               error.description ||
  //               error.message ||
  //               'Payment could not be processed. Please try again.';

  //             Alert.alert('Payment Failed', errorMessage);
  //           } finally {
  //             setProcessingPayment(false);
  //           }
  //         },
  //       },
  //     ]
  //   );
  // };


// const handlePayNextInstallment = async () => {
//   if (!schemeDetails?.installment_amount || !schemeId) {
//     Alert.alert('Error', 'Missing required information to process payment');
//     return;
//   }

//   const installmentAmount = Number(schemeDetails.installment_amount);

//   Alert.alert(
//     'Confirm Payment',
//     `Pay next installment of ₹${installmentAmount.toLocaleString('en-IN')}?`,
//     [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Pay Now',
//         onPress: async () => {
//           setProcessingPayment(true);

//           try {
//             // 1. Generate Razorpay Order ID
//             const orderResponse = await dispatch(generateOrderId(installmentAmount)).unwrap();
//             const { orderId, payment_key_id } = orderResponse;

//             // 2. NEW: Record the attempt in your database BEFORE opening Razorpay
//             // Note: We use orderId.id which is the "order_SQIVyhPzvFIagV" string
//             await dispatch(insertPaySchemeInstallment({
//               schemeId: Number(schemeId),
//               orderId: orderId.id, 
//               installmentAmount: installmentAmount
//             })).unwrap();

//             // 3. Open Razorpay Checkout
//             const options = {
//               description: 'Gold Scheme - Next Installment',
//               image: 'https://geetajewellers.co.in/logo.png',
//               currency: 'INR',
//               key: payment_key_id,
//               amount: orderId.amount,
//               name: 'Geeta Jewellers',
//               order_id: orderId.id,
//               prefill: {
//                 name: schemeDetails.name || 'Customer',
//                 email: schemeDetails.email || 'customer@geetajewellers.com',
//                 contact: schemeDetails.phone_number || '9999999999',
//               },
//               theme: { color: ACCENT_COLOR },
//             };

//             const paymentData = await RazorpayCheckout.open(options);

//             // 4. Update the record with actual Payment ID after success
//             await dispatch(
//               paySchemeInstallment({
//                 schemeId,
//                 installmentAmount,
//                 paymentId: paymentData.razorpay_payment_id,
//               })
//             ).unwrap();

//             await dispatch(fetchSchemeDetails(schemeId));
//             setShowSuccessModal(true);

//           } catch (error) {
//             console.error('Payment flow failed:', error);
//             // Handle cancel or error...
//             if (error.code === 0 || String(error.description || '').toLowerCase().includes('cancel')) {
//                return;
//             }
//             Alert.alert('Payment Failed', error.message || 'Processing failed');
//           } finally {
//             setProcessingPayment(false);
//           }
//         },
//       },
//     ]
//   );
// };

const handlePayNextInstallment = async () => {
  if (!schemeDetails?.installment_amount || !schemeId) {
    Alert.alert('Error', 'Missing required information to process payment');
    return;
  }

  const installmentAmount = Number(schemeDetails.installment_amount);

  Alert.alert(
    'Confirm Payment',
    `Pay next installment of ₹${installmentAmount.toLocaleString('en-IN')}?`,
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Pay Now',
        onPress: async () => {
          setProcessingPayment(true);

          try {
            // 1. Generate Razorpay Order ID
            const orderResponse = await dispatch(generateOrderId(installmentAmount)).unwrap();
            const { orderId, payment_key_id } = orderResponse;

            // 2. Record the attempt in your database BEFORE opening Razorpay
            await dispatch(insertPaySchemeInstallment({
              schemeId: Number(schemeId),
              orderId: orderId.id, 
              installmentAmount: installmentAmount
            })).unwrap();

            // 3. Open Razorpay Checkout
            const options = {
              description: 'Gold Scheme - Next Installment',
              image: 'https://geetajewellers.co.in/logo.png',
              currency: 'INR',
              key: payment_key_id,
              amount: orderId.amount,
              name: 'Geeta Jewellers',
              order_id: orderId.id, // passing order_id to Razorpay UI
              prefill: {
                name: schemeDetails.name || 'Customer',
                email: schemeDetails.email || 'customer@geetajewellers.com',
                contact: schemeDetails.phone_number || '9999999999',
              },
              theme: { color: ACCENT_COLOR },
            };

            const paymentData = await RazorpayCheckout.open(options);

            // 4. Update the record with actual Payment ID AND Order ID
            await dispatch(
              paySchemeInstallment({
                schemeId,
                installmentAmount,
                paymentId: paymentData.razorpay_payment_id,
                order_id: orderId.id, // <--- INCLUDED ORDER_ID KEY HERE
              })
            ).unwrap();

            await dispatch(fetchSchemeDetails(schemeId));
            setShowSuccessModal(true);

          } catch (error) {
            console.error('Payment flow failed:', error);
            if (error.code === 0 || String(error.description || '').toLowerCase().includes('cancel')) {
               return;
            }
            Alert.alert('Payment Failed', error.message || 'Processing failed');
          } finally {
            setProcessingPayment(false);
          }
        },
      },
    ]
  );
};
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
  };

  const isAnyLoading = detailsLoading || processingPayment || installmentPaymentLoading;

  const renderHistoryItem = ({ item, index }) => (
    <View style={styles.historyCard}>
      <View style={styles.historyLeft}>
        <View style={styles.historyIndex}>
          <Text style={styles.historyIndexText}>{index + 1}</Text>
        </View>
        <View>
          <Text style={styles.historyDate}>{item.paid_on || '—'}</Text>
          <Text style={styles.historyId}>ID: {item.payment_id || '—'}</Text>
        </View>
      </View>
      <View style={styles.historyRight}>
        <Text style={styles.historyAmount}>
          ₹{Number(item.investment_amount || 0).toLocaleString('en-IN')}
        </Text>
        <Text style={styles.historyGold}>{item.locked_gold || '—'} g</Text>
      </View>
    </View>
  );

  if (isAnyLoading && !schemeDetails) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={ACCENT_COLOR} />
        <Text style={styles.loadingText}>Loading scheme details...</Text>
      </View>
    );
  }

  if (detailsError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={{ color: 'red', fontSize: 16, textAlign: 'center' }}>
          {detailsError || 'Failed to load scheme details'}
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 24 }}>
          <Text style={{ color: ACCENT_COLOR, fontWeight: 'bold', fontSize: 16 }}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!schemeDetails) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#832729" barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Scheme</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Info Card */}
        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.schemeName}>Geeta Jewellers</Text>
              <Text style={styles.schemeId}>#{schemeDetails.scheme_id || '—'}</Text>
            </View>
            <View style={[
              styles.statusBadge,
              isSchemeCompleted && styles.statusBadgeCompleted
            ]}>
              <Text style={[
                styles.statusText,
                isSchemeCompleted && styles.statusTextCompleted
              ]}>
                {isSchemeCompleted ? 'Completed' : 'Active'}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Account Name</Text>
              <Text style={styles.infoValue}>{schemeDetails.name || '—'}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Agent</Text>
              <Text style={styles.infoValue}>{schemeDetails.agent_name || '—'}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Tenure</Text>
              <Text style={styles.infoValue}>{schemeDetails.tenure || '—'} Months</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Installment</Text>
              <Text style={styles.infoValue}>
                ₹{Number(schemeDetails.installment_amount || 0).toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Locked Gold</Text>
              <Text style={styles.infoValue}>
                ₹{Number(schemeDetails.total_locked_gold || 0).toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{schemeDetails.phone_number || '—'}</Text>
            </View>
            {/* <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Card No</Text>
              <Text style={styles.infoValue}>{schemeDetails.card_no || '—'}</Text>
            </View> */}
          </View>

          {schemeDetails.address && (
            <View style={{ marginTop: 12 }}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={[styles.infoValue, { marginTop: 4 }]}>
                {schemeDetails.address}
              </Text>
            </View>
          )}
        </View>

        {/* Document Proof */}
        {schemeDetails.document_proof && (
          <View style={styles.docSection}>
            <Text style={styles.sectionTitle}>Document Proof</Text>
            <Image
              source={{ uri: schemeDetails.document_proof }}
              style={styles.docImage}
              resizeMode="cover"
            />
          </View>
        )}

        {/* Payment History */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Payment History</Text>

          <FlatList
            data={schemeDetails.paid_history || []}
            renderItem={renderHistoryItem}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            scrollEnabled={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No payments recorded yet.</Text>
            }
          />
        </View>
      </ScrollView>

      {/* Bottom section – conditional */}
      {!isSchemeCompleted ? (
        <View style={[styles.bottomContainer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <TouchableOpacity
            style={[
              styles.payButton,
              (processingPayment || installmentPaymentLoading) && styles.payButtonDisabled,
            ]}
            onPress={handlePayNextInstallment}
            disabled={processingPayment || isAnyLoading}
          >
            {processingPayment || installmentPaymentLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.payButtonText}>
                Pay Next Installment ₹{Number(schemeDetails.installment_amount || 0).toLocaleString('en-IN')}
              </Text>
            )}
          </TouchableOpacity>

          {remainingInstallments > 0 && (
            <Text style={styles.remainingText}>
              {remainingInstallments} installment{remainingInstallments !== 1 ? 's' : ''} remaining
            </Text>
          )}
        </View>
      ) : (
        <View style={[styles.bottomContainer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <View style={styles.completedContainer}>
            <Ionicons name="checkmark-circle" size={40} color={SUCCESS_COLOR} />
            <Text style={styles.completedTitle}>Scheme Completed</Text>
            <Text style={styles.completedSubtitle}>
              All {totalInstallments} installments paid successfully
            </Text>
          </View>
        </View>
      )}

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={handleSuccessClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark" size={48} color="#fff" />
            </View>

            <Text style={styles.modalTitle}>Payment Successful!</Text>

            <Text style={styles.modalText}>
              Your installment payment has been recorded successfully.
              {isSchemeCompleted && '\n\nCongratulations! Your scheme is now complete.'}
            </Text>

            <TouchableOpacity style={styles.modalButton} onPress={handleSuccessClose}>
              <Text style={styles.modalButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: { 
    marginTop: 12, 
    color: '#666', 
    fontSize: 16,
    fontFamily: FONTS.medium 
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#832729',
  },
  backButton: { padding: 4, width: 40 },
  headerTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: '#fff',
    flex: 1, 
    textAlign: 'center' 
  },
  headerPlaceholder: { width: 40 },

  scrollContent: { padding: 16, paddingBottom: 160 },

  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  schemeName: { 
    fontSize: 20, 
    fontFamily: FONTS.bold,
    color: ACCENT_COLOR 
  },
  schemeId: { 
    fontSize: 13, 
    fontFamily: FONTS.regular,
    color: '#666', 
    marginTop: 2 
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusBadgeCompleted: {
    backgroundColor: '#E3F2FD',
  },
  statusText: { 
    color: '#2E7D32', 
    fontSize: 13, 
    fontFamily: FONTS.semibold 
  },
  statusTextCompleted: {
    color: '#1976D2',
  },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 16 },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  infoItem: { width: '50%', marginBottom: 16 },
  infoLabel: { 
    fontSize: 12, 
    fontFamily: FONTS.medium,
    color: '#777', 
    marginBottom: 4 
  },
  infoValue: { 
    fontSize: 14, 
    fontFamily: FONTS.semibold,
    color: '#222' 
  },

  docSection: { marginBottom: 24 },
  sectionTitle: { 
    fontSize: 18, 
    fontFamily: FONTS.bold,
    color: '#000', 
    marginBottom: 12 
  },
  docImage: { width: '100%', height: 200, borderRadius: 12, backgroundColor: '#f0f0f0' },

  historySection: { marginBottom: 100 },
  historyCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
  },
  historyLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  historyIndex: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyIndexText: { 
    fontFamily: FONTS.bold,
    color: '#555' 
  },
  historyDate: { 
    fontSize: 14, 
    fontFamily: FONTS.semibold,
    color: '#333' 
  },
  historyId: { 
    fontSize: 11, 
    fontFamily: FONTS.regular,
    color: '#999', 
    marginTop: 2 
  },
  historyRight: { alignItems: 'flex-end' },
  historyAmount: { 
    fontSize: 15, 
    fontFamily: FONTS.bold,
    color: ACCENT_COLOR 
  },
  historyGold: { 
    fontSize: 12, 
    fontFamily: FONTS.regular,
    color: '#666', 
    marginTop: 2 
  },
  emptyText: { 
    textAlign: 'center', 
    color: '#999', 
    fontFamily: FONTS.regular,
    fontStyle: 'italic', 
    marginTop: 16 
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
    borderTopColor: '#e0e0e0',
  },
  payButton: {
    backgroundColor: ACCENT_COLOR,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  payButtonDisabled: {
    backgroundColor: '#aaa',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  remainingText: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    marginTop: 12,
    fontFamily: FONTS.medium,
  },

  completedContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  completedTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: SUCCESS_COLOR,
    marginTop: 12,
  },
  completedSubtitle: {
    fontSize: 15,
    color: '#555',
    marginTop: 6,
    textAlign: 'center',
    fontFamily: FONTS.regular,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '82%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    elevation: 8,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: SUCCESS_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: FONTS.bold,
    color: '#000',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 15,
    fontFamily: FONTS.regular,
    color: '#555',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: ACCENT_COLOR,
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
});

export default IndividualSchemeDetails;