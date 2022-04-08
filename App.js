import React, {useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import RootNavigator from './src/navigation/rootNavigator';
import {UserProvider} from './src/contextApi/contextApi';

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
    <UserProvider>
      <RootNavigator />
    </UserProvider>
  );
}

export default App;
