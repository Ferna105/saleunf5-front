// In App.js in a new project

import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from 'screens/login';
import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator();

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
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
