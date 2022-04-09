import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import Header3 from '../../components/headers/Header3';

import HomeCard from '../../components/homeCard';
import colors from '../../globalStyles/colorScheme';
import Button4 from '../../components/buttons/button4';

function OthersProfile({navigation}) {
  return (
    <View style={styles.container}>
      <Header3
        onPress={() => navigation.navigate('Home')}
        text={'Employers Profile'}
      />
      <ScrollView>
        {/* Top Video */}
        <View style={{marginHorizontal: '5%'}}>
          <HomeCard
            Home={false}
            ImageSource={require('../../../assets/images/img6.png')}
          />
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* Profile Image */}
            {0 ? (
              <View style={styles.ProfileImage}>
                <Text style={styles.text1}>AZ</Text>
              </View>
            ) : null}
            <View>
              <Text style={styles.text2}>Employer Name</Text>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../../assets/icons/pin.png')}
                  resizeMode={'contain'}
                  style={{
                    width: '9%',
                    height: 20,
                    marginRight: '5%',
                  }}
                />
                <Text style={styles.text3}>Location</Text>
              </View>
            </View>
          </View>
          {/* Message Icon */}
          <Pressable
            onPress={() =>
              navigation.navigate('Chat', {screen: 'OthersProfile'})
            }>
            <Image
              source={require('../../../assets/icons/message2.png')}
              resizeMode={'contain'}
              style={{width: 52, height: 52}}
            />
          </Pressable>
        </View>

        {/* About Section */}
        <View style={{paddingHorizontal: '5%', marginBottom: '5%'}}>
          <Text style={styles.text2}>About</Text>
          <Text style={styles.text4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
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
  },
  text3: {
    color: '#4B4B4B',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  text4: {
    color: colors.black,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
});
