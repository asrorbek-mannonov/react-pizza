import React from 'react';
import qs from 'qs';
import Categories from '../components/Categories';
import PizzaCard from '../components/PizzaCard';
import Skeleton from '../components/PizzaCard/Skeleton';
import Sort from '../components/Sort';
import '../styles/app.scss';
import SearchContext from '../context/SearchContext';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setSortBy as setSortByAction,
  setCategoryId as setCategoryIdAction,
  setCurrentPage,
  setFilters
} from '../store/slices/filterSlice';
import Pagination from '../components/Pagination';
import {
  selectPizza,
  selectStatus,
  fetchPizzas
} from '../store/slices/pizzaSlice';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sortBy, categoryId, currentPage } = useSelector(
    store => store.filter
  );
  const setSortBy = val => dispatch(setSortByAction(val));
  const setCategoryId = val => dispatch(setCategoryIdAction(val));
  const pizzas = useSelector(selectPizza);
  const loading = useSelector(selectStatus) === 'loading';

  const { searchValue } = React.useContext(SearchContext);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onPageChange = val => {
    dispatch(setCurrentPage(val));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(
        setFilters({
          ...params,
          categoryId: +params.category,
          currentPage: +params.page,
          sortBy: params._sort
        })
      );

      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      window.scrollTo(0, 0);
      dispatch(
        fetchPizzas({
          filter: searchValue,
          category: categoryId ? categoryId : undefined,
          _sort: sortBy,
          _order: 'desc',
          page: currentPage,
          limit: 4
        })
      );
    }
    isSearch.current = false;
  }, [categoryId, sortBy, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        filter: searchValue,
        category: categoryId,
        _sort: sortBy,
        _order: 'desc',
        page: currentPage,
        limit: 4
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [searchValue, categoryId, sortBy, currentPage]);

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
      <Pagination onPageChange={onPageChange} />
    </>
  );
}

export default Home;
