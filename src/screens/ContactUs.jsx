// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Linking,
//   SafeAreaView,
//   Alert,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import commonstyles from '../commonstyles/commonstyles';

// const ContactUs = ({ navigation }) => {
//   const insets = useSafeAreaInsets();

//   const openEmail = () => {
//     Linking.openURL('mailto:support@example.com');
//   };

//   const openWhatsApp = async () => {
//     const phoneNumber = '919121900713';
//     const message = 'Hi, I need help';
//     const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

//     Linking.openURL(url).catch(() => {
//       Alert.alert('Error', 'Could not open WhatsApp. Please make sure it is installed.');
//     });
//   };

//   return (
//     <SafeAreaView style={[styles.container, { paddingTop: insets.top + 10 }]}>
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backRow}>
//         <Ionicons name="arrow-back" size={22} color="#000" />
//         <Text style={styles.headerText}>Contact Us</Text>
//       </TouchableOpacity>

//       <View style={styles.centerContent}>
//         <Text style={[commonstyles.text2, styles.centerText]}>
//           Speak to our team
//         </Text>

//         {/* <View style={styles.card}>
//           <TouchableOpacity style={styles.row} onPress={openEmail}>
//             <MaterialCommunityIcons
//               name="email-outline"
//               size={22}
//               color="#000"
//               style={styles.icon}
//             />
//             <Text style={commonstyles.text4}>Shoot us an Email</Text>
//           </TouchableOpacity>
//         </View> */}

//         <View style={styles.card}>
//           <TouchableOpacity style={styles.row} onPress={openWhatsApp}>
//             <FontAwesome
//               name="whatsapp"
//               size={22}
//               color="#25D366"
//               style={styles.icon}
//             />
//             <Text style={commonstyles.text4}>Message on WhatsApp</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 20,
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   backRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   headerText: {
//     fontSize: 18,
//     marginLeft: 8,
//     fontWeight: '600',
//   },
//   centerContent: {
//     flex: 1,
//     justifyContent: 'start',
//     alignItems: 'center',
//   },
//   centerText: {
//     textAlign: 'center',
//     color: '#000',
//     marginBottom: 30,
//     marginTop:50
//   },
//   card: {
//     backgroundColor: '#e8fff0',
//     paddingVertical: 20,
//     paddingHorizontal: 24,
//     borderRadius: 16,
//     width: '100%',
//     maxWidth: 360,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   icon: {
//     marginRight: 12,
//   },
// });

// export default ContactUs;
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import commonstyles from '../commonstyles/commonstyles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchApplicationData } from '../redux/slices/applicationDataSlice'; // Import the new thunk
const ContactUs = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { applicationData, loading, error } = useSelector((state) => state.applicationData || {});
  // Fetch application data on component mount
  useEffect(() => {
    dispatch(fetchApplicationData());
  }, [dispatch]);
  const openEmail = () => {
    const email = applicationData?.mail_id || 'yolooshop@gmail.com'; // Fallback to default if not loaded
    Linking.openURL(`mailto:${email}`).catch(() => {
      Alert.alert('Error', 'Could not open email client.');
    });
  };
  const openWhatsApp = async () => {
    const phoneNumber = applicationData?.contact_number || '919121900713'; // Fallback to default if not loaded
    const message = 'Hi, I need help';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open WhatsApp. Please make sure it is installed.');
    });
  };
  // Show error alert if fetching fails
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);
  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backRow}>
        <Ionicons name="arrow-back" size={22} color="#000" />
        <Text style={styles.headerText}>Contact Us</Text>
      </TouchableOpacity>

      <View style={styles.centerContent}>
        <Text style={[commonstyles.text2, styles.centerText]}>
          Speak to our team
        </Text>
        {/* <View style={styles.card}>
          <TouchableOpacity style={styles.row} onPress={openEmail}>
            <MaterialCommunityIcons
              name="email-outline"
              size={22}
              color="#000"
              style={styles.icon}
            />
            <Text style={commonstyles.text4}>Shoot us an Email</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.row} onPress={openWhatsApp}>
            <FontAwesome
              name="whatsapp"
              size={22}
              color="#25D366"
              style={styles.icon}/>
            <Text style={commonstyles.text4}>Message on WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: '600',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
    color: '#000',
    marginBottom: 30,
    marginTop: 50,
  },
  card: {
    backgroundColor: '#e8fff0',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    width: '100%',
    maxWidth: 360,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
});
export default ContactUs;