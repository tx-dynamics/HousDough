import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import Header3 from '../../components/headers/Header3';
import MessagesCard from '../../components/messageCard';
import {getConversations} from '../../firebase/getFunctions';
import colors from '../../globalStyles/colorScheme';

function Messages({navigation}) {
  // Message Dummy Data
  const isFocused = useIsFocused();
  const {uid} = useSelector(state => state.userProfile);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // This function is to get all the conversations

  const getConversations = async uid => {
    // console.log('getConversations', uid);

    const temp = [];
    try {
      await firestore()
        .collection('chats')
        .doc(uid)
        .get()
        .then(res => {
          let _Data = res.data();

          //Return null in case of no conversations
          if (!_Data) return;

          _Data = Object.entries(_Data);

          _Data.forEach((item, index) => {
            const _Messages = item[1];
            // console.log('==++==++==>>', _Messages);
            const unseenMessages = item[1].filter(
              e => e.unseen === true && e.user._id === 2,
            ).length;
            const lastMessages = _Messages[_Messages.length - 1];
            firestore()
              .collection('Users')
              .doc(item[0])
              .get()
              .then(_res => {
                const userData = _res.data();
                temp.push({
                  userName: userData.name,
                  lastMessages,
                  unseenMessages,
                  id: item[0],
                });
                if (index == _Data.length - 1) {
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
    getConversations(uid).then(() => setIsLoading(false));

    return () => {
      setIsLoading(true);
    };
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <Header3
        onPress={() => navigation.navigate('BottomTabNavigator')}
        text={'Messages'}
      />

      {isLoading ? (
        <ActivityIndicator size={'small'} color={colors.secondary} />
      ) : messages.length > 0 ? (
        <ScrollView>
          {messages.map((item, index) => (
            <MessagesCard
              key={index}
              Data={messages[index]}
              onPress={() =>
                navigation.navigate('Chat', {
                  senderUid: messages[index].id,
                })
              }
            />
          ))}
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,

            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: '40%',
          }}>
          <Image
            source={require('../../../assets/icons/Messages-bro.png')}
            resizeMode="contain"
            style={{height: '50%', width: '90%'}}
          />
          <Text style={styles.text1}>You Have No Messages!</Text>
        </View>
      )}
    </View>
  );
}
export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text1: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    // width: '100%',
  },
});
