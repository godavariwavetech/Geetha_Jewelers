import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const Splash2 = ({ navigation }) => {
  const handleSkip = () => {
    navigation.replace('OnBoard1');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <ImageBackground
        source={require('../assets/splashbg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            {/* Ring Image at Top */}
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/splashpic.png')}
                style={styles.ringImage}
                resizeMode="contain"
              />
            </View>

            {/* Bottom Text Content */}
            <View style={styles.textContainer}>
              <Text style={styles.welcomeText}>Welcome to</Text>
              <Text style={styles.brandName}>Geetha jewelers</Text>
              <Text style={styles.tagline}>
                Your trusted platform for investing in{'\n'}precious metals
              </Text>

              {/* Forward Arrow Button */}
              <TouchableOpacity
                style={styles.arrowButton}
                onPress={handleSkip}
                activeOpacity={0.8}
              >
               <Icon name="arrow-right" size={20} color="#000" style={styles.arrowIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000000',
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
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  ringImage: {
    width: 200,
    height: 200,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  welcomeText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '400',
    marginBottom: 5,
    textAlign: 'center',
  },
  brandName: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: '400',
    fontStyle: 'italic',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 15,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  arrowButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  arrowIcon: {
    // fontSize: 24,
    color: '#0d4d3d',
    // fontWeight: 'bold',
  },
});

export default Splash2;
