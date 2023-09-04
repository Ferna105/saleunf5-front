import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useReducer,
  useCallback,
  useMemo,
  PropsWithChildren,
  useEffect,
} from 'react';

interface AuthState {
  authToken: string | null;
}

const initialState: AuthState = {
  authToken: null,
};

enum AuthActionTypes {
  SET_AUTH_TOKEN = 'SET_AUTH_TOKEN',
}

interface SetAuthTokenAction {
  type: AuthActionTypes.SET_AUTH_TOKEN;
  payload: string | null;
}

type AuthAction = SetAuthTokenAction;

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };
    default:
      return state;
  }
};

interface AuthContextType {
  authToken: string | null;
  setAuthToken: (authToken: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  authToken: null,
  setAuthToken: () => {},
});

const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const {getItem, setItem} = useAsyncStorage('@authToken');

  const setAuthToken = useCallback(
    (authToken: string | null): void => {
      const action: SetAuthTokenAction = {
        type: AuthActionTypes.SET_AUTH_TOKEN,
        payload: authToken,
      };
      dispatch(action);
    },
    [dispatch],
  );

  const contextValue = useMemo(() => {
    return {
      authToken: state.authToken,
      setAuthToken,
    };
  }, [state.authToken, setAuthToken]);

  useEffect(() => {
    if (state.authToken === null) {
      getItem().then(authToken => {
        setAuthToken(authToken ?? '');
      });
    } else {
      setItem(state.authToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAuthToken, state.authToken]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
