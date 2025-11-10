import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  requestLocationPermission,
  checkLocationPermission,
  setLocation,
  setLocationName,
} from '../redux/slices/authSlice';
import Geolocation from '@react-native-community/geolocation';
import commonstyles from '../commonstyles/commonstyles';
import { RESULTS } from 'react-native-permissions';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const customerId = useSelector((state) => state.Auth.customerId);
  const locationPermissionStatus = useSelector(
    (state) => state.Auth.locationPermissionStatus
  );
  const locationPermissionLoading = useSelector(
    (state) => state.Auth.locationPermissionLoading
  );
  const location = useSelector((state) => state.Auth.location);

  const fetchLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const newRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };
        dispatch(setLocation(newRegion));
        dispatch(setLocationName('Current Location'));
        console.log('Location stored:', newRegion);
      },
      (error) => {
        console.error('Error fetching location:', {
          message: error.message,
          code: error.code,
          details: error,
        });
        Alert.alert(
          'Error',
          `Unable to fetch your location: ${error.message}. Please ensure location services are enabled and try again.`
        );
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 10000,
      }
    );
  }, [dispatch]);

  const promptLocationPermission = () => {
    Alert.alert(
      'Location Access',
      'We need your location to provide personalized services like nearby stores or delivery tracking.',
      [
        {
          text: 'Allow',
          onPress: async () => {
            try {
              const result = await dispatch(requestLocationPermission()).unwrap();
              if (result === RESULTS.GRANTED) {
                fetchLocation();
              } else {
                console.log('Location permission not granted:', result);
                Alert.alert(
                  'Permission Denied',
                  'Location access is required for personalized services. You can enable it in your device settings.'
                );
              }
            } catch (error) {
              console.error('Permission request error:', error);
              Alert.alert('Error', 'Failed to request location permission.');
            }
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
            console.log('User declined location permission');
          },
          style: 'cancel',
        },
      ]
    );
  };

  useEffect(() => {
    if (!locationPermissionLoading && locationPermissionStatus === null) {
      dispatch(checkLocationPermission());
    }
  }, [dispatch, locationPermissionLoading, locationPermissionStatus]);

  useEffect(() => {
    const handlePermissionLogic = () => {
      if (locationPermissionLoading) return;
      if (locationPermissionStatus === null) return;

      if (locationPermissionStatus === RESULTS.GRANTED) {
        if (!location) {
          fetchLocation();
        }
        return;
      }

      promptLocationPermission();
    };

    handlePermissionLogic();
  }, [
    locationPermissionStatus,
    locationPermissionLoading,
    location,
    dispatch,
    fetchLocation,
    promptLocationPermission,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (customerId) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'TabNavigator' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [customerId, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.content}>
        <Image
          source={require('../assets/geethalogo.png')}
          style={{ width: 244, height: 119 }}
          resizeMode="contain"
        />
      </View>
      {/* <View style={styles.footer}>
        <Text style={commonstyles.text2}>🇮🇳 Proudly Made In India</Text>
      </View> */}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(8, 118, 90, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginBottom: 10,
  },
});