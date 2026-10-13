export const WHATSAPP_URL = 'https://wa.me/50663892727';

export const getQuotationUrl = ({ name, hours, isPackage = false } = {}) => {
  const selection = name ? `${isPackage ? 'el paquete ' : ''}${name}` : 'un evento con PlayPop';
  const duration = hours ? ` por ${hours} horas` : '';
  const message = `Hola, deseo cotizar ${selection}${duration}. Fecha del evento: ____. Ubicación del evento: ____. Por favor, confirmar disponibilidad y transporte. Entiendo que este mensaje no confirma la reservación.`;
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
};
export const GENERAL_QUOTATION_URL = getQuotationUrl();
