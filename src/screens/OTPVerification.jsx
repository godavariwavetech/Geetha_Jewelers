// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ImageBackground,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   Modal,
//   ScrollView,
//   Keyboard,
//   ActivityIndicator,
//   StatusBar,
//   Dimensions,
// } from 'react-native';
// import Svg, {
//   Path,
//   Defs,
//   Filter,
//   FeFlood,
//   FeColorMatrix,
//   FeOffset,
//   FeGaussianBlur,
//   FeComposite,
//   FeBlend,
//   G,
// } from 'react-native-svg';
// import {
//   responsiveHeight,
//   responsiveWidth,
//   responsiveFontSize,
// } from 'react-native-responsive-dimensions';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useDispatch } from 'react-redux';
// import { customerLogin, requestOtp } from '../redux/slices/authSlice';

// const { height } = Dimensions.get('window');

// const OTPVerificationScreen = ({ navigation, route }) => {
//   const { phoneNumber, serverOtp, userInd } = route.params || {};
//   const isNewUser = userInd === 0;
// console.log(serverOtp)
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [timer, setTimer] = useState(30);
//   const [canResend, setCanResend] = useState(false);
//   const [showProfileForm, setShowProfileForm] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [errorModalVisible, setErrorModalVisible] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();
//   const inputRefs = useRef([]);

//   // Timer countdown
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer(prev => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           setCanResend(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleOtpChange = (text, index) => {
//     const value = text.replace(/[^0-9]/g, '');
//     if (value.length > 1) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 3) inputRefs.current[index + 1]?.focus();
//     if (!value && index > 0) inputRefs.current[index - 1]?.focus();
//   };

//   const handleResendOTP = async () => {
//     if (!canResend) return;

//     try {
//       await dispatch(requestOtp({ phoneNumber })).unwrap();
//       setTimer(30);
//       setCanResend(false);
//       setOtp(['', '', '', '']);
//       inputRefs.current[0]?.focus();
//       setShowProfileForm(false);
//     } catch (err) {
//       setErrorMessage('Failed to resend OTP');
//       setErrorModalVisible(true);
//     }
//   };

//   const handleVerifyOTP = async () => {
//     Keyboard.dismiss();
//     const enteredOtp = otp.join('');

//     if (enteredOtp.length !== 4) {
//       setErrorMessage('Please enter complete 4-digit OTP');
//       setErrorModalVisible(true);
//       return;
//     }

//     // Optional serverOtp check (commented out)
//     // if (serverOtp && enteredOtp !== serverOtp.toString()) {
//     //   setErrorMessage('Incorrect OTP');
//     //   setErrorModalVisible(true);
//     //   return;
//     // }

//     if (isNewUser) {
//       setShowProfileForm(true);
//     } else {
//       await performLogin();
//     }
//   };

//   const performLogin = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         phoneNumber,
//         ...(isNewUser && { customerName: name.trim() }),
//         ...(isNewUser && email && { customerEmail: email.trim() }),
//       };
//       await dispatch(customerLogin(payload)).unwrap();
//       navigation.replace('DrawerNavigation');
//     } catch (err) {
//       setErrorMessage(err?.message || 'Login failed. Please try again.');
//       setErrorModalVisible(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmitProfile = () => {
//     if (!name.trim()) {
//       setErrorMessage('Please enter your name');
//       setErrorModalVisible(true);
//       return;
//     }
//     if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setErrorMessage('Please enter a valid email');
//       setErrorModalVisible(true);
//       return;
//     }
//     performLogin();
//   };

//   const maskPhoneNumber = num =>
//     num ? `${num.slice(0, 2)}******${num.slice(-3)}` : '';

//   return (
//     <SafeAreaView style={styles.container} edges={['top']}>
//       <StatusBar
//         translucent
//         backgroundColor="transparent"
//         barStyle="light-content"
//       />

//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
//       >
//         <ScrollView
//           contentContainerStyle={{ flexGrow: 1 }}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//         >
//           <ImageBackground
//             source={require('../assets/lg.png')}
//             style={styles.backgroundImage}
//             resizeMode="cover"
//           >
//             {/* Bottom White Curved Section (same as SignIn) */}
//             <View style={styles.bottomSection}>
//               <Svg
//                 height={responsiveHeight(70)}
//                 width="100%"
//                 viewBox="0 0 393 576"
//                 preserveAspectRatio="none"
//                 style={styles.curve}
//               >
//                 <Defs>
//                   <Filter
//                     id="filter0_d_35_4416"
//                     x="-42.0811"
//                     y="0"
//                     width="477.163"
//                     height="735.962"
//                     filterUnits="userSpaceOnUse"
//                     colorInterpolationFilters="sRGB"
//                   >
//                     <FeFlood floodOpacity="0" result="BackgroundImageFix" />
//                     <FeColorMatrix
//                       in="SourceAlpha"
//                       type="matrix"
//                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//                       result="hardAlpha"
//                     />
//                     <FeOffset dy="-7" />
//                     <FeGaussianBlur stdDeviation="10" />
//                     <FeComposite in2="hardAlpha" operator="out" />
//                     <FeColorMatrix
//                       type="matrix"
//                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
//                     />
//                     <FeBlend
//                       mode="normal"
//                       in2="BackgroundImageFix"
//                       result="effect1_dropShadow_35_4416"
//                     />
//                     <FeBlend
//                       mode="normal"
//                       in="SourceGraphic"
//                       in2="effect1_dropShadow_35_4416"
//                       result="shape"
//                     />
//                   </Filter>
//                 </Defs>
//                 <G filter="url(#filter0_d_35_4416)">
//                   <Path
//                     d="M79.6416 72.9354C28.1047 44.4338 -9.64722 61.0598 -22.0811 72.9354V722.962H405.536L415.082 92.1732C401.743 95.2047 379.263 79.7585 374.463 72.9354C350.816 50.4968 326.21 38.3269 316.863 35.0468C247.136 9.5815 205.573 50.7333 178.926 72.9354C167.305 84.8111 131.179 101.437 79.6416 72.9354Z"
//                     fill="white"
//                   />
//                 </G>
//               </Svg>

//               {/* Solid white behind curve (no black gap) */}
//               <View style={styles.whiteBackground} />

//               {/* MAIN CONTENT: same layout as SignIn, but OTP UI inside */}
//               <View style={styles.contentContainer}>
//                 {/* Title & subtitle for OTP */}
//                 <Text style={styles.title} includeFontPadding={false}>
//                   Enter OTP
//                 </Text>
//                 <Text style={styles.subtitle} includeFontPadding={false}>
//                   Enter the OTP sent to {maskPhoneNumber(phoneNumber)}
//                 </Text>

//                 {/* OTP part (unchanged logic) */}
//                 {!showProfileForm ? (
//                   <>
//                     <View style={styles.otpContainer}>
//                       {otp.map((digit, index) => (
//                         <TextInput
//                           key={index}
//                           ref={ref => (inputRefs.current[index] = ref)}
//                           style={styles.otpInput}
//                           value={digit}
//                           onChangeText={text => handleOtpChange(text, index)}
//                           keyboardType="number-pad"
//                           maxLength={1}
//                           textAlign="center"
//                           selectTextOnFocus
//                         />
//                       ))}
//                     </View>

//                     <View style={styles.resendContainer}>
//                       <Text style={styles.resendText} includeFontPadding={false}>
//                         {timer > 0
//                           ? `Resend OTP in ${timer}s`
//                           : 'Didn’t receive OTP?'}
//                       </Text>
//                       <TouchableOpacity
//                         onPress={handleResendOTP}
//                         disabled={!canResend}
//                       >
//                         <Text
//                           style={[
//                             styles.resendLink,
//                             !canResend && styles.resendLinkDisabled,
//                           ]}
//                           includeFontPadding={false}
//                         >
//                           Resend OTP
//                         </Text>
//                       </TouchableOpacity>
//                     </View>

//                     <TouchableOpacity
//                       style={[
//                         styles.verifyButton,
//                         (otp.join('').length !== 4 || loading) &&
//                           styles.verifyButtonDisabled,
//                       ]}
//                       onPress={handleVerifyOTP}
//                       disabled={otp.join('').length !== 4 || loading}
//                       activeOpacity={0.8}
//                     >
//                       {loading ? (
//                         <ActivityIndicator color="#FFFFFF" />
//                       ) : (
//                         <Text
//                           style={styles.verifyButtonText}
//                           includeFontPadding={false}
//                         >
//                           Verify OTP
//                         </Text>
//                       )}
//                     </TouchableOpacity>
//                   </>
//                 ) : (
//                   // New user profile form
//                   <View style={styles.newUserContainer}>
//                     <TextInput
//                       style={styles.nameInput}
//                       placeholder="Enter your name"
//                       placeholderTextColor="#000"
//                       value={name}
//                       onChangeText={setName}
//                       autoCapitalize="words"
//                     />
//                     <TextInput
//                       style={styles.emailInput}
//                       placeholder="Enter your email (optional)"
//                       placeholderTextColor="#000"
//                       value={email}
//                       onChangeText={setEmail}
//                       keyboardType="email-address"
//                       autoCapitalize="none"
//                     />
//                     <TouchableOpacity
//                       style={[
//                         styles.verifyButton,
//                         loading && styles.verifyButtonDisabled,
//                       ]}
//                       onPress={handleSubmitProfile}
//                       disabled={loading}
//                       activeOpacity={0.8}
//                     >
//                       {loading ? (
//                         <ActivityIndicator color="#FFFFFF" />
//                       ) : (
//                         <Text
//                           style={styles.verifyButtonText}
//                           includeFontPadding={false}
//                         >
//                           Continue
//                         </Text>
//                       )}
//                     </TouchableOpacity>
//                   </View>
//                 )}
//               </View>
//             </View>
//           </ImageBackground>
//         </ScrollView>
//       </KeyboardAvoidingView>

//       {/* Error Modal */}
//       <Modal transparent visible={errorModalVisible} animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Ionicons name="close-circle" size={50} color="#D32F2F" />
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
//               <Text
//                 style={styles.modalButtonText}
//                 includeFontPadding={false}
//               >
//                 OK
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// export default OTPVerificationScreen;

// const styles = StyleSheet.create({
//   // layout & background copied from SignIn
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   backgroundImage: {
//     width: '100%',
//     minHeight: height,
//     height: '45%',
//   },
//   bottomSection: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: responsiveHeight(70),
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
//     paddingBottom: responsiveHeight(5),
//     zIndex: 3,
//   },

//   // text styles re-used but with your OTP wording
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

//   // OTP UI (from your original OTP screen)
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: responsiveHeight(3),
//     paddingHorizontal: responsiveWidth(5),
//   },
//   otpInput: {
//     width: responsiveWidth(15),
//     height: responsiveWidth(15),
//     borderWidth: 1.5,
//     borderColor: '#CCCCCC',
//     borderRadius: 8,
//     fontSize: responsiveFontSize(2.8),
//     fontWeight: '600',
//     color: '#000',
//     backgroundColor: '#FFFFFF',
//   },
//   resendContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: responsiveHeight(3.5),
//   },
//   resendText: {
//     fontSize: responsiveFontSize(1.6),
//     color: '#666666',
//     marginRight: 8,
//   },
//   resendLink: {
//     fontSize: responsiveFontSize(1.6),
//     color: '#832729',
//     fontWeight: '600',
//     textDecorationLine: 'underline',
//   },
//   resendLinkDisabled: {
//     color: '#CCCCCC',
//   },
//   verifyButton: {
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
//   verifyButtonDisabled: {
//     backgroundColor: '#CCCCCC',
//     opacity: 0.6,
//   },
//   verifyButtonText: {
//     fontSize: responsiveFontSize(2),
//     fontWeight: '700',
//     color: '#FFFFFF',
//     lineHeight: responsiveFontSize(2.4),
//   },

//   // New user form
//   newUserContainer: {
//     marginTop: responsiveHeight(2),
//     gap: responsiveHeight(2),
//   },
//   nameInput: {
//     borderBottomWidth: 1.5,
//     borderBottomColor: '#CCCCCC',
//     paddingVertical: 10,
//     fontSize: responsiveFontSize(1.9),
//     color: '#000',
//   },
//   emailInput: {
//     borderBottomWidth: 1.5,
//     borderBottomColor: '#CCCCCC',
//     paddingVertical: 10,
//     fontSize: responsiveFontSize(1.9),
//     color: '#000',
//   },

//   // Modal styles (same as your original)
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

import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from 'react-native';
import Svg, {
  Path,
  Defs,
  Filter,
  FeFlood,
  FeColorMatrix,
  FeOffset,
  FeGaussianBlur,
  FeComposite,
  FeBlend,
  G,
} from 'react-native-svg';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {customerLogin, requestOtp} from '../redux/slices/authSlice';

const {height} = Dimensions.get('window');

const ResendTimer = ({ phoneNumber, onResendSuccess, onError }) => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOTP = async () => {
    if (!canResend) return;

    try {
      const response = await dispatch(requestOtp({ phoneNumber })).unwrap();
      onResendSuccess(response.loginotp);

      setTimer(30);
      setCanResend(false);
    } catch (err) {
      onError('Failed to resend OTP');
    }
  };

  return (
    <View style={styles.resendContainer}>
      <Text style={styles.resendText} includeFontPadding={false}>
        {timer > 0 ? `Resend OTP in ${timer}s` : 'Didn’t receive OTP?'}
      </Text>
      <TouchableOpacity onPress={handleResendOTP} disabled={!canResend}>
        <Text
          style={[styles.resendLink, !canResend && styles.resendLinkDisabled]}
          includeFontPadding={false}>
          Resend OTP
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const OTPVerificationScreen = ({navigation, route}) => {
  const {phoneNumber, serverOtp, userInd} = route.params || {};
  const isNewUser = userInd === 0;
  
  // Track the most recent server OTP for validation
  const [currentServerOtp, setCurrentServerOtp] = useState(serverOtp);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const inputRefs = useRef([]);

  const handleOtpChange = (text, index) => {
    const value = text.replace(/[^0-9]/g, '');
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) inputRefs.current[index + 1]?.focus();
    if (!value && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleResendSuccess = (newOtp) => {
    setCurrentServerOtp(newOtp);
    setOtp(['', '', '', '']);
    inputRefs.current[0]?.focus();
    setShowProfileForm(false);
  };

  const handleError = (msg) => {
    setErrorMessage(msg);
    setErrorModalVisible(true);
  };

  const handleVerifyOTP = async () => {
    Keyboard.dismiss();
    const enteredOtp = otp.join('');

    // 1. Check if all fields are filled
    if (enteredOtp.length !== 4) {
      setErrorMessage('Please enter complete 4-digit OTP');
      setErrorModalVisible(true);
      return;
    }

    // 2. High-End Validation: Compare entered OTP with server response
    // We convert both to strings to ensure "9099" === 9099
    if (currentServerOtp && enteredOtp !== currentServerOtp.toString()) {
      setErrorMessage('Please enter correct OTP to proceed'); // Your specific error message
      setErrorModalVisible(true);
      // Optional: Clear OTP fields on failure for better UX
      // setOtp(['', '', '', '']);
      // inputRefs.current[0]?.focus();
      return;
    }

    // 3. Proceed if OTP is correct
    if (isNewUser) {
      setShowProfileForm(true);
    } else {
      await performLogin();
    }
  };
  const performLogin = async () => {
    setLoading(true);
    try {
      const payload = {
        phoneNumber,
        ...(isNewUser && {customerName: name.trim()}),
        ...(isNewUser && email && {customerEmail: email.trim()}),
      };
      await dispatch(customerLogin(payload)).unwrap();
      navigation.replace('DrawerNavigation');
    } catch (err) {
      setErrorMessage(err?.message || 'Login failed. Please try again.');
      setErrorModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProfile = () => {
    if (!name.trim()) {
      setErrorMessage('Please enter your name');
      setErrorModalVisible(true);
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email');
      setErrorModalVisible(true);
      return;
    }
    performLogin();
  };

  const maskPhoneNumber = num =>
    num ? `${num.slice(0, 2)}******${num.slice(-3)}` : '';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}>
 <ScrollView
    contentContainerStyle={{flexGrow: 1}}
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}> 
    <ImageBackground
          source={require('../assets/lg.png')}
          style={styles.backgroundImage}
          resizeMode="cover">
          {/* Bottom White Curved Section (same as SignIn) */}
          <View style={styles.bottomSection}>
            <Svg
              height={responsiveHeight(70)}
              width="100%"
              viewBox="0 0 393 576"
              preserveAspectRatio="none"
              style={styles.curve}>
              <Defs>
                <Filter
                  id="filter0_d_35_4416"
                  x="-42.0811"
                  y="0"
                  width="477.163"
                  height="735.962"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB">
                  <FeFlood floodOpacity="0" result="BackgroundImageFix" />
                  <FeColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <FeOffset dy="-7" />
                  <FeGaussianBlur stdDeviation="10" />
                  <FeComposite in2="hardAlpha" operator="out" />
                  <FeColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
                  />
                  <FeBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_35_4416"
                  />
                  <FeBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_35_4416"
                    result="shape"
                  />
                </Filter>
              </Defs>
              <G filter="url(#filter0_d_35_4416)">
                <Path
                  d="M79.6416 72.9354C28.1047 44.4338 -9.64722 61.0598 -22.0811 72.9354V722.962H405.536L415.082 92.1732C401.743 95.2047 379.263 79.7585 374.463 72.9354C350.816 50.4968 326.21 38.3269 316.863 35.0468C247.136 9.5815 205.573 50.7333 178.926 72.9354C167.305 84.8111 131.179 101.437 79.6416 72.9354Z"
                  fill="white"
                />
              </G>
            </Svg>

            {/* Solid white behind curve (no black gap) */}
            <View style={styles.whiteBackground} />

            {/* MAIN CONTENT: same layout as SignIn, but OTP UI inside */}
            <View style={styles.contentContainer}>
              {/* Title & subtitle for OTP */}
             <Text style={styles.title} includeFontPadding={false}>
    {showProfileForm ? 'Complete Your Profile' : 'Enter OTP'}
  </Text>
  
  <Text style={styles.subtitle} includeFontPadding={false}>
    {showProfileForm 
      ? 'Please provide your details to get started' 
      : `Enter the OTP sent to ${maskPhoneNumber(phoneNumber)}`}
  </Text>

              {/* OTP part (unchanged logic) */}
              {!showProfileForm ? (
                <>
                  <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                      <TextInput
                        key={index}
                        ref={ref => (inputRefs.current[index] = ref)}
                        style={styles.otpInput}
                        value={digit}
                        onChangeText={text => handleOtpChange(text, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        textAlign="center"
                        selectTextOnFocus
                      />
                    ))}
                  </View>

                  <ResendTimer 
                    phoneNumber={phoneNumber}
                    onResendSuccess={handleResendSuccess}
                    onError={handleError}
                  />

                  <TouchableOpacity
                    style={[
                      styles.verifyButton,
                      (otp.join('').length !== 4 || loading) &&
                        styles.verifyButtonDisabled,
                    ]}
                    onPress={handleVerifyOTP}
                    disabled={otp.join('').length !== 4 || loading}
                    activeOpacity={0.8}>
                    {loading ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <Text
                        style={styles.verifyButtonText}
                        includeFontPadding={false}>
                        Verify OTP
                      </Text>
                    )}
                  </TouchableOpacity>
                </>
              ) : (
                // New user profile form
                <View style={styles.newUserContainer}>
                  <TextInput
                    style={styles.nameInput}
                    placeholder="Enter your name"
                    placeholderTextColor="#000"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                  <TextInput
                    style={styles.emailInput}
                    placeholder="Enter your email (optional)"
                    placeholderTextColor="#000"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={[
                      styles.verifyButton,
                      loading && styles.verifyButtonDisabled,
                    ]}
                    onPress={handleSubmitProfile}
                    disabled={loading}
                    activeOpacity={0.8}>
                    {loading ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <Text
                        style={styles.verifyButtonText}
                        includeFontPadding={false}>
                        Continue
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </ImageBackground></ScrollView>
        
       

      </KeyboardAvoidingView>

      {/* Error Modal */}
      <Modal transparent visible={errorModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Ionicons name="close-circle" size={50} color="#D32F2F" />
            <Text style={styles.modalTitle} includeFontPadding={false}>
              Oops!
            </Text>
            <Text style={styles.modalMessage} includeFontPadding={false}>
              {errorMessage}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setErrorModalVisible(false)}
              activeOpacity={0.8}>
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

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width: '100%',
    minHeight: height,
    height: '45%',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: responsiveHeight(70),
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

  // text styles re-used but with your OTP wording
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

  // OTP UI (from your original OTP screen)
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(5),
  },
  otpInput: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    borderWidth: 1.5,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    fontSize: responsiveFontSize(2.8),
    fontWeight: '600',
    color: '#000',
    backgroundColor: '#FFFFFF',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(3.5),
  },
  resendText: {
    fontSize: responsiveFontSize(1.6),
    color: '#666666',
    marginRight: 8,
  },
  resendLink: {
    fontSize: responsiveFontSize(1.6),
    color: '#832729',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  resendLinkDisabled: {
    color: '#CCCCCC',
  },
  verifyButton: {
    backgroundColor: '#832729',
    borderRadius: 8,
    paddingVertical: responsiveHeight(1.8),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verifyButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  verifyButtonText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: responsiveFontSize(2.4),
  },

  // New user form
  newUserContainer: {
    marginTop: responsiveHeight(2),
    gap: responsiveHeight(2),
  },
  nameInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 10,
    fontSize: responsiveFontSize(1.9),
    color: '#000',
  },
  emailInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 10,
    fontSize: responsiveFontSize(1.9),
    color: '#000',
  },

  // Modal styles (same as your original)
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
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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



  
});
