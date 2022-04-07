import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Header2 from '../../components/headers/Header2';
import HomeCard from '../../components/homeCard';
import colors from '../../globalStyles/colorScheme';
import Button4 from '../../components/buttons/button4';

function Profile() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header2 text={'Profile'} />
      <ScrollView>
        {/* Top Video */}
        <View style={{marginHorizontal: '5%'}}>
          <HomeCard item={require('../../../assets/images/img5.png')} />
        </View>
        {/* Image and Info */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* Profile Image */}
            {1 ? (
              <View style={styles.ProfileImage}>
                <Text style={styles.text1}>AZ</Text>
              </View>
            ) : null}
            <View>
              <Text style={styles.text2}>Worker Name</Text>
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
          {/* pencil */}
          <Image
            source={require('../../../assets/icons/pencil.png')}
            resizeMode={'contain'}
            style={{width: '8%', height: 50}}
          />
        </View>
        {/* Skills Section */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: '5%',
            marginVertical: '5%',
          }}>
          <Button4 text={'Cooking'} selected={true} />
          <Button4 text={'Skill Tags'} selected={true} />
        </View>
        {/* About Section */}
        <View style={{paddingHorizontal: '5%', marginBottom: '5%'}}>
          <Text style={styles.text2}>About</Text>
          <Text style={styles.text4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
        {/* Past Experience Section */}
        <View style={{paddingHorizontal: '5%'}}>
          <Text style={styles.text2}>Past Experience</Text>
          <Text style={styles.text4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
export default Profile;

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
