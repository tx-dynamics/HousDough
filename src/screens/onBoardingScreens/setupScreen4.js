import React, {useContext} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Header1 from '../../components/headers/Header1';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import colors from '../../globalStyles/colorScheme';
import Button2 from '../../components/buttons/button2';
import {UserContext} from '../../contextApi/contextApi';

function SetupScreen4({navigation}) {
  const {userType, setUserType} = useContext(UserContext);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Header1 text={'Add About You'} Screen={4} />
      {/* Write about Yourself */}
      <View style={styles.box}>
        <TextInput
          style={styles.boxText}
          placeholder="Write about Yourself..."
        />
      </View>
      {/* Your Past Experience */}

      {!userType ? (
        <View>
          <Text style={styles.text1}>Your Past Experience</Text>
          <View style={styles.box}>
            <TextInput style={styles.boxText} placeholder="Write here..." />
          </View>
        </View>
      ) : null}

      {/* Done Button */}

      <View
        style={{
          position: 'absolute',
          bottom: 25,
          alignSelf: 'center',

          width: '100%',
        }}>
        <Button2
          onPress={() => {
            userType
              ? navigation.navigate('PaymentNavigator')
              : navigation.navigate('BottomTabNavigator');
          }}
          text={'Done'}
          light={false}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default SetupScreen4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',

    backgroundColor: 'white',
  },
  box: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CDCDCD',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 0,
    height: 170,
    alignSelf: 'flex-start',
    marginTop: 5,
    marginBottom: 30,
  },
  boxText: {
    color: colors.black,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
  text1: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    alignSelf: 'flex-start',
  },
});
