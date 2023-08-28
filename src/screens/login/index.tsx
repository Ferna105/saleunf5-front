import React, {useContext, useState} from 'react';
import {Container, Text, TextInput} from 'components';
import {View} from 'react-native';
import {styles} from './styles';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {authenticate} from 'services/auth.services';
import {AuthContext} from 'contexts/auth.context';
import {Separator} from 'components/Separator/separator.component';
import {Sizing} from 'utils/sizing';
import {Button} from 'components';

export const Login = () => {
  const {setAuthToken} = useContext(AuthContext);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  GoogleSignin.configure({
    webClientId:
      '325980594852-ar53h789aia7pubkrmjr4td26m6b28c2.apps.googleusercontent.com',
  });

  const onPressGoogleBtn = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    auth()
      .signInWithCredential(googleCredential)
      .then(() => {
        authenticate({username: username, password: password}).then(
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
      <Text fontSize="L" color="text" style={{marginBottom: Sizing.M}}>
        Iniciar sesión
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          onChangeText={setUsername}
          placeholder="Usuario"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setPassword}
          placeholder="Contraseña"
          autoCorrect={false}
          autoComplete="off"
          autoCapitalize="none"
          passwordRules={'asd'}
          secureTextEntry
        />
      </View>
      <Separator />
      <Button
        onPress={onPressGoogleBtn}
        text="Iniciar sesión con Google"
        type="TERTIARY"
        icon="Google"
      />
    </Container>
  );
};
