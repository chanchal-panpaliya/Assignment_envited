//css
import './Notification.css';
//component
import {NotificationCard} from '../../component/Card/NotificationCard';
//reducer
import { useDispatch, useSelector } from "react-redux";
import { getAllNotification ,RemoveAllNotification } from '../../redux/action/notificationSlice';
//img
import NoDATA_IMG from '../../img/no-data-found.png';
//react
import { useEffect,useState,useContext} from 'react';
//context
import SocialContext from '../../reducer/SocialContext';

const Notification =()=>{
    //reducer
    const dispatch = useDispatch();
    const { notification } = useSelector((store) => store.notification);
    const { token , user } = useSelector((store) => store.authentication);
    const [data,setdata] = useState([]);
    //context
    let {toastdispatch} = useContext(SocialContext)

    useEffect(()=>{
        let time5 =  setTimeout(() => {
            dispatch(getAllNotification(token))
        }, 0);
        return ()=> clearTimeout(time5)
       },[notification])

    //    let check1 = notification.find(item=>item.postData.username===user.username || item.postData.tagName.find(ok=>ok.username===user.username))

   return(
    <> 
             <h3> Notification </h3> 
             {/* {
                notification.length>0? <button className='login-button' onClick={()=>dispatch(RemoveAllNotification({token,toastdispatch}))}> clear all </button> : null
             } */}
            {
                notification.length>0 && notification.find(item=>item.postData.username===user.username || item.taguser.username === user.username)
                ? 
                      notification.filter(item=> item.postData.username===user.username || item.taguser.username === user.username).map((data,index)=>{
                        return  (
                                    <NotificationCard data={data} key={index}/> 
                        )
                    })
                : <div className='no-data-found'> 
                     <h4> No Notification </h4> 
                    <img src={NoDATA_IMG} alt="NoDATA_IMG"/> 
                  </div>
            }
    </> 
   )
}

export default Notification 