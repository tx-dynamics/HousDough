import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native';
import Header3 from '../../components/headers/Header3';
import HomeCard from '../../components/homeCard';
import colors from '../../globalStyles/colorScheme';
import Button4 from '../../components/buttons/button4';
import VideoCard from '../../components/videoCard';
import { UserContext } from '../../contextApi/contextApi';
import Geocoder from 'react-native-geocoding';
import { firebase } from '@react-native-firebase/firestore';
import { showMessage } from 'react-native-flash-message';

function OthersProfile({ navigation, route }) {
  const { userType } = useContext(UserContext);
  const { userData } = route.params;

  const [location, setLocation] = useState('');

  Geocoder.init('AIzaSyD3BToDj_z_1ZLuhdDSURQplj3_9IgQSis'); // use a valid API key

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
        // console.log(Area, City);
        return { Area, City };
      })
      .catch(error => console.log('Geocoder', error));

    setLocation(`${result?.Area}, ${result?.City}`);
  };

  useEffect(() => {
    console.log(userData);
    getAreaAndCity(userData.location.Latitude, userData.location.Longitude);
  }, []);
  const deleteUser = async () => {
    firebase
      .auth().currentUser.delete()
      .then(() => {
        showMessage('Successfully deleted user')
      })
      .catch((error) => {
        showMessage('Please login again to delete this user')
      });

  }

  return (
    <View style={styles.container}>
      <Header3
        onPress={() => navigation.navigate('Home')}
        text={`Employer's Profile`}
        onPressTwo={() => Alert.alert('Delte user', 'Are you sure you want to delete this user',
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Delete", onPress: () => deleteUser() }
          ]
        )}
      />
      <ScrollView>
        {/* Top Video */}
        <View style={{ marginHorizontal: '5%' }}>
          <VideoCard VideoUri={userData?.VideoLink} />
        </View>
        {/* Image and Info */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: '5%',
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Profile Image */}

            <View style={styles.ProfileImage}>
              <Text style={styles.text1}>AZ</Text>
            </View>

            <View>
              <Text numberOfLines={1} style={styles.text2}>
                {userData?.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../../../assets/icons/pin.png')}
                  resizeMode={'contain'}
                  style={{
                    width: 10,
                    height: 20,
                    marginRight: '5%',
                  }}
                />
                <Text nu style={styles.text3} numberOfLines={2}>
                  {location}
                </Text>
              </View>
            </View>
          </View>
          {/* message2 */}
          <Pressable
            onPress={() =>
              navigation.navigate('Chat', { senderUid: userData.uid })
            }>
            <Image
              source={require('../../../assets/icons/message2.png')}
              resizeMode={'contain'}
              style={{ width: 50, height: 50 }}
            />
          </Pressable>
        </View>

        {/* About Section */}
        <View style={{ paddingHorizontal: '5%', marginBottom: '5%' }}>
          <Text style={styles.text2}>About</Text>
          <Text style={styles.text4}>{userData?.AboutYou}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
export default OthersProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ProfileImage: {
    backgroundColor: '#C4C4C4',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '5%',
  },
  text1: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
  },
  text2: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    width: Dimensions.get('window').width * 0.45,
  },
  text3: {
    color: '#4B4B4B',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    width: Dimensions.get('window').width * 0.45,
  },
  text4: {
    color: colors.black,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
});
