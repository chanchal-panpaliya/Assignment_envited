import './SinglePost.css';
//context
import SocialContext from '../../reducer/SocialContext';
//component
import Header from '../../component/Header/Header';
import Loader from '../../component/Loader/Loader';
import { Modal_Post_Edit,Modal_Post_Delete_Confirm ,ShareModal,EditCommentModal} from '../../component/Modal/Modal';
//react
import { useState,useEffect,useContext} from 'react';
import {useParams,Link, useNavigate} from 'react-router-dom';
//redux
import { useDispatch, useSelector } from "react-redux";
import {getAllPosts} from '../../redux/action/postSlice';
import {likePost,DislikePost,addComment,deleteComment} from '../../redux/action/postSlice';
import{AddBookmark,RemoveBookmark} from '../../redux/action/bookmarkSlice';
import {setEditPost,setUserProfile} from '../../redux/action/MenuSlice';
//img
import upcomingEvent from '../../img/upcomingEvent.png';
import like from '../../img/images/like.png';
import likeblue from '../../img/images/like-blue.png';
import comments from '../../img/images/comments.png';
import share from '../../img/images/share.png';
import NoDATA_IMG from '../../img/no-data-found.png';

const SinglePost =()=>{
    //navigator
    const navigator = useNavigate()
    //reducer - toast
    let {toastdispatch} = useContext(SocialContext)
    //redux - store
    const dispatch = useDispatch(); 
    const { token , user } = useSelector((store) => store.authentication);
    const {bookmarkPosts} = useSelector((store)=>store.Bookmark);
    const { allPosts } = useSelector((store) => store.Post);
    //local state
    const [isOpenEditModale,setOpenEditModal] = useState(false);
    const [isDeletepostModal,setDeletepostModal]=useState(false);
    const [isShareModal,setShareModal]=useState(false);
    const [isEditModal,setEditModal]=useState(false);
    const [item,setData]=useState("");
    const [selectedcomment,Setselectedcomment]=useState("")
    const [getComment,SetComment]=useState("")
    const [isloading,setloading] = useState(false)
    //other
    const {id} = useParams();
    // for to data load first time
    useEffect(()=>{
      setloading(true)
        let time2 =  setTimeout(() => {
             dispatch(getAllPosts()).then((res)=>
             {
                   setloading(false)
             }) 
         }, 0);
        return ()=> clearTimeout(time2)
       },[])
    // for update comment using dependancy useeffect
    useEffect(()=>{
        let time2 =  setTimeout(() => {
             dispatch(getAllPosts()).then((res)=>
             {
                   let getdata = res.payload.posts;
                   let getsingledata = getdata.filter(item=>item._id===id)[0]
                   setloading(false)
                   setData(getsingledata)
             }) 
         }, 0);
        return ()=> clearTimeout(time2)
    },[item,allPosts])
    // add comment function
    const handleaddComment=()=>{
        if(getComment){
            dispatch(addComment({item,getComment,token,user,dispatch,toastdispatch}))
            SetComment("")
        }else{
            toastdispatch({type:'WARNING',payload:"add text"})
        }
    }

  return(
    <div>
       <Header/> 
        {/* <!--single post> */}
        <div className='singlepost-container'>
            <div className='singlepost-info'>
                <div className='post-col'> 
                 { isloading? <Loader/> : item ? 
                    <div className='post-container' style={{margin:0}}>
                      {/*--------main post----------*/}
                      {
                        item.postType === "EVENT" ? <div className='post-event-img-box'> <img className='post-event-img' src={upcomingEvent}/> </div>: null
                      }
                      <div className='post-row'>
                            <div className='user-profile'>
                                  {
                                    item.profileImage ? 
                                    
                                          <img src={item.profileImage} alt="profile1"/> 
                                    
                                       
                                    : null
                                  }
                                  <div>
                                      <p> {item.firstName.charAt(0).toUpperCase() + item.firstName.slice(1)}   {item.lastName.charAt(0).toUpperCase() + item.lastName.slice(1)}  </p>
                                      <span> {item.postPolicy} {new Date(item.createdAt).toDateString()} </span>
                                  </div>
                            </div>
                            {/* <!--post dropdown--> */}
                            {
                              user._id === item.userId?
                              <div className='header-more-container'>
                              <i className="fa-solid fa-ellipsis-vertical"></i> 
                              <div className="dropdown-more-content">
                                  <button className='dropdown-option-button' onClick={()=>{dispatch(setEditPost({data:item,page:""})); navigator(`/${item._id}/editpost`); window.scrollTo({ behavior: 'smooth', top: '0px' }); }}> Edit </button>
                                  <button className='dropdown-option-button' onClick={()=>{ setDeletepostModal(!isDeletepostModal)}}> Delete </button>
                              </div>
                            </div> : null
                            }
                      </div>
                      <div className='post-title'> {item.title} </div> 
                      <p className='post-text'> {item.content} </p>
                      {
                        item.url!="" ?  <img src={item.url} alt="feedimage" className='post-img'/> : null
                      }
                      {
                        item.postType === "EVENT" ? <p className='post-event-location'> <label> Event Location : </label> <span> {item.eventLocation} </span> </p> : null
                      }
                      {
                        item.postType === "EVENT" ? <p className='post-event-date'> <label> Event Date : </label> <span> {new Date(item.eventDate).toDateString()} </span> </p> : null
                      }
                       {/*--------opration like/dislike/comment/bookmark/archive/delete----------*/}
                      <div className='post-row'>
                          <div className='activity-icons'>
                              <div> 
                                {
                                  item.likes.likedBy.find(_o=>_o._id === user._id) 
                                  ? 
                                    <img src={likeblue} alt="dislike" onClick={()=>dispatch(DislikePost({item,token,toastdispatch}))}/>
                                  : <img src={like} alt="like" onClick={()=> dispatch(likePost({item,token,toastdispatch}))}/>
                                }
                                 {item.likes.likeCount} 
                              </div>
                              <div> <img src={comments} alt="comment"/> {item.comments.length} </div>
                              <div> <img src={share} alt="share" onClick={()=>{setShareModal(!isShareModal)}}/> </div>
                          </div>
                          <div className='post-profile-icon'>
                              {/* <div> 
                                {
                                  bookmarkPosts.find(_i=>_i._id===item._id) ? 
                                  <i className="fa-solid fa-bookmark background-bookmark-icon" onClick={()=>dispatch(RemoveBookmark({item,token,toastdispatch}))}></i>: 
                                  <i className="fa-regular fa-bookmark" onClick={()=>dispatch(AddBookmark({item,token,toastdispatch}))}></i>
                                } 
                              </div> */}
                                {/* /display tag persone name/ */}
                               {
                                item.tagName.length>0 ? 
                                <section className='header-more-container'>
                                    <i class="fa-solid fa-user-tag"></i> 
                                    <article className="dropdown-more-content">
                                        <small> Tag with: <ul> {item.tagName.map((_i)=><li> @{_i.display}</li>)} </ul> </small>
                                    </article>
                                 </section>
                                :null
                              }
                          </div>
                      </div>
                      {/* <!--display like persone name with count----> */}
                      {
                        item.likes.likedBy.length>0 ? 
                        <div className='post-row'>  
                          <small className='liked-by-single col-gap'> 
                           <b> LIKED BY : </b>  
                            {
                              item.likes.likedBy.length===1 ? item.likes.likedBy.map((item)=><span className='liked-by-single'> 
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
                      }
                      {/* <!-- display/add comments----> */}
                      <hr/>
                      <div className='sp-comments'>
                          <label> Comments </label>
                          <textarea placeholder='write about post...' value={getComment} onChange={(e)=>SetComment(e.target.value)}/>
                          <div className='sp-comment-btn-add'>
                              <button className='login-button' onClick={()=>{handleaddComment()}}> ADD </button>
                          </div>
                          {
                            item.comments.length>0 ? 
                              <>
                                 {
                                    item.comments.map((_c,index)=>{
                                           
                                          return (
                                            <div className='post-container sp-comment-bg' key={index}>
                                            <div className='post-row'>
                                              <div className='user-profile'>
                                                <div>
                                                    <p> {_c.username} </p>
                                                </div>
                                              </div>
                                              {
                                                user.username === _c.username ? <>
                                                    
                                                     <div className='header-more-container'>
                                                 <i className="fa-solid fa-ellipsis-vertical"></i> 
                                                <div className="dropdown-more-content">
                                                    <button className='dropdown-option-button' onClick={()=>{Setselectedcomment(_c);setEditModal(!isEditModal)}}> Edit </button>
                                                    <button className='dropdown-option-button' onClick={()=>{dispatch(deleteComment({item,_c,token,toastdispatch}))}}> Delete </button>
                                                </div>
                                              </div> 
                                                </> :  null
                                              }
                                             
                                            </div>
                                            <p className='post-text'> 
                                               {_c.text}
                                            </p>
                                        </div>)
                                    })
                                 }
                              </>
                            :
                            <div> No comment added </div>
                          }
                          
                      </div>
                  </div> : <div className='no-data-found'> <img src={NoDATA_IMG} alt="NoDATA_IMG"/> </div>
                  }
                  {/* <!-end main post-> */}
                </div>
                    
                <div className='info-col'>
                    {/* singlepost-intro side-bar*/}
                    <div className='singlepost-intro'>
                        <h3>More Event's </h3>
                        <p className='intro-text'> </p>
                        <hr/>
                        <ul>
                           {
                             allPosts.length>0 ? allPosts.filter((data)=>data.postPolicy==="public").map((post,index)=>{
                                return <li key={index}> 
                                            <Link to ={`/${post.userId}/post/${post._id}`}> 
                                               {post.title} 
                                            </Link>
                                       </li>
                              }).slice(0,10)
                              : <div> no more links </div>
                           }
                        </ul>
                    </div>
                </div>
            </div>
         </div>
             {isOpenEditModale?<Modal_Post_Edit data={item} modalClose={()=>setOpenEditModal(false)}/> : null}
             {isDeletepostModal?<Modal_Post_Delete_Confirm data={item} modalClose={()=>setDeletepostModal(false)}/>:null}
             { isShareModal?<ShareModal data={item} modalClose={()=>setShareModal(false)}/>:null}
             {isEditModal?<EditCommentModal data={selectedcomment} modalClose={()=>setEditModal(false)}/> : null }
    </div>
  )
}

export default SinglePost