import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Header3 from '../../components/headers/Header3';
import MessagesCard from '../../components/messageCard';
import {getConversations} from '../../firebase/getFunctions';

function Messages({navigation}) {
  // Message Dummy Data
  const {uid} = useSelector(state => state.userProfile);

  const [messages, setMessages] = useState([]);

  // This function is to get all the conversations

  const getConversations = async uid => {
    console.log('getConversations', uid);

    const temp = [];
    try {
      await firestore()
        .collection('chats')
        .doc(uid)
        .get()
        .then(res => {
          let _Data = res.data();
          console.log(_Data);

          let _Data2 = Object.values(_Data);
          _Data2 = _Data2[0];
          _Data2 = _Data2[_Data2.length - 1];

          // console.log(_Data2.text);
          _Data = Object.keys(_Data);
          console.log(_Data);
          _Data.forEach((item, index) => {
            console.log('++++++', item);

            firestore()
              .collection('Users')
              .doc(item)
              .get()
              .then(_res => {
                const userData = _res.data();
                temp.push({
                  userName: userData.name,
                });
                if (index == _Data.length - 1) {
                  console.log(temp);
                  setMessages(temp);
                }
              });
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConversations(uid);
  }, []);
  return (
    <View style={styles.container}>
      <Header3
        onPress={() => navigation.navigate('BottomTabNavigator')}
        text={'Messages'}
      />
      {messages.map((item, index) => (
        <MessagesCard
          key={index}
          Data={messages[index]}
          onPress={
            () => console.log(messages)
            // navigation.navigate('Chat', {senderUid: messages[index]?.uid})
          }
        />
      ))}
    </View>
  );
}
export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
