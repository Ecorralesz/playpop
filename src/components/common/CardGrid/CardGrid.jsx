import './CardGrid.css';

// Rows size to their content. Only opt into equal rows for compact groups like contact methods.
function CardGrid({ children, columns = 3, equalRows = false, className = '' }) {
  return (
    <div
      className={`card-grid card-grid--${columns}${equalRows ? ' card-grid--equal-rows' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </div>
  );
}

export default CardGrid;
