import like from '../../img/images/like.png';
import comments from '../../img/images/comments.png';
import share from '../../img/images/share.png';
import upcomingEvent from '../../img/upcomingEvent.png';
//
import { useDispatch, useSelector } from "react-redux";
const PreviewPost=({page,data})=>{
    const { token , user } = useSelector((store) => store.authentication);

return(
      <div className='post-container'>

        { data.postType === "EVENT" ? <div className='post-event-img-box'> <img className='post-event-img' src={upcomingEvent}/> </div>: null }

        <div>  </div>
        <div className='post-row'>
          <div className='user-profile'>
            <img src={user.profileImage} alt="profile1"/>
              <div>
                <p> {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}   {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}  </p>
                <span> {data.postPolicy}  June 24 2021 , 13:40 pm </span>
            </div>
          </div>
          {/* <!--post dropdown--> */}
          {
            page==="profile" || page ==="Feed"?
            <div className='header-more-container'>
             <i className="fa-solid fa-ellipsis-vertical"></i> 
            <div className="dropdown-more-content">
                <button className='dropdown-option-button'> Edit </button>
                <button className='dropdown-option-button'> Delete </button>
            </div>
          </div> : null
          }              
        </div>
        <div className='post-title'> {data.title} </div>
        <p className='post-text' style={{width:"400px"}}> {data.content} </p>
        { data.url!="" ?  <img src={data.url} alt="feedimage" className='post-img'/> : null}             
        { data.postType === "EVENT" ? <p className='post-event-location'> <label> Event Location : </label> <span> {data.eventLocation} </span> </p> : null}
        { data.postType === "EVENT" ? <p className='post-event-date'> <label> Event Date : </label> <span> {data.eventDate} </span> </p> : null} 
        <div className='post-row'>
            <div className='activity-icons'>
                <div> <img src={like} alt="like"/> 0 </div>
                <div> <img src={comments} alt="comment"/> 0 </div>
                <div> <img src={share} alt="share"/> </div>
            </div>
            <div className='post-profile-icon'>
              <div> <i class="fa-regular fa-bookmark"></i> </div>
                {/* /tag/ */}
                {
                 data.tagName.length>0 ? 
                 <section className='header-more-container'>
                     <i class="fa-solid fa-user-tag"></i> 
                     <article className="dropdown-more-content">
                         <small> Tag with: <ul> {data.tagName.map((item)=><li> @{item.display}</li>)} </ul> </small>
                     </article>
                  </section>
                 :null               
                }               
             </div>
        </div>     
  </div>  
  )
}
export default PreviewPost