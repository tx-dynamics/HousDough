import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Header3 from '../../components/headers/Header3';
import PlanButton from '../../components/buttons/planButton';
import Button2 from '../../components/buttons/button2';
import {UserContext} from '../../contextApi/contextApi';

function ChoosePlan1({navigation}) {
  const {setOnBoardingDone} = useContext(UserContext);
  const [planButtonData, setPlanButtonData] = useState([
    ['Standard Plan', 'Upto 100 Profiles in', false, 25],
    ['Premium Plan', 'Unlimited Profiles in', false, 100],
  ]);

  // This function is to change state of skills buttons on toggle
  const changeStatus = ArrayIndex => {
    const temp = [];

    planButtonData.forEach((element, index) => {
      ArrayIndex !== index
        ? temp.push([element[0], element[1], (element[2] = false), element[3]])
        : temp.push([
            element[0],
            element[1],
            (element[2] = !element[2]),
            element[3],
          ]);
    });
    setPlanButtonData(temp);
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header3
        text={'Choose Your Plan'}
        onPress={() => setOnBoardingDone(false)}
      />
      {/* Middle */}
      <View style={{flex: 1}}>
        {/* Top Image */}
        <Image
          source={require('../../../assets/images/computer_user.png')}
          resizeMode={'contain'}
          style={styles.topImage}
        />
        {/* Select Plan */}
        {planButtonData.map((item, index) => (
          <PlanButton
            key={index}
            text1={item[0]}
            text2={item[1]}
            selected={item[2]}
            amount={item[3]}
            onPress={() => changeStatus(index)}
          />
        ))}

        {/* Bottom Text */}
        <View style={{marginHorizontal: '5%'}}>
          <Text style={styles.text1}>
            You can change your plan at any time.
          </Text>
        </View>
      </View>
      {/* Next Button */}
      <View style={{marginHorizontal: '5%', marginBottom: '5%'}}>
        <Button2
          text={'Next'}
          onPress={() => navigation.navigate('PaymentMethod')}
        />
      </View>
    </View>
  );
}

export default ChoosePlan1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topImage: {
    width: '50%',
    height: '25%',
    alignSelf: 'center',
  },
  text1: {
    fontSize: 16,
    color: '#A1A1A1',
    fontFamily: 'Poppins-Regular',
  },
});
