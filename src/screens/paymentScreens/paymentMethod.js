import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useSelector} from 'react-redux';
import Header3 from '../../components/headers/Header3';
import colorScheme from '../../globalStyles/colorScheme';
import Button2 from '../../components/buttons/button2';
import InputField from '../../components/inputFields/InputField';
import ErrorText from '../../components/ErrorText';

function PaymentMethod({navigation}) {
  const {Plan} = useSelector(state => state.userPayment);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {/* Header */}

      <View>
        <Header3
          text={'Payment Method'}
          onPress={() => navigation.navigate('ChoosePlan')}
        />
      </View>

      {/* Middle */}
      <View style={{paddingHorizontal: '5%', flex: 1}}>
        <Text style={styles.text1}>Package</Text>
        {/* Top location Card */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: '27%',
            marginTop: '3%',
            marginBottom: '7%',
          }}>
          <Image
            source={require('../../../assets/icons/map_icon.png')}
            resizeMode={'contain'}
            style={{
              width: 99.07,
              height: 94,

              marginRight: '5%',
            }}
          />

          <View
            style={{
              height: 100,
              justifyContent: 'flex-start',
              paddingVertical: '4%',
            }}>
            <Text style={styles.text2}>{Plan}</Text>
            <Text style={styles.text3}>
              Get Access Upto 100 Skilled Profiles
            </Text>
          </View>
        </View>
        {/* Payment Method */}

        <Text style={styles.text1}>Payment Method</Text>
        <Text style={styles.text3}>For now we are accepting STRIPE only.</Text>
        {/*  Credit Card*/}

        <Image
          source={require('../../../assets/images/CreditCard.png')}
          resizeMode={'contain'}
          style={{
            width: '100%',
            height: '50%',
          }}
        />
        {/* Total Payment */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.text1}>Total Payment</Text>
          <Text style={styles.text4}>$25.00</Text>
        </View>
      </View>

      {/* Invoices Email Field */}
      <Formik
        initialValues={{email: ''}}
        onSubmit={values => {
          console.log(values);
        }}>
        {formikProps => (
          <View style={{marginTop: '15%', paddingHorizontal: '5%'}}>
            {/* <Text style={styles.text1}>
              Please Enter Email Below For The Invoices
            </Text> */}
            <InputField
              title={'Email Below For The Invoices'}
              value={formikProps.values.email}
              icon={require('../../../assets/icons/email.png')}
              onChangeText={formikProps.handleChange('email')}
              ShowPassword={true}
              autoCapitalize="none"
              onBlur={formikProps.handleBlur('email')}
              autoComplete={'email'}
            />

            {formikProps.touched.email && (
              <ErrorText text={formikProps.errors.email} />
            )}
          </View>
        )}
      </Formik>

      {/* Next Button */}
      <View style={{marginHorizontal: '5%', marginBottom: '5%'}}>
        <Button2
          text={'Next'}
          onPress={() => navigation.navigate('PaymentInformation')}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default PaymentMethod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text1: {
    fontSize: 16,
    color: colorScheme.black,
    fontFamily: 'Poppins-SemiBold',
  },
  text2: {
    fontSize: 18,
    color: colorScheme.black,
    fontFamily: 'Poppins-SemiBold',
  },
  text3: {
    fontSize: 12,
    color: '#25251C80',
    fontFamily: 'Poppins-Medium',
  },
  text4: {
    fontSize: 18,
    color: colorScheme.black,
    fontFamily: 'Poppins-Bold',
  },
});
