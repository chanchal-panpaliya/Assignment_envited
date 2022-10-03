import './Chat.css';
import { useSelector ,useDispatch} from 'react-redux';
import { useEffect } from 'react';
import {getAllUser,followUser,UnfollowUser} from '../../redux/action/userSlice';
import { getAllChats ,getUserChat,PostChatService} from '../../redux/action/chatSlice';
import {setUserProfile} from '../../redux/action/MenuSlice';
import { Link } from 'react-router-dom';
import Header from '../../component/Header/Header';
import { useState } from 'react';
import { v4 as uuid } from "uuid";

const Chat =()=>{
  const { allUsers ,following} = useSelector((store) => store.Users);
  const { token , user } = useSelector((store) => store.authentication);
  const { chat } = useSelector((store) => store.chat);
//   const [getSingleuserdata,setSingleuserdata] = useState(allUsers.length>0?allUsers.filter(item=>item._id!==user._id)[0]:[]);
  const [getSingleuserdata,setSingleuserdata] = useState("");
  const [sidemenu,setsidemenu]=useState(false)
  const [getmessage,setmessage]=useState("")
  const [getsearch,setsearch]=useState()
  const [displayUser,setdisplayUser] = useState([])

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllUser()).then(res=>{
       let getdata = res.payload.users ;
       let item = getdata.filter(item=>item._id!==user._id)[0]
       setSingleuserdata(item)
       setdisplayUser(getdata)
       dispatch(getUserChat({token,item}))
    })
 },[])

  useEffect(()=>{
     dispatch(getAllUser())
  },[])

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


  const AddMessageHandler=()=>{
    if(getmessage!==""){
        let postData = { 
            _id:uuid(),
            sender:user.username,
            receiver:getSingleuserdata.username,
            text:getmessage,
            datetime:new Date()
        }
        dispatch(PostChatService({token,postData}))
        setmessage("")
    }else{
        alert("message field is empty!!!")
    }
  }

  return(
    <div>
       <Header/>
        <div className='home-container' style={{padding:"0.2rem"}}>
             {/* <!--left--> */}
             <section className='chat-left-sidebar'> 
               <div className='imp-links'>
               <div className='online-list-container' style={{height:'89.5vh'}}>
                        <div className='search-box'>
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input type="search" placeholder="search user's.." value={getsearch} onChange={(e)=>setsearch(e.target.value)}/>
                        </div>
                    {
                     displayUser.length>0 && displayUser.filter((all_user)=>all_user._id!==user._id).map((item,index)=>{
                        return(
                         <div className={item.username === getSingleuserdata.username ? 'active-user-container active-user' : 'active-user-container'}>   
                            <div className={item.username === getSingleuserdata.username ? 'online-list user-online-list' : 'online-list user-online-list'} 
                                key={index} onClick={()=>{ dispatch(getUserChat({token,item})); setSingleuserdata(item) }}>
                                    <div className='all-user-list'>
                                        <img src={item.profileImage}/>
                                    </div>
                                <p className='user-list'> 
                                    <label>  {item.firstName} {item.lastName} </label>
                                </p>
                            </div>
                        </div>
                        )
                    })
                    }
                </div>
               </div>
             </section>
             {/* <!--sidebar for small screen --> */}
             {/* <!--middle--> */}
             <section className='chat-middle-sidebar'> 
             {/* <!--mobile middle--> */}
                <div className='mobile-side-bar-chat'>
                <div className='header-more-container'>
                        <button className='header-button-more' onClick={()=>setsidemenu(!sidemenu)}> 
                              <i className="fa-solid fa-bars"></i> 
                        </button>
                        <nav className={sidemenu ? "nav-menu active" : "nav-menu"}>
                           <ul className="nav-menu-items" onClick={()=>setsidemenu(!sidemenu)}>
                                <li className="navbar-toggle">
                                    <i className="fa-solid fa-xmark"></i>
                                </li>
                                <li className='padding-menu-item'> 
                                    {allUsers.filter((all_user)=>all_user._id!==user._id).map((item,index)=>{
                                        return (
                                            <div   className={item.username === getSingleuserdata.username?'online-list user-online-list active-mobile-user':'online-list user-online-list'} key={index} onClick={()=>{ dispatch(getUserChat({token,item}));setSingleuserdata(item) }}>
                                                <div className='all-user-list'>
                                                    <img src={item.profileImage}/>
                                                </div>
                                                <p className='user-list'> 
                                                    <label className='cursor-pointer'>  {item.firstName} {item.lastName} </label>
                                                </p>
                                            </div>
                                        );
                                    })}
                                </li>
                            </ul>
                        </nav>
                  </div> 
                </div>
              {/* <!--end mobile middle--> */}
              <div className='chat-message-conatiner'> 
              {chat.length>0?
                 chat.filter((item)=>item.sender===user.username||item.receiver===user.username).map((data,index)=>{
                     return data.sender===user.username ? (<div key={index} className='post-container message-sender' style={{color:'black'}}>
                                <div className='post-row'>
                                    <div className='user-profile'>
                                        <img src={user.profileImage} alt="profile1"/>
                                        <div>
                                            <p> {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}   {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}  </p>
                                        </div>
                                    </div>
                                    <div className='message-date'>
                                        {new Date(data.datetime).toLocaleString()}
                                    </div>
                                </div>
                                <div className='message-text-continer'>
                                    <p className='message-text'>{data.text}</p>
                                </div>
                            </div> 
                        ) :
                        (
                            getSingleuserdata ?
                            <div key={index} className='post-container message-reciver'>
                                <div className='post-row'>
                                    <div className='user-profile'>
                                        <img src={getSingleuserdata.profileImage} alt="profile1"/>
                                        <p> {getSingleuserdata.firstName.charAt(0).toUpperCase() + getSingleuserdata.firstName.slice(1)}   
                                            {getSingleuserdata.lastName.charAt(0).toUpperCase() + getSingleuserdata.lastName.slice(1)}  </p>
                                    </div>
                                    <div className='message-date'>
                                        {new Date(data.datetime).toLocaleString()}
                                    </div>
                                </div>
                                <div className='message-text-continer'> <p className='message-text'>{data.text}</p> </div>
                            </div> 
                          : null
                        )
                 })
                 : null
              }
              </div>
              <div className='chat-input'>
                   <input type="text" value={getmessage} placeholder="type message..." onChange={(e)=>setmessage(e.target.value)}/>
                   <button className='logo-subtext-white' onClick={()=>AddMessageHandler()}> 
                      <label className='logo-subtext-white'> Send </label> 
                   </button>
                </div>
             </section>
        </div>
    </div>
  )
}

export default Chat