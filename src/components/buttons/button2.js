import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import colors from '../../globalStyles/colorScheme';

const Button2 = ({onPress, text, light}) => (
  <Pressable onPress={onPress}>
    <View
      style={{
        ...styles.button,
        backgroundColor: light ? 'white' : colors.primary,
      }}>
      <Text
        style={{...styles.buttonText, color: light ? colors.primary : 'white'}}>
        {text}
      </Text>
    </View>
  </Pressable>
);
export default Button2;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '3%',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
  },
});
