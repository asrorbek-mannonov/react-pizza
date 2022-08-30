import React from 'react';
import PropTypes from 'prop-types';

function Categories({ value, onChange }) {
  const [categories] = React.useState([
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
  ]);

  return (
    <div className="categories">
      <ul>
        {categories.map((c, i) => (
          <li
            className={value === i ? 'active' : ''}
            key={c}
            onClick={() => onChange(i)}
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

Categories.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Categories;
