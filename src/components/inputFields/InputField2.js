import React from 'react';
import {View, Pressable, StyleSheet, Image, TextInput} from 'react-native';
import colors from '../../globalStyles/colorScheme';

const InputField2 = ({
  title,
  value,
  icon,
  onChangeText,
  eye,
  onEyePress,
  ShowPassword,
  autoCapitalize,
  onBlur,
}) => {
  return (
    <View style={styles.inputField}>
      <TextInput
        style={styles.inputFieldText}
        placeholder={title}
        secureTextEntry={!ShowPassword}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor={colors.placeHolderColor}
        underlineColorAndroid="transparent"
        autoCapitalize={autoCapitalize}
        autoComplete={'off'}
        onBlur={onBlur}
      />
    </View>
  );
};

export default InputField2;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: '#F4F4F4',
    width: '90%',
    height: 55,
    borderRadius: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginVertical: '2%',
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  inputFieldText: {
    fontFamily: 'Poppins-Regular',
    flex: 1,
    fontSize: 14,
    color: colors.placeHolderColor,
  },
});
