import { getProductsByIds } from './products';
import { pricing } from './pricing';

const fixedPackage = (
  id,
  name,
  price,
  inflatableIds,
  standardGameCount,
  premiumGameCount = 0,
  extra = {},
) => ({
  id,
  slug: id,
  name,
  price,
  inflatableIds,
  standardGameCount,
  premiumGameCount,
  rentalHours: pricing.standardRentalHours,
  badge: inflatableIds.length === 1 ? 'Un inflable' : 'Dos inflables',
  shortDescription: `${name}: inflables y juegos para tu celebración.`,
  installationIncluded: true,
  snacks: [],
  details: ['Selección de juegos sujeta a disponibilidad.'],
  ...extra,
});

export const packages = [
  fixedPackage('mini-pop', 'Mini Pop', 45000, ['castillo-inflable'], 1),
  fixedPackage('super-pop', 'Super Pop', 60000, ['inflable-tobogan'], 2),
  fixedPackage('super-pop-plus', 'Super Pop Plus', 70000, ['inflable-tobogan'], 2, 1),
  fixedPackage('sport-pop', 'Sport Pop', 65000, ['inflable-deportivo-3-en-1'], 2),
  fixedPackage('baby-pop', 'Baby Pop', 40000, ['baby-gym'], 1, 0, {
    requiresGameApproval: true,
    details: [
      'La selección del juego estándar requiere aprobación de PlayPop según la edad de los participantes. No se ha confirmado su adecuación para bebés.',
    ],
  }),
  fixedPackage(
    'doble-diversion',
    'Doble Diversión',
    90000,
    ['castillo-inflable', 'inflable-tobogan'],
    2,
  ),
  fixedPackage(
    'doble-pop-plus',
    'Doble Pop Plus',
    100000,
    ['castillo-inflable', 'inflable-tobogan'],
    2,
    1,
  ),
  fixedPackage(
    'doble-deportivo',
    'Doble Deportivo',
    105000,
    ['inflable-tobogan', 'inflable-deportivo-3-en-1'],
    2,
  ),
  fixedPackage(
    'mega-playpop',
    'Mega PlayPop',
    115000,
    ['inflable-tobogan', 'inflable-deportivo-3-en-1'],
    3,
    1,
  ),
  {
    id: 'feria-playpop',
    slug: 'feria-playpop',
    name: 'Feria PlayPop',
    price: null,
    priceLabel: 'Consultar',
    rentalHours: null,
    badge: 'Cotización personalizada',
    shortDescription: 'Múltiples atracciones y snacks opcionales para un evento a tu medida.',
    inflatableIds: null,
    standardGameCount: null,
    premiumGameCount: null,
    snacks: null,
    installationIncluded: true,
    details: [
      'Equipo, cantidades, duración y precio se confirman con PlayPop. Los snacks son opcionales.',
    ],
  },
];

export const retiredPackageSlugs = ['playpop-experience', 'fiesta-deportiva'];
export const getPackageBySlug = (slug) => packages.find((item) => item.slug === slug);
export const getPackageRoute = (item) => `/paquetes/${item.slug}`;
export const getPackageFeatures = (item) => [
  ...(item.standardGameCount != null
    ? [
        `${item.standardGameCount} ${item.standardGameCount === 1 ? 'juego estándar' : 'juegos estándar'}${item.requiresGameApproval ? ' (selección con aprobación de PlayPop)' : ''}`,
      ]
    : ['Atracciones por confirmar']),
  ...(item.premiumGameCount
    ? [
        `${item.premiumGameCount} ${item.premiumGameCount === 1 ? 'juego premium' : 'juegos premium'}`,
      ]
    : []),
  ...(item.installationIncluded ? ['Instalación y retiro'] : []),
];
export const getPackageCardFeatures = (item) => [
  ...getProductsByIds(item.inflatableIds).map(
    (product) => `${product.name}${product.dimensions ? ` ${product.dimensions}` : ''}`,
  ),
  ...getPackageFeatures(item),
];

export default packages;
