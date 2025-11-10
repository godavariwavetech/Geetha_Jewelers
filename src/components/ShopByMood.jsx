// import React from "react";
// import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
// import commonstyles from "../commonstyles/commonstyles";

// const { width } = Dimensions.get("window");
// const boxSize = width / 2 - 20;
// const boxWidth = width / 2 - 20; // size for each quadrant
// const boxHeight = boxWidth * 0.75; // reduce height (adjust 0.75 as needed)
// const moods = [
//   {
//     title: "Party\nwear",
//     bg: ["#d48cbf", "#7c375e"], // pink gradient
//     imageAlign: "left",
//     textAlign: "topRight",
//   },
//   {
//     title: "Work\nwear",
//     bg: ["#e2b57a", "#7a4a2b"], // orange gradient
//     imageAlign: "right",
//     textAlign: "topLeft",
//   },
//   {
//     title: "Occasion\nwear",
//     bg: ["#918fe7", "#342c72"], // purple gradient
//     imageAlign: "left",
//     textAlign: "bottomRight",
//   },
//   {
//     title: "Gym\nWear",
//     bg: ["#7ed6a1", "#255437"], // green gradient
//     imageAlign: "right",
//     textAlign: "bottomLeft",
//   },
// ];

// export default function ShopByMood() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.grid}>
//         {moods.map((item, index) => (
//           <TouchableOpacity key={index} style={styles.box}>
//             <LinearGradient
//               colors={item.bg}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//               style={styles.innerBox}
//             >
//               {/* Image */}
//               <Image
//                 source={require("../assets/men.png")}
//                 style={[
//                   styles.image,
//                   item.imageAlign === "left" ? { alignSelf: "flex-start" } : { alignSelf: "flex-end" },
//                 ]}
//                 resizeMode="contain"
//               />

//               {/* Text */}
//               <Text
//                 style={[
//                   commonstyles.text4,
//                   item.textAlign === "topRight" && styles.topRight,
//                   item.textAlign === "topLeft" && styles.topLeft,
//                   item.textAlign === "bottomRight" && styles.bottomRight,
//                   item.textAlign === "bottomLeft" && styles.bottomLeft,
//                   {position:"absolute",color:"#fff"}
//                 ]}
//               >
//                 {item.title}
//               </Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         ))}

//         {/* Center Circle */}
//         <View style={styles.centerCircle}>
//           <Text style={styles.centerText}>Shop by{"\n"}Mood</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom:24,
//     // borderRadius:8
//   },
//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     width: width - 20,
//     justifyContent: "center",
//     position: "relative",
//     borderRadius:8
//   },
//   box: {
//     width: boxWidth,
//     height: boxHeight, // reduced height
//     margin: 5,
//     borderRadius:8
//   },nerBox: {
//     flex: 1,
//     // borderRadius: 19,
//     padding: 10,
//   },
//   image: {
//     width: "70%",
//     height: "100%",
//   },
//   text: {
//     position: "absolute",
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   topRight: {
//     top: 10,
//     right: 10,
//     textAlign: "right",
//   },
//   topLeft: {
//     top: 10,
//     left: 10,
//     textAlign: "left",
//   },
//   bottomRight: {
//     bottom: 10,
//     right: 10,
//     textAlign: "right",
//   },
//   bottomLeft: {
//     bottom: 10,
//     left: 10,
//     textAlign: "left",
//   },
//   centerCircle: {
//     position: "absolute",
//     top: "30%",
//     left: "30%",
//     width: width / 2.9,
//     height: width / 2.9,
//     borderRadius: width / 5,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 8,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//   },
//   centerText: {
//     fontSize: 18,
//     fontWeight: "700",
//     textAlign: "center",
//     color: "#000",
//   },
//   box: {
//     width: boxWidth,
//     height: boxHeight,
//     margin: 5,
//     borderRadius: 12,     // rounded corners
//     overflow: "hidden",   // ensures gradient & image respect corners
//   },
//   innerBox: {
//     flex: 1,
//     borderRadius: 12,     // match box radius
//     // padding: 10,
//     overflow: "hidden",
//   },
// });
// import React, { useEffect } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOccasions } from '../redux/slices/categorySlice'; // Adjust path if needed
// import commonstyles from '../commonstyles/commonstyles';
// import { useNavigation } from '@react-navigation/native';

// const { width } = Dimensions.get('window');
// const boxWidth = width / 2 - 20;
// const boxHeight = boxWidth * 0.75;

// // Gradient colors for each box (cycling through these)
// const gradients = [
//   ['#d48cbf', '#7c375e'], // Pink gradient
//   ['#e2b57a', '#7a4a2b'], // Orange gradient
//   ['#918fe7', '#342c72'], // Purple gradient
//   ['#7ed6a1', '#255437'], // Green gradient
// ];

// // Image and text alignments for each box (cycling through these)
// const alignments = [
//   { imageAlign: 'flex-start', textAlign: 'topRight' },
//   { imageAlign: 'flex-end', textAlign: 'topLeft' },
//   { imageAlign: 'flex-start', textAlign: 'bottomRight' },
//   { imageAlign: 'flex-end', textAlign: 'bottomLeft' },
// ];

// export default function ShopByMood({ categoryId }) {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const { occasions, occasionsLoading, occasionsError } = useSelector((state) => state.category);

//   // Fetch occasions when component mounts or categoryId changes
//   useEffect(() => {
//     if (categoryId) {
//       dispatch(fetchOccasions(categoryId));
//     }
//   }, [dispatch, categoryId]);

//   // Handle navigation to product listing screen
//   const handleOccasionPress = (occasionId, occasionName) => {
//     navigation.navigate('ProductListing', { occasionId, occasionName });
//   };

//   // Loading state
//   if (occasionsLoading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   // Error state
//   if (occasionsError) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Error: {occasionsError}</Text>
//         <TouchableOpacity onPress={() => dispatch(fetchOccasions(categoryId))}>
//           <Text style={styles.retryText}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   // Map occasions to include gradient and alignment, limit to 4 items
//   const formattedOccasions = occasions.slice(0, 4).map((item, index) => ({
//     ...item,
//     bg: gradients[index % gradients.length],
//     imageAlign: alignments[index % alignments.length].imageAlign,
//     textAlign: alignments[index % alignments.length].textAlign,
//   }));

//   // Render function for individual box
//   const renderBox = (item, index) => (
//     <TouchableOpacity
//       key={item.id}
//       style={[
//         styles.box,
//         formattedOccasions.length === 3 && index === 2 ? styles.singleBox : {},
//       ]}
//       onPress={() => handleOccasionPress(item.id, item.occasion_name)}
//     >
//       <LinearGradient
//         colors={item.bg}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.innerBox}
//       >
//         <Image
//           source={{ uri: item.image }}
//           style={[styles.image, { alignSelf: item.imageAlign }]}
//           resizeMode="contain"
//           defaultSource={require('../assets/men.png')} // Fallback image
//         />
//         <Text
//           style={[
//             commonstyles.text4,
//             item.textAlign === 'topRight' && styles.topRight,
//             item.textAlign === 'topLeft' && styles.topLeft,
//             item.textAlign === 'bottomRight' && styles.bottomRight,
//             item.textAlign === 'bottomLeft' && styles.bottomLeft,
//             { position: 'absolute', color: '#fff' },
//           ]}
//         >
//           {item.occasion_name.replace(' ', '\n')}
//         </Text>
//       </LinearGradient>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.flexContainer}>
//         {formattedOccasions.map((item, index) => renderBox(item, index))}
//         <View style={styles.centerCircle}>
//           <Text style={styles.centerText}>Shop by{"\n"}Mood</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   flexContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     width: width - 20,
//     justifyContent: 'space-between', // Space boxes evenly
//     position: 'relative',
//     borderRadius: 8,
//   },
//   box: {
//     width: boxWidth,
//     height: boxHeight,
//     margin: 5,
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   singleBox: {
//     alignSelf: 'flex-start', // Align third box to the start of the row
//   },
//   innerBox: {
//     flex: 1,
//     borderRadius: 12,
//     overflow: 'hidden',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: '70%',
//     height: '100%',
//   },
//   topRight: {
//     top: 10,
//     right: 10,
//     textAlign: 'right',
//   },
//   topLeft: {
//     top: 10,
//     left: 10,
//     textAlign: 'left',
//   },
//   bottomRight: {
//     bottom: 10,
//     right: 10,
//     textAlign: 'right',
//   },
//   bottomLeft: {
//     bottom: 10,
//     left: 10,
//     textAlign: 'left',
//   },
//   centerCircle: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     width: width / 2.9,
//     height: width / 2.9,
//     borderRadius: width / 5,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     transform: [{ translateX: -width / 5.8 }, { translateY: -width / 5.8 }],
//   },
//   centerText: {
//     fontSize: 18,
//     fontWeight: '700',
//     textAlign: 'center',
//     color: '#000',
//   },
//   errorText: {
//     fontSize: 16,
//     color: 'red',
//     textAlign: 'center',
//   },
//   retryText: {
//     fontSize: 16,
//     color: '#0000ff',
//     textAlign: 'center',
//     marginTop: 10,
//   },
// });
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOccasions, fetchProducts } from '../redux/slices/categorySlice';
import commonstyles from '../commonstyles/commonstyles';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const boxWidth = width / 2 - 20;
const boxHeight = boxWidth * 0.75;

const gradients = [
  ['#d48cbf', '#7c375e'], // Pink gradient
  ['#e2b57a', '#7a4a2b'], // Orange gradient
  ['#918fe7', '#342c72'], // Purple gradient
  ['#7ed6a1', '#255437'], // Green gradient
];

const alignments = [
  { imageAlign: 'flex-start', textAlign: 'topRight' },
  { imageAlign: 'flex-end', textAlign: 'topLeft' },
  { imageAlign: 'flex-start', textAlign: 'bottomRight' },
  { imageAlign: 'flex-end', textAlign: 'bottomLeft' },
];

export default function ShopByMood({ categoryId }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { occasions, occasionsLoading, occasionsError } = useSelector((state) => state.category);
  const { customerId } = useSelector((state) => state.Auth || {});

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchOccasions(categoryId));
    }
  }, [dispatch, categoryId]);

  const handleOccasionPress = async (occasionId, occasionName) => {
    try {
      const result = await dispatch(
        fetchProducts({
          userId: customerId || 11,
          categoryId: categoryId || 1,
          occasionId,
        })
      ).unwrap();

      navigation.navigate('IndividualCategory', {
        occasion: {
          id: occasionId,
          name: occasionName,
          products: result,
        },
        userId: customerId || 11,
        categoryId: categoryId || 1,
        occasionId,
      });
    } catch (err) {
      console.error('Failed to fetch products for occasion:', {
        occasionId,
        error: err.message,
        status: err.status,
      });

      navigation.navigate('IndividualCategory', {
        occasion: {
          id: occasionId,
          name: occasionName,
          products: [],
          error: err.message || 'Failed to load products',
        },
        userId: customerId || 11,
        categoryId: categoryId || 1,
        occasionId,
      });
    }
  };

  if (occasionsLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (occasionsError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {occasionsError}</Text>
        <TouchableOpacity onPress={() => dispatch(fetchOccasions(categoryId))}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const formattedOccasions = occasions.slice(0, 4).map((item, index) => ({
    ...item,
    bg: gradients[index % gradients.length],
    imageAlign: alignments[index % alignments.length].imageAlign,
    textAlign: alignments[index % alignments.length].textAlign,
  }));

  const renderBox = (item, index) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.box,
        formattedOccasions.length === 3 && index === 2 ? styles.singleBox : {},
      ]}
      onPress={() => handleOccasionPress(item.id, item.occasion_name)}
    >
      <LinearGradient
        colors={item.bg}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.innerBox}
      >
        <Image
          source={{ uri: item.image }}
          style={[styles.image, { alignSelf: item.imageAlign }]}
          resizeMode="contain"
          defaultSource={require('../assets/men.png')}
        />
        <Text
          style={[
            commonstyles.text4,
            item.textAlign === 'topRight' && styles.topRight,
            item.textAlign === 'topLeft' && styles.topLeft,
            item.textAlign === 'bottomRight' && styles.bottomRight,
            item.textAlign === 'bottomLeft' && styles.bottomLeft,
            { position: 'absolute', color: '#fff' },
          ]}
        >
          {item.occasion_name.replace(' ', '\n')}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        {formattedOccasions.map((item, index) => renderBox(item, index))}
        <View style={styles.centerCircle}>
          <Text style={styles.centerText}>Shop by{"\n"}Mood</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  flexContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width - 20,
    justifyContent: 'space-between',
    position: 'relative',
    borderRadius: 8,
  },
  box: {
    width: boxWidth,
    height: boxHeight,
    margin: 5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  singleBox: {
    alignSelf: 'flex-start',
  },
  innerBox: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '70%',
    height: '100%',
  },
  topRight: {
    top: 10,
    right: 10,
    textAlign: 'right',
  },
  topLeft: {
    top: 10,
    left: 10,
    textAlign: 'left',
  },
  bottomRight: {
    bottom: 10,
    right: 10,
    textAlign: 'right',
  },
  bottomLeft: {
    bottom: 10,
    left: 10,
    textAlign: 'left',
  },
  centerCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: width / 2.9,
    height: width / 2.9,
    borderRadius: width / 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    transform: [{ translateX: -width / 5.8 }, { translateY: -width / 5.8 }],
  },
  centerText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  retryText: {
    fontSize: 16,
    color: '#0000ff',
    textAlign: 'center',
    marginTop: 10,
  },
});