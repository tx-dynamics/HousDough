import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import colors from '../../globalStyles/colorScheme';

const Header2 = ({text}) => (
  <View style={styles.container}>
    {/* Drawer Icon */}
    <Image
      source={require('../../../assets/icons/drawer.png')}
      resizeMode={'contain'}
      style={{width: '5%'}}
    />
    <Text style={styles.text1}>{text}</Text>
    {/* Placeholder */}
    <Text> {'   '}</Text>
  </View>
);

export default Header2;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  text1: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: colors.black,
  },
  text2: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginTop: '3%',
  },
  bar: {
    height: 15,
    width: '22%',
    borderRadius: 10,
  },
});
