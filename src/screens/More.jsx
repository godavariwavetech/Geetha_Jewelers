// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Dimensions,
//   StatusBar,
//   Platform,
// } from "react-native";
// import Icon from "react-native-vector-icons/Feather";
// import MaterialIcon from "react-native-vector-icons/MaterialIcons";

// const { width } = Dimensions.get("window");

// const ProfileScreen = ({ navigation }) => {
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       <View style={styles.mainContainer}>
//         {/* Header - Fixed at Top */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Icon name="arrow-left" size={24} color="#000" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Profile</Text>
//           <View style={{ width: 24 }} />
//         </View>

//         <ScrollView 
//           showsVerticalScrollIndicator={false} 
//           contentContainerStyle={styles.scrollContent}
//         >
//           {/* Previously Bookings */}
//           <Text style={styles.sectionTitle}>Your Previously Bookings</Text>
//           <ScrollView 
//             horizontal 
//             showsHorizontalScrollIndicator={false} 
//             style={styles.bookingsRow}
//             contentContainerStyle={styles.bookingsContent}
//           >
//             {[1, 2, 3, 4, 5].map((item, index) => (
//               <View key={index} style={styles.bookingCard}>
//                 <Image
//                   source={
//                     index % 2 === 0
//                       ? require("../assets/earrings.png")
//                       : require("../assets/mangalsutra.png")
//                   }
//                   style={styles.bookingImage}
//                 />
//                 <TouchableOpacity style={styles.heartIcon}>
//                   <Icon name="heart" size={18} color="#C6A06A" />
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </ScrollView>

//           {/* Profile and Support */}
//           <TouchableOpacity style={styles.optionCard} onPress={()=>{navigation.navigate("Profile1")}}>
//             <View style={styles.optionLeft}>
//               <Icon name="user" size={20} color="#832729" />
//               <Text style={styles.optionText}>Profile</Text>
//             </View>
//             <Icon name="chevron-right" size={20} color="#832729" />
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.optionCard}>
//             <View style={styles.optionLeft}>
//               <MaterialIcon name="support-agent" size={20} color="#832729" />
//               <Text style={styles.optionText}>Support</Text>
//             </View>
//             <Icon name="chevron-right" size={20} color="#832729" />
//           </TouchableOpacity>

//           {/* Smart Savings Scheme Banner */}
//           <View style={styles.bannerCard}>
//             <Image
//               source={require("../assets/lastbanner.png")}
//               style={styles.bannerImageFull}
//               resizeMode="cover"
//             />
//           </View>

//           {/* Logout Button */}
//           <View style={styles.logoutContainer}>
//             <TouchableOpacity style={styles.logoutButton}>
//               <Icon name="log-out" size={18} color="#fff" />
//               <Text style={styles.logoutText}>Logout</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },
//   mainContainer: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     backgroundColor: "#fff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f0f0",
//     gap:5
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#000",
//   },
//   scrollContent: {
//     paddingBottom: 100,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#000",
//     marginHorizontal: 16,
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   bookingsRow: {
//     paddingLeft: 16,
//     marginBottom: 5,
//   },
//   bookingsContent: {
//     paddingRight: 16,
//   },
//   bookingCard: {
//     marginRight: 14,
//     position: "relative",
//   },
//   bookingImage: {
//     width: width * 0.22,
//     height: width * 0.22,
//     borderRadius: 10,
//     backgroundColor: "#f8f8f8",
//   },
//   heartIcon: {
//     position: "absolute",
//     top: 5,
//     right: 5,
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 4,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   optionCard: {
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#D9D9D9",
//     marginHorizontal: 16,
//     borderRadius: 10,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     marginTop: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   optionLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   optionText: {
//     fontSize: 15,
//     color: "#832729",
//     fontWeight: "500",
//   },
//   bannerCard: {
//     marginHorizontal: 16,
//     borderRadius: 10,
//     marginTop: 20,
//     overflow: "hidden",
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   bannerImageFull: {
//     width: "100%",
//     height: 280,
//     borderRadius: 10,
//   },
//   logoutContainer: {
//     paddingVertical: 24,
//     paddingHorizontal: 16,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   logoutButton: {
//     flexDirection: "row",
//     backgroundColor: "#E32636",
//     borderRadius: 25,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 14,
//     width: "50%",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
//   logoutText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 8,
//   },
// });
// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Dimensions,
//   StatusBar,
//   Platform,
//   Alert, // ← Add this import
// } from "react-native";
// import Icon from "react-native-vector-icons/Feather";
// import MaterialIcon from "react-native-vector-icons/MaterialIcons";
// import { useDispatch } from 'react-redux';
// import { logout } from '../redux/slices/authSlice'; // Adjust path if needed
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const { width } = Dimensions.get("window");

// const ProfileScreen = ({ navigation }) => {
//   const dispatch = useDispatch();

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
//               // Clear local storage
//               await AsyncStorage.clear();

//               // Reset Redux auth state
//               dispatch(logout());

//               // Navigate to SignIn and reset navigation stack
//               navigation.reset({
//                 index: 0,
//                 routes: [{ name: 'SignIn' }],
//               });
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

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       <View style={styles.mainContainer}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Icon name="arrow-left" size={24} color="#000" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Profile</Text>
//           <View style={{ width: 24 }} />
//         </View>

//         <ScrollView 
//           showsVerticalScrollIndicator={false} 
//           contentContainerStyle={styles.scrollContent}
//         >
//           {/* Previously Bookings */}
//           {/* <Text style={styles.sectionTitle}>Your Previously Bookings</Text>
//           <ScrollView 
//             horizontal 
//             showsHorizontalScrollIndicator={false} 
//             style={styles.bookingsRow}
//             contentContainerStyle={styles.bookingsContent}
//           >
//             {[1, 2, 3, 4, 5].map((item, index) => (
//               <View key={index} style={styles.bookingCard}>
//                 <Image
//                   source={
//                     index % 2 === 0
//                       ? require("../assets/earrings.png")
//                       : require("../assets/mangalsutra.png")
//                   }
//                   style={styles.bookingImage}
//                 />
//                 <TouchableOpacity style={styles.heartIcon}>
//                   <Icon name="heart" size={18} color="#C6A06A" />
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </ScrollView> */}

//           {/* Options */}
//           <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate("MyOrders")}>
//             <View style={styles.optionLeft}>
//               <Icon name="shopping-bag" size={20} color="#832729" />
//               <Text style={styles.optionText}>My Bookings</Text>
//             </View>
//             <Icon name="chevron-right" size={20} color="#832729" />
//           </TouchableOpacity>
//        <TouchableOpacity
//   style={styles.optionCard}
//   onPress={() => navigation.navigate('MySchemesScreen')}
// >
//   <View style={styles.optionLeft}>
//     <MaterialCommunityIcons name="file-document-outline" size={20} color="#832729" />
//     <Text style={styles.optionText}>My Schemes</Text>
//   </View>
//   <Icon name="chevron-right" size={20} color="#832729" />
// </TouchableOpacity>

//           <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate("Profile1")}>
//             <View style={styles.optionLeft}>
//               <Icon name="user" size={20} color="#832729" />
//               <Text style={styles.optionText}>Profile</Text>
//             </View>
//             <Icon name="chevron-right" size={20} color="#832729" />
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate("MyAddresses")}>
//             <View style={styles.optionLeft}>
//               <MaterialIcon name="location-on" size={20} color="#832729" />
//               <Text style={styles.optionText}>My Addresses</Text> 
//             </View>
//             <Icon name="chevron-right" size={20} color="#832729" />
//           </TouchableOpacity>

//           {/* <TouchableOpacity style={styles.optionCard}>
//             <View style={styles.optionLeft}>
//               <MaterialIcon name="support-agent" size={20} color="#832729" />
//               <Text style={styles.optionText}>Support</Text>
//             </View>
//             <Icon name="chevron-right" size={20} color="#832729" />
//           </TouchableOpacity> */}

//           {/* Banner */}
//           <View style={styles.bannerCard}>
//             <Image
//               source={require("../assets/lastbanner.png")}
//               style={styles.bannerImageFull}
//               resizeMode="cover"
//             />
//           </View>

//           {/* Logout Button with Confirmation */}
//           <View style={styles.logoutContainer}>
//             <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//               <Icon name="log-out" size={18} color="#fff" />
//               <Text style={styles.logoutText}>Logout</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ProfileScreen;

// // Styles remain the same
// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },
//   mainContainer: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     backgroundColor: "#fff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f0f0",
//     gap: 5,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#000",
//   },
//   scrollContent: {
//     paddingBottom: 100,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#000",
//     marginHorizontal: 16,
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   bookingsRow: {
//     paddingLeft: 16,
//     marginBottom: 5,
//   },
//   bookingsContent: {
//     paddingRight: 16,
//   },
//   bookingCard: {
//     marginRight: 14,
//     position: "relative",
//   },
//   bookingImage: {
//     width: width * 0.22,
//     height: width * 0.22,
//     borderRadius: 10,
//     backgroundColor: "#f8f8f8",
//   },
//   heartIcon: {
//     position: "absolute",
//     top: 5,
//     right: 5,
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 4,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   optionCard: {
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#D9D9D9",
//     marginHorizontal: 16,
//     borderRadius: 10,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     marginTop: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   optionLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   optionText: {
//     fontSize: 15,
//     color: "#832729",
//     fontWeight: "500",
//   },
//   bannerCard: {
//     marginHorizontal: 16,
//     borderRadius: 10,
//     marginTop: 20,
//     overflow: "hidden",
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   bannerImageFull: {
//     width: "100%",
//     height: 280,
//     borderRadius: 10,
//   },
//   logoutContainer: {
//     paddingVertical: 24,
//     paddingHorizontal: 16,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   logoutButton: {
//     flexDirection: "row",
//     backgroundColor: "#E32636",
//     borderRadius: 25,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 14,
//     width: "50%",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
//   logoutText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 8,
//   },
// });
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { width } = Dimensions.get("window");

// Font family constants
const FONTS = {
  regular: 'SF-Pro-Display-Regular',
  medium: 'SF-Pro-Display-Medium',
  semibold: 'SF-Pro-Display-Semibold',
  bold: 'SF-Pro-Display-Bold',
};

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
const insets = useSafeAreaInsets();
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              dispatch(logout());
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
              });
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={[styles.mainContainer,{paddingTop:insets.top  +5}]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >
          {/* Options */}
          <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate("MyOrders")}>
            <View style={styles.optionLeft}>
              <Icon name="shopping-bag" size={20} color="#832729" />
              <Text style={styles.optionText}>My Bookings</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#832729" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => navigation.navigate('MySchemesScreen')}
          >
            <View style={styles.optionLeft}>
              <MaterialCommunityIcons name="file-document-outline" size={20} color="#832729" />
              <Text style={styles.optionText}>My Schemes</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#832729" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate("Profile1")}>
            <View style={styles.optionLeft}>
              <Icon name="user" size={20} color="#832729" />
              <Text style={styles.optionText}>Profile</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#832729" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate("MyAddresses")}>
            <View style={styles.optionLeft}>
              <MaterialIcon name="location-on" size={20} color="#832729" />
              <Text style={styles.optionText}>My Addresses</Text> 
            </View>
            <Icon name="chevron-right" size={20} color="#832729" />
          </TouchableOpacity>

          {/* Banner */}
          {/* <View style={styles.bannerCard}>
            <Image
              source={require("../assets/lastbanner.png")}
              style={styles.bannerImageFull}
              resizeMode="cover"
            />
          </View> */}

          {/* Logout Button */}
          <View style={styles.logoutContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Icon name="log-out" size={18} color="#fff" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    gap: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: "#000",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS.semibold,
    color: "#000",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  bookingsRow: {
    paddingLeft: 16,
    marginBottom: 5,
  },
  bookingsContent: {
    paddingRight: 16,
  },
  bookingCard: {
    marginRight: 14,
    position: "relative",
  },
  bookingImage: {
    width: width * 0.22,
    height: width * 0.22,
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
  },
  heartIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  optionCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    marginHorizontal: 16,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  optionText: {
    fontSize: 15,
    fontFamily: FONTS.medium,
    color: "#832729",
  },
  bannerCard: {
    marginHorizontal: 16,
    borderRadius: 10,
    marginTop: 20,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bannerImageFull: {
    width: "100%",
    height: 280,
    borderRadius: 10,
  },
  logoutContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 20,
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#E32636",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    width: "50%",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: FONTS.bold,
    marginLeft: 8,
  },
});

export default ProfileScreen;