import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  StatusBar,
  Modal,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator,
  AppState,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import commonstyles from '../commonstyles/commonstyles';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Location } from '../assets/Svgs';

// Haversine formula to calculate distance between two coordinates (in kilometers)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

// Dummy data
const dummyAddressList = [
  {
    id: 1,
    full_address: "Magadi Main Rd, nr Prasanna Theatre, Chikkabidarakallu, Bengaluru, Karnataka 560023",
    customer_name: "James",
    customer_mobile_number: "+9187654321",
    customer_email: "gmail@example.com",
    pincode: 560023,
    estimated_delivery_time: "2-3 days",
    customer_latitude: 12.9716,
    customer_longitude: 77.5946,
    distance_km: 5,
    warehouse_id: 1,
    address_type: "home",
  }
];

const dummyPincodes = [{ pincode: 560023 }];

const dummyApplicationData = {
  data: [
    {
      order_value_limit: 50000,
      charge_below_limit: 50,
      charge_above_limit: 0,
    }
  ]
};

const dummyCustomerId = "123";
const dummyCustomerName = "James";

const dummyCartItems = [
  {
    cart_id: 1,
    product_name: "Arch of Royalty Gold Haaram",
    brand_name: "Arch of Royalty",
    product_image: require("../assets/haaram.png"),
    selected_size: "M",
    quantity: 1,
    sizes: [
      { size: "M", selling_price: "37899", actual_price: "45000", stock: 10, size_id: 1 }
    ],
    selling_price: "37899",
    actual_price: "45000",
    product_id: 1,
    category_id: 1,
    subcategory_id: 1,
    brand_id: 1,
    varient_id: 1,
    product_color: "Gold",
    return_policy: "30 days",
  },
  {
    cart_id: 2,
    product_name: "Arch of Royalty Gold Mangalsutra",
    brand_name: "Arch of Royalty",
    product_image: require("../assets/mangalsutra.png"),
    selected_size: "S",
    quantity: 1,
    sizes: [
      { size: "S", selling_price: "25000", actual_price: "30000", stock: 5, size_id: 2 }
    ],
    selling_price: "25000",
    actual_price: "30000",
    product_id: 2,
    category_id: 1,
    subcategory_id: 1,
    brand_id: 1,
    varient_id: 1,
    product_color: "Gold",
    return_policy: "30 days",
  },
];

const dummySelectedCoupon = null;

const dummyRouteParams = {
  selectedDelivery: 'standard',
  cartItems: dummyCartItems,
  selectedCoupon: dummySelectedCoupon,
  orderDetails: null,
};

const Payment = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { selectedDelivery = 'standard', cartItems: routeCartItems = [], selectedCoupon, orderDetails } = dummyRouteParams;
  const addressList = dummyAddressList;
  const customerId = dummyCustomerId;
  const customerName = dummyCustomerName;
  const deliveryAddressStatus = 'idle';
  const deliveryAddressError = null;
  const pincodes = dummyPincodes;
  const loading = false;
  const pincodeLoading = false;
  const orderLoading = false;
  const appDataLoading = false;
  const appDataError = null;
  const serviceLoading = false;
  const serviceError = null;
  const expected_time = "2-3 days";
  const distance = 5;
  const scrollViewRef = useRef(null);
  const orderDetailsRef = useRef(null);

  // Tip-related state
  const [deliveryBoyTip, setDeliveryBoyTip] = useState(0);
  const [customTipInput, setCustomTipInput] = useState('');
  const [showCustomTip, setShowCustomTip] = useState(false);
  const [tipError, setTipError] = useState('');

  // Payment success modal states
  const [paymentSuccessModalVisible, setPaymentSuccessModalVisible] = useState(false);

  // Store orderResponse and serviceResponse for use in modal navigation
  const [orderResponse, setOrderResponse] = useState(null);
  const [serviceResponse, setServiceResponse] = useState(null);
  const [successData, setSuccessData] = useState(null);

  const PENDING_ORDER_KEY = 'pending_order_details';

  const extractPincodeFromAddress = (fullAddress) => {
    if (!fullAddress) return '';
    const parts = fullAddress.split(',').map(part => part.trim());
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes('India -')) {
      return lastPart.split('-')[1]?.trim() || '';
    }
    return lastPart.match(/^\d{6}$/) ? lastPart : '';
  };

  const getInitialPincode = () => {
    const selectedAddress = addressList[0];
    if (selectedAddress) {
      if (selectedAddress.pincode && selectedAddress.pincode !== 0) {
        return selectedAddress.pincode.toString();
      }
      return extractPincodeFromAddress(selectedAddress.full_address);
    }
    return '';
  };

  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [addAddressModalVisible, setAddAddressModalVisible] = useState(false);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [pincodeModalVisible, setPincodeModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [stockModalVisible, setStockModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [stockError, setStockError] = useState({ cartId: null, availableStock: 0 });
  const [pincodeMessage, setPincodeMessage] = useState('');
  const [localCartItems, setLocalCartItems] = useState(routeCartItems);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [addressType, setAddressType] = useState('home');
  const [customAddressType, setCustomAddressType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [pincode, setPincode] = useState(getInitialPincode());
  const [addAddressPincodeMessage, setAddAddressPincodeMessage] = useState('');

  // Map addressList to match expected structure (id -> address_id) and add deliverable check
  const normalizedAddressList = addressList.map(address => ({
    ...address,
    address_id: address.id,
    isDeliverable: address.estimated_delivery_time !== 'Not_Available',
  }));

  // Select first deliverable address on load
  useEffect(() => {
    if (addressList.length > 0 && selectedAddressIndex === 0) {
      const firstDeliverableIndex = normalizedAddressList.findIndex(addr => addr.isDeliverable);
      if (firstDeliverableIndex !== -1) {
        setSelectedAddressIndex(firstDeliverableIndex);
      }
    }
  }, [normalizedAddressList]);

  const [shippingAddress, setShippingAddress] = useState('Magadi Main Rd, nr Prasanna Theatre, Chikkabidarakallu, Bengaluru, Karnataka 560023');
  const [contactInfo, setContactInfo] = useState('+91-9164321, gmail@example.com');

  // Function to save pending order details
  const savePendingOrder = async (orderRes, servRes, successDat, cartItemsLocal, shipAddr, contInfo) => {
    const pendingData = {
      orderId: orderRes.id,
      orderDate: orderRes.order_date,
      paymentId: successDat.razorpay_payment_id,
      expectedDeliveryTime: servRes.expected_time,
      cartItems: cartItemsLocal,
      shippingAddress: shipAddr,
      contactInfo: contInfo,
    };
    await AsyncStorage.setItem(PENDING_ORDER_KEY, JSON.stringify(pendingData));
  };

  // Function to clear pending order
  const clearPendingOrder = async () => {
    await AsyncStorage.removeItem(PENDING_ORDER_KEY);
  };

  // Function to navigate to OrderDetails with pending data
  const navigateWithPending = async () => {
    const pendingJson = await AsyncStorage.getItem(PENDING_ORDER_KEY);
    if (pendingJson) {
      const pendingData = JSON.parse(pendingJson);
      await clearPendingOrder();
      navigation.replace('OrderDetails', pendingData);
    }
  };

  useEffect(() => {
    // Mock fetch calls
    // dispatch(fetchPincodes());
    // dispatch(fetchApplicationData());
    // if (customerId) {
    //   dispatch(getCustomerAddresses({ customerId }));
    // }

    // Check for pending order on mount
    navigateWithPending();
  }, []);

  useEffect(() => {
    setLocalCartItems(routeCartItems);
  }, [routeCartItems]);

  useEffect(() => {
    const selectedAddress = normalizedAddressList[selectedAddressIndex];
    if (selectedAddress) {
      setShippingAddress(selectedAddress.full_address);
      const contact = selectedAddress.customer_mobile_number
        ? `${selectedAddress.customer_mobile_number}, ${selectedAddress.customer_email || 'gmail@example.com'}`
        : '+91-9164321, gmail@example.com';
      setContactInfo(contact);
      const newPincode = selectedAddress.pincode && selectedAddress.pincode !== 0
        ? selectedAddress.pincode.toString()
        : extractPincodeFromAddress(selectedAddress.full_address);
      setPincode(newPincode);
    } else {
      setShippingAddress('Magadi Main Rd, nr Prasanna Theatre, Chikkabidarakallu, Bengaluru, Karnataka 560023');
      setContactInfo('+91-9164321, gmail@example.com');
      setPincode('');
    }
  }, [normalizedAddressList, selectedAddressIndex]);

  useEffect(() => {
    if (deliveryAddressError) {
      setErrorMessage(`Failed to add address: ${deliveryAddressError}`);
      setErrorModalVisible(true);
    }
  }, [deliveryAddressError]);

  useEffect(() => {
    if (pincode.length === 6 && pincodes.length > 0) {
      const isValidPincode = pincodes.some((item) => item.pincode === parseInt(pincode));
      setPincodeMessage(
        isValidPincode
          ? 'Yes, delivery is available to this pincode.'
          : 'No services available, try with another pincode.'
      );
    } else {
      setPincodeMessage('');
    }
  }, [pincode, pincodes]);

  useEffect(() => {
    if (pincode.length === 6 && pincodes.length > 0) {
      const isValidPincode = pincodes.some((item) => item.pincode === parseInt(pincode));
      setAddAddressPincodeMessage(
        isValidPincode
          ? 'Delivery is available to this pincode.'
          : 'No services available for this pincode.'
      );
    } else {
      setAddAddressPincodeMessage('');
    }
  }, [pincode, pincodes]);

  // Handle navigation return from SelectOnMap
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // if (customerId) {
      //   dispatch(getCustomerAddresses({ customerId }));
      // }
      // Check for pending order on focus
      navigateWithPending();
    });
    return unsubscribe;
  }, [navigation]);

  // AppState listener for background/foreground
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        // App has come to the foreground, check for pending order
        navigateWithPending();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => subscription?.remove();
  }, []);

  const deliveryCost = dummyApplicationData?.data?.[0]
    ? subtotal < parseFloat(dummyApplicationData.data[0].order_value_limit)
      ? parseFloat(dummyApplicationData.data[0].charge_below_limit)
      : parseFloat(dummyApplicationData.data[0].charge_above_limit)
    : 50;

  const subtotal = localCartItems.reduce((sum, item) => {
    const selectedSizeObj = item.sizes.find((size) => size.size === item.selected_size) || item.sizes[0];
    const price = selectedSizeObj ? parseFloat(selectedSizeObj.selling_price) : parseFloat(item.selling_price);
    return sum + price * (item.quantity || 1);
  }, 0);

  const actualTotal = localCartItems.reduce((sum, item) => {
    const selectedSizeObj = item.sizes.find((size) => size.size === item.selected_size) || item.sizes[0];
    const price = selectedSizeObj ? parseFloat(selectedSizeObj.actual_price) : parseFloat(item.actual_price);
    return sum + price * (item.quantity || 1);
  }, 0);

  const couponAmount = selectedCoupon?.coupon_amount ? parseFloat(selectedCoupon.coupon_amount) : 0;
  const totalSaving = actualTotal - subtotal;
  const grandTotal = subtotal + deliveryCost - couponAmount + deliveryBoyTip;

  // Tip-related functions
  const handleTipSelect = (amount) => {
    setDeliveryBoyTip(amount);
    setCustomTipInput(amount.toString());
    setShowCustomTip(false);
    setTipError('');
  };

  const handleCustomTipChange = (text) => {
    setCustomTipInput(text);
    setTipError('');

    if (text === '') {
      setDeliveryBoyTip(0);
      return;
    }

    const tipValue = parseFloat(text);
    if (isNaN(tipValue) || tipValue < 0) {
      setTipError('Please enter a valid tip amount');
      setDeliveryBoyTip(0);
    } else if (tipValue > 1000) {
      setTipError('Tip amount cannot exceed ₹1000');
      setDeliveryBoyTip(0);
    } else {
      setDeliveryBoyTip(tipValue);
    }
  };

  const toggleCustomTip = () => {
    setShowCustomTip(true);
    setCustomTipInput('');
    setDeliveryBoyTip(0);
    setTipError('');
  };

  const handleQtyChange = async (cartId, newQty) => {
    const cartItem = localCartItems.find((item) => item.cart_id === cartId);
    if (!cartItem) {
      setErrorMessage('Cart item not found');
      setErrorModalVisible(true);
      return;
    }

    const selectedSizeObj = cartItem.sizes.find((size) => size.size === cartItem.selected_size) || cartItem.sizes[0];
    const availableStock = selectedSizeObj ? selectedSizeObj.stock : 0;

    if (newQty > availableStock) {
      setStockError({ cartId, availableStock });
      setStockModalVisible(true);
      return;
    }

    // Mock dispatch
    setLocalCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cart_id === cartId ? { ...item, quantity: newQty } : item
      )
    );
    console.log(`Changed quantity for item ${cartId} to ${newQty}`);
  };

  const handleSelectAddress = (index) => {
    if (normalizedAddressList[index]?.isDeliverable) {
      setSelectedAddressIndex(index);
      setAddressModalVisible(false);
      const selectedAddress = normalizedAddressList[index];
      if (selectedAddress) {
        const newPincode = selectedAddress.pincode && selectedAddress.pincode !== 0
          ? selectedAddress.pincode.toString()
          : extractPincodeFromAddress(selectedAddress.full_address);
        setPincode(newPincode);
      }
    }
  };

  const handleProceed = async () => {
    // try {
    //   const selectedAddress = normalizedAddressList[selectedAddressIndex];

    //   if (!selectedAddress) {
    //     setErrorMessage('Please select a delivery address.');
    //     setErrorModalVisible(true);
    //     return;
    //   }

    //   if (!selectedAddress.isDeliverable) {
    //     setErrorMessage('Selected address is not deliverable.');
    //     setErrorModalVisible(true);
    //     return;
    //   }

    //   // Use estimated_delivery_time from address if available
    //   const expectedDeliveryTime = selectedAddress.estimated_delivery_time;

    //   // Check latitude and longitude
    //   const { customer_latitude, customer_longitude } = selectedAddress;
    //   if (!customer_latitude || !customer_longitude) {
    //     setErrorMessage('Selected address does not have valid latitude and longitude.');
    //     setErrorModalVisible(true);
    //     return;
    //   }

    //   // Mock service response
    //   let servRes = {
    //     expected_time: expectedDeliveryTime || "2-3 days",
    //     distance: selectedAddress.distance_km || 5,
    //     warehouse_id: selectedAddress.warehouse_id || 1,
    //   };

    //   // Check if the distance is within 30 km
    //   const MAX_RADIUS = 30; // 30 km radius
    //   let distanceToCheck = servRes.distance; // Use API-provided distance if available

    //   // Fallback: Calculate distance client-side if servRes.distance is not reliable
    //   const warehouseLat = 12.9716; // Example: Bengaluru coordinates, replace with actual warehouse latitude
    //   const warehouseLon = 77.5946; // Example: Bengaluru coordinates, replace with actual warehouse longitude
    //   if (!distanceToCheck) {
    //     distanceToCheck = calculateDistance(
    //       parseFloat(customer_latitude),
    //       parseFloat(customer_longitude),
    //       warehouseLat,
    //       warehouseLon
    //     );
    //   }

    //   if (distanceToCheck > MAX_RADIUS) {
    //     setErrorMessage('Location not serviceable.');
    //     setErrorModalVisible(true);
    //     return;
    //   }

    //   const subOrderArray = localCartItems.map((item) => {
    //     const selectedSizeObj = item.sizes.find((size) => size.size === item.selected_size) || item.sizes[0];
    //     const actualPrice = parseFloat(selectedSizeObj.actual_price);
    //     const sellingPrice = parseFloat(selectedSizeObj.selling_price);
    //     const quantity = parseInt(item.quantity);
    //     return {
    //       product_id: item.product_id.toString(),
    //       product_name: item.product_name,
    //       product_image: item.product_image,
    //       category_id: item.category_id.toString(),
    //       sub_category_id: item.subcategory_id.toString(),
    //       brand_id: item.brand_id.toString(),
    //       brand_name: item.brand_name,
    //       varient_id: item.varient_id.toString(),
    //       color: item.product_color,
    //       size_id: selectedSizeObj.size_id.toString(),
    //       size: item.selected_size,
    //       actualitem_price: actualPrice.toString(),
    //       item_price: sellingPrice.toString(),
    //       sub_item_count: quantity.toString(),
    //       item_total_amount: (sellingPrice * quantity).toString(),
    //       saving_price: ((actualPrice - sellingPrice) * quantity).toString(),
    //       return_policy: item.return_policy.toString(),
    //     };
    //   });

    //   // Calculate item_count based on unique size_id
    //   const item_count = new Set(localCartItems.map((item) => {
    //     const selectedSizeObj = item.sizes.find((size) => size.size === item.selected_size) || item.sizes[0];
    //     return selectedSizeObj ? selectedSizeObj.size_id.toString() : '';
    //   })).size.toString();

    //   const orderPayload = {
    //     customer_id: customerId,
    //     customer_name: customerName || selectedAddress.customer_name || 'user88',
    //     customer_mobile_number: selectedAddress.customer_mobile_number || '7661967141',
    //     item_count: item_count,
    //     actual_total_amount: actualTotal.toString(),
    //     total_amount: subtotal.toString(),
    //     total_saving_amount: totalSaving.toString(),
    //     coupon_amount: couponAmount.toString(),
    //     delivery_charges: deliveryCost.toString(),
    //     deliveryboy_tip: deliveryBoyTip.toString(),
    //     grand_total: grandTotal.toString(),
    //     payment_type: 'Pay Online',
    //     order_status: '7',
    //     coupon_id: selectedCoupon?.id || '0',
    //     order_pincode: selectedAddress.pincode || extractPincodeFromAddress(selectedAddress.full_address) || '560023',
    //     delivery_address: shippingAddress,
    //     expected_delivery_time: servRes.expected_time,
    //     customer_latitude: customer_latitude,
    //     customer_longitude: customer_longitude,
    //     warehouse_id: servRes.warehouse_id,
    //     sub_order_array: subOrderArray,
    //   };

    //   // Mock order response
    //   const orderRes = {
    //     id: "dummy_order_123",
    //     order_date: new Date().toISOString(),
    //     razorpay_order_id: "order_dummy_123",
    //     key_id: "rzp_test_key",
    //   };

    //   console.log('Order Payload:', JSON.stringify(orderPayload, null, 2));
    //   console.log('Order Response:', JSON.stringify(orderRes, null, 2));

    //   if (!orderRes || !orderRes.razorpay_order_id || !orderRes.key_id) {
    //     setErrorMessage('Failed to create order: Missing Razorpay order ID or key ID.');
    //     setErrorModalVisible(true);
    //     return;
    //   }

    //   const options = {
    //     description: 'Payment for order',
    //     image: 'https://your-website.com/logo.png',
    //     currency: 'INR',
    //     key: orderRes.key_id,
    //     amount: (grandTotal * 100).toString(),
    //     name: 'Your Company Name',
    //     order_id: orderRes.razorpay_order_id,
    //     prefill: {
    //       email: selectedAddress.customer_email || 'customer@example.com',
    //       contact: selectedAddress.customer_mobile_number || '7661967141',
    //       name: customerName || selectedAddress.customer_name || 'user88',
    //     },
    //     theme: { color: 'rgba(8, 118, 90, 1)' },
    //   };

    //   console.log('Razorpay Options:', JSON.stringify(options, null, 2));

    //   console.log('Opening Razorpay Checkout...');

    //   // Use explicit callbacks instead of await for reliability
    //   RazorpayCheckout.open(
    //     options,
    //     async (successDat) => {
    //       console.log('Payment Success Callback:', JSON.stringify(successDat, null, 2));
    //       setPaymentSuccessModalVisible(true); // Show modal immediately
    //       setSuccessData(successDat);
    //       setOrderResponse(orderRes);
    //       setServiceResponse(servRes);

    //       // Mock payment update
    //       console.log('Payment Updated Successfully');

    //       // Save to AsyncStorage for persistence
    //       await savePendingOrder(orderRes, servRes, successDat, localCartItems, shippingAddress, contactInfo);

    //       // Optionally, delay navigation slightly to ensure app is foregrounded
    //       setTimeout(async () => {
    //         setPaymentSuccessModalVisible(false);
    //         await clearPendingOrder();
    //         navigation.replace('OrderDetails', {
    //           cartItems: localCartItems,
    //           shippingAddress,
    //           contactInfo,
    //           orderId: orderRes.id,
    //           orderDate: orderRes.order_date,
    //           paymentId: successDat.razorpay_payment_id,
    //           expectedDeliveryTime: servRes.expected_time,
    //         });
    //       }, 1500); // 1.5s delay for UX polish
    //     },
    //     (errorData) => {
    //       console.log('Payment External Failure:', JSON.stringify(errorData, null, 2));
    //       let errorMessage = 'Payment failed. Please try again.';
    //       if (errorData.error?.description) {
    //         errorMessage = `Payment failed: ${errorData.error.description}`;
    //       }
    //       setErrorMessage(errorMessage);
    //       setErrorModalVisible(true);
    //     }
    //   );
    // } catch (error) {
    //   console.error('Error in handleProceed:', error);
    //   let errorMessage = 'An error occurred';
      
    //   // Handle specific service-related errors
    //   if (error.message && error.message.toLowerCase().includes('service') || error.message.toLowerCase().includes('availability')) {
    //     errorMessage = 'Location not serviceable.';
    //   } else if (error.message && error.message.toLowerCase().includes('pincode')) {
    //     errorMessage = 'Pincode not serviceable.';
    //   } else if (error.error?.description && error.error.description.toLowerCase().includes('payment')) {
    //     errorMessage = `Payment failed: ${error.error.description}`;
    //   } else {
    //     errorMessage = error.message || 'An error occurred';
    //   }
      
    //   setErrorMessage(errorMessage);
    //   setErrorModalVisible(true);
    // }
    navigation.navigate("OrderDetails")
  };

  const handlePincodeChange = (text) => {
    setPincode(text);
    setAddAddressPincodeMessage('');
  };

  const clearFields = () => {
    setAddressType('home');
    setCustomAddressType('');
    setName('');
    setEmail('');
    setAddressLine('');
    setCity('');
    setState('');
    setPhone('');
    setPincode('');
    setErrors({});
    setAddAddressPincodeMessage('');
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!addressType) newErrors.addressType = 'Address type is required';
    if (addressType === 'other' && !customAddressType)
      newErrors.customAddressType = 'Custom address type is required';
    if (!name) newErrors.name = 'Name is required';
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email is required';
    if (!addressLine) newErrors.addressLine = 'Address line is required';
    if (!city) newErrors.city = 'City is required';
    if (!state) newErrors.state = 'State is required';
    if (!pincode || pincode.length !== 6) newErrors.pincode = 'Valid 6-digit pincode is required';
    else if (!pincodes.some((item) => item.pincode === parseInt(pincode)))
      newErrors.pincode = 'Pincode is not serviceable';
    if (!phone || phone.length !== 10) newErrors.phone = 'Valid 10-digit phone number is required';
    return newErrors;
  };

  const handleSave = async () => {
    const newErrors = validateInputs();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const fullAddress = `${addressLine}, ${city}, ${state}, India - ${pincode}`;
    const payload = {
      userId: customerId,
      addressType: addressType === 'other' ? customAddressType : addressType,
      fullAddress,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      pincode,
      // Note: latitude and longitude should come from SelectOnMap
    };

    // Mock save
    console.log('Mock saving address:', payload);
    setSelectedAddressIndex(addressList.length);
    setAddAddressModalVisible(false);
    clearFields();
  };

  const handleSaveContact = async () => {
    const selectedAddress = normalizedAddressList[selectedAddressIndex];
    if (!selectedAddress) {
      setErrorMessage('No address selected to update contact info.');
      setErrorModalVisible(true);
      return;
    }

    const [newPhone, newEmail] = contactInfo.split(',').map((item) => item.trim());
    if (!newPhone || !newEmail || !/\S+@\S+\.\S+/.test(newEmail) || newPhone.length !== 10) {
      setErrorMessage('Please enter a valid phone number (10 digits) and email.');
      setErrorModalVisible(true);
      return;
    }

    // Mock update
    console.log('Mock updating contact:', { newPhone, newEmail });
    setContactModalVisible(false);
  };

  const handleViewDetails = () => {
    orderDetailsRef.current.measureLayout(
      scrollViewRef.current,
      (x, y) => {
        scrollViewRef.current.scrollTo({ y, animated: true });
      },
      (error) => {
        console.error('Failed to measure Order Details section:', error);
        setErrorMessage('Unable to scroll to Order Details section.');
        setErrorModalVisible(true);
      }
    );
  };

  // Handle manual continue in modal
  const handleContinueToOrderDetails = async () => {
    if (orderResponse && serviceResponse && successData) {
      await clearPendingOrder();
      navigation.replace('OrderDetails', {
        cartItems: localCartItems,
        shippingAddress,
        contactInfo,
        orderId: orderResponse.id,
        orderDate: orderResponse.order_date,
        paymentId: successData.razorpay_payment_id,
        expectedDeliveryTime: serviceResponse.expected_time,
      });
    }
    setPaymentSuccessModalVisible(false);
  };

  const selectedAddress = normalizedAddressList[selectedAddressIndex];
  const isSelectedDeliverable = selectedAddress?.isDeliverable ?? false;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor="#ffffff"
        barStyle="dark-content"
      />
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="rgba(8, 118, 90, 1)" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: "rgba(8, 118, 90, 1)" }]}>Payment</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + responsiveHeight(12) }]}
        ref={scrollViewRef}
      >
        <View style={styles.content}>
          {appDataLoading && <Text style={styles.loadingText}>Loading application data...</Text>}
          {appDataError && <Text style={styles.errorText}>Error: {appDataError}</Text>}
          {serviceLoading && <Text style={styles.loadingText}>Checking service availability...</Text>}
          {/* {serviceError && <Text style={styles.errorText}>Location not serviceable.</Text>} */}
          {!isSelectedDeliverable && selectedAddress && (
            <Text style={[styles.errorText, { marginBottom: 10 }]}>Selected address is not deliverable. Please choose another.</Text>
          )}

          <View style={styles.addressSection}>
            <View style={[commonstyles.row, { justifyContent: 'space-between' }]}>
              <Text style={[commonstyles.text9, commonstyles.marginBottom16]}>Shipping Address</Text>
              <TouchableOpacity
                style={styles.selectOnMapButton}
                onPress={() => navigation.navigate('SelectOnMap')}
                activeOpacity={0.7}
              >
                <Text style={styles.selectOnMapText}>Select on map</Text>
              </TouchableOpacity>
            </View>
            {Array.isArray(normalizedAddressList) && normalizedAddressList.length > 0 ? (
              <View style={styles.card}>
                <View style={styles.nameRow}>
                  <Text style={[commonstyles.text6, { color: 'rgba(8, 118, 90, 1)', flex: 1 }]}>
                    {selectedAddress?.customer_name || 'User'}
                  </Text>
                  <TouchableOpacity style={styles.changeButton} onPress={() => setAddressModalVisible(true)}>
                    <Text style={[commonstyles.text4, { color: 'rgba(8, 118, 90, 1)', fontWeight: '600' }]}>Change</Text>
                  </TouchableOpacity>
                </View>
                <Text style={[commonstyles.text4, { fontFamily: 'Obviously-RegularItalic', lineHeight: 20 }]}>
                  {shippingAddress}
                </Text>
                <Text style={[commonstyles.text4, { fontFamily: 'Obviously-RegularItalic', lineHeight: 20 }]}>
                  Phone: <Text style={[{ fontWeight: '500' }, commonstyles.text4]}>
                    {selectedAddress?.customer_mobile_number || 'N/A'}
                  </Text>
                </Text>
                {selectedAddress?.customer_email && (
                  <Text style={[commonstyles.text4, { fontFamily: 'Obviously-RegularItalic', lineHeight: 20 }]}>
                    Email: <Text style={[{ fontWeight: '500' }, commonstyles.text4]}>
                      {selectedAddress.customer_email}
                    </Text>
                  </Text>
                )}
                {selectedAddress?.estimated_delivery_time && (
                  <Text style={[
                    commonstyles.text4, 
                    { 
                      fontFamily: 'Obviously-RegularItalic', 
                      lineHeight: 20, 
                      marginTop: 5,
                      color: selectedAddress.estimated_delivery_time === 'Not_Available' ? '#FF0000' : '#000'
                    }
                  ]}>
                    {selectedAddress.estimated_delivery_time === 'Not_Available' 
                      ? 'This address is not deliverable' 
                      : `Expected Delivery: ${selectedAddress.estimated_delivery_time}`
                    }
                  </Text>
                )}
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addNewAddressButton}
                onPress={() => navigation.navigate('SelectOnMap')}
              >
                <Text style={[commonstyles.text4, { color: 'rgba(8, 118, 90, 1)', fontWeight: '600' }]}>Add New Address</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.cartSection}>
            <Text style={[commonstyles.text9, commonstyles.marginBottom16]}>Order Summary</Text>
            {localCartItems.length === 0 ? (
              <Text style={styles.emptyText}>No items in cart.</Text>
            ) : (
              localCartItems.map((item) => {
                const selectedSizeObj = item.sizes.find((size) => size.size === item.selected_size) || item.sizes[0];
                const currentSellingPrice = selectedSizeObj ? selectedSizeObj.selling_price : item.selling_price;
                const currentActualPrice = selectedSizeObj ? selectedSizeObj.actual_price : item.actual_price;
                const totalSellingPrice = currentSellingPrice * (item.quantity || 1);
                const isOutOfStock = selectedSizeObj ? selectedSizeObj.stock === 0 : true;

                return (
                  <View key={item.cart_id} style={styles.cartContainer}>
                    <View style={styles.topRow}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={item.product_image}
                          style={[styles.image, isOutOfStock && styles.disabledImage]}
                          resizeMode="cover"
                        />
                        {isOutOfStock && (
                          <View style={styles.outOfStockOverlay}>
                            <Text style={styles.outOfStockText}>Out of Stock</Text>
                          </View>
                        )}
                      </View>
                      <View style={styles.content}>
                        <Text style={[commonstyles.text3, { fontSize: 14 }]}>{item.brand_name}</Text>
                        <Text style={[commonstyles.text4]}>{item.product_name}</Text>
                        <View style={[styles.detailsRow, { marginTop: responsiveHeight(1) }]}>
                          <Text style={commonstyles.text4}>Size: {item.selected_size || selectedSizeObj.size}</Text>
                          <Text style={commonstyles.text4}>Quantity: {item.quantity || 1}</Text>
                        </View>
                        <View style={[styles.priceOffer, { marginTop: responsiveHeight(1) }]}>
                          <View style={[commonstyles.row, { gap: 3 }]}>
                            <Text style={commonstyles.text4}>₹{totalSellingPrice}</Text>
                            {currentActualPrice !== currentSellingPrice && (
                              <Text style={[commonstyles.text4, { textDecorationLine: 'line-through' }]}>
                                ₹{currentActualPrice * (item.quantity || 1)}
                              </Text>
                            )}
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </View>

          <View style={styles.tipBox}>
            <Text style={[commonstyles.text4, commonstyles.marginBottom12]}>
              Tip for Delivery Person
            </Text>
            <View style={styles.tipOptions}>
              {[10, 20, 30].map((amount) => (
                <TouchableOpacity
                  key={amount}
                  style={[
                    styles.tipButton,
                    deliveryBoyTip === amount && !showCustomTip ? styles.tipButtonSelected : {},
                  ]}
                  onPress={() => handleTipSelect(amount)}
                >
                  <Text style={[
                    commonstyles.text10,
                    deliveryBoyTip === amount && !showCustomTip ? { color: '#fff' } : {},
                  ]}>
                    ₹{amount}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[
                  styles.tipButton,
                  showCustomTip ? styles.tipButtonSelected : {},
                ]}
                onPress={toggleCustomTip}
              >
                <Text style={[
                  commonstyles.text10,
                  showCustomTip ? { color: '#fff' } : {},
                ]}>
                  Custom
                </Text>
              </TouchableOpacity>
            </View>
            {showCustomTip && (
              <View style={styles.customTipContainer}>
                <TextInput
                  style={styles.customTipInput}
                  placeholder="Enter tip amount"
                  placeholderTextColor="#000"
                  keyboardType="numeric"
                  value={customTipInput}
                  onChangeText={handleCustomTipChange}
                />
                {tipError ? <Text style={styles.tipErrorText}>{tipError}</Text> : null}
              </View>
            )}
          </View>

          <View
            style={styles.orderDetailsSection}
            ref={orderDetailsRef}
            onLayout={() => { }}
          >
            <Text style={[commonstyles.text9, commonstyles.marginBottom16]}>Order Details</Text>
            <View style={styles.priceRow}>
              <Text style={commonstyles.text4}>Total MRP</Text>
              <Text style={commonstyles.text4}>₹{actualTotal.toFixed(0)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={commonstyles.text4}>Discount on MRP</Text>
              <Text style={commonstyles.text4}>-₹{(actualTotal - subtotal).toFixed(0)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={commonstyles.text4}>Coupon Discount</Text>
              <Text style={commonstyles.text4}>-₹{couponAmount.toFixed(0)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={commonstyles.text4}>Delivery Charges</Text>
              <Text style={commonstyles.text4}>₹{deliveryCost.toFixed(0)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={commonstyles.text4}>Delivery Person Tip</Text>
              <Text style={commonstyles.text4}>₹{deliveryBoyTip.toFixed(0)}</Text>
            </View>
            <View style={[styles.priceRow, { borderTopWidth: 1, borderTopColor: '#ddd', paddingTop: 8, marginTop: 8 }]}>
              <Text style={[commonstyles.text6, { fontWeight: '600' }]}>Total Amount to Pay</Text>
              <Text style={[commonstyles.text6, { fontWeight: '600' }]}>₹{grandTotal.toFixed(0)}</Text>
            </View>
          </View>

          <View style={styles.paymentSection}>
            <Text style={[commonstyles.text9, commonstyles.marginBottom16]}>Payment Method</Text>
            <View style={styles.card}>
              <View style={styles.paymentOption}>
                <Ionicons
                  name="radio-button-on"
                  size={20}
                  color="rgba(8, 118, 90, 1)"
                />
                <Text style={[commonstyles.text4, { marginLeft: 8 }]}>Pay Online</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        
        <View style={styles.footerContent}>
          <View style={styles.priceSummary}>
            <Text style={styles.totalPrice}>₹{grandTotal.toFixed(0)}</Text>
            <TouchableOpacity onPress={handleViewDetails}>
              <Text style={styles.viewDetails}>VIEW DETAILS</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.proceedButton, 
              (orderLoading || serviceLoading || !isSelectedDeliverable) && { opacity: 0.6 }
            ]}
            onPress={handleProceed}
            disabled={orderLoading || serviceLoading || !isSelectedDeliverable}
          >
            <Text style={styles.proceedButtonText}>
              {orderLoading || serviceLoading ? 'Processing...' : (!isSelectedDeliverable ? 'Not Deliverable' : 'PROCEED')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={addressModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setAddressModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={[commonstyles.text9, commonstyles.marginBottom12]}>Select Address</Text>
            <ScrollView style={{ maxHeight: responsiveHeight(50) }}>
              {normalizedAddressList.map((address, index) => (
                <TouchableOpacity
                  key={address.address_id}
                  style={[
                    styles.addressItem,
                    !address.isDeliverable && styles.disabledAddressItem
                  ]}
                  onPress={() => handleSelectAddress(index)}
                  disabled={!address.isDeliverable}
                >
                  <Text style={[
                    commonstyles.text6, 
                    { color: 'rgba(8, 118, 90, 1)' },
                    !address.isDeliverable && { color: '#999' }
                  ]}>
                    {address.customer_name || 'User'}
                  </Text>
                  <Text style={[
                    commonstyles.text4, 
                    { lineHeight: 20 },
                    !address.isDeliverable && { color: '#999' }
                  ]}>
                    {address.full_address}
                  </Text>
                  <Text style={[
                    commonstyles.text4, 
                    { lineHeight: 20 },
                    !address.isDeliverable && { color: '#999' }
                  ]}>
                    Phone: {address.customer_mobile_number || 'N/A'}
                  </Text>
                  {address.customer_email && (
                    <Text style={[
                      commonstyles.text4, 
                      { lineHeight: 20 },
                      !address.isDeliverable && { color: '#999' }
                    ]}>
                      Email: {address.customer_email}
                    </Text>
                  )}
                  <Text style={[
                    commonstyles.text4, 
                    { lineHeight: 20, marginTop: 5 },
                    !address.isDeliverable 
                      ? { color: 'red', fontWeight: 'bold' } 
                      : { color: 'green' }
                  ]}>
                    Expected Delivery: {address.estimated_delivery_time === 'Not_Available' ? 'This Address Not Deliverable' : address.estimated_delivery_time}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.addNewAddress}
                onPress={() => {
                  setAddressModalVisible(false);
                  navigation.navigate('SelectOnMap');
                }}
              >
                <Text style={[commonstyles.text4, { color: 'rgba(8, 118, 90, 1)', fontWeight: '600' }]}>Add New Address</Text>
              </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity
              style={styles.buttonOutlinedFull} 
              onPress={() => setAddressModalVisible(false)}
              activeOpacity={0.7}
            >
              <Text style={[commonstyles.text4, { textAlign: 'center', color: 'rgba(8, 118, 90, 1)', fontWeight: '600' }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={addAddressModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setAddAddressModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalScrollContent} keyboardShouldPersistTaps="handled">
              <Text style={[commonstyles.text9, commonstyles.marginBottom12]}>Add Address</Text>
              <View style={{ marginBottom: 12 }}>
                <Text style={commonstyles.text4}>Address Type</Text>
                <View style={[{ flexDirection: 'row', marginTop: 8, gap: 12 }, commonstyles.marginBottom12]}>
                  {['home', 'work', 'other'].map((type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() => setAddressType(type)}
                      style={{
                        padding: 8,
                        borderWidth: 1,
                        borderColor: addressType === type ? 'rgba(8, 118, 90, 1)' : '#ccc',
                        backgroundColor: addressType === type ? 'rgba(8, 118, 90, 1)' : '#fff',
                        borderRadius: 4,
                      }}
                    >
                      <Text style={{ color: addressType === type ? '#fff' : '#000' }}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {errors.addressType && <Text style={styles.errorText}>{errors.addressType}</Text>}
                {addressType === 'other' && (
                  <>
                    <TextInput
                      placeholder="Enter Address Type"
                      style={styles.input}
                      placeholderTextColor="#000"
                      value={customAddressType}
                      onChangeText={setCustomAddressType}
                    />
                    {errors.customAddressType && <Text style={styles.errorText}>{errors.customAddressType}</Text>}
                  </>
                )}
              </View>
              <TextInput
                placeholder="Name"
                style={styles.input}
                placeholderTextColor="#000"
                value={name}
                onChangeText={setName}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
              <TextInput
                placeholder="Email"
                style={styles.input}
                placeholderTextColor="#000"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              <TextInput
                placeholder="Address Line"
                style={styles.input}
                placeholderTextColor="#000"
                value={addressLine}
                onChangeText={setAddressLine}
              />
              {errors.addressLine && <Text style={styles.errorText}>{errors.addressLine}</Text>}
              <TextInput
                placeholder="City"
                style={styles.input}
                placeholderTextColor="#000"
                value={city}
                onChangeText={setCity}
              />
              {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
              <TextInput
                placeholder="State"
                style={styles.input}
                placeholderTextColor="#000"
                value={state}
                onChangeText={setState}
              />
              {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
              <TextInput
                placeholder="Pincode"
                style={styles.input}
                placeholderTextColor="#000"
                keyboardType="numeric"
                value={pincode}
                onChangeText={handlePincodeChange}
                maxLength={6}
              />
              {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}
              {pincodeLoading && <Text style={styles.infoText}>Checking pincode...</Text>}
              {addAddressPincodeMessage && (
                <Text style={[styles.infoText, { color: addAddressPincodeMessage.includes('available') ? 'green' : 'red' }]}>
                  {addAddressPincodeMessage}
                </Text>
              )}
              <TextInput
                placeholder="Phone Number"
                style={styles.input}
                placeholderTextColor="#000"
                keyboardType="numeric"
                value={phone}
                onChangeText={setPhone}
                maxLength={10}
              />
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.buttonOutlinedFull}
                  onPress={() => {
                    setAddAddressModalVisible(false);
                    clearFields();
                  }}
                >
                  <Text style={[commonstyles.text4, { textAlign: 'center' }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonFilled}
                  onPress={handleSave}
                  disabled={deliveryAddressStatus === 'loading'}
                >
                  <Text style={{ color: '#fff', textAlign: 'center' }}>
                    {deliveryAddressStatus === 'loading' ? 'Saving...' : 'Save'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        visible={contactModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setContactModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pincodeModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Contact Information</Text>
            </View>
            <TextInput
              style={styles.pincodeInput}
              multiline
              value={contactInfo}
              onChangeText={setContactInfo}
              placeholder="Enter contact info (phone, email)"
              placeholderTextColor="#000"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setContactModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: 'rgba(8, 118, 90, 1)' }]}
                onPress={handleSaveContact}
              >
                <Text style={[styles.modalButtonText, { color: '#fff' }]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={pincodeModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setPincodeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pincodeModalContent}>
            <View style={styles.modalHeader}>
              <Location />
              <Text style={styles.modalTitle}>Check your pincode before placing the order.</Text>
            </View>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.pincodeInput}
                placeholder="Enter Pincode"
                placeholderTextColor="#000"
                keyboardType="numeric"
                maxLength={6}
                value={pincode}
                onChangeText={setPincode}
              />
              <TouchableOpacity style={styles.pincodeButton} onPress={() => setPincodeModalVisible(false)}>
                <Text style={styles.pincodeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
            {pincodeMessage && (
              <Text style={[styles.pincodeMessage, { color: pincodeMessage.includes('Yes') ? 'green' : 'red' }]}>
                {pincodeMessage}
              </Text>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        visible={errorModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.errorModalContent}>
            <Text style={styles.modalTitle}>Error</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TouchableOpacity
              style={{ backgroundColor: 'rgba(8, 118, 90, 1)', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 6, alignItems: 'center', marginTop: 10 }}
              onPress={() => setErrorModalVisible(false)}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={stockModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setStockModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.errorModalContent}>
            <Text style={styles.modalTitle}>Stock Limit Exceeded</Text>
            <Text style={styles.errorMessage}>
              Only {stockError.availableStock} unit{stockError.availableStock !== 1 ? 's' : ''} available for this item in the selected size.
            </Text>
            <TouchableOpacity
              style={{ backgroundColor: 'rgba(8, 118, 90, 1)', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 6, alignItems: 'center', marginTop: 10 }}
              onPress={() => setStockModalVisible(false)}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={paymentSuccessModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {}} // Prevent dismiss on back
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.errorModalContent, { backgroundColor: '#fff', padding: 30 }]}>
            <Ionicons name="checkmark-circle" size={64} color="#4CAF50" style={{ marginBottom: 16 }} />
            <Text style={[styles.modalTitle, { color: '#4CAF50' }]}>Payment Successful!</Text>
            <Text style={styles.errorMessage}>
              Order placed successfully!
            </Text>
            <TouchableOpacity
              style={{ 
                backgroundColor: 'rgba(8, 118, 90, 1)', 
                paddingVertical: 12, 
                paddingHorizontal: 24, 
                borderRadius: 6, 
                alignItems: 'center', 
                marginTop: 20 
              }}
              onPress={handleContinueToOrderDetails}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Continue to Order Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f1f1' },
  scrollView: { flex: 1, backgroundColor: '#f1f1f1' },
  contentContainer: { padding: responsiveWidth(2), paddingBottom: responsiveHeight(12) },
  content: { flexGrow: 1, borderRadius: 25 },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12 },
  headerTitle: { flex: 1, marginLeft: 12, color: '#000', fontSize: 24, fontWeight: '660' },
  addressSection: { marginBottom: responsiveHeight(2), borderRadius: 25 },
  card: { backgroundColor: '#fff', padding: "5%", borderRadius: 25, marginBottom: 12, borderColor: '#919191', borderWidth: 0.5 },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  changeButton: { padding: 8, borderRadius: 4 },
  cartSection: { marginBottom: responsiveHeight(2), borderRadius: 25 },
  emptyText: { color: '#000', fontSize: responsiveFontSize(2), textAlign: 'center', marginTop: responsiveHeight(4) },
  addNewAddressButton: { backgroundColor: '#fff', padding: 12, borderRadius: 6, borderColor: 'rgba(8, 118, 90, 1)', borderWidth: 1, alignItems: 'center', marginBottom: 16 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 0 },
  footerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: responsiveWidth(4) },
  pincodeNotice: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(8, 118, 90, 1)', paddingHorizontal: 12, paddingVertical: 6, width: '100%', borderBottomWidth: 1, borderBottomColor: '#ddd' },
  pincodeText: { flex: 1, marginLeft: 6, fontSize: 12, color: '#fff' },
  totalPrice: { fontSize: 16, fontWeight: '600', color: '#000' },
  viewDetails: { fontSize: 12, color: '#888', textDecorationLine: 'underline' },
  proceedButton: { backgroundColor: 'rgba(8, 118, 90, 1)', paddingVertical: 10, paddingHorizontal: 24, borderRadius: 6, alignItems: 'center', justifyContent: 'center', width: '60%' },
  proceedButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  modalContainer: { backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 10, borderTopRightRadius: 10, maxHeight: responsiveHeight(80), width: '100%' },
  modalScrollContent: { paddingBottom: 20 },
  addressItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  disabledAddressItem: {
    opacity: 0.5,
    backgroundColor: '#f9f9f9',
  },
  addNewAddress: { padding: 12, alignItems: 'center' },
  pincodeModalContent: { backgroundColor: '#fff', padding: 10, maxHeight: '40%' },
  errorModalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center', marginHorizontal: responsiveWidth(5) },
  modalHeader: { borderBottomColor: '#ddd', paddingBottom: 8, marginBottom: 10, flexDirection: 'row', alignItems: 'center' },
  modalTitle: { fontSize: 16, fontWeight: '600', color: '#000', textAlign: 'center', flex: 1 },
  inputRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pincodeInput: { borderBottomWidth: 1, borderColor: '#ccc', padding: 10, flex: 1, marginRight: 10, fontSize: 16 },
  pincodeButton: { backgroundColor: 'rgba(8, 118, 90, 1)', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 6, alignItems: 'center' },
  pincodeButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  modalButton: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, flex: 1, alignItems: 'center', marginHorizontal: 5 },
  modalButtonText: { fontSize: 16, color: '#000' },
  pincodeMessage: { fontSize: 14, marginTop: 10, textAlign: 'center' },
  errorMessage: { fontSize: 14, color: 'green', textAlign: 'center', marginVertical: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 10, marginBottom: 12, fontSize: 16, color: '#000' },
  errorText: { color: 'red', fontSize: 12, marginBottom: 8 },
  infoText: { color: '#000', fontSize: 12, marginBottom: 8 },
  buttonFilled: { backgroundColor: 'rgba(8, 118, 90, 1)', padding: 12, borderRadius: 4, flex: 1, alignItems: 'center', marginLeft: 5 },
  buttonOutlinedFull: { borderWidth: 1,
   borderColor: 'rgba(8, 118, 90, 1)', 
  padding: 12, 
  borderRadius: 4, 
  // flex: 1, 
  alignItems: 'center', 
  // marginRight: 5
 },
  orderDetailsSection: { marginBottom: responsiveHeight(2), backgroundColor: '#fff', padding: "5%", borderRadius: 25, borderColor: '#919191', borderWidth: 0.5 },
  paymentSection: { marginBottom: responsiveHeight(2), backgroundColor: '#fff', padding: 16, borderRadius: 25, borderColor: '#919191' },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  paymentOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  cartContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 25,
    padding: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: responsiveHeight(1),
  },
  imageContainer: {
    position: 'relative',
    width: responsiveWidth(25),
    height: responsiveHeight(15),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 2,
  },
  disabledImage: {
    opacity: 0.5,
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  outOfStockText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.5),
    backgroundColor: '#ff0000',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    paddingLeft: responsiveWidth(3),
    position: 'relative',
    flexDirection: 'column',
    gap: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: responsiveWidth(4),
    alignItems: 'center',
  },
  priceOffer: {
    alignItems: 'flex-end',
    flexShrink: 1,
  },
  tipBox: {
    borderRadius: 25,
    padding: 15,
    marginBottom: responsiveHeight(2),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tipOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tipButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(8, 118, 90, 1)',
    borderRadius: 4,
  },
  tipButtonSelected: {
    backgroundColor: 'rgba(8, 118, 90, 1)',
    borderColor: 'rgba(8, 118, 90, 1)',
  },
  customTipContainer: {
    marginTop: 12,
  },
  customTipInput: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
  },
  tipErrorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,
  },
  selectOnMapButton: {
    backgroundColor: 'rgba(8, 118, 90, 1)',
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(3),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.2),
  },
  selectOnMapText: {
    color: '#fff',
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
  },
  loadingText: { color: '#000', fontSize: 14, textAlign: 'center', marginVertical: 10 },
  errorText: { color: 'red', fontSize: 14, textAlign: 'center', marginVertical: 10 },
  priceSummary: {
    alignItems: 'center',
  },
});

export default Payment;