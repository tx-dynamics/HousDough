import React from 'react';
import {View, Pressable, StyleSheet, Image, TextInput} from 'react-native';
import colors from '../../globalStyles/colorScheme';

const InputField = ({
  title,
  value,
  icon,
  onChangeText,
  eye,
  onEyePress,
  ShowPassword,
  autoCapitalize,
  onBlur,
  autoComplete = 'off',
}) => {
  return (
    <View style={styles.inputField}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* icon */}
        {/* Profile Icon */}
        <View>
          <Image resizeMode={'contain'} source={icon} style={{width: 20}} />
        </View>
        {/* text */}
        <View style={{marginLeft: 10, width: '85%'}}>
          <TextInput
            style={styles.inputFieldText}
            placeholder={title}
            secureTextEntry={!ShowPassword}
            onChangeText={onChangeText}
            value={value}
            placeholderTextColor={colors.placeHolderColor}
            underlineColorAndroid="transparent"
            autoCapitalize={autoCapitalize}
            autoComplete={autoComplete}
            onBlur={onBlur}
          />
        </View>
      </View>

      {/* eye */}
      <View>
        {eye && (
          <Pressable
            onPress={onEyePress}
            hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
            <View style={{}}>
              <Image
                resizeMode={'contain'}
                source={
                  ShowPassword
                    ? require('../../../assets/icons/show_eye.png')
                    : require('../../../assets/icons/hide_eye.png')
                }
                style={{width: 18, alignItems: 'center', tintColor: 'black'}}
              />
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: 'white',
    width: '100%',
    height: 55,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: '2%',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  inputFieldText: {
    fontFamily: 'Poppins-Regular',
    flex: 1,
    fontSize: 14,
    color: colors.black,
  },
});
