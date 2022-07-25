import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

export const setOnBoarding = async (userType, userData, uid) => {
  console.log('setOnBoarding', userData.VideoLink);

  const reference = storage().ref(`/usersMedia/${uid}`);
  // uploads file
  const task = reference.putFile(userData.VideoLink);

  task.on('state_changed', taskSnapshot => {
    const total = taskSnapshot.totalBytes;
    const done = taskSnapshot.bytesTransferred;
    const percentage = (done / total) * 100;
    console.log('percentage', (done / total) * 100);
  });

  return task
    .then(async () => {
      console.log('Image uploaded to the bucket!');

      userData.VideoLink = await storage()
        .ref(`/usersMedia/${uid}`)
        .getDownloadURL();

      return firestore()
        .collection('Users')
        .doc(auth()?.currentUser?.uid)
        .set(
          {
            onBoarding: true,
            ...userData,
          },
          {merge: true},
        )
        .then(() => {
          console.log('User OnBoarding set to true');
          return true;
        })
        .catch(error => {
          console.log(error);
          return false;
        });
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
    .doc(auth()?.currentUser?.uid)
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

export const updateProfile = (
  userName,
  AboutYou,
  PastExperience,
  Reference,
) => {
  console.log('updateProfile');
  return firestore()
    .collection('Users')
    .doc(auth()?.currentUser?.uid)
    .update({name: userName, AboutYou, PastExperience, Reference})
    .then(() => {
      console.log('Profile Updated');
      return true;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
};
