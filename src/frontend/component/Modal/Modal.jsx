import "./Modal.css";

import SharePage from "../SharePage/SharePage";
import UploadPost from "../Post/UploadPost";
import EditModal from "../Post/EditModal";
import PreviewPost from "../Post/PreviewPost";
import EditComment from "../Comments/EditComments";
import Slider from "../Slider/Slider";
import AddStory from "../Story/AddStory";
import EventModal from "../Post/EventModal";
import FindFriends from "../../pages/profile/FindFriends";

import EditProfile from "../../pages/profile/EditProfile";
import { useSelector ,useDispatch } from "react-redux";
import {deleteUserPost} from '../../redux/action/postSlice';

import { useContext } from 'react';
import SocialContext from '../../reducer/SocialContext';

export const Modal =({modalClose})=>{
    return(
        <div className='modal'>
        <div className="modal-container">  
            <div className='modal-right-side'>
                <div className='modal-right-flex-row'>
                    
                </div> 
            </div>
            <i className='modal-close' onClick={modalClose}> x </i>
        </div>
    </div> 
    )
}

export const ShareModal =({data,modalClose})=>{
    return(
        <div className='modal'>
        <div className="modal-container" style={{width:"unset"}}>  
            <div className='modal-right-side'>
                <div className='modal-right-flex-row'>
                   <SharePage data={data}/>
                </div> 
            </div>
            <i className='modal-close' onClick={modalClose}> x </i>
        </div>
    </div> 
    )
}

export const Modal_Post =({modalClose})=>{
    return(
        <div className='modal'>
        <div className="modal-container">  
            <div className='modal-left-side'>
                
            </div>
            <div className='modal-right-side'>
                <div className='modal-right-flex-row'>
                   <UploadPost modalClose={modalClose}/>
                </div> 
            </div>
            <i className='modal-close' onClick={modalClose}> x </i>
        </div>
    </div> 
    )
}

export const Modal_Post_Edit =({modalClose,data,page})=>{
    return(
        <div className='modal'>
        <div className="modal-container">  
            <div className='modal-left-side'>
                
            </div>
            <div className='modal-right-side'>
                <div className='modal-right-flex-row'>
                   <EditModal data={data} modalClose={modalClose} page={page}/>
                </div> 
            </div>
            <i className='modal-close' onClick={modalClose}> x </i>
        </div>
    </div> 
    )
}

export const Modal_Post_Delete_Confirm =({modalClose,data})=>{
    const dispatch = useDispatch();
    let {toastdispatch} = useContext(SocialContext)
    const { token , user } = useSelector((store) => store.authentication);
 
    return(
        <div className='modal'>
        <div className="modal-container">  
            <div className='modal-left-side'>
                
            </div>
            <div className='modal-right-side'>
                <div className='modal-right-flex-row'>
                    <div>
                        <label>  Do you want to Delete this post? </label>
                        <div className="modal-confirm-option">
                            <button className="modal-confirm-option-yes" onClick={()=>{dispatch(deleteUserPost({data,token,toastdispatch}));modalClose();}}> Yes </button>
                            <button className="modal-confirm-option-no" onClick={modalClose}> No </button>
                        </div>
                    </div>
                </div> 
            </div>
            <i className='modal-close' onClick={modalClose}> x </i>
        </div>
    </div> 
    )
}

export const EditProfileModal =({data,modalClose})=>{
    return(
        <div className='modal'>
        <div className="modal-container">  
            <div className='modal-left-side'>
                
            </div>
            <div className='modal-right-side'>
                <div className='modal-right-flex-row'>
                     <EditProfile data={data} modalClose={modalClose}/>
                </div> 
            </div>
            <i className='modal-close' onClick={modalClose}> x </i>
        </div>
    </div> 
    )
}

export const PreviewPostModal =({page,data,modalClose})=>{
    return(
        <div className='modal'>
        <div className="modal-container" style={{width:"500px"}}>  
            <div className='modal-left-side'>
                
            </div>
            <div className='modal-right-side'>
                <div className='modal-right-flex-row'>
                     <PreviewPost  page={page} data={data}  modalClose={modalClose}/>
                </div> 
            </div>
            <i className='modal-close' onClick={modalClose}> x </i>
        </div>
    </div> 
    )
}


export const EditCommentModal =({data,modalClose})=>{
    return(
        <div className='modal'>
        <div className="modal-container">  
            <div className='modal-left-side'>
                
            </div>
            <div className='modal-right-side'>
                <div className='modal-right-flex-row'>
                     <EditComment data={data}  modalClose={modalClose}/>
                </div> 
            </div>
            <i className='modal-close' onClick={modalClose}> x </i>
        </div>
    </div> 
    )
}

export const StorySliderModal = ({data,modalClose})=>{
    return(
        <div className='modal'>
        <div className="modal-container" style={{width:'18rem',height:'28rem'}}>  
            <div className='modal-right-side'>
                     <Slider data={data}  modalClose={modalClose}/>
            </div>
            <i className='modal-close' onClick={modalClose}> x </i>
        </div>
    </div> 
    )
}

export const AddUserStoryModal = ({data,modalClose})=>{
    return(
        <div className='modal'>
        <div className="modal-container">  
            <div className='modal-right-side'>
                  <AddStory type={" "} data={data} modalClose={modalClose}/>
            </div>
            <i className='modal-close' onClick={modalClose}> x </i>
        </div>
    </div> 
    )
}

export const DisplayEventModal = ({data,modalClose})=>{
    return(
        <div className='modal'>
        <div className="modal-container">  
            <div className='modal-right-side'>
                  <EventModal data={data} modalClose={modalClose}/>
            </div>
            <i className='modal-close' onClick={modalClose}> x </i>
        </div>
    </div> 
    )
}

export const DisplayFriendsModal = ({data,modalClose})=>{
    return(
        <div className='modal'>
        <div className="modal-container">  
            <div className='modal-right-side'>
                  <FindFriends data={data} modalClose={modalClose}/>
            </div>
            <i className='modal-close' onClick={modalClose}> x </i>
        </div>
    </div> 
    )
}










