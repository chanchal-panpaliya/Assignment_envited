//react
import { useEffect, useState ,useContext} from 'react';
import { Link } from 'react-router-dom';
//redux
import { useSelector ,useDispatch} from 'react-redux';
import {getAllUser,followUser,UnfollowUser} from '../../redux/action/userSlice';
import {getAllPosts} from '../../redux/action/postSlice';
import {setUserProfile} from '../../redux/action/MenuSlice';
//reducer
import SocialContext from '../../reducer/SocialContext';

const FindFriends =({data,modalClose})=>{
   //reducer
    let {toastdispatch} = useContext(SocialContext);
   //redux
   const dispatch = useDispatch()
   const { token , user } = useSelector((store) => store.authentication);
   const { allUsers ,following} = useSelector((store) => store.Users);
   //state 
   const [getsearch,setsearch]=useState("")
   const [displayUser,setdisplayUser] = useState([])
   

useEffect(()=>{
    dispatch(getAllUser()).then((res)=>{
     let getdata = res.payload.users ;
     setdisplayUser(getdata)
    })
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

return(
    <div>
            <h3> Search </h3>
            <div className='search-box search-text' >
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="search" placeholder="search event by title..." value={getsearch} onChange={(e)=>setsearch(e.target.value)}/>
            </div>
            <div className="event-display-box">
            {
                displayUser.filter((all_user)=>all_user._id!==data._id).map((item,index)=>{
                    let check = following.find((follow_item)=>follow_item._id===item._id)
                    return(
                        <div className='online-list' key={index}>
                            <Link to={`/${item._id}/profile`} onClick={()=>{dispatch(setUserProfile(item));modalClose()}}>
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
                })
            }
            </div>
    </div>
   )
}

export default FindFriends