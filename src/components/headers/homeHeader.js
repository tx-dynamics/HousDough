import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import colors from '../../globalStyles/colorScheme';

const HomeHeader = ({text, light, Screen}) => (
  <View style={styles.container}>
    {/* Drawer Icon */}
    <Image
      source={require('../../../assets/icons/drawer.png')}
      resizeMode={'contain'}
      style={{width: '5%'}}
    />
    {/* Logo */}
    <Image
      source={require('../../../assets/icons/logo.png')}
      resizeMode={'contain'}
      style={{width: '30%', height: 100}}
    />
    {/* Message */}
    <Image
      source={require('../../../assets/icons/message.png')}
      resizeMode={'contain'}
      style={{width: '7%'}}
    />
  </View>
);

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '13%',
    width: '100%',

    paddingHorizontal: '5%',
  },
});
