import React from 'react';

const KRAKEN_OHLC_URL = 'https://api.kraken.com/0/public/OHLC';
const INTERVAL_MINUTES = 1;
const MAX_TICKS = 60;

type KrakenOHLCResponse = {
  error: string[];
  result: Record<string, [number, string, string, string, string, ...unknown[]][]> & {last: number};
};

export function useHistoricalPrices(krakenPair: string): number[] {
  const [prices, setPrices] = React.useState<number[]>([]);

  React.useEffect(() => {
    const pair = krakenPair.replace('/', '');

    fetch(`${KRAKEN_OHLC_URL}?pair=${pair}&interval=${INTERVAL_MINUTES}`)
      .then(res => res.json() as Promise<KrakenOHLCResponse>)
      .then(json => {
        if (json.error.length) {
          return;
        }
        // Kraken returns the result under an internal pair key (e.g. XXBTZUSD)
        const resultKey = Object.keys(json.result).find(k => k !== 'last');
        if (!resultKey) {
          return;
        }
        // Each candle: [time, open, high, low, close, vwap, volume, count]
        const closePrices = json.result[resultKey]
          .slice(-MAX_TICKS)
          .map(candle => parseFloat(candle[4]));
        setPrices(closePrices);
      })
      .catch(() => {
        // Network failure — chart will fill from live ticks
      });
  }, [krakenPair]);

  return prices;
}