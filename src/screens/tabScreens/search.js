import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  Dimensions,
  Pressable,
  ImageBackground,
} from 'react-native';
import {Svg, Image as ImageSvg} from 'react-native-svg';

import Header2 from '../../components/headers/Header2';
import InputField2 from '../../components/inputFields/InputField2';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useSelector} from 'react-redux';
import Button4 from '../../components/buttons/button4';
import colors from '../../globalStyles/colorScheme';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Circle,
  Callout,
} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
  searchUsersOnMapPostcode,
  searchUsersOnMapArea,
} from '../../firebase/getFunctions';

function Search({navigation}) {
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

  const [searchedUser, setSearchedUser] = useState([]);
  const [searchModal, setSearchModal] = useState(false);
  const [searchBarText, setSearchBarText] = useState('');
  const [focusPoint, setFocusPoint] = useState(location);

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
      <InputField2
        title={'Enter Your Suburb Or Postcode'}
        value={searchBarText}
        onFocus={() => {
          setSearchModal(true);
        }}
        onChangeText={() => {
          setSearchModal(true);
        }}
      />

      {/* GooglePlacesAutocomplete */}
      <Modal visible={searchModal} animationType={'slide'}>
        <Pressable
          onPress={() => setSearchModal(false)}
          style={{backgroundColor: 'white', flex: 1, paddingHorizontal: '5%'}}>
          <GooglePlacesAutocomplete
            placeholder="Enter Your Suburb Or Postcode"
            renderDescription={row =>
              row.description || row.formatted_address || row.name
            }
            fetchDetails={true}
            keepResultsAfterBlur={true}
            returnKeyType={'Search'}
            textInputProps={{
              autoFocus: true,
              onSubmitEditing: event => {
                setSearchBarText(event.nativeEvent.text);
                searchUsersOnMapPostcode(event.nativeEvent.text).then(data => {
                  setSearchedUser(data);
                });
                setSearchModal(false);
              },
            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log('=>>>>>>>>>>', details.geometry.location);

              const {lat, lng} = details.geometry.location;
              searchUsersOnMapArea(lat, lng).then(data => {
                // console.log(lat, lng);
                // console.log(data);

                setFocusPoint({Latitude: lat, Longitude: lng});
                setSearchedUser(data);
              });
              setSearchBarText(data.description);
              setSearchModal(false);
            }}
            onFail={error => console.error(error)}
            GooglePlacesSearchQuery={{
              rankby: 'distance',
            }}
            query={{
              key: 'AIzaSyDt9GY0qjMwSFvi-ODbrRJFZg3wCwtZofc',
              language: 'en',
            }}
            styles={styles.googlePlacesSearch}
          />
        </Pressable>
      </Modal>

      {/* temp View for spacing */}
      <View style={{margin: '1%'}} />
      {/* Map */}

      <View style={{flex: 1}}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          mapType={'standard'}
          region={{
            latitude: parseFloat(focusPoint.Latitude),
            longitude: parseFloat(focusPoint.Longitude),
            latitudeDelta: 0.28,
            longitudeDelta: 0.28,
          }}>
          <Marker
            coordinate={{
              latitude: parseFloat(location.Latitude),
              longitude: parseFloat(location.Longitude),
            }}>
            <Image
              source={require('../../../assets/images/p5.jpg')}
              style={styles.markerIcon}
            />
          </Marker>

          {/* Searched Users Markers */}
          {searchedUser?.map((item, index) => (
            <Marker
              onPress={() => console.log(item)}
              key={index}
              coordinate={{
                latitude: parseFloat(item.location.Latitude),
                longitude: parseFloat(item.location.Longitude),
              }}>
              <Callout
                tooltip={true}
                onPress={() => {
                  item.userType
                    ? navigation.navigate('Profile', {userData: item})
                    : navigation.navigate('OthersProfile', {
                        userData: item,
                      });
                }}>
                <View>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.text2}>{item.name}</Text>

                    <Svg
                      width={220}
                      height={90}
                      style={{
                        alignSelf: 'center',
                        backgroundColor: colors.black,
                      }}>
                      <ImageSvg
                        viewBox="0 0 100 100"
                        width={'100%'}
                        height={'100%'}
                        preserveAspectRatio={'xMidYMid meet'}
                        href={{
                          uri: item.thumbnail,
                        }}
                      />
                    </Svg>
                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </Callout>
            </Marker>
          ))}
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
  googlePlacesSearch: {
    textInputContainer: {marginTop: '5%'},
    textInput: {
      height: Dimensions.get('window').height / 13,
      color: '#5d5d5d',
      fontSize: 16,
      backgroundColor: '#F4F4F4',
      borderRadius: 48,
      paddingHorizontal: 30,
    },

    predefinedPlacesDescription: {
      color: colors.primary,
    },
  },
  calloutContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
});
