import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import Header3 from '../../components/headers/Header3';
import colorScheme from '../../globalStyles/colorScheme';
import Button2 from '../../components/buttons/button2';

function PaymentMethod({navigation}) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header3 text={'Payment Method'} />
      {/* Middle */}
      <View style={{paddingHorizontal: '5%', flex: 1}}>
        <Text style={styles.text1}>Payment</Text>
        {/* Top location Card */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            height: 100,
            marginTop: '3%',
            marginBottom: '7%',
          }}>
          <Image
            source={require('../../../assets/icons/map_icon.png')}
            resizeMode={'contain'}
            style={{
              width: 120,
            }}
          />
          <View
            style={{
              height: 100,
              justifyContent: 'flex-start',
              paddingVertical: '4%',
            }}>
            <Text style={styles.text2}>Standard</Text>
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
            height: '45%',
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

      {/* Next Button */}
      <View style={{marginHorizontal: '5%', marginBottom: '10%'}}>
        <Button2
          text={'Next'}
          onPress={() => navigation.navigate('PaymentInformation')}
        />
      </View>
    </View>
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
