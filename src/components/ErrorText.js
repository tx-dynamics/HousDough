import React from 'react';
import {View, Text, Pressable, StyleSheet, Image} from 'react-native';

const ErrorText = ({text}) => {
  return text ? (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
      }}>
      <Image
        source={require('../../assets/icons/error.png')}
        resizeMode={'contain'}
        style={{width: 12, height: 12, marginTop: 5}}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  ) : null;
};

export default ErrorText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'crimson',
    paddingHorizontal: 5,
  },
});
