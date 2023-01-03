import {Federated} from '@callstack/repack/client';
import React from 'react';
import Placeholder from '../components/Placeholder';

const News = React.lazy(() => Federated.importModule('news', './App'));

const NewsScreen = () => {
  return (
    <React.Suspense
      fallback={<Placeholder label="News and Articles" icon="newspaper" />}>
      <News />
    </React.Suspense>
  );
};

export default NewsScreen;
