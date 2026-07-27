import { WHATSAPP_URL } from '../config/contact';

const contactMethods = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'Solicita información y una cotización directamente con nuestro equipo.',
    icon: 'bi-whatsapp',
    status: 'Disponible',
    href: WHATSAPP_URL,
    external: true,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Este canal todavía no está disponible para recibir solicitudes.',
    icon: 'bi-instagram',
    status: 'Pendiente',
    href: null,
    external: false,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Este canal todavía no está disponible para recibir solicitudes.',
    icon: 'bi-facebook',
    status: 'Pendiente',
    href: null,
    external: false,
  },
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
