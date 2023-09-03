import {services} from './services.constants';
import {ServiceResponse} from './services.interfaces';
import {useContext} from 'react';
import {ServiceContext} from 'contexts/service.context';

interface MatchesSearchServiceParams {
  radiusRange: string;
  sport: string;
  matchStartDate: string;
  coordinates: string;
}

interface MatchesSearchServiceResponse extends ServiceResponse {
  data?: {authToken: string};
}

export const useMatchesService = () => {
  const client = useContext(ServiceContext);

  const search = async ({
    radiusRange,
    sport,
    matchStartDate,
    coordinates,
  }: MatchesSearchServiceParams): Promise<MatchesSearchServiceResponse> => {
    const queryString = `?radiusRange=${radiusRange}&sport=${sport}&matchStartDate=${matchStartDate}&coordinates=${coordinates}`;

    try {
      const response = await client.get(
        services.API_V1.matches.search + queryString,
      );

      return {data: response.data, status: 'SUCCESS'};
    } catch (error) {
      return {status: 'ERROR', error};
    }
  };

  return {search};
};
