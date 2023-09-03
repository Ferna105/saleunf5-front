import {services} from '../services.constants';
import {ServiceResponse} from '../services.interfaces';
import {useContext} from 'react';
import {ServiceContext} from 'contexts/service.context';

interface AuthAuthenticateServiceParams {
  username?: string;
  password?: string;
  idToken?: string;
}

interface AuthAuthenticateServiceResponse extends ServiceResponse {
  data?: {authToken: string};
}

export const useAuthService = () => {
  const client = useContext(ServiceContext);

  const authenticate = async ({
    username,
    password,
    idToken,
  }: AuthAuthenticateServiceParams): Promise<AuthAuthenticateServiceResponse> => {
    try {
      const response = await client.post(services.API_V1.auth.authenticate, {
        username,
        password,
        idToken,
      });

      return {data: {authToken: response.data}, status: 'SUCCESS'};
    } catch (error) {
      return {status: 'ERROR', error};
    }
  };

  return {authenticate};
};
