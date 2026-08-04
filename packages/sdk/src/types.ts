export type AssetSymbol = 'BTC' | 'ETH' | 'SOL' | 'XRP' | 'ADA';

export interface Asset {
  symbol: AssetSymbol;
  name: string;
  krakenPair: string;
}

export interface PriceUpdate {
  symbol: AssetSymbol;
  price: number;
  previousPrice: number;
}

export type PriceMap = Record<AssetSymbol, number>;
