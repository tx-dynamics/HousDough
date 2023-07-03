import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { showMessage, hideMessage } from 'react-native-flash-message';
import colors from '../../globalStyles/colorScheme';
import InputField from '../../components/inputFields/InputField';
import AuthHeader from '../../components/headers/authHeader';
import Button1 from '../../components/buttons/button1';
import { UserContext } from '../../contextApi/contextApi';
import { signup } from '../../firebase/authFunctions';
import { signupSchema } from '../../validations/authValidations';
import ErrorText from '../../components/ErrorText';
import LoaderModal from '../../components/Modals/loaderModal';

function Signup({ navigation }) {
  const { setOnBoardingDone, setPaymentDone, userType, setUserType } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    //UseEffect Clean up function
    return () => {
      setIsLoading(false);
      setServerError(null);
    };
  }, []);
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <AuthHeader
        text1={'Sign Up to Hosdough'}
        text2={
          userType
            ? `Let's create your venue's account so we can find workers in your area`
            : `Let's create your account so we can find venues in your area.`
        }
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
        validationSchema={signupSchema}
        onSubmit={(values, { resetForm }) => {
          setOnBoardingDone(null);
          setPaymentDone(null)
          // console.log("error", values)
          setIsLoading(true);
          signup(values, userType).then(res => {
            setUserType(userType)
            setIsLoading(false);
            if (res === true) {
              showMessage({
                message: `Welcome ${values.name}`,
                description: `${values.name} Your Account Have Been Created Successfully!`,
                type: 'success',
                duration: 3000,
              });
              resetForm();
            } else {
              setServerError(res);
            }
          }).catch((err) =>
            console.log("error", err)
          );
        }}>
        {formikProps => (
          <View style={{ flex: 1, marginTop: '5%' }}>
            {/* Name Input */}
            <InputField
              title={'Name'}
              value={formikProps.values.name}
              icon={require('../../../assets/icons/user.png')}
              onChangeText={formikProps.handleChange('name')}
              ShowPassword={true}
              onBlur={formikProps.handleBlur('name')}
            />
            {/*Name Error */}
            {formikProps.touched.name && (
              <ErrorText text={formikProps.errors.name} />
            )}
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
            {/*Email Error */}
            {formikProps.touched.email && (
              <ErrorText text={formikProps.errors.email} />
            )}

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
            {/*Password Error */}
            {formikProps.touched.password && (
              <ErrorText text={formikProps.errors.password} />
            )}
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
            {/*Confirm Password Error */}
            {formikProps.touched.confirmPassword && (
              <ErrorText text={formikProps.errors.confirmPassword} />
            )}

            {/*Server Error */}
            {serverError && <ErrorText text={serverError} />}

            {/* Sign In Button */}
            <Button1
              onPress={() => {
                formikProps.handleSubmit();
              }}
              text={'Sign up'}
            />
            {/* or */}
            {/* {!formikProps.errors.name &&
            !formikProps.errors.email &&
            !formikProps.errors.password &&
            !formikProps.errors.confirmPassword ? (
              <View style={{alignSelf: 'center', margin: 10}}>
                <Text style={{color: '#5B5B5B', fontSize: 18}}>or</Text>
              </View>
            ) : null} */}
            {/* Facebook & Instagram */}
            {/* {!formikProps.errors.name &&
            !formikProps.errors.email &&
            !formikProps.errors.password &&
            !formikProps.errors.confirmPassword ? (
              <View style={{flexDirection: 'row', justifyContent: 'center'}}> */}
            {/* Facebook Icon */}
            {/* <Pressable onPress={() => console.log('Facebook')}>
                  <Image
                    source={require('../../../assets/icons/facebook.png')}
                    resizeMode={'contain'}
                    style={{width: 40, height: 40, marginHorizontal: 15}}
                  />
                </Pressable> */}
            {/* Instagram Icon */}
            {/* <Pressable onPress={() => console.log('Facebook')}>
                  <Image
                    source={require('../../../assets/icons/instagram.png')}
                    resizeMode={'contain'}
                    style={{width: 40, height: 40, marginHorizontal: 15}}
                  />
                </Pressable>
              </View>
            ) : null} */}
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
      {/* Loader */}
      <LoaderModal Visibility={isLoading} />
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
