import { getAllUserService ,followUserService ,unfollowUserService} from "../../services/services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {AddNotification} from './notificationSlice'; 

const initialState = {
    allUsers: [],
    following:[],
    status: null
}

//getAllUser

export const getAllUser = createAsyncThunk(
    "post/getAllUser",
    async (_, thunkAPI) => {
      try {
        const response = await getAllUserService();
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

//followUser
  export const followUser = createAsyncThunk(
    "post/followUser",
    async ({ item,token,toastdispatch,dispatch}, thunkAPI) => {
      try {
        const response = await followUserService(item._id,token)
        let data ={
          text :"Start following you",
          postData:item,
          user:JSON.parse(localStorage.getItem('user')),
          taguser:"",
          date:new Date()
        }
        dispatch(AddNotification({data,token}))
        toastdispatch({type:'SUCCESS',payload:`Start following ${item.username}`})
        return response.data;
      } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!! Can't Follow"})
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

//UnfollowUser

  export const UnfollowUser = createAsyncThunk(
    "post/UnfollowUser",
    async ({ item ,token,toastdispatch,dispatch}, thunkAPI) => {
      try {
        const response = await unfollowUserService(item._id,token);
        let data ={
          text :"Unfollow You",
          postData:item,
          user:JSON.parse(localStorage.getItem('user')),
          taguser:"",
          date:new Date()
        }
        dispatch(AddNotification({data,token}))
        toastdispatch({type:'SUCCESS',payload:`You unfollow ${item.username}`})
        return response.data;
      } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!! Can't Unfollow"})
        return thunkAPI.rejectWithValue(error);
      }
    }
  );


  export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {
    //getalluser
      [getAllUser.pending]: (state) => {
        state.status="loading";
      },
      [getAllUser.fulfilled]: (state, action) => {
        state.status="success";
        state.allUsers = action.payload.users;
      },
      [getAllUser.rejected]: (state, action) => {
        state.status="failed";
      },
    //following_user
      [followUser.pending]: (state) => {
        state.status="loading";
      },
      [followUser.fulfilled]: (state, action) => {
        state.status="success";
        state.following = [...state.following , action.payload.followUser];
      },
      [followUser.rejected]: (state, action) => {
        state.status="failed";
      },
      //unfollowing_user
      [UnfollowUser.pending]: (state) => {
        state.status="loading";
      },
      [UnfollowUser.fulfilled]: (state, action) => {
        state.status="success";
        state.following = [...state.following.filter((item)=>item._id!==action.payload.followUser._id)] ;
      },
      [UnfollowUser.rejected]: (state, action) => {
        state.status="failed";
      },
     }
    })

    export default userSlice.reducer;