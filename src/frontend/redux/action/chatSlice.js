import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getChatService,getUserChatService,AddChatService} from '../../services/services';

const initialState = {
    chat: [],
    status: null
};

 // post
 export const getAllChats = createAsyncThunk(
    "chat/getAllChats",
    async ({token}, thunkAPI) => {
      try {
        const response = await getChatService(token);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const getUserChat = createAsyncThunk(
    "chat/getAllChats",
    async ({token,item}, thunkAPI) => {
      try {
        const response = await getUserChatService(token,item.username);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);  

export const PostChatService = createAsyncThunk(
  "chat/PostChatService",
  async ({token,postData}, thunkAPI) => {
    try { // working....

      const response = await AddChatService(token,postData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);   

  const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {},
    extraReducers: {
    //get all
    [getAllChats.pending]: (state) => {
        state.status = "loading";
      },
    [getAllChats.fulfilled]: (state, action) => {
        state.status = "success";
        state.chat = action.payload.chats
    },
    [getAllChats.rejected]: (state, action) => {
        state.status = "failed";
    }, 
    //getUserChat
    [getUserChat.pending]: (state) => {
        state.status = "loading";
      },
    [getUserChat.fulfilled]: (state, action) => {
        state.status = "success";
        state.chat = action.payload.chats.sort((a,b)=>a.datetime - b.datetime)
    },
    [getUserChat.rejected]: (state, action) => {
        state.status = "failed";
    }, 
    //post
    [PostChatService.pending]: (state) => {
      state.status = "loading";
    },
    [PostChatService.fulfilled]: (state, action) => {
        state.status = "success";
        state.chat = action.payload.chats.sort((a,b)=>a.datetime - b.datetime)
    },
    [PostChatService.rejected]: (state, action) => {
        state.status = "failed";
    },
    
    }
})

export default chatSlice.reducer;