import {Federated} from '@callstack/repack/client';
import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';

const News = React.lazy(() => Federated.importModule('news', './App'));

const NewsScreen = () => {
  return (
    <ErrorBoundary name="NewsScreen">
      <React.Suspense
        fallback={<Placeholder label="News and Articles" icon="newspaper" />}>
        <News />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default NewsScreen;
