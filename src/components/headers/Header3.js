import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

import colors from '../../globalStyles/colorScheme';

const Header3 = ({text, onPress}) => (
  <View style={styles.container}>
    {/* Drawer Icon */}
    <Pressable
      style={{
        height: '90%',
        width: '6%',
        justifyContent: 'center',
      }}
      onPress={onPress}>
      <Image
        source={require('../../../assets/icons/back_arrow.png')}
        resizeMode={'contain'}
        style={{width: '100%'}}
      />
    </Pressable>

    <Text style={styles.text1}>{text}</Text>
    {/* Placeholder */}
    <Text> {'   '}</Text>
  </View>
);

export default Header3;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  text1: {
    fontFamily: 'Poppins-Bold',
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
