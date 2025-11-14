import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const GeetaGoldScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const metalCategories = [
    {
      id: '1',
      name: 'Gold',
      image: require('../assets/haaram.png'),
    },
    {
      id: '2',
      name: 'Silver',
      image: require('../assets/diamondearring.png'),
    },
    {
      id: '3',
      name: 'Platinum',
      image: require('../assets/diamondring.png'),
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      activeOpacity={0.8}
    onPress={() =>
  navigation.navigate('PdfViewerScreen', {
    pdfUrl: 'https://www.grtjewels.com/asia/wp-content/uploads/2016/06/singapore-catalogue.pdf?srsltid=AfmBOoriCd5awVMLcG7DrMxsJldvjN4H1w4FQhgXJZeyMse49yY4To1P',
  })
}
    >
      <Image source={item.image} style={styles.categoryImage} />
      <View style={styles.categoryTextContainer}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.subText}>Explore exquisite {item.name} jewelry</Text>
      </View>
      <Icon name="chevron-forward" size={22} color="#9C9C9C" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safeArea, {  }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Geeta Gold</Text>
        <View style={{ width: 22 }} /> {/* Spacer for layout balance */}
      </View>

      {/* Category List */}
      <FlatList
        data={metalCategories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* WhatsApp Floating Button */}
      {/* <TouchableOpacity style={styles.whatsappButton} activeOpacity={0.8}>
        <Icon name="logo-whatsapp" size={26} color="#fff" />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default GeetaGoldScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 14,
    // borderBottomWidth: 0.6,
    // borderBottomColor: '#E5E5E5',
    // elevation: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  listContainer: {
    paddingVertical: 10,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 14,
    borderRadius: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 14,
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  subText: {
    fontSize: 13,
    color: '#707070',
    marginTop: 3,
  },
  whatsappButton: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
});
