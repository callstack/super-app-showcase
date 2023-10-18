import {createAuthProviderMock} from './AuthProvider';
import {AccountScreenMock} from './AccountScreen';
import {SignInScreenMock} from './SignInScreen';

export default (module: string) => {
  switch (module) {
    case './AuthProvider':
      return createAuthProviderMock({});
    case './SignInScreen':
      return AccountScreenMock;
    case './AccountScreen':
      return SignInScreenMock;
    default:
      throw new Error(`AuthMock: unknown module: ${module}`);
  }
};
