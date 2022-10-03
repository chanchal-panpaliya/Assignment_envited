import { useState,useEffect ,useContext} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import './index.css'
import HeaderLogin from '../../component/Header/HeaderLogin';
//store
import {loginUser} from '../../redux/action/authSlice';
//
import SocialContext from '../../reducer/SocialContext';

const testCredentials1 = {
    email: "chanchalpanpaliya@gmail.com",
    password: "chanchal123",
    passwordshow:true,
    rememberme:true
};

const testCredentials2 = {
    email: "rahulpant@gmail.com",
    password: "rahul123",
    passwordshow:true,
    rememberme:true
};

const testCredentials3 = {
    email: "aniketsharma@123",
    password: "aniketsharma@123",
    passwordshow:true,
    rememberme:true
};

const testCredentials4 = {
    email: "himanshiraja@123",
    password: "himanshiraja@123",
    passwordshow:true,
    rememberme:true
};

const testCredentials5 = {
    email: "ankitaLokahde@12",
    password: "ankitaLokahde@12",
    passwordshow:true,
    rememberme:true
};

const formInitialState = {
    email: "",
    password: "",
    passwordshow:false,
    rememberme:false
};

const Login = () =>{
    //context
    const {toastdispatch} = useContext(SocialContext)
    //navigator
    const navigator = useNavigate();
    //redux
    const dispatch = useDispatch();

    const [formData, setFormData] = useState(formInitialState);
    const { email, password ,passwordshow,rememberme} = formData;
     
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


    return(
        <>
        <HeaderLogin/>
        <div className='login-container'>
           <section className='login-user-list-box'>
                <p>
                EvenSNAP is a social media app where you can connect with your friends and share some upcoming events...
                </p>
                <h3> Fill with test credential's </h3>
                <div className='login-user-list-container'>
                    <button className='login-user1' onClick={()=>setFormData(testCredentials1)}> <img className='login1-img' src={'https://res.cloudinary.com/chanchal12/image/upload/v1657479753/chanchal_j0tmjv.jpg'}/> </button>
                    <button className='login-user1' onClick={()=>setFormData(testCredentials2)}> <img className='login1-img' src={'https://res.cloudinary.com/dexubgbx0/image/upload/v1653736290/dan_o6nk9h.jpg'}/> </button>
                    <button className='login-user1' onClick={()=>setFormData(testCredentials3)}> <img className='login1-img' src={'https://res.cloudinary.com/chanchal12/image/upload/v1658215279/soccer-player-man-isolated-picture-id544358500_eyrqqt.jpg'}/> </button>
                    <button className='login-user1' onClick={()=>setFormData(testCredentials4)}> <img className='login1-img' src={'https://res.cloudinary.com/dexubgbx0/image/upload/v1652872677/28102735662_5773509d11_b_zpjwv0.webp'}/> </button>
                    <button className='login-user1' onClick={()=>setFormData(testCredentials5)}> <img className='login1-img' src={'https://res.cloudinary.com/chanchal12/image/upload/v1658157890/Anime-Girl-Profile-Picture_u00vet.jpg'}/> </button>
                </div>
           </section>
           <section className='login-box'>
                <h3> LogIn </h3> 
                <form onSubmit={(e)=>{e.preventDefault(); dispatch(loginUser({email,password,navigator,toastdispatch}))}} className="login-form">
                    <input name="email" type="email" value={email} placeholder='enter username' onChange={handleInput} required/>
                    <label className='input-container'>
                        <input name="password" type={passwordshow?"text":"password"} value={password} placeholder='enter password' onChange={handleInput} required/>
                        <input name="passwordshow" type="checkbox" value={passwordshow} checked={passwordshow} className="input-check" style={{width:'auto'}} onChange={handleToggle} /> 
                    </label>
                    <label className='rememberme'>
                        <input name="rememberme" type='checkbox' value={rememberme} checked={rememberme} onChange={handleToggle}/>
                        <span> Remember me </span>
                    </label>

                    <button className='login-button' type='submit'> login </button>

                    <Link to='/register'>
                        <span> create your account? </span>
                    </Link>
                </form>
           </section>
        </div>
        </>
    )
}

export default Login