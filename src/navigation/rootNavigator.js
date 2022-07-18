import React, {useContext, useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './authNavigator';
import MainNavigator from './mainNavigator';
import {UserContext} from '../contextApi/contextApi';
import {getUserInfo} from '../firebase/getFunctions';
import Splash from '../screens/authScreens/splash';
import LoaderModal from '../components/Modals/loaderModal';
import Splash2 from '../screens/authScreens/splash2';

function RootNavigator() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const {user, setUser, setUserType, setOnBoardingDone, setPaymentDone} =
    useContext(UserContext);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);

    getUserInfo()
      .then(res => {
        console.log('getUserInfo', res);
        setUserType(res?.userType);
        setOnBoardingDone(res?.onBoarding);
        res?.userType
          ? setPaymentDone(res?.paymentMethod)
          : setPaymentDone(true);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    //This is for splash screen
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <NavigationContainer>
        {user ? isLoading ? <Splash2 /> : <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default RootNavigator;
