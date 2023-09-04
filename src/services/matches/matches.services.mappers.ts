import {MatchesSearchApiResponse} from './matches.api.interfaces';
import {MatchesSearchServiceResponse} from './matches.services.interfaces';

export const mapMatchesSearchApiToService = (
  apiResponse: MatchesSearchApiResponse,
): MatchesSearchServiceResponse => {
  return {
    status: 'SUCCESS',
    data: apiResponse._embedded.matches.map(match => {
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
    }),
  };
};
