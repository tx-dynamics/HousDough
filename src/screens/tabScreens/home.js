import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import HomeHeader from '../../components/headers/homeHeader';
import colors from '../../globalStyles/colorScheme';
import HomeCard from '../../components/homeCard';
import {UserContext} from '../../contextApi/contextApi';
import {logout} from '../../firebase/authFunctions';
function Home({navigation}) {
  const {userType} = useContext(UserContext);

  const renderItem = ({item}) => (
    <HomeCard
      onPress={() => {
        userType
          ? navigation.navigate('Profile')
          : navigation.navigate('OthersProfile');
      }}
      item={item}
      ImageSource={item[1]}
      UserType={userType}
      Home={true}
    />
  );

  useEffect(() => {
    console.log('userType:', userType);
  }, []);

  // Dummy Data

  const [Data, setData] = useState([
    [1, require('../../../assets/images/img1.png'), 'Kathryn Murphy'],
    [2, require('../../../assets/images/img2.png'), 'Wade Warren'],
    [3, require('../../../assets/images/img3.png'), 'Robert Fox'],
    [4, require('../../../assets/images/img4.png'), 'Jacob Jones'],
  ]);

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

      <View style={{flex: 1, paddingHorizontal: '5%'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Data}
          renderItem={renderItem}
          keyExtractor={item => item[0]}
        />
      </View>
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
    width: '100%',
  },
});
