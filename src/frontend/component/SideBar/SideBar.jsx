//css
import './SideBar.css';
//constant
import {sidebarList} from '../../constant/sidebarList';
//redux
import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from 'frontend/redux/action/MenuSlice';
//img
import advertisement from '../../img/images/advertisement.png';
//react
import { Link ,useParams } from 'react-router-dom';
import { useEffect } from 'react';

const SideBar =()=>{
   const {id} = useParams();
   const dispatch = useDispatch();
   const { token , user } = useSelector((store) => store.authentication);
   let getlink = localStorage.getItem("sidebar");
   return(
            <section className='left-sidebar'> 
               <div className='imp-links'>
                  {
                     sidebarList.map((item,index)=>{
                        return(
                           <Link to={`/${user._id}${item.navlink}`} className="sidebarLeft-container" key={index} onClick={()=>dispatch(setSidebar(item.text))}> 
                              {/* <img src={item.icon} alt="_"/> */}
                              <i className={ getlink===item.text? `fa-solid ${item.icon} activelink`:`fa-solid ${item.icon} cursor-pointer`}></i>
                              {/* <span className={getlink===item.text?"activelink":""}> {item.icon} </span> */}
                              <label className={getlink===item.text?"activelink":"cursor-pointer"}>
                                  {item.text}
                              </label>
                           </Link>
                        )
                     })
                  }
               </div>
               {/* <!--advertisement--> */}
               {/* <div className='sidebar-title sidebar-title-ad'>
                 <h5> Advertisement </h5>
               </div>
               <img src={advertisement} alt="advertisement" className='sidebar-ads'/> */}

             </section>
   )
}

export default SideBar