import React, {useContext, useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AuthNavigator from './authNavigator';
import MainNavigator from './mainNavigator';
import {UserContext} from '../contextApi/contextApi';
import {getUserInfo} from '../firebase/getFunctions';
import Splash from '../screens/authScreens/splash';
import LoaderModal from '../components/Modals/loaderModal';
import Splash2 from '../screens/authScreens/splash2';

import {
  setUid,
  setEmail,
  setName,
  setLocation,
  setPostCode,
  setVideoLink,
  setUserSkills,
  setAboutYou,
  setPastExperience,
  setReference,
} from '../redux/features/userSlice';

function RootNavigator() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const userDispatch = useDispatch();

  const {
    user,
    userType,
    setUser,
    setUserType,
    setOnBoardingDone,
    setPaymentDone,
  } = useContext(UserContext);

  // Handle user state changes
  function onAuthStateChanged(user) {
    // console.log('onAuthStateChanged', user);
    setUser(user);
    userDispatch(setUid({uid: user?.uid})); //setting UID in redux
    userDispatch(setEmail({email: user?.email})); //setting email in redux

    if (initializing) setInitializing(false);

    getUserInfo()
      .then(res => {
        console.log('getUserInfo res', res);
        setUserType(res?.userType);
        setOnBoardingDone(res?.onBoarding);
        res?.userType
          ? setPaymentDone(res?.paymentMethod)
          : setPaymentDone(true);

        // console.log('setLocation', res);
        userDispatch(
          setLocation({
            Latitude: res?.location?.Latitude || null,
            Longitude: res?.location?.Longitude || null,
          }),
        );
        // console.log('setPostCode==============================', res);

        userDispatch(setPostCode({Postcode: res?.Postcode || ''}));
        userDispatch(setVideoLink({VideoLink: res?.VideoLink || null}));
        userDispatch(setName({userName: res?.name || null}));
        userDispatch(setUserSkills({Skills: res?.Skills || []}));
        userDispatch(setAboutYou({AboutYou: res?.AboutYou || ''}));
        userDispatch(
          setPastExperience({PastExperience: res?.PastExperience || ''}),
        );
        userDispatch(setReference({Reference: res?.Reference || ''}));
        console.log('then');
      })
      .catch(error => console.log('getUserInfo', error))
      .finally(() => {
        console.log('Finally');
        setIsLoading(false);
      });
  }

  useEffect(() => {
    //This is for splash screen
    console.log('userType', userType);

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
