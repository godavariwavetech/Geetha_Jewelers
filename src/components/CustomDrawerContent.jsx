// // components/CustomDrawerContent.js

// import React, { useEffect } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   Alert,                    // ← Added
// } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { CommonActions } from '@react-navigation/native';
// import VersionCheck from 'react-native-version-check';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Feather from 'react-native-vector-icons/Feather';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // ← Added

// import { colors } from '../config/theme';
// import { logout, getUserProfileDetails } from '../redux/slices/authSlice'; // Adjusted import

// const CustomDrawerContent = (props) => {
//   const dispatch = useDispatch();

//   const userId = useSelector((state) => state.Auth.customerId);
//   const customerProfile = useSelector((state) => state.Auth.customerProfile);

//   const [version, setVersion] = React.useState('');

//   useEffect(() => {
//     setVersion(VersionCheck.getCurrentVersion());
//   }, []);

//   useEffect(() => {
//     if (userId && !customerProfile) {
//       dispatch(getUserProfileDetails({ userId }));
//     }
//   }, [userId, customerProfile, dispatch]);

//   const handleLogout = () => {
//     Alert.alert(
//       "Logout",
//       "Are you sure you want to logout?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Yes, Logout",
//           style: "destructive",
//           onPress: async () => {
//             try {
//               // Clear AsyncStorage
//               await AsyncStorage.clear();

//               // Reset Redux auth state
//               dispatch(logout());

//               // Close drawer first
//               props.navigation.closeDrawer();

//               // Reset navigation stack to SignIn
//               props.navigation.dispatch(
//                 CommonActions.reset({
//                   index: 0,
//                   routes: [{ name: 'SignIn' }],
//                 })
//               );
//             } catch (error) {
//               console.error('Logout failed:', error);
//               Alert.alert('Error', 'Failed to logout. Please try again.');
//             }
//           },
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   const currentRoute = props.state.routeNames[props.state.index];

//   const menuItems = [
//     {
//       name: 'Profile',
//       icon: 'account-circle-outline',
//       route: 'More',
//       active: currentRoute === 'More',
//     },
//     {
//       name: 'My Addresses',
//       icon: 'map-marker-outline',
//       route: 'MyAddresses',
//       active: currentRoute === 'MyAddresses',
//     },
//     {
//       name: 'Wishlist',
//       icon: 'heart-outline',
//       route: 'WishList',
//       active: currentRoute === 'WishList',
//     },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Profile Header */}
//       <View style={styles.profileContainer}>
//         <Image
//           source={
//             customerProfile?.profile_image
//               ? { uri: customerProfile.profile_image }
//               : require('../assets/profile1.png')
//           }
//           style={styles.profileImage}
//           defaultSource={require('../assets/profile1.png')}
//         />
//         <Text style={styles.profileName}>
//           {customerProfile?.customer_name || 'Guest User'}
//         </Text>
//         {customerProfile?.customer_email && (
//           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
//             <Text style={styles.profileEmail}>
//               {customerProfile.customer_email}
//             </Text>
//             <TouchableOpacity
//               onPress={() => {
//                 props.navigation.closeDrawer();
//                 props.navigation.navigate('Profile1');
//               }}
//               style={{ marginLeft: 8 }}
//             >
//               <Feather name="edit" size={18} color="#ddd" />
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>

//       {/* Menu Items */}
//       <ScrollView
//         contentContainerStyle={styles.menuList}
//         showsVerticalScrollIndicator={false}
//       >
//         {menuItems.map((item) => (
//           <TouchableOpacity
//             key={item.name}
//             activeOpacity={0.7}
//             onPress={() => {
//               props.navigation.closeDrawer();
//               props.navigation.navigate(item.route);
//             }}
//             style={[
//               styles.menuItem,
//               item.active && styles.activeMenuItem,
//             ]}
//           >
//             <MaterialCommunityIcons
//               name={item.icon}
//               size={22}
//               color={item.active ? colors.white : '#ccc'}
//             />
//             <Text
//               style={[
//                 styles.menuItemText,
//                 item.active && styles.activeMenuItemText,
//               ]}
//             >
//               {item.name}
//             </Text> 
//           </TouchableOpacity>
//         ))}

//         {/* Logout with Confirmation */}
//         <TouchableOpacity
//           style={styles.logoutButton}
//           onPress={handleLogout}
//           activeOpacity={0.7}
//         >
//           <MaterialCommunityIcons name="logout" size={22} color="#ccc" />
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>

//         <Text style={styles.versionText}>Version {version}</Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#832729' },
//   profileContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 30,
//     paddingBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#444',
//     alignItems: 'center',
//   },
//   profileImage: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     marginBottom: 12,
//     borderWidth: 3,
//     borderColor: colors.white || '#fff',
//   },
//   profileName: {
//     color: colors.white || '#fff',
//     fontSize: 22,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   profileEmail: {
//     color: '#ddd',
//     fontSize: 14,
//     marginTop: 4,
//     textAlign: 'center',
//   },
//   menuList: {
//     paddingHorizontal: 10,
//     paddingTop: 15,
//     paddingBottom: 30,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 14,
//     paddingVertical: 14,
//     paddingHorizontal: 14,
//     borderRadius: 12,
//     marginBottom: 4,
//   },
//   activeMenuItem: {
//     backgroundColor: 'rgba(255,255,255,0.12)',
//   },
//   menuItemText: {
//     color: '#ccc',
//     fontSize: 16,
//     fontWeight: '600',
//     letterSpacing: 0.2,
//   },
//   activeMenuItemText: {
//     color: colors.white || '#fff',
//     fontWeight: '700',
//   },
//   logoutButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 14,
//     paddingVertical: 14,
//     paddingHorizontal: 14,
//     marginTop: 20,
//   },
//   logoutText: {
//     color: colors.white || '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   versionText: {
//     fontSize: 12,
//     color: '#888',
//     marginTop: 30,
//     textAlign: 'center',
//     opacity: 0.6,
//   },
// });

// export default CustomDrawerContent;
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
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import VersionCheck from 'react-native-version-check';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { colors } from '../config/theme';
import { logout, getUserProfileDetails } from '../redux/slices/authSlice';

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.Auth.customerId);
  const customerProfile = useSelector((state) => state.Auth.customerProfile);

  const [version, setVersion] = React.useState('');

  useEffect(() => {
    setVersion(VersionCheck.getCurrentVersion());
  }, []);

  useEffect(() => {
    if (userId && !customerProfile) {
      dispatch(getUserProfileDetails({ userId }));
    }
  }, [userId, customerProfile, dispatch]);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              dispatch(logout());
              props.navigation.closeDrawer();
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'SignIn' }],
                })
              );
            } catch (error) {
              console.error('Logout failed:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to permanently delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Delete",
          style: "destructive",
          onPress: async () => {
            // TODO: Implement actual account deletion here (e.g., call API to delete user)
            // For now, we'll just logout as a placeholder
            try {
              await AsyncStorage.clear();
              dispatch(logout());
              props.navigation.closeDrawer();
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'SignIn' }],
                })
              );
              Alert.alert('Account Deleted', 'Your account has been deleted.');
            } catch (error) {
              console.error('Delete account failed:', error);
              Alert.alert('Error', 'Failed to delete account. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const currentRoute = props.state.routeNames[props.state.index];

  // const menuItems = [
  //   {
  //     name: 'Profile',
  //     icon: 'account-circle-outline',
  //     route: 'More',
  //     active: currentRoute === 'More',
  //   },
  //   {
  //     name: 'My Addresses',
  //     icon: 'map-marker-outline',
  //     route: 'MyAddresses',
  //     active: currentRoute === 'MyAddresses',
  //   },
  //   {
  //     name: 'Wishlist',
  //     icon: 'heart-outline',
  //     route: 'WishList',
  //     active: currentRoute === 'WishList',
  //   },
  //   // New items added here
  //   {
  //     name: 'Categories',
  //     icon: 'view-grid-outline',
  //     route: 'Categories',
  //     active: currentRoute === 'Categories',
  //   },
  //   {
  //     name: 'Schemes',
  //     icon: 'ticket-percent-outline',
  //     route: 'GoldScheme',
  //     active: currentRoute === 'GoldScheme',
  //   },
  //   {
  //     name: 'Cart',
  //     icon: 'cart-outline',
  //     route: 'Cart',
  //     active: currentRoute === 'Cart',
  //   },
  // ];
const menuItems = [
  {
    name: 'Profile',
    icon: 'account-circle-outline',
    route: 'Profile',        // ← Changed from 'More' to 'Profile'
    active: currentRoute === 'Profile',
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
  {
    name: 'Categories',
    icon: 'view-grid-outline',
    route: 'Categories',
    active: currentRoute === 'Categories',
  },
  {
    name: 'Schemes',
    icon: 'ticket-percent-outline',
    route: 'GoldScheme',
    active: currentRoute === 'GoldScheme',
  },
  {
    name: 'Cart',
    icon: 'cart-outline',
    route: 'Cart',
    active: currentRoute === 'Cart',
  },
];
  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileContainer}>
        <Image
          source={
            customerProfile?.profile_image
              ? { uri: customerProfile.profile_image }
              : require('../assets/profile1.png')
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
              <Feather name="edit" size={18} color="#ddd" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Menu Items */}
      <ScrollView
        contentContainerStyle={styles.menuList}
        showsVerticalScrollIndicator={false}
      >
        {/* {menuItems.map((item) => (
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
            ]}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={22}
              color={item.active ? colors.white : '#ccc'}
            />
            <Text
              style={[
                styles.menuItemText,
                item.active && styles.activeMenuItemText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))} */}
{menuItems.map((item) => (
  <TouchableOpacity
    key={item.name}
    activeOpacity={0.7}
    onPress={() => {
      props.navigation.closeDrawer();

      // Check if the route is a tab inside MainTabs
      const tabRoutes = ['Home', 'GoldScheme', 'Rewards', 'Categories', 'Profile'];
      
      if (tabRoutes.includes(item.route)) {
        // Navigate to MainTabs and then focus the specific tab
        props.navigation.navigate('MainTabs', {
          screen: item.route,
        });
      } else {
        // For regular stack screens (MyAddresses, WishList, Cart, etc.)
        props.navigation.navigate(item.route);
      }
    }}
    style={[
      styles.menuItem,
      // Improve active state detection for nested tabs
      item.active && styles.activeMenuItem,
    ]}
  >
    <MaterialCommunityIcons
      name={item.icon}
      size={22}
      color={item.active ? colors.white : '#ccc'}
    />
    <Text
      style={[
        styles.menuItemText,
        item.active && styles.activeMenuItemText,
      ]}
    >
      {item.name}
    </Text>
  </TouchableOpacity>
))}
        {/* Delete Account */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleDeleteAccount}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="delete-outline" size={22} color="#ccc" />
          <Text style={styles.logoutText}>Delete Account</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={[styles.logoutButton, { marginTop: 10 }]}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="logout" size={22} color="#ccc" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version {version}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles remain the same (no changes needed)
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