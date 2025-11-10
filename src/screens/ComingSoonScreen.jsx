import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const RewardScannerScreen = () => {
  const [time, setTime] = useState(30);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRetry = () => {
    setTime(30);
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Top Logo (fixed, not vertically centered) */}
      <Image
        source={require('../assets/uptoplogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Centered Content */}
      <View style={styles.contentBox}>
        <Text style={styles.headerText}>
          Show this scanner at our branch to get reward
        </Text>

        <Image
          source={require('../assets/scannerblack.png')}
          style={styles.scannerImage}
        />

        <Text style={styles.noteText}>
          Once the branch staff scans this code, your reward will be activated!
        </Text>

        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{time}s</Text>
          <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
            <Icon name="reload" size={22} color="#fff" />
            <Text style={styles.retryText}>Try</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          Keep this screen visible until the scan completes
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 80,
    marginTop: 10, // minimal top padding only
    // marginBottom: 10, // slight space before main content
  },
  contentBox: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#411919',
    marginBottom: 25,
  },
  scannerImage: {
    width: 230,
    height: 230,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#411919',
    marginBottom: 25,
  },
  noteText: {
    textAlign: 'center',
    color: '#411919',
    fontSize: 14,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 30,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#411919',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#411919',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 6,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 14,
    color: '#411919',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default RewardScannerScreen;
