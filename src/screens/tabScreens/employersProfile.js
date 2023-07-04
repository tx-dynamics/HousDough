import React, { useContext, useState, useEffect } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import Geocoder from 'react-native-geocoding';
import { showMessage, hideMessage } from 'react-native-flash-message';

import Header3 from '../../components/headers/Header3';
import HomeCard from '../../components/homeCard';
import colors from '../../globalStyles/colorScheme';
import Button4 from '../../components/buttons/button4';
import VideoCard from '../../components/videoCard';
import { UserContext } from '../../contextApi/contextApi';
import UpdateProfileModal from '../../components/Modals/updateProfileModal';
import { updateProfile } from '../../firebase/updateFuctions';
import { firebase } from '@react-native-firebase/firestore';

function EmployersProfile({ navigation }) {
  const { userType } = useContext(UserContext);
  const [updatingModal, setupdatingModal] = useState(false);
  const [address, setAddress] = useState('Location');

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

    return `${result?.Area}, ${result?.City}`;
  };

  useEffect(() => {
    getAreaAndCity(location?.Latitude, location?.Longitude).then(data => {
      setAddress(data);
    });
  });

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
          <VideoCard VideoUri={VideoLink} />
        </View>
        {/* Image and Info */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
            alignItems: 'center',
            marginBottom: '5%',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Profile Image */}

            <View>
              <Text style={styles.text2}>{userName}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={require('../../../assets/icons/pin.png')}
                  resizeMode={'contain'}
                  style={{
                    width: 10,
                    height: 20,
                    marginRight: '5%',
                  }}
                />
                <Text numberOfLines={2} style={styles.text3}>
                  {address}
                </Text>
              </View>
            </View>
          </View>
          <Pressable onPress={() => setupdatingModal(true)}>
            <Image
              source={require('../../../assets/icons/pencil.png')}
              resizeMode={'contain'}
              style={{ width: 30, height: 30 }}
            />
          </Pressable>
        </View>

        {/* About Section */}
        <View style={{ paddingHorizontal: '5%', marginBottom: '5%' }}>
          <Text style={styles.text2}>About</Text>

          <Text style={styles.text4}>{AboutYou}</Text>
        </View>
      </ScrollView>
      {/* updating Modal */}
      <UpdateProfileModal
        Visibility={updatingModal}
        placeholder={'Name'}
        userName={userName}
        AboutYou={AboutYou}
        PastExperience={PastExperience}
        Reference={Reference}
        onPress2={() => {
          setupdatingModal(false);
        }}
        onPress={() => {
          setupdatingModal(false);
          console.log('Update');
          updateProfile(userName, AboutYou, PastExperience, Reference).then(
            res => {
              console.log(res);
              if (res) {
                showMessage({
                  message: `Profile Updated`,
                  description: `${userName} Your profile is updated Successfully!`,
                  type: 'success',
                  duration: 3000,
                });
              } else {
                showMessage({
                  message: `Profile Updated`,
                  description: `Something Went Wrong`,
                  type: 'danger',
                  duration: 3000,
                });
              }
            },
          );
        }}
      />
    </View>
  );
}
export default EmployersProfile;

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
  },
  text3: {
    color: '#4B4B4B',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    width: Dimensions.get('window').width * 0.7,
  },
  text4: {
    color: colors.black,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
});
