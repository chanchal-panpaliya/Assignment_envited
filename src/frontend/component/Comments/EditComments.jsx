import { useState , useContext } from 'react';
import {editComment} from '../../redux/action/postSlice';
import './comment.css';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
//
import SocialContext from '../../reducer/SocialContext';

const EditComment = ({data,modalClose})=>{
  let {toastdispatch} = useContext(SocialContext)
   const [getText,setText] = useState(data.text)
   const { token , user } = useSelector((store) => store.authentication);
   const {id} = useParams();
   const dispatch = useDispatch(); 

   const handleSubmit=()=>{
      if(getText!==""){
        let CommentData = {
              ...data,
              text : getText
        }
        dispatch(editComment({id,CommentData,token,toastdispatch}))
        modalClose()
      }else{
        toastdispatch({type:'WARNING',payload:"text is empty"})
      }
   }

   return(
    <div className='comment-edit'>
        <h4> Edit Comment </h4>
        <textarea autoFocus  rows="10" cols="30" placeholder={`add comments`} value={getText} onChange={(e)=>setText(e.target.value)} /> 
        <div className='comment-edit-btn'>
            <button className='login-button' onClick={()=>handleSubmit()}> SAVE </button>
        </div>
    </div>
   )
}

export default EditComment