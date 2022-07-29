import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Header2 from '../../components/headers/Header2';
import InputField2 from '../../components/inputFields/InputField2';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useSelector} from 'react-redux';

import Button4 from '../../components/buttons/button4';
import colors from '../../globalStyles/colorScheme';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';

function Search() {
  const {
    location,
    email,
    userName,
    Postcode,
    VideoLink,
    Skills,
    AboutYou,
    PastExperience,
    Reference,
  } = useSelector(state => state.userProfile);
  console.log('Search', location);
  const [distance, setDistance] = useState([
    ['5 Km', true],
    ['10 Km', false],
  ]);
  // This function is to change state of skills buttons on toggle
  const changeStatus = ArrayIndex => {
    const temp = [];

    distance.forEach((element, index) => {
      ArrayIndex !== index
        ? temp.push([element[0], (element[1] = false)])
        : temp.push([element[0], (element[1] = !element[1])]);
    });
    setDistance(temp);
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Header2 text={'Search'} />
      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.text2}>
          In order for you to find the best workers in your area please enter
          your venue's postcode. You will be able to see hospitality workers who
          live nearby or are happy to commute
        </Text>
      </View>

      {/* Search Bar */}
      <InputField2 title={'Enter Your Suburb Or Postcode'} />
      {/* Area Radius Filter */}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingHorizontal: '5%',
          marginVertical: '3%',
        }}>
        {distance.map((item, index) => (
          <Button4
            key={index}
            text={item[0]}
            searchScreen={true}
            selected={item[1]}
            onPress={() => changeStatus(index)}
          />
        ))}
      </View>
      {/* Map */}

      <View style={{flex: 1}}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          mapType={'standard'}
          showsUserLocation={true}
          region={{
            latitude: parseInt(location.Latitude),
            longitude: parseInt(location.Longitude),
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}>
          <Marker
            coordinate={{
              latitude: parseInt(location.Latitude),
              longitude: parseInt(location.Longitude),
            }}>
            <Image
              source={require('../../../assets/images/p5.jpg')}
              //resizeMode={'contain'}
              style={styles.markerIcon}
            />
          </Marker>
          {/* 0.3621936 for 5km */}
          {/* <Marker
            coordinate={{
              latitude: parseInt(location.Latitude) + 0.3621936,
              longitude: parseInt(location.Longitude),
            }}>
            <Image
              source={require('../../../assets/images/p5.jpg')}
              //resizeMode={'contain'}
              style={styles.markerIcon}
            />
          </Marker> */}
          <MapView.Circle
            center={{
              latitude: parseInt(location.Latitude),
              longitude: parseInt(location.Longitude),
            }}
            radius={distance[1][1] ? 10 * 1000 : 5 * 1000}
            strokeWidth={2}
            strokeColor={'#05d1ff'}
            fillColor="rgba(37, 186, 250, 0.4)"
          />
        </MapView>
      </View>
    </KeyboardAwareScrollView>
  );
}
export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerIcon: {
    height: 50,
    width: 50,
    borderRadius: 40,
  },
  textContainer: {
    backgroundColor: '#FAFAFA',
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
    padding: '3%',
    flexDirection: 'row',
    borderColor: '#CDCDCD',
    borderWidth: 1,
    marginVertical: '2%',
    alignSelf: 'center',
  },
  text2: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textAlign: 'center',
  },
});
