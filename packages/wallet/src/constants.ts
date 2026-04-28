import type {AssetSymbol} from 'super-app-showcase-sdk';

export interface Holding {
  symbol: AssetSymbol;
  quantity: number;
}

export const HOLDINGS: Holding[] = [
  {symbol: 'BTC', quantity: 1},
  {symbol: 'ETH', quantity: 0.5},
];