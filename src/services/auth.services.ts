import {services} from './services.constants';

interface AuthenticateServiceParams {
  user: string;
  password: string;
}

export const authenticate = ({
  user,
  password,
}: AuthenticateServiceParams): Promise<Response> => {
  return fetch(services.API_V1.auth.authenticate, {
    body: JSON.stringify({user, password}),
    method: 'POST',
  });
};
