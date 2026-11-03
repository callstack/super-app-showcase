export const formatPrice = (price: number): string => {
  if (price === 0) {
    return '—';
  }
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: price >= 1 ? 2 : 6,
  });
};

export const formatValue = (value: number): string =>
  value > 0
    ? value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
      })
    : '—';

// Chart ticks can sit closer together than a fixed number of decimals shows
// (e.g. $3,865 / $3,870 / $3,875), so keep every significant digit of the
// tick instead of rounding them all to the same label.
export const formatAxisPrice = (value: number): string => {
  if (value >= 1000) {
    return `$${(value / 1000).toLocaleString('en-US', {
      maximumFractionDigits: 3,
    })}k`;
  }
  return `$${value.toLocaleString('en-US', {
    maximumFractionDigits: value >= 1 ? 4 : 6,
  })}`;
};
