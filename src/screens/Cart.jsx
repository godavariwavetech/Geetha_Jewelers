// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   ActivityIndicator,
//   Alert,
//   Modal,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import CustomModal from '../components/CustomModal';
// import {useNavigation} from '@react-navigation/native';
// import {useSelector, useDispatch} from 'react-redux';
// import RazorpayCheckout from 'react-native-razorpay';
// import {
//   fetchCartItems,
//   removeFromCart,
//   clearError,
// } from '../redux/slices/cartSlice';
// import {
//   getCustomerAddresses,
//   addCustomerDeliveryAddress,
// } from '../redux/slices/authSlice';
// import {
//   placeOrder,
//   resetOrderState,
//   updatePaymentDetails,
// } from '../redux/slices/orderSlice'; // Make sure this path is correct

// const {width} = Dimensions.get('window');
// const PRIMARY_COLOR = '#832729';

// const Cart = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const {customerId, customerName, customerMobile} = useSelector(
//     state => state.Auth || {},
//   );
//   const {addressList = []} = useSelector(state => state.Auth || {});
//   const {
//     cartItems,
//     loading: cartLoading,
//     error: cartError,
//   } = useSelector(state => state.cart);
//   const {
//     loading: orderLoading,
//     order,
//     error: orderError,
//   } = useSelector(state => state.order);

//   // Local state
//   const [addressModalVisible, setAddressModalVisible] = useState(false);
//   const [addAddressModalVisible, setAddAddressModalVisible] = useState(false);
//   const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

//   // Add address form
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [addressLine, setAddressLine] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [district, setDistrict] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [phone, setPhone] = useState('');
//   const [addressType, setAddressType] = useState('home');
//   const [customAddressType, setCustomAddressType] = useState('');
//   const [errors, setErrors] = useState({});

//   // Remove item modal
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedCartId, setSelectedCartId] = useState(null);
//   const [pendingPaymentOrder, setPendingPaymentOrder] = useState(null);
//   const [openRazorpay, setOpenRazorpay] = useState(false);
//   // Fetch cart and addresses on mount
//   useEffect(() => {
//     if (customerId) {
//       dispatch(fetchCartItems(customerId));
//       dispatch(getCustomerAddresses({customerId}));
//     }
//   }, [dispatch, customerId]);

//   // Show cart errors
//   useEffect(() => {
//     if (cartError) {
//       Alert.alert('Error', cartError || 'Something went wrong', [
//         {text: 'OK', onPress: () => dispatch(clearError())},
//       ]);
//     }
//   }, [cartError, dispatch]);

//   const subTotal = cartItems.reduce(
//     (sum, item) => sum + Number(item.total_price || 0),
//     0,
//   );
//   const deliveryCharge = 0; // As in your example
//   const couponDiscount = 0;
//   const grandTotal = subTotal + deliveryCharge - couponDiscount;

//   const selectedAddress = addressList[selectedAddressIndex];

//   // When backend returns order + razorpay info
//   useEffect(() => {
//     if (!orderLoading && order && !openRazorpay) {
//       if (!order.razorpay_order_id || !order.key_id) {
//         Alert.alert(
//           'Error',
//           'Payment gateway details missing. Please try again.',
//         );
//         dispatch(resetOrderState());
//         return;
//       }

//       // Save order info for later (for updatePaymentDetails + navigation)
//       setPendingPaymentOrder({
//         apiOrderId: order.id,
//         displayOrderNumber: order.order_id || 'N/A',
//         razorpayOrderId: order.razorpay_order_id,
//         keyId: order.key_id,
//       });

//       setOpenRazorpay(true); // allow the next effect to open Razorpay
//     }
//   }, [order, orderLoading, openRazorpay, dispatch]);

//   useEffect(() => {
//     if (!openRazorpay || !pendingPaymentOrder) return;

//     const {apiOrderId, displayOrderNumber, razorpayOrderId, keyId} =
//       pendingPaymentOrder;

//     const options = {
//       description: 'Jewellery Order Payment',
//       image: 'https://your-logo-url.com/logo.png',
//       currency: 'INR',
//       key: keyId,
//       amount: Math.round(grandTotal * 100), // ← important: integer
//       name: 'Your Jewellery Store',
//       order_id: razorpayOrderId,
//       prefill: {
//         name: customerName || selectedAddress?.customer_name || 'Customer',
//         contact:
//           customerMobile || selectedAddress?.customer_mobile_number || '',
//       },
//       theme: {color: PRIMARY_COLOR},
//     };

//     console.log('Opening Razorpay with options:', options);

//     RazorpayCheckout.open(
//       options,
//       // Success callback
//       async successData => {
//         console.log('Payment SUCCESS:', successData);

//         const paymentPayload = {
//           payment_id: successData.razorpay_payment_id,
//           razorpay_order_id: razorpayOrderId,
//           order_id: apiOrderId,
//           order_status: 0,
//         };

//         try {
//           await dispatch(updatePaymentDetails(paymentPayload)).unwrap();

//           // Give a small delay before navigation/alert (helps Android lifecycle)
//           setTimeout(() => {
//             Alert.alert(
//               'Order Placed Successfully!',
//               `Order Number: ${displayOrderNumber}\nTotal: ₹${grandTotal.toLocaleString(
//                 'en-IN',
//               )}`,
//               [
//                 {
//                   text: 'View Order Details',
//                   onPress: () => {
//                     dispatch(resetOrderState());
//                     setPendingPaymentOrder(null);
//                     setOpenRazorpay(false);
//                     navigation.navigate('OrderDetails', {order_id: apiOrderId});
//                   },
//                 },
//                 {
//                   text: 'Continue Shopping',
//                   style: 'cancel',
//                   onPress: () => {
//                     dispatch(resetOrderState());
//                     setPendingPaymentOrder(null);
//                     setOpenRazorpay(false);
//                     navigation.navigate('DrawerNavigation');
//                   },
//                 },
//               ],
//               {cancelable: false},
//             );
//           }, 800); // ← small delay helps a lot
//         } catch (err) {
//           console.error('Update payment failed:', err);
//           Alert.alert(
//             'Payment Verification Failed',
//             `Payment ID: ${successData.razorpay_payment_id}`,
//           );
//           dispatch(resetOrderState());
//           setPendingPaymentOrder(null);
//           setOpenRazorpay(false);
//         }
//       },

//       // Failure / cancel callback
//       errorData => {
//         console.log('Razorpay failed / cancelled:', errorData);

//         let message = 'Payment was cancelled or failed.';
//         if (errorData?.error?.description) {
//           message = errorData.error.description;
//         }

//         Alert.alert('Payment Failed', message, [
//           {
//             text: 'OK',
//             onPress: () => {
//               dispatch(resetOrderState());
//               setPendingPaymentOrder(null);
//               setOpenRazorpay(false);
//             },
//           },
//         ]);
//       },
//     );
//   }, [
//     openRazorpay,
//     pendingPaymentOrder,
//     grandTotal,
//     customerName,
//     customerMobile,
//     selectedAddress,
//     dispatch,
//     navigation,
//   ]);

//   useEffect(() => {
//     if (orderError && !orderLoading) {
//       Alert.alert(
//         'Order Failed',
//         orderError?.message || 'Unable to place order. Please try again.',
//       );
//       dispatch(resetOrderState()); // Optional: clean up on error
//     }
//   }, [orderError, orderLoading, dispatch]);

//   const handleRemoveItem = cartId => {
//     setSelectedCartId(cartId);
//     setModalVisible(true);
//   };

//   const confirmRemove = async () => {
//     if (selectedCartId && customerId) {
//       const result = await dispatch(removeFromCart(selectedCartId));
//       if (result.meta.requestStatus === 'fulfilled') {
//         dispatch(fetchCartItems(customerId));
//         Alert.alert('Success', 'Item removed from cart!');
//       }
//     }
//     setModalVisible(false);
//     setSelectedCartId(null);
//   };

//   const renderItem = item => (
//     <View style={styles.itemCard} key={item.id}>
//       <TouchableOpacity
//         style={styles.closeButton}
//         onPress={() => handleRemoveItem(item.id)}>
//         <Ionicons name="close" size={18} color="#8E8E8E" />
//       </TouchableOpacity>
//       <Image
//         source={{
//           uri: item.product_main_image || 'https://via.placeholder.com/70',
//         }}
//         style={styles.image}
//         resizeMode="cover"
//       />
//       <View style={{flex: 1, marginLeft: 10}}>
//         <Text style={styles.itemTitle} numberOfLines={2}>
//           {item.product_name}
//         </Text>
//         {item.size && <Text style={styles.itemSize}>Size: {item.size}</Text>}
//         <Text style={styles.itemPrice}>
//           ₹{Number(item.total_price).toLocaleString('en-IN')}
//         </Text>
//         <Text style={styles.itemWeight}>
//           {item.gross_weight} g • {item.karat}K
//         </Text>
//       </View>
//     </View>
//   );

//   // Calculations
//   const formatAddress = addr => {
//     if (!addr) return '';
//     const parts = [];
//     if (addr.address) parts.push(addr.address);
//     if (addr.city) parts.push(addr.city);
//     if (addr.state) parts.push(addr.state);
//     if (addr.pincode) parts.push(addr.pincode);
//     return parts.length > 0 ? parts.join(', ') : 'Address incomplete';
//   };

//   const buildOrderPayload = () => {
//     if (!selectedAddress || cartItems.length === 0) return null;

//     const fullAddress = [
//       selectedAddress.address || '',
//       selectedAddress.city || '',
//       selectedAddress.state || '',
//       selectedAddress.district || '',
//       selectedAddress.pincode ? ` - ${selectedAddress.pincode}` : '',
//     ]
//       .filter(Boolean)
//       .join(', ');

//     const sub_order_array = cartItems.map(item => ({
//       product_id: item.product_id?.toString() || '',
//       product_name: item.product_name || '',
//       product_image: item.product_main_image || '',
//       category_id: item.category_id?.toString() || '',
//       sub_category_id: item.subcategory_id?.toString() || '',
//       size_id: item.size_id?.toString() || '0',
//       size: item.size || '',
//       gross_weight: item.gross_weight || '0',
//       item_price: item.total_price?.toString() || '0', // single item price
//       sub_item_count: '1', // adjust if quantity >1 supported
//       item_total_amount: item.total_price?.toString() || '0',
//     }));

//     return {
//       customer_id: customerId?.toString() || '',
//       customer_name: customerName || selectedAddress.customer_name || 'User',
//       customer_mobile_number:
//         customerMobile || selectedAddress.customer_mobile_number || '',
//       item_count: cartItems.length.toString(),
//       sub_total_amount: subTotal.toString(),
//       coupon_amount: couponDiscount.toString(),
//       delivery_charges: deliveryCharge.toString(),
//       total_amount: (subTotal + deliveryCharge).toString(),
//       grand_total: grandTotal.toString(),
//       payment_type: 'Pay Online',
//       order_status: '7',
//       coupon_id: '',
//       order_pincode: selectedAddress.pincode?.toString() || '',
//       delivery_address: fullAddress || 'Flat 302, Green Towers, Hyderabad',
//       sub_order_array,
//     };
//   };

//   const handleProceedToCheckout = async () => {
//     if (cartItems.length === 0) {
//       Alert.alert('Empty Cart', 'Your cart is empty.');
//       return;
//     }

//     if (addressList.length === 0 || !selectedAddress) {
//       Alert.alert(
//         'Address Required',
//         'Please add or select a delivery address.',
//       );
//       return;
//     }

//     const payload = buildOrderPayload();
//     if (!payload) {
//       Alert.alert('Error', 'Failed to prepare order. Please try again.');
//       return;
//     }

//     Alert.alert(
//       'Confirm Order',
//       `Total: ₹${grandTotal.toLocaleString('en-IN')}\nPayment: Pay Online`,
//       [
//         {text: 'Cancel', style: 'cancel'},
//         {
//           text: 'Proceed to Pay',
//           onPress: () => dispatch(placeOrder(payload)),
//         },
//       ],
//     );
//   };

//   // Address form validation and save (unchanged from your original)
//   const clearFields = () => {
//     setName('');
//     setEmail('');
//     setAddressLine('');
//     setCity('');
//     setState('');
//     setDistrict('');
//     setPincode('');
//     setPhone('');
//     setAddressType('home');
//     setCustomAddressType('');
//     setErrors({});
//   };

//   const validateFields = () => {
//     const newErrors = {};

//     if (!name.trim()) newErrors.name = 'Full Name is required';
//     if (!addressLine.trim()) newErrors.addressLine = 'Address Line is required';
//     if (!city.trim()) newErrors.city = 'City is required';
//     if (!state.trim()) newErrors.state = 'State is required';
//     if (!district.trim()) newErrors.district = 'District is required';
//     if (!pincode.trim() || !/^\d{6}$/.test(pincode.trim()))
//       newErrors.pincode = 'Valid 6-digit pincode required';
//     if (!phone.trim() || !/^\d{10}$/.test(phone.trim()))
//       newErrors.phone = 'Valid 10-digit phone required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSaveAddress = async () => {
//     if (!validateFields()) return;

//     const finalAddressType =
//       addressType === 'other' ? customAddressType : addressType;

//     try {
//       await dispatch(
//         addCustomerDeliveryAddress({
//           userId: customerId,
//           addressType: finalAddressType,
//           addressLine: addressLine.trim(),
//           city: city.trim(),
//           state: state.trim(),
//           district: district.trim(),
//           pincode: parseInt(pincode),
//           customerName: name.trim(),
//           customerPhone: phone.trim(),
//           customerEmail: email.trim() || undefined,
//         }),
//       ).unwrap();

//       await dispatch(getCustomerAddresses({customerId})).unwrap();
//       setAddAddressModalVisible(false);
//       clearFields();
//       Alert.alert('Success', 'Address added successfully!');
//     } catch (err) {
//       Alert.alert('Error', 'Failed to save address. Try again.');
//     }
//   };

//   return (
//     <SafeAreaView style={[styles.container, {backgroundColor: '#fff'}]}>
//       <View style={{flex: 1}}>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{paddingBottom: 160}}>
//           {/* Header */}
//           <View style={[styles.header, {paddingTop: insets.top}]}>
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//               <Ionicons name="chevron-back" size={22} color={PRIMARY_COLOR} />
//             </TouchableOpacity>
//             <Text style={[styles.headerTitle, {color: PRIMARY_COLOR}]}>
//               My Cart ({cartItems.length})
//             </Text>
//             <View style={{width: 22}} />
//           </View>

//           {/* Loading / Empty State */}
//           {cartLoading && !cartItems.length && (
//             <View style={styles.loadingContainer}>
//               <ActivityIndicator size="large" color={PRIMARY_COLOR} />
//               <Text style={styles.loadingText}>Loading your cart...</Text>
//             </View>
//           )}

//           {!cartLoading && cartItems.length === 0 && (
//             <View style={styles.emptyContainer}>
//               <Ionicons name="cart-outline" size={80} color="#ccc" />
//               <Text style={styles.emptyText}>Your cart is empty</Text>
//               <TouchableOpacity
//                 style={[styles.shopNowBtn, {backgroundColor: PRIMARY_COLOR}]}
//                 onPress={() => navigation.navigate('DrawerNavigation')}>
//                 <Text style={styles.shopNowText}>Shop Now</Text>
//               </TouchableOpacity>
//             </View>
//           )}

//           {/* Cart Items */}
//           {cartItems.length > 0 && cartItems.map(item => renderItem(item))}

//           {/* Delivery Address */}
//           {cartItems.length > 0 && (
//             <View style={styles.addressSection}>
//               <Text style={styles.sectionTitle}>Delivery Address</Text>

//               {addressList.length === 0 ? (
//                 <TouchableOpacity
//                   style={styles.addAddressBtn}
//                   onPress={() => setAddAddressModalVisible(true)}>
//                   <Ionicons
//                     name="add-circle-outline"
//                     size={20}
//                     color={PRIMARY_COLOR}
//                   />
//                   <Text style={styles.addAddressText}>
//                     Add Delivery Address
//                   </Text>
//                 </TouchableOpacity>
//               ) : (
//                 <View style={styles.selectedAddressCard}>
//                   <View style={styles.addressHeader}>
//                     <Text style={styles.addressName}>
//                       {selectedAddress?.customer_name || 'User'}
//                     </Text>
//                     <TouchableOpacity
//                       onPress={() => setAddressModalVisible(true)}>
//                       <Text style={styles.changeText}>Change</Text>
//                     </TouchableOpacity>
//                   </View>
//                   <Text style={styles.addressText}>
//                     {formatAddress(selectedAddress)}
//                   </Text>
//                   <Text style={styles.addressPhone}>
//                     Phone: {selectedAddress?.customer_mobile_number}
//                   </Text>
//                 </View>
//               )}
//             </View>
//           )}

//           {/* Order Summary */}
//           {cartItems.length > 0 && (
//             <View style={styles.pricingContainer}>
//               <Text style={styles.pricingHeader}>Order Summary</Text>
//               <View style={styles.pricingRow}>
//                 <Text style={styles.label}>
//                   Sub Total ({cartItems.length} items)
//                 </Text>
//                 <Text style={styles.value}>
//                   ₹{subTotal.toLocaleString('en-IN')}
//                 </Text>
//               </View>
//               <View style={styles.pricingRow}>
//                 <Text style={styles.label}>Delivery Charge</Text>
//                 <Text style={[styles.value, {color: '#4CAF50'}]}>
//                   ₹{deliveryCharge}
//                 </Text>
//               </View>
//               <View style={styles.separator} />
//               <View style={styles.pricingRow}>
//                 <Text style={styles.totalLabel}>Total Amount</Text>
//                 <Text style={[styles.totalValue, {color: PRIMARY_COLOR}]}>
//                   ₹{grandTotal.toLocaleString('en-IN')}
//                 </Text>
//               </View>
//             </View>
//           )}
//         </ScrollView>
//       </View>

//       {/* Checkout Button */}
//       {cartItems.length > 0 && (
//         <View
//           style={[styles.checkoutWrapper, {paddingBottom: insets.bottom + 20}]}>
//           <View style={styles.checkoutSummary}>
//             <View>
//               <Text style={styles.checkoutTotalText}>Total</Text>
//               <Text style={styles.checkoutAmount}>
//                 ₹{grandTotal.toLocaleString('en-IN')}
//               </Text>
//             </View>
//             <TouchableOpacity
//               style={[styles.checkoutBtn, {backgroundColor: PRIMARY_COLOR}]}
//               onPress={handleProceedToCheckout}
//               disabled={orderLoading}>
//               {orderLoading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <>
//                   <Text style={styles.checkoutBtnText}>Place Order</Text>
//                   <Ionicons name="chevron-forward" size={18} color="#fff" />
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}

//       {/* Address Selection Modal */}
//       <Modal visible={addressModalVisible} transparent animationType="slide">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Select Delivery Address</Text>
//             <ScrollView style={{maxHeight: 400}}>
//               {addressList.map((addr, index) => (
//                 <TouchableOpacity
//                   key={addr.id || index}
//                   style={[
//                     styles.addressListItem,
//                     selectedAddressIndex === index && styles.selectedListItem,
//                   ]}
//                   onPress={() => {
//                     setSelectedAddressIndex(index);
//                     setAddressModalVisible(false);
//                   }}>
//                   <Text style={styles.addressListName}>
//                     {addr.customer_name}
//                   </Text>
//                   <Text style={styles.addressListText}>
//                     {formatAddress(addr)}
//                   </Text>
//                   <Text style={styles.addressListPhone}>
//                     Phone: {addr.customer_mobile_number}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//             <View style={styles.modalActions}>
//               <TouchableOpacity
//                 style={styles.cancelBtn}
//                 onPress={() => setAddressModalVisible(false)}>
//                 <Text style={styles.cancelText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.addNewBtn}
//                 onPress={() => {
//                   setAddressModalVisible(false);
//                   setAddAddressModalVisible(true);
//                 }}>
//                 <Text style={styles.addNewText}>+ Add New Address</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Add Address Modal */}
//       <Modal visible={addAddressModalVisible} animationType="slide" transparent>
//         <KeyboardAvoidingView
//           style={{flex: 1}}
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//           <View style={styles.myAddressesModalOverlay}>
//             <ScrollView
//               contentContainerStyle={styles.myAddressesModalScrollContent}
//               keyboardShouldPersistTaps="handled">
//               <View style={styles.myAddressesModalContainer}>
//                 <Text style={styles.myAddressesModalTitle}>Add Address</Text>

//                 {/* Address Type */}
//                 <View style={{marginBottom: 12}}>
//                   <Text style={styles.fieldLabel}>Address Type</Text>
//                   <View style={{flexDirection: 'row', marginTop: 8, gap: 12}}>
//                     {['home', 'work', 'other'].map(type => (
//                       <TouchableOpacity
//                         key={type}
//                         onPress={() => setAddressType(type)}
//                         style={{
//                           padding: 8,
//                           borderWidth: 0.5,
//                           backgroundColor:
//                             addressType === type ? PRIMARY_COLOR : '#fff',
//                           borderRadius: 4,
//                         }}>
//                         <Text
//                           style={{
//                             color: addressType === type ? '#fff' : '#000',
//                           }}>
//                           {type.charAt(0).toUpperCase() + type.slice(1)}
//                         </Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                   {addressType === 'other' && (
//                     <>
//                       <TextInput
//                         placeholder="Enter Custom Type"
//                         placeholderTextColor="#999"
//                         style={styles.input}
//                         value={customAddressType}
//                         onChangeText={setCustomAddressType}
//                       />
//                     </>
//                   )}
//                 </View>

//                 <TextInput
//                   placeholder="Full Name"
//                   style={styles.input}
//                   value={name}
//                   onChangeText={setName}
//                 />
//                 {errors.name && (
//                   <Text style={styles.errorText}>{errors.name}</Text>
//                 )}

//                 <TextInput
//                   placeholder="Email (Optional)"
//                   style={styles.input}
//                   value={email}
//                   onChangeText={setEmail}
//                   keyboardType="email-address"
//                 />

//                 <TextInput
//                   placeholder="Address Line (Flat, Building, Street)"
//                   style={styles.input}
//                   value={addressLine}
//                   onChangeText={setAddressLine}
//                 />
//                 {errors.addressLine && (
//                   <Text style={styles.errorText}>{errors.addressLine}</Text>
//                 )}

//                 <TextInput
//                   placeholder="City"
//                   style={styles.input}
//                   value={city}
//                   onChangeText={setCity}
//                 />
//                 {errors.city && (
//                   <Text style={styles.errorText}>{errors.city}</Text>
//                 )}

//                 <TextInput
//                   placeholder="State"
//                   style={styles.input}
//                   value={state}
//                   onChangeText={setState}
//                 />
//                 {errors.state && (
//                   <Text style={styles.errorText}>{errors.state}</Text>
//                 )}

//                 <TextInput
//                   placeholder="District"
//                   style={styles.input}
//                   value={district}
//                   onChangeText={setDistrict}
//                 />
//                 {errors.district && (
//                   <Text style={styles.errorText}>{errors.district}</Text>
//                 )}

//                 <TextInput
//                   placeholder="Pincode"
//                   style={styles.input}
//                   keyboardType="numeric"
//                   value={pincode}
//                   onChangeText={setPincode}
//                   maxLength={6}
//                 />
//                 {errors.pincode && (
//                   <Text style={styles.errorText}>{errors.pincode}</Text>
//                 )}

//                 <TextInput
//                   placeholder="Phone Number"
//                   style={styles.input}
//                   keyboardType="numeric"
//                   value={phone}
//                   onChangeText={setPhone}
//                   maxLength={10}
//                 />
//                 {errors.phone && (
//                   <Text style={styles.errorText}>{errors.phone}</Text>
//                 )}

//                 <View style={styles.myAddressesModalActions}>
//                   <TouchableOpacity
//                     style={styles.buttonOutlinedFull}
//                     onPress={() => {
//                       setAddAddressModalVisible(false);
//                       clearFields();
//                     }}>
//                     <Text style={styles.modalButtonText}>Cancel</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={styles.buttonFilled}
//                     onPress={handleSaveAddress}>
//                     <Text style={styles.modalButtonText}>Save</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </ScrollView>
//           </View>
//         </KeyboardAvoidingView>
//       </Modal>

//       {/* Remove Item Confirmation Modal */}
//       <CustomModal
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         title="Remove Item"
//         content="Are you sure you want to remove this item from your cart?"
//         confirmText="Remove"
//         cancelText="Cancel"
//         onConfirm={confirmRemove}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1},
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     marginVertical: 10,
//   },
//   headerTitle: {fontSize: 18, fontWeight: '600', marginLeft: 16},
//   itemCard: {
//     flexDirection: 'row',
//     backgroundColor: '#F8F8F8',
//     marginHorizontal: 16,
//     marginBottom: 12,
//     borderRadius: 12,
//     padding: 12,
//     position: 'relative',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     width: 30,
//     height: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1,
//   },
//   image: {width: 80, height: 80, borderRadius: 10},
//   itemTitle: {fontSize: 14, fontWeight: '500'},
//   itemSize: {fontSize: 13, color: '#555', marginTop: 4},
//   itemPrice: {fontSize: 16, fontWeight: '700', marginTop: 6},
//   itemWeight: {fontSize: 12, color: '#777', marginTop: 4},

//   addressSection: {marginHorizontal: 16, marginTop: 20},
//   sectionTitle: {fontSize: 17, fontWeight: '700', marginBottom: 12},
//   addAddressBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f9f9f9',
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderStyle: 'dashed',
//   },
//   addAddressText: {
//     marginLeft: 10,
//     fontSize: 15,
//     color: PRIMARY_COLOR,
//     fontWeight: '600',
//   },
//   selectedAddressCard: {
//     backgroundColor: '#f9f9f9',
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   addressHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   addressName: {fontSize: 16, fontWeight: '600'},
//   changeText: {color: PRIMARY_COLOR, fontWeight: '600'},
//   addressText: {fontSize: 14, color: '#555', lineHeight: 20},
//   addressPhone: {fontSize: 14, color: '#777', marginTop: 4},

//   pricingContainer: {
//     marginHorizontal: 16,
//     paddingVertical: 16,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 12,
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   pricingHeader: {
//     fontSize: 17,
//     fontWeight: '700',
//     marginBottom: 12,
//     paddingHorizontal: 16,
//   },
//   pricingRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     marginVertical: 6,
//   },
//   label: {fontSize: 15, color: '#555'},
//   value: {fontSize: 15, color: '#000', fontWeight: '600'},
//   separator: {height: 1, backgroundColor: '#E0E0E0', marginVertical: 12},
//   totalLabel: {fontSize: 17, fontWeight: '700'},
//   totalValue: {fontSize: 19, fontWeight: '800'},

//   checkoutWrapper: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderColor: '#E0E0E0',
//     paddingTop: 12,
//   },
//   checkoutSummary: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//   },
//   checkoutTotalText: {fontSize: 14, color: '#555'},
//   checkoutAmount: {fontSize: 20, fontWeight: '800', color: PRIMARY_COLOR},
//   checkoutBtn: {
//     borderRadius: 12,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     marginTop: 10,
//   },
//   checkoutBtnText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//     marginRight: 8,
//   },

//   loadingContainer: {padding: 40, alignItems: 'center'},
//   loadingText: {marginTop: 10, fontSize: 16, color: '#666'},
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 40,
//     marginTop: 60,
//   },
//   emptyText: {fontSize: 18, color: '#888', marginTop: 20},
//   shopNowBtn: {
//     marginTop: 20,
//     paddingHorizontal: 30,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   shopNowText: {color: '#fff', fontSize: 16, fontWeight: '600'},

//   // Modals
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'flex-end',
//   },
//   modalContainer: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//     padding: 20,
//     maxHeight: '80%',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   addressListItem: {
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   selectedListItem: {
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//     padding: 12,
//   },
//   addressListName: {fontSize: 15, fontWeight: '600'},
//   addressListText: {fontSize: 14, color: '#555'},
//   addressListPhone: {fontSize: 13, color: '#777'},
//   modalActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   cancelBtn: {
//     flex: 1,
//     padding: 12,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   cancelText: {fontSize: 16},
//   addNewBtn: {
//     flex: 1,
//     backgroundColor: PRIMARY_COLOR,
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   addNewText: {color: '#fff', fontSize: 16, fontWeight: '600'},

//   myAddressesModalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'flex-end',
//   },
//   myAddressesModalScrollContent: {flexGrow: 1, justifyContent: 'flex-end'},
//   myAddressesModalContainer: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//   },
//   myAddressesModalTitle: {fontSize: 20, fontWeight: '600', marginBottom: 12},
//   fieldLabel: {fontSize: 14, color: '#000', marginBottom: 8},
//   input: {
//     marginBottom: 12,
//     borderRadius: 4,
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//     color: '#000',
//     borderColor: '#919191',
//     borderWidth: 0.5,
//     backgroundColor: '#fff',
//   },
//   errorText: {color: 'red', fontSize: 12, marginBottom: 8, marginTop: -8},
//   myAddressesModalActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 12,
//     marginTop: 20,
//   },
//   buttonOutlinedFull: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 6,
//     borderColor: '#000',
//     borderWidth: 1,
//     alignItems: 'center',
//   },
//   buttonFilled: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 6,
//     backgroundColor: PRIMARY_COLOR,
//     alignItems: 'center',
//   },
//   modalButtonText: {color: '#fff', fontSize: 16},
// });

// export default Cart;
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   Modal,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import CustomModal from '../components/CustomModal';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector, useDispatch } from 'react-redux';
// import RazorpayCheckout from 'react-native-razorpay';
// import {
//   fetchCartItems,
//   removeFromCart,
//   clearError as clearCartError,
// } from '../redux/slices/cartSlice';
// import {
//   getCustomerAddresses,
//   addCustomerDeliveryAddress,
// } from '../redux/slices/authSlice';
// import {
//   placeOrder,
//   resetOrderState,
//   updatePaymentDetails,
// } from '../redux/slices/orderSlice';

// const PRIMARY_COLOR = '#832729';

// const Cart = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const { customerId, customerName, customerMobile } = useSelector(
//     (state) => state.Auth || {}
//   );
//   const { addressList = [] } = useSelector((state) => state.Auth || {});

//   const {
//     cartItems = [],
//     loading: cartLoading,
//     error: cartError,
//   } = useSelector((state) => state.cart || {});

//   const {
//     loading: orderLoading,
//     order,
//     error: orderError,
//   } = useSelector((state) => state.order || {});

//   // Local States
//   const [addressModalVisible, setAddressModalVisible] = useState(false);
//   const [addAddressModalVisible, setAddAddressModalVisible] = useState(false);
//   const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

//   // Add Address Form
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [addressLine, setAddressLine] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [district, setDistrict] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [phone, setPhone] = useState('');
//   const [addressType, setAddressType] = useState('home');
//   const [customAddressType, setCustomAddressType] = useState('');
//   const [errors, setErrors] = useState({});

//   // Remove Item Modal
//   const [removeModalVisible, setRemoveModalVisible] = useState(false);
//   const [selectedCartId, setSelectedCartId] = useState(null);

//   // Fetch cart & addresses on mount
//   useEffect(() => {
//     if (customerId) {
//       dispatch(fetchCartItems(customerId));
//       dispatch(getCustomerAddresses({ customerId }));
//     }
//   }, [dispatch, customerId]);

//   // Handle cart errors
//   useEffect(() => {
//     if (cartError) {
//       Alert.alert('Error', cartError || 'Something went wrong', [
//         { text: 'OK', onPress: () => dispatch(clearCartError()) },
//       ]);
//     }
//   }, [cartError, dispatch]);

//   // Handle order errors
//   useEffect(() => {
//     if (orderError && !orderLoading) {
//       Alert.alert('Order Failed', orderError?.message || 'Unable to place order.');
//       dispatch(resetOrderState());
//     }
//   }, [orderError, orderLoading, dispatch]);

//   // === PAYMENT FLOW: Trigger Razorpay when order is created ===
//   useEffect(() => {
//     if (orderLoading || !order) return;

//     // Missing Razorpay details?
//     if (!order.razorpay_order_id || !order.key_id) {
//       Alert.alert('Error', 'Payment gateway details missing. Please try again.');
//       dispatch(resetOrderState());
//       return;
//     }

//     const options = {
//       description: 'Jewellery Order Payment',
//       image: 'https://your-logo-url.com/logo.png', // Replace with your logo
//       currency: 'INR',
//       key: order.key_id,
//       amount: Math.round(grandTotal * 100),
//       name: 'Geeta Jewellers',
//       order_id: order.razorpay_order_id,
//       prefill: {
//         name: customerName || selectedAddress?.customer_name || 'Customer',
//         contact: customerMobile || selectedAddress?.customer_mobile_number || '',
//         email: selectedAddress?.customer_email || '',
//       },
//       theme: { color: PRIMARY_COLOR },
//     };

//     RazorpayCheckout.open(
//       options,
//       async (successData) => {
//         console.log('Payment Success:', successData);

//         try {
//           await dispatch(
//             updatePaymentDetails({
//               payment_id: successData.razorpay_payment_id,
//               razorpay_order_id: order.razorpay_order_id,
//               order_id: order.id,
//               order_status: 0,
//             })
//           ).unwrap();

//           dispatch(resetOrderState());

//           Alert.alert(
//             'Order Placed Successfully!',
//             `Order Number: ${order.order_id || 'N/A'}\nTotal: ₹${grandTotal.toLocaleString('en-IN')}`,
//             [
//               {
//                 text: 'View Order Details',
//                 onPress: () => navigation.navigate('OrderDetails', { order_id: order.id }),
//               },
//               {
//                 text: 'Continue Shopping',
//                 style: 'cancel',
//                 onPress: () => navigation.navigate('DrawerNavigation'),
//               },
//             ],
//             { cancelable: false }
//           );
//         } catch (err) {
//           console.error('Payment verification failed:', err);
//           Alert.alert('Verification Failed', 'Payment received but verification failed.');
//           dispatch(resetOrderState());
//         }
//       },
//       (errorData) => {
//         console.log('Payment Failed/Cancelled:', errorData);
//         dispatch(resetOrderState());

//         const message = errorData?.error?.description || 'Payment was cancelled or failed.';
//         Alert.alert('Payment Failed', message);
//       }
//     );
//   }, [order, orderLoading]); // Only runs when order is freshly created

//   // Calculations
//   const subTotal = cartItems.reduce((sum, item) => sum + Number(item.total_price || 0), 0);
//   const deliveryCharge = 0;
//   const couponDiscount = 0;
//   const grandTotal = subTotal + deliveryCharge - couponDiscount;

//   const selectedAddress = addressList[selectedAddressIndex];

//   const formatAddress = (addr) => {
//     if (!addr) return 'No address selected';
//     const parts = [];
//     if (addr.address || addr.addressLine) parts.push(addr.address || addr.addressLine);
//     if (addr.city) parts.push(addr.city);
//     if (addr.state) parts.push(addr.state);
//     if (addr.pincode) parts.push(addr.pincode);
//     return parts.length > 0 ? parts.join(', ') : 'Address incomplete';
//   };

//   const buildOrderPayload = () => {
//     if (!selectedAddress || cartItems.length === 0) return null;

//     const fullAddress = [
//       selectedAddress.address || selectedAddress.addressLine || '',
//       selectedAddress.city || '',
//       selectedAddress.state || '',
//       selectedAddress.district || '',
//       selectedAddress.pincode ? ` - ${selectedAddress.pincode}` : '',
//     ]
//       .filter(Boolean)
//       .join(', ');

//     const sub_order_array = cartItems.map((item) => ({
//       product_id: item.product_id?.toString() || '',
//       product_name: item.product_name || '',
//       product_image: item.product_main_image || '',
//       category_id: item.category_id?.toString() || '',
//       sub_category_id: item.subcategory_id?.toString() || '',
//       size_id: item.size_id?.toString() || '0',
//       size: item.size || '',
//       gross_weight: item.gross_weight || '0',
//       item_price: item.total_price?.toString() || '0',
//       sub_item_count: '1',
//       item_total_amount: item.total_price?.toString() || '0',
//     }));

//     return {
//       customer_id: customerId?.toString() || '',
//       customer_name: customerName || selectedAddress.customer_name || 'User',
//       customer_mobile_number: customerMobile || selectedAddress.customer_mobile_number || '',
//       item_count: cartItems.length.toString(),
//       sub_total_amount: subTotal.toString(),
//       coupon_amount: couponDiscount.toString(),
//       delivery_charges: deliveryCharge.toString(),
//       total_amount: (subTotal + deliveryCharge).toString(),
//       grand_total: grandTotal.toString(),
//       payment_type: 'Pay Online',
//       order_status: '7',
//       coupon_id: '',
//       order_pincode: selectedAddress.pincode?.toString() || '',
//       delivery_address: fullAddress,
//       sub_order_array,
//     };
//   };

//   const handleProceedToCheckout = () => {
//     if (cartItems.length === 0) {
//       Alert.alert('Empty Cart', 'Your cart is empty.');
//       return;
//     }

//     if (addressList.length === 0 || !selectedAddress) {
//       Alert.alert('Address Required', 'Please add or select a delivery address.');
//       return;
//     }

//     const payload = buildOrderPayload();
//     if (!payload) {
//       Alert.alert('Error', 'Failed to prepare order.');
//       return;
//     }

//     Alert.alert(
//       'Confirm Order',
//       `Total: ₹${grandTotal.toLocaleString('en-IN')}\nPayment: Pay Online`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Proceed to Pay', onPress: () => dispatch(placeOrder(payload)) },
//       ]
//     );
//   };

//   const handleRemoveItem = (cartId) => {
//     setSelectedCartId(cartId);
//     setRemoveModalVisible(true);
//   };

//   const confirmRemove = async () => {
//     if (selectedCartId && customerId) {
//       const result = await dispatch(removeFromCart(selectedCartId));
//       if (result.meta.requestStatus === 'fulfilled') {
//         dispatch(fetchCartItems(customerId));
//         Alert.alert('Success', 'Item removed from cart!');
//       }
//     }
//     setRemoveModalVisible(false);
//     setSelectedCartId(null);
//   };

//   const clearAddressFields = () => {
//     setName('');
//     setEmail('');
//     setAddressLine('');
//     setCity('');
//     setState('');
//     setDistrict('');
//     setPincode('');
//     setPhone('');
//     setAddressType('home');
//     setCustomAddressType('');
//     setErrors({});
//   };

//   const validateAddress = () => {
//     const newErrors = {};
//     if (!name.trim()) newErrors.name = 'Full Name is required';
//     if (!addressLine.trim()) newErrors.addressLine = 'Address Line is required';
//     if (!city.trim()) newErrors.city = 'City is required';
//     if (!state.trim()) newErrors.state = 'State is required';
//     if (!district.trim()) newErrors.district = 'District is required';
//     if (!pincode.trim() || pincode.length !== 6) newErrors.pincode = 'Valid 6-digit pincode required';
//     if (!phone.trim() || phone.length !== 10) newErrors.phone = 'Valid 10-digit phone required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSaveAddress = async () => {
//     if (!validateAddress()) return;

//     const finalType = addressType === 'other' ? customAddressType : addressType;

//     try {
//       await dispatch(
//         addCustomerDeliveryAddress({
//           userId: customerId,
//           addressType: finalType,
//           addressLine: addressLine.trim(),
//           city: city.trim(),
//           state: state.trim(),
//           district: district.trim(),
//           pincode: parseInt(pincode),
//           customerName: name.trim(),
//           customerPhone: phone.trim(),
//           customerEmail: email.trim() || undefined,
//         })
//       ).unwrap();

//       await dispatch(getCustomerAddresses({ customerId })).unwrap();
//       setAddAddressModalVisible(false);
//       clearAddressFields();
//       Alert.alert('Success', 'Address added successfully!');
//     } catch (err) {
//       Alert.alert('Error', 'Failed to save address.');
//     }
//   };

//   const renderCartItem = (item) => (
//     <View style={styles.itemCard} key={item.id}>
//       <TouchableOpacity style={styles.closeButton} onPress={() => handleRemoveItem(item.id)}>
//         <Ionicons name="close" size={18} color="#8E8E8E" />
//       </TouchableOpacity>
//       <Image
//         source={{ uri: item.product_main_image || 'https://via.placeholder.com/70' }}
//         style={styles.image}
//         resizeMode="cover"
//       />
//       <View style={{ flex: 1, marginLeft: 10 }}>
//         <Text style={styles.itemTitle} numberOfLines={2}>
//           {item.product_name}
//         </Text>
//         {item.size && <Text style={styles.itemSize}>Size: {item.size}</Text>}
//         <Text style={styles.itemPrice}>₹{Number(item.total_price).toLocaleString('en-IN')}</Text>
//         <Text style={styles.itemWeight}>
//           {item.gross_weight} g • {item.karat}K
//         </Text>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={{ flex: 1 }}>
//         <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>
//           {/* Header */}
//           <View style={[styles.header, { paddingTop: insets.top }]}>
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//               <Ionicons name="chevron-back" size={22} color={PRIMARY_COLOR} />
//             </TouchableOpacity>
//             <Text style={[styles.headerTitle, { color: PRIMARY_COLOR }]}>
//               My Cart ({cartItems.length})
//             </Text>
//             <View style={{ width: 22 }} />
//           </View>

//           {/* Loading / Empty */}
//           {cartLoading && !cartItems.length && (
//             <View style={styles.loadingContainer}>
//               <ActivityIndicator size="large" color={PRIMARY_COLOR} />
//               <Text style={styles.loadingText}>Loading your cart...</Text>
//             </View>
//           )}

//           {!cartLoading && cartItems.length === 0 && (
//             <View style={styles.emptyContainer}>
//               <Ionicons name="cart-outline" size={80} color="#ccc" />
//               <Text style={styles.emptyText}>Your cart is empty</Text>
//               <TouchableOpacity
//                 style={[styles.shopNowBtn, { backgroundColor: PRIMARY_COLOR }]}
//                 onPress={() => navigation.navigate('DrawerNavigation')}
//               >
//                 <Text style={styles.shopNowText}>Shop Now</Text>
//               </TouchableOpacity>
//             </View>
//           )}

//           {/* Cart Items */}
//           {cartItems.length > 0 && cartItems.map(renderCartItem)}

//           {/* Delivery Address */}
//           {cartItems.length > 0 && (
//             <View style={styles.addressSection}>
//               <Text style={styles.sectionTitle}>Delivery Address</Text>
//               {addressList.length === 0 ? (
//                 <TouchableOpacity
//                   style={styles.addAddressBtn}
//                   onPress={() => setAddAddressModalVisible(true)}
//                 >
//                   <Ionicons name="add-circle-outline" size={20} color={PRIMARY_COLOR} />
//                   <Text style={styles.addAddressText}>Add Delivery Address</Text>
//                 </TouchableOpacity>
//               ) : (
//                 <View style={styles.selectedAddressCard}>
//                   <View style={styles.addressHeader}>
//                     <Text style={styles.addressName}>
//                       {selectedAddress?.customer_name || 'User'}
//                     </Text>
//                     <TouchableOpacity onPress={() => setAddressModalVisible(true)}>
//                       <Text style={styles.changeText}>Change</Text>
//                     </TouchableOpacity>
//                   </View>
//                   <Text style={styles.addressText}>{formatAddress(selectedAddress)}</Text>
//                   <Text style={styles.addressPhone}>
//                     Phone: {selectedAddress?.customer_mobile_number || 'N/A'}
//                   </Text>
//                 </View>
//               )}
//             </View>
//           )}

//           {/* Order Summary */}
//           {cartItems.length > 0 && (
//             <View style={styles.pricingContainer}>
//               <Text style={styles.pricingHeader}>Order Summary</Text>
//               <View style={styles.pricingRow}>
//                 <Text style={styles.label}>Sub Total ({cartItems.length} items)</Text>
//                 <Text style={styles.value}>₹{subTotal.toLocaleString('en-IN')}</Text>
//               </View>
//               <View style={styles.pricingRow}>
//                 <Text style={styles.label}>Delivery Charge</Text>
//                 <Text style={[styles.value, { color: '#4CAF50' }]}>₹{deliveryCharge}</Text>
//               </View>
//               <View style={styles.separator} />
//               <View style={styles.pricingRow}>
//                 <Text style={styles.totalLabel}>Total Amount</Text>
//                 <Text style={[styles.totalValue, { color: PRIMARY_COLOR }]}>
//                   ₹{grandTotal.toLocaleString('en-IN')}
//                 </Text>
//               </View>
//             </View>
//           )}
//         </ScrollView>
//       </View>

//       {/* Checkout Button */}
//       {cartItems.length > 0 && (
//         <View style={[styles.checkoutWrapper, { paddingBottom: insets.bottom + 20 }]}>
//           <View style={styles.checkoutSummary}>
//             <View>
//               <Text style={styles.checkoutTotalText}>Total</Text>
//               <Text style={styles.checkoutAmount}>₹{grandTotal.toLocaleString('en-IN')}</Text>
//             </View>
//             <TouchableOpacity
//               style={[styles.checkoutBtn, { backgroundColor: PRIMARY_COLOR }]}
//               onPress={handleProceedToCheckout}
//               disabled={orderLoading}
//             >
//               {orderLoading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <>
//                   <Text style={styles.checkoutBtnText}>Place Order</Text>
//                   <Ionicons name="chevron-forward" size={18} color="#fff" />
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}

//       {/* Address Selection Modal */}
//       <Modal visible={addressModalVisible} transparent animationType="slide">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Select Delivery Address</Text>
//             <ScrollView style={{ maxHeight: 400 }}>
//               {addressList.map((addr, index) => (
//                 <TouchableOpacity
//                   key={addr.id || index}
//                   style={[
//                     styles.addressListItem,
//                     selectedAddressIndex === index && styles.selectedListItem,
//                   ]}
//                   onPress={() => {
//                     setSelectedAddressIndex(index);
//                     setAddressModalVisible(false);
//                   }}
//                 >
//                   <Text style={styles.addressListName}>{addr.customer_name}</Text>
//                   <Text style={styles.addressListText}>{formatAddress(addr)}</Text>
//                   <Text style={styles.addressListPhone}>
//                     Phone: {addr.customer_mobile_number}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//             <View style={styles.modalActions}>
//               <TouchableOpacity
//                 style={styles.cancelBtn}
//                 onPress={() => setAddressModalVisible(false)}
//               >
//                 <Text style={styles.cancelText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.addNewBtn}
//                 onPress={() => {
//                   setAddressModalVisible(false);
//                   setAddAddressModalVisible(true);
//                 }}
//               >
//                 <Text style={styles.addNewText}>+ Add New Address</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Add Address Modal */}
//       <Modal visible={addAddressModalVisible} animationType="slide" transparent>
//         <KeyboardAvoidingView
//           style={{ flex: 1 }}
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         >
//           <View style={styles.myAddressesModalOverlay}>
//             <ScrollView
//               contentContainerStyle={styles.myAddressesModalScrollContent}
//               keyboardShouldPersistTaps="handled"
//             >
//               <View style={styles.myAddressesModalContainer}>
//                 <Text style={styles.myAddressesModalTitle}>Add Address</Text>

//                 {/* Address Type */}
//                 <View style={{ marginBottom: 12 }}>
//                   <Text style={styles.fieldLabel}>Address Type</Text>
//                   <View style={{ flexDirection: 'row', marginTop: 8, gap: 12 }}>
//                     {['home', 'work', 'other'].map((type) => (
//                       <TouchableOpacity
//                         key={type}
//                         onPress={() => setAddressType(type)}
//                         style={{
//                           padding: 8,
//                           borderWidth: 0.5,
//                           backgroundColor: addressType === type ? PRIMARY_COLOR : '#fff',
//                           borderRadius: 4,
//                         }}
//                       >
//                         <Text style={{ color: addressType === type ? '#fff' : '#000' }}>
//                           {type.charAt(0).toUpperCase() + type.slice(1)}
//                         </Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                   {addressType === 'other' && (
//                     <TextInput
//                       placeholder="Enter Custom Type"
//                       placeholderTextColor="#999"
//                       style={styles.input}
//                       value={customAddressType}
//                       onChangeText={setCustomAddressType}
//                     />
//                   )}
//                 </View>

//                 <TextInput placeholder="Full Name" style={styles.input} value={name} onChangeText={setName} />
//                 {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

//                 <TextInput
//                   placeholder="Email (Optional)"
//                   style={styles.input}
//                   value={email}
//                   onChangeText={setEmail}
//                   keyboardType="email-address"
//                 />

//                 <TextInput
//                   placeholder="Address Line (Flat, Building, Street)"
//                   style={styles.input}
//                   value={addressLine}
//                   onChangeText={setAddressLine}
//                 />
//                 {errors.addressLine && <Text style={styles.errorText}>{errors.addressLine}</Text>}

//                 <TextInput placeholder="City" style={styles.input} value={city} onChangeText={setCity} />
//                 {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

//                 <TextInput placeholder="State" style={styles.input} value={state} onChangeText={setState} />
//                 {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

//                 <TextInput placeholder="District" style={styles.input} value={district} onChangeText={setDistrict} />
//                 {errors.district && <Text style={styles.errorText}>{errors.district}</Text>}

//                 <TextInput
//                   placeholder="Pincode"
//                   style={styles.input}
//                   keyboardType="numeric"
//                   value={pincode}
//                   onChangeText={setPincode}
//                   maxLength={6}
//                 />
//                 {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}

//                 <TextInput
//                   placeholder="Phone Number"
//                   style={styles.input}
//                   keyboardType="numeric"
//                   value={phone}
//                   onChangeText={setPhone}
//                   maxLength={10}
//                 />
//                 {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

//                 <View style={styles.myAddressesModalActions}>
//                   <TouchableOpacity
//                     style={styles.buttonOutlinedFull}
//                     onPress={() => {
//                       setAddAddressModalVisible(false);
//                       clearAddressFields();
//                     }}
//                   >
//                     <Text style={styles.modalButtonText}>Cancel</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={styles.buttonFilled} onPress={handleSaveAddress}>
//                     <Text style={[styles.modalButtonText, { color: '#fff' }]}>Save</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </ScrollView>
//           </View>
//         </KeyboardAvoidingView>
//       </Modal>

//       {/* Remove Item Modal */}
//       <CustomModal
//         visible={removeModalVisible}
//         onClose={() => setRemoveModalVisible(false)}
//         title="Remove Item"
//         content="Are you sure you want to remove this item from your cart?"
//         confirmText="Remove"
//         cancelText="Cancel"
//         onConfirm={confirmRemove}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     marginVertical: 10,
//   },
//   headerTitle: { fontSize: 18, fontWeight: '600', marginLeft: 16 },
//   itemCard: {
//     flexDirection: 'row',
//     backgroundColor: '#F8F8F8',
//     marginHorizontal: 16,
//     marginBottom: 12,
//     borderRadius: 12,
//     padding: 12,
//     position: 'relative',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     width: 30,
//     height: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1,
//   },
//   image: { width: 80, height: 80, borderRadius: 10 },
//   itemTitle: { fontSize: 14, fontWeight: '500' },
//   itemSize: { fontSize: 13, color: '#555', marginTop: 4 },
//   itemPrice: { fontSize: 16, fontWeight: '700', marginTop: 6 },
//   itemWeight: { fontSize: 12, color: '#777', marginTop: 4 },

//   addressSection: { marginHorizontal: 16, marginTop: 20 },
//   sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 12 },
//   addAddressBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f9f9f9',
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderStyle: 'dashed',
//   },
//   addAddressText: { marginLeft: 10, fontSize: 15, color: PRIMARY_COLOR, fontWeight: '600' },
//   selectedAddressCard: {
//     backgroundColor: '#f9f9f9',
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   addressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
//   addressName: { fontSize: 16, fontWeight: '600' },
//   changeText: { color: PRIMARY_COLOR, fontWeight: '600' },
//   addressText: { fontSize: 14, color: '#555', lineHeight: 20 },
//   addressPhone: { fontSize: 14, color: '#777', marginTop: 4 },

//   pricingContainer: {
//     marginHorizontal: 16,
//     paddingVertical: 16,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 12,
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   pricingHeader: { fontSize: 17, fontWeight: '700', marginBottom: 12, paddingHorizontal: 16 },
//   pricingRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginVertical: 6 },
//   label: { fontSize: 15, color: '#555' },
//   value: { fontSize: 15, color: '#000', fontWeight: '600' },
//   separator: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 12 },
//   totalLabel: { fontSize: 17, fontWeight: '700' },
//   totalValue: { fontSize: 19, fontWeight: '800' },

//   checkoutWrapper: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderColor: '#E0E0E0',
//     paddingTop: 12,
//   },
//   checkoutSummary: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//   },
//   checkoutTotalText: { fontSize: 14, color: '#555' },
//   checkoutAmount: { fontSize: 20, fontWeight: '800', color: PRIMARY_COLOR },
//   checkoutBtn: {
//     borderRadius: 12,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//   },
//   checkoutBtnText: { color: '#fff', fontSize: 16, fontWeight: '600', marginRight: 8 },

//   loadingContainer: { padding: 40, alignItems: 'center' },
//   loadingText: { marginTop: 10, fontSize: 16, color: '#666' },
//   emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40, marginTop: 60 },
//   emptyText: { fontSize: 18, color: '#888', marginTop: 20 },
//   shopNowBtn: { marginTop: 20, paddingHorizontal: 30, paddingVertical: 12, borderRadius: 8 },
//   shopNowText: { color: '#fff', fontSize: 16, fontWeight: '600' },

//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
//   modalContainer: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//     padding: 20,
//     maxHeight: '80%',
//   },
//   modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
//   addressListItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
//   selectedListItem: { backgroundColor: '#f0f0f0', borderRadius: 8, padding: 12 },
//   addressListName: { fontSize: 15, fontWeight: '600' },
//   addressListText: { fontSize: 14, color: '#555' },
//   addressListPhone: { fontSize: 13, color: '#777' },
//   modalActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
//   cancelBtn: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, alignItems: 'center', marginRight: 8 },
//   cancelText: { fontSize: 16 },
//   addNewBtn: { flex: 1, backgroundColor: PRIMARY_COLOR, padding: 12, borderRadius: 8, alignItems: 'center' },
//   addNewText: { color: '#fff', fontSize: 16, fontWeight: '600' },

//   myAddressesModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
//   myAddressesModalScrollContent: { flexGrow: 1, justifyContent: 'flex-end' },
//   myAddressesModalContainer: { backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
//   myAddressesModalTitle: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
//   fieldLabel: { fontSize: 14, color: '#000', marginBottom: 8 },
//   input: {
//     marginBottom: 12,
//     borderRadius: 4,
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//     borderColor: '#919191',
//     borderWidth: 0.5,
//     backgroundColor: '#fff',
//   },
//   errorText: { color: 'red', fontSize: 12, marginBottom: 8, marginTop: -8 },
//   myAddressesModalActions: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 20 },
//   buttonOutlinedFull: { flex: 1, padding: 12, borderRadius: 6, borderColor: '#000', borderWidth: 1, alignItems: 'center' },
//   buttonFilled: { flex: 1, padding: 12, borderRadius: 6, backgroundColor: PRIMARY_COLOR, alignItems: 'center' },
//   modalButtonText: { color: '#000', fontSize: 16 },
// });

// export default Cart;
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   Modal,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useDispatch, useSelector } from 'react-redux';
// import RazorpayCheckout from 'react-native-razorpay';
// import {
//   fetchCartItems,
//     removeFromCart,
//   clearError as clearCartError,
// } from '../redux/slices/cartSlice';
// import {
//   getCustomerAddresses,
//   addCustomerDeliveryAddress,
// } from '../redux/slices/authSlice';
// import {
//   placeOrder,
//   updatePaymentDetails,
//   resetOrderState,
// } from '../redux/slices/orderSlice';
// import CustomModal from '../components/CustomModal';
// const PRIMARY_COLOR = '#832729'; // You can change this to match your theme

// const Cart = ({ navigation, route }) => {
//   const insets = useSafeAreaInsets();
//   const dispatch = useDispatch();

//   const { customerId, customerName, customerMobile } = useSelector((state) => state.Auth || {});
//   const { addressList = [] } = useSelector((state) => state.Auth || {});
//   const { cartItems = [], loading: cartLoading ,error: cartError,} = useSelector((state) => state.cart || {});
//   const { order, loading: orderLoading, error: orderError } = useSelector((state) => state.order || {});

//   const [addressModalVisible, setAddressModalVisible] = useState(false);
//   const [addAddressModalVisible, setAddAddressModalVisible] = useState(false);
//   const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
// const [removeModalVisible, setRemoveModalVisible] = useState(false);
// const [selectedCartId, setSelectedCartId] = useState(null);
//   // Add address form
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [addressLine, setAddressLine] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [district, setDistrict] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [phone, setPhone] = useState('');
//   const [addressType, setAddressType] = useState('home');
//   const [customAddressType, setCustomAddressType] = useState('');
//   const [errors, setErrors] = useState({});

//   // Fetch data on mount
//   useEffect(() => {
//     if (customerId) {
//       dispatch(fetchCartItems(customerId));
//       dispatch(getCustomerAddresses({ customerId }));
//     }
//   }, [dispatch, customerId]);

//   // Handle order error
//   useEffect(() => {
//     if (orderError) {
//       Alert.alert('Order Failed', orderError?.message || 'Unable to place order.');
//       dispatch(resetOrderState());
//     }
//   }, [orderError]);

 
//   const subTotal = cartItems.reduce((sum, item) => sum + Number(item.total_price || 0), 0);
//   const deliveryCharge = 0;
//   const couponDiscount = 0;
//   const grandTotal = subTotal + deliveryCharge - couponDiscount;

//   const selectedAddress = addressList[selectedAddressIndex];

//   const formatAddress = (addr) => {
//     if (!addr) return 'No address selected';
//     const parts = [];
//     if (addr.addressLine || addr.address) parts.push(addr.addressLine || addr.address);
//     if (addr.city) parts.push(addr.city);
//     if (addr.state) parts.push(addr.state);
//     if (addr.pincode) parts.push(addr.pincode);
//     return parts.length > 0 ? parts.join(', ') : 'Address incomplete';
//   };

//   const buildOrderPayload = () => {
//     if (!selectedAddress || cartItems.length === 0) return null;

//     const fullAddress = [
//       selectedAddress.addressLine || selectedAddress.address || '',
//       selectedAddress.city || '',
//       selectedAddress.state || '',
//       selectedAddress.district || '',
//       selectedAddress.pincode ? ` - ${selectedAddress.pincode}` : '',
//     ]
//       .filter(Boolean)
//       .join(', ');

//     const sub_order_array = cartItems.map((item) => ({
//       product_id: item.product_id?.toString() || '',
//       product_name: item.product_name || '',
//       product_image: item.product_main_image || '',
//       category_id: item.category_id?.toString() || '',
//       sub_category_id: item.subcategory_id?.toString() || '',
//       size_id: item.size_id?.toString() || '0',
//       size: item.size || '',
//       gross_weight: item.gross_weight || '0',
//       item_price: item.total_price?.toString() || '0',
//       sub_item_count: '1',
//       item_total_amount: item.total_price?.toString() || '0',
//     }));

//     return {
//       customer_id: customerId?.toString() || '',
//       customer_name: customerName || selectedAddress.customer_name || 'User',
//       customer_mobile_number: customerMobile || selectedAddress.customer_mobile_number || '',
//       item_count: cartItems.length.toString(),
//       sub_total_amount: subTotal.toString(),
//       coupon_amount: couponDiscount.toString(),
//       delivery_charges: deliveryCharge.toString(),
//       total_amount: (subTotal + deliveryCharge).toString(),
//       grand_total: grandTotal.toString(),
//       payment_type: 'Pay Online',
//       order_status: '7',
//       coupon_id: '',
//       order_pincode: selectedAddress.pincode?.toString() || '',
//       delivery_address: fullAddress,
//       sub_order_array,
//     };
//   };

//   const handleProceed = async() => {
//     if (cartItems.length === 0) {
//       Alert.alert('Empty Cart', 'Your cart is empty.');
//       return;
//     }

//       const selectedAddress = addressList[selectedAddressIndex];

//     if (addressList.length === 0 || !selectedAddress) {
//       Alert.alert('Address Required', 'Please add or select a delivery address.');
//       return;
//     }

//     const payload = buildOrderPayload();
//     if (!payload) {
//       Alert.alert('Error', 'Failed to prepare order.');
//       return;
//     }

//     const response = await dispatch(placeOrder(payload));


//     const options = {
//       description: 'Jewellery Order Payment',
//       image: 'https://your-logo-url.com/logo.png',
//       currency: 'INR',
//       key:  response.payload.key_id,
//       amount: (100),
//       name: 'Geeta Jewellers',
//       order_id: response.payload.razorpay_order_id,
//       prefill: {
//         name: customerName || selectedAddress?.customer_name || 'Customer',
//         contact: customerMobile || selectedAddress?.customer_mobile_number || '',
//         email: selectedAddress?.customer_email || '',
//       },
//       theme: { color: PRIMARY_COLOR },
//     };

//     RazorpayCheckout.open(
//       options,
//       async (successData) => {
//         try {
//           await dispatch(
//             updatePaymentDetails({
//               payment_id: successData.razorpay_payment_id,
//               razorpay_order_id: order.razorpay_order_id,
//               order_id: order.id,
//               order_status: 0,
//             })
//           ).unwrap();

//           dispatch(resetOrderState());

//           navigation.replace('OrderDetails', { order_id: order.id });
//         } catch (err) {
//           console.log(err,">>>>>>>>>err RRazorpay")
//           Alert.alert('Verification Failed', 'Payment received but verification failed.');
//           dispatch(resetOrderState());
//         }
//       },
//       (errorData) => {
//         dispatch(resetOrderState());
//         // const message = errorData?.error?.description || 'Payment cancelled or failed.';
//         // Alert.alert('Payment Failed', message);
//       }
//     );

//   };

//   const clearAddressFields = () => {
//     setName('');
//     setEmail('');
//     setAddressLine('');
//     setCity('');
//     setState('');
//     setDistrict('');
//     setPincode('');
//     setPhone('');
//     setAddressType('home');
//     setCustomAddressType('');
//     setErrors({});
//   };

//   const validateAddress = () => {
//     const newErrors = {};
//     if (!name.trim()) newErrors.name = 'Full Name is required';
//     if (!addressLine.trim()) newErrors.addressLine = 'Address Line is required';
//     if (!city.trim()) newErrors.city = 'City is required';
//     if (!state.trim()) newErrors.state = 'State is required';
//     if (!district.trim()) newErrors.district = 'District is required';
//     if (!pincode.trim() || pincode.length !== 6) newErrors.pincode = 'Valid 6-digit pincode required';
//     if (!phone.trim() || phone.length !== 10) newErrors.phone = 'Valid 10-digit phone required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSaveAddress = async () => {
//     if (!validateAddress()) return;

//     const finalType = addressType === 'other' ? customAddressType : addressType;

//     try {
//       await dispatch(
//         addCustomerDeliveryAddress({
//           userId: customerId,
//           addressType: finalType,
//           addressLine: addressLine.trim(),
//           city: city.trim(),
//           state: state.trim(),
//           district: district.trim(),
//           pincode: parseInt(pincode),
//           customerName: name.trim(),
//           customerPhone: phone.trim(),
//           customerEmail: email.trim() || undefined,
//         })
//       ).unwrap();

//       await dispatch(getCustomerAddresses({ customerId })).unwrap();
//       setAddAddressModalVisible(false);
//       clearAddressFields();
//     } catch (err) {
//       Alert.alert('Error', 'Failed to save address.');
//     }
//   };

//  const renderCartItem = (item) => (
//   <View style={styles.itemCard} key={item.cart_id}>
//     {/* Remove Button - Top Right */}
//     <TouchableOpacity
//       style={styles.removeButton}
//       onPress={() => handleRemoveItem(item.cart_id)}
//     >
//       <Ionicons name="close" size={20} color="#666" />
//     </TouchableOpacity>

//     <Image
//       source={{ uri: item.product_main_image || 'https://via.placeholder.com/70' }}
//       style={styles.image}
//       resizeMode="cover"
//     />
//     <View style={{ flex: 1, marginLeft: 10 }}>
//       <Text style={styles.itemTitle} numberOfLines={2}>
//         {item.product_name}
//       </Text>
//       {item.size && <Text style={styles.itemSize}>Size: {item.size}</Text>}
//       <Text style={styles.itemPrice}>
//         ₹{Number(item.total_price).toLocaleString('en-IN')}
//       </Text>
//       <Text style={styles.itemWeight}>
//         {item.gross_weight} g • {item.karat}K
//       </Text>
//     </View>
//   </View>
// );
// const handleRemoveItem = (cartId) => {
//   setSelectedCartId(cartId);
//   setRemoveModalVisible(true);
// };

// const confirmRemove = async () => {
//   if (selectedCartId && customerId) {
//     const result = await dispatch(removeFromCart(selectedCartId));
//    if (result.meta.requestStatus === 'fulfilled') {
//   Alert.alert('Success', 'Item removed from cart!');
// } else {
//   Alert.alert('Error', result.payload || 'Failed to remove item');
// }
//   }
//   setRemoveModalVisible(false);
//   setSelectedCartId(null);
// };
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Payment</Text>
//       </View>

//       <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
//         {cartLoading ? (
//           <ActivityIndicator style={{ marginTop: 20 }} size="large" color={PRIMARY_COLOR} />
//         ) : cartItems.length === 0 ? (
//           <Text style={{ textAlign: 'center', marginTop: 50, fontSize: 18 }}>Your cart is empty</Text>
//         ) : (
//           <>
//             {/* Cart Items */}
//             {cartItems.map((item) => renderCartItem(item))}

//             {/* Delivery Address */}
//             <View style={styles.addressSection}>
//               <Text style={styles.sectionTitle}>Delivery Address</Text>
//               {addressList.length === 0 ? (
//                 <TouchableOpacity
//                   style={styles.addAddressBtn}
//                   onPress={() => setAddAddressModalVisible(true)}
//                 >
//                   <Ionicons name="add-circle-outline" size={20} color={PRIMARY_COLOR} />
//                   <Text style={styles.addAddressText}>Add Delivery Address</Text>
//                 </TouchableOpacity>
//               ) : (
//                 <View style={styles.selectedAddressCard}>
//                   <View style={styles.addressHeader}>
//                     <Text style={styles.addressName}>
//                       {selectedAddress?.customer_name || 'User'}
//                     </Text>
//                     <TouchableOpacity onPress={() => setAddressModalVisible(true)}>
//                       <Text style={styles.changeText}>Change</Text>
//                     </TouchableOpacity>
//                   </View>
//                   <Text style={styles.addressText}>{formatAddress(selectedAddress)}</Text>
//                   <Text style={styles.addressPhone}>
//                     Phone: {selectedAddress?.customer_mobile_number || 'N/A'}
//                   </Text>
//                 </View>
//               )}
//             </View>

//             {/* Order Summary */}
//             <View style={styles.pricingContainer}>
//               <Text style={styles.pricingHeader}>Order Summary</Text>
//               <View style={styles.pricingRow}>
//                 <Text style={styles.label}>Sub Total ({cartItems.length} items)</Text>
//                 <Text style={styles.value}>₹{subTotal.toLocaleString('en-IN')}</Text>
//               </View>
//               <View style={styles.pricingRow}>
//                 <Text style={styles.label}>Delivery Charge</Text>
//                 <Text style={[styles.value, { color: '#4CAF50' }]}>Free</Text>
//               </View>
//               <View style={styles.separator} />
//               <View style={styles.pricingRow}>
//                 <Text style={styles.totalLabel}>Total Amount</Text>
//                 <Text style={[styles.totalValue, { color: PRIMARY_COLOR }]}>
//                   ₹{grandTotal.toLocaleString('en-IN')}
//                 </Text>
//               </View>
//             </View>
//           </>
//         )}
//       </ScrollView>

//       {/* Fixed Bottom Checkout Button */}
//       {cartItems.length > 0 && (
//         <View style={[styles.checkoutWrapper, { paddingBottom: insets.bottom + 20 }]}>
//           <View style={styles.checkoutSummary}>
//             <View>
//               <Text style={styles.checkoutTotalText}>Total</Text>
//               <Text style={styles.checkoutAmount}>₹{grandTotal.toLocaleString('en-IN')}</Text>
//             </View>
//             <TouchableOpacity
//               style={[styles.checkoutBtn, { backgroundColor: PRIMARY_COLOR }]}
//               onPress={handleProceed}
//               disabled={orderLoading}
//             >
//               {orderLoading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.checkoutBtnText}>Proceed to Pay</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}

//       {/* Address Selection Modal */}
//       <Modal visible={addressModalVisible} transparent animationType="slide">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Select Delivery Address</Text>
//             <ScrollView style={{ maxHeight: 400 }}>
//               {addressList.map((addr, index) => (
//                 <TouchableOpacity
//                   key={addr.id || index}
//                   style={[
//                     styles.addressListItem,
//                     selectedAddressIndex === index && styles.selectedListItem,
//                   ]}
//                   onPress={() => {
//                     setSelectedAddressIndex(index);
//                     setAddressModalVisible(false);
//                   }}
//                 >
//                   <Text style={styles.addressListName}>{addr.customer_name}</Text>
//                   <Text style={styles.addressListText}>{formatAddress(addr)}</Text>
//                   <Text style={styles.addressListPhone}>
//                     Phone: {addr.customer_mobile_number}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//             <View style={styles.modalActions}>
//               <TouchableOpacity
//                 style={styles.cancelBtn}
//                 onPress={() => setAddressModalVisible(false)}
//               >
//                 <Text style={styles.cancelText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.addNewBtn}
//                 onPress={() => {
//                   setAddressModalVisible(false);
//                   setAddAddressModalVisible(true);
//                 }}
//               >
//                 <Text style={styles.addNewText}>+ Add New Address</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Add Address Modal – same as Cart */}
//       <Modal visible={addAddressModalVisible} animationType="slide" transparent>
//         <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//           <View style={styles.myAddressesModalOverlay}>
//             <ScrollView contentContainerStyle={styles.myAddressesModalScrollContent} keyboardShouldPersistTaps="handled">
//               <View style={styles.myAddressesModalContainer}>
//                 <Text style={styles.myAddressesModalTitle}>Add Address</Text>

//                 <View style={{ marginBottom: 12 }}>
//                   <Text style={styles.fieldLabel}>Address Type</Text>
//                   <View style={{ flexDirection: 'row', marginTop: 8, gap: 12 }}>
//                     {['home', 'work', 'other'].map((type) => (
//                       <TouchableOpacity
//                         key={type}
//                         onPress={() => setAddressType(type)}
//                         style={{
//                           padding: 8,
//                           borderWidth: 0.5,
//                           backgroundColor: addressType === type ? PRIMARY_COLOR : '#fff',
//                           borderRadius: 4,
//                         }}
//                       >
//                         <Text style={{ color: addressType === type ? '#fff' : '#000' }}>
//                           {type.charAt(0).toUpperCase() + type.slice(1)}
//                         </Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                   {addressType === 'other' && (
//                     <TextInput
//                       placeholder="Enter Custom Type"
//                       placeholderTextColor="#999"
//                       style={styles.input}
//                       value={customAddressType}
//                       onChangeText={setCustomAddressType}
//                     />
//                   )}
//                 </View>

//                 <TextInput placeholder="Full Name" placeholderTextColor="#9999" style={styles.input} value={name} onChangeText={setName} />
//                 {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

//                 <TextInput placeholder="Email (Optional)" placeholderTextColor="#9999" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

//                 <TextInput placeholder="Address Line" placeholderTextColor="#9999" style={styles.input} value={addressLine} onChangeText={setAddressLine} />
//                 {errors.addressLine && <Text style={styles.errorText}>{errors.addressLine}</Text>}

//                 <TextInput placeholder="City" placeholderTextColor="#9999" style={styles.input} value={city} onChangeText={setCity} />
//                 {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

//                 <TextInput placeholder="State" placeholderTextColor="#9999" style={styles.input} value={state} onChangeText={setState} />
//                 {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

//                 <TextInput placeholder="District" placeholderTextColor="#9999" style={styles.input} value={district} onChangeText={setDistrict} />
//                 {errors.district && <Text style={styles.errorText}>{errors.district}</Text>}

//                 <TextInput placeholder="Pincode" placeholderTextColor="#9999" style={styles.input} keyboardType="numeric" value={pincode} onChangeText={setPincode} maxLength={6} />
//                 {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}

//                 <TextInput placeholder="Phone Number" placeholderTextColor="#9999" style={styles.input} keyboardType="numeric" value={phone} onChangeText={setPhone} maxLength={10} />
//                 {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

//                 <View style={styles.myAddressesModalActions}>
//                   <TouchableOpacity style={styles.buttonOutlinedFull} onPress={() => { setAddAddressModalVisible(false); clearAddressFields(); }}>
//                     <Text style={styles.modalButtonText}>Cancel</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={styles.buttonFilled} onPress={handleSaveAddress}>
//                     <Text style={[styles.modalButtonText, { color: '#fff' }]}>Save</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </ScrollView>
//           </View>
//         </KeyboardAvoidingView>
//       </Modal>



//       <CustomModal
//   visible={removeModalVisible}
//   onClose={() => setRemoveModalVisible(false)}
//   title="Remove Item"
//   content="Are you sure you want to remove this item from your cart?"
//   confirmText="Remove"
//   cancelText="Cancel"
//   onConfirm={confirmRemove}
// />
//     </SafeAreaView>
//   );
// };
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';

import {
  fetchCartItems,
  removeFromCart,
  clearError as clearCartError,
} from '../redux/slices/cartSlice';
import { getCustomerAddresses, addCustomerDeliveryAddress } from '../redux/slices/authSlice';
import {
  placeOrder,
  updatePaymentDetails,
  resetOrderState,
} from '../redux/slices/orderSlice';

import CustomModal from '../components/CustomModal';

const PRIMARY_COLOR = '#832729';

const Cart = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const { customerId, customerName, customerMobile } = useSelector((state) => state.Auth || {});
  const { addressList = [] } = useSelector((state) => state.Auth || {});
  const { cartItems = [], loading: cartLoading, error: cartError } = useSelector((state) => state.cart || {});
  const { order, loading: orderLoading, error: orderError } = useSelector((state) => state.order || {});

  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [addAddressModalVisible, setAddAddressModalVisible] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [selectedCartId, setSelectedCartId] = useState(null);

  // Add address form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [addressType, setAddressType] = useState('home');
  const [customAddressType, setCustomAddressType] = useState('');
  const [errors, setErrors] = useState({});

  // Fetch cart and addresses on mount
  useEffect(() => {
    if (customerId) {
      dispatch(fetchCartItems(customerId));
      dispatch(getCustomerAddresses({ customerId }));
    }
  }, [dispatch, customerId]);

  // Handle order error
  useEffect(() => {
    if (orderError) {
      Alert.alert('Order Failed', orderError?.message || 'Unable to place order.');
      dispatch(resetOrderState());
    }
  }, [orderError]);

  const subTotal = cartItems.reduce((sum, item) => sum + Number(item.total_price || 0), 0);
  const deliveryCharge = 0;
  const couponDiscount = 0;
  const grandTotal = subTotal + deliveryCharge - couponDiscount;

  const selectedAddress = addressList[selectedAddressIndex];

  const formatAddress = (addr) => {
    if (!addr) return 'No address selected';
    const parts = [];
    if (addr.addressLine || addr.address) parts.push(addr.addressLine || addr.address);
    if (addr.city) parts.push(addr.city);
    if (addr.state) parts.push(addr.state);
    if (addr.pincode) parts.push(addr.pincode);
    return parts.length > 0 ? parts.join(', ') : 'Address incomplete';
  };

  const buildOrderPayload = () => {
    if (!selectedAddress || cartItems.length === 0) return null;

    const fullAddress = [
      selectedAddress.addressLine || selectedAddress.address || '',
      selectedAddress.city || '',
      selectedAddress.state || '',
      selectedAddress.district || '',
      selectedAddress.pincode ? ` - ${selectedAddress.pincode}` : '',
    ]
      .filter(Boolean)
      .join(', ');

    const sub_order_array = cartItems.map((item) => ({
      product_id: item.product_id?.toString() || '',
      product_name: item.product_name || '',
      product_image: item.product_main_image || '',
      category_id: item.category_id?.toString() || '',
      sub_category_id: item.subcategory_id?.toString() || '',
      size_id: item.size_id?.toString() || '0',
      size: item.size || '',
      gross_weight: item.gross_weight || '0',
      item_price: item.total_price?.toString() || '0',
      sub_item_count: '1',
      item_total_amount: item.total_price?.toString() || '0',
    }));

    return {
      customer_id: customerId?.toString() || '',
      customer_name: customerName || selectedAddress.customer_name || 'User',
      customer_mobile_number: customerMobile || selectedAddress.customer_mobile_number || '',
      item_count: cartItems.length.toString(),
      sub_total_amount: subTotal.toString(),
      coupon_amount: couponDiscount.toString(),
      delivery_charges: deliveryCharge.toString(),
      total_amount: (subTotal + deliveryCharge).toString(),
      grand_total: grandTotal.toString(),
      payment_type: 'Pay Online',
      order_status: '7',
      coupon_id: '',
      order_pincode: selectedAddress.pincode?.toString() || '',
      delivery_address: fullAddress,
      sub_order_array,
    };
  };

  const handleProceed = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty.');
      return;
    }
    if (addressList.length === 0 || !selectedAddress) {
      Alert.alert('Address Required', 'Please add or select a delivery address.');
      return;
    }

    const payload = buildOrderPayload();
    if (!payload) {
      Alert.alert('Error', 'Failed to prepare order.');
      return;
    }

    const response = await dispatch(placeOrder(payload));

    const options = {
      description: 'Jewellery Order Payment',
      image: 'https://your-logo-url.com/logo.png',
      currency: 'INR',
      key: response.payload.key_id,
      amount: 100, // amount in paise - adjust if needed
      name: 'Geeta Jewellers',
      order_id: response.payload.razorpay_order_id,
      prefill: {
        name: customerName || selectedAddress?.customer_name || 'Customer',
        contact: customerMobile || selectedAddress?.customer_mobile_number || '',
        email: selectedAddress?.customer_email || '',
      },
      theme: { color: PRIMARY_COLOR },
    };

    RazorpayCheckout.open(
      options,
      async (successData) => {
        try {
          await dispatch(
            updatePaymentDetails({
              payment_id: successData.razorpay_payment_id,
              razorpay_order_id: order.razorpay_order_id,
              order_id: order.id,
              order_status: 0,
            })
          ).unwrap();
          dispatch(resetOrderState());
          navigation.replace('OrderDetails', { order_id: order.id });
        } catch (err) {
          console.log(err, '>>>>>>>>>err Razorpay');
          Alert.alert('Verification Failed', 'Payment received but verification failed.');
          dispatch(resetOrderState());
        }
      },
      (errorData) => {
        dispatch(resetOrderState());
      }
    );
  };

  const clearAddressFields = () => {
    setName('');
    setEmail('');
    setAddressLine('');
    setCity('');
    setState('');
    setDistrict('');
    setPincode('');
    setPhone('');
    setAddressType('home');
    setCustomAddressType('');
    setErrors({});
  };

  const validateAddress = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Full Name is required';
    if (!addressLine.trim()) newErrors.addressLine = 'Address Line is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!state.trim()) newErrors.state = 'State is required';
    if (!district.trim()) newErrors.district = 'District is required';
    if (!pincode.trim() || pincode.length !== 6) newErrors.pincode = 'Valid 6-digit pincode required';
    if (!phone.trim() || phone.length !== 10) newErrors.phone = 'Valid 10-digit phone required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAddress = async () => {
    if (!validateAddress()) return;

    const finalType = addressType === 'other' ? customAddressType : addressType;

    try {
      await dispatch(
        addCustomerDeliveryAddress({
          userId: customerId,
          addressType: finalType,
          addressLine: addressLine.trim(),
          city: city.trim(),
          state: state.trim(),
          district: district.trim(),
          pincode: parseInt(pincode),
          customerName: name.trim(),
          customerPhone: phone.trim(),
          customerEmail: email.trim() || undefined,
        })
      ).unwrap();

      await dispatch(getCustomerAddresses({ customerId })).unwrap();
      setAddAddressModalVisible(false);
      clearAddressFields();
    } catch (err) {
      Alert.alert('Error', 'Failed to save address.');
    }
  };

 const handleRemoveItem = (cartId) => {
  setSelectedCartId(cartId);
  setRemoveModalVisible(true);
};

const confirmRemove = async () => {
  if (!selectedCartId) {
    Alert.alert('Error', 'No item selected to remove');
    return;
  }

  try {
    const result = await dispatch(removeFromCart(selectedCartId)).unwrap();

    // Success: refetch cart to sync with backend
    dispatch(fetchCartItems(customerId));

    Alert.alert('Success', 'Item removed from cart!');
  } catch (err) {
    console.error('Remove failed:', err);
    Alert.alert('Error', err?.message || 'Failed to remove item from cart');
  }

  // Always close modal and reset state
  setRemoveModalVisible(false);
  setSelectedCartId(null);
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
        <View style={{ width: 24 }} /> {/* Spacer for centering title */}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
   {cartLoading ? (
  <ActivityIndicator style={{ marginTop: 20 }} size="large" color={PRIMARY_COLOR} />
) : cartItems.length === 0 ? (
  <View style={styles.emptyCartContainer}>
    <Image
      source={require('../assets/cartempty.png')}  // ← Correct local asset usage
      style={styles.emptyCartImage}
      resizeMode="contain"
    />
    <Text style={styles.emptyCartText}>Your cart is empty</Text>
    <TouchableOpacity
      style={styles.shopNowButton}
      onPress={() => navigation.navigate('DrawerNavigation')}  // Replace 'Home' with your drawer main route if different
    >
      <Text style={styles.shopNowButtonText}>Shop Now</Text>
    </TouchableOpacity>
  </View>
) :  (
          <>
            {/* Cart Items - CORRECTED MAPPING */}
            {cartItems.map((item) => (
              <View style={styles.itemCard} key={item.id}>
                {/* Remove Button */}
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(item.id)}
                >
                  <Ionicons name="close" size={20} color="#666" />
                </TouchableOpacity>

                <Image
                  source={{ uri: item.product_main_image || 'https://via.placeholder.com/70' }}
                  style={styles.image}
                  resizeMode="cover"
                />

                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.itemTitle} numberOfLines={2}>
                    {item.product_name}
                  </Text>
                  {item.size && <Text style={styles.itemSize}>Size: {item.size}</Text>}
                  <Text style={styles.itemPrice}>
                    ₹{Number(item.total_price).toLocaleString('en-IN')}
                  </Text>
                  <Text style={styles.itemWeight}>
                    {item.weight} g • {item.karat}K
                  </Text>
                </View>
              </View>
            ))}

            {/* Delivery Address Section */}
            <View style={styles.addressSection}>
              <Text style={styles.sectionTitle}>Delivery Address</Text>
              {addressList.length === 0 ? (
                <TouchableOpacity
                  style={styles.addAddressBtn}
                  onPress={() => setAddAddressModalVisible(true)}
                >
                  <Ionicons name="add-circle-outline" size={20} color={PRIMARY_COLOR} />
                  <Text style={styles.addAddressText}>Add Delivery Address</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.selectedAddressCard}>
                  <View style={styles.addressHeader}>
                    <Text style={styles.addressName}>
                      {selectedAddress?.customer_name || 'User'}
                    </Text>
                    <TouchableOpacity onPress={() => setAddressModalVisible(true)}>
                      <Text style={styles.changeText}>Change</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.addressText}>{formatAddress(selectedAddress)}</Text>
                  <Text style={styles.addressPhone}>
                    Phone: {selectedAddress?.customer_mobile_number || 'N/A'}
                  </Text>
                </View>
              )}
            </View>

            {/* Order Summary */}
            <View style={styles.pricingContainer}>
              <Text style={styles.pricingHeader}>Order Summary</Text>
              <View style={styles.pricingRow}>
                <Text style={styles.label}>Sub Total ({cartItems.length} items)</Text>
                <Text style={styles.value}>₹{subTotal.toLocaleString('en-IN')}</Text>
              </View>
              <View style={styles.pricingRow}>
                <Text style={styles.label}>Delivery Charge</Text>
                <Text style={[styles.value, { color: '#4CAF50' }]}>Free</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.pricingRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={[styles.totalValue, { color: PRIMARY_COLOR }]}>
                  ₹{grandTotal.toLocaleString('en-IN')}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Fixed Checkout Button */}
      {cartItems.length > 0 && (
        <View style={[styles.checkoutWrapper, { paddingBottom: insets.bottom + 20 }]}>
          <View style={styles.checkoutSummary}>
            <View>
              <Text style={styles.checkoutTotalText}>Total</Text>
              <Text style={styles.checkoutAmount}>₹{grandTotal.toLocaleString('en-IN')}</Text>
            </View>
            <TouchableOpacity
              style={[styles.checkoutBtn, { backgroundColor: PRIMARY_COLOR }]}
              onPress={handleProceed}
              disabled={orderLoading}
            >
              {orderLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.checkoutBtnText}>Proceed to Pay</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Address Selection Modal */}
      <Modal visible={addressModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Delivery Address</Text>
            <ScrollView style={{ maxHeight: 400 }}>
              {addressList.map((addr, index) => (
                <TouchableOpacity
                  key={addr.id || index}
                  style={[
                    styles.addressListItem,
                    selectedAddressIndex === index && styles.selectedListItem,
                  ]}
                  onPress={() => {
                    setSelectedAddressIndex(index);
                    setAddressModalVisible(false);
                  }}
                >
                  <Text style={styles.addressListName}>{addr.customer_name}</Text>
                  <Text style={styles.addressListText}>{formatAddress(addr)}</Text>
                  <Text style={styles.addressListPhone}>
                    Phone: {addr.customer_mobile_number}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setAddressModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addNewBtn}
                onPress={() => {
                  setAddressModalVisible(false);
                  setAddAddressModalVisible(true);
                }}
              >
                <Text style={styles.addNewText}>+ Add New Address</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Address Modal */}
      <Modal visible={addAddressModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.myAddressesModalOverlay}>
            <ScrollView
              contentContainerStyle={styles.myAddressesModalScrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.myAddressesModalContainer}>
                <Text style={styles.myAddressesModalTitle}>Add Address</Text>

                {/* Address Type Buttons */}
                <View style={{ marginBottom: 12 }}>
                  <Text style={styles.fieldLabel}>Address Type</Text>
                  <View style={{ flexDirection: 'row', marginTop: 8, gap: 12 }}>
                    {['home', 'work', 'other'].map((type) => (
                      <TouchableOpacity
                        key={type}
                        onPress={() => setAddressType(type)}
                        style={{
                          padding: 8,
                          borderWidth: 0.5,
                          backgroundColor: addressType === type ? PRIMARY_COLOR : '#fff',
                          borderRadius: 4,
                        }}
                      >
                        <Text style={{ color: addressType === type ? '#fff' : '#000' }}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {addressType === 'other' && (
                    <TextInput
                      placeholder="Enter Custom Type"
                      placeholderTextColor="#999"
                      style={styles.input}
                      value={customAddressType}
                      onChangeText={setCustomAddressType}
                    />
                  )}
                </View>

                <TextInput placeholder="Full Name" style={styles.input} value={name} onChangeText={setName} />
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                <TextInput
                  placeholder="Email (Optional)"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />

                <TextInput
                  placeholder="Address Line"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={addressLine}
                  onChangeText={setAddressLine}
                />
                {errors.addressLine && <Text style={styles.errorText}>{errors.addressLine}</Text>}

                <TextInput placeholder="City" style={styles.input} placeholderTextColor="#999" value={city} onChangeText={setCity} />
                {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

                <TextInput placeholder="State" style={styles.input} value={state} placeholderTextColor="#999" onChangeText={setState} />
                {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

                <TextInput
                  placeholder="District"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={district}
                  onChangeText={setDistrict}
                />
                {errors.district && <Text style={styles.errorText}>{errors.district}</Text>}

                <TextInput
                  placeholder="Pincode"
                  placeholderTextColor="#999"
                  style={styles.input}
                  keyboardType="numeric"
                  value={pincode}
                  onChangeText={setPincode}
                  maxLength={6}
                />
                {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}

                <TextInput
                  placeholder="Phone Number"
                  placeholderTextColor="#999"
                  style={styles.input}
                  keyboardType="numeric"
                  value={phone}
                  onChangeText={setPhone}
                  maxLength={10}
                />
                {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

                <View style={styles.myAddressesModalActions}>
                  <TouchableOpacity
                    style={styles.buttonOutlinedFull}
                    onPress={() => {
                      setAddAddressModalVisible(false);
                      clearAddressFields();
                    }}
                  >
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonFilled} onPress={handleSaveAddress}>
                    <Text style={[styles.modalButtonText, { color: '#fff' }]}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Remove Confirmation Modal */}
      <CustomModal
        visible={removeModalVisible}
        onClose={() => setRemoveModalVisible(false)}
        title="Remove Item"
        content="Are you sure you want to remove this item from your cart?"
        confirmText="Remove"
        cancelText="Cancel"
        onConfirm={confirmRemove}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, backgroundColor: '#fff' },
  headerTitle: { flex: 1, marginLeft: 16, fontSize: 20, fontWeight: '600', color: '#000' },

  itemCard: { flexDirection: 'row', backgroundColor: '#F8F8F8', marginHorizontal: 16, marginVertical: 8, borderRadius: 12, padding: 12 },
  image: { width: 80, height: 80, borderRadius: 10 },
  itemTitle: { fontSize: 14, fontWeight: '500' },
  itemSize: { fontSize: 13, color: '#555', marginTop: 4 },
  itemPrice: { fontSize: 16, fontWeight: '700', marginTop: 6 },
  itemWeight: { fontSize: 12, color: '#777', marginTop: 4 },

  addressSection: { marginHorizontal: 16, marginTop: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 12 },
  addAddressBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#ddd', borderStyle: 'dashed' },
  addAddressText: { marginLeft: 10, fontSize: 15, color: PRIMARY_COLOR, fontWeight: '600' },
  selectedAddressCard: { backgroundColor: '#f9f9f9', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#eee' },
  addressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  addressName: { fontSize: 16, fontWeight: '600' },
  changeText: { color: PRIMARY_COLOR, fontWeight: '600' },
  addressText: { fontSize: 14, color: '#555', lineHeight: 20 },
  addressPhone: { fontSize: 14, color: '#777', marginTop: 4 },

  pricingContainer: { marginHorizontal: 16, paddingVertical: 16, backgroundColor: '#f9f9f9', borderRadius: 12, marginTop: 20 },
  pricingHeader: { fontSize: 17, fontWeight: '700', marginBottom: 12, paddingHorizontal: 16 },
  pricingRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginVertical: 6 },
  label: { fontSize: 15, color: '#555' },
  value: { fontSize: 15, color: '#000', fontWeight: '600' },
  separator: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 12 },
  totalLabel: { fontSize: 17, fontWeight: '700' },
  totalValue: { fontSize: 19, fontWeight: '800' },

  checkoutWrapper: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#E0E0E0', paddingTop: 12 },
  checkoutSummary: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 },
  checkoutTotalText: { fontSize: 14, color: '#555' },
  checkoutAmount: { fontSize: 20, fontWeight: '800', color: PRIMARY_COLOR },
  checkoutBtn: { borderRadius: 12, paddingVertical: 16, paddingHorizontal: 30 },
  checkoutBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContainer: { backgroundColor: '#fff', borderTopLeftRadius: 12, borderTopRightRadius: 12, padding: 20, maxHeight: '80%' },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
  addressListItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  selectedListItem: { backgroundColor: '#f0f0f0', borderRadius: 8, padding: 12 },
  addressListName: { fontSize: 15, fontWeight: '600' },
  addressListText: { fontSize: 14, color: '#555' },
  addressListPhone: { fontSize: 13, color: '#777' },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cancelBtn: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, alignItems: 'center', marginRight: 8 },
  cancelText: { fontSize: 16 },
  addNewBtn: { flex: 1, backgroundColor: PRIMARY_COLOR, padding: 12, borderRadius: 8, alignItems: 'center' },
  addNewText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  myAddressesModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  myAddressesModalScrollContent: { flexGrow: 1, justifyContent: 'flex-end' },
  myAddressesModalContainer: { backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  myAddressesModalTitle: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  fieldLabel: { fontSize: 14, color: '#000', marginBottom: 8 },
  input: { marginBottom: 12, borderRadius: 4, paddingHorizontal: 12, paddingVertical: 12, borderColor: '#919191', borderWidth: 0.5, backgroundColor: '#fff' },
  errorText: { color: 'red', fontSize: 12, marginBottom: 8, marginTop: -8 },
  myAddressesModalActions: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 20 },
  buttonOutlinedFull: { flex: 1, padding: 12, borderRadius: 6, borderColor: '#000', borderWidth: 1, alignItems: 'center' },
  buttonFilled: { flex: 1, padding: 12, borderRadius: 6, backgroundColor: PRIMARY_COLOR, alignItems: 'center' },
  modalButtonText: { color: '#000', fontSize: 16 },

  removeButton: {
  position: 'absolute',
  top: 8,
  right: 8,
  backgroundColor: '#fff',
  borderRadius: 15,
  width: 30,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
  elevation: 3, // for Android shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
},
emptyCartContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
},
emptyCartImage: {
  width: 200,
  height: 200,
  marginBottom: 30,
},
emptyCartText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#555',
  marginBottom: 30,
},
shopNowButton: {
  backgroundColor: PRIMARY_COLOR,
  paddingHorizontal: 40,
  paddingVertical: 16,
  borderRadius: 12,
},
shopNowButtonText: {
  color: '#fff',
  fontSize: 14,
  fontWeight: '600',
},
emptyCartContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
},
emptyCartImage: {
  width: 280,   // Adjust based on your image dimensions
  height: 280,
  marginBottom: 40,
},
emptyCartText: {
  fontSize: 20,
  fontWeight: '600',
  color: '#555',
  marginBottom: 30,
  textAlign: 'center',
},
shopNowButton: {
  backgroundColor: PRIMARY_COLOR,  // #832729
  paddingHorizontal: 50,
  paddingVertical: 16,
  borderRadius: 12,
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
},
shopNowButtonText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '700',
},
});

export default Cart;
