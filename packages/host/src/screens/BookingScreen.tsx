import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';

const Booking = React.lazy(() => import('booking/App'));

const BookingScreen = () => {
  return (
    <ErrorBoundary name="BookingScreen">
      <React.Suspense
        fallback={<Placeholder label="Booking" icon="calendar" />}>
        <Booking />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default BookingScreen;
