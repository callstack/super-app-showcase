declare module 'trading/App' {
  import type React from 'react';
  const App: React.ComponentType;
  export default App;
}

declare module 'wallet/App' {
  import type React from 'react';
  const App: React.ComponentType;
  export default App;
}

declare module 'auth/AuthProvider' {
  import type React from 'react';
  type AuthState = {isLoading: boolean; isSignout: boolean};
  const AuthProvider: React.ComponentType<{
    children: (state: AuthState) => React.ReactNode;
  }>;
  export default AuthProvider;
}

declare module 'auth/SignInScreen' {
  import type React from 'react';
  const SignInScreen: React.ComponentType;
  export default SignInScreen;
}

declare module 'auth/AccountScreen' {
  import type React from 'react';
  const AccountScreen: React.ComponentType;
  export default AccountScreen;
}