import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {createThumbnail} from 'react-native-create-thumbnail';

export const setOnBoarding = async (userType, userData, uid) => {
  console.log('setOnBoarding', userData);

  createThumbnail({
    url: userData.VideoLink,
    timeStamp: 5000,
  })
    .then(response => {
      const thumbnailReference = storage().ref(`/usersVideosThumbnail/${uid}`);

      console.log('response.path', response.path);

      thumbnailReference.putFile(response.path).then(async () => {
        console.log('Image uploaded to the bucket!');
        userData.thumbnail = await storage()
          .ref(`/usersVideosThumbnail/${uid}`)
          .getDownloadURL();
      });
    })
    .catch(err => console.log({err}));

  const reference = storage().ref(`/usersVideos/${uid}`);
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
      console.log('Video uploaded to the bucket!');

      userData.VideoLink = await storage()
        .ref(`/usersVideos/${uid}`)
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

export const setPaymentMethod = async (userType, email, Plan, value) => {
  const {cardNumber, cvv, expDate, name} = value;
  // console.log('setPaymentMethod', email, Plan, value);

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    email: email,
    plan: Plan,
    token: {
      number: cardNumber,
      exp_month: expDate.substring(0, expDate.indexOf('/')),
      exp_year: expDate.substring(expDate.indexOf('/') + 1),
      cvc: cvv,
      name: name,
    },
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(
    'https://hosdough-backend.herokuapp.com/stripe/make_payment',
    requestOptions,
  )
    .then(response => response.json())
    .then(result => {
      console.log(result);

      //payment successfull
      if (result.status) {
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
      } else {
        // payment failes
        return false;
      }
    })
    .catch(error => console.log('error', error));
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

// this function is send chat messages
export async function addToArray(collection, doc, array, value) {
  await firestore()
    .collection(collection)
    .doc(doc)
    .set(
      {
        [array]: firestore.FieldValue.arrayUnion(value),
      },
      {merge: true},
    );
}
