import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChoosePlan from '../screens/paymentScreens/choosePlan';
import PaymentInformation from '../screens/paymentScreens/paymentInformation';
import PaymentMethod from '../screens/paymentScreens/paymentMethod';

const Stack = createNativeStackNavigator(); //Stack Navigator for Authentication Stack Created

function PaymentNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ChoosePlan"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Stack.Screen name="ChoosePlan" component={ChoosePlan} />
      <Stack.Screen name="PaymentInformation" component={PaymentInformation} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
    </Stack.Navigator>
  );
}

export default PaymentNavigator;
