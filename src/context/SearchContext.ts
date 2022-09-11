import React from 'react';

export type ISearchContext = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const SearchContext = React.createContext<ISearchContext>({
  searchValue: '',
  setSearchValue: () => {},
});

export default SearchContext;
