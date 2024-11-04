import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';
// @ts-ignore temp
const Shopping = React.lazy(() => import('shopping/App'));

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
