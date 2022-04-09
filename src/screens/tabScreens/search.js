import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Header2 from '../../components/headers/Header2';
import InputField2 from '../../components/inputFields/InputField2';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Button4 from '../../components/buttons/button4';

function Search() {
  const [distance, setDistance] = useState([
    ['5 Km', false],
    ['10 Km', false],
  ]);
  // This function is to change state of skills buttons on toggle
  const changeStatus = ArrayIndex => {
    const temp = [];

    distance.forEach((element, index) => {
      ArrayIndex !== index
        ? temp.push([element[0], (element[1] = false)])
        : temp.push([element[0], (element[1] = !element[1])]);
    });
    setDistance(temp);
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Header2 text={'Search'} />
      {/* Search Bar */}
      <InputField2 title={'Enter Your Suburb Or Postcode'} />
      {/* Area Radius Filter */}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingHorizontal: '5%',
          marginVertical: '3%',
        }}>
        {distance.map((item, index) => (
          <Button4
            key={index}
            text={item[0]}
            searchScreen={true}
            selected={item[1]}
            onPress={() => changeStatus(index)}
          />
        ))}
      </View>
      {/* Map */}

      <View style={{flex: 1}}>
        <Image
          source={require('../../../assets/images/map.png')}
          resizeMode={'stretch'}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
