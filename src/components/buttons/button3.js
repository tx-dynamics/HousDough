import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import colors from '../../globalStyles/colorScheme';

const Button3 = ({onPress}) => (
  <Pressable onPress={onPress}>
    <View style={styles.button}>
      <Image
        source={require('../../../assets/icons/right_arrow.png')}
        resizeMode={'contain'}
        style={styles.icon}
      />
    </View>
  </Pressable>
);
export default Button3;

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 80,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  icon: {
    width: '20%',
  },
});
