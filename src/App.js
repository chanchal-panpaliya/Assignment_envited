import "./App.css";
import { BrowserRouter as Router, Routes , Route,Navigate,Outlet} from 'react-router-dom'; 
//component
import Home from "./frontend/pages/home/Home";
import Profile from "./frontend/pages/profile/Profile";
import Login from "./frontend/pages/Auth/Login";
import Register from './frontend/pages/Auth/Register'; 
import PageNotFound from './frontend/pages/404error/pagenotfound';
import SinglePost from "./frontend/pages/SinglePost/SinglePost";
import Chat from "./frontend/pages/Chat/Chat";
import UploadPost from "./frontend/pages/Post/UploadPost";
import EditPostPage from "./frontend/pages/Post/EditPostPage";

import HomeEvent from "./frontend/pages/HomeEvent/HomeEvent";

import { Toast } from "./frontend/component/Toast/Toast";
import SocialContext from "./frontend/reducer/SocialContext";
import { useContext } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";

export const PrivateOutlet=()=>{
  const { token , user } = useSelector((store) => store.authentication);
  return token!==undefined ? <Outlet /> : <Navigate to="/" />;
}


function App() {
  let {toastList} = useContext(SocialContext)
  const { token , user } = useSelector((store) => store.authentication);
   
  return (
    <div>
       <Router>
         <Routes>
              {
                token!==null ?
                <>
                  <Route path="/register" element={<Home/>}/> 
                  <Route exact element={<PrivateOutlet />}>
                    <Route exact path="/:id/feed" element={<Home />} />
                    <Route exact path="/:id/search" element={<Home />} />
                    <Route exact path="/:id/explore" element={<Home />} />
                    <Route exact path="/:id/bookmarks" element={<Home />} />
                    <Route exact path="/:id/archive" element={<Home />} />
                    <Route exact path="/:id/notification" element={<Home />} />
                    <Route exact path="/:id/post/:id" element={<SinglePost />} />
                    <Route exact path="/:id/uploadpost" element={<UploadPost/>} />
                    <Route exact path="/:id/editpost" element={<EditPostPage/>} />
                    <Route exact path="/:id/chat" element={<Chat />} />
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/:id/profile" element={<Profile/>}/>
                  </Route>
                </>  : 
                <>
                  <Route exact path="/" element={<HomeEvent/>}/>
                  <Route exact path="/login" element={<Login/>}/>
                  <Route path="/register" element={<Register/>}/>
                </> 
              }

                

                  {/* <Route exact path="/create" element={<Home/>}/> */}
                  {/* <Route exact path="/event" element={<Home/>}/> */}

              <Route path="*" element={<PageNotFound/>}/>
         </Routes>
        </Router> 
        <Toast data={toastList} />
    </div>
  );
}

export default App;
