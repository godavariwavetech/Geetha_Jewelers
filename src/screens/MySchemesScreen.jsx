// import React, { useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
//   TouchableOpacity,
//   RefreshControl,
//   Alert,
//   StatusBar,
// } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Icon
// import { fetchUserSchemes } from '../redux/slices/schemeSlice'; // adjust path as needed

// const MySchemesScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const insets = useSafeAreaInsets();

//   const { userSchemes, schemesLoading, schemesError } = useSelector((state) => state.scheme);
//   const { customerId } = useSelector((state) => state.Auth);

//   const loadSchemes = () => {
//     if (customerId) {
//       dispatch(fetchUserSchemes(customerId));
//     }
//   };

//   useEffect(() => {
//     loadSchemes();
//   }, [customerId]);

//   const renderSchemeItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.card}
//       activeOpacity={0.8}
//       onPress={() => {
//         // Navigate to IndividualSchemeDetails with the specific scheme ID
//         navigation.navigate('IndividualSchemeDetails', { id: item.id });
//       }}
//     >
//       <View style={styles.cardContent}>
//         <Text style={styles.schemeName}>{item.name}</Text>
//         <Text style={styles.schemeId}>Scheme ID: {item.scheme_id}</Text>

//         <View style={styles.row}>
//           <View style={styles.infoBox}>
//             <Text style={styles.label}>Tenure</Text>
//             <Text style={styles.value}>{item.tenure} months</Text>
//           </View>

//           <View style={styles.infoBox}>
//             <Text style={styles.label}>Monthly</Text>
//             <Text style={styles.value}>₹{Number(item.installment_amount).toLocaleString()}</Text>
//           </View>

//           <View style={styles.infoBox}>
//             <Text style={styles.label}>Status</Text>
//             <Text
//               style={[
//                 styles.status,
//                 item.profile_status === 2 ? styles.statusApproved : styles.statusPending,
//               ]}
//             >
//               {item.profile_status === 2 ? 'Active' : 'Under Review'}
//             </Text>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderContent = () => {
//     if (schemesLoading && userSchemes.length === 0) {
//       return (
//         <View style={styles.center}>
//           <ActivityIndicator size="large" color="#C41E3A" />
//           <Text style={styles.loadingText}>Loading your schemes...</Text>
//         </View>
//       );
//     }

//     if (schemesError) {
//       return (
//         <View style={styles.center}>
//           <Text style={styles.errorText}>{schemesError}</Text>
//           <TouchableOpacity style={styles.retryButton} onPress={loadSchemes}>
//             <Text style={styles.retryText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       );
//     }

//     return (
//       <FlatList
//         data={userSchemes}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderSchemeItem}
//         ListEmptyComponent={() => (
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>You don't have any active schemes yet</Text>
//             <TouchableOpacity
//               style={styles.joinButton}
//               onPress={() => navigation.navigate('GoldScheme')} // Navigate to Join Screen
//             >
//               <Text style={styles.joinButtonText}>Join a New Scheme</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//         refreshControl={
//           <RefreshControl
//             refreshing={schemesLoading}
//             onRefresh={loadSchemes}
//             colors={['#C41E3A']}
//             tintColor="#C41E3A"
//           />
//         }
//         contentContainerStyle={styles.listContent}
//       />
//     );
//   };

//   return (
//     <SafeAreaView style={[styles.safeArea, {  }]}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
//       {/* Header Section */}
//       <View style={styles.header}>
//         <TouchableOpacity 
//           onPress={() => navigation.goBack()} 
//           style={styles.backButton}
//         >
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>My Schemes</Text>
//         {/* Empty View to balance the back button for center alignment */}
//         <View style={{ width: 32 }} /> 
//       </View>

//       <View style={[styles.container, { paddingBottom: insets.bottom }]}>
//         {renderContent()}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff', // Header background color
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   // Header Styles
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   backButton: {
//     width: 32, // Fixed width for alignment
//     padding: 4,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#000',
//     textAlign: 'center',
//     flex: 1,
//   },
//   // List Styles
//   listContent: {
//     paddingHorizontal: 16,
//     paddingTop: 16,
//     paddingBottom: 20,
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   cardContent: {
//     padding: 16,
//   },
//   schemeName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1a1a1a',
//     marginBottom: 4,
//   },
//   schemeId: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 12,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   infoBox: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   label: {
//     fontSize: 12,
//     color: '#757575',
//     marginBottom: 4,
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1a1a1a',
//   },
//   status: {
//     fontSize: 14,
//     fontWeight: '600',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   statusApproved: {
//     backgroundColor: '#e8f5e9',
//     color: '#2e7d32',
//   },
//   statusPending: {
//     backgroundColor: '#fff3e0',
//     color: '#e65100',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 40,
//     marginTop: 80,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#757575',
//     textAlign: 'center',
//     marginBottom: 24,
//   },
//   joinButton: {
//     backgroundColor: '#C41E3A',
//     paddingVertical: 14,
//     paddingHorizontal: 32,
//     borderRadius: 30,
//   },
//   joinButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   loadingText: {
//     marginTop: 16,
//     fontSize: 16,
//     color: '#555',
//   },
//   errorText: {
//     fontSize: 16,
//     color: '#d32f2f',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   retryButton: {
//     backgroundColor: '#C41E3A',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//   },
//   retryText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
// });

// export default MySchemesScreen;
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Alert,
  StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchUserSchemes } from '../redux/slices/schemeSlice';

// Font family constants
const FONTS = {
  regular: 'SF-Pro-Display-Regular',
  medium: 'SF-Pro-Display-Medium',
  semibold: 'SF-Pro-Display-Semibold',
  bold: 'SF-Pro-Display-Bold',
};

const MySchemesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const { userSchemes, schemesLoading, schemesError } = useSelector((state) => state.scheme);
  const { customerId } = useSelector((state) => state.Auth);

  const loadSchemes = () => {
    if (customerId) {
      dispatch(fetchUserSchemes(customerId));
    }
  };

  useEffect(() => {
    loadSchemes();
  }, [customerId]);

  const renderSchemeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate('IndividualSchemeDetails', { id: item.id });
      }}
    >
      <View style={styles.cardContent}>
        <Text style={styles.schemeName}>{item.name}</Text>
        <Text style={styles.schemeId}>Scheme ID: {item.scheme_id}</Text>

        <View style={styles.row}>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Tenure</Text>
            <Text style={styles.value}>{item.tenure} months</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Monthly</Text>
            <Text style={styles.value}>₹{Number(item.installment_amount).toLocaleString()}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Status</Text>
            <Text
              style={[
                styles.status,
                item.profile_status === 2 ? styles.statusApproved : styles.statusPending,
              ]}
            >
              {item.profile_status === 2 ? 'Active' : 'Under Review'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderContent = () => {
    if (schemesLoading && userSchemes.length === 0) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#C41E3A" />
          <Text style={styles.loadingText}>Loading your schemes...</Text>
        </View>
      );
    }

    if (schemesError) {
      return (
        <View style={styles.center}>
          <Text style={styles.errorText}>{schemesError}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadSchemes}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <FlatList
        data={userSchemes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSchemeItem}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>You don't have any active schemes yet</Text>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => navigation.navigate('GoldScheme')}
            >
              <Text style={styles.joinButtonText}>Join a New Scheme</Text>
            </TouchableOpacity>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={schemesLoading}
            onRefresh={loadSchemes}
            colors={['#C41E3A']}
            tintColor="#C41E3A"
          />
        }
        contentContainerStyle={styles.listContent}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, {}]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Schemes</Text>
        <View style={{ width: 32 }} /> 
      </View>

      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 32,
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  // List Styles
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    padding: 16,
  },
  schemeName: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  schemeId: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: '#666',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBox: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: '#757575',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontFamily: FONTS.semibold,
    color: '#1a1a1a',
  },
  status: {
    fontSize: 14,
    fontFamily: FONTS.semibold,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusApproved: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
  },
  statusPending: {
    backgroundColor: '#fff3e0',
    color: '#e65100',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 80,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 24,
  },
  joinButton: {
    backgroundColor: '#C41E3A',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#C41E3A',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontFamily: FONTS.bold,
  },
});

export default MySchemesScreen;