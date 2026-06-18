import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Admission } from '../../shared/types/index';

interface AdmissionState {
  admissions: Admission[];
  loading: boolean;
  error: string | null;
}

const initialState: AdmissionState = {
  admissions: [],
  loading: false,
  error: null,
};

const admissionSlice = createSlice({
  name: 'admissions',
  initialState,
  reducers: {
    setAdmissions: (state, action: PayloadAction<Admission[]>) => {
      state.admissions = action.payload;
    },
    addAdmission: (state, action: PayloadAction<Admission>) => {
      state.admissions.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setAdmissions, addAdmission, setLoading } = admissionSlice.actions;
export default admissionSlice.reducer;
