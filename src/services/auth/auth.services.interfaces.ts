import {ServiceResponse} from 'services/services.interfaces';

export interface AuthAuthenticateServiceParams {
  username?: string;
  password?: string;
  idToken?: string;
}

export interface AuthAuthenticateServiceResponse extends ServiceResponse {
  data?: {authToken: string; refreshToken: string};
}
