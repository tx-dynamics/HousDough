import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// This Function Is for Creatinon of new User
export const signup = async (values, userType) => {
  console.log('userType', userType);
  const {email, password, name} = values;
  let response = auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async userData => {
      return firestore()
        .collection('Users')
        .doc(userData.user.uid)
        .set({
          name: name,
          email: email,
          userType: userType,
          onBoarding: false,
          paymentMethod: false,
        })
        .then(() => {
          return true;
          console.log('User added to cloud store!');
        });
      console.log('User account created & signed in!');
    })
    .catch(error => {
      console.log("errorrr", error);
      if (error.code === 'auth/email-already-in-use') {
        return 'That email address is already in use!';
      }

      if (error.code === 'auth/invalid-email') {
        return 'That email address is invalid!';
      }
    });

  return response;
};

// This Function Is for Loging Out the Current User

export const logout = async () => {
  let response = auth()
    .signOut()
    .then(() => {
      return true;
    })
    .catch(error => {
      return error.code;
    });
  return response;
};

//This Function is to Signin User

export const signin = async values => {
  const {email, password} = values;

  let response = auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User Signed in!');
      return true;
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        return 'This Account does not exist!';
      } else if (error.code == 'auth/wrong-password')
        return 'Wrong password. Please try again.';
      else if (error.code == 'auth/too-many-requests')
        return 'This Account have been temporarily disabled. Please reset your password.';
      else {
        return 'Something Went Wrong!';
      }
    });
  return response;
};

//This is to reset user password

export const handleForgetPassword = async email => {
  return auth()
    .sendPasswordResetEmail(email)
    .then(function (user) {
      return true;
    })
    .catch(function (error) {
      console.log(error.message);
      return false;
    });
};
