export const pricing = {
  currency: 'CRC',
  standardRentalHours: 3,
  inflatableDurations: [2, 3, 4, 5],
  inflatables: {
    'castillo-inflable': { 2: 35000, 3: 40000, 4: 45000, 5: 50000 },
    'baby-gym': { 2: 30000, 3: 35000, 4: 40000, 5: 45000 },
    'inflable-tobogan': { 2: 45000, 3: 50000, 4: 55000, 5: 65000 },
    'inflable-deportivo-3-en-1': { 2: 50000, 3: 55000, 4: 60000, 5: 70000 },
  },
  standaloneGames: {
    'dardos-gigantes': 5000,
    'lanzamiento-aros': 5000,
    'tumba-latas': 10000,
    cornhole: 10000,
    'balloon-pop': 15000,
    'football-toss': 15000,
    'mini-golf': 15000,
  },
  gameBundles: { 2: 18000, 3: 25000 },
  additionalHour: { inflatable: 10000, afterHours: 5, courtesy: 3000, premium: 5000 },
  packageAddOns: { courtesyGame: 8000, premiumGame: 12000 },
  snacks: {
    unitPrice: 1000,
    minimumQuantity: 10,
    cottonCandy: { 10: 10000, 20: 20000, 30: 30000 },
    popcorn: { 10: 10000, 20: 20000, 30: 30000 },
  },
};

export const gameTierLabels = { standard: 'Estándar', premium: 'Premium' };

export const getInflatablePrice = (productId, hours) => {
  const tiers = pricing.inflatables[productId];
  if (!tiers || !Number.isInteger(hours) || hours < pricing.inflatableDurations[0]) return null;
  return hours <= pricing.additionalHour.afterHours
    ? (tiers[hours] ?? null)
    : tiers[pricing.additionalHour.afterHours] +
        (hours - pricing.additionalHour.afterHours) * pricing.additionalHour.inflatable;
};

export const formatColones = (amount, fallback = 'Por confirmar') =>
  amount == null || amount <= 0 ? fallback : `₡${new Intl.NumberFormat('es-CR').format(amount)}`;
