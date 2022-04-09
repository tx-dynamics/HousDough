import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Header3 from '../../components/headers/Header3';
import ChatCard from '../../components/chatCard';
import ChatSendButton from '../../components/buttons/chatSendButton';

function Chat({navigation, route}) {
  const [sms, setSms] = useState([
    ['Hello Man, How are you!', '8 minutes ago'],
    ['Im fine how about You? What are you doing?', '8 minutes ago'],
    ['So whats the plan for today', '5 minutes ago'],
  ]);
  const {screen} = route.params;
  return (
    <View style={styles.container}>
      <Header3 onPress={() => navigation.navigate(screen)} text={'Chat'} />
      <View style={{marginHorizontal: '5%', flex: 1}}>
        {sms.map((item, index) => (
          <ChatCard
            userMessage={index % 2 == 0 ? true : false}
            index={index}
            key={index}
          />
        ))}
      </View>
      <ChatSendButton />
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
