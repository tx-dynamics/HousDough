import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Keyboard,
} from 'react-native';
import {useSelector} from 'react-redux';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {addToArray, updateUnseen} from '../../firebase/updateFuctions';
import Header3 from '../../components/headers/Header3';
import ChatCard from '../../components/chatCard';
import ChatSendButton from '../../components/buttons/chatSendButton';
import colors from '../../globalStyles/colorScheme';

function Chat({navigation, route}) {
  const {senderUid} = route.params;
  const {uid} = useSelector(state => state.userProfile);
  const [messages, setMessages] = useState([]);
  const [typedMessages, setTypedMessages] = useState('');
  const [initial, setInitial] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const getMessages = async () => {
    await firestore()
      .collection('chats')
      .doc(uid)
      .onSnapshot(async doc => {
        console.log('onSnapshot');

        let _data = await doc.data();

        if (!_data) return;

        _data = _data[senderUid];
        console.log('------->', _data);
        _data = _data.reverse();
        setMessages(_data);
      });
  };

  async function onSend(messages = []) {
    console.log('messages[0]', messages[0]);
    const msg = messages[0];
    setTypedMessages('');

    setMessages(previousMessages => GiftedChat.append(previousMessages, msg));

    messages[0].createdAt = Date.parse(messages[0].createdAt);
    await addToArray('chats', uid, senderUid, messages[0]);
    messages[0].user._id = 2;
    await addToArray('chats', senderUid, uid, messages[0]);
    messages[0].user._id = 1;
  }

  // useEffect(() => {
  //   if (initial && messages.length > 0) {
  //     setInitial(false);
  //     updateUnseen(uid, senderUid, messages);
  //   }
  // }, [messages]);

  useEffect(() => {
    console.log('Chat', senderUid);
    getMessages();

    return () => {
      console.log('unmount');

      setMessages([]);
    };
  }, []);

  // For Keyboard Handling

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header3 onPress={() => navigation.goBack()} text={'Chat'} />
      <Pressable
        style={{flex: 1, paddingBottom: isKeyboardVisible ? '15%' : '10%'}}
        onPress={() => Keyboard.dismiss()}>
        <GiftedChat
          messages={messages}
          user={{
            _id: 2,
          }}
          renderAvatar={null}
          renderBubble={props => {
            return <ChatCard props={props} />;
          }}
          renderInputToolbar={props => {
            return (
              <ChatSendButton
                Message={typedMessages}
                onChangeText={txt => setTypedMessages(txt)}
                onSend={() =>
                  typedMessages &&
                  onSend([
                    {
                      _id: new Date(),
                      text: typedMessages,
                      createdAt: new Date(),
                      unseen: true,
                      user: {
                        _id: 1,
                      },
                    },
                  ])
                }
              />
            );
          }}
        />
      </Pressable>
    </View>
  );
}
export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
