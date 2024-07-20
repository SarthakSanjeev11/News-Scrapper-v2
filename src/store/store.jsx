import { configureStore } from '@reduxjs/toolkit';
import  sidebarSlice  from './feature/SidebarSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      sidebar: sidebarSlice,
    },
  });
};

// Infer the type of makeStore
export const AppStore = makeStore();
// Infer the `RootState` and `AppDispatch` types from the store itself
export const RootState = AppStore.getState();
export const AppDispatch = AppStore.dispatch;
