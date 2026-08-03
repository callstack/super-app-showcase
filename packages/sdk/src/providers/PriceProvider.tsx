import React from 'react';
import {KrakenWebSocketService} from '../services/KrakenWebSocketService';

const PriceContext = React.createContext<KrakenWebSocketService>(
  KrakenWebSocketService.shared,
);

const PriceProvider = ({children}: {children: React.ReactNode}) => {
  React.useEffect(() => {
    KrakenWebSocketService.shared.connect();
    return () => {
      KrakenWebSocketService.shared.disconnect();
    };
  }, []);

  return (
    <PriceContext.Provider value={KrakenWebSocketService.shared}>
      {children}
    </PriceContext.Provider>
  );
};

export {PriceProvider, PriceContext};
