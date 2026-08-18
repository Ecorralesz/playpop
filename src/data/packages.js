import { getProductsByIds } from './products';

export const packages = [
  {
    id: 'super-pop',
    name: 'Super Pop',
    slug: 'super-pop',
    price: 70000,
    rentalHours: 3,
    badge: 'Paquete',
    shortDescription:
      'Una combinación de inflable y juegos premium para una celebración llena de actividad.',
    inflatableIds: ['inflable-tobogan'],
    premiumGameCount: 2,
    courtesyGameCount: 0,
    snacks: [],
    features: ['2 juegos premium', 'Instalación y retiro'],
    details: [
      'Opciones premium: Balloon Pop, Mini Golf o Football Toss.',
      'Selección sujeta a disponibilidad.',
    ],
    installationIncluded: true,
  },
  {
    id: 'playpop-experience',
    name: 'PlayPop Experience',
    slug: 'playpop-experience',
    price: 90000,
    rentalHours: 3,
    badge: 'Paquete',
    shortDescription:
      'La experiencia PlayPop con inflable, juegos y un detalle dulce listo para compartir.',
    inflatableIds: ['inflable-tobogan'],
    courtesyGameCount: 2,
    premiumGameCount: 1,
    snacks: [{ productId: 'algodon-azucar', quantity: 10 }],
    features: ['2 juegos de cortesía', '1 juego premium', 'Instalación y retiro'],
    details: ['Preparado y empacado previamente por PlayPop. Se entrega listo para el evento.'],
    installationIncluded: true,
  },
  {
    id: 'doble-diversion',
    name: 'Doble Diversión',
    slug: 'doble-diversion',
    price: null,
    priceLabel: 'Consultar',
    rentalHours: 3,
    badge: 'Dos inflables',
    shortDescription:
      'Una opción para celebraciones más grandes que combina dos inflables con juegos PlayPop.',
    inflatableIds: ['castillo-inflable', 'inflable-tobogan'],
    courtesyGameCount: 2,
    premiumGameCount: 0,
    snacks: [],
    features: ['2 juegos de cortesía', 'Instalación y retiro'],
    details: ['Selección de juegos sujeta a disponibilidad.'],
    installationIncluded: true,
  },
  {
    id: 'fiesta-deportiva',
    name: 'Fiesta Deportiva',
    slug: 'fiesta-deportiva',
    price: null,
    priceLabel: 'Consultar',
    rentalHours: 3,
    badge: 'Experiencia deportiva',
    shortDescription:
      'Una experiencia con varias áreas de juego para eventos con más participantes.',
    inflatableIds: ['inflable-tobogan', 'inflable-deportivo-3-en-1'],
    courtesyGameCount: 1,
    premiumGameCount: 1,
    snacks: [],
    features: ['1 juego premium', '1 juego de cortesía', 'Instalación y retiro'],
    details: ['Selección de juegos sujeta a disponibilidad.'],
    installationIncluded: true,
  },
  {
    id: 'feria-playpop',
    slug: 'feria-playpop',
    name: 'Feria PlayPop',
    price: null,
    priceLabel: 'Consultar',
    rentalHours: null,
    badge: 'Experiencia completa',
    shortDescription:
      'La experiencia PlayPop más completa para eventos grandes, con múltiples inflables, juegos y opciones adicionales.',
    inflatableIds: null,
    courtesyGameCount: null,
    premiumGameCount: null,
    snacks: null,
    features: [
      'Múltiples inflables',
      'Juegos y opciones adicionales',
      'Configuración por confirmar',
    ],
    details: [
      'Los contenidos, la duración y el precio se confirman según las necesidades del evento.',
    ],
    installationIncluded: null,
  },
];

export const getPackageBySlug = (slug) => packages.find((item) => item.slug === slug);
export const getPackageRoute = (item) => `/paquetes/${item.slug}`;
export const getPackageCardFeatures = (item) => [
  ...getProductsByIds(item.inflatableIds).map(
    (product) => `${product.name}${product.dimensions ? ` ${product.dimensions}` : ''}`,
  ),
  ...(item.features ?? []),
];

export default packages;
