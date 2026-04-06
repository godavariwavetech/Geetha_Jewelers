// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   ImageBackground,
//   StatusBar,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   Modal,
//   ScrollView,
//   Keyboard,
//   ActivityIndicator,
// } from 'react-native';
// import Svg, { Path, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend, G } from 'react-native-svg';
// import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useDispatch, useSelector } from 'react-redux';
// import { requestOtp } from '../redux/slices/authSlice'; // Update this path

// const { width, height } = Dimensions.get('window');

// const LoginScreen = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [errorModalVisible, setErrorModalVisible] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.Auth); // from your auth slice

//   // Phone number validation (Indian 10-digit starting with 6-9)
//   const validatePhoneNumber = (number) => {
//     const phoneRegex = /^[6-9]\d{9}$/;
//     return phoneRegex.test(number);
//   };

//   const handlePhoneNumberChange = (text) => {
//     const numericText = text.replace(/[^0-9]/g, '');
//     setPhoneNumber(numericText);
//   };

// const handleSendOTP = async () => {
//   Keyboard.dismiss();

//   // Validation
//   if (!phoneNumber || phoneNumber.trim() === '') {
//     setErrorMessage('Please enter your mobile number');
//     setErrorModalVisible(true);
//     return;
//   }

//   if (phoneNumber.length !== 10) {
//     setErrorMessage('Mobile number must be 10 digits');
//     setErrorModalVisible(true);
//     return;
//   }

//   if (!validatePhoneNumber(phoneNumber)) {
//     setErrorMessage('Please enter a valid Indian mobile number');
//     setErrorModalVisible(true);
//     return;
//   }

//   try {
//     const result = await dispatch(requestOtp({ phoneNumber })).unwrap();

//     console.log('OTP Request Success:', result);

//     // Navigate to OTP screen with correct data
//     navigation.navigate('OTPVerification', {
//       phoneNumber: phoneNumber,
//       serverOtp: result.loginotp?.toString(),     // For dev auto-fill
//       userInd: result.user_ind,                    // This is what OTP screen checks!
//       message: result.message,                     // Optional: "Existing User" or "New User"
//     });

//   } catch (err) {
//     console.log('OTP Request Failed:', err);

//     // Extract meaningful error message
//     let errorMsg = 'Failed to send OTP. Please try again.';

//     if (err?.response?.data?.message) {
//       errorMsg = err.response.data.message;
//     } else if (err?.message) {
//       errorMsg = err.message;
//     } else if (typeof err === 'string') {
//       errorMsg = err;
//     }

//     setErrorMessage(errorMsg);
//     setErrorModalVisible(true);
//   }
// };

//   return (
//     <SafeAreaView style={styles.container} edges={['top']}>
//       <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         style={styles.keyboardView}
//         keyboardVerticalOffset={0}
//       >
//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           keyboardShouldPersistTaps="handled"
//           bounces={false}
//         >
//           <ImageBackground
//             source={require('../assets/lg.png')}
//             style={styles.backgroundImage}
//             resizeMode="cover"
//           >
//             <View style={styles.bottomSection}>
//               <Svg
//                 height={responsiveHeight(68)}
//                 width="100%"
//                 viewBox="0 0 393 576"
//                 preserveAspectRatio="none"
//                 style={styles.curve}
//               >
//                 <Defs>
//                   <Filter id="filter0_d_35_4416" x="-42.0811" y="0" width="477.163" height="735.962" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
//                     <FeFlood floodOpacity="0" result="BackgroundImageFix" />
//                     <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
//                     <FeOffset dy="-7" />
//                     <FeGaussianBlur stdDeviation="10" />
//                     <FeComposite in2="hardAlpha" operator="out" />
//                     <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
//                     <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_35_4416" />
//                     <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_35_4416" result="shape" />
//                   </Filter>
//                 </Defs>
//                 <G filter="url(#filter0_d_35_4416)">
//                   <Path
//                     d="M79.6416 72.9354C28.1047 44.4338 -9.64722 61.0598 -22.0811 72.9354V722.962H405.536L415.082 92.1732C401.743 95.2047 379.263 79.7585 374.463 72.9354C350.816 50.4968 326.21 38.3269 316.863 35.0468C247.136 9.5815 205.573 50.7333 178.926 72.9354C167.305 84.8111 131.179 101.437 79.6416 72.9354Z"
//                     fill="white"
//                   />
//                 </G>
//               </Svg>

//               <View style={styles.whiteBackground} />

//               <View style={styles.contentContainer}>
//                 <Text style={styles.title} includeFontPadding={false}>
//                   login / Sign up
//                 </Text>
//                 <Text style={styles.subtitle} includeFontPadding={false}>
//                   Enter Mobile number for OTP
//                 </Text>

//                 <View style={styles.inputContainer}>
//                   <Text style={styles.inputLabel} includeFontPadding={false}>
//                     Enter Mobile Number
//                   </Text>
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Enter 10-digit mobile number"
//                     placeholderTextColor="#999"
//                     keyboardType="phone-pad"
//                     value={phoneNumber}
//                     onChangeText={handlePhoneNumberChange}
//                     maxLength={10}
//                     returnKeyType="done"
//                     onSubmitEditing={handleSendOTP}
//                   />
//                 </View>

//                 <Text style={styles.termsText} includeFontPadding={false}>
//                   By Continuing, I agree to{' '}
//                   <Text style={styles.termsLink}>Terms of use</Text>
//                   {' & '}
//                   <Text style={styles.termsLink}>Privacy Policy</Text>
//                 </Text>

//                 <TouchableOpacity
//                   style={[
//                     styles.sendOTPButton,
//                     (phoneNumber.length !== 10 || loading) && styles.sendOTPButtonDisabled,
//                   ]}
//                   onPress={handleSendOTP}
//                   activeOpacity={0.8}
//                   disabled={phoneNumber.length !== 10 || loading}
//                 >
//                   {loading ? (
//                     <ActivityIndicator color="#FFFFFF" size="small" />
//                   ) : (
//                     <Text style={styles.sendOTPButtonText} includeFontPadding={false}>
//                       Send OTP
//                     </Text>
//                   )}
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </ImageBackground>
//         </ScrollView>
//       </KeyboardAvoidingView>

//       {/* Error Modal */}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={errorModalVisible}
//         onRequestClose={() => setErrorModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalIconContainer}>
//               <Ionicons name="close-circle" size={50} color="#D32F2F" />
//             </View>
//             <Text style={styles.modalTitle} includeFontPadding={false}>
//               Oops!
//             </Text>
//             <Text style={styles.modalMessage} includeFontPadding={false}>
//               {errorMessage}
//             </Text>
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={() => setErrorModalVisible(false)}
//               activeOpacity={0.8}
//             >
//               <Text style={styles.modalButtonText} includeFontPadding={false}>
//                 OK
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

// // Styles remain exactly the same as your original (no change needed)
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   keyboardView: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     // minHeight: height,
//     height:"50%"
//   },
//   bottomSection: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     height: responsiveHeight(60),
//     overflow: 'hidden',
//   },
//   curve: {
//     position: 'absolute',
//     top: -1,
//     left: 0,
//     zIndex: 2,
//   },
//   whiteBackground: {
//     position: 'absolute',
//     top: responsiveHeight(68),
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: '#FFFFFF',
//     zIndex: 1,
//   },
//   contentContainer: {
//     position: 'absolute',
//     top: responsiveHeight(20),
//     left: 0,
//     right: 0,
//     paddingHorizontal: responsiveWidth(8),
//     paddingBottom: responsiveHeight(3),
//     zIndex: 3,
//   },
//   title: {
//     fontSize: responsiveFontSize(2.8),
//     fontWeight: '700',
//     color: '#1A1A1A',
//     marginBottom: responsiveHeight(0.9),
//     lineHeight: responsiveFontSize(5),
//   },
//   subtitle: {
//     fontSize: responsiveFontSize(1.8),
//     color: '#666666',
//     marginBottom: responsiveHeight(3.5),
//     lineHeight: responsiveFontSize(2.2),
//   },
//   inputContainer: {
//     marginBottom: responsiveHeight(2.5),
//   },
//   inputLabel: {
//     fontSize: responsiveFontSize(1.7),
//     color: '#333333',
//     marginBottom: 8,
//     fontWeight: '500',
//   },
//   input: {
//     borderBottomWidth: 1.5,
//     borderBottomColor: '#CCCCCC',
//     paddingVertical: 10,
//     fontSize: responsiveFontSize(1.9),
//     color: '#000',
//   },
//   termsText: {
//     fontSize: responsiveFontSize(1.5),
//     color: '#666666',
//     lineHeight: 20,
//     marginBottom: responsiveHeight(3),
//   },
//   termsLink: {
//     color: '#832729',
//     fontWeight: '600',
//   },
//   sendOTPButton: {
//     backgroundColor: '#832729',
//     borderRadius: 8,
//     paddingVertical: responsiveHeight(1.8),
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   sendOTPButtonDisabled: {
//     backgroundColor: '#CCCCCC',
//     opacity: 0.6,
//   },
//   sendOTPButtonText: {
//     fontSize: responsiveFontSize(2),
//     fontWeight: '700',
//     color: '#FFFFFF',
//     lineHeight: responsiveFontSize(2.4),
//   },  // Modal Styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   modalContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 24,
//     width: '90%',
//     maxWidth: 400,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   modalIconContainer: {
//     marginBottom: 16,
//   },
//   modalTitle: {
//     fontSize: responsiveFontSize(2.4),
//     fontWeight: '700',
//     color: '#1A1A1A',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   modalMessage: {
//     fontSize: responsiveFontSize(1.8),
//     color: '#666666',
//     marginBottom: 24,
//     textAlign: 'center',
//     lineHeight: 24,
//   },
//   modalButton: {
//     backgroundColor: '#832729',
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     minWidth: 120,
//   },
//   modalButtonText: {
//     fontSize: responsiveFontSize(1.9),
//     fontWeight: '600',
//     color: '#FFFFFF',
//     textAlign: 'center',
//   },        
// });
// above coode everything working fine but did not existed the styles of page while key board is coming page not scrolling 

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Svg, { Path, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend, G } from 'react-native-svg';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { requestOtp } from '../redux/slices/authSlice';

const { width, height } = Dimensions.get('window');

const SignIn = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
const [checkboxAgreed, setCheckboxAgreed] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.Auth);

  // Phone number validation (Indian 10-digit starting with 6-9)
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(number);
  };

  const handlePhoneNumberChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(numericText);
  };

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.trim() === '') {
      setErrorMessage('Please enter your mobile number');
      setErrorModalVisible(true);
      return;
    }

    if (phoneNumber.length !== 10) {
      setErrorMessage('Mobile number must be 10 digits');
      setErrorModalVisible(true);
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setErrorMessage('Please enter a valid Indian mobile number');
      setErrorModalVisible(true);
      return;
    }

    try {
      const result = await dispatch(requestOtp({ phoneNumber })).unwrap();

      navigation.replace('OTPVerification', {
        phoneNumber: phoneNumber,
        serverOtp: result.loginotp?.toString(),
        userInd: result.user_ind,
        message: result.message,
      });
    } catch (err) {
      let errorMsg = 'Failed to send OTP. Please try again.';
      if (err?.response?.data?.message) errorMsg = err.response.data.message;
      else if (err?.message) errorMsg = err.message;
      setErrorMessage(errorMsg);
      setErrorModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ImageBackground
            source={require('../assets/lg.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            {/* Bottom White Curved Section */}
            <View style={styles.bottomSection}>
              {/* Curved SVG */}
              <Svg
                height={responsiveHeight(70)}
                width="100%"
                viewBox="0 0 393 576"
                preserveAspectRatio="none"
                style={styles.curve}
              >
                <Defs>
                  <Filter id="filter0_d_35_4416" x="-42.0811" y="0" width="477.163" height="735.962" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <FeFlood floodOpacity="0" result="BackgroundImageFix" />
                    <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <FeOffset dy="-7" />
                    <FeGaussianBlur stdDeviation="10" />
                    <FeComposite in2="hardAlpha" operator="out" />
                    <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
                    <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_35_4416" />
                    <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_35_4416" result="shape" />
                  </Filter>
                </Defs>
                <G filter="url(#filter0_d_35_4416)">
                  <Path
                    d="M79.6416 72.9354C28.1047 44.4338 -9.64722 61.0598 -22.0811 72.9354V722.962H405.536L415.082 92.1732C401.743 95.2047 379.263 79.7585 374.463 72.9354C350.816 50.4968 326.21 38.3269 316.863 35.0468C247.136 9.5815 205.573 50.7333 178.926 72.9354C167.305 84.8111 131.179 101.437 79.6416 72.9354Z"
                    fill="white"
                  />
                </G>
              </Svg>

              {/* Full White Background (No Black Gap!) */}
              <View style={styles.whiteBackground} />

              {/* Main Content */}
              {/* <View style={styles.contentContainer}>
                <Text style={styles.title} includeFontPadding={false}>
                  login / Sign up
                </Text>
                <Text style={styles.subtitle} includeFontPadding={false}>
                  Enter Mobile number for OTP
                </Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel} includeFontPadding={false}>
                    Enter Mobile Number
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter 10-digit mobile number"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={handlePhoneNumberChange}
                    maxLength={10}
                    returnKeyType="done"
                    onSubmitEditing={handleSendOTP}
                  />
                </View>

                <Text style={styles.termsText} includeFontPadding={false}>
                  By Continuing, I agree to{' '}
                  <Text style={styles.termsLink}>Terms of use</Text>
                  {' & '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>

                <TouchableOpacity
                  style={[
                    styles.sendOTPButton,
                    (phoneNumber.length !== 10 || loading) && styles.sendOTPButtonDisabled,
                  ]}
                  onPress={handleSendOTP}
                  activeOpacity={0.8}
                  disabled={phoneNumber.length !== 10 || loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text style={styles.sendOTPButtonText} includeFontPadding={false}>
                      Send OTP
                    </Text>
                  )}
                </TouchableOpacity>
              </View> */}
              <View style={styles.contentContainer}>
  <Text style={styles.title} includeFontPadding={false}>
    login / Sign up
  </Text>
  <Text style={styles.subtitle} includeFontPadding={false}>
    Enter Mobile number for OTP
  </Text>

  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel} includeFontPadding={false}>
      Enter Mobile Number
    </Text>
    <TextInput
      style={styles.input}
      placeholder="Enter 10-digit mobile number"
      placeholderTextColor="#999"
      keyboardType="phone-pad"
      value={phoneNumber}
      onChangeText={handlePhoneNumberChange}
      maxLength={10}
      returnKeyType="done"
      onSubmitEditing={handleSendOTP}
    />
  </View>

  {/* NEW CHECKBOX SECTION */}
  <View style={styles.checkboxWrapper}>
    <TouchableOpacity 
      style={styles.checkboxTouch} 
      onPress={() => setCheckboxAgreed(!checkboxAgreed)}
      activeOpacity={0.7}
    >
      <Ionicons 
        name={checkboxAgreed ? "checkbox" : "square-outline"} 
        size={22} 
        color={checkboxAgreed ? "#832729" : "#666666"} 
      />
    </TouchableOpacity>
    
    <Text style={styles.termsText} includeFontPadding={false}>
      By Continuing, I agree to{' '}
      <Text style={styles.termsLink}>Terms of use</Text>
      {' & '}
      <Text style={styles.termsLink}>Privacy Policy</Text>
    </Text>
  </View>

  <TouchableOpacity
    style={[
      styles.sendOTPButton,
      (phoneNumber.length !== 10 || !checkboxAgreed || loading) && styles.sendOTPButtonDisabled,
    ]}
    onPress={handleSendOTP}
    activeOpacity={0.8}
    // Updated disabled logic: must have 10 digits AND checkbox checked
    disabled={phoneNumber.length !== 10 || !checkboxAgreed || loading}
  >
    {loading ? (
      <ActivityIndicator color="#FFFFFF" size="small" />
    ) : (
      <Text style={styles.sendOTPButtonText} includeFontPadding={false}>
        Send OTP
      </Text>
    )}
  </TouchableOpacity>
</View>
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Error Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalIconContainer}>
              <Ionicons name="close-circle" size={50} color="#D32F2F" />
            </View>
            <Text style={styles.modalTitle} includeFontPadding={false}>
              Oops!
            </Text>
            <Text style={styles.modalMessage} includeFontPadding={false}>
              {errorMessage}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setErrorModalVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText} includeFontPadding={false}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    // flex: 1,
    width: '100%',
    minHeight: height,
    height:"45%"
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: responsiveHeight(70), // Increased slightly to cover fully
    overflow: 'hidden',
  },
  curve: {
    position: 'absolute',
    top: -1,
    left: 0,
    zIndex: 2,
  },
  whiteBackground: {
    position: 'absolute',
    top: responsiveHeight(68),
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 1,
  },
  contentContainer: {
    position: 'absolute',
    top: responsiveHeight(20),
    left: 0,
    right: 0,
    paddingHorizontal: responsiveWidth(8),
    paddingBottom: responsiveHeight(5),
    zIndex: 3,
  },
  title: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: responsiveHeight(0.9),
    lineHeight: responsiveFontSize(5),
  },
  subtitle: {
    fontSize: responsiveFontSize(1.8),
    color: '#666666',
    marginBottom: responsiveHeight(3.5),
    lineHeight: responsiveFontSize(2.2),
  },
  inputContainer: {
    marginBottom: responsiveHeight(2.5),
  },
  inputLabel: {
    fontSize: responsiveFontSize(1.7),
    color: '#333333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 10,
    fontSize: responsiveFontSize(1.9),
    color: '#000',
  },
  termsText: {
    fontSize: responsiveFontSize(1.5),
    color: '#666666',
    lineHeight: 20,
    marginBottom: responsiveHeight(3),
  },
  termsLink: {
    color: '#832729',
    fontWeight: '600',
  },
  sendOTPButton: {
    backgroundColor: '#832729',
    borderRadius: 8,
    paddingVertical: responsiveHeight(1.8),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sendOTPButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  sendOTPButtonText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: responsiveFontSize(2.4),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalIconContainer: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: responsiveFontSize(1.8),
    color: '#666666',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  modalButton: {
    backgroundColor: '#832729',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    minWidth: 120,
  },
  modalButtonText: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  //
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: responsiveHeight(3),
    paddingRight: responsiveWidth(5), // Prevents text from hitting the edge
  },
  checkboxTouch: {
    marginRight: 10,
    marginTop: -2, // Aligns icon perfectly with the first line of text
  },
  termsText: {
    flex: 1, // Allows text to wrap properly next to checkbox
    fontSize: responsiveFontSize(1.5),
    color: '#666666',
    lineHeight: 20,
    marginBottom: 0, // Removed margin as wrapper handles it
  },
  termsLink: {
    color: '#832729',
    fontWeight: '700',
    textDecorationLine: 'underline', // Makes it look clickable
  },
});