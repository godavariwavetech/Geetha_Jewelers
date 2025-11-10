// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
//   StatusBar,
// } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const { width } = Dimensions.get('window');

// function Cart({ navigation,state }) {
//   const insets = useSafeAreaInsets();
//   // Demo quantities
//   const [qty1, setQty1] = useState(1);
//   const [qty2, setQty2] = useState(1);

//   console.log(navigation,">>>>>>>>>>>>>>>>>>>>NAVIGATION",state)

//   return (
//     <View style={[styles.container, { paddingTop: insets.top,paddingBottom:insets.bottom}]}>
//       <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation?.goBack()}>
//           <Ionicons name="chevron-back" size={24} color="#1d1d1d" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Cart</Text>
//         {/* <MaterialCommunityIcons name="cart-outline" size={22} color="#1d1d1d" style={{ marginLeft: 'auto' }} /> */}
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false} style={[styles.scroll,{paddingBottom:insets.bottom}]}>
//         {/* Cart Items */}
//         <CartItem
//           image={require('../assets/coffee.jpeg')}
//           title="Cappuccino King"
//           subtitle="TALL(354 ML) - 392Kcal"
//           price={441}
//           selected
//           qty={qty1}
//           onQtyChange={setQty1}
//         />
//         <CartItem
//           image={require('../assets/coffee.jpeg')}
//           title="Cappuccino King"
//           subtitle="TALL(354 ML) - 392Kcal"
//           price={441}
//           selected={false}
//           qty={qty2}
//           onQtyChange={setQty2}
//         />

//         <TouchableOpacity style={styles.addMoreBtn} onPress={()=>{navigation.navigate("TabNavigator")}} >
//           <Text style={styles.addMoreText}>+ Add more Items</Text>
//         </TouchableOpacity>

//         {/* Delivery Details */}
//         <Text style={styles.sectionTitle}>Delivery Details</Text>
//         <View style={styles.deliveryCard}>
//           <View style={styles.homeRow}>
//             <MaterialCommunityIcons name="home-outline" size={22} color="#7c716d" style={{ marginRight: 8 }} />
//             <View style={{ flex: 1 }}>
//               <Text style={styles.deliveryMain}>Home</Text>
//               <Text style={styles.deliveryText}>301, JSR Enclave, Danvai... Lorem Ipsum Lorem Dolor Sit</Text>
//             </View>
//             <MaterialCommunityIcons name="chevron-right" size={22} color="#cfcfcf" />
//           </View>

//           <View style={styles.divider} />

//           <View style={styles.deliveryFlex}>
//             <MaterialCommunityIcons name="phone-outline" size={18} color="#7c716d" />
//             <Text style={styles.deliveryPhone}>Rajesh</Text>
//             <Text style={styles.phoneNum}>+91 23890145671</Text>
//           </View>
//         </View>

//         {/* Pricing Details */}
//         <Text style={styles.sectionTitle}>Pricing Details</Text>
//         <View style={styles.pricingTable}>
//           <View style={styles.priceRow}>
//             <Text style={styles.priceKey}>Product Cost</Text>
//             <Text style={styles.priceVal}>₹441</Text>
//           </View>
//           <View style={styles.priceRow}>
//             <Text style={styles.priceKey}>Special Discount</Text>
//             <Text style={[styles.priceVal, { color: '#18ba55' }]}>₹40</Text>
//           </View>
//           <View style={styles.priceRow}>
//             <Text style={styles.priceKey}>Delivery Charge</Text>
//             <Text style={[styles.priceVal, { color: '#18ba55' }]}>40</Text>
//           </View>
//           <View style={{ height: 2, backgroundColor: '#eaeaea', marginVertical: 6 }} />
//           <View style={styles.priceRow}>
//             <Text style={[styles.priceKey, { fontWeight: '700' }]}>Total Amount</Text>
//             <Text style={[styles.priceVal, { fontWeight: '700' }]}>₹441</Text>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Bottom Bar */}
//       <View style={styles.footerBar}>
//         <View style={styles.paymentCol}>
//           <Text style={styles.payUsingLabel}>Total</Text>
//           <View style={styles.upiRow}>
//             {/* <MaterialCommunityIcons name="cellphone" size={16} color="#411919" /> */}
//             <Text style={styles.upiProvider}>₹441</Text>
//           </View>
//         </View>
//         <TouchableOpacity style={styles.placeOrderBtn}  onPress={()=>{navigation.navigate("OrderSuccessScreen")}}  >
//           {/* <Text style={styles.amountNow}>₹330.22</Text> */}
//           <Text style={styles.placeOrderText}>Place Order</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// function CartItem({ image, title, subtitle, price, selected, qty, onQtyChange }) {
//   return (
//     <View style={styles.cartItemWrap}>
//       <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
//         <Image source={image} style={styles.cartImage} />
//         <View style={{ flex: 1, marginLeft: 8 }}>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Text style={styles.itemTitle}>{title}</Text>
//             <Text style={styles.itemPrice}>₹{price}</Text>
            
//           </View>
//           <Text style={styles.itemSubtitle}>{subtitle}</Text>

//           <View style={styles.buttonRow}>
//             <TouchableOpacity style={styles.removeBtn}>
//               <Text style={styles.removeBtnText}>Remove</Text>
//             </TouchableOpacity>

//             <View style={styles.qtyControlBox}>
//               <TouchableOpacity onPress={() => qty > 1 && onQtyChange(qty - 1)}>
//                 <MaterialCommunityIcons name="minus" size={18} color="#411919" />
//               </TouchableOpacity>
//               <Text style={styles.qtyText}>{qty}</Text>
//               <TouchableOpacity onPress={() => onQtyChange(qty + 1)}>
//                 <MaterialCommunityIcons name="plus" size={18} color="#411919" />
//               </TouchableOpacity>
//             </View>
//           </View>

//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: {
//     flexDirection: 'row', alignItems: 'center',
//     paddingHorizontal: 12, paddingTop: 16, paddingBottom: 10, backgroundColor: '#fff',
//   },
//   headerTitle: {
//     fontWeight: '700', fontSize: 18, color: '#222', marginLeft: 12,
//   },
//   scroll: { flex: 1, backgroundColor: '#fff' },
//   cartItemWrap: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     marginHorizontal: 10,
//     marginTop: 12,
//     padding: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.04,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 8,
//     elevation: 1,
//     borderWidth: 1,
//     borderColor: '#f5f2f0',
//   },
//   cartImage: { width: 100, height: 100, borderRadius: 10, marginRight: 2 },
//   itemTitle: { fontWeight: '700', fontSize: 18, color: '#111' },
//   itemSubtitle: { fontSize: 16, color: '#411919', fontWeight: '500', marginVertical: 2 },
//   itemPrice: { fontWeight: '700', fontSize: 14, marginLeft: 10, color: '#111' },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     marginTop: 7,
//     alignItems: 'center',
//     gap:5
//   },
//   removeBtn: {
//     backgroundColor: '#f6f6f6',
//     paddingHorizontal: 6,
//     paddingVertical: 10,
//     borderRadius: 7,
//   },
//   removeBtnText: { color: '#411919', fontSize: 13, fontWeight: '600' },
//   qtyControlBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f6f6f6',
//     borderRadius: 7,
//     paddingHorizontal: 6,
//     paddingVertical: 4,
//     minWidth: 65,
//     justifyContent: 'space-between',
//     borderWidth:0.5,
//     borderColor:"#411919"
//   },
//   qtyText: { fontSize: 14, fontWeight: '700', color: '#411919', marginHorizontal: 6 },
//   nearYouText: {
//     color: '#222',
//     fontSize: 16,
//     fontWeight: '700',
//     marginLeft: 10,
//     marginTop: 18,
//   },
//   sectionTitle: {
//     fontWeight: '700', fontSize: 14, color: '#222', marginLeft: 14, marginVertical: 10,
//   },
//   deliveryCard: {
//     backgroundColor: '#fff', borderRadius: 12, marginHorizontal: 12, padding: 12,
//     shadowColor: '#000', shadowOpacity: 0.02, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,
//     elevation: 1, borderWidth: 1, borderColor: '#f3efed',
//   },
//   deliveryMain: { fontWeight: '700', fontSize: 13, color: '#411919' },
//   deliveryText: { color: '#696969', fontSize: 12, fontWeight: '500', marginTop: 1 },
//   homeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
//   deliveryFlex: { flexDirection: 'row', alignItems: 'center', gap: 6 },
//   deliveryPhone: { marginLeft: 6, color: '#411919', fontWeight: '600', fontSize: 12 },
//   phoneNum: { marginLeft: 9, color: '#232323', fontWeight: '500', fontSize: 12 },
//   divider: {
//     borderBottomColor: '#ccc',
//     borderBottomWidth: 1,
//     borderStyle: 'dotted',
//     marginBottom: 10,
//   },
//   pricingTable: {
//     backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 12,
//     paddingTop: 10, paddingBottom: 8, marginBottom: 21,
//     shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 5, elevation: 1,
//     borderColor: '#f4eae4', borderWidth: 1, paddingHorizontal: 15,
//   },
//   priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2, alignItems: 'center' },
//   priceKey: { fontSize: 14, color: '#232323', fontWeight: '500' },
//   priceVal: { fontWeight: '600', fontSize: 14, color: '#232323' },
//   footerBar: {
//     flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
//     backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 10,
//     borderTopLeftRadius: 17, borderTopRightRadius: 17, borderTopWidth: 0.5,
//     borderColor: '#f1edea',
//     shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 5, elevation: 5,
//   },
//   paymentCol: { flex: 1, justifyContent: 'center' },
//   payUsingLabel: { fontSize: 20, color: '#232323', fontWeight: '500', marginBottom: 1 },
//   upiRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
//   upiProvider: { marginLeft: 3, fontWeight: '700', fontSize: 18, color: '#411919' },
//   placeOrderBtn: {
//     backgroundColor: '#411919', paddingHorizontal: 30, paddingVertical: 15,
//     borderRadius: 4, flexDirection: 'row', alignItems: 'center', gap: 12,
//   },
//   placeOrderText: { color: '#fff', fontWeight: '700', fontSize: 15 },
//   amountNow: { color: '#fff', fontWeight: '600', marginRight: 8, fontSize: 14 },

  
//   addMoreBtn: {
//     margin: 24,
//     marginBottom: 14,
//     alignSelf: 'flex-start',
//   },
//   addMoreText: {
//     color: '#411919',
//     fontWeight: 'bold',
//     fontSize: 17,
//   },

//   removeBtn: {
//     backgroundColor: '#f6f6f6',
//     paddingHorizontal: 12,
//     paddingVertical: 8,    // increased vertical padding
//     borderRadius: 7,
//     borderWidth: 0.5,      // added border width
//     borderColor: '#411919',// dark brown border color
//     marginRight: 8,
//   },
//   removeBtnText: { color: '#411919', fontSize: 13, fontWeight: '600' },

//   pricingTable: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginHorizontal: 12,
//     paddingTop: 10,
//     paddingBottom: 8,
//     marginBottom: 21,
//     shadowColor: '#000',
//     shadowOpacity: 0.03,
//     shadowRadius: 5,
//     elevation: 1,
//     borderColor: '#f4eae4',
//     borderWidth: 1,
//     paddingHorizontal: 15,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,  // increased space between rows
//     alignItems: 'center',
//   },
//   priceKey: { fontSize: 14, color: '#232323', fontWeight: '500' },
//   priceVal: { fontWeight: '600', fontSize: 14, color: '#232323' },

// });

// export default Cart;
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomModal from "../components/CustomModal"; // adjust path if needed
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const Cart = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const haaram = require("../assets/haaram.png");
  const mangalsutra = require("../assets/mangalsutra.png");

  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Arch of Royalty Gold Finger Ring",
      price: "₹37,899",
      weight: "3.5 g",
      image: mangalsutra,
    },
    {
      id: "2",
      name: "Stone Heart 22K Gold Chain with earrings",
      price: "₹90,000",
      weight: "7.3 g",
      image: haaram,
    },
    {
      id: "3",
      name: "Arch of Royalty Necklace",
      price: "₹37,899",
      weight: "5 g",
      image: haaram,
    },
  
 
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRemoveItem = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const confirmRemove = () => {
    setCartItems((prev) => prev.filter((x) => x.id !== selectedItem.id));
    setModalVisible(false);
    setSelectedItem(null);
  };

  const renderItem = (item) => (
    <View style={styles.itemCard}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => handleRemoveItem(item)}
      >
        <Ionicons name="close" size={18} color="#8E8E8E" />
      </TouchableOpacity>
      <Image source={item.image} style={styles.image} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <Text style={styles.itemWeight}>{item.weight}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {  backgroundColor: "#fff" },
      ]}
    >
      <View style={{flex:1,paddingBottom:insets.bottom,paddingTop: insets.top+5,}}>
      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom+100, // space for bottom button
        }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#0E614E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cart</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Cart Items */}
        <View style={{ marginTop: 10 }}>
          {cartItems.map((item) => (
            <View key={item.id}>{renderItem(item)}</View>
          ))}
        </View>

        {/* Add Delivery Details */}
        <TouchableOpacity
          style={styles.addDeliveryBtn}
          onPress={() => navigation.navigate("MyAddresses")}
        >
          <Text style={styles.addDeliveryText}>Add Delivery Details</Text>
          <Ionicons name="chevron-forward" size={18} color="#000" />
        </TouchableOpacity>

        {/* Pricing Details */}
        <View style={styles.pricingContainer}>
          <Text style={styles.pricingHeader}>Pricing Details</Text>
          <View style={styles.pricingRow}>
            <Text style={styles.label}>Sub Total</Text>
            <Text style={styles.value}>₹2,68,606</Text>
          </View>
          <View style={styles.pricingRow}>
            <Text style={styles.label}>Special Discount</Text>
            <Text style={styles.discount}>-₹40</Text>
          </View>
          <View style={styles.pricingRow}>
            <Text style={styles.label}>Delivery Charge</Text>
            <Text style={[styles.value, { color: "#0E614E" }]}>Free</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.pricingRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹2,68,606</Text>
          </View>
        </View>
      </ScrollView>
</View>
      {/* Fixed Checkout Button */}
      <View
        style={[
          styles.checkoutWrapper,
          { paddingBottom: insets.bottom > 0 ? insets.bottom : 17 },
        ]}
      >
        <TouchableOpacity style={styles.checkoutBtn} onPress={()=>{navigation.navigate("Payment")}}>
          <Text style={styles.checkoutText}>Proceed To Checkout</Text>
          <Ionicons name="chevron-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Delete Confirmation Modal */}
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
    color: "rgba(8, 118, 90, 1)",
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 10,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 1,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  itemPrice: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
    marginTop: 4,
  },
  itemWeight: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  addDeliveryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 10,
  },
  addDeliveryText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  pricingContainer: {
    marginHorizontal: 16,
    paddingVertical: 10,
  },
  pricingHeader: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
    marginBottom: 6,
  },
  pricingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  label: {
    fontSize: 13,
    color: "#555",
  },
  value: {
    fontSize: 13,
    color: "#000",
  },
  discount: {
    fontSize: 13,
    color: "#0E614E",
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 6,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
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
  },
  checkoutBtn: {
    backgroundColor: "#0E614E",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginRight: 5,
  },
});

export default Cart;

