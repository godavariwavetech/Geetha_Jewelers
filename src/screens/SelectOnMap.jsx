import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  ActivityIndicator,
  FlatList,
  StatusBar
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../components/CustomModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const GOOGLE_MAPS_API_KEY = 'AIzaSyABU67cyh_U73Wa6hlVFMawvwtAfbNKGRU';

const SelectOnMap = ({ navigation, route }) => {
   const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { customerId } = useSelector(state => state.Auth || {});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('home');
  const [customAddressType, setCustomAddressType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [doorNo, setDoorNo] = useState('');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [region, setRegion] = useState({
    latitude: 17.0005,
    longitude: 81.804,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 17.0005,
    longitude: 81.804,
  });
  const mapRef = useRef(null);
  const lastUpdateTime = useRef(Date.now());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const searchTimeout = useRef(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    name: false,
    email: false,
    contact: false,
    doorNo: false,
    pincode: false,
    landmark: false,
    addressType: false,
    customAddressType: false,
  });

  const showCustomModal = useCallback(
    (title, message, onConfirm = () => {}, confirmText = 'OK', cancelText = null) => {
      return (
        <CustomModal
          visible={true}
          onClose={() => {}}
          title={title}
          content={message}
          confirmText={confirmText}
          cancelText={cancelText}
          onConfirm={onConfirm}
        />
      );
    },
    [],
  );

  const getAddressFromCoordinates = useCallback(async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`,
      );
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        const formattedAddress = data.results[0].formatted_address;

        let cityName = '';
        let stateName = '';
        let postalCode = '';
        let addressLine = '';

        addressComponents.forEach(component => {
          if (component.types.includes('locality')) {
            cityName = component.long_name;
          }
          if (component.types.includes('administrative_area_level_1')) {
            stateName = component.long_name;
          }
          if (component.types.includes('postal_code')) {
            postalCode = component.long_name;
          }
          if (component.types.includes('sublocality') || component.types.includes('route')) {
            addressLine += (addressLine ? ', ' : '') + component.long_name;
          }
        });

        setAddress(formattedAddress);
        setCity(cityName);
        setState(stateName);
        setDoorNo(addressLine || formattedAddress.split(',')[0]);
        setPincode(postalCode);
        setLandmark(cityName);
      } else {
        showCustomModal('Error', 'Failed to get address details. Please try again.');
      }
    } catch (error) {
      console.error('Error getting address:', error);
      showCustomModal('Error', 'Failed to get address details. Please try again.');
    }
  }, [showCustomModal]);

  const animateToRegion = useCallback(newRegion => {
    mapRef.current?.animateToRegion(newRegion, 1000);
  }, []);

  const onRegionChangeComplete = useCallback(newRegion => {
    const currentTime = Date.now();
    if (currentTime - lastUpdateTime.current > 500) {
      setMarkerPosition({
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
      });
      setRegion(newRegion);
      getAddressFromCoordinates(newRegion.latitude, newRegion.longitude);
      lastUpdateTime.current = currentTime;
    }
  }, [getAddressFromCoordinates]);

  const requestLocationPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      getCurrentLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to provide delivery services.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          showCustomModal('Permission Denied', 'Location permission is required to use this feature.');
        }
      } catch (err) {
        console.warn(err);
        showCustomModal('Error', 'Failed to request location permission. Please try again.');
      }
    }
  }, [getCurrentLocation, showCustomModal]);

  const getCurrentLocation = useCallback(() => {
    setIsLoadingLocation(true);
    Geolocation.setRNConfiguration({
      enableHighAccuracy: false,
      timeout: 2000,
      maximumAge: 1000,
    });

    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };

        setMarkerPosition({ latitude, longitude });
        setRegion(newRegion);
        animateToRegion(newRegion);
        getAddressFromCoordinates(latitude, longitude);
        setIsLoadingLocation(false);
      },
      error => {
        let errorMessage = 'Unable to get your location. ';
        switch (error.code) {
          case 1:
            errorMessage += 'Please enable location permissions in your device settings.';
            break;
          case 2:
            errorMessage += 'Location service is not available. Please check your device settings.';
            break;
          case 3:
            errorMessage += 'Request timed out. Please check your internet connection and try again.';
            break;
          case 4:
            errorMessage += 'Please check if Google Play services is installed and up to date.';
            break;
          default:
            errorMessage += 'Please try again.';
        }
        setIsLoadingLocation(false);
        showCustomModal('Location Error', errorMessage, () => getCurrentLocation(), 'Try Again', 'Cancel');
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }, [animateToRegion, getAddressFromCoordinates, showCustomModal]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const validateInputs = useCallback(() => {
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
  
    if (!contact.trim()) {
      newErrors.contact = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(contact.trim())) {
      newErrors.contact = 'Phone Number must be 10 digits';
    }
  
    if (!doorNo.trim()) {
      newErrors.doorNo = 'Address Line is required';
    } else if (doorNo.trim().length < 2) {
      newErrors.doorNo = 'Address Line must be at least 2 characters';
    }
  
    if (!pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(pincode.trim())) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }
  
    if (!landmark.trim()) {
      newErrors.landmark = 'Landmark is required';
    } else if (!/^[\w\s,.-]{2,100}$/.test(landmark.trim())) {
      newErrors.landmark = 'Landmark must be 2–100 characters';
    }
  
    if (!selectedType) {
      newErrors.addressType = 'Address Type is required';
    } else if (selectedType === 'Other' && !customAddressType.trim()) {
      newErrors.customAddressType = 'Custom Address Type is required';
    } else if (
      selectedType === 'Other' &&
      !/^[a-zA-Z\s]{2,20}$/.test(customAddressType.trim())
    ) {
      newErrors.customAddressType = 'Custom Address Type must be 2–20 alphabetic characters';
    }
  
    setInputErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, email, contact, doorNo, pincode, landmark, selectedType, customAddressType]);

  const toggleModal = useCallback(() => {
    if (!modalVisible) {
      // Prefill modal fields with map-selected data
      setName('');
      setEmail('');
      setContact('');
      setDoorNo(address.split(',')[0] || '');
      setPincode(pincode || '');
      setLandmark(city || '');
      setSelectedType('home');
      setCustomAddressType('');
    }
    setModalVisible(prev => !prev);
  }, [address, city, pincode]);

  const handleSave = async () => {
    if (!validateInputs()) {
      return;
    }

    const fullAddress = `${doorNo}, ${city}, ${state}, India - ${pincode}`;
    const finalAddressType = selectedType === 'Other' ? customAddressType : selectedType.toLowerCase();

    setIsSaving(true);
    try {
      const addressData = {
        id: Date.now().toString(),
        customer_name: name,
        customer_email: email,
        customer_mobile_number: contact,
        full_address: fullAddress,
        address_type: finalAddressType,
        customer_latitude: markerPosition.latitude,
        customer_longitude: markerPosition.longitude,
      };

      navigation.navigate('MyAddresses', { newAddress: addressData });
      setModalVisible(false);
      setIsSaving(false);
    } catch (err) {
      setIsSaving(false);
      showCustomModal('Error', `Failed to add address: ${err.message || 'Please try again.'}`);
    }
  };

  const handleSearch = useCallback(
    text => {
      setSearchQuery(text);
      setShowResults(true);

      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }

      searchTimeout.current = setTimeout(async () => {
        if (text.trim().length > 2) {
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
                text,
              )}&key=${GOOGLE_MAPS_API_KEY}`,
            );
            const data = await response.json();

            if (data.status === 'OK') {
              setSearchResults(data.predictions);
            } else {
              setSearchResults([]);
              showCustomModal('Error', 'Failed to fetch search results. Please try again.');
            }
          } catch (error) {
            console.error('Error searching places:', error);
            setSearchResults([]);
            showCustomModal('Error', 'Failed to fetch search results. Please try again.');
          }
        } else {
          setSearchResults([]);
        }
      }, 500);
    },
    [showCustomModal],
  );

  const handlePlaceSelect = useCallback(
    async placeId => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry,formatted_address,address_components&key=${GOOGLE_MAPS_API_KEY}`,
        );
        const data = await response.json();

        if (data.status === 'OK') {
          const { location } = data.result.geometry;
          const addressComponents = data.result.address_components;
          const formattedAddress = data.result.formatted_address;

          let cityName = '';
          let stateName = '';
          let postalCode = '';
          let addressLine = '';

          addressComponents.forEach(component => {
            if (component.types.includes('locality')) {
              cityName = component.long_name;
            }
            if (component.types.includes('administrative_area_level_1')) {
              stateName = component.long_name;
            }
            if (component.types.includes('postal_code')) {
              postalCode = component.long_name;
            }
            if (component.types.includes('sublocality') || component.types.includes('route')) {
              addressLine += (addressLine ? ', ' : '') + component.long_name;
            }
          });

          const newRegion = {
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          };

          setMarkerPosition({ latitude: location.lat, longitude: location.lng });
          setRegion(newRegion);
          animateToRegion(newRegion);
          setAddress(formattedAddress);
          setCity(cityName);
          setState(stateName);
          setDoorNo(addressLine || formattedAddress.split(',')[0]);
          setPincode(postalCode);
          setLandmark(cityName);
          setShowResults(false);
          setSearchQuery('');
          setSearchResults([]);
        } else {
          showCustomModal('Error', 'Failed to get place details. Please try again.');
        }
      } catch (error) {
        console.error('Error getting place details:', error);
        showCustomModal('Error', 'Failed to get place details. Please try again.');
      }
    },
    [animateToRegion, showCustomModal],
  );

  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  return (
    <View style={[styles.container,{paddingBottom:insets.bottom,}]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={[styles.header, {paddingTop: insets.top+10}]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left-long" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Select Address on Map</Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          onRegionChangeComplete={onRegionChangeComplete}
          showsMyLocationButton={false}
          initialRegion={region}
          moveOnMarkerPress={false}
        />
        <View style={styles.markerOverlay}>
          <View style={styles.markerContainer}>
            <View style={styles.markerTextContainer}>
              <Text style={styles.markerText}>Order will be delivered here</Text>
            </View>
            <MaterialIcons name="location-on" size={40} color="rgba(8, 118, 90, 1)" />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.currentLocationButton, isLoadingLocation && styles.currentLocationButtonLoading]}
          onPress={getCurrentLocation}
          disabled={isLoadingLocation}>
          {isLoadingLocation ? (
            <ActivityIndicator color="rgba(8, 118, 90, 1)" size="small" />
          ) : (
            <>
              <MaterialIcons name="my-location" size={24} color="rgba(8, 118, 90, 1)" />
              <Text style={styles.currentLocationText}>use current location</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <AntDesign name="search1" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            placeholder="Search for Area/Location"
            style={styles.searchInput}
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                setSearchQuery('');
                setSearchResults([]);
                setShowResults(false);
              }}>
              <AntDesign name="close" size={20} color="#7A7A7A" />
            </TouchableOpacity>
          )}
        </View>
        {showResults && searchResults.length > 0 && (
          <View style={styles.searchResultsContainer}>
            <ScrollView>
              {searchResults.map(result => (
                <TouchableOpacity
                  key={result.place_id}
                  style={styles.searchResultItem}
                  onPress={() => handlePlaceSelect(result.place_id)}>
                  <MaterialIcons name="location-on" size={20} color="rgba(8, 118, 90, 1)" />
                  <View style={styles.searchResultText}>
                    <Text style={styles.searchResultMain}>
                      {result.structured_formatting?.main_text || result.description}
                    </Text>
                    <Text style={styles.searchResultSecondary}>
                      {result.structured_formatting?.secondary_text || ''}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {!isKeyboardVisible && (
        <View style={styles.bottomContainer}>
          <View style={styles.locationInfo}>
            <View style={styles.locationIcon}>
              <MaterialIcons name="location-on" size={24} color="rgba(8, 118, 90, 1)" />
            </View>
            <View style={styles.locationDetails}>
              <Text style={styles.locationTitle}>{city || 'Location'}</Text>
              <Text style={styles.locationSubtitle}>{address || 'Loading address...'}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={toggleModal}
            disabled={isSaving}>
            {isSaving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.addButtonText}>Add More Details</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable style={styles.modalContainer} onPress={() => setModalVisible(false)}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
            style={styles.keyboardView}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.modalContentContainer}
              onPress={e => e.stopPropagation()}>
              <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                <Pressable style={styles.modalContent}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', padding: 16 }}>
                    <View style={{ width: '70%' }}>
                      <Text style={styles.modalTitle}>{city || 'Location'}</Text>
                      <Text style={styles.modalSubtitle}>{address || 'Loading address...'}</Text>
                    </View>
                    <TouchableOpacity onPress={toggleModal} style={{ padding: 10, borderRadius: 5 }}>
                      <AntDesign name="close" size={20} color="#666" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.typeButtons}>
                    <FlatList
                      data={['Home', 'Work', 'Other']}
                      keyExtractor={item => item}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      contentContainerStyle={{ paddingHorizontal: 12 }}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={[styles.typeButton, selectedType === item && styles.selectedTypeButton]}
                          onPress={() => setSelectedType(item)}>
                          <Text
                            style={[styles.typeButtonText, selectedType === item && styles.selectedTypeButtonText]}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
                    {inputErrors.addressType && (
                      <Text style={styles.errorText}>{inputErrors.addressType}</Text>
                    )}
                    {selectedType === 'Other' && (
                      <>
                        <TextInput
                          placeholder="Enter Address Type"
                          style={styles.input}
                          placeholderTextColor="#666"
                          value={customAddressType}
                          onChangeText={setCustomAddressType}
                        />
                        {inputErrors.customAddressType && (
                          <Text style={styles.errorText}>{inputErrors.customAddressType}</Text>
                        )}
                      </>
                    )}
                  </View>

                  <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.label}>Name</Text>
                      <Text style={styles.requiredAsterisk}>*</Text>
                    </View>
                    <View style={[styles.inputContainer, inputErrors.name && { borderColor: 'red' }]}>
                      <TextInput
                        placeholder="Name"
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        keyboardType="default"
                        placeholderTextColor="#666"
                        maxLength={50}
                      />
                      <TouchableOpacity style={styles.clearButton} onPress={() => setName('')}>
                        <AntDesign name="close" size={20} color="#7A7A7A" />
                      </TouchableOpacity>
                    </View>
                    {inputErrors.name && <Text style={styles.errorText}>{inputErrors.name}</Text>}

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.label}>Email</Text>
                      <Text style={styles.requiredAsterisk}>*</Text>
                    </View>
                    <View style={[styles.inputContainer, inputErrors.email && { borderColor: 'red' }]}>
                      <TextInput
                        placeholder="Email"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        placeholderTextColor="#666"
                        maxLength={100}
                      />
                      <TouchableOpacity style={styles.clearButton} onPress={() => setEmail('')}>
                        <AntDesign name="close" size={20} color="#7A7A7A" />
                      </TouchableOpacity>
                    </View>
                    {inputErrors.email && <Text style={styles.errorText}>{inputErrors.email}</Text>}

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.label}>Contact number</Text>
                      <Text style={styles.requiredAsterisk}>*</Text>
                    </View>
                    <View style={[styles.inputContainer, inputErrors.contact && { borderColor: 'red' }]}>
                      <TextInput
                        placeholder="Contact Number"
                        style={styles.input}
                        value={contact}
                        onChangeText={setContact}
                        keyboardType="phone-pad"
                        placeholderTextColor="#666"
                        maxLength={10}
                      />
                      <TouchableOpacity style={styles.clearButton} onPress={() => setContact('')}>
                        <AntDesign name="close" size={20} color="#7A7A7A" />
                      </TouchableOpacity>
                    </View>
                    {inputErrors.contact && <Text style={styles.errorText}>{inputErrors.contact}</Text>}

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.label}>Door no/Flat no/Building</Text>
                      <Text style={styles.requiredAsterisk}>*</Text>
                    </View>
                    <View style={[styles.inputContainer, inputErrors.doorNo && { borderColor: 'red' }]}>
                      <TextInput
                        placeholder="Enter address"
                        style={styles.input}
                        value={doorNo}
                        onChangeText={setDoorNo}
                        keyboardType="default"
                        placeholderTextColor="#666"
                        maxLength={100}
                      />
                      <TouchableOpacity style={styles.clearButton} onPress={() => setDoorNo('')}>
                        <AntDesign name="close" size={20} color="#7A7A7A" />
                      </TouchableOpacity>
                    </View>
                    {inputErrors.doorNo && <Text style={styles.errorText}>{inputErrors.doorNo}</Text>}

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.label}>Pincode</Text>
                      <Text style={styles.requiredAsterisk}>*</Text>
                    </View>
                    <View style={[styles.inputContainer, inputErrors.pincode && { borderColor: 'red' }]}>
                      <TextInput
                        placeholder="Enter pincode"
                        style={styles.input}
                        value={pincode}
                        onChangeText={setPincode}
                        keyboardType="number-pad"
                        placeholderTextColor="#666"
                        maxLength={6}
                      />
                      <TouchableOpacity style={styles.clearButton} onPress={() => setPincode('')}>
                        <AntDesign name="close" size={20} color="#7A7A7A" />
                      </TouchableOpacity>
                    </View>
                    {inputErrors.pincode && <Text style={styles.errorText}>{inputErrors.pincode}</Text>}

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.label}>Nearby Landmark</Text>
                      <Text style={styles.requiredAsterisk}>*</Text>
                    </View>
                    <View style={[styles.inputContainer, inputErrors.landmark && { borderColor: 'red' }]}>
                      <TextInput
                        placeholder="Enter landmark"
                        style={styles.input}
                        value={landmark}
                        onChangeText={setLandmark}
                        keyboardType="default"
                        placeholderTextColor="#666"
                        maxLength={100}
                      />
                      <TouchableOpacity style={styles.clearButton} onPress={() => setLandmark('')}>
                        <AntDesign name="close" size={20} color="#7A7A7A" />
                      </TouchableOpacity>
                    </View>
                    {inputErrors.landmark && <Text style={styles.errorText}>{inputErrors.landmark}</Text>}

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isSaving}>
                      <Text style={styles.saveButtonText}>Save Address</Text>
                    </TouchableOpacity>
                  </View>
                </Pressable>
              </ScrollView>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 30,
  },
  header: {
    backgroundColor: 'rgba(8, 118, 90, 1)',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: responsiveWidth(6),
    paddingBottom: 15,
    gap: 10,
  },
  backButton: {
    width: responsiveWidth(7),
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  markerOverlay: {
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40,
  },
  markerContainer: {
    alignItems: 'center',
  },
  markerTextContainer: {
    backgroundColor: 'rgba(8, 118, 90, 1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  searchContainer: {
    position: 'absolute',
    top: responsiveHeight(17),
    left: 0,
    right: 0,
    zIndex: 2,
    paddingHorizontal: responsiveWidth(5),
  },
  searchInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(3),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchIcon: {
    marginRight: responsiveWidth(2),
  },
  searchInput: {
    flex: 1,
    paddingVertical: responsiveHeight(2),
    fontSize: 14,
    color: '#000',
  },
  searchResultsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 8,
    maxHeight: 200,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 3,
  },
  bottomContainer: {
    backgroundColor: '#fff',
    padding: responsiveWidth(5),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 1,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: responsiveHeight(2),
  },
  locationIcon: {
    marginRight: responsiveWidth(3),
    marginTop: 2,
  },
  locationDetails: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  locationSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(8, 118, 90, 1)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 'auto',
  },
  currentLocationButtonLoading: {
    opacity: 0.7,
  },
  currentLocationText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: 'rgba(8, 118, 90, 1)',
    borderRadius: 8,
    paddingVertical: responsiveHeight(1.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  keyboardView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    minHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  typeButtons: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  typeButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#666',
    backgroundColor: '#fff',
    width: responsiveWidth(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: responsiveWidth(1),
  },
  selectedTypeButton: {
    backgroundColor: 'rgba(8, 118, 90, 1)',
  },
  typeButtonText: {
    color: '#666',
    fontWeight: '500',
    fontSize: 16,
  },
  selectedTypeButtonText: {
    color: '#fff',
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 5,
    color: '#525252',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    color: '#000',
    fontWeight: '600',
    flex: 1,
    paddingVertical: 8,
  },
  clearButton: {
    padding: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: 'rgba(8, 118, 90, 1)',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchResultText: {
    marginLeft: 10,
    flex: 1,
  },
  searchResultMain: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  searchResultSecondary: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  requiredAsterisk: {
    color: 'red',
    marginLeft: 2,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    marginHorizontal: 16,
  },
});

export default SelectOnMap;