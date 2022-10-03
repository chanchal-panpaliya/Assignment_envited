//css
import './Story.css'
//img
import upload from '../../img/images/upload.png';
//react
import { useEffect,useState } from 'react';
//reduc
import { useDispatch, useSelector } from "react-redux";
import {getAllUser,followUser,UnfollowUser} from '../../redux/action/userSlice';
//component
import {StorySliderModal ,AddUserStoryModal} from '../Modal/Modal';

const Story=()=>{
     //redux
     const dispatch = useDispatch()
     const { token , user } = useSelector((store) => store.authentication);
     const { allUsers ,following} = useSelector((store) => store.Users);
     //state
     const [FilterUser,SetFilterUser] = useState([])
     const [isStorySlider,setStorySlider] = useState(false)
     const [selectedData,setselectedData]=useState("");
     const [isAddStory,setAddStory]=useState(false)
    
     
     //login
     useEffect(()=>{
          dispatch(getAllUser()).then((res)=>{
               let getdata = res.payload.users ;
               let filterStoryByDate = getdata.filter((item)=>{
                  // filter story as a uplodeddate
                  let get = item.Stories.filter((temp)=>{
                    let getuploaded_date = new Date(temp.uploadedDate)  
                    let convertNextDay = new Date(new Date(getuploaded_date).getTime() + (24 * 60 * 60 * 1000))
                       return convertNextDay > new Date()
                    })
                   return get
               })
               SetFilterUser(filterStoryByDate)
          }) 
          //check + current date --> current date > uploaded date + 1  then filter
     },[user])


  return(
          <div className='story-gallery'>
                <div className='story story1' style={{backgroundImage:`linear-gradient(transparent,rgba(0,0,0,0.5)),url(${user.profileImage})`}}>
                    <img src={upload} alt="story" className='upload' onClick={()=>setAddStory(!isAddStory)}/>
                    <p> Post Story </p>
               </div>

               {
                    FilterUser.map((data,index)=>{
                       return data.Stories.length>0? 
                         (<div key={index} className='story' onClick={()=>{ setselectedData(data) ; setStorySlider(!isStorySlider)}}
                              style={{backgroundImage:`linear-gradient(transparent,rgba(0,0,0,0.5)),url(${data.Stories[0].url})`}}>
                              <img src={data.profileImage} alt="memberstory"/>
                              <p> {data.firstName} </p>
                         </div>
                       ) :
                        null
                    })
               }
              
              {isStorySlider?<StorySliderModal data={selectedData} modalClose={()=>setStorySlider(false)}/>:null} 
              {isAddStory?<AddUserStoryModal data={user} modalClose={()=>setAddStory(false)} />:null}
          </div>
  )
}

export default Story