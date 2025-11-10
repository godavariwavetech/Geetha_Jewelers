import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PromoHighlightCard = ({ title, buttonText, onPress }) => {
  return (
    <LinearGradient
      colors={['#5E61EB', '#262757']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.cardContainer}
    >
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
        {/* <View style={styles.iconCircle}>
          <Ionicons name="chevron-forward" size={16} color="#262757" />
        </View> */}
      </View>

      {/* <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity> */}
    </LinearGradient>
  );
};

export default PromoHighlightCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    padding: 16,
    width: '100%',
    minHeight: 100, // Maintained minimum height
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Ensure text itself is centered
  },
  iconCircle: {
    backgroundColor: '#fff',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#262757',
    fontWeight: 'bold',
    fontSize: 15,
  },
});