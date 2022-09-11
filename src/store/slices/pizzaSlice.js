import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../http';

const initialState = {
  items: []
};

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizza',
  async params => {
    const res = await http.get('/api/pizzas', {
      params
    });
    return res.data;
  }
);

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    }
  },
  extraReducers: {
    [fetchPizzas.pending]: state => {
      state.items = [];
      state.status = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
});

export const { setItems } = pizzaSlice.actions;

export const selectPizza = state => state.pizza.items;
export const selectStatus = state => state.pizza.status;

export default pizzaSlice.reducer;
