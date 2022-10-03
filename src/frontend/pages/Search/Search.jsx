//css
import './Search.css';
//react
import { Link } from 'react-router-dom';
import { useEffect,useState,useContext} from 'react';
//redux
import { useDispatch, useSelector } from "react-redux";
import {getAllPosts} from '../../redux/action/postSlice';
import {setUserProfile} from '../../redux/action/MenuSlice';
import {getAllUser,UnfollowUser,followUser} from '../../redux/action/userSlice';
//context
import SocialContext from '../../reducer/SocialContext';
//component
import Post from '../../component/Post/Post';
import {SearchCategory} from '../../component/Filter/Filter';

const Search =()=>{
    //reducer
    const {filter,filterdispatch,toastdispatch} = useContext(SocialContext)
    //redux
    const dispatch = useDispatch();
    const { allPosts } = useSelector((store) => store.Post);
    const { allUsers ,following} = useSelector((store) => store.Users);
    const { token , user } = useSelector((store) => store.authentication);
    // local state
    const [getsearchText,setsearch] = useState("");
    
    useEffect(()=>{
         let timeout =  setTimeout(() => {
            dispatch(getAllPosts())     
         }, 0);
         return ()=> clearTimeout(timeout)
    },[allPosts])

    useEffect(()=>{
         let timeout =  setTimeout(() => {
            dispatch(getAllUser())       
         }, 0);
         return ()=> clearTimeout(timeout)
    },[allUsers])

    let getPosts = SearchCategory(allPosts,allUsers,filter.searchType,getsearchText)

    return(
       <div>
           <h3> Search </h3>
            <div className='search-box search-text' >
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="search" 
                       placeholder="search by username/hashtag name/post title..." 
                       value={getsearchText}
                       onChange={(e)=>setsearch(e.target.value)} 
                />
            </div>
            {/*sort by different category*/}
            <div className='search-category'>
                <h6> Search By : </h6>
                <button 
                    className={filter.searchType === "People" ?'category-button search-button-active':'category-button'} 
                    onClick={()=>filterdispatch({type:"SEARCH_CATEGORY",payload:"People"})}> 
                    People 
                </button>
                {/* <button 
                    className={filter.searchType === "HashTag" ?'category-button search-button-active':'category-button'}  
                    onClick={()=>filterdispatch({type:"SEARCH_CATEGORY",payload:"HashTag"})}> 
                    HashTag 
                </button> */}
                <button 
                    className={filter.searchType === "Post Title" ?'category-button search-button-active':'category-button'}  
                    onClick={()=>filterdispatch({type:"SEARCH_CATEGORY",payload:"Post Title"})}> 
                    Post Title 
                </button>
            </div>
            {/* */}
            {
                filter.searchType === "People" ?
                <div>
                {
                 getPosts.length>0 ?
                getPosts.filter((all_user)=>all_user._id!==user._id).map((item,index)=>{
                      let check = following.find((follow_item)=>follow_item._id===item._id)
                    return(
                     <div className='online-list' key={index}>
                        {/* <Link to={`/${item._id}/profile`} onClick={()=>dispatch(setUserProfile(item))}> */}
                           <div className='all-user-list'>
                              <img src={item.profileImage}/>
                           </div>
                        {/* </Link> */}
                        <p className='user-list'> 
                           <label>  {item.firstName} {item.lastName} </label>
                           {/* {
                              check ?
                              <button className='login-button' onClick={()=>dispatch(UnfollowUser({item,token,toastdispatch,dispatch}))}> Following </button>
                              :  
                              <button className='login-button' onClick={()=>dispatch(followUser({item,token,toastdispatch,dispatch}))}> Follow </button>
                           }        */}
                        </p>
                     </div>
                    )
                  }) : <h4 className='sidebar-nouser-found'> No User Found </h4>
                }
                </div>
                :
                null
            }
            {
                filter.searchType === "HashTag" || filter.searchType === "Post Title"?
                    <Post page="Explore" data={getPosts.length>0?getPosts:[]}/> 
                :
                null
            }
       </div>
    )
}

export default Search