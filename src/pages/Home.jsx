import React from 'react';
import Categories from '../components/Categories';
import PizzaCard from '../components/PizzaCard';
import Skeleton from '../components/PizzaCard/Skeleton';
import Sort from '../components/Sort';
import '../styles/app.scss';

function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortBy, setSortBy] = React.useState('name');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let isSubscribed = true;
    setLoading(true);
    const _ = async () => {
      const res = await fetch(
        `http://localhost:5000/pizzas?category=${categoryId}&_sort=${sortBy}&_order=desc`
      );
      const data = await res.json();
      setLoading(false);
      if (isSubscribed) setPizzas(data);
    };

    _();
    window.scrollTo(0, 0);
    return () => (isSubscribed = false);
  }, [categoryId, sortBy]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChange={setCategoryId} />
        <Sort value={sortBy} onChange={setSortBy} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? Array(8)
              .fill(null)
              .map((_, i) => (
                <Skeleton key={i} style={{ marginBottom: '60px' }} />
              ))
          : pizzas.map(pizza => (
              <PizzaCard {...pizza} key={pizza.id} />
            ))}
      </div>
    </>
  );
}

export default Home;
