import React from 'react';
import Cart from './components/Cart';
import Categories from './components/Categories';
import Logo from './components/Logo';
import PizzaCard from './components/PizzaCard';
import Skeleton from './components/PizzaCard/Skeleton';
import Sort from './components/Sort';
import './styles/app.scss';

function App() {
  const [pizzas, setPizzas] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let isSubscribed = true;
    setLoading(true);
    const _ = async () => {
      const res = await fetch('http://localhost:3000/pizzas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      setLoading(false);

      console.table(data);
      if (isSubscribed) setPizzas(data);
    };

    _();
    return () => (isSubscribed = false);
  }, []);

  return (
    <div className="wrapper">
      <div className="header">
        <div className="container">
          <Logo />
          <Cart />
        </div>
      </div>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {loading
              ? Array(8)
                  .fill(null)
                  .map((_, i) => (
                    <Skeleton
                      key={i}
                      style={{ marginBottom: '60px' }}
                    />
                  ))
              : pizzas.map(pizza => (
                  <PizzaCard {...pizza} key={pizza.id} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
