import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Modal, Dimensions} from 'react-native';
import Header2 from '../../components/headers/Header2';
import InputField2 from '../../components/inputFields/InputField2';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useSelector} from 'react-redux';
import Button4 from '../../components/buttons/button4';
import colors from '../../globalStyles/colorScheme';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
  searchUsersOnMapPostcode,
  searchUsersOnMapArea,
} from '../../firebase/getFunctions';

// const getGeohashRange = (
//   latitude,
//   longitude,
//   distance, // KM
// ) => {
//   // 37.400362038352526, -122.03442819346913  //5 km awway location point
//   const latitudeDegres = 0.021731561647474; // degrees latitude per km
//   const longitudeDegres = 0.04949380653087; // degrees longitude per km
// };

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

  const [searchedUser, setSearchedUser] = useState([]);
  const [searchModal, setSearchModal] = useState(false);
  const [searchBarText, setSearchBarText] = useState('');

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
      <InputField2
        title={'Enter Your Suburb Or Postcode'}
        value={searchBarText}
        // onChangeText={() => {
        //   setSearchModal(true);
        // }}
        onFocus={() => {
          setSearchModal(true);
        }}
        onChangeText={() => {
          setSearchModal(true);
        }}
        // onSubmitEditing={event => {
        //   // console.log(typeof event.nativeEvent.text);
        // searchUsersOnMap(event.nativeEvent.text).then(data => {
        //   console.log('searchUsersOnMap', data);
        //   setSearchedUser(data);
        // });
        // }}
      />

      {/* GooglePlacesAutocomplete */}
      <Modal visible={searchModal} animationType={'slide'}>
        <View
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
            styles={{
              textInputContainer: {marginTop: '5%'},
              textInput: {
                height: Dimensions.get('window').height / 13,
                color: '#5d5d5d',
                fontSize: 16,
                backgroundColor: '#F4F4F4',
                borderRadius: 48,
              },
              predefinedPlacesDescription: {
                color: colors.primary,
              },
            }}
          />
        </View>
      </Modal>
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
      {/* temp View for spacing */}
      <View style={{margin: '1%'}} />
      {/* Map */}

      <View style={{flex: 1}}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          mapType={'standard'}
          // showsUserLocation={true}
          region={{
            latitude: parseFloat(location.Latitude),
            longitude: parseFloat(location.Longitude),
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
              //resizeMode={'contain'}
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
              }}></Marker>
          ))}

          <Marker
            coordinate={{
              latitude: 37.4418834,
              longitude: -122.1430195,
            }}></Marker>

          {/* <MapView.Circle
            center={{
              latitude: parseFloat(location.Latitude),
              longitude: parseFloat(location.Longitude),
            }}
            radius={distance[1][1] ? 10 * 1000 : 5 * 1000}
            strokeWidth={2}
            strokeColor={'#05d1ff'}
            fillColor="rgba(37, 186, 250, 0.4)"
          /> */}
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
