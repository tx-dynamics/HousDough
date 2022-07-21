import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  Plan: null,
};

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    // setLocation: (state, action) => {
    //   state.location.Latitude = action.payload.Latitude;
    //   state.location.Longitude = action.payload.Longitude;
    // },
    setPlan: (state, action) => {
      state.Plan = action.payload.Plan;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setPlan} = paymentSlice.actions;

export default paymentSlice.reducer;
