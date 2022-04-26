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
import Video from 'react-native-video';

const HomeCard = ({item, onPress, UserType, Home, ImageSource}) => (
  <Pressable onPress={onPress}>
    <ImageBackground
      source={ImageSource}
      style={styles.container}
      resizeMode={'stretch'}>
      {Home ? (
        <View style={styles.cardInfo}>
          {UserType ? (
            <Image
              source={require('../../assets/images/p1.jpg')}
              style={{height: 32, width: 32, borderRadius: 50, marginRight: 10}}
            />
          ) : null}
          <View>
            <Text style={styles.text1}>{item[2]}</Text>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/icons/pin.png')}
                style={{
                  height: 10.5,
                  width: 8.75,
                  marginRight: 5,
                  tintColor: 'white',
                  marginBottom: 5,
                }}
              />
              <Text style={styles.text2}>Location Here</Text>
            </View>
          </View>
        </View>
      ) : null}
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
    flex: 1,
    width: '100%',
    height: 175,
    alignSelf: 'center',
    backgroundColor: 100,
    marginBottom: '5%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  text1: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  text2: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
});
