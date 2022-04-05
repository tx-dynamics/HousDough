import React from 'react';
import {View, Text, StyleSheet, Pressable, Modal} from 'react-native';
import colors from '../../globalStyles/colorScheme';
import Button5 from '../buttons/button5';

const ImagePickerModal = ({
  Visibility,
  onPressCamera,
  onPressGallery,
  onPressCancel,
}) => (
  <Modal visible={Visibility} transparent={true} animationType={'slide'}>
    <View style={styles.container}>
      <View style={styles.modal}>
        {/* Use the Camera */}
        <Button5
          text={'Use the camera'}
          icon={require('../../../assets/icons/camera.png')}
          onPress={onPressCamera}
        />
        {/* Gallery */}
        <Button5
          text={'Gallery'}
          light={true}
          icon={require('../../../assets/icons/image_icon.png')}
          onPress={onPressGallery}
        />
        {/* cancel */}
        <Pressable onPress={onPressCancel}>
          <Text style={styles.text1}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);
export default ImagePickerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 100,
  },
  modal: {
    backgroundColor: 'white',
    width: '100%',
    height: '35%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: '5%',
    justifyContent: 'space-evenly',
  },
  text1: {
    color: colors.black,
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    alignSelf: 'center',
  },
});
