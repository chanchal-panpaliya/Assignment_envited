import { createAsyncThunk, createSlice ,createAction} from "@reduxjs/toolkit"
import { handle_Login ,Registration ,EditUserService,AddUserStoryService} from '../../services/services'


const initialState={
    token:localStorage.getItem('token') || null,
    user:JSON.parse(localStorage.getItem('user')) || null,
    status: null
}

//login
export const loginUser=createAsyncThunk(
    "auth/loginUser",
    async({email,password,navigator,toastdispatch},thunkAPI)=>{
        try{
            const res = await handle_Login(email,password,navigator,toastdispatch)
            return res
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

//register
export const signupUser=createAsyncThunk(
    "auth/signupUser",
    async({firstName,lastName,username,password,Intro,profileImage,toastdispatch},thunkAPI)=>{ 
        try{
            const res = await Registration(firstName,lastName,username,password,Intro,profileImage,toastdispatch)
            return res
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

//EditUserService
export const EditUser = createAsyncThunk(
    "auth/EditUser",
    async ({token,formData,toastdispatch}, thunkAPI) => {
      try {
        const response = await EditUserService(token,formData);
        toastdispatch({type:'SUCCESS',payload:"Edit user Profile"})
        return response.data.user;
      } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!! Can't edit profile"})
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

//Add User Stories
  
export const AddUserStory = createAsyncThunk(
    "auth/AddUserStory",
    async ({token,formData,toastdispatch}, thunkAPI) => {
        //console.log(token,formData)
      try {
        const response = await AddUserStoryService(token,formData);
        toastdispatch({type:'SUCCESS',payload:"UserStory Updated"})
        return response.data.user;
      } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!! Can't update story"})
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const logoutUser = createAction("auth/logoutUser"); 
  
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        // logoutUser:()=>{
        //     localStorage.removeItem("token")
        //     localStorage.removeItem("user")
         
        //     return{ user: null, token : null}
        // }
    },
    extraReducers:{
        //logout
        [logoutUser]: (state) => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            state.user = null;
            state.token = null;
            state.user = null;
          },
        //login
        [loginUser.pending]:(state)=>{
                state.status="loading";
        },
        [loginUser.fulfilled]:(state,action)=>{
                state.status="success";
                state.token=action.payload.data.encodedToken;
                state.user=action.payload.data.foundUser;
                localStorage.setItem('token',state.token);
                localStorage.setItem('user',JSON.stringify(state.user))
        },
        [loginUser.rejected]:(state,action)=>{
            state.status="failed";
        },
        //signup
        [signupUser.pending]:(state)=>{
            state.status="loading"
        },
        [signupUser.fulfilled]:(state,action)=>{
            state.status="success";
            // state.token=action.payload.data.encodedToken;
            // state.user=action.payload.data.createdUser;
            // localStorage.setItem('token',state.token);
            // localStorage.setItem('user',JSON.stringify(state.user))
        },
        [signupUser.rejected]:(state,action)=>{
            state.status="failed";
        },
        //edit user profile
        [EditUser.pending]:(state)=>{
            state.status="loading"
        },
        [EditUser.fulfilled]:(state,action)=>{
            state.status="success";
            state.user=action.payload;
            localStorage.setItem('user',JSON.stringify(state.user))
        },
        [EditUser.rejected]:(state,action)=>{
            state.status="failed";
        },
        //AddUserStory
        [AddUserStory.pending]:(state)=>{
            state.status="loading"
        },
        [AddUserStory.fulfilled]:(state,action)=>{
            state.status="success";
            state.user=action.payload;
            localStorage.setItem('user',JSON.stringify(state.user))
        },
        [AddUserStory.rejected]:(state,action)=>{
            state.status="failed";
        }
    }
})

// export const {logoutUser} = authSlice.actions;
export default authSlice.reducer;