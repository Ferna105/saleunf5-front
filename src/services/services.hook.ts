import {useAuthService} from './auth.services';
import {useMatchesService} from './matches.services';

export const useServices = () => {
  const authService = useAuthService();
  const matchesService = useMatchesService();

  return {authService, matchesService};
};
