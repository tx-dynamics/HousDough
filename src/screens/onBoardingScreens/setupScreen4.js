import React, {useContext} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import Header1 from '../../components/headers/Header1';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import colors from '../../globalStyles/colorScheme';
import Button2 from '../../components/buttons/button2';
import {UserContext} from '../../contextApi/contextApi';

function SetupScreen4({navigation}) {
  const {userType, setOnBoardingDone, setPaymentDone} = useContext(UserContext);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Header1 text={'Add About You'} Screen={4} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Write about Yourself */}
        <View style={styles.box}>
          <TextInput
            style={styles.boxText}
            placeholder="Write about Yourself..."
            multiline={true}
          />
        </View>
        {/* Your Past Experience */}

        {!userType ? (
          <View>
            <Text style={styles.text1}>Your Past Experience</Text>
            <View style={styles.box}>
              <TextInput
                style={styles.boxText}
                placeholder="Write here..."
                multiline={true}
              />
            </View>
          </View>
        ) : null}
        {/* Your Past Experience */}

        {!userType ? (
          <View>
            <Text style={styles.text1}>Reference</Text>
            <View style={styles.box}>
              <TextInput
                style={styles.boxText}
                placeholder="Write here..."
                multiline={true}
              />
            </View>
          </View>
        ) : null}
      </ScrollView>
      {/* bottom space filler */}
      <View style={{height: '10%'}} />
      {/* Done Button */}

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          marginBottom: '5%',
          width: '100%',
        }}>
        <Button2
          onPress={() => {
            !userType && setPaymentDone(true);
            setOnBoardingDone(true);
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

    height: 150,
    marginTop: 5,
    marginBottom: 30,
  },
  boxText: {
    color: colors.black,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    flex: 1,
    textAlignVertical: 'top',
  },
  text1: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
});
