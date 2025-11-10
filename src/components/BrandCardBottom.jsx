// // components/BrandCardBottom.js
// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';

// const BrandCardBottom = ({ logo, image, brandName, offer, description }) => {
//   return (
//     <View style={styles.card}>
//       <View style={styles.imageContainer}>
//         <Image source={image} style={styles.mainImage} />
//         <View style={styles.logoOverlay}>
//           <Image source={logo} style={styles.logo} />
//         </View>
//       </View>
//       <Text style={styles.brandName}>{brandName}</Text>
//       <Text style={styles.offer}>{offer}</Text>
//       <Text style={styles.description}>{description}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     width: 160,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     marginRight: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   imageContainer: {
//     position: 'relative',
//   },
//   mainImage: {
//     width: '100%',
//     height: 80,
//     borderRadius: 6,
//   },
//   logoOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     backgroundColor: '#fff',
//     padding: 4,
//     borderRadius: 6,
//   },
//   logo: {
//     width: 40,
//     height: 40,
//     resizeMode: 'contain',
//   },
//   brandName: {
//     fontWeight: 'bold',
//     fontSize: 14,
//     marginTop: 8,
//   },
//   offer: {
//     fontSize: 13,
//     marginTop: 2,
//   },
//   description: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 2,
//   },
// });

// export default BrandCardBottom;
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const BrandCardBottom = ({ logo, image, brandName }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.mainImage} />
        <View style={styles.logoOverlay}>
          <Image source={logo} style={styles.logo} />
        </View>
      </View>
      {/* <Text style={styles.brandName}>{brandName}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: 100,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  logoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 6,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  brandName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
  },
});

export default BrandCardBottom;