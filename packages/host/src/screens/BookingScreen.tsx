import {Federated} from '@callstack/repack/client';
import React from 'react';
import Placeholder from '../components/Placeholder';

const Booking = React.lazy(() => Federated.importModule('booking', './App'));

const BookingScreen = () => {
  return (
    <React.Suspense fallback={<Placeholder label="Booking" icon="calendar" />}>
      <Booking />
    </React.Suspense>
  );
};

export default BookingScreen;
