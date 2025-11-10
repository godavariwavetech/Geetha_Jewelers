import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import commonstyles from '../commonstyles/commonstyles';

const OrderCard = ({
  year = '2024',
  orderId = 'FN8956508333',
  status = 'Delivered',
  date = '23 Jul',
  imageSource,
  onPress = () => {
    
  },
},) => {
  return (
    <View style={styles.cardWrapper}>
      {/* Header with year */}
     

      {/* Order Info */}
      <Text style={[commonstyles.text7, commonstyles.marginBottom12]}>
        Order ID : {orderId}
      </Text>

      <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.statusContainer}>
          <Text style={commonstyles.text9}>{status}</Text>
          <Text style={[commonstyles.text7, { fontFamily: 'Obviously-RegularItalic' }]}>
            Delivered on {date}
          </Text>
        </View>
        <FontAwesome name="angle-right" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    // margin: 12,
  },
  cardContainer: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#919191',
  },
  image: {
    width: 90,
    height: 64,
    borderRadius: 2,
    marginRight: 10,
    aspectRatio: 3 / 4,
  },
  statusContainer: {
    flex: 1,
  },
});

export default OrderCard;
