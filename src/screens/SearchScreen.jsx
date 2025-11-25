// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   ActivityIndicator,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector, useDispatch } from 'react-redux';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import { fetchGlobalSearch, clearSearchSuggestions } from '../redux/slices/categorySlice';
// import commonstyles from '../commonstyles/commonstyles';
// import debounce from 'lodash.debounce';

// const SearchScreen = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const { customerId } = useSelector((state) => state.Auth || {});
//   const { searchSuggestions, searchLoading, searchError } = useSelector((state) => state.category || {});
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSearching, setIsSearching] = useState(false);

//   // Fetch suggestions when query is 3 or more characters
//   const fetchSuggestions = useCallback(
//     debounce((query) => {
//       if (query.length >= 3) {
//         dispatch(fetchGlobalSearch(query));
//       } else {
//         dispatch(clearSearchSuggestions());
//       }
//       setIsSearching(false);
//     }, 500),
//     [dispatch]
//   );

//   useEffect(() => {
//     if (searchQuery.trim()) {
//       setIsSearching(true);
//       fetchSuggestions(searchQuery);
//     } else {
//       dispatch(clearSearchSuggestions());
//       setIsSearching(false);
//     }
//   }, [searchQuery, fetchSuggestions]);

//   // Handle suggestion selection based on search_tagline
//   const handleSuggestionPress = (item) => {
//     setSearchQuery(item.search_text);
//     dispatch(clearSearchSuggestions());

//     if (item.search_tagline === 'product') {
//       navigation.navigate('ProductDetailsScreen', {
//         user_id: customerId,
//         product_id: item.id,
//       });
//     } else if (item.search_tagline === 'Category') {
//       navigation.navigate('IndividualCategory', {
//         categoryId: item.id,
//         userId: customerId,
//         subcategory: { name: item.search_text, products: [] },
//       });
//     } else if (item.search_tagline === 'Sub Category') {
//       navigation.navigate('IndividualCategory', {
//         subcategoryId: item.id,
//         userId: customerId,
//         subcategory: { id: item.id, name: item.search_text, products: [] },
//       });
//     } else if (item.search_tagline === 'brand') {
//       navigation.navigate('IndividualCategory', {
//         brandId: item.id,
//         userId: customerId,
//         brand: { id: item.id, name: item.search_text, products: [] },
//       });
//     }
//   };

//   // Handle search submission
//   const handleSearchSubmit = () => {
//     if (searchQuery.trim().length >= 3) {
//       if (searchSuggestions.length > 0) {
//         handleSuggestionPress(searchSuggestions[0]);
//       } else {
//         navigation.navigate('IndividualCategory', {
//           searchQuery: searchQuery,
//           userId: customerId,
//         });
//       }
//     }
//   };

//   const renderSuggestion = ({ item }) => (
//     <TouchableOpacity
//       style={styles.suggestionItem}
//       onPress={() => handleSuggestionPress(item)}
//       activeOpacity={0.7}
//     >
//       <Text style={styles.suggestionText}>
//         {item.search_text} ({item.search_tagline})
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
//       <LinearGradient
//         colors={['#5E61EB', '#262757']}
//         style={[styles.header, { paddingTop: insets.top + 15 }]}
//       >
//         <View style={styles.searchContainer}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={24} color="#000" style={styles.backIcon} />
//           </TouchableOpacity>
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search for products, categories, brands..."
//             placeholderTextColor="#888"
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             autoFocus={true}
//             returnKeyType="search"
//             onSubmitEditing={handleSearchSubmit}
//           />
//           {searchQuery.length > 0 && (
//             <TouchableOpacity onPress={() => setSearchQuery('')}>
//               <Ionicons name="close-circle" size={20} color="#888" style={styles.clearIcon} />
//             </TouchableOpacity>
//           )}
//         </View>
//       </LinearGradient>

//       <View style={styles.content}>
//         {isSearching || searchLoading ? (
//           <ActivityIndicator size="small" color="#5E61EB" style={styles.loader} />
//         ) : searchError ? (
//           <Text style={styles.errorText}>{searchError}</Text>
//         ) : searchSuggestions.length > 0 ? (
//           <FlatList
//             data={searchSuggestions}
//             renderItem={renderSuggestion}
//             keyExtractor={(item) => `${item.id}-${item.search_type}`}
//             style={styles.suggestionsList}
//             keyboardShouldPersistTaps="handled"
//           />
//         ) : searchQuery.length >= 3 ? (
//           <Text style={styles.noResultsText}>No results found</Text>
//         ) : null}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     paddingHorizontal: 15,
//     paddingBottom: 15,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFF',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 2,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   backIcon: {
//     marginRight: 10,
//   },
//   searchInput: {
//     // flex: 1,
//     fontSize: 16,
//     color: '#000',
//     fontFamily:"SF-Pro-Display-Medium"
//   },
//   clearIcon: {
//     marginLeft: 10,
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 15,
//     paddingTop: 10,
//   },
//   suggestionsList: {
//     flex: 1,
//   },
//   suggestionItem: {
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEE',
//   },
//   suggestionText: {
//     fontSize: 16,
//     color: '#333',
//     ...commonstyles.text4,
//   },
//   loader: {
//     marginVertical: 20,
//   },
//   errorText: {
//     color: 'red',
//     textAlign: 'center',
//     marginVertical: 20,
//     ...commonstyles.text4,
//   },
//   noResultsText: {
//     textAlign: 'center',
//     color: '#888',
//     marginVertical: 20,
//     ...commonstyles.text4,
//   },
// });

// export default SearchScreen;
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchGlobalSearch, clearSearchSuggestions } from '../redux/slices/categorySlice';
import commonstyles from '../commonstyles/commonstyles';
import debounce from 'lodash.debounce';
const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { customerId } = useSelector((state) => state.Auth || {});
  const { searchSuggestions, searchLoading, searchError } = useSelector((state) => state.category || {});
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  // Load search history from AsyncStorage when component mounts
  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const history = await AsyncStorage.getItem('searchHistory');
        if (history) {
          setSearchHistory(JSON.parse(history));
        }
      } catch (error) {
        console.error('Failed to load search history:', error);
      }
    };
    loadSearchHistory();
  }, []);
  // Save search query to history
  const saveSearchHistory = useCallback(
    async (query) => {
      try {
        const trimmedQuery = query.trim();
        if (!trimmedQuery || trimmedQuery.length < 3) return;

        // Load existing history
        const existingHistory = await AsyncStorage.getItem('searchHistory');
        let history = existingHistory ? JSON.parse(existingHistory) : [];

        // Remove duplicate and add new query at the start (limit to 10 items)
        history = [trimmedQuery, ...history.filter((item) => item !== trimmedQuery)].slice(0, 10);
        setSearchHistory(history);
        await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
      } catch (error) {
        console.error('Failed to save search history:', error);
      }
    },
    []
  );
  // Clear search history
  const clearSearchHistory = useCallback(async () => {
    try {
      setSearchHistory([]);
      await AsyncStorage.removeItem('searchHistory');
    } catch (error) {
      console.error('Failed to clear search history:', error);
    }
  }, []);

  // Fetch suggestions when query is 3 or more characters
  const fetchSuggestions = useCallback(
    debounce((query) => {
      console.log('Debounced fetchSuggestions called with query:', query);
      if (query.length >= 3) {
        dispatch(fetchGlobalSearch(query));
      } else {
        dispatch(clearSearchSuggestions());
      }
      setIsSearching(false);
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    console.log('Search query changed:', searchQuery);
    if (searchQuery.trim().length >= 3) {
      setIsSearching(true);
      fetchSuggestions(searchQuery);
    } else {
      dispatch(clearSearchSuggestions());
      setIsSearching(false);
    }
  }, [searchQuery, fetchSuggestions]);

  // Log suggestions when they update
  useEffect(() => {
    console.log('searchSuggestions updated:', searchSuggestions);
  }, [searchSuggestions]);

  // Handle suggestion or history selection
  const handleSuggestionPress = (item) => {
    console.log('Suggestion selected:', item);
    const query = item.search_text || item; // Use search_text for suggestions, item for history
    setSearchQuery(query);
    saveSearchHistory(query);
    dispatch(clearSearchSuggestions());
    if (item.search_text) {
      // Handle suggestion
      if (item.search_tagline === 'product') {
        navigation.navigate('ProductDetailsScreen', {
          user_id: customerId,
          product_id: item.id,
        });
      } else if (item.search_tagline === 'Category') {
        navigation.navigate('IndividualCategory', {
          categoryId: item.id,
          userId: customerId,
          subcategory: { name: item.search_text, products: [] },
        });
      } else if (item.search_tagline === 'Sub Category') {
        navigation.navigate('IndividualCategory', {
          subcategoryId: item.id,
          userId: customerId,
          subcategory: { id: item.id, name: item.search_text, products: [] },
        });
      } else if (item.search_tagline === 'brand') {
        navigation.navigate('IndividualCategory', {
          brandId: item.id,
          userId: customerId,
          brand: { id: item.id, name: item.search_text, products: [] },
        });
      }
    } else {
      // Handle history item: refetch suggestions
      setIsSearching(true);
      fetchSuggestions(query);
    }
  };
  // Handle search submission
  const handleSearchSubmit = () => {
    console.log('Search submitted with query:', searchQuery);
    if (searchQuery.trim().length >= 3) {
      saveSearchHistory(searchQuery);
      if (searchSuggestions.length > 0) {
        handleSuggestionPress(searchSuggestions[0]);
      } else {
        navigation.navigate('IndividualCategory', {
          searchQuery: searchQuery,
          userId: customerId,
        });
      }
    }
  };
  const renderSuggestion = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleSuggestionPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.suggestionContent}>
        <Ionicons name="search-outline" size={20} color="#333" style={styles.suggestionIcon} />
        <Text style={styles.suggestionText}>{item.search_text}</Text>
      </View>
    </TouchableOpacity>
  );
  const renderHistoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleSuggestionPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.suggestionContent}>
        <Ionicons name="search-outline" size={20} color="#333" style={styles.suggestionIcon} />
        <Text style={styles.suggestionText}>{item}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
      <LinearGradient
        colors={['#5E61EB', '#262757']}
        style={[styles.header, { paddingTop: insets.top + 15 }]}
      >
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" style={styles.backIcon} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products, categories, brands..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={(text) => {
              console.log('Text input changed:', text);
              setSearchQuery(text);
            }}
            autoFocus={true}
            returnKeyType="search"
            onSubmitEditing={handleSearchSubmit}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                console.log('Clearing search query');
                setSearchQuery('');
              }}
            >
              <Ionicons name="close-circle" size={20} color="#888" style={styles.clearIcon} />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {isSearching || searchLoading ? (
          <ActivityIndicator size="small" color="#5E61EB" style={styles.loader} />
        ) : searchError ? (
          <Text style={styles.errorText}>{searchError}</Text>
        ) : (
          <>
            {/* Suggestions Section */}
            {searchSuggestions.length > 0 && (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Suggestions</Text>
                </View>
                <FlatList
                  data={searchSuggestions}
                  renderItem={renderSuggestion}
                  keyExtractor={(item) => `${item.id}-${item.search_type}`}
                  style={styles.suggestionsList}
                  keyboardShouldPersistTaps="handled"
                />
              </>
            )}
            {searchQuery.length >= 3 && searchSuggestions.length === 0 && (
              <Text style={styles.noResultsText}>No results found</Text>
            )}

            {/* Search History Section */}
            {searchHistory.length > 0 && !searchSuggestions.length && (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Recent Searches</Text>
                  <TouchableOpacity onPress={clearSearchHistory}>
                    <Text style={styles.clearHistoryText}>Clear All</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={searchHistory}
                  renderItem={renderHistoryItem}
                  keyExtractor={(item, index) => `history-${index}`}
                  style={styles.suggestionsList}
                  keyboardShouldPersistTaps="handled"
                />
              </>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  backIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontFamily: 'SF-Pro-Display-Medium',
  },
  clearIcon: {
    marginLeft: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  suggestionsList: {
    flexGrow: 0,
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  suggestionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestionIcon: {
    marginRight: 10,
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
    ...commonstyles.text4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  clearHistoryText: {
    fontSize: 14,
    color: 'red',
  },
  loader: {
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
    ...commonstyles.text4,
  },
  noResultsText: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
    ...commonstyles.text4,
  },
});

export default SearchScreen;