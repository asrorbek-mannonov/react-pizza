import React from 'react';

function Categories() {
  const [categories] = React.useState([
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]);

  const [selectedCategory, setSelectedCategory] = React.useState(0);
  return (
    <div className="categories">
      <ul>
        {categories.map((c, i) => (
          <li
            className={selectedCategory === i ? 'active' : ''}
            key={c}
            onClick={() => setSelectedCategory(i)}
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
