import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
  Image,
  ActivityIndicator,
  Animated,
} from 'react-native';
import Button2 from '../../components/buttons/button2';
import {UserContext} from '../../contextApi/contextApi';

function Splash({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const translation = useRef(new Animated.Value(150)).current;
  const {userType, setUserType} = useContext(UserContext);

  useEffect(() => {
    setInterval(() => {
      setIsLoading(false);
      Animated.timing(translation, {
        toValue: -70,
        useNativeDriver: true,
      }).start();
    }, 3000);
    //UseEffect Cleanup Funstion
    return () => {
      setIsLoading(false);
    };
  }, [isLoading]);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/splash2.png')}
        style={styles.backgroundImage}>
        {/* Logo */}
        <Animated.View
          style={{transform: [{translateY: translation}], width: '100%'}}>
          <Image
            source={require('../../../assets/icons/logo.png')}
            style={{
              alignSelf: 'center',
              width: '70%',
              justifyContent: 'center',
            }}
            resizeMode={'contain'}
          />
        </Animated.View>

        {/* Activity Indicator */}
        {isLoading && (
          <View style={styles.ActivityIndicatorStyle}>
            <ActivityIndicator size="small" color="#EF0D50" />
          </View>
        )}
        {/* Top Text */}
        {/* {!isLoading && (
          <View style={{position: 'absolute', top: 140}}>
            <Text style={{color: 'white', fontSize: 24}}>
              WELCOME TO HOSDOUGH!
            </Text>
          </View>
        )} */}
        {/* Bottom View with buttons */}
        {!isLoading && (
          <View style={styles.bottomView}>
            <Text style={styles.text1}>I AM A</Text>

            <Button2
              onPress={() => {
                setUserType(0);
                navigation.navigate('Signup');
              }}
              text={'HOSDOUGH WORKER'}
              light={true}
            />

            <Button2
              onPress={() => {
                setUserType(1);
                navigation.navigate('Login');
              }}
              text={'HOSDOUGH EMPLOYER'}
              light={false}
            />
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: '70%',
  },
  bottomView: {
    width: '100%',
    height: '30%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: '5%',
    marginBottom: '5%',
  },
  text1: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    alignSelf: 'center',
  },
  ActivityIndicatorStyle: {
    backgroundColor: 'white',
    width: 70,
    height: 70,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 70,
  },
});
