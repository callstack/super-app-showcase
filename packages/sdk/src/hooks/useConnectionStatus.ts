import React from 'react';
import {PriceContext} from '../providers/PriceProvider';
import type {ConnectionStatus} from '../services/KrakenWebSocketService';

const useConnectionStatus = (): ConnectionStatus => {
  const service = React.useContext(PriceContext);
  const [status, setStatus] = React.useState<ConnectionStatus>(
    () => service.status,
  );

  React.useEffect(() => {
    return service.onStatusChange(setStatus);
  }, [service]);

  return status;
};

export {useConnectionStatus};
