import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import Header1 from '../../components/headers/Header1';
import Button3 from '../../components/buttons/button3';
import Button4 from '../../components/buttons/button4';
import {UserContext} from '../../contextApi/contextApi';

function SetupScreen3({navigation}) {
  const {userType, setUserType} = useContext(UserContext);

  // This is dummy data
  const [skills, setSkills] = useState([
    ['Cooking', false],
    ['Cleansing', false],
    ['Ride', false],
    ['Still Example', false],
  ]);

  // This function is to change state of skills buttons on toggle
  const changeStatus = ArrayIndex => {
    const temp = [];

    skills.forEach((element, index) => {
      ArrayIndex !== index
        ? temp.push([element[0], element[1]])
        : temp.push([element[0], (element[1] = !element[1])]);
    });
    setSkills(temp);
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/skillsImage.png')}
      style={styles.container}>
      {/* Header */}
      <Header1
        text={
          userType ? 'Select Skills You Are Looking For' : 'Select Your Skills'
        }
        light={true}
        Screen={3}
      />
      <View
        style={{
          flexDirection: 'row',

          flexWrap: 'wrap',
        }}>
        {skills.map((item, index) => (
          <Button4
            key={index}
            text={item[0]}
            selected={item[1]}
            onPress={() => changeStatus(index)}
          />
        ))}
      </View>

      {/* Next Arrow Button */}
      <View style={{position: 'absolute', bottom: '10%', right: '5%'}}>
        <Button3 onPress={() => navigation.navigate('SetupScreen4')} />
      </View>
    </ImageBackground>
  );
}

export default SetupScreen3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
});
