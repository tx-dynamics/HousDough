import React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/authScreens/splash';
import Login from '../screens/authScreens/login';
import Signup from '../screens/authScreens/signup';
import OnBoardNavigator from './onboardNavigator';

const Stack = createNativeStackNavigator(); //Stack Navigator for Authentication Stack Created

function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="OnBoardNavigator" component={OnBoardNavigator} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
