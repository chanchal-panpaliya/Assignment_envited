import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getAllBookmarkService,addBookmarkService,removeBookmarkService} from '../../services/services';
import {AddNotification} from './notificationSlice';


const initialState = {
    bookmarkPosts: [],
    status: null
};

  //bookmarks
  
  export const getAllBokmarkedPosts = createAsyncThunk(
    "bookmark/getAllBokmarkedPosts",
    async ({token}, thunkAPI) => {
      try {
        const response = await getAllBookmarkService(token);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const AddBookmark = createAsyncThunk(
    "bookmark/AddBookmark",
    async ({ item, token,user,dispatch,toastdispatch}, thunkAPI) => {
      try {
        const response =  await addBookmarkService(item._id, token)
        toastdispatch({type:'SUCCESS',payload:"Post Added Bookmark"})
        return response.data;
      } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!! Can't Add to Bookmark"})
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
  export const RemoveBookmark = createAsyncThunk(
    "bookmark/RemoveBookmark",
    async ({ item, token,toastdispatch }, thunkAPI) => {
      try {
        const response = await removeBookmarkService(item._id, token);
        toastdispatch({type:'SUCCESS',payload:"Bookmark Post Deleted"})
        return response.data;
      } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!! Can't delete to Bookmark"})
        return thunkAPI.rejectWithValue(error);
      }
    }
  );


  const bookmarkSlice = createSlice({
    name: "bookmark",
    initialState,
    reducers: {},
    extraReducers: {
        //getAllBokmarkedPosts
        [getAllBokmarkedPosts.pending]: (state) => {
            state.status = "loading";
          },
        [getAllBokmarkedPosts.fulfilled]: (state, action) => {
            state.status = "success";
            state.bookmarkPosts = action.payload;
        },
        [getAllBokmarkedPosts.rejected]: (state, action) => {
            state.status = "failed";
        },
        //Add bookmarks
        [AddBookmark.pending]: (state) => {
            state.status = "loading";
          },
        [AddBookmark.fulfilled]: (state, action) => {
            state.status = "success";
            state.bookmarkPosts = action.payload.bookmarks;
        },
        [AddBookmark.rejected]: (state, action) => {
            state.status = "failed";
        },
        //remove bookmarks
        [RemoveBookmark.pending]: (state) => {
            state.status = "loading";
          },
        [RemoveBookmark.fulfilled]: (state, action) => {
            state.status = "success";
            state.bookmarkPosts = action.payload.bookmarks;
        },
        [RemoveBookmark.rejected]: (state, action) => {
            state.status = "failed";
        },    

    },
  });

  export default bookmarkSlice.reducer;