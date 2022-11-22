import {Federated} from '@callstack/repack/client';
import React from 'react';
import Placeholder from '../components/Placeholder';

const Shopping = React.lazy(() => Federated.importModule('shopping', './App'));

const ShoppingScreen = () => {
  return (
    <React.Suspense fallback={<Placeholder label="Shopping" icon="cart" />}>
      <Shopping />
    </React.Suspense>
  );
};

export default ShoppingScreen;
