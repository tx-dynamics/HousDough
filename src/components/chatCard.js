import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import colors from '../globalStyles/colorScheme';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  ChatFooter,
  Message,
} from 'react-native-gifted-chat';

const ChatCard = ({props}) => (
  <Bubble
    {...props}
    wrapperStyle={{
      right: {
        borderBottomLeftRadius: 0,
        backgroundColor: colors.primary,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
        marginBottom: '5%',
      },
      left: {
        borderBottomRightRadius: 0,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        marginBottom: '5%',
      },
    }}
  />
);

export default ChatCard;
