function CategoryFilters({ options, value, onChange, label }) {
  return (
    <div className="d-flex flex-wrap gap-2 mb-4" role="group" aria-label={label}>
      {options.map(({ id, label: optionLabel }) => (
        <button
          key={id}
          type="button"
          className={`btn ${value === id ? 'btn-primary' : 'btn-outline-primary'}`}
          aria-pressed={value === id}
          onClick={() => onChange(id)}
        >
          {optionLabel}
        </button>
      ))}
    </div>
  );
}
export default CategoryFilters;
