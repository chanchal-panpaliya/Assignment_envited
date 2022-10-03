import {useEffect} from "react";
import { Link } from "react-router-dom";
import './pagenotfound.css';
//redux
import { useDispatch, useSelector } from "react-redux";
const PageNotFound = () =>{
    const { token , user } = useSelector((store) => store.authentication);
    useEffect(()=>{
        window.scrollTo({ behavior: 'smooth', top: '0px' });
    },[])
    return(
        <div>
            <div className="container">
                <div className="gif">
                    <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
                </div>
                <div className="content">
                    <h1 className="main-heading">This page is gone.</h1>
                    <p className="p-quit">
                    ...maybe the page you're looking for is not found or never existed.
                    </p>
                    {
                        token ?
                        <Link to={`/${user._id}/feed`} onClick={()=>localStorage.setItem("sidebar","Feed")}>
                            <button className="login-button"> Back to Page <i className="far fa-hand-point-right"></i> </button>
                        </Link> :
                        <Link to="/">
                            <button className="login-button"> Back to Page <i className="far fa-hand-point-right"></i> </button>
                        </Link>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default PageNotFound;