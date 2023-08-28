import React, {useContext} from 'react';
import {Button, Container, Text} from 'components';
import {styles} from './home.styles';
import {AuthContext} from 'contexts/auth.context';

export const Home = () => {
  const {setAuthToken} = useContext(AuthContext);

  const onLogout = () => setAuthToken('');

  return (
    <Container style={styles.container}>
      <Text>Hola man</Text>
      <Button text="Cerrar sesión" type="PRIMARY" onPress={onLogout} />
    </Container>
  );
};
