//img
import like from '../../img/images/like.png';
import likeblue from '../../img/images/like-blue.png';
import comments from '../../img/images/comments.png';
import share from '../../img/images/share.png';
import upcomingEvent from '../../img/upcomingEvent.png';
import NoDATA_IMG from '../../img/no-data-found.png';
//css
import './Post.css';
//component
// import WritePost from './WritePost';
import { Modal_Post_Edit,Modal_Post_Delete_Confirm ,ShareModal} from '../Modal/Modal';
import { InfiniteScroll } from '../../component/InfiniteScroll/useInfiniteScroll';
import Loader from '../Loader/Loader';
//react
import { useState , useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//redux
import {likePost,DislikePost,AddArchivePost,RestoreArchivePost,DeleteArchivePost} from '../../redux/action/postSlice';
import{AddBookmark,RemoveBookmark} from '../../redux/action/bookmarkSlice';
import {setEditPost} from '../../redux/action/MenuSlice';

import { useSelector ,useDispatch } from "react-redux";
//context
import SocialContext from '../../reducer/SocialContext';

const Post =({page,data})=>{
  //navigator
  const navigator = useNavigate()
  //context
  const {filter,filterdispatch,toastdispatch} = useContext(SocialContext)
  //redux
   const dispatch = useDispatch();
   const { token , user } = useSelector((store) => store.authentication);
   const {bookmarkPosts} = useSelector((store)=>store.Bookmark);
   //state
   const [isOpenEditModale,setOpenEditModal] = useState(false);
   const [isDeletepostModal,setDeletepostModal]=useState(false);
   const [isShareModal,setShareModal]=useState(false);
   const [SelectedPost,SetSelectedPost]=useState("");
   //infinite scroll
   const { limit_data, moredata, setObserverRef } = InfiniteScroll(data);
   
  return(
    <>
                  {/* <!--write post--> */}
                  {/* {
                    page === "Feed" || (page === "profile" &&  limit_data.find((item)=>item.username === user.username) ) ?
                         <WritePost/> : null
                  } */}
                  {/* <!-- sort post --> */}
                  {
                    (page === "Feed" ||  page === "profile") && limit_data.length>0? 
                    <div className='post-sort'>
                     <h5> SORT BY: </h5> 
                     <button className={filter.sortBy==="SORT_BY_RECENT"?'post-sort-button post-sort-button-active':'post-sort-button'} 
                             onClick={()=>filterdispatch({type:"SORTBy",payload:"SORT_BY_RECENT"})}> Recent </button>
                     <button className={filter.sortBy==="SORT_BY_TRENDING"?'post-sort-button post-sort-button-active':'post-sort-button'}
                             onClick={()=>filterdispatch({type:"SORTBy",payload:"SORT_BY_TRENDING"})}> Trending </button>
                  </div> : null
                  }
                  {/* <!--display post --> */}

                  {
                    limit_data.length>0? 
                       limit_data.map((item,index)=>{
             
                      return(
                      <div className='post-container' key={index}>
                      { item.postType === "EVENT" ? <div className='post-event-img-box'> <img className='post-event-img' src={upcomingEvent}/> </div>: null}
                      <div className='post-row'>
                        <div className='user-profile'>
                           
                                <img src={item.profileImage} alt="profile1"/>
                              
                              <div>
                                  <p> {item.firstName.charAt(0).toUpperCase() + item.firstName.slice(1)}   {item.lastName.charAt(0).toUpperCase() + item.lastName.slice(1)}  </p>
                                  <span> {item.postPolicy} </span> 
                                  <span> {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString()} </span>
                                  
                              </div>
                        </div>
                        {/* <!--post dropdown--> */}
                        {
                          (page === "profile" && user.username === item.username) || page ==="Feed" ||(page==="Explore" && item.username === user.username)?
                          <div className='header-more-container'>
                           <i className="fa-solid fa-ellipsis-vertical"></i> 
                          <div className="dropdown-more-content">
                              {/* <button className='dropdown-option-button' onClick={()=>dispatch(AddArchivePost({item,token,toastdispatch}))}> Archive </button> */}
                              <button className='dropdown-option-button' onClick={()=>{dispatch(setEditPost({data:item,page:page})); navigator(`/${item._id}/editpost`); window.scrollTo({ behavior: 'smooth', top: '0px' }); }}> Edit </button>
                              {/* <button className='dropdown-option-button' onClick={()=>{SetSelectedPost(item); setOpenEditModal(!isOpenEditModale)}}> Edit </button> */}
                              <button className='dropdown-option-button' onClick={()=>{SetSelectedPost(item); setDeletepostModal(!isDeletepostModal)}}> Delete </button>
                          </div>
                        </div> : null
                        }

                        {/* {
                        page === "Archive"?
                          <div className='header-more-container'>
                           <i className="fa-solid fa-ellipsis-vertical"></i> 
                          <div className="dropdown-more-content">
                              <button className='dropdown-option-button' onClick={()=>dispatch(RestoreArchivePost({item,token,toastdispatch}))}> Restore </button>
                              <button className='dropdown-option-button' onClick={()=>{dispatch(setEditPost({data:item,page:page})); navigator(`/${item._id}/editpost`); window.scrollTo({ behavior: 'smooth', top: '0px' }); }}> Edit </button>
                              <button className='dropdown-option-button' onClick={()=>dispatch(DeleteArchivePost({item,token,toastdispatch}))}> Delete </button>
                          </div>
                        </div> : null
                        } */}
                        
                      </div>

                      <div className='post-title'> {item.title} </div> 
                      
                      <p className='post-text'> 
                        {item.content}
                      </p>
                      {
                        item.url!="" ?  <img src={item.url} alt="feedimage" className='post-img'/> : null
                      }
                     
                      {
                        item.postType === "EVENT" ? <p className='post-event-location'> <label> Event Location : </label> <span> {item.eventLocation} </span> </p> : null
                      }

                      {
                        item.postType === "EVENT" ? <p className='post-event-date'> <label> Event Date : </label> <span> {new Date(item.eventDate).toDateString()} </span> </p> : null
                      }
                     
                     { page !== "Archive"? 

                      <div className='post-row'>
                          <div className='activity-icons'>
                              <div> 
                                {
                                  item.likes.likedBy.find((liked) => liked._id === user._id) 
                                  ? 
                                    <img src={likeblue} alt="like" onClick={()=>dispatch(DislikePost({item,token,toastdispatch}))}/>
                                  : <img src={like} alt="like" onClick={()=>dispatch(likePost({item,token,user,dispatch,toastdispatch}))}/>
                                }
                                 {item.likes.likeCount} 
                              </div>
                              <div> 
                                <Link to ={`/${item.userId}/post/${item._id}`}>  <img src={comments} alt="comment"/> {item.comments.length}  </Link>
                              </div>
                              <div> <img src={share} alt="share" onClick={()=>{SetSelectedPost(item);setShareModal(!isShareModal)}}/> </div>
                          </div>
                          <div className='post-profile-icon'>
                              {/* <div> 
                                {
                                  bookmarkPosts.find((booked)=>booked._id === item._id) ? 
                                  <i className="fa-solid fa-bookmark background-bookmark-icon" onClick={()=>dispatch(RemoveBookmark({item,token,toastdispatch}))}></i>: 
                                  <i className="fa-regular fa-bookmark" onClick={()=>dispatch(AddBookmark({item,token,user,dispatch,toastdispatch}))}></i>
                                }
                              </div> */}
                                {/* /tag/ */}
                               {/* {
                                item.tagName.length>0 ? 
                                <section className='header-more-container'>
                                    <i class="fa-solid fa-user-tag"></i> 
                                    <article className="dropdown-more-content">
                                        <small> Tag with: <ul> {item.tagName.map((_i)=><li> @{_i.username}</li>)} </ul> </small>
                                    </article>
                                 </section>
                                :null
                              } */}
                          </div>
                      </div> : null
                    }
                     { page !== "Archive"?
                        item.likes.likedBy.length>0 ? 
                        <div className='post-row'>  
                          <small className='liked-by-single col-gap'> 
                           <b> LIKED BY : </b>  
                            {
                              item.likes.likedBy.length===1 ? item.likes.likedBy.map((item,i)=><span key={i} className='liked-by-single'> 
                               <img src={item.profileImage}/>
                              <span> {`@${item.firstName}`} </span> </span>) :
                                <>
                                 <span className='liked-by-single'>
                                  {item.likes.likedBy.map((item,index)=><img className='liked-by-single' style={{left:-(index+2)}} src={item.profileImage}/>)}
                                  {item.likes.likedBy.map((item)=>`@${item.firstName}`)[0]} and {item.likes.likedBy.map((item)=>item.firstName).length-1} more
                                 </span>
                                   </>   
                            }
                          </small>
                        </div>
                        : null
                        : null
                      }
                  </div>)}):
                  <div className='no-data-found'> 

                    { page==="Feed"? <h4> No Post Uploaded </h4>: null}
                    { page==="Explore"? <h4> No Post Found </h4>: null}
                    { page==="Bookmarks"? <h4> No Post Added in Bookmark  </h4>: null}
                    { page==="Archive"? <h4> No Post Added in Archive  </h4>: null}
                    { page==="Search"? <h4> No Post Found </h4>: null}

                    <img src={NoDATA_IMG} alt="NoDATA_IMG"/> 
                  </div>}
                  {moredata ? <div ref={setObserverRef}> <Loader/> </div> : null}
                
                    
             {isOpenEditModale?<Modal_Post_Edit modalClose={()=>setOpenEditModal(false)} data={SelectedPost} page={page}/> : null}
             {isDeletepostModal?<Modal_Post_Delete_Confirm modalClose={()=>setDeletepostModal(false)} data={SelectedPost}/>:null}
             {isShareModal?<ShareModal data={SelectedPost} modalClose={()=>setShareModal(false)}/>:null}
    </>
  )
}
export default Post