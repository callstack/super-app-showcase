import type {Asset} from './types';

export const ASSETS: Asset[] = [
  {symbol: 'BTC', name: 'Bitcoin', krakenPair: 'XBT/USD'},
  {symbol: 'ETH', name: 'Ethereum', krakenPair: 'ETH/USD'},
  {symbol: 'SOL', name: 'Solana', krakenPair: 'SOL/USD'},
  {symbol: 'XRP', name: 'XRP', krakenPair: 'XRP/USD'},
  {symbol: 'ADA', name: 'Cardano', krakenPair: 'ADA/USD'},
];

// Kraken uses XBT for Bitcoin — map krakenPair back to our symbol
export const KRAKEN_PAIR_TO_SYMBOL: Record<string, string> = {
  'XBT/USD': 'BTC',
  'ETH/USD': 'ETH',
  'SOL/USD': 'SOL',
  'XRP/USD': 'XRP',
  'ADA/USD': 'ADA',
};