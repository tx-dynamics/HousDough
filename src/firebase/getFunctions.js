import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getUserInfo = () => {
  // console.log('getUserInfo', auth()?.currentUser);
  return firestore()
    .collection('Users')
    .doc(auth()?.currentUser?.uid)
    .get()
    .then(res => {
      //   console.log(res.data());
      return res.data();
    })
    .catch(error => {
      console.log(error);
      return null;
    });
};
