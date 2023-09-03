import React, {
  createContext,
  PropsWithChildren,
  useRef,
  useEffect,
  useContext,
} from 'react';
import axios, {AxiosInstance} from 'axios';
import {AuthContext} from './auth.context';

const axiosInstance = axios.create();

const ServiceContext = createContext<AxiosInstance>(axiosInstance);

const ServiceProvider: React.FC<PropsWithChildren> = ({children}) => {
  const {setAuthToken} = useContext(AuthContext);
  const client = useRef(axiosInstance);

  useEffect(() => {
    client.current.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        /**
         * TODO: LOGOUT POR SESIÖN EXPIRADA
         */
        if (error?.response?.status === 401) {
          setAuthToken('');
        }
        return Promise.reject(error);
      },
    );
  }, [setAuthToken]);

  return (
    <ServiceContext.Provider value={client.current}>
      {children}
    </ServiceContext.Provider>
  );
};

export {ServiceContext, ServiceProvider};
