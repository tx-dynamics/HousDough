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

const MessagesCard = ({onPress, Data}) => (
  <Pressable onPress={onPress}>
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{
            uri: 'https://cdn.iconscout.com/icon/free/png-256/account-avatar-profile-human-man-user-30448.png',
          }}
          resizeMode={'contain'}
          style={styles.image}
        />
        <View>
          <Text style={styles.text1}>{Data.userName}</Text>
          <Text style={styles.text2}>{'Will do super, thank you'}</Text>
        </View>
      </View>

      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.text2}>{'08:43'}</Text>

        <View style={{...styles.notification, opacity: 0 ? 0 : 1}}>
          <Text style={styles.text3}>{3}</Text>
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
