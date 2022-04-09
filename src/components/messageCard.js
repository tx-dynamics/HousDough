import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import colorScheme from '../globalStyles/colorScheme';

const MessagesCard = ({Data, onPress}) => (
  <Pressable onPress={onPress}>
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image source={Data[4]} style={styles.image} />
        <View>
          <Text style={styles.text1}>{Data[0]}</Text>
          <Text style={styles.text2}>{Data[1]}</Text>
        </View>
      </View>

      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.text2}>{Data[2]}</Text>

        <View style={{...styles.notification, opacity: Data[3] == 0 ? 0 : 1}}>
          <Text style={styles.text3}>{Data[3]}</Text>
        </View>
      </View>
    </View>
  </Pressable>
);

export default MessagesCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 100,
    marginRight: '5%',
  },
  text1: {
    color: colorScheme.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  text2: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  text3: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  notification: {
    backgroundColor: colorScheme.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    height: 17,
    width: 17,
    borderRadius: 50,
  },
});
