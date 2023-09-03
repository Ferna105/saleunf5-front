import React, {useState} from 'react';
import {Button, Container, Text, TextInput} from 'components';
import {HomeTabScreenProps} from 'navigation/types';
import {View} from 'react-native';
import {styles} from './search.styles';
import {useServices} from 'services/services.hook';
import {Match} from 'services/services.domain';

export const Search = ({}: HomeTabScreenProps<'Search'>) => {
  const [radiusRange, setRadiusRange] = useState<string>('20000');
  const [sport, setSport] = useState<string>('FUTBOL');
  const [matchStartDate, setMatchStartDate] =
    useState<string>('05/05/2021 19:00');
  const [coordinates, setCoordinates] = useState<string>(
    '-34.28980413557108;-60.25665707354477',
  );

  const [matches, setMatches] = useState<Array<Match>>([]);

  const {matchesService} = useServices();

  const onPressSearchButton = () => {
    matchesService
      .search({
        sport: sport,
        coordinates: coordinates,
        matchStartDate: matchStartDate,
        radiusRange: radiusRange,
      })
      .then(result => {
        if (result.data?.length) {
          setMatches(result.data);
        }
      });
  };

  return (
    <Container style={styles.container}>
      <View>
        <TextInput
          placeholder="Radio"
          value={radiusRange}
          onChangeText={setRadiusRange}
        />
        <TextInput
          placeholder="Deporte"
          value={sport}
          onChangeText={setSport}
        />
        <TextInput
          placeholder="Fecha de comienzo del partido"
          value={matchStartDate}
          onChangeText={setMatchStartDate}
        />
        <TextInput
          placeholder="Coordenadas"
          value={coordinates}
          onChangeText={setCoordinates}
        />
      </View>
      <View>
        {matches.map((match, index) => (
          <View key={index}>
            <Text>{match.address}</Text>
          </View>
        ))}
      </View>
      <Button text="Buscar" type="PRIMARY" onPress={onPressSearchButton} />
    </Container>
  );
};
