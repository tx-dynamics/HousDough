import React, {useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Provider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import RootNavigator from './src/navigation/rootNavigator';
import {UserProvider} from './src/contextApi/contextApi';
import {store} from './src/redux/stores/store';

function App() {
  // This useEffect is stop font scalling
  useEffect(() => {
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
    </Provider>
  );
}

export default App;
