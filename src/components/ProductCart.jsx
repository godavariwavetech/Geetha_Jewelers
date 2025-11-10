// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {
//   responsiveWidth,
//   responsiveHeight,
//   responsiveFontSize,
// } from 'react-native-responsive-dimensions';
// import commonstyles from '../commonstyles/commonstyles';
// import { colors } from '../config/theme';

// const ProductCartCard = ({
//   product,
//   onRemove,
//   selectedSize,
//   selectedQty,
//   onSizeChange,
//   onQtyChange,
//   onImagePress, // Add new prop for image press
// }) => {
//   // Map sizes from product.sizes
//   const sizeData = product.sizes.map((sizeObj) => ({
//     label: `Size: ${sizeObj.size}`,
//     value: sizeObj.size,
//     size_id: sizeObj.size_id,
//     actual_price: sizeObj.actual_price,
//     selling_price: sizeObj.selling_price,
//     stock: sizeObj.stock,
//   }));

//   // Find the selected size object to get its prices and stock
//   const selectedSizeObj = product.sizes.find((size) => size.size === selectedSize) || product.sizes[0];
//   const currentSellingPrice = selectedSizeObj ? selectedSizeObj.selling_price : product.selling_price;
//   const currentActualPrice = selectedSizeObj ? selectedSizeObj.actual_price : product.actual_price;
//   const totalSellingPrice = currentSellingPrice * (selectedQty || 1);
//   const isOutOfStock = selectedSizeObj ? selectedSizeObj.stock === 0 : true;
//   const maxQty = selectedSizeObj ? selectedSizeObj.stock : 0;

//   // Handle quantity increment
//   const handleIncrement = () => {
//     onQtyChange?.(selectedQty + 1);
//   };

//   // Handle quantity decrement
//   const handleDecrement = () => {
//     if (selectedQty > 1) {
//       onQtyChange?.(selectedQty - 1);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.topRow}>
//         {/* Image with Out of Stock Overlay, wrapped in TouchableOpacity */}
//         <TouchableOpacity
//           style={styles.imageContainer}
//           onPress={() => onImagePress?.(product.product_id)} // Pass product_id to onImagePress
//           disabled={isOutOfStock} // Disable click if out of stock
//         >
//           <Image
//             source={product.image}
//             style={[styles.image, isOutOfStock && styles.disabledImage]}
//             resizeMode="cover"
//           />
//           {isOutOfStock && (
//             <View style={styles.outOfStockOverlay}>
//               <Text style={styles.outOfStockText}>Out of Stock</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//         <View style={styles.content}>
//           {onRemove && (
//             <TouchableOpacity style={styles.closeIcon} onPress={onRemove}>
//               <Icon name="close" size={responsiveFontSize(2)} color="#000" />
//             </TouchableOpacity>
//           )}
//           <Text style={[commonstyles.text3, { fontSize: 14 }]}>{product.title}</Text>
//           <Text style={[commonstyles.text4]}>{product.description}</Text>

//           {/* Dropdown and Quantity Controls */}
//           <View style={[styles.dropdowns, { marginTop: responsiveHeight(1) }]}>
//             <Dropdown
//               style={[styles.dropdown, isOutOfStock && styles.disabledDropdown]}
//               data={sizeData.filter((size) => size.stock > 0)}
//               labelField="label"
//               valueField="value"
//               value={selectedSize}
//               onChange={(item) => onSizeChange?.(item.value, item.size_id)}
//               placeholder="Select Size"
//               placeholderStyle={styles.dropdownPlaceholder}
//               selectedTextStyle={styles.dropdownText}
//               itemTextStyle={styles.dropdownItemText}
//               iconColor="#000"
//               iconStyle={styles.dropdownIcon}
//               disable={isOutOfStock}
//             />
//             <View style={styles.quantityContainer}>
//               <TouchableOpacity
//                 style={[styles.quantityButton, isOutOfStock || selectedQty <= 1 ? styles.disabledQuantityButton : null]}
//                 onPress={handleDecrement}
//                 disabled={isOutOfStock || selectedQty <= 1}
//               >
//                 <Icon name="remove" size={responsiveFontSize(2)} color={isOutOfStock || selectedQty <= 1 ? '#999' : '#000'} />
//               </TouchableOpacity>
//               <Text style={styles.quantityText}>{selectedQty || 1}</Text>
//               <TouchableOpacity
//                 style={[styles.quantityButton]}
//                 onPress={handleIncrement}
//               >
//                 <Icon name="add" size={responsiveFontSize(2)} color="#000" />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Price below controls */}
//           <View style={[styles.priceOffer, { marginTop: responsiveHeight(1) }]}>
//             <View style={[commonstyles.row, { gap: 3 }]}>
//               <Text style={commonstyles.text4}>₹{totalSellingPrice}</Text>
//               {currentActualPrice !== currentSellingPrice && (
//                 <Text style={[commonstyles.text4, { textDecorationLine: 'line-through' }]}>
//                   ₹{currentActualPrice * (selectedQty || 1)}
//                 </Text>
//               )}
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#bdbdbd',
//     borderRadius: 6,
//     padding: responsiveWidth(2),
//     marginBottom: responsiveHeight(2),
//   },
//   topRow: {
//     flexDirection: 'row',
//     marginBottom: responsiveHeight(1),
//   },
//   imageContainer: {
//     position: 'relative',
//     width: responsiveWidth(25),
//     height: responsiveHeight(15),
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 2,
//   },
//   disabledImage: {
//     opacity: 0.5,
//   },
//   outOfStockOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 2,
//   },
//   outOfStockText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: responsiveFontSize(1.5),
//     backgroundColor: '#ff0000',
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 4,
//   },
//   content: {
//     flex: 1,
//     paddingLeft: responsiveWidth(3),
//     position: 'relative',
//     flexDirection: 'column',
//     gap: 4,
//   },
//   closeIcon: {
//     position: 'absolute',
//     right: 0,
//     top: 0,
//     padding: responsiveWidth(1),
//     zIndex: 1,
//   },
//   dropdowns: {
//     flexDirection: 'row',
//     gap: responsiveWidth(2),
//     alignItems: 'center',
//   },
//   dropdown: {
//     width: responsiveWidth(22),
//     height: responsiveHeight(4),
//     backgroundColor: '#fff',
//     borderRadius: 4,
//     borderWidth: 1,
//     borderColor: '#bdbdbd',
//     paddingHorizontal: responsiveWidth(1.5),
//   },
//   disabledDropdown: {
//     opacity: 0.5,
//     backgroundColor: '#f5f5f5',
//   },
//   dropdownText: {
//     fontSize: responsiveFontSize(1.5),
//     color: '#000',
//   },
//   dropdownPlaceholder: {
//     fontSize: responsiveFontSize(1.5),
//     color: '#666',
//   },
//   dropdownItemText: {
//     fontSize: responsiveFontSize(1.5),
//     color: '#000',
//   },
//   dropdownIcon: {
//     marginRight: responsiveWidth(1),
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#bdbdbd',
//     borderRadius: 4,
//     height: responsiveHeight(4),
//     width: responsiveWidth(22),
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//   },
//   quantityButton: {
//     width: responsiveWidth(6),
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   disabledQuantityButton: {
//     opacity: 0.5,
//     backgroundColor: '#f5f5f5',
//   },
//   quantityText: {
//     fontSize: responsiveFontSize(1.5),
//     color: '#000',
//     textAlign: 'center',
//     flex: 1,
//   },
//   priceOffer: {
//     alignItems: 'flex-end',
//     flexShrink: 1,
//   },
// });

// export default ProductCartCard;
// above code before swipe 
// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { Swipeable } from 'react-native-gesture-handler';
// import { Dropdown } from 'react-native-element-dropdown';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {
//   responsiveWidth,
//   responsiveHeight,
//   responsiveFontSize,
// } from 'react-native-responsive-dimensions';
// import commonstyles from '../commonstyles/commonstyles';
// import { colors } from '../config/theme';

// const ProductCartCard = ({
//   product,
//   onRemove,
//   selectedSize,
//   selectedQty,
//   onSizeChange,
//   onQtyChange,
//   onImagePress,
// }) => {
//   // State to track if the card is swiped
//   const [isSwiped, setIsSwiped] = useState(false);

//   // Map sizes from product.sizes
//   const sizeData = product.sizes.map((sizeObj) => ({
//     label: `Size: ${sizeObj.size}`,
//     value: sizeObj.size,
//     size_id: sizeObj.size_id,
//     actual_price: sizeObj.actual_price,
//     selling_price: sizeObj.selling_price,
//     stock: sizeObj.stock,
//   }));

//   // Find the selected size object to get its prices and stock
//   const selectedSizeObj = product.sizes.find((size) => size.size === selectedSize) || product.sizes[0];
//   const currentSellingPrice = selectedSizeObj ? selectedSizeObj.selling_price : product.selling_price;
//   const currentActualPrice = selectedSizeObj ? selectedSizeObj.actual_price : product.actual_price;
//   const totalSellingPrice = currentSellingPrice * (selectedQty || 1);
//   const isOutOfStock = selectedSizeObj ? selectedSizeObj.stock === 0 : true;
//   const maxQty = selectedSizeObj ? selectedSizeObj.stock : 0;

//   // Handle quantity increment
//   const handleIncrement = () => {
//     onQtyChange?.(selectedQty + 1);
//   };

//   // Handle quantity decrement
//   const handleDecrement = () => {
//     if (selectedQty > 1) {
//       onQtyChange?.(selectedQty - 1);
//     }
//   };

//   // Render the right swipe action (delete button)
//   const renderRightActions = () => (
//     <TouchableOpacity
//       style={styles.deleteButton}
//       onPress={() => onRemove?.()}
//     >
//       <Icon name="trash" size={responsiveFontSize(2.5)} color="#fff" />
//       <Text style={[commonstyles.text4, { color: "#fff" }]}>Delete</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <Swipeable
//       renderRightActions={renderRightActions}
//       overshootRight={false}
//       containerStyle={styles.swipeableContainer}
//       onSwipeableOpen={() => setIsSwiped(true)} // Set isSwiped to true when swiped
//       onSwipeableClose={() => setIsSwiped(false)} // Reset isSwiped when closed
//     >
//       <View
//         style={[
//           styles.container,
//           {
//             borderTopRightRadius: isSwiped ? 0 : 25, // Conditional top-right radius
//             borderBottomRightRadius: isSwiped ? 0 : 25, // Conditional bottom-right radius
//           },
//         ]}
//       >
//         <View style={styles.topRow}>
//           {/* Image with Out of Stock Overlay, wrapped in TouchableOpacity */}
//           <TouchableOpacity
//             style={styles.imageContainer}
//             onPress={() => onImagePress?.(product.product_id)}
//             disabled={isOutOfStock}
//           >
//             <Image
//               source={product.image}
//               style={[styles.image, isOutOfStock && styles.disabledImage]}
//               resizeMode="cover"
//             />
//             {isOutOfStock && (
//               <View style={styles.outOfStockOverlay}>
//                 <Text style={styles.outOfStockText}>Out of Stock</Text>
//               </View>
//             )}
//           </TouchableOpacity>
//           <View style={styles.content}>
//             <Text style={[commonstyles.text3, { fontSize: 14 }]}>{product.title}</Text>
//             <Text style={[commonstyles.text4]}>{product.description}</Text>

//             {/* Dropdown and Quantity Controls */}
//             <View style={[styles.dropdowns, { marginTop: responsiveHeight(1) }]}>
//               <Dropdown
//                 style={[styles.dropdown, isOutOfStock && styles.disabledDropdown]}
//                 data={sizeData.filter((size) => size.stock > 0)}
//                 labelField="label"
//                 valueField="value"
//                 value={selectedSize}
//                 onChange={(item) => onSizeChange?.(item.value, item.size_id)}
//                 placeholder="Select Size"
//                 placeholderStyle={styles.dropdownPlaceholder}
//                 selectedTextStyle={styles.dropdownText}
//                 itemTextStyle={styles.dropdownItemText}
//                 iconColor="#000"
//                 iconStyle={styles.dropdownIcon}
//                 disable={isOutOfStock}
//               />
//               <View style={styles.quantityContainer}>
//                 <TouchableOpacity
//                   style={[
//                     styles.quantityButton,
//                     styles.decrementButton,
//                     isOutOfStock || selectedQty <= 1 ? styles.disabledQuantityButton : null,
//                   ]}
//                   onPress={handleDecrement}
//                   disabled={isOutOfStock || selectedQty <= 1}
//                   activeOpacity={0.7}
//                 >
//                   <Icon
//                     name="remove"
//                     size={responsiveFontSize(2)}
//                     color={isOutOfStock || selectedQty <= 1 ? "#000" : '#000'}
//                   />
//                 </TouchableOpacity>
//                 <Text style={styles.quantityText}>{selectedQty || 1}</Text>
//                 <TouchableOpacity
//                   style={[styles.quantityButton, styles.incrementButton]}
//                   onPress={handleIncrement}
//                   activeOpacity={0.7}
//                 >
//                   <Icon
//                     name="add"
//                     size={responsiveFontSize(2)}
//                     color={isOutOfStock ? colors.grey : '#fff'}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Price below controls */}
//             <View style={[styles.priceOffer, { marginTop: responsiveHeight(1) }]}>
//               <View style={[commonstyles.row, { gap: 3 }]}>
//                 <Text style={commonstyles.text4}>₹{totalSellingPrice}</Text>
//                 {currentActualPrice !== currentSellingPrice && (
//                   <Text style={[commonstyles.text4, { textDecorationLine: 'line-through' }]}>
//                     ₹{currentActualPrice * (selectedQty || 1)}
//                   </Text>
//                 )}
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>
//     </Swipeable>
//   );
// };

// const styles = StyleSheet.create({
//   swipeableContainer: {
//     marginBottom: responsiveHeight(2),
//   },
//   container: {
//     backgroundColor: '#fff',
//     // borderWidth: 1, // Commented out as per original code
//     borderColor: '#bdbdbd',
//     borderRadius: 25,
//     padding: responsiveWidth(4),
//     elevation: 1, // Subtle shadow for Android
//     shadowColor: '#000', // Shadow for iOS
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     borderTopLeftRadius: 25, // Explicitly set for clarity
//     borderBottomLeftRadius: 25, // Explicitly set for clarity
//   },
//   topRow: {
//     flexDirection: 'row',
//     marginBottom: responsiveHeight(1),
//   },
//   imageContainer: {
//     position: 'relative',
//     width: responsiveWidth(25),
//     height: responsiveHeight(15),
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 8,
//   },
//   disabledImage: {
//     opacity: 0.5,
//   },
//   outOfStockOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 2,
//   },
//   outOfStockText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: responsiveFontSize(1.5),
//     backgroundColor: '#ff0000',
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 4,
//   },
//   content: {
//     flex: 1,
//     paddingLeft: responsiveWidth(3),
//     position: 'relative',
//     flexDirection: 'column',
//     gap: 4,
//   },
//   dropdowns: {
//     flexDirection: 'row',
//     gap: responsiveWidth(2),
//     alignItems: 'center',
//   },
//   dropdown: {
//     width: responsiveWidth(22),
//     height: responsiveHeight(4),
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     borderWidth: 0.5,
//     borderColor: '#bdbdbd',
//     paddingHorizontal: responsiveWidth(1.5),
//   },
//   disabledDropdown: {
//     opacity: 0.5,
//     backgroundColor: '#f5f5f5',
//   },
//   dropdownText: {
//     fontSize: responsiveFontSize(1.5),
//     color: '#000',
//   },
//   dropdownPlaceholder: {
//     fontSize: responsiveFontSize(1.5),
//     color: '#666',
//   },
//   dropdownItemText: {
//     fontSize: responsiveFontSize(1.5),
//     color: '#000',
//   },
//   dropdownIcon: {
//     marginRight: responsiveWidth(1),
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 0.5,
//     borderColor: '#bdbdbd',
//     borderRadius: 10,
//     height: responsiveHeight(4),
//     width: responsiveWidth(22),
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     padding: '2%',
//   },
//   quantityButton: {
//     width: responsiveWidth(6),
//     height: responsiveWidth(6),
//     borderRadius: responsiveWidth(3),
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 0.5,
//     borderColor: '#bdbdbd',
//   },
//   incrementButton: {
//     backgroundColor: '#262757',
//   },
//   decrementButton: {
//     backgroundColor: colors.grey || '#999',
//   },
//   disabledQuantityButton: {
//     backgroundColor: '#f5f5f5',
//     borderColor: '#999',
//     opacity: 0.5,
//   },
//   quantityText: {
//     fontSize: responsiveFontSize(1.5),
//     color: '#000',
//     textAlign: 'center',
//     flex: 1,
//   },
//   priceOffer: {
//     alignItems: 'flex-end',
//     flexShrink: 1,
//   },
//   deleteButton: {
//     backgroundColor: '#ce2029',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: responsiveWidth(20),
//     borderRadius: 25,
//     flexDirection: 'row',
//     borderTopLeftRadius: 0, // Align with container when swiped
//     borderBottomLeftRadius: 0, // Align with container when swiped
//   },
//   deleteText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: responsiveFontSize(1.8),
//     marginLeft: responsiveWidth(1),
//   },
// });

// export default ProductCartCard;
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import commonstyles from '../commonstyles/commonstyles';
import { colors } from '../config/theme';

const ProductCartCard = ({
  product,
  onRemove,
  selectedSize,
  selectedQty,
  onSizeChange,
  onQtyChange,
  onImagePress,
}) => {
  const [isSwiped, setIsSwiped] = useState(false);

  // Map sizes from product.sizes and filter for stock > 0
  const sizeData = (product.sizes || []).map((sizeObj) => ({
    label: `Size: ${sizeObj.size}`,
    value: sizeObj.size,
    size_id: sizeObj.size_id,
    actual_price: sizeObj.actual_price,
    selling_price: sizeObj.selling_price,
    stock: sizeObj.stock,
  }));

  // Filter sizes with stock > 0 for the dropdown
  const availableSizes = sizeData.filter((size) => size.stock > 0);

  // Find the selected size object to get its prices and stock
  const selectedSizeObj = product.sizes.find((size) => size.size === selectedSize) || product.sizes[0];
  const currentSellingPrice = selectedSizeObj ? selectedSizeObj.selling_price : product.selling_price;
  const currentActualPrice = selectedSizeObj ? selectedSizeObj.actual_price : product.actual_price;
  const totalSellingPrice = currentSellingPrice * (selectedQty || 1);
  const isOutOfStock = selectedSizeObj ? selectedSizeObj.stock === 0 : true;
  const maxQty = selectedSizeObj ? selectedSizeObj.stock : 0;

  // State to manage the current selected size
  const [currentSize, setCurrentSize] = useState(selectedSize);

  // Automatically select an available size if the current size is out of stock
  useEffect(() => {
    if (selectedSizeObj && selectedSizeObj.stock <= 0 && availableSizes.length > 0) {
      const newSize = availableSizes[0].value;
      const newSizeId = availableSizes[0].size_id;
      setCurrentSize(newSize);
      onSizeChange?.(newSize, newSizeId);
    } else if (selectedSizeObj) {
      setCurrentSize(selectedSize);
    }
  }, [selectedSize, selectedSizeObj, availableSizes, onSizeChange]);

  // Handle quantity increment
  const handleIncrement = () => {
    if (isOutOfStock) return; // Prevent increment if out of stock
    if (selectedQty < maxQty) {
      onQtyChange?.(selectedQty + 1);
    }
  };

  // Handle quantity decrement
  const handleDecrement = () => {
    if (isOutOfStock) return; // Prevent decrement if out of stock
    if (selectedQty > 1) {
      onQtyChange?.(selectedQty - 1);
    }
  };

  // Render the right swipe action (delete button)
  const renderRightActions = () => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => onRemove?.()}
    >
      <Icon name="trash" size={responsiveFontSize(2.5)} color="#fff" />
      <Text style={[commonstyles.text4, { color: '#fff' }]}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      overshootRight={false}
      containerStyle={styles.swipeableContainer}
      onSwipeableOpen={() => setIsSwiped(true)}
      onSwipeableClose={() => setIsSwiped(false)}
    >
      <View
        style={[
          styles.container,
          {
            borderTopRightRadius: isSwiped ? 0 : 25,
            borderBottomRightRadius: isSwiped ? 0 : 25,
          },
        ]}
      >
        <View style={styles.topRow}>
          {/* Image with Out of Stock Overlay, wrapped in TouchableOpacity */}
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => onImagePress?.(product.product_id)}
            disabled={isOutOfStock}
          >
            <Image
              source={product.image}
              style={[styles.image, isOutOfStock && styles.disabledImage]}
              resizeMode="cover"
            />
            {isOutOfStock && (
              <View style={styles.outOfStockOverlay}>
                <Text style={styles.outOfStockText}>Out of Stock</Text>
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.content}>
            <Text style={[commonstyles.text3, { fontSize: 14 }]}>{product.title}</Text>
            <Text style={[commonstyles.text4]}>{product.description}</Text>

            {/* Dropdown and Quantity Controls */}
            <View style={[styles.dropdowns, { marginTop: responsiveHeight(1) }]}>
              {availableSizes.length > 0 ? (
                <Dropdown
                  style={[styles.dropdown, isOutOfStock && styles.disabledDropdown]}
                  data={availableSizes}
                  labelField="label"
                  valueField="value"
                  value={currentSize}
                  onChange={(item) => {
                    setCurrentSize(item.value);
                    onSizeChange?.(item.value, item.size_id);
                  }}
                  placeholder="Select Size"
                  placeholderStyle={styles.dropdownPlaceholder}
                  selectedTextStyle={styles.dropdownText}
                  itemTextStyle={styles.dropdownItemText}
                  iconColor="#000"
                  iconStyle={styles.dropdownIcon}
                  disable={isOutOfStock || availableSizes.length === 0}
                />
              ) : (
                <Text style={[commonstyles.text4, { color: 'red' }]}>No sizes available</Text>
              )}
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={[
                    styles.quantityButton,
                    styles.decrementButton,
                    isOutOfStock || selectedQty <= 1 ? styles.disabledQuantityButton : null,
                  ]}
                  onPress={handleDecrement}
                  disabled={isOutOfStock || selectedQty <= 1}
                  activeOpacity={0.7}
                >
                  <Icon
                    name="remove"
                    size={responsiveFontSize(2)}
                    color={isOutOfStock || selectedQty <= 1 ? '#999' : '#000'}
                  />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{selectedQty || 1}</Text>
                <TouchableOpacity
                  style={[
                    styles.quantityButton,
                    styles.incrementButton,
                    isOutOfStock || selectedQty >= maxQty ? styles.disabledQuantityButton : null,
                  ]}
                  onPress={handleIncrement}
                  disabled={isOutOfStock || selectedQty >= maxQty}
                  activeOpacity={0.7}
                >
                  <Icon
                    name="add"
                    size={responsiveFontSize(2)}
                    color={isOutOfStock || selectedQty >= maxQty ? '#999' : '#fff'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Price below controls */}
            <View style={[styles.priceOffer, { marginTop: responsiveHeight(1) }]}>
              <View style={[commonstyles.row, { gap: 3 }]}>
                <Text style={commonstyles.text4}>₹{totalSellingPrice}</Text>
                {currentActualPrice !== currentSellingPrice && (
                  <Text style={[commonstyles.text4, { textDecorationLine: 'line-through' }]}>
                    ₹{currentActualPrice * (selectedQty || 1)}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  swipeableContainer: {
    marginBottom: responsiveHeight(2),
  },
  container: {
    backgroundColor: '#fff',
    borderColor: '#bdbdbd',
    borderRadius: 25,
    padding: responsiveWidth(4),
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: responsiveHeight(1),
  },
  imageContainer: {
    position: 'relative',
    width: responsiveWidth(25),
    height: responsiveHeight(15),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  disabledImage: {
    opacity: 0.5,
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  outOfStockText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.5),
    backgroundColor: '#ff0000',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    paddingLeft: responsiveWidth(3),
    position: 'relative',
    flexDirection: 'column',
    gap: 4,
  },
  dropdowns: {
    flexDirection: 'row',
    gap: responsiveWidth(2),
    alignItems: 'center',
  },
  dropdown: {
    width: responsiveWidth(22),
    height: responsiveHeight(4),
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#bdbdbd',
    paddingHorizontal: responsiveWidth(1.5),
  },
  disabledDropdown: {
    opacity: 0.5,
    backgroundColor: '#f5f5f5',
  },
  dropdownText: {
    fontSize: responsiveFontSize(1.5),
    color: '#000',
  },
  dropdownPlaceholder: {
    fontSize: responsiveFontSize(1.5),
    color: '#666',
  },
  dropdownItemText: {
    fontSize: responsiveFontSize(1.5),
    color: '#000',
  },
  dropdownIcon: {
    marginRight: responsiveWidth(1),
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#bdbdbd',
    borderRadius: 10,
    height: responsiveHeight(4),
    width: responsiveWidth(22),
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: '2%',
  },
  quantityButton: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    borderRadius: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#bdbdbd',
  },
  incrementButton: {
    backgroundColor: '#262757',
  },
  decrementButton: {
    backgroundColor: colors.grey || '#999',
  },
  disabledQuantityButton: {
    backgroundColor: '#f5f5f5',
    borderColor: '#999',
    opacity: 0.5,
  },
  quantityText: {
    fontSize: responsiveFontSize(1.5),
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  priceOffer: {
    alignItems: 'flex-end',
    flexShrink: 1,
  },
  deleteButton: {
    backgroundColor: '#ce2029',
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(20),
    borderRadius: 25,
    flexDirection: 'row',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});

export default ProductCartCard;