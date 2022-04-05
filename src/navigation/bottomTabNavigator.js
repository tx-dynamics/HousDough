import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import HomeStack from './homeStack';

import Profile from '../screens/tabScreens/profile';
import Search from '../screens/tabScreens/search';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from '../components/MyTabBar';

// Creating bottom tab navigator
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image source={require('../../assets/icons/profile.png')} />
          ),
          headerShown: false,
        }}
        name="Profile"
        component={Profile}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="HomeStack"
        component={HomeStack}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Search"
        component={Search}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
