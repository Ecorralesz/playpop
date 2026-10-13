import { CONTACT_EMAIL, EMAIL_URL, GENERAL_QUOTATION_URL } from '../config/contact';
import { socialLinks } from '../config/social';

const contactMethods = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'Solicita información y una cotización directamente con nuestro equipo.',
    icon: 'bi-whatsapp',
    status: 'Disponible',
    href: GENERAL_QUOTATION_URL,
    external: true,
    rel: 'noopener noreferrer',
  },
  ...socialLinks.map((social) => ({
    ...social,
    description: `Conoce más de PlayPop en ${social.name}.`,
    status: 'Visitar perfil',
    external: true,
  })),
  {
    id: 'email',
    name: 'Correo electrónico',
    description: CONTACT_EMAIL,
    icon: 'bi-envelope',
    status: 'Enviar correo',
    href: EMAIL_URL,
    external: false,
  },
];

export default contactMethods;
