import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  Platform,
} from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Splash2');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#832729"
        translucent={false}
      />
      <ImageBackground
        source={require('../assets/splash.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.brandName}>Geeta jewelers</Text>
            <Text style={styles.tagline}>
              Your trusted platform for investing in{'\n'}precious metals
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#0d4d3d',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  welcomeText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '400',
    marginBottom: 8,
    textAlign: 'center',
  },
  brandName: {
    fontSize: 42,
    color: '#FFFFFF',
    fontWeight: '400',
    fontStyle: 'italic',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 30,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default SplashScreen;
