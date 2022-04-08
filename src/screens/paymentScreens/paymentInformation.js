import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Header3 from '../../components/headers/Header3';
import InputField3 from '../../components/inputFields/InputField3';

function PaymentInformation({navigation}) {
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Header3
        text={'Payment Information'}
        onPress={() => navigation.navigate('PaymentMethod')}
      />

      <View style={{alignItems: 'center', flex: 1}}>
        {/*  Credit Card*/}
        <Image
          source={require('../../../assets/images/CreditCard.png')}
          resizeMode={'contain'}
          style={{
            width: '50%',
            height: '25%',
          }}
        />
        {/* Name */}
        <InputField3 title={'Name'} placeHolder={'John Doe'} width={'90%'} />
        {/* Card Number */}
        <InputField3
          title={'Card Number'}
          placeHolder={'1234 5678 4325 2343'}
          width={'90%'}
        />
        <View
          style={{
            paddingHorizontal: '5%',
            flexDirection: 'row',
            flex: 1,

            backgroundColor: 'red',
          }}>
          {/* CVV */}
          <InputField3 title={'CVV'} placeHolder={'1234'} width={'45%'} />
          {/* Expiration Date */}
          <InputField3
            title={'Expiration Date'}
            placeHolder={'08/2023'}
            width={'45%'}
          />
        </View>
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
});
