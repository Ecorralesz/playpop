import { generalInflatableRules } from './businessRules';
import balloonPopImage from '../assets/images/playpop/game/Juego-dardos-bombas.jpeg';
import cornholeImage from '../assets/images/playpop/game/Juego-lanza-bolsas-vs.jpeg';
import dardosGigantesImage from '../assets/images/playpop/game/Juego-dardos-clasico.jpeg';
import footballTossImage from '../assets/images/playpop/game/Juego-touchdown.jpeg';
import lanzamientoArosImage from '../assets/images/playpop/game/Juego-throw-rings.jpeg';
import miniGolfImage from '../assets/images/playpop/game/Juego-golf.jpeg';
import tumbaLatasImage from '../assets/images/playpop/game/Juego-bota-latas.jpeg';
import castilloInflableImage from '../assets/images/playpop/inflatable/Castillo 3x3.jpeg';
import inflableToboganImage from '../assets/images/playpop/inflatable/Castillo 5x4.jpeg';
import inflableDeportivoImage from '../assets/images/playpop/inflatable/Inflable 3en1.jpeg';
import algodonAzucarImage from '../assets/images/playpop/snack/Maquina-algodon.jpeg';
import palomitasMaizImage from '../assets/images/playpop/snack/Maquina-palomitas.jpeg';
import babyGymImage from '../assets/images/playpop/inflatable/Baby-gym.jpeg';

const inflatable = (data) => ({
  category: 'inflatable',
  rentalHours: 3,
  featured: true,
  available: null,
  ...data,
});

const game = (data) => ({
  category: 'game',
  rentalHours: 3,
  dimensions: null,
  featured: false,
  available: null,
  ...data,
});

const snack = (data) => ({
  category: 'snack',
  dimensions: null,
  rentalHours: null,
  minimumQuantity: 10,
  featured: false,
  available: null,
  ...data,
});

export const products = [
  game({
    id: 'baby-gym',
    slug: 'baby-gym',
    name: 'Baby Gym',
    tier: 'premium',
    price: 15000,
    ageRestriction: '0 a 4 años',
    description:
      'Área de juego suave pensada para bebés y niños pequeños, con pelotas y superficies acolchadas para disfrutar en un espacio supervisado y apropiado para su edad.',
    rules: [
      'Supervisión adulta requerida.',
      'Uso recomendado para bebés y niños de 0 a 4 años.',
      'Mantener alimentos, bebidas y objetos punzocortantes fuera del área.',
      'Mantener el área limpia y libre de objetos que puedan representar riesgo.',
      'Utilizar el equipo únicamente para juego infantil apropiado para la edad.',
      'No mover el equipo después de la instalación sin autorización de PlayPop.',
    ],
    image: babyGymImage,
    imageAlt: 'Baby Gym de PlayPop para bebés y niños pequeños',
  }),
  game({
    id: 'dardos-gigantes',
    slug: 'dardos-gigantes',
    name: 'Dardos Gigantes',
    tier: 'premium',
    price: 15000,
    ageRestriction:
      'Recomendado para mayores de 10 años. Niños menores únicamente con supervisión directa de un adulto.',
    rules: [
      'Solo un participante lanza a la vez.',
      'Los demás participantes deben permanecer detrás de la línea de lanzamiento.',
      'Nadie debe colocarse frente o junto al objetivo mientras otra persona lanza.',
      'Utilizar únicamente el equipo suministrado por PlayPop.',
    ],
    image: dardosGigantesImage,
    imageAlt: 'Juego Dardos Gigantes de PlayPop',
  }),
  game({
    id: 'tumba-latas',
    slug: 'tumba-latas',
    name: 'Tumba Latas',
    tier: 'courtesy',
    price: 10000,
    ageRestriction: '5+',
    rules: [
      'Lanza los sacos para derribar las latas numeradas. Un participante a la vez dentro del área de lanzamiento.',
    ],
    image: tumbaLatasImage,
    imageAlt: 'Juego Tumba Latas de PlayPop',
  }),
  game({
    id: 'football-toss',
    slug: 'football-toss',
    name: 'Football Toss',
    tier: 'premium',
    price: 15000,
    ageRestriction: '6+',
    rules: [
      'Los participantes lanzan el balón hacia las aperturas del objetivo. Mantener una distancia segura de lanzamiento.',
    ],
    image: footballTossImage,
    imageAlt: 'Juego Football Toss de PlayPop',
  }),
  game({
    id: 'mini-golf',
    slug: 'mini-golf',
    name: 'Mini Golf',
    tier: 'premium',
    price: 15000,
    ageRestriction: '5+',
    rules: [
      'Los participantes juegan por turnos. Mantener a los demás alejados de la persona que está utilizando el palo.',
    ],
    image: miniGolfImage,
    imageAlt: 'Juego Mini Golf de PlayPop',
  }),
  snack({
    id: 'palomitas-maiz',
    slug: 'palomitas-de-maiz',
    name: 'Palomitas de Maíz',
    price: 2000,
    priceUnit: 'cada unidad',
    ageRestriction: 'Todas las edades',
    preparation:
      'Preparadas frescas durante el evento por PlayPop. El área de preparación/equipo debe ser operada por personal responsable.',
    rules: ['El área de preparación/equipo debe ser operada por personal responsable.'],
    image: palomitasMaizImage,
    imageAlt: 'Máquina de palomitas de maíz de PlayPop',
  }),
  game({
    id: 'cornhole',
    slug: 'lanzamiento-de-sacos-cornhole',
    name: 'Lanzamiento de Sacos / Cornhole',
    tier: 'courtesy',
    price: 10000,
    ageRestriction: '5+',
    rules: [
      'Los participantes lanzan los sacos hacia los orificios de puntuación. Todos deben permanecer detrás de la línea de lanzamiento.',
    ],
    image: cornholeImage,
    imageAlt: 'Juego de lanzamiento de sacos Cornhole de PlayPop',
  }),
  inflatable({
    id: 'inflable-tobogan',
    slug: 'inflable-con-tobogan',
    name: 'Inflable con Tobogán',
    price: 55000,
    dimensions: '5 × 4 m',
    ageRestriction: '3+',
    courtesyGameCount: 2,
    badge: 'Incluye 2 juegos de cortesía',
    rules: [
      ...generalInflatableRules,
      'El equipo no debe moverse después de la instalación sin autorización.',
    ],
    image: inflableToboganImage,
    imageAlt: 'Inflable con Tobogán 5 por 4 metros de PlayPop',
  }),
  inflatable({
    id: 'inflable-deportivo-3-en-1',
    slug: 'inflable-deportivo-3-en-1',
    name: 'Inflable Deportivo 3 en 1',
    price: 60000,
    dimensions: 'Por confirmar',
    ageRestriction: '5+',
    courtesyGameCount: 2,
    badge: 'Incluye 2 juegos de cortesía',
    rules: [
      'Tres áreas de actividad. Los participantes deben rotar entre las actividades.',
      ...generalInflatableRules,
    ],
    image: inflableDeportivoImage,
    imageAlt: 'Inflable Deportivo 3 en 1 de PlayPop',
  }),
  game({
    id: 'balloon-pop',
    slug: 'balloon-pop',
    name: 'Balloon Pop',
    tier: 'courtesy',
    price: 10000,
    ageRestriction:
      'Recomendado para mayores de 10 años si se juega con dardos. Supervisión directa de un adulto requerida.',
    rules: [
      'Solo un participante lanza a la vez. Todos los demás deben permanecer detrás de la línea de seguridad.',
    ],
    image: balloonPopImage,
    imageAlt: 'Juego Balloon Pop de PlayPop',
  }),
  snack({
    id: 'algodon-azucar',
    slug: 'algodon-de-azucar',
    name: 'Algodón de Azúcar',
    price: 1000,
    priceUnit: 'cada unidad',
    ageRestriction: 'Todas las edades',
    preparation: 'Preparado y empacado previamente por PlayPop. Se entrega listo para el evento.',
    rules: ['Se entrega preparado y empacado previamente.'],
    image: algodonAzucarImage,
    imageAlt: 'Máquina de algodón de azúcar de PlayPop',
  }),
  inflatable({
    id: 'castillo-inflable',
    slug: 'castillo-inflable',
    name: 'Castillo Inflable',
    price: 40000,
    dimensions: '3 × 3 m',
    ageRestriction: '3+',
    courtesyGameCount: 1,
    badge: 'Incluye 1 juego de cortesía',
    rules: [...generalInflatableRules, 'No se debe escalar sobre paredes o mallas de seguridad.'],
    image: castilloInflableImage,
    imageAlt: 'Castillo Inflable 3 por 3 metros de PlayPop',
  }),
  game({
    id: 'lanzamiento-aros',
    slug: 'lanzamiento-de-aros',
    name: 'Lanzamiento de Aros',
    tier: 'courtesy',
    price: 10000,
    ageRestriction: '4+',
    rules: [
      'Los participantes lanzan los aros de colores hacia los objetivos. Un participante a la vez desde la línea designada.',
    ],
    image: lanzamientoArosImage,
    imageAlt: 'Juego Lanzamiento de Aros de PlayPop',
  }),
];

export const getProductRoute = ({ category, slug }) =>
  `/${category === 'inflatable' ? 'inflables' : category === 'game' ? 'juegos' : 'snacks'}/${slug}`;

export const getProductBySlug = (slug) => products.find((product) => product.slug === slug);
export const getProductsByCategory = (category) =>
  products.filter((product) => product.category === category);
