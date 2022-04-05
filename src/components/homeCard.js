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

const HomeCard = ({item}) => (
  <ImageBackground
    source={item[1]}
    style={styles.container}
    resizeMode={'stretch'}>
    <Image
      source={require('../../assets/icons/play.png')}
      resizeMode={'contain'}
      style={{width: '15%'}}
    />
  </ImageBackground>
);
export default HomeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 185,
    alignSelf: 'center',
    backgroundColor: 100,
    marginVertical: '3%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
