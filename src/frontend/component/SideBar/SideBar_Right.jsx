//img

//component
import {DisplayEventModal} from '../Modal/Modal';
//css
import './SideBar.css'
//redux
import { useSelector ,useDispatch} from 'react-redux';
import {getAllUser,followUser,UnfollowUser} from '../../redux/action/userSlice';
import {getAllPosts} from '../../redux/action/postSlice';
import {setUserProfile} from '../../redux/action/MenuSlice';
//react
import { useEffect, useState ,useContext} from 'react';
import { Link } from 'react-router-dom';
//context
import SocialContext from '../../reducer/SocialContext';

const SideBar_Right=()=>{
  //context
  let {toastdispatch} = useContext(SocialContext)
  //redux
  const { allUsers ,following} = useSelector((store) => store.Users);
  const { token , user } = useSelector((store) => store.authentication);
  const dispatch = useDispatch()
  //state
  const [getsearch,setsearch]=useState()
  const [displayUser,setdisplayUser] = useState([])
  const [getEventList,setEventList] = useState([])
  const [openEventModal,setEventModal] = useState(false)
  //
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  //
  useEffect(()=>{
     dispatch(getAllUser()).then((res)=>{
      let getdata = res.payload.users ;
      setdisplayUser(getdata)
     })
    
     dispatch(getAllPosts()).then((res)=>{
       let getpost = res.payload.posts
       let filterByEvent = getpost.filter((item)=>item.postType==="EVENT")
       setEventList(filterByEvent)
     })

  },[]) //dependancy i.e [getEventList]

  useEffect(()=>{
      let time = setTimeout(()=>{
         setdisplayUser(handleSearch())
      },0)
      return()=>clearTimeout(time)
},[getsearch])


   const handleSearch=()=>{
      if(getsearch!==""){
      return allUsers.filter((item)=>item.username.includes(getsearch))
      }else{
         return allUsers
      }
   }

return(
   <> 
   <section className='right-sidebar'> 
      <div className='sidebar-title'>
            <h5> Events </h5>
            {getEventList.length>3? <b onClick={()=>setEventModal(!openEventModal)}> See All </b>:null} 
         </div>
         {/* <!--event 1--> */}
         {
            getEventList.length>0 ? 
            getEventList.map((item,index)=>{
               return(
                  <div className='event' key={index}>
                     <div className='left-event'> 
                     <h3> {new Date(item.eventDate).getDate()} </h3>
                     <span> {month[new Date(item.eventDate).getMonth()]} </span>
                     </div>
                     <div className='right-event'> 
                     <h4> {item.title} </h4>
                     <p> <i class="fa-solid fa-shop"></i> {item.eventLocation} </p>
                     <Link to ={`/${item.userId}/post/${item._id}`}> more info </Link>
                     </div>
               </div>
               )
            }).slice(0,2)
         : <div> no event </div>
         }
         {/* <!--advertisement--> */}
         <div className='sidebar-title'>
            <h5> Member's </h5>
            <div className='search-box-member'>
                     <i class="fa-solid fa-magnifying-glass"></i>
                     <input type="search" placeholder="search member..." value={getsearch} onChange={(e)=>setsearch(e.target.value)}/>
            </div>
         </div>
         {/* <!--online list--> */}
         <div className='online-list-container'>
         {
            displayUser.length>0 ?
            displayUser.filter((all_user)=>all_user._id!==user._id).map((item,index)=>{
               let check = following.find((follow_item)=>follow_item._id===item._id)
            return(
               <div className='online-list' key={index}>
                  <Link to={`/${item._id}/profile`} onClick={()=>dispatch(setUserProfile(item))}>
                     <div className='all-user-list'>
                        <img src={item.profileImage}/>
                     </div>
                  </Link>
                  <p className='user-list'> 
                     <label>  {item.firstName} {item.lastName} </label>
                     {
                        check ?
                        <button className='login-button' onClick={()=>dispatch(UnfollowUser({item,token,toastdispatch,dispatch}))}> Following </button>
                        :  
                        <button className='login-button' onClick={()=>dispatch(followUser({item,token,toastdispatch,dispatch}))}> Follow </button>
                     }       
                  </p>
               </div>
            )
            }) : <div className='sidebar-nouser-found'> No User Found </div>
         }
      </div>
   </section>
   {openEventModal? <DisplayEventModal data={getEventList} modalClose={()=>setEventModal(false)}/> : null}
   </>
 )
}

export default SideBar_Right