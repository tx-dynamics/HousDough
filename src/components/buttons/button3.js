import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
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
    width: Dimensions.get('window').width * 0.18,
    height: Dimensions.get('window').width * 0.18,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  icon: {
    width: '20%',
  },
});
