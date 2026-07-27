import { Container } from 'react-bootstrap';
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
              transporte, condiciones de instalación y precio final. La fecha se reserva únicamente
              después de recibir el adelanto del 50%.
            </p>
            <p>
              El 50% restante se paga cuando PlayPop llega al lugar del evento y completa la
              instalación del equipo.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
export default ContactReservationNotice;
