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
  console.log('getHomeData', userType);
  const temp = [];
  await firestore()
    .collection('Users')
    .where('userType', '!=', userType)
    .get()
    .then(data => {
      data.forEach((item, index) => {
        // console.log('index', item.id, item.data());
        const _Data = item.data();
        _Data.uid = item.id;
        temp.push(_Data);
      });
    })
    .catch(error => console.log('getHomeData', error));

  return temp;
};

export const searchUsersOnMapPostcode = async (Postcode, userType) => {
  console.log('searchUsersOnMapPostcode', Postcode);

  return await firestore()
    .collection('Users')
    .where('Postcode', '==', Postcode)
    .get()
    .then(data => {
      console.log('then');
      if (data.empty) {
        return [];
        console.log('No users found for this PostCode');
      }
      const temp = [];
      data.forEach((item, index) => {
        const _Data = item.data();

        if (_Data.userType != userType) {
          console.log('---------------------', index, _Data);
          temp.push(_Data);
        }
      });
      return temp;
      // console.log('=>', data);
    })
    .catch(error => {
      console.log(error);
      return;
    });
};

export const searchUsersOnMapArea = async (lat, lng, userType) => {
  console.log('searchUsersOnMapArea', lat, lng);

  let northlat = lat + 0.03;
  let southlat = lat - 0.03;
  let eastlng = lng + 0.03;
  let westlng = lng - 0.03;

  northlat = northlat.toString();
  southlat = southlat.toString();

  console.log('===<>', northlat, southlat, eastlng, westlng);
  return await firestore()
    .collection('Users')
    .where('location.Latitude', '<=', northlat)
    .where('location.Latitude', '>=', southlat)
    .get()
    .then(data => {
      console.log('then');
      if (data.empty) {
        return [];
        console.log('No users found for this PostCode');
      }
      const temp = [];
      data.forEach((item, index) => {
        const _Data = item.data();

        if (
          parseFloat(_Data.location.Longitude) <= eastlng &&
          parseFloat(_Data.location.Longitude) >= westlng &&
          _Data.userType != userType
        ) {
          console.log(index, item.id, _Data.location);
          temp.push(_Data);
        }
      });
      return temp;
      // console.log('=>', data);
    })
    .catch(error => {
      console.log(error);
      return;
    });
};
