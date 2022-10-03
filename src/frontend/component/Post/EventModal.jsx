import { useState,useEffect } from "react";
import { Link } from "react-router-dom"
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const EventModal =({data,modalClose})=>{
   const [getsearch,setsearch]=useState("")
   const [searchResult,setsearchResult] = useState([])

    useEffect(()=>{
        let time = setTimeout(()=>{
          setsearchResult(handleSearch())
        },0)
        return()=>clearTimeout(time)
    },[getsearch])

    const handleSearch=()=>{
        if(getsearch!==""){
        return data.filter((item)=>item.title.includes(getsearch))
        }else{
           return data
        }
     }

   return(
    <div>
            <h3> Search </h3>
            <div className='search-box search-text' >
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="search" placeholder="search event by title..." value={getsearch} onChange={(e)=>setsearch(e.target.value)}/>
            </div>
            <div className="event-display-box">
                {
                    searchResult.length>0 ? 
                    searchResult.map((item,index)=>{
                        return(
                        <div className='event' key={index}>
                            <div className='left-event'> 
                            <h3> {new Date(item.eventDate).getDate()} </h3>
                            <span> {month[new Date(item.eventDate).getMonth()]} </span>
                            </div>
                            <div className='right-event'> 
                            <h4> {item.title} </h4>
                            <p> <i class="fa-solid fa-shop"></i> {item.eventLocation} </p>
                                <Link to ={`/${item.userId}/post/${item._id}`}> more info </Link>
                            </div>
                        </div>
                        )
                    })
                    : <div> no result </div>
                }
            </div>
    </div>
   )
}

export default EventModal