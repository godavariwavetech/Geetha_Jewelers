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
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const ReturnPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#262757" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left-long" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Return Policy</Text>
      </View>

      <ScrollView style={{ padding: 20 }}>
        {/* <Text style={styles.effectiveDate}>Effective Date: 19/07/2025</Text> */}

        <Text style={styles.title}>Return Policy</Text>
...
        <Text style={styles.sectionTitle}>1. Return Time Frame</Text>
        <Text style={styles.content}>
          • Returns accepted within 7 days from delivery{"\n"}
          • Return only if product is unused, undamaged, and in original packaging
        </Text>
...
        <Text style={styles.sectionTitle}>2. How to Return</Text>
        <Text style={styles.content}>
          1. Go to My Orders → Select Order → Return Item{"\n"}
          2. Add reason and attach images{"\n"}
          3. Our team will schedule pickup within 2–3 days
        </Text>
...
        <Text style={styles.sectionTitle}>3. Refund on Returns</Text>
        <Text style={styles.content}>
          • Refunds will be processed after QC verification{"\n"}
          • Refund to original payment method in 5–7 business days
        </Text>
      </ScrollView>
    </View>
  );
};

export default ReturnPolicyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#262757',
    height: responsiveHeight(15),
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: responsiveHeight(3),
    paddingLeft: responsiveWidth(5),
  },
  backButton: {
    width: responsiveWidth(7),
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'left',
    marginLeft: 12,
  },
  effectiveDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    color: '#262757',
  },
  subsectionTitle: {
    fontWeight: '600',
    color: '#333',
  },
  content: {
    fontSize: 14,
    marginTop: 5,
    lineHeight: 24,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
});
