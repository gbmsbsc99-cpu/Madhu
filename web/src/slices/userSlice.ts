import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../shared/types/index';

interface UserState {
  currentUser: User | null;
  token: string | null;
  loading: boolean;
}

const initialState: UserState = {
  currentUser: null,
  token: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, logout, setLoading } = userSlice.actions;
export default userSlice.reducer;
