import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ImageBackground,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

import colorScheme from '../globalStyles/colorScheme';

const VideoCard = ({onPress, VideoUri}) => (
  <VideoPlayer
    repeat={true}
    paused={true}
    // resizeMode={'contain'}
    disableBack={true}
    disableVolume={true}
    controls={true}
    source={{
      uri: VideoUri,
    }}
    style={styles.container}
    tapAnywhereToPause={true}
  />
);
export default VideoCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 175,
    alignSelf: 'center',
    backgroundColor: colorScheme.black,
    marginBottom: '5%',
    borderRadius: 8,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  text1: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  text2: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
});
