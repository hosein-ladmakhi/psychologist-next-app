import { configureStore } from '@reduxjs/toolkit';
import { modalSlices } from './slices/modalSlices';

export const store = configureStore({
  reducer: {
    [modalSlices.reducerPath]: modalSlices.reducer,
  },
});
