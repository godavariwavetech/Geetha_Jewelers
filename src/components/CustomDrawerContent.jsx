// components/CustomDrawerContent.js

import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import VersionCheck from 'react-native-version-check';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../config/theme';
import { actionLogout, getUserProfileDetails } from '../redux/slices/authSlice'; // Import thunk & logout
import Feather from 'react-native-vector-icons/Feather';

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();

  // Get user ID from auth state (set during login)
  const userId = useSelector((state) => state.Auth.customerId);
  const customerProfile = useSelector((state) => state.Auth.customerProfile);
  const loading = useSelector((state) => state.Auth.loading);

  const [version, setVersion] = React.useState('');

  // Fetch app version
  useEffect(() => {
    setVersion(VersionCheck.getCurrentVersion());
  }, []);

  // Fetch user profile when drawer opens or userId changes
  useEffect(() => {
    if (userId && !customerProfile) {
      dispatch(getUserProfileDetails({ userId }));
    }
  }, [userId, customerProfile, dispatch]);

  const handleLogout = () => {
    dispatch(actionLogout());
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      })
    );
  };

  // Determine active route (for highlighting)
  const currentRoute = props.state.routeNames[props.state.index];

  const menuItems = [
    {
      name: 'Profile',
      icon: 'account-circle-outline',
      route: 'More', // Your existing More/Profile screen
      active: currentRoute === 'More',
    },
    {
      name: 'My Addresses',
      icon: 'map-marker-outline',
      route: 'MyAddresses',
      active: currentRoute === 'MyAddresses',
    },
    {
      name: 'Wishlist',
      icon: 'heart-outline',
      route: 'WishList',
      active: currentRoute === 'WishList',
    },
    // {
    //   name: 'Delete Account',
    //   icon: 'delete-outline',
    //   route: 'DeleteAccount', // You'll need to create this screen
    //   active: currentRoute === 'DeleteAccount',
    //   danger: true,
    // },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileContainer}>
        <Image
          source={
            customerProfile?.profile_image
              ? { uri: customerProfile.profile_image }
              : require('../assets/profile1.png') // fallback
          }
          style={styles.profileImage}
          defaultSource={require('../assets/profile1.png')}
        />
        <Text style={styles.profileName}>
          {customerProfile?.customer_name || 'Guest User'}
        </Text>
        {customerProfile?.customer_email && (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.profileEmail}>
              {customerProfile.customer_email}
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.closeDrawer();
                props.navigation.navigate('Profile1');
              }}
              style={{ marginLeft: 8 }}
            >
              <Feather
  name="edit"
  size={18}
  color="#ddd"
/>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Menu Items */}
      <ScrollView
        contentContainerStyle={styles.menuList}
        showsVerticalScrollIndicator={false}
      >
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            activeOpacity={0.7}
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate(item.route);
            }}
            style={[
              styles.menuItem,
              item.active && styles.activeMenuItem,
              item.danger && styles.dangerItem,
            ]}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={22}
              color={
                item.active
                  ? colors.white
                  : item.danger
                  ? '#ff4444'
                  : '#ccc'
              }
            />
            <Text
              style={[
                styles.menuItemText,
                item.active && styles.activeMenuItemText,
                item.danger && styles.dangerText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Logout */}
        {/* <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="logout" size={22} color="#ccc" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity> */}

        <Text style={styles.versionText}>Version {version}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#832729' },
  profileContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    alignItems: 'center',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: colors.white || '#fff',
  },
  profileName: {
    color: colors.white || '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileEmail: {
    color: '#ddd',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  menuList: {
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 4,
  },
  activeMenuItem: {
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  dangerItem: {
    // Optional: slight red tint for delete
  },
  menuItemText: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  activeMenuItemText: {
    color: colors.white || '#fff',
    fontWeight: '700',
  },
  dangerText: {
    color: '#ff6666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginTop: 20,
  },
  logoutText: {
    color: colors.white || '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  versionText: {
    fontSize: 12,
    color: '#888',
    marginTop: 30,
    textAlign: 'center',
    opacity: 0.6,
  },
});

export default CustomDrawerContent;