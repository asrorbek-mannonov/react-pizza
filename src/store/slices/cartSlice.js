import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const index = state.items.findIndex(
        item => item.id === action.payload.id
      );

      if (index === -1) {
        state.items.push({ ...action.payload, quantity: 1 });
      } else {
        state.items[index].quantity += 1;
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );
    },
    clearCart(state) {
      state.items = [];
    },
    incrementProductCount(state, action) {
      const item = state.items.find(
        item => item.id === action.payload
      );
      if (item) {
        item.quantity++;
      }
    },
    decrementProductCount(state, action) {
      const item = state.items.find(
        item => item.id === action.payload
      );
      if (item && item.quantity > 0) {
        if (item.quantity === 1)
          state.items = state.items.filter(
            item => item.id !== action.payload
          );
        else item.quantity--;
      }
    }
  }
});

export const {
  addItem,
  removeItem,
  clearCart,
  incrementProductCount,
  decrementProductCount
} = cartSlice.actions;

export const totalAmount = createSelector(
  state => state.items,
  items =>
    items.reduce((acc, item) => acc + item.price * item.quantity, 0)
);

export const totalProducts = createSelector(
  state => state.items,
  items => items.reduce((acc, item) => acc + item.quantity, 0)
);

export const getProductQuantity = createSelector(
  state => state.items,
  items => id => items.find(item => item.id === id)?.quantity || 0
);

export const getProductTotalAmount = createSelector(
  [state => state.items, (_state, id) => id],
  (items, id) => {
    const item = items.find(item => item.id === id);
    return item ? item.price * item.quantity : 0;
  }
);

export default cartSlice.reducer;
