//redux
import { useDispatch, useSelector } from "react-redux";
import {getAllPosts} from '../../redux/action/postSlice';
//react
import { useEffect,useState,useContext} from 'react';
//css
import './Explore.css';
//component
import Post from '../../component/Post/Post';
import {getPostsByCategory} from '../../component/Filter/Filter';
//context
import SocialContext from '../../reducer/SocialContext';


const Explore =()=>{
    const {filter,filterdispatch} = useContext(SocialContext)
    const dispatch = useDispatch();
    const { allPosts } = useSelector((store) => store.Post);
    const { token , user } = useSelector((store) => store.authentication);
    const [checklist , setChecklist ] = useState([])

    useEffect(()=>{
      let time2 =  setTimeout(() => {
          dispatch(getAllPosts()).then((res)=>{
             let getpostdata = res.payload.posts
             let unique_list = getpostdata.length>0 && [...new Set(getpostdata.map(q => q.postTopic))];
             let updated_list = unique_list.length>0 && unique_list.filter((item)=>item!=="")
              if(unique_list[0]!==""){
                setChecklist(updated_list) 
              }
          })        
      }, 0);
      return ()=> clearTimeout(time2)
     },[])

    useEffect(()=>{
        let time2 =  setTimeout(() => {
            dispatch(getAllPosts())        
        }, 0);
        return ()=> clearTimeout(time2)
       },[allPosts])

     const filterData = getPostsByCategory(allPosts,filter.PostcategoryType)

    return(
       <>
           <div className="Explore-category">
              <button className={filter.PostcategoryType === "ALL"?"category-button category-button-active" :"category-button"} 
                      onClick={()=>filterdispatch({type:"POST_CATEGORY_TYPE",payload:"ALL"})}> 
               ALL </button>
              {
                checklist.length>0 && checklist.map((item,index)=>{
                    return  <button key={index}
                              className={filter.PostcategoryType === item? "category-button category-button-active" :"category-button"}  
                              onClick={()=>filterdispatch({type:"POST_CATEGORY_TYPE",payload:item})}
                            > {item} </button>
                })
              }
           </div>

           <Post page="Explore" data={filterData.length>0?filterData.filter(item=>item.postPolicy==="public"):[]}/>
       </>
    )
}

export default Explore