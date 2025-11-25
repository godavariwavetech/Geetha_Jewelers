import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { useSelector } from 'react-redux';

const OnBoard2 = ({ navigation }) => {
  // Change 'Auth' → 'auth' to match your slice name (case-sensitive!)
  const customerId = useSelector((state) => state.Auth.customerId);

  // Auto-skip onboarding if user is already logged in (on screen mount)
  useEffect(() => {
    if (customerId) {
      navigation.replace('TabNavigator');
    }
  }, [customerId, navigation]);

  // This runs when user taps "Next"
  const handleNext = () => {
    if (customerId) {
      // User already exists → go straight to main app
      navigation.replace('TabNavigator');
    } else {
      // User does NOT exist → go to SignIn
      navigation.navigate('SignIn');
    }
  };

  const handleSkip = () => {
    navigation.replace('TabNavigator'); // Skip = go to app without login
  };

  // Prevent flash of onboarding if already logged in
  if (customerId) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ImageBackground
        source={require('../assets/onb2.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.bottomSection}>
          {/* Wave SVG */}
          <Svg
            height={responsiveHeight(38)}
            width="100%"
            viewBox="0 0 393 304"
            preserveAspectRatio="none"
            style={styles.curve}
          >
            <Path
              d="M194.844 46.8314C63.6445 -37.9848 -5.6 11.4913 -23.8223 46.8314L-6.86599 307.145H398.143L416.824 30.266C358.513 91.2276 242.874 77.8808 194.844 46.8314Z"
              fill="white"
            />
          </Svg>

          <View style={styles.whiteBackground} />

          <View style={styles.contentContainer}>
            <Text style={styles.title} includeFontPadding={false}>
              Pure Gold, Trusted Quality
            </Text>
            <Text style={styles.subtitle} includeFontPadding={false}>
              Shop BIS-Hallmarked gold with complete{'\n'}purity assurance.
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.skipButton} onPress={handleSkip} activeOpacity={0.7}>
                <Text style={styles.skipButtonText} includeFontPadding={false}>
                  Skip
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.7}>
                <Text style={styles.nextButtonText} includeFontPadding={false}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default OnBoard2;

// Styles (unchanged)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  bottomSection: { position: 'absolute', bottom: 0, width: '100%', height: responsiveHeight(38), overflow: 'hidden' },
  curve: { position: 'absolute', top: -1, left: 0, zIndex: 2 },
  whiteBackground: { position: 'absolute', top: responsiveHeight(38), left: 0, right: 0, bottom: 0, backgroundColor: '#FFFFFF', zIndex: 1 },
  contentContainer: {
    position: 'absolute',
    top: responsiveHeight(13),
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: responsiveWidth(8),
    alignItems: 'center',
    zIndex: 3,
  },
  title: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: responsiveHeight(1),
    letterSpacing: 0.3,
    lineHeight: responsiveFontSize(3.2),
  },
  subtitle: {
    fontSize: responsiveFontSize(1.7),
    color: '#555555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: responsiveHeight(3),
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: 12 },
  skipButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#0A5C4A',
    borderRadius: 6,
    paddingVertical: responsiveHeight(1.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButtonText: { fontSize: responsiveFontSize(1.8), fontWeight: '600', color: '#0A5C4A' },
  nextButton: {
    flex: 1,
    backgroundColor: '#0A5C4A',
    borderRadius: 6,
    paddingVertical: responsiveHeight(1.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: { fontSize: responsiveFontSize(1.8), fontWeight: '600', color: '#FFFFFF' },
});