// // // // // import React, { useState } from 'react';
// // // // // import {
// // // // //   View,
// // // // //   Text,
// // // // //   ScrollView,
// // // // //   TouchableOpacity,
// // // // //   StyleSheet,
// // // // //   SafeAreaView,
// // // // //   StatusBar,
// // // // //   TextInput,
// // // // //   Alert,
// // // // //   KeyboardAvoidingView,
// // // // //   Platform,
// // // // // } from 'react-native';
// // // // // import { useSafeAreaInsets } from 'react-native-safe-area-context';
// // // // // import Ionicons from 'react-native-vector-icons/Ionicons';
// // // // // import { useNavigation } from '@react-navigation/native';
// // // // // import { Dropdown } from 'react-native-element-dropdown';

// // // // // const ACCENT_COLOR = '#832729';

// // // // // const SchemeApplicationScreen = () => {
// // // // //   const insets = useSafeAreaInsets();
// // // // //   const navigation = useNavigation();

// // // // //   const [userName, setUserName] = useState('');        // New: User's name
// // // // //   const [agentName, setAgentName] = useState('');
// // // // //   const [tenure, setTenure] = useState(null);
// // // // //   const [installmentAmount, setInstallmentAmount] = useState(null); // Now from dropdown
// // // // //   const [cardNumber, setCardNumber] = useState('');
  
// // // // //   const [tenureFocus, setTenureFocus] = useState(false);
// // // // //   const [amountFocus, setAmountFocus] = useState(false);

// // // // //   const tenureOptions = [
// // // // //     { label: '6 Months', value: '6' },
// // // // //     { label: '11 Months', value: '11' },
// // // // //   ];

// // // // //   // Generate installment options: ₹1,000 to ₹50,000 in steps of ₹1,000
// // // // //   const installmentOptions = Array.from({ length: 50 }, (_, i) => {
// // // // //     const amount = (i + 1) * 1000;
// // // // //     return {
// // // // //       label: `₹${amount.toLocaleString('en-IN')}`,
// // // // //       value: amount.toString(),
// // // // //     };
// // // // //   });

// // // // //   const handlePay = () => {
// // // // //     if (!userName.trim()) {
// // // // //       Alert.alert('Missing Field', 'Please enter your Full Name');
// // // // //       return;
// // // // //     }
// // // // //     if (!agentName.trim()) {
// // // // //       Alert.alert('Missing Field', 'Please enter Agent Name');
// // // // //       return;
// // // // //     }
// // // // //     if (!tenure) {
// // // // //       Alert.alert('Missing Field', 'Please select Tenure');
// // // // //       return;
// // // // //     }
// // // // //     if (!installmentAmount) {
// // // // //       Alert.alert('Missing Field', 'Please select Monthly Installment Amount');
// // // // //       return;
// // // // //     }
// // // // //     if (!cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
// // // // //       Alert.alert('Invalid Card', 'Please enter a valid 16-digit card number');
// // // // //       return;
// // // // //     }

// // // // //     Alert.alert(
// // // // //       'Application Submitted',
// // // // //       `Scheme applied successfully!\n\nName: ${userName}\nAgent: ${agentName}\nTenure: ${tenure} Months\nMonthly Installment: ₹${parseInt(installmentAmount).toLocaleString('en-IN')}`,
// // // // //       [{ text: 'OK', onPress: () => navigation.goBack() }]
// // // // //     );
// // // // //   };

// // // // //   return (
// // // // //     <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
// // // // //       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

// // // // //       {/* Header */}
// // // // //       <View style={styles.header}>
// // // // //         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
// // // // //           <Ionicons name="arrow-back" size={24} color="#000" />
// // // // //         </TouchableOpacity>
// // // // //         <Text style={styles.headerTitle}>Apply for Scheme</Text>
// // // // //         <View style={styles.headerPlaceholder} />
// // // // //       </View>

// // // // //       <KeyboardAvoidingView
// // // // //         style={{ flex: 1 }}
// // // // //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // // // //       >
// // // // //         <ScrollView
// // // // //           contentContainerStyle={styles.scrollContent}
// // // // //           showsVerticalScrollIndicator={false}
// // // // //           keyboardShouldPersistTaps="handled"
// // // // //         >
// // // // //           <View style={styles.formContainer}>
// // // // //             {/* User's Full Name - NEW FIELD */}
// // // // //             <View style={styles.inputGroup}>
// // // // //               <Text style={styles.label}>Your Full Name</Text>
// // // // //               <TextInput
// // // // //                 style={styles.input}
// // // // //                 placeholder="Enter your full name"
// // // // //                 placeholderTextColor="#999"
// // // // //                 value={userName}
// // // // //                 onChangeText={setUserName}
// // // // //                 autoCapitalize="words"
// // // // //               />
// // // // //             </View>

// // // // //             {/* Agent Name */}
// // // // //             <View style={styles.inputGroup}>
// // // // //               <Text style={styles.label}>Agent Name</Text>
// // // // //               <TextInput
// // // // //                 style={styles.input}
// // // // //                 placeholder="Enter agent name"
// // // // //                 placeholderTextColor="#999"
// // // // //                 value={agentName}
// // // // //                 onChangeText={setAgentName}
// // // // //               />
// // // // //             </View>

// // // // //             {/* Tenure Dropdown */}
// // // // //             <View style={styles.inputGroup}>
// // // // //               <Text style={styles.label}>Select Tenure</Text>
// // // // //               <Dropdown
// // // // //                 style={[styles.dropdown, tenureFocus && { borderColor: ACCENT_COLOR }]}
// // // // //                 placeholderStyle={styles.placeholderStyle}
// // // // //                 selectedTextStyle={styles.selectedTextStyle}
// // // // //                 iconStyle={styles.iconStyle}
// // // // //                 data={tenureOptions}
// // // // //                 maxHeight={300}
// // // // //                 labelField="label"
// // // // //                 valueField="value"
// // // // //                 placeholder={!tenureFocus ? 'Choose tenure...' : '...'}
// // // // //                 value={tenure}
// // // // //                 onFocus={() => setTenureFocus(true)}
// // // // //                 onBlur={() => setTenureFocus(false)}
// // // // //                 onChange={item => {
// // // // //                   setTenure(item.value);
// // // // //                   setTenureFocus(false);
// // // // //                 }}
// // // // //                 renderRightIcon={() => (
// // // // //                   <Ionicons
// // // // //                     name={tenureFocus ? 'chevron-up' : 'chevron-down'}
// // // // //                     size={20}
// // // // //                     color={ACCENT_COLOR}
// // // // //                   />
// // // // //                 )}
// // // // //               />
// // // // //             </View>

// // // // //             {/* Installment Amount Dropdown - NEW */}
// // // // //             <View style={styles.inputGroup}>
// // // // //               <Text style={styles.label}>Monthly Installment Amount</Text>
// // // // //               <Dropdown
// // // // //                 style={[styles.dropdown, amountFocus && { borderColor: ACCENT_COLOR }]}
// // // // //                 placeholderStyle={styles.placeholderStyle}
// // // // //                 selectedTextStyle={styles.selectedTextStyle}
// // // // //                 iconStyle={styles.iconStyle}
// // // // //                 data={installmentOptions}
// // // // //                 maxHeight={300}
// // // // //                 labelField="label"
// // // // //                 valueField="value"
// // // // //                 placeholder={!amountFocus ? 'Select amount...' : '...'}
// // // // //                 search
// // // // //                 searchPlaceholder="Search amount..."
// // // // //                 value={installmentAmount}
// // // // //                 onFocus={() => setAmountFocus(true)}
// // // // //                 onBlur={() => setAmountFocus(false)}
// // // // //                 onChange={item => {
// // // // //                   setInstallmentAmount(item.value);
// // // // //                   setAmountFocus(false);
// // // // //                 }}
// // // // //                 renderRightIcon={() => (
// // // // //                   <Ionicons
// // // // //                     name={amountFocus ? 'chevron-up' : 'chevron-down'}
// // // // //                     size={20}
// // // // //                     color={ACCENT_COLOR}
// // // // //                   />
// // // // //                 )}
// // // // //               />
// // // // //             </View>

// // // // //             {/* Card Number */}


// // // // //             <Text style={styles.noteText}>
// // // // //               Note: You will pay ₹{installmentAmount ? parseInt(installmentAmount).toLocaleString('en-IN') : '0'} monthly for {tenure ? `${tenure} months` : '...'} .
// // // // //             </Text>
// // // // //           </View>
// // // // //         </ScrollView>

// // // // //         {/* Fixed Pay Button */}
// // // // //         <View style={[styles.bottomContainer, { paddingBottom: Math.max(insets.bottom, 10) }]}>
// // // // //           <TouchableOpacity style={styles.payButton} onPress={handlePay}>
// // // // //             <Text style={styles.payButtonText}>Pay & Enroll</Text>
// // // // //           </TouchableOpacity>
// // // // //         </View>
// // // // //       </KeyboardAvoidingView>
// // // // //     </SafeAreaView>
// // // // //   );
// // // // // };

// // // // // const styles = StyleSheet.create({
// // // // //   container: { flex: 1, backgroundColor: '#FFFFFF' },
// // // // //   header: {
// // // // //     flexDirection: 'row',
// // // // //     alignItems: 'center',
// // // // //     justifyContent: 'space-between',
// // // // //     paddingHorizontal: 16,
// // // // //     paddingVertical: 16,
// // // // //     backgroundColor: '#fff',
// // // // //     borderBottomWidth: 1,
// // // // //     borderBottomColor: '#E0E0E0',
// // // // //   },
// // // // //   backButton: { padding: 4, width: 32 },
// // // // //   headerTitle: { fontSize: 18, fontWeight: '600', color: '#000', flex: 1, textAlign: 'center' },
// // // // //   headerPlaceholder: { width: 32 },
// // // // //   scrollContent: { paddingBottom: 100 },
// // // // //   formContainer: { padding: 20 },
// // // // //   formTitle: { fontSize: 22, fontWeight: '700', color: '#000', marginBottom: 24, textAlign: 'center' },
// // // // //   inputGroup: { marginBottom: 20 },
// // // // //   label: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 8 },
// // // // //   input: {
// // // // //     borderWidth: 1,
// // // // //     borderColor: '#E0E0E0',
// // // // //     borderRadius: 8,
// // // // //     padding: 14,
// // // // //     fontSize: 16,
// // // // //     backgroundColor: '#F9F9F9',
// // // // //     color: '#000',
// // // // //   },
// // // // //   dropdown: {
// // // // //     height: 50,
// // // // //     borderColor: '#E0E0E0',
// // // // //     borderWidth: 1,
// // // // //     borderRadius: 8,
// // // // //     paddingHorizontal: 14,
// // // // //     backgroundColor: '#F9F9F9',
// // // // //   },
// // // // //   placeholderStyle: {
// // // // //     fontSize: 16,
// // // // //     color: '#999',
// // // // //   },
// // // // //   selectedTextStyle: {
// // // // //     fontSize: 16,
// // // // //     color: '#000',
// // // // //   },
// // // // //   iconStyle: {
// // // // //     width: 20,
// // // // //     height: 20,
// // // // //   },
// // // // //   inputSearchStyle: {
// // // // //     height: 40,
// // // // //     fontSize: 16,
// // // // //   },
// // // // //   noteText: {
// // // // //     fontSize: 14,
// // // // //     color: '#666',
// // // // //     textAlign: 'center',
// // // // //     marginTop: 20,
// // // // //     marginBottom: 10,
// // // // //     fontStyle: 'italic',
// // // // //   },
// // // // //   bottomContainer: {
// // // // //     position: 'absolute',
// // // // //     bottom: 0,
// // // // //     left: 0,
// // // // //     right: 0,
// // // // //     backgroundColor: '#FFFFFF',
// // // // //     paddingHorizontal: 16,
// // // // //     paddingTop: 12,
// // // // //     borderTopWidth: 1,
// // // // //     borderTopColor: '#E0E0E0',
// // // // //     shadowColor: '#000',
// // // // //     shadowOffset: { width: 0, height: -2 },
// // // // //     shadowOpacity: 0.1,
// // // // //     shadowRadius: 4,
// // // // //     elevation: 10,
// // // // //   },
// // // // //   payButton: {
// // // // //     backgroundColor: ACCENT_COLOR,
// // // // //     borderRadius: 8,
// // // // //     paddingVertical: 16,
// // // // //     alignItems: 'center',
// // // // //   },
// // // // //   payButtonText: {
// // // // //     color: '#FFFFFF',
// // // // //     fontSize: 16,
// // // // //     fontWeight: '700',
// // // // //   },
// // // // // });

// // // // // export default SchemeApplicationScreen;
// // // // import React, { useState } from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   ScrollView,
// // // //   TouchableOpacity,
// // // //   StyleSheet,
// // // //   SafeAreaView,
// // // //   StatusBar,
// // // //   TextInput,
// // // //   Alert,
// // // //   KeyboardAvoidingView,
// // // //   Platform,
// // // //   ActivityIndicator,
// // // //   Modal
// // // // } from 'react-native';
// // // // import { useSafeAreaInsets } from 'react-native-safe-area-context';
// // // // import Ionicons from 'react-native-vector-icons/Ionicons';
// // // // import { useNavigation } from '@react-navigation/native';
// // // // import { Dropdown } from 'react-native-element-dropdown';
// // // // import { useDispatch, useSelector } from 'react-redux';
// // // // import RazorpayCheckout from 'react-native-razorpay';

// // // // // Import the new thunk
// // // // import { generateOrderId } from '../redux/slices/schemeSlice';

// // // // const ACCENT_COLOR = '#832729';

// // // // const SchemeApplicationScreen = () => {
// // // //   const insets = useSafeAreaInsets();
// // // //   const navigation = useNavigation();
// // // //   const dispatch = useDispatch();

// // // //   // Redux State
// // // //   const { paymentLoading } = useSelector((state) => state.scheme);
// // // //   const customerProfile = useSelector((state) => state.Auth.customerProfile); // To pre-fill email/phone

// // // //   // Form State
// // // //   const [userName, setUserName] = useState('');
// // // //   const [agentName, setAgentName] = useState('');
// // // //   const [tenure, setTenure] = useState(null);
// // // //   const [installmentAmount, setInstallmentAmount] = useState(null);
// // // //   const [cardNumber, setCardNumber] = useState(''); // Added back Card Number state
  
// // // //   // UI State
// // // //   const [tenureFocus, setTenureFocus] = useState(false);
// // // //   const [amountFocus, setAmountFocus] = useState(false);
// // // //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// // // //   const tenureOptions = [
// // // //     { label: '6 Months', value: '6' },
// // // //     { label: '11 Months', value: '11' },
// // // //   ];

// // // //   const installmentOptions = Array.from({ length: 50 }, (_, i) => {
// // // //     const amount = (i + 1) * 1000;
// // // //     return {
// // // //       label: `₹${amount.toLocaleString('en-IN')}`,
// // // //       value: amount.toString(),
// // // //     };
// // // //   });

// // // //   const handlePay = async () => {
// // // //     // 1. Validation
// // // //     if (!userName.trim()) { Alert.alert('Missing Field', 'Please enter your Full Name'); return; }
// // // //     if (!agentName.trim()) { Alert.alert('Missing Field', 'Please enter Agent Name'); return; }
// // // //     if (!tenure) { Alert.alert('Missing Field', 'Please select Tenure'); return; }
// // // //     if (!installmentAmount) { Alert.alert('Missing Field', 'Please select Monthly Installment Amount'); return; }
// // // //     // Basic validation for Card Number (16 digits)
// // // //     if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) { 
// // // //         Alert.alert('Invalid Card', 'Please enter a valid 16-digit card number'); 
// // // //         return; 
// // // //     }

// // // //     try {
// // // //       // 2. Call API to Generate Order ID
// // // //       const resultAction = await dispatch(generateOrderId(installmentAmount));
      
// // // //       if (generateOrderId.fulfilled.match(resultAction)) {
// // // //         const { orderId, payment_key_id } = resultAction.payload;
        
// // // //         // 3. Configure Razorpay Options
// // // //         const options = {
// // // //           description: 'Gold Scheme Enrollment',
// // // //           image: 'https://geetajewellers.co.in/logo.png', // Replace with your actual logo URL
// // // //           currency: 'INR',
// // // //           key: payment_key_id, // Use key from API response
// // // //           amount: orderId.amount, // Amount in paise
// // // //           name: 'Geeta Jewellers',
// // // //           order_id: orderId.id, // Razorpay Order ID
// // // //           prefill: {
// // // //             email: customerProfile?.customer_email || 'test@example.com',
// // // //             contact: customerProfile?.customer_mobile_number || '9876543210',
// // // //             name: userName
// // // //           },
// // // //           theme: { color: ACCENT_COLOR }
// // // //         };

// // // //         // 4. Open Razorpay Checkout
// // // //         RazorpayCheckout.open(options)
// // // //           .then((data) => {
// // // //             // handle success
// // // //             console.log(`Success: ${data.razorpay_payment_id}`);
// // // //             setShowSuccessModal(true);
// // // //           })
// // // //           .catch((error) => {
// // // //             // handle failure
// // // //             console.log(`Error: ${error.code} | ${error.description}`);
// // // //             Alert.alert('Payment Failed');
// // // //             // Alert.alert('Payment Failed', error.description || 'Something went wrong');
// // // //           });
// // // //       } else {
// // // //         Alert.alert('Error', resultAction.payload || 'Failed to initiate payment');
// // // //       }
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       Alert.alert('Error', 'An unexpected error occurred');
// // // //     }
// // // //   };

// // // //   return (
// // // //     <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
// // // //       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

// // // //       {/* Header */}
// // // //       <View style={styles.header}>
// // // //         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
// // // //           <Ionicons name="arrow-back" size={24} color="#000" />
// // // //         </TouchableOpacity>
// // // //         <Text style={styles.headerTitle}>Apply for Scheme</Text>
// // // //         <View style={styles.headerPlaceholder} />
// // // //       </View>

// // // //       <KeyboardAvoidingView
// // // //         style={{ flex: 1 }}
// // // //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // // //       >
// // // //         <ScrollView
// // // //           contentContainerStyle={styles.scrollContent}
// // // //           showsVerticalScrollIndicator={false}
// // // //           keyboardShouldPersistTaps="handled"
// // // //         >
// // // //           <View style={styles.formContainer}>
// // // //             <View style={styles.inputGroup}>
// // // //               <Text style={styles.label}>Your Full Name</Text>
// // // //               <TextInput
// // // //                 style={styles.input}
// // // //                 placeholder="Enter your full name"
// // // //                 placeholderTextColor="#999"
// // // //                 value={userName}
// // // //                 onChangeText={setUserName}
// // // //                 autoCapitalize="words"
// // // //               />
// // // //             </View>

// // // //             <View style={styles.inputGroup}>
// // // //               <Text style={styles.label}>Agent Name</Text>
// // // //               <TextInput
// // // //                 style={styles.input}
// // // //                 placeholder="Enter agent name"
// // // //                 placeholderTextColor="#999"
// // // //                 value={agentName}
// // // //                 onChangeText={setAgentName}
// // // //               />
// // // //             </View>

// // // //             <View style={styles.inputGroup}>
// // // //               <Text style={styles.label}>Select Tenure</Text>
// // // //               <Dropdown
// // // //                 style={[styles.dropdown, tenureFocus && { borderColor: ACCENT_COLOR }]}
// // // //                 placeholderStyle={styles.placeholderStyle}
// // // //                 selectedTextStyle={styles.selectedTextStyle}
// // // //                 iconStyle={styles.iconStyle}
// // // //                 data={tenureOptions}
// // // //                 maxHeight={300}
// // // //                 labelField="label"
// // // //                 valueField="value"
// // // //                 placeholder={!tenureFocus ? 'Choose tenure...' : '...'}
// // // //                 value={tenure}
// // // //                 onFocus={() => setTenureFocus(true)}
// // // //                 onBlur={() => setTenureFocus(false)}
// // // //                 onChange={item => {
// // // //                   setTenure(item.value);
// // // //                   setTenureFocus(false);
// // // //                 }}
// // // //                 renderRightIcon={() => (
// // // //                   <Ionicons
// // // //                     name={tenureFocus ? 'chevron-up' : 'chevron-down'}
// // // //                     size={20}
// // // //                     color={ACCENT_COLOR}
// // // //                   />
// // // //                 )}
// // // //               />
// // // //             </View>

// // // //             <View style={styles.inputGroup}>
// // // //               <Text style={styles.label}>Monthly Installment Amount</Text>
// // // //               <Dropdown
// // // //                 style={[styles.dropdown, amountFocus && { borderColor: ACCENT_COLOR }]}
// // // //                 placeholderStyle={styles.placeholderStyle}
// // // //                 selectedTextStyle={styles.selectedTextStyle}
// // // //                 iconStyle={styles.iconStyle}
// // // //                 data={installmentOptions}
// // // //                 maxHeight={300}
// // // //                 labelField="label"
// // // //                 valueField="value"
// // // //                 placeholder={!amountFocus ? 'Select amount...' : '...'}
// // // //                 search
// // // //                 searchPlaceholder="Search amount..."
// // // //                 value={installmentAmount}
// // // //                 onFocus={() => setAmountFocus(true)}
// // // //                 onBlur={() => setAmountFocus(false)}
// // // //                 onChange={item => {
// // // //                   setInstallmentAmount(item.value);
// // // //                   setAmountFocus(false);
// // // //                 }}
// // // //                 renderRightIcon={() => (
// // // //                   <Ionicons
// // // //                     name={amountFocus ? 'chevron-up' : 'chevron-down'}
// // // //                     size={20}
// // // //                     color={ACCENT_COLOR}
// // // //                   />
// // // //                 )}
// // // //               />
// // // //             </View>

// // // //             {/* Added Card Number Field */}
// // // //             <View style={styles.inputGroup}>
// // // //               <Text style={styles.label}>Card Number</Text>
// // // //               <TextInput
// // // //                 style={styles.input}
// // // //                 placeholder="1234 5678 9012 3456"
// // // //                 placeholderTextColor="#999"
// // // //                 keyboardType="numeric"
// // // //                 maxLength={19}
// // // //                 value={cardNumber}
// // // //                 onChangeText={(text) => {
// // // //                   // Format with spaces every 4 digits
// // // //                   const formatted = text.replace(/\s?/g, '').replace(/(.{4})/g, '$1 ').trim();
// // // //                   setCardNumber(formatted);
// // // //                 }}
// // // //               />
// // // //             </View>

// // // //             <Text style={styles.noteText}>
// // // //               Note: You will pay ₹{installmentAmount ? parseInt(installmentAmount).toLocaleString('en-IN') : '0'} monthly for {tenure ? `${tenure} months` : '...'} .
// // // //             </Text>
// // // //           </View>
// // // //         </ScrollView>

// // // //         {/* Fixed Pay Button */}
// // // //         <View style={[styles.bottomContainer, { paddingBottom: Math.max(insets.bottom) }]}>
// // // //           <TouchableOpacity 
// // // //             style={[styles.payButton, paymentLoading && { opacity: 0.7 }]} 
// // // //             onPress={handlePay}
// // // //             disabled={paymentLoading}
// // // //           >
// // // //             {paymentLoading ? (
// // // //               <ActivityIndicator color="#fff" />
// // // //             ) : (
// // // //               <Text style={styles.payButtonText}>Pay & Enroll</Text>
// // // //             )}
// // // //           </TouchableOpacity>
// // // //         </View>
// // // //       </KeyboardAvoidingView>

// // // //       {/* Success Modal */}
// // // //       <Modal
// // // //         visible={showSuccessModal}
// // // //         transparent={true}
// // // //         animationType="fade"
// // // //         onRequestClose={() => setShowSuccessModal(false)}
// // // //       >
// // // //         <View style={styles.modalOverlay}>
// // // //           <View style={styles.modalContent}>
// // // //             <View style={styles.successIconContainer}>
// // // //               <Ionicons name="checkmark" size={40} color="#fff" />
// // // //             </View>
// // // //             <Text style={styles.modalTitle}>Payment Successful!</Text>
// // // //             <Text style={styles.modalText}>
// // // //               Your scheme enrollment is complete.
// // // //             </Text>
// // // //             <Text style={styles.modalDetailText}>
// // // //               Amount Paid: ₹{installmentAmount ? parseInt(installmentAmount).toLocaleString('en-IN') : ''}
// // // //             </Text>
// // // //             <TouchableOpacity 
// // // //               style={styles.modalButton}
// // // //               onPress={() => {
// // // //                 setShowSuccessModal(false);
// // // //                 navigation.goBack();
// // // //               }}
// // // //             >
// // // //               <Text style={styles.modalButtonText}>Done</Text>
// // // //             </TouchableOpacity>
// // // //           </View>
// // // //         </View>
// // // //       </Modal>

// // // //     </SafeAreaView>
// // // //   );
// // // // };

// // // // const styles = StyleSheet.create({
// // // //   container: { flex: 1, backgroundColor: '#FFFFFF' },
// // // //   header: {
// // // //     flexDirection: 'row',
// // // //     alignItems: 'center',
// // // //     justifyContent: 'space-between',
// // // //     paddingHorizontal: 16,
// // // //     paddingVertical: 16,
// // // //     backgroundColor: '#fff',
// // // //     borderBottomWidth: 1,
// // // //     borderBottomColor: '#E0E0E0',
// // // //   },
// // // //   backButton: { padding: 4, width: 32 },
// // // //   headerTitle: { fontSize: 18, fontWeight: '600', color: '#000', flex: 1, textAlign: 'center' },
// // // //   headerPlaceholder: { width: 32 },
// // // //   scrollContent: { paddingBottom: 100 },
// // // //   formContainer: { padding: 20 },
// // // //   inputGroup: { marginBottom: 20 },
// // // //   label: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 8 },
// // // //   input: {
// // // //     borderWidth: 1,
// // // //     borderColor: '#E0E0E0',
// // // //     borderRadius: 8,
// // // //     padding: 14,
// // // //     fontSize: 16,
// // // //     backgroundColor: '#F9F9F9',
// // // //     color: '#000',
// // // //   },
// // // //   dropdown: {
// // // //     height: 50,
// // // //     borderColor: '#E0E0E0',
// // // //     borderWidth: 1,
// // // //     borderRadius: 8,
// // // //     paddingHorizontal: 14,
// // // //     backgroundColor: '#F9F9F9',
// // // //   },
// // // //   placeholderStyle: { fontSize: 16, color: '#999' },
// // // //   selectedTextStyle: { fontSize: 16, color: '#000' },
// // // //   iconStyle: { width: 20, height: 20 },
// // // //   noteText: {
// // // //     fontSize: 14,
// // // //     color: '#666',
// // // //     textAlign: 'center',
// // // //     marginTop: 20,
// // // //     marginBottom: 10,
// // // //     fontStyle: 'italic',
// // // //   },
// // // //   bottomContainer: {
// // // //     position: 'absolute',
// // // //     bottom: 0,
// // // //     left: 0,
// // // //     right: 0,
// // // //     // backgroundColor: '#FFFFFF',
// // // //     paddingHorizontal: 16,
// // // //     paddingTop: 12,
// // // //     // borderTopWidth: 1,
// // // //     // borderTopColor: '#E0E0E0',
// // // //     shadowColor: '#000',
// // // //     shadowOffset: { width: 0, height: -2 },
// // // //     shadowOpacity: 0.1,
// // // //     shadowRadius: 4,
// // // //     // elevation: 10,
// // // //   },
// // // //   payButton: {
// // // //     backgroundColor: ACCENT_COLOR,
// // // //     borderRadius: 8,
// // // //     paddingVertical: 16,
// // // //     alignItems: 'center',
// // // //   },
// // // //   payButtonText: {
// // // //     color: '#FFFFFF',
// // // //     fontSize: 16,
// // // //     fontWeight: '700',
// // // //   },
// // // //   // Modal Styles
// // // //   modalOverlay: {
// // // //     flex: 1,
// // // //     backgroundColor: 'rgba(0,0,0,0.6)',
// // // //     justifyContent: 'center',
// // // //     alignItems: 'center',
// // // //   },
// // // //   modalContent: {
// // // //     width: '80%',
// // // //     backgroundColor: '#fff',
// // // //     borderRadius: 16,
// // // //     padding: 24,
// // // //     alignItems: 'center',
// // // //     elevation: 5,
// // // //   },
// // // //   successIconContainer: {
// // // //     width: 70,
// // // //     height: 70,
// // // //     borderRadius: 35,
// // // //     backgroundColor: '#4CAF50',
// // // //     justifyContent: 'center',
// // // //     alignItems: 'center',
// // // //     marginBottom: 16,
// // // //   },
// // // //   modalTitle: {
// // // //     fontSize: 20,
// // // //     fontWeight: 'bold',
// // // //     color: '#000',
// // // //     marginBottom: 8,
// // // //   },
// // // //   modalText: {
// // // //     fontSize: 14,
// // // //     color: '#666',
// // // //     textAlign: 'center',
// // // //     marginBottom: 4,
// // // //   },
// // // //   modalDetailText: {
// // // //     fontSize: 16,
// // // //     fontWeight: '600',
// // // //     color: '#333',
// // // //     marginBottom: 24,
// // // //   },
// // // //   modalButton: {
// // // //     backgroundColor: ACCENT_COLOR,
// // // //     paddingHorizontal: 32,
// // // //     paddingVertical: 12,
// // // //     borderRadius: 24,
// // // //   },
// // // //   modalButtonText: {
// // // //     color: '#fff',
// // // //     fontSize: 16,
// // // //     fontWeight: '600',
// // // //   },
// // // // });

// // // // export default SchemeApplicationScreen;
// // // import React, { useState } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   ScrollView,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // //   SafeAreaView,
// // //   StatusBar,
// // //   TextInput,
// // //   Alert,
// // //   KeyboardAvoidingView,
// // //   Platform,
// // //   ActivityIndicator,
// // //   Modal
// // // } from 'react-native';
// // // import { useSafeAreaInsets } from 'react-native-safe-area-context';
// // // import Ionicons from 'react-native-vector-icons/Ionicons';
// // // import { useNavigation } from '@react-navigation/native';
// // // import { Dropdown } from 'react-native-element-dropdown';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import RazorpayCheckout from 'react-native-razorpay';

// // // // Import Thunks
// // // import { generateOrderId, updateSchemeDetails } from '../redux/slices/schemeSlice';

// // // const ACCENT_COLOR = '#832729';

// // // const SchemeApplicationScreen = () => {
// // //   const insets = useSafeAreaInsets();
// // //   const navigation = useNavigation();
// // //   const dispatch = useDispatch();

// // //   // Redux State
// // //   // We monitor both paymentLoading and updateSchemeLoading
// // //   const { paymentLoading, updateSchemeLoading, orderData } = useSelector((state) => state.scheme);
// // //   const customerProfile = useSelector((state) => state.Auth.customerProfile);

// // //   // Form State
// // //   const [userName, setUserName] = useState('');
// // //   const [agentName, setAgentName] = useState('');
// // //   const [tenure, setTenure] = useState(null);
// // //   const [installmentAmount, setInstallmentAmount] = useState(null);
// // //   const [cardNumber, setCardNumber] = useState('');

// // //   // UI State
// // //   const [tenureFocus, setTenureFocus] = useState(false);
// // //   const [amountFocus, setAmountFocus] = useState(false);
// // //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// // //   const tenureOptions = [
// // //     { label: '6 Months', value: '6' },
// // //     { label: '11 Months', value: '11' },
// // //   ];

// // //   const installmentOptions = Array.from({ length: 50 }, (_, i) => {
// // //     const amount = (i + 1) * 1000;
// // //     return {
// // //       label: `₹${amount.toLocaleString('en-IN')}`,
// // //       value: amount.toString(),
// // //     };
// // //   });

// // //   const handlePay = async () => {
// // //     // 1. Validation
// // //     if (!userName.trim()) { Alert.alert('Missing Field', 'Please enter your Full Name'); return; }
// // //     if (!agentName.trim()) { Alert.alert('Missing Field', 'Please enter Agent Name'); return; }
// // //     if (!tenure) { Alert.alert('Missing Field', 'Please select Tenure'); return; }
// // //     if (!installmentAmount) { Alert.alert('Missing Field', 'Please select Monthly Installment Amount'); return; }
// // //     if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) { 
// // //         Alert.alert('Invalid Card', 'Please enter a valid 16-digit card number'); 
// // //         return; 
// // //     }

// // //     try {
// // //       // 2. Call API to Generate Order ID
// // //       const resultAction = await dispatch(generateOrderId(installmentAmount));
      
// // //       if (generateOrderId.fulfilled.match(resultAction)) {
// // //         const { orderId, payment_key_id } = resultAction.payload;
        
// // //         // 3. Configure Razorpay Options
// // //         const options = {
// // //           description: 'Gold Scheme Enrollment',
// // //           image: 'https://geetajewellers.co.in/logo.png', // Update Logo
// // //           currency: 'INR',
// // //           key: payment_key_id,
// // //           amount: orderId.amount,
// // //           name: 'Geeta Jewellers',
// // //           order_id: orderId.id,
// // //           prefill: {
// // //             email: customerProfile?.customer_email || 'test@example.com',
// // //             contact: customerProfile?.customer_mobile_number || '9876543210',
// // //             name: userName
// // //           },
// // //           theme: { color: ACCENT_COLOR }
// // //         };

// // //         // 4. Open Razorpay Checkout
// // //         RazorpayCheckout.open(options)
// // //           .then(async (data) => {
// // //             // --- PAYMENT SUCCESS ---
// // //             console.log(`Razorpay Success: ${data.razorpay_payment_id}`);

// // //             // 5. Prepare Payload for Update API
// // //             // Note: Ensure where 'id' comes from. Assuming 'id' represents the scheme/record ID 
// // //             // which might be available in orderData or needs to be 0 for new insertion depending on backend.
// // //             // Using orderId.id (from Razorpay response) usually maps to payment, but if backend requires a Table ID, 
// // //             // you might need to adjust this value.
// // //             const updatePayload = {
// // //               name: userName,
// // //               agent_name: agentName,
// // //               tenure: parseInt(tenure),
// // //               installment_amount: parseInt(installmentAmount),
// // //               card_no: cardNumber, // Be careful storing card numbers (compliance)
// // //               payment_id: data.razorpay_payment_id,
// // //               id: orderId.receipt ? parseInt(orderId.receipt.replace('order_rcptid_', '')) : 0 // Adjust logic based on where ID comes from
// // //             };

// // //             // 6. Call Update API
// // //             const updateResult = await dispatch(updateSchemeDetails(updatePayload));

// // //             if (updateSchemeDetails.fulfilled.match(updateResult)) {
// // //                // 7. Show Success Modal / Navigate
// // //                setShowSuccessModal(true);
// // //             } else {
// // //                Alert.alert('Error', 'Payment successful but failed to update details on server.');
// // //             }
// // //           })
// // //           .catch((error) => {
// // //             console.log(`Error: ${error.code} | ${error.description}`);
// // //             Alert.alert('Payment Failed', error.description || 'Payment was cancelled');
// // //           });
// // //       } else {
// // //         Alert.alert('Error', resultAction.payload || 'Failed to initiate payment');
// // //       }
// // //     } catch (err) {
// // //       console.error(err);
// // //       Alert.alert('Error', 'An unexpected error occurred');
// // //     }
// // //   };

// // //   const handleNavigateToTrack = () => {
// // //     setShowSuccessModal(false);
// // //     // Navigate to TrackScheme Screen
// // //     navigation.replace('TrackScheme'); 
// // //   };

// // //   const isLoading = paymentLoading || updateSchemeLoading;

// // //   return (
// // //     <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
// // //       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
// // //       {/* Header */}
// // //       <View style={styles.header}>
// // //         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
// // //           <Ionicons name="arrow-back" size={24} color="#000" />
// // //         </TouchableOpacity>
// // //         <Text style={styles.headerTitle}>Apply for Scheme</Text>
// // //         <View style={styles.headerPlaceholder} />
// // //       </View>

// // //       <KeyboardAvoidingView
// // //         style={{ flex: 1 }}
// // //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // //       >
// // //         <ScrollView
// // //           contentContainerStyle={styles.scrollContent}
// // //           showsVerticalScrollIndicator={false}
// // //           keyboardShouldPersistTaps="handled"
// // //         >
// // //           <View style={styles.formContainer}>
// // //             <View style={styles.inputGroup}>
// // //               <Text style={styles.label}>Your Full Name</Text>
// // //               <TextInput
// // //                 style={styles.input}
// // //                 placeholder="Enter your full name"
// // //                 placeholderTextColor="#999"
// // //                 value={userName}
// // //                 onChangeText={setUserName}
// // //                 autoCapitalize="words"
// // //               />
// // //             </View>

// // //             <View style={styles.inputGroup}>
// // //               <Text style={styles.label}>Agent Name</Text>
// // //               <TextInput
// // //                 style={styles.input}
// // //                 placeholder="Enter agent name"
// // //                 placeholderTextColor="#999"
// // //                 value={agentName}
// // //                 onChangeText={setAgentName}
// // //               />
// // //             </View>

// // //             <View style={styles.inputGroup}>
// // //               <Text style={styles.label}>Select Tenure</Text>
// // //               <Dropdown
// // //                 style={[styles.dropdown, tenureFocus && { borderColor: ACCENT_COLOR }]}
// // //                 placeholderStyle={styles.placeholderStyle}
// // //                 selectedTextStyle={styles.selectedTextStyle}
// // //                 iconStyle={styles.iconStyle}
// // //                 data={tenureOptions}
// // //                 maxHeight={300}
// // //                 labelField="label"
// // //                 valueField="value"
// // //                 placeholder={!tenureFocus ? 'Choose tenure...' : '...'}
// // //                 value={tenure}
// // //                 onFocus={() => setTenureFocus(true)}
// // //                 onBlur={() => setTenureFocus(false)}
// // //                 onChange={item => {
// // //                   setTenure(item.value);
// // //                   setTenureFocus(false);
// // //                 }}
// // //                 renderRightIcon={() => (
// // //                   <Ionicons
// // //                     name={tenureFocus ? 'chevron-up' : 'chevron-down'}
// // //                     size={20}
// // //                     color={ACCENT_COLOR}
// // //                   />
// // //                 )}
// // //               />
// // //             </View>

// // //             <View style={styles.inputGroup}>
// // //               <Text style={styles.label}>Monthly Installment Amount</Text>
// // //               <Dropdown
// // //                 style={[styles.dropdown, amountFocus && { borderColor: ACCENT_COLOR }]}
// // //                 placeholderStyle={styles.placeholderStyle}
// // //                 selectedTextStyle={styles.selectedTextStyle}
// // //                 iconStyle={styles.iconStyle}
// // //                 data={installmentOptions}
// // //                 maxHeight={300}
// // //                 labelField="label"
// // //                 valueField="value"
// // //                 placeholder={!amountFocus ? 'Select amount...' : '...'}
// // //                 search
// // //                 searchPlaceholder="Search amount..."
// // //                 value={installmentAmount}
// // //                 onFocus={() => setAmountFocus(true)}
// // //                 onBlur={() => setAmountFocus(false)}
// // //                 onChange={item => {
// // //                   setInstallmentAmount(item.value);
// // //                   setAmountFocus(false);
// // //                 }}
// // //                 renderRightIcon={() => (
// // //                   <Ionicons
// // //                     name={amountFocus ? 'chevron-up' : 'chevron-down'}
// // //                     size={20}
// // //                     color={ACCENT_COLOR}
// // //                   />
// // //                 )}
// // //               />
// // //             </View>

// // //             <View style={styles.inputGroup}>
// // //               <Text style={styles.label}>Card Number</Text>
// // //               <TextInput
// // //                 style={styles.input}
// // //                 placeholder="1234 5678 9012 3456"
// // //                 placeholderTextColor="#999"
// // //                 keyboardType="numeric"
// // //                 maxLength={19}
// // //                 value={cardNumber}
// // //                 onChangeText={(text) => {
// // //                   const formatted = text.replace(/\s?/g, '').replace(/(.{4})/g, '$1 ').trim();
// // //                   setCardNumber(formatted);
// // //                 }}
// // //               />
// // //             </View>

// // //             <Text style={styles.noteText}>
// // //               Note: You will pay ₹{installmentAmount ? parseInt(installmentAmount).toLocaleString('en-IN') : '0'} monthly for {tenure ? `${tenure} months` : '...'} .
// // //             </Text>
// // //           </View>
// // //         </ScrollView>

// // //         {/* Pay Button */}
// // //         <View style={[styles.bottomContainer, { paddingBottom: Math.max(insets.bottom) }]}>
// // //           <TouchableOpacity 
// // //             style={[styles.payButton, isLoading && { opacity: 0.7 }]} 
// // //             onPress={handlePay}
// // //             disabled={isLoading}
// // //           >
// // //             {isLoading ? (
// // //               <ActivityIndicator color="#fff" />
// // //             ) : (
// // //               <Text style={styles.payButtonText}>Pay & Enroll</Text>
// // //             )}
// // //           </TouchableOpacity>
// // //         </View>
// // //       </KeyboardAvoidingView>

// // //       {/* Success Modal */}
// // //       <Modal
// // //         visible={showSuccessModal}
// // //         transparent={true}
// // //         animationType="fade"
// // //         onRequestClose={handleNavigateToTrack}
// // //       >
// // //         <View style={styles.modalOverlay}>
// // //           <View style={styles.modalContent}>
// // //             <View style={styles.successIconContainer}>
// // //               <Ionicons name="checkmark" size={40} color="#fff" />
// // //             </View>
// // //             <Text style={styles.modalTitle}>Payment Successful!</Text>
// // //             <Text style={styles.modalText}>
// // //               Your scheme enrollment is complete and details have been updated.
// // //             </Text>
// // //             <Text style={styles.modalDetailText}>
// // //               Amount Paid: ₹{installmentAmount ? parseInt(installmentAmount).toLocaleString('en-IN') : ''}
// // //             </Text>
// // //             <TouchableOpacity 
// // //               style={styles.modalButton}
// // //               onPress={handleNavigateToTrack}
// // //             >
// // //               <Text style={styles.modalButtonText}>Track Scheme</Text>
// // //             </TouchableOpacity>
// // //           </View>
// // //         </View>
// // //       </Modal>

// // //     </SafeAreaView>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1, backgroundColor: '#FFFFFF' },
// // //   header: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     justifyContent: 'space-between',
// // //     paddingHorizontal: 16,
// // //     paddingVertical: 16,
// // //     backgroundColor: '#fff',
// // //     borderBottomWidth: 1,
// // //     borderBottomColor: '#E0E0E0',
// // //   },
// // //   backButton: { padding: 4, width: 32 },
// // //   headerTitle: { fontSize: 18, fontWeight: '600', color: '#000', flex: 1, textAlign: 'center' },
// // //   headerPlaceholder: { width: 32 },
// // //   scrollContent: { paddingBottom: 100 },
// // //   formContainer: { padding: 20 },
// // //   inputGroup: { marginBottom: 20 },
// // //   label: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 8 },
// // //   input: {
// // //     borderWidth: 1,
// // //     borderColor: '#E0E0E0',
// // //     borderRadius: 8,
// // //     padding: 14,
// // //     fontSize: 16,
// // //     backgroundColor: '#F9F9F9',
// // //     color: '#000',
// // //   },
// // //   dropdown: {
// // //     height: 50,
// // //     borderColor: '#E0E0E0',
// // //     borderWidth: 1,
// // //     borderRadius: 8,
// // //     paddingHorizontal: 14,
// // //     backgroundColor: '#F9F9F9',
// // //   },
// // //   placeholderStyle: { fontSize: 16, color: '#999' },
// // //   selectedTextStyle: { fontSize: 16, color: '#000' },
// // //   iconStyle: { width: 20, height: 20 },
// // //   noteText: {
// // //     fontSize: 14,
// // //     color: '#666',
// // //     textAlign: 'center',
// // //     marginTop: 20,
// // //     marginBottom: 10,
// // //     fontStyle: 'italic',
// // //   },
// // //   bottomContainer: {
// // //     position: 'absolute',
// // //     bottom: 0,
// // //     left: 0,
// // //     right: 0,
// // //     backgroundColor: '#FFFFFF',
// // //     paddingHorizontal: 16,
// // //     paddingTop: 12,
// // //     borderTopWidth: 1,
// // //     borderTopColor: '#E0E0E0',
// // //     shadowColor: '#000',
// // //     shadowOffset: { width: 0, height: -2 },
// // //     shadowOpacity: 0.1,
// // //     shadowRadius: 4,
// // //     elevation: 10,
// // //   },
// // //   payButton: {
// // //     backgroundColor: ACCENT_COLOR,
// // //     borderRadius: 8,
// // //     paddingVertical: 16,
// // //     alignItems: 'center',
// // //   },
// // //   payButtonText: {
// // //     color: '#FFFFFF',
// // //     fontSize: 16,
// // //     fontWeight: '700',
// // //   },
// // //   // Modal Styles
// // //   modalOverlay: {
// // //     flex: 1,
// // //     backgroundColor: 'rgba(0,0,0,0.6)',
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },
// // //   modalContent: {
// // //     width: '85%',
// // //     backgroundColor: '#fff',
// // //     borderRadius: 16,
// // //     padding: 24,
// // //     alignItems: 'center',
// // //     elevation: 5,
// // //   },
// // //   successIconContainer: {
// // //     width: 70,
// // //     height: 70,
// // //     borderRadius: 35,
// // //     backgroundColor: '#4CAF50',
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     marginBottom: 16,
// // //   },
// // //   modalTitle: {
// // //     fontSize: 20,
// // //     fontWeight: 'bold',
// // //     color: '#000',
// // //     marginBottom: 8,
// // //   },
// // //   modalText: {
// // //     fontSize: 14,
// // //     color: '#666',
// // //     textAlign: 'center',
// // //     marginBottom: 4,
// // //   },
// // //   modalDetailText: {
// // //     fontSize: 16,
// // //     fontWeight: '600',
// // //     color: '#333',
// // //     marginBottom: 24,
// // //   },
// // //   modalButton: {
// // //     backgroundColor: ACCENT_COLOR,
// // //     paddingHorizontal: 32,
// // //     paddingVertical: 12,
// // //     borderRadius: 24,
// // //   },
// // //   modalButtonText: {
// // //     color: '#fff',
// // //     fontSize: 16,
// // //     fontWeight: '600',
// // //   },
// // // });

// // // export default SchemeApplicationScreen;
// // import React, { useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   ScrollView,
// //   TouchableOpacity,
// //   StyleSheet,
// //   SafeAreaView,
// //   StatusBar,
// //   TextInput,
// //   Alert,
// //   KeyboardAvoidingView,
// //   Platform,
// //   ActivityIndicator,
// //   Modal,
// // } from 'react-native';
// // import { useSafeAreaInsets } from 'react-native-safe-area-context';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import { useNavigation } from '@react-navigation/native';
// // import { Dropdown } from 'react-native-element-dropdown';
// // import { useDispatch, useSelector } from 'react-redux';
// // import RazorpayCheckout from 'react-native-razorpay';

// // import {
// //   checkSchemeHolder,
// //   generateOrderId,
// //   updateSchemeDetails,
// // } from '../redux/slices/schemeSlice'; // ← adjust path

// // const ACCENT_COLOR = '#832729';

// // const SchemeApplicationScreen = () => {
// //   const insets = useSafeAreaInsets();
// //   const navigation = useNavigation();
// //   const dispatch = useDispatch();

// //   // ── All hooks at top level ───────────────────────────────────────────────
// //   const {
// //     checkLoading,
// //     checkError,
// //     isRegistered,
// //     paymentLoading,
// //     updateSchemeLoading,
// //     schemeHolder, // ← we expect this to be stored in redux
// //   } = useSelector(state => state.scheme);

// //   const customerProfile = useSelector(state => state.Auth.customerProfile);
// //   const userId = customerProfile?.id || customerProfile?.user_id;

// //   const [userName, setUserName] = useState('');
// //   const [agentName, setAgentName] = useState('');
// //   const [tenure, setTenure] = useState(null);
// //   const [installmentAmount, setInstallmentAmount] = useState(null);
// //   const [cardNumber, setCardNumber] = useState('');
// //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// //   const [tenureFocus, setTenureFocus] = useState(false);
// //   const [amountFocus, setAmountFocus] = useState(false);


// // const tenureOptions = [
// //     { label: '6 Months', value: '6' },
// //     { label: '11 Months', value: '11' },
// //   ];

// //   const installmentOptions = Array.from({ length: 50 }, (_, i) => {
// //     const amount = (i + 1) * 1000;
// //     return {
// //       label: `₹${amount.toLocaleString('en-IN')}`,
// //       value: amount.toString(),
// //     };
// //   });

// //   // ── Prefill when schemeHolder changes ─────────────────────────────────────
// //   useEffect(() => {
// //     if (schemeHolder?.name) {
// //       setUserName(schemeHolder.name);
// //     }
// //   }, [schemeHolder]);

// //   // ── Check scheme holder status once on mount ──────────────────────────────
// //   useEffect(() => {
// //     if (userId) {
// //       dispatch(checkSchemeHolder(userId));
// //     }
// //   }, [dispatch, userId]);

// //   // ── Payment Handler ───────────────────────────────────────────────────────
// //   // const handlePay = async () => {
// //   //   if (!userName.trim()) return Alert.alert('Missing', 'Please enter your Full Name');
// //   //   if (!agentName.trim()) return Alert.alert('Missing', 'Please enter Agent Name');
// //   //   if (!tenure) return Alert.alert('Missing', 'Please select Tenure');
// //   //   if (!installmentAmount) return Alert.alert('Missing', 'Please select Installment Amount');
// //   //   if (!cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
// //   //     return Alert.alert('Invalid', 'Please enter a valid 16-digit card number');
// //   //   }

// //   //   if (!schemeHolder?.id) {
// //   //     return Alert.alert('Error', 'Scheme record not found. Please contact support.');
// //   //   }

// //   //   try {
// //   //     const orderResult = await dispatch(generateOrderId(installmentAmount));
// //   //     if (!generateOrderId.fulfilled.match(orderResult)) {
// //   //       throw new Error(orderResult.payload || 'Failed to create order');
// //   //     }

// //   //     const { orderId, payment_key_id } = orderResult.payload;

// //   //     const paymentData = await RazorpayCheckout.open({
// //   //       description: 'Gold Scheme - First Installment',
// //   //       image: 'https://geetajewellers.co.in/logo.png',
// //   //       currency: 'INR',
// //   //       key: payment_key_id,
// //   //       amount: orderId.amount,
// //   //       name: 'Geeta Jewellers',
// //   //       order_id: orderId.id,
// //   //       prefill: {
// //   //         name: userName,
// //   //         email: customerProfile?.customer_email || 'customer@example.com',
// //   //         contact: customerProfile?.customer_mobile_number || '9999999999',
// //   //       },
// //   //       theme: { color: ACCENT_COLOR },
// //   //     });

// //   //     const updatePayload = {
// //   //       name: userName.trim(),
// //   //       agent_name: agentName.trim(),
// //   //       tenure: parseInt(tenure),
// //   //       installment_amount: parseInt(installmentAmount),
// //   //       card_no: cardNumber.replace(/\s/g, ''),
// //   //       payment_id: paymentData.razorpay_payment_id,
// //   //       id: schemeHolder.id, // ← using the existing scheme id
// //   //     };

// //   //     const updateResult = await dispatch(updateSchemeDetails(updatePayload));

// //   //     if (updateSchemeDetails.fulfilled.match(updateResult)) {
// //   //       setShowSuccessModal(true);
// //   //     } else {
// //   //       Alert.alert('Warning', 'Payment succeeded but scheme update failed');
// //   //     }
// //   //   } catch (error) {
// //   //     console.error('Enrollment failed:', error);
// //   //     Alert.alert('Error', error.description || error.message || 'Enrollment failed');
// //   //   }
// //   // };
// // const handlePay = () => {
// //   // Validation (keep your existing validation)
// //   if (!userName.trim()) return Alert.alert('Missing', 'Please enter your Full Name');
// //   if (!agentName.trim()) return Alert.alert('Missing', 'Please enter Agent Name');
// //   if (!tenure) return Alert.alert('Missing', 'Please select Tenure');
// //   if (!installmentAmount) return Alert.alert('Missing', 'Please select Installment Amount');
// //   if (!cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
// //     return Alert.alert('Invalid', 'Please enter a valid 16-digit card number');
// //   }

// //   if (!schemeHolder?.id) {
// //     return Alert.alert('Error', 'Scheme record not found. Please contact support.');
// //   }

// //   // Show loading indicator
// //   // You can set a local state like setIsPaying(true);

// //   dispatch(generateOrderId(installmentAmount))
// //     .then((orderResult) => {
// //       if (!generateOrderId.fulfilled.match(orderResult)) {
// //         throw new Error(orderResult.payload || 'Failed to create order');
// //       }

// //       const { orderId, payment_key_id } = orderResult.payload;

// //       return RazorpayCheckout.open({
// //         description: 'Gold Scheme - First Installment',
// //         image: 'https://geetajewellers.co.in/logo.png',
// //         currency: 'INR',
// //         key: payment_key_id,
// //         amount: orderId.amount,
// //         name: 'Geeta Jewellers',
// //         order_id: orderId.id,
// //         prefill: {
// //           name: userName,
// //           email: customerProfile?.customer_email || 'customer@example.com',
// //           contact: customerProfile?.customer_mobile_number || '9999999999',
// //         },
// //         theme: { color: ACCENT_COLOR },
// //       });
// //     })
// //     .then((paymentData) => {
// //       // This block only runs on SUCCESSFUL payment
// //       console.log('Payment SUCCESS:', paymentData.razorpay_payment_id);

// //       const updatePayload = {
// //         name: userName.trim(),
// //         agent_name: agentName.trim(),
// //         tenure: parseInt(tenure),
// //         installment_amount: parseInt(installmentAmount),
// //         card_no: cardNumber.replace(/\s/g, ''),
// //         payment_id: paymentData.razorpay_payment_id,
// //         id: schemeHolder.id,
// //       };

// //       // Very important: return the dispatch promise
// //       return dispatch(updateSchemeDetails(updatePayload));
// //     })
// //     .then((updateResult) => {
// //       if (updateSchemeDetails.fulfilled.match(updateResult)) {
// //         console.log('Scheme updated successfully');
// //         setShowSuccessModal(true);
// //         // Optional: delay navigation
// //         setTimeout(() => {
// //           navigation.goBack();
// //         }, 1500);
// //       } else {
// //         Alert.alert('Warning', 'Payment successful but scheme update failed');
// //       }
// //     })
// //     .catch((error) => {
// //       console.log('Payment / Update flow failed:', error);

// //       if (error.code === 'PAYMENT_CANCELLED' || error.code === 'PAYMENT_ERROR') {
// //         Alert.alert('Payment Cancelled', 'Payment was not completed.');
// //       } else {
// //         Alert.alert('Error', error.description || error.message || 'Something went wrong');
// //       }
// //     })
// //     .finally(() => {
// //       // Hide loading if you have one
// //       // setIsPaying(false);
// //     });
// // };
// //   const handleSuccessClose = () => {
// //     setShowSuccessModal(false);
// //     navigation.replace('TrackScheme');
// //   };

// //   const isLoading = checkLoading || paymentLoading || updateSchemeLoading;

// //   // ── JSX ────────────────────────────────────────────────────────────────────
// //   return (
// //     <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
// //       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

// //       <View style={styles.header}>
// //         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
// //           <Ionicons name="arrow-back" size={24} color="#000" />
// //         </TouchableOpacity>
// //         <Text style={styles.headerTitle}>Apply for Scheme</Text>
// //         <View style={styles.headerPlaceholder} />
// //       </View>

// //       <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
// //         {isLoading ? (
// //           <View style={styles.loadingContainer}>
// //             <ActivityIndicator size="large" color={ACCENT_COLOR} />
// //             <Text style={styles.loadingText}>
// //               {checkLoading ? 'Checking scheme status...' : 'Processing...'}
// //             </Text>
// //           </View>
// //         ) : (
// //           <ScrollView
// //             contentContainerStyle={styles.scrollContent}
// //             keyboardShouldPersistTaps="handled"
// //             showsVerticalScrollIndicator={false}
// //           >
// //             <View style={styles.formContainer}>
// //               <View style={styles.inputGroup}>
// //                 <Text style={styles.label}>Your Full Name</Text>
// //                 <TextInput
// //                   style={styles.input}
// //                   placeholder="Enter your full name"
// //                   placeholderTextColor="#999"
// //                   value={userName}
// //                   onChangeText={setUserName}
// //                   autoCapitalize="words"
// //                   editable={!schemeHolder?.name} // optional: lock if already set
// //                 />
// //               </View>

// //               {/* Agent Name */}
// //               <View style={styles.inputGroup}>
// //                 <Text style={styles.label}>Agent Name</Text>
// //                 <TextInput
// //                   style={styles.input}
// //                   placeholder="Enter agent name"
// //                   placeholderTextColor="#999"
// //                   value={agentName}
// //                   onChangeText={setAgentName}
// //                 />
// //               </View>

// //               {/* Tenure */}
// //               <View style={styles.inputGroup}>
// //                 <Text style={styles.label}>Select Tenure</Text>
// //                 <Dropdown
// //                   style={[styles.dropdown, tenureFocus && { borderColor: ACCENT_COLOR }]}
// //                   placeholderStyle={styles.placeholderStyle}
// //                   selectedTextStyle={styles.selectedTextStyle}
// //                   data={tenureOptions}
// //                   maxHeight={300}
// //                   labelField="label"
// //                   valueField="value"
// //                   placeholder={!tenureFocus ? 'Choose tenure...' : '...'}
// //                   value={tenure}
// //                   onFocus={() => setTenureFocus(true)}
// //                   onBlur={() => setTenureFocus(false)}
// //                   onChange={item => {
// //                     setTenure(item.value);
// //                     setTenureFocus(false);
// //                   }}
// //                   renderRightIcon={() => (
// //                     <Ionicons
// //                       name={tenureFocus ? 'chevron-up' : 'chevron-down'}
// //                       size={20}
// //                       color={ACCENT_COLOR}
// //                     />
// //                   )}
// //                 />
// //               </View>

// //               {/* Installment Amount */}
// //               <View style={styles.inputGroup}>
// //                 <Text style={styles.label}>Monthly Installment Amount</Text>
// //                 <Dropdown
// //                   style={[styles.dropdown, amountFocus && { borderColor: ACCENT_COLOR }]}
// //                   placeholderStyle={styles.placeholderStyle}
// //                   selectedTextStyle={styles.selectedTextStyle}
// //                   data={installmentOptions}
// //                   maxHeight={300}
// //                   labelField="label"
// //                   valueField="value"
// //                   placeholder={!amountFocus ? 'Select amount...' : '...'}
// //                   search
// //                   searchPlaceholder="Search amount..."
// //                   value={installmentAmount}
// //                   onFocus={() => setAmountFocus(true)}
// //                   onBlur={() => setAmountFocus(false)}
// //                   onChange={item => {
// //                     setInstallmentAmount(item.value);
// //                     setAmountFocus(false);
// //                   }}
// //                   renderRightIcon={() => (
// //                     <Ionicons
// //                       name={amountFocus ? 'chevron-up' : 'chevron-down'}
// //                       size={20}
// //                       color={ACCENT_COLOR}
// //                     />
// //                   )}
// //                 />
// //               </View>

// //               {/* Card Number */}
// //               <View style={styles.inputGroup}>
// //                 <Text style={styles.label}>Card Number</Text>
// //                 <TextInput
// //                   style={styles.input}
// //                   placeholder="1234 5678 9012 3456"
// //                   keyboardType="numeric"
// //                   maxLength={19}
// //                   value={cardNumber}
// //                   onChangeText={text => {
// //                     const cleaned = text.replace(/\s/g, '');
// //                     const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
// //                     setCardNumber(formatted);
// //                   }}
// //                 />
// //               </View>

// //               <Text style={styles.noteText}>
// //                 Note: You will pay ₹{installmentAmount ? parseInt(installmentAmount).toLocaleString('en-IN') : '0'} monthly
// //                 for {tenure ? `${tenure} months` : '...'}
// //               </Text>
// //             </View>
// //           </ScrollView>
// //         )}

// //         <View style={[styles.bottomContainer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
// //           <TouchableOpacity
// //             style={[styles.payButton, isLoading && { opacity: 0.6 }]}
// //             onPress={handlePay}
// //             disabled={isLoading}
// //           >
// //             {isLoading ? (
// //               <ActivityIndicator color="#fff" />
// //             ) : (
// //               <Text style={styles.payButtonText}>Pay & Enroll</Text>
// //             )}
// //           </TouchableOpacity>
// //         </View>
// //       </KeyboardAvoidingView>

// //       <Modal
// //         visible={showSuccessModal}
// //         transparent
// //         animationType="fade"
// //         onRequestClose={handleSuccessClose}
// //       >
// //         <View style={styles.modalOverlay}>
// //           <View style={styles.modalContent}>
// //             <Ionicons name="checkmark-circle" size={70} color="#4CAF50" style={{ marginBottom: 16 }} />
// //             <Text style={styles.modalTitle}>Success!</Text>
// //             <Text style={styles.modalText}>Your scheme enrollment is complete.</Text>
// //             <TouchableOpacity style={styles.modalButton} onPress={handleSuccessClose}>
// //               <Text style={styles.modalButtonText}>Track Scheme</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </Modal>
// //     </SafeAreaView>
// //   );
// // };

// // // ── Styles (unchanged) ──────────────────────────────────────────────────────
// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#FFFFFF' },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     paddingHorizontal: 16,
// //     paddingVertical: 16,
// //     backgroundColor: '#fff',
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#E0E0E0',
// //   },
// //   backButton: { padding: 4, width: 32 },
// //   headerTitle: { fontSize: 18, fontWeight: '600', color: '#000', flex: 1, textAlign: 'center' },
// //   headerPlaceholder: { width: 32 },
// //   scrollContent: { paddingBottom: 140 },
// //   formContainer: { padding: 20 },
// //   inputGroup: { marginBottom: 20 },
// //   label: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 8 },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: '#E0E0E0',
// //     borderRadius: 8,
// //     padding: 14,
// //     fontSize: 16,
// //     backgroundColor: '#F9F9F9',
// //     color: '#000',
// //   },
// //   dropdown: {
// //     height: 50,
// //     borderColor: '#E0E0E0',
// //     borderWidth: 1,
// //     borderRadius: 8,
// //     paddingHorizontal: 14,
// //     backgroundColor: '#F9F9F9',
// //   },
// //   placeholderStyle: { fontSize: 16, color: '#999' },
// //   selectedTextStyle: { fontSize: 16, color: '#000' },
// //   noteText: {
// //     fontSize: 14,
// //     color: '#666',
// //     textAlign: 'center',
// //     marginTop: 20,
// //     marginBottom: 30,
// //     fontStyle: 'italic',
// //   },
// //   bottomContainer: {
// //     position: 'absolute',
// //     bottom: 0,
// //     left: 0,
// //     right: 0,
// //     backgroundColor: '#FFFFFF',
// //     paddingHorizontal: 16,
// //     paddingTop: 12,
// //     borderTopWidth: 1,
// //     borderTopColor: '#E0E0E0',
// //   },
// //   payButton: {
// //     backgroundColor: ACCENT_COLOR,
// //     borderRadius: 12,
// //     paddingVertical: 16,
// //     alignItems: 'center',
// //   },
// //   payButtonText: {
// //     color: '#FFFFFF',
// //     fontSize: 16,
// //     fontWeight: '700',
// //   },
// //   loadingContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: 40,
// //   },
// //   loadingText: {
// //     marginTop: 16,
// //     fontSize: 16,
// //     color: '#666',
// //   },
// //   modalOverlay: {
// //     flex: 1,
// //     backgroundColor: 'rgba(0,0,0,0.6)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   modalContent: {
// //     width: '82%',
// //     backgroundColor: '#fff',
// //     borderRadius: 20,
// //     padding: 28,
// //     alignItems: 'center',
// //   },
// //   modalTitle: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     color: '#000',
// //     marginBottom: 12,
// //   },
// //   modalText: {
// //     fontSize: 16,
// //     color: '#555',
// //     textAlign: 'center',
// //     marginBottom: 28,
// //   },
// //   modalButton: {
// //     backgroundColor: ACCENT_COLOR,
// //     paddingHorizontal: 40,
// //     paddingVertical: 14,
// //     borderRadius: 12,
// //     width: '100%',
// //     alignItems: 'center',
// //   },
// //   modalButtonText: {
// //     color: '#fff',
// //     fontSize: 16,
// //     fontWeight: '600',
// //   },
// // });

// // export default SchemeApplicationScreen;
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   TextInput,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator,
//   Modal,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import { Dropdown } from 'react-native-element-dropdown';
// import { useDispatch, useSelector } from 'react-redux';
// import RazorpayCheckout from 'react-native-razorpay';

// // Import Actions
// import {
//   checkSchemeHolder,
//   generateOrderId,
//   updateSchemeDetails,
// } from '../redux/slices/schemeSlice';

// const ACCENT_COLOR = '#832729';

// const SchemeApplicationScreen = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   // ── Redux State ─────────────────────────────────────────────────────────────
//   const {
//     checkLoading,
//     paymentLoading,
//     updateSchemeLoading,
//     schemeHolder, 
//   } = useSelector(state => state.scheme);

//   const customerProfile = useSelector(state => state.Auth.customerProfile);
//   const userId = customerProfile?.id || customerProfile?.user_id;

//   // ── Local State ─────────────────────────────────────────────────────────────
//   const [userName, setUserName] = useState('');
//   const [agentName, setAgentName] = useState('');
//   const [tenure, setTenure] = useState(null);
//   const [installmentAmount, setInstallmentAmount] = useState(null);
//   const [cardNumber, setCardNumber] = useState('');
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   const [tenureFocus, setTenureFocus] = useState(false);
//   const [amountFocus, setAmountFocus] = useState(false);

//   const tenureOptions = [
//     { label: '6 Months', value: '6' },
//     { label: '12 Months', value: '12' },
//   ];

//   const installmentOptions = Array.from({ length: 50 }, (_, i) => {
//     const amount = (i + 1) * 1000;
//     return {
//       label: `₹${amount.toLocaleString('en-IN')}`,
//       value: amount.toString(),
//     };
//   });

//   // ── Effects ─────────────────────────────────────────────────────────────────
  
//   // 1. Prefill Name
//   useEffect(() => {
//     if (schemeHolder?.name) {
//       setUserName(schemeHolder.name);
//     }
//   }, [schemeHolder]);

//   // 2. Check Scheme Status
//   useEffect(() => {
//     if (userId) {
//       dispatch(checkSchemeHolder(userId));
//     }
//   }, [dispatch, userId]);


// const handlePay = () => {
 
//   if (!userName.trim()) return Alert.alert('Missing Field', 'Please enter your Full Name');
//   if (!agentName.trim()) return Alert.alert('Missing Field', 'Please enter Agent Name');
//   if (!tenure) return Alert.alert('Missing Field', 'Please select Tenure');
//   if (!installmentAmount) return Alert.alert('Missing Field', 'Please select Monthly Installment Amount');
//   // if (!cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
//   //   return Alert.alert('Invalid Card', 'Please enter a valid 16-digit card number');
//   // }

//   if (!schemeHolder?.id) {
//     return Alert.alert('Error', 'Scheme registration not found. Please contact support.');
//   }

//   dispatch(generateOrderId(installmentAmount))
//     .unwrap()
//     .then(({ orderId, payment_key_id }) => {
//       const options = {
//         description: 'Gold Scheme Installment',
//         image: 'https://geetajewellers.co.in/logo.png', 
//         currency: 'INR',
//         key: payment_key_id,
//         amount: orderId.amount,           
//         name: 'Geeta Jewellers',
//         order_id: orderId.id,
//         prefill: {
//           name: userName.trim(),
//           email: customerProfile?.customer_email || 'no-email@provided.com',
//           contact: customerProfile?.customer_mobile_number || '9999999999',
//         },
//         theme: { color: ACCENT_COLOR },
        
//         modal: {
//           ondismiss: () => {
//             console.log('Razorpay modal dismissed by user');
            
//           },
//         },
//       };

    
    
//     RazorpayCheckout.open(options)
//   .then(async (successData) => {
//     console.log('Razorpay Payment SUCCESS:', successData);

//     try {
//       const updatePayload = {
//         name: userName.trim(),
//         agent_name: agentName.trim(),
//         tenure: parseInt(tenure),
//         installment_amount: parseInt(installmentAmount),
//         card_no: cardNumber.replace(/\s/g, ''),
//         payment_id: successData.razorpay_payment_id,
//         id: schemeHolder.id,
//       };

//       console.log('Sending update payload:', updatePayload);

//       await dispatch(updateSchemeDetails(updatePayload)).unwrap();

//       console.log('Backend update SUCCESS!');

//       setShowSuccessModal(true);
//     } catch (backendErr) {
//       console.error('Backend update FAILED after payment:', backendErr);

//       Alert.alert(
//         'Payment Received but Update Failed',
//         `Payment ID: ${successData.razorpay_payment_id}\n\nPlease contact support.`
//       );
//     }
//   })
//   .catch((error) => {
//     console.log('Razorpay FAILED / CANCELLED:', error);

//     if (error.code === 0 || String(error.description || '').toLowerCase().includes('cancel')) {
      
//       console.log('User cancelled payment');
//     } else {
//       Alert.alert('Payment Failed', error.description || 'Something went wrong');
//     }
//   });
    
//     })
//     .catch((err) => {
//       console.error('Failed to generate Razorpay order:', err);

//       Alert.alert(
//         'Error',
//         'Unable to start payment process. Please check your internet connection and try again.'
//       );
//     });
// };
//   const handleSuccessClose = () => {
//     setShowSuccessModal(false);
//     // Navigate to Track Scheme
//     navigation.replace('MySchemesScreen');
//   };

//   const isLoading = checkLoading || paymentLoading || updateSchemeLoading;

//   // ── Render ──────────────────────────────────────────────────────────────────
//   return (
//     <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Apply for Scheme</Text>
//         <View style={styles.headerPlaceholder} />
//       </View>

//       <KeyboardAvoidingView 
//         style={{ flex: 1 }} 
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         {isLoading ? (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color={ACCENT_COLOR} />
//             <Text style={styles.loadingText}>Processing...</Text>
//           </View>
//         ) : (
//           <ScrollView
//             contentContainerStyle={styles.scrollContent}
//             keyboardShouldPersistTaps="handled"
//             showsVerticalScrollIndicator={false}
//           >
//             <View style={styles.formContainer}>
              
//               {/* User Name */}
//               <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Your Full Name</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter your full name"
//                   placeholderTextColor="#999"
//                   value={userName}
//                   onChangeText={setUserName}
//                   autoCapitalize="words"
//                   editable={!schemeHolder?.name} // Lock if pre-filled from API
//                 />
//               </View>

//               {/* Agent Name */}
//               <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Agent Name</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter agent name"
//                   placeholderTextColor="#999"
//                   value={agentName}
//                   onChangeText={setAgentName}
//                 />
//               </View>

//               {/* Tenure Dropdown */}
//               <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Select Tenure</Text>
//                 <Dropdown
//                   style={[styles.dropdown, tenureFocus && { borderColor: ACCENT_COLOR }]}
//                   placeholderStyle={styles.placeholderStyle}
//                   selectedTextStyle={styles.selectedTextStyle}
//                   data={tenureOptions}
//                   labelField="label"
//                   valueField="value"
//                   placeholder={!tenureFocus ? 'Choose tenure...' : '...'}
//                   value={tenure}
//                   onFocus={() => setTenureFocus(true)}
//                   onBlur={() => setTenureFocus(false)}
//                   onChange={item => {
//                     setTenure(item.value);
//                     setTenureFocus(false);
//                   }}
//                   renderRightIcon={() => (
//                     <Ionicons
//                       name={tenureFocus ? 'chevron-up' : 'chevron-down'}
//                       size={20}
//                       color={ACCENT_COLOR}
//                     />
//                   )}
//                 />
//               </View>

//               {/* Installment Dropdown */}
//               <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Monthly Installment Amount</Text>
//                 <Dropdown
//                   style={[styles.dropdown, amountFocus && { borderColor: ACCENT_COLOR }]}
//                   placeholderStyle={styles.placeholderStyle}
//                   selectedTextStyle={styles.selectedTextStyle}
//                   data={installmentOptions}
//                   labelField="label"
//                   valueField="value"
//                   placeholder={!amountFocus ? 'Select amount...' : '...'}
//                   search
//                   searchPlaceholder="Search amount..."
//                   value={installmentAmount}
//                   onFocus={() => setAmountFocus(true)}
//                   onBlur={() => setAmountFocus(false)}
//                   onChange={item => {
//                     setInstallmentAmount(item.value);
//                     setAmountFocus(false);
//                   }}
//                   renderRightIcon={() => (
//                     <Ionicons
//                       name={amountFocus ? 'chevron-up' : 'chevron-down'}
//                       size={20}
//                       color={ACCENT_COLOR}
//                     />
//                   )}
//                 />
//               </View>

//               {/* Card Number */}
//               <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Card Number</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="1234 5678 9012 3456"
//                   placeholderTextColor="#999"
//                   keyboardType="numeric"
//                   maxLength={19}
//                   value={cardNumber}
//                   onChangeText={text => {
//                     // Format: 1234 5678 ...
//                     const formatted = text.replace(/\s?/g, '').replace(/(.{4})/g, '$1 ').trim();
//                     setCardNumber(formatted);
//                   }}
//                 />
//               </View>

//               <Text style={styles.noteText}>
//                 Note: You will pay ₹{installmentAmount ? parseInt(installmentAmount).toLocaleString('en-IN') : '0'} monthly 
//                 for {tenure ? `${tenure} months` : '...'} .
//               </Text>
//             </View>
//           </ScrollView>
//         )}

//         {/* Pay Button */}
//         {!isLoading && (
//           <View style={[styles.bottomContainer, { paddingBottom: Math.max(insets.bottom, 10) }]}>
//             <TouchableOpacity 
//               style={styles.payButton} 
//               onPress={handlePay}
//             >
//               <Text style={styles.payButtonText}>Pay & Enroll</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </KeyboardAvoidingView>

//       {/* Success Modal */}
//       <Modal
//         visible={showSuccessModal}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={handleSuccessClose}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.successIconContainer}>
//               <Ionicons name="checkmark" size={40} color="#fff" />
//             </View>
//             <Text style={styles.modalTitle}>Payment Successful!</Text>
//             <Text style={styles.modalText}>
//               Your scheme enrollment is complete.
//             </Text>
//             <TouchableOpacity style={styles.modalButton} onPress={handleSuccessClose}>
//               <Text style={styles.modalButtonText}>Track Scheme</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#FFFFFF' },
//   header: {
//     flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
//     paddingHorizontal: 16, paddingVertical: 16, backgroundColor: '#fff',
//     borderBottomWidth: 1, borderBottomColor: '#E0E0E0',
//   },
//   backButton: { padding: 4, width: 32 },
//   headerTitle: { fontSize: 18, fontWeight: '600', color: '#000', flex: 1, textAlign: 'center' },
//   headerPlaceholder: { width: 32 },
//   scrollContent: { paddingBottom: 100 },
//   formContainer: { padding: 20 },
//   inputGroup: { marginBottom: 20 },
//   label: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 8 },
//   input: {
//     borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, padding: 14,
//     fontSize: 16, backgroundColor: '#F9F9F9', color: '#000',
//   },
//   dropdown: {
//     height: 50, borderColor: '#E0E0E0', borderWidth: 1, borderRadius: 8,
//     paddingHorizontal: 14, backgroundColor: '#F9F9F9',
//   },
//   placeholderStyle: { fontSize: 16, color: '#999' },
//   selectedTextStyle: { fontSize: 16, color: '#000' },
//   noteText: {
//     fontSize: 14, color: '#666', textAlign: 'center', marginTop: 20, marginBottom: 30, fontStyle: 'italic',
//   },
//   bottomContainer: {
//     position: 'absolute', bottom: 0, left: 0, right: 0,
//     backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingTop: 12,
//     borderTopWidth: 1, borderTopColor: '#E0E0E0',
//   },
//   payButton: {
//     backgroundColor: ACCENT_COLOR, borderRadius: 12, paddingVertical: 16, alignItems: 'center',
//   },
//   payButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
//   loadingContainer: {
//     flex: 1, justifyContent: 'center', alignItems: 'center',
//   },
//   loadingText: { marginTop: 10, fontSize: 16, color: '#666' },
//   // Modal
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
//   modalContent: { width: '80%', backgroundColor: '#fff', borderRadius: 16, padding: 24, alignItems: 'center', elevation: 5 },
//   successIconContainer: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
//   modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 8 },
//   modalText: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 24 },
//   modalButton: { backgroundColor: ACCENT_COLOR, paddingHorizontal: 32, paddingVertical: 12, borderRadius: 24, width: '100%', alignItems: 'center' },
//   modalButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
// });

// export default SchemeApplicationScreen;
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';

// Import Actions
import {
  checkSchemeHolder,
  generateOrderId,
  updateSchemeDetails,
} from '../redux/slices/schemeSlice';

const ACCENT_COLOR = '#832729';

// Font family constants
const FONTS = {
  regular: 'SF-Pro-Display-Regular',
  medium: 'SF-Pro-Display-Medium',
  semibold: 'SF-Pro-Display-Semibold',
  bold: 'SF-Pro-Display-Bold',
};

const SchemeApplicationScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // ── Redux State ─────────────────────────────────────────────────────────────
  const {
    checkLoading,
    paymentLoading,
    updateSchemeLoading,
    schemeHolder, 
  } = useSelector(state => state.scheme);

  const customerProfile = useSelector(state => state.Auth.customerProfile);
  const userId = customerProfile?.id || customerProfile?.user_id;

  // ── Local State ─────────────────────────────────────────────────────────────
  const [userName, setUserName] = useState('');
  const [agentName, setAgentName] = useState('');
  const [tenure, setTenure] = useState(null);
  const [installmentAmount, setInstallmentAmount] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [tenureFocus, setTenureFocus] = useState(false);
  const [amountFocus, setAmountFocus] = useState(false);

  const tenureOptions = [
    { label: '6 Months', value: '6' },
    { label: '12 Months', value: '12' },
  ];

  const installmentOptions = Array.from({ length: 50 }, (_, i) => {
    const amount = (i + 1) * 1000;
    return {
      label: `₹${amount.toLocaleString('en-IN')}`,
      value: amount.toString(),
    };
  });

  // ── Effects ─────────────────────────────────────────────────────────────────
  
  useEffect(() => {
    if (schemeHolder?.name) {
      setUserName(schemeHolder.name);
    }
  }, [schemeHolder]);

  useEffect(() => {
    if (userId) {
      dispatch(checkSchemeHolder(userId));
    }
  }, [dispatch, userId]);

  const handlePay = () => {
    if (!userName.trim()) return Alert.alert('Missing Field', 'Please enter your Full Name');
    if (!agentName.trim()) return Alert.alert('Missing Field', 'Please enter Agent Name');
    if (!tenure) return Alert.alert('Missing Field', 'Please select Tenure');
    if (!installmentAmount) return Alert.alert('Missing Field', 'Please select Monthly Installment Amount');

    if (!schemeHolder?.id) {
      return Alert.alert('Error', 'Scheme registration not found. Please contact support.');
    }

    dispatch(generateOrderId(installmentAmount))
      .unwrap()
      .then(({ orderId, payment_key_id }) => {
        const options = {
          description: 'Gold Scheme Installment',
          image: 'https://geetajewellers.co.in/logo.png', 
          currency: 'INR',
          key: payment_key_id,
          amount: orderId.amount,           
          name: 'Geeta Jewellers',
          order_id: orderId.id,
          prefill: {
            name: userName.trim(),
            email: customerProfile?.customer_email || 'no-email@provided.com',
            contact: customerProfile?.customer_mobile_number || '9999999999',
          },
          theme: { color: ACCENT_COLOR },
          modal: {
            ondismiss: () => {
              console.log('Razorpay modal dismissed by user');
            },
          },
        };

        RazorpayCheckout.open(options)
          .then(async (successData) => {
            console.log('Razorpay Payment SUCCESS:', successData);

            try {
              const updatePayload = {
                name: userName.trim(),
                agent_name: agentName.trim(),
                tenure: parseInt(tenure),
                installment_amount: parseInt(installmentAmount),
                card_no: cardNumber.replace(/\s/g, ''),
                payment_id: successData.razorpay_payment_id,
                id: schemeHolder.id,
                user_id:userId
              };

              await dispatch(updateSchemeDetails(updatePayload)).unwrap();
              setShowSuccessModal(true);
            } catch (backendErr) {
              console.error('Backend update FAILED after payment:', backendErr);
              Alert.alert(
                'Payment Received but Update Failed',
                `Payment ID: ${successData.razorpay_payment_id}\n\nPlease contact support.`
              );
            }
          })
          .catch((error) => {
            console.log('Razorpay FAILED / CANCELLED:', error);
            if (error.code === 0 || String(error.description || '').toLowerCase().includes('cancel')) {
              console.log('User cancelled payment');
            } else {
              Alert.alert('Payment Failed', error.description || 'Something went wrong');
            }
          });
      })
      .catch((err) => {
        console.error('Failed to generate Razorpay order:', err);
        Alert.alert(
          'Error',
          'Unable to start payment process. Please check your internet connection and try again.'
        );
      });
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigation.replace('MySchemesScreen');
  };

  const isLoading = checkLoading || paymentLoading || updateSchemeLoading;

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Apply for Scheme</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={ACCENT_COLOR} />
            <Text style={styles.loadingText}>Processing...</Text>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formContainer}>
              
              {/* User Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Your Full Name</Text>
                {/* <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#999"
                  value={userName}
                  onChangeText={setUserName}
                  autoCapitalize="words"
                  editable={!schemeHolder?.name}
                /> */}
                <TextInput
  style={styles.input}
  placeholder="Enter your full name"
  placeholderTextColor="#999"
  value={userName}
  onChangeText={setUserName}
  autoCapitalize="words"
  editable={true} // Hardcoded to true
/>
              </View>

              {/* Agent Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Agent Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter agent name"
                  placeholderTextColor="#999"
                  value={agentName}
                  onChangeText={setAgentName}
                />
              </View>

              {/* Tenure Dropdown */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Select Tenure</Text>
                <Dropdown
                  style={[styles.dropdown, tenureFocus && { borderColor: ACCENT_COLOR }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={tenureOptions}
                  labelField="label"
                  valueField="value"
                  placeholder={!tenureFocus ? 'Choose tenure...' : '...'}
                  value={tenure}
                  onFocus={() => setTenureFocus(true)}
                  onBlur={() => setTenureFocus(false)}
                  onChange={item => {
                    setTenure(item.value);
                    setTenureFocus(false);
                  }}
                  renderRightIcon={() => (
                    <Ionicons
                      name={tenureFocus ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color={ACCENT_COLOR}
                    />
                  )}
                />
              </View>

              {/* Installment Dropdown */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Monthly Installment Amount</Text>
                <Dropdown
                  style={[styles.dropdown, amountFocus && { borderColor: ACCENT_COLOR }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={installmentOptions}
                  labelField="label"
                  valueField="value"
                  placeholder={!amountFocus ? 'Select amount...' : '...'}
                  search
                  searchPlaceholder="Search amount..."
                  value={installmentAmount}
                  onFocus={() => setAmountFocus(true)}
                  onBlur={() => setAmountFocus(false)}
                  onChange={item => {
                    setInstallmentAmount(item.value);
                    setAmountFocus(false);
                  }}
                  renderRightIcon={() => (
                    <Ionicons
                      name={amountFocus ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color={ACCENT_COLOR}
                    />
                  )}
                />
              </View>

              {/* Card Number */}
              {/* <View style={styles.inputGroup}>
                <Text style={styles.label}>Card Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  maxLength={19}
                  value={cardNumber}
                  onChangeText={text => {
                    const formatted = text.replace(/\s?/g, '').replace(/(.{4})/g, '$1 ').trim();
                    setCardNumber(formatted);
                  }}
                />
              </View> */}

              {/* <Text style={styles.noteText}>
                Note: You will pay ₹{installmentAmount ? parseInt(installmentAmount).toLocaleString('en-IN') : '0'} monthly 
                for {tenure ? `${tenure} months` : '...'} .
              </Text> */}
            </View>
          </ScrollView>
        )}

        {/* Pay Button */}
        {!isLoading && (
          <View style={[styles.bottomContainer, { paddingBottom: Math.max(insets.bottom, 10) }]}>
            <TouchableOpacity 
              style={styles.payButton} 
              onPress={handlePay}
            >
              <Text style={styles.payButtonText}>Pay & Enroll</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleSuccessClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark" size={40} color="#fff" />
            </View>
            <Text style={styles.modalTitle}>Payment Successful!</Text>
            <Text style={styles.modalText}>
              Your scheme enrollment is complete.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleSuccessClose}>
              <Text style={styles.modalButtonText}>Track Scheme</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
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
    width: 32 
  },
  headerTitle: { 
    fontSize: 18, 
    fontFamily: FONTS.bold,
    color: '#000', 
    flex: 1, 
    textAlign: 'center' 
  },
  headerPlaceholder: { 
    width: 32 
  },
  scrollContent: { 
    paddingBottom: 100 
  },
  formContainer: { 
    padding: 20 
  },
  inputGroup: { 
    marginBottom: 20 
  },
  label: { 
    fontSize: 15, 
    fontFamily: FONTS.semibold,
    color: '#333', 
    marginBottom: 8 
  },
  input: {
    borderWidth: 1, 
    borderColor: '#E0E0E0', 
    borderRadius: 8, 
    padding: 14,
    fontSize: 16, 
    fontFamily: FONTS.regular,
    backgroundColor: '#F9F9F9', 
    color: '#000',
  },
  dropdown: {
    height: 50, 
    borderColor: '#E0E0E0', 
    borderWidth: 1, 
    borderRadius: 8,
    paddingHorizontal: 14, 
    backgroundColor: '#F9F9F9',
  },
  placeholderStyle: { 
    fontSize: 16, 
    fontFamily: FONTS.regular,
    color: '#999' 
  },
  selectedTextStyle: { 
    fontSize: 16, 
    fontFamily: FONTS.regular,
    color: '#000' 
  },
  noteText: {
    fontSize: 14, 
    fontFamily: FONTS.regular,
    color: '#666', 
    textAlign: 'center', 
    marginTop: 20, 
    marginBottom: 30, 
    fontStyle: 'italic',
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
  },
  payButton: {
    backgroundColor: ACCENT_COLOR, 
    borderRadius: 12, 
    paddingVertical: 16, 
    alignItems: 'center',
  },
  payButtonText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontFamily: FONTS.bold,
  },
  loadingContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  loadingText: { 
    marginTop: 10, 
    fontSize: 16, 
    fontFamily: FONTS.medium,
    color: '#666' 
  },
  // Modal
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalContent: { 
    width: '80%', 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 24, 
    alignItems: 'center', 
    elevation: 5 
  },
  successIconContainer: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    backgroundColor: '#4CAF50', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  modalTitle: { 
    fontSize: 20, 
    fontFamily: FONTS.bold,
    color: '#000', 
    marginBottom: 8 
  },
  modalText: { 
    fontSize: 14, 
    fontFamily: FONTS.regular,
    color: '#666', 
    textAlign: 'center', 
    marginBottom: 24 
  },
  modalButton: { 
    backgroundColor: ACCENT_COLOR, 
    paddingHorizontal: 32, 
    paddingVertical: 12, 
    borderRadius: 24, 
    width: '100%', 
    alignItems: 'center' 
  },
  modalButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontFamily: FONTS.semibold,
  },
});

export default SchemeApplicationScreen;