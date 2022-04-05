import React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SetupScreen1 from '../screens/onBoardingScreens/setupScreen1';
import SetupScreen2 from '../screens/onBoardingScreens/setupScreen2';
import SetupScreen3 from '../screens/onBoardingScreens/setupScreen3';
import SetupScreen4 from '../screens/onBoardingScreens/setupScreen4';
import BottomTabNavigator from './bottomTabNavigator';

const Stack = createNativeStackNavigator(); //Stack Navigator for Authentication Stack Created

function OnBoardNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SetupScreen1"
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}>
      <Stack.Screen name="SetupScreen1" component={SetupScreen1} />
      <Stack.Screen name="SetupScreen2" component={SetupScreen2} />
      <Stack.Screen name="SetupScreen3" component={SetupScreen3} />
      <Stack.Screen name="SetupScreen4" component={SetupScreen4} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

export default OnBoardNavigator;
