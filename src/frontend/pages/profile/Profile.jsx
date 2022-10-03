//css
import './Profile.css'
//component
import Header from '../../component/Header/Header';
import Post from '../../component/Post/Post';
import Loader from '../../component/Loader/Loader';
//react
import {useParams , Link} from 'react-router-dom';
import { useEffect,useState,useContext } from 'react';
//redux
import { useDispatch, useSelector } from "react-redux";
import {setUserProfile} from '../../redux/action/MenuSlice';
import {getAllUser} from '../../redux/action/userSlice';
import {getUserPost,getAllPosts} from '../../redux/action/postSlice';
import {getPostsBySortType} from '../../component/Filter/Filter';
import WritePost from '../../component/Post/WritePost';
//
import { EditProfileModal ,DisplayFriendsModal} from '../../component/Modal/Modal';
//context
import SocialContext from '../../reducer/SocialContext';

const Profile = () =>{
    //context
    const {filter,filterdispatch} = useContext(SocialContext)
    //reducer
    const { token , user } = useSelector((store) => store.authentication);
    const { allUsers ,following} = useSelector((store) => store.Users);
    const { userPosts , allPosts } = useSelector((store) => store.Post);
    //redux
    const dispatch = useDispatch(); 
    //state
    const [data,setdata]=useState("")
    const [openeditmodal,seteditmodal]=useState(false)
    const { selected_UserProfile_Data } = useSelector((store) => store.Menu); 
    const [IsFindFriend,setFindFriend] = useState(false)
    const [TagwithData,setTagwithData]=useState([])
    //other
    const {id} = useParams();

   useEffect(()=>{
    let getsingledata = "";
    let time =  setTimeout(() => {
        dispatch(getAllUser()).then((res)=>{
            let getdata = res.payload.users ;
            getsingledata = getdata.filter(item=>item._id===id)[0]
            setdata(getsingledata)
         })
        dispatch(getAllPosts()).then((res)=>{
            let get = res.payload.posts;
            let filter = get.filter((tag)=>tag.tagName.find(item=>item.id === id))
            let getallpost = get.filter(item=>item.userId===id)
            setTagwithData([...getallpost,...filter])
        }) 
    }, 0);
    return ()=> clearTimeout(time)
   },[data,setdata])
   const bgNoimg = "https://res.cloudinary.com/chanchal12/image/upload/v1658243097/ashok-acharya-dA9qVJaKQlc-unsplash_wqdorv.jpg"
   const getSort = getPostsBySortType(TagwithData,filter.sortBy)
  return(
    <div>
         <Header/>
         {/* main coantainer */}
         <div className='profile-container'>
            {
                data ? <>
                <img src={data.bgprofileImage?data.bgprofileImage:bgNoimg} alt="cover" className='cover-img'/> 
                    <div className='profile-details'>
                            <div className='pd-left'>
                                 <div className='pd-row'>
                                     <img src={data.profileImage} alt="profile" className='pd-images'/> 
                                     <div>
                                         <h3> { data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1)}   {data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1)} </h3>
                                         <section className='pd-following-list'> 
                                                <div className='pd-following-data' style={{margin:0}}>
                                                    <label> Posts  </label>
                                                    <label> {TagwithData.length} </label>
                                                </div>
                                                <div className='pd-following-data'>
                                                    <label> Following </label>
                                                    <label> {data.following.length}</label>
                                                </div>
                                                <div className='pd-following-data'>
                                                    <label> Followers </label>
                                                    <label>{data.followers.length}</label>
                                                </div>
                                         </section>
                                     </div>
                                 </div>
                            </div>
                            <div className='pd-right'>
                                  <div className='pd-right-btn'>
                                        <button onClick={()=>setFindFriend(!IsFindFriend)}> <i className="fa-solid fa-user-plus"></i> <span> Find Friends </span> </button>
                                        <button> 
                                            <Link to={`/${user._id}/chat`}> 
                                                <i className="fa-solid fa-comment"></i> <span> Message </span> 
                                            </Link>
                                        </button>
                                        
                                  </div>
                                  <div>
                                    {
                                        user._id === data._id ? <button className='pd-right-btn-edit' onClick={()=>seteditmodal(!openeditmodal)}> <i className="fa-solid fa-pen-to-square"></i> <span> Edit </span> </button>
                                        : null
                                    }
                                  </div>  
                            </div>
                    </div>
                    {/* <!-end profile-> */}
                    <div className='profile-info'>
                        <div className='info-col'>
                            {/* profile-intro */}
                            <div className='profile-intro'>
                                <h3>Intro</h3>
                                <p className='intro-text'> {data.Intro!==""?data.Intro:"Add intro"} </p>
                                <hr/>
                                <ul>
                                    <li> <label> WorkAt </label> <label> {data.WorkAt!==""?data.WorkAt:" - "} </label></li>
                                    <li> <label> HomeTown </label> <label> {data.HomeTown!==""?data.HomeTown:" - "} </label> </li>
                                    <li> <label> CurrentLocation </label> <label> {data.CurrentLocation!==""?data.CurrentLocation:" - "} </label> </li>
                                    <li> <label> Position </label> <label> {data.Position!==""?data.Position:" - "} </label> </li>
                                    <li> <label> Education </label> <label> {data.Education!==""?data.Education:" - "} </label> </li>
                                    <li> <label> Birthdate </label> <label> {data.Birthdate!==""? data.Birthdate :" - "} </label> </li>
                                    <li> <label> Hobbys </label> <label> {data.Hobbys!==""?data.Hobbys:" - "} </label> </li>
                                </ul>
                            </div>
                            {/* profile-photos */}
                            <div className='profile-intro'>
                                <div className='title-box'>
                                    <h3> All Photos </h3>
                                </div>
                                <div className='photo-box'>
                                    {
                                        TagwithData.length>0?TagwithData.map((item,index)=>{
                                            return (
                                                
                                                item.url!=="" ?
                                                <div> 
                                                    <Link to ={`/${item.userId}/post/${item._id}`}> 
                                                    <img src={item.url} alt="photo1"/>  
                                                    </Link> 
                                                </div>
                                                : null
                                            )
                                            
                                        }) :
                                        <div> no post added </div>
                                    }
                                </div>
                            </div>
                            {/* profile-friends*/}
                            <div className='profile-intro'>
                                <div className='title-box'>
                                    <h3> Following </h3>
                                    <p> {data.following.length} </p>
                                </div>
                                <div className='friends-box'>
                                    {
                                        data.following.length>0? data.following.map((item,index)=>{
                                            return  <div> 
                                                        <Link to={`/${item._id}/profile`} onClick={()=>dispatch(setUserProfile(item))}> 
                                                            <img src={item.profileImage} alt="member1"/> 
                                                            <span className='friends-text'> {item.username} </span> 
                                                        </Link>
                                                    </div>
                                        })
                                        : null
                                    } 
                                </div>
                            </div>
                             {/* profile-friends*/}
                             <div className='profile-intro'>
                                <div className='title-box'>
                                    <h3> Followers </h3>
                                    <p> {data.followers.length} </p>
                                </div>
                                <div className='friends-box'>
                                    {
                                        data.followers.length>0? data.followers.map((item,index)=>{
                                            return  <div key={index}> 
                                                        <Link to={`/${item._id}/profile`} onClick={()=>dispatch(setUserProfile(item))}> 
                                                            <img src={item.profileImage} alt="member1"/> 
                                                            <span className='friends-text'> {item.username} </span> 
                                                        </Link>
                                                    </div>
                                        })
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='post-col'> 
                        {
                            user._id === data._id ?  <WritePost/> : null
                        }
                         <Post page="profile" data={getSort.length>0? getSort:[]}/>
                        </div>
                    </div>

                </> : <Loader/>  
            }
         </div>
         {openeditmodal?<EditProfileModal data={data?data:""} modalClose={()=>{seteditmodal(false)}}/>:null}
         {IsFindFriend?<DisplayFriendsModal data={data?data:""} modalClose={()=>{setFindFriend(false)}}/>:null}
    </div>
  )
}

export default Profile