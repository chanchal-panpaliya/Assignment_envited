import Img_Card from '../../img/Event/event_landing.png'
import { sidebarList } from 'frontend/constant/sidebarList'
import { Link } from 'react-router-dom'

const EventCard =()=>{
     return(
        <div className='post-container'>
                      {/* { item.postType === "EVENT" ? <div className='post-event-img-box'> <img className='post-event-img' src={upcomingEvent}/> </div>: null} */}
                  

                      <img src={Img_Card} alt="feedimage" className='post-img'/>
                      <div className='post-title'> Movie Night </div> 
                      <p className='post-text'> 
                        👋 Hosted by Elvsia
                      </p>

                      <section> 
                        <div className='sidebar-title event-card-bg'>
                                <label> 14 response </label>
                                <b> See guests </b>
                                <button className='post-button'> 🤝 Invite </button>
                        </div>     
                        {/* <div className='event'> */}
                        <div className='sidebar-title'>
                            <div className='event'>
                            <div className='left-event'> 
                                    <img src={Img_Card} alt="feedimage" className='post-img'/>
                                    <span> Months </span>
                            </div>
                            <div className='right-event'> 
                                <h4> title name </h4>
                                <p> <i class="fa-solid fa-shop"></i> loaction </p>
                            </div>
                            </div>
                             <Link to ={`/`}> <i class="fa-solid fa-angle-right"></i> </Link> 
                        </div>
                            {/* <div className='event'> */}
                            <div className='sidebar-title'>
                            <div className='event'>
                            <div className='left-event'> 
                                    <img src={Img_Card} alt="feedimage" className='post-img'/>
                                    <span> Months </span>
                            </div>
                            <div className='right-event'> 
                                <h4> title name </h4>
                                <p> <i class="fa-solid fa-shop"></i> loaction </p>
                            </div>
                            </div>
                             <Link to ={`/`}> <i class="fa-solid fa-angle-right"></i> </Link> 
                        </div>
                            {/* <div className='event'> */}
                            <div className='sidebar-title'>
                            <div className='event'>
                            <div className='left-event'> 
                                    <img src={Img_Card} alt="feedimage" className='post-img'/>
                                    <span> Months </span>
                            </div>
                            <div className='right-event'> 
                                <h4> title name </h4>
                                <p> <i class="fa-solid fa-shop"></i> loaction </p>
                            </div>
                            </div>
                             <Link to ={`/`}> <i class="fa-solid fa-angle-right"></i> </Link> 
                        </div>
              

 

  
   </section>



            
                  </div>
     )
}

export {EventCard}