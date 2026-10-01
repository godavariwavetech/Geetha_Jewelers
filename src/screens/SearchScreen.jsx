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
//   Platform,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector, useDispatch, shallowEqual } from 'react-redux';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { fetchGlobalSearch, clearSearchSuggestions } from '../redux/reducers/searchSlice';
// import debounce from 'lodash.debounce';

// const SearchScreen = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
// const { latitude, longitude } = useSelector(
//   (state) => state.location || {},
//   shallowEqual
// );
//   // Optimized selectors to prevent rerender warnings
//   const customerId = useSelector((state) => state.Auth?.customerId);
//   const { searchSuggestions, loading } = useSelector(
//     (state) => state.search || { searchSuggestions: [], loading: false },
//     shallowEqual
//   );

//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchHistory, setSearchHistory] = useState([]);

//   useEffect(() => {
//     const loadSearchHistory = async () => {
//       try {
//         const history = await AsyncStorage.getItem('searchHistory');
//         if (history) setSearchHistory(JSON.parse(history));
//       } catch (e) { console.error(e); }
//     };
//     loadSearchHistory();
//   }, []);

//   // API Call Logic
//  const fetchSuggestions = useCallback(
//   debounce((query) => {
//     const trimmedQuery = query.trim();
//     if (trimmedQuery.length >= 3) {
//       // Send the object matching the new thunk signature
//       dispatch(fetchGlobalSearch({ 
//         query: trimmedQuery, 
//         lat: latitude, 
//         lng: longitude 
//       }));
//     } else {
//       dispatch(clearSearchSuggestions());
//     }
//   }, 500),
//   [dispatch, latitude, longitude] // Add dependencies here
// );

//   useEffect(() => {
//     fetchSuggestions(searchQuery);
//     // Cleanup if user clears the input
//     if (searchQuery.length < 3) {
//       dispatch(clearSearchSuggestions());
//     }
//   }, [searchQuery, fetchSuggestions, dispatch]);

//   const saveSearchHistory = async (query) => {
//     try {
//       const trimmed = query.trim();
//       if (!trimmed || trimmed.length < 3) return;
//       let history = [trimmed, ...searchHistory.filter(item => item !== trimmed)].slice(0, 10);
//       setSearchHistory(history);
//       await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
//     } catch (e) { console.error(e); }
//   };

//   const clearSearchHistory = async () => {
//     setSearchHistory([]);
//     await AsyncStorage.removeItem('searchHistory');
//   };

//   const handleSuggestionPress = (item) => {
//     // Determine if it's an object from API or a string from History
//     const isApiItem = typeof item === 'object' && item !== null;
//     const queryText = isApiItem ? item.search_text : item;
    
//     saveSearchHistory(queryText);

//     if (isApiItem) {
//       const { search_type, id } = item;

//       // Navigate to ListViewOfEngineers for both Material (1) and Service (2)
//       if (search_type === "1" || search_type === "2") {
//         navigation.navigate('ListViewOfEngineers', {
//           categoryId: id, 
//         });
//       }
//     }
//   };

//   const renderItem = ({ item, isHistory }) => {
//     const displayText = isHistory ? item : item.search_text;
//     const tagline = isHistory ? null : item.search_tagline;

//     return (
//       <TouchableOpacity
//         style={styles.suggestionItem}
//         onPress={() => handleSuggestionPress(item)}
//       >
//         <View style={styles.suggestionContent}>
//           <Ionicons 
//             name={isHistory ? "time-outline" : "search-outline"} 
//             size={18} 
//             color="#666" 
//             style={styles.suggestionIcon} 
//           />
//           <View>
//              <Text style={styles.suggestionText}>{displayText}</Text>
//              {tagline && (
//                <Text style={styles.taglineText}>{tagline}</Text>
//              )}
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" />
//       <LinearGradient colors={['#164da7ff', '#264157ff']} style={[styles.header, { paddingTop: insets.top + 10 }]}>
//         <View style={styles.searchRow}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.paddingRight}>
//             <Ionicons name="arrow-back" size={24} color="#000" />
//           </TouchableOpacity>
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search materials or services..."
//             placeholderTextColor="#999"
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             autoFocus
//             returnKeyType="search"
//           />
//           {searchQuery.length > 0 && (
//             <TouchableOpacity onPress={() => setSearchQuery('')}>
//               <Ionicons name="close-circle" size={20} color="#999" />
//             </TouchableOpacity>
//           )}
//         </View>
//       </LinearGradient>

//       <View style={styles.body}>
//         {loading ? (
//           <ActivityIndicator size="large" color="#5E61EB" style={styles.mt20} />
//         ) : (
//           <FlatList
//             data={searchQuery.length >= 3 ? searchSuggestions : searchHistory}
//             keyExtractor={(item, index) => (typeof item === 'object' ? item.id.toString() : `history-${index}`)}
//             ListHeaderComponent={() => (
//               <View style={styles.listHeader}>
//                 <Text style={styles.listHeaderText}>
//                   {searchQuery.length >= 3 ? "Suggestions" : "Recent Searches"}
//                 </Text>
//                 {searchQuery.length < 3 && searchHistory.length > 0 && (
//                   <TouchableOpacity onPress={clearSearchHistory}>
//                     <Text style={styles.clearText}>Clear All</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             )}
//             renderItem={({ item }) => renderItem({ item, isHistory: searchQuery.length < 3 })}
//             ListEmptyComponent={() => (
//               <Text style={styles.emptyText}>
//                 {searchQuery.length >= 3 ? "No results found" : "No recent searches"}
//               </Text>
//             )}
//             keyboardShouldPersistTaps="always"
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#FFF' },
//   header: { paddingHorizontal: 15, paddingBottom: 15 },
//   searchRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFF',
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     height: 50,
//   },
//   paddingRight: { marginRight: 10 },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//     fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
//   },
//   body: { flex: 1 },
//   listHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F0F0F0',
//   },
//   listHeaderText: { fontSize: 14, fontWeight: '700', color: '#666' },
//   clearText: { color: '#FF4D4D', fontSize: 13 },
//   suggestionItem: {
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F9F9F9',
//   },
//   suggestionContent: { flexDirection: 'row', alignItems: 'center' },
//   suggestionIcon: { marginRight: 15 },
//   suggestionText: { fontSize: 16, color: '#333', fontWeight: '500' },
//   taglineText: { fontSize: 12, color: '#5E61EB', marginTop: 2, fontWeight: '600' },
//   emptyText: { textAlign: 'center', marginTop: 40, color: '#999' },
//   mt20: { marginTop: 20 },
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
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchGlobalSearch, clearSearchSuggestions } from '../redux/slices/searchSlice';
import debounce from 'lodash.debounce';

const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Optimized selectors to prevent rerender warnings
  const customerId = useSelector((state) => state.Auth?.customerId);
  const { searchSuggestions, loading } = useSelector(
    (state) => state.search || { searchSuggestions: [], loading: false },
    shallowEqual
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const history = await AsyncStorage.getItem('searchHistory');
        if (history) setSearchHistory(JSON.parse(history));
      } catch (e) { console.error(e); }
    };
    loadSearchHistory();
  }, []);

  // API Call Logic
 const fetchSuggestions = useCallback(
  debounce((query) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length >= 3) {
      // Send the object matching the new thunk signature
      dispatch(fetchGlobalSearch({ 
        query: trimmedQuery 
      }));
    } else {
      dispatch(clearSearchSuggestions());
    }
  }, 500),
  [dispatch] // Add dependencies here
);

  useEffect(() => {
    fetchSuggestions(searchQuery);
    // Cleanup if user clears the input
    if (searchQuery.length < 3) {
      dispatch(clearSearchSuggestions());
    }
  }, [searchQuery, fetchSuggestions, dispatch]);

  const saveSearchHistory = async (query) => {
    try {
      const trimmed = query.trim();
      if (!trimmed || trimmed.length < 3) return;
      let history = [trimmed, ...searchHistory.filter(item => item !== trimmed)].slice(0, 10);
      setSearchHistory(history);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
    } catch (e) { console.error(e); }
  };

  const clearSearchHistory = async () => {
    setSearchHistory([]);
    await AsyncStorage.removeItem('searchHistory');
  };

  const handleSuggestionPress = (item) => {
    // Determine if it's an object from API or a string from History
    const isApiItem = typeof item === 'object' && item !== null;
    const queryText = isApiItem ? item.search_text : item;
    
    saveSearchHistory(queryText);

    if (isApiItem) {
      const { search_type, id, search_tagline } = item;

      if (search_type === "1" && search_tagline === "Category") {
        navigation.navigate('IndividualCategory', {
          categoryId: id, 
        });
      } else if (search_type === "2" && search_tagline === "Product") {
        navigation.navigate('ProductDetailsScreen', {
          product_id: id,
        });
      }
    } else {
      // For history items, set the query to re-trigger search
      setSearchQuery(queryText);
    }
  };

  const renderItem = ({ item, isHistory }) => {
    const displayText = isHistory ? item : item.search_text;
    const tagline = isHistory ? null : item.search_tagline;

    return (
      <TouchableOpacity
        style={styles.suggestionItem}
        onPress={() => handleSuggestionPress(item)}
      >
        <View style={styles.suggestionContent}>
          <Ionicons 
            name={isHistory ? "time-outline" : "search-outline"} 
            size={18} 
            color="#666" 
            style={styles.suggestionIcon} 
          />
          <View>
             <Text style={styles.suggestionText}>{displayText}</Text>
             {tagline && (
               <Text style={styles.taglineText}>{tagline}</Text>
             )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#832729" />
      <View style={[styles.header, { paddingTop: insets.top, backgroundColor: '#832729' }]}>
        <View style={styles.searchRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.paddingRight}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search materials or services..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.body}>
        {loading ? (
          <ActivityIndicator size="large" color="#5E61EB" style={styles.mt20} />
        ) : (
          <FlatList
            data={searchQuery.length >= 3 ? searchSuggestions : searchHistory}
            keyExtractor={(item, index) => (typeof item === 'object' ? item.id.toString() : `history-${index}`)}
            ListHeaderComponent={() => (
              <View style={styles.listHeader}>
                <Text style={styles.listHeaderText}>
                  {searchQuery.length >= 3 ? "Suggestions" : "Recent Searches"}
                </Text>
                {searchQuery.length < 3 && searchHistory.length > 0 && (
                  <TouchableOpacity onPress={clearSearchHistory}>
                    <Text style={styles.clearText}>Clear All</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            renderItem={({ item }) => renderItem({ item, isHistory: searchQuery.length < 3 })}
            ListEmptyComponent={() => (
              <Text style={styles.emptyText}>
                {searchQuery.length >= 3 ? "No results found" : "No recent searches"}
              </Text>
            )}
            keyboardShouldPersistTaps="always"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { paddingHorizontal: 15, paddingBottom: 15 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
  },
  paddingRight: { marginRight: 10 },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  body: { flex: 1 },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  listHeaderText: { fontSize: 14, fontWeight: '700', color: '#666' },
  clearText: { color: '#FF4D4D', fontSize: 13 },
  suggestionItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F9F9F9',
  },
  suggestionContent: { flexDirection: 'row', alignItems: 'center' },
  suggestionIcon: { marginRight: 15 },
  suggestionText: { fontSize: 16, color: '#333', fontWeight: '500' },
  taglineText: { fontSize: 12, color: '#5E61EB', marginTop: 2, fontWeight: '600' },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#999' },
  mt20: { marginTop: 20 },
});

export default SearchScreen;