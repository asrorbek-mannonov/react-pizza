import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sortBy: 'name',
  currentPage: 1,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      state.categoryId = action.payload.categoryId
      state.sortBy = action.payload.sortBy
      state.currentPage = action.payload.currentPage
    }
  }
})

export const { setCategoryId, setSortBy, setCurrentPage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;