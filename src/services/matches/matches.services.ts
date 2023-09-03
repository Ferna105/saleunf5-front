import {services} from '../services.constants';
import {ServiceResponse} from '../services.interfaces';
import {useContext} from 'react';
import {ServiceContext} from 'contexts/service.context';
import {MatchesSearchApiResponse} from './api.interfaces';
import {Match} from 'services/services.domain';

interface MatchesSearchServiceParams {
  radiusRange: string;
  sport: string;
  matchStartDate: string;
  coordinates: string;
}

interface MatchesSearchServiceResponse extends ServiceResponse {
  data?: Array<Match>;
}

const mapMatchesSearchApiToService = (
  apiResponse: MatchesSearchApiResponse,
): Array<Match> => {
  return apiResponse._embedded.matches.map(match => {
    return {
      id: match.id,
      address: match.address,
      coordinates: {
        coordinates: match.coordinates.coordinates,
        type: match.coordinates.type,
      },
      endDate: match.endDate,
      missingPlayers: match.missingPlayers,
      person: match.person,
      sport: match.sport,
      startDate: match.startDate,
      status: match.status,
    };
  });
};

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

      return {
        data: mapMatchesSearchApiToService(response.data),
        status: 'SUCCESS',
      };
    } catch (error) {
      return {status: 'ERROR', error};
    }
  };

  return {search};
};
