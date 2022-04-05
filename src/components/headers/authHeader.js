import React from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';

const AuthHeader = ({text1, text2}) => (
  <View
    style={{
      height: '20%',
      justifyContent: 'space-between',
    }}>
    {/* Logo */}
    <Image
      source={require('../../../assets/icons/logo.png')}
      resizeMode={'contain'}
      style={styles.logo}
    />
    <View>
      {/* Text1 */}

      <Text style={styles.text1}>{text1}</Text>

      {/* Text2 */}

      <Text style={styles.text2}>{text2}</Text>
    </View>
  </View>
);

export default AuthHeader;

const styles = StyleSheet.create({
  logo: {
    width: '55%',
    height: '40%',
    alignSelf: 'center',
  },
  text1: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },
  text2: {fontSize: 14, color: 'black', fontFamily: 'Poppins-Regular'},
});
