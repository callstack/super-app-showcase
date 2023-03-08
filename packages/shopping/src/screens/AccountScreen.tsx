import {Federated} from '@callstack/repack/client';
import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';

const Account = React.lazy(() =>
  Federated.importModule('auth', './AccountScreen'),
);

const AccountScreen = () => {
  return (
    <ErrorBoundary name="AccountScreen">
      <React.Suspense fallback={<Placeholder label="Account" icon="account" />}>
        <Account />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default AccountScreen;
