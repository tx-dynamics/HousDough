import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: null,
  uid: null,
  userName: null,
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUid: (state, action) => {
      state.uid = action.payload.uid;
    },
    setEmail: (state, action) => {
      state.email = action.payload.email;
    },
    setName: (state, action) => {
      state.userName = action.payload.userName;
    },
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
  setUid,
  setEmail,
  setName,
  setLocation,
  setPostCode,
  setVideoLink,
  setUserSkills,
  setAboutYou,
  setPastExperience,
  setReference,
} = userSlice.actions;

export default userSlice.reducer;
