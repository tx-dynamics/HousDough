import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from 'react-native';
import {useDispatch} from 'react-redux';
import colors from '../../globalStyles/colorScheme';
import Inputfield from '../inputFields/InputField';
import Inputfield4 from '../inputFields/InputField4';

import Button2 from '../buttons/button2';
import {
  setName,
  setAboutYou,
  setPastExperience,
  setReference,
} from '../../redux/features/userSlice';

const ConfirmationModal = ({
  Visibility,
  onPress,
  onChangeText,
  forgotEmail,
  onPressYes,
  onPressNo,
}) => {
  return (
    <Modal visible={Visibility} transparent={true} animationType={'fade'}>
      <Pressable onPress={onPress} style={styles.container}>
        <View style={styles.modal}>
          {/* top Text */}
          <Text style={styles.text}>Are you sure you want to log out?</Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {/* Yes */}
            <View style={{width: '45%'}}>
              <Button2 text={'Yes'} onPress={onPressYes} />
            </View>
            {/* No */}
            <View style={{width: '45%'}}>
              <Button2 text={'No'} onPress={onPressNo} />
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};
export default ConfirmationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'white',
    width: '85%',
    height: Dimensions.get('window').height * 0.3,
    borderRadius: 20,
    paddingHorizontal: '5%',
    justifyContent: 'space-evenly',
    paddingVertical: '5%',
  },
  text: {
    color: colors.primary,
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    alignSelf: 'center',
    marginVertical: '5%',
  },
  titleText: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
