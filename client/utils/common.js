export function getPercentage(current, total) {
  return (current / total) * 100;
}

export function formatPercentage(value) {
  return `${value}%`;
}

export function formatNumber(number, suffix = '', decimals = 0) {
  return (
    number.toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + suffix
  );
}
