import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigation from './src/navigation/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
  return (
    <Provider store={store}>
       <SafeAreaProvider style={{flex:1}}>
         <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigation />
      </GestureHandlerRootView>
       </SafeAreaProvider>
     
    </Provider>
  );
}
