import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const moreMenu = [
  { label: 'My Profile', icon: 'account-outline', route: 'Profile1' },
  { label: 'My Addresses', icon: 'map-marker-outline', route: 'MyAddresses' }, 
  // { label: 'Notifications', icon: 'bell-outline' },
  // { label: 'News', icon: 'bullhorn-outline' },
  { label: 'My Orders', icon: 'package-variant-closed', route: 'MyOrders'},
  // { label: 'My Offers', icon: 'ticket-percent-outline' },
  // { label: 'Write To Us', icon: 'phone-outline' },
  // { label: 'Settings', icon: 'cog-outline' },
  { label: 'About Us', icon: 'information-outline', route: 'AboutUsScreen' },
  { label: 'Terms & Conditions', icon: 'file-document-outline', route: 'TermsAndConditionsScreen' },
];
function More({ navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top+10, paddingBottom: insets.bottom }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      {/* Top Bar */}
      <View style={[styles.header, styles.headerShadow]}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color="rgba(8, 118, 90, 1)" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header Section */}
        {/* <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitial}>U</Text>
            </View>
          </View>
          <Text style={styles.userName}>User Name</Text>
          <Text style={styles.userEmail}>user@example.com</Text>
        </View> */}

        {/* Menu Items */}
        {moreMenu.map((item, idx) => (
          <View key={item.label}>
            <TouchableOpacity
              style={[styles.listItem, styles.listItemShadow]}
              activeOpacity={0.7}
              onPress={() => navigation?.navigate(item.route)}
            >
              <View style={styles.iconLabelRow}>
                <View style={styles.iconWrapper}>
                  <MaterialCommunityIcons
                    name={item.icon}
                    color="rgba(8, 118, 90, 1)"
                    size={24}
                  />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                color="#ccc"
                size={20}
              />
            </TouchableOpacity>
            {idx !== moreMenu.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: 18,
    paddingBottom: 18,
    paddingHorizontal: 20,
    // backgroundColor: '#fff',
    // borderBottomWidth: 1,
    // borderBottomColor: '#e9ecef',
  },
  headerShadow: {
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  backButton: {
    padding: 4,
  },
  headerText: {
    fontWeight: '800',
    fontSize: 20,
    color: 'rgba(8, 118, 90, 1)',
    marginLeft: 12,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(8, 118, 90, 0.1)',
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(8, 118, 90, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(8, 118, 90, 0.2)',
  },
  avatarInitial: {
    color: 'rgba(8, 118, 90, 1)',
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#32190a',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 4,
    borderRadius: 12,
  },
  listItemShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  iconLabelRow: { 
    flexDirection: 'row', 
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(8, 118, 90, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 16,
    color: '#32190a',
    fontWeight: '500',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1eceb',
    marginHorizontal: 20,
    opacity: 0.5,
  },
});

export default More;