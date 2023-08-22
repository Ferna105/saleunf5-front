import React, {useContext} from 'react';
import {Container, Text} from 'components';
import {Button, View} from 'react-native';
import {styles} from './styles';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {authenticate} from 'services/auth.services';
import {AuthContext} from 'contexts/auth.context';

export const Login = () => {
  const {setAuthToken} = useContext(AuthContext);

  GoogleSignin.configure({
    webClientId:
      '325980594852-ar53h789aia7pubkrmjr4td26m6b28c2.apps.googleusercontent.com',
  });

  const onPressGoogleBtn = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    auth()
      .signInWithCredential(googleCredential)
      .then(user => {
        authenticate({username: 'matias', password: 'zapillon'}).then(
          response => {
            if (response.status === 'SUCCESS') {
              setAuthToken(response.data?.authToken ?? '');
            }
          },
        );
      })
      .catch(error => console.log(error));
  };

  return (
    <Container style={styles.container}>
      <Text>Iniciar sesión</Text>
      <View>
        <Text>Usuario</Text>
      </View>
      <View>
        <Text>Contraseña</Text>
      </View>
      <Button onPress={onPressGoogleBtn} title="Iniciar sesión con Google" />
    </Container>
  );
};
