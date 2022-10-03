//react
import { useContext, useState , useEffect , useRef} from 'react';
import { Link ,useNavigate ,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//css
import './Header.css';
//action
import { setTheme} from '../../redux/action/themeSlice';
import { logoutUser } from '../../redux/action/authSlice';
import {setUserProfile} from '../../redux/action/MenuSlice';
import { setSidebar } from '../../redux/action/MenuSlice';
import { getAllNotification ,RemoveAllNotification } from '../../redux/action/notificationSlice';
//constext
import {sidebarList} from '../../constant/sidebarList';
//context
import SocialContext from '../../reducer/SocialContext';


const Header =() =>{
    let {toastdispatch} = useContext(SocialContext)
    let navigator = useNavigate()
    const theme = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();
    const toggleCheckbox = useRef(null);
    const [dropdown,setdropdown] = useState(false)
    const { token , user } = useSelector((store) => store.authentication);
    const { notification } = useSelector((store) => store.notification);


    useEffect(() => {
        dispatch(setTheme(JSON.parse(localStorage.getItem("darkTheme"))))
    }, []);
 
    useEffect(() => {
        document.body.classList = [theme];
    }, [theme]);

    useEffect(()=>{
        let time5 =  setTimeout(() => {
            dispatch(getAllNotification(token))        
        }, 0);
        return ()=> clearTimeout(time5)
    },[notification])

    const onThemeTogglerClick = () => {
        if(toggleCheckbox.current.className === ""){
            dispatch(setTheme('dark'))
        }else{
            dispatch(setTheme('light'))
        }
      };

      
    const logout=()=>{
        dispatch(logoutUser())
        let _token = localStorage.getItem('token')
         if(_token===null){  
            toastdispatch({type:'SUCCESS',payload:"LOGOUT"})
            navigator("/")   
         }
     }  

     let getlink = localStorage.getItem("sidebar");

    return(
      <nav>
        {/* nav left */}
        <div className='nav-left'>
            <Link to={`/${user._id}/feed`} onClick={()=>dispatch(setSidebar('Feed'))}> 
               <h1 className='logo-text'> EvenSNAP </h1>
            </Link>
        </div>
        {/* nav right */}
        <div className='nav-right'>

            {/* <div className='settings-links' >
                    <Link to={`/${user._id}/notification`} className="logo-text-white" onClick={()=>dispatch(setSidebar('Notification'))}>
                        <i class="fa-solid fa-bell logo-subtext-white notification-icon-conatiner">
                          
                                {
                                     notification.length>0 && notification.find(item=>item.postData.username===user.username || item.taguser.username === user.username)? 
                                     <span className='notification-icon-badge'> 
                                        {notification.filter(item=>item.postData.username===user.username || item.taguser.username === user.username).length}
                                     </span>
                                     : null
                                }
                            
                        </i>
                        <label className='logo-subtext-white'> Notification </label>  
                    </Link>
            </div> */}

            {/* <div className='settings-links'>
                <Link to={`/${user._id}/chat`} className="logo-text-white"> 
                    <i class="fa-solid fa-comment-dots logo-subtext-white"></i>  
                    <label className='logo-subtext-white'> Chat </label>
                </Link>
            </div> */}

            <div className='nav-user-icon online' onClick={()=>setdropdown(!dropdown)}>
                    <img src={user.profileImage} alt="profile-img"/>
            </div>
        </div>
        {/* nav setting */}
        {
            dropdown ?
            <div className= {dropdown?'setting-menu-height':'settings-menu'}>
                <button ref={toggleCheckbox} id="dark-mood-button" className={theme === 'dark'?'dark-mood-button-on':''} onClick={onThemeTogglerClick}>
                      <span> </span>  
                </button>
            {/* -------------*/}
            <div className='setting-menu-item'>
                {/* <div className='user-profile'>
                    <img src={user.profileImage} alt="profile1"/>
                    <div>
                        <p> { user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}   {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)} 
                        </p>
                        <Link to={`/${user._id}/profile`} onClick={()=>dispatch(setUserProfile(user))}> see your profile </Link>
                    </div>
                </div> */}
                {/* <hr/> */}
                {/* -------------*/}

                 {
                     sidebarList.map((item,index)=>{
                        return(
                            <div className='settings-links setting-mobile-res'>

                            <Link to={`/${user._id}${item.navlink}`} className="sidebarLeft-container" key={index} onClick={()=>dispatch(setSidebar(item.text))}> 
                              <i className={ getlink===item.text? `fa-solid ${item.icon} activelink`:`fa-solid ${item.icon} cursor-pointer`}></i>
                              <label className={getlink===item.text?"activelink":"cursor-pointer"}>
                                  {item.text}
                              </label>
                           </Link>

                            </div>
                        )
                     })
                  }
                <hr className='setting-mobile-res'/>
                {/* -------------*/}
                
                {/* <div className='settings-links'>
                    <i class="fa-solid fa-bell"></i>
                    <Link to={`/${user._id}/notification`} onClick={()=>dispatch(setSidebar('Notification'))}>
                         Notification <i class="fa-solid fa-angle-right"></i> 
                    </Link>
                </div>
                <div className='settings-links'>
                    <i class="fa-solid fa-comment-dots"></i>
                    <Link to={`/${user._id}/chat`}> 
                    Chat <i class="fa-solid fa-angle-right"></i> 
                    </Link>
                </div> */}

                <div className='settings-links'>
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <div  onClick={()=>logout()}> logout <i class="fa-solid fa-angle-right"></i> </div>
                </div>
            </div>
            {/* -------------*/}
        </div> : null
        }
       
      </nav>
    )
  }

  export default Header;