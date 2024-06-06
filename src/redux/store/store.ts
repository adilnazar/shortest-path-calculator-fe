import { configureStore } from '@reduxjs/toolkit';
import PathSlice from '../feature/PathSlice';

const store = configureStore({
  reducer: {
    path: PathSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
