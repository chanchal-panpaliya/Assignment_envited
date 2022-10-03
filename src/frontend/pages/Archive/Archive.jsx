import Post from '../../component/Post/Post';
 import {getAllArchivePosts} from '../../redux/action/postSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from 'react';

const Archive =()=>{
    const dispatch = useDispatch();
    const { archivePosts } = useSelector((store) => store.Post);
    const { token , user } = useSelector((store) => store.authentication);

    useEffect(()=>{
        let time3 =  setTimeout(() => {
            dispatch(getAllArchivePosts(token))        
        }, 0);
        return ()=> clearTimeout(time3)
       },[archivePosts])

     return(
        <>
            <h3> Archive Post </h3>
            <Post page="Archive" data={archivePosts.length>0?archivePosts:[]}/>
        </>
     )
}

export default Archive