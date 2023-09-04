import {Match} from 'services/services.domain';
import {ServiceResponse} from 'services/services.interfaces';

export interface MatchesSearchServiceParams {
  radiusRange: string;
  sport: string;
  matchStartDate: string;
  coordinates: string;
}

export interface MatchesSearchServiceResponse extends ServiceResponse {
  data?: Array<Match>;
}
