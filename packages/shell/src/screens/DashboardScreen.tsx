import {Federated} from '@callstack/repack/client';
import React from 'react';
import Placeholder from '../components/Placeholder';

const Dashboard = React.lazy(() =>
  Federated.importModule('dashboard', './App'),
);

const DashboardScreen = () => {
  return (
    <React.Suspense
      fallback={<Placeholder label="Dashboard" icon="view-dashboard" />}>
      <Dashboard />
    </React.Suspense>
  );
};

export default DashboardScreen;
