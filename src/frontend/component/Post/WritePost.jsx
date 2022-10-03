import './Post.css';
import { Modal_Post } from '../Modal/Modal';
import { useState } from 'react';
import { useSelector} from "react-redux";
import { useNavigate ,useParams } from 'react-router-dom';

const WritePost = () =>{
  const navigator = useNavigate()
  const {id} = useParams();
  const [IsPostModal,SetPostModal] = useState(false)
  const { token , user } = useSelector((store) => store.authentication);
  
 return(
<div className='write-post-container' style={{padding:"1rem"}}>
      <div className='user-profile'>
        <img src={user.profileImage} alt="profile1"/>
          <div>
            <p> { user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}   {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}  </p>
          </div>
      </div>
      <div className='post-input-conatiner'>
        {/* <textarea  rows="4" cols="30" placeholder={`Whats on your mind ${user.firstName}`} onClick={(e)=>{SetPostModal(!IsPostModal)}}/> */}
        <textarea  rows="4" cols="30" placeholder={`Whats on your mind ${user.firstName}`} onClick={(e)=>{navigator(`/${id}/uploadpost`)}}/>
        <div className='add-post-links'> </div>
      </div>
    {/* {
      IsPostModal ? <Modal_Post modalClose={()=>SetPostModal(false)}/> : null
    } */}
</div>
  )
}

export default WritePost