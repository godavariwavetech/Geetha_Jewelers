import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {height, width} = Dimensions.get('window');

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const IndividualShop = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Coffees');
  const [expandedItemId, setExpandedItemId] = useState(null);

  const data = {
    Coffees: [
      {id: 1, title: 'Cappuccino King', price: '₹441.00', desc: 'A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85 ml of fresh milk. It has a perfect blend of froth and aroma.', calories: '392Kcal', size: 'TALL(354 ML)'},
      {id: 2, title: 'Espresso Shot', price: '₹381.00', desc: 'Strong and bold espresso shot for coffee lovers seeking pure caffeine delight.', calories: '95Kcal', size: 'SINGLE(35 ML)'},
      {id: 3, title: 'Latte Love', price: '₹399.00', desc: 'Smooth, creamy latte with steamed milk and rich espresso base for a perfect balance.', calories: '225Kcal', size: 'REGULAR(240 ML)'},
    ],
    Milkshakes: [
      {id: 1, title: 'Chocolate Shake', price: '₹299.00', desc: 'Rich chocolate milkshake made from real cocoa and creamy milk.', calories: '416Kcal', size: 'TALL(354 ML)'},
      {id: 2, title: 'Strawberry Shake', price: '₹289.00', desc: 'Fruity and fresh strawberry milkshake with a sweet summer vibe.', calories: '380Kcal', size: 'TALL(354 ML)'},
      {id: 3, title: 'Vanilla Shake', price: '₹279.00', desc: 'Classic vanilla flavor with rich texture and creamy smoothness.', calories: '352Kcal', size: 'TALL(354 ML)'},
    ],
    Juices: [
      {id: 1, title: 'Orange Fresh', price: '₹199.00', desc: 'Freshly squeezed orange juice loaded with Vitamin C and natural sweetness.', calories: '110Kcal', size: 'TALL(354 ML)'},
      {id: 2, title: 'Watermelon Juice', price: '₹189.00', desc: 'Refreshing watermelon juice, hydrating and cool for sunny days.', calories: '85Kcal', size: 'TALL(354 ML)'},
      {id: 3, title: 'Pineapple Twist', price: '₹209.00', desc: 'Tropical pineapple juice with a mild tangy-sweet twist.', calories: '132Kcal', size: 'TALL(354 ML)'},
    ],
  };

  const items = data[activeTab];

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  return (
    <View style={[styles.container,{paddingBottom:insets.bottom}]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ImageBackground
        source={require('../assets/coffee.jpeg')}
        style={styles.topImage}
        resizeMode="cover">
        <View style={styles.overlay} />
        <View style={[styles.header, {marginTop: insets.top + 10}]}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <Icon name="chevron-back" size={26} color="#fff" />
              <Text style={styles.headerText}>SOWBHAGYA TOWER JN Road</Text>
              <Icon name="chevron-down" size={18} color="#fff" style={{marginLeft: 4}} />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.bottomCard}>
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={20} color="#aaa" style={{marginRight: 8}} />
          <TextInput
            placeholder="Search here for your favourites"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.tabContainer}>
          {[
            {label: 'Coffees', icon: 'coffee-outline'},
            {label: 'Milkshakes', icon: 'cupcake'},
            {label: 'Juices', icon: 'cup-water'},
          ].map(tab => (
            <TouchableOpacity
              key={tab.label}
              style={[styles.tabButton, activeTab === tab.label && styles.activeTab]}
              onPress={() => setActiveTab(tab.label)}>
              <MaterialCommunityIcons
                name={tab.icon}
                size={16}
                color={activeTab === tab.label ? '#fff' : '#4b1e1e'}
                style={{marginRight: 5}}
              />
              <Text
                style={[
                  styles.tabText,
                  {color: activeTab === tab.label ? '#fff' : '#4b1e1e'},
                ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {items.map(item => (
            <View key={item.id}>
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.7}
                onPress={() => toggleExpand(item.id)}>
                <Image
                  source={require('../assets/coffee.jpeg')}
                  style={styles.image}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.subtitle}>{item.size} - {item.calories}</Text>
                  <Text style={styles.desc} numberOfLines={2}>
                    {item.desc}
                  </Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>{item.price}</Text>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => navigation.navigate("Cart")}>
                      <MaterialCommunityIcons
                        name="plus"
                        size={14}
                        color="#fff"
                        style={{marginRight: 5}}
                      />
                      <Text style={styles.addButtonText}>Add Item</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>

              {expandedItemId === item.id && (
                <View style={styles.expandedCard}>
                  <Image
                    source={require('../assets/coffee.jpeg')}
                    style={styles.expandedImage}
                  />
                  <Text style={styles.expandedTitle}>{item.title}</Text>
                  <Text style={styles.expandedSubtitle}>{item.size} - {item.calories}</Text>
                  <Text style={styles.expandedDesc}>{item.desc}</Text>
                  <Text style={styles.expandedPrice}>Price: {item.price}</Text>

                  <TouchableOpacity style={styles.cartButton} onPress={()=>{navigation.navigate("Cart")}} >
                    <MaterialCommunityIcons name="cart-outline" size={18} color="#fff" style={{marginRight: 6}} />
                    <Text style={styles.cartButtonText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  topImage: {
    width: width,
    height: height * 0.25,
    justifyContent: 'space-between',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  bottomCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 12,
    height: 40,
  },
  searchInput: {flex: 1, fontSize: 14, color: '#000'},
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 2,
    marginRight: 8,
  },
  activeTab: {backgroundColor: '#4b1e1e'},
  tabText: {fontSize: 14, fontWeight: '500'},
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  image: {width: 104, height: 128, borderRadius: 28},
  cardContent: {flex: 1, marginLeft: 12},
  title: {fontSize: 18, fontWeight: '700', color: '#000'},
  subtitle: {fontSize: 16, color: '#555', marginVertical: 2},
  desc: {fontSize: 14, color: '#777',marginBottom:10},
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  price: {fontSize: 15, fontWeight: '600', color: '#000'},
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4b1e1e',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonText: {color: '#fff', fontSize: 12, fontWeight: '600'},

  // Expanded Card
  expandedCard: {
    backgroundColor: '#faf8f7',
    marginHorizontal: 18,
    marginBottom: 14,
    borderRadius: 12,
    padding: 14,
    elevation: 1,
  },
  expandedImage: {width: '100%', height: 160, borderRadius: 10, marginBottom: 10},
  expandedTitle: {fontSize: 17, fontWeight: '700', color: '#000'},
  expandedSubtitle: {fontSize: 13, color: '#666', marginVertical: 4},
  expandedDesc: {fontSize: 13, color: '#444', marginBottom: 8},
  expandedPrice: {fontSize: 15, fontWeight: '600', color: '#4b1e1e', marginBottom: 10},
  cartButton: {
    flexDirection: 'row',
    backgroundColor: '#4b1e1e',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 6,
  },
  cartButtonText: {color: '#fff', fontWeight: '600', fontSize: 13},
});

export default IndividualShop;