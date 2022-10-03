//css
import './Profile.css';
//reacr
import { useState,useEffect,useContext ,useRef} from 'react';

//reducer
import { EditUser } from '../../redux/action/authSlice';
import { useDispatch, useSelector } from "react-redux";
//context
import SocialContext from '../../reducer/SocialContext';

const EditProfile =({data,modalClose})=>{
    //ref
    const ref_profile_img = useRef(); 
    const ref_background_img = useRef();   
    //reducer
    let {toastdispatch} = useContext(SocialContext);
    //redux
    const dispatch = useDispatch(); 
    const { token , user } = useSelector((store) => store.authentication);
    //constant
    const formInitialState = {
        ...user,
        firstName:data.firstName?data.firstName:"",
        lastName:data.lastName?data.lastName:"",
        Intro:data.Intro?data.Intro:"",
        WorkAt:data.WorkAt?data.WorkAt:"",
        Position:data.Position?data.Position:"",
        Education:data.Education?data.Education:"",
        HomeTown:data.HomeTown?data.HomeTown:"",
        CurrentLocation:data.CurrentLocation?data.CurrentLocation:"",
        Birthdate:data.Birthdate?data.Birthdate:"",
        Hobbys:data.Hobbys?data.Hobbys:"",
        profileImage:data.profileImage?data.profileImage:"",
        bgprofileImage:data.bgprofileImage?data.bgprofileImage:"",
      };
    //state
      const [formData, setFormData] = useState(formInitialState);
      const {firstName,lastName,Intro,WorkAt,Position,Education,HomeTown,CurrentLocation,Birthdate,Hobbys,profileImage,bgprofileImage} = formData;
      const [isuploading,setuploading]=useState(false)
      //functions
        const handleInput = (e) =>
        setFormData((prevFormData) => ({
          ...prevFormData,
          [e.target.name]: e.target.value,
        }));
        
        const handleFile = async (e) =>{
            e.preventDefault();
            setuploading(true)
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
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        [e.target.name]:data.url,
                      }));
                      setuploading(false)
                      toastdispatch({type:'SUCCESS',payload:"Image Uploaded on server"})
                  }).catch((err) => {
                    toastdispatch({type:'DANGER',payload:"ERROR!!! Image not uploaded on server"})
                  });
            }
        }


        const reset_profile_img = () => {
            ref_profile_img.current.value = "";
            setFormData((prevFormData) => ({
                ...prevFormData,
                profileImage:"https://res.cloudinary.com/chanchal12/image/upload/v1660724539/main-qimg-2b21b9dd05c757fe30231fac65b504dd_wx5rg8.png",
            }))
        };

        const reset_background_img = () => {
            ref_background_img.current.value = "";
            setFormData((prevFormData) => ({
                ...prevFormData,
                bgprofileImage:"https://res.cloudinary.com/chanchal12/image/upload/v1660724771/abstract-luxury-plain-blur-grey-black-gradient-used-as-background-studio-wall-display-your-products_1258-63641_vk2s3b.jpg",
            }))
        };

  return(
    <form className='profile-edit-conatiner' onSubmit={(e)=>{e.preventDefault();dispatch(EditUser({token,formData,toastdispatch}));modalClose()}}>
         <h3>Edit Profile</h3>
         <div className='profile-edit'>
            <h5> Person </h5>
            <div className='profile-edit-box'>
                <label> First Name  </label>
                <input type="text" placeholder='First name' name='firstName' value={firstName} onChange={handleInput} required/>
            </div>
            <div className='profile-edit-box'>
                <label> Last Name  </label>
                <input type="text" placeholder='Last name' name='lastName' value={lastName} onChange={handleInput} required/>
            </div>
            <div className='profile-edit-box'>
                <label> About </label>
                <input type="text" placeholder='Tell someting about you...' name='Intro' value={Intro} onChange={handleInput}/>
            </div>

            <h5>Current Work </h5>
            <div className='profile-edit-box'>
                <label> Current WorkAt </label>
                <input type="text" placeholder='WorkAt' name="WorkAt" value={WorkAt} onChange={handleInput}/>
            </div>
            <div className='profile-edit-box'>
                <label> Position </label>
                <input type="text" placeholder='Position' name="Position" value={Position} onChange={handleInput}/>
            </div>
            <div className='profile-edit-box'>
                <label> Education </label>
                <input type="text" placeholder='WorkAt' name='Education' value={Education} onChange={handleInput}/>
            </div>
            <h5> Background </h5>
            <div className='profile-edit-box'>
                <label> Home Town </label>
                <input type="text" placeholder='HomeTown' name='HomeTown' value={HomeTown} onChange={handleInput}/>
            </div>
            <div className='profile-edit-box'>
                <label> Current Location </label>
                <input type="text" placeholder='Current Location' name='CurrentLocation' value={CurrentLocation} onChange={handleInput}/>
            </div>
            <div className='profile-edit-box'>
                <label> Birthdate </label>
                <input type="date" placeholder='Birthdate' name='Birthdate' value={Birthdate} onChange={handleInput}/>
            </div>
            <div className='profile-edit-box'>
                <label> Hobbys </label>
                <input type="text" placeholder='Hobbys' name='Hobbys' value={Hobbys} onChange={handleInput}/>
            </div>

            <h5> Change Profile </h5>
            <div className='profile-edit-box'>
                <input type="file" accept="image/*" className='image-file' name='profileImage' ref={ref_profile_img} onChange={(e)=>handleFile(e)} />
                <div> 
                    <div className='login-user1'> 
                    {
                            profileImage? <img className='profileImage' src={profileImage?profileImage:null} alt={profileImage? profileImage : null}/> : "profile preview"
                    }
                    </div>
                    <a className='remove-images-button' onClick={()=>{reset_profile_img()}}> RemoveImage</a>
                </div>
            </div>
            <h5> Change Background Profile </h5>
            <div className='profile-edit-box1'>
                <input type="file" accept="image/*" className='image-file' name='bgprofileImage' ref={ref_background_img}  onChange={(e)=>handleFile(e)} />
                 <div className='bgprofileImage-container'> 
                    <div className='bgprofileImage-box'> 
                    {
                            bgprofileImage? <img className='bgprofileImage' src={bgprofileImage?bgprofileImage:null} alt={bgprofileImage? bgprofileImage : null}/> : "bgprofileImage preview"
                    }
                    </div>
                    <a className='remove-images-button' onClick={()=>{reset_background_img()}}> Remove background Images </a>
                </div>
            </div>

        </div>
        <div className='profile-edit-button'>
            <button className='login-button' type='submit' disabled={isuploading}> 
             {
                isuploading ? "Uploading..." : "Update"
             }
            </button>
        </div>
    </form>
  
  )
}

export default EditProfile