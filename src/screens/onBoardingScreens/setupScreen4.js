import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import Header1 from '../../components/headers/Header1';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {useSelector, useDispatch} from 'react-redux';
import colors from '../../globalStyles/colorScheme';
import Button2 from '../../components/buttons/button2';
import {UserContext} from '../../contextApi/contextApi';
// import {setOnBoarding} from '../../firebase/updateFuctions';
import {
  setAboutYou,
  setPastExperience,
  setReference,
} from '../../redux/features/userSlice';
import LoaderMessageModal from '../../components/Modals/loaderMessageModal';

function SetupScreen4({navigation}) {
  const {userType, setOnBoardingDone, setPaymentDone, onBoardingDone} =
    useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [profileSetupProgress, setProfileSetupProgress] = useState(0);
  const {
    email,
    uid,
    location,
    Postcode,
    VideoLink,
    Skills,
    AboutYou,
    PastExperience,
    Reference,
  } = useSelector(state => state.userProfile);
  const userDispatch = useDispatch();

  useEffect(() => {
    console.log('setupScreen 4');
    console.log('userType', userType, onBoardingDone);
  }, []);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Header1
        text={
          0
            ? 'Add About You'
            : `Describe your venue for potential workers. Try to avoid cliches or copy pasting your website- Keep it real and describe the pace or the other workers or the customers - Don't shy away from the hard parts but also include incentives that would attract someone
 
 Remember there are thousands of other venues competing for the same workers so keep it real`
        }
        Screen={4}
      />
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
            onChangeText={txt => userDispatch(setAboutYou({AboutYou: txt}))}
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
                  userDispatch(setPastExperience({PastExperience: txt}))
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
                  userDispatch(setReference({Reference: txt}))
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
              let _data = {
                location,
                Postcode,
                VideoLink,
                Skills,
                AboutYou,
              };
              // If user is worker including PastExperience, Reference, properties
              if (userType == 0) {
                _data = {..._data, PastExperience, Reference};
              }
              setIsLoading(true);
              // setOnBoarding(userType, _data, uid, setProfileSetupProgress).then(
              //   data => {
              //     setIsLoading(false);
              //     if (data) {
              //       showMessage({
              //         message: `Profile Setup`,
              //         description: `Profile Setup Successfully!`,
              //         type: 'success',
              //         duration: 3000,
              //       });
              //       !userType && setPaymentDone(true);
              //       setOnBoardingDone(true);
              //     } else {
              //       showMessage({
              //         message: `Profile Setup`,
              //         description: `Something Went Wrong!`,
              //         type: 'danger',
              //         duration: 3000,
              //       });
              //     }
              //   },
              // );
            }
          }}
          text={'Done'}
          light={false}
        />
      </View>
      {/* Loader */}
      <LoaderMessageModal
        message={'Your Profile is setting up, This might take a while'}
        Visibility={isLoading}
        progressPercentage={profileSetupProgress}
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
