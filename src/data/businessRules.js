export const generalInflatableRules = [
  'Supervisión adulta requerida.',
  'Capacidad según edad y tamaño de los niños.',
  'Sin zapatos.',
  'Sin alimentos ni bebidas.',
  'Sin objetos punzocortantes.',
  'No se permite juego brusco.',
  'Suspender el uso si las condiciones climáticas son inseguras.',
];

export const businessRules = {
  transportation: {
    included: false,
    requiresLocation: true,
    notice:
      'El costo de transporte se calcula según la ubicación del evento y se agrega a la cotización final.',
    coverageAreas: [
      'Gran Área Metropolitana (GAM)',
      'Occidente',
      'Pérez Zeledón',
      'Otras ubicaciones sujetas a confirmación',
    ],
  },
  reservation: {
    depositPercent: 50,
    deposit: 'Se requiere un adelanto del 50% para reservar la fecha.',
    balance:
      'El 50% restante se paga cuando PlayPop llega al lugar del evento y completa la instalación del equipo.',
  },
  hours: {
    customerService: ['Lunes–sábado: 8:00 a. m. – 7:00 p. m.', 'Domingo: 9:00 a. m. – 5:00 p. m.'],
    events: 'Lunes–domingo: con reservación y sujeto a disponibilidad.',
  },
  additionalTime: 'Sujeto a disponibilidad y al horario del evento.',
};
