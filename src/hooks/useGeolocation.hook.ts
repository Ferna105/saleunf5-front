import Geolocation from '@react-native-community/geolocation';
import {useCallback, useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';

export const useGeolocation = () => {
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [ok, setOk] = useState<boolean>(false);

  const setLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setLatitude(currentLatitude);
        setLongitude(currentLongitude);
        setOk(true);
      },
      () => {
        setOk(false);
      },
    );
  };

  const checkAndRequestPermissions = useCallback(async (): Promise<void> => {
    if (Platform.OS === 'ios') {
      setLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
            buttonPositive: 'Confirmar',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setLocation();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    checkAndRequestPermissions();
  }, [checkAndRequestPermissions]);

  return {latitude, longitude, ok};
};
