import React from 'react';
import {Container, Text} from 'components';
import {View} from 'react-native';
import {styles} from './styles';

export const Login = () => {
  return (
    <Container style={styles.container}>
      <Text>Iniciar sesión</Text>
      <View>
        <Text>Usuario</Text>
      </View>
      <View>
        <Text>Contraseña</Text>
      </View>
    </Container>
  );
};
