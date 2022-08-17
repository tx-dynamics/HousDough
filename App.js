import React, {useEffect} from 'react';
import {View, Text, TextInput, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import RootNavigator from './src/navigation/rootNavigator';
import {UserProvider} from './src/contextApi/contextApi';
import {store} from './src/redux/stores/store';
//import {StripeProvider} from '@stripe/stripe-react-native';
import {logout} from './src/firebase/authFunctions';
// const publishableKey =
//   'pk_test_51LNZqVB4V2Xg8qCiEBroGh3IjmI7VcQFftYUW5Jx8lKRVEsFUsClNc2smqrUi16p7oQHBA9Q2Di8l91bPvOKSn1900ocJ1hyVI';

function App() {
  // This useEffect is stop font scalling

  useEffect(() => {
    // logout();

    console.log('App Use Effect');
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
  }, []);
  return (
    //  Redux Provider
    <Provider store={store}>
      {/* ContextApi Provider */}
      <UserProvider>
        <RootNavigator />
      </UserProvider>
      {/* GLOBAL FLASH MESSAGE COMPONENT INSTANCE */}
      <FlashMessage position="top" />
      {/* StatusBar */}
      {/* <StatusBar  barStyle="light-content" backgroundColor={'white'} /> */}
    </Provider>
  );
}

export default App;
