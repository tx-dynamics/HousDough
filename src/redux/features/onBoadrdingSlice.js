import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  location: {
    Latitude: null,
    Longitude: null,
  },
  Postcode: null,
  videoLink: null,
};

export const onBoardingSlice = createSlice({
  name: 'onBoarding',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location.Latitude = action.payload.Latitude;
      state.location.Longitude = action.payload.Longitude;
    },
    setPostCode: (state, action) => {
      state.Postcode = action.payload.Postcode;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setLocation, setPostCode} = onBoardingSlice.actions;

export default onBoardingSlice.reducer;
