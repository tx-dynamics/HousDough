import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Header3 from '../../components/headers/Header3';
import MessagesCard from '../../components/messageCard';

function Messages({navigation}) {
  // Message Dummy Data

  const [messages, setMessages] = useState([
    [
      'Danny Hopkins',
      'dannylove@gmail.com',
      '08:43',
      8,
      require(`../../../assets/images/p1.jpg`),
    ],
    [
      'Bobby Langford',
      'Will do super, thank you',
      'Tue',
      5,
      require(`../../../assets/images/p3.jpg`),
    ],
    [
      'William Wiles',
      'Uploaded File',
      'Sun',
      0,
      require(`../../../assets/images/p2.jpg`),
    ],
    [
      'James Edelen',
      'Here is another tutorial, if you',
      '23 Mar',
      0,
      require(`../../../assets/images/p6.jpg`),
    ],
  ]);
  return (
    <View style={styles.container}>
      <Header3
        onPress={() => navigation.navigate('BottomTabNavigator')}
        text={'Messages'}
      />
      {messages.map((item, index) => (
        <MessagesCard
          key={index}
          Data={item}
          onPress={() => navigation.navigate('Chat', {screen: 'Messages'})}
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
