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
  const {setAuthToken, authToken} = useContext(AuthContext);
  const client = useRef(axiosInstance);

  useEffect(() => {
    client.current.interceptors.request.use(request => {
      request.headers.Authorization = `Bearer ${authToken}`;
      return request;
    });

    client.current.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        console.log({interceptoError: error});
        /**
         * TODO: LOGOUT POR SESIÖN EXPIRADA
         */
        if (error?.response?.status === 401) {
          setAuthToken('');
        }
        return Promise.reject(error);
      },
    );
  }, [setAuthToken, authToken]);

  return (
    <ServiceContext.Provider value={client.current}>
      {children}
    </ServiceContext.Provider>
  );
};

export {ServiceContext, ServiceProvider};
