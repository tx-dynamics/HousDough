import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getUserInfo = async () => {
  // console.log('getUserInfo', auth()?.currentUser);
  const uid = await auth().currentUser.uid;
  return firestore()
    .collection('Users')
    .doc(uid)
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
