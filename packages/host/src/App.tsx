import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PriceProvider} from 'super-app-showcase-sdk';
import MainNavigator from './navigation/MainNavigator';
import SplashScreen from './components/SplashScreen';
import ErrorBoundary from './components/ErrorBoundary';
import {theme} from './theme';

const AuthProvider = React.lazy(() => import('auth/AuthProvider'));
const SignInScreen = React.lazy(() => import('auth/SignInScreen'));

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <PaperProvider theme={theme}>
      <PriceProvider>
        <ErrorBoundary name="AuthProvider">
          <React.Suspense fallback={<SplashScreen />}>
            <AuthProvider>
              {(authData: {isSignout: boolean; isLoading: boolean}) => {
                if (authData.isLoading) {
                  return <SplashScreen />;
                }

                if (authData.isSignout) {
                  return (
                    <React.Suspense fallback={<SplashScreen />}>
                      <SignInScreen />
                    </React.Suspense>
                  );
                }

                return (
                  <NavigationContainer
                    onReady={() => RNBootSplash.hide({fade: true})}>
                    <MainNavigator />
                  </NavigationContainer>
                );
              }}
            </AuthProvider>
          </React.Suspense>
        </ErrorBoundary>
      </PriceProvider>
    </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;
