// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   FlatList,
//   LayoutAnimation,
//   UIManager,
//   Platform,
//   ScrollView,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";

// // Enable Layout Animation for Android
// if (
//   Platform.OS === "android" &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// // Common dummy items using your local images
// const defaultItems = [
//   { name: "Earrings", image: require("../assets/earrings.png") },
//   { name: "Mangalasutra", image: require("../assets/mangalsutra.png") },
//   { name: "Haaram", image: require("../assets/haaram.png") },
//   { name: "Earrings", image: require("../assets/earrings.png") },
//   { name: "Mangalasutra", image: require("../assets/mangalsutra.png") },
//   { name: "Haaram", image: require("../assets/haaram.png") },
//   { name: "Earrings", image: require("../assets/earrings.png") },
//   { name: "Mangalasutra", image: require("../assets/mangalsutra.png") },
//   { name: "Haaram", image: require("../assets/haaram.png") },
// ];

// const categoriesData = [
//   { id: "1", title: "Gold", items: defaultItems },
//   { id: "2", title: "Silver", items: defaultItems },
//   { id: "3", title: "Diamonds", items: defaultItems },
//   { id: "4", title: "Platinum", items: defaultItems },
// ];

// const CategoriesScreen = () => {
//   const [expanded, setExpanded] = useState({});
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();

//   const toggleExpand = (id) => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const renderCategory = ({ item }) => {
//     const isExpanded = expanded[item.id];
//     const itemsToShow = isExpanded ? item.items : item.items.slice(0, 4);

//     return (
//       <View style={styles.categoryContainer}>
//         <View style={styles.headerRow}>
//           {/* Category name */}
//           <Text style={styles.categoryTitle}>{item.title}</Text>

//           {/* Horizontal line between title and icon */}
//           <View style={styles.line} />

//           {/* Expand/Collapse icon */}
//           <TouchableOpacity onPress={() => toggleExpand(item.id)}>
//             <Ionicons
//               name={isExpanded ? "chevron-up-outline" : "chevron-down-outline"}
//               size={20}
//               color="#006400"
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Category items grid */}
//         <FlatList
//           data={itemsToShow}
//           numColumns={4}
//           keyExtractor={(it, index) => index.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.itemCard}>
//               <Image
//                 source={item.image}
//                 style={styles.itemImage}
//                 resizeMode="cover"
//               />
//               <Text style={styles.itemLabel}>{item.name}</Text>
//             </View>
//           )}
//         />
//       </View>
//     );
//   };

//   return (
//     <View
//       style={[
//         styles.root,
//         { paddingTop: insets.top, paddingBottom: insets.bottom +50},
//       ]}
//     >
//       {/* Header with Back Arrow */}
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={22} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Categories</Text>
//       </View>

//       {/* Categories List */}
//       <ScrollView contentContainerStyle={styles.container}>
//         <FlatList
//           data={categoriesData}
//           renderItem={renderCategory}
//           keyExtractor={(item) => item.id}
//           scrollEnabled={false}
//         />
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderBottomColor: "#ddd",
//     borderBottomWidth: 1,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#000",
//     marginLeft: 10,
//   },
//   container: {
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     backgroundColor: "#fff",
//   },
//   categoryContainer: {
//     marginBottom: 20,
//   },
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   categoryTitle: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: "#006400",
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: "#ccc",
//     marginHorizontal: 10,
//   },
//   itemCard: {
//     flex: 1,
//     alignItems: "center",
//     margin: 5,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 2,
//     elevation: 1,
//     paddingVertical: 8,
//   },
//   itemImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 6,
//   },
//   itemLabel: {
//     marginTop: 5,
//     fontSize: 12,
//     color: "#333",
//     textAlign: "center",
//   },
// });

// export default CategoriesScreen;
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  UIManager,
  Platform,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

// Enable Layout Animation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Common dummy items using your local images
const defaultItems = [
  { name: "Earrings", image: require("../assets/earrings.png") },
  { name: "Mangalasutra", image: require("../assets/mangalsutra.png") },
  { name: "Haaram", image: require("../assets/haaram.png") },
  { name: "Earrings", image: require("../assets/earrings.png") },
  { name: "Mangalasutra", image: require("../assets/mangalsutra.png") },
  { name: "Haaram", image: require("../assets/haaram.png") },
  { name: "Earrings", image: require("../assets/earrings.png") },
  { name: "Mangalasutra", image: require("../assets/mangalsutra.png") },
  { name: "Haaram", image: require("../assets/haaram.png") },
];

const categoriesData = [
  { id: "1", title: "Gold", items: defaultItems },
  { id: "2", title: "Silver", items: defaultItems.slice(0, 3) },
  { id: "3", title: "Diamonds", items: defaultItems.slice(0, 2) },
  { id: "4", title: "Platinum", items: defaultItems.slice(0, 1) },
];

const CategoriesScreen = () => {
  const [expanded, setExpanded] = useState({});
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderCategory = ({ item }) => {
    const isExpanded = expanded[item.id];
    const itemsToShow = isExpanded ? item.items : item.items.slice(0, 4);

    return (
      <View style={styles.categoryContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.categoryTitle}>{item.title}</Text>
          <View style={styles.line} />
          <TouchableOpacity onPress={() => toggleExpand(item.id)}>
            <Ionicons
              name={isExpanded ? "chevron-up-outline" : "chevron-down-outline"}
              size={20}
              color="#006400"
            />
          </TouchableOpacity>
        </View>

        {/* Category items grid */}
        <FlatList
          data={itemsToShow}
          numColumns={4}
          keyExtractor={(it, index) => index.toString()}
          columnWrapperStyle={styles.row} // 👈 ensures items start from left
          renderItem={({ item: productItem }) => (
            <TouchableOpacity
              style={styles.itemCard}
              onPress={() => navigation.navigate('ProductDetailsScreen', { product: productItem })}
            >
              <Image
                source={productItem.image}
                style={styles.itemImage}
                resizeMode="cover"
              />
              <Text style={styles.itemLabel}>{productItem.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  return (
    <View
      style={[
        styles.root,
        { paddingTop: insets.top, paddingBottom: insets.bottom + 50 },
      ]}
    >
      {/* Header with Back Arrow */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="rgba(8, 118, 90, 1)" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
      </View>

      {/* Categories List */}
      <ScrollView contentContainerStyle={styles.container}>
        <FlatList
          data={categoriesData}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "rgba(8, 118, 90, 1)",
    marginLeft: 10,
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  categoryContainer: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#006400",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },
  row: {
    justifyContent: "flex-start", // 👈 aligns items from left always
  },
  itemCard: {
    width: 80, // 👈 fixed width to control spacing
    alignItems: "center",
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
    paddingVertical: 8,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  itemLabel: {
    marginTop: 5,
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
});

export default CategoriesScreen;