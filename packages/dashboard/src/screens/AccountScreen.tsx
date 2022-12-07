import {Federated} from '@callstack/repack/client';
import React from 'react';
import Placeholder from '../components/Placeholder';

const Account = React.lazy(() =>
  Federated.importModule('auth', './AccountScreen'),
);

const AccountScreen = () => {
  return (
    <React.Suspense fallback={<Placeholder label="Account" icon="account" />}>
      <Account />
    </React.Suspense>
  );
};

export default AccountScreen;
