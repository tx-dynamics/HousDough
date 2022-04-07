import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import colors from '../../globalStyles/colorScheme';
import InputField from '../../components/inputFields/InputField';
import AuthHeader from '../../components/headers/authHeader';
import Button1 from '../../components/buttons/button1';

function Signup({navigation}) {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <AuthHeader
        text1={'Sign Up to Hosdough'}
        text2={`Let's create your account`}
      />
      {/* Formik library user to create forms */}

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          ShowPassword: false,
          ShowConfirmPassword: false,
        }}
        onSubmit={values => {
          console.log(values);
        }}>
        {formikProps => (
          <View style={{flex: 1, marginTop: '5%'}}>
            {/* Name Input */}
            <InputField
              title={'Name'}
              value={formikProps.values.name}
              icon={require('../../../assets/icons/user.png')}
              onChangeText={formikProps.handleChange('name')}
              ShowPassword={true}
              onBlur={formikProps.handleBlur('email')}
            />
            {/* Email Input */}
            <InputField
              title={'Enter Your Email'}
              value={formikProps.values.email}
              icon={require('../../../assets/icons/email.png')}
              onChangeText={formikProps.handleChange('email')}
              ShowPassword={true}
              autoCapitalize="none"
              onBlur={formikProps.handleBlur('email')}
            />
            {/* Password Input */}
            <InputField
              title={'Password'}
              value={formikProps.values.password}
              icon={require('../../../assets/icons/key.png')}
              onChangeText={formikProps.handleChange('password')}
              ShowPassword={formikProps.values.ShowPassword}
              autoCapitalize="none"
              onBlur={formikProps.handleBlur('password')}
              eye={true}
              onEyePress={() =>
                formikProps.setFieldValue(
                  'ShowPassword',
                  !formikProps.values.ShowPassword,
                )
              }
            />
            {/* Confirm Password Input */}
            <InputField
              title={'Confirm Password'}
              value={formikProps.values.confirmPassword}
              icon={require('../../../assets/icons/key.png')}
              onChangeText={formikProps.handleChange('confirmPassword')}
              ShowPassword={formikProps.values.ShowConfirmPassword}
              autoCapitalize="none"
              onBlur={formikProps.handleBlur('confirmPassword')}
              eye={true}
              onEyePress={() =>
                formikProps.setFieldValue(
                  'ShowConfirmPassword',
                  !formikProps.values.ShowConfirmPassword,
                )
              }
            />

            {/* Sign In Button */}
            <Button1
              onPress={() => navigation.navigate('OnBoardNavigator')}
              text={'Sign up'}
            />
            {/* or */}
            <View style={{alignSelf: 'center', margin: 10}}>
              <Text style={{color: '#5B5B5B', fontSize: 18}}>or</Text>
            </View>
            {/* Facebook & Instagram */}
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              {/* Facebook Icon */}
              <Pressable onPress={() => console.log('Facebook')}>
                <Image
                  source={require('../../../assets/icons/facebook.png')}
                  resizeMode={'contain'}
                  style={{width: 40, height: 40, marginHorizontal: 15}}
                />
              </Pressable>
              {/* Instagram Icon */}
              <Pressable onPress={() => console.log('Facebook')}>
                <Image
                  source={require('../../../assets/icons/instagram.png')}
                  resizeMode={'contain'}
                  style={{width: 40, height: 40, marginHorizontal: 15}}
                />
              </Pressable>
            </View>
          </View>
        )}
      </Formik>

      {/* Bottom Text */}
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          alignItems: 'baseline',
        }}>
        <View>
          <Text
            style={{
              ...styles.bottonText,
              fontFamily: 'Poppins-Regular',
              color: '#5B5B5B',
            }}>
            Already have an account?
          </Text>
        </View>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <View>
            <Text
              style={{
                ...styles.bottonText,
                color: colors.primary,
                fontFamily: 'Poppins-Bold',
              }}>
              {' '}
              Sign In
            </Text>
          </View>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: '6%',
    paddingHorizontal: '5%',
    backgroundColor: 'white',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 40,
  },
  forgotPasswordText: {
    color: colors.placeHolderColor,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  bottonText: {
    fontSize: 16,
  },
});
