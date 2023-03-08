import {Federated} from '@callstack/repack/client';
import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';

const Dashboard = React.lazy(() =>
  Federated.importModule('dashboard', './App'),
);

const DashboardScreen = () => {
  return (
    <ErrorBoundary name="DashboardScreen">
      <React.Suspense
        fallback={<Placeholder label="Dashboard" icon="view-dashboard" />}>
        <Dashboard />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default DashboardScreen;
