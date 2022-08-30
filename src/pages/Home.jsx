import React from 'react';
import Categories from '../components/Categories';
import PizzaCard from '../components/PizzaCard';
import Skeleton from '../components/PizzaCard/Skeleton';
import Sort from '../components/Sort';
import '../styles/app.scss';

function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let isSubscribed = true;
    setLoading(true)
    const _ = async () => {
      const res = await fetch('http://localhost:3000/pizzas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      setLoading(false);
      if (isSubscribed) setPizzas(data);
    };

    _();
    return () => (isSubscribed = false);
  }, []);

  return (
    <>
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
    </>
  );
}

export default Home;
