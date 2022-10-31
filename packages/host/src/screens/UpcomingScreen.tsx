import {Federated} from '@callstack/repack/client';
import React from 'react';
import Placeholder from '../components/Placeholder';

const Upcoming = React.lazy(() =>
  Federated.importModule('booking', './UpcomingScreen'),
);

const UpcomingScreen = () => {
  return (
    <React.Suspense fallback={<Placeholder label="Booking" icon="calendar" />}>
      <Upcoming />
    </React.Suspense>
  );
};

export default UpcomingScreen;
