import celebrationOne from '../assets/images/playpop/events/cumple zoe/WhatsApp Image 2026-08-15 at 12.24.01 PM.jpeg';
import celebrationTwo from '../assets/images/playpop/events/cumple zoe/WhatsApp Image 2026-08-15 at 12.24.05 PM.jpeg';
import funOne from '../assets/images/playpop/events/escuela de chris /Feria infantil bajo un cielo dramático.png';
import funTwo from '../assets/images/playpop/events/escuela de chris /Fiesta infantil en castillo inflable.png';
import momentOne from '../assets/images/playpop/events/jared b-day/WhatsApp Image 2026-10-12 at 7.55.05 PM.jpeg';
import momentTwo from '../assets/images/playpop/events/jared b-day/WhatsApp Image 2026-10-12 at 7.55.05 PM (1).jpeg';
import momentThree from '../assets/images/playpop/events/jared b-day/WhatsApp Image 2026-10-12 at 7.55.05 PM (2).jpeg';
import momentFour from '../assets/images/playpop/events/jared b-day/WhatsApp Image 2026-10-12 at 7.55.05 PM (3).jpeg';
import celebrationCover from '../assets/images/playpop/events/cumple zoe/WhatsApp Image 2026-08-15 at 12.24.08 PM.jpeg';

// The business owner confirmed publication permission for all nine current
// photographs, including those featuring people and children.
// Import only cleared images. Pending records have no asset import, so their
// photographs cannot be accidentally emitted in a public production build.
// Add new collections/photos here; the viewer needs no event-specific logic.
export const eventCollections = [
  {
    id: 'celebraciones-alegria',
    title: 'Celebraciones llenas de alegría',
    description: 'Color y diversión para compartir momentos especiales.',
    category: 'event',
    photos: [
      {
        id: 'celebraciones-03',
        image: celebrationCover,
        imageAlt: 'Inflable multicolor y área de juegos de PlayPop',
        width: 1448,
        height: 1086,
        publication: 'cleared',
      },
      {
        id: 'celebraciones-01',
        image: celebrationOne,
        imageAlt: 'Niña junto a las pelotas de colores de PlayPop',
        width: 1086,
        height: 1448,
        publication: 'cleared',
      },
      {
        id: 'celebraciones-02',
        image: celebrationTwo,
        imageAlt: 'Niña jugando en el área de pelotas multicolor de PlayPop',
        width: 1086,
        height: 1448,
        publication: 'cleared',
      },
    ],
  },
  {
    id: 'diversion-grande',
    title: 'Diversión a lo grande',
    description: 'Experiencias de juego para disfrutar y recordar.',
    category: 'event',
    photos: [
      {
        id: 'diversion-01',
        image: funOne,
        imageAlt: 'Vista amplia de participantes y atracciones de PlayPop',
        width: 1448,
        height: 1086,
        publication: 'cleared',
      },
      {
        id: 'diversion-02',
        image: funTwo,
        imageAlt: 'Niños disfrutando del inflable multicolor de PlayPop',
        width: 1086,
        height: 1448,
        publication: 'cleared',
      },
    ],
  },
  {
    id: 'momentos-recordar',
    title: 'Momentos para recordar',
    description: 'La alegría de compartir una celebración con PlayPop.',
    category: 'event',
    photos: [
      {
        id: 'momentos-01',
        image: momentOne,
        imageAlt: 'Niños jugando en el castillo inflable de PlayPop',
        width: 1200,
        height: 1600,
        publication: 'cleared',
      },
      {
        id: 'momentos-02',
        image: momentTwo,
        imageAlt: 'Inflable multicolor de PlayPop con participantes y asistentes',
        width: 1200,
        height: 1600,
        publication: 'cleared',
      },
      {
        id: 'momentos-03',
        image: momentThree,
        imageAlt: 'Niños disfrutando del tobogán del inflable de PlayPop',
        width: 1600,
        height: 1200,
        publication: 'cleared',
      },
      {
        id: 'momentos-04',
        image: momentFour,
        imageAlt: 'Participantes compartiendo momentos junto al inflable de PlayPop',
        width: 1600,
        height: 1200,
        publication: 'cleared',
      },
    ],
  },
];

export const getPublicEventCollections = () =>
  eventCollections.flatMap((collection) => {
    const photos = collection.photos.filter(
      (photo) => photo.publication === 'cleared' && photo.image && photo.imageAlt,
    );
    if (!photos.length) return [];
    const cover = photos.find((photo) => photo.id === collection.coverPhotoId) ?? photos[0];
    return [
      {
        id: collection.id,
        title: collection.title,
        description: collection.description,
        category: collection.category,
        coverImage: cover.image,
        image: cover.image,
        imageAlt: cover.imageAlt,
        photos,
      },
    ];
  });
