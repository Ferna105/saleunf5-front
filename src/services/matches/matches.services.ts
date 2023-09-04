import {services} from '../services.constants';
import {useContext} from 'react';
import {ServiceContext} from 'contexts/service.context';
import {MatchesSearchApiResponse} from './matches.api.interfaces';
import {
  MatchesSearchServiceParams,
  MatchesSearchServiceResponse,
} from './matches.services.interfaces';
import {mapMatchesSearchApiToService} from './matches.services.mappers';

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
      const response = await client.get<MatchesSearchApiResponse>(
        services.API_V1.matches.search + queryString,
      );

      return mapMatchesSearchApiToService(response.data);
    } catch (error) {
      return {status: 'ERROR', error};
    }
  };

  return {search};
};
