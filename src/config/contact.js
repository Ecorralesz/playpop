import { formatColones } from '../data/pricing';

export const WHATSAPP_URL = 'https://wa.me/50663892727';
export const CONTACT_EMAIL = 'playpop.cr@gmail.com';
export const EMAIL_URL = `mailto:${CONTACT_EMAIL}`;

// Callers supply the selected reference price; price tables stay in pricing.js.
export const getQuotationUrl = ({ name, hours, price, isPackage = false } = {}) => {
  const amount = price == null ? null : formatColones(price);
  const message = [
    name
      ? `Hola, me gustaría cotizar ${isPackage ? 'el paquete' : 'el'} ${name} de PlayPop.`
      : 'Hola, me gustaría cotizar un evento con PlayPop.',
    '',
    name ? `${isPackage ? 'Paquete' : 'Producto'}: ${name}` : null,
    hours ? `Duración seleccionada: ${hours} horas` : null,
    amount ? `Precio de referencia: ${amount}` : null,
    '',
    'Fecha del evento: ____.',
    'Ubicación del evento: ____.',
    'Me gustaría consultar disponibilidad y transporte para mi evento.',
    'El transporte se cotiza por separado según la ubicación.',
    'Este mensaje no confirma disponibilidad ni reservación.',
  ]
    .filter((line) => line !== null)
    .join('\n');
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
};

export const GENERAL_QUOTATION_URL = getQuotationUrl();
