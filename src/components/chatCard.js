import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import colorScheme from '../globalStyles/colorScheme';

const ChatCard = ({index, userMessage}) => (
  <View
    style={{
      ...styles.container,
      backgroundColor: userMessage ? '#E2E2E2' : colorScheme.secondary,
      alignSelf: userMessage ? 'flex-start' : 'flex-end',
    }}>
    <Text
      style={{
        ...styles.text1,
        color: userMessage ? '#4A4A4A' : 'white',
      }}>
      Hello Man, How are you!
    </Text>
    <Text
      style={{
        ...styles.text2,
        color: userMessage ? colorScheme.primary : 'white',
      }}>
      8 minutes ago
    </Text>
  </View>
);

export default ChatCard;

const styles = StyleSheet.create({
  container: {
    width: '60%',
    marginVertical: '1.5%',
    padding: '3%',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 100,
    marginRight: '5%',
  },
  text1: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  text2: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    marginTop: '5%',
    alignSelf: 'flex-end',
  },
});
