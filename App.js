// import React from 'react';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import AppNavigation from './src/navigation/AppNavigation';
// import { Provider } from 'react-redux';
// import { store } from './src/redux/store';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// export default function App() {
//   return (
//     <Provider store={store}>
//        <SafeAreaProvider style={{flex:1}}>
//          <GestureHandlerRootView style={{ flex: 1 }}>
//         <AppNavigation />
//       </GestureHandlerRootView>
//        </SafeAreaProvider>
     
//     </Provider>
//   );
// }
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigation from './src/navigation/AppNavigation';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Notification Imports
import { checkNotifications, requestNotifications, RESULTS } from 'react-native-permissions';
import { getFCMToken } from './src/services/NotificationsService'; 
import { setPlayerId } from './src/redux/slices/authSlice'; 

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        // 1. Check and Request Permissions
        const { status } = await checkNotifications();
        if (status !== RESULTS.GRANTED) {
          await requestNotifications(['alert', 'sound', 'badge']);
        }

        // 2. Get FCM Token
        const token = await getFCMToken();
        console.log('FCM Token:', token);

        if (token) {
          // 3. Store token in Redux
          dispatch(setPlayerId(token));
        }
      } catch (error) {
        console.error('Notification Initialization Error:', error);
      }
    };

    initializeNotifications();
  }, [dispatch]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigation />
    </GestureHandlerRootView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}