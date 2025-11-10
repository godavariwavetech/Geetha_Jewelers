import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const TierBenefitsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <StatusBar backgroundColor="#411919" barStyle="light-content" />

      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 30, paddingTop: insets.top },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.header}>
            {/* Back Icon */}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Icon name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>

            <Image
              source={require('../assets/uptop-logo2.png')}
              style={styles.logo}
            />
            <Text style={styles.description}>
              Café Coffee Day’s loyalty program. Earn Beans on purchases. Enjoy
              birthday rewards, discounts, and personalized offers exclusively
              for loyal members.
            </Text>
          </View>

          {/* Tiers Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tiers Benefits</Text>

            <View style={styles.tierContainer}>
              {/* Red Tier */}
              <View style={[styles.tierCard, { backgroundColor: '#C30612' }]}>
                <View style={styles.tierHeader}>
                  <Text style={styles.tierTitle}>🔴 RED TIER</Text>
                  <Text style={styles.tierRange}>₹0 - ₹3999</Text>
                </View>

                <View style={styles.benefitContainerRed}>
                  <Text style={styles.benefit}>💰 Earning - 5% beans back</Text>
                  <Text style={styles.benefit}>🎟 Redeem - 1 bean = ₹1</Text>
                </View>
                <View style={styles.benefitContainerRed}>
                  <Text style={styles.benefit}>
                    ✨ Earn 5% of Beans on each transaction.
                  </Text>
                </View>
              </View>

              {/* Silver Tier */}
              <View style={[styles.tierCard, { backgroundColor: '#737373' }]}>
                <View style={styles.tierHeader}>
                  <Text style={styles.tierTitle}>⚪ SILVER TIER</Text>
                  <Text style={styles.tierRange}>₹4000 - ₹9999</Text>
                </View>

                <View style={styles.benefitContainerSilver}>
                  <Text style={styles.benefit}>
                    💰 Earning - 10% beans back
                  </Text>
                  <Text style={styles.benefit}>🎟 Redeem - 1 bean = ₹1</Text>
                </View>
                <View style={styles.benefitContainerSilver}>
                  <Text style={styles.benefit}>🎂 Birthday Beverage</Text>
                </View>
                <View style={styles.benefitContainerSilver}>
                  <Text style={styles.benefit}>
                    🎁 Exclusive and member-only offers
                  </Text>
                </View>
              </View>

              {/* Gold Tier */}
              <View style={[styles.tierCard, { backgroundColor: '#CC9B00' }]}>
                <View style={styles.tierHeader}>
                  <Text style={styles.tierTitle}>🟡 GOLD TIER</Text>
                  <Text style={styles.tierRange}>₹10000+</Text>
                </View>

                <View style={styles.benefitContainerGold}>
                  <Text style={styles.benefit}>💰 Earning - 10% beans back</Text>
                  <Text style={styles.benefit}>🎟 Redeem - 1 bean = ₹1</Text>
                </View>
                <View style={styles.benefitContainerGold}>
                  <Text style={styles.benefit}>
                    ✨ Earn 5% of Beans on each transaction.
                  </Text>
                </View>
                <View style={styles.benefitContainerGold}>
                  <Text style={styles.benefit}>🎂 Birthday Beverage</Text>
                </View>
                <View style={styles.benefitContainerGold}>
                  <Text style={styles.benefit}>🎁 Special Hamper</Text>
                </View>
                <View style={styles.benefitContainerGold}>
                  <Text style={styles.benefit}>
                    ☕ High-end coffee at same price
                  </Text>
                </View>
                <View style={styles.benefitContainerGold}>
                  <Text style={styles.benefit}>
                    🎉 Exclusive and member-only offers
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#411919',
  },
  scrollContent: { flexGrow: 1 },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#411919',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 40,
  },
  description: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
  },
  section: {
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  tierContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
  },
  tierCard: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  tierTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  tierRange: {
    fontSize: 14,
    color: '#fff',
  },
  benefit: {
    fontSize: 14,
    color: '#fff',
    marginVertical: 2,
  },
  benefitContainerRed: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  benefitContainerSilver: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  benefitContainerGold: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
});

export default TierBenefitsScreen;
