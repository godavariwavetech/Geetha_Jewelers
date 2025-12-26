import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomModal from "../components/CustomModal";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartItems,
  removeFromCart,
  clearError,
} from "../redux/slices/cartSlice";

const { width } = Dimensions.get("window");

const PRIMARY_COLOR = "#832729";

const Cart = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { customerId } = useSelector((state) => state.Auth || {});
  const { cartItems, loading, error } = useSelector((state) => state.cart);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCartId, setSelectedCartId] = useState(null);

  useEffect(() => {
    if (customerId) {
      dispatch(fetchCartItems(customerId));
    }
  }, [dispatch, customerId]);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error || "Something went wrong", [
        { text: "OK", onPress: () => dispatch(clearError()) },
      ]);
    }
  }, [error, dispatch]);

  const handleRemoveItem = (cartId) => {
    setSelectedCartId(cartId);
    setModalVisible(true);
  };

  const confirmRemove = async () => {
    if (selectedCartId && customerId) {
      const result = await dispatch(removeFromCart(selectedCartId));

      if (result.meta.requestStatus === "fulfilled") {
        // Refetch cart items to keep everything in sync
        dispatch(fetchCartItems(customerId));

        // Show success popup
        Alert.alert(
          "Success",
          "Item removed from cart successfully!",
          [{ text: "OK" }],
          { cancelable: true }
        );
      } else {
        // If somehow failed (though unlikely since rejected case handles error)
        Alert.alert("Error", "Failed to remove item. Please try again.");
      }
    }

    // Close confirmation modal
    setModalVisible(false);
    setSelectedCartId(null);
  };

  // const renderItem = (item) => (
  //   <View style={styles.itemCard}>
  //     <TouchableOpacity
  //       style={styles.closeButton}
  //       onPress={() => handleRemoveItem(item.id)}
  //     >
  //       <Ionicons name="close" size={18} color="#8E8E8E" />
  //     </TouchableOpacity>

  //     <Image
  //       source={{
  //         uri: item.product_main_image || "https://via.placeholder.com/70",
  //       }}
  //       style={styles.image}
  //       resizeMode="cover"
  //       defaultSource={require("../assets/profile1.png")}
  //     />

  //     <View style={{ flex: 1, marginLeft: 10 }}>
  //       <Text style={styles.itemTitle} numberOfLines={2}>
  //         {item.product_name}
  //       </Text>
  //       <Text style={styles.itemPrice}>
  //         ₹{Number(item.total_price).toLocaleString("en-IN")}
  //       </Text>
  //       <Text style={styles.itemWeight}>{item.gross_weight} g • {item.karat}K</Text>
  //     </View>
  //   </View>
  // );
const renderItem = (item) => (
  <View style={styles.itemCard}>
    <TouchableOpacity
      style={styles.closeButton}
      onPress={() => handleRemoveItem(item.id)}
    >
      <Ionicons name="close" size={18} color="#8E8E8E" />
    </TouchableOpacity>

    <Image
      source={{
        uri: item.product_main_image || "https://via.placeholder.com/70",
      }}
      style={styles.image}
      resizeMode="cover"
      defaultSource={require("../assets/profile1.png")}
    />

    <View style={{ flex: 1, marginLeft: 10 }}>
      <Text style={styles.itemTitle} numberOfLines={2}>
        {item.product_name}
      </Text>

      {/* Show size only if it exists */}
      {item.size && (
        <Text style={styles.itemSize}>Size: {item.size}</Text>
      )}

      <Text style={styles.itemPrice}>
        ₹{Number(item.total_price).toLocaleString("en-IN")}
      </Text>

      <Text style={styles.itemWeight}>{item.gross_weight} g • {item.karat}K</Text>
    </View>
  </View>
);
  const subTotal = cartItems.reduce(
    (sum, item) => sum + Number(item.total_price || 0),
    0
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#fff" }]}>
      <View
        style={{
          flex: 1,
          paddingBottom: insets.bottom,
          paddingTop: insets.top + 20,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 120,
          }}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={22} color={PRIMARY_COLOR} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: PRIMARY_COLOR }]}>
              My Cart ({cartItems.length})
            </Text>
            <View style={{ width: 22 }} />
          </View>

          {/* Loading State */}
          {loading && !cartItems.length && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={PRIMARY_COLOR} />
              <Text style={styles.loadingText}>Loading your cart...</Text>
            </View>
          )}

          {/* Empty Cart */}
          {!loading && cartItems.length === 0 && (
            <View style={styles.emptyContainer}>
              <Ionicons name="cart-outline" size={80} color="#ccc" />
              <Text style={styles.emptyText}>Your cart is empty</Text>
              <Text style={styles.emptySubText}>Add items to get started!</Text>
              <TouchableOpacity
                style={[styles.shopNowBtn, { backgroundColor: PRIMARY_COLOR }]}
                onPress={() => navigation.navigate("DrawerNavigation")}
              >
                <Text style={styles.shopNowText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Cart Items List */}
          {cartItems.length > 0 &&
            cartItems.map((item) => (
              <View key={item.id}>{renderItem(item)}</View>
            ))}

          {/* Add Delivery Details */}
          {cartItems.length > 0 && (
            <TouchableOpacity
              style={styles.addDeliveryBtn}
              onPress={() => navigation.navigate("MyAddresses")}
            >
              <Text style={styles.addDeliveryText}>Add Delivery Details</Text>
              <Ionicons name="chevron-forward" size={18} color="#000" />
            </TouchableOpacity>
          )}

          {/* Pricing Details */}
          {cartItems.length > 0 && (
            <View style={styles.pricingContainer}>
              <Text style={styles.pricingHeader}>Pricing Details</Text>
              <View style={styles.pricingRow}>
                <Text style={styles.label}>Sub Total</Text>
                <Text style={styles.value}>
                  ₹{subTotal.toLocaleString("en-IN")}
                </Text>
              </View>
              <View style={styles.pricingRow}>
                <Text style={styles.label}>Making Charges</Text>
                <Text style={styles.value}>Included</Text>
              </View>
              <View style={styles.pricingRow}>
                <Text style={styles.label}>Delivery Charge</Text>
                <Text style={[styles.value, { color: PRIMARY_COLOR }]}>Free</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.pricingRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={[styles.totalValue, { color: PRIMARY_COLOR }]}>
                  ₹{subTotal.toLocaleString("en-IN")}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <View
          style={[
            styles.checkoutWrapper,
            { paddingBottom: insets.bottom > 0 ? insets.bottom + 10 : 20 },
          ]}
        >
          <TouchableOpacity
            style={[styles.checkoutBtn, { backgroundColor: PRIMARY_COLOR }]}
            onPress={() => navigation.navigate("Payment")}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            <Ionicons name="chevron-forward" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      {/* Remove Confirmation Modal */}
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Remove Item"
        content="Are you sure you want to remove this item from your cart?"
        confirmText="Remove"
        cancelText="Cancel"
        onConfirm={confirmRemove}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 16,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  itemTitle: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
    lineHeight: 18,
  },
  itemPrice: {
    fontSize: 16,
    color: "#000",
    fontWeight: "700",
    marginTop: 6,
  },
  itemWeight: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#777",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    marginTop: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: "#777",
    marginTop: 8,
  },
  shopNowBtn: {
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopNowText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  addDeliveryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 10,
  },
  addDeliveryText: {
    fontSize: 15,
    color: "#000",
    fontWeight: "500",
  },
  pricingContainer: {
    marginHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
  },
  pricingHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  pricingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginVertical: 4,
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  value: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  checkoutWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    paddingTop: 10,
  },
  checkoutBtn: {
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  itemSize: {
  fontSize: 13,
  color: "#555",
  fontWeight: "500",
  marginTop: 4,
},
});

export default Cart;