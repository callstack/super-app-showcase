import React from 'react';
import AuthService from '../services/AuthService';
import {AuthContext} from '../contexts/AuthContext';

enum ActionTypes {
  RESTORE_TOKEN = 'RESTORE_TOKEN',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

type Action = {
  type: ActionTypes;
  payload?: any;
};

type State = {
  isLoading: boolean;
  isSignout: boolean;
};

const reducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.RESTORE_TOKEN:
      return {
        ...prevState,
        isSignout: action.payload,
        isLoading: false,
      };
    case ActionTypes.SIGN_IN:
      return {
        ...prevState,
        isSignout: false,
      };
    case ActionTypes.SIGN_OUT:
      return {
        ...prevState,
        isSignout: true,
      };
    default:
      return prevState;
  }
};

const AuthProvider = ({
  children,
}: {
  children: (data: State) => React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(reducer, {
    isLoading: true,
    isSignout: true,
  });

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        try {
          await AuthService.shared.setCredentials('dummy-auth-token');
        } catch (e) {
          // Handle error
        }

        dispatch({type: ActionTypes.SIGN_IN});
      },
      signOut: async () => {
        try {
          await AuthService.shared.removeCredentials();
        } catch (e) {
          // Handle error
        }

        dispatch({type: ActionTypes.SIGN_OUT});
      },
      signUp: async () => {
        try {
          await AuthService.shared.setCredentials('dummy-auth-token');
        } catch (e) {
          // Handle error
        }

        dispatch({type: ActionTypes.SIGN_IN});
      },
    }),
    [],
  );

  React.useEffect(() => {
    const restoreToken = async () => {
      let userToken;

      try {
        userToken = await AuthService.shared.getCredentials();
      } catch (e) {
        // Handle error
      }

      dispatch({type: ActionTypes.RESTORE_TOKEN, payload: !userToken});
    };

    restoreToken();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      {children(state)}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
