import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getUserInfo = async () => {
  // console.log('getUserInfo', auth()?.currentUser);
  const uid = await auth()?.currentUser?.uid;
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

// This function is to get users

export const getHomeData = async userType => {
  console.log('getHomeData');
  const temp = [];
  await firestore()
    .collection('Users')
    .where('userType', '!=', userType)
    .get()
    .then(data => {
      data.forEach((item, index) => {
        console.log(index, item.data());
        temp.push(item.data());
      });
    })
    .catch(error => console.log('getHomeData', error));

  return temp;
};
