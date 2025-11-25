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
// } from 'react-native';
// import Svg, { Path, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend, G } from 'react-native-svg';
// import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useDispatch } from 'react-redux';
// import { customerLogin, requestOtp } from '../redux/slices/authSlice';
// const OTPVerificationScreen = ({ navigation, route }) => {
//   const { phoneNumber, serverOtp, userInd } = route.params || {};
//   const isNewUser = userInd === 0;
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [timer, setTimer] = useState(30);
//   const [canResend, setCanResend] = useState(false);
//   const [showProfileForm, setShowProfileForm] = useState(false); // Controls visibility
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
//       setTimer((prev) => {
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
//       const res = await dispatch(requestOtp({ phoneNumber })).unwrap();
//       setTimer(30);
//       setCanResend(false);
//       setOtp(['', '', '', '']);
//       inputRefs.current[0]?.focus();
//       setShowProfileForm(false); // Reset form if resending
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

//     // Optional: Remove serverOtp check entirely if you don't want validation
//     // Or keep only for debugging
//     // if (serverOtp && enteredOtp !== serverOtp.toString()) {
//     //   setErrorMessage('Incorrect OTP');
//     //   setErrorModalVisible(true);
//     //   return;
//     // }

//     if (isNewUser) {
//       // New user → Show name & email form
//       setShowProfileForm(true);
//     } else {
//       // Existing user → Login directly
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
//       navigation.replace('TabNavigator'); // Your main screen
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
//   }
//   const maskPhoneNumber = (num) => num ? `${num.slice(0, 2)}******${num.slice(-3)}` : '';
//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
//         <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
//           <ImageBackground source={require('../assets/lg.png')} style={styles.backgroundImage} resizeMode="cover">
//             <View style={styles.bottomSection}>
//               <Svg height={responsiveHeight(68)} width="100%" viewBox="0 0 393 576" style={styles.curve}>
//                 <Defs>
//                     <Filter id="filter0_d_35_4416" x="-42.0811" y="0" width="477.163" height="735.962">
//                     <FeFlood floodOpacity="0" result="BackgroundImageFix" />
//                     <FeColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
//                     <FeOffset dy="-7" />
//                     <FeGaussianBlur stdDeviation="10" />
//                     <FeComposite in2="hardAlpha" operator="out" />
//                     <FeColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
//                     <FeBlend in2="BackgroundImageFix" result="effect1_dropShadow_35_4416" />
//                     <FeBlend in="SourceGraphic" in2="effect1_dropShadow_35_4416" result="shape" />
//                   </Filter>
//                 </Defs>
//                 <G filter="url(#filter0_d_35_4416)">
//                   <Path d="M79.6416 72.9354C28.1047 44.4338 -9.64722 61.0598 -22.0811 72.9354V722.962H405.536L415.082 92.1732C401.743 95.2047 379.263 79.7585 374.463 72.9354C350.816 50.4968 326.21 38.3269 316.863 35.0468C247.136 9.5815 205.573 50.7333 178.926 72.9354C167.305 84.8111 131.179 101.437 79.6416 72.9354Z" fill="white" />
//                 </G>
//               </Svg>

//               <View style={styles.whiteBackground} />

//               <View style={styles.contentContainer}>
//                 <Text style={styles.title}>Enter OTP</Text>
//                 <Text style={styles.subtitle}>
//                   Enter the OTP sent to {maskPhoneNumber(phoneNumber)}
//                 </Text>

//                 {/* Show OTP Input Only if Profile Form is NOT shown */}
//                 {!showProfileForm ? (
//                   <>
//                     <View style={styles.otpContainer}>
//                       {otp.map((digit, index) => (
//                         <TextInput
//                           key={index}
//                           ref={(ref) => (inputRefs.current[index] = ref)}
//                           style={styles.otpInput}
//                           value={digit}
//                           onChangeText={(text) => handleOtpChange(text, index)}
//                           keyboardType="number-pad"
//                           maxLength={1}
//                           textAlign="center"
//                           selectTextOnFocus
//                         />
//                       ))}
//                     </View>
//                     <View style={styles.resendContainer}>
//                       <Text style={styles.resendText}>
//                         {timer > 0 ? `Resend OTP in ${timer}s` : 'Didn’t receive OTP?'}
//                       </Text>
//                       <TouchableOpacity onPress={handleResendOTP} disabled={!canResend}>
//                         <Text style={[styles.resendLink, !canResend && styles.resendLinkDisabled]}>
//                           Resend OTP
//                         </Text>
//                       </TouchableOpacity>
//                     </View>
//                     <TouchableOpacity
//                       style={[
//                         styles.verifyButton,
//                         (otp.join('').length !== 4 || loading) && styles.verifyButtonDisabled,
//                       ]}
//                       onPress={handleVerifyOTP}
//                       disabled={otp.join('').length !== 4 || loading}
//                     >
//                       {loading ? (
//                         <ActivityIndicator color="#FFFFFF" />
//                       ) : (
//                         <Text style={styles.verifyButtonText}>Verify OTP </Text>
//                       )}
//                     </TouchableOpacity>
//                   </>
//                 ) : (
//                   /* Show Name & Email Form for New User */
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
//                         placeholderTextColor="#000"
//                       value={email}
//                       onChangeText={setEmail}
//                       keyboardType="email-address"
//                       autoCapitalize="none"
//                     />
//                     <TouchableOpacity
//                       style={[styles.verifyButton, loading && styles.verifyButtonDisabled]}
//                       onPress={handleSubmitProfile}
//                       disabled={loading}
//                     >
//                       {loading ? (
//                         <ActivityIndicator color="#FFFFFF" />
//                       ) : (
//                         <Text style={styles.verifyButtonText}>Continue</Text>
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
//             <Text style={styles.modalTitle}>Oops!</Text>
//             <Text style={styles.modalMessage}>{errorMessage}</Text>
//             <TouchableOpacity style={styles.modalButton} onPress={() => setErrorModalVisible(false)}>
//               <Text style={styles.modalButtonText}>OK</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };
// export default OTPVerificationScreen;
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
//     top: responsiveHeight(18),
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
//     marginBottom: responsiveHeight(0.8),
//     lineHeight: responsiveFontSize(3.4),
//   },
//   subtitle: {
//     fontSize: responsiveFontSize(1.7),
//     color: '#666666',
//     marginBottom: responsiveHeight(4),
//     lineHeight: responsiveFontSize(2.3),
//   },
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
//     color: '#0A5C4A',
//     fontWeight: '600',
//     textDecorationLine: 'underline',
//   },
//   resendLinkDisabled: {
//     color: '#CCCCCC',
//   },
//   verifyButton: {
//     backgroundColor: '#0A5C4A',
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
//     backgroundColor: '#0A5C4A',
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
import React, { useState, useRef, useEffect } from 'react';
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
  Dimensions,
  StatusBar,
} from 'react-native';
import Svg, { Path, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend, G } from 'react-native-svg';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { customerLogin, requestOtp } from '../redux/slices/authSlice';

const { height } = Dimensions.get('window');

const OTPVerificationScreen = ({ navigation, route }) => {
  const { phoneNumber, serverOtp, userInd } = route.params || {};
  const isNewUser = userInd === 0;

  // Safeguard: Navigate back if no phoneNumber
  useEffect(() => {
    if (!phoneNumber) {
      navigation.goBack();
    }
  }, [phoneNumber, navigation]);

  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const inputRefs = useRef([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard listeners to ensure scroll to bottom or focused area when keyboard shows
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  const handleOtpChange = (text, index) => {
    const value = text.replace(/[^0-9]/g, '');
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) inputRefs.current[index + 1]?.focus();
    if (!value && index > 0) inputRefs.current[index - 1]?.focus();

    // Scroll to the OTP container when typing
    if (value) {
      scrollRef.current?.scrollTo({ y: 100, animated: true }); // Approximate position for OTP
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    try {
      await dispatch(requestOtp({ phoneNumber })).unwrap();
      setTimer(30);
      setCanResend(false);
      setOtp(['', '', '', '']);
      inputRefs.current[0]?.focus();
      setShowProfileForm(false);
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    } catch (err) {
      setErrorMessage('Failed to resend OTP');
      setErrorModalVisible(true);
    }
  };

  const handleVerifyOTP = async () => {
    Keyboard.dismiss();
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      setErrorMessage('Please enter complete 4-digit OTP');
      setErrorModalVisible(true);
      return;
    }

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
        ...(isNewUser && { customerName: name.trim() }),
        ...(isNewUser && email && { customerEmail: email.trim() }),
      };
      await dispatch(customerLogin(payload)).unwrap();
      navigation.replace('TabNavigator');
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

  const maskPhoneNumber = (num) => num ? `${num.slice(0, 2)}******${num.slice(-3)}` : '';

  // Helper to scroll to a specific input
  const scrollToInput = (inputIndex) => {
    // Approximate y positions; adjust based on your layout if needed
    const positions = { otp: 150, name: 200, email: 300 };
    scrollRef.current?.scrollTo({ y: positions[inputIndex] || 0, animated: true });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
        enabled
      >
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* Top Image Section - now scrolls with content */}
          <View style={styles.topSection}>
            <ImageBackground
              source={require('../assets/lg.png')}
              style={styles.backgroundImage}
              resizeMode="cover"
            />
          </View>

          {/* Bottom Section with Curve and White Content */}
          <View style={styles.bottomSection}>
            {/* Curve SVG positioned to overlap image for seamless connection */}
            <View style={styles.curveContainer}>
              <Svg
                height={responsiveHeight(25)} // Slightly reduced for better fit
                width="100%"
                viewBox="0 0 393 200"
                preserveAspectRatio="none"
              >
                <Defs>
                  <Filter
                    id="filter0_d_35_4416"
                    x="-42.0811"
                    y="0"
                    width="477.163"
                    height="735.962"
                  >
                    <FeFlood floodOpacity="0" result="BackgroundImageFix" />
                    <FeColorMatrix
                      in="SourceAlpha"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <FeOffset dy="-7" />
                    <FeGaussianBlur stdDeviation="10" />
                    <FeComposite in2="hardAlpha" operator="out" />
                    <FeColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
                    <FeBlend
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_35_4416"
                    />
                    <FeBlend
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
            </View>

            <View style={styles.whiteBackground}>
              <View style={styles.contentContainer}>
                <Text style={styles.title} includeFontPadding={false}>
                  Enter OTP
                </Text>
                <Text style={styles.subtitle} includeFontPadding={false}>
                  Enter the OTP sent to {maskPhoneNumber(phoneNumber)}
                </Text>

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
                          onFocus={() => scrollToInput('otp')}
                          keyboardType="number-pad"
                          maxLength={1}
                          textAlign="center"
                          selectTextOnFocus
                        />
                      ))}
                    </View>

                    <View style={styles.resendContainer}>
                      <Text style={styles.resendText}>
                        {timer > 0
                          ? `Resend OTP in ${timer}s`
                          : "Didn't receive OTP?"}
                      </Text>
                      <TouchableOpacity
                        onPress={handleResendOTP}
                        disabled={!canResend}
                      >
                        <Text
                          style={[
                            styles.resendLink,
                            !canResend && styles.resendLinkDisabled,
                          ]}
                        >
                          Resend OTP
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.verifyButton,
                        (otp.join('').length !== 4 || loading) &&
                          styles.verifyButtonDisabled,
                      ]}
                      onPress={handleVerifyOTP}
                      disabled={otp.join('').length !== 4 || loading}
                    >
                      {loading ? (
                        <ActivityIndicator color="#FFFFFF" size="small" />
                      ) : (
                        <Text style={styles.verifyButtonText}>
                          Verify OTP
                        </Text>
                      )}
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={styles.newUserContainer}>
                    <TextInput
                      style={styles.nameInput}
                      placeholder="Enter your name"
                      placeholderTextColor="#999"
                      value={name}
                      onChangeText={setName}
                      onFocus={() => scrollToInput('name')}
                      autoCapitalize="words"
                    />
                    <TextInput
                      style={styles.emailInput}
                      placeholder="Enter your email (optional)"
                      placeholderTextColor="#999"
                      value={email}
                      onChangeText={setEmail}
                      onFocus={() => scrollToInput('email')}
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
                    >
                      {loading ? (
                        <ActivityIndicator color="#FFFFFF" size="small" />
                      ) : (
                        <Text style={styles.verifyButtonText}>Continue</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Single Error Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={errorModalVisible}
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Ionicons name="close-circle" size={50} color="#D32F2F" />
            <Text style={styles.modalTitle}>Oops!</Text>
            <Text style={styles.modalMessage}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setErrorModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
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
  scrollContentContainer: {
    flexGrow: 1,
    backgroundColor: '#fff', // Ensure seamless background
  },
  topSection: {
    height: responsiveHeight(50), // Top half for image - scrolls with content
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  bottomSection: {
    position: 'relative',
    width: '100%',
    backgroundColor: 'transparent', // Allow curve to show through
  },
  curveContainer: {
    position: 'absolute',
    top: -responsiveHeight(20), // Overlap with image to eliminate white space
    left: 0,
    right: 0,
    zIndex: 2,
  },
  whiteBackground: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24, // Rounded top corners to blend with curve
    borderTopRightRadius: 24,
    overflow: 'hidden',
    marginTop: responsiveHeight(5), // Adjust to account for curve overlap
  },
  contentContainer: {
    paddingHorizontal: responsiveWidth(8),
    // paddingTop: responsiveHeight(2),/ // Reduced significantly to remove unwanted margin above content
    paddingBottom: responsiveHeight(10), // Bottom padding for content
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(8),
  },
  otpInput: {
    width: responsiveWidth(16),
    height: responsiveWidth(16),
    borderWidth: 1.5,
    borderColor: '#CCCCCC',
    borderRadius: 12,
    fontSize: responsiveFontSize(3),
    fontWeight: '600',
    color: '#000',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(4),
  },
  resendText: {
    fontSize: responsiveFontSize(1.7),
    color: '#666666',
    marginRight: 8,
  },
  resendLink: {
    fontSize: responsiveFontSize(1.7),
    color: '#0A5C4A',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  resendLinkDisabled: {
    color: '#999',
  },
  verifyButton: {
    backgroundColor: '#0A5C4A',
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
  verifyButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  verifyButtonText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  newUserContainer: {
    marginTop: responsiveHeight(2),
  },
  nameInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 12,
    fontSize: responsiveFontSize(1.9),
    color: '#000',
    marginBottom: responsiveHeight(3),
  },
  emailInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 12,
    fontSize: responsiveFontSize(1.9),
    color: '#000',
    marginBottom: responsiveHeight(4),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: '700',
    color: '#1A1A1A',
    marginVertical: 12,
  },
  modalMessage: {
    fontSize: responsiveFontSize(1.9),
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#0A5C4A',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },
});