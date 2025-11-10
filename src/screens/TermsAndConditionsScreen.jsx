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

const TermsAndConditionsScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets(); // 👈 Safe area hook

  return (
    <View
      style={[
        styles.container,
        {
          // paddingTop: insets.top, // Safe top padding
          paddingBottom: insets.bottom, // Safe bottom padding
        },
      ]}>
      <StatusBar backgroundColor="rgba(8, 118, 90, 1)" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left-long" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollArea}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: insets.bottom +50}}>
        <Text style={styles.sectionTitle}>Welcome to Geetha Jewelers</Text>
        <Text style={styles.content}>
          These Terms and Conditions outline the rules and regulations for using our app and
          services. By accessing or using Geetha Jewelers, you agree to be bound by these terms.
        </Text>

        <Text style={styles.sectionTitle}>1. General Use</Text>
        <Text style={styles.content}>
          • Our app is designed to make browsing and purchasing exquisite jewelry easier for you.{'\n'}
          • You must use the app responsibly and avoid any activity that could harm our service
          or other users.{'\n'}
          • All content, images, and materials on this app belong to Geetha Jewelers.
        </Text>

        <Text style={styles.sectionTitle}>2. Account & Privacy</Text>
        <Text style={styles.content}>
          • You may need to create an account to place orders or save preferences.{'\n'}
          • Please ensure your login details are secure — you’re responsible for all activity
          on your account.{'\n'}
          • We respect your privacy and protect your data in accordance with our Privacy Policy.
        </Text>

        <Text style={styles.sectionTitle}>3. Orders & Payments</Text>
        <Text style={styles.content}>
          • All orders are subject to availability and confirmation.{'\n'}
          • Prices may vary and are subject to change without prior notice.{'\n'}
          • Payments should be made through the authorized modes available in the app.
        </Text>

        <Text style={styles.sectionTitle}>4. Cancellations & Refunds</Text>
        <Text style={styles.content}>
          • Once an order is confirmed, cancellations may not always be possible.{'\n'}
          • Refunds will be processed only for eligible cases as per our Refund Policy.
        </Text>

        <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
        <Text style={styles.content}>
          Geetha Jewelers is not liable for any indirect, incidental, or consequential damages
          arising from use of our app or services.
        </Text>

        <Text style={styles.sectionTitle}>6. Changes to Terms</Text>
        <Text style={styles.content}>
          We may update these Terms and Conditions from time to time. Please review them
          periodically to stay informed of any changes.
        </Text>

        <Text style={styles.sectionTitle}>7. Contact Us</Text>
        <Text style={styles.content}>
          If you have any questions about these Terms, please reach out to us at:{'\n'}
          <Text style={styles.bold}>support@geethajewelers.com</Text>
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsAndConditionsScreen;

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
  scrollArea: {
    paddingHorizontal: 20,
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