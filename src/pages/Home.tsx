import React from 'react';
import qs from 'qs';
import Categories from '@/components/Categories';
import Pagination from '@/components/Pagination';
import PizzaCard from '@/components/PizzaCard';
import Skeleton from '@/components/PizzaCard/Skeleton';
import Sort from '@/components/Sort';
import '@/styles/app.scss';
import { useNavigate } from 'react-router-dom';
import {
  setSortBy as setSortByAction,
  setCategoryId as setCategoryIdAction,
  setCurrentPage,
  setFilters,
} from '@/store/slices/filterSlice';
import SearchContext from '@/context/SearchContext';
import { selectPizza, selectStatus, fetchPizzas } from '@/store/slices/pizzaSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';

function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sortBy, categoryId, currentPage } = useAppSelector((store) => store.filter);
  const setSortBy = (val: string) => dispatch(setSortByAction(val));
  const setCategoryId = (val: number) => dispatch(setCategoryIdAction(val));
  const pizzas = useAppSelector(selectPizza);
  const loading = useAppSelector(selectStatus) === 'loading';
  const skeletonArray = Object.freeze([
    ...Array(8)
      .fill(null)
      .map((_, index) => index),
  ]);

  const { searchValue } = React.useContext(SearchContext);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onPageChange = (val: number) => {
    dispatch(setCurrentPage(val));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as Record<string, number | string>;
      dispatch(
        setFilters({
          ...params,
          categoryId: +params.category,
          currentPage: +params.page,
          // eslint-disable-next-line no-underscore-dangle
          sortBy: `${params._sort}`,
        }),
      );

      isSearch.current = true;
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (!isSearch.current) {
      window.scrollTo(0, 0);
      dispatch(
        fetchPizzas({
          filter: searchValue,
          category: categoryId || undefined,
          _sort: sortBy,
          _order: 'desc',
          page: currentPage,
          limit: 4,
        }),
      );
    }
    isSearch.current = false;
  }, [categoryId, sortBy, searchValue, currentPage, dispatch]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        filter: searchValue,
        category: categoryId,
        _sort: sortBy,
        _order: 'desc',
        page: currentPage,
        limit: 4,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [searchValue, categoryId, sortBy, currentPage, navigate]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChange={setCategoryId} />
        <Sort value={sortBy} onChange={setSortBy} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? skeletonArray.map((i) => <Skeleton key={i} style={{ marginBottom: '60px' }} />)
          : pizzas.map((pizza) => <PizzaCard pizza={pizza} key={pizza.id} />)}
      </div>
      <Pagination onPageChange={onPageChange} />
    </>
  );
}

export default Home;
