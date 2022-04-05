import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import colors from '../../globalStyles/colorScheme';

const Button5 = ({onPress, text, light, icon}) => (
  <Pressable onPress={onPress}>
    <View
      style={{
        ...styles.button,
        backgroundColor: light ? 'white' : colors.primary,
      }}>
      <Text
        style={{
          ...styles.buttonText,
          color: light ? colors.primary : 'white',
        }}>
        {text}
      </Text>
      <Image source={icon} resizeMode={'contain'} style={styles.icon} />
    </View>
  </Pressable>
);
export default Button5;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 60,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 18,
    marginRight: '7%',
    fontFamily: 'Poppins-Regular',
    marginVertical: 12,
  },
  icon: {
    width: '8%',
  },
});
