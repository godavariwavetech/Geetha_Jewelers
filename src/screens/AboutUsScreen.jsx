import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const AboutUsScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="rgba(8, 118, 90, 1)" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left-long" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
      </View>

      {/* Content */}
      <ScrollView 
        style={{ paddingHorizontal: 20, paddingTop: 20 }} 
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Welcome to Geetha Jewelers</Text>
        <Text style={styles.content}>
          At <Text style={styles.bold}>Geetha Jewelers</Text>, we celebrate timeless elegance and 
          cherished traditions. Whether you're seeking a sparkling engagement ring or a 
          heirloom necklace, our goal is to make every piece a symbol of beauty, love, and legacy.
        </Text>

        <Text style={styles.sectionTitle}>Our Story</Text>
        <Text style={styles.content}>
          Founded with a passion for exquisite craftsmanship, Geetha Jewelers began as a family-run 
          atelier and has grown into a trusted name in fine jewelry. From sourcing the finest gold 
          and diamonds to intricate designs, every creation reflects generations of artistry and dedication.
        </Text>

        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.content}>
          To adorn life's most precious moments with unparalleled quality, ethical sourcing, 
          and personalized service — blending tradition with modern sophistication for jewelry that endures.
        </Text>

        <Text style={styles.sectionTitle}>What We Offer</Text>
        <Text style={styles.content}>
          • Handcrafted gold and diamond jewelry{'\n'}
          • Custom designs tailored to your vision{'\n'}
          • Ethical gems and certified stones{'\n'}
          • Expert consultations and lifetime care
        </Text>

        <Text style={styles.sectionTitle}>Why Choose Us</Text>
        <Text style={styles.content}>
          Because jewelry is more than adornment — it’s a story, a milestone, a legacy. 
          We take pride in curating pieces that sparkle with meaning, backed by trust, 
          transparency, and the warmth of family-owned excellence.
        </Text>

        <Text style={styles.sectionTitle}>Visit Us</Text>
        <Text style={styles.content}>
          Step into Geetha Jewelers and discover the perfect piece to cherish forever. 
          Whether for a special occasion or everyday elegance — 
          our collection awaits to make your moments shine.
        </Text>
      </ScrollView>
    </View>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'rgba(8, 118, 90, 1)',
    height: responsiveHeight(15),
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: responsiveHeight(3),
    paddingLeft: responsiveWidth(5),
  },
  backButton: {
    width: responsiveWidth(7),
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'left',
    marginLeft: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    color: 'rgba(8, 118, 90, 1)',
  },
  content: {
    fontSize: 14,
    marginTop: 5,
    lineHeight: 24,
    color: '#555',
  },
  bold: {
    fontWeight: '600',
    color: 'rgba(8, 118, 90, 1)',
  },
});