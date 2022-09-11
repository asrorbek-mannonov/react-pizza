import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import http from '@/http';
import { IPizza } from '@/src/types';
import type { RootState } from '@/store';

interface IState {
  items: IPizza[];
  status: 'loading' | 'success' | 'failed';
}

const initialState: IState = {
  items: [],
  status: 'success',
};

interface IFetchPizzaParams {
  filter: string;
  category: number | undefined;
  _sort: string;
  _order: 'desc' | 'asc';
  page: number;
  limit: number;
}

export const fetchPizzas = createAsyncThunk('pizza/fetchPizza', async (params: IFetchPizzaParams) => {
  const res = await http.get('/api/pizzas', {
    params,
  });
  return res.data;
});

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.status = 'loading';
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<IPizza[]>) => {
      state.status = 'success';
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export const selectPizza = (state: RootState) => state.pizza.items;
export const selectStatus = (state: RootState) => state.pizza.status;

export default pizzaSlice.reducer;
