// src/Store/UserSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
      console.log('user details', action.payload);
      console.log('Updated user details:', state.user);
    },
  },
});

export const { setUserDetails } = UserSlice.actions;

export default UserSlice.reducer;

