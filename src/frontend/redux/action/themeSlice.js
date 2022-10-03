import { createSlice } from '@reduxjs/toolkit';

const initialState = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? { mode: 'dark' }
  : { mode: 'light' };

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      localStorage.setItem("darkTheme", JSON.stringify(action.payload));
      state.mode = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;