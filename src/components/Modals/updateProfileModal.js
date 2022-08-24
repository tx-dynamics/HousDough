import React, {useRef} from 'react';
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
import {Formik} from 'formik';
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
import {
  profileUpdateSchemaEmployer,
  profileUpdateSchemaWorker,
} from '../../validations/profileUpdateValidation';
import ErrorText from '../ErrorText';

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
  const formRef = useRef();
  return (
    <Modal visible={Visibility} transparent={true} animationType={'fade'}>
      <Pressable onPress={onPress2} style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.text}>Update Your Profile</Text>
          <ScrollView>
            <Formik
              innerRef={formRef}
              enableReinitialize={true}
              validationSchema={
                PastExperience !== ''
                  ? profileUpdateSchemaWorker
                  : profileUpdateSchemaEmployer
              }
              onSubmit={() => {
                const {AboutYou, PastExperience, Reference, userName} =
                  formRef.current.values;
                userName && userDispatch(setName({userName: userName}));
                AboutYou && userDispatch(setAboutYou({AboutYou: AboutYou}));
                PastExperience &&
                  userDispatch(
                    setPastExperience({PastExperience: PastExperience}),
                  );
                Reference && userDispatch(setReference({Reference: Reference}));
                onPress();
              }}
              initialValues={{
                userName: userName,
                AboutYou: AboutYou,
                PastExperience: PastExperience,
                Reference: Reference,
              }}>
              {formikProps => (
                <>
                  <Text style={styles.titleText}>Name</Text>
                  <Inputfield
                    ShowPassword={true}
                    value={formikProps.values.userName}
                    title={'Name'}
                    onChangeText={formikProps.handleChange('userName')}
                    onBlur={formikProps.handleBlur('userName')}
                  />
                  {/*User name Error */}
                  {formikProps.touched.userName && (
                    <ErrorText text={formikProps.errors.userName} />
                  )}
                  <Inputfield4
                    ShowPassword={true}
                    value={formikProps.values.AboutYou}
                    title={'About You'}
                    onChangeText={formikProps.handleChange('AboutYou')}
                    onBlur={formikProps.handleBlur('AboutYou')}
                  />
                  {/*About You Error */}
                  {formikProps.touched.AboutYou && (
                    <ErrorText text={formikProps.errors.AboutYou} />
                  )}
                  {PastExperience !== '' && (
                    <Inputfield4
                      ShowPassword={true}
                      value={formikProps.values.PastExperience}
                      title={'Past Experience'}
                      onChangeText={formikProps.handleChange('PastExperience')}
                      onBlur={formikProps.handleBlur('PastExperience')}
                    />
                  )}
                  {/*Past Experience Error */}
                  {PastExperience !== '' &&
                    formikProps.touched.PastExperience && (
                      <ErrorText text={formikProps.errors.PastExperience} />
                    )}
                  {Reference !== '' && (
                    <Inputfield4
                      ShowPassword={true}
                      value={formikProps.values.Reference}
                      title={'Reference'}
                      onChangeText={formikProps.handleChange('Reference')}
                      onBlur={formikProps.handleBlur('Reference')}
                    />
                  )}
                  {/*Past Experience Error */}
                  {Reference !== '' && formikProps.touched.PastExperience && (
                    <ErrorText text={formikProps.errors.PastExperience} />
                  )}
                </>
              )}
            </Formik>
          </ScrollView>
          <Button2
            onPress={() => {
              formRef.current.handleSubmit();
            }}
            text={'Update'}
          />
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
