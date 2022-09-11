import React from 'react';

interface IProps {
  value: number;
  onChange: (val: number) => void;
}

function Categories({ value, onChange }: IProps) {
  const [categories] = React.useState(['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']);

  return (
    <div className="categories">
      <ul>
        {categories.map((c, i) => (
          <li className={value === i ? 'active' : ''} key={c} onClick={() => onChange(i)} aria-hidden>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
