import { socialLinks } from '../config/social';
import { GENERAL_QUOTATION_URL } from '../config/contact';

const contactMethods = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'Solicita información y una cotización directamente con nuestro equipo.',
    icon: 'bi-whatsapp',
    status: 'Disponible',
    href: GENERAL_QUOTATION_URL,
    external: true,
  },
  ...socialLinks.map((social) => ({
    ...social,
    description: `Conoce más de PlayPop en ${social.name}.`,
    status: 'Visitar perfil',
    external: true,
    rel: 'noopener noreferrer',
  })),
  {
    id: 'email',
    name: 'Correo electrónico',
    description: 'Este canal todavía no está disponible para recibir solicitudes.',
    icon: 'bi-envelope',
    status: 'Pendiente',
    href: null,
    external: false,
  },
];

export default contactMethods;
