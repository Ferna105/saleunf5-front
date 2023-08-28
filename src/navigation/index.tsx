import React, {useContext} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from 'screens/public/login/login.screen';
import {Home} from 'screens/private/home/home.screen';
import {AuthContext} from 'contexts/auth.context';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  const {authToken} = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {authToken ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};
