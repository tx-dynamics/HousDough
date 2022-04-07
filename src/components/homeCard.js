import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ImageBackground,
  Image,
} from 'react-native';

const HomeCard = ({item, onPress}) => (
  <Pressable onPress={onPress}>
    <ImageBackground
      source={item}
      style={styles.container}
      resizeMode={'stretch'}>
      <Image
        source={require('../../assets/icons/play.png')}
        resizeMode={'contain'}
        style={{width: '15%'}}
      />
    </ImageBackground>
  </Pressable>
);
export default HomeCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 185,
    alignSelf: 'center',
    backgroundColor: 100,
    marginBottom: '5%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
