import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
    selectedSidebar: 'Feed' ,
    selected_UserProfile_Data:"",
    getEditPostData:""
};

export const MenuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSidebar: (state, action) => {
      localStorage.setItem("sidebar",action.payload);
      state.selectedSidebar = action.payload;
    },
    setUserProfile:(state, action)=>{
      state.selected_UserProfile_Data = action.payload 
    },
    setEditPost:(state, action)=>{
       state.getEditPostData = action.payload
    }
  },
});

export const { setSidebar ,setUserProfile ,setEditPost } = MenuSlice.actions;
export default MenuSlice.reducer;