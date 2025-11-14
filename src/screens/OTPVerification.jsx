
import React, { useState, useRef, useEffect } from 'react';
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
  KeyboardAvoidingView,
  Platform,
  Modal,
  ScrollView,
  Keyboard,
} from 'react-native';
import Svg, { Path, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend, G } from 'react-native-svg';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const OTPVerificationScreen = ({ navigation, route }) => {
  const { phoneNumber } = route.params || {};
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(23);
  const [canResend, setCanResend] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const inputRefs = useRef([]);

  // Timer countdown
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle OTP input change
  const handleOtpChange = (text, index) => {
    const numericText = text.replace(/[^0-9]/g, '');
    
    if (numericText.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = numericText;
      setOtp(newOtp);

      // Auto focus next input
      if (numericText && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP
  const handleVerifyOTP = () => {
    Keyboard.dismiss();
    const otpValue = otp.join('');

    if (otpValue.length !== 4) {
      setErrorMessage('Please enter complete 4-digit OTP');
      setErrorModalVisible(true);
      return;
    }

    // Add your OTP verification logic here
    console.log('Verifying OTP:', otpValue);
    navigation.navigate('TabNavigator');
  };

  // Resend OTP
  const handleResendOTP = () => {
    if (canResend) {
      setTimer(23);
      setCanResend(false);
      setOtp(['', '', '', '']);
      inputRefs.current[0]?.focus();
      console.log('Resending OTP to:', phoneNumber);
      // Add your resend OTP logic here
    }
  };

  // Mask phone number for display
  const maskPhoneNumber = (number) => {
    if (!number) return '8*********2';
    const masked = number.substring(0, 1) + '*********' + number.substring(9);
    return masked;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <ImageBackground
            source={require('../assets/lg.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <View style={styles.bottomSection}>
              {/* SVG Wave with Shadow */}
              <Svg
                height={responsiveHeight(68)}
                width="100%"
                viewBox="0 0 393 576"
                preserveAspectRatio="none"
                style={styles.curve}
              >
                <Defs>
                  <Filter
                    id="filter0_d_35_4416"
                    x="-42.0811"
                    y="0"
                    width="477.163"
                    height="735.962"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
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

              {/* White Background */}
              <View style={styles.whiteBackground} />

              {/* Content Container */}
              <View style={styles.contentContainer}>
                <Text style={styles.title} includeFontPadding={false}>
                  Enter OTP
                </Text>
                <Text style={styles.subtitle} includeFontPadding={false}>
                  Enter the OTP sent to your phone number {maskPhoneNumber(phoneNumber)}
                </Text>

                {/* OTP Input Boxes */}
                <View style={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={(ref) => (inputRefs.current[index] = ref)}
                      style={styles.otpInput}
                      value={digit}
                      onChangeText={(text) => handleOtpChange(text, index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      keyboardType="number-pad"
                      maxLength={1}
                      selectTextOnFocus
                      textAlign="center"
                    />
                  ))}
                </View>

                {/* Resend OTP Section */}
                <View style={styles.resendContainer}>
                  <Text style={styles.resendText} includeFontPadding={false}>
                    Resend OTP in {timer}s
                  </Text>
                  <TouchableOpacity
                    onPress={handleResendOTP}
                    disabled={!canResend}
                    activeOpacity={0.7}
                  >
                    <Text 
                      style={[
                        styles.resendLink,
                        !canResend && styles.resendLinkDisabled
                      ]} 
                      includeFontPadding={false}
                    >
                      Resend OTP
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Verify Button */}
                <TouchableOpacity
                  style={[
                    styles.verifyButton,
                    otp.join('').length !== 4 && styles.verifyButtonDisabled
                  ]}
                  onPress={handleVerifyOTP}
                  activeOpacity={0.8}
                  disabled={otp.join('').length !== 4}
                >
                  <Text style={styles.verifyButtonText} includeFontPadding={false}>
                    Verify
                  </Text>
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
              Invalid OTP
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

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    // minHeight: height,
    height:"50%"
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: responsiveHeight(60),
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
    top: responsiveHeight(18),
    left: 0,
    right: 0,
    paddingHorizontal: responsiveWidth(8),
    paddingBottom: responsiveHeight(3),
    zIndex: 3,
  },
  title: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: responsiveHeight(0.8),
    lineHeight: responsiveFontSize(3.4),
  },
  subtitle: {
    fontSize: responsiveFontSize(1.7),
    color: '#666666',
    marginBottom: responsiveHeight(4),
    lineHeight: responsiveFontSize(2.3),
  },
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
    color: '#0A5C4A',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  resendLinkDisabled: {
    color: '#CCCCCC',
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
    lineHeight: responsiveFontSize(2.4),
  },
  
  // Modal Styles
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
    backgroundColor: '#0A5C4A',
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


