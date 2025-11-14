
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

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Phone number validation function
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number format
    return phoneRegex.test(number);
  };

  // THIS IS THE ONLY FUNCTION THAT NAVIGATES - ONLY CALLED FROM SEND OTP BUTTON
  const handleSendOTP = () => {
    // Dismiss keyboard first
    Keyboard.dismiss();

    // Validation checks - Navigation ONLY happens if ALL pass
    if (!phoneNumber || phoneNumber.trim() === '') {
      setErrorMessage('Please enter your mobile number');
      setErrorModalVisible(true);
      return; // STOPS here - no navigation
    }

    if (phoneNumber.length !== 10) {
      setErrorMessage('Mobile number must be 10 digits');
      setErrorModalVisible(true);
      return; // STOPS here - no navigation
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setErrorMessage('Please enter a valid mobile number');
      setErrorModalVisible(true);
      return; // STOPS here - no navigation
    }

    // ONLY NAVIGATES IF ALL VALIDATIONS PASS
    console.log('Navigation triggered with phone:', phoneNumber);
    navigation.navigate('OTPVerification', { phoneNumber });
  };

  const handlePhoneNumberChange = (text) => {
    // Only allow numbers
    const numericText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(numericText);
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
                  login / Sign up
                </Text>
                <Text style={styles.subtitle} includeFontPadding={false}>
                  Enter Mobile number for OTP
                </Text>

                {/* Phone Number Input */}
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
                    onSubmitEditing={handleSendOTP} // Allows keyboard "done" to trigger
                  />
                </View>

                {/* Terms Text */}
                <Text style={styles.termsText} includeFontPadding={false}>
                  By Continuing, I agree to{' '}
                  <Text style={styles.termsLink}>Terms of use</Text>
                  {' & '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>

                {/* Send OTP Button - ONLY WAY TO NAVIGATE */}
                <TouchableOpacity
                  style={[
                    styles.sendOTPButton,
                    phoneNumber.length !== 10 && styles.sendOTPButtonDisabled
                  ]}
                  onPress={handleSendOTP} // Only navigation trigger point
                  activeOpacity={0.8}
                  disabled={phoneNumber.length !== 10} // Button disabled if not 10 digits
                >
                  <Text style={styles.sendOTPButtonText} includeFontPadding={false}>
                    Send OTP
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
              Invalid Input
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

export default LoginScreen;

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
    top: responsiveHeight(20),
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
    color: '#0A5C4A',
    fontWeight: '600',
  },
  sendOTPButton: {
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

