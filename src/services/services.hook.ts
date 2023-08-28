import {useAuthService} from './auth.services';

export const useServices = () => {
  const authService = useAuthService();

  return {authService};
};
