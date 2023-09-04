import {services} from '../services.constants';
import {useContext} from 'react';
import {ServiceContext} from 'contexts/service.context';
import {AuthAuthenticateApiResponse} from './auth.api.interfaces';
import {
  AuthAuthenticateServiceParams,
  AuthAuthenticateServiceResponse,
} from './auth.services.interfaces';
import {mapAuthAuthenticateApiToService} from './auth.services.mappers';

export const useAuthService = () => {
  const client = useContext(ServiceContext);

  const authenticate = async ({
    username,
    password,
    idToken,
  }: AuthAuthenticateServiceParams): Promise<AuthAuthenticateServiceResponse> => {
    try {
      const response = await client.post<AuthAuthenticateApiResponse>(
        services.API_V1.auth.authenticate,
        {
          username,
          password,
          idToken,
        },
      );

      return mapAuthAuthenticateApiToService(response.data);
    } catch (error) {
      return {status: 'ERROR', error};
    }
  };

  return {authenticate};
};
