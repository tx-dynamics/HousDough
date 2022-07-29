import React, {useEffect, useState} from 'react';
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
import Geocoder from 'react-native-geocoding';

const HomeCard = ({item, onPress}) => {
  const [location, setLocation] = useState('');

  Geocoder.init('AIzaSyD3BToDj_z_1ZLuhdDSURQplj3_9IgQSis'); // use a valid API key

  const getAreaAndCity = async (currentLatitude, currentLongitude) => {
    console.log('getAreaAndCity');
    const result = await Geocoder.from(currentLatitude, currentLongitude)
      .then(json => {
        const addressComponent = json.results[0];

        //Area
        const Area =
          addressComponent.address_components[
            addressComponent.address_components.length - 4
          ].long_name;
        //Area
        const City =
          addressComponent.address_components[
            addressComponent.address_components.length - 3
          ].long_name;
        // console.log(Area, City);
        return {Area, City};
      })
      .catch(error => console.log('Geocoder', error));

    setLocation(`${result?.Area}, ${result?.City}`);
  };

  useEffect(() => {
    getAreaAndCity(item.location.Latitude, item.location.Longitude);
  }, []);

  return (
    <Pressable onPress={onPress}>
      <ImageBackground
        source={{
          uri: item.thumbnail,
        }}
        style={styles.container}
        resizeMode={'stretch'}>
        <View style={styles.cardInfo}>
          {item.UserType ? (
            <Image
              source={require('../../assets/images/p1.jpg')}
              style={{height: 32, width: 32, borderRadius: 50, marginRight: 10}}
            />
          ) : null}
          <View>
            <Text numberOfLines={1} style={styles.text1}>
              {item.name}
            </Text>
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
              <Text numberOfLines={1} style={styles.text2}>
                {location}
              </Text>
            </View>
          </View>
        </View>

        <Image
          source={require('../../assets/icons/play.png')}
          resizeMode={'contain'}
          style={{width: '15%'}}
        />
      </ImageBackground>
    </Pressable>
  );
};
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
