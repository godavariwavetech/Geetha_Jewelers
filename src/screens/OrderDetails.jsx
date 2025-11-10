import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { responsiveWidth, responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";

const { width } = Dimensions.get("window");

const OrderDetails = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const orderData = {
    orderId: "252335686562",
    trackingId: "TRK-123456789",
    productName: "Arch of Royalty Gold Haaram",
    productPrice: "₹37,899",
    productImage: require("../assets/haaram.png"),
    orderStatus: [
      { label: "Order Confirmed", date: "Oct 06", completed: true },
      { label: "Shipped", date: "Mon 14th Oct", completed: true },
      { label: "Out For Delivery", date: "", completed: false },
      { label: "Delivery", date: "Sat Oct 19 (08:00 AM - 07:55 PM)", completed: false },
    ],
    shipping: {
      name: "James",
      phone: "+9187654321",
      email: "gmail@example.com",
      address:
        "Magadi Main Rd, next to Prasanna Theatre, Cholurpalya, Bengaluru, Karnataka 533103",
    },
    pricing: {
      gold: "₹2,68,606",
      stones: "₹200.00",
      making: "₹3,999",
      delivery: "Free",
      total: "₹2,72,805",
    },
  };

  const backgroundColor = "rgba(8, 118, 90, 1)";
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate refresh - in real app, fetch updated data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const getStatusIndex = (orderStatusArray) => {
    // Find the last completed index
    const lastCompletedIndex = orderStatusArray.findIndex(item => !item.completed);
    return lastCompletedIndex === -1 ? orderStatusArray.length - 1 : lastCompletedIndex;
  };

  const status = getStatusIndex(orderData.orderStatus);

  const trackingSteps = orderData.orderStatus.map((item) => ({
    title: item.label,
    description: '', // Can add if needed
    date: item.date || '',
    icon: item.label === 'Order Confirmed' ? 'checkmark-circle-outline' :
          item.label === 'Shipped' ? 'cube-outline' :
          item.label === 'Out For Delivery' ? 'bicycle-outline' :
          'location-outline',
  }));

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={backgroundColor} />
        }
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>{navigation.goBack()}} >
            <Ionicons name="arrow-back-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
        </View>

        {/* Order ID */}
        <View style={styles.orderIdContainer}>
          <View style={styles.orderIdRow}>
            <View style={styles.orderIdItem}>
              <View style={{flex:1,flexDirection:"row",gap:5}}>
                 <Text style={styles.orderIdLabel}>Order ID</Text>
              <Text style={styles.orderIdText} numberOfLines={1}>
                {orderData.orderId}
              </Text>
              </View>
             
            </View>
            {/* <View style={styles.orderIdItem}>
              <Text style={styles.orderIdLabel}>Tracking ID</Text>
              <Text style={styles.orderIdText} numberOfLines={1}>
                {orderData.trackingId}
              </Text>
            </View> */}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.card}>
          <View style={styles.productRow}>
            <Image source={orderData.productImage} style={styles.productImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{orderData.productName}</Text>
              <Text style={styles.productPrice}>{orderData.productPrice}</Text>
              <Text style={styles.priceDetails}>Price Details</Text>
            </View>
          </View>
        </View>

        {/* Order Status Timeline */}
        <View style={styles.trackingTimelineCard}>
          <Text style={styles.sectionTitle}>Order Status</Text>
          <View style={styles.trackingTimeline}>
            {trackingSteps.map((step, index) => {
              const isCompleted = index < status;
              const isCurrent = index === status;
              const isUpcoming = index > status;

              return (
                <View key={index} style={styles.trackingStep}>
                  {/* Left icon and line */}
                  <View style={styles.statusIndicatorContainer}>
                    <Ionicons
                      name={step.icon}
                      size={20}
                      color={isCompleted || isCurrent ? backgroundColor : '#ccc'}
                      style={{ marginBottom: 5 }}
                    />
                    {index < trackingSteps.length - 1 && (
                      <View
                        style={[
                          styles.connectingLine,
                          {
                            backgroundColor: index < status ? backgroundColor : '#ccc'
                          }
                        ]}
                      />
                    )}
                  </View>

                  {/* Step content */}
                  <View style={styles.stepDetails}>
                    <Text style={[
                      styles.stepTitle, 
                      { color: isCompleted || isCurrent ? '#000' : '#666' }
                    ]}>
                      {step.title}
                    </Text>
                    {step.description ? (
                      <Text style={styles.stepDescription}>{step.description}</Text>
                    ) : null}
                    {step.date ? (
                      <Text style={styles.stepDate}>{step.date}</Text>
                    ) : null}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Shipping Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Shipping Details</Text>
          <Text style={styles.shippingText}>
            {orderData.shipping.name}
            {"\n"}
            {orderData.shipping.phone}
            {"\n"}
            {orderData.shipping.email}
            {"\n"}
            {orderData.shipping.address}
          </Text>
        </View>

        {/* Pricing Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Pricing Details</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Gold</Text>
            <Text style={styles.priceValue}>{orderData.pricing.gold}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Other Stones</Text>
            <Text style={styles.priceValue}>{orderData.pricing.stones}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Making Charges</Text>
            <Text style={styles.priceValue}>{orderData.pricing.making}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery Charge</Text>
            <Text style={[styles.priceValue, { color: "#05AC0B" }]}>
              {orderData.pricing.delivery}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { fontWeight: "600" }]}>Total Amount</Text>
            <Text style={[styles.priceValue, { fontWeight: "700" }]}>
              {orderData.pricing.total}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Buttons */}
      <View style={[styles.bottomContainer, { paddingBottom: insets.bottom }]}>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // Adjust based on button height + extra space
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: responsiveWidth(4),
    // backgroundColor: "#fff",
    // borderBottomWidth: 0.5,
    // borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: "600",
    color: "#000",
    marginLeft: 10,
  },
  orderIdContainer: {
    backgroundColor: '#f4f4f4',
    // padding: responsiveWidth(4),
    borderRadius: 8,
    marginHorizontal: responsiveWidth(4),
    marginTop: responsiveHeight(2),
    // marginBottom: responsiveHeight(1),
  },
  orderIdRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  orderIdItem: {
    flex: 1,
    marginRight: 10,
  },
  orderIdLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
    marginBottom: 4,
  },
  orderIdText: {
    fontSize: 15,
    color: '#000',
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: responsiveWidth(4),
    marginHorizontal: responsiveWidth(4),
    marginTop: responsiveHeight(2),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  trackingTimelineCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: responsiveWidth(4),
    marginHorizontal: responsiveWidth(4),
    marginTop: responsiveHeight(2),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  productImage: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderRadius: 8,
    resizeMode: "contain",
  },
  productName: {
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
    color: "#000",
  },
  productPrice: {
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
    color: "#000",
    marginTop: 4,
  },
  priceDetails: {
    fontSize: responsiveFontSize(1.6),
    color: "#007AFF",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
    color: "#000",
    marginBottom: responsiveHeight(1.5),
  },
  trackingTimeline: {
    marginTop: responsiveHeight(1),
  },
  trackingStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: responsiveHeight(3),
  },
  statusIndicatorContainer: {
    alignItems: 'center',
    marginRight: responsiveWidth(4),
    width: 30,
  },
  connectingLine: {
    width: 2,
    height: responsiveHeight(7),
  },
  stepDetails: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  stepDate: {
    fontSize: 12,
    color: '#999',
  },
  shippingText: {
    fontSize: responsiveFontSize(1.8),
    color: "#333",
    lineHeight: 22,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: responsiveFontSize(1.8),
    color: "#000",
  },
  priceValue: {
    fontSize: responsiveFontSize(1.8),
    color: "#000",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 8,
  },
  // Bottom buttons styles
  bottomContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingHorizontal: responsiveWidth(4),
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: responsiveHeight(1.5),
  },
  cancelButton: {
    flex: 0.48,
    backgroundColor: "#FF3B30",
    paddingVertical: responsiveHeight(1.5),
    borderRadius: 8,
    alignItems: "center",
  },
  chatButton: {
    flex: 0.48,
    backgroundColor: "rgba(8, 118, 90, 1)",
    paddingVertical: responsiveHeight(1.5),
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: responsiveFontSize(1.8),
    fontWeight: "600",
  },
});

export default OrderDetails;