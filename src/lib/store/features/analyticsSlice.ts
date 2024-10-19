import { createSlice } from '@reduxjs/toolkit';

interface AnalyticsState {
  data: Array<{ feature: string, totalTimeSpent: number, date: string }>;
}

const initialState: AnalyticsState = {
  data: [],
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = analyticsSlice.actions;

export default analyticsSlice.reducer;
