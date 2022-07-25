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
const InputField4 = ({
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
    <View>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.inputField}>
        <View style={{marginLeft: 10, width: '85%'}}>
          <TextInput
            style={styles.inputFieldText}
            placeholder={title}
            onChangeText={onChangeText}
            value={value}
            placeholderTextColor={colors.placeHolderColor}
            underlineColorAndroid="transparent"
            autoCapitalize={autoCapitalize}
            autoComplete={autoComplete}
            onBlur={onBlur}
            multiline={true}
          />
        </View>
      </View>
    </View>
  );
};

export default InputField4;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: 'white',
    width: '100%',
    height: 150,
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
    textAlignVertical: 'top',
  },
  titleText: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
});
