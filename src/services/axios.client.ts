import axios from 'axios';
import {AuthContext} from 'contexts/auth.context';
import {useContext, useEffect} from 'react';

const axiosClient = axios.create();

export const useAxiosClient = () => {
  const {setAuthToken} = useContext(AuthContext);

  useEffect(() => {
    axiosClient.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        /**
         * TODO: LOGOUT POR SESIÖN EXPIRADA
         */
        console.log({error});
        if (error.response.status === 401) {
          setAuthToken('');
        }
        return Promise.reject(error);
      },
    );
  }, [setAuthToken]);

  return {axiosClient};
};
