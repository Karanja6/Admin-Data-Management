export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `KSh ${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `KSh ${(amount / 1000).toFixed(0)}K`;
  }
  return `KSh ${amount.toLocaleString()}`;
};

export const formatPercentage = (value: number, total: number): string => {
  return `${((value / total) * 100).toFixed(1)}%`;
};

export const capitalizeText = (text: string): string => {
  return text.replace('_', ' ').charAt(0).toUpperCase() + text.replace('_', ' ').slice(1);
};

export const transformDistributionData = (distribution: { [key: string]: number }) => {
  return Object.entries(distribution).map(([key, value]) => ({
    name: capitalizeText(key),
    value,
    applications: value
  }));
};