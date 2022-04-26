import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Image,
  TextInput,
  Text,
} from 'react-native';
import colors from '../../globalStyles/colorScheme';

const InputField3 = ({title, placeHolder, width, onFocus, onBlur, focused}) => {
  return (
    <View style={{width: width}}>
      <Text style={styles.text1}>{title}</Text>
      <View style={{...styles.inputField, borderWidth: focused ? 1 : 0}}>
        <TextInput
          placeholder={placeHolder}
          style={styles.inputFieldText}
          onFocus={onFocus}
          onBlur={onBlur}></TextInput>
      </View>
    </View>
  );
};

export default InputField3;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: '#FCFCFA',
    // width: '100%',
    height: 55,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '2%',
    paddingHorizontal: 20,
    borderColor: '#25251C80',
  },
  inputFieldText: {
    fontFamily: 'Poppins-SemiBold',
    flex: 1,
    fontSize: 14,
    color: colors.black,
  },
  text1: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.black,
  },
});
