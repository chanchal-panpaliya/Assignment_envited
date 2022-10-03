import './Card.css';
import { useDispatch, useSelector } from "react-redux";
import { RemoveNotification } from '../../redux/action/notificationSlice';
import { useContext } from 'react';
import SocialContext from '../../reducer/SocialContext';

export const NotificationCard=({data})=>{
   let {toastdispatch} = useContext(SocialContext)
   const { token , user } = useSelector((store) => store.authentication);
   const dispatch = useDispatch();
   return(
      <div className='post-container sp-comment-bg'>
      <div className='post-row'>
        <div className='user-profile'>
          <div>
             <img src={data.user.profileImage}/>
              <p> {data.user.username} </p>
          </div>
        </div>
               <div className='header-more-container'>
                  <i className="fa-solid fa-ellipsis-vertical"></i> 
                  <div className="dropdown-more-content">
                  <button className='dropdown-option-button' onClick={()=>dispatch(RemoveNotification({data,token,toastdispatch}))}> Delete </button>
               </div>
        </div> 
      </div>
      <p className='post-text'> 
         <b> {data.text} </b> 
         {data.text!=="Start following you" && data.text!=="Unfollow You"? <span> <b> Post </b> : {data.postData.title} </span> : null}
         {data.text === "Comment"? <div> {data.getComment} </div>:null}
      </p>
      <div className='notifi-date'> {new Date(data.date).toLocaleDateString()} {new Date(data.date).toLocaleTimeString()} </div>
  </div>
   )
}
