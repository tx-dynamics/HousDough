import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import HomeHeader from '../../components/headers/homeHeader';
import colors from '../../globalStyles/colorScheme';
import HomeCard from '../../components/homeCard';

const renderItem = ({item}) => <HomeCard item={item} />;

function Home() {
  // Dummy Data

  const [Data, setData] = useState([
    [1, require('../../../assets/images/img1.png')],
    [2, require('../../../assets/images/img2.png')],
    [3, require('../../../assets/images/img3.png')],
    [4, require('../../../assets/images/img4.png')],
  ]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <HomeHeader />
      {/* Top Text */}
      <View style={styles.topText}>
        <View>
          <Text style={styles.text1}>Venues nearby you</Text>
        </View>
        {/* Filter */}
        <Image
          source={require('../../../assets/icons/filter.png')}
          resizeMode={'contain'}
          style={{width: '6%', height: 30}}
        />
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
  },
  text1: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    width: '100%',
  },
});
