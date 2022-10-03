import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getAllNotificationService,
        addNotificationService,
        RemoveNotificationService,
        RemoveAllNotificationService} from "../../services/services";

const initialState = {
    notification: [],
    status: null
};

//get
export const getAllNotification = createAsyncThunk(
    "notification/getAllNotification",
    async ({token}, thunkAPI) => {
      try {
        const response = await getAllNotificationService(token);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
//add
export const AddNotification = createAsyncThunk(
    "notification/AddNotification",
    async ({ data , token }, thunkAPI) => {
      try {
        const response =  await addNotificationService(data, token)
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

//delete
  export const RemoveNotification = createAsyncThunk(
    "notification/RemoveNotification",
    async ({ data, token,toastdispatch }, thunkAPI) => {
      try {
        const response = await RemoveNotificationService(data._id, token);
        toastdispatch({type:'SUCCESS',payload:"Deleted Notification"})
        return response.data;
      } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!! Can't delete notification"})
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

//delete all
export const RemoveAllNotification = createAsyncThunk(
    "notification/RemoveAllNotification",
    async ({ token,toastdispatch }, thunkAPI) => {
      try {
        const response = await RemoveAllNotificationService(token);
        toastdispatch({type:'SUCCESS',payload:"Notification Cleared"})
        return response.data;
      } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!! Can't clear notification"})
        return thunkAPI.rejectWithValue(error);
      }
    }
  );


const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {},
    extraReducers: {
        //get all notification
        [getAllNotification.pending]: (state) => {
            state.status = "loading";
          },
        [getAllNotification.fulfilled]: (state, action) => {
            state.status = "success";
            state.notification = action.payload.notifications;
        },
        [getAllNotification.rejected]: (state, action) => {
            state.status = "failed";
        },
        //add 
        [AddNotification.pending]: (state) => {
            state.status = "loading";
          },
        [AddNotification.fulfilled]: (state, action) => {
            state.status = "success";
            state.notification = action.payload.notifications;
        },
        [AddNotification.rejected]: (state, action) => {
            state.status = "failed";
        }, 
        //remove
        [RemoveNotification.pending]: (state) => {
            state.status = "loading";
          },
        [RemoveNotification.fulfilled]: (state, action) => {
            state.status = "success";
            state.notification = action.payload.notifications;
        },
        [RemoveNotification.rejected]: (state, action) => {
            state.status = "failed";
        }, 
        //remove all 
        [RemoveAllNotification.pending]: (state) => {
            state.status = "loading";
          },
        [RemoveAllNotification.fulfilled]: (state, action) => {
            state.status = "success";
            state.notification = action.payload.notifications;
        },
        [RemoveAllNotification.rejected]: (state, action) => {
            state.status = "failed";
        },  
    }
})

export default notificationSlice.reducer;
