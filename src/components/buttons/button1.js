import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import colors from '../../globalStyles/colorScheme';

const Button1 = ({onPress, text}) => (
  <Pressable onPress={onPress}>
    <View style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </View>
  </Pressable>
);
export default Button1;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 60,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '0%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
});
