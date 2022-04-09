import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Header3 from '../../components/headers/Header3';
import InputField3 from '../../components/inputFields/InputField3';
import CheckBox from '@react-native-community/checkbox';
import Button2 from '../../components/buttons/button2';

function PaymentInformation({navigation}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

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
          <InputField3 title={'Name'} placeHolder={'John Doe'} width={'90%'} />
          {/* Card Number */}
          <InputField3
            title={'Card Number'}
            placeHolder={'1234 5678 4325 2343'}
            width={'90%'}
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
          <InputField3 title={'CVV'} placeHolder={'1234'} width={'47%'} />
          {/* Expiration Date */}
          <InputField3
            title={'Expiration Date'}
            placeHolder={'08/2023'}
            width={'47%'}
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
          />
          <Text style={styles.text1}>Save credit card Information</Text>
        </View>
      </View>
      {/* Next Button */}
      <View style={{marginHorizontal: '5%', marginBottom: '10%'}}>
        <Button2
          text={'Next'}
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
    color: '#25251C',
    marginLeft: '2%',
  },
});
