import React from 'react';
import PropTypes from 'prop-types';

function PizzaCard(props) {
  const types = ['тонкое', 'традиционное'];

  const [type, setType] = React.useState(props.types[0]);
  const [size, setSize] = React.useState(props.sizes[0]);
  const [count, setCount] = React.useState(0);

  return (
    <div className="pizza-block">
      <img
        className="pizza-block__image"
        src={props.imageUrl}
        alt="Pizza"
      />
      <h4 className="pizza-block__title">{props.name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((t, i) => (
            <li
              key={t}
              className={i === type ? 'active' : ''}
              onClick={() => setType(i)}
            >
              {t}
            </li>
          ))}
        </ul>
        <ul>
          {props.sizes.map((s, i) => (
            <li
              className={s === size ? 'active' : ''}
              key={s}
              onClick={() => setSize(s)}
            >
              {s} cm.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {props.price} ₽</div>
        <button
          type="button"
          className="button button--outline button--add"
          onClick={() => setCount(count + 1)}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>{count}</i>
        </button>
      </div>
    </div>
  );
}

PizzaCard.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  types: PropTypes.array,
  sizes: PropTypes.array,
  price: PropTypes.number,
  category: PropTypes.number,
  rating: PropTypes.number
};

export default PizzaCard;
