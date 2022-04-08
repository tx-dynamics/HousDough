import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChoosePlan from '../screens/paymentScreens/choosePlan';
import PaymentInformation from '../screens/paymentScreens/paymentInformation';
import PaymentMethod from '../screens/paymentScreens/paymentMethod';
import BottomTabNavigator from './bottomTabNavigator';

const Stack = createNativeStackNavigator(); //Stack Navigator for Authentication Stack Created

function PaymentNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ChoosePlan"
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}>
      <Stack.Screen name="ChoosePlan" component={ChoosePlan} />
      <Stack.Screen name="PaymentInformation" component={PaymentInformation} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

export default PaymentNavigator;
