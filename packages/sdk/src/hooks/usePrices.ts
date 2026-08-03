import React from 'react';
import {PriceContext} from '../providers/PriceProvider';
import {ASSETS} from '../constants';
import type {AssetSymbol, PriceMap} from '../types';

const useAssetPrice = (symbol: AssetSymbol): number => {
  const service = React.useContext(PriceContext);
  const [price, setPrice] = React.useState<number>(
    () => service.getPrice(symbol) ?? 0,
  );
  const [, startTransition] = React.useTransition();

  React.useEffect(() => {
    return service.subscribe(symbol, nextPrice => {
      startTransition(() => {
        setPrice(nextPrice);
      });
    });
  }, [service, symbol, startTransition]);

  return price;
};

const usePrices = (): Partial<PriceMap> => {
  const service = React.useContext(PriceContext);
  const [prices, setPrices] = React.useState<Partial<PriceMap>>(() => {
    const initial: Partial<PriceMap> = {};
    ASSETS.forEach(({symbol}) => {
      const p = service.getPrice(symbol);
      if (p !== undefined) {
        initial[symbol] = p;
      }
    });
    return initial;
  });
  const [, startTransition] = React.useTransition();

  React.useEffect(() => {
    const unsubscribers = ASSETS.map(({symbol}) =>
      service.subscribe(symbol, price => {
        startTransition(() => {
          setPrices(prev => ({...prev, [symbol]: price}));
        });
      }),
    );
    return () => unsubscribers.forEach(unsub => unsub());
  }, [service, startTransition]);

  return prices;
};

export {useAssetPrice, usePrices};
