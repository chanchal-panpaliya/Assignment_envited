import { useState,useEffect ,useContext} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import '../Auth/index.css';
import HeaderLogin from '../../component/Header/HeaderLogin';
import { EventCard } from 'frontend/component/Card/EventCard';
//store
import {loginUser} from '../../redux/action/authSlice';
//
import SocialContext from '../../reducer/SocialContext';



const HomeEvent = () =>{
    //context
    const {toastdispatch} = useContext(SocialContext)
    //navigator
    const navigator = useNavigate();
    //redux


    return(
        <>
        <HeaderLogin/>
        <div className='login-container'>
           <section className='home-box'>
               <EventCard/>
           </section>
           <section className='login-user-list-box loginbox-textright'>
                <h1>
                    Imagine if
                </h1>
                <h1 className='text-heading-color'>
                    Snapchat
                </h1>
                <h1>
                    had events.
                </h1>
                <h3> Easily host and share events with your friends across any social media </h3>
                <div className='login-user-list-container'>
                     <button className='login-button' onClick={()=>{navigator('/login')}}> 🎉 Create my event </button>
                </div>
           </section>
        </div>
        </>
    )
}

export default HomeEvent