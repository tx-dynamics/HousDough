import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import colors from '../../globalStyles/colorScheme';

const Button4 = ({text, selected, onPress}) => (
  <Pressable onPress={onPress}>
    <View
      style={{
        ...styles.button,
        backgroundColor: selected ? colors.primary : 'white',
      }}>
      <Text style={{...styles.text, color: selected ? 'white' : colors.black}}>
        {text}
      </Text>
    </View>
  </Pressable>
);
export default Button4;

const styles = StyleSheet.create({
  button: {
    padding: '5%',
    height: 55,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '8%',
    marginVertical: '5%',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
});
