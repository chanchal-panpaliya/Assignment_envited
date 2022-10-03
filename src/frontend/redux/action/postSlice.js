import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getAllPostService,
        getUserPostService,
        addPostService,
        editPostService,
        deleteUserPostService,
        likePostService,
        dislikePostService,
        addCommentService,
        editCommentService,
        deleteCommentService,
        //archive
        getAllArchiveService,
        addArchiveService,
        restoreArchiveService,
        EditArchiveService,
        DeleteArchiveService
    } from '../../services/services';

import {AddNotification} from './notificationSlice'; 



const initialState = {
    allPosts: [],
    userPosts: [],
    archivePosts:[],
    status: null
};

 // post
 export const getAllPosts = createAsyncThunk(
    "post/getAllPosts",
    async (_, thunkAPI) => {
      try {
        const response = await getAllPostService();
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  //user post
  export const getUserPost = createAsyncThunk(
    "post/getUserPost",
    async ({user}, thunkAPI) => {
      try {
        const response = await getUserPostService(user.username);
        return response.data.posts;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
// user edit post
  export const editUserPost = createAsyncThunk(
    "post/editUserPost",
    async ({postData,token,dispatch,toastdispatch}, thunkAPI) => {
      try {
        const response = await editPostService(postData, token);
        toastdispatch({type:'SUCCESS',payload:"Post Edited"})
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  // user delete post
  export const deleteUserPost = createAsyncThunk(
    "post/deleteUserPost",
    async ({data,token,toastdispatch}, thunkAPI) => {
      try {
        const response = await deleteUserPostService(data._id, token);
        toastdispatch({type:'SUCCESS',payload:"Post Deleted"})
        return response.data;
      } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!! Can't delete post"})
        return thunkAPI.rejectWithValue(error);
      }
    }
  )
  //upload post
  export const addUserPost = createAsyncThunk(
    "post/addUserPost",
    async ({postData,token,user,dispatch,toastdispatch}, thunkAPI) => {
      try {
        const response = await addPostService(postData, token);

       // let gettagpost = res.payload.posts.filter((tag)=>tag.tagName.find(item=>item.id === id))
       if(postData.tagName.length>0){

        postData.tagName.forEach(element => {
          let data ={
            text :"You tag with this ",
            postData:postData,
            user:user,
            taguser:element,
            date:new Date()
          }
          dispatch(AddNotification({data,token}))  
        });
      }
        toastdispatch({type:'SUCCESS',payload:"New Post Added"})
        return response.data.posts;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  //like post
  export const likePost = createAsyncThunk(
    "post/likePost",
    async ({ item , token ,user,dispatch,toastdispatch}, thunkAPI) => {
      try {
        const response =  await likePostService(item._id, token);
        let data ={
          text :"Liked",
          postData:item,
          user:user,
          taguser:"",
          date:new Date()
        }
        dispatch(AddNotification({data,token}))
        toastdispatch({type:'SUCCESS',payload:"liked Post"})
        return response.data;
      } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!! Can't like post"})
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  //dislike post
  export const DislikePost = createAsyncThunk(
    "post/DislikePost",
    async ({ item, token ,toastdispatch}, thunkAPI) => {
      try {
        const response = await dislikePostService(item._id, token);
        toastdispatch({type:'SUCCESS',payload:"Disliked Post"})
        return response.data;
      } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!! Can't dislike post"})
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  //add comments
  export const addComment = createAsyncThunk(
    "post/addComment",
    async ({ item , getComment, token,user,dispatch,toastdispatch}, thunkAPI) => {
      try {
        const response = await addCommentService(item._id, getComment, token);
        let data ={
          text :"Comment",
          postData:item,
          getComment:getComment,
          user:user,
          taguser:"",
          date:new Date()
        }
        toastdispatch({type:'SUCCESS',payload:"Comment Added"})
        dispatch(AddNotification({data,token}))
        return response.data;
      } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!! Can't add Comment"})
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
 // delete comments 
  export const deleteComment = createAsyncThunk(
    "post/deleteComment",
    async ({ item,_c,token,toastdispatch}, thunkAPI) => {
      try {
        const response = await deleteCommentService(item._id, _c._id, token);
        toastdispatch({type:'SUCCESS',payload:"Comment Deleted"})
        return response.data;
      } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!! Can't delete Comment"})
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const editComment = createAsyncThunk(
    "post/editComment",
    async ({ id,CommentData,token ,toastdispatch}, thunkAPI) => {
      try {
        let postId = id
        let commentId = CommentData._id 
        let commentData = CommentData.text
        const response = await editCommentService(postId,commentId,commentData,token);
        toastdispatch({type:'SUCCESS',payload:"Comment Edited"})
        return response.data;
      } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!! Can't Edit Comment"})
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  //archive
  export const getAllArchivePosts = createAsyncThunk(
    "post/getAllArchivePosts",
    async ({token}, thunkAPI) => {
      try {
        const response = await getAllArchiveService(token);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const AddArchivePost = createAsyncThunk(
    "post/AddArchivePost",
    async ({ item, token,toastdispatch }, thunkAPI) => {
      try {
        const response =  await addArchiveService(item._id, token);
        toastdispatch({type:'SUCCESS',payload:"Post Archived"})
        return response.data;
      } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!! Can't Archived"})
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
  export const RestoreArchivePost = createAsyncThunk(
    "post/RestoreArchivePost",
    async ({ item, token,toastdispatch}, thunkAPI) => {
      try {
        const response = await restoreArchiveService(item._id,item,token);
        toastdispatch({type:'SUCCESS',payload:"Post Restored"})
        return response.data;
      } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!! Can't Restored"})
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const EditArchivePost = createAsyncThunk(
    "post/EditArchivePost",
    async ({ postData, token ,toastdispatch}, thunkAPI) => {
      try {
        const response = await EditArchiveService(postData._id,postData,token);
        toastdispatch({type:'SUCCESS',payload:"Post Edited"})
        return response.data;
      } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!! Can't Edited"})
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const DeleteArchivePost = createAsyncThunk(
    "post/DeleteArchivePost",
    async ({ item, token ,toastdispatch}, thunkAPI) => {
      try {
        const response =  await DeleteArchiveService(item._id, token);
        toastdispatch({type:'SUCCESS',payload:"Post Deleted"})
        return response.data;
      } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!! Can't Delete"})
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  

  const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: {
        //getUserPost
        [getUserPost.pending]: (state) => {
            state.status = "loading";
          },
        [getUserPost.fulfilled]: (state, action) => {
            state.status = "success";
            state.userPosts = action.payload.sort((d1, d2) => new Date(d2.createdAt).getTime() - new Date(d1.createdAt).getTime());
        },
        [getUserPost.rejected]: (state, action) => {
            state.status = "failed";
        },  
        //editUserPost
        [editUserPost.pending]: (state) => {
            state.status = "loading";
        },
        [editUserPost.fulfilled]: (state, action) => {
            state.status = "success";
            state.allPosts = action.payload.posts;
        },
        [editUserPost.rejected]: (state, action) => {
            state.status = "failed";
        }, 
        //deleteUserPost
        [deleteUserPost.pending]: (state) => {
            state.status = "loading";
        },
        [deleteUserPost.fulfilled]: (state, action) => {
            state.status = "success";
            state.allPosts = action.payload.posts;
        },
        [deleteUserPost.rejected]: (state, action) => {
            state.status = "failed";
        },
        //addUserPost
        [addUserPost.pending]: (state) => {
            state.status = "loading";
        },
        [addUserPost.fulfilled]: (state, action) => {
            state.status = "success";
            state.allPosts = action.payload.posts;
        },
        [addUserPost.rejected]: (state, action) => {
            state.status = "failed";
        },
        //getAllPosts
        [getAllPosts.pending]: (state) => {
            state.status = "loading";
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.status = "success";
            state.allPosts = action.payload.posts.sort((d1, d2) => new Date(d1.createdAt).getTime() - new Date(d2.createdAt).getTime());
        },
        [getAllPosts.rejected]: (state, action) => {
            state.status = "failed";
        },
        //like
        [likePost.pending]: (state) => {
            state.status = "loading";
          },
          [likePost.fulfilled]: (state, action) => {
            state.status = "success";
            state.allPosts = action.payload.posts;
          },
          [likePost.rejected]: (state, action) => {
            state.status = "failed";
          },
        //dislike
          [DislikePost.pending]: (state) => {
            state.status = "loading";
          },
          [DislikePost.fulfilled]: (state, action) => {
            state.status = "success";
            state.allPosts = action.payload.posts;
          },
          [DislikePost.rejected]: (state, action) => {
            state.status = "failed";
          },
        //addcomments
        [addComment.pending]: (state) => {
            state.status = "loading";
          },
          [addComment.fulfilled]: (state, action) => {
            state.status = "success";
            state.allPosts = action.payload.posts;
          },
          [addComment.rejected]: (state, action) => {
            state.status = "failed";
          },
        //editcomments
        [editComment.pending]: (state) => {
            state.status = "loading";
          },
        [editComment.fulfilled]: (state, action) => {
            state.status = "success";
            state.allPosts = action.payload.posts;
        },
        [editComment.rejected]: (state, action) => {
            state.status = "failed";
        },
        //deletecomments
        [deleteComment.pending]: (state) => {
            state.status = "loading";
          },
        [deleteComment.fulfilled]: (state, action) => {
            state.status = "success";
            state.allPosts = action.payload.posts;
        },
        [deleteComment.rejected]: (state, action) => {
            state.status = "failed";
        },
          //getAllArchivePosts
        [getAllArchivePosts.pending]: (state) => {
            state.status = "loading";
          },
        [getAllArchivePosts.fulfilled]: (state, action) => {
            state.status = "success";
            state.archivePosts = action.payload.archives;
        },
        [getAllArchivePosts.rejected]: (state, action) => {
            state.status = "failed";
        },
        //Add Archive Post
        [AddArchivePost.pending]: (state) => {
            state.status = "loading";
          },
        [AddArchivePost.fulfilled]: (state, action) => {
            state.status = "success";
            state.archivePosts = action.payload.archives;
            state.allPosts = action.payload.posts;
        },
        [AddArchivePost.rejected]: (state, action) => {
            state.status = "failed";
        },
        //remove archives
        [RestoreArchivePost.pending]: (state) => {
            state.status = "loading";
          },
        [RestoreArchivePost.fulfilled]: (state, action) => {
            state.status = "success";
            state.archivePosts = action.payload.archives;
            state.allPosts = action.payload.posts;
            state.userPosts = action.payload;
        },
        [RestoreArchivePost.rejected]: (state, action) => {
            state.status = "failed";
        },
        //Edit archive
        [EditArchivePost.pending]: (state) => {
          state.status = "loading";
        },
        [EditArchivePost.fulfilled]: (state, action) => {
          state.status = "success";
          state.archivePosts = action.payload.archives;
        },
        [EditArchivePost.rejected]: (state, action) => {
          state.status = "failed";
        },
        //Delete archive
        [DeleteArchivePost.pending]: (state) => {
          state.status = "loading";
        },
        [DeleteArchivePost.fulfilled]: (state, action) => {
          state.status = "success";
          state.archivePosts = action.payload.archives;
        },
        [DeleteArchivePost.rejected]: (state, action) => {
          state.status = "failed";
        },
    },
  });

  export default postSlice.reducer;