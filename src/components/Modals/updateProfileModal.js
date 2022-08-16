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

const UpdateProfileModal = ({
  Visibility,
  onPress,
  userName,
  AboutYou,
  PastExperience,
  Reference,
  onPress2,
}) => {
  const userDispatch = useDispatch();

  return (
    <Modal visible={Visibility} transparent={true} animationType={'fade'}>
      <Pressable onPress={onPress2} style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.text}>Update Your Profile</Text>
          <ScrollView>
            <Text style={styles.titleText}>Name</Text>
            <Inputfield
              ShowPassword={true}
              value={userName}
              title={'Name'}
              onChangeText={txt => userDispatch(setName({userName: txt}))}
            />
            <Inputfield4
              ShowPassword={true}
              value={AboutYou}
              title={'About You'}
              onChangeText={txt => userDispatch(setAboutYou({AboutYou: txt}))}
            />
            {PastExperience !== '' && (
              <Inputfield4
                ShowPassword={true}
                value={PastExperience}
                title={'Past Experience'}
                onChangeText={txt =>
                  userDispatch(setPastExperience({PastExperience: txt.trim()}))
                }
              />
            )}
            {Reference !== '' && (
              <Inputfield4
                ShowPassword={true}
                value={Reference}
                title={'Reference'}
                onChangeText={txt =>
                  userDispatch(setReference({Reference: txt.trim()}))
                }
              />
            )}
          </ScrollView>
          <Button2 onPress={onPress} text={'Update'} />
        </View>
      </Pressable>
    </Modal>
  );
};
export default UpdateProfileModal;

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
    height: Dimensions.get('window').height * 0.6,
    borderRadius: 20,
    paddingHorizontal: '5%',
    // justifyContent: 'space-evenly',
    paddingVertical: '5%',
  },
  text: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    alignSelf: 'center',
    marginVertical: '5%',
  },
  titleText: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
});
