import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: null,
  uid: null,
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
  },
});

// Action creators are generated for each case reducer function
export const {setUid, setEmail} = userSlice.actions;

export default userSlice.reducer;
