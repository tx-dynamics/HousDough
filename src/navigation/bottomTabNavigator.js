import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import HomeStack from './homeStack';
import Search from '../screens/tabScreens/search';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../globalStyles/colorScheme';
import {UserContext} from '../contextApi/contextApi';
import EmployersProfile from '../screens/tabScreens/employersProfile';
import WorkersProfile from '../screens/tabScreens/workersProfile';

// Creating bottom tab navigator
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const {userType} = useContext(UserContext);

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          backgroundColor: 'rgba(235, 58, 112, 0.2)',
          height: '9%',
          borderRadius: 69,
          marginHorizontal: '5%',
          shadowColor: 0,
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                ...styles.selectedTab,
                backgroundColor: focused ? colors.primary : null,
                borderWidth: focused ? 1 : 0,
              }}>
              <Image
                source={require('../../assets/icons/profile.png')}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: focused ? 'white' : colors.primary,
                }}
              />
            </View>
          ),
          headerShown: false,
          tabBarShowLabel: false,
        }}
        // options={{
        //   tabBarIcon: ({focused}) => (
        //     <Image source={require('../../assets/icons/profile.png')} />
        //   ),
        //   headerShown: false,
        // }}
        name={userType ? 'EmployersProfile' : 'WorkersProfile'}
        component={userType ? EmployersProfile : WorkersProfile}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                ...styles.selectedTab,
                backgroundColor: focused ? colors.primary : null,
                borderWidth: focused ? 1 : 0,
              }}>
              <Image
                source={require('../../assets/icons/home.png')}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: focused ? 'white' : colors.primary,
                }}
              />
            </View>
          ),
          headerShown: false,
          tabBarShowLabel: false,
        }}
        name="HomeStack"
        component={HomeStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                ...styles.selectedTab,
                backgroundColor: focused ? colors.primary : null,
                borderWidth: focused ? 1 : 0,
              }}>
              <Image
                source={require('../../assets/icons/search.png')}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: focused ? 'white' : colors.primary,
                }}
              />
            </View>
          ),
          headerShown: false,
          tabBarShowLabel: false,
        }}
        name="Search"
        component={Search}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
const styles = StyleSheet.create({
  selectedTab: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,

    borderColor: 'white',
  },
});
