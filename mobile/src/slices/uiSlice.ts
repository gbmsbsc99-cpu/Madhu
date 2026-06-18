import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark';
  notifications: Array<{ id: string; message: string; type: string }>;
}

const initialState: UIState = {
  theme: 'light',
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<UIState['notifications'][0], 'id'>>) => {
      state.notifications.push({
        id: Date.now().toString(),
        ...action.payload,
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } = uiSlice.actions;
export default uiSlice.reducer;
