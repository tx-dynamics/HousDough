import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import Header3 from '../../components/headers/Header3';
import InputField3 from '../../components/inputFields/InputField3';
import CheckBox from '@react-native-community/checkbox';
import Button2 from '../../components/buttons/button2';
import { UserContext } from '../../contextApi/contextApi';
import { setPaymentMethod } from '../../firebase/updateFuctions';
import ErrorText from '../../components/ErrorText';
import { paymentInformationSchema } from '../../validations/paymentValidations';
import LoaderModal from '../../components/Modals/loaderModal';
import { Publish_Key, Secret_Key } from '@env'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

function PaymentInformation({ navigation }) {
  const { setPaymentDone, userType } = useContext(UserContext);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { email } = useSelector(state => state.userProfile);
  const { Plan } = useSelector(state => state.userPayment);
  const CURRENCY = 'USD';
  var CARD_TOKEN = null;

  const getCreditCardToken = async (value) => {
    const cardDetails = {
      'card[number]': value?.cardNumber,
      'card[exp_month]': value?.expDate.slice(0, 2),
      'card[exp_year]': value?.expDate.slice(3, 5),
      'card[cvc]': value?.cvv,
    }
    return fetch('https://api.stripe.com/v1/tokens', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${Publish_Key}`,
      },
      method: 'post',
      body: Object.keys(cardDetails)
        .map(key => key + '=' + cardDetails[key])
        .join('&'),
    })
      .then(response => response.json())
      .catch(error => console.log(error));
  };

  const subscribeUser = (creditCardToken) => {
    return new Promise(resolve => {
      CARD_TOKEN = creditCardToken.id;
      setTimeout(() => {
        resolve({ status: true });
      }, 1000);
    });
  }

  const charges = async () => {
    const card = {
      amount: (Plan === 'Standard Plan' ? 25 : 100) * 100,
      currency: CURRENCY,
      source: CARD_TOKEN,
      description: email,
    };
    return fetch('https://api.stripe.com/v1/charges', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${Secret_Key}`,
      },
      method: 'post',
      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&'),
    }).then(response => response.json());
  };

  const onSubmit = async (value) => {
    setIsLoading(true);
    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(value);
      // return
      // console.log('creditCardToken', creditCardToken);
      if (creditCardToken.error) {
        showMessage(creditCardToken.error.message);
        setIsLoading(false);
        return;
      }
    } catch (e) {
      console.log('e', e);
      setIsLoading(false);
      return;
    }
    const { error } = await subscribeUser(creditCardToken);
    try {
      if (error) {
        showMessage(error);
        setIsLoading(false);
      } else {
        let pament_data = await charges();
        if (pament_data.status == 'succeeded') {
          firestore()
            .collection('Users')
            .doc(auth()?.currentUser?.uid)
            .update({ paymentMethod: true })
            .then(() => {
              console.log('User payment Method set to true');
              return true;
            })
            .catch(error => {
              console.log(error);
              return false;
            });
          setIsLoading(false);
          setPaymentDone(true)
        } else {
          setIsLoading(false);
          let str = pament_data?.error?.message;
          showMessage('Your card was declined.');
        }
      }
    } catch (error) {
      console.log('error Payment=> . ', error);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Header3
        text={'Payment Information'}
        onPress={() => navigation.navigate('PaymentMethod')}
      />
      <LoaderModal Visibility={isLoading} />

      <View style={{ flex: 1 }}>
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
          validationSchema={paymentInformationSchema}
          onSubmit={(value) => onSubmit(value)}
        // onSubmit={value => {
        //   console.log(value);
        //   setIsLoading(true);
        //   setPaymentMethod(userType, email, Plan, value).then(res => {
        //     setIsLoading(false);
        //     if (res) {
        //       showMessage({
        //         message: `Payment Successfully`,
        //         description: `Payment Setup Successfully!`,
        //         type: 'success',
        //         duration: 3000,
        //       });
        //       setPaymentDone(true);
        //     } else {
        //       showMessage({
        //         message: `Payment Failed`,
        //         description: `Something Went Wrong! Please Enter Correct Information`,
        //         type: 'danger',
        //         duration: 3000,
        //       });
        //     }
        //   });
        // }}
        >
          {formikProps => (
            <View style={{ flex: 1 }}>
              {/* Name And Credit Card */}
              <View style={{ alignItems: 'center' }}>
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
                  <View style={{ width: '80%' }}>
                    <ErrorText text={formikProps.errors.name} />
                  </View>
                )}

                {/* Card Number */}
                <InputField3
                  title={'Card Number'}
                  placeHolder={'1234567843252343'}
                  width={'90%'}
                  maxLength={16}
                  value={formikProps.values.cardNumber}
                  onChangeText={formikProps.handleChange('cardNumber')}
                  onBlur={formikProps.handleBlur('cardNumber')}
                  keyboardType={'phone-pad'}
                />
                {formikProps.touched.cardNumber && (
                  <View style={{ width: '80%' }}>
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
                  placeHolder={'123'}
                  width={'47%'}
                  maxLength={3}
                  value={formikProps.values.cvv}
                  onChangeText={formikProps.handleChange('cvv')}
                  onBlur={formikProps.handleBlur('cvv')}
                  keyboardType={'phone-pad'}
                />

                {/* Expiration Date */}
                <InputField3
                  title={'Expiration Date'}
                  placeHolder={'08/22'}
                  width={'47%'}
                  value={formikProps.values.expDate}
                  onChangeText={formikProps.handleChange('expDate')}
                  onBlur={formikProps.handleBlur('expDate')}
                // keyboardType={'phone-pad'}
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
                  tintColors={{ true: 'black', false: 'black' }}
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
                  bottom: '5%',
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
      <LoaderModal Visibility={isLoading} />
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
