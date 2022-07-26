import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import Video from 'react-native-video';
import Geocoder from 'react-native-geocoding';
import {useSelector} from 'react-redux';
import {showMessage, hideMessage} from 'react-native-flash-message';
import Header3 from '../../components/headers/Header3';
import HomeCard from '../../components/homeCard';
import colors from '../../globalStyles/colorScheme';
import Button4 from '../../components/buttons/button4';
import VideoCard from '../../components/videoCard';
import {UserContext} from '../../contextApi/contextApi';
import UpdateProfileModal from '../../components/Modals/updateProfileModal';
import {updateProfile} from '../../firebase/updateFuctions';

function WorkersProfile({navigation}) {
  const {userType, setUserType} = useContext(UserContext);
  const [address, setAddress] = useState('Location');
  const [updatingModal, setupdatingModal] = useState(false);

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
        return {Area, City};
      })
      .catch(error => console.log('Geocoder', error));

    return `${result?.Area}, ${result?.City}`;
  };

  useEffect(() => {
    console.log(
      '=> Worker Profile',
      location,
      email,
      userName,
      Postcode,
      VideoLink,
      Skills,
      AboutYou,
      PastExperience,
      Reference,
    );
    getAreaAndCity(location?.Latitude, location?.Longitude).then(data => {
      // console.log(data);
      setAddress(data);
    });
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header3
        onPress={() => navigation.navigate('HomeStack')}
        text={'Profile'}
      />
      <ScrollView>
        {/* Top Video */}
        <View style={{marginHorizontal: '5%'}}>
          <VideoCard VideoUri={VideoLink} />
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* Profile Image */}

            <View style={styles.ProfileImage}>
              <Text style={styles.text1}>AZ</Text>
            </View>

            <View>
              <Text style={styles.text2}>{userName}</Text>
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
                  {address}
                </Text>
              </View>
            </View>
          </View>
          {/* pencil */}
          <Pressable onPress={() => setupdatingModal(true)}>
            <Image
              source={require('../../../assets/icons/pencil.png')}
              resizeMode={'contain'}
              style={{width: 30, height: 30}}
            />
          </Pressable>
        </View>
        {/* Skills Section */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: '5%',
            marginVertical: '5%',
          }}>
          {Skills?.map((item, index) => (
            <Button4 key={index} text={item} selected={true} />
          ))}
        </View>
        {/* About Section */}
        <View style={{paddingHorizontal: '5%', marginBottom: '5%'}}>
          <Text style={styles.text2}>About</Text>
          <Text style={styles.text4}>{AboutYou}</Text>
        </View>
        {/* Past Experience Section */}
        <View style={{paddingHorizontal: '5%', marginBottom: '5%'}}>
          <Text style={styles.text2}>Past Experience</Text>
          <Text style={styles.text4}>{PastExperience}</Text>
        </View>
        {/* Reference Section */}
        <View style={{paddingHorizontal: '5%', paddingBottom: '25%'}}>
          <Text style={styles.text2}>Reference</Text>
          <Text style={styles.text4}>{Reference}</Text>
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
export default WorkersProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ProfileImage: {
    backgroundColor: '#C4C4C4',
    width: Dimensions.get('window').width / 5,
    height: Dimensions.get('window').width / 5,
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
    width: Dimensions.get('window').width * 0.45,
  },
  text4: {
    color: colors.black,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
});
