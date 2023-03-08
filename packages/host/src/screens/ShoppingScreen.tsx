import {Federated} from '@callstack/repack/client';
import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';

const Shopping = React.lazy(() => Federated.importModule('shopping', './App'));

const ShoppingScreen = () => {
  return (
    <ErrorBoundary name="ShoppingScreen">
      <React.Suspense fallback={<Placeholder label="Shopping" icon="cart" />}>
        <Shopping />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default ShoppingScreen;
