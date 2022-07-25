import React, {useContext, useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
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

  const {user, setUser, setUserType, setOnBoardingDone, setPaymentDone} =
    useContext(UserContext);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    userDispatch(setUid({uid: user?.uid})); //setting UID in redux
    userDispatch(setEmail({email: user?.email})); //setting email in redux

    if (initializing) setInitializing(false);

    getUserInfo()
      .then(res => {
        console.log('getUserInfo', res);
        setUserType(res?.userType);
        setOnBoardingDone(res?.onBoarding);
        res?.userType
          ? setPaymentDone(res?.paymentMethod)
          : setPaymentDone(true);

        userDispatch(
          setLocation({
            Latitude: res?.location?.Latitude,
            Longitude: res?.location?.Longitude,
          }),
        );
        userDispatch(setPostCode({Postcode: res?.Postcode}));
        userDispatch(setVideoLink({VideoLink: res?.VideoLink}));
        userDispatch(setName({userName: res?.name}));
        userDispatch(setUserSkills({Skills: res?.Skills}));
        userDispatch(setAboutYou({AboutYou: res?.AboutYou}));
        userDispatch(setPastExperience({PastExperience: res?.PastExperience}));
        userDispatch(setReference({Reference: res?.Reference}));
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    //This is for splash screen
    console.log('user', user);
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
