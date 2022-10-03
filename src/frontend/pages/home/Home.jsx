//css
import './Home.css';
//component
import Header from '../../component/Header/Header';
import SideBar from 'frontend/component/SideBar/SideBar';
import SideBar_Right from 'frontend/component/SideBar/SideBar_Right';
//pages
import Feed from '../Feed/Feed';
import Search from '../Search/Search';
import Explore from '../Explore/Explore';
import Bookmarks from '../Bookmarks/Bookmarks';
import Archive from '../Archive/Archive';
import Notification from '../Notification/Notification';
//redux
import { useSelector , useDispatch } from 'react-redux';
const Home = () =>{
  //local storage
  const selectedSidebar = localStorage.getItem("sidebar");
  return(
    <div>
        <Header/>
        <div className='home-container'>
             {/* <!--left--> */}
              <SideBar/>
             {/* <!--middle--> */}
             <section className='middle-sidebar'> 
             { selectedSidebar === "Feed" ? <Feed/> : null}
             { selectedSidebar === "Search" ? <Search/> : null}
             { selectedSidebar === "Explore" ? <Explore/> : null}
             {/* { selectedSidebar === "Bookmarks" ? <Bookmarks/> : null}
             { selectedSidebar === "Archive" ? <Archive/> : null}
             { selectedSidebar === "Notification" ? <Notification/> : null} */}
             </section>
             {/* <!--right--> */}
              {/* <SideBar_Right/> */}
        </div>
        <div className='footer'>
            <p> Copyright 2022 - chanchal panpaliya</p>
        </div>
    </div>
  )
}

export default Home