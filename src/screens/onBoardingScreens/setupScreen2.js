import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {showMessage, hideMessage} from 'react-native-flash-message';
import Header1 from '../../components/headers/Header1';
import Button3 from '../../components/buttons/button3';
import colors from '../../globalStyles/colorScheme';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerModal from '../../components/Modals/imagePickerModal';
import {UserContext} from '../../contextApi/contextApi';

function SetupScreen2({navigation}) {
  // Image picker modal viability state
  const [ModalVisibility, setmodalVisibility] = useState(false);
  const {userType, setUserType} = useContext(UserContext);
  const {videoLink} = useSelector(state => state.onBoadrding);

  //To Open Camera

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      mediaType: 'video',
    })
      .then(image => {
        console.log(image);
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
      multiple: true,
      mediaType: !userType ? 'video' : 'any',
    })
      .then(images => {
        console.log(images);
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
        text={!userType ? 'Add Your Profile Video' : 'Add Your Profile Images'}
        Screen={2}
      />
      {/* Image Videos Display Placeholder */}
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
      {/* Bottom Text */}
      <View style={{flexWrap: 'wrap', width: '100%'}}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor.
        </Text>
      </View>
      {/* Next Arrow Button */}
      <View style={{position: 'absolute', bottom: '10%', right: '5%'}}>
        <Button3
          onPress={() => {
            if (videoLink == null)
              showMessage({
                message: `Video Required`,
                description: `Please Upload A Video To Continue!`,
                type: 'success',
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
    marginVertical: '5%',
  },
  text: {
    color: colors.black,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    width: '100%',
  },
});
