import {services} from './services.constants';
import {useAxiosClient} from './axios.client';
import {ServiceResponse} from './services.interfaces';

interface AuthenticateServiceParams {
  username: string;
  password: string;
}

interface AuthenticateServiceResponse extends ServiceResponse {
  data?: {authToken: string};
}

export const useAuthService = () => {
  const {axiosClient} = useAxiosClient();

  const authenticate = async ({
    username,
    password,
  }: AuthenticateServiceParams): Promise<AuthenticateServiceResponse> => {
    try {
      const response = await axiosClient.post(
        services.API_V1.auth.authenticate,
        {
          username,
          password,
        },
      );

      return {data: {authToken: response.data}, status: 'SUCCESS'};
    } catch (error) {
      return {status: 'ERROR', error};
    }
  };

  return {authenticate};
};
