//react
import { useState , useEffect, useRef,useContext } from 'react';
//img
import photo from '../../img/images/photo.png';
import feeling from '../../img/images/feeling.png';
//redux
import {getAllUser} from '../../redux/action/userSlice';
import { useSelector ,useDispatch } from "react-redux";
import {editUserPost,EditArchivePost,getAllPosts} from '../../redux/action/postSlice';
//componet
import {PreviewPostModal} from "../Modal/Modal";
//constant
import {postLimit,Hashtag,emojis} from '../../constant/post';
//context
import SocialContext from '../../reducer/SocialContext';

const EditModal = ({data,modalClose,page}) =>{
    //context
    let{toastdispatch} = useContext(SocialContext)
    const hashtagref = useRef();
    const dispatch = useDispatch();
    //redux
    const { token , user } = useSelector((store) => store.authentication);
    const { allUsers ,following} = useSelector((store) => store.Users);
    const { allPosts } = useSelector((store) => store.Post);
    //getlist from api
    const [UserList,SetUserList] = useState([])
    //
    const [NameListArray,setNameListArray] = useState(data.tagName)
    const [url,seturl] = useState(data.url)
    const [Postcontent,setPostContent] = useState(data.content)
    const [title,settitle] = useState(data.title)
    const [gethashtag,sethashtag] = useState(data.gethashtag)
    const [postType,setType]=useState(data.postType)
    const [postPolicy,setPolicy]=useState(data.postPolicy)
    const [postTopic,SetpostTopic]=useState(data.postTopic)
    const [eventLocation,setEventLocation]=useState(data.eventLocation);
    const [eventDate,setDate]=useState(data.eventDate);
    //
    const [hashtaglist,sethashtaglist] = useState(Hashtag)
    const [emojilist,setemoji_list] = useState(emojis)
    //
    const [isPreview,setPreview]=useState(false)
    const [previewData,setpreviewData]=useState("")
   
    useEffect(()=>{
        dispatch(getAllUser())
        const data = allUsers.map((item)=>{
            return{
                id:item._id,
                display:item.username
            }
        })
        SetUserList(data)
        dispatch(getAllPosts()) 
    },[])

    useEffect(()=>{
        let time4 = setTimeout(() => {
            matchHashTags()
        }, 0);
       return () => clearTimeout(time4)
    },[Postcontent])

    //tagName
    const handleSelectTagName=(name)=>{
        if(NameListArray.length>0){
            let check = NameListArray.find(item=>item.id==name.id)
            if(check){
                alert("already tag")
            }else{
                setNameListArray((prv)=>[...prv,name])
            }
        }else{
            setNameListArray((prv)=>[...prv,name])
        }
        
    }

    //Hashtag
    const handleHashTagName=(name)=>{
        setPostContent((prev) => prev.length < postLimit ? prev + name : prev)
    }

    const handleContentChange=(e)=>{
        setPostContent(e.target.value);
    }

    const matchHashTags=()=>{
        let string = Postcontent;
        let regex = /#(\w*[0-9a-zA-Z]+\w*[0-9a-zA-Z])/gi;
        let matches = string.matchAll(regex);
        let data =[]
        for (let match of matches){  
             data = data + match[0]
        }
        let ok = []
        if(data.length>0){
            data.split('#').filter(item=>item!="")
        }
        sethashtag((prev)=>new Set(ok)) 
    }
   
   //imageupload
    const handleFile = async (e) =>{
        e.preventDefault();
        if(e.target.files[0].length !== 0){
            const profileImageFormData = new FormData();
            profileImageFormData.append("file", e.target.files[0]);
            profileImageFormData.append("upload_preset", "gdnzjijb");
            profileImageFormData.append("cloud_name", "chanchal12");             
            await fetch('https://api.cloudinary.com/v1_1/chanchal12/image/upload', {
              method: "POST",
              body: profileImageFormData,
            }).then((res) => res.json())
              .then((data) => {
                seturl(data.url)
                alert("image uploaded on server")
              }).catch((err) => {
                console.log(err);
              });
        }
    }


    const handleEmojiClick = (emoji) => {
        setPostContent((prev) => (prev.length < 150 ? prev + emoji : prev));
      };

    const CompaireDate=(e)=>{
        let ToDate = new Date();
        if (new Date(e.target.value).getTime() <= ToDate.getTime()) {
            alert("The Date must be bigger then today's date");
        }else{
            setDate(e.target.value)
        }
    }  

    const PreviewPost=()=>{
        let data={
            url :url,
            content : Postcontent,
            title : title,
            tagName : NameListArray,
            gethashtag : gethashtag,
            postType:postType,
            postPolicy : postPolicy,
            eventLocation : eventLocation,
            eventDate : eventDate
        }
        setpreviewData(data)
        setPreview(!isPreview)        
    }

    const UploadPost=()=>{
        if(postType==="EVENT"){
            if(title!=="" && Postcontent!=="" && eventLocation!=="" && eventDate!=="" && postTopic!==""){
                let postData = {
                    _id:data._id,
                    title:title,
                    url:url,
                    content:Postcontent,
                    tagName : NameListArray,
                    gethashtag : gethashtag,
                    postType:postType,
                    postTopic:postTopic,
                    postPolicy : postPolicy,
                    eventLocation : postType==="EVENT"? eventLocation:"",
                    eventDate : postType==="EVENT"?eventDate:"",
                  }

                  page==="Archive"? dispatch(EditArchivePost({postData,token,toastdispatch})) : dispatch(editUserPost({postData,token,dispatch,toastdispatch}))
                  
                  modalClose()
            }else{
                alert("title , topic , content , event location and date is empty")
            }    
        }

        if(postType==="POST"){
            if(title!=="" && Postcontent!=="" && postTopic!==""){
                let postData = {
                    _id:data._id,
                    title:title,
                    url:url,
                    content:Postcontent,
                    tagName : NameListArray,
                    gethashtag : gethashtag,
                    postType:postType,
                    postTopic:postTopic,
                    postPolicy : postPolicy,
                    eventLocation : postType==="EVENT"? eventLocation:"",
                    eventDate : postType==="EVENT"?eventDate:"",
                  }
                  page==="Archive"? dispatch(EditArchivePost({postData,token,toastdispatch})) : dispatch(editUserPost({postData,token,dispatch,toastdispatch}))
                  modalClose()
            }else{
                alert("title , topic and content is empty")
            }
        }

    }

  

 return(
    <div className='write-post-container'>
        <h3> Edit Post </h3>
        <div className='post-type'>
             <button className={postType==="POST"?"active-post-type":""} onClick={()=>setType("POST")}> POST </button> 
             <button className={postType==="EVENT"?"active-post-type":""} onClick={()=>setType("EVENT")}> EVENT </button>
        </div>
        <div className='post-button-container'>
        <div className='add-post-links'>
            {/* /emoji/ */}
            <div className='header-more-container'>  
                <button> <img src={feeling} alt="post-links"/> Feeling/Activity  </button> 
                <div className="dropdown-more-content dropdown-margin">
                    <ul className='user-list-scroll-emoji'> 
                        {
                            emojilist.length>0 && emojilist.map((item)=><li className='user-list-name' onClick={()=>{handleEmojiClick(item)}}>{item}</li>)
                        }
                    </ul>
                </div>
            </div>
            {/* /hashtag/ */}
            <div className='header-more-container'> 
                <button> <i class="fa-solid fa-hashtag"></i> Hashtag  </button>
                <div className="dropdown-more-content dropdown-margin">
                    <ul className='user-list-scroll'> 
                        {
                            hashtaglist.length>0 && hashtaglist.map((item,index)=><li className='user-list-name' onClick={()=>{handleHashTagName(item)}}>{item}</li>)
                        }
                    </ul>
                </div>
            </div>
            {/* /persontag/ */}
            <div className='header-more-container'>
                <button> <i class="fa-solid fa-at"></i> Tag people  </button>
                <div className="dropdown-more-content dropdown-margin">
                    <ul className='user-list-scroll'>
                        {
                            UserList.length>0 && UserList.map((item)=><li className='user-list-name' onClick={()=>{handleSelectTagName(item)}}>{`@${item.display}`}</li>)
                        }
                    </ul>
                </div>
            </div>
        </div>
        <button className='post-button' onClick={()=>UploadPost()}> Update Post </button>
       </div>
       <div className='post-row'> 
            <div className='user-profile'>
                <img src={user.profileImage} alt="profile1"/>
                <div className='write-post-username'>
                    <p> { user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}   {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)} </p>
                    <small> 
                        <select value={postPolicy} onChange={(e)=>setPolicy(e.target.value)}> 
                            <option value="public"> public </option>
                            <option value="private"> private </option>
                        </select> 
                    </small>
                </div>
            </div>
            <div>
                <small> Post Topic: </small>
                <select value={postTopic} onChange={(e)=>SetpostTopic(e.target.value)}> 
                    {
                        allPosts.length>0 && allPosts.map((topic,I_topic)=>{
                            return  <option key={I_topic} value={topic.postTopic}> {topic.postTopic} </option>
                        })
                    }
                </select>
            </div>
        </div>
        <div className='post-input-conatiner'>
            <input type="text" placeholder='Title of post...' value={title} onChange={(e)=>settitle(e.target.value)}/>
            <textarea ref={hashtagref} autoFocus  rows="10" cols="30" maxLength={postLimit} 
                placeholder={`Whats on your mind ${user.firstName}`} value={Postcontent} onChange={handleContentChange} 
            />
            {Postcontent.trim().length} / {postLimit}
            {
                postType === "EVENT"? <>
                <div className='event-post'>
                    <div>
                            <label> Location  </label>
                            <input type="text" value={eventLocation} onChange={(e)=>setEventLocation(e.target.value)} placeholder='HolidayIn , Baner , Pune '/>
                    </div>
                    <div>
                            <label> Event Date:  </label>
                            <input type="date" value={eventDate} onChange={(e)=>CompaireDate(e)} placeholder='date...'/>
                    </div>
                </div>
                </> 
            : null
            }
            <div className='write-post-photos'>
                <img src={photo} alt="post-links"/>
                <input type="file"accept="image/*" placeholder='image link ...' onChange={(e)=>handleFile(e)}/>
            </div>
            <div className='write-post-photos'>
                <i class="fa-solid fa-at"></i>   
                    <div>
                        {NameListArray.length>0?NameListArray.map((item,index)=>{
                            return(
                                  <div> {item.display} <button className='remove-tag' onClick={()=>{setNameListArray(NameListArray.filter((_d,_di)=>_di!==index))}}> <i class="fa-solid fa-xmark"></i> </button> </div> 
                            )}) : <small> No tag list </small>
                        }
                    </div>
            </div>
        </div>
        <div className='preview'>
            <button className='login-button' onClick={()=>PreviewPost()}> Preview </button>
        </div>
         {isPreview? <PreviewPostModal page="profile" data={previewData}  modalClose={()=>setPreview(false)}/>:null}
    </div>
 )   
}
export default EditModal