import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

const { width } = Dimensions.get("window");

const ProductDetailsScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [selectedSize, setSelectedSize] = useState("17");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);

  const sizes = ["16", "17", "17.5", "18"];
  const images = [
    require("../assets/earrings.png"),
    require("../assets/earrings.png"), // Duplicate for demo; replace with actual angle images
    require("../assets/earrings.png"),
    require("../assets/earrings.png"),
  ];

  const productDetails = [
    { key: "Material", value: "Gold" },
    { key: "Purity", value: "22K" },
    { key: "Gross Weight", value: "3.5 g" },
    { key: "Design", value: "Arch of Royalty" },
    { key: "Occasion", value: "Daily Wear & Special" },
  ];

  const priceDetails = [
    { key: "Base Price", value: "₹35,000" },
    { key: "Making Charges", value: "₹2,000" },
    { key: "GST (3%)", value: "₹869" },
    { key: "Total", value: "₹37,869" },
  ];

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }} // Adjusted for bottom bar and insets
      >
        {/* Search Bar */}
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#08765A" />
            <Text style={styles.placeholderText}>
              Search here Your favourite Jewellery
            </Text>
            <Ionicons name="heart-outline" size={20} color="#08765A" />
            <Ionicons
              name="share-outline"
              size={20}
              color="#555"
              style={{ marginLeft: 8 }}
            />
          </View>
        </View>

        {/* Main Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={images[selectedImage]}
            style={styles.mainProductImage}
            resizeMode="contain"
          />
        </View>

        {/* Thumbnail Angles */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailsContainer}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {images.map((img, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.thumbnail,
                selectedImage === index && styles.thumbnailSelected,
              ]}
              onPress={() => setSelectedImage(index)}
            >
              <Image
                source={img}
                style={styles.thumbnailImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Product Info */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Arch of Royalty Gold Finger Ring</Text>

          {/* Ratings */}
          <View style={styles.ratingRow}>
            <Ionicons name="star" color="#FFD700" size={16} />
            <Ionicons name="star" color="#FFD700" size={16} />
            <Ionicons name="star" color="#FFD700" size={16} />
            <Ionicons name="star-half" color="#FFD700" size={16} />
            <Ionicons name="star-outline" color="#FFD700" size={16} />
            <Text style={styles.ratingText}>(90+ ratings)</Text>
          </View>

          {/* Sizes */}
          <Text style={styles.sectionTitle}>Available Sizes</Text>
          <View style={styles.sizeContainer}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.sizeSelected,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === size && styles.sizeTextSelected,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>₹37,869</Text>
            <Text style={styles.oldPrice}>₹40,869</Text>
          </View>
          <Text style={styles.taxText}>(Inclusive of all Taxes)</Text>

          {/* Weight & Quantity */}
          <View style={styles.weightRow}>
            <View>
              <Text style={styles.weightLabel}>3.5 g</Text>
              <Text style={styles.weightSub}>Gross Weight (G)</Text>
            </View>
            <View style={styles.qtyContainer}>
              <Text style={styles.weightSub}>Net Qty</Text>
              <View style={styles.qtyButtons}>
                <TouchableOpacity
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Text style={styles.qtyBtn}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyValue}>{quantity}</Text>
                <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                  <Text style={styles.qtyBtn}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Product Details Link */}
          <TouchableOpacity
            style={styles.detailsLinkContainer}
            onPress={() => setShowProductModal(true)}
          >
            <View style={styles.linkRow}>
              <Text style={styles.detailsLink}>Product Details</Text>
              <Ionicons name="chevron-forward" size={18} color="#08765A" />
            </View>
          </TouchableOpacity>

          {/* Price Details Link */}
          <TouchableOpacity
            style={styles.detailsLinkContainer}
            onPress={() => setShowPriceModal(true)}
          >
            <View style={styles.linkRow}>
              <Text style={styles.detailsLink}>Price Details</Text>
              <Ionicons name="chevron-forward" size={18} color="#08765A" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={[styles.bottomBar, { bottom: insets.bottom }]}>
        <View>
          <Text style={styles.bottomPrice}>₹37,869</Text>
          <Text style={styles.taxSmall}>(Inclusive of all Taxes)</Text>
        </View>
        <View style={styles.actionButtons} >
          <TouchableOpacity style={styles.cartButton} onPress={()=>{navigation.navigate("Cart")}} >
            <Text style={styles.cartText}>ADD TO CART</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyText}>BUY NOW</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Details Modal */}
      <Modal
        visible={showProductModal}
        onRequestClose={() => setShowProductModal(false)}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Product Details</Text>
            <TouchableOpacity onPress={() => setShowProductModal(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            {productDetails.map((item, index) => (
              <React.Fragment key={item.key}>
                <View style={styles.modalRow}>
                  <Text style={styles.modalKey}>{item.key}</Text>
                  <Text style={styles.modalValue}>{item.value}</Text>
                </View>
                {index < productDetails.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Price Details Modal */}
      <Modal
        visible={showPriceModal}
        onRequestClose={() => setShowPriceModal(false)}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Price Details</Text>
            <TouchableOpacity onPress={() => setShowPriceModal(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            {priceDetails.map((item, index) => (
              <React.Fragment key={item.key}>
                <View style={styles.modalRow}>
                  <Text style={styles.modalKey}>{item.key}</Text>
                  <Text style={styles.modalValue}>{item.value}</Text>
                </View>
                {index < priceDetails.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  header: { paddingHorizontal: 16, paddingVertical: 8 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
  },
  placeholderText: {
    flex: 1,
    marginHorizontal: 8,
    color: "#999",
    fontSize: responsiveFontSize(1.7),
  },
  imageContainer: { alignItems: "center", marginTop: 10 },
  mainProductImage: {
    width: width * 0.85,
    height: responsiveHeight(30),
  },
  thumbnailsContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  thumbnail: {
    marginRight: 8,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  thumbnailSelected: {
    borderColor: "#08765A",
  },
  thumbnailImage: {
    width: 60,
    height: 60,
  },
  detailsContainer: { paddingHorizontal: 16, marginTop: 12 },
  title: {
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
    color: "#222",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  ratingText: { marginLeft: 6, color: "#777", fontSize: responsiveFontSize(1.6) },
  sectionTitle: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "600",
    marginTop: 8,
  },
  sizeContainer: { flexDirection: "row", marginTop: 8 },
  sizeButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  sizeSelected: {
    backgroundColor: "#08765A",
    borderColor: "#08765A",
  },
  sizeText: { fontSize: responsiveFontSize(1.8), color: "#333" },
  sizeTextSelected: { color: "#fff" },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  currentPrice: {
    color: "#08765A",
    fontWeight: "700",
    fontSize: responsiveFontSize(2),
  },
  oldPrice: {
    textDecorationLine: "line-through",
    color: "#999",
    marginLeft: 8,
    fontSize: responsiveFontSize(1.7),
  },
  taxText: { color: "#777", fontSize: responsiveFontSize(1.6), marginTop: 2 },
  weightRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },
  weightLabel: { fontSize: responsiveFontSize(2), fontWeight: "600" },
  weightSub: { fontSize: responsiveFontSize(1.6), color: "#777" },
  qtyContainer: { alignItems: "center" },
  qtyButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  qtyBtn: {
    fontSize: responsiveFontSize(2.4),
    color: "#08765A",
    paddingHorizontal: 10,
    fontWeight: "600",
  },
  qtyValue: {
    paddingHorizontal: 10,
    fontSize: responsiveFontSize(1.9),
    fontWeight: "500",
  },
  detailsLinkContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 10,
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsLink: {
    color: "#08765A",
    fontWeight: "600",
    fontSize: responsiveFontSize(1.9),
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomPrice: {
    fontSize: responsiveFontSize(2),
    fontWeight: "700",
    color: "#08765A",
  },
  taxSmall: {
    fontSize: responsiveFontSize(1.4),
    color: "#777",
  },
  actionButtons: { flexDirection: "row", gap: 10 },
  cartButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#08765A",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  cartText: {
    color: "#08765A",
    fontWeight: "600",
    fontSize: responsiveFontSize(1.6),
  },
  buyButton: {
    backgroundColor: "#08765A",
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  buyText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: responsiveFontSize(1.6),
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
    color: "#333",
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  modalKey: {
    fontSize: responsiveFontSize(1.8),
    color: "#555",
    flex: 1,
  },
  modalValue: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "600",
    color: "#333",
    textAlign: "right",
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 16,
  },
});