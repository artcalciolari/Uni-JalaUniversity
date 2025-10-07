import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'John Doe',
  email: 'john@example.com'
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    }
  }
});

export const { updateUser, setUserName, setUserEmail } = userSlice.actions;
export default userSlice.reducer;