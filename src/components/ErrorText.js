import React from 'react';
import {View, Text, Pressable, StyleSheet, Image} from 'react-native';

const ErrorText = ({text}) => {
  return text ? (
    <View>
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
