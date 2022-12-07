import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthService {
  TOKEN_KEY = 'token';

  getCredentials(): Promise<string | null> {
    return AsyncStorage.getItem(this.TOKEN_KEY);
  }

  setCredentials(token: string): Promise<void> {
    return AsyncStorage.setItem(this.TOKEN_KEY, token);
  }

  removeCredentials(): Promise<void> {
    return AsyncStorage.removeItem(this.TOKEN_KEY);
  }

  static shared = new AuthService();
}

export default AuthService;
