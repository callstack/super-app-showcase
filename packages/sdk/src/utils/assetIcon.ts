const ICON_BASE_URL = 'https://assets.coincap.io/assets/icons';

export const getAssetIconUri = (symbol: string): string =>
  `${ICON_BASE_URL}/${symbol.toLowerCase()}@2x.png`;
