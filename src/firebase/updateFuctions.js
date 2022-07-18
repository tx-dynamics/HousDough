import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const setOnBoarding = async userType => {
  console.log('setOnBoarding');

  return firestore()
    .collection('Users')
    .doc(auth().currentUser.uid)
    .update({onBoarding: true})
    .then(() => {
      console.log('User OnBoarding set to true');
      return true;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
};

export const setPaymentMethod = async userType => {
  console.log('setPaymentMethod');

  return firestore()
    .collection('Users')
    .doc(auth().currentUser.uid)
    .update({paymentMethod: true})
    .then(() => {
      console.log('User payment Method set to true');
      return true;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
};
