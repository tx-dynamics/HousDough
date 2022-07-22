import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {Formik} from 'formik';
import Header3 from '../../components/headers/Header3';
import InputField3 from '../../components/inputFields/InputField3';
import CheckBox from '@react-native-community/checkbox';
import Button2 from '../../components/buttons/button2';
import {UserContext} from '../../contextApi/contextApi';
import {setPaymentMethod} from '../../firebase/updateFuctions';
import ErrorText from '../../components/ErrorText';
import {paymentInformationSchema} from '../../validations/paymentValidations';

function PaymentInformation({navigation}) {
  const {setPaymentDone, userType} = useContext(UserContext);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  // const [fieldFocus, setFieldFocus] = useState(false);
  // const [fieldFocus1, setFieldFocus1] = useState(false);
  // const [fieldFocus2, setFieldFocus2] = useState(false);
  // const [fieldFocus3, setFieldFocus3] = useState(false);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Header3
        text={'Payment Information'}
        onPress={() => navigation.navigate('PaymentMethod')}
      />

      <View style={{flex: 1}}>
        {/*  Credit Card*/}
        <Image
          source={require('../../../assets/images/CreditCard.png')}
          resizeMode={'contain'}
          style={{
            width: '50%',
            height: '25%',
            alignSelf: 'center',
          }}
        />

        {/* Formik */}
        <Formik
          initialValues={{
            name: '',
            cardNumber: '',
            cvv: '',
            expDate: '',
            saveInfo: false,
          }}
          // validationSchema={paymentInformationSchema}
          onSubmit={value => {
            console.log(value);
            setPaymentMethod(userType).then(res => {
              if (res) {
                showMessage({
                  message: `Payment`,
                  description: `Payment Setup Successfully!`,
                  type: 'success',
                  duration: 3000,
                });
                setPaymentDone(true);
              } else {
                showMessage({
                  message: `Payment`,
                  description: `Something Went Wrong!`,
                  type: 'danger',
                  duration: 3000,
                });
              }
            });
          }}>
          {formikProps => (
            <View style={{flex: 1}}>
              {/* Name And Credit Card */}
              <View style={{alignItems: 'center'}}>
                {/* Name */}
                <InputField3
                  title={'Name'}
                  placeHolder={'John Doe'}
                  width={'90%'}
                  value={formikProps.values.name}
                  onChangeText={formikProps.handleChange('name')}
                  onBlur={formikProps.handleBlur('name')}
                  // keyboardType={'number-pad'}
                />

                {/* Name ErrorText */}
                {formikProps.touched.name && (
                  <View style={{width: '80%'}}>
                    <ErrorText text={formikProps.errors.name} />
                  </View>
                )}

                {/* Card Number */}
                <InputField3
                  title={'Card Number'}
                  placeHolder={'1234 5678 4325 2343'}
                  width={'90%'}
                  value={formikProps.values.cardNumber}
                  onChangeText={formikProps.handleChange('cardNumber')}
                  onBlur={formikProps.handleBlur('cardNumber')}
                  keyboardType={'number-pad'}
                />
                {formikProps.touched.cardNumber && (
                  <View style={{width: '80%'}}>
                    <ErrorText text={formikProps.errors.cardNumber} />
                  </View>
                )}
              </View>
              {/* CVV and Expiration Date */}
              <View
                style={{
                  paddingHorizontal: '5%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {/* CVV */}
                <InputField3
                  title={'CVV'}
                  placeHolder={'1234'}
                  width={'47%'}
                  value={formikProps.values.cvv}
                  onChangeText={formikProps.handleChange('cvv')}
                  onBlur={formikProps.handleBlur('cvv')}
                  keyboardType={'number-pad'}
                />

                {/* Expiration Date */}
                <InputField3
                  title={'Expiration Date'}
                  placeHolder={'08/2023'}
                  width={'47%'}
                  value={formikProps.values.expDate}
                  onChangeText={formikProps.handleChange('expDate')}
                  onBlur={formikProps.handleBlur('expDate')}
                  keyboardType={'number-pad'}
                />
              </View>
              {formikProps.touched.cvv && (
                <View
                  style={{
                    width: '80%',
                    alignSelf: 'center',
                  }}>
                  <ErrorText text={formikProps.errors.cvv} />
                </View>
              )}
              {formikProps.touched.expDate && (
                <View
                  style={{
                    width: '80%',
                    alignSelf: 'center',
                  }}>
                  <ErrorText text={formikProps.errors.expDate} />
                </View>
              )}
              {/* CheckBox */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: '5%',
                  marginTop: '5%',
                }}>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={newValue => {
                    setToggleCheckBox(newValue);
                    formikProps.setFieldValue(
                      'saveInfo',
                      !formikProps.values.saveInfo,
                    );
                  }}
                  tintColors={{true: 'black', false: 'black'}}
                />
                <Text style={styles.text1}>Save credit card Information</Text>
              </View>
              {formikProps.touched.saveInfo && (
                <View
                  style={{
                    width: '80%',
                    alignSelf: 'center',
                  }}>
                  <ErrorText text={formikProps.errors.saveInfo} />
                </View>
              )}
              {/* Next Button */}
              <View
                style={{
                  // marginHorizontal: '5%',
                  // marginBottom: '5%',
                  position: 'absolute',
                  bottom: '13%',
                  width: '90%',
                  alignSelf: 'center',
                }}>
                <Button2
                  text={'Done'}
                  onPress={() => formikProps.handleSubmit()}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default PaymentInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text1: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: 'rgba(37, 37, 28, 0.5)',
    marginLeft: '2%',
  },
});
