import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
  Dimensions
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const CategoryNavigationScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [expandedCategory, setExpandedCategory] = useState('Gold');
  const [selectedChipIndex, setSelectedChipIndex] = useState(0);

  const filterChips = ['All Jewellery', 'Earrings', 'Rings', 'Daily wear'];

  const categories = [
    {
      id: 'gold',
      name: 'Gold',
      color: '#FFD700',
      image: require('../assets/mangalsutra.png'),
      isExpanded: true,
      subcategories: [
        { id: '1', name: 'Necklace', icon: require('../assets/earrings.png') },
        { id: '2', name: 'Mangalsutra', icon: require('../assets/mangalsutra.png') },
        { id: '3', name: 'Earrings', icon: require('../assets/earrings.png') },
        { id: '4', name: 'Bangles', icon: require('../assets/mangalsutra.png') },
        { id: '5', name: 'Rings', icon: require('../assets/earrings.png') },
        { id: '6', name: 'Bracelets', icon: require('../assets/mangalsutra.png') },
        { id: '7', name: 'Anklets', icon: require('../assets/earrings.png') },
        { id: '8', name: 'Chains', icon: require('../assets/mangalsutra.png') },
      ]
    },
    {
      id: 'silver',
      name: 'Silver',
      color: '#C0C0C0',
      image: require('../assets/earrings.png'),
      isExpanded: false,
      subcategories: []
    },
    {
      id: 'platinum',
      name: 'Platinum',
      color: '#E5E4E2',
      image: require('../assets/mangalsutra.png'),
      isExpanded: false,
      subcategories: []
    }
  ];

  const toggleCategory = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };

  const handleSubcategoryPress = (subcategory) => {
    navigation.navigate('IndividualCategory', { category: subcategory.name });
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#000" />
        </TouchableOpacity> */}
        
        <Image 
          source={require('../assets/geethalogo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={()=>{navigation.navigate("WishList")}}>
            <Ionicons name="heart-outline" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={()=>{navigation.navigate("Cart")}}>
            <Ionicons name="cart-outline" size={22} color="#000" />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="person-outline" size={22} color="#000" />
          </TouchableOpacity> */}
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" />
        <TextInput
          placeholder="Search here Your favourite Jewellery"
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
        {/* <TouchableOpacity>
          <Ionicons name="scan-outline" size={20} color="#08765A" />
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.filterIconButton}>
          <Ionicons name="home-outline" size={20} color="#08765A" />
        </TouchableOpacity> */}
      </View>

      {/* Filter Chips */}
      <View>    <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterChipsContainer}
      >
        {filterChips.map((chip, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.filterChip,
              selectedChipIndex === index && styles.filterChipActive
            ]}
            onPress={() => setSelectedChipIndex(index)}
          >
            <Text style={[
              styles.filterChipText,
              selectedChipIndex === index && styles.filterChipTextActive
            ]}>
              {chip}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView></View>
  

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 } // Increased padding to account for tab navigator height + insets
        ]}
      >
        {/* Category Cards */}
        {categories.map((category, index) => (
          <View key={category.id} style={styles.categoryCard}>
            {/* Category Header */}
            <TouchableOpacity 
              style={styles.categoryHeader}
              onPress={() => toggleCategory(category.id)}
            >
              <View style={styles.categoryImageContainer}>
                <Image 
                  source={category.image} 
                  style={styles.categoryImage}
                  resizeMode="contain"
                />
              </View>
              
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Ionicons 
                  name={expandedCategory === category.id ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#000" 
                />
              </View>
            </TouchableOpacity>

            {/* Subcategories - Expandable */}
            {expandedCategory === category.id && category.subcategories.length > 0 && (
              <View style={styles.subcategoriesContainer}>
                {category.subcategories.map((subcategory, subIndex) => (
                  <TouchableOpacity 
                    key={subcategory.id}
                    style={styles.subcategoryItem}
                    onPress={() => handleSubcategoryPress(subcategory)}
                  >
                    <View style={styles.subcategoryIcon}>
                      <Image 
                        source={subcategory.icon} 
                        style={styles.subcategoryIconImage}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.subcategoryName}>{subcategory.name}</Text>
                    <Ionicons name="chevron-forward" size={18} color="#999" />
                  </TouchableOpacity>
                ))}
                
                {/* See All Button */}
                <TouchableOpacity style={styles.seeAllButton}>
                  <Text style={styles.seeAllText}>See all</Text>
                  <Ionicons name="chevron-forward" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuButton: {
    padding: 4,
  },
  logo: {
    height: 40,
    width: 120,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 45,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
  },
  filterIconButton: {
    marginLeft: 8,
  },
  filterChipsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#004830',
    borderColor: '#004830',
  },
  filterChipText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  categoryImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFF5E6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 12,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  subcategoriesContainer: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  subcategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  subcategoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFF5E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    padding: 4,
  },
  subcategoryIconImage: {
    width: '100%',
    height: '100%',
  },
  subcategoryName: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#004830',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
    gap: 6,
  },
  seeAllText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default CategoryNavigationScreen;