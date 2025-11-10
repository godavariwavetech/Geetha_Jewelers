import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const WishList = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const haaram = require("../assets/haaram.png");
  const mangalsutra = require("../assets/mangalsutra.png");
  const wishlistData = [
    { id: "1", name: "Arch of Royalty Gold Finger Ring", image: haaram },
    { id: "2", name: "Arch of Royalty Gold Finger Ring", image: mangalsutra },
    { id: "3", name: "Arch of Royalty Gold Finger Ring", image: haaram },
    { id: "4", name: "Arch of Royalty Gold Finger Ring", image: mangalsutra },
    { id: "5", name: "Arch of Royalty Gold Finger Ring", image: haaram },
    { id: "6", name: "Arch of Royalty Gold Finger Ring", image: mangalsutra },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Heart Icon */}
      <TouchableOpacity style={styles.heartIcon}>
        <Ionicons name="heart" size={20} color="#E53935" />
      </TouchableOpacity>

      {/* Product Image */}
      <Image source={item.image} style={styles.image} resizeMode="contain" />

      {/* Product Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.salePrice}>₹37,869</Text>
          <Text style={styles.mrp}>₹40,000</Text>
        </View>
        <Text style={styles.discount}>10% off making charges</Text>
        <TouchableOpacity style={styles.cartBtn}>
          <Text style={styles.cartBtnText}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#0E614E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wishlist</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Wishlist Grid */}
      <FlatList
        data={wishlistData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 20,
          paddingHorizontal: 10,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const CARD_WIDTH = (width - 36) / 2; // spacing-adjusted 2-column layout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "flex-start",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
    gap:10
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "rgba(8, 118, 90, 1)",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: CARD_WIDTH,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    position: "relative",
  },
  heartIcon: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    paddingHorizontal: 8,
    paddingTop: 5,
  },
  name: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000",
    height: 34,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
    gap: 5,
  },
  salePrice: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
  },
  mrp: {
    fontSize: 12,
    color: "#8E8E8E",
    textDecorationLine: "line-through",
  },
  discount: {
    fontSize: 11,
    color: "#0E614E",
    marginTop: 2,
  },
  cartBtn: {
    borderWidth: 1,
    borderColor: "#0E614E",
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: "center",
    marginTop: 6,
  },
  cartBtnText: {
    color: "#0E614E",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default WishList;
