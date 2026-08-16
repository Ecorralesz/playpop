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
    features: ['Inflable con Tobogán 5×4', '2 juegos premium', 'Instalación/retiro'],
    details: [
      'Opciones premium: Mini Golf, Football Toss o Dardos Gigantes.',
      'Selección sujeta a disponibilidad.',
    ],
    route: '/contacto',
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
    features: [
      'Inflable con Tobogán 5×4',
      '2 juegos de cortesía',
      '1 juego premium',
      '10 algodones de azúcar',
      'Instalación/retiro',
    ],
    details: ['Preparado y empacado previamente por PlayPop. Se entrega listo para el evento.'],
    route: '/contacto',
  },
  {
    id: 'feria-playpop',
    slug: 'feria-playpop',
    name: 'Feria PlayPop',
    price: null,
    rentalHours: null,
    priceLabel: 'Consultar',
    badge: 'Experiencia completa',
    shortDescription:
      'Una experiencia pensada para eventos más grandes que combina múltiples atracciones, juegos y opciones PlayPop.',
    features: ['Inflables', 'Juegos', 'Opciones premium', 'Snacks', 'Experiencia estilo feria'],
    details: [],
    route: '/contacto',
  },
];

export default packages;
