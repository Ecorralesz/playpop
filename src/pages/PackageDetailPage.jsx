import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { getQuotationUrl } from '../config/contact';
import { businessRules } from '../data/businessRules';
import { getPackageBySlug } from '../data/packages';
import { formatColones } from '../data/pricing';
import { getGamesByTier, getProductsByIds } from '../data/products';
import '../components/packages/PackageDetail/PackageDetail.css';

const valueOrConfirm = (value) => value || 'Por confirmar';

function PackageDetailPage() {
  const { slug } = useParams();
  const packageData = getPackageBySlug(slug);

  if (!packageData) {
    return (
      <Container className="py-5">
        <h1>Paquete no encontrado</h1>
        <p>La información de este paquete está por confirmar.</p>
        <Link to="/paquetes">Volver a paquetes</Link>
      </Container>
    );
  }

  const inflatables = getProductsByIds(packageData.inflatableIds);
  const snacks = (packageData.snacks ?? []).map((snack) => ({
    ...snack,
    product: getProductsByIds([snack.productId])[0],
  }));
  const quoteUrl = getQuotationUrl({
    name: packageData.name,
    hours: packageData.rentalHours,
    price: packageData.price,
    isPackage: true,
  });

  return (
    <section className="package-detail">
      <Container>
        <p className="package-detail__eyebrow">{valueOrConfirm(packageData.badge)}</p>
        <h1>{valueOrConfirm(packageData.name)}</h1>
        <p className="package-detail__intro">{valueOrConfirm(packageData.shortDescription)}</p>

        <dl className="package-detail__facts">
          <div>
            <dt>Precio</dt>
            <dd>{packageData.priceLabel ?? formatColones(packageData.price, 'Consultar')}</dd>
          </div>
          <div>
            <dt>Duración</dt>
            <dd>
              {packageData.rentalHours ? `${packageData.rentalHours} horas` : 'Por confirmar'}
            </dd>
          </div>
          <div>
            <dt>Instalación y retiro</dt>
            <dd>{packageData.installationIncluded ? 'Incluidos' : 'Por confirmar'}</dd>
          </div>
        </dl>

        <Row className="g-4">
          <Col lg={7}>
            <h2>Inflables incluidos</h2>
            {inflatables.length ? (
              <div className="package-detail__inflatables">
                {inflatables.map((product) => (
                  <article key={product.id}>
                    <img
                      className={
                        product.imageFit === 'contain'
                          ? 'package-detail__image--contain'
                          : undefined
                      }
                      src={product.image}
                      alt={product.imageAlt}
                    />
                    <h3>
                      {product.name} {product.dimensions ? `· ${product.dimensions}` : ''}
                    </h3>
                  </article>
                ))}
              </div>
            ) : (
              <p>Por confirmar</p>
            )}

            <h2>Contenido del paquete</h2>
            <ul className="package-detail__features">
              {packageData.features?.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
              {snacks.map(({ product, quantity }) => (
                <li key={product?.id ?? quantity}>
                  {product ? `${quantity} ${product.name}` : 'Snack por confirmar'}
                </li>
              ))}
            </ul>
            {packageData.details?.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </Col>
          <Col lg={5}>
            <aside className="package-detail__options">
              <h2>Opciones de juegos</h2>
              {packageData.requiresGameApproval ? (
                <p>PlayPop debe aprobar un juego adecuado según la edad de los participantes.</p>
              ) : (
                <>
                  <h3>
                    {packageData.standardGameCount != null
                      ? `Estándar (${packageData.standardGameCount})`
                      : `Cortesía (${packageData.courtesyGameCount ?? 'Por confirmar'})`}
                  </h3>
                  <p>
                    {getGamesByTier('standard')
                      .map(({ name }) => name)
                      .join(', ')}
                  </p>
                  <h3>Premium ({packageData.premiumGameCount ?? 'Por confirmar'})</h3>
                  <p>
                    {getGamesByTier('premium')
                      .map(({ name }) => name)
                      .join(', ')}
                  </p>
                </>
              )}
              <p>{businessRules.reservation.notice}</p>
              <p>
                <i className="bi bi-truck" aria-hidden="true" />{' '}
                {businessRules.transportation.notice}
              </p>
              <p>
                <strong>Reservación:</strong> {businessRules.reservation.deposit}
              </p>
              <p>
                <strong>Saldo:</strong> {businessRules.reservation.balance}
              </p>
              <a
                className="package-detail__whatsapp"
                href={quoteUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Cotizar ${packageData.name} por WhatsApp`}
              >
                <i className="bi bi-whatsapp" aria-hidden="true" /> Cotizar por WhatsApp
              </a>
            </aside>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default PackageDetailPage;
