export const pricing = {
  currency: 'CRC',
  standardRentalHours: 3,
  standaloneGames: { courtesy: 10000, premium: 15000 },
  gameBundles: { 2: 18000, 3: 25000 },
  additionalHour: { inflatable: 10000, courtesy: 3000, premium: 5000 },
  packageAddOns: { courtesyGame: 8000, premiumGame: 12000 },
  snacks: {
    cottonCandy: { 10: 10000, 20: 20000, 30: 30000 },
    popcorn: { 10: 10000, 20: 20000, 30: 30000 },
  },
};

export const formatColones = (amount, fallback = 'Por confirmar') =>
  amount == null || amount <= 0 ? fallback : `₡${new Intl.NumberFormat('es-CR').format(amount)}`;
