import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IState {
  categoryId: number;
  sortBy: string;
  currentPage: number;
}

const initialState: IState = {
  categoryId: 0,
  sortBy: 'name',
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<IState>) {
      state.categoryId = action.payload.categoryId;
      state.sortBy = action.payload.sortBy;
      state.currentPage = action.payload.currentPage;
    },
  },
});

export const { setCategoryId, setSortBy, setCurrentPage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
