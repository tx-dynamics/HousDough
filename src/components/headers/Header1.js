import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import colors from '../../globalStyles/colorScheme';

const Header1 = ({text, light, Screen}) => (
  <View style={styles.container}>
    <Text style={{...styles.text1, color: light ? 'white' : colors.black}}>
      Setup Your Profile
    </Text>
    {/* Progress Bar */}
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{...styles.bar, backgroundColor: colors.primary}}></View>
      <View
        style={{
          ...styles.bar,
          backgroundColor:
            Screen == 2 || Screen == 3 || Screen == 4
              ? colors.primary
              : colors.third,
        }}></View>
      <View
        style={{
          ...styles.bar,
          backgroundColor:
            Screen == 3 || Screen == 4 ? colors.primary : colors.third,
        }}></View>
      <View
        style={{
          ...styles.bar,
          backgroundColor: Screen == 4 ? colors.primary : colors.third,
        }}></View>
    </View>
    {/*  */}
    <Text style={{...styles.text2, color: light ? 'white' : colors.black}}>
      {text}
    </Text>
  </View>
);

export default Header1;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '23%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text1: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
  text2: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginTop: '3%',
  },
  bar: {
    height: 13,
    width: '22%',
    borderRadius: 10,
  },
});
