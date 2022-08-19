import React, {useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {showMessage, hideMessage} from 'react-native-flash-message';
import colors from '../../globalStyles/colorScheme';
import InputField from '../../components/inputFields/InputField';
import AuthHeader from '../../components/headers/authHeader';
import Button1 from '../../components/buttons/button1';
import {UserContext} from '../../contextApi/contextApi';
import {signin, handleForgetPassword} from '../../firebase/authFunctions';
import {loginSchema} from '../../validations/authValidations';
import ErrorText from '../../components/ErrorText';
import LoaderModal from '../../components/Modals/loaderModal';
import ForgetPasswordModal from '../../components/Modals/forgetPasswordModal';

function Login({navigation}) {
  const {setUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [forgetPassModal, setforgetPassModal] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [forgetPassEmail, setforgetPassEmail] = useState('');

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
      <AuthHeader text1={'Sign In to Hosdough'} text2={'Welcome Back!'} />
      {/* Formik library user to create forms */}

      <Formik
        initialValues={{email: '', password: '', ShowPassword: false}}
        validationSchema={loginSchema}
        onSubmit={(values, {resetForm}) => {
          setIsLoading(true);
          signin(values).then(res => {
            setIsLoading(false);
            if (res === true) {
              showMessage({
                message: `Hello`,
                description: `Login Successfully!`,
                type: 'success',
                duration: 3000,
              });
              resetForm();
            } else {
              setServerError(res);
            }
          });
        }}>
        {formikProps => (
          <View style={{flex: 1, marginTop: '15%'}}>
            {/* Email Input */}
            <InputField
              title={'Enter Your Email'}
              value={formikProps.values.email}
              icon={require('../../../assets/icons/email.png')}
              onChangeText={formikProps.handleChange('email')}
              ShowPassword={true}
              autoCapitalize="none"
              onBlur={formikProps.handleBlur('email')}
              autoComplete={'email'}
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
            {/*Server Error */}
            {serverError && <ErrorText text={serverError} />}

            {/* Forgot Password */}
            <Pressable
              onPress={() => setforgetPassModal(true)}
              style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Pressable>

            {/* Sign In Button */}

            <Button1
              onPress={() => formikProps.handleSubmit()}
              text={'Sign In'}
            />

            {/* or */}
            {/* <View style={{alignSelf: 'center', margin: 10}}>
              <Text style={{color: '#5B5B5B', fontSize: 18}}>or</Text>
            </View> */}
            {/* Facebook & Instagram */}
            {/* <View style={{flexDirection: 'row', justifyContent: 'center'}}> */}
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
            </View> */}
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
            Don't have an account yet?
          </Text>
        </View>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <View>
            <Text
              style={{
                ...styles.bottonText,
                color: colors.primary,
                fontFamily: 'Poppins-Bold',
              }}>
              Sign Up
            </Text>
          </View>
        </Pressable>
      </View>
      {/* Loader */}
      <LoaderModal Visibility={isLoading} />
      {/* Forget Password Modal */}
      <ForgetPasswordModal
        Visibility={forgetPassModal}
        onPress={() => setforgetPassModal(false)}
        onPress2={() => {
          forgetPassEmail && setforgetPassModal(false);
          forgetPassEmail &&
            handleForgetPassword(forgetPassEmail).then(res => {
              if (res) {
                showMessage({
                  message: `Forgot Password Email Sent`,
                  description: `Please Check ${forgetPassEmail} inbox/Scam for the resent password email`,
                  type: 'success',
                  duration: 5000,
                });
              } else {
                showMessage({
                  message: `Forgot Password Email Error`,
                  description: `Something Went Wrong! Please Try Again`,
                  type: 'danger',
                  duration: 5000,
                });
              }
            });
        }}
        forgotEmail={forgetPassEmail}
        onChangeText={txt => setforgetPassEmail(txt)}
      />
    </KeyboardAwareScrollView>
  );
}

export default Login;

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
    marginBottom: '15%',
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
