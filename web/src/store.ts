import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './slices/patientSlice';
import admissionReducer from './slices/admissionSlice';
import userReducer from './slices/userSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    patients: patientReducer,
    admissions: admissionReducer,
    user: userReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
