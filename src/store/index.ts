import { configureStore } from '@reduxjs/toolkit';

import filter from '@/store/slices/filterSlice';
import cart from '@/store/slices/cartSlice';
import pizza from '@/store/slices/pizzaSlice';

const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
