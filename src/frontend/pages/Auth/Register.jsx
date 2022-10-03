import { useState,useEffect ,useContext} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import './index.css'
import HeaderLogin from '../../component/Header/HeaderLogin';
//store
import {signupUser} from '../../redux/action/authSlice';
//
import SocialContext from '../../reducer/SocialContext';

const formInitialState = {
  firstName:"",
  lastName:"",
  username: "",
  password: "",
  confirmpassword:"",
  Intro:"",
  profileImage:"",
  Ispasswordshow:false,
  Isconfirmpassword:false,
  Istermscondition:false
};

const testCredentials = {
  firstName:"pooja",
  lastName:"sharma",
  username: "pooja.sharma@gmail.com",
  password: "123456",
  confirmpassword:"123456",
  Intro:"I'm neog student and looking for job changed",
  profileImage:"https://res.cloudinary.com/chanchal12/image/upload/v1660724539/main-qimg-2b21b9dd05c757fe30231fac65b504dd_wx5rg8.png",
  Ispasswordshow:true,
  Isconfirmpassword:true,
  Istermscondition:true
};

const Register =()=>{
  let{toastdispatch}= useContext(SocialContext)
  const navigator = useNavigate();
  //redux 
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(formInitialState);
  const {firstName,lastName,username,password,confirmpassword,Intro,profileImage,Ispasswordshow,Isconfirmpassword,Istermscondition} = formData;
     
    const handleInput = (e) =>
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));

  const handleToggle = (e) =>
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.checked,
    }));

    const handleFile = async (e) =>{
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
             alert("image uploaded on server")
          }).catch((err) => {
            console.log(err);
          });
      }
  }

  const onhandleSubmit =(e)=>{
    e.preventDefault();
    if(firstName && lastName && username && password && Intro && profileImage &&(password===confirmpassword)){
      dispatch(signupUser({firstName,lastName,username,password,Intro,profileImage,toastdispatch})).then(res=>{
          if(res.payload.status===201){
              navigator(`/`)
          }
      })
    }else{

         if(password!==confirmpassword){
          toastdispatch({type:'DANGER',payload:"All fields are mandatory"})
         }else{
          toastdispatch({type:'DANGER',payload:"All fields are mandatory"})
         }
          
    }
  }

    return(
      <>
        <HeaderLogin/>
        <div className='login-container'>

           <section className='login-box'>
               <div className='register-dummydata-container'>
                    <h3> Registration </h3> 
                    <button className='login-button' onClick={()=>{setFormData(testCredentials);}}> Fill with dummy data </button>
               </div>
              
                <form onSubmit={(e)=>{onhandleSubmit(e)}} className="login-form">
      
                    <input type="text" name='firstName' placeholder='firstName' value={firstName} onChange={handleInput}  required/>
                    <input type="text" name="lastName" placeholder='lastName' value={lastName} onChange={handleInput} required/>
                    <input type="email" name="username" placeholder='username' value={username} onChange={handleInput} required/>
                    <label className='input-container'>
                        <input name="password" type={Ispasswordshow?"text":"password"} value={password} placeholder='enter password' onChange={handleInput} required/>
                        <input name="Ispasswordshow" type="checkbox" value={Ispasswordshow} checked={Ispasswordshow} className="input-check" style={{width:'auto'}} onChange={handleToggle} /> 
                    </label>
                    <label className='input-container'>
                        <input name="confirmpassword" type={Isconfirmpassword?"text":"password"} value={confirmpassword} placeholder='enter confirmpassword' onChange={handleInput} required/>
                        <input name="Isconfirmpassword" type="checkbox" value={Isconfirmpassword} checked={Isconfirmpassword} className="input-check" style={{width:'auto'}} onChange={handleToggle} /> 
                    </label>
                    <input type="text" name="Intro" placeholder='about you..' value={Intro} onChange={handleInput} required/>
                    
                    <div className='register-image'>
                      <input type="file" accept="image/*" className='image-file' name='profileImage'  onChange={handleFile} />
                      <div> 
                          <div className='login-user1'> 
                          {
                            profileImage? <img className='profileImage' src={profileImage?profileImage:null} alt={profileImage? profileImage.name : null}/> : "profile preview"
                          }
                          </div>
                      </div>
                    </div>
                     
                    <label className='flex-center'>
                        <input type="checkbox" value={Istermscondition} name="Istermscondition" checked={Istermscondition} onChange={handleToggle} required/> 
                        <span> I accept the all terms & conditions </span>
                    </label>

                    <button type='submit' className='login-button'> Registered </button>
                    
                    <Link to='/'>
                        <span> already have account?</span>
                    </Link>
                </form>
           </section>
        </div>
      </>
    )
  }
  export default Register