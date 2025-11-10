import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

export default function OrderSuccessScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('OrderDetails');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Checkmark in brown circle */}
      <View style={styles.checkCircle}>
        <MaterialIcons name="check" size={54} color="#fff" />
      </View>
      <Text style={styles.orderText}>Order successfully placed for</Text>
      <Text style={styles.addressType}>Home</Text>
      <Text style={styles.addressText}>
        301, JSR Enclave, Danvaipetapuram{'\n'}
        Lorem Ipsum Lorem Dolor Sit
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: height * 0.19,
    paddingHorizontal: 24,
  },
  checkCircle: {
    backgroundColor: '#4D211B',
    width: 92,
    height: 92,
    borderRadius: 46,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  orderText: {
    color: '#414141',
    fontSize: 14.5,
    marginBottom: 3,
    textAlign: 'center',
    opacity: 0.85,
    fontWeight: '500',
  },
  addressType: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
    marginBottom: 5,
    textAlign: 'center',
  },
  addressText: {
    color: '#666',
    fontSize: 14,
    opacity: 0.97,
    lineHeight: 21,
    textAlign: 'center',
  },
});
