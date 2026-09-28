// import React, { useEffect, useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
//   Dimensions,
//   TouchableOpacity,
//   RefreshControl,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { responsiveWidth, responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";
// import { useSelector, useDispatch } from "react-redux";
// import { getOrderDetails, resetOrderState } from "../redux/slices/orderSlice"; // Adjust path if needed

// const { width } = Dimensions.get("window");
// const PRIMARY_COLOR = "rgba(8, 118, 90, 1)"; // Your brand green

// const OrderDetails = ({ route, navigation }) => {
//   const insets = useSafeAreaInsets();
//   const dispatch = useDispatch();

//   const { order_id } = route.params || {}; // Passed from previous screen

//   const { orderDetails, loading, error } = useSelector((state) => state.order);

//   const [refreshing, setRefreshing] = useState(false);

//   // Fetch order details on mount and on refresh
//   const fetchOrder = useCallback(() => {
//     if (order_id) {
//       dispatch(getOrderDetails(order_id));
//     }
//   }, [dispatch, order_id]);

//   useEffect(() => {
//     fetchOrder();
//   }, [fetchOrder]);

//   // Pull to refresh
//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     dispatch(getOrderDetails(order_id)).finally(() => {
//       setRefreshing(false);
//     });
//   }, [dispatch, order_id]);

//   // Show error if any
//   useEffect(() => {
//     if (error && !loading) {
//       Alert.alert("Error", error?.message || "Failed to load order details");
//     }
//   }, [error, loading]);

//   // If no order data yet
//   if (loading && !refreshing) {
//     return (
//       <SafeAreaView style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={PRIMARY_COLOR} />
//         <Text style={styles.loadingText}>Loading order details...</Text>
//       </SafeAreaView>
//     );
//   }

//   if (!orderDetails) {
//     return (
//       <SafeAreaView style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>No order found</Text>
//       </SafeAreaView>
//     );
//   }

//   // Map order status to timeline steps (customize based on your order_status values)
//   const getStatusSteps = () => {
//     const status = parseInt(orderDetails.order_status);
//     const steps = [
//       { label: "Order Confirmed", completed: true },
//       { label: "Processing", completed: status >= 1 },
//       { label: "Shipped", completed: status >= 2 },
//       { label: "Out for Delivery", completed: status >= 3 },
//       { label: "Delivered", completed: status >= 4 },
//     ];
//     return steps;
//   };

//   const statusSteps = getStatusSteps();
//   const currentStatusIndex = statusSteps.findIndex(step => !step.completed);
//   const activeIndex = currentStatusIndex === -1 ? statusSteps.length - 1 : currentStatusIndex;

//   const trackingSteps = statusSteps.map((step) => ({
//     title: step.label,
//     date: step.label === "Order Confirmed" ? orderDetails.order_on || "" : "",
//     icon:
//       step.label === "Order Confirmed" ? "checkmark-circle-outline" :
//       step.label === "Processing" ? "construct-outline" :
//       step.label === "Shipped" ? "cube-outline" :
//       step.label === "Out for Delivery" ? "bicycle-outline" :
//       "checkmark-done-outline",
//   }));

//   return (
//     <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             tintColor={PRIMARY_COLOR}
//           />
//         }
//         contentContainerStyle={styles.scrollContent}
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back-outline" size={24} color="#000" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Order Details</Text>
//         </View>

//         {/* Order ID & Date */}
//         <View style={styles.orderIdContainer}>
//           <View style={styles.orderIdRow}>
//             <View style={styles.orderIdItem}>
//               <Text style={styles.orderIdLabel}>Order ID</Text>
//               <Text style={styles.orderIdText}>
//                 {orderDetails.order_number || orderDetails.order_id}
//               </Text>
//             </View>
//             <View style={styles.orderIdItem}>
//               <Text style={styles.orderIdLabel}>Order Date</Text>
//               <Text style={styles.orderIdText}>
//                 {orderDetails.order_on || "N/A"}
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* Items List */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Ordered Items ({orderDetails.items?.length || 0})</Text>
//           {orderDetails.items?.map((item, index) => (
//             <View
//               key={item.id || index}
//               style={[
//                 styles.productRow,
//                 index !== orderDetails.items.length - 1 && styles.productBorder,
//               ]}
//             >
//               <Image
//                 source={{ uri: item.product_image }}
//                 style={styles.productImage}
//                 resizeMode="contain"
//               />
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.productName}>{item.product_name}</Text>
//                 {item.size && <Text style={styles.itemDetail}>Size: {item.size}</Text>}
//                 <Text style={styles.itemDetail}>Weight: {item.gross_weight}g</Text>
//                 <Text style={styles.itemDetail}>Qty: {item.quantity}</Text>
//                 <Text style={styles.productPrice}>
//                   ₹{Number(item.total_amount).toLocaleString("en-IN")}
//                 </Text>
//               </View>
//             </View>
//           ))}
//         </View>

//         {/* Order Status Timeline */}
//         <View style={styles.trackingTimelineCard}>
//           <Text style={styles.sectionTitle}>Order Status</Text>
//           <View style={styles.trackingTimeline}>
//             {trackingSteps.map((step, index) => {
//               const isCompleted = index < activeIndex;
//               const isCurrent = index === activeIndex;

//               return (
//                 <View key={index} style={styles.trackingStep}>
//                   <View style={styles.statusIndicatorContainer}>
//                     <Ionicons
//                       name={step.icon}
//                       size={24}
//                       color={isCompleted || isCurrent ? PRIMARY_COLOR : "#ccc"}
//                     />
//                     {index < trackingSteps.length - 1 && (
//                       <View
//                         style={[
//                           styles.connectingLine,
//                           { backgroundColor: index < activeIndex ? PRIMARY_COLOR : "#ccc" },
//                         ]}
//                       />
//                     )}
//                   </View>

//                   <View style={styles.stepDetails}>
//                     <Text
//                       style={[
//                         styles.stepTitle,
//                         { color: isCompleted || isCurrent ? "#000" : "#666" },
//                       ]}
//                     >
//                       {step.title}
//                     </Text>
//                     {step.date ? (
//                       <Text style={styles.stepDate}>{step.date}</Text>
//                     ) : null}
//                   </View>
//                 </View>
//               );
//             })}
//           </View>
//         </View>

//         {/* Shipping Address */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Delivery Address</Text>
//           <Text style={styles.shippingText}>
//             {orderDetails.customer_name}
//             {"\n"}
//             {orderDetails.customer_mobile_number}
//             {"\n"}
//             {orderDetails.delivery_address}
//           </Text>
//         </View>

//         {/* Pricing Details */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Pricing Details</Text>
//           <View style={styles.priceRow}>
//             <Text style={styles.priceLabel}>Sub Total</Text>
//             <Text style={styles.priceValue}>
//               ₹{Number(orderDetails.sub_total_amount).toLocaleString("en-IN")}
//             </Text>
//           </View>
//           <View style={styles.priceRow}>
//             <Text style={styles.priceLabel}>Coupon Discount</Text>
//             <Text style={styles.priceValue}>
//               -₹{Number(orderDetails.coupon_amount).toLocaleString("en-IN")}
//             </Text>
//           </View>
//           <View style={styles.priceRow}>
//             <Text style={styles.priceLabel}>Delivery Charge</Text>
//             <Text style={[styles.priceValue, { color: "#05AC0B" }]}>
//               ₹{Number(orderDetails.delivery_charges).toLocaleString("en-IN")}
//             </Text>
//           </View>
//           <View style={styles.divider} />
//           <View style={styles.priceRow}>
//             <Text style={[styles.priceLabel, { fontWeight: "600" }]}>Grand Total</Text>
//             <Text style={[styles.priceValue, { fontWeight: "700", fontSize: responsiveFontSize(2.3) }]}>
//               ₹{Number(orderDetails.grand_total).toLocaleString("en-IN")}
//             </Text>
//           </View>
//           <Text style={styles.paymentMode}>
//             Payment: {orderDetails.payment_type || "COD"}
//           </Text>
//         </View>
//       </ScrollView>

//       {/* Bottom Buttons */}
//       <View style={[styles.bottomContainer, { paddingBottom: insets.bottom + 10 }]}>
//         <View style={styles.buttonsRow}>
//           <TouchableOpacity style={styles.cancelButton}>
//             <Text style={styles.buttonText}>Cancel Order</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.chatButton}>
//             <Text style={styles.buttonText}>Chat with us</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F7F7F7" },
//   scrollContent: { paddingBottom: 120 },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: responsiveWidth(4),
//   },
//   headerTitle: {
//     fontSize: responsiveFontSize(2.3),
//     fontWeight: "600",
//     color: "#000",
//     marginLeft: 10,
//   },
//   orderIdContainer: {
//     backgroundColor: "#f4f4f4",
//     borderRadius: 12,
//     marginHorizontal: responsiveWidth(4),
//     marginTop: responsiveHeight(2),
//     padding: responsiveWidth(4),
//   },
//   orderIdRow: { flexDirection: "row", justifyContent: "space-between" },
//   orderIdItem: { flex: 1 },
//   orderIdLabel: { fontSize: 14, color: "#444", marginBottom: 4 },
//   orderIdText: { fontSize: 16, fontWeight: "600", color: "#000" },

//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: responsiveWidth(4),
//     marginHorizontal: responsiveWidth(4),
//     marginTop: responsiveHeight(2),
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   trackingTimelineCard: { ...this.card }, // same as card

//   sectionTitle: {
//     fontSize: responsiveFontSize(2.1),
//     fontWeight: "600",
//     color: "#000",
//     marginBottom: responsiveHeight(1.5),
//   },

//   productRow: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     marginBottom: responsiveHeight(2),
//   },
//   productBorder: { paddingBottom: responsiveHeight(2), borderBottomWidth: 1, borderColor: "#eee" },
//   productImage: {
//     width: responsiveWidth(22),
//     height: responsiveWidth(22),
//     borderRadius: 8,
//     backgroundColor: "#f0f0f0",
//   },
//   productName: { fontSize: responsiveFontSize(1.9), fontWeight: "600", color: "#000" },
//   itemDetail: { fontSize: responsiveFontSize(1.6), color: "#555", marginTop: 4 },
//   productPrice: { fontSize: responsiveFontSize(2), fontWeight: "700", color: "#000", marginTop: 6 },

//   trackingTimeline: { marginTop: responsiveHeight(1) },
//   trackingStep: { flexDirection: "row", alignItems: "flex-start", marginBottom: responsiveHeight(3) },
//   statusIndicatorContainer: { alignItems: "center", marginRight: responsiveWidth(4), width: 30 },
//   connectingLine: { width: 2, height: responsiveHeight(7) },
//   stepDetails: { flex: 1 },
//   stepTitle: { fontSize: 16, fontWeight: "600" },
//   stepDate: { fontSize: 13, color: "#999", marginTop: 4 },

//   shippingText: { fontSize: responsiveFontSize(1.8), color: "#333", lineHeight: 24 },

//   priceRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
//   priceLabel: { fontSize: responsiveFontSize(1.8), color: "#000" },
//   priceValue: { fontSize: responsiveFontSize(1.8), color: "#000", fontWeight: "600" },
//   divider: { height: 1, backgroundColor: "#eee", marginVertical: 12 },
//   paymentMode: { fontSize: responsiveFontSize(1.7), color: "#555", marginTop: 10, textAlign: "right" },

//   bottomContainer: {
//     backgroundColor: "#fff",
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//     paddingHorizontal: responsiveWidth(4),
//   },
//   buttonsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: responsiveHeight(1.5),
//   },
//   cancelButton: {
//     flex: 0.48,
//     backgroundColor: "#FF3B30",
//     paddingVertical: responsiveHeight(1.8),
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   chatButton: {
//     flex: 0.48,
//     backgroundColor: PRIMARY_COLOR,
//     paddingVertical: responsiveHeight(1.8),
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: responsiveFontSize(1.9),
//     fontWeight: "600",
//   },

//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F7F7F7",
//   },
//   loadingText: {
//     marginTop: 16,
//     fontSize: responsiveFontSize(2),
//     color: "#666",
//   },
// });

// export default OrderDetails;
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails } from "../redux/slices/orderSlice";

const PRIMARY_COLOR = "rgba(8, 118, 90, 1)";

const OrderDetails = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const { order_id } = route.params || {};

  const { orderDetails, loading, error } = useSelector((state) => state.order);

  const [refreshing, setRefreshing] = useState(false);

  const fetchOrder = useCallback(() => {
    if (order_id) {
      dispatch(getOrderDetails(order_id));
    }
  }, [dispatch, order_id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getOrderDetails(order_id)).finally(() => setRefreshing(false));
  }, [dispatch, order_id]);

  useEffect(() => {
    if (error && !loading) {
      Alert.alert("Error", error?.message || "Failed to load order details");
    }
  }, [error, loading]);

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        <Text style={styles.loadingText}>Loading order details...</Text>
      </SafeAreaView>
    );
  }

  if (!orderDetails) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>No order found</Text>
      </SafeAreaView>
    );
  }

  // ... (status steps logic remains same)
  const getStatusSteps = () => {
    const status = parseInt(orderDetails.order_status || 0);
    return [
      { label: "Order Confirmed", completed: true },
      { label: "Processing", completed: status >= 1 },
      { label: "Shipped", completed: status >= 2 },
      { label: "Out for Delivery", completed: status >= 3 },
      { label: "Delivered", completed: status >= 4 },
    ];
  };

  const statusSteps = getStatusSteps();
  const activeIndex =
    statusSteps.findIndex((step) => !step.completed) === -1
      ? statusSteps.length - 1
      : statusSteps.findIndex((step) => !step.completed);

  const trackingSteps = statusSteps.map((step) => ({
    title: step.label,
    date: step.label === "Order Confirmed" ? orderDetails.order_on || "" : "",
    icon:
      step.label === "Order Confirmed"
        ? "checkmark-circle-outline"
        : step.label === "Processing"
        ? "construct-outline"
        : step.label === "Shipped"
        ? "cube-outline"
        : step.label === "Out for Delivery"
        ? "bicycle-outline"
        : "checkmark-done-outline",
  }));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#832729" />

      {/* Header with proper top inset */}
      <View style={[styles.header, { paddingTop: insets.top + responsiveHeight(1.5) }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={PRIMARY_COLOR}
          />
        }
        contentContainerStyle={styles.scrollContent}
      >
        {/* Order ID & Date */}
        <View style={styles.orderIdContainer}>
          <View style={styles.orderIdRow}>
            <View style={styles.orderIdItem}>
              <Text style={styles.orderIdLabel}>Order ID</Text>
              <Text style={styles.orderIdText}>
                {orderDetails.order_number || orderDetails.order_id}
              </Text>
            </View>
            <View style={styles.orderIdItem}>
              <Text style={styles.orderIdLabel}>Order Date</Text>
              <Text style={styles.orderIdText}>
                {orderDetails.order_on || "N/A"}
              </Text>
            </View>
          </View>
        </View>

        {/* Ordered Items */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Ordered Items ({orderDetails.items?.length || 0})
          </Text>
          {orderDetails.items?.map((item, index) => (
            <View
              key={item.id || index}
              style={[
                styles.itemContainer,
                index < orderDetails.items.length - 1 && styles.itemBorderBottom,
              ]}
            >
              <Image
                source={{ uri: item.product_image }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <View style={styles.itemDetails}>
                <Text style={styles.productName}>{item.product_name}</Text>
                {item.size && (
                  <Text style={styles.itemDetailText}>Size: {item.size}</Text>
                )}
                <Text style={styles.itemDetailText}>
                  Weight: {item.gross_weight}g
                </Text>
                <Text style={styles.itemDetailText}>Qty: {item.quantity}</Text>
                <Text style={styles.productPrice}>
                  ₹{Number(item.total_amount).toLocaleString("en-IN")}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Order Status Timeline */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Status</Text>
          <View style={styles.trackingTimeline}>
            {trackingSteps.map((step, index) => {
              const isCompleted = index < activeIndex;
              const isCurrent = index === activeIndex;

              return (
                <View key={index} style={styles.trackingStep}>
                  <View style={styles.statusIndicatorContainer}>
                    <Ionicons
                      name={step.icon}
                      size={responsiveFontSize(3)}
                      color={isCompleted || isCurrent ? PRIMARY_COLOR : "#ccc"}
                    />
                    {index < trackingSteps.length - 1 && (
                      <View
                        style={[
                          styles.connectingLine,
                          {
                            backgroundColor:
                              index < activeIndex ? PRIMARY_COLOR : "#ccc",
                          },
                        ]}
                      />
                    )}
                  </View>

                  <View style={styles.stepDetails}>
                    <Text
                      style={[
                        styles.stepTitle,
                        {
                          color: isCompleted || isCurrent ? "#000" : "#666",
                          fontWeight: isCurrent ? "600" : "500",
                        },
                      ]}
                    >
                      {step.title}
                    </Text>
                    {step.date ? (
                      <Text style={styles.stepDate}>{step.date}</Text>
                    ) : null}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <Text style={styles.addressText}>
            {orderDetails.customer_name}
            {"\n"}
            {orderDetails.customer_mobile_number}
            {"\n"}
            {orderDetails.delivery_address}
          </Text>
        </View>

        {/* Pricing Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Pricing Details</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Sub Total</Text>
            <Text style={styles.priceValue}>
              ₹{Number(orderDetails.sub_total_amount).toLocaleString("en-IN")}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Coupon Discount</Text>
            <Text style={styles.priceValue}>
              -₹{Number(orderDetails.coupon_amount).toLocaleString("en-IN")}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery Charge</Text>
            <Text style={[styles.priceValue, { color: "#05AC0B" }]}>
              ₹{Number(orderDetails.delivery_charges).toLocaleString("en-IN")}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { fontWeight: "600" }]}>
              Grand Total
            </Text>
            <Text
              style={[
                styles.priceValue,
                { fontWeight: "700", fontSize: responsiveFontSize(2.5) },
              ]}
            >
              ₹{Number(orderDetails.grand_total).toLocaleString("en-IN")}
            </Text>
          </View>
          {/* <Text style={styles.paymentMode}>
            Payment: {orderDetails.payment_type || "COD"}
          </Text> */}
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={[styles.bottomContainer, { paddingBottom: insets.bottom + 10 }]}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.buttonText}>Chat with us</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  scrollContent: {
    paddingBottom: responsiveHeight(15),
  },

  // Fixed: Header now respects status bar height
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    backgroundColor: "#832729", // Solid background
    // paddingTop is now dynamically added via insets.top in JSX
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginLeft: responsiveWidth(3),
  },

  // Rest of styles remain unchanged
  orderIdContainer: {
    backgroundColor: "#f0f0f0",
    marginHorizontal: responsiveWidth(4),
    marginTop: responsiveHeight(2),
    borderRadius: 12,
    padding: responsiveWidth(4),
  },
  orderIdRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderIdItem: {
    flex: 1,
  },
  orderIdLabel: {
    fontSize: 12,
    color: "#555",
    marginBottom: responsiveHeight(0.5),
  },
  orderIdText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: responsiveWidth(4),
    marginTop: responsiveHeight(2),
    borderRadius: 14,
    padding: responsiveWidth(4),
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: responsiveHeight(2),
  },

  itemContainer: {
    flexDirection: "row",
    paddingVertical: responsiveHeight(2),
  },
  itemBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productImage: {
    width: responsiveWidth(28),
    height: responsiveWidth(28),
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  itemDetails: {
    flex: 1,
    marginLeft: responsiveWidth(4),
    justifyContent: "center",
  },
  productName: {
    fontSize:13,
    fontWeight: "600",
    color: "#000",
    marginBottom: responsiveHeight(0.8),
  },
  itemDetailText: {
    fontSize: 12,
    color: "#555",
    marginBottom: responsiveHeight(0.4),
  },
  productPrice: {
    fontSize: 12,
    fontWeight: "700",
    color: "#000",
    marginTop: responsiveHeight(1),
  },

  trackingTimeline: {
    marginTop: responsiveHeight(1),
  },
  trackingStep: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: responsiveHeight(4),
  },
  statusIndicatorContainer: {
    alignItems: "center",
    marginRight: responsiveWidth(4),
    width: 40,
  },
  connectingLine: {
    width: 2,
    height: responsiveHeight(8),
    marginTop: 4,
  },
  stepDetails: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 12,
  },
  stepDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },

  addressText: {
    fontSize: 12,
    color: "#333",
    lineHeight: responsiveHeight(3.8),
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: responsiveHeight(1.2),
  },
  priceLabel: {
    fontSize: 12,
    color: "#000",
  },
  priceValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },
  divider: {
    height: 1.5,
    backgroundColor: "#eee",
    marginVertical: responsiveHeight(2),
  },
  paymentMode: {
    fontSize: 12,
    color: "#555",
    marginTop: responsiveHeight(1),
    textAlign: "right",
    fontStyle: "italic",
  },

  bottomContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingHorizontal: responsiveWidth(4),
    paddingTop: responsiveHeight(1.5),
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: responsiveWidth(3),
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#FF3B30",
    paddingVertical: responsiveHeight(2),
    borderRadius: 12,
    alignItems: "center",
  },
  chatButton: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: responsiveHeight(2),
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 12,
    color: "#666",
  },
});

export default OrderDetails;