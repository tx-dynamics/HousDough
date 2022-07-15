import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoardNavigator from './onboardNavigator';
import PaymentNavigator from './paymentNavigator';
import BottomTabNavigator from './bottomTabNavigator';
import Messages from '../screens/tabScreens/messages';
import Chat from '../screens/tabScreens/chat';
import OthersProfile from '../screens/tabScreens/othersProfile';
import Profile from '../screens/tabScreens/profile';

import {UserContext} from '../contextApi/contextApi';
const Stack = createNativeStackNavigator(); //Stack Navigator for Main Stack Created

function MainNavigator() {
  const {onBoardingDone, setOnBoardingDone, paymentDone, setPaymentDone} =
    useContext(UserContext);
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_bottom',
      }}>
      {onBoardingDone ? (
        paymentDone ? (
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
          />
        ) : (
          <Stack.Screen name="PaymentNavigator" component={PaymentNavigator} />
        )
      ) : (
        <Stack.Screen name="OnBoardNavigator" component={OnBoardNavigator} />
      )}
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="OthersProfile" component={OthersProfile} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default MainNavigator;
