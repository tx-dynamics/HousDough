import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
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
      {/* Video Player */}
      {/* <Video
        source={{
          uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1',
        }}
        style={styles.backgroundVideo}
      /> */}
    </View>
  );
}
export default OthersProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
