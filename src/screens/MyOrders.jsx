// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Modal,
//   Dimensions,
//   TextInput,
//   ScrollView,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// const { width, height } = Dimensions.get("window");

// const MyOrders = ({ navigation }) => {
//   const insets = useSafeAreaInsets();
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [rating, setRating] = useState(0);
//   const [showInput, setShowInput] = useState(false);
//   const [reviewText, setReviewText] = useState("");

//   // Dummy Data
//   const haaram = require("../assets/haaram.png");
//   const mangalsutra = require("../assets/mangalsutra.png");

//   const bookings = [
//     {
//       id: "1",
//       name: "Arch of Royalty Gold Finger Ring",
//       price: "₹37,899",
//       status: "Order Confirmed",
//       statusColor: "#0E614E",
//       image: haaram,
//       buttonText: "View Details",
//     },
//     {
//       id: "2",
//       name: "Arch of Royalty Gold Finger Ring",
//       price: "₹37,899",
//       status: "Order Delivered",
//       statusColor: "#0E614E",
//       image: mangalsutra,
//       buttonText: "Rate Order",
//     },
//   ];

//   const handleButtonPress = (item) => {
//     if (item.buttonText === "View Details") {
//       navigation.navigate("OrderDetails", { orderId: item.id });
//     } else {
//       setSelectedOrder(item);
//       setModalVisible(true);
//       setShowInput(false);
//       setReviewText("");
//       setRating(0);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <View style={styles.imageContainer}>
//         <Image source={item.image} style={styles.image} resizeMode="cover" />
//       </View>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.productName}>{item.name}</Text>
//         <Text style={styles.price}>{item.price}</Text>
//         <Text style={[styles.status, { color: "#832729"}]}>
//           {item.status}
//         </Text>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => handleButtonPress(item)}
//         >
//           <Text style={styles.buttonText}>{item.buttonText}</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const handleSubmitReview = () => {
//     // Submit logic here
//     setModalVisible(false);
//     setShowInput(false);
//     setReviewText("");
//   };

//   return (
//     <SafeAreaView
//       style={[
//         styles.container,
//         { paddingTop: insets.top, paddingBottom: insets.bottom },
//       ]}
//     >
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={22} color="#832729" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>My Orders</Text>
//         <View style={{ width: 22 }} />
//       </View>

//       {/* Orders List */}
//       <FlatList
//         data={bookings}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={{
//           paddingHorizontal: 16,
//           paddingBottom: insets.bottom + 20,
//         }}
//         showsVerticalScrollIndicator={false}
//       />

//       {/* Rating Modal */}
//       <Modal
//         visible={isModalVisible}
//         animationType="slide"
//         transparent
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPress={() => setModalVisible(false)}
//         >
//           <TouchableOpacity
//             activeOpacity={1}
//             onPress={() => {}}
//             style={styles.fullModal}
//           >
//             <ScrollView
//               style={styles.scrollView}
//               showsVerticalScrollIndicator={false}
//               contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
//             >
//               {/* Close Button */}
//               <TouchableOpacity
//                 onPress={() => setModalVisible(false)}
//                 style={styles.closeButton}
//               >
//                 <Ionicons name="close" size={24} color="#000" />
//               </TouchableOpacity>

//               {/* Product Image */}
//               <Image
//                 source={selectedOrder?.image}
//                 style={styles.modalImage}
//                 resizeMode="cover"
//               />

//               {/* Order Info */}
//               <Text style={styles.modalOrderId}>
//                 Order ID - 25233566562
//               </Text>
//               <Text style={styles.modalProductName}>
//                 {selectedOrder?.name ?? ""}
//               </Text>
//              <View style={styles.locationRow}>
//   <Ionicons name="location-sharp" size={18} color="#000" />
//   <Text style={styles.modalLocation}>Rajahmundry, Andhra Pradesh</Text>
// </View>

//               {/* Delivery Date */}
//               <View style={styles.deliveryContainer}>
//                 <Text style={styles.deliveredText}>Delivered on : </Text>
//                 <Text style={styles.deliveryDate}>26 Aug 2025</Text>
//               </View>

//               {/* Price */}
//               <Text style={styles.modalPrice}>
//                 Order Total ₹37,899
//               </Text>

//               {/* Rating Row */}
//               <View style={styles.ratingRow}>
//                 <View style={styles.ratingSection}>
//                   <Text style={styles.rateOrderText}>Rate Order</Text>
//                   <View style={styles.starContainer}>
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <TouchableOpacity
//                         key={star}
//                         onPress={() => setRating(star)}
//                         activeOpacity={0.7}
//                       >
//                         <Ionicons
//                           name={star <= rating ? "star" : "star-outline"}
//                           size={28}
//                           color="#E4A11B"
//                           style={{ marginHorizontal: 3 }}
//                         />
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 </View>
//                 {!showInput && (
//                   <TouchableOpacity
//                     style={styles.writeReviewButton}
//                     onPress={() => setShowInput(true)}
//                   >
//                     <Text style={styles.writeReviewText}>Write a Review</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>

//               {/* Review Input Section */}
//               {showInput && (
//                 <View style={styles.inputSection}>
//                   <TextInput
//                     style={styles.textInput}
//                     multiline
//                     numberOfLines={3}
//                     placeholder="Write your review here..."
//                     placeholderTextColor="#004830"
//                     value={reviewText}
//                     onChangeText={setReviewText}
//                     textAlignVertical="top"
//                   />
//                   <TouchableOpacity
//                     style={styles.submitButton}
//                     onPress={handleSubmitReview}
//                   >
//                     <Text style={styles.submitButtonText}>Submit Review</Text>
//                   </TouchableOpacity>
//                 </View>
//               )}

//               {/* Similar Products */}
//               <Text style={styles.similarTitle}>Similar Products</Text>
//               <FlatList
//                 data={[selectedOrder, selectedOrder,]}
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({ item }) => (
//                   <View style={styles.similarCard}>
//                     <Image
//                       source={item.image}
//                       style={styles.similarImage}
//                       resizeMode="cover"
//                     />
//                     <Text style={styles.similarName} numberOfLines={1}>
//                       {item.name}
//                     </Text>
//                     <Text style={styles.similarPrice}>₹37,899</Text>
//                     <TouchableOpacity style={styles.addToCartButton} onPress={()=>{navigation.navigate("Cart")}}>
//                       <Text style={styles.addToCartText}>Add To Cart</Text>
//                     </TouchableOpacity>
//                   </View>
//                 )}
//               />
//             </ScrollView>
//           </TouchableOpacity>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const CARD_HEIGHT = 120;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     justifyContent: "flex-start",
//     paddingVertical: 10,
//     borderBottomWidth: 0.5,
//     borderBottomColor: "#ddd",
//     gap: 10,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#832729",
//   },
//   card: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     marginTop: 12,
//     borderWidth: 1,
//     borderColor: "#EAEAEA",
//     overflow: "hidden",
//     height: CARD_HEIGHT + 20, // Fixed height to ensure consistent centering
//   },
//   imageContainer: {
//     width: CARD_HEIGHT,
//     height: CARD_HEIGHT,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 10, // Adds margin-like spacing inside the card
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//   },
//   detailsContainer: {
//     flex: 1,
//     padding: 10,
//     justifyContent: "center",
//   },
//   productName: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#000",
//   },
//   price: {
//     fontSize: 14,
//     color: "#000",
//     marginTop: 4,
//   },
//   status: {
//     fontSize: 13,
//     marginTop: 4,
//   },
//   button: {
//     alignSelf: "flex-start",
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#832729",
//     borderRadius: 6,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     marginTop: 8,
//   },
//   buttonText: {
//     color: "#832729",
//     fontSize: 13,
//     fontWeight: "600",
//   },

//   // Modal Styles
//   modalOverlay: {
//     flex: 1,
//     justifyContent: "flex-end",
//     backgroundColor: "rgba(0,0,0,0.4)",
//   },
//   fullModal: {
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 20,
//     paddingTop: 10,
//     maxHeight: height * 0.85,
//     flex: 1,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   closeButton: {
//     alignSelf: "flex-end",
//   },
//   modalImage: {
//     width: "100%",
//     height: 180,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   modalOrderId: {
//     fontSize: 12,
//     color: "#777",
//     textAlign: "center",
//     marginTop: 6,
//   },
//   modalProductName: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#000",
//     textAlign: "center",
//     marginTop: 4,
//   },
//   modalLocation: {
//     fontSize: 13,
//     color: "#555",
//     textAlign: "center",
//     marginTop: 2,
//   },
//   deliveryContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 8,
//     backgroundColor: "#832729",
//     // borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//     width:"50%",
//     alignSelf:"center"
//   },
//   deliveredText: {
//     color: "#fff",
//     fontSize: 13,
//   },
//   deliveryDate: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 13,
//     marginLeft: 4,
//   },
//   modalPrice: {
//     textAlign: "center",
//     fontSize: 15,
//     color: "#000",
//     marginTop: 6,
//     fontWeight: "600",
//   },
//   ratingRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginTop: 10,
//   },
//   ratingSection: {
//     flex: 1,
//   },
//   rateOrderText: {
//     textAlign: "left",
//     marginTop: 10,
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#000",
//   },
//   starContainer: {
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     marginTop: 5,
//   },
//   writeReviewButton: {
//     borderWidth: 1,
//     borderColor: "#832729",
//     borderRadius: 8,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     marginLeft: 10,
//     alignSelf: "center",
//   },
//   writeReviewText: {
//     color: "#832729",
//     fontWeight: "600",
//     fontSize: 13,
//   },
//   inputSection: {
//     marginTop: 10,
//     paddingHorizontal: 5,
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 14,
//     minHeight: 80,
//     backgroundColor: "#f9f9f9",
//     textAlignVertical: "top",
//   },
//   submitButton: {
//     backgroundColor: "#832729",
//     borderRadius: 8,
//     paddingVertical: 12,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   submitButtonText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   similarTitle: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: "#000",
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   similarCard: {
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     marginRight: 10,
//     padding: 8,
//     width: 120,
//     alignItems: "center",
//   },
//   similarImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 6,
//   },
//   similarName: {
//     fontSize: 12,
//     fontWeight: "500",
//     color: "#000",
//     textAlign: "center",
//     marginTop: 4,
//   },
//   similarPrice: {
//     fontSize: 12,
//     color: "#000",
//     marginTop: 2,
//   },
//   addToCartButton: {
//     backgroundColor: "#832729",
//     borderRadius: 5,
//     marginTop: 5,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//   },
//   addToCartText: {
//     fontSize: 11,
//     color: "#fff",
//     fontWeight: "500",
//   },
//   locationRow: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   alignSelf:"center",
// },

// modalLocation: {
//   fontSize: 16,
//   color: '#000',
//   marginLeft: 5,
// },
// });

// export default MyOrders;
// import React, { useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchUserOrders } from "../redux/slices/orderSlice";

// const PRIMARY_COLOR = "#832729";

// const MyOrders = ({ navigation }) => {
//   const insets = useSafeAreaInsets();
//   const dispatch = useDispatch();

//   const { customerId } = useSelector((state) => state.Auth || {});
//   const { orders, loading, error } = useSelector((state) => state.order);

//   // Fetch orders on mount
//   useEffect(() => {
//     if (customerId) {
//       dispatch(fetchUserOrders(customerId));
//     }
//   }, [dispatch, customerId]);

//   // Handle error
//   useEffect(() => {
//     if (error) {
//       Alert.alert("Error", error || "Failed to load orders");
//     }
//   }, [error]);

//   // Group orders by order_id (since API returns one row per item)
//   const groupedOrders = React.useMemo(() => {
//     if (!Array.isArray(orders) || orders.length === 0) return [];

//     const map = {};

//     orders.forEach((item) => {
//       const orderKey = item.id; // This is the actual order_id for getorderdetails

//       if (!map[orderKey]) {
//         map[orderKey] = {
//           order_id: orderKey,
//           display_order_id: item.order_id, // Long number like 20251227131756715
//           order_on: item.order_on,
//           order_status: item.order_status,
//           order_status_text: item.order_status_date_text,
//           items: [],
//           firstImage: item.product_image,
//         };
//       }

//       map[orderKey].items.push(item);
//     });

//     return Object.values(map).sort(
//       (a, b) => new Date(b.order_on) - new Date(a.order_on)
//     );
//   }, [orders]);

//   const handleViewDetails = (orderId) => {
//     navigation.navigate("OrderDetails", { order_id: orderId });
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => handleViewDetails(item.order_id)}
//       activeOpacity={0.8}
//     >
//       <View style={styles.imageContainer}>
//         <Image
//           source={{ uri: item.firstImage }}
//           style={styles.image}
//           resizeMode="cover"
//         />
//         {item.items.length > 1 && (
//           <View style={styles.itemCountBadge}>
//             <Text style={styles.itemCountText}>+{item.items.length - 1}</Text>
//           </View>
//         )}
//       </View>

//       <View style={styles.detailsContainer}>
//         <Text style={styles.orderIdText}>
//           Order ID: {item.display_order_id}
//         </Text>
//         <Text style={styles.orderDate}>{item.order_on}</Text>

//         <Text style={styles.itemCount}>
//           {item.items.length} {item.items.length === 1 ? "Item" : "Items"}
//         </Text>

//         <Text style={[styles.status, { color: PRIMARY_COLOR }]}>
//           {item.order_status_text}
//         </Text>

//         <View style={styles.button}>
//           <Text style={styles.buttonText}>View Details</Text>
//           <Ionicons name="chevron-forward" size={16} color={PRIMARY_COLOR} />
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={PRIMARY_COLOR} />
//         <Text style={styles.loadingText}>Loading your orders...</Text>
//       </SafeAreaView>
//     );
//   }

//   if (groupedOrders.length === 0) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="chevron-back" size={22} color={PRIMARY_COLOR} />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>My Orders</Text>
//           <View style={{ width: 22 }} />
//         </View>

//         <View style={styles.emptyContainer}>
//           <Ionicons name="receipt-outline" size={80} color="#ccc" />
//           <Text style={styles.emptyText}>No orders yet</Text>
//           <Text style={styles.emptySubText}>
//             Your placed orders will appear here
//           </Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={22} color={PRIMARY_COLOR} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>My Orders</Text>
//         <View style={{ width: 22 }} />
//       </View>

//       {/* Orders List */}
//       <FlatList
//         data={groupedOrders}
//         keyExtractor={(item) => item.order_id.toString()}
//         renderItem={renderItem}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//       />
//     </SafeAreaView>
//   );
// };

// const CARD_HEIGHT = 140;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 0.5,
//     borderBottomColor: "#eee",
//   },
//   headerTitle: {
//     fontSize: 19,
//     fontWeight: "600",
//     color: PRIMARY_COLOR,
//   },

//   listContent: {
//     paddingHorizontal: 16,
//     paddingTop: 12,
//     paddingBottom: 20,
//   },

//   card: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     marginBottom: 14,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     borderWidth: 1,
//     borderColor: "#f0f0f0",
//     overflow: "hidden",
//     height: CARD_HEIGHT,
//   },
//   imageContainer: {
//     width: CARD_HEIGHT - 20,
//     height: CARD_HEIGHT - 20,
//     margin: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f9f9f9",
//     borderRadius: 10,
//     position: "relative",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 10,
//   },
//   itemCountBadge: {
//     position: "absolute",
//     top: 8,
//     right: 8,
//     backgroundColor: "rgba(131, 39, 41, 0.9)",
//     borderRadius: 12,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//   },
//   itemCountText: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "600",
//   },

//   detailsContainer: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingRight: 12,
//     justifyContent: "space-between",
//   },
//   orderIdText: {
//     fontSize: 13,
//     color: "#555",
//     fontWeight: "500",
//   },
//   orderDate: {
//     fontSize: 13,
//     color: "#777",
//     marginTop: 2,
//   },
//   itemCount: {
//     fontSize: 14,
//     color: "#000",
//     marginTop: 6,
//     fontWeight: "500",
//   },
//   status: {
//     fontSize: 14,
//     fontWeight: "600",
//     marginTop: 4,
//   },
//   button: {
//     flexDirection: "row",
//     alignItems: "center",
//     alignSelf: "flex-start",
//     backgroundColor: "#fff",
//     borderWidth: 1.5,
//     borderColor: PRIMARY_COLOR,
//     borderRadius: 8,
//     paddingVertical: 8,
//     paddingHorizontal: 14,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: PRIMARY_COLOR,
//     fontSize: 14,
//     fontWeight: "600",
//     marginRight: 4,
//   },

//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   loadingText: {
//     marginTop: 16,
//     fontSize: 16,
//     color: "#666",
//   },

//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 40,
//   },
//   emptyText: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#888",
//     marginTop: 20,
//   },
//   emptySubText: {
//     fontSize: 14,
//     color: "#aaa",
//     marginTop: 8,
//     textAlign: "center",
//   },
// });

// export default MyOrders;
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrders } from "../redux/slices/orderSlice";

const PRIMARY_COLOR = "#832729";

const MyOrders = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const { customerId } = useSelector((state) => state.Auth || {});
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (customerId) {
      dispatch(fetchUserOrders(customerId));
    }
  }, [dispatch, customerId]);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error || "Failed to load orders");
    }
  }, [error]);

  const groupedOrders = React.useMemo(() => {
    if (!Array.isArray(orders) || orders.length === 0) return [];

    const map = {};

    orders.forEach((item) => {
      const orderKey = item.id;

      if (!map[orderKey]) {
        map[orderKey] = {
          order_id: orderKey,
          display_order_id: item.order_id,
          order_on: item.order_on,
          order_status: item.order_status,
          order_status_text: item.order_status_date_text,
          items: [],
          firstImage: item.product_image,
        };
      }

      map[orderKey].items.push(item);
    });

    return Object.values(map).sort(
      (a, b) => new Date(b.order_on) - new Date(a.order_on)
    );
  }, [orders]);

  const handleViewDetails = (orderId) => {
    navigation.navigate("OrderDetails", { order_id: orderId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleViewDetails(item.order_id)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.firstImage }}
          style={styles.image}
          resizeMode="cover"
        />
        {item.items.length > 1 && (
          <View style={styles.itemCountBadge}>
            <Text style={styles.itemCountText}>+{item.items.length - 1}</Text>
          </View>
        )}
      </View>

      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.orderIdText}>
            Order ID: {item.display_order_id}
          </Text>
          <Text style={styles.orderDate}>{item.order_on}</Text>

          <Text style={styles.itemCount}>
            {item.items.length} {item.items.length === 1 ? "Item" : "Items"}
          </Text>

          <Text style={[styles.status, { color: PRIMARY_COLOR }]}>
            {item.order_status_text}
          </Text>
        </View>

        <View style={styles.button}>
          <Text style={styles.buttonText}>View Details</Text>
          <Ionicons name="chevron-forward" size={16} color={PRIMARY_COLOR} />
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        <Text style={styles.loadingText}>Loading your orders...</Text>
      </SafeAreaView>
    );
  }

  if (groupedOrders.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={PRIMARY_COLOR} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Orders</Text>
          <View style={{ width: 22 }} />
        </View>

        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>No orders yet</Text>
          <Text style={styles.emptySubText}>
            Your placed orders will appear here
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header with safe area top padding */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color={PRIMARY_COLOR} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 22 }} />
      </View>

      <FlatList
        data={groupedOrders}
        keyExtractor={(item) => item.order_id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

// Removed fixed CARD_HEIGHT - let content determine height
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
    backgroundColor: "#fff", // Ensure background covers status bar area
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: PRIMARY_COLOR,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    overflow: "hidden",
    // Removed fixed height - now flexible
  },
  imageContainer: {
    width: 120,
    height: 120,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  itemCountBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(131, 39, 41, 0.9)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  itemCountText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  detailsContainer: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 12,
    justifyContent: "space-between", // This pushes button to bottom
  },
  orderIdText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "500",
  },
  orderDate: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
  itemCount: {
    fontSize: 14,
    color: "#000",
    marginTop: 6,
    fontWeight: "500",
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: PRIMARY_COLOR,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginTop: 10,
  },
  buttonText: {
    color: PRIMARY_COLOR,
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#888",
    marginTop: 20,
  },
  emptySubText: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 8,
    textAlign: "center",
  },
});

export default MyOrders;