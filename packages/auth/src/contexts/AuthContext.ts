import React from 'react';

const AuthContext = React.createContext({
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
});

const useAuth = () => React.useContext(AuthContext);

export {useAuth, AuthContext};
