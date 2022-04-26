import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Header3 from '../../components/headers/Header3';
import InputField3 from '../../components/inputFields/InputField3';
import CheckBox from '@react-native-community/checkbox';
import Button2 from '../../components/buttons/button2';

function PaymentInformation({navigation}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [fieldFocus, setFieldFocus] = useState(false);
  const [fieldFocus1, setFieldFocus1] = useState(false);
  const [fieldFocus2, setFieldFocus2] = useState(false);
  const [fieldFocus3, setFieldFocus3] = useState(false);

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
        {/* Name And Credit Card */}
        <View style={{alignItems: 'center'}}>
          {/* Name */}
          <InputField3
            title={'Name'}
            placeHolder={'John Doe'}
            width={'90%'}
            onFocus={() => setFieldFocus(true)}
            onBlur={() => setFieldFocus(false)}
            focused={fieldFocus}
          />
          {/* Card Number */}
          <InputField3
            title={'Card Number'}
            placeHolder={'1234 5678 4325 2343'}
            width={'90%'}
            onFocus={() => setFieldFocus1(true)}
            onBlur={() => setFieldFocus1(false)}
            focused={fieldFocus1}
          />
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
            onFocus={() => setFieldFocus2(true)}
            onBlur={() => setFieldFocus2(false)}
            focused={fieldFocus2}
          />
          {/* Expiration Date */}
          <InputField3
            title={'Expiration Date'}
            placeHolder={'08/2023'}
            width={'47%'}
            onFocus={() => setFieldFocus3(true)}
            onBlur={() => setFieldFocus3(false)}
            focused={fieldFocus3}
          />
        </View>
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
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColors={{true: 'black', false: 'black'}}
          />
          <Text style={styles.text1}>Save credit card Information</Text>
        </View>
      </View>
      {/* Next Button */}
      <View style={{marginHorizontal: '5%', marginBottom: '5%'}}>
        <Button2
          text={'Done'}
          onPress={() => navigation.navigate('BottomTabNavigator')}
        />
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
