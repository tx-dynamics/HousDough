import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {showMessage, hideMessage} from 'react-native-flash-message';
import Video from 'react-native-video';
import Header1 from '../../components/headers/Header1';
import Button3 from '../../components/buttons/button3';
import colors from '../../globalStyles/colorScheme';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerModal from '../../components/Modals/imagePickerModal';
import {UserContext} from '../../contextApi/contextApi';
import {setVideoLink} from '../../redux/features/userSlice';
import moment from 'moment';

function SetupScreen2({navigation}) {
  // Image picker modal viability state
  const [ModalVisibility, setmodalVisibility] = useState(false);
  const {userType} = useContext(UserContext);
  const {VideoLink, email, location} = useSelector(state => state.userProfile);
  const userDispatch = useDispatch();

  useEffect(() => {
    console.log('setupScreen 2');
    console.log('VideoLink', userType, location, VideoLink);
  }, []);

  //To Open Camera

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      mediaType: 'video',
    })
      .then(image => {
        console.log('++++', image);
        if (image.duration / 1000 > 45) {
          showMessage({
            message: `Video Duration Exceeds`,
            description: `Video Lenght is ${moment(image.duration).format(
              'mm:ss',
            )}. Video Lenght Cannot Exceeds 45 Seconds. Please upload Again`,
            type: 'danger',
            duration: 5000,
          });
          return;
        }
        userDispatch(setVideoLink({VideoLink: image.path}));
        showMessage({
          message: 'Media Selected',
          type: 'success',
          duration: 3000,
        });
      })
      .catch(error => {
        console.log('error', error);
        showMessage({
          message: error.message,
          type: 'danger',
          duration: 3000,
        });
      });
  };
  //To Open Gallery
  const openGallery = () => {
    ImagePicker.openPicker({
      multiple: false,
      mediaType: 'video',
    })
      .then(image => {
        console.log('openGallery', image);
        if (image.duration / 1000 > 45) {
          showMessage({
            message: `Video Duration Exceeds`,
            description: `Video Lenght is ${moment(image.duration).format(
              'mm:ss',
            )}. Video Lenght Cannot Exceeds 45 Seconds. Please upload Again`,
            type: 'danger',
            duration: 5000,
          });
          return;
        }
        userDispatch(
          setVideoLink({
            VideoLink: image.path,
          }),
        );
        showMessage({
          message: 'Media Selected',
          type: 'success',
          duration: 3000,
        });
      })
      .catch(error => {
        console.log(error);
        showMessage({
          message: error.message,
          type: 'danger',
          duration: 3000,
        });
      });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header1
        // text={!userType ? 'Add Your Profile Video' : 'Add Your Profile Images'}
        text={
          'Hosdough was designed to show Venue Managers a little snippet of your personality because we know that this is the most important part of customer service. Skills and experience help but they can always be taught'
        }
        Screen={2}
      />
      {/* Image Videos Display Placeholder */}
      {VideoLink == null ? (
        <Pressable
          onPress={() => setmodalVisibility(true)}
          style={styles.imagePlaceholder}>
          <Image
            source={require('../../../assets/icons/plus.png')}
            resizeMode={'contain'}
            style={{
              width: '13%',
            }}
          />
        </Pressable>
      ) : (
        <View
          style={{...styles.imagePlaceholder, backgroundColor: colors.black}}>
          <Video
            repeat={true}
            paused={true}
            resizeMode={'contain'}
            controls={true}
            source={{
              uri: VideoLink,
            }} // Can be a URL or a local file.
            onBuffer={() => console.log('buffer')}
            style={{width: '100%', height: '100%'}}
          />
        </View>
      )}
      {/* Bottom Text */}
      <View style={{flexWrap: 'wrap', width: '100%'}}>
        <Text style={styles.text}>
          {`Film a short 45 second video by pressing the record button or if you aren't great on the spot pre record one and upload it later. Venues will not be shown your profile until you upload a video.

1) Include your name
2) Favourite food or beverage
3) Why you love or want hospo work
`}
        </Text>
      </View>
      {/* Next Arrow Button */}
      <View style={{position: 'absolute', bottom: '10%', right: '5%'}}>
        <Button3
          onPress={() => {
            if (VideoLink == null)
              showMessage({
                message: `Video Required`,
                description: `Please Upload A Video To Continue!`,
                type: 'info',
                duration: 3000,
              });
            else navigation.navigate('SetupScreen3');
          }}
        />
      </View>
      {/* Image Picker Modal */}
      <ImagePickerModal
        Visibility={ModalVisibility}
        onPressCamera={() => {
          openCamera();
          setmodalVisibility(false);
        }}
        onPressGallery={() => {
          openGallery();
          setmodalVisibility(false);
        }}
        onPressCancel={() => setmodalVisibility(false)}
      />
    </View>
  );
}

export default SetupScreen2;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    backgroundColor: 'white',
    alignItems: 'center',
    flex: 1,
  },
  imagePlaceholder: {
    backgroundColor: '#F0F0F0',
    width: '100%',
    height: '30%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%',
  },
  text: {
    color: colors.black,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    width: '100%',
  },
});
