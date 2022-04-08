import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Header1 from '../../components/headers/Header1';
import colors from '../../globalStyles/colorScheme';
import Button3 from '../../components/buttons/button3';
import Geolocation from '@react-native-community/geolocation';
import {UserContext} from '../../contextApi/contextApi';

function SetupScreen1({navigation}) {
  const {userType, setUserType} = useContext(UserContext);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Header1 text={'Share Your Location'} Screen={1} />
      {/* Location Card */}
      <Pressable
        onPress={() =>
          Geolocation.getCurrentPosition(info => console.log(info))
        }
        style={styles.locationCard}>
        <Image
          source={require('../../../assets/icons/location.png')}
          resizeMode={'contain'}
          style={styles.locationIcon}
        />
        <Text style={styles.text}>Use My Current Location</Text>
      </Pressable>
      {/* Enter Your Postcode */}
      {userType ? (
        <View style={styles.locationCard}>
          <TextInput style={styles.text} placeholder="Enter Your Postcode" />
        </View>
      ) : null}
      {/* Next Arrow Button */}
      <View style={{position: 'absolute', bottom: '10%', right: '5%'}}>
        <Button3 onPress={() => navigation.navigate('SetupScreen2')} />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default SetupScreen1;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '5%',
    backgroundColor: 'white',
  },
  locationCard: {
    backgroundColor: '#FAFAFA',
    height: 63,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    borderColor: '#CDCDCD',
    borderWidth: 1,
    marginVertical: '2%',
  },
  locationIcon: {
    width: '8%',
    marginRight: '2%',
  },
  text: {
    color: colors.black,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    width: '100%',
  },
});
