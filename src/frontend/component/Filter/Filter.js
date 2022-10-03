export const getPostsBySortType = (posts, sortType) => {
    switch (sortType) {
      case "SORT_BY_RECENT":
        return [...posts].sort(
          (post1, post2) => new Date(post2.updatedAt) - new Date(post1.updatedAt)
        );
  
      case "SORT_BY_TRENDING":
        return [...posts].sort((post1, post2) => {
          const totalReactionsOnPost1 =
            post1.comments.length + post1.likes.likedBy.length;
  
          const totalReactionsOnPost2 =
            post2.comments.length + post2.likes.likedBy.length;
          return totalReactionsOnPost2 - totalReactionsOnPost1;
        });
  
      default:
        return posts;
    }
  };

export const getPostsByCategory = (posts,category)=>{
  
       if(category==="ALL"){
           return posts ;
       }else{
        return posts.filter((item)=>{ return item.postTopic === category })
       } 

}

export const SearchCategory =(posts,alluser,searchtype,searchtext)=> {
      if(searchtype === "People"){
        if(searchtext!==""){
           return alluser.filter((item)=>{
                 return item.username.toLowerCase().includes(searchtext.toLowerCase())
            })
         }else{
            return  alluser
         }
      }

      if(searchtype === "HashTag"){
        if(searchtext!==""){
          return posts.filter((item)=>{
                if(item.gethashtag.length>0){
                   return item.gethashtag.includes(searchtext.toLowerCase())
                }
           })
        }else{
           return  posts
        }
      }

      if(searchtype === "Post Title"){
        if(searchtext!==""){
          return posts.filter((item)=>{
                return item.title.toLowerCase().includes(searchtext.toLowerCase())
           })
        }else{
           return  posts
        }
      }
       
}