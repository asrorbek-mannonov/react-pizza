import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ICartPizza } from '@/src/types';

interface IState {
  items: ICartPizza[];
}

const initialState: IState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ICartPizza>) {
      const index = state.items.findIndex((item) => item.id === action.payload.id);

      if (index === -1) {
        state.items.push({ ...action.payload, quantity: 1 });
      } else {
        state.items[index].quantity += 1;
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    incrementProductCount(state, action: PayloadAction<number>) {
      const selectedItem = state.items.find((item_) => item_.id === action.payload);
      if (selectedItem) {
        selectedItem.quantity += 1;
      }
    },
    decrementProductCount(state, action) {
      const item = state.items.find((item_) => item_.id === action.payload);
      if (item && item.quantity > 0) {
        if (item.quantity === 1) state.items = state.items.filter((item_) => item_.id !== action.payload);
        else item.quantity -= 1;
      }
    },
  },
});

export const { addItem, removeItem, clearCart, incrementProductCount, decrementProductCount } = cartSlice.actions;

export const totalAmount = createSelector(
  (state: IState) => state.items,
  (items) => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
);

export const totalProducts = createSelector(
  (state: IState) => state.items,
  (items) => items.reduce((acc, item) => acc + item.quantity, 0),
);

export const getProductQuantity = createSelector(
  (state: IState) => state.items,
  (items) => (id: number) => items.find((item) => item.id === id)?.quantity || 0,
);

export const getProductTotalAmount = createSelector(
  [(state: IState) => state.items, (_state, id) => id],
  (items: ICartPizza[], id) => {
    const item = items.find((item_) => item_.id === id);
    return item ? item.price * item.quantity : 0;
  },
);

export default cartSlice.reducer;
