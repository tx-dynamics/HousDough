import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import colorScheme from '../../globalStyles/colorScheme';

const ChatSendButton = () => (
  <View style={styles.container}>
    {/* Left */}
    <View style={{flexDirection: 'row'}}>
      {/* camera */}
      <Image
        source={require('../../../assets/icons/camera2.png')}
        resizeMode={'contain'}
        style={{width: 18.33, height: 20}}
      />
      {/* Message */}
      <View style={{height: 20, alignItems: 'center'}}>
        <Text style={styles.text1}>Message</Text>
      </View>
    </View>
    {/* Right */}
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {/* Plus */}
      <Image
        source={require('../../../assets/icons/plus2.png')}
        resizeMode={'contain'}
        style={{width: 16, height: 16, marginRight: 20}}
      />
      {/* Next Arrow */}

      <Image
        source={require('../../../assets/icons/next_arrow.png')}
        resizeMode={'contain'}
        style={{width: 23.57, height: 22.66}}
      />
    </View>
  </View>
);

export default ChatSendButton;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 55,
    borderWidth: 1,
    borderColor: colorScheme.primary,
    borderRadius: 46,
    alignSelf: 'center',
    marginBottom: '10%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  text1: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginLeft: 20,
    color: '#514F4F',
  },
});
