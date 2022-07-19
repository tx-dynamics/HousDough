import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  location: {
    Latitude: null,
    Longitude: null,
  },
  Postcode: null,
  VideoLink: null,
  Skills: [],
  AboutYou: '',
  PastExperience: '',
  Reference: '',
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
    setVideoLink: (state, action) => {
      state.VideoLink = action.payload.VideoLink;
    },
    setUserSkills: (state, action) => {
      state.Skills = action.payload.Skills;
    },
    setAboutYou: (state, action) => {
      state.AboutYou = action.payload.AboutYou;
    },
    setPastExperience: (state, action) => {
      state.PastExperience = action.payload.PastExperience;
    },
    setReference: (state, action) => {
      state.Reference = action.payload.Reference;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLocation,
  setPostCode,
  setVideoLink,
  setUserSkills,
  setAboutYou,
  setPastExperience,
  setReference,
} = onBoardingSlice.actions;

export default onBoardingSlice.reducer;
