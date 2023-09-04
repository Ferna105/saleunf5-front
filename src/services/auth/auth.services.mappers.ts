import {AuthAuthenticateApiResponse} from './auth.api.interfaces';
import {AuthAuthenticateServiceResponse} from './auth.services.interfaces';

export const mapAuthAuthenticateApiToService = (
  apiResponse: AuthAuthenticateApiResponse,
): AuthAuthenticateServiceResponse => {
  return {
    data: {
      authToken: apiResponse.access_token,
      refreshToken: apiResponse.refresh_token,
    },
    status: 'SUCCESS',
  };
};
