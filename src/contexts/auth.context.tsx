import React, {
  createContext,
  useReducer,
  useCallback,
  useMemo,
  PropsWithChildren,
} from 'react';

interface AuthState {
  authToken: string;
}

const initialState: AuthState = {
  authToken: '',
};

enum AuthActionTypes {
  SET_AUTH_TOKEN = 'SET_AUTH_TOKEN',
}

interface SetAuthTokenAction {
  type: AuthActionTypes.SET_AUTH_TOKEN;
  payload: string;
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
  authToken: string;
  setAuthToken: (authToken: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  authToken: '',
  setAuthToken: () => {},
});

const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const setAuthToken = useCallback(
    (authToken: string): void => {
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

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};