import React from 'react';
import { StyleSheet, Pressable, View, Image, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from '../screens/SplashScreen';
import SignIn from '../screens/SignIn';
import OTPVerification from '../screens/OTPVerification';
import SchemeDetailsScreen from '../screens/SchemeDetailsScreen';
import Home from '../screens/Home';
import More from '../screens/More';
import Rewards from '../screens/Rewards';
import GoldScheme from '../screens/GoldScheme';
import WishList from '../screens/WishList';
import Location from '../screens/Location';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import Cart from '../screens/Cart';
import Payment from '../screens/Payment';
import Profile1 from '../screens/Profile1';
import OrderDetails from '../screens/OrderDetails';
import ReturnPolicyScreen from '../screens/ReturnPolicyScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import TermsAndConditionsScreen from '../screens/TermsAndConditionsScreen';
import MyAddresses from '../screens/MyAddresses';
import MyOrders from '../screens/MyOrders';
import SearchScreen from '../screens/SearchScreen';
import IndividualCategory from '../screens/IndividualCategory';

import ContactUs from '../screens/ContactUs';
import RefundPolicyScreen from '../screens/RefundPolicyScreen';
import ApplyCouponScreen from '../screens/ApplyCouponScreen';
import VideoScreen from '../screens/VideoScreen';
import SelectOnMap from '../screens/SelectOnMap';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";


import OrderSuccessScreen from '../screens/OrderSuccessScreen';
import OnBoard1 from '../screens/OnBoard1';
import OnBoard2 from '../screens/OnBoard2';
import Splash2 from '../screens/Splash2';
import PdfViewerScreen from '../screens/PdfViewerScreen';
import Form from '../screens/Form';
import DrawerNavigation from './DrawerNavigation';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const TabNavigator = ({ route }) => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarPressColor: "transparent",
        tabBarPressOpacity: 1,
        tabBarButton: (props) => (
          <Pressable
            {...props}
            android_ripple={null}
            style={({ pressed }) => [
              props.style,
              { opacity: pressed ? 1 : 1 },
            ]}
          />
        ),
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === "Home") {
            return (
              <View style={styles.tabIconContainer}>
                {focused && <View style={styles.activeTabLine} />}
                <Image
                  source={
                    focused
                      ? require('../assets/homefill.png')
                      : require('../assets/homeout.png')
                  }
                  style={styles.homeIcon}
                />
              </View>
            );
          }

          if (route.name === "Rewards") {
            return (
              <View style={styles.tabIconContainer}>
                {focused && <View style={styles.activeTabLine} />}
                <Image
                  source={
                    focused
                      ? require('../assets/rate2.png')
                      : require('../assets/rate.png')
                  }
                  style={styles.rewardIcon}
                />
              </View>
            );
          }
          if (route.name === "GoldScheme") {
            return (
              <View style={styles.tabIconContainer}>
                {focused && <View style={styles.activeTabLine} />}
                <Image
                  source={
                    focused
                      ? require('../assets/shcemeoutline.png')
                      : require('../assets/shcemefill.png')
                  }
                  style={styles.rewardIcon}
                />
              </View>
            );
          }
 
          if (route.name === "Categories") {
            return (
              <View style={styles.tabIconContainer}>
                {focused && <View style={styles.activeTabLine} />}
                <Image
                  source={
                    focused
                      ? require('../assets/catfill.png')
                      : require('../assets/catout.png')
                  }
                  style={styles.locationIcon}
                />
              </View>
            );
          }

          if (route.name === "Profile") {
            return (
              <View style={styles.tabIconContainer}>
                {focused && <View style={styles.activeTabLine} />}
                <Image
                  source={
                    focused
                      ? require('../assets/profilefill.png')
                      : require('../assets/profileout.png')
                  }
                  style={styles.moreIcon}
                />
              </View>
            );
          }

          return null;
        },
        tabBarActiveTintColor: "#832729",
        tabBarInactiveTintColor: "#949494",
        tabBarStyle: {
          height: (Platform.OS === 'ios' ? 85 : 65) + insets.bottom,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 8,
          paddingTop: 8,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0e8e8',
          // borderTopLeftRadius: 20,
          // borderTopRightRadius: 20,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          position: 'absolute',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
          marginTop: 4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={Home}
        initialParams={{ selectedCategory: route.params?.selectedCategory || 'Men' }}
      />
      <Tab.Screen
  name="GoldScheme"
  component={GoldScheme}
  options={{ tabBarLabel: "Scheme" }}
/>
      <Tab.Screen
  name="Rewards"
  component={Rewards}
  options={{ tabBarLabel: "Catalogue" }}
/>
      <Tab.Screen name="Categories" component={Location} />
      <Tab.Screen name="Profile" component={More} />
    </Tab.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          animation: 'slide_from_right',
          gestureEnabled: false,
          headerShown: false
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="OTPVerification" component={OTPVerification} />
        <Stack.Screen name="IndividualCategory" component={IndividualCategory} />
        {/* <Stack.Screen name="TabNavigator" component={TabNavigator} /> */}
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
        <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="WishList" component={WishList} /> 
        <Stack.Screen name="Rewards" component={Rewards} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="RefundPolicyScreen" component={RefundPolicyScreen} />
        <Stack.Screen name="ReturnPolicyScreen" component={ReturnPolicyScreen} />
        <Stack.Screen name="TermsAndConditionsScreen" component={TermsAndConditionsScreen} />
        <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
        <Stack.Screen name="MyAddresses" component={MyAddresses} />
        <Stack.Screen name="MyOrders" component={MyOrders} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="ApplyCouponScreen" component={ApplyCouponScreen} />
        <Stack.Screen name="More" component={More} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
   
        <Stack.Screen name="VideoScreen" component={VideoScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="SelectOnMap" component={SelectOnMap} />
        
       
        <Stack.Screen name="OrderSuccessScreen" component={OrderSuccessScreen} />
        <Stack.Screen name="Profile1" component={Profile1} />
        <Stack.Screen name="OnBoard1" component={OnBoard1} />
        <Stack.Screen name="OnBoard2" component={OnBoard2} />
        <Stack.Screen name="SchemeDetailsScreen" component={SchemeDetailsScreen} />
        <Stack.Screen name="Splash2" component={Splash2} />
        <Stack.Screen name="PdfViewerScreen" component={PdfViewerScreen} />
        <Stack.Screen name="Form" component={Form} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabLine: {
    position: 'absolute',
    top: -8,
    width: 24,
    height: 3,
    backgroundColor: '#832729',
    borderRadius: 2,
  },
  homeIcon: {
    width: 30,
    height: 22,
  },
  rewardIcon: {
    width: 22,
    height: 22,
  },
  locationIcon: {
    width: 22,
    height: 22,
  },
  moreIcon: {
    width: 22,
    height: 25,
  },
});