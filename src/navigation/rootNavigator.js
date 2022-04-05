import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './authNavigator';
import MainNavigator from './mainNavigator';

function RootNavigator() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <NavigationContainer>
        {0 ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default RootNavigator;
