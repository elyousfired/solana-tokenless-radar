export function fmtUsd(num) {
  if (num === null || num === undefined) return '$0';
  if (num >= 1e9) return '$' + (num / 1e9).toFixed(2) + 'B';
  if (num >= 1e6) return '$' + (num / 1e6).toFixed(2) + 'M';
  if (num >= 1e3) return '$' + (num / 1e3).toFixed(1) + 'K';
  return '$' + num.toLocaleString();
}

export function fmtSol(num) {
  if (num === null || num === undefined) return '0 SOL';
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M SOL';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K SOL';
  return num.toLocaleString() + ' SOL';
}

export function fmtCompact(num) {
  if (!num) return '0';
  return Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(num);
}
