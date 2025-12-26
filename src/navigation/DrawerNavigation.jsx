

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { colors } from '../config/theme';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { TabNavigator } from './AppNavigation';
const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="MainTabs"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          width: '75%',
          backgroundColor: colors.black,
        },
      }}
    >
     
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ title: 'Home' }} // optional, won't show much
      />

    </Drawer.Navigator>
  );
};

export default DrawerNavigation;