import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {useSelector, useDispatch} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import Header1 from '../../components/headers/Header1';
import colors from '../../globalStyles/colorScheme';
import Button3 from '../../components/buttons/button3';
import {UserContext} from '../../contextApi/contextApi';
import LoaderModal from '../../components/Modals/loaderModal';
import {setLocation, setPostCode} from '../../redux/features/userSlice';

const getAreaAndCity = async (currentLatitude, currentLongitude) => {
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
      console.log(Area, City);
      return {Area, City};
    })
    .catch(error => console.log('Geocoder', error));

  return result;
};

function SetupScreen1({navigation}) {
  const {userType} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState('');
  const userDispatch = useDispatch();
  const {location, Postcode, uid} = useSelector(state => state.userProfile);

  Geocoder.init('AIzaSyD3BToDj_z_1ZLuhdDSURQplj3_9IgQSis'); // use a valid API key

  useEffect(() => {
    console.log('setupScreen 1');
    console.log('userType', userType);
  }, []);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Header1 text={'Share Your Location'} Screen={1} />
      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.text2}>
          In order for you to find the best work in your area please enter your
          postcode and change the radius to how far you are willing to travel.
          Venue managers in those areas will also be able to see your profile
        </Text>
      </View>

      {/* Location Card */}
      <Pressable
        onPress={() => {
          setIsLoading(true);
          Geolocation.getCurrentPosition(
            position => {
              //getting the Longitude from the location json
              const currentLongitude = JSON.stringify(
                position.coords.longitude, //
              );
              //getting the Latitude from the location json
              const currentLatitude = JSON.stringify(position.coords.latitude);
              userDispatch(
                setLocation({
                  Latitude: currentLatitude,
                  Longitude: currentLongitude,
                }),
              );

              getAreaAndCity(currentLatitude, currentLongitude).then(result => {
                setAddress(`${result.Area}, ${result.City}`);
                showMessage({
                  message: `Location Set`,
                  description: `Your Location Is Set ${result.Area}, ${result.City}`,
                  type: 'success',
                  duration: 3000,
                });
              });

              setIsLoading(false);
            },
            error => {
              alert(error.message);
              setIsLoading(false);
            },
            {
              enableHighAccuracy: false,
              timeout: 5000,
              maximumAge: 10000,
            },
          );
        }}
        style={styles.locationCard}>
        <Image
          source={require('../../../assets/icons/location.png')}
          resizeMode={'contain'}
          style={styles.locationIcon}
        />
        <Text style={styles.text}>
          {address
            ? address
            : userType
            ? 'Add Your Venue Location'
            : 'Use My Current Location'}
        </Text>
      </Pressable>
      {/* Enter Your Postcode */}
      {!userType ? (
        <View style={styles.locationCard}>
          <TextInput
            style={styles.text}
            placeholder="Enter Your Postcode"
            value={Postcode}
            onChangeText={txt => userDispatch(setPostCode({Postcode: txt}))}
          />
        </View>
      ) : null}
      {/* Next Arrow Button */}
      <View style={{position: 'absolute', bottom: '10%', right: '5%'}}>
        <Button3
          onPress={() => {
            if (location.Latitude == null) {
              showMessage({
                message: `Location Required `,
                description: `Please Set Location To Continue!`,
                type: 'info',
                duration: 3000,
              });
            } else if (Postcode == null && userType == 0)
              showMessage({
                message: `Postcode Required `,
                description: `Please Enter Postcode!`,
                type: 'info',
                duration: 3000,
              });
            else navigation.navigate('SetupScreen2');
          }}
        />
      </View>
      <LoaderModal Visibility={isLoading} />
    </KeyboardAwareScrollView>
  );
}

export default SetupScreen1;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '5%',
    backgroundColor: 'white',
  },
  locationCard: {
    backgroundColor: '#FAFAFA',
    height: 63,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    borderColor: '#CDCDCD',
    borderWidth: 1,
    marginVertical: '2%',
  },
  locationIcon: {
    width: '8%',
    marginRight: '2%',
  },
  text: {
    color: colors.black,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    width: '100%',
  },
  textContainer: {
    backgroundColor: '#FAFAFA',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    padding: '3%',
    flexDirection: 'row',
    borderColor: '#CDCDCD',
    borderWidth: 1,
    marginVertical: '2%',
  },
  text2: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textAlign: 'center',
  },
});
