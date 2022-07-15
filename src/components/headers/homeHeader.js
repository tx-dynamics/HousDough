import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

import colors from '../../globalStyles/colorScheme';

const HomeHeader = ({text, light, Screen, onPress, onPressLogout}) => (
  <View style={styles.container}>
    {/* Drawer Icon */}
    <Pressable
      onPress={() => onPressLogout()}
      style={{
        width: '7%',
        height: '40%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('../../../assets/icons/Logout.png')}
        resizeMode={'contain'}
        style={{width: '100%'}}
      />
    </Pressable>

    {/* Logo */}
    <Image
      source={require('../../../assets/icons/logo.png')}
      resizeMode={'contain'}
      style={{width: '30%', height: 100, marginTop: 10}}
    />
    {/* Message */}
    <Pressable
      onPress={onPress}
      style={{
        height: '90%',
        width: '7%',
        justifyContent: 'center',
      }}>
      <Image
        source={require('../../../assets/icons/message.png')}
        resizeMode={'contain'}
        style={{width: '100%'}}
      />
    </Pressable>
  </View>
);

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '11%',
    width: '100%',

    paddingHorizontal: '5%',
  },
});
