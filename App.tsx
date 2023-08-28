// In App.js in a new project

import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {AuthProvider} from 'contexts/auth.context';
import {Navigator} from './src/navigation';

function App() {
  const scheme = useColorScheme();

  //Getting initial data app
  useEffect(() => {
    //FCM Token, TODO: Enviar a back para registrarlo
    messaging()
      .getToken()
      .then(res => console.log(res));
  }, []);

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
