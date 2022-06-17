import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import colors from '../../globalStyles/colorScheme';

const PlanButton = ({onPress, text1, text2, amount, selected}) => (
  <Pressable onPress={onPress}>
    <View style={{...styles.button, opacity: selected ? 1 : 0.5}}>
      {/*  */}
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        {/* Text1 */}
        <Text style={styles.text1}>{text1}</Text>
        {/* Text2 */}
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text2}>{text2}</Text>
          <Text style={styles.amount}>{` $${amount}`}</Text>
          <Text style={styles.text2}>{' / Month'}</Text>
        </View>
      </View>
    </View>
  </Pressable>
);
export default PlanButton;

const styles = StyleSheet.create({
  button: {
    width: '90%',
    height: 110,
    alignSelf: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: '5%',
    marginVertical: '3%',
  },
  text1: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
  text2: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
  amount: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins-ExtraBold',
  },
});
