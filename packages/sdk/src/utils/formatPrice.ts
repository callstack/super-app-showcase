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
