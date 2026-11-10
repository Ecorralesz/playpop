import { Container } from 'react-bootstrap';
import { businessRules } from '../../../data/businessRules';
import './ContactReservationNotice.css';

function ContactReservationNotice() {
  return (
    <section className="reservation-notice" aria-labelledby="reservation-notice-heading">
      <Container className="reservation-notice__container">
        <div className="reservation-notice__content">
          <i className="bi bi-info-circle" aria-hidden="true" />
          <div>
            <h2 id="reservation-notice-heading">Importante antes de reservar</h2>
            <p>
              Esta solicitud no confirma la reservación. PlayPop debe confirmar disponibilidad,
              transporte, condiciones de instalación y precio final.{' '}
              {businessRules.reservation.deposit}
            </p>
            <p>{businessRules.reservation.balance}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
export default ContactReservationNotice;
