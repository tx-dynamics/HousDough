import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import Header1 from '../../components/headers/Header1';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {useSelector, useDispatch} from 'react-redux';
import colors from '../../globalStyles/colorScheme';
import Button2 from '../../components/buttons/button2';
import {UserContext} from '../../contextApi/contextApi';
import {setOnBoarding} from '../../firebase/updateFuctions';
import {
  setAboutYou,
  setPastExperience,
  setReference,
} from '../../redux/features/onBoadrdingSlice';
import LoaderMessageModal from '../../components/Modals/loaderMessageModal';

function SetupScreen4({navigation}) {
  const {userType, setOnBoardingDone, setPaymentDone} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const {email, uid} = useSelector(state => state.userProfile);
  const {
    location,
    Postcode,
    VideoLink,
    Skills,
    AboutYou,
    PastExperience,
    Reference,
  } = useSelector(state => state.onBoadrding);
  const onBoadrdingDispatch = useDispatch();

  useEffect(() => {
    console.log(AboutYou, PastExperience, Reference);
  }, []);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Header1 text={'Add About You'} Screen={4} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* About You Text */}
        <View style={styles.textContainer}>
          <Text style={styles.text2}>
            Share some facts about you in 25 words or less. If you are
            struggling, think of how friends and family or customers would
            describe you.
          </Text>
        </View>
        {/* Write about Yourself */}
        <View style={styles.box}>
          <TextInput
            style={styles.boxText}
            placeholder="Write about Yourself..."
            placeholderTextColor={colors.black}
            multiline={true}
            value={AboutYou}
            onChangeText={txt =>
              onBoadrdingDispatch(setAboutYou({AboutYou: txt}))
            }
          />
        </View>
        {/* Your Past Experience */}

        {!userType ? (
          <View>
            <Text style={styles.text1}>Your Past Experience</Text>
            {/* About You Text  */}
            <View style={styles.textContainer}>
              <Text style={styles.text2}>
                This is your chance to give a brief overview- focus less on your
                skills as you will be able to choose those next and more on your
                years/months of experience and any particular venues you have
                worked at.
                {`
  
Tip: Keep this short and summarized- at Hosdough we want to ditch the CV.  
 
Note: If you don't have any previous experience write about what venues you want to work at and why.`}
              </Text>
            </View>
            <View style={styles.box}>
              <TextInput
                style={styles.boxText}
                placeholder="Write here..."
                placeholderTextColor={colors.black}
                multiline={true}
                value={PastExperience}
                onChangeText={txt =>
                  onBoadrdingDispatch(setPastExperience({PastExperience: txt}))
                }
              />
            </View>
          </View>
        ) : null}
        {/* Reference */}

        {!userType ? (
          <View>
            <Text style={styles.text1}>Reference</Text>
            <View style={styles.box}>
              <TextInput
                style={styles.boxText}
                placeholder="Write here..."
                placeholderTextColor={colors.black}
                multiline={true}
                value={Reference}
                onChangeText={txt =>
                  onBoadrdingDispatch(setReference({Reference: txt}))
                }
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
            if (AboutYou == '')
              showMessage({
                message: `About You Is Required`,
                type: 'info',
                duration: 3000,
              });
            else if (PastExperience == '' && userType == 0)
              showMessage({
                message: `Past Experience Is Required`,
                type: 'info',
                duration: 3000,
              });
            else if (Reference == '' && userType == 0)
              showMessage({
                message: `Reference Is Required`,
                type: 'info',
                duration: 3000,
              });
            else {
              setIsLoading(true);
              setOnBoarding(
                userType,
                {
                  location,
                  Postcode,
                  VideoLink,
                  Skills,
                  AboutYou,
                  PastExperience,
                  Reference,
                },
                uid,
              ).then(data => {
                setIsLoading(false);
                if (data) {
                  showMessage({
                    message: `Profile Setup`,
                    description: `Profile Setup Successfully!`,
                    type: 'success',
                    duration: 3000,
                  });
                  !userType && setPaymentDone(false);
                  setOnBoardingDone(true);
                } else {
                  showMessage({
                    message: `Profile Setup`,
                    description: `Something Went Wrong!`,
                    type: 'danger',
                    duration: 3000,
                  });
                }
              });
            }
          }}
          text={'Done'}
          light={false}
        />
      </View>
      {/* Loader */}
      <LoaderMessageModal
        message={'You Profile is setting up, This might take a while'}
        Visibility={isLoading}
      />
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
  textContainer: {
    backgroundColor: '#FAFAFA',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    padding: '3%',
    flexDirection: 'row',
    borderColor: '#CDCDCD',
    borderWidth: 1,
    marginVertical: '2%',
  },
  text2: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textAlign: 'center',
  },
});
