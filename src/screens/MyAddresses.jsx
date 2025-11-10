import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPincodes } from '../redux/slices/pincodeSlice';
import CustomModal from '../components/CustomModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import commonstyles from '../commonstyles/commonstyles';
const MyAddresses = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addressIndexToDelete, setAddressIndexToDelete] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [latitude, setLatitude] = useState(''); // New state for latitude
  const [longitude, setLongitude] = useState(''); // New state for longitude
  const [addressType, setAddressType] = useState('home');
  const [customAddressType, setCustomAddressType] = useState('');
  const [errors, setErrors] = useState({});
  const [addresses, setAddresses] = useState([]);

  const { pincodes = [], loading: pincodeLoading, error: pincodeError } = useSelector(state => state.pincode || {});

  useEffect(() => {
    dispatch(fetchPincodes());
  }, [dispatch]);

  useEffect(() => {
    if (route.params?.newAddress) {
      setAddresses(prev => [...prev, route.params.newAddress]);
      navigation.setParams({ ...route.params, newAddress: undefined });
    }
  }, [route.params?.newAddress, navigation]);

  const clearFields = () => {
    setName('');
    setEmail('');
    setAddressLine('');
    setCity('');
    setState('');
    setPincode('');
    setPhone('');
    setLatitude('');
    setLongitude('');
    setAddressType('home');
    setCustomAddressType('');
    setErrors({});
  };

  const validateFields = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(name.trim())) {
      newErrors.name = 'Name must be 2–50 alphabetic characters';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Invalid email format';
    }

    if (!addressLine.trim()) {
      newErrors.addressLine = 'Address Line is required';
    } else if (!/^[\w\s,.-]{5,100}$/.test(addressLine.trim())) {
      newErrors.addressLine = 'Address Line must be 5–100 characters';
    }

    if (!city.trim()) {
      newErrors.city = 'City is required';
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(city.trim())) {
      newErrors.city = 'City must be 2–50 alphabetic characters';
    }

    if (!state.trim()) {
      newErrors.state = 'State is required';
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(state.trim())) {
      newErrors.state = 'State must be 2–50 alphabetic characters';
    }

    if (!pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(pincode.trim())) {
      newErrors.pincode = 'Pincode must be 6 digits';
    } else if (!pincodes.some(item => item.pincode === parseInt(pincode.trim()))) {
      newErrors.pincode = 'Pincode not available for delivery';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(phone.trim())) {
      newErrors.phone = 'Phone Number must be 10 digits';
    }

    if (!addressType) {
      newErrors.addressType = 'Address Type is required';
    } else if (addressType === 'other' && !customAddressType.trim()) {
      newErrors.customAddressType = 'Custom Address Type is required';
    } else if (
      addressType === 'other' &&
      !/^[a-zA-Z\s]{2,20}$/.test(customAddressType.trim())
    ) {
      newErrors.customAddressType = 'Custom Address Type must be 2–20 alphabetic characters';
    }

    // Latitude and Longitude are optional for manual entry
    if (latitude && !/^-?\d{1,3}\.\d+$/.test(latitude.trim())) {
      newErrors.latitude = 'Invalid latitude format';
    }
    if (longitude && !/^-?\d{1,3}\.\d+$/.test(longitude.trim())) {
      newErrors.longitude = 'Invalid longitude format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePincodeChange = (text) => {
    setPincode(text);
    if (text === '') {
      setErrors(prev => ({ ...prev, pincode: null }));
    }
  };

  const openModalForEdit = (index) => {
    const addr = addresses[index];
    const parts = addr.full_address.split(',');
    setName(addr.customer_name);
    setEmail(addr.customer_email || '');
    setAddressLine(parts[0]?.trim() || '');
    setCity(parts[1]?.trim() || '');
    setState(parts[2]?.trim() || '');
    const pincodePart = addr.full_address.split(' - ')[1];
    setPincode(pincodePart ? pincodePart.trim() : '');
    setPhone(addr.customer_mobile_number);
    setLatitude(addr.customer_latitude ? addr.customer_latitude.toString() : '');
    setLongitude(addr.customer_longitude ? addr.customer_longitude.toString() : '');
    const addrType = addr.address_type?.toLowerCase() || 'home';
    setAddressType(addrType);
    setCustomAddressType(
      ['home', 'work'].includes(addrType) ? '' : addr.address_type
    );
    setEditingIndex(index);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    setAddresses(prev => prev.filter((_, i) => i !== addressIndexToDelete));
    setShowDeleteModal(false);
    setAddressIndexToDelete(null);
  };

  const handleSave = async () => {
    if (!validateFields()) {
      return;
    }

    const fullAddress = `${addressLine}, ${city}, ${state}, India - ${pincode}`;
    const finalAddressType = addressType === 'other' ? customAddressType : addressType;

    const addressData = {
      id: editingIndex !== null ? addresses[editingIndex].id : Date.now().toString(),
      customer_name: name,
      customer_email: email,
      customer_mobile_number: phone,
      full_address: fullAddress,
      address_type: finalAddressType,
      customer_latitude: latitude ? parseFloat(latitude) : undefined,
      customer_longitude: longitude ? parseFloat(longitude) : undefined,
    };

    if (editingIndex !== null) {
      setAddresses(prev => prev.map((addr, idx) => idx === editingIndex ? addressData : addr));
    } else {
      setAddresses(prev => [...prev, addressData]);
    }

    setModalVisible(false);
    clearFields();
    setEditingIndex(null);
  };

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex:1,paddingTop:insets.top,paddingBottom:insets.bottom}}>
          <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={22} color="rgba(8, 118, 90, 1)" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Addresses</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 60 },
        ]}
      >
        {Array.isArray(addresses) && addresses.length > 0 ? (
          addresses.map((address, index) => (
            <View style={styles.card} key={index}>
              <View style={styles.nameRow}>
                <Text style={[commonstyles.text6, { color: 'rgba(8, 118, 90, 1)', flex: 1 }]}>
                  {address.customer_name}
                </Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    setAddressIndexToDelete(index);
                    setShowDeleteModal(true);
                  }}
                >
                  <Feather name="trash-2" size={20} color="red" />
                </TouchableOpacity>
              </View>
              <Text style={styles.addressType}>
                {capitalizeFirst(address.address_type || 'home')} Address
              </Text>
              <Text style={[commonstyles.text4, { lineHeight: 20 }]}>
                {address.full_address}
              </Text>
              <Text style={[commonstyles.text4, { lineHeight: 20 }]}>
                Phone: <Text style={{ fontWeight: '500' }}>{address.customer_mobile_number}</Text>
              </Text>
              {address.customer_email && (
                <Text style={[commonstyles.text4, { lineHeight: 20 }]}>
                  Email: <Text style={{ fontWeight: '500' }}>{address.customer_email}</Text>
                </Text>
              )}
              {(address.customer_latitude || address.customer_longitude) && (
                <Text style={[commonstyles.text4, { lineHeight: 20 }]}>
                  Location: <Text style={{ fontWeight: '500' }}>
                    {address.customer_latitude}, {address.customer_longitude}
                  </Text>
                </Text>
              )}
            </View>
          ))
        ) : (
          <Text style={[commonstyles.text7,{fontSize:16,alignSelf:"center"}]}>No addresses found</Text>
        )}
      </ScrollView>

      <View
        style={[
          styles.fixedButtonWrapper,
          { paddingBottom: insets.bottom + 10 },
        ]}
      >
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('SelectOnMap')}
        >
          <Text style={[commonstyles.text9, { color: '#fff' }]}>+ Add Address</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={[commonstyles.text9, commonstyles.marginBottom12, { color: 'rgba(8, 118, 90, 1)' }]}>
              {editingIndex !== null ? 'Edit Address' : 'Add Address'}
            </Text>
            <View style={{ marginBottom: 12 }}>
              <Text style={commonstyles.text4}>Address Type</Text>
              <View style={[{ flexDirection: 'row', marginTop: 8, gap: 12 }, commonstyles.marginBottom12]}>
                {['home', 'work', 'other'].map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setAddressType(type)}
                    style={{
                      padding: 8,
                      borderWidth: 1,
                      borderColor: addressType === type ? 'rgba(8, 118, 90, 1)' : '#ccc',
                      backgroundColor: addressType === type ? 'rgba(8, 118, 90, 1)' : '#fff',
                      borderRadius: 4,
                    }}
                  >
                    <Text style={{ color: addressType === type ? '#fff' : '#000' }}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.addressType && (
                <Text style={styles.errorText}>{errors.addressType}</Text>
              )}
              {addressType === 'other' && (
                <>
                  <TextInput
                    placeholder="Enter Address Type"
                    style={styles.input}
                    placeholderTextColor="#000"
                    value={customAddressType}
                    onChangeText={setCustomAddressType}
                  />
                  {errors.customAddressType && (
                    <Text style={styles.errorText}>{errors.customAddressType}</Text>
                  )}
                </>
              )}
            </View>

            <TextInput
              placeholder="Name"
              style={styles.input}
              placeholderTextColor="#000"
              value={name}
              onChangeText={setName}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <TextInput
              placeholder="Email"
              style={styles.input}
              placeholderTextColor="#000"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              placeholder="Address Line"
              style={styles.input}
              placeholderTextColor="#000"
              value={addressLine}
              onChangeText={setAddressLine}
            />
            {errors.addressLine && <Text style={styles.errorText}>{errors.addressLine}</Text>}

            <TextInput
              placeholder="City"
              style={styles.input}
              placeholderTextColor="#000"
              value={city}
              onChangeText={setCity}
            />
            {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

            <TextInput
              placeholder="State"
              style={styles.input}
              placeholderTextColor="#000"
              value={state}
              onChangeText={setState}
            />
            {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

            <TextInput
              placeholder="Pincode"
              style={styles.input}
              placeholderTextColor="#000"
              keyboardType="numeric"
              value={pincode}
              onChangeText={handlePincodeChange}
              maxLength={6}
            />
            {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}
            {pincodeLoading && <Text style={styles.infoText}>Checking pincode...</Text>}
            {pincodeError && <Text style={styles.errorText}>Pincode fetch error: {pincodeError}</Text>}

            <TextInput
              placeholder="Phone Number"
              style={styles.input}
              placeholderTextColor="#000"
              keyboardType="numeric"
              value={phone}
              onChangeText={setPhone}
              maxLength={10}
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

            <TextInput
              placeholder="Latitude (optional)"
              style={styles.input}
              placeholderTextColor="#000"
              keyboardType="numeric"
              value={latitude}
              onChangeText={setLatitude}
            />
            {errors.latitude && <Text style={styles.errorText}>{errors.latitude}</Text>}

            <TextInput
              placeholder="Longitude (optional)"
              style={styles.input}
              placeholderTextColor="#000"
              keyboardType="numeric"
              value={longitude}
              onChangeText={setLongitude}
            />
            {errors.longitude && <Text style={styles.errorText}>{errors.longitude}</Text>}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.buttonOutlinedFull}
                onPress={() => {
                  setModalVisible(false);
                  clearFields();
                  setEditingIndex(null);
                }}
              >
                <Text style={[commonstyles.text4, { textAlign: 'center' }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonFilled} onPress={handleSave}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <CustomModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
        content="Are you sure you want to delete this address?"
        confirmText="Yes"
        cancelText="No"
        onConfirm={handleDelete}
      />
      </View>

    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    gap:10
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(8, 118, 90, 1)',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 6,
    marginBottom: 16,
    borderColor: '#919191',
    borderWidth: 0.5,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressType: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 4,
  },
  addButton: {
    backgroundColor: 'rgba(8, 118, 90, 1)',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(8, 118, 90, 1)',
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  input: {
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#000',
    borderColor: '#919191',
    borderWidth: 0.5,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 12,
  },
  buttonOutlinedFull: {
    width: '50%',
    padding: 10,
    borderRadius: 4,
    borderColor: 'rgba(8, 118, 90, 1)',
    borderWidth: 1,
  },
  buttonFilled: {
    width: '50%',
    padding: 10,
    borderRadius: 4,
    backgroundColor: 'rgba(8, 118, 90, 1)',
  },
  fixedButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  infoText: {
    color: 'rgba(8, 118, 90, 1)',
    fontSize: 12,
    marginBottom: 8,
  },
});

export default MyAddresses;