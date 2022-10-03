import axios from "axios";


//----------------------------------Auth  --- graphQL ????
//registration
export const Registration = async (firstName,lastName,username,password,Intro,profileImage,toastdispatch) =>{
  
    try {
         const res = await axios.post("/api/auth/signup",{
            username,password,firstName,lastName,Intro,profileImage
         }).then((res) => {
          
            if(res.status === 200 || res.status === 201){
                toastdispatch({type:'SUCCESS',payload:"Registered SUCCESSFULL"})
                return res
            }

         }).catch((error)=>{
            if(error.response.status === 422){
               toastdispatch({type:'WARNING',payload:"email id already exist"})
            }
        });
        
        return res
        
          } catch (error) {
              toastdispatch({type:'DANGER',payload:"Not able to registered !! check"})
        }
}

//login
export const handle_Login = async (username,password,navigator,toastdispatch) => {
  
    try {
        const res = await axios.post('/api/auth/login',{username,password }).then((res)=>{
       
            if(res.status === 200){
                if(res.data){
                    toastdispatch({type:'SUCCESS',payload:"LOGIN SUCCESSFULL"})
                    navigator(`/${res.data.foundUser._id}/feed`)
                    localStorage.setItem("sidebar","Feed")
                    return res
                } 
            }else{
                toastdispatch({type:'DANGER',payload:"login Failed ! please try again"})
            }
         });
         return res 
      } catch (error) {
          toastdispatch({type:'DANGER',payload:"login Failed ! please try again"})
      }
};
//--------------------------------EditUser
export const EditUserService = (token,userData) =>
  axios.post(
    "/api/users/edit",
    { userData },
    {
      headers: {
        authorization: token,
      },
    }
  );
//----------------------------------User
export const getAllUserService = async () => await axios.get("/api/users");
//----------------------------------follow
export const followUserService = async (userId,token) =>{
  return await axios.post(
    `/api/users/follow/${userId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
}
//----------------------------------unfollow
export const unfollowUserService = async (userId,token) =>
  await axios.post(
    `/api/users/unfollow/${userId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
//----------------------------------POST
//all post
export const getAllPostService = async () => await axios.get("/api/posts");
//user post
export const getUserPostService = async (username) => await axios.get(`/api/posts/user/${username}`);
//add post
export const addPostService = async (postData, token) =>{
 await axios.post(
    "/api/posts",
    { postData },
    {
      headers: {
        authorization: token,
      },
    }
  );
}

//edit post
export const editPostService = async (postData, token) =>{
 await axios.post(
    `/api/posts/edit/${postData._id}`,
    {
      postData,
    },
    {
      headers: {
        authorization: token,
      },
    }
);
}
   

//delete post
export const deleteUserPostService = async (postId, token) =>
 await axios.delete(`/api/posts/${postId}`, {
    headers: {
      authorization: token,
    },
});
//like post
export const likePostService = async (postId, token) =>
 await axios.post(
    `/api/posts/like/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
//dislike post
export const dislikePostService = async (postId, token) =>
 await axios.post(
    `/api/posts/dislike/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
);
//----------------------------------COMMENTS
//add comment
export const addCommentService = async (postId, commentData, token) =>
 await axios.post(
    `/api/comments/add/${postId}`,
    {
      commentData,
    },
    {
      headers: {
        authorization: token,
      },
    }
);
// edit comment
export const editCommentService = async (postId, commentId, commentData, token) =>
 await axios.post(
    `/api/comments/edit/${postId}/${commentId}`,
    {
      commentData,
    },
    {
      headers: {
        authorization: token,
      },
    }
);

  

//delete comment
export const deleteCommentService = async (postId, commentId, token) =>
 await axios.post(
    `/api/comments/delete/${postId}/${commentId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
);

//bookmarks
export const getAllBookmarkService = async (token) =>
 await axios.get("/api/users/bookmark", {
    headers: {
      authorization: token,
    },
  });

export const addBookmarkService = async (postId, token) =>
 await axios.post(
    `/api/users/bookmark/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export const removeBookmarkService = async (postId, token) =>
 await axios.post(
    `/api/users/remove-bookmark/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
})


//archive post
export const getAllArchiveService = async (token) =>
 await axios.get("/api/users/archive", {
    headers: {
      authorization: token,
    },
  });

export const addArchiveService = async (postId, token) =>
 await axios.post(
    `/api/users/archive/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export const restoreArchiveService = async (postId,postData,token) =>
 await axios.post(
    `/api/users/restore-archive/${postId}`,
    { postData },
    {
      headers: {
        authorization: token,
    },   
})

export const EditArchiveService = async (postId,postData,token) =>
 await axios.post(
    `/api/users/update-archive/${postId}`,
    { postData },
    {
      headers: {
        authorization: token,
    },   
})

export const DeleteArchiveService = async (postId,token) =>
 await axios.delete(
    `/api/users/remove-archive/${postId}`,
    {
      headers: {
        authorization: token,
    },   
})

//Notification - history
// export const getAllNotificationService = async (token) =>
//  await axios.get("/api/users/notification", {
//     headers: {
//       authorization: token,
//     },
//   });

// export const addNotificationService = async (postData, token) =>
//  await axios.post(`/api/users/notification`,
//     {postData},
//     {
//       headers: {
//         authorization: token,
//       },
//     }
// );

// export const RemoveNotificationService = async (postId,token) =>
//  await axios.delete(
//     `/api/users/notification/${postId}`,
//     {
//       headers: {
//         authorization: token,
//     },   
// })

// export const RemoveAllNotificationService = async (token) =>
//  await axios.delete(
//     `/api/users/notification/all`,
//     {
//       headers: {
//         authorization: token,
//     },   
// })

export const getAllNotificationService = async (token) =>
 await axios.get("/api/notification", {
    headers: {
      authorization: token,
    },
  });

export const addNotificationService = async (postData, token) =>
 await axios.post(`/api/notification`,
    {postData},
    {
      headers: {
        authorization: token,
      },
    }
);

export const RemoveNotificationService = async (postId,token) =>
 await axios.delete(
    `/api/notification/${postId}`,
    {
      headers: {
        authorization: token,
    },   
})

export const RemoveAllNotificationService = async (token) =>
 await axios.delete(
    `/api/notification/all`,
    {
      headers: {
        authorization: token,
    },   
})

//user stories - post date end date , post+12 i.e end date time === current delete automatically.

export const AddUserStoryService = (token,userData) =>
  axios.post(
    "/api/users/userstory",
    { userData },
    {
      headers: {
        authorization: token,
      },
    }
  );

//chart - note app

export const getChatService = async (token) => await axios.get(
  `/api/chats`,
  {
    headers: {
      authorization: token,
    },
  });

//get single data
export const getUserChatService = async (token,username) => 
     await axios.get(
      `/api/chats/${username}`,
      {
        headers: {
          authorization: token,
        },
      }
  );  

//post chat
export const AddChatService = async (token,postData) => 
     await axios.post(
      `/api/chats/post`,
      {postData},
      {
        headers: {
          authorization: token,
        },
      }
  ); 
  
//create group - playlist / add video - add members / chart same 

//create page - craete , edit , delete 

//search

//expore page sort

//sorting







