import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './slices/patientSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    patients: patientReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
