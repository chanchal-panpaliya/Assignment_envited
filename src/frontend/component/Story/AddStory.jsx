//react
import { useState , useEffect , useContext} from "react";
//component
import Slider from "../Slider/Slider";
//redux
import { AddUserStory } from "../../redux/action/authSlice";
import { useSelector ,useDispatch } from "react-redux";
//other
import { v4 as uuid } from "uuid";
import SocialContext from "../../reducer/SocialContext";


const AddStory =({data,modalClose})=>{
    //context
    let {toastdispatch} = useContext(SocialContext)
    //redux
    const dispatch = useDispatch();
    const { token , user } = useSelector((store) => store.authentication);
    //state
    const [GetImage,SetImage] = useState(data.Stories)
    
    const handleFile = async (e) =>{
        const UserStoryImage = new FormData();

            for(let i = 0; i < e.target.files.length; i++){
                let file = e.target.files[i];
                UserStoryImage.append("file", file);
                UserStoryImage.append("upload_preset", "gdnzjijb");
                UserStoryImage.append("cloud_name", "chanchal12");      

                await fetch('https://api.cloudinary.com/v1_1/chanchal12/image/upload', {
                method: "POST",
                body: UserStoryImage,
                // headers
                }).then((res) => res.json())
                .then((data) => {
                    let Objdata ={
                        _id:uuid(),
                        url:data.url,
                        uploadedDate:new Date()
                    }
                    SetImage((prev)=>[...prev,Objdata])
                    toastdispatch({type:'SUCCESS',payload:"image uolpded on server"})
                }).catch((err) => {
                    toastdispatch({type:'DANGER',payload:"ERROR!!! Can't update user story"})
                });
            }
    }

    const handleSubmit=()=>{
            let formData ={
                ...user,
                Stories:GetImage
            }
            dispatch(AddUserStory({token,formData,toastdispatch}) )
            modalClose()   
    }

    // 
   return(
    <div className="addstory-container">
          <h5> Add/Remove User Stories </h5>
            <div> 
                { GetImage.length>0 ?  
                 <div className="preview-story">
                     <Slider type={"preview"} data={{Stories:GetImage}}  modalClose={modalClose} stateChanger={SetImage}/> 
                 </div>
                : 
                 <div className="preview-story"> "story preview" </div>
                }    
            </div>
           
            <div className='userstory-box'>
                <h6>upload multiple images:</h6>
                <input type="file" accept="image/*" className='image-file' name='profileImage' onChange={(e)=>handleFile(e)} multiple/>
            </div>
            
            <button className="login-button" onClick={()=>handleSubmit()}> Add/Update Story </button>
    </div>
   )
}
export default AddStory