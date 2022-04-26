import React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SetupScreen1 from '../screens/onBoardingScreens/setupScreen1';
import SetupScreen2 from '../screens/onBoardingScreens/setupScreen2';
import SetupScreen3 from '../screens/onBoardingScreens/setupScreen3';
import SetupScreen4 from '../screens/onBoardingScreens/setupScreen4';
import BottomTabNavigator from './bottomTabNavigator';
import Messages from '../screens/tabScreens/messages';
import Chat from '../screens/tabScreens/chat';
import OthersProfile from '../screens/tabScreens/othersProfile';
import Profile from '../screens/tabScreens/profile';

const Stack = createNativeStackNavigator(); //Stack Navigator for Authentication Stack Created

function OnBoardNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SetupScreen1"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Stack.Screen name="SetupScreen1" component={SetupScreen1} />
      <Stack.Screen name="SetupScreen2" component={SetupScreen2} />
      <Stack.Screen name="SetupScreen3" component={SetupScreen3} />
      <Stack.Screen name="SetupScreen4" component={SetupScreen4} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="OthersProfile" component={OthersProfile} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default OnBoardNavigator;
