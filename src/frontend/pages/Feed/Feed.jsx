//component
import Post from '../../component/Post/Post';
import Story from 'frontend/component/Story/Story';
import {getPostsBySortType} from '../../component/Filter/Filter';
//redux
import { useDispatch, useSelector } from "react-redux";
//react
import {useParams } from 'react-router-dom';
import { useEffect,useState ,useContext} from 'react';
import {getAllPosts} from '../../redux/action/postSlice';
import {getAllUser,followUser,UnfollowUser} from '../../redux/action/userSlice';
//contexr
import SocialContext from '../../reducer/SocialContext';
//filter data
import WritePost from '../../component/Post/WritePost';

const Feed =()=>{
    const {filter,filterdispatch} = useContext(SocialContext)
    const dispatch = useDispatch();
    const { allPosts,userPosts } = useSelector((store) => store.Post);
    const { token , user ,allUsers ,following} = useSelector((store) => store.authentication);
    const [data,setdata]=useState("")
    const {id} = useParams();

    useEffect(()=>{
        let time1 =  setTimeout(() => {
            dispatch(getAllUser()).then((alluser)=>{
                dispatch(getAllPosts()).then((res)=>{
                    let followingList =  alluser.payload.users.filter(item=>item._id===user._id)[0].following
                    let getpostdata = res.payload.posts.filter(post=>post.username===user.username || followingList.find((ele)=>post.username===ele.username))    
                    let gettagpost = res.payload.posts.filter((tag)=>tag.tagName.find(item=>item.id === id))
                    setdata([...getpostdata,...gettagpost])
                })
            })
        }, 0);
        return ()=> clearTimeout(time1)
       },[data,following])

    const getSort = getPostsBySortType(data,filter.sortBy)

    return(
       <>
           {/* <Story/> */}
           <WritePost/>
        {
            <Post page={"Feed"} data={getSort.length>0?getSort.filter(item=>item.postPolicy==="public"):[]}/> 
        }
       </>
    )
}

export default Feed