//react
import { useContext, useState , useEffect , useRef} from 'react';
import { Link ,useNavigate ,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//css
import './Header.css';
import { setTheme} from '../../redux/action/themeSlice';

const HeaderLogin =()=>{
    const theme = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();
    const toggleCheckbox = useRef(null);
    const [dropdown,setdropdown] = useState(false)

    useEffect(() => {
        dispatch(setTheme(JSON.parse(localStorage.getItem("darkTheme"))))
    }, []);
 
    useEffect(() => {
        document.body.classList = [theme];
    }, [theme]);


    const onThemeTogglerClick = () => {
        if(toggleCheckbox.current.className === ""){
            dispatch(setTheme('dark'))
        }else{
            dispatch(setTheme('light'))
        }
      };


    return(
      <nav>
        {/* nav left */}
        <div className='nav-left'>
            <Link to={'/'}> <h1 className='logo-text'> EvenSNAP </h1> </Link>
        </div>
        <button ref={toggleCheckbox} id="dark-mood-button" className={theme === 'dark'?'dark-mood-button-on':''} onClick={onThemeTogglerClick}>
                      <span> </span>  
        </button>
        {/* nav setting */}
      </nav>
  )
}

export default HeaderLogin