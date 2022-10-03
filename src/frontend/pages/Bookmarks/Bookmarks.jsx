import Post from '../../component/Post/Post';
import {getAllBokmarkedPosts} from '../../redux/action/bookmarkSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from 'react';

const Bookmarks =()=>{
    const dispatch = useDispatch();
    const { bookmarkPosts } = useSelector((store) => store.Bookmark);
    const { token , user } = useSelector((store) => store.authentication);

    useEffect(()=>{
        let time2 =  setTimeout(() => {
            dispatch(getAllBokmarkedPosts(token))        
        }, 0);
        return ()=> clearTimeout(time2)
       },[bookmarkPosts])

    return(
        <>
           <h3> BookMark Post </h3>
           <Post page="Bookmarks" data={bookmarkPosts.length>0?bookmarkPosts:[]}/>
        </>
    )
}

export default Bookmarks