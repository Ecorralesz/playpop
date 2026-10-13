import video1 from '../assets/videos/playpop/WhatsApp Video 2026-10-12 at 7.55.07 PM.mp4';
import video2 from '../assets/videos/playpop/WhatsApp Video 2026-10-12 at 7.55.09 PM.mp4';
import video3 from '../assets/videos/playpop/WhatsApp Video 2026-10-12 at 7.55.12 PM.mp4';
import video4 from '../assets/videos/playpop/WhatsApp Video 2026-10-12 at 7.55.19 PM.mp4';
import video5 from '../assets/videos/playpop/WhatsApp Video 2026-10-12 at 7.55.31 PM.mp4';
import video6 from '../assets/videos/playpop/WhatsApp Video 2026-10-12 at 7.55.38 PM.mp4';
import poster1 from '../assets/images/video-posters/playpop-video-1.jpg';
import poster2 from '../assets/images/video-posters/playpop-video-2.jpg';
import poster3 from '../assets/images/video-posters/playpop-video-3.jpg';
import poster4 from '../assets/images/video-posters/playpop-video-4.jpg';
import poster5 from '../assets/images/video-posters/playpop-video-5.jpg';
import poster6 from '../assets/images/video-posters/playpop-video-6.jpg';

export const videos = [
  { id: 'video-1', title: 'Un espacio lleno de color', src: video1, poster: poster1 },
  { id: 'video-2', title: 'Diversión en el tobogán', src: video2, poster: poster2 },
  { id: 'video-3', title: 'Diversión en la piscina de bolas', src: video3, poster: poster3 },
  { id: 'video-4', title: 'Momentos de juego', src: video4, poster: poster4 },
  { id: 'video-5', title: 'Juegos inflables en acción', src: video5, poster: poster5 },
  { id: 'video-6', title: 'Inflables al aire libre', src: video6, poster: poster6 },
];

export const featuredVideos = [videos[5], videos[2], videos[4]];
