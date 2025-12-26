import React, { useState, useEffect, useCallback } from 'react';
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
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCustomerDeliveryAddress,
  getCustomerAddresses,
  deleteCustomerAddress,
} from '../redux/slices/authSlice';
import CustomModal from '../components/CustomModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import commonstyles from '../commonstyles/commonstyles';

const MyAddresses = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addressIndexToDelete, setAddressIndexToDelete] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState(''); // Default as per backend example
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [addressType, setAddressType] = useState('home');
  const [customAddressType, setCustomAddressType] = useState('');
  const [errors, setErrors] = useState({});

  const { customerId, addressList = [] } = useSelector((state) => state.Auth || {});

  useEffect(() => {
    if (customerId) {
      dispatch(getCustomerAddresses({ customerId }));
    }
  }, [customerId, dispatch]);

  const clearFields = () => {
    setName('');
    setEmail('');
    setAddressLine('');
    setCity('');
    setState('');
    setDistrict('');
    setPincode('');
    setPhone('');
    setAddressType('home');
    setCustomAddressType('');
    setErrors({});
  };

  const validateFields = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Full Name is required';
    else if (!/^[a-zA-Z\s]{2,50}$/.test(name.trim()))
      newErrors.name = 'Full Name must be 2–50 alphabetic characters';

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      newErrors.email = 'Invalid email format';

    if (!addressLine.trim()) newErrors.addressLine = 'Address Line is required';
    else if (!/^[\w\s,.-]{5,100}$/.test(addressLine.trim()))
      newErrors.addressLine = 'Address Line must be 5–100 characters';

    if (!city.trim()) newErrors.city = 'City is required';
    else if (!/^[a-zA-Z\s]{2,50}$/.test(city.trim()))
      newErrors.city = 'City must be 2–50 alphabetic characters';

    if (!state.trim()) newErrors.state = 'State is required';
    else if (!/^[a-zA-Z\s]{2,50}$/.test(state.trim()))
      newErrors.state = 'State must be 2–50 alphabetic characters';

    if (!district.trim()) newErrors.district = 'District is required';
    else if (!/^[a-zA-Z\s]{2,50}$/.test(district.trim()))
      newErrors.district = 'District must be 2–50 alphabetic characters';

    if (!pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(pincode.trim()))
      newErrors.pincode = 'Pincode must be exactly 6 digits';

    if (!phone.trim()) newErrors.phone = 'Phone Number is required';
    else if (!/^\d{10}$/.test(phone.trim()))
      newErrors.phone = 'Phone Number must be 10 digits';

    if (!addressType) newErrors.addressType = 'Address Type is required';
    else if (addressType === 'other' && !customAddressType.trim())
      newErrors.customAddressType = 'Custom Address Type is required';
    else if (
      addressType === 'other' &&
      !/^[a-zA-Z\s]{2,20}$/.test(customAddressType.trim())
    )
      newErrors.customAddressType = 'Custom Address Type must be 2–20 alphabetic characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePincodeChange = (text) => {
    setPincode(text);
    if (text === '') setErrors((prev) => ({ ...prev, pincode: null }));
  };

  const openModalForEdit = (index) => {
    const addr = addressList[index];

    setName(addr.customer_name || '');
    setEmail(addr.customer_email || '');
    setAddressLine(addr.address || '');
    setCity(addr.city || '');
    setState(addr.state || '');
    setDistrict(addr.district || '');
    setPincode(addr.pincode ? String(addr.pincode) : '');
    setPhone(String(addr.customer_mobile_number || ''));
    setAddressType(addr.address_type?.toLowerCase() || 'home');
    setCustomAddressType(
      ['home', 'work'].includes(addr.address_type?.toLowerCase()) ? '' : addr.address_type || ''
    );
    setEditingIndex(index);
    setModalVisible(true); 
  };

  // Wrapped in useCallback to prevent "Property 'handleDelete' doesn't exist" error
  const handleDelete = useCallback(async () => {
    const addressId = addressList[addressIndexToDelete]?.id;
    if (!addressId) return;

    try {
      await dispatch(deleteCustomerAddress({ addressId })).unwrap();
      await dispatch(getCustomerAddresses({ customerId }));
    } catch (err) {
      console.warn('Delete failed:', err);
    }

    setShowDeleteModal(false);
    setAddressIndexToDelete(null);
  }, [addressList, addressIndexToDelete, dispatch, customerId]);

  const handleSave = async () => {
    if (!validateFields()) return;

    const finalAddressType = addressType === 'other' ? customAddressType : addressType;
    try {
      await dispatch(
        addCustomerDeliveryAddress({
          userId: customerId,
          addressType: finalAddressType,
          addressLine: addressLine.trim(),
          city: city.trim(),
          state: state.trim(),
          district: district.trim(),
          pincode: parseInt(pincode),
          customerName: name.trim(),
          customerPhone: phone.trim(),
          customerEmail: email.trim() || undefined,
        })
      ).unwrap();

      await dispatch(getCustomerAddresses({ customerId }));
    } catch (err) {
      console.warn('Failed to save address:', err);
    }

    setModalVisible(false);
    clearFields();
    setEditingIndex(null);
  };

  // Format address for display when some fields may be null
  const formatDisplayAddress = (addr) => {
    const parts = [];
    if (addr.address) parts.push(addr.address);
    if (addr.city) parts.push(addr.city);
    if (addr.state) parts.push(addr.state);
    if (addr.pincode) parts.push(addr.pincode);
    return parts.length > 0 ? parts.join(', ') : 'Address details incomplete';
  };

  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={[styles.container, { paddingTop: insets.top }]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={22} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>My Addresses</Text>
            <View style={{ width: 22 }} />
          </View>

          <ScrollView
            contentContainerStyle={[
              styles.content,
              { paddingBottom: insets.bottom + 80 },
            ]}
            showsVerticalScrollIndicator={false}
          >
            {Array.isArray(addressList) && addressList.length > 0 ? (
              addressList.map((address, index) => (
                <View style={styles.card} key={address.id || index}>
                  <View style={styles.nameRow}>
                    <Text style={[commonstyles.text6, { color: '#000', }]}>
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

                  <Text style={[commonstyles.text4, { lineHeight: 22 }]}>
                    {formatDisplayAddress(address)}
                  </Text>

                  <Text style={[commonstyles.text4, { lineHeight: 20 }]}>
                    Phone: <Text style={{ fontWeight: '500' }}>{address.customer_mobile_number}</Text>
                  </Text>

                  {address.customer_email && (
                    <Text style={[commonstyles.text4, { lineHeight: 20 }]}>
                      Email: <Text style={{ fontWeight: '500' }}>{address.customer_email}</Text>
                    </Text>
                  )}

                  {/* <TouchableOpacity style={styles.editButton} onPress={() => openModalForEdit(index)}>
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity> */}
                </View>
              ))
            ) : (
              <Text style={commonstyles.text7}>No addresses found.</Text>
            )}
          </ScrollView>

          {/* Fixed Add Button */}
          <View style={[styles.fixedButtonWrapper, { paddingBottom: insets.bottom + 10 }]}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                clearFields();
                setEditingIndex(null);
                setModalVisible(true);
              }}
            >
              <Text style={[commonstyles.text9, { color: '#fff' }]}>+ Add Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* Add/Edit Address Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.modalOverlay}>
            <ScrollView contentContainerStyle={styles.modalScrollContent} keyboardShouldPersistTaps="handled">
              <View style={styles.modalContainer}>
                <Text style={[commonstyles.text9, commonstyles.marginBottom12]}>
                  {editingIndex !== null ? 'Edit Address' : 'Add Address'}
                </Text>

                {/* Address Type */}
                <View style={{ marginBottom: 12 }}>
                  <Text style={commonstyles.text4}>Address Type</Text>
                  <View style={{ flexDirection: 'row', marginTop: 8, gap: 12 }}>
                    {['home', 'work', 'other'].map((type) => (
                      <TouchableOpacity
                        key={type}
                        onPress={() => setAddressType(type)}
                        style={{
                          padding: 8,
                          borderWidth: 1,
                          borderColor: addressType === type ? '#000' : '#ccc',
                          backgroundColor: addressType === type ? '#000' : '#fff',
                          borderRadius: 4,
                        }}
                      >
                        <Text style={{ color: addressType === type ? '#fff' : '#000' }}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {errors.addressType && <Text style={styles.errorText}>{errors.addressType}</Text>}

                  {addressType === 'other' && (
                    <>
                      <TextInput
                        placeholder="Enter Custom Address Type"
                          placeholderTextColor="#999"
                        style={styles.input}
                        // placeholderTextColor="#999"
                        value={customAddressType}
                        onChangeText={setCustomAddressType}
                      />
                      {errors.customAddressType && <Text style={styles.errorText}>{errors.customAddressType}</Text>}
                    </>
                  )}
                </View>

                <TextInput placeholder="Full Name"   placeholderTextColor="#999" style={styles.input} value={name} onChangeText={setName} />
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                <TextInput
                  placeholder="Email (Optional)"
                    placeholderTextColor="#999"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <TextInput
                  placeholder="Address Line (Flat, Building, Street)"
                    placeholderTextColor="#999"
                  style={styles.input}
                  value={addressLine}
                  onChangeText={setAddressLine}
                />
                {errors.addressLine && <Text style={styles.errorText}>{errors.addressLine}</Text>}

                <TextInput placeholder="City"   placeholderTextColor="#999" style={styles.input} value={city} onChangeText={setCity} />
                {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

                <TextInput placeholder="State"   placeholderTextColor="#999" style={styles.input} value={state} onChangeText={setState} />
                {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

                <TextInput
                  placeholder="District"
                    placeholderTextColor="#999"
                  style={styles.input}
                  value={district}
                  onChangeText={setDistrict}
                />
                {errors.district && <Text style={styles.errorText}>{errors.district}</Text>}

                <TextInput
                  placeholder="Pincode"
                  placeholderTextColor="#999"
                  style={styles.input}
                  keyboardType="numeric"
                  value={pincode}
                  onChangeText={handlePincodeChange}
                  maxLength={6}
                />
                {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}

                <TextInput
                  placeholder="Phone Number"
                    placeholderTextColor="#999"
                  style={styles.input}
                  keyboardType="numeric"
                  value={phone}
                  onChangeText={setPhone}
                  maxLength={10}
                />
                {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

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
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Delete Confirmation Modal */}
      <CustomModal
        visible={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setAddressIndexToDelete(null);
        }}
        title="Confirm Deletion"
        content="Are you sure you want to delete this address?"
        confirmText="Yes"
        cancelText="No"
        onConfirm={handleDelete}
      />
    </>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
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
    position: 'relative',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  deleteButton: {
    padding: 8,
  },
  editButton: {
    position: 'absolute',
    right: 16,
    bottom: 12,
    backgroundColor: '#832729',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  editText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#832729',
    padding: 14,
    alignItems: 'center',
    borderRadius: 8,
  },
  fixedButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#832729',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  modalScrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  input: {
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: '#000',
    borderColor: '#919191',
    borderWidth: 0.5,
    backgroundColor: '#fff',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
  },
  buttonOutlinedFull: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    borderColor: '#000',
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonFilled: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#832729',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    marginTop: -8,
  },
});

export default MyAddresses;