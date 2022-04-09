import React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/tabScreens/home';
import OthersProfile from '../screens/tabScreens/othersProfile';

const Stack = createNativeStackNavigator(); //Stack Navigator for Authentication Stack Created

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="OthersProfile" component={OthersProfile} />
    </Stack.Navigator>
  );
}

export default HomeStack;
