import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  StatusBar,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserProfileDetails,
  updateUserProfile,
} from '../redux/slices/authSlice'; // adjust path if needed
import { PermissionsAndroid, Platform } from 'react-native';
const { width } = Dimensions.get('window');

function Profile({ navigation }) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  // Get data from Redux store (pure JS - no types)
  const { customerId, customerProfile, loading, profileUpdateStatus, error } =
    useSelector((state) => state.Auth);

  // Local state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  // Fetch profile when screen loads
  useEffect(() => {
    if (customerId) {
      dispatch(getUserProfileDetails({ userId: customerId }));
    }
  }, [customerId, dispatch]);

  // Fill form when profile data comes from server
  useEffect(() => {
    if (customerProfile) {
      setName(customerProfile.customer_name || '');
      setEmail(customerProfile.customer_email || '');
      setPhone(customerProfile.customer_mobile_number || '');

      if (customerProfile.profile_image) {
        setImageUri({ uri: customerProfile.profile_image });
      } else {
        setImageUri(require('../assets/profile1.png'));
      }
    }
  }, [customerProfile]);

  // Image picker
  const selectImageOption = () => {
    Alert.alert(
      'Update Profile Picture',
      'Choose an option',
      [
        { text: 'Camera', onPress: openCamera },
        { text: 'Gallery', onPress: openGallery },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const openCamera = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert("Permission Denied", "Camera permission is required to take photos.");
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  }

  // If permission granted (or if iOS), launch camera
  launchCamera(
    { mediaType: 'photo', includeBase64: true, cameraType: 'front', quality: 0.5, maxWidth: 800, maxHeight: 800 },
    (response) => handleImageResponse(response)
  );
};

  const openGallery = () => {
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: true, quality: 0.5, maxWidth: 800, maxHeight: 800 },
      (response) => handleImageResponse(response)
    );
  };

  const handleImageResponse = (response) => {
    if (response.didCancel || response.errorCode) return;

    const asset = response.assets?.[0];
    if (asset) {
      setImageUri({ uri: asset.uri });
      if (asset.base64) {
        setBase64Image(`data:${asset.type || 'image/jpeg'};base64,${asset.base64}`);
      }
    }
  };

  // Save profile
  const onSave = async () => {
    if (!customerId) {
      Alert.alert('Error', 'User not logged in');
      return;
    }
    if (!name.trim()) {
      Alert.alert('Validation', 'Please enter your name');
      return;
    }

    try {
      await dispatch(
        updateUserProfile({
          userId: customerId,
          name: name.trim(),
          email: email.trim() || null,
          profileImage: base64Image,
        })
      ).unwrap();

      Alert.alert('Success', 'Profile updated successfully!');

      // Refresh latest profile
      dispatch(getUserProfileDetails({ userId: customerId }));
    } catch (err) {
      Alert.alert('Update Failed', err.message || 'Something went wrong');
    }
  };

  const isSaving = profileUpdateStatus === 'loading';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#832729" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Avatar */}
        <View style={styles.avatarWrap}>
          <Image
            source={imageUri || require('../assets/profile1.png')}
            style={styles.avatar}
            defaultSource={require('../assets/profile1.png')}
          />
          <TouchableOpacity style={styles.editBtn} onPress={selectImageOption}>
            <MaterialCommunityIcons name="pencil-outline" size={20} color="#004830" />
          </TouchableOpacity>
        </View>

        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <View style={styles.inputCard}>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#aaa"
          />
          <MaterialCommunityIcons name="pencil-outline" size={20} color="#c6b6af" />
        </View>

        {/* Email */}
        <Text style={styles.label}>Email ID</Text>
        <View style={styles.inputCard}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Enter email address"
            placeholderTextColor="#aaa"
            
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Mobile Number */}
        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.inputCard}>
          <TextInput
            value={phone}
            style={styles.input}
            editable={false}
            selectTextOnFocus={false}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveBtn, isSaving && { opacity: 0.7 }]}
          onPress={onSave}
          disabled={isSaving || loading}
        >
          {isSaving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveText}>Save</Text>
          )}
        </TouchableOpacity>

        {/* Error */}
        {error && (
          <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
            {error}
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 12,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 10,
    color: '#004830',
  },
  label: {
    marginLeft: 25,
    color: '#767676',
    fontSize: 13,
    marginBottom: 3,
    marginTop: 14,
    fontWeight: '500',
  },
  inputCard: {
    backgroundColor: '#fff',
    marginHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f0ece8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
    marginBottom: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
    paddingVertical: 6,
    paddingRight: 10,
    paddingLeft: 1,
  },
  saveBtn: {
    marginTop: 40,
    marginHorizontal: 18,
    backgroundColor: '#832729',
    borderRadius: 10,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  avatarWrap: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
    position: 'relative',
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 2.5,
    borderColor: '#fff',
    backgroundColor: '#f2f2f2',
  },
  editBtn: {
    position: 'absolute',
    right: width / 2 - 86 / 2 - 2,
    bottom: 8,
    backgroundColor: '#fff',
    padding: 2,
    borderRadius: 18,
    borderWidth: 0.6,
    borderColor: '#e2dedc',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
});

export default Profile;