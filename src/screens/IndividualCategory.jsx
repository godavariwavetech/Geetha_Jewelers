import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Modal,StatusBar
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;

const products = [
  { id: '1', image: require('../assets/earrings.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', rating: 4.5 },
  { id: '2', image: require('../assets/mangalsutra.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', rating: 4.5 },
  { id: '3', image: require('../assets/haaram.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', rating: 4.5 },
  { id: '4', image: require('../assets/earrings.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', rating: 4.5 },
  { id: '5', image: require('../assets/mangalsutra.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', rating: 4.5 },
  { id: '6', image: require('../assets/haaram.png'), name: 'Arch of Royalty Gold Finger Ring', price: '₹37,869', rating: 4.5 },
];

const IndividualCategory = () => {
  const insets = useSafeAreaInsets();
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetailsScreen', { product });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 1; i <= fullStars; i++) {
      stars.push(<Ionicons key={`full-${i}`} name="star" size={14} color="#FFD700" />);
    }
    if (hasHalf) {
      stars.push(<Ionicons key="half" name="star-half" size={14} color="#FFD700" />);
    }
    const remaining = 5 - fullStars - (hasHalf ? 1 : 0);
    for (let i = 1; i <= remaining; i++) {
      stars.push(<Ionicons key={`outline-${i}`} name="star-outline" size={14} color="#FFD700" />);
    }

    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleProductPress(item)} activeOpacity={0.7}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
      {renderStars(item.rating)}
      <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("Cart")}} >
        <Text style={styles.buttonText}>ADD TO CART</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
       <StatusBar
        backgroundColor="#FFFFFF" // white background
        barStyle="dark-content"   // dark text & icons
      />
      {/* Search Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#555" />
          <TextInput
            placeholder="Search here Your favourite Jewellery"
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
          <Ionicons name="filter-outline" size={20} color="#555" />
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        <Text style={styles.filterTitle}>Rings</Text>
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setSortModalVisible(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.filterText}>Sort by</Text>
            <Ionicons name="chevron-down" size={16} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setGenderModalVisible(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.filterText}>Women</Text>
            <Ionicons name="chevron-down" size={16} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Grid */}
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Sort Modal */}
      <Modal
        visible={sortModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setSortModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Sort by</Text>
            <TouchableOpacity style={styles.modalOption}><Text>Popular</Text></TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}><Text>Price: Low to High</Text></TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}><Text>Price: High to Low</Text></TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}><Text>Newest</Text></TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setSortModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Gender Modal */}
      <Modal
        visible={genderModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setGenderModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Gender</Text>
            <TouchableOpacity style={styles.modalOption}><Text>Women</Text></TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}><Text>Men</Text></TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}><Text>Unisex</Text></TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}><Text>Kids</Text></TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setGenderModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  header: { paddingTop: 8, paddingBottom: 12 },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#f6f6f6', borderRadius: 10,
    paddingHorizontal: 12, height: 45,
  },
  searchInput: { flex: 1, marginHorizontal: 8, fontSize: 14,color:"#000" },
  filterRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginVertical: 12,
  },
  filterTitle: { fontSize: 18, fontWeight: '600' },
  filterButtons: { flexDirection: 'row', gap: 8 },
  filterButton: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 4,
  },
  filterText: { fontSize: 14, color: '#333', marginRight: 4 },
  row: { justifyContent: 'space-between' },
  card: {
    backgroundColor: '#fff', borderRadius: 12,
    borderWidth: 1, borderColor: '#eee',
    padding: 12, marginBottom: 16, width: ITEM_WIDTH,
  },
  image: { width: '100%', height: 100 },
  title: { fontSize: 13, fontWeight: '500', marginTop: 8, color: '#222' },
  price: { color: '#08765A', fontWeight: '600', marginTop: 4 },
  starsContainer: { flexDirection: 'row', marginTop: 4, marginBottom: 4 },
  button: { backgroundColor: '#08765A', borderRadius: 8, marginTop: 8, paddingVertical: 6 },
  buttonText: { textAlign: 'center', color: '#fff', fontWeight: '500', fontSize: 12 },

  // Modal Styles
  modalOverlay: {
    flex: 1, justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalCloseButton: {
    backgroundColor: '#08765A',
    borderRadius: 8,
    marginTop: 16,
    paddingVertical: 10,
  },
  modalCloseText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});

export default IndividualCategory;