import { Col, Container, Row } from 'react-bootstrap';

import BenefitCard from '../../common/BenefitCard/BenefitCard';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import playPopBenefits from '../../../data/playPopBenefits';
import './WhyChoosePlayPop.css';

function WhyChoosePlayPop() {
  return (
    <section className="why-choose-playpop" aria-labelledby="why-choose-playpop-heading">
      <Container className="why-choose-playpop__container">
        <SectionHeader
          eyebrow="Confianza para tu evento"
          title="¿Por qué elegir PlayPop?"
          description="Queremos que organizar tu celebración sea más sencillo, claro y confiable desde el primer contacto."
          headingId="why-choose-playpop-heading"
        />

        <Row className="g-4">
          {playPopBenefits.map((benefit) => (
            <Col className="d-flex" key={benefit.id} md={6} lg={3}>
              <BenefitCard benefit={benefit} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default WhyChoosePlayPop;
