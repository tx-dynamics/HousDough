import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import HomeHeader from '../../components/headers/homeHeader';
import colors from '../../globalStyles/colorScheme';
import HomeCard from '../../components/homeCard';
import {UserContext} from '../../contextApi/contextApi';
import {logout} from '../../firebase/authFunctions';
import {getHomeData} from '../../firebase/getFunctions';

function Home({navigation}) {
  const {userType} = useContext(UserContext);
  const [Data, setData] = useState([]);

  useEffect(() => {
    console.log('userType:', userType);
    getHomeData(userType).then(data => setData(data));
  }, []);

  // Dummy Data

  return (
    <View style={styles.container}>
      {/* Header */}
      <HomeHeader
        onPress={() => navigation.navigate('Messages')}
        onPressLogout={() =>
          logout().then(() => {
            showMessage({
              message: `Logout`,
              description: `You Logged Out Successfully!`,
              type: 'success',
              duration: 3000,
            });
          })
        }
      />
      {/* Top Text */}
      <View style={styles.topText}>
        <View>
          <Text style={styles.text1}>
            {userType ? 'Workers' : 'Venues'} nearby
          </Text>
        </View>
        {/* Filter */}
        {/* <Image
          source={require('../../../assets/icons/filter.png')}
          resizeMode={'contain'}
          style={{width: '6%', height: 30}}
        /> */}
      </View>
      {/* Middle */}

      {Data.length ? (
        <View style={{flex: 1, paddingHorizontal: '5%'}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Data}
            renderItem={({item, index}) => (
              <HomeCard
                onPress={() => {
                  userType
                    ? navigation.navigate('Profile', {userData: Data[index]})
                    : navigation.navigate('OthersProfile', {
                        userData: Data[index],
                      });
                }}
                item={item}
              />
            )}
            keyExtractor={item => item.email}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            paddingHorizontal: '5%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.text1}>No Data Available To Display!!!</Text>
        </View>
      )}
    </View>
  );
}
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginBottom: '2%',
  },
  text1: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    // width: '100%',
  },
});
