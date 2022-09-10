import React from 'react';
import Categories from '../components/Categories';
import PizzaCard from '../components/PizzaCard';
import Skeleton from '../components/PizzaCard/Skeleton';
import Sort from '../components/Sort';
import '../styles/app.scss';
import SearchContext from '../context/SearchContext';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSortBy as setSortByAction,
  setCategoryId as setCategoryIdAction
} from '../store/slices/filterSlice';
import http from '../http';

function Home() {
  const dispatch = useDispatch();
  const { sortBy, categoryId } = useSelector(store => store.filter);
  const setSortBy = val => dispatch(setSortByAction(val));
  const setCategoryId = val => dispatch(setCategoryIdAction(val));

  const [pizzas, setPizzas] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { searchValue } = React.useContext(SearchContext);

  React.useEffect(() => {
    let isSubscribed = true;
    setLoading(true);
    const _ = async () => {
      const res = await http.get('/api/pizzas', {
        params: {
          category: categoryId,
          _sort: sortBy,
          _order: 'desc'
        }
      })
      setLoading(false);
      if (isSubscribed) setPizzas(res.data);
    };

    _();
    window.scrollTo(0, 0);
    return () => (isSubscribed = false);
  }, [categoryId, sortBy]);

  const filteredPizzas = React.useMemo(
    () =>
      pizzas.filter(pizza =>
        pizza.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [searchValue, pizzas]
  );

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
          : filteredPizzas.map(pizza => (
              <PizzaCard {...pizza} key={pizza.id} />
            ))}
      </div>
    </>
  );
}

export default Home;
