import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';

function Splash2({navigation}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/splash2.png')}
        style={styles.backgroundImage}>
        {/* Logo */}
        <View style={{width: '100%'}}>
          <Image
            source={require('../../../assets/icons/logo.png')}
            style={{
              alignSelf: 'center',
              width: '70%',
              justifyContent: 'center',
            }}
            resizeMode={'contain'}
          />
        </View>

        {/* Activity Indicator */}

        <View style={styles.ActivityIndicatorStyle}>
          <ActivityIndicator size="small" color="#EF0D50" />
        </View>

        {/* Top Text */}
      </ImageBackground>
    </View>
  );
}

export default Splash2;

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
